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
      line: 18,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Entering main(String[] args). Metaspace initialized.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 18,
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
      line: 19,
      methodName: 'main',
      className: 'BankAccount',
      description: 'new BankAccount(...) allocates 32 bytes in Eden Space.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 19,
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
      description: 'Entering constructor BankAccount("Alice", 500.0).',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 19,
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
      line: 19,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Constructor completed. Reference @0x2F1A assigned to local variable `account`.',
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
            { name: 'balance', type: 'double', value: 500.0, isReference: false },
          ],
        },
      ],
    },
    {
      step: 5,
      type: 'FRAME_PUSH',
      line: 12,
      methodName: 'deposit',
      className: 'BankAccount',
      description: 'Calling account.deposit(250.0). Pushing deposit() frame.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 20,
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
      step: 6,
      type: 'FIELD_MUTATED',
      line: 21,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Heap state updated: @0x2F1A.balance mutated from 500.0 to 750.0.',
      stackFrames: [
        {
          frameId: 'frame-main-1',
          methodName: 'main(args)',
          className: 'BankAccount',
          line: 21,
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
    {
      step: 7,
      type: 'EXECUTION_COMPLETED',
      line: 22,
      methodName: 'main',
      className: 'BankAccount',
      description: 'Program execution completed normally. JVM process exiting.',
      stackFrames: [],
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
  ],
};

/**
 * 2. Polymorphic Dynamic Method Dispatch Trace
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

export const allSampleTraces: ExecutionTrace[] = [
  bankAccountTrace,
  shapeHierarchyTrace,
  compositionTrace,
  recordPatternTrace,
];

