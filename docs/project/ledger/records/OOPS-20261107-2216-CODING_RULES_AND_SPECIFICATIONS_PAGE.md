# Task Record: OOPS-20261107-2216 — Comprehensive Coding Rules & Interactive Rules Page

- **Task ID:** `OOPS-20261107-2216`
- **Feature Code:** `RULES-PAGE-SPEC`
- **Checkpoint:** `CP-0161`
- **Timestamp:** `2026-11-07 22:16:00`
- **Status:** `COMPLETED`
- **Domain:** Documentation, Frontend Routing, Interactive Education, UI/UX

---

## 1. Objective & Context
The user requested a clear, comprehensive reference document detailing what code patterns the OOPS LAB visualizer supports without errors, what is prohibited or sandboxed, and how exceptions behave (such as the `EXCEPTION THROWN` / `Diversion Status: THROWN` alert card), along with an interactive dedicated rules page in the web application.

---

## 2. Technical Modifications

### 2.1 Master Specification Document (`docs/CODING_RULES_AND_SPECIFICATIONS.md`)
- Authored a comprehensive 5-section guide covering:
  1. **Core Purpose & Visualizer Architecture:** Client-side deterministic AST parser + state machine emitting typed events.
  2. **What CAN Be Done (100% Visualized):**
     - Class definitions, instance fields, encapsulation (private/protected/public, getters/setters).
     - Object instantiation (`new`), constructors, constructor chaining (`this(...)`, `super(...)`).
     - Reference variables and pointer aliasing (multiple references pointing to identical heap objects).
     - Single and multi-level inheritance, dynamic method dispatch / polymorphism, abstract classes, interfaces.
     - Primitives, reference passing, call stack activation records (LIFO push/pop).
     - Standard control flow (`for`, `while`, `do-while`, nested loops, `if-else`, `switch`).
     - Java exception handling (`try-catch-finally`), throwing custom and standard exceptions (`throw new IllegalArgumentException(...)`).
     - Multi-file projects with cross-class references in Playground.
  3. **What CANNOT Be Done (Restricted & Sandboxed):**
     - OS process execution (`Runtime.getRuntime().exec()`, `ProcessBuilder`).
     - File system I/O (`java.io.File`, `FileInputStream`, `FileWriter`, `java.nio.file.Path`).
     - Raw network sockets & HTTP servers (`java.net.Socket`, `ServerSocket`).
     - Low-level reflection and unsafe byte operations (`java.lang.reflect`, `sun.misc.Unsafe`, `java.lang.invoke`).
     - Desktop GUI frameworks (`javax.swing.*`, `java.awt.*`, `javafx.*`).
     - System-level thread termination (`Thread.stop()`, `System.exit()`).
  4. **Execution Quotas & Safety Guardrails:**
     - 2,000 max execution steps.
     - 1,000 loop iteration cap.
     - 50 call stack frame depth (StackOverflowError).
     - 100 heap object allocations (OutOfMemoryError).
     - 100 array element length.
     - 10,000 max string character length.
     - 64 KB stdout buffer cap.
     - 128 KB source code file size clamp.
  5. **Verified Working Code Templates:**
     - Encapsulation & Pointer Aliasing (`BankAccountDemo`).
     - Polymorphic Dynamic Dispatch (`AnimalHierarchyDemo`).
     - Exception Handling (`SafeDivisionDemo` showing try-catch diversion).

### 2.2 Interactive Rules Web Page (`frontend/src/features/rules/RulesPage.tsx`)
- Developed a high-polish, monochromatic web page under `/app/rules`:
  - Category filter tabs (`All Rules`, `What Can Be Done`, `What Cannot Be Done`, `Execution Limits`, `Exception Handling`, `Verified Templates`).
  - Real-time instant search across rules, titles, keywords, and APIs.
  - Visual status badges (`100% VISUALIZED`, `SANDBOX RESTRICTED`, `BROWSER SAFEGUARDS`, `FAULT VISUALIZATION`).
  - Direct 1-click **"Open in Playground"** integration that loads templates directly into the visualizer editor.
  - Clear explanation of the `EXCEPTION THROWN` alert card (confirming it is an intentional visual demonstration of Java stack unrolling, not an application error).

### 2.3 Application Routing & Sidebar Navigation
- `frontend/src/app/routes.tsx`: Added `/app/rules` route and legacy redirect from `/rules`.
- `frontend/src/components/navigation/LeftSidebar.tsx`: Added `Rules` with outline `ShieldCheck` icon under `PRACTICE` navigation section.

---

## 3. Verification & Compliance
- **TypeScript & Vite Build:** `tsc -b && vite build` completed with 0 errors across 3,270 modules in 19.74s.
- **Theme Integrity:** Adheres strictly to the monochromatic light aesthetic, sans-serif typography, and outline-only icons.

