export interface ConceptSection {
  title: string;
  badge?: string;
  description: string;
  bulletPoints?: string[];
  codeSnippet?: string;
  codeExplanation?: string;
  diagramNotes?: string;
  antiPattern?: {
    wrongCode: string;
    wrongExplanation: string;
    rightCode: string;
    rightExplanation: string;
  };
}

export interface DetailedConcept {
  id: string;
  stepNumber: number;
  category: 'Foundations' | 'Core OOP' | 'Relationships' | 'Java 21 Modern' | 'Advanced';
  title: string;
  subtitle: string;
  readingTime: string;
  prerequisites: string[];
  targetSkills: string[];
  
  // Level 1: Basic Foundations
  basic: {
    overview: string;
    realWorldAnalogy: {
      headline: string;
      description: string;
    };
    whyItMatters: string[];
    coreRules: string[];
    starterSnippet: string;
  };

  // Level 2: Intermediate Deep Dive
  intermediate: {
    conceptualMechanics: string;
    syntaxBreakdown: ConceptSection[];
    commonPitfalls: {
      mistake: string;
      explanation: string;
      badSnippet: string;
      goodSnippet: string;
    }[];
  };

  // Level 3: Advanced JVM Architecture
  advanced: {
    jvmMemoryLayout: {
      stackAllocation: string;
      heapAllocation: string;
      metaspaceRole: string;
      gcLifecycle: string;
    };
    bytecodeInsights: {
      opcode: string;
      explanation: string;
    }[];
    engineeringConsiderations: string[];
  };

  // Level 4: Modern Java 21 & Production Idioms
  modernJava21: {
    bestPractices: string[];
    modernSnippet: string;
    modernExplanation: string;
  };

  // Interactive playground integration
  playgroundCode: string;
  challengeId?: number;
}

