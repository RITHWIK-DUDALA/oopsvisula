# OOPS LAB — Playground Reference Measurements Specification
**Document ID:** `PLAYGROUND_REFERENCE_MEASUREMENTS.md`  
**Standard:** Strict Visual Fidelity & Measured Proportions  
**Design Reference Viewport:** 1648 × 928 pixels  
**Derived From:** Authoritative Reference Screenshots & Metric Calibration  
**Classification:** Confirmed Reference Benchmark  

---

## 1. Global Viewport & Frame Metrics

| Metric | Target (Pixels) | Target (%) | Status | Source Category |
|---|---|---|---|---|
| **Viewport Width** | 1648px | 100.00% | Verified | (B) Measurable Reference |
| **Viewport Height** | 928px | 100.00% | Verified | (B) Measurable Reference |
| **Primary Layout Gap** | 16px | ~0.97% | Mandatory | (A) Explicitly Specified |
| **Page Outer Padding** | 16px | ~0.97% | Mandatory | (A) Explicitly Specified |
| **Major Panel Gap** | 16px | ~0.97% | Mandatory | (A) Explicitly Specified |

---

## 2. High-Level Region Boundaries & Dimensions

| Region | Start (X, Y) | End (X, Y) | Measured Dimensions (W × H) | % of Viewport (W × H) | Notes |
|---|---|---|---|---|---|
| **Left Sidebar** | `(0, 0)` | `(232, 928)` | 232px × 928px | 14.08% × 100.00% | Full height persistent navigation |
| **Top Application Header** | `(232, 0)` | `(1648, 80)` | 1416px × 80px | 85.92% × 8.62% | Upper chrome with brand & tools |
| **Execution Toolbar** | `(232, 80)` | `(1648, 156)` | 1416px × 76px | 85.92% × 8.19% | Controls: Run, Step, Pause, Reset |
| **Inter-toolbar Separation** | `(232, 156)` | `(1648, 166)` | 1416px × 10px (or 16px gap) | 85.92% × 1.08% | Primary workspace gap alignment |
| **Main Workspace Container** | `(232, 166)` | `(1648, 708)` | 1416px × 542px | 85.92% × 58.41% | Housing Source Editor & Visualizer |
| **Inter-workspace Gap** | `(232, 708)` | `(1648, 719)` | 1416px × 11px (or 16px gap) | 85.92% × 1.19% | Separation to Bottom Region |
| **Bottom Region (Timeline + Console)** | `(232, 719)` | `(1648, 928)` | 1416px × 209px | 85.92% × 22.52% | Left: Timeline; Right: Console/Events |

---

## 3. Main Workspace Split Proportions (45:55 Ratio)

The workspace width available within the 1648px viewport (excluding 232px sidebar and 16px margins/gap):
- **Usable Workspace Width:** ~1394px
- **Editor Left Boundary:** 241px
- **Editor Right Boundary:** 872px
- **Visualizer Left Boundary:** 882px
- **Visualizer Right Boundary:** 1645px

| Panel | Measured Width | Measured Height | Percentage of Workspace | Verified Split Ratio |
|---|---|---|---|---|
| **Java Source Editor (Left)** | 631px | 542px | 45.26% | **45%** |
| **Panel Divider / Split Gap** | 10px (calibrated to 16px flex/grid) | 542px | ~0.72% | Resizable Splitter Anchor |
| **JVM Visualization (Right)** | 763px | 542px | 54.74% | **55%** |

*Policy Check:* The earlier 40:60 proposal is rejected per specification. The authoritative split is **45:55**.

---

## 4. Component Placement & Ordering Audit

### 4.1 Top Application Header (`h: 80px`)
- **Ordering (Left to Right):**
  1. `Brand Logo & Wordmark`: OOPS LAB 3-layer stacked geometric mark + wordmark.
  2. `Vertical Divider`: Subtle 1px `#E5E7EB` border.
  3. `Playground Title`: "Java OOP Visualizer".
  4. `Scenario Selector`: Dropdown (e.g., `BankAccount.java`, `InheritanceShape.java`).
  5. `Java Version Selector`: Badge/selector ("Java 21 LTS").
  6. `2D / 3D Segmented Selector`: Segmented pill switch (`2D` active default cobalt / `3D`).
  7. `Theme Control`: Light theme icon/selector.
  8. `Profile Control`: User/Guest status indicator.

