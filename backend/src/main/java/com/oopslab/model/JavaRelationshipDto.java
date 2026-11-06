package com.oopslab.model;

import java.util.Map;

public record JavaRelationshipDto(
    String id,
    String sourceId,
    String targetId,
    String kind,
    String provenance,
    SourceLocationDto sourceLocation,
    Map<String, Object> metadata
) {}

