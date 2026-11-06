# OOPS LAB — Playground Exact Replication Specification
**Document ID:** `PLAYGROUND_EXACT_REPLICATION_SPEC.md`  
**Standard:** Exact Functional & Visual Replication (Reference Calibration)  
**Viewport Reference:** `1648 × 928` px (Standardized High-Resolution Laboratory Frame)  
**Sampled Image Resolution:** `1024 × 576` px (Aspect Ratio 16:9 / 1.777)  
**Design Skill in Effect:** `stageshow` (Isolated Local UI/UX Engineering Standard)  
**Classification:** Confirmed Authoritative Specification  

---

## 1. Global Viewport & Layout Metrics

| Component / Region | Measured Pixels (1648 × 928 Viewport) | Measured Pixels (1024 × 576 Sampled) | Viewport % (Width × Height) | Layout Role / Anchor |
|---|---|---|---|---|
| **Full Viewport Frame** | 1648px × 928px | 1024px × 576px | 100.00% × 100.00% | Root laboratory display canvas |
| **Left Sidebar** | 232px × 928px | 144px × 576px | 14.08% × 100.00% | Persistent primary navigation |
| **Top Application Header** | 1416px × 80px | 880px × 50px | 85.92% × 8.62% | Brand, scenario & environment tools |
| **Execution Toolbar** | 1416px × 76px | 880px × 47px | 85.92% × 8.19% | Stepper, playback & code actions |
| **Main 2-Panel Workspace** | 1416px × 542px | 880px × 336px | 85.92% × 58.41% | Housing Java Source Editor & Visualizer |
| **Source Code Editor Panel** | 631px × 542px | 392px × 336px | 38.29% × 58.41% | Left pane (45.2% of workspace) |
| **JVM Runtime Visualizer** | 763px × 542px | 474px × 336px | 46.30% × 58.41% | Right pane (54.8% of workspace) |
| **Bottom Workspace Region** | 1416px × 209px | 880px × 130px | 85.92% × 22.52% | Stepper timeline & output terminal |
| **Execution Timeline Panel** | 631px × 209px | 392px × 130px | 38.29% × 22.52% | Bottom-left pane |
| **Execution Console Panel** | 763px × 209px | 474px × 130px | 46.30% × 22.52% | Bottom-right pane |

---

## 2. Spacing System (16px Primary Layout Grid)

All major section insets and gutters adhere strictly to the centralized 16px CSS spacing tokens:

```css
:root {
  --playground-gap: 16px;
  --playground-page-padding: 16px;
  --playground-panel-gap: 16px;

  /* Internal Component Micro-Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
}
```

- **Page-Level Insets:** 16px (`p-4` / `16px`) padding around workspace panels.
- **Inter-Panel Horizontal Gutters:** Exactly 16px gap between Source Editor and Visualizer.
- **Inter-Panel Vertical Gutters:** Exactly 16px gap between Main Workspace and Bottom Region.
- **Inter-Panel Bottom Gutters:** Exactly 16px gap between Execution Timeline and Execution Console.

---

## 3. Typography & Micro-Metrics

