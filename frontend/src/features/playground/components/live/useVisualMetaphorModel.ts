import { useMemo } from 'react';
import { ExecutionEvent, HeapObjectSnapshot, StackFrameSnapshot, ReferencePointer, ThreadSnapshot } from '@/types/execution';
import { computeCollisionFreeLayout, EntityLayoutInput } from './layoutEngine';
import { buildExactFieldConnectors, ExactFieldReference, RoutedConnector, CardRect } from './connectorRouter';

export type MetaphorType = 
  | 'factory-product'     // Standard instantiated object
  | 'vault-encapsulated'  // Private fields with public mutating methods
  | 'chassis-inherited'   // Extends parent class (modular base + extension)
  | 'docked-composite'    // Contains references to other heap objects (composition)
  | 'record-crystal';     // Immutable Java 21 Record

export interface VisualField {
  name: string;
  type: string;
  value: string;
  isMutated: boolean;
  isReference: boolean;
  targetAddress?: string;
}

export interface VisualEntity {
  id: string; // Heap address e.g. "@0x2F1A" or "OBJ-001"
  className: string;
  simpleName: string;
  metaphorType: MetaphorType;
  fields: VisualField[];
  isNew: boolean;
  isMutated: boolean;
  isHighlighted: boolean;
  parentClass?: string;
  isRecord?: boolean;
  // Canvas coordinate placements
  x: number;
  y: number;
  width: number;
  height: number;
  // 3D coordinates
  pos3D: [number, number, number];
}

export interface VisualTether {
  id: string;
  sourceVarName: string;
  sourceType: 'stack' | 'heap';
  sourceAddress?: string;
  sourceFieldIdx?: number;
  targetAddress: string;
  color: string;
  isActive: boolean;
}

export interface VisualConduit {
  id: string;
  methodName: string;
  className: string;
  direction: 'in' | 'out' | 'pulse';
  payload?: string;
  isActive: boolean;
}

export interface VisualWorker {
  threadId: string;
  name: string;
  state: string;
  isCurrent: boolean;
  lockedResource?: string;
  waitingOnResource?: string;
  laneIndex: number;
}

export interface VisualAlert {
  isException: boolean;
  type?: string;
  message?: string;
  status: 'none' | 'thrown' | 'caught';
}

export interface VisualMetaphorModel {
  entities: VisualEntity[];
  tethers: VisualTether[];
  exactConnectors: RoutedConnector[];
  conduit: VisualConduit | null;
  workers: VisualWorker[];
  alert: VisualAlert;
  activeEntity: VisualEntity | null;
  hasObjects: boolean;
  heapCountMismatch: boolean;
  expectedHeapCount: number;
}

/**
 * useVisualMetaphorModel
 * 
 * Dynamic mapping engine that converts raw JVM ExecutionEvents, Heap snapshots,
 * Stack frames, and AST relationships into tangible physical metaphors.
 * Works dynamically with arbitrary user-submitted Java code (no hardcoding).
 */
