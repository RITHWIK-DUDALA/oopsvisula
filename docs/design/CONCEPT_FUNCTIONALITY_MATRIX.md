# OOPS LAB — Complete Concept Functionality Matrix
**Document ID:** `CONCEPT_FUNCTIONALITY_MATRIX.md`  
**Standard:** 14-Concept Pedagogical Architecture & Normalized Execution Semantics  
**Integration Target:** `frontend/src/features/simulation/sampleTraces.ts` & `simulationStore.ts`  
**Classification:** Canonical Educational Execution Benchmark  

---

## 1. Executive Matrix Summary

| Concept ID | Concept Name | Key Java 21 Feature | Primary Stack Behavior | Primary Heap Behavior | Object Relationships | Primary Visualizer Emphasis |
|---|---|---|---|---|---|---|
| **01-vars** | Variables & Data Types | Primitive vs Reference | Local primitive copies | String pool & wrapper allocations | Value copy vs Pointer copy | Direct memory slot copying |
| **02-methods** | Methods & Call Stack | Stack Frames & LIFO | Multi-level frame push/pop | Return value allocation | Frame activation records | LIFO visual push/pop animations |
| **03-classes** | Classes & Objects | Instantiation & Identity | Reference local variables | Eden space object instances | Identity hashcode & header | Distinct object instances in memory |
| **04-constructors**| Constructors & `this` | Initialization & Chaining | Constructor stack frame | Field initialization sequence | `this` reference binding | `this` pointer pointing to self |
| **05-encapsulation**| Encapsulation & Modifiers | Invariant Protection | Mutator method invocation | Private field state changes | Access boundaries | Red private field, green updated diff |
| **06-relationships**| Object Relationships | Composition & Lifecycles | Container references | Child object lifetime binding | Strong `has-a` composition | Embedded component lifecycle link |
| **07-inheritance** | Inheritance & `super` | Class Extension | `super()` constructor delegation | Inherited field slots | Parent-child `is-a` | Subclass enclosing parent state |
| **08-polymorphism** | Polymorphism & Dispatch | Virtual Method Tables (vtables)| Dynamic dispatch frame | Concrete runtime instance | Declared vs Runtime type | vtable resolution to concrete class |
| **09-interfaces** | Interfaces & Contracts | Default & Static Methods | Interface contract invocation| Implementing instance | Contract realization | Interface contract boundary |
| **10-records** | Records & Immutability | Canonical Constructors | Shallow stack evaluation | Immutable heap component fields | Frozen record instances | Immutable lock badges |
| **11-sealed** | Sealed Hierarchies | Exhaustive Permitted Classes | Type hierarchy verification | Permitted variant instances | Permitted subclassing | Sealed boundary badge |
| **12-patterns** | Pattern Matching | Record Patterns & `when` | Pattern variable binding | Deconstructed component extraction| Component destructuring | Deconstructed variable badges |
| **13-nested** | Nested & Inner Classes | Enclosing `this$0` Link | Inner instance activation | Outer class reference pointer | Synthetic pointer link | Outer reference link from inner |
| **14-exceptions** | Exceptions & Unwinding | Stack Unwinding & Tables | Immediate frame pop to catch | Exception object instantiation | Unwinding propagation | Red stack unwinding collapse |

---

## 2. Detailed Concept Specifications

---

### Concept 01: Variables & Data Types (`vars`)
- **Learning Objective:** Understand primitive value storage inside thread stack memory vs reference pointer storage pointing to heap objects.
- **Java Source Example:**
  ```java
  public class VariableSemantics {
      public static void main(String[] args) {
          int count = 10;
          int copy = count; // Primitive copy
          copy += 5;
          String text = "Java 21"; // String Pool reference
          System.out.println("count=" + count + ", copy=" + copy);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 3`: Stack slot `count` allocated with primitive int `10`.
  2. `LINE 4`: Stack slot `copy` allocated with independent primitive copy `10`.
  3. `LINE 5`: `copy` modified to `15`; `count` remains completely unaffected `10`.
  4. `LINE 6`: Heap String Pool instance created `@0x01A0`; reference `text` bound.
  5. `LINE 7`: Standard output prints `count=10, copy=15`.
- **Expected Visualization:** Stack frame showing two primitive slots with no arrows, followed by string reference arrow to pool.
- **Console Output:** `count=10, copy=15`

---

