package com.oopslab.execution.model;

import java.util.List;

public class ExecutionJob {
    private final String jobId;
    private final String sourceCode;
    private String status; // QUEUED, RUNNING, COMPLETED, FAILED, REJECTED
    private List<String> errors;
    private List<ExecutionEvent> events;
    private String stdout;
    private long durationMs;

    public ExecutionJob(String jobId, String sourceCode) {
        this.jobId = jobId;
        this.sourceCode = sourceCode;
        this.status = "QUEUED";
    }

    public String getJobId() { return jobId; }
    public String getSourceCode() { return sourceCode; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<String> getErrors() { return errors; }
    public void setErrors(List<String> errors) { this.errors = errors; }
    public List<ExecutionEvent> getEvents() { return events; }
    public void setEvents(List<ExecutionEvent> events) { this.events = events; }
    public String getStdout() { return stdout; }
    public void setStdout(String stdout) { this.stdout = stdout; }
    public long getDurationMs() { return durationMs; }
    public void setDurationMs(long durationMs) { this.durationMs = durationMs; }
}
