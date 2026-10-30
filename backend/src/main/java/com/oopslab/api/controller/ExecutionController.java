package com.oopslab.api.controller;

import com.oopslab.api.dto.ExecutionStatusResponseDto;
import com.oopslab.api.dto.RunCodeRequestDto;
import com.oopslab.execution.service.ExecutionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/execution")
public class ExecutionController {

    private final ExecutionService executionService;

    public ExecutionController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping("/run")
    public ResponseEntity<ExecutionStatusResponseDto> runCode(@Valid @RequestBody RunCodeRequestDto request) {
        ExecutionStatusResponseDto result = executionService.submitJob(request.sourceCode());
        if ("REJECTED".equals(result.status())) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status/{jobId}")
    public ResponseEntity<ExecutionStatusResponseDto> getStatus(@PathVariable String jobId) {
        ExecutionStatusResponseDto status = executionService.getJobStatus(jobId);
        if ("NOT_FOUND".equals(status.status())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(status);
    }
}
