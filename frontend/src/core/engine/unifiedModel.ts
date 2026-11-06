/**
 * OOPS LAB — UNIFIED ENTITY, RELATIONSHIP & PROVENANCE MODEL
 * Canonical semantic data model conforming to Master Prompt Section 4 & Section 8.
 * Shared across all 26 visualization modules, 2D/3D renderers, AST parsers, and runtime tracers.
 */

export type EntityKind =
  | 'class'
  | 'abstract-class'
  | 'interface'
  | 'record'
  | 'enum'
  | 'object'
  | 'variable'
  | 'field'
  | 'method'
  | 'constructor'
  | 'array'
  | 'collection'
  | 'thread'
  | 'exception';

export type Provenance =
  | 'source'
  | 'static-analysis'
  | 'runtime'
  | 'derived'
  | 'simulated';

export interface SourceLocation {
  file: string;
  line: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
}

export interface JavaEntity {
  /** Canonical deterministic identifier (e.g. `class-Student`, `field-Student-id`, `obj-001`) */
  id: string;
  kind: EntityKind;
  name: string;
  declaredType?: string;
  runtimeType?: string;
  sourceLocation?: SourceLocation;
  provenance: Provenance;
  metadata: Record<string, unknown>;
}

export type RelationshipKind =
  | 'reference'
  | 'creation'
  | 'instantiation'
  | 'inheritance'
  | 'implementation'
  | 'association'
  | 'aggregation'
  | 'composition'
  | 'dependency'
  | 'method-call'
  | 'field-access';

export interface JavaRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  kind: RelationshipKind;
  provenance: Provenance;
  sourceLocation?: {
    file: string;
    line: number;
  };
  metadata?: Record<string, unknown>;
}

export interface RuntimeEvent {
  id: string;
  sequence: number;
  type:
    | 'PROGRAM_START'
    | 'CLASS_LOAD'
    | 'OBJECT_ALLOCATION'
    | 'CONSTRUCTOR_ENTER'
    | 'CONSTRUCTOR_EXIT'
    | 'METHOD_ENTER'
    | 'METHOD_EXIT'
    | 'LOCAL_VAR_WRITE'
    | 'FIELD_READ'
    | 'FIELD_WRITE'
    | 'REFERENCE_ASSIGN'
    | 'ARRAY_CREATE'
    | 'ARRAY_MUTATE'
    | 'STATIC_FIELD_CHANGE'
    | 'EXCEPTION_THROW'
    | 'EXCEPTION_CATCH'
    | 'THREAD_CREATE'
    | 'THREAD_STATE_CHANGE'
    | 'PROGRAM_TERMINATION';
  entityIds: string[];
  sourceLocation?: {
    file: string;
    line: number;
  };
  provenance: 'runtime' | 'derived' | 'simulated';
  data: Record<string, unknown>;
}

export interface AstInvocation {
  id: string;
  scopeId: string;
  callerClass?: string;
  targetExpression: string; // e.g. "service.processDeposit", "validate", "System.out.println"
  objectName?: string; // e.g. "service" or "account"
  methodName: string; // e.g. "processDeposit" or "println"
  arguments: string[];
  location: SourceLocation;
}

export interface AstMutation {
  id: string;
  scopeId?: string;
  targetEntityId?: string;
  targetExpression: string;
  operator: '=' | '+=' | '-=';
  valueExpression: string;
  location: SourceLocation;
}

export interface AstStatement {
  id: string;
  kind:
    | 'declaration'
    | 'allocation'
    | 'invocation'
    | 'mutation'
    | 'return'
    | 'print'
    | 'branch'
    | 'loop'
    | 'exception'
    | 'try'
    | 'catch'
    | 'finally'
    | 'switch'
    | 'break'
    | 'synchronized'
    | 'other';
  line: number;
  file?: string;
  rawText: string;
  scopeId: string;
  targetClass?: string;
  variableType?: string;
  variableName?: string;
  targetExpression?: string;
  methodName?: string;
  arguments?: string[];
  operator?: '=' | '+=' | '-=' | '*=' | '/=' | '%=';
  valueExpression?: string;
  condition?: string;
  loopType?: 'for' | 'while' | 'do-while' | 'for-each';
  loopInit?: string;
  loopUpdate?: string;
  forEachItemVar?: string;
  forEachItemType?: string;
  forEachCollection?: string;
  catchExceptionType?: string;
  catchExceptionVar?: string;
  switchExpression?: string;
  syncLockExpression?: string;
  bodyStatements?: AstStatement[];
}

export type ExecutionStatus =
  | 'idle'
  | 'editing'
  | 'compiling'
  | 'compile-error'
  | 'ready'
  | 'running'
  | 'paused'
  | 'completed'
  | 'runtime-error'
  | 'stale';

export interface ConsoleEntry {
  id: string;
  sessionId: string;
  revision: number;
  type: 'stdout' | 'stderr' | 'system' | 'diagnostic';
  text: string;
  timestamp: number;
  sourceLocation?: { file: string; line: number };
}

/**
 * Complete AST analysis representation emitted by Java parser & semantic analyzer
 */
export interface ParsedJavaProgram {
  entities: JavaEntity[];
  relationships: JavaRelationship[];
  classes: JavaEntity[];
  fields: JavaEntity[];
  constructors: JavaEntity[];
  methods: JavaEntity[];
  variables: JavaEntity[];
  allocations: {
    id: string;
    targetClass: string;
    arguments: string[];
    variableName?: string;
    location: SourceLocation;
  }[];
  mutations: AstMutation[];
  invocations: AstInvocation[];
  statements: AstStatement[];
  sourceCode: string;
}

export interface ExecutionSession {
  sessionId: string;
  projectRevision: number;
  compiledRevision: number;
  executedRevision: number;
  status: ExecutionStatus;
  javaVersion: string;
  currentEventId: string | null;
  currentSourceLocation: SourceLocation | null;
  events: RuntimeEvent[];
  programModel: ParsedJavaProgram | null;
  consoleOutput: ConsoleEntry[];
  compilationError: string | null;
  startedAt?: number;
  completedAt?: number;
}

