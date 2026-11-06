# Task Record — Execution Timeline Scrubber Track Centering Fix

**Record ID:** OOPS-20261101-0036-TIMELINE_TRACK_CENTERING_FIX  
**Date:** 2026-11-01 14:28:00  
**Status:** COMPLETED  
**Related Components:** `frontend/src/features/playground/components/ExecutionTimeline.tsx`  

---

## 1. Problem Description & Root Cause Diagnosis
The user provided a visual defect screenshot (`media_1793523362895_ea0f43e0.png`) showing that in the Execution Timeline scrubber (`Create Account`, `Call deposit()`, `Check amount > 0`, `Update balance`, `Return from deposit`, `Print balance`), the horizontal connecting track line was floating ~8px *above* the circles instead of passing directly through their exact vertical centers.

### Root Cause Analysis:
1. **Vertical Offset:**
   - The outer container had `pt-2` (8px).
   - Each step button's circle has height `h-7` (28px), placing its vertical center at $8\text{px} + 14\text{px} = 22\text{px}$.
   - The absolute connecting track line was styled with `top-3.5` ($14\text{px}$) and `-translate-y-1/2`, placing it at $y = 14\text{px}$ — exactly 8px above the center of the circles.
2. **Horizontal Inset Inexactness:**
   - The connecting line previously used static `left-8 right-8` padding, which did not precisely terminate at the horizontal centers of the first and last step circles across varying screen widths.

---

## 2. Mathematical Solution Applied
To achieve 100% pixel-perfect centering regardless of responsive container dimensions:
1. **Vertical Centering:**
   - Placed the step circles inside a container where the circle starts at $y = 0\text{px}$.
   - Since the circle is `h-7` (28px), its center is at $y = 14\text{px}$.
   - Styled the continuous track line with `top-[14px] -translate-y-1/2 h-[2px]`, ensuring the line's center is at exactly $y = 14\text{px}$.
2. **Horizontal Centering via Grid Geometry:**
   - Structured the nodes within a grid: `gridTemplateColumns: repeat(N, minmax(0, 1fr))`.
   - For $N$ steps, each column occupies $\frac{100\%}{N}$ width.
   - The center of column $0$ is at $x = \frac{100\%}{2N}$ (for $N=6$, this is $8.333\%$).
   - The center of column $N-1$ is at $x = 100\% - \frac{100\%}{2N}$ ($91.667\%$).
   - Configured the continuous track line with:
     ```css
     left: calc(100% / (steps.length * 2));
     right: calc(100% / (steps.length * 2));
     ```
   - This mathematically locks the track's start and end points to the exact center of step 1 and step 6.
3. **Layering & Contrast:**
   - Step circles have `z-10` with solid `bg-white` or `bg-[#F47B20]`, cleanly obscuring the line behind them while letting the line bridge the gaps seamlessly.

---

## 3. Verification & Validation
- **TypeScript Check:** `pnpm exec tsc --noEmit` exited with code 0 (no errors).
- **Vite Production Build:** `pnpm run build` completed in 16.43s with 0 errors (2,082 modules transformed).
- **Live Dev Server:** Process running on `http://localhost:5173/` dynamically rendered the fix.