### 4.2 Execution Toolbar (`h: 76px`)
- **Ordering (Left to Right):**
  1. `Run Button`: Primary action button (Cobalt `#1263F1` in default state; glowing execution indicator).
  2. `Step Forward Button`: Single instruction advance.
  3. `Pause / Resume Button`: Dynamic execution state toggle.
  4. `Reset Button`: Return to initial heap/stack step.
  5. `Vertical Separator`: 1px `#E5E7EB` divider.
  6. `Speed Selector`: Stepping speed scrubber / preset pills (`0.5x`, `1.0x`, `2.0x`).
- **Right Aligned Group:**
  1. `Save Button`: Persist modified scenario code.
  2. `Format Button`: Code reformatting trigger.
  3. `Fullscreen Toggle`: Focus expansion.

### 4.3 Visualizer Header
- **Ordering (Left to Right):**
  1. `Scene Title`: "JVM Visualization (2D)" or "3D Memory Scene".
  2. `Memory Tab`: Stack + Heap / Memory Layout.
  3. `Execution State Tab`: Call frames and evaluation state.
  4. `Information Control`: Scoped help / metadata tooltip.

### 4.4 Bottom Region (`h: 209px`)
- **Left Panel:** Execution Timeline (stepper scrubber, event checkpoints, frame indicators).
- **Right Panel:** Tabbed runtime output (Console stdout/stderr, Return Values, AST Security Events).

---

## 5. Strict 16px Layout Spacing System

All major panel separations and outer page insets strictly follow the 16px metric:

```css
:root {
  --playground-gap: 16px;
  --playground-page-padding: 16px;
  --playground-panel-gap: 16px;

  /* Internal 4px Component Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
}
```

- **Outer Workspace Insets:** 16px from sidebar boundary and window edges.
- **Inter-panel Gutters:** 16px between Editor and Visualizer, 16px between Main Workspace and Bottom Region.
- **Internal Component Padding:** 8px to 12px inside compact buttons, pills, and dropdown triggers per measured reference.

---

## 6. Color Systems & State Calibration

### 6.1 Default Cobalt State (Reference A)
- **Primary Brand / Action Blue:** `#1263F1` (or `#2463EB`)
- **Active Navigation Indicator:** `#1263F1`
- **Run Button Background:** `#1263F1` (text: `#FFFFFF`)
- **Selected 2D/3D Mode Pill:** `#1263F1`
- **Active Visualizer Tab Underline:** `#1263F1`
- **Selected Memory Tab:** `#1263F1`
- **Normal Reference Pointers / Connectors:** `#1263F1` (stroke width 2px)
- **Completed Timeline Steps:** `#1263F1`

### 6.2 Active Orange Execution State (Reference B)
- **Contextual Execution Orange:** `#F47B20` (or `#EA580C`)
- **Active Executing Source Line Gutter & Highlight:** `#F47B20` border, `rgba(244, 123, 32, 0.08)` fill
- **Current Execution Pointer Indicator:** `#F47B20`
- **Active Timeline Step Scrubber:** `#F47B20`
- **Mutated Heap Field Indicator:** `#F47B20` (badge diff / modified field value)
- **Active Reference Transition Arrow:** `#F47B20` (animated stroke dash)
- **Active Console Accent:** `#F47B20`

### 6.3 Neutral Surfaces & Structural Chrome
- **Surface Primary:** `#FFFFFF`
- **Subtle Well / Background Canvas:** `#FAFAFA`
- **Structural Borders:** `#E5E7EB` (1px solid)
- **Text Primary:** `#171717`
- **Text Secondary:** `#666666`
- **Text Muted:** `#999999`

