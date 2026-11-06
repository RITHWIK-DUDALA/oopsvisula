/**
 * OOPS LAB — Typed Execution Event Schema
 * Conforms to docs/architecture/EXECUTION_ENGINE.md
 */

export type ExecutionEventType =
  | 'STEP_ENTER'
  | 'FRAME_PUSH'
  | 'FRAME_POP'
  | 'OBJECT_ALLOCATED'
  | 'FIELD_MUTATED'
  | 'BRANCH_TAKEN'
  | 'LOOP_ITERATION'
  | 'THREAD_START'
  | 'THREAD_TERMINATED'
  | 'LOCK_ACQUIRED'
  | 'LOCK_RELEASED'
  | 'STDOUT'
  | 'STDERR'
  | 'EXCEPTION_THROWN'
  | 'EXCEPTION_CAUGHT'
  | 'EXECUTION_COMPLETED';

export type ThreadState = 'NEW' | 'RUNNABLE' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED';

export interface ThreadSnapshot {
  threadId: string; // e.g. "thread-main", "thread-worker-1"
  name: string; // "main", "Thread-0", "Worker-1"
  state: ThreadState;
  callStack: StackFrameSnapshot[];
  isCurrent: boolean;
  lockAcquired?: string; // lock ID or object address
  lockWaitingOn?: string;
}

export interface LocalVariableSnapshot {
  name: string;
  type: string;
  value: string | number | boolean | null;
  isReference: boolean;
  targetAddress?: string; // e.g. "@0x2F1A" or "OBJ-001"
}

export interface StackFrameSnapshot {
  frameId: string;
  methodName: string;
  className: string;
  line: number;
  file?: string;
  isTop?: boolean;
  status?: 'active' | 'suspended' | 'waiting';
  localVariables: LocalVariableSnapshot[];
}

export interface ObjectFieldSnapshot {
  name: string;
  type: string;
  value: string | number | boolean | null;
  previousValue?: string | number | boolean | null;
  isMutated?: boolean;
  isReference: boolean;
  targetAddress?: string; // e.g. "@0x8E3B" or "OBJ-001"
}

export interface HeapObjectSnapshot {
  id?: string; // e.g. "OBJ-001"
  address: string; // e.g. "@0x1001"
  className: string;
  colorTag?: string; // Optional monochrome tint
  isNew?: boolean;
  mutatedFieldNames?: string[];
  fields: ObjectFieldSnapshot[];
}

export interface ReferencePointer {
  sourceType: 'stack' | 'heap';
  sourceFrameId?: string;
  sourceVarName?: string;
  sourceHeapAddress?: string;
  sourceFieldName?: string;
  targetAddress: string;
  label: string;
}

export interface ExecutionEvent {
  step: number;
  type: ExecutionEventType;
  line: number;
  column?: number;
  file?: string;
  methodName: string;
  className: string;
  description: string;
  whatHappened?: string; // Level 1: Beginner-friendly description of what occurred
  whyItHappened?: string; // Level 2: Java language & JVM mechanics explanation
  whatChanged?: string; // Level 3: Concrete state transition delta (variables, heap, stack)
  oopConceptNote?: {
    concept: string;
    title: string;
    explanation: string;
    evidence?: string;
  };
  stackFrames: StackFrameSnapshot[];
  heapObjects: HeapObjectSnapshot[];
  threads?: ThreadSnapshot[];
  stdout?: string;
  errorMessage?: string;
  timestampMs?: number;
  mutatedField?: {
    objectAddress: string;
    fieldName: string;
    previousValue: string | number | boolean | null;
    newValue: string | number | boolean | null;
  };
  allocatedObjectId?: string;
  isException?: boolean;
  exceptionDetail?: {
    className: string;
    message: string;
    line: number;
    file?: string;
  };
}

export interface ExecutionTrace {
  id: string;
  programTitle: string;
  sourceCode: string;
  totalSteps: number;
  events: ExecutionEvent[];
  stdoutAggregate: string;
  durationMs: number;
}

