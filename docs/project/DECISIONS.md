# ARCHITECTURE DECISION RECORDS (ADR) — OOPS LAB

**Project:** OOPS LAB  
**Central ID:** OOPS-20261030-0001  
**Status:** Living Document  

---

## ADR-001: Technology Stack Selection

### Context
OOPS LAB requires an interactive browser-based visualization environment connected to a safe, deterministic Java 21 execution engine. The platform needs high performance, crisp monochrome rendering, type safety, and real-time state synchronization.

### Decision
1. **Frontend:** React 19 + TypeScript bundled with Vite for fast HMR. Styling via Tailwind CSS with custom monochrome design tokens. Complex diagrams rendered using SVG and React Flow. Rich code editing powered by Monaco Editor. State management orchestrated with Zustand.
2. **Backend:** Java 21 LTS + Spring Boot 3.x. AST parsing and static analysis handled via JavaParser. Runtime tracing handled via Java Debug Interface (JDI) in isolated execution processes.
3. **Queue & Caching:** Redis for execution job queue and distributed token-bucket rate limiting.

### Consequences
- High type safety across frontend and backend boundaries.
- Industry-standard tooling reduces onboarding friction for open-source contributors.
- Separation of concerns between UI client and sandboxed execution workers.

---

## ADR-002: Client-First Persistence for Initial Release

### Context
The platform requirements explicitly state that user authentication is postponed. Real sign-in/sign-up forms must display "Coming Soon". Guest students must have instant, friction-free access to all learning and simulation tools.

### Decision
Store all user progress, custom visualizer configurations, and saved code experiments locally in the browser using IndexedDB (for structured diagram/code models) and LocalStorage (for theme and editor preferences). Do not introduce server-side PostgreSQL or user accounts in Phase 1.

### Consequences
- Zero backend database overhead or operational complexity in early phases.
- Fast, offline-capable learner experience.
- Seamless upgrade path to cloud persistence in the future by syncing local IndexedDB to PostgreSQL upon authenticated account creation.

---

## ADR-003: Isolated Sandbox Architecture for Student Code Execution

### Context
Executing arbitrary student-written Java code on the backend poses security risks (infinite loops, fork bombs, unauthorized filesystem/network access, memory exhaustion).

### Decision
Never execute user code directly in the main Spring Boot web server. Use a dedicated asynchronous execution pipeline:
1. Web server performs input validation and static AST analysis via JavaParser to detect disallowed classes/packages.
2. Execution requests are pushed to a Redis job queue.
3. Stateless isolated execution workers pull jobs and execute code in disposable, hardened environments with strict resource constraints (cgroups / container resource limits: max 256MB RAM, 1 CPU core, 5s timeout, restricted network, no file writes).
4. Execution events are collected step-by-step and returned as a structured event stream.

### Consequences
- Secure, resilient architecture immune to host compromise from student submissions.
- Horizontal scalability: execution workers scale independently based on queue pressure.

---

## ADR-004: Monochromatic Light Interface Design Standards

### Context
Educational tools often suffer from visual fatigue, excessive neon accents, or unreadable colorful emoji noise. OOPS LAB demands a professional, minimalist aesthetic that maximizes conceptual focus.

### Decision
Adopt a strictly curated monochromatic light theme:
- Neutral gray/slate scales (`#FFFFFF`, `#FAFAFA`, `#F4F4F5`, `#E4E4E7`, `#71717A`, `#18181B`, `#09090B`).
- High-contrast black outlines and accents.
- Zero colorful emojis. Outline-only SVG icons.
- Subdued semantic indicators (e.g., subtle monochrome shades for stack frames and heap objects).
- Minimum font size 12px for maximum legibility.

### Consequences
- High educational clarity and reduced cognitive load.
- Consistent rendering across desktop, tablet, and mobile viewports.

---

## ADR-005: Operational Workflow & Logging Optimization

### Context
Per user directive on 2026-10-30, frequent Git commits on every minor file change introduce unnecessary friction. The user mandated maintaining thorough activity logs without committing to Git on every single step, and bypassing Antigravity skill operations for core development.

### Decision
- Write detailed log records to `MASTER_ACTIVITY_LOG.md`, `FILE_CHANGE_REGISTER.md`, and individual task records for every task.
- Git checkpoints will be created at major logical task boundaries or upon user instruction rather than after every micro-edit.
- Skills are cataloged in `SKILL_INVENTORY.md` but will not be repeatedly invoked in development turns unless requested.

### Consequences
- Faster development throughput.
- Full traceability maintained in the append-only markdown ledger.