### Concept 02: Methods & Call Stack (`methods`)
- **Learning Objective:** Visualize LIFO (Last-In-First-Out) stack frame activation, parameter passing, and frame deallocation upon return.
- **Java Source Example:**
  ```java
  public class StackMechanics {
      public static int multiply(int a, int b) {
          int product = a * b;
          return product;
      }
      public static void main(String[] args) {
          int x = 4;
          int y = 5;
          int result = multiply(x, y);
          System.out.println("Result: " + result);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 7-8`: `main` frame active with `x=4, y=5`.
  2. `LINE 9`: Call `multiply(4, 5)`; new stack frame `multiply` pushed on top of `main`.
  3. `LINE 2-3`: Parameters `a=4, b=5` evaluated; `product=20` stored.
  4. `LINE 4`: Frame pops; return value `20` transferred to `main.result`.
  5. `LINE 10`: Standard output prints `Result: 20`.
- **Expected Visualization:** Animated stack frame pushed above `main`, parameters highlighted, then collapsed on return.
- **Console Output:** `Result: 20`

---

### Concept 03: Classes & Objects (`classes`)
- **Learning Objective:** Visualize dynamic memory allocation in JVM Eden Space, unique logical identity addresses, and state tracking.
- **Java Source Example:**
  ```java
  public class UserAccount {
      String username;
      int points;
      public static void main(String[] args) {
          UserAccount user1 = new UserAccount();
          user1.username = "Dev";
          user1.points = 100;
          UserAccount user2 = new UserAccount();
          user2.username = "Coder";
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 5`: `new UserAccount()` allocates heap object `@0x02B1` with default fields (`null`, `0`).
  2. `LINE 6-7`: `username` set to `"Dev"`, `points` set to `100`.
  3. `LINE 8`: Second instance `new UserAccount()` allocates distinct heap object `@0x02B2`.
  4. `LINE 9`: `user2.username` set to `"Coder"`.
- **Expected Visualization:** Two distinct object cards in the Heap panel with separate memory addresses and reference lines from `user1` and `user2`.

---

### Concept 04: Constructors & `this` (`constructors`)
- **Learning Objective:** Observe field initialization sequencing and distinguishing parameter names from object fields using the `this` reference pointer.
- **Java Source Example:**
  ```java
  public class Point {
      int x;
      int y;
      public Point(int x, int y) {
          this.x = x;
          this.y = y;
      }
      public static void main(String[] args) {
          Point p = new Point(10, 25);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 9`: `new Point(10, 25)` triggers heap allocation `@0x03C1` with uninitialized `x=0, y=0`.
  2. `LINE 4`: Constructor frame `Point.<init>(10, 25)` pushed with `this=@0x03C1`.
  3. `LINE 5`: `this.x = x` mutates field `x` to `10`.
  4. `LINE 6`: `this.y = y` mutates field `y` to `25`.
  5. `LINE 7`: Constructor completes; reference returned to variable `p`.
- **Expected Visualization:** Constructor stack frame with `this` pointer pointing directly to the object being constructed.

---

### Concept 05: Encapsulation & Access Modifiers (`encapsulation`)
- **Learning Objective:** Demonstrate private state protection, validation gates, and controlled mutation through public getter/setter methods.
- **Java Source Example:**
  ```java
  public class BankAccount {
      private String owner;
      private double balance;
      public BankAccount(String owner, double initialBalance) {
          this.owner = owner;
          this.balance = initialBalance;
      }
      public void deposit(double amount) {
          if (amount > 0) {
              this.balance += amount;
          }
      }
      public static void main(String[] args) {
          BankAccount account = new BankAccount("Alice", 500.0);
          account.deposit(250.0);
          System.out.println("Balance: " + account.balance);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 14`: Heap allocation `@0x0801` for `BankAccount("Alice", 500.0)`.
  2. `LINE 15`: Call `deposit(250.0)`; new stack frame `deposit` with `this=@0x0801, amount=250.0`.
  3. `LINE 10`: Invariant check `amount > 0` evaluates to `true`.
  4. `LINE 11`: `this.balance += amount` mutates field `balance` from `500.0` to `750.0` (orange diff).
  5. `LINE 16`: Standard output prints `Balance: 750.0`.
- **Expected Visualization:** Matches Reference Screenshot: `deposit` active in stack, curved orange arrow to `BankAccount@0x0801`, green updated badge `750.0`.
- **Console Output:** `Balance: 750.0`

