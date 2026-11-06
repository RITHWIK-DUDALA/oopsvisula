# OOPS LAB — Complete OOP Concept Visualization System Specification

**Document ID:** `OOP_CONCEPT_VISUALIZATION_SYSTEM_SPEC.md`  
**Standard:** Java 21 LTS Interactive Learning & Simulation Architecture  
**Governing Skill:** `stageshow` (Evidence-based UI/UX craft & restrained motion)  
**Classification:** Authoritative System Specification & Architectural Blueprint  

---

## 1. Executive Mission & System Architecture

The **OOPS LAB Concept Visualization System** integrates concept-by-concept pedagogical discovery, real Java 21 compilation and execution, and synchronized 2D/3D runtime simulations into a unified learning platform.

### Canonical Simulation Model

```text
                  JAVA 21 SOURCE CODE
                           |
                           v
                  JAVA 21 COMPILER &
                  AST SECURITY VISITOR
                           |
                           v
                ISOLATED EXECUTION WORKER
               (Resource-Capped Sandbox)
                           |
                           v
               NORMALIZED EXECUTION EVENTS
       (STEP_ENTER, FRAME_PUSH, OBJECT_ALLOCATED,
        FIELD_MUTATED, FRAME_POP, EXECUTION_COMPLETED)
                           |
                           v
                SOURCE LINE SYNCHRONIZER
                           |
                           v
                CANONICAL RUNTIME STATE
              (simulationStore / Zustand)
                           |
         +-----------------+-----------------+
         |                 |                 |
         v                 v                 v
   2D RUNTIME VIEW    3D RUNTIME VIEW   UML CLASS VIEW
  (Stack, Heap,       (Three.js Mesh    (Class Nodes,
   Object Graph,       Prisms, Bezier    Inheritance &
   Metaspace)          Tubes, Orbit)     Realization)
         |                 |                 |
         +-----------------+-----------------+
                           |
                           v
           DYNAMIC 5-POINT EXPLANATION ENGINE
         • What is it? (Concise definition)
         • What is happening? (Current event description)
         • Why is it happening? (Java language rule)
         • What changed? (Exact state mutation)
         • What should the student notice? (Pedagogical takeaway)
```

---

## 2. Workspace Layout & Component Hierarchy

The concept workspace directly reproduces the reference image architecture within a persistent, responsive shell:

