# OOPS LAB — PLAYGROUND MASTER TECHNICAL AUDIT REPORT
**Audit Date:** 2026-11-05  
**Auditor:** Principal Software Architect & Lead Systems Engineer  
**Status:** COMPLETE AUDIT ACROSS ALL 22 TECHNICAL SUBSYSTEMS

---

## Executive Summary
This audit provides a comprehensive, rigorous technical evaluation of the OOPS LAB Playground codebase across all 22 required architectural layers. The goal is to identify root causes of template-driven behavior, inaccurate type resolution, relationship misclassifications, and execution desynchronization, establishing concrete engineering fixes rather than surface visual patches.

---

## 1. Subsystem-by-Subsystem Audit Matrix (22 Areas)

### 1. Java Code Editor
- **Current State:** Monaco Editor wrapped in `JavaEditor.tsx` with custom `oops-light` theme and tab management.
- **Root Cause & Incorrect Behavior:**
  1. Editor re-renders on file change without debouncing active file dirty states, occasionally resetting cursor position.
  2. Missing automatic diagnostic marker synchronization from the backend/compiler service.
- **Affected Files & Functions:** `frontend/src/features/playground/components/JavaEditor.tsx` (`handleEditorMount`, `onChange`).
- **Required Correction:** Preserve editor cursor/scroll position across re-renders; bind Monaco `editor.setModelMarkers()` directly to compiler diagnostics.
- **Regression Test:** `test_editor_markers.ts` — verify syntax errors in arbitrary code set gutter glyphs without throwing exceptions.

### 2. Project Explorer & File Tree
- **Current State:** `ProjectExplorer.tsx` manages `projectFiles` in Zustand store.
- **Root Cause & Incorrect Behavior:**
  1. Initial state defaulted to `defaultBankingMultiFile`, forcing predefined templates onto students.
  2. Package folders are flattened instead of forming hierarchical subtrees.
- **Affected Files & Functions:** `simulationStore.ts` (initial state), `ProjectExplorer.tsx`.
- **Required Correction:** Default to a clean project (`Main.java`). Support hierarchical directory structure based on `package` declarations.
- **Regression Test:** Verify fresh workspace opens with single clean `Main.java` and allows adding `com/model/User.java`.

### 3. Java AST Parsing
- **Current State:** Client-side `JavaAstParser.ts` uses regex scanning; backend `AstAnalysisService.java` uses `com.github.javaparser.JavaParser`.
- **Root Cause & Incorrect Behavior:**
  1. Client-side parser uses regular expressions which can misidentify methods inside commented blocks or string literals.
  2. Generic types with nested brackets (`Map<String, List<Integer>>`) can get truncated.
- **Affected Files & Functions:** `frontend/src/core/engine/javaAstParser.ts` (`parse`, `parseMethodOrCtorBody`).
- **Required Correction:** Replace regex-based scanner with structured tokenizer or connect to backend JavaParser AST endpoint `/api/v1/execution/parse-ast`.
- **Regression Test:** `test_nested_generics_parsing.ts` — verify `Map<String, List<Book>>` parses completely without truncation.

### 4. AST Generation & Data Structures
- **Current State:** Emits `ParsedJavaProgram` containing arrays of `classes`, `fields`, `methods`, `constructors`, `variables`, `statements`, and `relationships`.
- **Root Cause & Incorrect Behavior:**
  1. Statement boundaries inside complex lambdas and multi-line ternary expressions can be miscomputed.
- **Affected Files & Functions:** `frontend/src/core/engine/javaAstParser.ts` (`parseMethodOrCtorBody`).
- **Required Correction:** Enforce bracket-matching lexical parsing for method bodies.
- **Regression Test:** Verify multi-line lambdas do not break following statement lines.

### 5. Symbol Resolution
- **Current State:** Resolves local names to class scope.
- **Root Cause & Incorrect Behavior:**
  1. Overloaded methods with same name but different parameter counts (e.g. `deposit(double)` vs `deposit(double, String)`) share duplicate IDs in some lookups.
- **Affected Files & Functions:** `frontend/src/core/engine/javaAstParser.ts` (`methodId = method-${className}-${methodName}`).
- **Required Correction:** Append parameter types to method symbol IDs: `method-${className}-${methodName}-${paramTypes}`.
- **Regression Test:** Verify overloaded methods have unique semantic IDs.

### 6. Type Resolution
- **Current State:** Field types and return types extracted into `declaredType`.
- **Root Cause & Incorrect Behavior:**
  1. Previously, `semanticModel.ts` failed to forward `f.declaredType` to `runtimeState.declaredType`, causing UI to fall back to `Object`.
  2. Unresolved user types should be explicitly flagged with diagnostic information instead of silent substitution.