export function useVisualMetaphorModel(
  currentEvent: ExecutionEvent | null,
  heapObjects: HeapObjectSnapshot[],
  topFrame: StackFrameSnapshot | null,
  references: ReferencePointer[],
  threads?: ThreadSnapshot[],
  selectedObjectId?: string | null,
  sessionId?: string
): VisualMetaphorModel {
  return useMemo(() => {
    // 1. Build Raw Visual Entities from Heap Snapshots (1:1 with runtime heap)
    const rawEntities = (heapObjects || []).map((obj, index) => {
      const address = obj.address || `@0x${(index + 1).toString(16).padStart(4, '0')}`;
      const className = obj.className || 'Object';
      const simpleName = className.split('.').pop() || className;

      // Infer Metaphor Type dynamically based on object attributes
      let metaphorType: MetaphorType = 'factory-product';
      const isRecord = className.toLowerCase().includes('record') || simpleName.startsWith('Point') || simpleName.includes('Data');
      const hasInheritance = className.includes('extends') || className.includes('(') || Boolean(obj.fields?.some(f => f.name.includes('super') || f.name.includes('parent')));
      const hasCompositeRefs = obj.fields?.some(f => f.isReference && f.targetAddress);
      const isEncapsulated = obj.fields?.some(f => !f.name.startsWith('public') && (f.isMutated || obj.mutatedFieldNames?.includes(f.name)));

      if (isRecord) {
        metaphorType = 'record-crystal';
      } else if (hasInheritance) {
        metaphorType = 'chassis-inherited';
      } else if (hasCompositeRefs) {
        metaphorType = 'docked-composite';
      } else if (isEncapsulated || simpleName.includes('Account') || simpleName.includes('Vault') || simpleName.includes('Bank')) {
        metaphorType = 'vault-encapsulated';
      }

      // Check if newly allocated in the current event
      const isNew = Boolean(obj.isNew || (currentEvent?.type === 'OBJECT_ALLOCATED' && (currentEvent.description.includes(simpleName) || currentEvent.whatHappened?.includes(simpleName))));

      // Map fields with mutation flags
      const fields: VisualField[] = (obj.fields || []).map((f) => {
        const isMutated = Boolean(f.isMutated || obj.mutatedFieldNames?.includes(f.name) || (currentEvent?.type === 'FIELD_MUTATED' && currentEvent.description.includes(f.name)));
        return {
          name: f.name.replace(/\s*\(super\)/i, ''),
          type: f.type || 'Object',
          value: f.value !== null && f.value !== undefined ? String(f.value) : 'null',
          isMutated,
          isReference: Boolean(f.isReference),
          targetAddress: f.targetAddress,
        };
      });

      const isMutated = fields.some(f => f.isMutated);
      const isHighlighted = selectedObjectId === address || (currentEvent?.description.includes(simpleName) ?? false);

      const referencesTo = fields.filter(f => f.isReference && f.targetAddress).map(f => f.targetAddress!);

      return {
        id: address,
        className,
        simpleName,
        metaphorType,
        fields,
        isNew,
        isMutated,
        isHighlighted,
        isRecord,
        referencesTo,
      };
    });

    // Trace incoming references (referencedBy) for layout grouping
    const referencedByMap = new Map<string, string[]>();
    rawEntities.forEach(ent => {
      ent.referencesTo.forEach(targetId => {
        const list = referencedByMap.get(targetId) || [];
        list.push(ent.id);
        referencedByMap.set(targetId, list);
      });
    });

    const layoutInputs: EntityLayoutInput[] = rawEntities.map(e => ({
      id: e.id,
      className: e.className,
      simpleName: e.simpleName,
      metaphorType: e.metaphorType,
      fields: e.fields,
      referencesTo: e.referencesTo,
      referencedBy: referencedByMap.get(e.id) || [],
    }));

    // Deterministic collision-free positioning across unbounded virtual canvas
    const layoutPositions = computeCollisionFreeLayout(layoutInputs, sessionId);

    const entities: VisualEntity[] = rawEntities.map(e => {
      const pos = layoutPositions.get(e.id) || { x: 60, y: 60, width: 340, height: 200 };
      const pos3D: [number, number, number] = [
        ((pos.x - 200) / 120),
        0,
        -((pos.y - 60) / 100),
      ];

      return {
        id: e.id,
        className: e.className,
        simpleName: e.simpleName,
        metaphorType: e.metaphorType,
        fields: e.fields,
        isNew: e.isNew,
        isMutated: e.isMutated,
        isHighlighted: e.isHighlighted,
        isRecord: e.isRecord,
        x: pos.x,
        y: pos.y,
        width: pos.width,
        height: pos.height,
        pos3D,
      };
    });

    // 2. Build Exact Field-to-Object Reference Connectors
    const activeAddressSet = new Set(entities.map(e => e.id));
    const exactFieldReferences: ExactFieldReference[] = [];

    rawEntities.forEach(sourceEnt => {
      sourceEnt.fields.forEach((field, fieldIdx) => {
        // Only draw reference arrows for actual object references pointing to an active heap entity
        if (field.isReference && field.targetAddress && activeAddressSet.has(field.targetAddress)) {
          const isActivelyUsed = Boolean(
            currentEvent?.description.includes(field.name) ||
            currentEvent?.whatChanged?.includes(field.name) ||
            selectedObjectId === sourceEnt.id ||
            selectedObjectId === field.targetAddress
          );

          exactFieldReferences.push({
            id: `ref-${sourceEnt.id}.${field.name}->${field.targetAddress}`,
            sourceObjectId: sourceEnt.id,
            sourceFieldName: field.name,
            sourceFieldIdx: fieldIdx,
            destinationObjectId: field.targetAddress,
            connectorType: 'reference',
            isActive: isActivelyUsed,
          });
        }
      });
    });

    // Map cards for obstacle detection and anchor placement
    const cardRectMap = new Map<string, CardRect>();
    entities.forEach(ent => {
      cardRectMap.set(ent.id, {
        id: ent.id,
        x: ent.x,
        y: ent.y,
        width: ent.width,
        height: ent.height,
        metaphorType: ent.metaphorType,
      });
    });

    // Route connectors using obstacle-avoidance routing (zero card-interior collisions)
    const exactConnectors = buildExactFieldConnectors(
      exactFieldReferences,
      cardRectMap,
      selectedObjectId
    );

    // 3. Build Visual Tethers (Reference Docks from Variables to Entities)
    const tethers: VisualTether[] = [];
    const colorPalette = ['#2563EB', '#D97706', '#059669', '#4F46E5', '#7C3AED', '#0284C7'];

    if (topFrame?.localVariables) {
      topFrame.localVariables.forEach((variable, idx) => {
        if (variable.isReference && variable.targetAddress && activeAddressSet.has(variable.targetAddress)) {
          const color = colorPalette[idx % colorPalette.length];
          const isActivelyUsed = Boolean(
            currentEvent?.description.includes(variable.name) || 
            currentEvent?.whatChanged?.includes(variable.name) ||
            selectedObjectId === variable.targetAddress
          );

          tethers.push({
            id: `tether-var-${variable.name}-${variable.targetAddress}`,
            sourceVarName: variable.name,
            sourceType: 'stack',
            targetAddress: variable.targetAddress,
            color,
            isActive: isActivelyUsed,
          });
        }
      });
    }

    // 4. Method Conduit & Travelling Data Capsule
    let conduit: VisualConduit | null = null;
    if (currentEvent) {
      if (currentEvent.type === 'FRAME_PUSH' || currentEvent.type === 'STEP_ENTER') {
        conduit = {
          id: `conduit-${currentEvent.step}`,
          methodName: currentEvent.methodName || 'invoke',
          className: currentEvent.className || 'Program',
          direction: 'in',
          payload: currentEvent.description,
          isActive: true,
        };
      } else if (currentEvent.type === 'FRAME_POP') {
        conduit = {
          id: `conduit-${currentEvent.step}`,
          methodName: currentEvent.methodName || 'return',
          className: currentEvent.className || 'Program',
          direction: 'out',
          payload: currentEvent.whatChanged || 'Return value',
          isActive: true,
        };
      } else if (currentEvent.oopConceptNote?.concept.toLowerCase().includes('polymorph')) {
        conduit = {
          id: `conduit-poly-${currentEvent.step}`,
          methodName: currentEvent.methodName || 'dispatch',
          className: currentEvent.className || 'vtable',
          direction: 'pulse',
          payload: 'Dynamic Dispatch Pulse',
          isActive: true,
        };
      }
    }

    // 5. Multithreading Workers & Lock Stations
    const workers: VisualWorker[] = (threads || []).map((t, idx) => ({
      threadId: t.threadId,
      name: t.name,
      state: t.state,
      isCurrent: Boolean(t.isCurrent),
      lockedResource: t.lockAcquired,
      waitingOnResource: t.lockWaitingOn,
      laneIndex: idx,
    }));

    if (workers.length === 0 && currentEvent?.type.startsWith('THREAD_')) {
      workers.push({
        threadId: 'thread-main',
        name: 'main',
        state: 'RUNNABLE',
        isCurrent: true,
        laneIndex: 0,
      });
    }

    // 6. Exception Alerts
    const alert: VisualAlert = {
      isException: currentEvent?.type === 'EXCEPTION_THROWN' || currentEvent?.type === 'EXCEPTION_CAUGHT',
      type: currentEvent?.type === 'EXCEPTION_THROWN' ? 'Exception Thrown' : currentEvent?.type === 'EXCEPTION_CAUGHT' ? 'Exception Caught' : undefined,
      message: currentEvent?.description,
      status: currentEvent?.type === 'EXCEPTION_THROWN' ? 'thrown' : currentEvent?.type === 'EXCEPTION_CAUGHT' ? 'caught' : 'none',
    };

    const activeEntity = entities.find(e => e.id === selectedObjectId) || entities[0] || null;
    const expectedHeapCount = (heapObjects || []).length;
    const heapCountMismatch = entities.length !== expectedHeapCount;

    return {
      entities,
      tethers,
      exactConnectors,
      conduit,
      workers,
      alert,
      activeEntity,
      hasObjects: entities.length > 0,
      heapCountMismatch,
      expectedHeapCount,
    };
  }, [currentEvent, heapObjects, topFrame, references, threads, selectedObjectId, sessionId]);
}
