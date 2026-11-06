package com.oopslab.model;

import java.util.Map;

public record JavaEntityDto(
    String id,
    String kind,
    String name,
    String declaredType,
    String runtimeType,
    SourceLocationDto sourceLocation,
    String provenance,
    Map<String, Object> metadata
) {}