- **Affected Files & Functions:** `frontend/src/core/engine/semanticModel.ts` (`buildSemanticModel`).
- **Required Correction:** Set `runtimeState.declaredType` and `metadata.declaredType` explicitly for all members; flag unresolved types as `Unresolved type: <Name>`.
- **Regression Test:** Verify `private Customer owner` resolves to `Customer` and never `Object`.

### 7. Class Discovery
- **Current State:** Classifies classes into `class`, `abstract-class`, `interface`, `record`, `enum`.
- **Root Cause & Incorrect Behavior:**
  1. `sealed` and `non-sealed` modifiers were not captured in metadata.
- **Affected Files & Functions:** `frontend/src/core/engine/javaAstParser.ts` (`classRegex`).
- **Required Correction:** Detect `sealed` and `permits` clauses and annotate in `cls.metadata`.
- **Regression Test:** Verify sealed class hierarchy displays sealed badge and permitted subclasses.

### 8. Relationship Detection
- **Current State:** Detects `inheritance`, `implementation`, `composition`, `association`, `dependency`.
- **Root Cause & Incorrect Behavior:**
  1. Suspicious self-links (e.g. `Car -> Car`) and method-as-class links (e.g. `Car -> display`) occurred because variable invocations were pushed as class dependencies without validating target entity kind.
  2. Every field was marked as `composition` regardless of lifecycle.
- **Affected Files & Functions:** `frontend/src/core/engine/javaAstParser.ts`, `frontend/src/core/engine/semanticModel.ts`.
- **Required Correction:** Validate that `targetId` is a recognized class before adding class relationships. Filter out self-links where `sourceId === targetId`. Differentiate `association` from `composition`.
- **Regression Test:** Verify `Main` does not compose `main`, and no self-referential inheritance loops exist.

### 9. OOP Concept Detection
- **Current State:** Inspects model relationships and member visibility.
- **Root Cause & Incorrect Behavior:**
  1. Previously lacked link between detected concept and exact supporting line of code.
- **Affected Files & Functions:** `frontend/src/features/playground/components/CodeIntelligenceInspector.tsx`.
- **Required Correction:** Provide exact file, line, and evidence rationale for Encapsulation, Inheritance, Abstraction, Polymorphism, and Association.
- **Regression Test:** Verify clicking concept chip focuses editor on the line establishing the concept.

### 10. Compilation Service
- **Current State:** Client-side AST syntax checker + Backend `ExecutionController.java`.
- **Root Cause & Incorrect Behavior:**
  1. Frontend and backend compilation paths were disconnected: frontend used local VM while backend `/api/v1/execution/run` returned mock trace events.
- **Affected Files & Functions:** `backend/.../ExecutionService.java`, `frontend/.../simulationStore.ts`.
- **Required Correction:** Re-architect backend execution pipeline to invoke JDK `javax.tools.JavaCompiler` or containerized sandbox for real compilation.
- **Regression Test:** Verify invalid Java syntax produces genuine JDK compiler error messages with line numbers.

### 11. Runtime Execution Service
- **Current State:** `javaVirtualMachine.ts` executes statements, arithmetic, loops, calls, and object instantiation.
- **Root Cause & Incorrect Behavior:**
  1. Simulated engine does not support advanced reflection or native Java APIs.
  2. Must clearly document when execution is running via the deterministic in-browser engine versus real sandboxed JDK.
- **Affected Files & Functions:** `frontend/src/core/engine/javaVirtualMachine.ts`.
- **Required Correction:** Clearly indicate execution mode (`Client-side Deterministic VM` vs `Sandboxed JVM Worker`).
- **Regression Test:** Verify infinite loops are aborted with wall-clock timeout.

### 12. Runtime Instrumentation
- **Current State:** Generates step events with stack frames and heap snapshots.
- **Root Cause & Incorrect Behavior:**
  1. Field mutation events recorded values but sometimes lost previous value diffing.
- **Affected Files & Functions:** `javaVirtualMachine.ts` (`executeAssignment`).
- **Required Correction:** Capture `{ previousValue, newValue }` for every mutation event.
- **Regression Test:** Verify field mutation diffs highlight in green/red during step execution.

### 13. Execution Event Generation
- **Current State:** Events generated per statement and loop evaluation.
- **Root Cause & Incorrect Behavior:**
  1. Step count could grow excessively large on long loops without step batching.
- **Affected Files & Functions:** `javaVirtualMachine.ts`.
- **Required Correction:** Enforce a maximum step threshold (e.g. 5,000 steps) with graceful truncation.
- **Regression Test:** Verify `while(true)` terminates with `StepLimitExceededException`.

### 14. Call Stack
- **Current State:** Stack frames track `methodName`, `className`, `line`, and `localVariables`.
- **Root Cause & Incorrect Behavior:**
  1. Constructor frames were occasionally labeled with generic `init` instead of `ClassName(params)`.
- **Affected Files & Functions:** `javaVirtualMachine.ts` (`executeConstructor`).
- **Required Correction:** Name constructor stack frames accurately with parameter values.
- **Regression Test:** Verify recursive calls create distinct stack frames with independent local variable tables.

