# TASK LEDGER RECORD: OOPS-20261031-0008-PLAYGROUND_AUDIT

- **Task Identifier:** `OOPS-20261031-0008-PLAYGROUND_AUDIT` (Task 01 — Existing Application Audit)
- **Parent Central ID:** `OOPS-20261031-0008`
- **Execution Timestamp:** 2026-10-31 03:52:00
- **Primary Role:** Principal Product Designer, Senior Frontend Architect & Design Systems Engineer
- **Directive Context:** User provided the Complete Playground UI/UX Redesign and Implementation Master Prompt. Directive requires executing Task 01 first: document existing components, execution state, layout, dependencies, design tokens, and propose exact file changes before implementing subsequent tasks.

---

## 1. Existing Components Audit

| Component | File Path | Current Role & Observations | Redesign Target |
|---|---|---|---|
| `PlaygroundPage` | `frontend/src/features/playground/PlaygroundPage.tsx` | Top toolbar with scenario dropdown, run button, layout toggle (both/editor/visualizer/class-builder), Monaco editor, MemoryCanvas, ExecutionInspector, and bottom status bar. Currently relies on static grid (`lg:grid-cols-12`) without draggable resizers or 32/40/28 ratios. | Transform into resizable 3-panel workspace architecture (Editor 32%, Unified Visualizer 40%, Inspector 28%) with minimum widths, panel collapse/expand, and responsive views. |
| `MemoryCanvas` | `frontend/src/features/visualizer/MemoryCanvas.tsx` | Split 2-column view of Call Stack (LIFO) and Eden Heap. Call stack and heap are rendered as disconnected lists with text badges; reference pointers are listed in a separate footer strip without interactive visual SVG connections or unified views. | Replace with Unified JVM Runtime Visualizer featuring tabs (`Stack + Heap` with interactive SVG reference connectors, `Object Graph`, `Memory Map`), field mutation diff highlighting (`500.0 → 750.0`), and object selection synchronization. |
| `ExecutionInspector` | `frontend/src/features/visualizer/ExecutionInspector.tsx` | Playback toolbar (Reset, StepBack, Play/Pause, StepForward, Speed pills, CometDial popover), tabs (`Inspector`, `Console`, `Events`), and bottom dot scrubber. Too horizontally compressed; controls compete with workspace modes; lack context-sensitive object/variable inspectors. | Upgrade to context-sensitive inspector with collapsible sections (Current Event, Active Scope Table, Selected Variable, Selected Object), console with clear/copy, and fully synchronized event timeline. Move execution controls to dedicated unified execution bar. |
| `LeftSidebar` | `frontend/src/components/navigation/LeftSidebar.tsx` | Currently 256px (`w-64`), containing BranchedMenu with deep SVG branches, oversized Target Engine card at bottom. | Refactor to 228px expanded / 64px collapsed, clean flat item hierarchy with thin left active indicator, 4 clear navigation groups (LABORATORY, LEARNING, PERSONAL, PREFERENCES), and compact `JAVA ENGINE` status tile. |
| `TopHeader` | `frontend/src/components/navigation/TopHeader.tsx` | Height 56px (`h-14`), breadcrumb, Quick Find button (`Ctrl K`), Guest Mode badge, Sign In button. | Standardize to 58px target height, refine breadcrumb typography (`OOPS LAB / Playground`), restrain Guest Mode pill, ensure quiet technical aesthetics. |
| `simulationStore` | `frontend/src/features/simulation/simulationStore.ts` | Zustand store managing `currentTrace`, `currentStepIndex`, `isPlaying`, `playbackSpeed`, `activeCall`, and stepping actions (`stepForward`, `stepBackward`, `goToStep`, `play`, `pause`, `reset`). | Authoritative execution state. Extend with selections: `selectedObjectId: string | null`, `selectedVariableName: string | null`, `workspaceLayout: 'split' | 'editor' | 'visualizer' | 'class-builder'`, and `runtimeView: 'stack-heap' | 'object-graph' | 'memory-map'`. |
| `sampleTraces` | `frontend/src/features/simulation/sampleTraces.ts` | Contains 14 curriculum traces including `bankAccountTrace`. | Correct line number discrepancy in `bankAccountTrace` events (realign step line numbers with 21-line Java source statements). |

---

## 2. Existing Execution State & Runtime Data Validation

### Critical Discovery on Section 19: BankAccount State Inconsistency
- In `frontend/src/features/simulation/sampleTraces.ts`:
  - `sourceCode` of `bankAccountTrace` defines `main(String[] args)` at line 24, with `BankAccount account = new BankAccount(...)` at line 25.
  - However, in `events`, `step: 1` had `line: 18` (which points to `public void deposit(double amount)` in the 29-line formatting!), while `account` variable in `stackFrames` is `null` (since constructor has not run yet).
  - This caused the editor to highlight line 18 (`deposit`) while displaying the step description `"Entering main(String[] args)"` and `account = null`.
