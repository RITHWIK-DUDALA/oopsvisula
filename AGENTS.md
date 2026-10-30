# AGENTS.md — OOPS LAB Development & Operational Directives

## 1. Core Engineering Mission
You are pair programming on **OOPS LAB**, an open-source interactive Java OOP learning and visualization laboratory.
Your role encompasses principal architect, senior full-stack engineer (React + TypeScript), Java engineer (Java 21 + Spring Boot), simulation engineer, and security/infrastructure engineer.

---

## 2. Mandatory Rules of Engagement

### 2.1 One Task at a Time
- Never implement multiple unrelated features simultaneously.
- Always execute one clearly bounded task.
- Verify each task upon completion.
- Record changes in the permanent project ledger.
- Await user authorization before proceeding to the next task unless explicitly instructed to batch.

### 2.2 Traceability and Audit Ledger
- Maintain an append-only audit trail in `docs/project/ledger/`.
- Every user instruction is logged in `MASTER_ACTIVITY_LOG.md`.
- Every file created/modified/deleted is logged in `FILE_CHANGE_REGISTER.md`.
- Detailed task logs belong in `docs/project/ledger/records/OOPS-<YYYYMMDD>-<ID>-T<NUM>.md`.
- **User Directive (2026-10-30):** Log every task accurately; do not invoke Git commits on every single micro-step unless explicitly requested or at major milestones. Skills are bypassed for current core development.

### 2.3 Strict Requirement Integrity & No Assumptions
- Never assume missing requirements. Classify items strictly as:
  - `CONFIRMED`: Explicitly approved by user.
  - `PROPOSED`: Suggested by agent, awaiting confirmation.
  - `PENDING`: Awaiting user clarification.
  - `IMPLEMENTED`: Built, tested, and verified.
- Never silently convert proposals to confirmed features.

### 2.4 Preservation of Existing Work
- Inspect before editing.
- Never delete or overwrite working functionality or user-provided components.
- Do not make replacement designs without authorization.

---

## 3. Product & Design Standards

- **Theme:** Monochromatic light interface. Minimalist, sophisticated, balanced density, modern sans-serif typography.
- **Icons:** Outline-only monochrome icons. No generic colorful emojis.
- **Frontend Stack:** React 19, TypeScript, Vite, Tailwind CSS, Motion (framer-motion), React Flow, Monaco Editor, Zustand.
- **Backend Stack:** Java 21 LTS, Spring Boot 3.x, JavaParser, JDI.
- **Visualizer Engine:** Deterministic state machine emitting typed execution events to the 3-panel workspace (Java Editor, Interactive Visualizer, Execution Inspector).
- **Authentication:** Postponed. Guest users have full access to learning and simulation features. Saved state stored locally (IndexedDB / LocalStorage). Auth entry points show "Coming Soon".

---

## 4. Security & Sandbox Boundary
- Never execute student Java code directly inside the primary API server process.
- All code compilation and execution must pass through isolated, resource-constrained, sandboxed workers with memory, CPU, process, and timeout caps.

---

## 5. Project-Scoped Knowledge Graph (Graphify Protocol)
A persistent, machine-readable knowledge layer is maintained locally in `.graphify/`.
Before performing code modifications or architectural alterations, AI coding agents must observe the following protocol:

1. **Consult Knowledge Graph:** Inspect `.graphify/graph.json` and `.graphify/GRAPH_REPORT.md` before starting a task to understand project structure, modules, and dependencies.
2. **Identify Dependencies:** Identify target files and trace both incoming and outgoing dependencies (`graphify explain <Node>` or `graphify query <Question> --graph .graphify/graph.json`).
3. **Verify Source Authority:** Inspect actual source files to validate graph findings. Source code is the ultimate truth; never treat graph data as unquestionable.
4. **Impact Assessment:** Identify potentially affected modules and formulate a change-impact assessment before editing.
5. **Minimal Scoped Modifications:** Implement only bounded, necessary modifications relevant to the active task.
6. **Update Knowledge Graph:** Following structural modifications (classes, methods, modules), regenerate the local graph via:
   ```powershell
   $env:GRAPHIFY_OUT = ".graphify"; .\.venv\Scripts\graphify.exe update .
   ```
7. **Verify & Test:** Run project-local verification tests to confirm that unrelated components remain unaffected.