export const detailedConceptsMap: Record<string, DetailedConcept> = {
  vars: {
    id: 'vars',
    stepNumber: 1,
    category: 'Foundations',
    title: 'Variables & Data Types',
    subtitle: 'Primitive types vs Object references in JVM memory architecture',
    readingTime: '6 min read',
    prerequisites: ['Basic terminal usage', 'Understanding of bits and bytes'],
    targetSkills: ['Primitive storage models', 'Heap reference addressing', 'Stack allocation boundaries'],
    basic: {
      overview: 'Java programs manipulate two fundamentally different forms of data: primitive values and object references. Primitives hold actual raw values (numbers, booleans, characters), while reference variables hold memory addresses that point to instances located on the JVM Heap.',
      realWorldAnalogy: {
        headline: 'Cash in Pocket vs. Safe Deposit Key',
        description: 'A primitive variable is like carrying cash directly in your wallet: the value is right there in the slot. An object reference is like holding the key to a bank safe deposit box: the key itself is small, but it unlocks a large, structured vault stored over in the bank building (the JVM Heap).'
      },
      whyItMatters: [
        'Prevent unintended side-effects: mutating an object via one reference affects all other references pointing to that same heap address.',
        'Optimize memory usage: primitives incur zero object header overhead and reside contiguously on the thread call stack.',
        'Eliminate NullPointerExceptions: primitives can never be null; only references can evaluate to null.'
      ],
      coreRules: [
        'Java has exactly 8 primitive types: byte, short, int, long, float, double, char, boolean.',
        'All primitives are passed strictly by value — a bitwise copy is placed onto the receiving method operand stack.',
        'Reference variables take either 32 bits (with Compressed OOPs enabled) or 64 bits on 64-bit JVMs.',
        'Assigning reference `b = a` does NOT duplicate the object; it creates a second pointer to the exact same heap memory block.'
      ],
      starterSnippet: `public class VariableBasics {
    public static void main(String[] args) {
        // Primitives: raw values stored on the call stack
        int age = 24;
        double balance = 1500.50;
        boolean isActive = true;

        // References: 64-bit pointers to heap-allocated objects
        String studentName = "Alice";
        int[] scores = new int[]{95, 88, 92};
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'When a method is called, its primitive variables are written directly into local variable array slots within the current Stack Frame. When an object is instantiated using `new`, memory is carved out on the Eden space of the JVM Heap, and the returned 64-bit reference address is stored in the local variable array slot.',
      syntaxBreakdown: [
        {
          title: 'Pass-by-Value with Primitive Copies',
          description: 'Modifying a primitive parameter inside a method has zero effect on the caller variable because an isolated copy of the bits is passed.',
          codeSnippet: `public static void modifyPrimitive(int val) {
    val = val + 10; // Only modifies local frame copy
}

public static void main(String[] args) {
    int score = 50;
    modifyPrimitive(score);
    System.out.println(score); // Prints 50, unchanged!
}`
        },
        {
          title: 'Pass-by-Value with Reference Pointers',
          description: 'When passing an object, the address pointer is passed by value. Mutating the object state mutates the shared heap object!',
          codeSnippet: `static class Box { int size = 10; }

public static void resize(Box b) {
    b.size = 99; // Mutates the object on the heap
}

public static void main(String[] args) {
    Box myBox = new Box();
    resize(myBox);
    System.out.println(myBox.size); // Prints 99!
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Using `==` to compare Object content instead of `.equals()`',
          explanation: '`==` compares whether two reference variables hold the exact same memory address. To compare the actual contents of objects (like Strings), use `.equals()`.',
          badSnippet: `String a = new String("Java");
String b = new String("Java");
if (a == b) { // Evaluates FALSE! Different heap addresses
    System.out.println("Equal");
}`,
          goodSnippet: `String a = new String("Java");
String b = new String("Java");
if (a.equals(b)) { // Evaluates TRUE! Compares character sequences
    System.out.println("Equal");
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Stored in 32-bit (1 slot for int/float/ref) or 64-bit (2 slots for long/double) entries within the thread-isolated Stack Frame Local Variable Table (LVT).',
        heapAllocation: 'Objects in Eden space consist of a 12-byte Object Header (8-byte Mark Word + 4-byte compressed Klass Word) followed by instance field values aligned to 8-byte boundaries.',
        metaspaceRole: 'Type definitions, method bytecode, and static variables reside in native Metaspace off-heap memory.',
        gcLifecycle: 'Primitives cease to exist the instant the Stack Frame pops. Heap objects remain until no GC root path references them, making them eligible for Minor GC.'
      },
      bytecodeInsights: [
        { opcode: 'bipush 42', explanation: 'Pushes byte literal 42 as integer onto the operand stack.' },
        { opcode: 'istore_1', explanation: 'Pops integer from operand stack and stores it in Local Variable slot 1.' },
        { opcode: 'new #2', explanation: 'Allocates uninitialized memory on heap for class indexed at constant pool #2.' },
        { opcode: 'invokespecial #3', explanation: 'Invokes `<init>` constructor on newly allocated instance reference.' }
      ],
      engineeringConsiderations: [
        'Compressed OOPs (`-XX:+UseCompressedOops`) reduces 64-bit heap references to 32 bits by shifting 3 bits, saving up to 40% memory on heaps under 32GB.',
        'Escape Analysis can perform scalar replacement: if an object never escapes the method scope, the JVM allocates its fields directly onto the stack, avoiding heap allocation entirely.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Prefer modern immutable primitives and records over mutable container beans.',
        'Use `var` for local variables with obvious initializers to eliminate visual noise without sacrificing static typing.',
        'Avoid primitive wrapper autoboxing in tight loops (e.g. `Integer` instead of `int`) to prevent unnecessary heap allocations.'
      ],
      modernSnippet: `// Modern Java 21: Local variable type inference and compact records
var threshold = 100; // Inferred as primitive int
record Coordinates(double x, double y) {} // Zero boilerplate data carrier

var point = new Coordinates(12.5, 48.2); // Immutable heap instance`,
      modernExplanation: 'Java 21 `var` retains full compile-time static type safety while keeping code concise. Record instances are optimized by HotSpot JIT compiler with aggressive inlining.'
    },
    playgroundCode: `public class PrimitiveVsReference {
    public static void main(String[] args) {
        int primitiveCount = 10;
        String message = new String("Java 21 OOP");
        System.out.println("Count: " + primitiveCount);
        System.out.println("Message: " + message);
    }
}`,
    challengeId: 1
  },

  methods: {
    id: 'methods',
    stepNumber: 2,
    category: 'Foundations',
    title: 'Methods & Call Stack',
    subtitle: 'Stack frame push/pop lifecycle, parameter passing semantics, and return mechanics',
    readingTime: '7 min read',
    prerequisites: ['Variables & Data Types', 'JVM Thread Model Basics'],
    targetSkills: ['Call Stack execution tracing', 'Stack Frame push/pop mechanics', 'Operand stack simulation'],
    basic: {
      overview: 'A method is a reusable block of code that performs an operation on input parameters and returns a result. In the JVM, each thread maintains its own private Call Stack. Every time a method is invoked, the JVM pushes a new Stack Frame. When the method finishes, its frame is popped and discarded.',
      realWorldAnalogy: {
        headline: 'Stack of Cafeteria Trays',
        description: 'Think of a spring-loaded tray dispenser at a cafeteria: each tray represents a method call. You can only work on the top tray (the active method). When you finish lunch, you remove the top tray (method return), revealing the previous tray underneath (caller method).'
      },
      whyItMatters: [
        'Understand StackOverflowError: calling methods recursively without a base case exhausts the JVM thread stack memory.',
        'Trace program flow: debugging stack traces in logs mirrors the exact bottom-up sequence of active method frames.',
        'Scope isolation: variables inside a method cannot collide with or alter variables of the same name in calling methods.'
      ],
      coreRules: [
        'Each method call pushes a Stack Frame; reaching `return` or throwing an unhandled exception pops that frame.',
        'Stack memory is fixed per thread (typically 1024KB default configured by `-Xss1m`).',
        'Stack Frames cannot access variables in other Stack Frames on the same thread.',
        'All parameter passing in Java is strictly Pass-by-Value.'
      ],
      starterSnippet: `public class CallStackBasics {
    public static int add(int a, int b) {
        int sum = a + b; // Computed on operand stack
        return sum;      // Frame pops; returns to caller
    }

    public static void main(String[] args) {
        int x = 10;
        int y = 20;
        int total = add(x, y); // Pushes add() frame
        System.out.println("Total: " + total);
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'Inside a Stack Frame reside three core structures: the Local Variable Array (LVA), the Operand Stack (where intermediate bytecode operations are computed), and the Frame Data (referencing the runtime constant pool and method return address).',
      syntaxBreakdown: [
        {
          title: 'Method Overloading Rules',
          description: 'Methods in the same class can share a name if their parameter lists differ in count, order, or types. Return type alone is NOT sufficient to overload.',
          codeSnippet: `public class OverloadDemo {
    public int compute(int x) { return x * 2; }
    public double compute(double x) { return x * 2.0; } // Valid overload
    // public long compute(int x) { return x * 2L; }   // INVALID! Same signature
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Infinite recursion causing java.lang.StackOverflowError',
          explanation: 'Recursive methods must have a terminating base condition that returns before pushing another stack frame.',
          badSnippet: `public static int countdown(int n) {
    return countdown(n - 1); // Never stops; exhausts thread stack!
}`,
          goodSnippet: `public static int countdown(int n) {
    if (n <= 0) return 0; // Base case: terminates recursion!
    return countdown(n - 1);
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Allocated in thread stack (`-Xss`). Stack Frames are LIFO (Last-In-First-Out). Deallocation requires no garbage collector; popping the frame frees memory in O(1) time.',
        heapAllocation: 'If a method instantiates objects, those objects live on the Heap. The reference on the stack simply holds their 64-bit heap addresses.',
        metaspaceRole: 'Method bytecode, argument types, and return descriptors reside in the Metaspace as part of the Class metadata.',
        gcLifecycle: 'Stack frame popping releases reference counts to heap objects. If no other live references exist, objects become eligible for GC sweep.'
      },
      bytecodeInsights: [
        { opcode: 'invokestatic #7', explanation: 'Calls static method resolved from constant pool entry #7 without requiring an object receiver.' },
        { opcode: 'iload_0', explanation: 'Loads integer parameter from slot 0 onto operand stack.' },
        { opcode: 'iadd', explanation: 'Pops top two integers from operand stack, adds them, and pushes integer sum.' },
        { opcode: 'ireturn', explanation: 'Returns integer on top of operand stack to caller and pops current stack frame.' }
      ],
      engineeringConsiderations: [
        'Method inlining: HotSpot C2 compiler automatically replaces small, frequently called method frames with the raw body code, completely eliminating frame creation overhead.',
        'Virtual Threads in Java 21: Unlike OS platform threads (which require 1MB OS stacks), Virtual Threads use heap-allocated stack chunks, allowing millions of concurrent calls.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Keep methods short, pure, and focused on a single responsibility (Single Responsibility Principle).',
        'Favor expression-style helper methods and static pure functions without mutable side-effects.',
        'Leverage Java 21 pattern-matching switch within methods for declarative control flow.'
      ],
      modernSnippet: `// Java 21 clean method composition
public static String formatUserStatus(boolean active, int credits) {
    return switch (credits) {
        case 0 -> active ? "Active (Zero Balance)" : "Suspended";
        case int c when c > 1000 -> "VIP Tier (Credits: " + c + ")";
        default -> "Standard User (Credits: " + credits + ")";
    };
}`,
      modernExplanation: 'Java 21 pattern-matching switch with guarded patterns allows complex multi-variable state evaluation in a single readable method body.'
    },
    playgroundCode: `public class CallStackDemo {
    public static int multiply(int a, int b) {
        return a * b; // Step through to see frame pop
    }

    public static void main(String[] args) {
        int x = 6;
        int y = 7;
        int product = multiply(x, y);
        System.out.println("Product: " + product);
    }
}`
  },

  classes: {
    id: 'classes',
    stepNumber: 3,
    category: 'Core OOP',
    title: 'Classes & Objects',
    subtitle: 'Class blueprints in Metaspace, heap object allocation, identity hashcodes',
    readingTime: '8 min read',
    prerequisites: ['Variables & Data Types', 'Methods & Call Stack'],
    targetSkills: ['Class modeling', 'Heap instance allocation lifecycle', 'Identity vs Value equality'],
    basic: {
      overview: 'A Class is a blueprint that defines the structure and behavior of custom data types. An Object is an actual runtime instance created from that blueprint residing on the JVM Heap. Multiple independent objects can be instantiated from a single class.',
      realWorldAnalogy: {
        headline: 'Architectural Blueprint vs. Physical House',
        description: 'An architectural drawing on paper is the Class: it specifies the dimensions, rooms, and electrical outlets. The concrete, physical houses built in a neighborhood are the Objects. You can build 50 houses from one blueprint, and painting the walls in House #1 does not alter House #2.'
      },
      whyItMatters: [
        'Organize complex software into cohesive modules that mirror business domains (User, Order, Account).',
        'Encapsulate data fields alongside the specific operations allowed to mutate that data.',
        'Enable polymorphism, inheritance, and object composition across the application.'
      ],
      coreRules: [
        'A class defines state via fields (instance variables) and behavior via methods.',
        'The `new` operator allocates memory on the JVM Eden Heap space and returns an object reference.',
        'Every object has an identity hashcode (`System.identityHashCode`) tied to its memory existence.',
        'Classes are loaded into JVM Metaspace once; objects are created and collected dynamically on the Heap.'
      ],
      starterSnippet: `public class BankAccount {
    // Instance fields (State)
    String owner;
    double balance;

    // Instance method (Behavior)
    void deposit(double amount) {
        this.balance += amount;
    }

    public static void main(String[] args) {
        // Instantiating 2 independent objects from the BankAccount class
        BankAccount acc1 = new BankAccount();
        acc1.owner = "Alice";
        acc1.deposit(500.0);

        BankAccount acc2 = new BankAccount();
        acc2.owner = "Bob";
        acc2.deposit(250.0);
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'When the JVM executes `new BankAccount()`, it performs four sequential steps: (1) Verifies the class is loaded into Metaspace, (2) Calculates total byte size required for fields plus object header, (3) Carves out contiguous memory in Eden space, zero-initializing all fields (0, 0.0, false, null), and (4) Executes the `<init>` constructor method.',
      syntaxBreakdown: [
        {
          title: 'Field vs Local Variable Resolution',
          description: 'Instance fields belong to the heap object and persist for its entire lifetime. Local variables belong to a stack frame and evaporate when the method finishes.',
          codeSnippet: `public class ScopeDemo {
    int instanceCounter = 0; // Lives on Heap with object

    public void increment() {
        int step = 1; // Lives on Stack Frame only
        instanceCounter += step;
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Confusing object reference reassignment with object modification',
          explanation: 'Reassigning a reference variable to a new object does not change or overwrite the original object in memory.',
          badSnippet: `BankAccount a = new BankAccount();
a.owner = "Alice";
BankAccount b = a;
b = new BankAccount(); // ONLY changes variable 'b'; 'a' still points to Alice!
b.owner = "Bob";`,
          goodSnippet: `BankAccount a = new BankAccount();
a.owner = "Alice";
BankAccount b = a;
b.owner = "Alice Updated"; // Mutates the shared object on the heap!`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Reference variables (`acc1`, `acc2`) hold 64-bit (or 32-bit compressed) pointers stored in the caller stack frame local variables.',
        heapAllocation: 'Objects are laid out in Eden space: [Mark Word (8B)] + [Klass Word (4B)] + [owner ref (4B)] + [balance double (8B)] + [4B padding] = 32 bytes aligned to 8-byte boundaries.',
        metaspaceRole: 'The Klass Word points back to the Metaspace metadata representing the BankAccount class structure, vtable, and method bytecodes.',
        gcLifecycle: 'When all reference variables pointing to an object go out of scope or are set to null, the object becomes unreachable and is collected during Minor GC.'
      },
      bytecodeInsights: [
        { opcode: 'new #7', explanation: 'Allocates memory on Eden space for class specified by constant pool entry #7.' },
        { opcode: 'dup', explanation: 'Duplicates top reference on operand stack (one for constructor, one to store in local variable).' },
        { opcode: 'invokespecial #9', explanation: 'Calls the `<init>` method to execute constructor and field initializers.' },
        { opcode: 'astore_1', explanation: 'Stores reference pointer to newly constructed object into local variable slot 1.' }
      ],
      engineeringConsiderations: [
        'Memory alignment padding: JVM rounds every heap object size up to the nearest multiple of 8 bytes (64 bits) for CPU bus line alignment.',
        'False sharing: In multi-threaded systems, two distinct objects placed on the same 64-byte CPU cache line can cause cache invalidation penalties.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Prefer immutable designs: make fields `final` wherever possible.',
        'For pure data holder classes with no business behavior, use modern Java 21 `record` instead of traditional classes.',
        'Validate arguments immediately at construction time rather than allowing invalid initial states.'
      ],
      modernSnippet: `// Modern Java 21 immutable record vs boilerplate class
public record CustomerAccount(String id, String owner, double balance) {
    public CustomerAccount {
        if (balance < 0) throw new IllegalArgumentException("Balance cannot be negative");
    }
}`,
      modernExplanation: 'A Java 21 record automatically generates private final fields, constructor, getters, equals(), hashCode(), and toString() directly in bytecode without boilerplate.'
    },
    playgroundCode: `public class ClassObjectDemo {
    static class Book {
        String title;
        double price;
        Book(String t, double p) {
            this.title = t;
            this.price = p;
        }
    }

    public static void main(String[] args) {
        Book b1 = new Book("Effective Java", 45.0);
        Book b2 = new Book("Clean Architecture", 39.5);
        System.out.println("Book 1: " + b1.title);
        System.out.println("Book 2: " + b2.title);
    }
}`
  },

  constructors: {
    id: 'constructors',
    stepNumber: 4,
    category: 'Core OOP',
    title: 'Constructors & `this`',
    subtitle: 'Object initialization lifecycle, constructor chaining with this(), and default constructor mechanics',
    readingTime: '7 min read',
    prerequisites: ['Classes & Objects'],
    targetSkills: ['Constructor chaining', 'Validation invariants', '`this` pointer mechanics'],
    basic: {
      overview: 'A constructor is a special method called automatically when an object is created with `new`. Its purpose is to initialize instance fields and guarantee that an object enters memory in a valid, usable state.',
      realWorldAnalogy: {
        headline: 'Passport Issuance Desk',
        description: 'You cannot walk out of the passport office with an empty blank booklet: an officer must stamp your photograph, issue your identity number, and sign the document (the constructor). Only then is the passport valid and recognized.'
      },
      whyItMatters: [
        'Enforce business invariants from the first millisecond of object existence (e.g. initial balance >= 0).',
        'Eliminate uninitialized null or invalid field states.',
        'Support flexible initialization paths through constructor overloading.'
      ],
      coreRules: [
        'Constructors have the exact same name as the class and NO return type (not even void).',
        'If you do not declare any constructor, javac automatically inserts a default no-argument constructor.',
        'If you declare ANY custom constructor, the compiler no longer creates the default no-arg constructor.',
        '`this(...)` delegates to another constructor in the same class and MUST be the first statement.'
      ],
      starterSnippet: `public class User {
    private String username;
    private String role;

    // Overloaded Constructor 1 (default role)
    public User(String username) {
        this(username, "MEMBER"); // Delegates to Constructor 2
    }

    // Overloaded Constructor 2 (master constructor)
    public User(String username, String role) {
        this.username = username;
        this.role = role;
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'Under the hood, Java compiles constructors into a special bytecode method named `<init>`. In `<init>`, the JVM first invokes `super.<init>()`, then initializes any inline field assignments (e.g. `int count = 1;`), and finally executes the constructor body code.',
      syntaxBreakdown: [
        {
          title: 'Differentiating Fields from Parameters using `this`',
          description: 'When a parameter name matches an instance field name, `this.fieldName` explicitly refers to the heap instance field.',
          codeSnippet: `public class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;   // this.width refers to heap field; width is param
        this.height = height;
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Putting `this(...)` on line 2 or calling it recursively',
          explanation: '`this(...)` must strictly be the first executable line of a constructor body, and cyclic constructor calls (`A calls B, B calls A`) cause a compile-time error.',
          badSnippet: `public User(String name) {
    System.out.println("Creating user...");
    this(name, "USER"); // COMPILE ERROR! Must be first statement!
}`,
          goodSnippet: `public User(String name) {
    this(name, "USER"); // First statement
    System.out.println("Creating user...");
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'The first local variable slot (slot 0) in every instance constructor is implicitly occupied by `this`, pointing to the uninitialized heap memory allocated by `new`.',
        heapAllocation: 'Fields are zero-allocated in memory before the constructor body executes. If a constructor throws an exception, the partially initialized memory is abandoned for GC.',
        metaspaceRole: 'All overloaded `<init>` bytecode methods are registered in the class metadata constant pool with unique type descriptors.',
        gcLifecycle: 'If an exception is thrown inside `<init>`, the object reference is never returned to the caller; the half-initialized heap space is reclaimed during the next GC cycle.'
      },
      bytecodeInsights: [
        { opcode: 'aload_0', explanation: 'Loads `this` reference (slot 0) onto operand stack.' },
        { opcode: 'invokespecial #1', explanation: 'Calls Object.<init>() or overloaded constructor `<init>` method.' },
        { opcode: 'putfield #7', explanation: 'Assigns evaluated value from operand stack into the specified instance field.' }
      ],
      engineeringConsiderations: [
        'Constructor Escape Vulnerability: Never pass `this` to another thread or listener inside a constructor! Other threads might read partially initialized fields before `<init>` finishes.',
        'Defensive Copying: If a constructor accepts a mutable parameter (like a Date or List), create a private clone inside the constructor to preserve encapsulation.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Use Compact Constructors in Java 21 Records for concise, declarative validation.',
        'Java 22 preview (Flexible Constructor Bodies - JEP 447) allows statements before `super(...)` / `this(...)` as long as they do not reference `this`.',
        'Favor static factory methods (e.g. `User.of(name)`) for expressive construction.'
      ],
      modernSnippet: `// Modern Java 21 Record Compact Constructor
public record BankTransaction(String id, double amount) {
    public BankTransaction {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        // No need to write this.id = id; automatic in compact constructor!
    }
}`,
      modernExplanation: 'Java 21 compact constructors automatically assign fields after validation without repeating assignment boilerplate.'
    },
    playgroundCode: `public class ConstructorDemo {
    private String name;
    private int age;

    public ConstructorDemo(String name) {
        this(name, 18); // Constructor chaining
    }

    public ConstructorDemo(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        ConstructorDemo user1 = new ConstructorDemo("Alice");
        ConstructorDemo user2 = new ConstructorDemo("Bob", 25);
        System.out.println("User 1: " + user1.name + " (" + user1.age + ")");
        System.out.println("User 2: " + user2.name + " (" + user2.age + ")");
    }
}`
  },

  encapsulation: {
    id: 'encapsulation',
    stepNumber: 5,
    category: 'Core OOP',
    title: 'Encapsulation & Access Modifiers',
    subtitle: 'Data hiding with private fields, invariant validation, and the 4 Java access tiers',
    readingTime: '8 min read',
    prerequisites: ['Classes & Objects', 'Constructors & this'],
    targetSkills: ['Information hiding', 'Invariant protection', 'Access level scoping'],
    basic: {
      overview: 'Encapsulation is the fundamental OOP principle of bundling data fields and the methods that operate on that data into a single unit, while restricting direct external access to internal details. It protects object invariants from illegal or corrupted states.',
      realWorldAnalogy: {
        headline: 'Automated Capsule & ATM Machine',
        description: 'You cannot open the steel back panel of an ATM and physically pluck dollar bills out of the cash feeder. You must use the keypad and card reader (public methods), which authenticate your PIN and ensure your balance is sufficient before dispensing cash.'
      },
      whyItMatters: [
        'Invariant Protection: Prevents an external caller from setting `account.balance = -9999999`.',
        'Refactoring Freedom: You can change internal field data structures (e.g. storing cents instead of dollars) without breaking any external callers.',
        'Security & Access Control: Expose only what is strictly necessary to outside consumers.'
      ],
      coreRules: [
        'Fields should almost always be marked `private`.',
        'Provide public getters for read access and validated public setters/mutators for state changes.',
        'Java provides 4 access levels: `private` (class only), package-private (no modifier; package only), `protected` (package + subclasses), and `public` (everywhere).'
      ],
      starterSnippet: `public class BankAccount {
    // Hidden private state
    private double balance;

    // Public method with invariant check
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'The Java compiler (`javac`) verifies access control rules at compile time. In addition, the JVM Classloader and Bytecode Verifier enforce these boundaries at runtime when resolving `getfield` and `putfield` instructions, ensuring bytecode manipulation cannot bypass access modifiers without elevated reflection permissions.',
      syntaxBreakdown: [
        {
          title: 'The 4 Access Modifier Matrix',
          description: 'From most restrictive to least restrictive: private -> default (package-private) -> protected -> public.',
          codeSnippet: `public class AccessDemo {
    private int classOnly = 1;     // Accessible only within AccessDemo
    int packageOnly = 2;          // Accessible within same package
    protected int inheritance = 3; // Accessible within package & subclasses
    public int globalAccess = 4;   // Accessible anywhere in project
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Returning direct references to mutable internal objects from getters',
          explanation: 'Returning a mutable object reference (like a `Date` or `ArrayList`) lets external callers mutate your private state without calling your methods!',
          badSnippet: `public class Team {
    private List<String> members = new ArrayList<>();
    public List<String> getMembers() {
        return this.members; // LEAKS MUTABLE STATE! Caller can do team.getMembers().clear();
    }
}`,
          goodSnippet: `public class Team {
    private List<String> members = new ArrayList<>();
    public List<String> getMembers() {
        return List.copyOf(this.members); // Returns unmodifiable defensive copy!
    }
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Method calls invoking getters/setters push small frames. When inlined by C2 JIT, the method boundary disappears completely, incurring 0 runtime overhead.',
        heapAllocation: 'Access modifiers do not alter the physical heap memory layout of fields; all declared fields are laid out in the object memory footprint.',
        metaspaceRole: 'Access flags (`ACC_PRIVATE`, `ACC_PUBLIC`, etc.) are encoded in the class file Method and Field attribute tables in Metaspace.',
        gcLifecycle: 'Defensively copied objects returned by getters are short-lived Eden allocations that vanish during Minor GC.'
      },
      bytecodeInsights: [
        { opcode: 'getfield #12', explanation: 'Reads value from private instance field; JVM verifier confirms calling class has permission.' },
        { opcode: 'putfield #14', explanation: 'Writes value to private instance field after validation checks succeed.' }
      ],
      engineeringConsiderations: [
        'Module System (Project Jigsaw): In Java 9+, strong encapsulation prevents even reflection (`setAccessible(true)`) across un-exported module packages.',
        'JIT Inlining: Writing getters/setters does not degrade performance because HotSpot inlines trivial accessors into direct field reads.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Design for immutability: if an object state never changes after construction, encapsulation is guaranteed forever.',
        'Use `Collections.unmodifiableList` or `List.copyOf` for collection encapsulation.',
        'Avoid blind getter/setter generation: only provide mutators that represent true domain actions (`approveOrder()` instead of `setStatus("APPROVED")`).'
      ],
      modernSnippet: `// Modern Java 21 encapsulated domain entity
public class SecureVault {
    private final String secretKey;
    private int failedAttempts = 0;

    public SecureVault(String secretKey) {
        if (secretKey == null || secretKey.length() < 8) {
            throw new IllegalArgumentException("Weak secret key");
        }
        this.secretKey = secretKey;
    }

    public boolean unlock(String attempt) {
        if (failedAttempts >= 3) return false;
        boolean matched = this.secretKey.equals(attempt);
        if (!matched) failedAttempts++;
        return matched;
    }
}`,
      modernExplanation: 'Encapsulating behavior inside the domain model ensures security invariants (locking out after 3 failed attempts) cannot be bypassed.'
    },
    playgroundCode: `public class EncapsulationDemo {
    static class Account {
        private double balance;

        public Account(double initial) {
            if (initial >= 0) this.balance = initial;
        }

        public void deposit(double amount) {
            if (amount > 0) this.balance += amount;
        }

        public double getBalance() {
            return this.balance;
        }
    }

    public static void main(String[] args) {
        Account acc = new Account(100.0);
        acc.deposit(50.0);
        System.out.println("Balance: " + acc.getBalance());
    }
}`
  },

  relationships: {
    id: 'relationships',
    stepNumber: 6,
    category: 'Relationships',
    title: 'Object Relationships',
    subtitle: 'Association, Aggregation, Composition, and Dependency in UML and Java memory',
    readingTime: '9 min read',
    prerequisites: ['Classes & Objects', 'Encapsulation'],
    targetSkills: ['UML relationship mapping', 'Composition vs Aggregation', 'Lifecycle coupling analysis'],
    basic: {
      overview: 'Real-world software is composed of networks of collaborating objects. Object-oriented design models these interactions through 4 distinct relationship types: Association (peer connection), Aggregation (weak has-a), Composition (strong owns-a), and Dependency (temporary uses-a).',
      realWorldAnalogy: {
        headline: 'Car, Engine, and Fuel Station',
        description: 'A Car HAS AN Engine through Composition: if the Car is destroyed in a crusher, the Engine is crushed with it. A Car HAS A Driver through Aggregation: the Driver can step out of the car and walk away independently. A Car USES A Fuel Pump through Dependency: it only interacts during the fillTank() method.'
      },
      whyItMatters: [
        'Avoid tight coupling: choosing aggregation over inheritance makes software resilient to requirement changes.',
        'Manage memory leaks: understanding object lifecycle ownership prevents retaining large object graphs in memory.',
        'Translate UML class diagrams into clean, maintainable production Java architecture.'
      ],
      coreRules: [
        'Association: "Knows-a" (e.g. Student enrolled in Course; both exist independently).',
        'Aggregation: "Has-a" with independent lifecycles (e.g. Department has Professors; deleting department does not delete professors).',
        'Composition: "Part-of" with bound lifecycles (e.g. Order owns OrderItems; deleting Order destroys OrderItems).',
        'Dependency: "Uses-a" via method parameter or local variable scope.'
      ],
      starterSnippet: `public class RelationshipsDemo {
    // 1. Composition: Engine lifecycle is bound to Car
    static class Engine { void run() {} }
    static class Car {
        private final Engine engine = new Engine(); // Strong ownership
    }

    // 2. Aggregation: Professor exists independently of Department
    static class Professor { String name; }
    static class Department {
        private List<Professor> faculty; // Non-owning reference list
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'In Java memory, both Aggregation and Composition are implemented using heap reference pointers. The difference is NOT syntax, but semantics and ownership: in Composition, the parent creates, manages, and does not leak the child reference.',
      syntaxBreakdown: [
        {
          title: 'Composition: Complete Lifecycle Ownership',
          description: 'The parent class instantiates the child in its constructor and prevents outside references from holding the child directly.',
          codeSnippet: `public class Invoice {
    private final List<LineItem> items = new ArrayList<>();

    public void addItem(String product, double price) {
        // Child object is created and owned solely by the Invoice
        items.add(new LineItem(product, price));
    }
}`
        },
        {
          title: 'Dependency: Temporary Method-Scoped Usage',
          description: 'A class does not store a field reference; it merely accepts an object as a method argument.',
          codeSnippet: `public class ReportPrinter {
    // Dependency: Uses Invoice temporarily; does not retain it
    public void print(Invoice invoice) {
        System.out.println("Printing invoice: " + invoice);
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Using Inheritance when Composition is appropriate ("Favor composition over inheritance")',
          explanation: 'Extending a class binds you permanently to its implementation details. Composition lets you swap internal components cleanly.',
          badSnippet: `// BAD: Stack is NOT a Vector; this exposes vector.add(index, val)!
public class MyStack extends Vector { ... }`,
          goodSnippet: `// GOOD: Stack HAS A Vector internally; exposes only push/pop
public class MyStack {
    private final List<Object> list = new ArrayList<>();
    public void push(Object o) { list.add(o); }
    public Object pop() { return list.remove(list.size() - 1); }
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Method parameters in Dependency relationships push reference pointers into the stack frame and pop upon method exit, leaving 0 lingering references.',
        heapAllocation: 'In Composition, the parent object holds a 4-byte/8-byte reference pointer to the child object in Eden space. The garbage collector traces from Parent -> Child.',
        metaspaceRole: 'Type references between collaborating classes are resolved and linked in Metaspace constant pools.',
        gcLifecycle: 'In Composition, once the parent becomes unreachable, all child instances uniquely owned by the parent also lose their GC root path and are collected together.'
      },
      bytecodeInsights: [
        { opcode: 'putfield #4', explanation: 'Stores child object reference into the parent composition field.' },
        { opcode: 'invokevirtual #9', explanation: 'Delegates business logic to the composited child instance.' }
      ],
      engineeringConsiderations: [
        'Circular References: Two objects referencing each other in an Aggregation relationship are easily collected by HotSpot tracing GC (unlike reference counting systems) as long as the whole cycle is disconnected from GC roots.',
        'Memory Footprint: Deep composition graphs increase object header overhead; consider flat value structures or records where appropriate.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Favor Composition over Inheritance (Item 18, Effective Java).',
        'Use Dependency Injection (e.g. passing collaborating services via constructor) to decouple components.',
        'Model Composite data structures using Java 21 sealed hierarchies and records.'
      ],
      modernSnippet: `// Modern Java 21 Composition with Records
public record Address(String street, String city, String zip) {}
public record Customer(String id, String name, Address address) { // Composition
    public Customer {
        Objects.requireNonNull(address, "Address is required");
    }
}`,
      modernExplanation: 'Java 21 records provide an elegant, immutable syntax for modeling strict composition with zero boilerplate.'
    },
    playgroundCode: `public class CompositionDemo {
    static class Engine {
        void ignite() { System.out.println("V8 Engine running!"); }
    }

    static class Vehicle {
        private final Engine engine = new Engine(); // Composition
        void start() {
            engine.ignite();
        }
    }

    public static void main(String[] args) {
        Vehicle v = new Vehicle();
        v.start();
    }
}`
  },

  inheritance: {
    id: 'inheritance',
    stepNumber: 7,
    category: 'Core OOP',
    title: 'Inheritance & `super`',
    subtitle: 'Class hierarchies, constructor delegation via super(), and method overriding',
    readingTime: '9 min read',
    prerequisites: ['Classes & Objects', 'Constructors & this'],
    targetSkills: ['Class hierarchy design', 'super() constructor chaining', 'Method overriding vs overloading'],
    basic: {
      overview: 'Inheritance allows a child class (subclass) to inherit state fields and behavior methods from a parent class (superclass) using the `extends` keyword. It facilitates code reuse and forms the foundation for polymorphic substitution.',
      realWorldAnalogy: {
        headline: 'Biological DNA & Vehicle Specialization',
        description: 'A biological child inherits traits from parents (eye color, blood group), but develops their own unique skills. Similarly, an ElectricCar IS-A Car: it inherits steering wheels and headlights, but replaces the combustion engine with a battery pack.'
      },
      whyItMatters: [
        'Code Reuse: Avoid duplicating shared logic (like `id`, `createdAt`, `auditLog`) across dozens of domain entities.',
        'Polymorphic Architecture: Code against a shared supertype (`Employee`) rather than individual subclasses (`Engineer`, `Manager`).',
        'Specialization: Subclasses can override parent methods to provide customized behavior.'
      ],
      coreRules: [
        'Java supports SINGLE class inheritance only (`extends BaseClass`). Multiple inheritance of classes is prohibited.',
        'The subclass constructor MUST call `super(...)` on the very first line (explicitly or implicitly via compiler).',
        'Every class in Java ultimately inherits from `java.lang.Object`.',
        'Methods marked `final` cannot be overridden; classes marked `final` cannot be extended.'
      ],
      starterSnippet: `public class InheritanceBasics {
    static class Person {
        String name;
        Person(String name) { this.name = name; }
        void introduce() { System.out.println("I am " + name); }
    }

    static class Employee extends Person {
        String department;
        Employee(String name, String dept) {
            super(name); // Must be first line!
            this.department = dept;
        }
        @Override
        void introduce() {
            System.out.println("I am " + name + " from " + department);
        }
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'When a subclass instance is instantiated, the JVM allocates a single contiguous memory block on the Heap that contains ALL fields of the superclass plus ALL fields of the subclass. Superclass fields are initialized first by `<init>` before the subclass constructor executes.',
      syntaxBreakdown: [
        {
          title: 'The `@Override` Annotation',
          description: 'Always use `@Override` when overriding parent methods. It instructs javac to verify at compile time that a matching parent method actually exists.',
          codeSnippet: `class Animal { void makeSound() {} }
class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow"); } // Safe!
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Forgetting that parent no-arg constructor is required if `super(...)` is omitted',
          explanation: 'If a parent class only has parameterized constructors, the subclass must explicitly call `super(...)` with arguments.',
          badSnippet: `class Base {
    Base(int x) {} // No default constructor!
}
class Derived extends Base {
    Derived() {} // COMPILE ERROR! Cannot find Base() constructor
}`,
          goodSnippet: `class Base {
    Base(int x) {}
}
class Derived extends Base {
    Derived() { super(100); } // Explicit call resolves the error!
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Variable references can be typed as the Superclass (`Person p = new Employee(...)`), placing a 64-bit reference on the stack frame.',
        heapAllocation: 'The heap memory contains: [Object Header (12B)] + [Person.name ref (4B)] + [Employee.department ref (4B)] + [padding] = contiguous single object.',
        metaspaceRole: 'Metaspace maintains the class hierarchy tree and copies superclass method references into the subclass Virtual Method Table (vtable).',
        gcLifecycle: 'Superclass and subclass state live in a single unified heap object; there are no separate parent/child allocations to collect.'
      },
      bytecodeInsights: [
        { opcode: 'invokespecial #3', explanation: 'Calls `super.<init>()` to execute parent constructor logic directly without dynamic dispatch.' },
        { opcode: 'invokevirtual #8', explanation: 'Dispatches method call using vtable, resolving the overridden subclass version at runtime.' }
      ],
      engineeringConsiderations: [
        'Fragile Base Class Problem: Modifying superclass internal methods can inadvertently break subclass invariants across large codebases.',
        'Deep Hierarchies: Avoid hierarchies deeper than 2-3 levels; deep trees increase cognitive load and complicate unit testing.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Make classes `final` by default unless explicitly designed for inheritance.',
        'Use modern Java 21 `sealed` classes to explicitly declare and restrict allowed subclasses.',
        'Prefer composition and interfaces over concrete class inheritance.'
      ],
      modernSnippet: `// Modern Java 21 Controlled Inheritance with Sealed Classes
public sealed class Shape permits Circle, Rectangle {
    private final String color;
    public Shape(String color) { this.color = color; }
    public String getColor() { return color; }
}

public final class Circle extends Shape {
    private final double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
}`,
      modernExplanation: 'Java 21 sealed classes prevent arbitrary external inheritance while allowing safe, controlled specialization.'
    },
    playgroundCode: `public class InheritanceDemo {
    static class Animal {
        String name;
        Animal(String name) { this.name = name; }
        void speak() { System.out.println("Some sound"); }
    }

    static class Dog extends Animal {
        Dog(String name) { super(name); }
        @Override
        void speak() { System.out.println(name + " barks!"); }
    }

    public static void main(String[] args) {
        Animal a = new Dog("Buddy");
        a.speak(); // Dynamic dispatch outputs "Buddy barks!"
    }
}`
  },

  polymorphism: {
    id: 'polymorphism',
    stepNumber: 8,
    category: 'Core OOP',
    title: 'Polymorphism & Dynamic Dispatch',
    subtitle: 'Virtual method table (vtable) resolution, late binding, and Liskov Substitution',
    readingTime: '9 min read',
    prerequisites: ['Inheritance & super', 'Classes & Objects'],
    targetSkills: ['Dynamic method dispatch', 'vtable lookup mechanics', 'Liskov Substitution Principle'],
    basic: {
      overview: 'Polymorphism ("many forms") is the ability of an object reference of a supertype to take on the behavior of whichever concrete subtype is instantiated at runtime. It decouples caller code from specific concrete implementations.',
      realWorldAnalogy: {
        headline: 'Universal TV Remote Control',
        description: 'A universal remote has a "Power" button. It sends the same command signal, but when aimed at a Sony TV, the Sony screen turns on; when aimed at an LG projector, the projector bulb ignites. The remote (caller) doesn\'t care which brand is in the room.'
      },
      whyItMatters: [
        'Open-Closed Principle: You can add new subclasses without modifying any existing caller code.',
        'Extensibility: Process collections of mixed types (`List<Shape>`) with a single clean loop.',
        'Eliminate messy `if/else` and `instanceof` cascades in business logic.'
      ],
      coreRules: [
        'Compile-time reference type determines WHICH method names can be called.',
        'Runtime actual object type determines WHICH method implementation executes.',
        'Dynamic dispatch applies to instance methods only; static methods and fields are resolved at compile-time.'
      ],
      starterSnippet: `public class PolymorphismBasics {
    interface PaymentMethod {
        void pay(double amount);
    }

    static class CreditCard implements PaymentMethod {
        public void pay(double amt) { System.out.println("Paid via Credit Card: $" + amt); }
    }

    static class PayPal implements PaymentMethod {
        public void pay(double amt) { System.out.println("Paid via PayPal: $" + amt); }
    }

    public static void main(String[] args) {
        PaymentMethod pm = new CreditCard();
        pm.pay(99.0); // Dispatches to CreditCard.pay()

        pm = new PayPal();
        pm.pay(45.0); // Dispatches to PayPal.pay()
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'At compile time, `javac` emits the `invokevirtual` bytecode instruction pointing to the supertype method signature. At runtime, the JVM inspects the object header of the receiver instance, looks up its concrete class Virtual Method Table (vtable) in Metaspace, and executes the exact subclass method pointer.',
      syntaxBreakdown: [
        {
          title: 'Upcasting vs Downcasting',
          description: 'Upcasting (Subtype -> Supertype) is implicit and always safe. Downcasting (Supertype -> Subtype) requires explicit casting and can throw `ClassCastException`.',
          codeSnippet: `Animal a = new Dog(); // Upcasting: Implicit & 100% safe
Dog d = (Dog) a;      // Downcasting: Requires explicit cast`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Expecting static methods or fields to be polymorphically overridden',
          explanation: 'Static methods and fields are bound at compile time based on the reference type, NOT the runtime instance type.',
          badSnippet: `class Parent { static void log() { System.out.println("Parent"); } }
class Child extends Parent { static void log() { System.out.println("Child"); } }

Parent p = new Child();
p.log(); // PRINTS "Parent"! Static methods do not use dynamic dispatch.`,
          goodSnippet: `// Use instance methods for true polymorphic behavior!
class Parent { void log() { System.out.println("Parent"); } }
class Child extends Parent { @Override void log() { System.out.println("Child"); } }`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'The stack frame holds a reference pointer to the base interface/class type.',
        heapAllocation: 'The object on the heap carries its 12-byte header. The Klass Word points to the Metaspace class representation containing the vtable.',
        metaspaceRole: 'The vtable is an array of memory pointers to executable method bytecodes. Subclass vtables overwrite inherited slots with overridden method addresses.',
        gcLifecycle: 'Polymorphic references obey standard reachability rules; GC traces references through the vtable type metadata.'
      },
      bytecodeInsights: [
        { opcode: 'invokevirtual #4', explanation: 'Dispatches non-interface public/protected virtual methods via vtable lookup.' },
        { opcode: 'invokeinterface #6', explanation: 'Dispatches interface methods via itable lookup (interface table).' }
      ],
      engineeringConsiderations: [
        'Monomorphic Call Sites: If the JIT compiler detects that a call site only ever encounters a single concrete class, it optimizes the call with direct inlining, bypassing the vtable entirely!',
        'Megamorphic Call Sites: If a call site encounters more than 2 distinct classes, it falls back to full vtable lookup, causing a minor branch prediction penalty.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Pair polymorphism with Java 21 Pattern Matching to deconstruct subtypes declaratively.',
        'Adhere strictly to the Liskov Substitution Principle (LSP): subtypes must never weaken parent invariants.',
        'Use composition and strategy pattern over complex deep inheritance trees.'
      ],
      modernSnippet: `// Java 21 Modern Polymorphic Processing
public sealed interface Notification permits Email, SMS {}
public record Email(String address, String body) implements Notification {}
public record SMS(String phoneNumber, String body) implements Notification {}

public static void send(Notification n) {
    switch (n) {
        case Email(var addr, var text) -> System.out.println("Emailing " + addr);
        case SMS(var phone, var text) -> System.out.println("SMS to " + phone);
    }
}`,
      modernExplanation: 'Java 21 combines polymorphism with pattern matching: you retain clean interface abstractions while cleanly pattern-matching on specific subtypes.'
    },
    playgroundCode: `public class PolymorphismDemo {
    interface Instrument {
        void play();
    }

    static class Piano implements Instrument {
        public void play() { System.out.println("Piano notes playing..."); }
    }

    static class Guitar implements Instrument {
        public void play() { System.out.println("Guitar strumming..."); }
    }

    public static void main(String[] args) {
        Instrument[] band = new Instrument[]{ new Piano(), new Guitar() };
        for (Instrument inst : band) {
            inst.play(); // Dynamic dispatch resolves both!
        }
    }
}`
  },

  interfaces: {
    id: 'interfaces',
    stepNumber: 9,
    category: 'Core OOP',
    title: 'Abstract Classes & Interfaces',
    subtitle: 'Pure contracts, default methods, static utility methods, and partial implementations',
    readingTime: '9 min read',
    prerequisites: ['Classes & Objects', 'Polymorphism & Dynamic Dispatch'],
    targetSkills: ['Interface design', 'Abstract class templates', 'Contract-based architecture'],
    basic: {
      overview: 'Interfaces define pure capability contracts: what a class can do, without mandating how it does it. Abstract classes represent partial blueprint implementations: sharing common state and logic while requiring subclasses to complete abstract methods.',
      realWorldAnalogy: {
        headline: 'Standard USB-C Port vs. Vehicle Chassis',
        description: 'An Interface is like a USB-C port: any device (phone, laptop, monitor, fan) can implement the USB-C standard regardless of what it is inside. An Abstract Class is like a generic car chassis: it has wheels, frame, and brakes built-in, but leaves the bodywork abstract for trucks vs sedans.'
      },
      whyItMatters: [
        'Multiple Implementation: A Java class can implement unlimited interfaces, avoiding the single-inheritance restriction.',
        'Loose Coupling: Code against interfaces (`List`, `Map`) rather than concrete types (`ArrayList`, `HashMap`).',
        'API Evolution: Default methods (Java 8+) allow adding new methods to interfaces without breaking existing implementations.'
      ],
      coreRules: [
        'An interface cannot hold instance state (fields are implicitly `public static final`).',
        'An abstract class can hold instance variables, constructors, and private methods.',
        'Neither interfaces nor abstract classes can be directly instantiated with `new`.',
        'Classes implement interfaces via `implements` and extend abstract classes via `extends`.'
      ],
      starterSnippet: `public class InterfaceBasics {
    // 1. Interface: Pure contract
    interface Drivable {
        void drive(); // Abstract method
        default void honk() { System.out.println("Beep!"); } // Default method
    }

    // 2. Abstract Class: Partial implementation
    abstract static class BaseVehicle implements Drivable {
        protected String vin;
        public BaseVehicle(String vin) { this.vin = vin; }
        public String getVin() { return vin; }
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'At the bytecode level, interface methods are invoked via `invokeinterface`, which searches an Interface Table (itable). Abstract class methods use `invokevirtual` with direct vtable index offsets, making abstract classes slightly faster at low-level execution.',
      syntaxBreakdown: [
        {
          title: 'Interface Default and Static Methods',
          description: 'Interfaces can supply default concrete implementations and utility static functions.',
          codeSnippet: `public interface MathOperation {
    double apply(double a, double b);

    // Static factory utility
    static MathOperation adder() {
        return (a, b) -> a + b;
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Using an abstract class when an interface is sufficient',
          explanation: 'Extending an abstract class consumes the single inheritance slot permanently. Use interfaces whenever you do not require shared mutable instance fields.',
          badSnippet: `// Locks subclasses out of extending anything else!
public abstract class Loggable {
    public abstract void log(String msg);
}`,
          goodSnippet: `// Clean interface leaves inheritance slot open!
public interface Loggable {
    void log(String msg);
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Variable references typed as interfaces hold 64-bit pointers to heap instances that implement the interface.',
        heapAllocation: 'Implementing an interface does not add fields to the heap instance; only fields from abstract classes are laid out in the heap memory.',
        metaspaceRole: 'Metaspace maintains the itable (Interface Method Table) mapping interface method IDs to concrete class bytecode pointers.',
        gcLifecycle: 'Objects typed as interfaces are collected identically to standard heap instances.'
      },
      bytecodeInsights: [
        { opcode: 'invokeinterface #2, 2', explanation: 'Dispatches method declared in interface using runtime itable resolution.' }
      ],
      engineeringConsiderations: [
        'itable Stub Inlining: HotSpot optimizes `invokeinterface` through inline caching; when megamorphic, itable lookup is slightly slower than vtable lookup.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Single Abstract Method (SAM) interfaces should be annotated with `@FunctionalInterface` for lambda compatibility.',
        'Use sealed interfaces to limit implementations to a known set of domain records.',
        'Keep interfaces narrow and focused (Interface Segregation Principle).'
      ],
      modernSnippet: `// Modern Java 21 Functional Interface & Lambda
@FunctionalInterface
public interface Validator<T> {
    boolean validate(T item);

    default Validator<T> and(Validator<T> other) {
        return item -> this.validate(item) && other.validate(item);
    }
}`,
      modernExplanation: 'Modern Java interfaces enable functional composition: combining simple contracts into sophisticated validation pipelines.'
    },
    playgroundCode: `public class InterfaceDemo {
    interface Shape {
        double area();
    }

    static class Circle implements Shape {
        private final double r;
        Circle(double r) { this.r = r; }
        public double area() { return Math.PI * r * r; }
    }

    public static void main(String[] args) {
        Shape s = new Circle(5.0);
        System.out.println("Area: " + s.area());
    }
}`
  },

  records: {
    id: 'records',
    stepNumber: 10,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Records & Immutability',
    subtitle: 'Compact transparent data carriers, canonical constructors, and memory efficiency',
    readingTime: '7 min read',
    prerequisites: ['Classes & Objects', 'Encapsulation'],
    targetSkills: ['Record declaration', 'Compact constructors', 'Immutable data modeling'],
    basic: {
      overview: 'Introduced in modern Java and fully refined in Java 21, Records are a specialized form of class designed purely as transparent carriers for immutable data. A single line of record code replaces 50+ lines of traditional JavaBean boilerplate.',
      realWorldAnalogy: {
        headline: 'Molded Ingot vs. Assembled Tool Box',
        description: 'A traditional class is like an assembled toolbox: you can open the latches, swap out tools, and rearrange compartments. A Record is like a solid gold ingot stamped with weight and serial number: once minted, it cannot be opened or altered without melting it down completely.'
      },
      whyItMatters: [
        'Eliminate Boilerplate: No more writing getters, `equals()`, `hashCode()`, or `toString()` manually.',
        'Thread Safety: Immutable by default; safe to share across concurrent threads without locks.',
        'Deconstruction: Seamlessly integrates with Java 21 record patterns and pattern matching switch.'
      ],
      coreRules: [
        'Declared with the `record` keyword.',
        'Components in the header automatically become `private final` fields.',
        'Generates public accessor methods matching component names (e.g. `point.x()`, not `getX()`).',
        'Records cannot extend other classes (they extend `java.lang.Record`), but can implement interfaces.'
      ],
      starterSnippet: `// One line replaces ~60 lines of traditional JavaBean code!
public record UserProfile(String id, String email, int age) {}

public class RecordBasics {
    public static void main(String[] args) {
        UserProfile user = new UserProfile("usr-1", "alice@example.com", 25);
        System.out.println(user.email()); // Accessor method
        System.out.println(user);         // Auto-generated toString()
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'At compile time, `javac` emits a class that extends `java.lang.Record` and is marked `final`. All components become final instance fields. In addition, the compiler synthesizes `equals()` using field-by-field value comparison, `hashCode()` using MurmurHash algorithms, and component accessor methods.',
      syntaxBreakdown: [
        {
          title: 'Compact Constructor Validation',
          description: 'Compact constructors omit the parameter list and field assignments, letting you focus purely on validation logic.',
          codeSnippet: `public record BankAccountRecord(String accountId, double balance) {
    public BankAccountRecord {
        if (balance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        // No this.balance = balance needed; compiler handles it!
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Putting mutable objects inside a Record',
          explanation: 'A Record is only shallowly immutable! If a record component is a mutable `List`, external callers can mutate the list contents.',
          badSnippet: `public record Order(List<String> items) {} // Caller can do order.items().clear();!`,
          goodSnippet: `public record Order(List<String> items) {
    public Order {
        items = List.copyOf(items); // Enforces deep immutability!
    }
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Record references are standard 64-bit stack pointers.',
        heapAllocation: 'Laid out contiguously on Eden space without padding waste; fields are final and contiguous.',
        metaspaceRole: 'Metaspace class file contains the `Record` attribute detailing component types and names.',
        gcLifecycle: 'Subject to aggressive JIT escape analysis: HotSpot can scalar-replace local record instances onto stack registers.'
      },
      bytecodeInsights: [
        { opcode: 'invokevirtual #11', explanation: 'Calls synthetic hashCode() or equals() generated via invokedynamic in Record support.' }
      ],
      engineeringConsiderations: [
        'Serialization: Records serialize via canonical constructors, completely eliminating deserialization security vulnerabilities common in standard Serializable classes.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Use Records for DTOs, API responses, configuration values, and Map keys.',
        'Leverage Record Patterns in Java 21 to deconstruct fields directly in switch cases.',
        'Keep records focused purely on data; avoid embedding complex business orchestration.'
      ],
      modernSnippet: `// Java 21 Record Pattern Deconstruction
public static void process(Object obj) {
    if (obj instanceof UserProfile(String id, String email, int age)) {
        System.out.println("Matched user: " + email + " aged " + age);
    }
}`,
      modernExplanation: 'Java 21 record patterns allow extracting fields directly into typed local variables in a single step.'
    },
    playgroundCode: `public class RecordDemo {
    public record Point(int x, int y) {
        public Point {
            if (x < 0 || y < 0) throw new IllegalArgumentException("Coords must be positive");
        }
    }

    public static void main(String[] args) {
        Point p = new Point(10, 20);
        System.out.println("Point: " + p);
        System.out.println("X coord: " + p.x());
    }
}`
  },

  sealed: {
    id: 'sealed',
    stepNumber: 11,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Sealed Classes & Interfaces',
    subtitle: 'Exhaustive algebraic data types, permitted subclassing, and domain hierarchy control',
    readingTime: '8 min read',
    prerequisites: ['Inheritance & super', 'Abstract Classes & Interfaces'],
    targetSkills: ['Sealed type design', 'Permitted subclasses', 'Exhaustive type hierarchies'],
    basic: {
      overview: 'Before Java 17, inheritance was all-or-nothing: a class was either open to extension by anyone, or locked with `final`. Sealed classes introduce a precise middle ground: a superclass can explicitly declare which exact classes are permitted to extend it.',
      realWorldAnalogy: {
        headline: 'Exclusive VIP Guest List',
        description: 'A nightclub bouncer has a clipboard with exactly three permitted names: Alice, Bob, and Charlie. Anyone else trying to enter is rejected at the door. Sealed classes give developers that exact clipboard for class hierarchies.'
      },
      whyItMatters: [
        'Domain Modeling: Model closed mathematical and business domains (e.g. TrafficLight can only be Red, Yellow, or Green).',
        'Exhaustive Pattern Matching: The compiler can verify that all possible subclasses are handled, eliminating the need for `default` switch cases.',
        'API Security: Prevent third-party libraries from extending your sensitive core framework classes.'
      ],
      coreRules: [
        'Declared with the `sealed` keyword and `permits` clause: `public sealed class A permits B, C {}`.',
        'Every permitted subclass MUST explicitly declare its own extension policy: `final`, `sealed`, or `non-sealed`.',
        'All permitted subclasses must belong to the same package (or module).',
        'Works for both classes (`sealed class`) and interfaces (`sealed interface`).'
      ],
      starterSnippet: `// Sealed hierarchy modeling an API response
public sealed interface ApiResponse permits Success, ErrorResponse {}

public final class Success implements ApiResponse {
    private final String payload;
    public Success(String payload) { this.payload = payload; }
}

public final class ErrorResponse implements ApiResponse {
    private final int statusCode;
    public ErrorResponse(int code) { this.statusCode = code; }
}`
    },
    intermediate: {
      conceptualMechanics: 'At compile time, `javac` writes a `PermittedSubclasses` attribute into the class file in Metaspace. During class loading, the JVM verifies that any class claiming to extend the sealed class is present in that attribute list.',
      syntaxBreakdown: [
        {
          title: 'The 3 Subclass Modifiers',
          description: 'Every permitted subclass must choose one of three paths: final (no further extension), sealed (sub-hierarchy continues), or non-sealed (opens up to anyone).',
          codeSnippet: `sealed class Vehicle permits Car, Truck, Bike {}
final class Car extends Vehicle {}        // Closed
sealed class Truck extends Vehicle permits SemiTruck {} // Continues sealed
non-sealed class Bike extends Vehicle {}  // Anyone can extend Bike!`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Omitting permits modifier on a subclass',
          explanation: 'Subclasses of sealed classes must explicitly declare final, sealed, or non-sealed.',
          badSnippet: `class Car extends Vehicle {} // COMPILE ERROR! Missing modifier`,
          goodSnippet: `final class Car extends Vehicle {} // Valid!`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Reference variables typed as the sealed parent hold 64-bit pointers on the stack.',
        heapAllocation: 'Standard heap instance layout with object header and fields.',
        metaspaceRole: 'Metaspace enforces the `PermittedSubclasses` bytecode attribute during ClassLoader link phase.',
        gcLifecycle: 'Standard GC reachability rules apply.'
      },
      bytecodeInsights: [
        { opcode: 'PermittedSubclasses attribute', explanation: 'Class file attribute listing constant pool indices of authorized subclasses.' }
      ],
      engineeringConsiderations: [
        'Algebraic Data Types (ADTs): Sealed types combined with records deliver true ADTs (sum types + product types) to Java, rivaling Rust and Scala.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Combine sealed interfaces with records for domain event architectures.',
        'Use sealed hierarchies with pattern-matching switch to guarantee compile-time exhaustiveness.',
        'Keep permitted implementations in the same file to omit the `permits` clause (compiler infers them!).'
      ],
      modernSnippet: `// Java 21 Algebraic Data Type with Inferred Permits
public sealed interface OrderStatus {
    record Placed(long timestamp) implements OrderStatus {}
    record Shipped(String trackingNumber) implements OrderStatus {}
    record Delivered(String signedBy) implements OrderStatus {}
}`,
      modernExplanation: 'Permitted records defined within the same file omit the permits keyword, delivering ultra-concise domain definitions.'
    },
    playgroundCode: `public class SealedDemo {
    public sealed interface Result permits Success, Failure {}
    public record Success(String data) implements Result {}
    public record Failure(int code) implements Result {}

    public static void main(String[] args) {
        Result r = new Success("Operation completed!");
        System.out.println("Result: " + r);
    }
}`
  },

  'pattern-matching': {
    id: 'pattern-matching',
    stepNumber: 12,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Pattern Matching',
    subtitle: 'Pattern matching for switch, record deconstruction patterns, and guarded when clauses',
    readingTime: '9 min read',
    prerequisites: ['Modern Java 21: Records & Immutability', 'Modern Java 21: Sealed Classes & Interfaces'],
    targetSkills: ['Pattern matching switch', 'Record deconstruction', 'Guarded pattern clauses with when'],
    basic: {
      overview: 'Pattern Matching fundamentally modernizes data inspection and extraction in Java 21. Instead of repetitive `instanceof` checks followed by manual casting, pattern matching tests for a type, extracts its components, and binds them to local variables in a single declarative expression.',
      realWorldAnalogy: {
        headline: 'Automated Coin Sorter Machine',
        description: 'Instead of manually inspecting each coin with a magnifying glass, checking its diameter, and writing down "Dime", you drop mixed change into a sorter tray. It automatically routes quarters into the quarter slot, dimes into the dime slot, and counts their values simultaneously.'
      },
      whyItMatters: [
        'Eliminate Boilerplate: Goodbye `if (obj instanceof String) { String s = (String) obj; ... }`.',
        'Exhaustive Switch: The compiler verifies all sealed hierarchy branches are handled with 0 runtime surprise exceptions.',
        'Null Safety: Java 21 pattern-matching switch handles `case null` gracefully without NullPointerExceptions.'
      ],
      coreRules: [
        'Type patterns bind matching objects to local variables: `obj instanceof String s`.',
        'Record patterns deconstruct components directly: `case Point(int x, int y)`.',
        'Guarded patterns use `when` to apply boolean conditions to extracted variables: `case String s when s.length() > 5`.',
        'Exhaustive switch on sealed types requires NO `default` fallback.'
      ],
      starterSnippet: `public class PatternMatchingBasics {
    public static void printDetails(Object obj) {
        // Java 21 Pattern Matching for switch with null handling
        String result = switch (obj) {
            case null -> "Null value received";
            case Integer i -> "Integer number: " + i;
            case String s when !s.isBlank() -> "Non-empty string: " + s;
            case String s -> "Empty string";
            default -> "Unknown object: " + obj;
        };
        System.out.println(result);
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'Under the hood, Java compiles pattern-matching switch statements into `invokedynamic` bootstrap methods using `typeSwitch` bootstrap logic. It evaluates type checks efficiently and binds extracted components directly onto the stack without creating temporary wrapper objects.',
      syntaxBreakdown: [
        {
          title: 'Record Deconstruction Patterns',
          description: 'Extract components of nested records directly inside the case pattern.',
          codeSnippet: `record Point(int x, int y) {}
record Circle(Point center, int radius) {}

public static void inspect(Circle c) {
    if (c instanceof Circle(Point(int x, int y), int r)) {
        System.out.println("Circle at (" + x + "," + y + ") with radius " + r);
    }
}`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Putting an unguarded general case before a guarded specific case',
          explanation: 'Cases are evaluated in top-down order. An unguarded `case String s` will swallow all strings, rendering any following `case String s when ...` unreachable.',
          badSnippet: `switch (obj) {
    case String s -> ...       // SWALLOWS ALL STRINGS!
    case String s when s.length() > 5 -> ... // COMPILE ERROR! Unreachable!
}`,
          goodSnippet: `switch (obj) {
    case String s when s.length() > 5 -> ... // Specific first
    case String s -> ...                     // General fallback
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Extracted pattern variables are allocated directly into local variable array slots in the current stack frame, requiring 0 heap allocations.',
        heapAllocation: 'Deconstructed records are not duplicated on the heap; reference types point to existing heap components.',
        metaspaceRole: 'Type check targets are linked through invokedynamic bootstrap call sites in Metaspace.',
        gcLifecycle: 'Extracted variables cease to exist as soon as the switch block completes.'
      },
      bytecodeInsights: [
        { opcode: 'invokedynamic #7', explanation: 'Calls SwitchBootstraps.typeSwitch bootstrap method for pattern classification.' },
        { opcode: 'checkcast #12', explanation: 'Ensures type safety before local slot binding.' }
      ],
      engineeringConsiderations: [
        'Performance: Pattern matching switch generates jump tables that outperform chained if-else statements by up to 3x on large polymorphic hierarchies.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Always favor pattern matching switch over multi-level if-else chains.',
        'Use `case null` explicitly in switch blocks when null input is a valid domain case.',
        'Combine sealed interfaces with record deconstruction for comprehensive domain models.'
      ],
      modernSnippet: `// Modern Java 21 Algebraic Calculation
public sealed interface Expr permits Num, Add, Mul {}
public record Num(int val) implements Expr {}
public record Add(Expr left, Expr right) implements Expr {}
public record Mul(Expr left, Expr right) implements Expr {}

public static int eval(Expr e) {
    return switch (e) {
        case Num(var v) -> v;
        case Add(var l, var r) -> eval(l) + eval(r);
        case Mul(var l, var r) -> eval(l) * eval(r);
    };
}`,
      modernExplanation: 'Recursive expression evaluators can be written in a handful of lines with 100% compile-time exhaustiveness verification.'
    },
    playgroundCode: `public class PatternMatchingDemo {
    public sealed interface Shape permits Circle, Rect {}
    public record Circle(double r) implements Shape {}
    public record Rect(double w, double h) implements Shape {}

    public static double area(Shape s) {
        return switch (s) {
            case Circle(var r) -> Math.PI * r * r;
            case Rect(var w, var h) -> w * h;
        };
    }

    public static void main(String[] args) {
        Shape s = new Circle(3.0);
        System.out.println("Area: " + area(s));
    }
}`
  },

  'nested-classes': {
    id: 'nested-classes',
    stepNumber: 13,
    category: 'Advanced',
    title: 'Nested & Inner Classes',
    subtitle: 'Static nested classes, inner classes with synthetic this$0, local classes, and anonymous classes',
    readingTime: '8 min read',
    prerequisites: ['Classes & Objects', 'Encapsulation'],
    targetSkills: ['Static nested vs Inner classes', 'Synthetic this$0 memory leaks', 'Local class scoping'],
    basic: {
      overview: 'Java allows defining a class inside another class. When a nested class is marked `static`, it is an independent class logically grouped with the outer class. When not marked `static`, it is an Inner Class that retains a hidden reference to its enclosing outer instance.',
      realWorldAnalogy: {
        headline: 'Hotel Room vs. Building Architect Office',
        description: 'An Inner Class is like an individual Hotel Room: it cannot exist without the Hotel building standing around it, and it shares the hotel electricity. A Static Nested Class is like an Architect Office in the hotel lobby: it shares the building address, but operates completely independently.'
      },
      whyItMatters: [
        'Logical Grouping: Group helper classes (like `Map.Entry` or `Node`) solely within the class that uses them.',
        'Encapsulation: Inner classes can access private fields of their enclosing class.',
        'Prevent Memory Leaks: Non-static inner classes keep outer instances alive in memory unintentionally!'
      ],
      coreRules: [
        '`static class Nested`: Does NOT hold a reference to outer instance; cannot access outer non-static fields.',
        '`class Inner`: Holds an implicit reference `this$0` to outer instance; can access outer private fields.',
        'Local classes defined inside methods capture `effectively final` method variables.',
        'Prefer `static nested classes` unless access to outer instance state is strictly required.'
      ],
      starterSnippet: `public class OuterClass {
    private String secret = "JVM_STATE";

    // 1. Static Nested Class (Independent)
    public static class StaticHelper {
        void run() { System.out.println("Independent helper"); }
    }

    // 2. Non-static Inner Class (Bound to Outer instance)
    public class InnerWorker {
        void reveal() {
            System.out.println("Accessing outer private: " + secret);
        }
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'At compile time, `javac` creates separate class files for nested classes using the `$` delimiter (e.g. `Outer$Inner.class`). For non-static inner classes, the compiler adds a synthetic constructor parameter and a private final field `final Outer this$0;` to store the parent instance reference.',
      syntaxBreakdown: [
        {
          title: 'Instantiating Inner Classes',
          description: 'Non-static inner classes require an existing instance of the outer class to be instantiated.',
          codeSnippet: `OuterClass outer = new OuterClass();
OuterClass.InnerWorker worker = outer.new InnerWorker(); // Special syntax!
worker.reveal();`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Using a non-static inner class for long-lived tasks or listeners causing memory leaks',
          explanation: 'Because an inner class carries a hidden `this$0` reference, keeping an inner class instance in a cache prevents the large outer class from being garbage collected!',
          badSnippet: `// BAD: Retains hidden reference to massive Window object!
class Window {
    byte[] bigBuffer = new byte[10_000_000];
    class MyListener implements Runnable { public void run() {} }
}`,
          goodSnippet: `// GOOD: Static nested class has no this$0 pointer!
class Window {
    static class MyListener implements Runnable { public void run() {} }
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'Inner class method calls push standard frames with `this` referencing the inner object.',
        heapAllocation: 'Inner class objects on the heap have an extra 4-byte/8-byte field: `this$0` pointing to the outer heap instance.',
        metaspaceRole: 'Compiled as separate `.class` metadata entries in Metaspace linked via InnerClasses attribute.',
        gcLifecycle: 'As long as an inner class is reachable, the enclosing outer class CANNOT be garbage collected, even if all direct outer references are null!'
      },
      bytecodeInsights: [
        { opcode: 'getfield #2 (this$0)', explanation: 'Accesses synthetic pointer to the outer instance.' },
        { opcode: 'invokevirtual #7', explanation: 'Calls synthetic accessor method generated to bypass private access limits across classes.' }
      ],
      engineeringConsiderations: [
        'Effective Java Item 24: "Favor static member classes over non-static".'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Local records can be declared inside methods in Java 21 as static-by-default data holders.',
        'Use lambdas and method references instead of anonymous inner classes for single-method interfaces.',
        'Keep nested classes private unless designed for public consumption.'
      ],
      modernSnippet: `// Modern Java 21 Local Record in Method Scope
public void processTransaction(List<Double> amounts) {
    // Local record: clean, immutable, and strictly scoped!
    record Summary(double sum, double avg) {}

    double sum = amounts.stream().mapToDouble(Double::doubleValue).sum();
    Summary s = new Summary(sum, sum / amounts.size());
    System.out.println("Processed: " + s);
}`,
      modernExplanation: 'Java 21 allows local records inside methods, providing scoped immutable data structures with zero outer-reference leak risks.'
    },
    playgroundCode: `public class NestedDemo {
    static class StaticNested {
        void log() { System.out.println("Static nested class"); }
    }

    public static void main(String[] args) {
        StaticNested sn = new StaticNested();
        sn.log();
    }
}`
  },

  exceptions: {
    id: 'exceptions',
    stepNumber: 14,
    category: 'Advanced',
    title: 'Exception Handling & Stack Unwinding',
    subtitle: 'Checked vs unchecked exceptions, Exception Table handlers, and try-with-resources',
    readingTime: '9 min read',
    prerequisites: ['Methods & Call Stack', 'Classes & Objects'],
    targetSkills: ['Exception Table bytecode mechanics', 'Stack unwinding', 'try-with-resources resource management'],
    basic: {
      overview: 'Exceptions are first-class JVM objects that represent anomalous conditions or errors encountered during program execution. When an exception is thrown, normal control flow halts immediately, and the JVM unwinds the Call Stack looking for an enclosing `try/catch` handler.',
      realWorldAnalogy: {
        headline: 'Fire Alarm & Emergency Evacuation Protocol',
        description: 'When a fire alarm sounds in a high-rise office building, normal work stops instantly. Workers evacuate down the stairwell floor by floor (Stack Unwinding) until they reach a designated assembly zone (Catch Block). If no safety zone catches them, they spill into the street and the building shuts down (Uncaught Exception crash).'
      },
      whyItMatters: [
        'Resilience: Separate error-handling logic from happy-path business logic.',
        'Resource Safety: Prevent database connection leaks and unclosed file handles using `try-with-resources`.',
        'Stack Tracing: Pinpoint the exact line number, method, and thread of any failure in production.'
      ],
      coreRules: [
        'All exceptions inherit from `java.lang.Throwable`.',
        '`Checked Exceptions` (subclasses of `Exception` excluding `RuntimeException`) must be declared or caught.',
        '`Unchecked Exceptions` (subclasses of `RuntimeException`) represent programming bugs (NPE, IndexOutOfBounds).',
        '`Errors` (subclasses of `Error`) represent fatal JVM failures (OutOfMemoryError, StackOverflowError) and should not be caught.'
      ],
      starterSnippet: `public class ExceptionBasics {
    public static void validateAge(int age) {
        if (age < 0) {
            // Throwing unchecked exception
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException ex) {
            System.err.println("Caught error: " + ex.getMessage());
        }
    }
}`
    },
    intermediate: {
      conceptualMechanics: 'When a method contains a `try/catch` block, the Java compiler emits an Exception Table in the method bytecode attributes. Each entry specifies: `[from_bytecode_offset, to_bytecode_offset, target_handler_offset, exception_class_type]`. If an exception occurs, the JVM searches this table in linear order.',
      syntaxBreakdown: [
        {
          title: 'Try-with-Resources (Automatic Resource Management)',
          description: 'Any class implementing `java.lang.AutoCloseable` can be opened in a try block; the JVM automatically invokes `.close()` even if exceptions are thrown.',
          codeSnippet: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} // reader.close() is ALWAYS called automatically here!`
        }
      ],
      commonPitfalls: [
        {
          mistake: 'Empty catch blocks that swallow exceptions silently ("Pokemon exception handling")',
          explanation: 'Catching `Exception` and doing nothing hides critical failures, making bugs impossible to detect or diagnose.',
          badSnippet: `try {
    processPayment();
} catch (Exception e) {
    // EMPTY! Bugs will go unnoticed forever!
}`,
          goodSnippet: `try {
    processPayment();
} catch (PaymentFailedException e) {
    logger.error("Payment failed for user", e);
    throw new ServiceException("Payment processing failed", e); // Wrap with cause!
}`
        }
      ]
    },
    advanced: {
      jvmMemoryLayout: {
        stackAllocation: 'During stack unwinding, each Stack Frame without a matching handler is popped in succession. The thread operand stack is cleared before transferring execution to the catch handler offset.',
        heapAllocation: 'The exception object and its complete `StackTraceElement[]` array are allocated in Eden space.',
        metaspaceRole: 'Exception Table metadata is stored in the method code attribute in Metaspace.',
        gcLifecycle: 'Exception objects are standard heap allocations that are collected when references to them are discarded.'
      },
      bytecodeInsights: [
        { opcode: 'athrow', explanation: 'Pops exception reference from operand stack and initiates JVM stack unwinding search.' },
        { opcode: 'Exception Table', explanation: 'Defines bytecode instruction ranges protected by specific catch handlers.' }
      ],
      engineeringConsiderations: [
        'Cost of `fillInStackTrace()`: Allocating an exception is cheap; capturing the complete thread stack frames in `fillInStackTrace()` incurs the CPU cost. Avoid using exceptions for normal control flow.'
      ]
    },
    modernJava21: {
      bestPractices: [
        'Never catch `Throwable` or `Error`.',
        'Create domain-specific custom exceptions with helpful diagnostic context.',
        'Always preserve root causes when re-throwing (`new CustomException("msg", cause)`).'
      ],
      modernSnippet: `// Modern Java 21 Custom Domain Exception with Cause
public class OrderProcessingException extends RuntimeException {
    private final String orderId;

    public OrderProcessingException(String orderId, String message, Throwable cause) {
        super("Order " + orderId + " failed: " + message, cause);
        this.orderId = orderId;
    }

    public String getOrderId() { return orderId; }
}`,
      modernExplanation: 'Custom runtime exceptions capture domain metadata (order ID) while chaining root causes for complete observability in logging.'
    },
    playgroundCode: `public class ExceptionDemo {
    static class InsufficientFundsException extends Exception {
        public InsufficientFundsException(String msg) { super(msg); }
    }

    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Cannot withdraw " + amount + " with balance " + balance);
        }
    }

    public static void main(String[] args) {
        try {
            withdraw(100.0, 150.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}`
  }
};

