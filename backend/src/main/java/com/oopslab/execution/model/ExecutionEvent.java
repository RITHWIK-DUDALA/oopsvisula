package com.oopslab.execution.model;

import java.util.List;

public record ExecutionEvent(
    int step,
    ExecutionEventType type,
    int line,
    String methodName,
    String className,
    String description,
    List<StackFrameSnapshot> stackFrames,
    List<HeapObjectSnapshot> heapObjects,
    String stdout,
    String errorMessage
) {
    public record LocalVarSnapshot(
        String name,
        String type,
        Object value,
        boolean isReference,
        String targetAddress
    ) {}

    public record StackFrameSnapshot(
        String frameId,
        String methodName,
        String className,
        int line,
        List<LocalVarSnapshot> localVariables
    ) {}

    public record ObjectFieldSnapshot(
        String name,
        String type,
        Object value,
        boolean isReference,
        String targetAddress
    ) {}

    public record HeapObjectSnapshot(
        String address,
        String className,
        List<ObjectFieldSnapshot> fields
    ) {}
}
