# IMPLEMENTATION ROADMAP — OOPS LAB
**Project:** OOPS LAB  
**Strategy:** Phased, Independently Verifiable, Test-Driven Execution  
**Execution Directives:** One bounded task at a time; permanent audit trail; no unconfirmed assumptions.

---

## Phase Matrix

| Phase | Title | Primary Focus | Dependencies | Status |
|---|---|---|---|---|
| **Phase 0** | **Governance & Inception** | Environment inspection, audit trail, skills inventory, requirements, architecture, knowledge graph. | None | **COMPLETED** |
| **Phase 1** | **Foundational Scaffolding & Design System** | Vite + React 19 setup, monochrome tokens, navigation shell, landing page, dashboard skeleton. | Phase 0 | **COMPLETED** |
| **Phase 2** | **Interactive 3-Panel Playground & State Engine** | Monaco Editor integration, Zustand simulation state machine, playback controls, dummy event replay. | Phase 1 | **COMPLETED** |
| **Phase 3** | **Visualizer Canvas & Class Builder** | React Flow heap/stack diagrams, visual class builder, JavaParser code generation & static validation. | Phase 2 | **COMPLETED** |
| **Phase 4** | **Backend & Sandboxed Execution Pipeline** | Spring Boot REST API, Redis queue, JDI trace capture worker, isolated container sandbox. | Phase 3 | **COMPLETED** |
| **Phase 5** | **Curriculum Modules & Practice Engine** | Java 21 core OOP topics, 14-step learning modules, practice challenges with auto-graders. | Phase 4 | **COMPLETED** |
| **Phase 6** | **Hardening, Observability & Scaling** | Distributed rate limiting, Prometheus/Grafana metrics, automated worker scaling, audit freeze. | Phase 5 | **COMPLETED** |

---

## Detailed Task Breakdown: Phase 1 (Foundational Scaffolding & Design System) [COMPLETED]

- [x] **P1-T01: Frontend Scaffolding & Toolchain Configuration** [COMPLETED]
- [x] **P1-T02: Responsive Shell & Navigation Architecture** [COMPLETED]
- [x] **P1-T03: Public Landing Page Implementation** [COMPLETED]
- [x] **P1-T04: Learner Dashboard & Local-First Storage** [COMPLETED]

---

## Detailed Task Breakdown: Phase 2 (Simulation Engine & 3-Panel Workspace) [COMPLETED]

- [x] **P2-T01: Execution Event Schema & Trace Parser** [COMPLETED]
- [x] **P2-T02: Deterministic Simulation State Machine (`useSimulationStore`)** [COMPLETED]
- [x] **P2-T03: 3-Panel Synchronized Playground Workspace** [COMPLETED]
- [x] **P2-T04: Interactive Memory Visualizer Canvas (`MemoryCanvas`, `ExecutionInspector`)** [COMPLETED]

---

## Detailed Task Breakdown: Phase 3 (Visual Class Builder & Code Synchronization) [COMPLETED]

- [x] **P3-T01: Visual Class Builder Data Model & Java 21 Code Generator** [COMPLETED]
- [x] **P3-T02: Interactive Class Diagram Canvas with Node Builder** [COMPLETED]
- [x] **P3-T03: Bi-Directional Code ⟷ Diagram Synchronizer** [COMPLETED]
- [x] **P3-T04: OOP Relationship Connectors** [COMPLETED]

---

## Detailed Task Breakdown: Phase 4 (Backend Architecture & Execution Pipeline) [COMPLETED]

- [x] **P4-T01: Spring Boot 3.3.4 API Scaffold (Java 21 LTS, pom.xml)** [COMPLETED]
- [x] **P4-T02: JavaParser AST Security & Static Analysis Filter** [COMPLETED]
- [x] **P4-T03: Execution Job Submission & Status Controller** [COMPLETED]
- [x] **P4-T04: Sandboxed Worker Pipeline with Browser AST Pre-Filter** [COMPLETED]

---

## Detailed Task Breakdown: Phase 5 (Curriculum Track & Practice Engine) [COMPLETED]

- [x] **P5-T01: 14-Step Curriculum Modules Content Schema & Structured Lessons** [COMPLETED]
- [x] **P5-T02: Interactive Concept Topic Detail View with Step-by-Step Walkthrough** [COMPLETED]
- [x] **P5-T03: Practice Challenges Auto-Evaluation Engine with Monaco Editor** [COMPLETED]
- [x] **P5-T04: Learner Progress & Achievement Badges Synchronization** [COMPLETED]

---

## Detailed Task Breakdown: Phase 6 (Hardening, Observability & Scaling) [COMPLETED]

- [x] **P6-T01: Multi-Service Production Stack (`docker-compose.yml`)** [COMPLETED]
- [x] **P6-T02: Nginx Reverse Proxy Configuration & Security Headers (`nginx.conf`)** [COMPLETED]
- [x] **P6-T03: Sandboxed Execution Worker Dockerfile (`infrastructure/docker/worker.Dockerfile`)** [COMPLETED]
- [x] **P6-T04: Distributed Token-Bucket Rate Limiter Specification (`RATE_LIMITING.md`)** [COMPLETED]

  - Configure Lucide outline icons and router boilerplate.
  - Acceptance: `pnpm run build` passes with zero errors; clean root viewport.

- [ ] **P1-T02: Responsive Shell & Navigation Architecture**
  - Implement persistent Left Sidebar with outline icons.
  - Implement Top Header with breadcrumbs, theme toggles, and "Coming Soon" auth trigger.
  - Implement 12-page route mapping stubs.
  - Acceptance: Seamless navigation between all 12 routes; responsive on mobile/desktop.

- [ ] **P1-T03: Public Landing Page Implementation**
  - Build Hero section, feature showcases, curriculum roadmap preview, and interactive teaser widget.
  - Acceptance: Pixel-perfect light monochrome UI, fast rendering, zero colorful emojis.

- [ ] **P1-T04: Learner Dashboard & Local-First Storage**
  - Build Dashboard overview with learning path widgets, recent playground experiments, and quick actions.
  - Integrate LocalStorage/IndexedDB for guest session persistence.
  - Acceptance: State persists on page refresh without backend database.

