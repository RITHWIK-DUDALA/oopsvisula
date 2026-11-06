# Task Record: OOPS-20261102-0055-CONCEPT_PAGE_LOADING_ANIMATION

**Date:** 2026-11-02  
**Status:** COMPLETED  
**Directive:** When entering into the concept page, also display the loading animation (3-layer LogoTraceLoader, status progression, and smooth transition).

---

## 1. Scope & Implementation

### 1.1 Extended ApplicationTransition & LoadingCard
- **`LoadingCard.tsx` (`frontend/src/features/transition/LoadingCard.tsx`):**
  - Added optional `title` and `subtitle` props to support dynamic contexts (defaults to `"OOPS LAB"` and `"JVM Laboratory"`).
- **`ApplicationTransition.tsx` (`frontend/src/features/transition/ApplicationTransition.tsx`):**
  - Enhanced `ApplicationTransitionProps` to accept:
    - `title?: string`
    - `subtitle?: string`
    - `initialStatus?: string`
    - `stages?: TransitionStage[]` (custom timing, text, and completion triggers)
    - `durationMs?: number`
    - `backdropVariant?: 'warm' | 'minimal' | 'translucent'`
  - Integrated translucent backdrop (`rgba(250, 250, 250, 0.88)` with `backdrop-filter: blur(10px)`) to seamlessly blend with the app canvas during in-app navigation.
  - Retained full fallback handling and instant readiness under `prefers-reduced-motion: reduce`.

### 1.2 Entering Concepts Catalog Page (`/app/concepts`)
- **`ConceptsPage.tsx` (`frontend/src/features/concepts/ConceptsPage.tsx`):**
  - Added `isInitialLoading` state driven by `useLocation`.
  - When entering `/app/concepts` directly, refreshing, or navigating via the sidebar, triggers the loading overlay:
    - 3-Layer `LogoTraceLoader` tracing and fill.
    - Status: `"Loading Java & OOP Curriculum..."` $\to$ `"Indexing Java 21 Modules..."` $\to$ `"Preparing Interactive Visualizations..."` $\to$ `"Curriculum Ready"`.
    - Soft fade out over 280ms revealing the Concepts catalog.
  - Guard: If entering directly after the landing page's application transition (`location.state.fromLanding`), skips double-loading to avoid redundant back-to-back screens.

### 1.3 Entering Individual Concept Detail Pages (`/app/concepts/:conceptId`)
- **`ConceptDetailPage.tsx` (`frontend/src/features/concepts/ConceptDetailPage.tsx`):**
  - Added `isLoadingConcept` state triggered on initial mount and whenever `conceptId` changes (e.g. clicking Next/Previous lesson navigation).
  - Displays concept-specific loading animation:
    - Title: `"OOPS LAB"`
    - Subtitle: `"Interactive Concept Lab"`
    - Status: `"Loading [Concept Title]..."` $\to$ `"Configuring Memory Canvas & Syntax..."` $\to$ `"Preparing Interactive Visualizer..."` $\to$ `"[Concept Title] Ready"`.
    - Soft exit transition gracefully unveiling the detailed lesson, code examples, and memory projections.

---

## 2. Verification
- `pnpm exec tsc --noEmit` exited with code 0 (0 errors).
- `pnpm run build` completed in 21.03s (2,081 modules transformed, 0 errors).
- Localhost Vite dev server running daemon on port 5173.

