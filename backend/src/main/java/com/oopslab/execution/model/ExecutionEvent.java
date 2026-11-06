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
    List<ThreadSnapshot> threads,
    String stdout,
    String errorMessage
) {
    public ExecutionEvent(
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
        this(step, type, line, methodName, className, description, stackFrames, heapObjects, List.of(), stdout, errorMessage);
    }

    public record ThreadSnapshot(
        String threadId,
        String name,
        String state,
        List<StackFrameSnapshot> callStack,
        boolean isCurrent,
        String lockAcquired,
        String lockWaitingOn
    ) {}

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

