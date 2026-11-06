const fs = require('fs');
const path = require('path');

// Helper to assemble lessons
const lessons = {};

function addLesson(data) {
  lessons[data.id] = data;
}

// -------------------------------------------------------------
// 1. vars-intro
// -------------------------------------------------------------
addLesson({
  id: 'vars-intro',
  slug: 'vars-intro',
  track: 'java',
  moduleNumber: '04',
  moduleTitle: 'Variables and Data Types',
  topicTitle: 'Variable Fundamentals',
  title: 'What is a Variable?',
  subtitle: 'Named memory storage locations holding state during program execution',
  difficulty: 'Beginner',
  readingTime: '5 min read',
  prerequisites: ['Java Syntax & Structure'],
  objectives: [
    'Define what a variable represents in computer memory.',
    'Distinguish between variable identifier, type, and assigned value.',
    'Explain how variables are referenced in Java 21.'
  ],
  whatIs: {
    beginner: 'Think of a variable as a labeled storage box in computer memory. You choose a label (the variable name), specify what kind of item can fit inside (the data type), and place a value inside the box.',
    technical: 'In Java, a variable is a symbolic binding between an identifier and an allocated memory address. In Java 21, variables are statically and strongly typed, meaning the compiler verifies type safety before bytecode generation.',
    terminology: [
      { term: 'Identifier', def: 'The programmer-chosen name used to reference the memory location.' },
      { term: 'Data Type', def: 'The specification of what range of values and operations are legal for this variable.' },
      { term: 'Value', def: 'The binary data currently stored at the referenced memory location.' }
    ],
    exampleSnippet: 'int score = 100;\nSystem.out.println("Score: " + score);'
  },
  whyNeeded: {
    problemSolved: 'Without variables, programs could only compute static hardcoded values and could never remember user input, transaction amounts, or intermediate calculations.',
    whyJavaProvidesIt: 'Variables provide abstraction over raw hardware RAM addresses, allowing human-readable identifiers to manipulate memory safely.',
    withoutIt: 'Every calculation would have to be hardcoded, making dynamic software impossible.',
    whenToUse: 'Whenever data needs to be remembered, updated, or passed between methods.',
    whenNotToUse: 'For immutable fixed values that never change across executions, prefer static final constants.'
  },
  howItWorks: {
    steps: [
      { stepNum: 1, headline: 'Declaration Phase', whatHappens: 'The compiler registers the variable name and allocates stack slots.', jvmInternals: 'A local variable table entry is created in the method bytecode attribute.', studentObservation: 'The variable name becomes available in scope.' },
      { stepNum: 2, headline: 'Initialization Phase', whatHappens: 'The initial value is loaded onto the operand stack and stored into the slot.', jvmInternals: 'Bytecode instructions like bipush/istore write raw bits to the local frame.', studentObservation: 'The variable now holds a defined value and can be read.' },
      { stepNum: 3, headline: 'Read / Update Phase', whatHappens: 'Future statements read or replace the bits in that slot.', jvmInternals: 'iload pushes the stored value to the operand stack for computations.', studentObservation: 'The variable reflects changes immediately.' }
    ]
  },
  classifications: {
    tableHeaders: ['Variable Classification', 'Memory Location', 'Default Value', 'Lifetime'],
    tableRows: [
      ['Local Variable', 'Stack Frame Slot', 'None (Must initialize)', 'Method or block execution'],
      ['Instance Field', 'Heap Object Memory', 'Zero / null / false', 'While object is reachable'],
      ['Static Class Variable', 'Metaspace / Class Object', 'Zero / null / false', 'Until class is unloaded'],
      ['Method Parameter', 'Stack Frame Slot', 'Caller provided argument', 'Method execution']
    ]
  },
  syntaxAndRules: {
    syntaxPattern: 'DataType identifier = initialValue;',
    correctCode: 'int userAge = 25;\nString username = "Ada";',
    incorrectCode: 'userAge = 25; // Error: Missing type specifier\nint 2ndUser = 30; // Error: Identifier cannot start with digit',
    compilerError: 'cannot find symbol: variable userAge',
    rules: [
      'Identifiers must start with a letter (A-Z, a-z), underscore (_), or currency symbol ($).',
      'Java keywords (e.g. class, public, int, return) cannot be used as variable names.',
      'Variable names are strictly case-sensitive: score and Score are two distinct variables.'
    ]
  },
  conceptTree: {
    id: 'vars-root',
    label: 'Java Variables',
    children: [
      { id: 'vars-types', label: 'Type Classification', children: [{ id: 'vars-primitive', label: '8 Primitives (Stack)', targetLessonId: 'vars-primitive-vs-reference' }, { id: 'vars-ref', label: 'Reference Types (Heap)', targetLessonId: 'vars-null-aliasing' }] },
      { id: 'vars-scope-branch', label: 'Lifetime & Scope', children: [{ id: 'vars-scope-node', label: 'Lexical Scope', targetLessonId: 'vars-scope' }, { id: 'vars-lifetime-node', label: 'Stack Frame Lifetime', targetLessonId: 'vars-lifetime' }] }
    ]
  },
  diagramConfig: {
    type: 'stack-heap',
    title: 'Variable Allocation in JVM Memory',
    subtitle: 'Comparing local primitives stored in Stack frames vs object references pointing to Heap'
  },
  codeExamples: {
    beginner: {
      code: 'public class VariableBasics {\n    public static void main(String[] args) {\n        int count = 5;\n        System.out.println("Initial count: " + count);\n        count = count + 1;\n        System.out.println("Updated count: " + count);\n    }\n}',
      output: 'Initial count: 5\nUpdated count: 6',
      explanation: 'Demonstrates declaring a 32-bit int variable count, printing its state, and incrementing it.'
    },
    intermediate: {
      code: 'public class MultiVariableDemo {\n    public static void main(String[] args) {\n        int width = 10, height = 20;\n        int area = width * height;\n        System.out.println("Dimensions: " + width + "x" + height);\n        System.out.println("Area: " + area);\n    }\n}',
      output: 'Dimensions: 10x20\nArea: 200',
      explanation: 'Shows multiple local variables interacting in an arithmetic expression.'
    },
    advanced: {
      code: 'public class VariableLifecycle {\n    public static void main(String[] args) {\n        var message = "Java 21 Modern Type Inference";\n        int[] numbers = {10, 20, 30};\n        System.out.println(message + " - Length: " + numbers.length);\n    }\n}',
      output: 'Java 21 Modern Type Inference - Length: 3',
      explanation: 'Uses Java modern var syntax for inferred local variables alongside array reference allocation.'
    }
  },
  visualizerSteps: [
    { step: 1, line: 3, codeSnippet: 'int count = 5;', explanation: 'JVM allocates slot 1 in the main() stack frame and stores integer 5.', stackVariables: [{ name: 'count', type: 'int', value: '5', isHighlighted: true }] },
    { step: 2, line: 5, codeSnippet: 'count = count + 1;', explanation: 'Reads 5, adds 1 on the operand stack, and writes 6 back into slot 1.', stackVariables: [{ name: 'count', type: 'int', value: '6', isHighlighted: true }], consoleOutput: 'Initial count: 5' }
  ],
  commonMistakes: [
    {
      headline: 'Using a local variable before initializing it',
      incorrectSnippet: 'int score;\nSystem.out.println(score); // Compiler Error',
      errorMessage: 'variable score might not have been initialized',
      explanation: 'Unlike instance fields which get zero-initialized, local variables in Java MUST be explicitly assigned before being read.',
      correctedSnippet: 'int score = 0;\nSystem.out.println(score); // Prints 0',
      whyCorrectionWorks: 'Assigning a default value (0) guarantees definite assignment analysis succeeds.'
    }
  ],
  realWorldApplications: [
    { title: 'High-Frequency Financial Ledger', description: 'Variables track live exchange rates, transaction counts, and balance deltas with microsecond latency.' }
  ],
  practice: {
    quiz: [
      {
        id: 'q1',
        question: 'What is the default value of an uninitialized local variable in Java?',
        options: ['0', 'null', 'undefined', 'There is no default; code fails to compile'],
        correctOptionIndex: 3,
        explanation: 'Java enforces definite assignment: local variables have NO default value and cause a compiler error if read before assignment.',
        hint: 'Remember Java static safety vs instance field defaults.'
      }
    ],
    codingPrompt: {
      title: 'Declare and Swap Two Variables',
      description: 'Write Java code to swap the values of two integer variables a and b without losing data.',
      starterCode: 'int a = 5;\nint b = 10;\n// Swap their values here\nSystem.out.println(a + ", " + b);',
      hints: ['Use a temporary third variable temp = a;'],
      solutionCode: 'int a = 5;\nint b = 10;\nint temp = a;\na = b;\nb = temp;\nSystem.out.println(a + ", " + b); // 10, 5'
    }
  },
  relatedConcepts: [
    { id: 'vars-declaration', title: 'Variable Declaration Mechanics', relationship: 'next' },
    { id: 'vars-primitive-vs-reference', title: 'Primitive vs Reference Types', relationship: 'related' }
  ],
  references: [
    { type: 'w3schools', title: 'Java Variables (W3Schools)', url: 'https://www.w3schools.com/java/java_variables.asp', sourceLabel: 'W3Schools', description: 'Beginner syntax and examples for declaring variables in Java.' },
    { type: 'oracle', title: 'Variables (Oracle Java Tutorials)', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html', sourceLabel: 'Oracle Docs', description: 'Official Java Language Specification breakdown of variable types and scopes.' },
    { type: 'youtube', title: 'Java Variables Explained (Programming with Mosh)', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34', sourceLabel: 'YouTube', description: 'Clear video walkthrough explaining variable declaration, types, and memory storage in Java.' }
  ]
});

console.log("Lesson 1 defined");

