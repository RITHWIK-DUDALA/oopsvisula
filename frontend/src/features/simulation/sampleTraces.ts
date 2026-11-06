import { ExecutionTrace } from '@/types/execution';

/**
 * 1. BankAccount Encapsulation & Mutation Trace
 */
export const bankAccountTrace: ExecutionTrace = {
  id: 'trace-bank-account',
  programTitle: 'BankAccount (Encapsulation & State Mutation)',
  sourceCode: `public class BankAccount {
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
}`,
  totalSteps: 7,
  durationMs: 14.2,
  stdoutAggregate: 'Balance: 750.0\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 17,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Entering main(String[] args). Metaspace initialized. Preparing local variable table.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
      ],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 17,
      methodName: 'main',
      className: 'BankAccount',
      description: 'new BankAccount(...) allocates 32 bytes in Eden Space prior to constructor invocation.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: 'null', isReference: true },
            { name: 'balance', type: 'double', value: 0.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FRAME_PUSH',
      line: 6,
      methodName: '<init>',
      className: 'BankAccount',
      description: 'Entering constructor BankAccount("Alice", 500.0). Initializing instance fields.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'null', isReference: true },
          ],
        },
        {
          frameId: 'frame-init-2',
          methodName: 'BankAccount.<init>(owner, initialBalance)',
          className: 'BankAccount',
          line: 6,
          localVariables: [
            { name: 'this', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'initialBalance', type: 'double', value: 500.0, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'balance', type: 'double', value: 500.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FRAME_POP',
      line: 17,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Constructor completed. Reference @0x2F1A assigned to local variable `account`.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'balance', type: 'double', value: 500.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'FRAME_PUSH',
      line: 11,
      methodName: 'deposit',
      className: 'BankAccount',
      description: 'Calling account.deposit(250.0). Pushing deposit() stack frame.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 18,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
          ],
        },
        {
          frameId: 'frame-deposit-3',
          methodName: 'BankAccount.deposit(amount)',
          className: 'BankAccount',
          line: 11,
          localVariables: [
            { name: 'this', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
            { name: 'amount', type: 'double', value: 250.0, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'balance', type: 'double', value: 500.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 6,
      type: 'FIELD_MUTATED',
      line: 12,
      methodName: 'deposit',
      className: 'BankAccount',
      description: 'Heap state updated: @0x2F1A.balance mutated from 500.0 to 750.0.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 18,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
          ],
        },
        {
          frameId: 'frame-deposit-3',
          methodName: 'BankAccount.deposit(amount)',
          className: 'BankAccount',
          line: 12,
          localVariables: [
            { name: 'this', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
            { name: 'amount', type: 'double', value: 250.0, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'balance', type: 'double', value: 750.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 7,
      type: 'EXECUTION_COMPLETED',
      line: 19,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Execution completed. JVM stdout flushed: "Balance: 750.0".',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 19,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'account', type: 'BankAccount', value: 'ref @0x2F1A', isReference: true, targetAddress: '@0x2F1A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x2F1A',
          className: 'BankAccount',
          fields: [
            { name: 'owner', type: 'String', value: '"Alice"', isReference: false },
            { name: 'balance', type: 'double', value: 750.0, isReference: false },
          ],
        },
      ],
      stdout: 'Balance: 750.0\n',
    },
  ],
};

/**
 * 2. Polymorphic Dynamic Dispatch Trace
 */
export const shapeHierarchyTrace: ExecutionTrace = {
  id: 'trace-shape-polymorphism',
  programTitle: 'Polymorphism & Dynamic Dispatch (vtables)',
  sourceCode: `interface Shape {
    void draw();
}

class Circle implements Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }
    public void draw() {
        System.out.println("Drawing Circle with radius " + radius);
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(4.5);
        s.draw(); // Dynamic dispatch via vtable
    }
}`,
  totalSteps: 5,
  durationMs: 11.8,
  stdoutAggregate: 'Drawing Circle with radius 4.5\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 14,
      methodName: 'main',
      className: 'Main',
      description: 'main() stack frame initialized.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 14,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 's', type: 'Shape', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 15,
      methodName: 'main',
      className: 'Main',
      description: 'new Circle(4.5) allocated on JVM heap at @0x4C9D.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 15,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 's', type: 'Shape', value: 'ref @0x4C9D', isReference: true, targetAddress: '@0x4C9D' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x4C9D',
          className: 'Circle (implements Shape)',
          fields: [{ name: 'radius', type: 'double', value: 4.5, isReference: false }],
        },
      ],
    },
    {
      step: 3,
      type: 'FRAME_PUSH',
      line: 9,
      methodName: 'draw',
      className: 'Circle',
      description: 's.draw() dynamic dispatch: JVM resolves target method to Circle.draw() using runtime type metadata.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 16,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 's', type: 'Shape', value: 'ref @0x4C9D', isReference: true, targetAddress: '@0x4C9D' },
          ],
        },
        {
          frameId: 'frame-draw-2',
          methodName: 'Circle.draw()',
          className: 'Circle',
          line: 9,
          localVariables: [
            { name: 'this', type: 'Circle', value: 'ref @0x4C9D', isReference: true, targetAddress: '@0x4C9D' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x4C9D',
          className: 'Circle (implements Shape)',
          fields: [{ name: 'radius', type: 'double', value: 4.5, isReference: false }],
        },
      ],
    },
    {
      step: 4,
      type: 'STDOUT',
      line: 9,
      methodName: 'draw',
      className: 'Circle',
      description: 'System.out.println emitted stdout event.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 16,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 's', type: 'Shape', value: 'ref @0x4C9D', isReference: true, targetAddress: '@0x4C9D' },
          ],
        },
        {
          frameId: 'frame-draw-2',
          methodName: 'Circle.draw()',
          className: 'Circle',
          line: 9,
          localVariables: [
            { name: 'this', type: 'Circle', value: 'ref @0x4C9D', isReference: true, targetAddress: '@0x4C9D' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x4C9D',
          className: 'Circle (implements Shape)',
          fields: [{ name: 'radius', type: 'double', value: 4.5, isReference: false }],
        },
      ],
      stdout: 'Drawing Circle with radius 4.5\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 17,
      methodName: 'main',
      className: 'Main',
      description: 'Program execution completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x4C9D',
          className: 'Circle (implements Shape)',
          fields: [{ name: 'radius', type: 'double', value: 4.5, isReference: false }],
        },
      ],
    },
  ],
};

