# OOPS LAB — Complete Coding Rules & System Execution Specifications

**Document Version:** 1.0.0  
**Target Runtime:** Java 21 LTS Isolated Simulator & AST Engine  
**Classification:** Developer & Student Reference  
**Last Updated:** 2026-11-07  

---

## 1. Core Purpose & Architectural Model

OOPS LAB is a dedicated **Object-Oriented Programming (OOP) and Java 21 simulation laboratory**. Its mission is to transform abstract software design concepts into tangible, interactive 2D/3D visual memory representations.

The simulator tracks:
- **Stack Frames** (LIFO call stack, method scopes, local variables)
- **Eden Heap Objects** (object identity, references, field mutations, pointer aliasing)
- **Class Blueprints** (inheritance, interfaces, dynamic dispatch, vtables)
- **Control Flow** (loops, branches, returns, recursion, exceptions)

Because OOPS LAB is an educational laboratory operating local-first in the browser, it is **not** a general-purpose host OS shell. This document specifies the exact boundaries of what can and cannot be executed.

---

## 2. What CAN Be Done (Fully Supported & Visualized)

### 2.1 Object-Oriented Architecture
- **Classes**: Concrete classes, `abstract class`, `interface`, and Java 14+ `record`.
- **Inheritance**: Single inheritance (`class Dog extends Animal`) with recursive constructor chaining (`super(...)`).
- **Interfaces**: Implementing single or multiple interfaces (`class SmartDevice implements Switchable, Connectable`).
- **Polymorphism**: Dynamic method dispatch (vtable lookup resolves method calls based on the runtime heap instance, not just reference type).
- **Constructors**: Parameterized constructors, overloaded constructors, and `this(...)` constructor delegation.
- **Encapsulation**: `private`, `protected`, `public`, and package-private visibility modifiers. Getters and setters visually mutate fields on heap entities.
- **Static Members**: `static` fields (stored in global class static tables) and `static` utility methods.

### 2.2 Memory & Reference Manipulation
- **Object Allocation**: `new MyClass(...)` creates an interactive heap node with a deterministic address pointer (e.g. `@0x1B82` / `OBJ-001`).
- **Pointer Aliasing**: Assigning references (`Student s2 = s1;`) visually connects multiple stack variable pins to the exact same heap object card.
- **State Mutation**: Direct or method-mediated field updates (`account.deposit(250.0)`) record before/after state deltas in the inspector.
- **Arrays**: 1D primitive and object arrays (`int[] arr = new int[5];`, `Student[] team = new Student[3];`).
- **Null Safety**: Assigning and checking `null` references (`account = null;`).

### 2.3 Control Flow & Algorithms
- **Conditionals**: `if`, `else if`, `else`.
- **Loops**: `for`, `while`, and enhanced for-each loops.
- **Switch Statements**: `switch-case` blocks with `break` and `default`.
- **Recursion**: Recursive functions (e.g. Factorial, Fibonacci, binary tree traversal) push and pop visual call stack frames sequentially.
- **Console Output**: `System.out.println(...)` and `System.out.print(...)` stream live text into the Terminal drawer.

### 2.4 Exception Handling
- **`try-catch-finally`**:
  - Normal flow executes `try` statements.
  - If a fault occurs, the engine intercepts it, binds the exception object into the stack frame (e.g. `Exception e`), and executes the `catch` block (`Diversion Status: CAUGHT`).
  - The `finally` block is guaranteed to execute afterwards.
- **Explicit `throw`**: `throw new IllegalArgumentException("Invalid state");`. If uncaught, the visualizer halts with an `EXCEPTION THROWN` alert banner (`Diversion Status: THROWN`).
- **Runtime Faults**: Automatic detection and simulation of `ArithmeticException: / by zero` and `NullPointerException`.

### 2.5 Multi-File Projects
- Projects can split architectures cleanly across multiple files (`Main.java`, `Person.java`, `Employee.java`, `Payable.java`). The parser unifies them into a cross-file AST.

---

## 3. What CANNOT Be Done (Restricted & Blocked)

