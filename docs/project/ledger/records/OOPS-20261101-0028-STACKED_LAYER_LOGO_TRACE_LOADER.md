# TASK RECORD: OOPS-20261101-0028-STACKED_LAYER_LOGO_TRACE_LOADER
**Title:** Stacked Layer SVG Logo Trace Loader Component  
**Date:** 2026-11-01 10:45:00 (Local Time)  
**Parent Directive:** `components/LogoTraceLoader.tsx` Stacked Layer Redesign  
**Status:** COMPLETED  
**Task ID:** STACK-LOADER-01  

---

## 1. Objective
Replace the previous hexagonal loader mark with a new, three-layer stacked geometric symbol representing layered Java runtime memory (Eden Heap, Stack Frames, Runtime Classes) with animated SVG stroke tracing and smooth resolution into the filled brand mark.

---

## 2. Geometry & Proportions
- **ViewBox:** `0 0 100 100` (symmetrical around `(50, 50)`).
- **Structure:** Exactly three separated, rounded, stacked diamond-shaped layers.
  - **Top Layer:** Symmetrical rounded isometric diamond (`M 45.16 16.12 Q 50 13.50 ... Z`), centered at `(50, 33)`, width 72, height 39.
  - **Middle Layer:** Stacked isometric slab with smooth inner V notch and outer rounded lip, centered at `(50, 50)`, width 72, height 28.
  - **Bottom Layer:** Stacked isometric slab with smooth inner V notch and outer rounded lip, centered at `(50, 67)`, width 72, height 28.
- **Vertical Spacing:** Uniform 4.5-5.0 unit gap between layers.
- **Width:** Identical 72-unit width across all three layers.

---

## 3. Four-Phase Animation Sequence
1. **Phase 1 (Initial):** Faint background track outlines (`opacity: 0.22`, `stroke: currentColor`, `fill: none`).
2. **Phase 2 (Tracing):** Continuous cobalt blue stroke segments (`strokeDasharray: "0.18 0.82"`, `pathLength: 1`) traveling smoothly around each layer's contour with staggered delays (`0s`, `0.12s`, `0.24s`).
3. **Phase 3 (Outline Complete):** Looping stops; stroke resolves into complete dark/charcoal outline (`#171B22`).
4. **Phase 4 (Filled Logo):** Three brand-colored filled shapes fade in smoothly:
   - Top Layer: `--loader-blue` (`#1263F1` Cobalt Blue)
   - Middle Layer: `--loader-blue-light` (`#65A6FF` Lighter Blue)
   - Bottom Layer: `--loader-blue-dark` (`#103FAD` Deep Cobalt / Navy Blue)
   - Exactly once fully visible, `onDone()` fires.

---

## 4. Contract Conformance
```tsx
type LogoTraceLoaderProps = {
  loading?: boolean;
  isComplete?: boolean;
  size?: number;
  strokeWidth?: number;
  loopDurationSeconds?: number;
  fillFadeSeconds?: number;
  className?: string;
  ariaLabel?: string;
  onDone?: () => void;
};
```
Defaults: `loading = true`, `isComplete = false`, `size = 64`, `strokeWidth = 4`, `loopDurationSeconds = 1.2`, `fillFadeSeconds = 0.4`, `ariaLabel = "Loading OOPS LAB"`.

---

## 5. Verification & Tests
- `pnpm exec tsc --noEmit`: 0 TypeScript compiler errors.
- `pnpm run build` (`tsc -b && vite build`): Succeeded in 15.49s; 2,080 modules transformed cleanly.
- `prefers-reduced-motion`: Immediately renders filled mark and invokes `onDone()`.
- State reset: Setting `loading = true` resets internal phase to `loop`.
- Callback safety: `doneFiredRef` guard ensures `onDone()` is triggered strictly once.
- Hot Module Replacement: Dev server updated `/src/components/LogoTraceLoader.tsx` with 0 console errors.

