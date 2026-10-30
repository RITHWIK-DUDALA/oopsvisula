package com.oopslab.api.dto;

import java.util.List;

public record AstValidationResultDto(
    boolean valid,
    List<String> violations,
    String primaryClassName,
    int classCount,
    long parseTimeMs
) {
    public static AstValidationResultDto success(String primaryClassName, int classCount, long parseTimeMs) {
        return new AstValidationResultDto(true, List.of(), primaryClassName, classCount, parseTimeMs);
    }

    public static AstValidationResultDto failed(List<String> violations, long parseTimeMs) {
        return new AstValidationResultDto(false, violations, null, 0, parseTimeMs);
    }
}
