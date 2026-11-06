package com.oopslab.model;

import java.util.List;

public record ParsedAstDto(
    boolean valid,
    List<String> errors,
    String primaryClassName,
    List<JavaEntityDto> entities,
    List<JavaRelationshipDto> relationships,
    long parseTimeMs
) {
    public static ParsedAstDto failed(List<String> errors, long parseTimeMs) {
        return new ParsedAstDto(false, errors, null, List.of(), List.of(), parseTimeMs);
    }
}

