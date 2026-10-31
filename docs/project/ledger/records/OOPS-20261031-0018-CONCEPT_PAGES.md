# Task Record: OOPS-20261031-0018 — Dedicated Progressive Concept Pages (Basic to Advanced)

**ID:** OOPS-20261031-0018  
**Date:** 2026-10-31 11:15:00 IST  
**Directive:** "for every concept a new page should open and from basic to advance that concept must be explained in that"  
**Classification:** `IMPLEMENTED`  

---

## 1. Architectural Architecture & Scope

### 1.1 Dedicated Routing
- Added route `/concepts/:conceptId` in `frontend/src/app/routes.tsx` within the authenticated/guest application shell.
- Updated `ConceptsPage.tsx` so clicking on any of the 14 concept cards navigates directly to `/concepts/${lesson.id}` instead of an ephemeral modal.

### 1.2 Pedagogical Structure (From Basic to Advanced)
Created `frontend/src/data/conceptDetailsData.ts` mapping each concept to 4 progressive tiers:
1. **Level 1: Basic (Foundations & Mental Model):**
   - High-level intuitive overview.
   - Real-world physical analogy (e.g. cash in pocket vs safe deposit key for variables; blueprint vs house for classes).
   - Why it matters in software engineering.
   - Non-negotiable core rules.
   - Annotated starter code snippet.
2. **Level 2: Intermediate (Developer Mechanics):**
   - In-depth syntax and behavioral breakdown.
   - Annotated implementation examples.
   - Common Anti-Patterns matrix with ❌ Incorrect vs ✅ Correct idiomatic comparisons.
3. **Level 3: Advanced (Systems Architecture & JVM):**
   - 4-quadrant memory topology matrix (Thread Call Stack, Eden Heap Space, Metaspace Off-Heap, GC Lifecycle).
   - Bytecode instruction table with exact JVM opcodes (`invokevirtual`, `invokespecial`, `invokestatic`, `invokedynamic`, `getfield`, `putfield`).
   - High-throughput engineering considerations (escape analysis, monomorphic inlining, cache lines).
4. **Level 4: Modern Java 21 LTS Practices:**
   - Production best practices.
   - Modern idiomatic code snippet leveraging records, sealed hierarchies, and pattern matching.
   - Architectural summary.

### 1.3 Interactive Navigation & Laboratory Integration
- Header with live breadcrumb, category, reading time, and mastery toggle (`useLearnerStore`).
- Quick actions:
  - `Open in Visualizer` (navigates to `/playground` for live execution).
  - `Practice Challenges` (navigates to `/practice`).
- Tab switcher allowing both single-level focus and the full comprehensive guide.
- Footer linear progression: `<- Previous Step` and `Next Step ->` across all 14 steps.

---

## 2. Files Modified & Created
- `frontend/src/data/conceptDetailsData.ts`: Created comprehensive progressive data for all 14 concepts.
- `frontend/src/features/concepts/ConceptDetailPage.tsx`: Created full-page dedicated learning component.
- `frontend/src/features/concepts/ConceptsPage.tsx`: Replaced modal with direct page navigation.
- `frontend/src/app/routes.tsx`: Registered `concepts/:conceptId` route.

---

## 3. Verification & Build
- `tsc -b && vite build`: Exited with code 0 in 12.24s (2,075 modules transformed).
- `graphify update .`: Local graph updated (824 nodes, 1,308 edges, 66 communities).
- Dev server running live on `http://localhost:5173/`.

