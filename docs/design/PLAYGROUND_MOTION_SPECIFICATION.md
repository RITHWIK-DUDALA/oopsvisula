# OOPS LAB — Playground Motion Specification
**Document ID:** `PLAYGROUND_MOTION_SPECIFICATION.md`  
**Standard:** Evidence-Based Animation & Transition Protocol  
**Skill Reference:** Benji Taylor's `stageshow` Motion Architecture (`references/motion.md`)  
**Status:** PROPOSED & CALIBRATED — Awaiting User Authorization on Final Timings  

---

## 1. Motion Philosophy & Guidelines

1. **No Guessing Policy:** The supplied reference screenshots are static images. They prove visual geometry, layout boundaries, and color states, but do not contain time-series video frames for easing or duration.
2. **Authoritative Skill Baselines:** All proposed easings and durations derive strictly from the installed `stageshow` design skill:
   - **Travel & Direct Feedback:** `cubic-bezier(0.45, 0, 0.1, 1)` (Duration: 150ms – 250ms).
   - **Arrival from Nowhere / Mounts:** `cubic-bezier(0.25, 0.8, 0.25, 1)` (Duration: 600ms – 800ms).
   - **Hue / Color Switches:** 200ms linear or subtle ease.
3. **Reduced Motion:** If `prefers-reduced-motion: reduce` is active, all durations collapse to `0ms` with instantaneous state transitions.
4. **Execution Integrity:** Motion never delays runtime stepping, AST security checks, or user input controls.

---

## 2. Transition Matrix

| Interaction | From State | To State | Duration | Easing Curve | Animated CSS Properties | Verification Source |
|---|---|---|---|---|---|---|
| **Mode Switch (2D to 3D)** | 2D Memory Canvas | 3D Three.js Canvas | 240ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `opacity`, `transform` (scale 0.98 -> 1.0) | `stageshow` scene transition |
| **Active Tab Switch** | Inactive Tab | Active Tab | 180ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `color`, `border-color`, `transform` (underline marker) | `stageshow` fast feedback |
| **Current Source Line** | Line $N$ | Line $N+1$ | 160ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `transform: translateY()`, `background-color` | Monitored step tracker |
| **Timeline Progress** | Step $K$ | Step $K+1$ | 180ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `width` (fill track), `transform: translateX()` (thumb) | Scrubber feedback |
| **Heap Field Mutation** | Old Field Value | New Field Value | 300ms | `cubic-bezier(0.25, 0.8, 0.25, 1)` | `background-color` (orange highlight pulse), `color` | Field diff notification |
| **Reference Pointer Selection** | Neutral Cobalt (`#1263F1`) | Active Orange (`#F47B20`) | 200ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `stroke`, `stroke-dashoffset` | Pointer emphasis |
| **Sidebar Collapse** | Expanded (232px) | Collapsed (64px) | 220ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `width`, `opacity` | Shell transition |
| **Panel Resize** | Previous Width | New Dragged Width | 0ms (Immediate) | Direct user gesture | `flex-basis`, `width` | User pointer tracking |
| **Fullscreen Toggle** | Normal Window | Fullscreen Container | 250ms | `cubic-bezier(0.45, 0, 0.1, 1)` | `position`, `width`, `height`, `z-index` | Layout expand |

---

## 3. Contextual Orange Execution Accent Rules

The active orange color (`#F47B20` / `#EA580C`) is strictly applied as a **transient execution indicator**:
1. When execution step advances, the executing line in Monaco Editor transitions its gutter arrow and background highlight to orange for the active duration.
2. In the heap visualizer, when an object field is mutated (e.g. `balance: 750.0`), a subtle orange diff badge pulses and smoothly settles.
3. Normal pointers and tabs return to cobalt blue (`#1263F1`) once execution pauses or resets.

---

## 4. Verification & Authorization Note

> [!IMPORTANT]
> The duration values above represent the **installed `stageshow` craft skill standards**. Because the provided references are static PNG/JPEG screenshots, these timings are classified as **PROPOSED**. User confirmation is requested to formally approve these timings or supply an MP4/motion reference.

