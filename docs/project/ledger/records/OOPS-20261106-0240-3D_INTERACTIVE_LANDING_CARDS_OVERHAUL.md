# OOPS LAB TASK RECORD — OOPS-20261106-0240
# 3D INTERACTIVE CARDS OVERHAUL (ALL 4 REFERENCE SCREENSHOT SECTIONS)

**Task ID:** OOPS-20261106-0240  
**Central ID:** 3DC-03  
**Status:** COMPLETED  
**Date:** 2026-11-06 02:40:00  
**Engineers:** Principal Architect, Full-Stack UI Simulation Engineer  

---

## 1. Objective & User Directive

Completely overhaul the 3D interactive card experience across all cards shown in the user's 4 reference screenshots:
1. **Screenshot 1 — "Interactive Java 21 Memory Projections" (Section 2):**
   - Java 21 Source card with active line highlight
   - Call Stack (LIFO) card with active frame and floating variable pills
   - JVM Eden Heap card with class/address header and floating instance field rows
2. **Screenshot 2 — Four Core Capabilities (Section 3):**
   - 3-Panel Execution Workspace (Cobalt Studio)
   - Visual UML Class Builder (UML Modeling)
   - AST Security Sandbox (AST Sandbox)
   - 14-Step Curriculum & Auto-Grading (Java 21 LTS)
3. **Screenshot 3 — Simulation Pipeline (Section 4):**
   - STEP 01: Author Java 21 Code
   - STEP 02: AST Security Scan
   - STEP 03: JDI Trace Capture
   - STEP 04: Interactive Replay
4. **Screenshot 4 — Privacy & Governance (Section 5):**
   - Guest Session Security
   - Full JSON Export
   - Isolated Container Runner

---

## 2. Root Cause Analysis of Previous 3D Issues

1. **2D Flattening via Ancestor `overflow: hidden`:**
   In CSS 3D specifications, any ancestor element with `overflow: hidden` establishes a 2D clipping boundary that destroys `transform-style: preserve-3d` across the boundary. Section 4 and Section 5 outer panels were using `variant="panel"` without `interactive3D={true}`, applying `overflow-hidden` which flattened all child cards into 2D flat boxes.
2. **CSS Transition Fighting RAF Mouse Tracking:**
   `CloudSurface.tsx` applied `transition-all duration-300` unconditionally. When the user moved their mouse, JavaScript requested 60/120fps transforms while Tailwind's 300ms CSS transition was actively trying to interpolate, resulting in laggy, janky, or unresponsive tilt.
3. **Double `contentClassName` Application:**
   `Interactive3DCard.tsx` applied `contentClassName` to its inner wrapper, and `CloudSurface.tsx` applied `contentClassName` again to its own inner wrapper, doubling padding (`p-6` became `p-12`), causing squished content.
4. **Missing Camera Perspective Container:**
   `Interactive3DCard.tsx` was putting `perspective()` into the transform string of the tilting plate itself. In CSS, `perspective()` inside `transform` applies only to the element's own matrix, not to its children. For children with `translateZ(...)` to show real optical parallax, the parent container must establish the perspective camera.

---

## 3. Engineering Implementation

### 3.1 `Interactive3DCard.tsx` Architecture
- **Two-Layer Projection:**
  - Outer container sets `perspective: ${perspective}px` (800px–900px) and `transform-style: preserve-3d`.
  - Inner card plate applies `rotateX`, `rotateY`, `scale3d`, `transform-style: preserve-3d`.
- **Direct 120fps RAF Tracking:**
  - Immediate `requestAnimationFrame` transform calculation with zero React state overhead.
  - Active transition `transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)`.
  - Mouse leave spring ease `transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)` returning to neutral.
  - Mouse down tactile depression `scale3d(0.98, 0.98, 1)`.
- **Dynamic Cursor-Following Border Spotlight:**
  - Radial gradient overlay `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255, 255, 255, 0.95), transparent 70%)` illuminates the card border nearest the cursor.
- **Dynamic Specular Glare Sheen:**
  - Soft radial sheen tracking cursor coordinates on frosted glass.
- **Dynamic Opposite 3D Drop Shadow:**
  - Realistic shadow cast moving opposite to the cursor tilt direction.

### 3.2 `CloudSurface.tsx` Updates
- Suppressed `transition-all duration-300` when `interactive3D={true}`.
- Removed `overflow-hidden` from panel containers containing 3D elements.
- Resolved `contentClassName` duplication so padding is applied exactly once.
- Added support for `borderGlow`, `borderGlowColor`, `borderGlowSize`, and `wrapperClassName`.

### 3.3 `LandingPage.tsx` Multi-Plane Z-Depth
- **Section 2:**
  - Main panel remains stable with frosted glass.
  - Java 21 Source, Call Stack LIFO, and JVM Eden Heap calibrated with 14° tilt, 1.035 scale, elevated headers (`translateZ(26px)`), and floating variable rows (`translateZ(32px)`).
- **Section 3:**
  - All 4 core capability cards calibrated with 16° tilt, 1.045 scale, elevated icon containers (`translateZ(42px)`), badges (`translateZ(40px)`), headings (`translateZ(28px)`), and descriptions (`translateZ(18px)`).
- **Section 4:**
  - All 4 simulation step cards calibrated with 16° tilt, elevated step badges (`translateZ(42px)`), headings (`translateZ(28px)`), and descriptions (`translateZ(18px)`).
- **Section 5:**
  - All 3 privacy & governance cards calibrated with 16° tilt, elevated headings (`translateZ(28px)`), and descriptions (`translateZ(18px)`).

---

## 4. Verification & Validation

- `pnpm exec tsc --noEmit`: **0 errors**.
- `pnpm run build`: **3,266 modules built successfully in 36.59s**.
- Vite dev server running cleanly on port 5173 with HMR updates active.

