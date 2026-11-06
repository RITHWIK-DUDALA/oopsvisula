# Task Record: OOPS-20261031-0019 — Hover-Only Electric Border Trigger

**ID:** OOPS-20261031-0019  
**Date:** 2026-10-31 11:23:00 IST  
**Directive:** "this effect should only come when hovered on the component"  
**Classification:** `IMPLEMENTED`  

---

## 1. Architectural Architecture & Scope
- **Problem Statement:** The electric border was continuously active on all capability cards, creating visual density and consuming continuous WebGL frame cycles even when the user was not interacting with the cards.
- **Solution:**
  1. Added `hoverOnly?: boolean` prop (default `false`) to `ElectricBorder.tsx`.
  2. Implemented hover tracking via `onPointerEnter` / `onPointerLeave` on the component container.
  3. When `hoverOnly={true}`:
     - The component sits quietly in idle state with `active: false`, `power = 0`, and `opacity: 0`.
     - Upon pointer entry, `effectiveActive` switches to `true`, waking the WebGL loop, triggering the initial perimeter current surge (`reveal = 0 -> 1`), and transitioning canvas opacity to `1`.
     - Upon pointer exit, `effectiveActive` switches to `false`, smoothly decaying power (`power -> 0`) and fading opacity back to `0` over `0.25s`.
  4. Enabled `hoverOnly={true}` across the focal cards in `LandingPage.tsx` (the 4 Core Capability cards, JVM simulation preview card, Simulation Pipeline card, and Privacy card).

---

## 2. Files Modified
- `frontend/src/components/ElectricBorder.tsx`: Added `hoverOnly` prop, hover listeners, effective active state, and smooth opacity transitions.
- `frontend/src/features/landing/LandingPage.tsx`: Added `hoverOnly={true}` to all focal card ElectricBorders.

---

## 3. Verification & Build
- `tsc -b && vite build`: Exited with code 0 in 13.54s (2,075 modules transformed).
- `graphify update .`: Local graph updated (832 nodes, 1,315 edges, 73 communities).
- Dev server running live on `http://localhost:5173/`.

