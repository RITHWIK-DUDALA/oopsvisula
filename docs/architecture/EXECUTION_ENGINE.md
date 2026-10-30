# EXECUTION ENGINE & SANDBOX ARCHITECTURE — OOPS LAB
**Runtime:** Java 21 LTS Isolated Sandbox  
**Inspection:** Java Debug Interface (JDI) Step Tracer  
**Queue:** Redis List / Stream  

---

## 1. Execution Flow & Architecture

The execution engine is responsible for compiling and running student-submitted code safely and extracting deterministic execution events.

```mermaid
sequenceDiagram
    participant User as Browser (React)
    participant API as Spring Boot API
    participant Redis as Redis Job Queue
    participant Worker as Execution Worker
    participant JVM as Hardened Java 21 Sandbox

    User->>API: POST /api/v1/execution/run { code }
    API->>API: JavaParser AST Security Validation
    API->>Redis: RPUSH execution_queue { jobId, code }
    API-->>User: 202 Accepted { jobId }
    
    Worker->>Redis: BLPOP execution_queue
    Worker->>JVM: Spawn isolated process (cgroups: 256MB, 1 CPU, net=none)
    Worker->>JVM: Compile with javac --release 21
    alt Compilation Failed
        Worker-->>Redis: SET execution_result:{jobId} { error, compilerMessages }
    else Compilation Succeeded
        Worker->>JVM: Launch JVM with JDI agent (-agentlib:jdwp=transport=dt_socket...)
        Worker->>JVM: Step instruction-by-instruction
        loop Execution Steps
            JVM-->>Worker: JDI StepEvent / MethodEntryEvent / FieldAccessEvent
            Worker->>Worker: Map JVM stack & heap state to ExecutionEvent
        end
        Worker-->>Redis: SET execution_result:{jobId} { events[], stdout, duration }
    end
    
    User->>API: GET /api/v1/execution/status/{jobId} (or WebSocket)
    API-->>User: JSON { events: [...] }
```

---

## 2. Typed Execution Event Schema

Every execution event captured by the worker is serialized into a standard typed JSON format consumed by the frontend visualizer:

```typescript
export type ExecutionEventType = 
  | 'STEP_ENTER'
  | 'FRAME_PUSH'
  | 'FRAME_POP'
  | 'OBJECT_ALLOCATED'
  | 'FIELD_MUTATED'
  | 'STDOUT'
  | 'STDERR'
  | 'EXCEPTION_THROWN'
  | 'EXECUTION_COMPLETED';

export interface ExecutionEvent {
  step: number;
  type: ExecutionEventType;
  line: number;
  methodName: string;
  className: string;
  
  // Call stack state
  stackFrames: {
    frameId: string;
    methodName: string;
    className: string;
    line: number;
    localVariables: {
      name: string;
      type: string;
      value: string | number | boolean | null;
      isReference: boolean;
      targetAddress?: string; // e.g. "@0x1B82"
    }[];
  }[];

  // Heap state
  heapObjects: {
    address: string;          // e.g. "@0x1B82"
    className: string;
    fields: {
      name: string;
      type: string;
      value: string | number | boolean | null;
      isReference: boolean;
      targetAddress?: string;
    }[];
  }[];

  stdout?: string;
  errorMessage?: string;
}
```

---

## 3. Worker Security Constraints & Caps

1. **Memory Ceiling:** 256 MB maximum resident memory per run.
2. **CPU Limit:** 1 virtual core pinned.
3. **Execution Timeout:** 5000 ms wall-clock time limit. Runs exceeding this limit are terminated with a `TIMEOUT_EXCEEDED` event.
4. **Output Limit:** Maximum 64 KB of combined stdout/stderr to prevent buffer-exhaustion attacks.
5. **Network Disabled:** Docker container flag `--network none` or Linux unshare `CLONE_NEWNET`.
6. **Filesystem Sandbox:** Ephemeral overlayfs mount. Filesystem is discarded immediately upon run completion.

