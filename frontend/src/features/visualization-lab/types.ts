// Types for OOPS LAB 2D Interactive Java & OOP Visualization Laboratory
import type { Node, Edge } from '@xyflow/react';

export type EntityType =
  | 'class'
  | 'object'
  | 'method'
  | 'invocation'
  | 'variable'
  | 'array'
  | 'stack-frame'
  | 'heap-object'
  | 'package-group'
  | 'memory-region';

export type RelationshipType =
  | 'inheritance'
  | 'implementation'
  | 'composition'
  | 'aggregation'
  | 'association'
  | 'dependency'
  | 'invocation'
  | 'reference'
  | 'field-ref'
  | 'data-flow'
  | 'control-flow'
  | 'execution-sequence'
  | 'extends'
  | 'implements'
  | 'call'
  | 'allocates'
  | 'exception'
  | 'exception-flow'
  | 'thread-lock'
  | 'monitor'
  | 'string-intern'
  | 'collection-containment'
  | 'boxing'
  | 'unboxing';

export type MemberVisibility = '+' | '-' | '#' | '~' | 'public' | 'private' | 'protected' | 'package' | 'package-private';

export interface FieldItem {
  id?: string;
  name: string;
  type: string;
  visibility?: MemberVisibility;
  isStatic?: boolean;
  isFinal?: boolean;
  value?: string;
}

export interface MethodItem {
  id?: string;
  name: string;
  returnType: string;
  visibility?: MemberVisibility;
  parameters?: string[];
  isStatic?: boolean;
  isAbstract?: boolean;
  isFinal?: boolean;
}

export interface ConstructorItem {
  id?: string;
  name: string;
  parameters?: string[];
  visibility?: MemberVisibility;
}

export interface VisualEntityData {
  [key: string]: unknown;
  id: string;
  entityType: EntityType;
  name?: string;
  description?: string;
  sourceFile?: string;
  sourceLocation?: { line: number; column?: number };
  
  // Class specific
  classType?: 'class' | 'abstract-class' | 'abstract' | 'interface' | 'record' | 'enum';
  visibility?: 'public' | 'package' | 'protected' | 'private';
  packageName?: string;
  fields?: FieldItem[];
  constructors?: ConstructorItem[];
  methods?: MethodItem[];
  collapsedSections?: {
    fields?: boolean;
    constructors?: boolean;
    methods?: boolean;
  };

  // Object specific
  className?: string;
  simulatorAddress?: string;
  instanceFieldValues?: Record<string, string>;
  runtimeState?: 'active' | 'referenced' | 'unreachable' | 'garbage-collected';

  // Method specific
  declaringClass?: string;
  returnType?: string;
  parameters?: string[];
  isStatic?: boolean;
  isAbstract?: boolean;

  // Invocation specific
  invocationId?: string;
  methodId?: string;
  caller?: string;
  callee?: string;
  arguments?: Record<string, string>;
  returnValue?: string;
  executionState?: 'pending' | 'executing' | 'returned' | 'exception';

  // Variable specific
  variableType?: string;
  variableValue?: string;
  variableScope?: 'local' | 'field' | 'parameter' | 'static';
  referenceTargetId?: string | null;

  // Array specific
  arrayLength?: number;
  arrayCells?: { index: number; value: string; isHighlighted?: boolean }[];

  // Stack Frame specific
  frameId?: string;
  localVariables?: Record<string, string>;
  thisReference?: string;
  callerFrameId?: string;
  isTopFrame?: boolean;

  // Data Provenance (Section 8)
  provenanceCategory?: 'SOURCE' | 'STATIC ANALYSIS' | 'RUNTIME' | 'DERIVED' | 'SIMULATED' | 'METASPACE' | 'UNREACHABLE';
  provenanceOriginEvent?: string;
  provenanceSourceLocation?: string;
  provenanceConstructor?: string;
  provenanceMutations?: string[];

  // Rotation & dimensions
  rotation?: number; // 0, 90, 180, 270 or arbitrary deg
  width?: number;
  height?: number;
  groupId?: string;
}

export interface VisualRelationshipData {
  [key: string]: unknown;
  id: string;
  sourceId?: string;
  targetId?: string;
  type: RelationshipType;
  label?: string;
  multiplicity?: string;
  sourceMultiplicity?: string;
  targetMultiplicity?: string;
  routing?: 'orthogonal' | 'bezier' | 'straight';
  explanation?: string;
  color?: string;
  sequenceNumber?: number;
  provenanceCategory?: 'SOURCE' | 'STATIC ANALYSIS' | 'RUNTIME' | 'DERIVED' | 'SIMULATED' | 'METASPACE' | 'UNREACHABLE';
  provenanceOriginEvent?: string;
}

export type CategoryGroup =
  | 'GROUP 1 — OBJECT FUNDAMENTALS'
  | 'GROUP 2 — OBJECT-ORIENTED PROGRAMMING'
  | 'GROUP 3 — JAVA DATA STRUCTURES'
  | 'GROUP 4 — EXECUTION AND DEPENDENCIES';

export interface VisualizationCategory {
  id: string;
  code: string;
  title: string;
  group: CategoryGroup;
  description: string;
  defaultLayout: 'hierarchical' | 'tree' | 'circular' | 'grid' | 'dependency' | 'manual';
}

export interface EducationalContent {
  whatIsIt: string;
  whyIsItUsed: string;
  javaSyntax: string;
  howItWorks: string | string[];
  visualRepresentation: string;
  realWorldExample: string;
  commonMistakes: string | string[];
  challenge: string;
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  subtitle?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  learningObjective: string;
  javaSource: string;
  diagram: {
    nodes: Node<VisualEntityData>[];
    edges: Edge<VisualRelationshipData>[];
  };
  educational: EducationalContent;
  highlightNodeId?: string;
}

export interface SubsectionDefinition {
  id: string;
  code: string;
  title: string;
  moduleId: string;
  scenarios: ScenarioDefinition[];
}

export interface WorkspaceState {
  id: string;
  name: string;
  activeCategoryId: string;
  zoom: number;
  pan: { x: number; y: number };
  snapToGrid: boolean;
  showGrid: boolean;
  selectedEntityIds: string[];
  selectedRelationshipIds: string[];
  inspectorCollapsed: boolean;
  libraryCollapsed: boolean;
  lastSavedAt?: string;
}