| Element | Font Family | Size | Weight | Line Height | Color Token |
|---|---|---|---|---|---|
| **App & Sidebar Title** | Sans-Serif (`Inter`) | 14px (`text-sm`) | 700 (Bold) | 1.2 | `#171717` (Slate 900) |
| **Sidebar Subtext** | Sans-Serif (`Inter`) | 10px (`text-[10px]`) | 500 (Medium) | 1.0 | `#71717A` (Zinc 500) |
| **Sidebar Category Labels** | Sans-Serif (`Inter`) | 10px (`text-[10px]`) | 600 (Semibold) | 1.0 | `#9CA3AF` (Gray 400) |
| **Sidebar Navigation Items** | Sans-Serif (`Inter`) | 13px (`text-[13px]`) | 500 / 600 | 1.2 | `#374151` / `#EA580C` |
| **Playground Header Title** | Sans-Serif (`Inter`) | 16px (`text-base`) | 700 (Bold) | 1.2 | `#171717` |
| **Scenario Dropdown Text** | Sans-Serif (`Inter`) | 12px (`text-xs`) | 500 (Medium) | 1.2 | `#171717` |
| **Toolbar Button Labels** | Sans-Serif (`Inter`) | 12px (`text-xs`) | 500 / 600 | 1.0 | `#FFFFFF` / `#171717` |
| **Editor Tab File Name** | Sans-Serif (`Inter`) | 12px (`text-xs`) | 500 (Medium) | 1.0 | `#171717` |
| **Java Source Code** | Monospace (`Consolas`, `SFMono`) | 13px (`text-[13px]`) | 400 / 700 | 1.5 | Multi-token High Contrast |
| **Gutter Line Numbers** | Monospace | 12px (`text-xs`) | 400 | 1.5 | `#9CA3AF` |
| **Visualizer Card Titles** | Sans-Serif (`Inter`) | 12px (`text-xs`) | 600 (Semibold) | 1.2 | `#171717` |
| **Stack/Heap Object Values** | Monospace | 11px (`text-[11px]`) | 500 / 600 | 1.2 | `#1E293B` / `#16A34A` |
| **Console Terminal Output** | Monospace | 13px (`text-[13px]`) | 500 (Medium) | 1.4 | `#F8FAFC` (White on Navy) |

---

## 4. Color Palette & State Mapping

### 4.1 Default State (Cobalt Blue Baseline)
- **Primary Brand Cobalt Blue:** `#1263F1` (or `#2563EB`)
- **2D Segmented Button Active Background:** `#1263F1` (text: `#FFFFFF`)
- **Editor Tab Active Icon Accent:** `#1263F1`
- **Object Shape Legend Border:** `#1263F1` (2px solid)
- **Java Keyword Token:** `#1263F1` (bold monospace)

### 4.2 Active Execution State (Contextual Warm Orange)
- **Active Execution Orange:** `#F47B20` (hover: `#EA580C`)
- **Run Button Background:** `#F47B20` (text: `#FFFFFF`, shadow: `0 1px 2px rgba(244,123,32,0.3)`)
- **Active Source Line Highlight:** `rgba(244, 123, 32, 0.12)`
- **Active Source Line Gutter Marker:** `3px solid #F47B20` + orange play arrow `▶`
- **Active Timeline Step Node:** `#F47B20` fill, white number, `ring-4 ring-[#F47B20]/25`
- **Timeline Completed Nodes:** `#F47B20` fill, white checkmark `✓`
- **Timeline Connecting Progress Line:** `#F47B20` (2px solid)
- **Active Call Stack Frame Background:** `#FFF7ED` (Warm Peach) with `#FED7AA` border
- **Reference Pointer Connecting Arrow:** `#F47B20` (2px curved Bezier stroke)
- **Visualizer Active Tab Underline:** `#F47B20` (2px solid)
- **Console Tab Active Accent:** `#EA580C`
- **Console Command Prompt:** `#F47B20` (`>`)

### 4.3 Neutral Backgrounds & Card Surfaces
- **App Outer Canvas:** `#FAFAFA` (Soft neutral well)
- **Card Panel Background:** `#FFFFFF` (Pure white)
- **Terminal Background:** `#162135` (Deep Navy / Slate 900)
- **Structural Borders:** `#E5E7EB` (1px solid light gray)
- **Card Corner Radii:** `12px` (`rounded-xl` outer cards), `8px` (`rounded-lg` inner cards)

---

## 5. Component Interaction Architecture

```
                                  [TopHeader]
      [Scenario Selector]       [Java 21 LTS]       [2D / 3D Mode Toggle]
                 \                   |                   /
                  v                  v                  v
               ================================================
                              simulationStore
               ================================================
                  /                  |                  \
                 v                   v                   v
      [SourceEditorPanel]  [UnifiedRuntimeVisualizer] [ExecutionControl]
       - Line Highlight     - Call Stack (2D / 3D)    - Run / Step / Pause
       - Gutter Arrow       - Heap Objects (2D / 3D)  - Reset / Speed
       - Monaco Sync        - Reference Connectors    - Timeline Scrubber
                            - Memory Overview         - Console / Output
```

