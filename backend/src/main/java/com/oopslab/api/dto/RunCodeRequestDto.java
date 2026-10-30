package com.oopslab.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RunCodeRequestDto(
    @NotBlank(message = "sourceCode must not be blank")
    @Size(max = 65536, message = "sourceCode size limit is 64KB")
    String sourceCode,

    String languageVersion
) {}

