# Task Record: OOPS-20261102-0053-AEROSHARDS_TRACK_SWITCHING_TRANSITION

**Date:** 2026-11-02  
**Status:** COMPLETED  
**Directive:** Implement a coordinated animated transition when switching between Java Programming and OOP learning tracks using the React Bits AeroShards component with fallback guards.

---

## 1. Scope & Implementation
- **AeroShards Component (`frontend/src/components/AeroShards.tsx`):**
  - Implemented the full React Bits `AeroShards` component with all configuration props:
    `shardColor` (`#075CF5`), `accentColor` (`#FF8500`), `backgroundColor` (`transparent`), `lightMode` (`true`), `count` (`550`), `depthOfField` (`0.45`), `glow` (`0.18`), `vignette` (`0.1`), `intro` (`true`), `dpr` (`1`).
  - Render engine: Procedural 3D folded glass foil shards with dual-facet directional lighting, specular rim highlights, depth sorting, and horizontal velocity drift.
  - Zero resource leaks: Clean lifecycle cancellation via `cancelAnimationFrame` and `removeEventListener`.
  - Fallback engine: Instant CSS-based cobalt & orange gradient sweep fallback if WebGPU/Canvas is unavailable or when `prefers-reduced-motion` is active.
- **Concepts Page Integration (`frontend/src/features/concepts/ConceptsPage.tsx`):**
  - Preserved the existing design, typography, spacing, and layout of the Concepts page.
  - State machine: `isTrackTransitioning`, `transitionPhase` (`idle` | `exiting` | `sharding` | `entering` | `fading`), and `pendingTrack`.
  - Guard: Prevents duplicate switching or re-triggering while an animation is already in flight, and ignores clicks on the currently selected track.
  - **4-Phase Coordinated Timeline (~900ms total):**
    - Phase 1 (0–150ms): User clicks new track; previous curriculum content begins subtle lift-out (`opacity-40 -translate-y-1`), shard overlay mounts.
    - Phase 2 (150–450ms): Cobalt blue and orange glass shards sweep horizontally across the track selector region.
    - Phase 3 (450–700ms): Active track state transitions (`setSelectedTrack`), heading and module list update, smoothly crossfading in (`opacity-85 translate-y-0.5`).
    - Phase 4 (700–900ms): Shard overlay fades out smoothly (`opacity-0`), and at 900ms completely unmounts. No permanent shards remain.
- **Accessibility:**
  - Full keyboard accessibility (`Enter`, `Space`) with `aria-pressed`.
  - `prefers-reduced-motion` media query skips the shard canvas and performs an immediate track switch.

---

## 2. Verification
- `pnpm exec tsc --noEmit` exited with code 0 (0 errors).
- `pnpm run build` completed in 27.41s (2,081 modules transformed cleanly).
- Localhost Vite dev server running daemon on port 5173.

