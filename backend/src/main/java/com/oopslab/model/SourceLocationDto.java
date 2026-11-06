package com.oopslab.model;

public record SourceLocationDto(
    String file,
    int line,
    int column,
    int endLine,
    int endColumn
) {}