/**
 * 3. Composition & Reference Pointer Trace (Car -> Engine)
 */
export const compositionTrace: ExecutionTrace = {
  id: 'trace-composition',
  programTitle: 'Car & Engine (Composition & Heap References)',
  sourceCode: `public class Engine {
    private int horsepower;
    public Engine(int hp) { this.horsepower = hp; }
    public int getHp() { return this.horsepower; }
}

public class Car {
    private String model;
    private Engine engine;

    public Car(String model, int hp) {
        this.model = model;
        this.engine = new Engine(hp);
    }

    public static void main(String[] args) {
        Car sedan = new Car("Apex-GT", 280);
        System.out.println("HP: " + sedan.engine.getHp());
    }
}`,
  totalSteps: 6,
  durationMs: 16.8,
  stdoutAggregate: 'HP: 280\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 16,
      methodName: 'main',
      className: 'Car',
      description: 'Entering main(args). Metaspace initialized for Car and Engine.',
      stackFrames: [
        {
          frameId: 'frame-comp-main',
          methodName: 'main(args)',
          className: 'Car',
          line: 16,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'sedan', type: 'Car', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
      ],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 11,
      methodName: 'Car.<init>',
      className: 'Car',
      description: 'Allocated Car instance at @0x7B1A on JVM Eden space.',
      stackFrames: [
        {
          frameId: 'frame-comp-main',
          methodName: 'main(args)',
          className: 'Car',
          line: 16,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'sedan', type: 'Car', value: 'ref @0x7B1A', isReference: true, targetAddress: '@0x7B1A' },
          ],
        },
        {
          frameId: 'frame-car-init',
          methodName: 'Car(model, hp)',
          className: 'Car',
          line: 11,
          localVariables: [
            { name: 'this', type: 'Car', value: 'ref @0x7B1A', isReference: true, targetAddress: '@0x7B1A' },
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'hp', type: 'int', value: 280, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x7B1A',
          className: 'Car',
          fields: [
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'engine', type: 'Engine', value: 'null', isReference: true },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'OBJECT_ALLOCATED',
      line: 3,
      methodName: 'Engine.<init>',
      className: 'Engine',
      description: 'Composition: Car instantiated owned Engine instance at @0x9F4C.',
      stackFrames: [
        {
          frameId: 'frame-comp-main',
          methodName: 'main(args)',
          className: 'Car',
          line: 16,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'sedan', type: 'Car', value: 'ref @0x7B1A', isReference: true, targetAddress: '@0x7B1A' },
          ],
        },
        {
          frameId: 'frame-eng-init',
          methodName: 'Engine(hp)',
          className: 'Engine',
          line: 3,
          localVariables: [
            { name: 'this', type: 'Engine', value: 'ref @0x9F4C', isReference: true, targetAddress: '@0x9F4C' },
            { name: 'hp', type: 'int', value: 280, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x7B1A',
          className: 'Car',
          fields: [
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'engine', type: 'Engine', value: 'ref @0x9F4C', isReference: true, targetAddress: '@0x9F4C' },
          ],
        },
        {
          address: '@0x9F4C',
          className: 'Engine',
          fields: [{ name: 'horsepower', type: 'int', value: 280, isReference: false }],
        },
      ],
    },
    {
      step: 4,
      type: 'FRAME_POP',
      line: 17,
      methodName: 'main',
      className: 'Car',
      description: 'Car constructor finished. Nested heap reference established: @0x7B1A.engine -> @0x9F4C.',
      stackFrames: [
        {
          frameId: 'frame-comp-main',
          methodName: 'main(args)',
          className: 'Car',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'sedan', type: 'Car', value: 'ref @0x7B1A', isReference: true, targetAddress: '@0x7B1A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x7B1A',
          className: 'Car',
          fields: [
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'engine', type: 'Engine', value: 'ref @0x9F4C', isReference: true, targetAddress: '@0x9F4C' },
          ],
        },
        {
          address: '@0x9F4C',
          className: 'Engine',
          fields: [{ name: 'horsepower', type: 'int', value: 280, isReference: false }],
        },
      ],
    },
    {
      step: 5,
      type: 'STDOUT',
      line: 17,
      methodName: 'main',
      className: 'Car',
      description: 'Invoked sedan.engine.getHp() and printed result to standard output.',
      stackFrames: [
        {
          frameId: 'frame-comp-main',
          methodName: 'main(args)',
          className: 'Car',
          line: 17,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'sedan', type: 'Car', value: 'ref @0x7B1A', isReference: true, targetAddress: '@0x7B1A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x7B1A',
          className: 'Car',
          fields: [
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'engine', type: 'Engine', value: 'ref @0x9F4C', isReference: true, targetAddress: '@0x9F4C' },
          ],
        },
        {
          address: '@0x9F4C',
          className: 'Engine',
          fields: [{ name: 'horsepower', type: 'int', value: 280, isReference: false }],
        },
      ],
      stdout: 'HP: 280\n',
    },
    {
      step: 6,
      type: 'EXECUTION_COMPLETED',
      line: 18,
      methodName: 'main',
      className: 'Car',
      description: 'Execution terminated. Thread stack unmounted; heap objects eligible for Garbage Collection.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x7B1A',
          className: 'Car',
          fields: [
            { name: 'model', type: 'String', value: '"Apex-GT"', isReference: false },
            { name: 'engine', type: 'Engine', value: 'ref @0x9F4C', isReference: true, targetAddress: '@0x9F4C' },
          ],
        },
        {
          address: '@0x9F4C',
          className: 'Engine',
          fields: [{ name: 'horsepower', type: 'int', value: 280, isReference: false }],
        },
      ],
    },
  ],
};

/**
 * 4. Java 21 Record & Pattern Matching Trace
 */
