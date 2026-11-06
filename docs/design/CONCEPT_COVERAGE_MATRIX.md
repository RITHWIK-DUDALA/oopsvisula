# OOPS LAB — Permanent Concept Coverage Matrix (83 Topics)

**Document ID:** `CONCEPT_COVERAGE_MATRIX.md`  
**Standard:** 11-Module Pedagogical Inventory (Modules A through K)  
**Classification:** Authoritative Progress & Quality Verification Ledger  

---

| Concept ID | Concept Name | Official Definition | Java Example Class | 2D Status | 3D Status | Execution Mapping | Explanation | Interactions | Tests | Limitations | Approval |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **01-oop** | Object-Oriented Programming | Paradigm organizing software into collaborating objects containing state and behavior | `OOPApp` | Verified | Verified | Verified | Verified | Step/Inspect | Unit | High-level overview | CONFIRMED |
| **02-class** | Class | Reference blueprint defining instance fields, constructors and methods | `CarBlueprint` | Verified | Verified | Verified | Verified | Blueprint vs Instance | Unit | Single class scope | CONFIRMED |
| **03-object** | Object | Runtime heap instance possessing identity, state and behavior | `AccountInstance` | Verified | Verified | Verified | Verified | Select/Inspect | Unit | Heap bound | CONFIRMED |
| **04-state** | State | Collection of values held by an object fields at a specific point in time | `LightSwitch` | Verified | Verified | Verified | Verified | Field mutate diff | Unit | Primitive/Ref fields | CONFIRMED |
| **05-behavior** | Behavior | Executable operations an object performs through its member methods | `Thermostat` | Verified | Verified | Verified | Verified | Invoke methods | Unit | Stack frame push | CONFIRMED |
| **06-identity** | Identity | Distinction of one object from another independently of field values | `PointIdentity` | Verified | Verified | Verified | Verified | `==` vs `equals()` | Unit | Heap addresses | CONFIRMED |
| **07-fields-methods**| Fields & Methods | State variables and executable callable operations declared in classes | `UserSession` | Verified | Verified | Verified | Verified | Inspect compartments | Unit | Access scopes | CONFIRMED |
| **08-message** | Message Passing | Objects communicating by invoking methods on references to other objects | `OrderProcessor` | Verified | Verified | Verified | Verified | Step calls | Unit | Synchronous only | CONFIRMED |
| **09-encapsulation**| Encapsulation | Combining state and methods while enforcing private boundary invariants | `BankAccount` | Verified | Verified | Verified | Verified | Private access block | Unit | Language access level | CONFIRMED |
| **10-abstraction** | Abstraction | Exposing essential functionality while hiding implementation complexities | `VehicleService` | Verified | Verified | Verified | Verified | Swap impls | Unit | Interface contracts | CONFIRMED |
| **11-abstract-class**| Abstract Class | Non-instantiable class defining partial implementations and contracts | `AbstractShape` | Verified | Verified | Verified | Verified | Compile error block | Unit | Subclass instantiation | CONFIRMED |
| **12-abstract-method**| Abstract Method | Method declaration without body, requiring subclass realization | `ShapeArea` | Verified | Verified | Verified | Verified | Compare bodies | Unit | Concrete overrides | CONFIRMED |
| **13-interface** | Interface | Pure contract of abstract, default, and static methods for realization | `PaymentGateway` | Verified | Verified | Verified | Verified | Itable dispatch | Unit | Single class impl | CONFIRMED |
| **14-inheritance** | Inheritance | Subclass extending superclass to inherit accessible fields and methods | `AnimalDog` | Verified | Verified | Verified | Verified | Parent slots expand | Unit | Single class tree | CONFIRMED |
| **15-single-inherit**| Single Inheritance | Direct one-to-one class specialization from single superclass | `EmployeeManager` | Verified | Verified | Verified | Verified | Inherited fields | Unit | Java single extends | CONFIRMED |
| **16-multilevel** | Multilevel Inheritance | Linear extension chain (Grandparent -> Parent -> Child) | `AnimalMammalDog` | Verified | Verified | Verified | Verified | Chain traversal | Unit | Linear depth | CONFIRMED |
| **17-hierarchical**| Hierarchical Inheritance | Single superclass extended by multiple sibling subclasses | `ShapeCircleSquare` | Verified | Verified | Verified | Verified | Sibling comparison | Unit | Sibling isolation | CONFIRMED |
| **18-interface-multi**| Multiple via Interfaces | Class realizing multiple distinct contracts | `PrintableSerializable`| Verified | Verified | Verified | Verified | Contract inspection | Unit | No multiple extends | CONFIRMED |
| **19-super** | `super` Keyword | Calling superclass constructors and overridden superclass methods | `SuperConstructor` | Verified | Verified | Verified | Verified | Constructor order | Unit | Direct parent only | CONFIRMED |
| **20-overriding** | Method Overriding | Compatible subclass implementation replacing inherited instance method | `ShapeOverride` | Verified | Verified | Verified | Verified | Runtime binding | Unit | Non-static only | CONFIRMED |
| **21-polymorphism**| Polymorphism | Treating different concrete subclass instances through common type | `AnimalSounds` | Verified | Verified | Verified | Verified | Swap instances | Unit | Reference subtype | CONFIRMED |
| **22-compile-poly** | Compile-Time Polymorphism | Method overloading resolution during javac compilation | `MathOverloader` | Verified | Verified | Verified | Verified | Overload picker | Unit | Static binding | CONFIRMED |
| **23-runtime-poly** | Runtime Polymorphism | Dynamic method selection based on runtime receiver object | `ShapeDispatcher` | Verified | Verified | Verified | Verified | Vtable step | Unit | Heap receiver | CONFIRMED |
| **24-overloading** | Method Overloading | Multiple methods sharing name with differing parameter lists | `PrinterOverload` | Verified | Verified | Verified | Verified | Signature compare | Unit | Compile-time | CONFIRMED |
| **25-dispatch** | Dynamic Method Dispatch | Vtable resolution of overridden method at execution time | `DynamicDispatcher` | Verified | Verified | Verified | Verified | Step call site | Unit | JVM invokeVirtual | CONFIRMED |
| **26-constructor** | Constructor | Special block initializing newly allocated heap instance | `PointConstructor` | Verified | Verified | Verified | Verified | Sequence step | Unit | Post-allocation | CONFIRMED |
| **27-default-ctor** | Default Constructor | Implicit compiler-provided zero-arg constructor | `ImplicitDefault` | Verified | Verified | Verified | Verified | Zero-arg step | Unit | Compiler artifact | CONFIRMED |
| **28-param-ctor** | Parameterized Constructor | Constructor receiving arguments to initialize state fields | `UserParamCtor` | Verified | Verified | Verified | Verified | Slot mapping | Unit | Explicit args | CONFIRMED |
| **29-ctor-overload**| Constructor Overloading| Multiple constructors with distinct parameter signatures | `BoxConstructors` | Verified | Verified | Verified | Verified | Select variant | Unit | Overload selection | CONFIRMED |
| **30-ctor-chain** | Constructor Chaining | Explicit delegation using `this()` and `super()` | `ChainConstructors` | Verified | Verified | Verified | Verified | Execution stack | Unit | First statement rule | CONFIRMED |
| **31-this** | `this` Keyword | Reference referring to the current executing instance | `ThisBalance` | Verified | Verified | Verified | Verified | Self-pointer arrow | Unit | Instance methods | CONFIRMED |
| **32-init-blocks** | Initialization Blocks | Instance and static initializer execution ordering | `InitBlockOrder` | Verified | Verified | Verified | Verified | Sequence order | Unit | Class load vs ctor | CONFIRMED |
| **33-association** | Association | General structural or conceptual interaction between objects | `DriverCar` | Verified | Verified | Verified | Verified | Link inspection | Unit | Non-owning link | CONFIRMED |
| **34-aggregation** | Aggregation | Weak whole-part relationship where parts survive whole | `DepartmentTeacher` | Verified | Verified | Verified | Verified | Hollow diamond link | Unit | Independent lifecycles| CONFIRMED |
| **35-composition** | Composition | Strong whole-part relationship with tied lifecycles | `CarEngine` | Verified | Verified | Verified | Verified | Solid diamond link | Unit | Cascading reachability| CONFIRMED |
| **36-dependency** | Dependency | Temporary uses-a relationship (parameter or local variable) | `PrintService` | Verified | Verified | Verified | Verified | Dashed arrow link | Unit | Method-scoped | CONFIRMED |
| **37-generalization**| Generalization | Object-oriented relationship specializing child from parent | `ShapeSpecialization` | Verified | Verified | Verified | Verified | UML hollow arrow | Unit | Type hierarchy | CONFIRMED |
| **38-realization** | Realization | Class implementing an interface contract | `PayableEmployee` | Verified | Verified | Verified | Verified | Dashed triangle link| Unit | Contract compliance | CONFIRMED |
| **39-multiplicity** | Multiplicity | Cardinality bounds on relationships (1, 0..1, 0..*, 1..*) | `CustomerOrders` | Verified | Verified | Verified | Verified | Cardinality counts | Unit | Collection fields | CONFIRMED |
| **40-jvm** | JVM Architecture | Virtual machine orchestrating class loading, memory & execution | `JVMOverview` | Verified | Verified | Verified | Verified | High-level map | Unit | Logical model | CONFIRMED |
| **41-stack** | Thread Stack | LIFO thread execution memory housing method invocation frames | `StackExecution` | Verified | Verified | Verified | Verified | Push/pop animation | Unit | Thread-isolated | CONFIRMED |
| **42-stack-frame** | Stack Frame | Activation record holding local variables and operand stack | `FrameActivation` | Verified | Verified | Verified | Verified | Frame scope expand | Unit | Method lifetime | CONFIRMED |
| **43-heap** | Eden Heap | Shared runtime memory region where objects and arrays reside | `HeapInstances` | Verified | Verified | Verified | Verified | Memory cards | Unit | Eden generation | CONFIRMED |
| **44-reference** | Object Reference | Pointer variable holding the address of a heap instance | `ReferencePointers` | Verified | Verified | Verified | Verified | Curved SVG arrow | Unit | 64-bit addresses | CONFIRMED |
| **45-null** | Null Reference | Reference variable pointing to no address in memory | `NullPointerDemo` | Verified | Verified | Verified | Verified | Broken arrow / null | Unit | NullPointerException | CONFIRMED |
| **46-allocation** | Object Allocation | Reserving Eden heap memory upon `new` operator execution | `NewAllocation` | Verified | Verified | Verified | Verified | Instance appears | Unit | Header + slots | CONFIRMED |
| **47-initialization**| Object Initialization | Setting instance field values to defaults then constructor state | `InitStages` | Verified | Verified | Verified | Verified | Default -> Final | Unit | Deterministic order | CONFIRMED |
| **48-gc** | Garbage Collection | Reclaiming unreachable heap instances from root set | `ReachabilityGC` | Verified | Verified | Verified | Verified | Reachable vs Orphan | Unit | Nondeterministic run | CONFIRMED |
| **49-object-graph** | Object Graph | Directional topology of objects and reference edges | `ObjectGraphDemo` | Verified | Verified | Verified | Verified | Aliasing highlight | Unit | Heap topology | CONFIRMED |
| **50-static-instance**| Static vs Instance | Class-level state in Metaspace vs per-instance heap slots | `StaticCounter` | Verified | Verified | Verified | Verified | Metaspace box | Unit | Shared across objects | CONFIRMED |
| **51-string-pool** | String Pool | JVM String literal intern cache | `StringPoolCompare` | Verified | Verified | Verified | Verified | Pool deduplication | Unit | Literal vs new String | CONFIRMED |
| **52-access-mods** | Access Modifiers | Visibility boundaries: public, protected, package, private | `AccessMatrix` | Verified | Verified | Verified | Verified | Allowed/Denied pill | Unit | Package scopes | CONFIRMED |
| **53-static** | `static` Keyword | Class-level members independent of any instance | `MathUtility` | Verified | Verified | Verified | Verified | Class scope call | Unit | No this in static | CONFIRMED |
| **54-final** | `final` Keyword | Immutable variables, non-overridable methods, unextendable classes | `FinalConstants` | Verified | Verified | Verified | Verified | Lock icon on slot | Unit | Reassignment block | CONFIRMED |
| **55-immutable** | Immutable Objects | Objects whose observable state never changes after construction | `ImmutableRecord` | Verified | Verified | Verified | Verified | Frozen badge | Unit | Java 21 Record | CONFIRMED |
| **56-mutable** | Mutable Objects | Objects whose internal state can change via mutators | `MutableBuffer` | Verified | Verified | Verified | Verified | Green diff flash | Unit | Setter calls | CONFIRMED |
| **57-nested** | Nested Classes | Classes declared inside the body of an enclosing class | `OuterStaticNested` | Verified | Verified | Verified | Verified | Nested box | Unit | Static nested | CONFIRMED |
| **58-inner** | Inner Classes | Non-static nested class holding enclosing `this$0` pointer | `OuterInnerPiston` | Verified | Verified | Verified | Verified | `this$0` connector | Unit | Bound to outer | CONFIRMED |
| **59-anonymous** | Anonymous Classes | Inline ad-hoc class expression without a declared name | `RunnableAnonymous` | Verified | Verified | Verified | Verified | Ad-hoc card | Unit | Single use | CONFIRMED |
| **60-enum** | Enum | Type-safe set of canonical named constant instances | `DayOfWeekEnum` | Verified | Verified | Verified | Verified | Fixed instance list | Unit | Built-in methods | CONFIRMED |
| **61-generics** | Generics | Compile-time parameterized types with runtime type erasure | `GenericBox` | Verified | Verified | Verified | Verified | Type param badge | Unit | Erasure to Object | CONFIRMED |
| **62-reflection** | Reflection | Inspecting and invoking classes, fields and methods dynamically | `ClassInspector` | Verified | Verified | Verified | Verified | Metadata arrow | Unit | Security capped | CONFIRMED |
| **63-coupling** | Coupling | Degree of direct inter-dependency between collaborating classes | `CouplingCompare` | Verified | Verified | Verified | Verified | Tight vs Loose graph| Unit | Architectural | CONFIRMED |
| **64-cohesion** | Cohesion | Degree to which responsibilities inside a class form focused unit | `CohesionCompare` | Verified | Verified | Verified | Verified | High vs Low cluster | Unit | Architectural | CONFIRMED |
| **65-delegation** | Delegation | Object passing operation responsibility to a helper instance | `SorterDelegation` | Verified | Verified | Verified | Verified | Call-forward arrow | Unit | Has-a helper | CONFIRMED |
| **66-srp** | Single Responsibility | A class should have only one primary reason to change | `SRPReportService` | Verified | Verified | Verified | Verified | Focused class boxes | Unit | SOLID principle | CONFIRMED |
| **67-ocp** | Open/Closed | Open for extension through abstractions, closed for modification | `OCPDiscountEngine` | Verified | Verified | Verified | Verified | New strategy plug | Unit | SOLID principle | CONFIRMED |
| **68-lsp** | Liskov Substitution | Subtypes must be substitutable for their supertypes safely | `LSPRectangleSquare`| Verified | Verified | Verified | Verified | Invariant test | Unit | Behavioral contract | CONFIRMED |
| **69-isp** | Interface Segregation | Clients must not be forced to depend on unused operations | `ISPWorkerPrinter` | Verified | Verified | Verified | Verified | Split interfaces | Unit | Lean contracts | CONFIRMED |
| **70-dip** | Dependency Inversion | High-level modules depend on abstractions, not concretions | `DIPNotification` | Verified | Verified | Verified | Verified | Inverted dependency | Unit | DI contract | CONFIRMED |
| **71-singleton** | Singleton Pattern | Ensuring a class has only one instance with global access | `SingletonApp` | Verified | Verified | Verified | Verified | Single instance card| Unit | Thread-safe JVM | CONFIRMED |
| **72-factory** | Factory Method | Creator interface delegating instantiation to subclasses | `DialogFactory` | Verified | Verified | Verified | Verified | Creation arrow | Unit | Creational pattern | CONFIRMED |
| **73-abstract-fact**| Abstract Factory | Creating families of related objects without specifying classes | `UIAbstractFactory` | Verified | Verified | Verified | Verified | Family grouping | Unit | Creational pattern | CONFIRMED |
| **74-builder** | Builder Pattern | Step-by-step complex object construction | `ComputerBuilder` | Verified | Verified | Verified | Verified | Step-by-step build | Unit | Method chaining | CONFIRMED |
| **75-prototype** | Prototype Pattern | Creating new objects by cloning an existing instance | `ShapeClone` | Verified | Verified | Verified | Verified | Clone arrow | Unit | Shallow vs Deep | CONFIRMED |
| **76-adapter** | Adapter Pattern | Converting interface of class into another expected interface | `AdapterDemo` | Verified | Verified | Verified | Verified | Adapter wrap box | Unit | Structural pattern | CONFIRMED |
| **77-decorator** | Decorator Pattern | Attaching additional responsibilities to an object dynamically | `CoffeeDecorator` | Verified | Verified | Verified | Verified | Layered wrap rings | Unit | Structural pattern | CONFIRMED |
| **78-facade** | Facade Pattern | Providing unified simplified interface to complex subsystem | `HomeTheaterFacade` | Verified | Verified | Verified | Verified | Facade front panel | Unit | Subsystem hide | CONFIRMED |
| **79-observer** | Observer Pattern | Publish-subscribe dependency notifying multiple observers | `WeatherObserver` | Verified | Verified | Verified | Verified | Broadcast arrows | Unit | Behavioral pattern | CONFIRMED |
| **80-strategy** | Strategy Pattern | Defining family of interchangeable algorithms | `PaymentStrategy` | Verified | Verified | Verified | Verified | Strategy swap | Unit | Behavioral pattern | CONFIRMED |
| **81-state** | State Pattern | Allowing object to alter its behavior when internal state changes | `OrderStatePattern` | Verified | Verified | Verified | Verified | State machine nodes | Unit | Behavioral pattern | CONFIRMED |
| **82-command** | Command Pattern | Encapsulating request as object to parameterize clients | `RemoteControlCommand`| Verified | Verified | Verified | Verified | Queue / Undo slot | Unit | Action object | CONFIRMED |
| **83-template** | Template Method | Skeleton of algorithm in superclass with customizable steps | `DataMinerTemplate` | Verified | Verified | Verified | Verified | Fixed flow steps | Unit | Hook methods | CONFIRMED |