To protect the user's host environment and preserve strict educational sandbox boundaries, the AST Security Filter (`astSecurityFilter.ts` and `AstSecurityValidator.java`) **rejects code containing the following**:

| Category | Forbidden API / Token | Reason for Restriction |
| :--- | :--- | :--- |
| **OS Commands / Process Exec** | `Runtime.getRuntime().exec()`, `ProcessBuilder`, `System.exit()` | Cannot spawn shell processes or terminate the host runner. |
| **Host Filesystem I/O** | `java.io.File`, `FileInputStream`, `FileOutputStream`, `java.nio.file.*` | Cannot read, write, or delete files on your computer's hard disk. |
| **Network & Web Access** | `java.net.Socket`, `ServerSocket`, `URL`, `HttpURLConnection`, `HttpClient` | Cannot establish outbound network sockets or scrape the web. |
| **Reflection & MethodHandles** | `java.lang.reflect.*`, `java.lang.invoke.*`, `Class.forName()`, `MethodHandles` | Bypasses language visibility rules and breaks deterministic simulation. |
| **JVM Memory Hacks** | `sun.misc.Unsafe`, `java.security.*` | Raw pointer manipulation outside the simulated Eden Heap is disallowed. |
| **Desktop GUI Windows** | `javax.swing.*`, `java.awt.*`, `javafx.*` | Native OS windows cannot render in the browser; OOPS LAB renders 2D/3D canvas nodes instead. |
| **Dangerous Thread Control** | `Thread.stop()`, `Thread.suspend()`, `Thread.resume()` | Deprecated in modern Java; prevents unrecoverable thread deadlocks. |

---

## 4. Hard Execution Quotas & Guardrails

To prevent accidental infinite loops from freezing the browser thread, the engine enforces deterministic caps:

| Parameter | Guardrail Cap | Behavior when Cap is Exceeded |
| :--- | :--- | :--- |
| **Max Simulation Steps** | **2,000 steps** | Halts with `[SAFETY TERMINATION: Exceeded execution budget]`. |
| **Loop Iterations** | **1,000 iterations** | Single loop freeze detection aborts loop. |
| **Call Stack Depth** | **50 frames** | Infinite recursion halts with simulated `StackOverflowError`. |
| **Active Heap Allocations** | **100 objects** | Excessive memory allocations halt with simulated `OutOfMemoryError`. |
| **Max Array Length** | **100 elements** | Prevents giant array allocation bombs. |
| **Max String Length** | **10,000 characters** | Exponential string concatenation is bounded. |
| **Console Output Buffer** | **64 KB** | Excess output is clamped to prevent memory exhaustion. |
| **Source File Size** | **128 KB** | Oversized input files are rejected to prevent AST ReDoS. |

---

## 5. Verified Working Code Templates

### Template 1: Encapsulation, State Mutation & Reference Aliasing
```java
class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("Alice", 500.0);
        BankAccount acc2 = acc1; // Pointer Aliasing: points to same object
        acc2.deposit(250.0);
        System.out.println("Balance: " + acc1.getBalance()); // 750.0
    }
}
```

### Template 2: Inheritance, Dynamic Dispatch & Super Chaining
```java
abstract class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double calculatePay();
}

class Manager extends Employee {
    private double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return this.baseSalary + this.bonus;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Manager("Sarah", 8000.0, 2000.0);
        System.out.println("Total compensation: " + emp.calculatePay());
    }
}
```

### Template 3: Exception Handling with Try-Catch-Finally
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Initiating calculation...");

        try {
            int total = 1000;
            int parts = 0;
            
            // Triggers ArithmeticException: / by zero
            int share = total / parts;
            System.out.println("Share: " + share);

        } catch (Exception e) {
            // Diverted into catch block: Diversion Status = CAUGHT
            System.out.println("Caught exception: " + e.getMessage());

        } finally {
            // Always executes guaranteed
            System.out.println("Calculation cleanup complete.");
        }

        System.out.println("Program finished safely.");
    }
}
```
