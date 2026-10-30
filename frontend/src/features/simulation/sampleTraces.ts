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

export const allSampleTraces: ExecutionTrace[] = [
  bankAccountTrace,
  shapeHierarchyTrace,
];
