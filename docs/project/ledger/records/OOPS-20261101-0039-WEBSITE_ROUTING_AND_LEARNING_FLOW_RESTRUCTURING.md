# Task Record — Website Routing, Landing Page Separation & Student Learning Flow Restructuring

**Record ID:** OOPS-20261101-0039-WEBSITE_ROUTING_AND_LEARNING_FLOW_RESTRUCTURING  
**Date:** 2026-11-01 15:24:00  
**Status:** COMPLETED  
**Related Components:** `frontend/src/app/routes.tsx`, `frontend/src/components/navigation/LeftSidebar.tsx`, `frontend/src/components/navigation/TopHeader.tsx`, `frontend/src/features/landing/LandingPage.tsx`, `frontend/src/features/concepts/ConceptsPage.tsx`, `frontend/src/features/concepts/ConceptDetailPage.tsx`, `frontend/src/features/roadmap/RoadmapPage.tsx`, `frontend/src/features/visualizer/VisualizerPage.tsx`  

---

## 1. Architectural Mission
Restructure the entire OOPS LAB website architecture into two strictly independent experiences:
1. **PART A — Public Marketing Website (`/`):**
   - Independent landing page with zero application features, zero sidebars, and zero playground toolbars.
   - Purpose: Introduce the platform, demonstrate capabilities, and convert visitors into learners through a frictionless **"Enter as Guest"** CTA.
2. **PART B — OOPS LAB Learning Application (`/app/*`):**
   - Independent application shell (`AppLayout`) with responsive sidebar, top application header, and nested learning routes.
   - **Concepts-First Entry:** Entering as a guest redirects directly to `/app/concepts` (not Playground, not a dashboard).
   - Strict pedagogical navigation hierarchy matching the student learning order.

---

## 2. Implemented Route Architecture

```text
/                       Public Standalone Marketing Landing Page

/app                    Application Shell (redirects to /app/concepts)
  ├── concepts          Concepts — Default Student Entry Point
  ├── concepts/:id      Dedicated Concept Detail & Code Analysis Page
  ├── roadmap           Curriculum Dependencies & Learning Milestones
  ├── visualizers       Interactive JVM Visualizations (2D/3D)
  ├── playground        Full 2D/3D Java Execution Laboratory Workspace
  ├── practice          AST Assertion Practice Challenges
  ├── reference         JVM Memory, Bytecode & UML Quick Reference
  ├── progress          Learning Progress & Topic Mastery Metrics
  ├── settings          Monaco Editor & Visualization Settings
  ├── help              Laboratory Architecture & Information (About)
  ├── dashboard         (Protected) Authenticated Account Dashboard
  └── profile           (Protected) Authenticated Account Profile
```

### Legacy & Direct Route Compatibility
Non-prefixed URLs (`/playground`, `/concepts`, `/roadmap`, `/visualizers`, `/practice`, `/reference`, `/progress`, `/settings`, `/about`) automatically redirect to `/app/*`, ensuring all bookmarks and direct links continue to resolve smoothly.

---

## 3. Strict Student Learning Order

The navigation sidebar (`LeftSidebar.tsx`) now follows the mandatory learning sequence:

### LABORATORY / LEARNING
1. **Concepts** (`/app/concepts`) — Understand theory, syntax, and mental models first.
2. **Roadmap** (`/app/roadmap`) — See where concepts fit within the Java 21 milestone hierarchy.
3. **Visualizers** (`/app/visualizers`) — Observe internal JVM mechanics, stack frames, and object graphs.
4. **Playground** (`/app/playground`) — Execute live Java code with line-by-line stepping and 2D/3D visualizers.

### PRACTICE
5. **Practice** (`/app/practice`) — Apply knowledge with AST automated assertion challenges.
6. **Reference** (`/app/reference`) — Review JVM specifications, memory layouts, and UML standards.

### PERSONAL
7. **Progress** (`/app/progress`) — Track mastered topics, completion percentages, and lab hours.

### PREFERENCES
8. **Settings** (`/app/settings`) — Calibrate editor font size, minimap, word wrap, and animation speed.
9. **Help** (`/app/help`) — Access technical architecture and documentation.

---

## 4. Inter-Page Contextual Learning Progression
- **Landing Page $\rightarrow$ Concepts:** Clicking "Enter as Guest" activates guest mode and navigates to `/app/concepts`.
- **Concepts $\rightarrow$ Roadmap:** A contextual callout at the base of the Concepts catalog invites students to explore dependencies on the Roadmap (`/app/roadmap`).
- **Roadmap $\rightarrow$ Visualizers:** Milestone banners link directly to interactive Visualizers (`/app/visualizers`).
- **Visualizers $\rightarrow$ Playground:** Top toolbar provides instant transition to the 3-Panel Playground (`/app/playground`).
- **Concept Detail $\rightarrow$ Practice / Visualizer:** Action buttons link directly to `/app/practice` and `/app/playground`.

---

## 5. Verification & Test Suite
- **TypeScript Typecheck:** `pnpm exec tsc --noEmit` exited with code 0 (zero errors).
- **Vite Production Build:** `pnpm run build` completed in 17.94s with 0 errors (2,082 modules transformed).
- **Session Idempotence:** Refreshing `/app/concepts` preserves guest session and remains on the page. Direct navigation to `/app/playground` loads with execution engine ready.