```
┌─────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ LEFT CONCEPT NAV        │ CONCEPT HEADER                                                         │
│ (232px Collapsible)     │ Concepts > Core OOP > Encapsulation                    [2D / 3D / UML] │
│                         │ Invariant Protection & Access Boundaries                               │
│ [🔍 Search 83 topics]   ├───────────────────────────────────┬────────────────────────────────────┤
│                         │ JAVA 21 SOURCE EDITOR             │ INTERACTIVE RUNTIME VISUALIZER     │
│ ▼ Core OOP (4)          │ 1  public class BankAccount {     │ [2D View] [3D View] [UML Diagram]  │
│   • Encapsulation  ◄    │ 2    private double balance;      │                                    │
│   • Abstraction         │ 3    public void deposit(...) {   │  ┌───────────┐      ┌────────────┐ │
│   • Inheritance         │ 4  ►   this.balance += amount;    │  │Call Stack │ ───► │ Eden Heap  │ │
│   • Polymorphism        │ 5    }                            │  └───────────┘      └────────────┘ │
│                         ├───────────────────────────────────┴────────────────────────────────────┤
│ ▶ Relationships (7)     │ EXECUTION CONTROLS TOOLBAR                                             │
│ ▶ Constructors (7)      │ [▶ Run] [>| Step] [|| Pause] [↺ Reset]  Speed: 1x  [● Step 4 of 6]      │
│ ▶ JVM Memory (12)       ├────────────────────────────────────────────────────────────────────────┤
│ ▶ Advanced OOP (14)     │ DYNAMIC EXPLANATION & PEDAGOGICAL TAKEAWAY ENGINE                      │
│ ▶ SOLID Principles (5)  │ • What's Happening: deposit() mutates this.balance                     │
│ ▶ Design Patterns (13)  │ • Why: Private field access is permitted within class method body      │
│                         │ • What Changed: Object #1 balance: 500.0 -> 750.0                      │
│                         │ • Notice: External classes cannot write to balance directly            │
└─────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Curriculum Roster: 11 Modules across 83 Topics

The complete curriculum encompasses all 83 topics specified in Modules A through K:

- **Module A: OOP Foundations (8 Topics)** — 5.1 OOP, 5.2 Class, 5.3 Object, 5.4 State, 5.5 Behavior, 5.6 Identity, 5.7 Fields & Methods, 5.8 Message Passing.
- **Module B: Encapsulation (1 Topic)** — 5.9 Encapsulation & Access Modifiers.
- **Module C: Abstraction (4 Topics)** — 5.10 Abstraction, 5.11 Abstract Class, 5.12 Abstract Method, 5.13 Interface.
- **Module D: Inheritance (7 Topics)** — 5.14 Inheritance, 5.15 Single, 5.16 Multilevel, 5.17 Hierarchical, 5.18 Multiple via Interfaces, 5.19 `super`, 5.20 Method Overriding.
- **Module E: Polymorphism (5 Topics)** — 5.21 Polymorphism, 5.22 Compile-time, 5.23 Runtime, 5.24 Method Overloading, 5.25 Dynamic Dispatch.
- **Module F: Constructors & Initialization (7 Topics)** — 5.26 Constructor, 5.27 Default, 5.28 Parameterized, 5.29 Overloading, 5.30 Chaining, 5.31 `this`, 5.32 Initialization Blocks.
- **Module G: Object Relationships (7 Topics)** — 5.33 Association, 5.34 Aggregation, 5.35 Composition, 5.36 Dependency, 5.37 Generalization, 5.38 Realization, 5.39 Multiplicity.
- **Module H: JVM Memory & Lifecycle (12 Topics)** — 5.40 JVM, 5.41 Stack, 5.42 Stack Frame, 5.43 Heap, 5.44 Reference, 5.45 Null, 5.46 Allocation, 5.47 Initialization, 5.48 GC, 5.49 Object Graph, 5.50 Static/Instance, 5.51 String Pool.
- **Module I: Advanced OOP (14 Topics)** — 5.52 Access Modifiers, 5.53 Static, 5.54 Final, 5.55 Immutable, 5.56 Mutable, 5.57 Nested Classes, 5.58 Inner Classes, 5.59 Anonymous Classes, 5.60 Enum, 5.61 Generics, 5.62 Reflection, 5.63 Coupling, 5.64 Cohesion, 5.65 Delegation.
- **Module J: SOLID Principles (5 Topics)** — 5.66 SRP, 5.67 OCP, 5.68 LSP, 5.69 ISP, 5.70 DIP.
- **Module K: Design Patterns (13 Topics)** — 5.71 Singleton, 5.72 Factory Method, 5.73 Abstract Factory, 5.74 Builder, 5.75 Prototype, 5.76 Adapter, 5.77 Decorator, 5.78 Facade, 5.79 Observer, 5.80 Strategy, 5.81 State, 5.82 Command, 5.83 Template Method.

---

## 4. Synchronization Contract between 2D and 3D

1. **State Preservation:** Switching between 2D, 3D, and UML modes does not reset execution or re-run the simulation.
2. **Current Step Identity:** The active step index, selected object, and highlighted line remain locked across views.
3. **Semantic Distinction:**
   - Encapsulation visually highlights class boundary rings and access restrictions.
   - Inheritance visually highlights parent-to-subclass member slots and `super()` delegation.
   - Polymorphism highlights the virtual method table (vtable) resolution path to the concrete class.
   - Object Relationships show distinct connector geometries (e.g. hollow diamond for Aggregation, solid diamond for Composition, dashed for Dependency).

