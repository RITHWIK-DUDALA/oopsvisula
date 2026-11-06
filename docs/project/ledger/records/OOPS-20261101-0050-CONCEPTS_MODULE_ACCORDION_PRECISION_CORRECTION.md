# Task Record: OOPS-20261101-0050-CONCEPTS_MODULE_ACCORDION_PRECISION_CORRECTION

**Date:** 2026-11-01  
**Status:** COMPLETED  
**Directive:** Precision correction of the Concepts page to integrate the module-level accordion hierarchy matching the approved design reference.

---

## 1. Scope & Implementation
- **Data Architecture (`frontend/src/features/concepts/curriculumModulesData.ts`):**
  - Structured the full curriculum into separate modules with child concept hierarchies for both tracks (`JAVA_MODULES` and `OOP_MODULES`).
  - Supported difficulty levels: `Beginner`, `Core`, `Intermediate`, `Advanced`.
  - Concept numbering restarts inside every module (`01`, `02`, `03`...).
  - Each concept contains individual icons, descriptions, and active lesson routes (`targetRoute`).
- **Module Accordion Component (`frontend/src/features/concepts/ConceptsPage.tsx`):**
  - **Module Header (4 distinct regions):**
    - Left: Compact warm light-orange badge (`bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]/60 font-mono font-bold`) displaying two-digit module number, bold near-black title, and subdued description.
    - Right: Calibrated difficulty badge, actual child concept count (`X Concepts`), and animated smooth rotating chevron (`rotate-180` on expand).
  - **Expanded Content:**
    - Continuous vertical track line connecting sequential indicators (`w-px bg-[#E5E7EB]`).
    - Restarted two-digit concept numbering (`01`, `02`...) with first concept highlighted in cobalt blue (`#075CF5`) and remaining in light neutral (`#F1F5F9`).
    - Compact concept icon containers (`w-9 h-9 rounded-xl`).
    - Title, description, and individual difficulty badge.
    - Clickable concept rows wired to `navigate(concept.targetRoute)`.
  - **Interaction & Search:**
    - Independent module expansion/collapse via `Set<string>`.
    - First module expanded by default per selected track (`java-01` or `oop-01`).
    - Real-time search across module titles, descriptions, and concept titles/descriptions.
    - All matching modules automatically expand during search to immediately expose matching concepts.
- **Hero & Track Selectors Preserved:**
  - Restored clean typography for `<h1>Master Java & OOP</h1>` (`#17191D`, `#075CF5`, `#17191D`, `#FF7A00`) eliminating canvas selection handles/artifacts around "OOP".
  - Preserved two side-by-side track selectors (Java Programming with cup/steam and OOP with 3-layer logo mark, active cobalt border and curved orange corner accent).
  - Preserved application shell, sidebar, and Guest mode.

---

## 2. Verification
- `pnpm exec tsc --noEmit` exited with code 0 (0 type errors).
- `pnpm run build` completed in 20.95s (2,079 modules transformed).

