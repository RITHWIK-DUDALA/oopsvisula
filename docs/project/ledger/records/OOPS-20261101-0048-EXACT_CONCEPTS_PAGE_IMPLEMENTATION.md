# Task Record: OOPS-20261101-0048-EXACT_CONCEPTS_PAGE_IMPLEMENTATION

**Date:** 2026-11-01  
**Status:** COMPLETED  
**Directive:** Recreate the approved OOPS LAB Concepts landing/catalog page (`/app/concepts`) to match the approved visual reference specification strictly.

---

## 1. Scope and Changes
- **Target File:** `frontend/src/features/concepts/ConceptsPage.tsx`
- **Hero Section:**
  - Eyebrow: `LEARNING CENTRE` in cobalt blue (`#075CF5`), compact font, with small orange horizontal accent `▬` immediately beside it.
  - Main Heading: `Master Java & OOP` on one line on desktop ("Master" in `#17191D`, "Java" in `#075CF5`, "&" in `#17191D`, "OOP" in `#FF7A00`).
  - Supporting text: `"Explore core concepts, build a strong foundation, and learn by doing."` in subdued `#64748B`.
  - Ambient Background: White / subtle off-white (`#FAFAFA`) with soft, low-opacity flowing wave shapes.
- **Two Horizontal Track Selectors:**
  - Track 1 (Java Programming): Official Java logo (cup + steam), title, subtitle. When selected: light blue surface (`#F8FAFF`), thin cobalt-blue outline (`#075CF5`), soft cobalt shadow, and restrained orange curved corner accent at bottom-right.
  - Track 2 (Object-Oriented Programming): Approved 3-layer stacked geometric OOPS LAB symbol, title, subtitle. Same active/inactive state styling.
- **Curriculum Header & Search Toolbar:**
  - Small vertical orange accent bar to the left.
  - Dynamic title: "Java Programming Curriculum" / "Object-Oriented Programming Curriculum".
  - Dynamic subtitle: "A structured path from fundamentals to advanced concepts." / "A structured path from OOP foundations to advanced object-oriented design.".
  - Search field on right: `"Search concepts..."`, white background, subtle neutral border (`#E5E7EB`).
- **Connected Numbered Vertical Curriculum List:**
  - Single clean lightly bordered container (`bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden relative`).
  - Continuous subtle vertical connecting line behind number badges (`w-px bg-[#E5E7EB]`).
  - Sequential two-digit numbering (`01`, `02`, `03`...) in small circular indicators (`w-7 h-7 rounded-full`). First/highlighted indicator uses cobalt blue (`bg-[#075CF5] text-white`), remaining use light neutral (`bg-[#F1F5F9] text-[#64748B]`).
  - Compact icon container immediately to the right of each number (`w-9 h-9 rounded-xl`).
  - Lesson title (bold near-black `#17191D`) and short description (smaller subdued blue-grey `#64748B`).
  - Difficulty badge on far right: Beginner (`#ECFDF5`/`#065F46`), Intermediate (`#EFF6FF`/`#1E40AF`), Advanced (`#FFF7ED`/`#C2410C`).
  - Thin horizontal dividers between rows (`divide-y divide-[#F1F5F9]`).
  - Clickable rows wired to `navigate(lesson.targetRoute)`.
  - Guest mode preserved (no progress bars, checkmarks, completion stats, or account locks).

---

## 2. Verification
- `pnpm exec tsc --noEmit` exited with code 0 (0 type errors).
- `pnpm run build` completed in 19.88s with clean bundle output.