export const recordPatternTrace: ExecutionTrace = {
  id: 'trace-record-pattern',
  programTitle: 'StudentRecord (Java 21 Records & Pattern Matching)',
  sourceCode: `public record StudentRecord(String name, int score) {
    public StudentRecord {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Invalid score");
        }
    }
}

public class Main {
    public static String grade(Object obj) {
        return switch (obj) {
            case StudentRecord(var name, int score) when score >= 90 -> name + ": Grade A";
            case StudentRecord(var name, int score) -> name + ": Passing";
            default -> "Unknown";
        };
    }

    public static void main(String[] args) {
        StudentRecord student = new StudentRecord("Diana", 95);
        String result = grade(student);
        System.out.println(result);
    }
}`,
  totalSteps: 5,
  durationMs: 12.4,
  stdoutAggregate: 'Diana: Grade A\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 19,
      methodName: 'main',
      className: 'Main',
      description: 'Entering main(args). StudentRecord class definition verified in Metaspace.',
      stackFrames: [
        {
          frameId: 'frame-rec-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 19,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'student', type: 'StudentRecord', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
      ],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 2,
      methodName: 'StudentRecord.<init>',
      className: 'StudentRecord',
      description: 'Compact constructor executed. Transparent immutable record allocated at @0x5E21.',
      stackFrames: [
        {
          frameId: 'frame-rec-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 19,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'student', type: 'StudentRecord', value: 'ref @0x5E21', isReference: true, targetAddress: '@0x5E21' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0001',
          className: 'String[0]',
          fields: [{ name: 'length', type: 'int', value: 0, isReference: false }],
        },
        {
          address: '@0x5E21',
          className: 'StudentRecord (Record)',
          fields: [
            { name: 'name', type: 'String', value: '"Diana"', isReference: false },
            { name: 'score', type: 'int', value: 95, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FRAME_PUSH',
      line: 12,
      methodName: 'grade',
      className: 'Main',
      description: 'Pattern matching switch evaluated: matched record deconstruction pattern with guard "when score >= 90".',
      stackFrames: [
        {
          frameId: 'frame-rec-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 20,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'student', type: 'StudentRecord', value: 'ref @0x5E21', isReference: true, targetAddress: '@0x5E21' },
          ],
        },
        {
          frameId: 'frame-grade-2',
          methodName: 'grade(obj)',
          className: 'Main',
          line: 12,
          localVariables: [
            { name: 'obj', type: 'Object', value: 'ref @0x5E21', isReference: true, targetAddress: '@0x5E21' },
            { name: 'name', type: 'String', value: '"Diana"', isReference: false },
            { name: 'score', type: 'int', value: 95, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x5E21',
          className: 'StudentRecord (Record)',
          fields: [
            { name: 'name', type: 'String', value: '"Diana"', isReference: false },
            { name: 'score', type: 'int', value: 95, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'STDOUT',
      line: 21,
      methodName: 'main',
      className: 'Main',
      description: 'Evaluated switch expression returned "Diana: Grade A", printed to standard output.',
      stackFrames: [
        {
          frameId: 'frame-rec-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 21,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true, targetAddress: '@0x0001' },
            { name: 'student', type: 'StudentRecord', value: 'ref @0x5E21', isReference: true, targetAddress: '@0x5E21' },
            { name: 'result', type: 'String', value: '"Diana: Grade A"', isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x5E21',
          className: 'StudentRecord (Record)',
          fields: [
            { name: 'name', type: 'String', value: '"Diana"', isReference: false },
            { name: 'score', type: 'int', value: 95, isReference: false },
          ],
        },
      ],
      stdout: 'Diana: Grade A\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 22,
      methodName: 'main',
      className: 'Main',
      description: 'Execution completed cleanly. All record memory verified.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x5E21',
          className: 'StudentRecord (Record)',
          fields: [
            { name: 'name', type: 'String', value: '"Diana"', isReference: false },
            { name: 'score', type: 'int', value: 95, isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 5. Inheritance & super() Delegation Trace
 */
export const inheritanceTrace: ExecutionTrace = {
  id: 'trace-inheritance-super',
  programTitle: 'Inheritance & super() Delegation',
  sourceCode: `class Employee {
    protected String name;
    public Employee(String name) {
        this.name = name;
    }
}

class Manager extends Employee {
    private int teamSize;
    public Manager(String name, int size) {
        super(name);
        this.teamSize = size;
    }
}

public class Main {
    public static void main(String[] args) {
        Manager mgr = new Manager("Elena", 8);
        System.out.println("Manager: " + mgr.name);
    }
}`,
  totalSteps: 6,
  durationMs: 12.4,
  stdoutAggregate: 'Manager: Elena\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 17,
      methodName: 'main',
      className: 'Main',
      description: 'Entering main(). Preparing allocation for Manager instance.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 17,
          localVariables: [
            { name: 'mgr', type: 'Manager', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 17,
      methodName: 'main',
      className: 'Manager',
      description: 'Manager instance allocated in Eden space with uninitialized superclass & subclass fields.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 17,
          localVariables: [
            { name: 'mgr', type: 'Manager', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Manager (extends Employee)',
          fields: [
            { name: 'name (super)', type: 'String', value: 'null', isReference: true },
            { name: 'teamSize', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FRAME_PUSH',
      line: 10,
      methodName: 'Manager.<init>',
      className: 'Manager',
      description: 'Manager constructor delegates to Employee super(name).',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 17,
          localVariables: [
            { name: 'mgr', type: 'Manager', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
        {
          frameId: 'frame-mgr-init',
          methodName: 'Manager.<init>("Elena", 8)',
          className: 'Manager',
          line: 10,
          localVariables: [
            { name: 'this', type: 'Manager', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
            { name: 'name', type: 'String', value: '"Elena"', isReference: false },
            { name: 'size', type: 'int', value: 8, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Manager (extends Employee)',
          fields: [
            { name: 'name (super)', type: 'String', value: 'null', isReference: true },
            { name: 'teamSize', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FIELD_MUTATED',
      line: 4,
      methodName: 'Employee.<init>',
      className: 'Employee',
      description: 'super(name) sets protected superclass field name = "Elena".',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 17,
          localVariables: [
            { name: 'mgr', type: 'Manager', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
        {
          frameId: 'frame-emp-init',
          methodName: 'Employee.<init>("Elena")',
          className: 'Employee',
          line: 4,
          localVariables: [
            { name: 'this', type: 'Employee', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
            { name: 'name', type: 'String', value: '"Elena"', isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Manager (extends Employee)',
          fields: [
            { name: 'name (super)', type: 'String', value: '"Elena"', isReference: true },
            { name: 'teamSize', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'FIELD_MUTATED',
      line: 11,
      methodName: 'Manager.<init>',
      className: 'Manager',
      description: 'Subclass constructor completes: this.teamSize = 8.',
      stackFrames: [
        {
          frameId: 'frame-m-1',
          methodName: 'main(args)',
          className: 'Main',
          line: 17,
          localVariables: [
            { name: 'mgr', type: 'Manager', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Manager (extends Employee)',
          fields: [
            { name: 'name (super)', type: 'String', value: '"Elena"', isReference: true },
            { name: 'teamSize', type: 'int', value: 8, isReference: false },
          ],
        },
      ],
    },
    {
      step: 6,
      type: 'EXECUTION_COMPLETED',
      line: 18,
      methodName: 'main',
      className: 'Main',
      description: 'Execution completed. Standard output printed: Manager: Elena.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Manager (extends Employee)',
          fields: [
            { name: 'name (super)', type: 'String', value: '"Elena"', isReference: true },
            { name: 'teamSize', type: 'int', value: 8, isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 6. Constructors & this Reference Binding Trace
 */
export const constructorTrace: ExecutionTrace = {
  id: 'trace-constructor-this',
  programTitle: 'Constructors & this Reference Binding',
  sourceCode: `public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public static void main(String[] args) {
        Point p = new Point(10, 25);
        System.out.println("Point: (" + p.x + ", " + p.y + ")");
    }
}`,
  totalSteps: 5,
  durationMs: 9.8,
  stdoutAggregate: 'Point: (10, 25)\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 12,
      methodName: 'main',
      className: 'Point',
      description: 'main() stack frame initialized. Allocating Point instance.',
      stackFrames: [
        {
          frameId: 'frame-pt-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 12,
          localVariables: [
            { name: 'p', type: 'Point', value: 'null', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 12,
      methodName: 'main',
      className: 'Point',
      description: 'Point instance allocated @0x03C1 in Eden heap with default zeros.',
      stackFrames: [
        {
          frameId: 'frame-pt-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 12,
          localVariables: [
            { name: 'p', type: 'Point', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 0, isReference: false },
            { name: 'y', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FIELD_MUTATED',
      line: 6,
      methodName: 'Point.<init>',
      className: 'Point',
      description: 'Constructor executes this.x = x (10).',
      stackFrames: [
        {
          frameId: 'frame-pt-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 12,
          localVariables: [
            { name: 'p', type: 'Point', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
        {
          frameId: 'frame-pt-init',
          methodName: 'Point.<init>(10, 25)',
          className: 'Point',
          line: 6,
          localVariables: [
            { name: 'this', type: 'Point', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 25, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FIELD_MUTATED',
      line: 7,
      methodName: 'Point.<init>',
      className: 'Point',
      description: 'Constructor executes this.y = y (25). Object fully initialized.',
      stackFrames: [
        {
          frameId: 'frame-pt-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 12,
          localVariables: [
            { name: 'p', type: 'Point', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 25, isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 13,
      methodName: 'main',
      className: 'Point',
      description: 'Standard output printed: Point: (10, 25).',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 25, isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 7. Exception Handling & Stack Unwinding Trace
 */
export const exceptionTrace: ExecutionTrace = {
  id: 'trace-exception-unwinding',
  programTitle: 'Exception Handling & Stack Unwinding',
  sourceCode: `public class ExceptionDemo {
    static void compute(int val) {
        if (val < 0) {
            throw new IllegalArgumentException("Negative input");
        }
    }

    public static void main(String[] args) {
        try {
            compute(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}`,
  totalSteps: 5,
  durationMs: 10.5,
  stdoutAggregate: 'Caught: Negative input\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 10,
      methodName: 'main',
      className: 'ExceptionDemo',
      description: 'Entering main(). Entering try block.',
      stackFrames: [
        {
          frameId: 'frame-ex-main',
          methodName: 'main(args)',
          className: 'ExceptionDemo',
          line: 10,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'FRAME_PUSH',
      line: 3,
      methodName: 'compute',
      className: 'ExceptionDemo',
      description: 'Call compute(-5). Frame pushed onto stack.',
      stackFrames: [
        {
          frameId: 'frame-ex-main',
          methodName: 'main(args)',
          className: 'ExceptionDemo',
          line: 10,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
        {
          frameId: 'frame-ex-comp',
          methodName: 'compute(-5)',
          className: 'ExceptionDemo',
          line: 3,
          localVariables: [
            { name: 'val', type: 'int', value: -5, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 3,
      type: 'OBJECT_ALLOCATED',
      line: 4,
      methodName: 'compute',
      className: 'ExceptionDemo',
      description: 'val < 0 is true. throw new IllegalArgumentException("Negative input") allocated @0x0AD1.',
      stackFrames: [
        {
          frameId: 'frame-ex-main',
          methodName: 'main(args)',
          className: 'ExceptionDemo',
          line: 10,
          localVariables: [],
        },
        {
          frameId: 'frame-ex-comp',
          methodName: 'compute(-5)',
          className: 'ExceptionDemo',
          line: 4,
          localVariables: [
            { name: 'val', type: 'int', value: -5, isReference: false },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0AD1',
          className: 'IllegalArgumentException',
          fields: [
            { name: 'detailMessage', type: 'String', value: '"Negative input"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FRAME_POP',
      line: 12,
      methodName: 'main',
      className: 'ExceptionDemo',
      description: 'Stack unwinding: compute() popped abruptly. Catch block in main() captures exception reference @0x0AD1.',
      stackFrames: [
        {
          frameId: 'frame-ex-main',
          methodName: 'main(args) [catch]',
          className: 'ExceptionDemo',
          line: 12,
          localVariables: [
            { name: 'e', type: 'IllegalArgumentException', value: 'ref @0x0AD1', isReference: true, targetAddress: '@0x0AD1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x0AD1',
          className: 'IllegalArgumentException',
          fields: [
            { name: 'detailMessage', type: 'String', value: '"Negative input"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 13,
      methodName: 'main',
      className: 'ExceptionDemo',
      description: 'Standard output printed: Caught: Negative input.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x0AD1',
          className: 'IllegalArgumentException',
          fields: [
            { name: 'detailMessage', type: 'String', value: '"Negative input"', isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 8. Variables & Data Types (Primitive vs Reference) Trace
 */
export const variablesTrace: ExecutionTrace = {
  id: 'trace-vars',
  programTitle: 'Variables & Data Types (Primitive vs Reference)',
  sourceCode: `public class VariableSemantics {
    public static void main(String[] args) {
        int count = 10;
        int copy = count;
        copy += 5;
        String text = new String("Java 21");
        System.out.println("count=" + count + ", copy=" + copy);
    }
}`,
  totalSteps: 5,
  durationMs: 8.4,
  stdoutAggregate: 'count=10, copy=15\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 3,
      methodName: 'main',
      className: 'VariableSemantics',
      description: 'Allocating primitive slot count = 10 directly on Thread Stack frame.',
      stackFrames: [
        {
          frameId: 'frame-vars-main',
          methodName: 'main(args)',
          className: 'VariableSemantics',
          line: 3,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'count', type: 'int', value: 10, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'STEP_ENTER',
      line: 4,
      methodName: 'main',
      className: 'VariableSemantics',
      description: 'Copying primitive value from count to copy. Primitive copying duplicates the raw bits on the stack.',
      stackFrames: [
        {
          frameId: 'frame-vars-main',
          methodName: 'main(args)',
          className: 'VariableSemantics',
          line: 4,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'count', type: 'int', value: 10, isReference: false },
            { name: 'copy', type: 'int', value: 10, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 3,
      type: 'STEP_ENTER',
      line: 5,
      methodName: 'main',
      className: 'VariableSemantics',
      description: 'Mutating copy += 5 on stack. count remains 10 (demonstrating pass-by-value primitive independence).',
      stackFrames: [
        {
          frameId: 'frame-vars-main',
          methodName: 'main(args)',
          className: 'VariableSemantics',
          line: 5,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'count', type: 'int', value: 10, isReference: false },
            { name: 'copy', type: 'int', value: 15, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 4,
      type: 'OBJECT_ALLOCATED',
      line: 6,
      methodName: 'main',
      className: 'VariableSemantics',
      description: 'Allocating String object @0x021A on JVM Eden Heap. Pointer text placed in stack frame.',
      stackFrames: [
        {
          frameId: 'frame-vars-main',
          methodName: 'main(args)',
          className: 'VariableSemantics',
          line: 6,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'count', type: 'int', value: 10, isReference: false },
            { name: 'copy', type: 'int', value: 15, isReference: false },
            { name: 'text', type: 'String', value: 'ref @0x021A', isReference: true, targetAddress: '@0x021A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x021A',
          className: 'String',
          fields: [
            { name: 'value', type: 'byte[]', value: '"Java 21"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 7,
      methodName: 'main',
      className: 'VariableSemantics',
      description: 'Standard output printed: count=10, copy=15.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x021A',
          className: 'String',
          fields: [
            { name: 'value', type: 'byte[]', value: '"Java 21"', isReference: false },
          ],
        },
      ],
      stdout: 'count=10, copy=15\n',
    },
  ],
};

/**
 * 9. Methods & Call Stack (LIFO Frame Mechanics) Trace
 */
export const methodsTrace: ExecutionTrace = {
  id: 'trace-methods',
  programTitle: 'Methods & Call Stack (LIFO Frame Mechanics)',
  sourceCode: `public class StackMechanics {
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
}`,
  totalSteps: 6,
  durationMs: 11.2,
  stdoutAggregate: 'Result: 20\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 9,
      methodName: 'main',
      className: 'StackMechanics',
      description: 'Entering main(String[] args). Pushing main stack frame. Initializing local variables x=4, y=5.',
      stackFrames: [
        {
          frameId: 'frame-methods-main',
          methodName: 'main(args)',
          className: 'StackMechanics',
          line: 9,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'x', type: 'int', value: 4, isReference: false },
            { name: 'y', type: 'int', value: 5, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'FRAME_PUSH',
      line: 11,
      methodName: 'multiply',
      className: 'StackMechanics',
      description: 'Invoking multiply(4, 5). Pushing new Stack Frame on top of call stack (LIFO activation).',
      stackFrames: [
        {
          frameId: 'frame-methods-mult',
          methodName: 'multiply(a, b)',
          className: 'StackMechanics',
          line: 2,
          localVariables: [
            { name: 'a', type: 'int', value: 4, isReference: false },
            { name: 'b', type: 'int', value: 5, isReference: false },
          ],
        },
        {
          frameId: 'frame-methods-main',
          methodName: 'main(args)',
          className: 'StackMechanics',
          line: 11,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'x', type: 'int', value: 4, isReference: false },
            { name: 'y', type: 'int', value: 5, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 3,
      type: 'STEP_ENTER',
      line: 3,
      methodName: 'multiply',
      className: 'StackMechanics',
      description: 'Calculating product = a * b (20). Storing local variable in multiply frame.',
      stackFrames: [
        {
          frameId: 'frame-methods-mult',
          methodName: 'multiply(a, b)',
          className: 'StackMechanics',
          line: 3,
          localVariables: [
            { name: 'a', type: 'int', value: 4, isReference: false },
            { name: 'b', type: 'int', value: 5, isReference: false },
            { name: 'product', type: 'int', value: 20, isReference: false },
          ],
        },
        {
          frameId: 'frame-methods-main',
          methodName: 'main(args)',
          className: 'StackMechanics',
          line: 11,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'x', type: 'int', value: 4, isReference: false },
            { name: 'y', type: 'int', value: 5, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 4,
      type: 'FRAME_POP',
      line: 4,
      methodName: 'multiply',
      className: 'StackMechanics',
      description: 'Returning 20 from multiply(). Popping stack frame. Control returns to main().',
      stackFrames: [
        {
          frameId: 'frame-methods-main',
          methodName: 'main(args)',
          className: 'StackMechanics',
          line: 11,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'x', type: 'int', value: 4, isReference: false },
            { name: 'y', type: 'int', value: 5, isReference: false },
            { name: 'result', type: 'int', value: 20, isReference: false },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 5,
      type: 'STEP_ENTER',
      line: 12,
      methodName: 'main',
      className: 'StackMechanics',
      description: 'Standard output printed: Result: 20.',
      stackFrames: [
        {
          frameId: 'frame-methods-main',
          methodName: 'main(args)',
          className: 'StackMechanics',
          line: 12,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'x', type: 'int', value: 4, isReference: false },
            { name: 'y', type: 'int', value: 5, isReference: false },
            { name: 'result', type: 'int', value: 20, isReference: false },
          ],
        },
      ],
      heapObjects: [],
      stdout: 'Result: 20\n',
    },
    {
      step: 6,
      type: 'EXECUTION_COMPLETED',
      line: 13,
      methodName: 'main',
      className: 'StackMechanics',
      description: 'main() completed. Thread stack deallocated.',
      stackFrames: [],
      heapObjects: [],
    },
  ],
};

/**
 * 10. Classes & Objects (Identity & Instantiation) Trace
 */
export const classesObjectsTrace: ExecutionTrace = {
  id: 'trace-classes',
  programTitle: 'Classes & Objects (Identity & Instantiation)',
  sourceCode: `public class Point {
    int x;
    int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public static void main(String[] args) {
        Point p1 = new Point(10, 20);
        Point p2 = new Point(30, 40);
        System.out.println("p1 != p2: " + (p1 != p2));
    }
}`,
  totalSteps: 5,
  durationMs: 12.0,
  stdoutAggregate: 'p1 != p2: true\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 10,
      methodName: 'main',
      className: 'Point',
      description: 'Entering main(). Preparing to allocate Point instance on heap.',
      stackFrames: [
        {
          frameId: 'frame-point-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 10,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 11,
      methodName: 'main',
      className: 'Point',
      description: 'Allocating Point instance p1 at @0x011A with fields x=10, y=20.',
      stackFrames: [
        {
          frameId: 'frame-point-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 11,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'p1', type: 'Point', value: 'ref @0x011A', isReference: true, targetAddress: '@0x011A' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x011A',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 20, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'OBJECT_ALLOCATED',
      line: 12,
      methodName: 'main',
      className: 'Point',
      description: 'Allocating distinct Point instance p2 at @0x011B with fields x=30, y=40.',
      stackFrames: [
        {
          frameId: 'frame-point-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 12,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'p1', type: 'Point', value: 'ref @0x011A', isReference: true, targetAddress: '@0x011A' },
            { name: 'p2', type: 'Point', value: 'ref @0x011B', isReference: true, targetAddress: '@0x011B' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x011A',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 20, isReference: false },
          ],
        },
        {
          address: '@0x011B',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 30, isReference: false },
            { name: 'y', type: 'int', value: 40, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'STEP_ENTER',
      line: 13,
      methodName: 'main',
      className: 'Point',
      description: 'Evaluating p1 != p2. Addresses (@0x011A vs @0x011B) differ, confirming independent heap identities.',
      stackFrames: [
        {
          frameId: 'frame-point-main',
          methodName: 'main(args)',
          className: 'Point',
          line: 13,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'p1', type: 'Point', value: 'ref @0x011A', isReference: true, targetAddress: '@0x011A' },
            { name: 'p2', type: 'Point', value: 'ref @0x011B', isReference: true, targetAddress: '@0x011B' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x011A',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 20, isReference: false },
          ],
        },
        {
          address: '@0x011B',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 30, isReference: false },
            { name: 'y', type: 'int', value: 40, isReference: false },
          ],
        },
      ],
      stdout: 'p1 != p2: true\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 14,
      methodName: 'main',
      className: 'Point',
      description: 'Program execution completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x011A',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 10, isReference: false },
            { name: 'y', type: 'int', value: 20, isReference: false },
          ],
        },
        {
          address: '@0x011B',
          className: 'Point',
          fields: [
            { name: 'x', type: 'int', value: 30, isReference: false },
            { name: 'y', type: 'int', value: 40, isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 11. Abstract Classes & Interfaces (Contract Realization) Trace
 */
export const interfacesTrace: ExecutionTrace = {
  id: 'trace-interfaces',
  programTitle: 'Abstract Classes & Interfaces (Contract Realization)',
  sourceCode: `interface PaymentGateway {
    void process(double amount);
}

class CreditCardGateway implements PaymentGateway {
    private String cardNumber;

    public CreditCardGateway(String num) {
        this.cardNumber = num;
    }

    public void process(double amount) {
        System.out.println("Charged: " + amount);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        PaymentGateway gateway = new CreditCardGateway("4111-XXXX");
        gateway.process(150.0);
    }
}`,
  totalSteps: 5,
  durationMs: 13.1,
  stdoutAggregate: 'Charged: 150.0\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 18,
      methodName: 'main',
      className: 'InterfaceDemo',
      description: 'Entering main(). Interface PaymentGateway loaded into Metaspace contract table.',
      stackFrames: [
        {
          frameId: 'frame-iface-main',
          methodName: 'main(args)',
          className: 'InterfaceDemo',
          line: 18,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 19,
      methodName: 'main',
      className: 'InterfaceDemo',
      description: 'Instantiating CreditCardGateway at @0x03C1. Assigned to interface reference PaymentGateway gateway.',
      stackFrames: [
        {
          frameId: 'frame-iface-main',
          methodName: 'main(args)',
          className: 'InterfaceDemo',
          line: 19,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'gateway', type: 'PaymentGateway', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'CreditCardGateway',
          fields: [
            { name: 'cardNumber', type: 'String', value: '"4111-XXXX"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FRAME_PUSH',
      line: 20,
      methodName: 'process',
      className: 'CreditCardGateway',
      description: 'Invoking gateway.process(150.0). Interface table lookup (itable) resolves to CreditCardGateway.process.',
      stackFrames: [
        {
          frameId: 'frame-iface-process',
          methodName: 'process(amount)',
          className: 'CreditCardGateway',
          line: 12,
          localVariables: [
            { name: 'this', type: 'CreditCardGateway', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
            { name: 'amount', type: 'double', value: 150.0, isReference: false },
          ],
        },
        {
          frameId: 'frame-iface-main',
          methodName: 'main(args)',
          className: 'InterfaceDemo',
          line: 20,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'gateway', type: 'PaymentGateway', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'CreditCardGateway',
          fields: [
            { name: 'cardNumber', type: 'String', value: '"4111-XXXX"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FRAME_POP',
      line: 13,
      methodName: 'process',
      className: 'CreditCardGateway',
      description: 'Standard output printed: Charged: 150.0. Popping process frame.',
      stackFrames: [
        {
          frameId: 'frame-iface-main',
          methodName: 'main(args)',
          className: 'InterfaceDemo',
          line: 20,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'gateway', type: 'PaymentGateway', value: 'ref @0x03C1', isReference: true, targetAddress: '@0x03C1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'CreditCardGateway',
          fields: [
            { name: 'cardNumber', type: 'String', value: '"4111-XXXX"', isReference: false },
          ],
        },
      ],
      stdout: 'Charged: 150.0\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 21,
      methodName: 'main',
      className: 'InterfaceDemo',
      description: 'Interface contract demonstration completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x03C1',
          className: 'CreditCardGateway',
          fields: [
            { name: 'cardNumber', type: 'String', value: '"4111-XXXX"', isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 12. Modern Java 21: Sealed Classes & Hierarchies Trace
 */
export const sealedHierarchyTrace: ExecutionTrace = {
  id: 'trace-sealed',
  programTitle: 'Modern Java 21: Sealed Classes & Exhaustive Hierarchies',
  sourceCode: `sealed interface Status permits Active, Suspended {}

final class Active implements Status {
    String reason = "User verified";
}

final class Suspended implements Status {
    int daysLeft = 14;
}

public class SealedDemo {
    public static void main(String[] args) {
        Status status = new Active();
        System.out.println("Status type: " + status.getClass().getSimpleName());
    }
}`,
  totalSteps: 4,
  durationMs: 9.8,
  stdoutAggregate: 'Status type: Active\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 12,
      methodName: 'main',
      className: 'SealedDemo',
      description: 'Entering main(). Sealed hierarchy Status permits only Active and Suspended classes.',
      stackFrames: [
        {
          frameId: 'frame-sealed-main',
          methodName: 'main(args)',
          className: 'SealedDemo',
          line: 12,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 13,
      methodName: 'main',
      className: 'SealedDemo',
      description: 'Allocating permitted variant Active at @0x05E1. Bound to sealed interface reference status.',
      stackFrames: [
        {
          frameId: 'frame-sealed-main',
          methodName: 'main(args)',
          className: 'SealedDemo',
          line: 13,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'status', type: 'Status', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Active',
          fields: [
            { name: 'reason', type: 'String', value: '"User verified"', isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'STEP_ENTER',
      line: 14,
      methodName: 'main',
      className: 'SealedDemo',
      description: 'Evaluating status.getClass().getSimpleName(). Prints Status type: Active.',
      stackFrames: [
        {
          frameId: 'frame-sealed-main',
          methodName: 'main(args)',
          className: 'SealedDemo',
          line: 14,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'status', type: 'Status', value: 'ref @0x05E1', isReference: true, targetAddress: '@0x05E1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Active',
          fields: [
            { name: 'reason', type: 'String', value: '"User verified"', isReference: false },
          ],
        },
      ],
      stdout: 'Status type: Active\n',
    },
    {
      step: 4,
      type: 'EXECUTION_COMPLETED',
      line: 15,
      methodName: 'main',
      className: 'SealedDemo',
      description: 'Sealed hierarchy execution completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x05E1',
          className: 'Active',
          fields: [
            { name: 'reason', type: 'String', value: '"User verified"', isReference: false },
          ],
        },
      ],
    },
  ],
};

/**
 * 13. Nested & Inner Classes (Enclosing Instance Pointer) Trace
 */
export const nestedClassTrace: ExecutionTrace = {
  id: 'trace-nested',
  programTitle: 'Nested & Inner Classes (Enclosing Instance Pointer)',
  sourceCode: `public class OuterEngine {
    int horsepower = 450;

    class Piston {
        void fire() {
            System.out.println("Firing in " + horsepower + " HP engine");
        }
    }

    public static void main(String[] args) {
        OuterEngine engine = new OuterEngine();
        OuterEngine.Piston piston = engine.new Piston();
        piston.fire();
    }
}`,
  totalSteps: 5,
  durationMs: 12.6,
  stdoutAggregate: 'Firing in 450 HP engine\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 11,
      methodName: 'main',
      className: 'OuterEngine',
      description: 'Entering main(). Preparing to allocate enclosing OuterEngine instance.',
      stackFrames: [
        {
          frameId: 'frame-nested-main',
          methodName: 'main(args)',
          className: 'OuterEngine',
          line: 11,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 12,
      methodName: 'main',
      className: 'OuterEngine',
      description: 'Allocating OuterEngine at @0x06A1 with horsepower=450.',
      stackFrames: [
        {
          frameId: 'frame-nested-main',
          methodName: 'main(args)',
          className: 'OuterEngine',
          line: 12,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'engine', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x06A1',
          className: 'OuterEngine',
          fields: [
            { name: 'horsepower', type: 'int', value: 450, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'OBJECT_ALLOCATED',
      line: 13,
      methodName: 'main',
      className: 'OuterEngine',
      description: 'Allocating inner class Piston at @0x06A2 with synthetic pointer this$0 pointing to enclosing OuterEngine @0x06A1.',
      stackFrames: [
        {
          frameId: 'frame-nested-main',
          methodName: 'main(args)',
          className: 'OuterEngine',
          line: 13,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'engine', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
            { name: 'piston', type: 'OuterEngine.Piston', value: 'ref @0x06A2', isReference: true, targetAddress: '@0x06A2' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x06A1',
          className: 'OuterEngine',
          fields: [
            { name: 'horsepower', type: 'int', value: 450, isReference: false },
          ],
        },
        {
          address: '@0x06A2',
          className: 'OuterEngine.Piston',
          fields: [
            { name: 'this$0', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FRAME_PUSH',
      line: 14,
      methodName: 'fire',
      className: 'OuterEngine.Piston',
      description: 'Invoking piston.fire(). Inner method accesses enclosing horsepower through synthetic this$0 pointer.',
      stackFrames: [
        {
          frameId: 'frame-nested-fire',
          methodName: 'fire()',
          className: 'OuterEngine.Piston',
          line: 6,
          localVariables: [
            { name: 'this', type: 'OuterEngine.Piston', value: 'ref @0x06A2', isReference: true, targetAddress: '@0x06A2' },
          ],
        },
        {
          frameId: 'frame-nested-main',
          methodName: 'main(args)',
          className: 'OuterEngine',
          line: 14,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'engine', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
            { name: 'piston', type: 'OuterEngine.Piston', value: 'ref @0x06A2', isReference: true, targetAddress: '@0x06A2' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x06A1',
          className: 'OuterEngine',
          fields: [
            { name: 'horsepower', type: 'int', value: 450, isReference: false },
          ],
        },
        {
          address: '@0x06A2',
          className: 'OuterEngine.Piston',
          fields: [
            { name: 'this$0', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
          ],
        },
      ],
      stdout: 'Firing in 450 HP engine\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 15,
      methodName: 'main',
      className: 'OuterEngine',
      description: 'Inner class execution completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x06A1',
          className: 'OuterEngine',
          fields: [
            { name: 'horsepower', type: 'int', value: 450, isReference: false },
          ],
        },
        {
          address: '@0x06A2',
          className: 'OuterEngine.Piston',
          fields: [
            { name: 'this$0', type: 'OuterEngine', value: 'ref @0x06A1', isReference: true, targetAddress: '@0x06A1' },
          ],
        },
      ],
    },
  ],
};

/**
 * 14. Arrays & Reference Indexing Trace
 */
export const arraysTrace: ExecutionTrace = {
  id: 'trace-arrays',
  programTitle: 'Arrays & Reference Indexing (Heap Arrays & Elements)',
  sourceCode: `public class ArrayMechanics {
    public static void main(String[] args) {
        int[] numbers = new int[3];
        numbers[0] = 42;
        numbers[1] = 84;
        System.out.println("numbers[0]=" + numbers[0]);
    }
}`,
  totalSteps: 5,
  durationMs: 9.3,
  stdoutAggregate: 'numbers[0]=42\n',
  events: [
    {
      step: 1,
      type: 'STEP_ENTER',
      line: 2,
      methodName: 'main',
      className: 'ArrayMechanics',
      description: 'Entering main(). Preparing to allocate primitive int[] array on JVM Eden Heap.',
      stackFrames: [
        {
          frameId: 'frame-arr-main',
          methodName: 'main(args)',
          className: 'ArrayMechanics',
          line: 2,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
          ],
        },
      ],
      heapObjects: [],
    },
    {
      step: 2,
      type: 'OBJECT_ALLOCATED',
      line: 3,
      methodName: 'main',
      className: 'ArrayMechanics',
      description: 'Allocating int[3] array at @0x07B1 with default zeroed values [0, 0, 0]. Reference numbers stored in stack.',
      stackFrames: [
        {
          frameId: 'frame-arr-main',
          methodName: 'main(args)',
          className: 'ArrayMechanics',
          line: 3,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'numbers', type: 'int[]', value: 'ref @0x07B1', isReference: true, targetAddress: '@0x07B1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x07B1',
          className: 'int[]',
          fields: [
            { name: '[0]', type: 'int', value: 0, isReference: false },
            { name: '[1]', type: 'int', value: 0, isReference: false },
            { name: '[2]', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 3,
      type: 'FIELD_MUTATED',
      line: 4,
      methodName: 'main',
      className: 'ArrayMechanics',
      description: 'Mutating element numbers[0] = 42 in heap array @0x07B1.',
      stackFrames: [
        {
          frameId: 'frame-arr-main',
          methodName: 'main(args)',
          className: 'ArrayMechanics',
          line: 4,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'numbers', type: 'int[]', value: 'ref @0x07B1', isReference: true, targetAddress: '@0x07B1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x07B1',
          className: 'int[]',
          fields: [
            { name: '[0]', type: 'int', value: 42, isReference: false },
            { name: '[1]', type: 'int', value: 0, isReference: false },
            { name: '[2]', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 4,
      type: 'FIELD_MUTATED',
      line: 5,
      methodName: 'main',
      className: 'ArrayMechanics',
      description: 'Mutating element numbers[1] = 84 in heap array @0x07B1.',
      stackFrames: [
        {
          frameId: 'frame-arr-main',
          methodName: 'main(args)',
          className: 'ArrayMechanics',
          line: 5,
          localVariables: [
            { name: 'args', type: 'String[]', value: 'ref @0x0001', isReference: true },
            { name: 'numbers', type: 'int[]', value: 'ref @0x07B1', isReference: true, targetAddress: '@0x07B1' },
          ],
        },
      ],
      heapObjects: [
        {
          address: '@0x07B1',
          className: 'int[]',
          fields: [
            { name: '[0]', type: 'int', value: 42, isReference: false },
            { name: '[1]', type: 'int', value: 84, isReference: false },
            { name: '[2]', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
      stdout: 'numbers[0]=42\n',
    },
    {
      step: 5,
      type: 'EXECUTION_COMPLETED',
      line: 6,
      methodName: 'main',
      className: 'ArrayMechanics',
      description: 'Array operations completed.',
      stackFrames: [],
      heapObjects: [
        {
          address: '@0x07B1',
          className: 'int[]',
          fields: [
            { name: '[0]', type: 'int', value: 42, isReference: false },
            { name: '[1]', type: 'int', value: 84, isReference: false },
            { name: '[2]', type: 'int', value: 0, isReference: false },
          ],
        },
      ],
    },
  ],
};

export const allSampleTraces: ExecutionTrace[] = [
  bankAccountTrace,
  shapeHierarchyTrace,
  compositionTrace,
  recordPatternTrace,
  inheritanceTrace,
  constructorTrace,
  exceptionTrace,
  variablesTrace,
  methodsTrace,
  classesObjectsTrace,
  interfacesTrace,
  sealedHierarchyTrace,
  nestedClassTrace,
  arraysTrace,
];

