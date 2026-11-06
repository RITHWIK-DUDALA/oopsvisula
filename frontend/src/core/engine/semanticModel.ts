/**
 * OOPS LAB — UNIFIED SEMANTIC VISUALIZATION MODEL
 * Conforms to Master Plan Phase 3.
 * Connects static source AST declarations with runtime JVM execution snapshots.
 * Authoritative single source of truth for all 2D and 3D visualizers, inspectors, and graph views.
 */

import { SourceLocation, ParsedJavaProgram } from './unifiedModel';
import { ExecutionEvent, LocalVariableSnapshot, ObjectFieldSnapshot } from '../../types/execution';

export type EntityType =
  | 'class'
  | 'abstract-class'
  | 'interface'
  | 'record'
  | 'enum'
  | 'object'
  | 'array'
  | 'collection'
  | 'field'
  | 'method'
  | 'constructor'
  | 'variable'
  | 'thread'
  | 'package';

export type SemanticProvenance = 'source' | 'runtime' | 'inferred';

export type SemanticVisibility = 'public' | 'protected' | 'package' | 'private';

export interface SemanticRuntimeState {
  value?: any;
  declaredType?: string;
  runtimeType?: string;
  address?: string;
  isAllocated?: boolean;
  isMutated?: boolean;
  previousValue?: any;
  callStackDepth?: number;
  isTopFrame?: boolean;
  executionStatus?: 'idle' | 'active' | 'suspended' | 'returned' | 'exception';
  fields?: Record<string, ObjectFieldSnapshot>;
  localVariables?: LocalVariableSnapshot[];
  elements?: { index: number; value: any; isReference: boolean; targetAddress?: string }[];
  size?: number;
  length?: number;
}

export interface SemanticEntity {
  id: string; // Stable deterministic ID
  entityType: EntityType;
  name: string;
  qualifiedName: string;
  sourceLocation?: SourceLocation;
  sourceFile?: string;
  sourceLine?: number;
  parentId: string | null; // e.g. class ID for fields/methods, package for classes
  childIds: string[];
  provenance: SemanticProvenance;
  visibility: SemanticVisibility;
  modifiers: string[]; // static, final, abstract, synchronized, sealed, etc.
  runtimeState?: SemanticRuntimeState;
  metadata: Record<string, any>;
}

export type SemanticRelationshipKind =
  | 'extends'
  | 'implements'
  | 'composes'
  | 'aggregates'
  | 'associates'
  | 'depends'
  | 'references'
  | 'invokes'
  | 'overrides'
  | 'instantiates'
  | 'inherits';

export interface SemanticRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  kind: SemanticRelationshipKind;
  direction: 'forward' | 'bidirectional';
  provenance: SemanticProvenance;
  isActive: boolean; // Relevant at the active execution step
  multiplicity?: string;
  sourceLocation?: SourceLocation;
  metadata?: Record<string, any>;
}

export interface SemanticModel {
  entities: Map<string, SemanticEntity>;
  relationships: SemanticRelationship[];
  activeStep: number;
  currentEvent?: ExecutionEvent;
  sourceFiles: string[];

  // Traversal & Query API
  getEntity: (id: string) => SemanticEntity | undefined;
  getEntitiesByType: (type: EntityType | EntityType[]) => SemanticEntity[];
  getChildren: (parentId: string) => SemanticEntity[];
  getParent: (entityId: string) => SemanticEntity | undefined;
  getRelationshipsForEntity: (entityId: string) => SemanticRelationship[];
  getOutgoingRelationships: (sourceId: string) => SemanticRelationship[];
  getIncomingRelationships: (targetId: string) => SemanticRelationship[];
  getClassHierarchy: (classId: string) => SemanticEntity[];
  getActiveCallStack: () => SemanticEntity[];
  getHeapObjects: () => SemanticEntity[];
  getActiveRelationships: () => SemanticRelationship[];
  searchEntities: (query: string) => SemanticEntity[];
}

/**
 * Builds an authoritative SemanticModel by combining static parsed AST with runtime execution snapshots.
 */
