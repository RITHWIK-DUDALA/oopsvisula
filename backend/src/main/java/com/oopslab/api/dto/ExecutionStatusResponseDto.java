package com.oopslab.api.dto;

import com.oopslab.execution.model.ExecutionEvent;
import java.util.List;

public record ExecutionStatusResponseDto(
    String jobId,
    String status,
    List<String> errors,
    List<ExecutionEvent> events,
    String stdout,
    long durationMs
) {}
