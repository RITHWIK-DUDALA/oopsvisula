# IMPLEMENTATION ROADMAP — OOPS LAB
**Project:** OOPS LAB  
**Strategy:** Phased, Independently Verifiable, Test-Driven Execution  
**Execution Directives:** One bounded task at a time; permanent audit trail; no unconfirmed assumptions.

---

## Phase Matrix

| Phase | Title | Primary Focus | Dependencies | Status |
|---|---|---|---|---|
| **Phase 0** | **Governance & Inception** | Environment inspection, audit trail, skills inventory, requirements, architecture, knowledge graph. | None | **COMPLETED** |
| **Phase 1** | **Foundational Scaffolding & Design System** | Vite + React 19 setup, monochrome tokens, navigation shell, landing page, dashboard skeleton. | Phase 0 | **IN PROGRESS (Current)** |
| **Phase 2** | **Interactive 3-Panel Playground & State Engine** | Monaco Editor integration, Zustand simulation state machine, playback controls, dummy event replay. | Phase 1 | **BACKLOG** |
| **Phase 3** | **Visualizer Canvas & Class Builder** | React Flow heap/stack diagrams, visual class builder, JavaParser code generation & static validation. | Phase 2 | **BACKLOG** |
| **Phase 4** | **Backend & Sandboxed Execution Pipeline** | Spring Boot REST API, Redis queue, JDI trace capture worker, isolated container sandbox. | Phase 3 | **BACKLOG** |
| **Phase 5** | **Curriculum Modules & Practice Engine** | Java 21 core OOP topics, 14-step learning modules, practice challenges with auto-graders. | Phase 4 | **BACKLOG** |
| **Phase 6** | **Hardening, Observability & Scaling** | Distributed rate limiting, Prometheus/Grafana metrics, automated worker scaling, audit freeze. | Phase 5 | **BACKLOG** |

---

## Detailed Task Breakdown: Phase 1 (Foundational Scaffolding & Design System)

- [ ] **P1-T01: Frontend Scaffolding & Toolchain Configuration**
  - Scaffold `frontend/` with Vite, React 19, TypeScript.
  - Configure Tailwind CSS with monochrome design tokens (`--background`, `--surface`, `--card`, `--border`, `--foreground`).
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