export function buildSemanticModel(
  program: ParsedJavaProgram | null,
  currentEvent?: ExecutionEvent,
  _allEvents: ExecutionEvent[] = []
): SemanticModel {
  const entities = new Map<string, SemanticEntity>();
  const relationships: SemanticRelationship[] = [];
  const sourceFilesSet = new Set<string>();

  if (!program) {
    return createEmptySemanticModel();
  }

  // -------------------------------------------------------------
  // 1. Process Static Program Entities (Classes, Fields, Methods)
  // -------------------------------------------------------------
  const classChildMap = new Map<string, string[]>();

  for (const cls of program.classes) {
    const classId = cls.id;
    classChildMap.set(classId, []);
    const file = cls.sourceLocation?.file || 'Main.java';
    sourceFilesSet.add(file);

    const visibility = (cls.metadata?.visibility as SemanticVisibility) || 'package';
    const modifiers: string[] = [];
    if (cls.metadata?.isStatic) modifiers.push('static');
    if (cls.metadata?.isFinal) modifiers.push('final');
    if (cls.metadata?.isAbstract) modifiers.push('abstract');

    const entityType: EntityType =
      cls.kind === 'interface'
        ? 'interface'
        : cls.kind === 'record'
        ? 'record'
        : cls.kind === 'enum'
        ? 'enum'
        : cls.metadata?.isAbstract
        ? 'abstract-class'
        : 'class';

    entities.set(classId, {
      id: classId,
      entityType,
      name: cls.name,
      qualifiedName: cls.name,
      sourceLocation: cls.sourceLocation,
      sourceFile: file,
      sourceLine: cls.sourceLocation?.line,
      parentId: null,
      childIds: [],
      provenance: 'source',
      visibility,
      modifiers,
      metadata: { ...cls.metadata },
    });
  }

  // Fields
  for (const f of program.fields) {
    const fieldId = f.id;
    const clsName = f.metadata?.className as string;
    const classId = `class-${clsName}`;
    const file = f.sourceLocation?.file || 'Main.java';

    const visibility = (f.metadata?.visibility as SemanticVisibility) || 'package';
    const modifiers: string[] = [];
    if (f.metadata?.isStatic) modifiers.push('static');
    if (f.metadata?.isFinal) modifiers.push('final');

    const children = classChildMap.get(classId);
    if (children) children.push(fieldId);

    entities.set(fieldId, {
      id: fieldId,
      entityType: 'field',
      name: f.name,
      qualifiedName: `${clsName}.${f.name}`,
      sourceLocation: f.sourceLocation,
      sourceFile: file,
      sourceLine: f.sourceLocation?.line,
      parentId: classId,
      childIds: [],
      provenance: 'source',
      visibility,
      modifiers,
      runtimeState: {
        declaredType: f.declaredType || (f.metadata?.declaredType as string) || 'Object',
      },
      metadata: { ...f.metadata, declaredType: f.declaredType },
    });
  }

  // Constructors
  for (const c of program.constructors) {
    const ctorId = c.id;
    const clsName = c.metadata?.className as string;
    const classId = `class-${clsName}`;
    const file = c.sourceLocation?.file || 'Main.java';

    const visibility = (c.metadata?.visibility as SemanticVisibility) || 'public';
    const children = classChildMap.get(classId);
    if (children) children.push(ctorId);

    entities.set(ctorId, {
      id: ctorId,
      entityType: 'constructor',
      name: c.name,
      qualifiedName: `${clsName}.${c.name}`,
      sourceLocation: c.sourceLocation,
      sourceFile: file,
      sourceLine: c.sourceLocation?.line,
      parentId: classId,
      childIds: [],
      provenance: 'source',
      visibility,
      modifiers: [],
      runtimeState: {
        declaredType: clsName,
      },
      metadata: { ...c.metadata },
    });
  }

  // Methods
  for (const m of program.methods) {
    const methId = m.id;
    const clsName = m.metadata?.className as string;
    const classId = `class-${clsName}`;
    const file = m.sourceLocation?.file || 'Main.java';

    const visibility = (m.metadata?.visibility as SemanticVisibility) || 'public';
    const modifiers: string[] = [];
    if (m.metadata?.isStatic) modifiers.push('static');
    if (m.metadata?.isFinal) modifiers.push('final');
    if (m.metadata?.isAbstract) modifiers.push('abstract');

    const children = classChildMap.get(classId);
    if (children) children.push(methId);

    entities.set(methId, {
      id: methId,
      entityType: 'method',
      name: m.name,
      qualifiedName: `${clsName}.${m.name}()`,
      sourceLocation: m.sourceLocation,
      sourceFile: file,
      sourceLine: m.sourceLocation?.line,
      parentId: classId,
      childIds: [],
      provenance: 'source',
      visibility,
      modifiers,
      runtimeState: {
        declaredType: m.declaredType || (m.metadata?.returnType as string) || 'void',
      },
      metadata: { ...m.metadata, declaredType: m.declaredType },
    });
  }

  // Variables
  for (const v of program.variables) {
    const varId = v.id;
    const file = v.sourceLocation?.file || 'Main.java';
    entities.set(varId, {
      id: varId,
      entityType: 'variable',
      name: v.name,
      qualifiedName: v.name,
      sourceLocation: v.sourceLocation,
      sourceFile: file,
      sourceLine: v.sourceLocation?.line,
      parentId: (v.metadata?.scope as string) || null,
      childIds: [],
      provenance: 'source',
      visibility: 'package',
      modifiers: [],
      metadata: { ...v.metadata },
    });
  }

  // Update class childIds
  for (const [classId, childIds] of classChildMap.entries()) {
    const clsEntity = entities.get(classId);
    if (clsEntity) {
      clsEntity.childIds = childIds;
    }
  }

  // -------------------------------------------------------------
  // 2. Process Static Relationships
  // -------------------------------------------------------------
  const seenRelationshipKeys = new Set<string>();

  for (const r of program.relationships) {
    // Prevent invalid self-links (e.g. Car -> Car)
    if (r.sourceId === r.targetId) continue;

    let kind: SemanticRelationshipKind = 'associates';
    if (r.kind === 'inheritance') kind = 'extends';
    else if (r.kind === 'implementation') kind = 'implements';
    else if (r.kind === 'composition') kind = 'composes';
    else if (r.kind === 'aggregation') kind = 'aggregates';
    else if (r.kind === 'dependency') kind = 'depends';
    else if (r.kind === 'instantiation') kind = 'instantiates';
    else if (r.kind === 'reference') kind = 'references';
    else if (r.kind === 'association') kind = 'associates';
    else if (r.kind === 'method-call') kind = 'invokes';

    // Prevent duplicate duplicate relationships between same endpoints with same kind
    const dedupeKey = `${r.sourceId}->${r.targetId}:${kind}`;
    if (seenRelationshipKeys.has(dedupeKey)) continue;
    seenRelationshipKeys.add(dedupeKey);

    relationships.push({
      id: r.id,
      sourceId: r.sourceId,
      targetId: r.targetId,
      kind,
      direction: 'forward',
      provenance: 'source',
      isActive: false,
      sourceLocation: r.sourceLocation,
      metadata: r.metadata,
    });
  }

  // -------------------------------------------------------------
  // 3. Process Runtime Execution Snapshots (Heap & Call Stack)
  // -------------------------------------------------------------
  if (currentEvent) {
    // A. Runtime Heap Objects
    for (const obj of currentEvent.heapObjects) {
      const objId = obj.id || obj.address;
      const classId = `class-${obj.className}`;

      let entityType: EntityType = 'object';
      if (obj.className.endsWith('[]')) {
        entityType = 'array';
      } else if (['ArrayList', 'LinkedList', 'List', 'HashMap', 'Map', 'HashSet', 'Set'].includes(obj.className)) {
        entityType = 'collection';
      }

      // Format fields map
      const fieldsMap: Record<string, ObjectFieldSnapshot> = {};
      const elements: { index: number; value: any; isReference: boolean; targetAddress?: string }[] = [];

      for (const f of obj.fields) {
        fieldsMap[f.name] = f;
        if (entityType === 'array' && f.name.startsWith('[') && f.name.endsWith(']')) {
          const idx = parseInt(f.name.slice(1, -1), 10);
          if (!isNaN(idx)) {
            elements.push({
              index: idx,
              value: f.value,
              isReference: f.isReference,
              targetAddress: f.targetAddress,
            });
          }
        }
      }
      elements.sort((a, b) => a.index - b.index);

      const isAllocatedInThisStep = currentEvent.allocatedObjectId === obj.id;
      const isMutatedInThisStep =
        currentEvent.mutatedField?.objectAddress === obj.id ||
        (obj.mutatedFieldNames && obj.mutatedFieldNames.length > 0);

      entities.set(objId, {
        id: objId,
        entityType,
        name: `${obj.className} (${objId})`,
        qualifiedName: `${obj.className}@${obj.address}`,
        parentId: classId,
        childIds: [],
        provenance: 'runtime',
        visibility: 'public',
        modifiers: [],
        runtimeState: {
          address: obj.address,
          declaredType: obj.className,
          runtimeType: obj.className,
          isAllocated: true,
          isMutated: isMutatedInThisStep,
          previousValue: currentEvent.mutatedField?.previousValue,
          fields: fieldsMap,
          elements: entityType === 'array' ? elements : undefined,
          length: entityType === 'array' ? Number(fieldsMap['length']?.value || elements.length) : undefined,
          size: entityType === 'collection' ? Number(fieldsMap['size']?.value || 0) : undefined,
          executionStatus: isMutatedInThisStep ? 'active' : 'idle',
        },
        metadata: {
          colorTag: obj.colorTag,
          isNew: obj.isNew,
        },
      });

      // Relationship: Class Blueprint -> Instance
      relationships.push({
        id: `rel-instantiates-${classId}-${objId}`,
        sourceId: classId,
        targetId: objId,
        kind: 'instantiates',
        direction: 'forward',
        provenance: 'runtime',
        isActive: isAllocatedInThisStep,
      });

      // Dynamic Reference Pointers between Heap Objects
      for (const f of obj.fields) {
        if (f.isReference && f.targetAddress && f.targetAddress !== 'null') {
          relationships.push({
            id: `rel-heap-ref-${objId}-${f.name}-${f.targetAddress}`,
            sourceId: objId,
            targetId: f.targetAddress,
            kind: 'references',
            direction: 'forward',
            provenance: 'runtime',
            isActive: f.isMutated || currentEvent.mutatedField?.fieldName === f.name,
            metadata: { fieldName: f.name },
          });
        }
      }
    }

    // B. Call Stack Frames & Execution State
    currentEvent.stackFrames.forEach((frame, depth) => {
      const isTop = frame.isTop ?? depth === currentEvent.stackFrames.length - 1;
      const methNameClean = frame.methodName.replace(/\(.*\)/, '').trim();

      // Find static method entity
      for (const [, e] of entities.entries()) {
        if (e.entityType === 'method' && e.name === methNameClean) {
          e.runtimeState = {
            executionStatus: isTop ? 'active' : 'suspended',
            callStackDepth: depth,
            isTopFrame: isTop,
            localVariables: frame.localVariables,
          };
        }
      }

      // Local variable reference arrows: Stack -> Heap
      for (const lv of frame.localVariables) {
        if (lv.isReference && lv.targetAddress && lv.targetAddress !== 'null') {
          relationships.push({
            id: `rel-stack-ref-${frame.frameId}-${lv.name}-${lv.targetAddress}`,
            sourceId: `class-${frame.className}`,
            targetId: lv.targetAddress,
            kind: 'references',
            direction: 'forward',
            provenance: 'runtime',
            isActive: isTop,
            metadata: {
              variableName: lv.name,
              frameName: frame.methodName,
            },
          });
        }
      }
    });

    // C. Runtime Threads
    if (currentEvent.threads && currentEvent.threads.length > 0) {
      for (const t of currentEvent.threads) {
        const threadEntityId = `thread-${t.threadId}`;
        entities.set(threadEntityId, {
          id: threadEntityId,
          entityType: 'thread',
          name: t.name,
          qualifiedName: `Thread[${t.name}, ${t.state}]`,
          parentId: null,
          childIds: [],
          provenance: 'runtime',
          visibility: 'public',
          modifiers: [],
          runtimeState: {
            executionStatus: t.state === 'RUNNABLE' ? 'active' : t.state === 'TERMINATED' ? 'returned' : 'suspended',
            callStackDepth: t.callStack ? t.callStack.length : 0,
            isTopFrame: t.isCurrent,
          },
          metadata: {
            threadId: t.threadId,
            state: t.state,
            isCurrent: t.isCurrent,
            lockAcquired: t.lockAcquired,
            lockWaitingOn: t.lockWaitingOn,
            callStack: t.callStack,
          },
        });

        // Relationship: Thread -> Acquired Lock Object
        if (t.lockAcquired) {
          relationships.push({
            id: `rel-thread-lock-${t.threadId}-${t.lockAcquired}`,
            sourceId: threadEntityId,
            targetId: t.lockAcquired,
            kind: 'references',
            direction: 'forward',
            provenance: 'runtime',
            isActive: true,
            metadata: {
              lockStatus: 'holding',
            },
          });
        }
      }
    }

    // Mark active invocation relationship
    if (currentEvent.methodName) {
      const activeMeth = currentEvent.methodName.replace(/\(.*\)/, '').trim();
      for (const rel of relationships) {
        if (rel.kind === 'invokes' && rel.targetId.includes(activeMeth)) {
          rel.isActive = true;
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 4. Traversal & Query Implementation
  // -------------------------------------------------------------
  const model: SemanticModel = {
    entities,
    relationships,
    activeStep: currentEvent?.step || 0,
    currentEvent,
    sourceFiles: Array.from(sourceFilesSet),

    getEntity: (id: string) => entities.get(id),

    getEntitiesByType: (type: EntityType | EntityType[]) => {
      const types = Array.isArray(type) ? type : [type];
      return Array.from(entities.values()).filter((e) => types.includes(e.entityType));
    },

    getChildren: (parentId: string) => {
      const parent = entities.get(parentId);
      if (!parent || !parent.childIds) return [];
      return parent.childIds.map((cId) => entities.get(cId)).filter(Boolean) as SemanticEntity[];
    },

    getParent: (entityId: string) => {
      const entity = entities.get(entityId);
      if (!entity || !entity.parentId) return undefined;
      return entities.get(entity.parentId);
    },

    getRelationshipsForEntity: (entityId: string) => {
      return relationships.filter((r) => r.sourceId === entityId || r.targetId === entityId);
    },

    getOutgoingRelationships: (sourceId: string) => {
      return relationships.filter((r) => r.sourceId === sourceId);
    },

    getIncomingRelationships: (targetId: string) => {
      return relationships.filter((r) => r.targetId === targetId);
    },

    getClassHierarchy: (classId: string) => {
      const hierarchy: SemanticEntity[] = [];
      let currentId: string | undefined = classId;
      const seen = new Set<string>();

      while (currentId && !seen.has(currentId)) {
        seen.add(currentId);
        const entity = entities.get(currentId);
        if (entity) {
          hierarchy.push(entity);
          // Look for 'extends' relationship
          const extRel = relationships.find((r) => r.sourceId === currentId && r.kind === 'extends');
          currentId = extRel?.targetId;
        } else {
          break;
        }
      }
      return hierarchy;
    },

    getActiveCallStack: () => {
      return Array.from(entities.values())
        .filter((e) => e.runtimeState?.executionStatus === 'active' || e.runtimeState?.executionStatus === 'suspended')
        .sort((a, b) => (a.runtimeState?.callStackDepth || 0) - (b.runtimeState?.callStackDepth || 0));
    },

    getHeapObjects: () => {
      return Array.from(entities.values()).filter(
        (e) => e.provenance === 'runtime' && (e.entityType === 'object' || e.entityType === 'array' || e.entityType === 'collection')
      );
    },

    getActiveRelationships: () => {
      return relationships.filter((r) => r.isActive);
    },

    searchEntities: (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return [];
      return Array.from(entities.values()).filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.qualifiedName.toLowerCase().includes(q) ||
          e.entityType.toLowerCase().includes(q)
      );
    },
  };

  return model;
}

function createEmptySemanticModel(): SemanticModel {
  return {
    entities: new Map(),
    relationships: [],
    activeStep: 0,
    sourceFiles: [],
    getEntity: () => undefined,
    getEntitiesByType: () => [],
    getChildren: () => [],
    getParent: () => undefined,
    getRelationshipsForEntity: () => [],
    getOutgoingRelationships: () => [],
    getIncomingRelationships: () => [],
    getClassHierarchy: () => [],
    getActiveCallStack: () => [],
    getHeapObjects: () => [],
    getActiveRelationships: () => [],
    searchEntities: () => [],
  };
}
