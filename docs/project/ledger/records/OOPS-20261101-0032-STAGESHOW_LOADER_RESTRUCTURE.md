# TASK RECORD: OOPS-20261101-0032-STAGESHOW_LOADER_RESTRUCTURE
**Title:** Restructure OOPS LAB Loading UI Using the Installed Stageshow Design Skill  
**Date:** 2026-11-01 12:25:00 (Local Time)  
**Parent Directive:** Skill-Guided Loading UI Restructure  
**Status:** COMPLETED  
**Task ID:** STAGESHOW-RESTRUCTURE-01  

---

## 1. Skill Selection & Justification
- **Selected Skill:** `stageshow` ([`.agents/skills/stageshow/SKILL.md`](file:///c:/Users/LENOVO/OneDrive/Desktop/java%20oops/.agents/skills/stageshow/SKILL.md)).
- **Why Selected:** `stageshow` codifies production-level product UI framing, craft restraint, spacing, typography, motion curves, and rehearsal loops specifically for realistic, high-fidelity UI components.

---

## 2. Key Stageshow Design Rules Applied
1. **Restraint & Word Budget (`references/craft.md`):**
   - The loading card keeps a strict word budget: only the brand label ("OOPS LAB") and dynamic initialization telemetry status.
   - Zero superfluous progress bars, decorative particles, or fake cards.
2. **Spacing & Alignment (`references/craft.md`):**
   - Uniform vertical rhythm: Logo (60px) -> 16px gap -> Brand Mark (17px) -> 8px gap -> Telemetry Status (13px).
   - Fixed height status slot (`h-6`) to prevent text shifts and jitter during crossfading status updates.
   - 24px outer card radius matching `--ss-radius-card: 24` with balanced `px-8 py-9` insets.
3. **Motion Curves (`references/motion.md`):**
   - Overlay entrance / arrival: `cubic-bezier(0.25, 0.8, 0.25, 1)`.
   - Overlay departure / travel: `cubic-bezier(0.45, 0, 0.1, 1)`.
   - Fill fade transition: `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Staggered trace sequence: 120ms cadence (Top 0s, Middle 0.12s, Bottom 0.24s).

---

## 3. Component Architecture & Files Modified
- **`frontend/src/features/transition/LoadingCard.tsx`:** Replaced the legacy hexagonal logo with the approved `LogoTraceLoader`, styled with refined elevation and exact vertical cadence.
- **`frontend/src/features/transition/AnimatedOOPSLogo.tsx`:** Updated to forward all props to `LogoTraceLoader`, permanently preventing the rejected hexagonal loader from rendering.
- **`frontend/src/features/transition/ApplicationTransition.tsx`:** Coordinated sequence state (`isLoading`, `isComplete`, `onDone`) with `stageshow` easing curves.
- **`frontend/src/components/LogoTraceLoader.tsx`:** Certified 4-phase animation sequence with three separated, rounded, stacked geometric layers in `viewBox="0 0 100 100"`.

---

## 4. Verification & Testing
- **TypeScript:** `pnpm exec tsc --noEmit` passed with 0 errors.
- **Vite Build:** `pnpm run build` passed with 0 errors (2,080 modules transformed in 16.17s).
- **Reduced Motion:** Verified `prefers-reduced-motion` renders filled three-color mark immediately and invokes `onDone()`.
- **HMR:** Dev server live-updated all transition components on `http://localhost:5173/`.

