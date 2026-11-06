# Task Record: OOPS-20261102-0075-POPULATE_MODULES_03_TO_07_DISTINCT_SCENARIOS

## 1. Context & User Directives
- **Directives:** Resolve the issue reported by the user where selecting different subsections (e.g. `03F Method Overriding` under `03 Method Representation`) displayed "0" scenarios in the sidebar and left an identical diagram on the central canvas.
- **Root Cause:**
  1. Subsections for `method-rep` (03B–03J), `method-call-stack` (04A–04I), `jvm-memory` (05A–05H), `heap-alloc` (06A–06J), and `ref-graph` (07A–07K) contained duplicate or empty skeleton arrays (`"scenarios": []`).
  2. When an empty subsection was clicked, `setActiveSubsection` had no scenario to render and either fell back to a shared category preset or retained stale canvas nodes, making all subsections appear identical.
  3. String replacement scripts had created unescaped literal newlines in `subsectionsData.ts`, causing syntax errors.

---

## 2. Engineering Changes
1. **Clean Catalog Generation (`subsectionsData.ts`):**
   - Built an authoritative, clean generator script `scratch/build_modules_03_to_07.py` using `json.dumps()` to escape all Java code, eliminating unterminated string literals and syntax errors.
   - Populated every subsection across Group 1 with rich, distinct scenarios:
     - **Module 01 Class Representation:** 10 subsections, 17 scenarios.
     - **Module 02 Object / Instance Representation:** 8 subsections, 8 scenarios.
     - **Module 03 Method Representation (03A–03J):** 10 subsections, 10 scenarios (Signature, Instance vs Static, Parameters/Pass-by-Value, Return Types, Overloading, Overriding/Dynamic Dispatch, Abstract Methods, Recursion, Generics, Varargs).
     - **Module 04 Method Call and Call Stack (04A–04I):** 9 subsections, 9 scenarios (Single Call, Nested Calls, Lifecycle Push/Pop, Scoping, Return Value Passing, Primitive vs Ref Args, Stack Overflow, Unwinding, Variable Shadowing).
     - **Module 05 JVM Memory Model (05A–05H):** 8 subsections, 8 scenarios (Overview, Stack vs Heap, Metaspace, PC Register, Native Stack JNI, Constant Pool, Static Fields, Stack-Heap-Metaspace Triad).
     - **Module 06 Heap and Object Allocation (06A–06J):** 10 subsections, 10 scenarios (Eden Allocation, Object Header Mark/Klass Words, Primitive vs Ref Fields, Array Allocation, Multi-Object Graph, Young Gen Eden/S0/S1, Old Gen Promotion, Field Mutation, Ref Replacement, GC Roots & Reachability).
     - **Module 07 Reference Graph (07A–07K):** 11 subsections, 11 scenarios (Stack-to-Heap Pointers, Aliasing, Chains, Trees, Cyclic References, Null References, Static GC Roots, Local Roots, Array Refs, Collections, Reachability Analysis).
2. **Type System Alignment (`types.ts`):**
   - Expanded `EntityType` to explicitly include `'memory-region'`.
   - Expanded `RelationshipType` to include `'extends' | 'implements' | 'call' | 'allocates'`.
   - Expanded `provenanceCategory` to support `'METASPACE' | 'UNREACHABLE'`.
3. **Verification:**
   - Ran `pnpm exec tsc --noEmit` — 0 errors.
   - Ran `pnpm run build` — 0 errors (2,273 modules transformed in 30.05s).
   - Confirmed Vite hot reload active and synced.

---

## 3. Verification & Compliance
- **Audit Table Status:** Group 1 Modules 01–07 fully populated with distinct scenarios; Group 2 Modules 08–15 fully integrated.
- **Ledger Verification:** Logged in `MASTER_ACTIVITY_LOG.md` and `FILE_CHANGE_REGISTER.md`.

