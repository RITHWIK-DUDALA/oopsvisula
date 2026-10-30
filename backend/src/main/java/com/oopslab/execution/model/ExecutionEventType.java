package com.oopslab.execution.model;

public enum ExecutionEventType {
    STEP_ENTER,
    FRAME_PUSH,
    FRAME_POP,
    OBJECT_ALLOCATED,
    FIELD_MUTATED,
    STDOUT,
    STDERR,
    EXCEPTION_THROWN,
    EXECUTION_COMPLETED
}