### 15. Heap and Object Visualization
- **Current State:** `Eden Heap` tracks live objects by `@0x...` addresses.
- **Root Cause & Incorrect Behavior:**
  1. In some previous sessions, execution events were generated while heap object count remained zero because trace objects were not linked to the active semantic model.
- **Affected Files & Functions:** `semanticModel.ts` (`buildSemanticModel`).
- **Required Correction:** Ensure every heap snapshot in `currentEvent.heapObjects` is converted into a `SemanticEntity` with `entityType: 'object'`.
- **Regression Test:** Verify `new BankAccount(...)` produces a visible object in the Runtime Objects tab.

### 16. Thread Visualization
- **Current State:** `threadTable` tracks thread states (`NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TERMINATED`).
- **Root Cause & Incorrect Behavior:**
  1. Concurrency visualization was not integrated into the main architecture tabs.
- **Affected Files & Functions:** `javaVirtualMachine.ts`, `semanticModel.ts`.
- **Required Correction:** Expose Thread monitor and synchronized monitor lock contention in the bottom panel.
- **Regression Test:** Verify multithreaded worker programs show distinct thread swimlanes.

### 17. Console and Diagnostics
- **Current State:** `consoleEntries` stores timestamped stdout and stderr.
- **Root Cause & Incorrect Behavior:**
  1. Old output was not properly segmented by execution session ID.
- **Affected Files & Functions:** `ExecutionPanel.tsx`, `simulationStore.ts`.
- **Required Correction:** Clear or partition console logs upon new execution session creation.
- **Regression Test:** Verify clicking Run clears previous run's output or marks session boundaries clearly.

### 18. 2D Graph Renderer
- **Current State:** React Flow (`@xyflow/react`) powered `ClassArchitectureMap.tsx`.
- **Root Cause & Incorrect Behavior:**
  1. Connectors need obstacle-free routing and clear relationship labels.
- **Affected Files & Functions:** `frontend/src/features/playground/components/ClassArchitectureMap.tsx`.
- **Required Correction:** Use `smoothstep` edges with marker heads for inheritance, implementation, and association; support filter pills and minimap.
- **Regression Test:** Verify moving class cards dynamically reroutes connection lines without visual tearing.

### 19. 3D Graph Renderer
- **Current State:** Three.js / WebGL renderer.
- **Root Cause & Incorrect Behavior:**
  1. Was not synchronized to the exact same semantic model entities as the 2D view.
- **Affected Files & Functions:** `frontend/src/features/playground/components/ThreeRuntimeVisualizer.tsx`.
- **Required Correction:** Connect 3D renderer directly to `useSemanticModel()` to guarantee identical entities in 2D and 3D.
- **Regression Test:** Verify 2D and 3D views display identical class counts and names.

### 20. Execution State Management
- **Current State:** Zustand store (`useSimulationStore`).
- **Root Cause & Incorrect Behavior:**
  1. Stored both persistent project state and ephemeral execution state in one large flat store without separation of concerns.
- **Affected Files & Functions:** `frontend/src/features/simulation/simulationStore.ts`.
- **Required Correction:** Segregate project source files from the active `ExecutionSession`.
- **Regression Test:** Verify editing source code marks active execution as stale without corrupting editor content.

### 21. API Communication
- **Current State:** REST endpoints under `/api/v1/execution`.
- **Root Cause & Incorrect Behavior:**
  1. Frontend did not call backend compilation if backend was offline.
- **Affected Files & Functions:** `frontend/src/services/api/executionApi.ts` (or store runner).
- **Required Correction:** Implement resilient fallback: attempt sandboxed backend JDK compilation; if offline, run client-side deterministic VM with clear status badge.
- **Regression Test:** Verify application functions seamlessly in offline sandbox mode and connects to API when online.

### 22. Session Management & Revisions
- **Current State:** Simple `sessionId` and `projectRevision` counter.
- **Root Cause & Incorrect Behavior:**
  1. Revisions were not incremented on every discrete file modification.
- **Affected Files & Functions:** `simulationStore.ts` (`updateFileContent`).
- **Required Correction:** Increment `projectRevision` whenever file content or structure changes.
- **Regression Test:** Verify editing code invalidates stale execution step indicators.

---

## 2. Immediate Corrective Action Plan (Ordered Phases)
1. **Remove Hardcoded Templates:** Initialize store with clean, blank `Main.java` and empty trace.
2. **Fix Semantic Relationship Pipeline:** Enforce strict entity ID validation, remove false self-links, and classify associations accurately.
3. **Connect Shared Model Across All Views:** Ensure 2D and 3D visualizers, inspectors, and console share the exact same `ExecutionSession`.
4. **Execution Mode Clarity:** Display transparent status badge indicating whether execution was compiled via JDK worker or deterministic VM.

