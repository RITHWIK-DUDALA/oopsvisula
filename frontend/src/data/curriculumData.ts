export interface CurriculumLesson {
  id: string;
  stepNumber: number;
  category: 'Foundations' | 'Core OOP' | 'Relationships' | 'Java 21 Modern' | 'Advanced';
  title: string;
  subtitle: string;
  jvmBehavior: string;
  theory: string[];
  keySyntax: string;
  sampleCode: string;
  exercisePrompt: string;
}

export const curriculumLessons: CurriculumLesson[] = [
  {
    id: 'vars',
    stepNumber: 1,
    category: 'Foundations',
    title: 'Variables & Data Types',
    subtitle: 'Primitive types vs Object references in JVM memory',
    jvmBehavior: 'Primitives (int, double, boolean) store raw values directly on the Stack frame. Object references store 64-bit addresses pointing to instances in Eden space.',
    theory: [
      'Java differentiates strictly between 8 primitive types and reference types.',
      'Primitives have fixed memory allocations and pass by value.',
      'Object references point to heap instances; copying a reference copies the pointer address, not the object itself.',
    ],
    keySyntax: 'int age = 21;\nString name = "Alice"; // Reference to String on heap',
    sampleCode: `public class PrimitiveVsReference {
    public static void main(String[] args) {
        int x = 42; // Stack allocation
        String text = new String("Hello Java 21"); // Heap allocation
    }
}`,
    exercisePrompt: 'Declare an integer balance and a reference to a BankAccount object.',
  },
  {
    id: 'methods',
    stepNumber: 2,
    category: 'Foundations',
    title: 'Methods & Call Stack',
    subtitle: 'Stack frame push/pop, parameter passing, return values',
    jvmBehavior: 'Every method invocation allocates an isolated Stack Frame containing an operand stack and local variable array. On return, the frame pops immediately.',
    theory: [
      'Java uses strictly pass-by-value for all parameters.',
      'For object arguments, the pointer address is passed by value.',
      'Recursive methods without base cases cause java.lang.StackOverflowError.',
    ],
    keySyntax: 'public int calculateArea(int width, int height) {\n    return width * height;\n}',
    sampleCode: `public class CallStackDemo {
    public static int multiply(int a, int b) {
        return a * b; // Frame pops here
    }
    public static void main(String[] args) {
        int result = multiply(6, 7); // Pushes multiply frame
    }
}`,
    exercisePrompt: 'Write a method deposit that takes a double amount and returns the updated balance.',
  },
  {
    id: 'classes',
    stepNumber: 3,
    category: 'Core OOP',
    title: 'Classes & Objects',
    subtitle: 'Class blueprints, heap object allocation, identity hashcodes',
    jvmBehavior: 'Class metadata is loaded into Metaspace. The `new` keyword triggers heap memory allocation in Eden space with object header, mark word, and field alignment.',
    theory: [
      'A class defines state (fields) and behavior (methods).',
      'An object is a concrete runtime instance created on the JVM Heap.',
      'System.identityHashCode() reflects JVM object identity regardless of hashCode() overrides.',
    ],
    keySyntax: 'BankAccount account = new BankAccount("Alice", 1000.0);',
    sampleCode: `public class ClassObjectDemo {
    static class Book {
        String title;
        Book(String t) { this.title = t; }
    }
    public static void main(String[] args) {
        Book b1 = new Book("Effective Java");
        Book b2 = new Book("Clean Code");
    }
}`,
    exercisePrompt: 'Define a Car class with brand and speed fields.',
  },
  {
    id: 'constructors',
    stepNumber: 4,
    category: 'Core OOP',
    title: 'Constructors & `this`',
    subtitle: 'Object initialization lifecycle and constructor chaining',
    jvmBehavior: 'The `<init>` bytecode method executes instance variable initializers before constructor body instructions. `this` refers to the newly allocated instance.',
    theory: [
      'Constructors guarantee valid initial object state.',
      'Overloaded constructors can delegate to one another via this(...).',
      'If no constructor is declared, javac inserts a default no-arg constructor.',
    ],
    keySyntax: 'public Person(String name) {\n    this(name, 18); // Constructor chaining\n}',
    sampleCode: `public class ConstructorDemo {
    private String name;
    private int age;

    public ConstructorDemo(String name) {
        this(name, 0);
    }
    public ConstructorDemo(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`,
    exercisePrompt: 'Implement constructor chaining for a Rectangle class with width and height.',
  },
  {
    id: 'encapsulation',
    stepNumber: 5,
    category: 'Core OOP',
    title: 'Encapsulation & Access Modifiers',
    subtitle: 'Data hiding with access modifiers and invariants',
    jvmBehavior: 'Access modifiers are enforced by javac and verified by JVM classloader at runtime bytecode verification stage.',
    theory: [
      'Encapsulation hides internal implementation details to protect invariants.',
      'Fields should be private and exposed only through validated getters/setters.',
      'Java provides 4 access levels: private, package-private, protected, and public.',
    ],
    keySyntax: 'private double balance;\npublic double getBalance() { return balance; }',
    sampleCode: `public class EncapsulationDemo {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    public double getBalance() { return balance; }
}`,
    exercisePrompt: 'Encapsulate a BankAccount balance so it cannot be set to a negative number.',
  },
  {
    id: 'relationships',
    stepNumber: 6,
    category: 'Relationships',
    title: 'Object Relationships',
    subtitle: 'Association, Aggregation, Composition, and Dependency',
    jvmBehavior: 'Composition implies ownership: child objects have their lifecycle bound to the owner. Aggregation holds non-owning references.',
    theory: [
      'Association: Peer relationship between independent objects (Teacher - Student).',
      'Aggregation: "Has-a" relationship with independent lifecycles (Department - Professor).',
      'Composition: "Part-of" relationship where parent owns child lifecycle (Car - Engine).',
      'Dependency: Temporary usage via method parameter ("Uses-a").',
    ],
    keySyntax: 'class Car {\n    private final Engine engine = new Engine(); // Composition\n}',
    sampleCode: `public class CompositionDemo {
    static class Engine { void start() {} }
    static class Car {
        private final Engine engine = new Engine();
        void drive() { engine.start(); }
    }
}`,
    exercisePrompt: 'Model a Computer with a CPU (Composition) and a Mouse (Aggregation).',
  },
  {
    id: 'inheritance',
    stepNumber: 7,
    category: 'Core OOP',
    title: 'Inheritance & `super`',
    subtitle: 'Hierarchy, method overriding, and constructor delegation',
    jvmBehavior: 'The subclass object allocation encompasses all superclass fields. Superclass constructor executes before subclass constructor logic.',
    theory: [
      'Java supports single class inheritance via the `extends` keyword.',
      '`super(...)` explicitly calls the parent constructor and must be the first line.',
      'Method overriding allows subclasses to provide specialized behavior.',
    ],
    keySyntax: 'public class Manager extends Employee {\n    public Manager(String name) { super(name); }\n}',
    sampleCode: `public class InheritanceDemo {
    static class Animal {
        void sound() { System.out.println("Generic sound"); }
    }
    static class Dog extends Animal {
        @Override
        void sound() { System.out.println("Bark"); }
    }
}`,
    exercisePrompt: 'Create an Employee subclass of Person that adds a department field.',
  },
  {
    id: 'polymorphism',
    stepNumber: 8,
    category: 'Core OOP',
    title: 'Polymorphism & Dynamic Dispatch',
    subtitle: 'Virtual method table (vtable) resolution and late binding',
    jvmBehavior: 'The JVM invokes overridden methods via `invokevirtual` bytecode instruction, querying the runtime object vtable rather than compile-time reference type.',
    theory: [
      'Compile-time type determines what methods can be called.',
      'Runtime actual type determines which method implementation executes.',
      'Dynamic dispatch allows polymorphic substitution (Liskov Substitution Principle).',
    ],
    keySyntax: 'Shape s = new Circle();\ns.draw(); // Dispatches to Circle.draw() at runtime',
    sampleCode: `public class PolymorphismDemo {
    interface Shape { void draw(); }
    static class Circle implements Shape {
        public void draw() { System.out.println("Circle"); }
    }
    public static void main(String[] args) {
        Shape s = new Circle();
        s.draw(); // Dynamic dispatch
    }
}`,
    exercisePrompt: 'Create a PaymentProcessor interface and implement CreditCard and PayPal methods.',
  },
  {
    id: 'interfaces',
    stepNumber: 9,
    category: 'Core OOP',
    title: 'Abstract Classes & Interfaces',
    subtitle: 'Pure contracts, default methods, and partial implementations',
    jvmBehavior: 'Interfaces are dispatched via `invokeinterface`. Abstract classes can maintain instance fields and constructor state.',
    theory: [
      'Interfaces declare capabilities and contracts without concrete state.',
      'Java 8+ allows default and static methods in interfaces.',
      'A class can implement multiple interfaces but extend only one class.',
    ],
    keySyntax: 'public interface Flyable {\n    void fly();\n    default void glide() {}\n}',
    sampleCode: `public class InterfaceDemo {
    interface Printable { void print(); }
    interface Serializable {}
    static class Document implements Printable, Serializable {
        public void print() { System.out.println("Printed"); }
    }
}`,
    exercisePrompt: 'Define a Sortable interface and implement it on an EmployeeList class.',
  },
  {
    id: 'records',
    stepNumber: 10,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Records & Immutability',
    subtitle: 'Compact transparent data carriers and memory efficiency',
    jvmBehavior: 'Records auto-generate final fields, canonical constructors, getters, equals(), and hashCode() directly in bytecode without boilerplate.',
    theory: [
      'Records are immutable data carriers introduced in modern Java.',
      'Record header components automatically become private final fields.',
      'Compact constructors allow concise data validation.',
    ],
    keySyntax: 'public record Point(double x, double y) {}',
    sampleCode: `public class RecordDemo {
    public record User(String id, String email) {
        public User {
            if (email == null) throw new IllegalArgumentException("Email required");
        }
    }
    public static void main(String[] args) {
        User u = new User("usr-1", "user@example.com");
    }
}`,
    exercisePrompt: 'Create an immutable OrderRecord containing orderId, amount, and customerName.',
  },
  {
    id: 'sealed',
    stepNumber: 11,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Sealed Classes & Interfaces',
    subtitle: 'Exhaustive algebraic data types and hierarchy control',
    jvmBehavior: 'The JVM enforces the `PermittedSubclasses` attribute in class bytecode, preventing arbitrary unauthorized subclasses.',
    theory: [
      'Sealed classes restrict which other classes or interfaces may extend or implement them.',
      'Permitted subclasses must be final, sealed, or non-sealed.',
      'Enables exhaustive pattern matching without default fallback cases.',
    ],
    keySyntax: 'public sealed interface Shape permits Circle, Square {}',
    sampleCode: `public class SealedDemo {
    public sealed interface Result<T> permits Success, Failure {}
    public record Success<T>(T data) implements Result<T> {}
    public record Failure<T>(String error) implements Result<T> {}
}`,
    exercisePrompt: 'Model a sealed TrafficLight interface permitting Red, Yellow, and Green records.',
  },
  {
    id: 'pattern-matching',
    stepNumber: 12,
    category: 'Java 21 Modern',
    title: 'Modern Java 21: Pattern Matching',
    subtitle: 'Pattern matching for switch, record deconstruction, and type guards',
    jvmBehavior: 'Compiled to `invokedynamic` with type-check and extraction bytecode, eliminating manual downcasting overhead.',
    theory: [
      'Pattern matching simplifies type inspection and extraction.',
      'Record patterns automatically deconstruct components.',
      'Exhaustive switch statements with sealed hierarchies require no default branch.',
    ],
    keySyntax: 'switch (obj) {\n    case Point(var x, var y) -> x + y;\n    default -> 0.0;\n}',
    sampleCode: `public class PatternMatchingDemo {
    public sealed interface Shape permits Circle, Rect {}
    public record Circle(double r) implements Shape {}
    public record Rect(double w, double h) implements Shape {}

    public static double area(Shape s) {
        return switch (s) {
            case Circle(var r) -> Math.PI * r * r;
            case Rect(var w, var h) -> w * h;
        };
    }
}`,
    exercisePrompt: 'Write an area calculation function using pattern matching switch for Circle and Rect.',
  },
  {
    id: 'nested-classes',
    stepNumber: 13,
    category: 'Advanced',
    title: 'Nested & Inner Classes',
    subtitle: 'Static nested classes, inner classes, and local classes',
    jvmBehavior: 'Non-static inner classes hold a hidden synthetic reference `this$0` to their enclosing outer class instance.',
    theory: [
      'Static nested classes do not have access to enclosing instance fields.',
      'Inner classes retain access to enclosing class private state.',
      'Local classes defined within methods capture effectively final variables.',
    ],
    keySyntax: 'class Outer {\n    class Inner { void inspect() {} }\n}',
    sampleCode: `public class NestedDemo {
    private String secret = "JVM";
    class Inner {
        void reveal() { System.out.println(secret); }
    }
}`,
    exercisePrompt: 'Implement a LinkedList class with a private static Node class.',
  },
  {
    id: 'exceptions',
    stepNumber: 14,
    category: 'Advanced',
    title: 'Exception Handling & Stack Unwinding',
    subtitle: 'Checked vs unchecked exceptions and try-with-resources',
    jvmBehavior: 'The JVM unwinds stack frames looking for matching exception table handlers. Try-with-resources compiles to automatic close() calls in finally blocks.',
    theory: [
      'Exceptions represent recoverable anomalies (Exception) or fatal errors (Error).',
      'Checked exceptions must be declared or caught; RuntimeExceptions are unchecked.',
      'Custom domain exceptions ensure descriptive business error communication.',
    ],
    keySyntax: 'try (var res = openResource()) {\n    res.process();\n} catch (IOException e) {}',
    sampleCode: `public class ExceptionDemo {
    static class InsufficientFundsException extends Exception {
        public InsufficientFundsException(String msg) { super(msg); }
    }
    public static void withdraw(double bal, double amt) throws InsufficientFundsException {
        if (amt > bal) throw new InsufficientFundsException("Balance exceeded");
    }
}`,
    exercisePrompt: 'Create a custom InvalidTransferException and throw it when amount <= 0.',
  },
];
