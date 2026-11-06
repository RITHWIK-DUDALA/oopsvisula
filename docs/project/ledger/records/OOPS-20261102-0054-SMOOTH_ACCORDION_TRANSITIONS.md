# Task Record: OOPS-20261102-0054-SMOOTH_ACCORDION_TRANSITIONS

**Date:** 2026-11-02  
**Status:** COMPLETED  
**Directive:** Implement smooth, elegant opening and closing transitions for every expandable section in the Java OOP and Java learning roadmap.

---

## 1. Scope & Implementation

### 1.1 Root-Cause Elimination & Pure CSS Grid Architecture
- **Root-Cause Defect:** Previously, modules in `ConceptsPage.tsx` and stages in other components used conditional JSX rendering `{isExpanded && (<div ...>)}`. React immediately unmounted the DOM element on collapse, preventing any reverse transition and causing surrounding content to snap upward abruptly with jarring layout shifts.
- **Pure CSS Grid Technique (`frontend/src/index.css`):**
  - Implemented `.oops-accordion-grid` using CSS grid height interpolation:
    ```css
    .oops-accordion-grid {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 400ms cubic-bezier(0.22, 1, 0.36, 1);
      will-change: grid-template-rows;
    }
    .oops-accordion-grid.is-expanded {
      grid-template-rows: 1fr;
    }
    .oops-accordion-inner {
      overflow: hidden;
    }
    ```
  - Animate height smoothly from `0` to its natural dynamic content height without JavaScript `scrollHeight` measurements, eliminating layout thrashing and handling rapid consecutive clicks mid-flight.

### 1.2 Coordinated Opacity & Upward Movement
- `.oops-accordion-content`:
  - Starts with `opacity: 0; transform: translateY(-8px);`.
  - When `.is-expanded` is applied: smooth transition to `opacity: 1; transform: translateY(0);` over `380ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - Reverses smoothly on close, fading out content as height collapses without prematurely snapping to `display: none`.

### 1.3 Chevron Rotation & Card Border Transitions
- **Chevron Animation:**
  - Added `.oops-chevron-rotate` with `transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - Rotates 180 degrees (`rotate-180` / `rotate-0`) while maintaining consistent alignment.
- **Card Border Polish:**
  - Added subtle border transition on module and stage containers:
    `isExpanded ? 'border border-[#CBD5E1]/90 bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)]' : 'border border-[#E5E7EB]/60 hover:bg-white/75 hover:border-[#CBD5E1]/80'`.

### 1.4 Comprehensive Surface Coverage
1. **Concepts Page (`frontend/src/features/concepts/ConceptsPage.tsx`):**
   - Replaced conditional unmounting with `.oops-accordion-grid` container for all module accordions.
   - Preserved all existing typography, badges, numbering, and 3-column layouts.
2. **Roadmap Page (`frontend/src/features/roadmap/RoadmapPage.tsx`):**
   - Converted stage sections into interactive expandable accordions (`expandedStages: Set<number>`).
   - Integrated `.oops-chevron-rotate`, stage toggle handler, and `.oops-accordion-grid`.

### 1.5 Accessibility & Performance
- Full support for `prefers-reduced-motion: reduce` disabling transitions instantly for users with motion sensitivity.
- Zero extra external animation libraries introduced.

---

## 2. Verification
- `pnpm exec tsc --noEmit` exited with code 0 (0 errors).
- `pnpm run build` completed in 21.68s (2,081 modules transformed cleanly).
- Localhost Vite dev server running daemon on port 5173.

