# Task Record — Remove Glowing Electric Border Effect from Landing Page

**Record ID:** `OOPS-20261101-0047-REMOVE_GLOWING_ELECTRIC_BORDER_FROM_LANDING`  
**Date:** 2026-11-01 21:55:00  
**Status:** COMPLETED  
**Category:** UI-CLEANUP  
**Checklist Point:** CP-0058  
**Related Component:** `frontend/src/features/landing/LandingPage.tsx`  

---

## 1. Problem Statement & User Directive

The user uploaded two screenshots (`media_1793550081977_0e48eb58.jpg` and `media_1793550082815_49b1f555.jpg`) showing the **Simulation Pipeline** section ("How the Execution Visualizer Works.") wrapped in a yellow/gold glowing WebGL animated electric border (`ElectricBorder`).

The directive stated: `"removethis effect"`.

### Design Standard Context
Per `AGENTS.md` Section 3:
- **Theme:** Monochromatic light interface. Minimalist, sophisticated, balanced density, modern sans-serif typography.
- Garish electric lightning shaders conflict with the clean, restrained educational aesthetic.

---

## 2. Implementation Details

1. **Section 4 (Simulation Pipeline):**
   - Removed the `<ElectricBorder color="#F5BD24" ...>` wrapper enclosing the 4-step pipeline card.
   - Restored standard clean white card styling: `p-8 bg-white border border-[#E5E7EB] rounded-2xl space-y-6 shadow-xs`.
2. **Remaining Landing Cards (Section 2, 5 & 6):**
   - Removed `<ElectricBorder>` from Section 2 (JVM Simulation Preview Card), Section 5 (Privacy & Governance Card), and Section 6 (Final CTA Card).
   - Removed the unused `import ElectricBorder from '@/components/ElectricBorder';`.
3. **Bundle Performance Optimization:**
   - Removing the WebGL2 shader component reduced the production JavaScript bundle by ~20KB.

---

## 3. Verification & Validation

- **TypeScript Typecheck:** `pnpm exec tsc --noEmit` passed with 0 errors.
- **Production Build:** `pnpm run build` completed successfully in 21.56s with 2,078 modules transformed.
- **Dev Server:** Hot Module Replacement (HMR) active and running on `http://localhost:5173/`.