---

### Concept 06: Object Relationships (`relationships`)
- **Learning Objective:** Differentiate Composition (lifetime ownership) from Aggregation and Association in heap memory.
- **Java Source Example:**
  ```java
  public class Engine {
      int horsepower;
      public Engine(int hp) { this.horsepower = hp; }
  }
  public class Car {
      Engine engine;
      public Car() { this.engine = new Engine(350); }
      public static void main(String[] args) {
          Car car = new Car();
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 8`: `new Car()` allocates `Car@0x04D1`.
  2. `LINE 6`: Inside `Car` constructor, `new Engine(350)` allocates `Engine@0x04D2`.
  3. Field `car.engine` stores reference pointer `@0x04D2`.
- **Expected Visualization:** Container card `Car` with inner reference arrow linking to `Engine` card on the heap.

---

### Concept 07: Inheritance & `super` (`inheritance`)
- **Learning Objective:** Visualize subclass extension, inherited field slots in a single object instance, and constructor delegation via `super()`.
- **Java Source Example:**
  ```java
  public class Employee {
      String name;
      public Employee(String name) { this.name = name; }
  }
  public class Manager extends Employee {
      int teamSize;
      public Manager(String name, int size) {
          super(name);
          this.teamSize = size;
      }
      public static void main(String[] args) {
          Manager mgr = new Manager("Elena", 8);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 11`: `new Manager("Elena", 8)` begins allocation.
  2. `LINE 7`: `Manager.<init>` delegates to `super(name)` (`Employee.<init>`).
  3. `LINE 3`: `this.name = name` sets inherited field `name = "Elena"`.
  4. `LINE 8`: `this.teamSize = size` sets child field `teamSize = 8`.
- **Expected Visualization:** Single heap object `@0x05E1` partitioned into `[Employee super-state]` and `[Manager sub-state]`.

---

### Concept 08: Polymorphism & Dynamic Dispatch (`polymorphism`)
- **Learning Objective:** Demonstrate virtual method table (vtable) resolution: calling an overridden method through a superclass reference invokes the concrete subclass implementation at runtime.
- **Java Source Example:**
  ```java
  public abstract class Shape {
      public abstract double area();
  }
  public class Circle extends Shape {
      double radius;
      public Circle(double r) { this.radius = r; }
      @Override public double area() { return Math.PI * radius * radius; }
  }
  public class PolymorphismDemo {
      public static void main(String[] args) {
          Shape s = new Circle(5.0);
          double a = s.area(); // Dynamic dispatch
          System.out.println("Circle area: " + a);
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 11`: Declared reference `Shape s` holds heap instance `Circle@0x06F1`.
  2. `LINE 12`: `s.area()` resolves via `Circle`'s vtable to `Circle.area()` rather than `Shape.area()`.
  3. Stack frame for `Circle.area` pushed with `this=@0x06F1`.
  4. Returns calculated area `78.54`.
- **Expected Visualization:** Declared reference type `Shape` tagged on stack, pointing to concrete `Circle` instance; dispatch indicator showing runtime override invocation.
- **Console Output:** `Circle area: 78.5398`

---

### Concept 09: Abstract Classes & Interfaces (`interfaces`)
- **Learning Objective:** Visualize interface contracts, default method inheritance, and polymorphism through interface types.
- **Java Source Example:**
  ```java
  public interface Drivable {
      void accelerate();
      default void honk() { System.out.println("Beep!"); }
  }
  public class ElectricVehicle implements Drivable {
      int speed = 0;
      @Override public void accelerate() { this.speed += 20; }
      public static void main(String[] args) {
          Drivable d = new ElectricVehicle();
          d.accelerate();
          d.honk();
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 8`: Allocation of `ElectricVehicle@0x07A1` assigned to interface reference `d`.
  2. `LINE 9`: Call `accelerate()` mutates `speed` to `20`.
  3. `LINE 10`: Call `honk()` resolves to default interface method implementation in `Drivable`.
- **Expected Visualization:** Interface boundary marker, default method frame execution.
- **Console Output:** `Beep!`

---