- **Validation Resolution:**
  1. Standardize `sourceCode` to exact 21 lines:
     - Line 1: `public class BankAccount {`
     - Lines 5-8: Constructor `BankAccount(String owner, double initialBalance)`
     - Lines 10-14: Method `deposit(double amount)`
     - Lines 16-20: Method `main(String[] args)`:
       - Line 17: `BankAccount account = new BankAccount("Alice", 500.0);`
       - Line 18: `account.deposit(250.0);`
       - Line 19: `System.out.println("Balance: " + account.balance);`
  2. Sync trace event lines:
     - Step 1 (`STEP_ENTER` main): `line: 17`, `account: null` (uninitialized).
     - Step 2 (`OBJECT_ALLOCATED` in Eden): `line: 17`, heap `@0x2F1A` allocated (`owner: null`, `balance: 0.0`).
     - Step 3 (`FRAME_PUSH` constructor): `line: 6`, `this: ref @0x2F1A`, `owner: "Alice"`, `initialBalance: 500.0`.
     - Step 4 (`FRAME_POP` constructor returns): `line: 17`, `account: ref @0x2F1A` assigned in `main`.
     - Step 5 (`FRAME_PUSH` deposit): `line: 11`, `this: ref @0x2F1A`, `amount: 250.0`.
     - Step 6 (`FIELD_MUTATED` balance): `line: 12`, `balance: 500.0 → 750.0`.
     - Step 7 (`EXECUTION_COMPLETED` println): `line: 19`, `stdout: "Balance: 750.0\n"`.

---

## 3. Existing Layout & Workspace Structure

- **Viewport Frame:** `100vw × 100vh`, flex container in `AppLayout.tsx`.
- **Current Proportions:**
  - Sidebar: 256px (`w-64`) / 64px (`w-16`).
  - Header: 56px (`h-14`).
  - Playground Top Bar: 48px (`h-12`).
  - Status Bar: 32px (`h-8`).
  - Workspace: CSS grid `grid-cols-1 lg:grid-cols-12` (Col 4 Editor, Col 8 Visualizer/Inspector).
- **Target Specification:**
  - Sidebar: 228px expanded / 64px collapsed.
  - Header: 58px.
  - Workspace Toolbar: 54px (compact title, rich searchable scenario picker, segmented mode selector).
  - Main 3-Panel Workspace: CSS Grid with resizable panels (32% Editor, 40% Visualizer, 28% Inspector).
  - Bottom Status Region: 30px compact strip.

---

## 4. Existing Dependencies & Technologies

- **Frontend Core:** React 19, TypeScript, Vite.
- **Styling:** Tailwind CSS, PostCSS.
- **Icons:** `lucide-react` (uniform stroke 1.5 outline icons; no emojis).
- **Code Editor:** `@monaco-editor/react` (configured with light monochromatic theme).
- **Animation & Visuals:** `motion` (`motion/react`), native Canvas WebGL2 (`ElectricBorder`).
- **State:** `zustand`.

---

## 5. Existing Design Tokens vs. Target Design System

The current `index.css` defines base CSS custom properties. We will formalize the exact token system from Section 14:
- Neutral monochrome scale (`--background: #ffffff`, `--surface: #ffffff`, `--surface-subtle: #fafafa`, `--surface-muted: #f5f5f5`).
- Precise text hierarchy (`--text-primary: #171717`, `--text-secondary: #666666`, `--text-muted: #999999`).
- Borders (`--border: #e8e8e8`, `--border-strong: #d8d8d8`).
- Semantic accents (`--accent: #202020`, `--success: #287a4b`, `--warning: #a66b17`, `--error: #c43b3b`, `--information: #3569a8`).
- Strict typography scale (`--text-xs: 11px`, `--text-sm: 12px`, `--text-base: 13px`, `--text-md: 14px`, `--text-lg: 16px`).
- Consistent 4px spacing scale (`--space-1: 4px` through `--space-8: 32px`).
- Radii: `--radius-sm: 4px`, `--radius-md: 6px`, `--radius-lg: 8px`.

---

## 6. Files Proposed for Modification / Creation

### To Create / Modularize:
1. `frontend/src/features/playground/components/WorkspaceToolbar.tsx` (Group 1 identity, Group 2 searchable scenario selector, Group 3 workspace mode switcher).
2. `frontend/src/features/playground/components/ResizableWorkspace.tsx` (Draggable resizable 3-column split container with 32/40/28 ratios, collapse/expand, min-width enforcement).
3. `frontend/src/features/playground/components/UnifiedRuntimeVisualizer.tsx` (Tabs: Stack + Heap, Object Graph, Memory Map).
4. `frontend/src/features/playground/components/StackHeapView.tsx` (Side-by-side / responsive stack frames and heap cards with SVG reference connector lines and mutation highlights).
5. `frontend/src/features/playground/components/ObjectGraphView.tsx` (Interactive node-edge graph representation of active heap instances and reference pointers).
6. `frontend/src/features/playground/components/MemoryMapView.tsx` (Educational logical memory organization map).
7. `frontend/src/features/playground/components/ExecutionControlBar.tsx` (Unified execution controls: Restart, StepBack, StepInto, StepOver, StepOut, Run, Speed selector, progress bar, and timeline scrubber).
8. `frontend/src/features/playground/components/PlaygroundStatusBar.tsx` (Compact 30px status bar with engine readiness, Java 21 LTS tag, timing, and deterministic state).

### To Modify:
1. `frontend/src/features/playground/PlaygroundPage.tsx` (Re-architect around the 3-panel workspace, header/toolbar, and unified controls).
2. `frontend/src/features/visualizer/ExecutionInspector.tsx` (Refactor into context-sensitive inspector: Current Event, Active Scope Table, Selected Variable, Selected Object, Console, Events timeline synchronization).
3. `frontend/src/components/navigation/LeftSidebar.tsx` (Adjust width to 228px, remove tree lines, implement 4 clean navigation groups, add compact JAVA ENGINE tile).
4. `frontend/src/components/navigation/TopHeader.tsx` (Align height to 58px, clean breadcrumbs, quiet Guest Mode pill).
5. `frontend/src/features/simulation/sampleTraces.ts` (Align `bankAccountTrace` source code and event step lines).
6. `frontend/src/features/simulation/simulationStore.ts` (Add selected object/variable state and active visualizer tab).
7. `frontend/src/index.css` (Inject standardized design tokens from Section 14).
