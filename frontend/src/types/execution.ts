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
  | 'STDOUT'
  | 'STDERR'
  | 'EXCEPTION_THROWN'
  | 'EXECUTION_COMPLETED';

export interface LocalVariableSnapshot {
  name: string;
  type: string;
  value: string | number | boolean | null;
  isReference: boolean;
  targetAddress?: string; // e.g. "@0x2F1A"
}

export interface StackFrameSnapshot {
  frameId: string;
  methodName: string;
  className: string;
  line: number;
  localVariables: LocalVariableSnapshot[];
}

export interface ObjectFieldSnapshot {
  name: string;
  type: string;
  value: string | number | boolean | null;
  isReference: boolean;
  targetAddress?: string; // e.g. "@0x8E3B"
}

export interface HeapObjectSnapshot {
  address: string; // e.g. "@0x2F1A"
  className: string;
  colorTag?: string; // Optional monochrome tint
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
  methodName: string;
  className: string;
  description: string;
  stackFrames: StackFrameSnapshot[];
  heapObjects: HeapObjectSnapshot[];
  stdout?: string;
  errorMessage?: string;
  timestampMs?: number;
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