### Concept 10: Modern Java 21 Records (`records`)
- **Learning Objective:** Understand transparent data carrier semantics, automatic final fields, and canonical constructor invariants.
- **Java Source Example:**
  ```java
  public record StudentRecord(String id, String name, int gpa) {
      public StudentRecord {
          if (gpa < 0 || gpa > 100) throw new IllegalArgumentException("Invalid GPA");
      }
      public static void main(String[] args) {
          StudentRecord student = new StudentRecord("S101", "Marcus", 92);
          System.out.println(student.name() + " GPA: " + student.gpa());
      }
  }
  ```
- **Execution Stages:**
  1. `LINE 6`: Compact constructor validates `gpa = 92`.
  2. Allocation of immutable Record instance `@0x08B1`.
  3. Component fields `id`, `name`, `gpa` flagged with immutable locks.
  4. `LINE 7`: Accessor methods `student.name()` and `student.gpa()` invoked.
- **Expected Visualization:** Record card with "Immutable" security badge and read-only field styling.
- **Console Output:** `Marcus GPA: 92`

---

### Concept 11: Sealed Classes & Interfaces (`sealed`)
- **Learning Objective:** Visualize closed class hierarchies, exhaustive domain model enforcement, and permitted subclasses (`final`, `sealed`, `non-sealed`).
- **Java Source Example:**
  ```java
  public sealed interface PaymentMethod permits CreditCard, BankTransfer {}
  public final class CreditCard implements PaymentMethod { String cardNum; }
  public final class BankTransfer implements PaymentMethod { String iban; }
  public class SealedDemo {
      public static void main(String[] args) {
          PaymentMethod pm = new CreditCard();
      }
  }
  ```
- **Expected Visualization:** Sealed hierarchy diagram in Metaspace / Method Area showing exact permitted types.

---

### Concept 12: Pattern Matching (`pattern-matching`)
- **Learning Objective:** Observe type patterns in `switch` expressions and deconstruction patterns extracting component variables directly onto the stack.
- **Java Source Example:**
  ```java
  public record Point(int x, int y) {}
  public class PatternDemo {
      public static void printPoint(Object obj) {
          if (obj instanceof Point(int x, int y)) {
              System.out.println("Deconstructed: x=" + x + ", y=" + y);
          }
      }
      public static void main(String[] args) {
          printPoint(new Point(12, 34));
      }
  }
  ```
- **Execution Stages:**
  1. Object passed to `printPoint`.
  2. Pattern evaluation matches `Point` type.
  3. Deconstruction automatically extracts `x=12` and `y=34` directly into current stack frame.
- **Console Output:** `Deconstructed: x=12, y=34`

---

### Concept 13: Nested & Inner Classes (`nested-classes`)
- **Learning Objective:** Visualize the hidden synthetic `this$0` reference connecting an inner class instance to its enclosing outer instance.
- **Java Source Example:**
  ```java
  public class Outer {
      int outerVal = 50;
      public class Inner {
          public void printBoth() {
              System.out.println("Outer val: " + outerVal);
          }
      }
      public static void main(String[] args) {
          Outer out = new Outer();
          Outer.Inner in = out.new Inner();
          in.printBoth();
      }
  }
  ```
- **Execution Stages:**
  1. Allocation of `Outer@0x09C1`.
  2. Allocation of `Inner@0x09C2` with synthetic field `this$0 = @0x09C1`.
  3. Call `in.printBoth()` navigates `this$0` to read `outerVal`.
- **Expected Visualization:** Heap pointer from `Inner` object back to enclosing `Outer` object.
- **Console Output:** `Outer val: 50`

---

### Concept 14: Exception Handling & Stack Unwinding (`exceptions`)
- **Learning Objective:** Visualize exceptional execution flow: instantiating an exception, searching the JVM Exception Table, and unwinding call stack frames until caught.
- **Java Source Example:**
  ```java
  public class ExceptionDemo {
      public static void compute(int val) {
          if (val < 0) throw new IllegalArgumentException("Negative value");
      }
      public static void main(String[] args) {
          try {
              compute(-5);
          } catch (IllegalArgumentException e) {
              System.out.println("Caught: " + e.getMessage());
          }
      }
  }
  ```
- **Execution Stages:**
  1. Call `compute(-5)`; stack frame created.
  2. Exception object `IllegalArgumentException@0x0AD1` allocated.
  3. Frame `compute` unceremoniously pops (unwinds) without returning.
  4. Execution transfers to `main`'s catch block; exception bound to local `e`.
- **Expected Visualization:** Red alert badge, stack frame popping in reverse order, binding exception reference to catch block.
- **Console Output:** `Caught: Negative value`

