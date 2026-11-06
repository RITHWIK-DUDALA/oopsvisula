import { ConceptTreeNode } from '../components/ConceptTree';
import { DiagramType } from '../components/TechnicalDiagram';
import { VisualizerStep } from '../components/InlineConceptVisualizer';
import { CommonMistakeItem } from '../components/CommonMistakesCard';
import { PracticeChallengeItem, CodingPromptItem } from '../components/PracticeChallengeWidget';
import { ResourceItem } from '../components/VerifiedResourceCard';

export interface CanonicalLesson {
  id: string;
  slug: string;
  track: 'java' | 'oop';
  moduleNumber: string;
  moduleTitle: string;
  lessonNumber?: number;
  topicTitle: string;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Core' | 'Intermediate' | 'Advanced';
  readingTime: string;
  prerequisites: string[];
  objectives: string[];
  whatIs: {
    beginner: string;
    technical: string;
    terminology: { term: string; def: string }[];
    exampleSnippet: string;
  };
  whyNeeded: {
    problemSolved: string;
    whyJavaProvidesIt: string;
    withoutIt: string;
    whenToUse: string;
    whenNotToUse: string;
  };
  howItWorks: {
    steps: {
      stepNum: number;
      headline: string;
      whatHappens: string;
      jvmInternals: string;
      studentObservation: string;
    }[];
  };
  classifications?: {
    tableHeaders: string[];
    tableRows: string[][];
  };
  syntaxAndRules: {
    syntaxPattern: string;
    correctCode: string;
    incorrectCode: string;
    compilerError: string;
    rules: string[];
  };
  conceptTree: ConceptTreeNode;
  diagramConfig?: {
    type: DiagramType;
    title: string;
    subtitle?: string;
    config?: Record<string, any>;
  };
  codeExamples: {
    beginner: { code: string; output: string; explanation: string };
    intermediate: { code: string; output: string; explanation: string };
    advanced: { code: string; output: string; explanation: string };
  };
  visualizerSteps: VisualizerStep[];
  commonMistakes: CommonMistakeItem[];
  realWorldApplications: {
    title: string;
    description: string;
  }[];
  practice: {
    quiz: PracticeChallengeItem[];
    codingPrompt?: CodingPromptItem;
  };
  relatedConcepts: {
    id: string;
    title: string;
    relationship: 'prerequisite' | 'next' | 'related';
  }[];
  references: ResourceItem[];
}

export const MODULE_04_LESSONS: Record<string, CanonicalLesson> = {
  "vars-intro": {
    "id": "vars-intro",
    "slug": "vars-intro",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "What is a Variable?",
    "subtitle": "Named memory storage locations holding state during program execution",
    "difficulty": "Beginner",
    "readingTime": "5 min read",
    "prerequisites": [
      "Java Syntax & Structure"
    ],
    "objectives": [
      "Define what a variable represents in computer memory.",
      "Distinguish between variable identifier, type, and assigned value.",
      "Explain how variables are referenced in Java 21."
    ],
    "whatIs": {
      "beginner": "A variable is like a labeled container in memory holding a specific kind of data that can be inspected and updated as your program runs.",
      "technical": "In Java, a variable is a named storage location associated with an explicit data type. The compiler enforces static type safety, allocating stack slots for primitives and heap references for objects.",
      "terminology": [
        {
          "term": "Identifier",
          "def": "The name used in code to reference the variable."
        },
        {
          "term": "Data Type",
          "def": "Defines the set of values and allowable operations."
        },
        {
          "term": "Value",
          "def": "The actual bit pattern stored in the allocated memory slot."
        }
      ],
      "exampleSnippet": "int count = 10;\nSystem.out.println(\"Count: \" + count);"
    },
    "whyNeeded": {
      "problemSolved": "Programs need to store, remember, and dynamically calculate state over time rather than being hardcoded to fixed values.",
      "whyJavaProvidesIt": "Variables provide an abstraction over physical RAM addresses, ensuring memory safety and type checking.",
      "withoutIt": "Software would be completely static and unable to process varying inputs.",
      "whenToUse": "Whenever values must be computed, modified, or passed across methods.",
      "whenNotToUse": "For compile-time immutable constants, use static final."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Memory Allocation",
          "whatHappens": "Compiler reserves slot in the local variable array.",
          "jvmInternals": "JVM assigns an index in the method local frame.",
          "studentObservation": "Variable name is registered."
        },
        {
          "stepNum": 2,
          "headline": "Value Storage",
          "whatHappens": "Initial value written to memory slot.",
          "jvmInternals": "bipush/istore bytecodes execute.",
          "studentObservation": "Variable holds its initial value."
        },
        {
          "stepNum": 3,
          "headline": "Read / Mutate",
          "whatHappens": "Future expressions read or update the slot.",
          "jvmInternals": "iload/istore instructions operate on operand stack.",
          "studentObservation": "State changes dynamically."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Kind",
        "Scope",
        "Location",
        "Default Value"
      ],
      "tableRows": [
        [
          "Local Variable",
          "Block / Method",
          "Stack Frame Slot",
          "None (Must assign)"
        ],
        [
          "Instance Field",
          "Object Instance",
          "Heap Object",
          "0 / false / null"
        ],
        [
          "Static Class Variable",
          "Class Level",
          "Metaspace / Class",
          "0 / false / null"
        ],
        [
          "Parameter",
          "Method Body",
          "Stack Frame Slot",
          "Supplied by Caller"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "DataType identifier = value;",
      "correctCode": "int score = 100;\nString name = \"Java\";",
      "incorrectCode": "score = 100; // Error: Missing type specifier",
      "compilerError": "cannot find symbol: variable score",
      "rules": [
        "Must declare with a valid Java type or var.",
        "Identifiers cannot be Java reserved keywords.",
        "Names are strictly case-sensitive."
      ]
    },
    "conceptTree": {
      "id": "vars-root",
      "label": "Variables",
      "children": [
        {
          "id": "vars-decl",
          "label": "Declaration & Init",
          "targetLessonId": "vars-declaration"
        },
        {
          "id": "vars-types-branch",
          "label": "Primitive vs Reference",
          "targetLessonId": "vars-primitive-vs-reference"
        },
        {
          "id": "vars-scope-branch",
          "label": "Scope & Lifetime",
          "targetLessonId": "vars-scope"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Variable Memory Allocation",
      "subtitle": "Primitives in Stack vs References on Heap"
    },
    "codeExamples": {
      "beginner": {
        "code": "public class VarDemo {\n    public static void main(String[] args) {\n        int age = 21;\n        System.out.println(\"Age: \" + age);\n    }\n}",
        "output": "Age: 21",
        "explanation": "Declares an integer age and outputs it."
      },
      "intermediate": {
        "code": "public class VarCalc {\n    public static void main(String[] args) {\n        int length = 8, width = 5;\n        System.out.println(\"Area: \" + (length * width));\n    }\n}",
        "output": "Area: 40",
        "explanation": "Calculates rectangle area using two integer variables."
      },
      "advanced": {
        "code": "public class ModernVar {\n    public static void main(String[] args) {\n        var title = \"Java 21 LTS\";\n        System.out.println(title);\n    }\n}",
        "output": "Java 21 LTS",
        "explanation": "Java 21 local variable type inference with var."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int age = 21;",
        "explanation": "Allocates slot for variable 'age' in stack frame.",
        "stackVariables": [
          {
            "name": "age",
            "type": "int",
            "value": "21",
            "isHighlighted": true
          }
        ]
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "System.out.println(\"Age: \" + age);",
        "explanation": "Reads 'age' and writes to standard output.",
        "stackVariables": [
          {
            "name": "age",
            "type": "int",
            "value": "21",
            "isHighlighted": false
          }
        ],
        "consoleOutput": "Age: 21"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Reading uninitialized local variable",
        "incorrectSnippet": "int balance;\nSystem.out.println(balance);",
        "errorMessage": "variable balance might not have been initialized",
        "explanation": "Local variables have no default values in Java.",
        "correctedSnippet": "int balance = 0;\nSystem.out.println(balance);",
        "whyCorrectionWorks": "Explicit assignment satisfies definite assignment."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Financial Ledger",
        "description": "Balances and fees stored as variables during accounting ledger processing."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q1",
          "question": "Where are local primitive variables stored during execution?",
          "options": [
            "On the Heap",
            "In the Stack Frame",
            "In Metaspace",
            "In Code Segment"
          ],
          "correctOptionIndex": 1,
          "explanation": "Local variables live directly inside the active thread's Stack Frame."
        }
      ],
      "codingPrompt": {
        "title": "Variable Swap",
        "description": "Swap variables a and b using a temporary variable.",
        "starterCode": "int a = 1, b = 2;\n// swap here\nSystem.out.println(a + \", \" + b);",
        "hints": [
          "int temp = a; a = b; b = temp;"
        ],
        "solutionCode": "int a = 1, b = 2;\nint temp = a;\na = b;\nb = temp;\nSystem.out.println(a + \", \" + b);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-declaration",
        "title": "Variable Declaration",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "w3schools",
        "title": "Java Variables (W3Schools)",
        "url": "https://www.w3schools.com/java/java_variables.asp",
        "sourceLabel": "W3Schools",
        "description": "Beginner syntax and examples for declaring variables in Java."
      },
      {
        "type": "oracle",
        "title": "Variables (Oracle Documentation)",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Java Language Specification breakdown of variables."
      },
      {
        "type": "youtube",
        "title": "Java Variables Tutorial (Programming with Mosh)",
        "url": "https://www.youtube.com/watch?v=eIrMbAQSU34",
        "sourceLabel": "YouTube",
        "description": "Visual overview of variable declaration, memory storage, and naming conventions."
      }
    ]
  },
  "vars-declaration": {
    "id": "vars-declaration",
    "slug": "vars-declaration",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "Variable Declaration Mechanics",
    "subtitle": "Instructing the compiler to reserve memory with an explicit type and identifier",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-intro"
    ],
    "objectives": [
      "Master syntax of declaring variables.",
      "Understand symbol table type binding.",
      "Apply lowerCamelCase naming."
    ],
    "whatIs": {
      "beginner": "Declaration is telling Java: I need a storage box named X, and it must hold type Y.",
      "technical": "Creates a compile-time binding between an identifier and static type in the local variable table.",
      "terminology": [
        {
          "term": "Declaration",
          "def": "Specifying type and name without necessarily assigning a value."
        }
      ],
      "exampleSnippet": "int maxUsers;\ndouble interestRate;\nboolean isActive;"
    },
    "whyNeeded": {
      "problemSolved": "Java statically allocates exact bytes and enforces type safety.",
      "whyJavaProvidesIt": "Prevents runtime type mismatch bugs and optimizes memory.",
      "withoutIt": "Code would need expensive dynamic type checking at runtime.",
      "whenToUse": "Whenever introducing a new variable into scope.",
      "whenNotToUse": "Do not re-declare with the same name in the same scope."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Lexical Parsing",
          "whatHappens": "Compiler tokenizes type and identifier.",
          "jvmInternals": "AST node VariableDeclarationExpr created.",
          "studentObservation": "Variable recognized."
        },
        {
          "stepNum": 2,
          "headline": "Symbol Registration",
          "whatHappens": "Enters scope table.",
          "jvmInternals": "Guards against duplicate identifier collisions.",
          "studentObservation": "Ready for assignment."
        }
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "DataType identifier;",
      "correctCode": "int width, height;\ndouble accountBalance;",
      "incorrectCode": "int width, double height; // Syntax error",
      "compilerError": "expected ;",
      "rules": [
        "Use lowerCamelCase.",
        "Cannot redeclare same variable in same block."
      ]
    },
    "conceptTree": {
      "id": "decl-root",
      "label": "Declaration",
      "children": [
        {
          "id": "decl-single",
          "label": "Single: int x;"
        },
        {
          "id": "decl-multi",
          "label": "Multiple: int x, y;"
        },
        {
          "id": "decl-infer",
          "label": "Inferred: var z = 5;"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Declaration Stack Allocation",
      "subtitle": "Slot reservation in local variable table"
    },
    "codeExamples": {
      "beginner": {
        "code": "public class DeclDemo {\n    public static void main(String[] args) {\n        int speedLimit;\n        speedLimit = 65;\n        System.out.println(\"Limit: \" + speedLimit);\n    }\n}",
        "output": "Limit: 65",
        "explanation": "Declares speedLimit first, then assigns 65."
      },
      "intermediate": {
        "code": "public class MultiDecl {\n    public static void main(String[] args) {\n        int x = 1, y = 2;\n        System.out.println(x + y);\n    }\n}",
        "output": "3",
        "explanation": "Multiple declarations on one line."
      },
      "advanced": {
        "code": "public class InferredDecl {\n    public static void main(String[] args) {\n        var list = java.util.List.of(1, 2, 3);\n        System.out.println(list.size());\n    }\n}",
        "output": "3",
        "explanation": "Local variable type inference with var."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int speedLimit;",
        "explanation": "Stack slot reserved for speedLimit.",
        "stackVariables": [
          {
            "name": "speedLimit",
            "type": "int",
            "value": "<unassigned>",
            "isHighlighted": true
          }
        ]
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "speedLimit = 65;",
        "explanation": "Value 65 written to slot.",
        "stackVariables": [
          {
            "name": "speedLimit",
            "type": "int",
            "value": "65",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      }
    ],
    "commonMistakes": [
      {
        "headline": "Duplicate declaration",
        "incorrectSnippet": "int x = 10;\nint x = 20;",
        "errorMessage": "variable x is already defined",
        "explanation": "Variables cannot be re-declared in the same block.",
        "correctedSnippet": "int x = 10;\nx = 20;",
        "whyCorrectionWorks": "Reassigns existing variable."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Sensor Buffering",
        "description": "Sensors declare telemetry buffers prior to stream polling."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_decl_0",
          "question": "Which identifier is illegal in Java?",
          "options": [
            "_score",
            "$amount",
            "2users",
            "totalCount"
          ],
          "correctOptionIndex": 2,
          "explanation": "Java identifiers cannot begin with a numeric digit."
        }
      ]
    },
    "relatedConcepts": [
      {
        "id": "vars-initialization",
        "title": "Variable Initialization",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 14.4: Local Variable Declarations",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.4",
        "sourceLabel": "Oracle JLS",
        "description": "Java 21 language specification."
      }
    ]
  },
  "vars-initialization": {
    "id": "vars-initialization",
    "slug": "vars-initialization",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "Variable Initialization & Memory Allocation",
    "subtitle": "Assigning initial values and satisfying compiler definite assignment analysis",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-declaration"
    ],
    "objectives": [
      "Understand definite assignment rules.",
      "Compare local initialization vs field default values.",
      "Trace memory allocation timing."
    ],
    "whatIs": {
      "beginner": "Initialization is placing the very first value into your variable's storage container so it is ready to use.",
      "technical": "Initialization writes the initial bit pattern into the reserved memory location. In Java 21, the compiler enforces Definite Assignment before any read operation.",
      "terminology": [
        {
          "term": "Definite Assignment",
          "def": "Compile-time proof that every execution path assigns a value before reading."
        },
        {
          "term": "Default Value",
          "def": "The zero-like value automatically given to class fields (0, null, false)."
        }
      ],
      "exampleSnippet": "int balance = 1000;\nString greeting = \"Welcome\";"
    },
    "whyNeeded": {
      "problemSolved": "Prevents reading uninitialized garbage bits from memory, guaranteeing predictable program behavior.",
      "whyJavaProvidesIt": "Eliminates security vulnerabilities caused by uninitialized memory reading (a major issue in C/C++).",
      "withoutIt": "Variables would contain arbitrary leftover memory contents.",
      "whenToUse": "Initialize variables at the point of declaration or within the first controlling block.",
      "whenNotToUse": "Do not initialize with dummy values if immediately overwritten."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Value Evaluation",
          "whatHappens": "RHS expression is evaluated on the operand stack.",
          "jvmInternals": "Pushes evaluated result onto operand stack.",
          "studentObservation": "RHS calculated."
        },
        {
          "stepNum": 2,
          "headline": "Slot Write",
          "whatHappens": "istore or astore writes value to local variable slot.",
          "jvmInternals": "Local variable frame updated.",
          "studentObservation": "Variable now readable."
        }
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "DataType identifier = expression;",
      "correctCode": "int score = 50;\nboolean flag = true;",
      "incorrectCode": "int x;\nif (condition) x = 10;\nSystem.out.println(x); // Error: x might not be initialized",
      "compilerError": "variable x might not have been initialized",
      "rules": [
        "Local variables must be definitely assigned on all paths.",
        "Fields are automatically initialized to zero/null/false."
      ]
    },
    "conceptTree": {
      "id": "init-root",
      "label": "Initialization",
      "children": [
        {
          "id": "init-local",
          "label": "Local (Explicit Only)"
        },
        {
          "id": "init-field",
          "label": "Fields (Default Initialized)"
        },
        {
          "id": "init-lazy",
          "label": "Conditional Assignment"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Initialization Memory State",
      "subtitle": "Transitioning from unassigned to holding active bit values"
    },
    "codeExamples": {
      "beginner": {
        "code": "public class InitDemo {\n    public static void main(String[] args) {\n        int points = 100;\n        System.out.println(\"Points: \" + points);\n    }\n}",
        "output": "Points: 100",
        "explanation": "Initializes points with 100 at declaration."
      },
      "intermediate": {
        "code": "public class BranchInit {\n    public static void main(String[] args) {\n        int discount;\n        boolean isMember = true;\n        if (isMember) {\n            discount = 20;\n        } else {\n            discount = 0;\n        }\n        System.out.println(\"Discount: \" + discount + \"%\");\n    }\n}",
        "output": "Discount: 20%",
        "explanation": "Demonstrates definite assignment satisfied across all branch paths (if-else)."
      },
      "advanced": {
        "code": "public class FieldVsLocalInit {\n    static int globalCount; // default 0\n    public static void main(String[] args) {\n        int localCount = 5; // must be explicit\n        System.out.println(\"Global: \" + globalCount + \", Local: \" + localCount);\n    }\n}",
        "output": "Global: 0, Local: 5",
        "explanation": "Contrasts static field default initialization with local variable requirements."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int points = 100;",
        "explanation": "Initializes points slot to 100.",
        "stackVariables": [
          {
            "name": "points",
            "type": "int",
            "value": "100",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "System.out.println(\"Points: \" + points);",
        "explanation": "Reads initialized slot and prints.",
        "stackVariables": [
          {
            "name": "points",
            "type": "int",
            "value": "100",
            "isHighlighted": false
          }
        ],
        "consoleOutput": "Points: 100"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Missing else block in conditional initialization",
        "incorrectSnippet": "int val;\nif (ready) val = 1;\nSystem.out.println(val);",
        "errorMessage": "variable val might not have been initialized",
        "explanation": "If ready is false, val remains unassigned.",
        "correctedSnippet": "int val = 0;\nif (ready) val = 1;\nSystem.out.println(val);",
        "whyCorrectionWorks": "Guarantees val has a value even when condition is false."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Cryptographic Nonce Generator",
        "description": "Ensures cryptographic keys and nonces are initialized with high-entropy bytes before cipher execution."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_init_0",
          "question": "Why does Java enforce definite assignment on local variables?",
          "options": [
            "To conserve stack memory",
            "To prevent reading uninitialized memory garbage",
            "To speed up compilation",
            "To enforce immutability"
          ],
          "correctOptionIndex": 1,
          "explanation": "Enforcing definite assignment prevents reading arbitrary residual bits from stack frames."
        }
      ]
    },
    "relatedConcepts": [
      {
        "id": "vars-declaration",
        "title": "Variable Declaration",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-assignment",
        "title": "Variable Assignment",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 16: Definite Assignment",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-16.html",
        "sourceLabel": "Oracle JLS",
        "description": "Formal Java specification on definite assignment."
      }
    ]
  },
  "vars-assignment": {
    "id": "vars-assignment",
    "slug": "vars-assignment",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "Variable Assignment & Reassignment",
    "subtitle": "Mutating variable state using simple and compound assignment operators",
    "difficulty": "Beginner",
    "readingTime": "5 min read",
    "prerequisites": [
      "vars-initialization"
    ],
    "objectives": [
      "Distinguish assignment from equality checking.",
      "Use compound assignment operators (+=, -=, *=).",
      "Trace value overwriting in memory."
    ],
    "whatIs": {
      "beginner": "Assignment is taking a new value and placing it into an existing variable box, overwriting whatever was there previously.",
      "technical": "The assignment operator (=) evaluates its RHS expression and writes the resulting bit pattern into the lvalue memory location. It returns the assigned value as an expression result.",
      "terminology": [
        {
          "term": "lvalue",
          "def": "The target memory location on the left side of =."
        },
        {
          "term": "rvalue",
          "def": "The value or expression on the right side of =."
        },
        {
          "term": "Compound Assignment",
          "def": "Operators like += that perform an operation and assign in one step."
        }
      ],
      "exampleSnippet": "int count = 10;\ncount = count + 5; // Reassignment\ncount += 5; // Compound assignment"
    },
    "whyNeeded": {
      "problemSolved": "State in a program must evolve as steps execute (e.g., counters incrementing, totals accumulating).",
      "whyJavaProvidesIt": "Allows mutation of allocated memory slots without re-declaring types.",
      "withoutIt": "Values could never change after initialization.",
      "whenToUse": "Whenever updating existing state.",
      "whenNotToUse": "Do not reassign final variables."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "RHS Evaluation",
          "whatHappens": "Right-hand side expression is computed.",
          "jvmInternals": "Result pushed to top of operand stack.",
          "studentObservation": "New value calculated."
        },
        {
          "stepNum": 2,
          "headline": "Slot Overwrite",
          "whatHappens": "Store instruction overwrites previous value.",
          "jvmInternals": "istore writes new 32-bit integer to the slot.",
          "studentObservation": "Variable holds new value."
        }
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "variableName = newExpression;",
      "correctCode": "int score = 0;\nscore = 100;\nscore += 20;",
      "incorrectCode": "100 = score; // Error: Left-hand side must be a variable",
      "compilerError": "unexpected type required: variable found: value",
      "rules": [
        "LHS must be a mutable variable.",
        "Type of RHS must be compatible with LHS type."
      ]
    },
    "conceptTree": {
      "id": "assign-root",
      "label": "Assignment",
      "children": [
        {
          "id": "assign-simple",
          "label": "Simple Assignment (=)"
        },
        {
          "id": "assign-compound",
          "label": "Compound (+=, -=, *=, /=)"
        },
        {
          "id": "assign-chain",
          "label": "Chained Assignment (a = b = c = 0)"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Memory Overwrite Mechanics",
      "subtitle": "Previous bits overwritten by incoming operand value"
    },
    "codeExamples": {
      "beginner": {
        "code": "public class AssignDemo {\n    public static void main(String[] args) {\n        int x = 10;\n        x = 25;\n        System.out.println(\"x = \" + x);\n    }\n}",
        "output": "x = 25",
        "explanation": "x starts at 10 and is overwritten with 25."
      },
      "intermediate": {
        "code": "public class CompoundDemo {\n    public static void main(String[] args) {\n        int total = 100;\n        total += 50; // total = total + 50\n        total *= 2;  // total = total * 2\n        System.out.println(\"Total: \" + total);\n    }\n}",
        "output": "Total: 300",
        "explanation": "Compound assignment operators update and assign compactly."
      },
      "advanced": {
        "code": "public class ImplicitCastCompound {\n    public static void main(String[] args) {\n        byte b = 10;\n        b += 5; // Valid: compound assignment includes implicit cast ((byte)(b + 5))\n        System.out.println(\"b = \" + b);\n    }\n}",
        "output": "b = 15",
        "explanation": "Compound assignment automatically casts the result back to the target type."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int x = 10;",
        "explanation": "x slot initialized to 10.",
        "stackVariables": [
          {
            "name": "x",
            "type": "int",
            "value": "10",
            "isHighlighted": true
          }
        ]
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "x = 25;",
        "explanation": "x slot overwritten with 25.",
        "stackVariables": [
          {
            "name": "x",
            "type": "int",
            "value": "25",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      }
    ],
    "commonMistakes": [
      {
        "headline": "Confusing assignment (=) with equality (==)",
        "incorrectSnippet": "int x = 5;\nif (x = 10) {} // Compile error in Java",
        "errorMessage": "incompatible types: int cannot be converted to boolean",
        "explanation": "= assigns values; == compares values.",
        "correctedSnippet": "if (x == 10) {}",
        "whyCorrectionWorks": "== returns a boolean condition suitable for if statements."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Shopping Cart Calculator",
        "description": "Subtotal is continuously reassigned as items and discounts are added."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_ass_0",
          "question": "What is the value of x after: int x = 5; x *= 2 + 3;",
          "options": [
            "13",
            "25",
            "10",
            "15"
          ],
          "correctOptionIndex": 1,
          "explanation": "RHS is fully evaluated first: 2 + 3 = 5, then x *= 5 yields 25."
        }
      ]
    },
    "relatedConcepts": [
      {
        "id": "vars-initialization",
        "title": "Variable Initialization",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-scope",
        "title": "Variable Scope",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 15.26: Assignment Operators",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.26",
        "sourceLabel": "Oracle JLS",
        "description": "Assignment operators specification in Java 21."
      }
    ]
  },
  "vars-scope": {
    "id": "vars-scope",
    "slug": "vars-scope",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "Variable Scope & Lexical Blocks",
    "subtitle": "Visibility boundaries and lifetime isolation dictated by curly braces { }",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-assignment"
    ],
    "objectives": [
      "Identify block, method, and class scopes.",
      "Understand variable shadowing rules.",
      "Prevent out-of-scope compiler errors."
    ],
    "whatIs": {
      "beginner": "Scope is the region of code where a variable is visible and accessible. A variable created inside curly braces { } ceases to exist once execution leaves those braces.",
      "technical": "Java uses static lexical scoping. The scope of a local variable declaration extends from its point of declaration to the end of the enclosing block.",
      "terminology": [
        {
          "term": "Block Scope",
          "def": "Variables declared inside { } are only visible within that block."
        },
        {
          "term": "Shadowing",
          "def": "A local variable having the same name as a field, temporarily hiding the field."
        }
      ],
      "exampleSnippet": "{\n    int blockVar = 42;\n    System.out.println(blockVar);\n}\n// blockVar is inaccessible here"
    },
    "whyNeeded": {
      "problemSolved": "Encapsulates variables so temporary counters or loop variables don't accidentally interfere with outer code.",
      "whyJavaProvidesIt": "Ensures modularity, avoids naming collisions, and enables rapid memory reclamation.",
      "withoutIt": "Every variable would be global, leading to massive state collision bugs.",
      "whenToUse": "Always declare variables in the narrowest possible scope.",
      "whenNotToUse": "Do not widen scope to method level if variable is only needed in one if block."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Enter Block",
          "whatHappens": "Execution enters a new block { }.",
          "jvmInternals": "Stack frame scope depth increases.",
          "studentObservation": "Block scope opens."
        },
        {
          "stepNum": 2,
          "headline": "Exit Block",
          "whatHappens": "Closing brace } reached.",
          "jvmInternals": "Local variable slots from that block can be reused.",
          "studentObservation": "Block variable inaccessible."
        }
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "{ DataType variable = value; }",
      "correctCode": "int outer = 1;\nif (true) {\n    int inner = 2;\n    System.out.println(outer + inner);\n}",
      "incorrectCode": "if (true) {\n    int temp = 5;\n}\nSystem.out.println(temp); // Error: cannot find symbol",
      "compilerError": "cannot find symbol: variable temp",
      "rules": [
        "Inner blocks can see variables declared in enclosing outer blocks.",
        "Outer blocks cannot see variables declared inside inner blocks.",
        "Java does NOT allow declaring a local variable with the same name as an outer local variable in an inner block."
      ]
    },
    "conceptTree": {
      "id": "scope-root",
      "label": "Variable Scopes",
      "children": [
        {
          "id": "scope-class",
          "label": "Class Scope (Fields)"
        },
        {
          "id": "scope-method",
          "label": "Method Scope (Parameters/Locals)"
        },
        {
          "id": "scope-block",
          "label": "Block Scope (Loops/Ifs)"
        }
      ]
    },
    "diagramConfig": {
      "type": "scope-blocks",
      "title": "Lexical Scope Nesting",
      "subtitle": "Visualizing how nested blocks inherit outer variables but isolate inner variables"
    },
    "codeExamples": {
      "beginner": {
        "code": "public class ScopeDemo {\n    public static void main(String[] args) {\n        int x = 10;\n        {\n            int y = 20;\n            System.out.println(\"x + y = \" + (x + y));\n        }\n        // y is not accessible here\n        System.out.println(\"x = \" + x);\n    }\n}",
        "output": "x + y = 30\nx = 10",
        "explanation": "Shows x accessible in inner block, but y inaccessible outside."
      },
      "intermediate": {
        "code": "public class LoopScope {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            int loopVal = i * 10;\n            System.out.print(loopVal + \" \");\n        }\n        // i and loopVal are out of scope here\n    }\n}",
        "output": "0 10 20 ",
        "explanation": "Demonstrates loop iteration variables isolated to loop body."
      },
      "advanced": {
        "code": "public class ShadowingDemo {\n    int value = 100; // Field\n    void print(int value) { // Parameter shadows field\n        System.out.println(\"Param: \" + value + \", Field: \" + this.value);\n    }\n    public static void main(String[] args) {\n        new ShadowingDemo().print(50);\n    }\n}",
        "output": "Param: 50, Field: 100",
        "explanation": "Resolves shadowing between method parameter and instance field using this keyword."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int x = 10;",
        "explanation": "x declared in outer method scope.",
        "stackVariables": [
          {
            "name": "x",
            "type": "int",
            "value": "10",
            "isHighlighted": true
          }
        ]
      },
      {
        "step": 2,
        "line": 5,
        "codeSnippet": "int y = 20;",
        "explanation": "y declared in inner block scope.",
        "stackVariables": [
          {
            "name": "x",
            "type": "int",
            "value": "10"
          },
          {
            "name": "y",
            "type": "int",
            "value": "20",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "x + y = 30"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Accessing loop variable outside for loop",
        "incorrectSnippet": "for (int i = 0; i < 5; i++) {}\nSystem.out.println(i);",
        "errorMessage": "cannot find symbol: variable i",
        "explanation": "i only exists within the for statement header and body.",
        "correctedSnippet": "int i;\nfor (i = 0; i < 5; i++) {}\nSystem.out.println(i);",
        "whyCorrectionWorks": "Declares i in the outer method scope before the loop."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Thread Isolation",
        "description": "Ensures method local variables are private to each invoking thread, guaranteeing thread safety without locking."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_sc_0",
          "question": "Can an inner block declare a local variable with the same name as an outer local variable in Java?",
          "options": [
            "Yes, always",
            "No, it causes a compiler error",
            "Only if the types differ",
            "Only inside a while loop"
          ],
          "correctOptionIndex": 1,
          "explanation": "Unlike C++, Java disallows local variable shadowing within nested blocks."
        }
      ]
    },
    "relatedConcepts": [
      {
        "id": "vars-assignment",
        "title": "Variable Assignment",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-lifetime",
        "title": "Variable Lifetime",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 6.3: Scope of a Declaration",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.3",
        "sourceLabel": "Oracle JLS",
        "description": "Lexical scope rules in Java 21."
      }
    ]
  },
  "vars-lifetime": {
    "id": "vars-lifetime",
    "slug": "vars-lifetime",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Variable Fundamentals",
    "title": "Variable Lifetime & Stack Allocation",
    "subtitle": "Allocation at method invocation and automatic destruction at return",
    "difficulty": "Core",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-scope"
    ],
    "objectives": [
      "Explain the difference between scope and lifetime.",
      "Trace stack frame push and pop operations.",
      "Understand memory reclaiming."
    ],
    "whatIs": {
      "beginner": "Lifetime is the actual duration of time that a variable exists in physical memory.",
      "technical": "The lifetime of a local variable is bounded by the activation of its enclosing stack frame.",
      "terminology": [
        {
          "term": "Stack Allocation",
          "def": "Memory allocated instantaneously on the thread call stack."
        },
        {
          "term": "Frame Popping",
          "def": "Complete destruction of all local variables when method returns."
        }
      ],
      "exampleSnippet": "void compute() {\n    int temp = 42; // Allocated on stack\n} // Instantly popped and reclaimed"
    },
    "whyNeeded": {
      "problemSolved": "Prevents manual free() calls and memory leaks for short-lived method data.",
      "whyJavaProvidesIt": "Provides automatic, zero-overhead memory reclamation for method execution.",
      "withoutIt": "Memory would leak unless programmers manually deallocated every local variable.",
      "whenToUse": "For all temporary computation state.",
      "whenNotToUse": "For state that must outlive method return (use Heap objects)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Method Call",
          "whatHappens": "Stack frame pushed with slots allocated.",
          "jvmInternals": "Thread stack grows.",
          "studentObservation": "Frame created."
        },
        {
          "stepNum": 2,
          "headline": "Method Return",
          "whatHappens": "Frame popped in O(1) time.",
          "jvmInternals": "Thread stack pointer decrements.",
          "studentObservation": "All locals destroyed."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Type",
        "Allocation Event",
        "Deallocation Event"
      ],
      "tableRows": [
        [
          "Local Variable",
          "Method call (Frame push)",
          "Method return (Frame pop)"
        ],
        [
          "Instance Field",
          "new operator (Heap allocation)",
          "Garbage Collection (Reachability)"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "returnType methodName() { ... }",
      "correctCode": "void run() { int x = 1; }",
      "incorrectCode": "int get() { int x = 1; return &x; } // Illegal in Java",
      "compilerError": "illegal syntax",
      "rules": [
        "Local variables cannot be passed by memory reference out of their frame."
      ]
    },
    "conceptTree": {
      "id": "life-root",
      "label": "Variable Lifetime",
      "children": [
        {
          "id": "life-stack",
          "label": "Stack Lifetime (Automatic)"
        },
        {
          "id": "life-heap",
          "label": "Heap Lifetime (GC Managed)"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Stack Frame Push/Pop Lifecycle",
      "subtitle": "Instantaneous reclamation on method exit",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class LifetimeDemo {\n    static void worker() {\n        int temp = 99;\n        System.out.println(temp);\n    }\n    public static void main(String[] args) {\n        worker();\n        // temp does not exist here\n    }\n}",
        "output": "99",
        "explanation": "temp exists only while worker() is on the call stack."
      },
      "intermediate": {
        "code": "public class RecursionLifetime {\n    static void count(int n) {\n        if (n <= 0) return;\n        int localVal = n;\n        count(n - 1);\n    }\n    public static void main(String[] args) { count(3); }\n}",
        "output": "",
        "explanation": "Each recursive call creates an independent stack frame with its own localVal."
      },
      "advanced": {
        "code": "public class EscapeLifetime {\n    static int[] create() {\n        return new int[]{1, 2, 3}; // Array on Heap escapes method\n    }\n    public static void main(String[] args) {\n        int[] arr = create();\n        System.out.println(arr[0]);\n    }\n}",
        "output": "1",
        "explanation": "Heap objects survive method return; stack references are copied."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 4,
        "codeSnippet": "int temp = 99;",
        "explanation": "temp allocated in worker() stack frame.",
        "stackVariables": [
          {
            "name": "temp",
            "type": "int",
            "value": "99",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 5,
        "codeSnippet": "return;",
        "explanation": "worker() frame popped; temp reclaimed.",
        "stackVariables": [],
        "consoleOutput": "99"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Assuming local variable persists across calls",
        "incorrectSnippet": "void tally() { int count = 0; count++; }",
        "errorMessage": "N/A",
        "explanation": "count resets to 0 on every call.",
        "correctedSnippet": "static int count = 0; void tally() { count++; }",
        "whyCorrectionWorks": "Static field persists."
      }
    ],
    "realWorldApplications": [
      {
        "title": "High-Frequency Event Loop",
        "description": "Zero GC pressure because all locals live strictly on the stack."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-lifetime_0",
          "question": "When does a local variable get destroyed?",
          "options": [
            "When GC runs",
            "Instantly when method returns",
            "When program exits",
            "When set to null"
          ],
          "correctOptionIndex": 1,
          "explanation": "Stack frames pop instantly at return.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Trace Stack Frame",
        "description": "Observe stack frame allocation and release.",
        "starterCode": "void test() { int a = 10; }\ntest();",
        "hints": [
          "Stack frame destroyed on return."
        ],
        "solutionCode": "void test() { int a = 10; }"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-scope",
        "title": "Variable Scope",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-constants",
        "title": "Constants and final",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 17.4: Memory Model",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4",
        "sourceLabel": "Oracle Docs",
        "description": "JVM memory specification."
      }
    ]
  },
  "vars-constants": {
    "id": "vars-constants",
    "slug": "vars-constants",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Immutability",
    "title": "Constants & The final Modifier",
    "subtitle": "Declaring compile-time and runtime immutable values",
    "difficulty": "Core",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-assignment"
    ],
    "objectives": [
      "Apply final keyword to variables.",
      "Understand constant folding in bytecode.",
      "Distinguish primitive vs reference immutability."
    ],
    "whatIs": {
      "beginner": "A constant is a variable whose value cannot be altered once assigned.",
      "technical": "A final variable can be assigned exactly once. Attempting reassignment causes a compile-time error.",
      "terminology": [
        {
          "term": "final Keyword",
          "def": "Modifier prohibiting reassignment."
        },
        {
          "term": "Constant Expression",
          "def": "Primitive or String expression evaluated at compile-time."
        }
      ],
      "exampleSnippet": "final double PI = 3.141592653589793;\n// PI = 3.0; // Compiler Error"
    },
    "whyNeeded": {
      "problemSolved": "Prevents accidental mutation and documents invariant assumptions in code.",
      "whyJavaProvidesIt": "Enables compiler optimizations like inlining and constant folding.",
      "withoutIt": "Magic numbers and mutable global variables cause subtle side-effect bugs.",
      "whenToUse": "For mathematical constants, configuration limits, and thread-safe sharing.",
      "whenNotToUse": "For state that naturally mutates."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Declaration",
          "whatHappens": "Variable marked with final keyword.",
          "jvmInternals": "Compiler flags slot as write-once.",
          "studentObservation": "Variable created."
        },
        {
          "stepNum": 2,
          "headline": "Assignment",
          "whatHappens": "Value assigned exactly once.",
          "jvmInternals": "Bytecode registers definite assignment.",
          "studentObservation": "Constant locked."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Type",
        "Declaration Pattern",
        "Inlined in Bytecode?"
      ],
      "tableRows": [
        [
          "Compile-Time Constant",
          "public static final int MAX = 100;",
          "Yes (Inlined directly)"
        ],
        [
          "Runtime Final",
          "final int seed = compute();",
          "No (Evaluated at runtime)"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "final DataType NAME = value;",
      "correctCode": "final int MAX = 100;",
      "incorrectCode": "final int MAX = 100;\nMAX = 200; // Error",
      "compilerError": "cannot assign a value to final variable MAX",
      "rules": [
        "Final variables must be assigned exactly once.",
        "Use UPPER_SNAKE_CASE for static final constants."
      ]
    },
    "conceptTree": {
      "id": "const-root",
      "label": "Constants",
      "children": [
        {
          "id": "const-prim",
          "label": "Primitive Constants (Immutable Value)"
        },
        {
          "id": "const-ref",
          "label": "Reference Constants (Immutable Pointer)"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Final Variable Invariance",
      "subtitle": "Value locked in stack frame slot",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class ConstantBasics {\n    public static void main(String[] args) {\n        final int MAX_ATTEMPTS = 3;\n        System.out.println(\"Max: \" + MAX_ATTEMPTS);\n    }\n}",
        "output": "Max: 3",
        "explanation": "MAX_ATTEMPTS cannot be modified."
      },
      "intermediate": {
        "code": "public class BlankFinal {\n    final int value;\n    BlankFinal(int v) { this.value = v; }\n    public static void main(String[] args) {\n        System.out.println(new BlankFinal(42).value);\n    }\n}",
        "output": "42",
        "explanation": "Blank final assigned in constructor."
      },
      "advanced": {
        "code": "public class FinalReference {\n    public static void main(String[] args) {\n        final java.util.List<String> list = new java.util.ArrayList<>();\n        list.add(\"Java\"); // Allowed: Object internal state mutates\n        // list = new ArrayList<>(); // Error: reference itself is final\n        System.out.println(list);\n    }\n}",
        "output": "[Java]",
        "explanation": "final on reference protects the pointer address, NOT the object contents!"
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "final int MAX = 3;",
        "explanation": "Allocates slot marked read-only with value 3.",
        "stackVariables": [
          {
            "name": "MAX",
            "type": "int",
            "value": "3",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Max: 3"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Assuming final on a List makes elements immutable",
        "incorrectSnippet": "final List<String> list = new ArrayList<>(); list.add(\"X\");",
        "errorMessage": "No compile error",
        "explanation": "final only freezes the reference pointer.",
        "correctedSnippet": "List<String> list = List.of(\"X\");",
        "whyCorrectionWorks": "Use List.of() for true immutable collections."
      }
    ],
    "realWorldApplications": [
      {
        "title": "API Rate Limiting",
        "description": "Static final thresholds (MAX_REQUESTS_PER_SECOND = 100) protect microservices."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-constants_0",
          "question": "What happens if you reassign a final variable?",
          "options": [
            "Value updates",
            "Compiler error",
            "Warning at runtime",
            "Silent failure"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java compiler strictly forbids reassigning final variables.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Declare final",
        "description": "Declare a final double taxRate = 0.08;",
        "starterCode": "final double taxRate = 0.08;\nSystem.out.println(taxRate);",
        "hints": [
          "taxRate cannot be reassigned."
        ],
        "solutionCode": "final double taxRate = 0.08;"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-assignment",
        "title": "Variable Assignment",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-effectively-final",
        "title": "Effectively Final",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 4.12.4: final Variables",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.4",
        "sourceLabel": "Oracle JLS",
        "description": "Specification of final modifier."
      }
    ]
  },
  "vars-effectively-final": {
    "id": "vars-effectively-final",
    "slug": "vars-effectively-final",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Immutability",
    "title": "Effectively Final Variables",
    "subtitle": "Variables whose value is never changed after initialization",
    "difficulty": "Intermediate",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-constants"
    ],
    "objectives": [
      "Understand effectively final concept introduced in Java 8.",
      "Use effectively final variables in lambdas and inner classes.",
      "Identify violations."
    ],
    "whatIs": {
      "beginner": "A variable is effectively final if you could add the final keyword to it and the code would still compile.",
      "technical": "A non-final variable whose value is never modified after initialization, permitting safe capture by closures and anonymous classes.",
      "terminology": [
        {
          "term": "Capture",
          "def": "A closure copying a local variable into its hidden synthetic frame."
        },
        {
          "term": "Effectively Final",
          "def": "Never reassigned after initialization."
        }
      ],
      "exampleSnippet": "int factor = 2; // Not marked final, but never reassigned\nRunnable r = () -> System.out.println(factor); // Legal capture"
    },
    "whyNeeded": {
      "problemSolved": "Allows clean lambda expressions without forcing verbose final keywords everywhere.",
      "whyJavaProvidesIt": "Guarantees memory thread-safety for closure variable capture without data races.",
      "withoutIt": "Developers would have to manually add final to every variable captured by a stream or lambda.",
      "whenToUse": "When using variables inside lambdas or anonymous classes.",
      "whenNotToUse": "When a variable needs to be updated inside a loop."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Declaration",
          "whatHappens": "Variable assigned value.",
          "jvmInternals": "Compiler monitors reassignment.",
          "studentObservation": "Assigned."
        },
        {
          "stepNum": 2,
          "headline": "Lambda Capture",
          "whatHappens": "Closure reads variable.",
          "jvmInternals": "Verified as never reassigned.",
          "studentObservation": "Capture approved."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Status",
        "Modifier",
        "Reassigned?"
      ],
      "tableRows": [
        [
          "Explicitly Final",
          "final",
          "No"
        ],
        [
          "Effectively Final",
          "none",
          "No"
        ],
        [
          "Mutable Local",
          "none",
          "Yes (Cannot be captured)"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "DataType var = value; // never mutate",
      "correctCode": "int x = 10; Runnable r = () -> System.out.println(x);",
      "incorrectCode": "int x = 10; x++; Runnable r = () -> System.out.println(x); // Error",
      "compilerError": "local variables referenced from a lambda expression must be final or effectively final",
      "rules": [
        "Captured variables cannot be mutated anywhere in the enclosing scope."
      ]
    },
    "conceptTree": {
      "id": "eff-root",
      "label": "Effectively Final",
      "children": [
        {
          "id": "eff-lambda",
          "label": "Lambda Capture"
        },
        {
          "id": "eff-inner",
          "label": "Local Class Capture"
        }
      ]
    },
    "diagramConfig": {
      "type": "scope-blocks",
      "title": "Closure Variable Capture",
      "subtitle": "Capturing effectively final stack value into lambda heap instance",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class EffectivelyFinalDemo {\n    public static void main(String[] args) {\n        String prefix = \"> \"; // effectively final\n        java.util.List.of(\"A\", \"B\").forEach(s -> System.out.println(prefix + s));\n    }\n}",
        "output": "> A\n> B",
        "explanation": "prefix is never reassigned, so lambda can safely read it."
      },
      "intermediate": {
        "code": "public class MutationViolation {\n    public static void main(String[] args) {\n        int sum = 0;\n        // sum++; would break effectively final status for lambda below\n        System.out.println(\"Sum: \" + sum);\n    }\n}",
        "output": "Sum: 0",
        "explanation": "Maintaining single assignment satisfies effectively final criteria."
      },
      "advanced": {
        "code": "public class AtomicAccumulator {\n    public static void main(String[] args) {\n        var count = new java.util.concurrent.atomic.AtomicInteger(0);\n        java.util.List.of(1, 2, 3).forEach(i -> count.addAndGet(i));\n        System.out.println(\"Total: \" + count.get());\n    }\n}",
        "output": "Total: 6",
        "explanation": "To mutate within closures, capture an effectively final reference to an atomic wrapper!"
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "String prefix = \"> \";",
        "explanation": "prefix assigned and never mutated.",
        "stackVariables": [
          {
            "name": "prefix",
            "type": "String",
            "value": "\"> \""
          }
        ],
        "consoleOutput": "> A\n> B"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Trying to increment a counter inside a forEach lambda",
        "incorrectSnippet": "int count = 0; list.forEach(x -> count++);",
        "errorMessage": "Compile error",
        "explanation": "Lambdas cannot mutate enclosing local variables.",
        "correctedSnippet": "AtomicInteger count = new AtomicInteger(); list.forEach(x -> count.incrementAndGet());",
        "whyCorrectionWorks": "Use AtomicInteger or IntStream."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Parallel Stream Filtering",
        "description": "Safely passing filtering criteria across multiple threads in parallel streams."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-effectively-final_0",
          "question": "Which variable can be captured by a lambda?",
          "options": [
            "int x = 1; x = 2;",
            "int y = 5; (never changed)",
            "int z; (unassigned)",
            "A loop index that increments"
          ],
          "correctOptionIndex": 1,
          "explanation": "Only variables that are never reassigned can be captured.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Capture in Lambda",
        "description": "Write a lambda capturing greeting.",
        "starterCode": "String g = \"Hi\"; Runnable r = () -> System.out.println(g); r.run();",
        "hints": [
          "g must not be reassigned."
        ],
        "solutionCode": "String g = \"Hi\"; Runnable r = () -> System.out.println(g); r.run();"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-constants",
        "title": "Constants",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-primitive-vs-reference",
        "title": "Primitive vs Reference",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 4.12.4: Effectively Final",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html",
        "sourceLabel": "Oracle Docs",
        "description": "Effectively final formal rules."
      }
    ]
  },
  "vars-primitive-vs-reference": {
    "id": "vars-primitive-vs-reference",
    "slug": "vars-primitive-vs-reference",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Data Types & Memory",
    "title": "Primitive vs Reference Types in JVM Memory",
    "subtitle": "Value storage on Stack vs 64-bit pointer addresses to Heap objects",
    "difficulty": "Core",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-effectively-final"
    ],
    "objectives": [
      "Differentiate 8 primitive types from reference types.",
      "Diagram Stack slots vs Heap memory allocation.",
      "Understand pass-by-value semantics."
    ],
    "whatIs": {
      "beginner": "Primitives hold their actual raw value right in the variable box. Reference types hold the address pointing to where a complex object lives.",
      "technical": "Primitives allocate fixed-size contiguous bits directly in stack frames or object payloads. References store an object header pointer to the JVM Eden/Tenured heap.",
      "terminology": [
        {
          "term": "Primitive Type",
          "def": "One of 8 built-in types (byte, short, int, long, float, double, char, boolean)."
        },
        {
          "term": "Reference Type",
          "def": "Class, interface, array, or enum pointing to a heap instance."
        }
      ],
      "exampleSnippet": "int primitiveVal = 42; // Raw bits in stack\nString refVal = new String(\"Java\"); // Pointer address to heap"
    },
    "whyNeeded": {
      "problemSolved": "Balancing extreme raw arithmetic execution speed (primitives) with rich object-oriented modeling (references).",
      "whyJavaProvidesIt": "Gives programmers control over cache-friendly primitive arrays vs flexible polymorphic objects.",
      "withoutIt": "Everything being an object would waste massive memory and cause heavy garbage collection pauses.",
      "whenToUse": "Use primitives for numeric calculations, flags, and tight loops.",
      "whenNotToUse": "Use references when encapsulation, polymorphism, or nullability is required."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Stack Allocation",
          "whatHappens": "Stack slot created.",
          "jvmInternals": "Allocates 32-bit or 64-bit slot.",
          "studentObservation": "Primitive stored."
        },
        {
          "stepNum": 2,
          "headline": "Heap Allocation",
          "whatHappens": "new keyword executes.",
          "jvmInternals": "Eden space memory initialized with object header.",
          "studentObservation": "Reference address stored."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Feature",
        "Primitive Types",
        "Reference Types"
      ],
      "tableRows": [
        [
          "Memory Location",
          "Stack Frame or Object Payload",
          "Heap Space (Pointer on Stack)"
        ],
        [
          "Default Value",
          "0, false, \\u0000",
          "null"
        ],
        [
          "Operations",
          "Arithmetic/Bitwise (+, -, &)",
          "Method Invocations (.method())"
        ],
        [
          "Memory Footprint",
          "1 to 8 bytes",
          "8 bytes pointer + 16+ bytes object header"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "PrimitiveType p = val; ReferenceType r = new ReferenceType();",
      "correctCode": "int x = 10; Object obj = new Object();",
      "incorrectCode": "int x = null; // Error: primitives cannot be null",
      "compilerError": "incompatible types: <null> cannot be converted to int",
      "rules": [
        "Primitives can never be null.",
        "Primitive variables store values; reference variables store addresses."
      ]
    },
    "conceptTree": {
      "id": "p-vs-r-root",
      "label": "Java Types",
      "children": [
        {
          "id": "p-node",
          "label": "8 Primitives",
          "children": [
            {
              "id": "p-num",
              "label": "Numeric (byte..double)"
            },
            {
              "id": "p-char",
              "label": "Character (char)"
            },
            {
              "id": "p-bool",
              "label": "Boolean (boolean)"
            }
          ]
        },
        {
          "id": "r-node",
          "label": "References",
          "children": [
            {
              "id": "r-class",
              "label": "Classes / Records"
            },
            {
              "id": "r-arr",
              "label": "Arrays"
            },
            {
              "id": "r-null",
              "label": "null Literal"
            }
          ]
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Primitives in Stack vs References on Heap",
      "subtitle": "Showing raw bit values vs pointer addresses with arrow resolution",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class PrimVsRefBasics {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = a; // copies raw value 10\n        b = 20;\n        System.out.println(\"a = \" + a + \", b = \" + b); // a is unchanged!\n    }\n}",
        "output": "a = 10, b = 20",
        "explanation": "Primitive assignment copies the actual bits; modifying b does not touch a."
      },
      "intermediate": {
        "code": "public class ReferenceCopyDemo {\n    static class Box { int val = 10; }\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = b1; // copies pointer address\n        b2.val = 50;\n        System.out.println(\"b1.val = \" + b1.val); // 50! Both point to same object!\n    }\n}",
        "output": "b1.val = 50",
        "explanation": "Reference assignment copies the memory pointer address (aliasing)."
      },
      "advanced": {
        "code": "public class NullPointerDemo {\n    public static void main(String[] args) {\n        String text = null;\n        try {\n            System.out.println(text.length());\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NPE: reference points to nowhere!\");\n        }\n    }\n}",
        "output": "Caught NPE: reference points to nowhere!",
        "explanation": "Primitives can never trigger NullPointerException because they always contain bits, never null."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int a = 10;",
        "explanation": "Allocates stack slot holding value 10.",
        "stackVariables": [
          {
            "name": "a",
            "type": "int",
            "value": "10",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "int b = a;",
        "explanation": "Copies bits into new stack slot b.",
        "stackVariables": [
          {
            "name": "a",
            "type": "int",
            "value": "10"
          },
          {
            "name": "b",
            "type": "int",
            "value": "10",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 3,
        "line": 5,
        "codeSnippet": "b = 20;",
        "explanation": "Overwrites b with 20. a is unaffected.",
        "stackVariables": [
          {
            "name": "a",
            "type": "int",
            "value": "10"
          },
          {
            "name": "b",
            "type": "int",
            "value": "20",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "a = 10, b = 20"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Calling methods on primitive variables",
        "incorrectSnippet": "int x = 5; x.toString();",
        "errorMessage": "int cannot be dereferenced",
        "explanation": "Primitives do not have methods.",
        "correctedSnippet": "Integer.toString(x);",
        "whyCorrectionWorks": "Use static utility methods or wrapper classes."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Financial Engine Hot-Path",
        "description": "Using primitive long cents instead of BigDecimal inside matching loops to eliminate millions of object allocations per second."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-primitive-vs-reference_0",
          "question": "What happens when an object reference is assigned to another reference variable?",
          "options": [
            "The object is cloned",
            "The memory address is copied",
            "A new heap object is created",
            "The first variable becomes null"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java copies the 64-bit reference address, causing both variables to point to the identical object instance.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Swap Primitives",
        "description": "Demonstrate pass-by-value with primitives.",
        "starterCode": "int x = 10, y = 20;\nint t = x; x = y; y = t;\nSystem.out.println(x + \" \" + y);",
        "hints": [
          "Raw bits copied."
        ],
        "solutionCode": "int x = 10, y = 20;\nint t = x; x = y; y = t;"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-effectively-final",
        "title": "Effectively Final",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-byte",
        "title": "byte Primitive Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 4.1: Kinds of Types and Values",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.1",
        "sourceLabel": "Oracle JLS",
        "description": "Specification of primitive and reference types in Java 21."
      }
    ]
  },
  "vars-type-byte": {
    "id": "vars-type-byte",
    "slug": "vars-type-byte",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Primitive Types",
    "title": "The byte Type (8-Bit Signed)",
    "subtitle": "8-bit signed two's complement integer ranging from -128 to 127",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-primitive-vs-reference"
    ],
    "objectives": [
      "Define bit-width and range of byte (-128 to 127).",
      "Understand two's complement sign bit.",
      "Work with byte arrays for I/O."
    ],
    "whatIs": {
      "beginner": "A byte is the smallest integer type in Java, occupying exactly 8 bits of memory and storing numbers from -128 up to 127.",
      "technical": "An 8-bit signed two's complement integer. In bytecode, local byte variables are typically evaluated as 32-bit integers on the operand stack.",
      "terminology": [
        {
          "term": "Bit Width",
          "def": "8 bits (1 byte)."
        },
        {
          "term": "Two's Complement",
          "def": "Binary scheme where the highest bit represents negative magnitude."
        },
        {
          "term": "Range",
          "def": "-128 (-2^7) to 127 (2^7 - 1)."
        }
      ],
      "exampleSnippet": "byte min = -128;\nbyte max = 127;\nbyte[] buffer = new byte[1024]; // 1KB network buffer"
    },
    "whyNeeded": {
      "problemSolved": "Conserving memory in large arrays, binary network streams, and file I/O where 32-bit int would waste 75% of space.",
      "whyJavaProvidesIt": "Provides a direct mapping to raw hardware storage bytes and network packet buffers.",
      "withoutIt": "Network packets and file streams would consume 4x more RAM using standard int.",
      "whenToUse": "In byte arrays for binary data, image pixel channels, cryptography.",
      "whenNotToUse": "For general arithmetic counters (int is faster due to CPU alignment)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Memory Allocation",
          "whatHappens": "Allocates 8 bits in memory.",
          "jvmInternals": "1 byte reserved.",
          "studentObservation": "Slot created."
        },
        {
          "stepNum": 2,
          "headline": "Arithmetic Promotion",
          "whatHappens": "During arithmetic, promoted to 32-bit int.",
          "jvmInternals": "Operand stack converts byte to int (bipush).",
          "studentObservation": "Arithmetic runs in 32-bit."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "byte"
        ],
        [
          "Size",
          "8 bits (1 byte)"
        ],
        [
          "Minimum Value",
          "-128 (0x80)"
        ],
        [
          "Maximum Value",
          "127 (0x7F)"
        ],
        [
          "Default Field Value",
          "0"
        ],
        [
          "Wrapper Class",
          "java.lang.Byte"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "byte identifier = literal;",
      "correctCode": "byte age = 25;\nbyte flags = (byte) 0b10101010;",
      "incorrectCode": "byte b = 130; // Compile error: incompatible types: possible lossy conversion",
      "compilerError": "possible lossy conversion from int to byte",
      "rules": [
        "Literal numbers default to int; values exceeding 127 require an explicit cast.",
        "Arithmetic operators (+, -) promote byte to int."
      ]
    },
    "conceptTree": {
      "id": "byte-root",
      "label": "byte Type",
      "children": [
        {
          "id": "byte-bits",
          "label": "8 Bits Layout"
        },
        {
          "id": "byte-io",
          "label": "byte[] Stream Buffers"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "8-Bit Signed Two's Complement Layout",
      "subtitle": "Bit 7 is the sign bit; Bits 0-6 hold magnitude",
      "config": {
        "bits": 8,
        "typeName": "byte",
        "sampleValue": 42,
        "binaryStr": "00101010",
        "minVal": "-128",
        "maxVal": "127"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class ByteBasics {\n    public static void main(String[] args) {\n        byte b = 100;\n        System.out.println(\"Byte value: \" + b);\n    }\n}",
        "output": "Byte value: 100",
        "explanation": "Declares and prints an 8-bit byte value."
      },
      "intermediate": {
        "code": "public class ByteOverflow {\n    public static void main(String[] args) {\n        byte max = 127;\n        byte overflow = (byte)(max + 1);\n        System.out.println(\"127 + 1 wraps to: \" + overflow);\n    }\n}",
        "output": "127 + 1 wraps to: -128",
        "explanation": "Adding 1 to 127 causes circular two's complement wraparound to -128!"
      },
      "advanced": {
        "code": "public class ByteBufferDemo {\n    public static void main(String[] args) {\n        byte[] header = {0x4A, 0x41, 0x56, 0x41}; // 'J', 'A', 'V', 'A'\n        System.out.println(new String(header));\n    }\n}",
        "output": "JAVA",
        "explanation": "Using byte arrays for raw binary magic headers."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "byte b = 100;",
        "explanation": "Writes binary 01100100 to stack slot.",
        "stackVariables": [
          {
            "name": "b",
            "type": "byte",
            "value": "100",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Byte value: 100"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Adding two bytes without casting",
        "incorrectSnippet": "byte a = 1, b = 2; byte c = a + b;",
        "errorMessage": "possible lossy conversion from int to byte",
        "explanation": "Java promotes arithmetic operands to int.",
        "correctedSnippet": "byte c = (byte)(a + b);",
        "whyCorrectionWorks": "Cast the int result back to byte."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Network Packet Framing",
        "description": "Socket protocols use byte buffers to parse binary Ethernet frame headers."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-byte_0",
          "question": "What is the maximum value that can fit into a byte?",
          "options": [
            "255",
            "127",
            "128",
            "65535"
          ],
          "correctOptionIndex": 1,
          "explanation": "Because byte is signed, the range is -128 to +127.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Byte Cast",
        "description": "Cast 130 to byte and observe value.",
        "starterCode": "int x = 130; byte b = (byte) x; System.out.println(b);",
        "hints": [
          "Wraps around to -126."
        ],
        "solutionCode": "int x = 130; byte b = (byte) x; System.out.println(b);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-primitive-vs-reference",
        "title": "Primitives vs References",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-short",
        "title": "short Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Tutorials: Primitive Data Types (byte)",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official byte specification."
      }
    ]
  },
  "vars-type-short": {
    "id": "vars-type-short",
    "slug": "vars-type-short",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Primitive Types",
    "title": "The short Type (16-Bit Signed)",
    "subtitle": "16-bit signed integer ranging from -32,768 to 32,767",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-type-byte"
    ],
    "objectives": [
      "Define bit-width and range of short (-32,768 to 32,767).",
      "Understand memory conservation in large arrays.",
      "Trace arithmetic promotion."
    ],
    "whatIs": {
      "beginner": "A short is a 16-bit integer twice the size of a byte, capable of storing numbers up to 32,767.",
      "technical": "A 16-bit signed two's complement integer. Conserves memory in 16-bit audio waveforms, pixel coordinates, and sensors.",
      "terminology": [
        {
          "term": "Bit Width",
          "def": "16 bits (2 bytes)."
        },
        {
          "term": "Range",
          "def": "-32,768 to 32,767."
        }
      ],
      "exampleSnippet": "short altitude = 12500;\nshort[] audioSamples = new short[44100]; // 1 sec of 16-bit PCM audio"
    },
    "whyNeeded": {
      "problemSolved": "Saving memory in large datasets (e.g. 16-bit audio PCM samples) where 32-bit int would consume double the RAM.",
      "whyJavaProvidesIt": "Hardware compatibility with 16-bit audio and sensor registers.",
      "withoutIt": "Audio buffers would consume 2x more memory.",
      "whenToUse": "For massive 16-bit audio and graphics buffers.",
      "whenNotToUse": "For standard arithmetic counters (use int)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Allocation",
          "whatHappens": "2 bytes allocated in memory.",
          "jvmInternals": "16 bits reserved.",
          "studentObservation": "Slot created."
        },
        {
          "stepNum": 2,
          "headline": "Promotion",
          "whatHappens": "Promoted to 32-bit int during math.",
          "jvmInternals": "Evaluated on operand stack.",
          "studentObservation": "Calculated."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "short"
        ],
        [
          "Size",
          "16 bits (2 bytes)"
        ],
        [
          "Min Value",
          "-32,768"
        ],
        [
          "Max Value",
          "32,767"
        ],
        [
          "Default Value",
          "0"
        ],
        [
          "Wrapper Class",
          "java.lang.Short"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "short identifier = literal;",
      "correctCode": "short elevation = 8848;",
      "incorrectCode": "short s = 40000; // Error: exceeds 32767",
      "compilerError": "possible lossy conversion from int to short",
      "rules": [
        "Values beyond 32,767 require an explicit cast.",
        "Arithmetic operations promote short to int."
      ]
    },
    "conceptTree": {
      "id": "short-root",
      "label": "short Type",
      "children": [
        {
          "id": "short-audio",
          "label": "16-bit PCM Audio"
        },
        {
          "id": "short-limits",
          "label": "Range Boundaries"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "16-Bit Signed Integer Layout",
      "subtitle": "Bit 15 is sign; Bits 0-14 magnitude",
      "config": {
        "bits": 16,
        "typeName": "short",
        "sampleValue": 12500,
        "binaryStr": "0011000011010100",
        "minVal": "-32768",
        "maxVal": "32767"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class ShortBasics {\n    public static void main(String[] args) {\n        short altitude = 12500;\n        System.out.println(\"Altitude: \" + altitude + \"m\");\n    }\n}",
        "output": "Altitude: 12500m",
        "explanation": "Declares and prints 16-bit short."
      },
      "intermediate": {
        "code": "public class ShortArrayDemo {\n    public static void main(String[] args) {\n        short[] pcm = new short[2];\n        pcm[0] = 32000;\n        pcm[1] = -32000;\n        System.out.println(\"Samples: \" + pcm[0] + \", \" + pcm[1]);\n    }\n}",
        "output": "Samples: 32000, -32000",
        "explanation": "16-bit PCM sound wave representation."
      },
      "advanced": {
        "code": "public class ShortOverflow {\n    public static void main(String[] args) {\n        short max = 32767;\n        short next = (short)(max + 1);\n        System.out.println(\"Overflow: \" + next);\n    }\n}",
        "output": "Overflow: -32768",
        "explanation": "32,767 + 1 overflows to -32,768."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "short altitude = 12500;",
        "explanation": "Writes 16-bit value into stack slot.",
        "stackVariables": [
          {
            "name": "altitude",
            "type": "short",
            "value": "12500",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Altitude: 12500m"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Assigning int literal > 32767 without cast",
        "incorrectSnippet": "short s = 50000;",
        "errorMessage": "possible lossy conversion",
        "explanation": "50000 exceeds short range.",
        "correctedSnippet": "short s = (short) 50000;",
        "whyCorrectionWorks": "Cast explicitly if truncation is intentional."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Digital Audio Processing",
        "description": "CD-quality 44.1kHz audio uses 16-bit short PCM arrays."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-short_0",
          "question": "What is the size of short in bytes?",
          "options": [
            "1 byte",
            "2 bytes",
            "4 bytes",
            "8 bytes"
          ],
          "correctOptionIndex": 1,
          "explanation": "short occupies exactly 2 bytes (16 bits).",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Short Range",
        "description": "Print Short.MIN_VALUE and Short.MAX_VALUE.",
        "starterCode": "System.out.println(Short.MIN_VALUE + \" to \" + Short.MAX_VALUE);",
        "hints": [
          "Outputs -32768 to 32767."
        ],
        "solutionCode": "System.out.println(Short.MIN_VALUE + \" to \" + Short.MAX_VALUE);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-byte",
        "title": "byte Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-int",
        "title": "int Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Tutorials: Primitive Types (short)",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official short specification."
      }
    ]
  },
  "vars-type-int": {
    "id": "vars-type-int",
    "slug": "vars-type-int",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Primitive Types",
    "title": "The int Type (32-Bit Default)",
    "subtitle": "32-bit default signed integer ranging from -2,147,483,648 to 2,147,483,647",
    "difficulty": "Core",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-type-short"
    ],
    "objectives": [
      "Explain why int is Java's default integer type.",
      "Understand 32-bit range and CPU register alignment.",
      "Use underscores in numeric literals."
    ],
    "whatIs": {
      "beginner": "int is the primary, default integer type in Java. Any whole number typed into code without a suffix is automatically an int.",
      "technical": "A 32-bit signed two's complement integer. Native CPU architectures and the JVM instruction set are optimized around 32-bit words.",
      "terminology": [
        {
          "term": "Default Integer",
          "def": "All integer literals (e.g. 100, 5000) default to int."
        },
        {
          "term": "Range",
          "def": "-2,147,483,648 to 2,147,483,647 (-2^31 to 2^31 - 1)."
        }
      ],
      "exampleSnippet": "int population = 8_000_000;\nint distance = 384_400;"
    },
    "whyNeeded": {
      "problemSolved": "Provides ample range for counting, indexing, and calculations while matching hardware CPU register widths.",
      "whyJavaProvidesIt": "Hardware arithmetic units operate natively on 32-bit registers with zero conversion overhead.",
      "withoutIt": "Without int, programmers would constantly have to decide between narrow shorts or bulky longs.",
      "whenToUse": "For all general-purpose whole numbers, loop indices, array sizing.",
      "whenNotToUse": "For numbers exceeding 2 billion (use long) or massive binary arrays (use byte)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Direct Execution",
          "whatHappens": "Loads directly into CPU 32-bit register.",
          "jvmInternals": "JVM bytecode iload/iadd instructions.",
          "studentObservation": "Fastest arithmetic."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "int"
        ],
        [
          "Size",
          "32 bits (4 bytes)"
        ],
        [
          "Min Value",
          "-2,147,483,648 (-2^31)"
        ],
        [
          "Max Value",
          "2,147,483,647 (2^31 - 1)"
        ],
        [
          "Default Value",
          "0"
        ],
        [
          "Wrapper Class",
          "java.lang.Integer"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "int identifier = literal;",
      "correctCode": "int count = 1_000_000;\nint hex = 0xFF; // 255\nint bin = 0b1010; // 10",
      "incorrectCode": "int big = 3_000_000_000; // Error: integer number too large",
      "compilerError": "integer number too large",
      "rules": [
        "Integer literals exceeding 2,147,483,647 must use the L suffix for long.",
        "Underscores can be placed between digits for readability."
      ]
    },
    "conceptTree": {
      "id": "int-root",
      "label": "int Type",
      "children": [
        {
          "id": "int-literals",
          "label": "Literals (Decimal, Hex, Binary)"
        },
        {
          "id": "int-overflow",
          "label": "Wraparound Behavior"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "32-Bit Signed Integer Layout",
      "subtitle": "Bit 31 is sign bit; Bits 0-30 are magnitude bits",
      "config": {
        "bits": 32,
        "typeName": "int",
        "sampleValue": 1000000,
        "binaryStr": "00000000000011110100001001000000",
        "minVal": "-2147483648",
        "maxVal": "2147483647"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class IntBasics {\n    public static void main(String[] args) {\n        int year = 2026;\n        int hex = 0x1F; // 31 in decimal\n        System.out.println(year + \", hex: \" + hex);\n    }\n}",
        "output": "2026, hex: 31",
        "explanation": "Shows decimal and hexadecimal int literals."
      },
      "intermediate": {
        "code": "public class IntegerDivision {\n    public static void main(String[] args) {\n        int a = 5, b = 2;\n        int result = a / b;\n        System.out.println(\"5 / 2 = \" + result + \" (truncated!)\");\n    }\n}",
        "output": "5 / 2 = 2 (truncated!)",
        "explanation": "Integer division strictly truncates toward zero; fractional parts are discarded."
      },
      "advanced": {
        "code": "public class IntOverflowDemo {\n    public static void main(String[] args) {\n        int max = Integer.MAX_VALUE;\n        System.out.println(\"Max: \" + max);\n        System.out.println(\"Max + 1: \" + (max + 1));\n    }\n}",
        "output": "Max: 2147483647\nMax + 1: -2147483648",
        "explanation": "Adding 1 to Integer.MAX_VALUE wraps around into negative minimum."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int year = 2026;",
        "explanation": "Allocates 32-bit slot for year with value 2026.",
        "stackVariables": [
          {
            "name": "year",
            "type": "int",
            "value": "2026",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "2026, hex: 31"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Expecting decimal result from integer division",
        "incorrectSnippet": "double d = 5 / 2;",
        "errorMessage": "d evaluates to 2.0 instead of 2.5",
        "explanation": "Both operands are int, so integer division occurs before assignment.",
        "correctedSnippet": "double d = 5.0 / 2;",
        "whyCorrectionWorks": "Use floating-point literal to force floating division."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Array Indexing & Capacities",
        "description": "Java arrays are indexed strictly via 32-bit integers, giving a maximum theoretical capacity of ~2 billion elements."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-int_0",
          "question": "What is the result of 7 / 2 in Java?",
          "options": [
            "3.5",
            "3",
            "4",
            "Compilation Error"
          ],
          "correctOptionIndex": 1,
          "explanation": "Integer division discards the remainder, truncating to 3.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Test Division",
        "description": "Print 7 / 2 and 7.0 / 2.",
        "starterCode": "System.out.println(7 / 2 + \" vs \" + (7.0 / 2));",
        "hints": [
          "3 vs 3.5"
        ],
        "solutionCode": "System.out.println(7 / 2 + \" vs \" + (7.0 / 2));"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-short",
        "title": "short Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-long",
        "title": "long Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Integer Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Java 21 Integer class documentation."
      }
    ]
  },
  "vars-type-long": {
    "id": "vars-type-long",
    "slug": "vars-type-long",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Primitive Types",
    "title": "The long Type (64-Bit Signed)",
    "subtitle": "64-bit signed integer ranging from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807",
    "difficulty": "Core",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-type-int"
    ],
    "objectives": [
      "Explain when long is required over int.",
      "Use the required L or l suffix on literals.",
      "Understand 64-bit timestamps and file offsets."
    ],
    "whatIs": {
      "beginner": "A long is a 64-bit integer designed for massive numbers beyond 2 billion, like millisecond timestamps, file sizes, and database primary keys.",
      "technical": "A 64-bit signed two's complement integer. Occupies two 32-bit slots in JVM local variable frames and requires the L suffix for large literals.",
      "terminology": [
        {
          "term": "64-Bit Integer",
          "def": "Occupies 8 bytes in memory."
        },
        {
          "term": "L Suffix",
          "def": "Designates literal as long rather than default int."
        },
        {
          "term": "Range",
          "def": "-2^63 to 2^63 - 1."
        }
      ],
      "exampleSnippet": "long epochMillis = System.currentTimeMillis();\nlong distanceToStar = 9_460_730_472_580_800L; // Light year in meters"
    },
    "whyNeeded": {
      "problemSolved": "Storing values that exceed int's 2.14 billion ceiling (e.g. Unix epoch timestamps in milliseconds, high-resolution timers).",
      "whyJavaProvidesIt": "Prevents integer overflow in time, monetary, and scientific calculations.",
      "withoutIt": "Timestamps would overflow after 24.8 days if stored in milliseconds as int.",
      "whenToUse": "For database IDs, timestamps, file byte counts, scientific measurements.",
      "whenNotToUse": "For standard loop counters where int suffices."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Stack Allocation",
          "whatHappens": "Allocates 2 consecutive 32-bit local variable slots.",
          "jvmInternals": "JVM lload/ladd bytecodes.",
          "studentObservation": "64-bit slot reserved."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "long"
        ],
        [
          "Size",
          "64 bits (8 bytes)"
        ],
        [
          "Min Value",
          "-9,223,372,036,854,775,808"
        ],
        [
          "Max Value",
          "9,223,372,036,854,775,807"
        ],
        [
          "Default Value",
          "0L"
        ],
        [
          "Wrapper Class",
          "java.lang.Long"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "long identifier = literalL;",
      "correctCode": "long worldPopulation = 8_100_000_000L;",
      "incorrectCode": "long big = 8100000000; // Error: integer number too large without L suffix",
      "compilerError": "integer number too large",
      "rules": [
        "Always use uppercase 'L' rather than lowercase 'l' to avoid confusing with digit 1."
      ]
    },
    "conceptTree": {
      "id": "long-root",
      "label": "long Type",
      "children": [
        {
          "id": "long-time",
          "label": "Epoch Milliseconds"
        },
        {
          "id": "long-literal",
          "label": "The 'L' Suffix Rule"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "64-Bit Signed Integer Layout",
      "subtitle": "Bit 63 is sign bit; Bits 0-62 magnitude",
      "config": {
        "bits": 64,
        "typeName": "long",
        "sampleValue": 8100000000,
        "binaryStr": "0000000000000000000000000000000111100011000111110010000000000000",
        "minVal": "-9223372036854775808",
        "maxVal": "9223372036854775807"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class LongBasics {\n    public static void main(String[] args) {\n        long now = System.currentTimeMillis();\n        System.out.println(\"Epoch ms: \" + now);\n    }\n}",
        "output": "Epoch ms: 1730536800000",
        "explanation": "Retrieves current epoch timestamp as long."
      },
      "intermediate": {
        "code": "public class LongSuffixDemo {\n    public static void main(String[] args) {\n        long lightYearKm = 9_460_730_472_580L;\n        System.out.println(\"Light year: \" + lightYearKm + \" km\");\n    }\n}",
        "output": "Light year: 9460730472580 km",
        "explanation": "Correctly formats long literal with L suffix."
      },
      "advanced": {
        "code": "public class OverflowBeforeLong {\n    public static void main(String[] args) {\n        long bad = 24 * 60 * 60 * 1000 * 1000; // Overflows! Calculated as int!\n        long good = 24L * 60 * 60 * 1000 * 1000; // Promotes to long!\n        System.out.println(\"Bad: \" + bad + \", Good: \" + good);\n    }\n}",
        "output": "Bad: -729379968, Good: 86400000000",
        "explanation": "Shows overflow occurs BEFORE assignment if literals lack L!"
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "long now = 1730536800000L;",
        "explanation": "Allocates 64-bit double slot.",
        "stackVariables": [
          {
            "name": "now",
            "type": "long",
            "value": "1730536800000L",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Epoch ms: 1730536800000"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Omitting L suffix on large numeric calculation",
        "incorrectSnippet": "long ms = 1000 * 60 * 60 * 24 * 30;",
        "errorMessage": "Calculates as int, overflows into negative number",
        "explanation": "Right-hand side evaluated as 32-bit int before assignment.",
        "correctedSnippet": "long ms = 1000L * 60 * 60 * 24 * 30;",
        "whyCorrectionWorks": "Add 'L' to the first operand."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Cloud Database IDs (Snowflake IDs)",
        "description": "Distributed database IDs use 64-bit longs to encode timestamps, worker IDs, and sequence numbers."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-long_0",
          "question": "Why must you append 'L' to 3000000000L in Java?",
          "options": [
            "To allocate heap memory",
            "Because integer literals default to 32-bit int",
            "To make it unsigned",
            "It is optional"
          ],
          "correctOptionIndex": 1,
          "explanation": "Literals default to 32-bit int, so numbers exceeding 2.14B fail compile without L.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Epoch Time",
        "description": "Print System.currentTimeMillis() using long.",
        "starterCode": "long t = System.currentTimeMillis(); System.out.println(t > 0);",
        "hints": [
          "true"
        ],
        "solutionCode": "long t = System.currentTimeMillis(); System.out.println(t > 0);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-int",
        "title": "int Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-float",
        "title": "float Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Long Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Long.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Long documentation."
      }
    ]
  },
  "vars-type-float": {
    "id": "vars-type-float",
    "slug": "vars-type-float",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Floating-Point Types",
    "title": "The float Type (32-Bit IEEE 754)",
    "subtitle": "32-bit single-precision floating-point type requiring f/F suffix",
    "difficulty": "Core",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-type-long"
    ],
    "objectives": [
      "Understand IEEE 754 32-bit floating-point layout (sign, exponent, mantissa).",
      "Require f or F suffix for float literals.",
      "Understand precision limitations (6-7 decimal digits)."
    ],
    "whatIs": {
      "beginner": "A float is a 32-bit decimal number capable of storing fractional values like 3.14f. You must append an 'f' suffix because decimals default to double.",
      "technical": "A 32-bit single-precision IEEE 754 floating-point number (1 sign bit, 8 exponent bits, 23 fraction bits). Offers ~7 decimal digits of precision.",
      "terminology": [
        {
          "term": "IEEE 754",
          "def": "International standard for binary floating-point representation."
        },
        {
          "term": "Mantissa",
          "def": "The fractional bits encoding significance."
        },
        {
          "term": "Exponent",
          "def": "The scaling factor power of 2."
        }
      ],
      "exampleSnippet": "float pi = 3.14159f;\nfloat temperature = 98.6f;\nfloat[] vertices = new float[10000]; // 3D graphics mesh"
    },
    "whyNeeded": {
      "problemSolved": "Saving memory in large 3D graphics coordinate meshes, physics simulations, and audio buffers where 6-7 digits of precision are sufficient.",
      "whyJavaProvidesIt": "Matches GPU floating-point vertex processing hardware.",
      "withoutIt": "3D models with millions of vertices would require double the VRAM using double.",
      "whenToUse": "In 3D game engines (OpenGL/Vulkan), physics particles, audio synthesis.",
      "whenNotToUse": "Never for currency or financial transactions (rounding errors!)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Binary Decomposition",
          "whatHappens": "Decomposes number into sign, biased exponent, and mantissa.",
          "jvmInternals": "Stored in 32-bit register.",
          "studentObservation": "Fraction allocated."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "float"
        ],
        [
          "Size",
          "32 bits (4 bytes)"
        ],
        [
          "Format",
          "IEEE 754 Single-Precision"
        ],
        [
          "Precision",
          "~6 to 7 decimal digits"
        ],
        [
          "Suffix",
          "f or F (Mandatory for literals)"
        ],
        [
          "Wrapper Class",
          "java.lang.Float"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "float identifier = literalF;",
      "correctCode": "float price = 19.99f;\nfloat gravity = 9.81F;",
      "incorrectCode": "float f = 3.14; // Error: possible lossy conversion from double to float",
      "compilerError": "possible lossy conversion from double to float",
      "rules": [
        "Decimal literals default to double; omitting 'f' causes a compiler error."
      ]
    },
    "conceptTree": {
      "id": "float-root",
      "label": "float Type",
      "children": [
        {
          "id": "float-ieee",
          "label": "IEEE 754 (1 + 8 + 23 bits)"
        },
        {
          "id": "float-suffix",
          "label": "Mandatory 'f' Suffix"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "IEEE 754 32-Bit Floating Point",
      "subtitle": "1 Sign bit, 8 Exponent bits, 23 Mantissa bits",
      "config": {
        "bits": 32,
        "typeName": "float",
        "sampleValue": 3.14,
        "binaryStr": "01000000010010001111010111000011",
        "minVal": "1.4E-45",
        "maxVal": "3.4028235E38"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class FloatBasics {\n    public static void main(String[] args) {\n        float temp = 98.6f;\n        System.out.println(\"Temperature: \" + temp + \"\u00b0F\");\n    }\n}",
        "output": "Temperature: 98.6\u00b0F",
        "explanation": "Declares and prints a float literal."
      },
      "intermediate": {
        "code": "public class FloatPrecisionIssue {\n    public static void main(String[] args) {\n        float val = 1234567.89f;\n        System.out.println(\"Assigned: 1234567.89\");\n        System.out.println(\"Stored:   \" + val + \" (rounding after 7 digits!)\");\n    }\n}",
        "output": "Assigned: 1234567.89\nStored:   1234567.9 (rounding after 7 digits!)",
        "explanation": "Demonstrates precision loss beyond 7 decimal digits."
      },
      "advanced": {
        "code": "public class SpecialFloatValues {\n    public static void main(String[] args) {\n        float divZero = 1.0f / 0.0f; // Infinity\n        float nan = 0.0f / 0.0f;      // NaN (Not a Number)\n        System.out.println(\"Div by zero: \" + divZero + \", 0/0: \" + nan);\n    }\n}",
        "output": "Div by zero: Infinity, 0/0: NaN",
        "explanation": "Floating-point does not throw ArithmeticException; it returns Infinity or NaN."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "float temp = 98.6f;",
        "explanation": "Stores 32-bit IEEE 754 bits in stack slot.",
        "stackVariables": [
          {
            "name": "temp",
            "type": "float",
            "value": "98.6f",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Temperature: 98.6\u00b0F"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Omitting 'f' suffix on decimal literals",
        "incorrectSnippet": "float f = 3.14;",
        "errorMessage": "possible lossy conversion from double to float",
        "explanation": "3.14 is a double (64-bit), which cannot automatically fit into float (32-bit).",
        "correctedSnippet": "float f = 3.14f;",
        "whyCorrectionWorks": "Add the 'f' suffix."
      }
    ],
    "realWorldApplications": [
      {
        "title": "OpenGL / Vulkan Vertex Buffers",
        "description": "3D coordinate positions (X, Y, Z) are passed as float arrays directly to GPU shaders."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-float_0",
          "question": "Why does float f = 3.14; fail to compile?",
          "options": [
            "3.14 is an int",
            "Decimals default to 64-bit double",
            "float is deprecated",
            "Syntax error"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java treats all bare decimal literals as double.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Declare Float",
        "description": "Declare float f = 2.5f and print it.",
        "starterCode": "float f = 2.5f; System.out.println(f);",
        "hints": [
          "2.5"
        ],
        "solutionCode": "float f = 2.5f; System.out.println(f);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-long",
        "title": "long Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-double",
        "title": "double Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Float Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Float.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Java 21 Float class documentation."
      }
    ]
  },
  "vars-type-double": {
    "id": "vars-type-double",
    "slug": "vars-type-double",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Floating-Point Types",
    "title": "The double Type (64-Bit IEEE 754)",
    "subtitle": "64-bit double-precision floating-point default decimal type",
    "difficulty": "Core",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-type-float"
    ],
    "objectives": [
      "Explain why double is Java's default floating-point type.",
      "Understand 15-17 decimal digits of precision.",
      "Avoid using double for monetary values (use BigDecimal)."
    ],
    "whatIs": {
      "beginner": "double is the default floating-point type in Java. It provides 64 bits of precision (around 15 to 17 decimal digits) for scientific and mathematical calculations.",
      "technical": "A 64-bit double-precision IEEE 754 floating-point number (1 sign bit, 11 exponent bits, 52 fraction bits). Occupies two 32-bit stack slots.",
      "terminology": [
        {
          "term": "Double Precision",
          "def": "Twice the mantissa bits of float (52 vs 23 bits)."
        },
        {
          "term": "Precision",
          "def": "~15 to 17 decimal digits."
        }
      ],
      "exampleSnippet": "double pi = 3.141592653589793;\ndouble accountBalance = 10500.75;"
    },
    "whyNeeded": {
      "problemSolved": "Providing high accuracy for mathematical functions (Math.sin, Math.sqrt), scientific calculations, and simulations.",
      "whyJavaProvidesIt": "Matches standard 64-bit FPU (floating-point unit) hardware pipelines.",
      "withoutIt": "Float's 7 digits of precision would accumulate massive rounding errors in scientific simulations.",
      "whenToUse": "For geometry, physics calculations, statistical modeling.",
      "whenNotToUse": "Never for money or accounting (0.1 + 0.2 != 0.3 due to binary fraction rounding; use BigDecimal)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Stack Allocation",
          "whatHappens": "Allocates 2 consecutive 32-bit stack slots.",
          "jvmInternals": "JVM dload/dadd instructions.",
          "studentObservation": "64-bit double stored."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "double"
        ],
        [
          "Size",
          "64 bits (8 bytes)"
        ],
        [
          "Format",
          "IEEE 754 Double-Precision"
        ],
        [
          "Precision",
          "~15 to 17 decimal digits"
        ],
        [
          "Default Value",
          "0.0d"
        ],
        [
          "Wrapper Class",
          "java.lang.Double"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "double identifier = literal;",
      "correctCode": "double radius = 5.5;\ndouble rate = 0.05d;",
      "incorrectCode": "double d = 1.0; // OK",
      "compilerError": "",
      "rules": [
        "Decimals automatically default to double; 'd' suffix is optional."
      ]
    },
    "conceptTree": {
      "id": "double-root",
      "label": "double Type",
      "children": [
        {
          "id": "double-math",
          "label": "Math Library (Math.PI)"
        },
        {
          "id": "double-rounding",
          "label": "Binary Rounding Pitfall"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "IEEE 754 64-Bit Floating Point",
      "subtitle": "1 Sign bit, 11 Exponent bits, 52 Mantissa bits",
      "config": {
        "bits": 64,
        "typeName": "double",
        "sampleValue": 3.1415926535,
        "binaryStr": "0100000000001001001000011111101101010100010001000010110100011000",
        "minVal": "4.9E-324",
        "maxVal": "1.7976931348623157E308"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class DoubleBasics {\n    public static void main(String[] args) {\n        double radius = 4.0;\n        double area = Math.PI * radius * radius;\n        System.out.println(\"Circle area: \" + area);\n    }\n}",
        "output": "Circle area: 50.26548245743669",
        "explanation": "Calculates circle area using double precision Math.PI."
      },
      "intermediate": {
        "code": "public class FloatingPointRoundingBug {\n    public static void main(String[] args) {\n        double a = 0.1;\n        double b = 0.2;\n        double sum = a + b;\n        System.out.println(\"0.1 + 0.2 = \" + sum);\n        System.out.println(\"sum == 0.3? \" + (sum == 0.3));\n    }\n}",
        "output": "0.1 + 0.2 = 0.30000000000000004\nsum == 0.3? false",
        "explanation": "The famous binary floating-point rounding issue: 0.1 cannot be stored exactly in base-2 binary!"
      },
      "advanced": {
        "code": "public class DoubleScientific {\n    public static void main(String[] args) {\n        double speedOfLight = 2.99792458e8; // Scientific notation\n        System.out.println(\"c = \" + speedOfLight + \" m/s\");\n    }\n}",
        "output": "c = 2.99792458E8 m/s",
        "explanation": "Supports scientific exponential notation using 'e' or 'E'."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "double pi = 3.14159;",
        "explanation": "Stores 64-bit double in stack slots.",
        "stackVariables": [
          {
            "name": "pi",
            "type": "double",
            "value": "3.14159",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      }
    ],
    "commonMistakes": [
      {
        "headline": "Using double for currency calculations",
        "incorrectSnippet": "double balance = 1.00; balance -= 0.90; System.out.println(balance);",
        "errorMessage": "Outputs 0.09999999999999998",
        "explanation": "Binary floating point cannot accurately represent 0.10 base 10.",
        "correctedSnippet": "BigDecimal balance = new BigDecimal(\"1.00\").subtract(new BigDecimal(\"0.90\"));",
        "whyCorrectionWorks": "Always use java.math.BigDecimal for financial money values."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Orbital Mechanics Simulation",
        "description": "NASA and aerospace software compute orbital trajectories using 64-bit double precision vectors."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-double_0",
          "question": "Why does 0.1 + 0.2 evaluate to 0.30000000000000004 in Java?",
          "options": [
            "Java bug",
            "Binary base-2 cannot represent 1/10 exactly",
            "JVM memory corruption",
            "Integer overflow"
          ],
          "correctOptionIndex": 1,
          "explanation": "Just as 1/3 cannot be represented finitely in decimal (0.333...), 1/10 cannot be represented finitely in binary.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Check Rounding",
        "description": "Print 0.1 + 0.2.",
        "starterCode": "System.out.println(0.1 + 0.2);",
        "hints": [
          "0.30000000000000004"
        ],
        "solutionCode": "System.out.println(0.1 + 0.2);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-float",
        "title": "float Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-char",
        "title": "char Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Double Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Double.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Double class documentation."
      }
    ]
  },
  "vars-type-char": {
    "id": "vars-type-char",
    "slug": "vars-type-char",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Text Types",
    "title": "The char Type (16-Bit UTF-16)",
    "subtitle": "16-bit unsigned Unicode character ranging from \\u0000 (0) to \\uffff (65,535)",
    "difficulty": "Beginner",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-type-double"
    ],
    "objectives": [
      "Explain why char is unsigned in Java.",
      "Distinguish single quotes ('a') from double quotes (\"a\").",
      "Work with Unicode escape sequences (\\uXXXX)."
    ],
    "whatIs": {
      "beginner": "A char stores a single 16-bit Unicode character enclosed in single quotes, such as 'A', '9', or a symbol like '\u20ac'.",
      "technical": "A 16-bit unsigned integer representing a UTF-16 code unit. It ranges from 0 (\\u0000) to 65,535 (\\uffff). It is the only unsigned primitive type in Java.",
      "terminology": [
        {
          "term": "UTF-16 Code Unit",
          "def": "16 bits encoding Basic Multilingual Plane characters."
        },
        {
          "term": "Unsigned",
          "def": "Cannot store negative numbers; all 16 bits encode magnitude."
        }
      ],
      "exampleSnippet": "char grade = 'A';\nchar symbol = '\u20ac';\nchar newline = '\\n';\nchar unicode = '\\u0041'; // 'A'"
    },
    "whyNeeded": {
      "problemSolved": "Storing and manipulating individual text characters, symbols, and parsing text files character-by-character.",
      "whyJavaProvidesIt": "Guarantees cross-platform international language support via Unicode standard.",
      "withoutIt": "Code would be restricted to 7-bit ASCII, unable to represent non-English alphabets.",
      "whenToUse": "For individual characters, escape sequences, text parsers.",
      "whenNotToUse": "For full words or sentences (use String)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Code Unit Storage",
          "whatHappens": "Stores 16-bit integer code unit in slot.",
          "jvmInternals": "e.g. 'A' stored as 65 (0x0041).",
          "studentObservation": "Character stored."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "char"
        ],
        [
          "Size",
          "16 bits (2 bytes)"
        ],
        [
          "Type",
          "Unsigned Integer"
        ],
        [
          "Range",
          "0 to 65,535 (\\u0000 to \\uffff)"
        ],
        [
          "Default Value",
          "\\u0000 (null character)"
        ],
        [
          "Wrapper Class",
          "java.lang.Character"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "char identifier = 'c';",
      "correctCode": "char letter = 'Z';\nchar digit = '5';",
      "incorrectCode": "char s = \"A\"; // Error: String cannot be converted to char\nchar multi = 'AB'; // Error: unclosed character literal",
      "compilerError": "unclosed character literal",
      "rules": [
        "Characters must use single quotes ('').",
        "Double quotes (\"\") create a String reference."
      ]
    },
    "conceptTree": {
      "id": "char-root",
      "label": "char Type",
      "children": [
        {
          "id": "char-unicode",
          "label": "Unicode (\\u0041)"
        },
        {
          "id": "char-escape",
          "label": "Escape Sequences (\\n, \\t)"
        },
        {
          "id": "char-ascii",
          "label": "Integer Duality ('A' == 65)"
        }
      ]
    },
    "diagramConfig": {
      "type": "bit-width",
      "title": "16-Bit Unsigned Unicode Layout",
      "subtitle": "All 16 bits encode character code unit (0 to 65,535)",
      "config": {
        "bits": 16,
        "typeName": "char",
        "sampleValue": 65,
        "binaryStr": "0000000001000001",
        "minVal": "\\u0000 (0)",
        "maxVal": "\\uffff (65535)"
      }
    },
    "codeExamples": {
      "beginner": {
        "code": "public class CharBasics {\n    public static void main(String[] args) {\n        char ch = 'A';\n        System.out.println(\"Character: \" + ch);\n        System.out.println(\"ASCII code: \" + (int) ch);\n    }\n}",
        "output": "Character: A\nASCII code: 65",
        "explanation": "Demonstrates character literal and its underlying integer code point 65."
      },
      "intermediate": {
        "code": "public class CharArithmetic {\n    public static void main(String[] args) {\n        char letter = 'A';\n        letter++; // 'A' (65) -> 'B' (66)\n        System.out.println(\"Next letter: \" + letter);\n    }\n}",
        "output": "Next letter: B",
        "explanation": "Arithmetic on char directly increments Unicode code point."
      },
      "advanced": {
        "code": "public class UnicodeEscapeDemo {\n    public static void main(String[] args) {\n        char omega = '\\u03A9'; // Greek capital letter Omega \u03a9\n        char heart = '\\u2764'; // Heart symbol \u2764\n        System.out.println(\"Unicode: \" + omega + \" \" + heart);\n    }\n}",
        "output": "Unicode: \u03a9 \u2764",
        "explanation": "Uses \\uXXXX hexadecimal Unicode escape sequences."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "char ch = 'A';",
        "explanation": "Stores 65 into 16-bit stack slot.",
        "stackVariables": [
          {
            "name": "ch",
            "type": "char",
            "value": "'A' (65)",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Character: A"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Using double quotes for a single char",
        "incorrectSnippet": "char c = \"X\";",
        "errorMessage": "incompatible types: String cannot be converted to char",
        "explanation": "Double quotes create a java.lang.String object reference.",
        "correctedSnippet": "char c = 'X';",
        "whyCorrectionWorks": "Use single quotes for char."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Lexer & Tokenizer Engines",
        "description": "Compilers (including javac) iterate through source code char-by-char to build AST tokens."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-char_0",
          "question": "What is the underlying numerical value of char 'A' in Java?",
          "options": [
            "1",
            "65",
            "97",
            "0"
          ],
          "correctOptionIndex": 1,
          "explanation": "The ASCII/Unicode code point for uppercase 'A' is decimal 65.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Char Math",
        "description": "Print (char)('A' + 3).",
        "starterCode": "System.out.println((char)('A' + 3));",
        "hints": [
          "D"
        ],
        "solutionCode": "System.out.println((char)('A' + 3));"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-double",
        "title": "double Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-type-boolean",
        "title": "boolean Type",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Character Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Character class documentation."
      }
    ]
  },
  "vars-type-boolean": {
    "id": "vars-type-boolean",
    "slug": "vars-type-boolean",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Logic Types",
    "title": "The boolean Type (Logical true/false)",
    "subtitle": "1-bit logical truth value represented as integer 1 or 0 in JVM bytecode",
    "difficulty": "Beginner",
    "readingTime": "5 min read",
    "prerequisites": [
      "vars-type-char"
    ],
    "objectives": [
      "Define boolean literals (true and false).",
      "Explain why boolean cannot be converted to/from int in Java.",
      "Trace JVM bytecode representation."
    ],
    "whatIs": {
      "beginner": "A boolean represents a truth value that can only be either true or false. It is the foundation of all decision-making and conditions.",
      "technical": "A logical type with exactly two values: true and false. In JVM bytecode, boolean is typically represented as a 32-bit int (1 for true, 0 for false).",
      "terminology": [
        {
          "term": "Boolean Literal",
          "def": "true or false (reserved keywords)."
        },
        {
          "term": "Flag",
          "def": "A boolean variable tracking binary state."
        }
      ],
      "exampleSnippet": "boolean isEligible = true;\nboolean hasAccess = false;\nboolean result = (5 > 3); // evaluates to true"
    },
    "whyNeeded": {
      "problemSolved": "Controlling conditional branching (if, while), loop termination, and asserting invariant states.",
      "whyJavaProvidesIt": "Strong type safety: Java strictly forbids treating integers as booleans (unlike C/C++ where 1==true).",
      "withoutIt": "Accidental bugs like if (x = 1) instead of if (x == 1) would plague Java codebases.",
      "whenToUse": "For conditions, feature flags, validation checks.",
      "whenNotToUse": "For tri-state logic (use Boolean wrapper which can be null, or an enum)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Condition Evaluation",
          "whatHappens": "Relational operator evaluates condition.",
          "jvmInternals": "Pushes 1 (true) or 0 (false) onto operand stack.",
          "studentObservation": "Truth evaluated."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Property",
        "Specification"
      ],
      "tableRows": [
        [
          "Keyword",
          "boolean"
        ],
        [
          "Values",
          "true or false"
        ],
        [
          "JVM Size",
          "4 bytes on stack (as int), 1 byte in boolean[]"
        ],
        [
          "Default Value",
          "false"
        ],
        [
          "Wrapper Class",
          "java.lang.Boolean"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "boolean identifier = condition;",
      "correctCode": "boolean valid = true;\nboolean empty = list.isEmpty();",
      "incorrectCode": "boolean flag = 1; // Compile error: int cannot be converted to boolean",
      "compilerError": "incompatible types: int cannot be converted to boolean",
      "rules": [
        "Java boolean CANNOT be cast or converted to int.",
        "Literals are lowercase: true and false."
      ]
    },
    "conceptTree": {
      "id": "bool-root",
      "label": "boolean Type",
      "children": [
        {
          "id": "bool-ops",
          "label": "Logical Operators (!, &&, ||)"
        },
        {
          "id": "bool-cond",
          "label": "Branching (if / while)"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Boolean Logical Evaluation",
      "subtitle": "Mapped to JVM 1 (true) and 0 (false) in stack slots",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class BooleanBasics {\n    public static void main(String[] args) {\n        boolean isJavaAwesome = true;\n        boolean isFinished = false;\n        System.out.println(\"Java: \" + isJavaAwesome);\n    }\n}",
        "output": "Java: true",
        "explanation": "Declares and prints boolean variables."
      },
      "intermediate": {
        "code": "public class ComparisonDemo {\n    public static void main(String[] args) {\n        int age = 20;\n        boolean canVote = age >= 18;\n        System.out.println(\"Can vote? \" + canVote);\n    }\n}",
        "output": "Can vote? true",
        "explanation": "Assigns the boolean result of a relational comparison directly to a variable."
      },
      "advanced": {
        "code": "public class ShortCircuitLogic {\n    public static void main(String[] args) {\n        String text = null;\n        // Short-circuit && prevents NullPointerException on second condition!\n        boolean isValid = (text != null) && (text.length() > 0);\n        System.out.println(\"Is valid: \" + isValid);\n    }\n}",
        "output": "Is valid: false",
        "explanation": "Short-circuit boolean logic safeguards against null dereference."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "boolean canVote = true;",
        "explanation": "Stores 1 (true) in stack slot.",
        "stackVariables": [
          {
            "name": "canVote",
            "type": "boolean",
            "value": "true",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Java: true"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Using int as a boolean condition",
        "incorrectSnippet": "int status = 1;\nif (status) {} // Error in Java",
        "errorMessage": "incompatible types: int cannot be converted to boolean",
        "explanation": "Java does not treat non-zero integers as truthy.",
        "correctedSnippet": "if (status == 1) {}",
        "whyCorrectionWorks": "Explicitly compare with 1."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Feature Toggles",
        "description": "Microservice architectures toggle new features dynamically using boolean flags."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-type-boolean_0",
          "question": "Can you convert a boolean to an int in Java (e.g. (int) true)?",
          "options": [
            "Yes, returns 1",
            "No, compile error",
            "Only with Math.toInt()",
            "Only in Java 21"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java enforces strict type separation; boolean cannot be converted to int.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Boolean Test",
        "description": "Print (10 > 5).",
        "starterCode": "System.out.println(10 > 5);",
        "hints": [
          "true"
        ],
        "solutionCode": "System.out.println(10 > 5);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-char",
        "title": "char Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-widening",
        "title": "Widening Conversion",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Boolean Class Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Boolean.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Boolean class documentation."
      }
    ]
  },
  "vars-widening": {
    "id": "vars-widening",
    "slug": "vars-widening",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Type Conversions",
    "title": "Widening Primitive Conversion",
    "subtitle": "Automatic implicit type promotion from narrower to wider types without data loss",
    "difficulty": "Core",
    "readingTime": "6 min read",
    "prerequisites": [
      "vars-type-boolean"
    ],
    "objectives": [
      "Trace widening hierarchy: byte -> short -> int -> long -> float -> double.",
      "Understand implicit compiler promotions in arithmetic.",
      "Explain precision loss from long to float."
    ],
    "whatIs": {
      "beginner": "Widening is automatically converting a smaller numeric type into a larger numeric type (like pouring a cup of water into a large pitcher). No data is lost.",
      "technical": "Implicit conversion where the destination type has equal or greater bit capacity. Java performs this automatically at compile time without requiring an explicit cast.",
      "terminology": [
        {
          "term": "Widening",
          "def": "Converting narrower type to wider type automatically."
        },
        {
          "term": "Promotion",
          "def": "Promoting operands in binary expressions to match the widest type."
        }
      ],
      "exampleSnippet": "int small = 100;\nlong big = small; // Automatic widening: int -> long\ndouble dec = big; // Automatic widening: long -> double"
    },
    "whyNeeded": {
      "problemSolved": "Allows smooth arithmetic between different numeric types without cluttering code with manual casts.",
      "whyJavaProvidesIt": "Guarantees that storing smaller values in larger memory spaces is inherently safe.",
      "withoutIt": "Developers would have to manually cast every single mixed-type calculation (e.g. (double) 5 * 2.5).",
      "whenToUse": "When passing smaller types into methods accepting larger types, or mixed arithmetic.",
      "whenNotToUse": "When converting wider to narrower (use narrowing with explicit cast)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Compile-Time Check",
          "whatHappens": "Compiler validates destination is wider.",
          "jvmInternals": "No cast required.",
          "studentObservation": "Code approved."
        },
        {
          "stepNum": 2,
          "headline": "Bytecode Instruction",
          "whatHappens": "Appropriate conversion opcode emitted.",
          "jvmInternals": "JVM i2l, i2d, etc.",
          "studentObservation": "Promoted."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "From",
        "To",
        "Data Loss Risk"
      ],
      "tableRows": [
        [
          "byte",
          "short, int, long, float, double",
          "None"
        ],
        [
          "short / char",
          "int, long, float, double",
          "None"
        ],
        [
          "int",
          "long, double",
          "None"
        ],
        [
          "int / long",
          "float",
          "Least Significant Bits precision loss (23 bits mantissa)"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "WiderType var = narrowerValue;",
      "correctCode": "int x = 42; double d = x; // 42.0",
      "incorrectCode": "long l = 100; int i = l; // Compile error: narrowing requires cast",
      "compilerError": "possible lossy conversion from long to int",
      "rules": [
        "Widening occurs automatically.",
        "Converting int/long to float/double may lose precision in least-significant bits."
      ]
    },
    "conceptTree": {
      "id": "widen-root",
      "label": "Widening Hierarchy",
      "children": [
        {
          "id": "w-num",
          "label": "byte -> short -> int -> long"
        },
        {
          "id": "w-float",
          "label": "long -> float -> double"
        }
      ]
    },
    "diagramConfig": {
      "type": "widening-narrowing",
      "title": "Widening Conversion Pathway",
      "subtitle": "Automatic flow: byte -> short -> int -> long -> float -> double",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class WideningBasics {\n    public static void main(String[] args) {\n        int i = 100;\n        long l = i; // int -> long\n        double d = l; // long -> double\n        System.out.println(\"i = \" + i + \", l = \" + l + \", d = \" + d);\n    }\n}",
        "output": "i = 100, l = 100, d = 100.0",
        "explanation": "Demonstrates widening without data loss."
      },
      "intermediate": {
        "code": "public class MixedArithmeticPromotion {\n    public static void main(String[] args) {\n        int count = 5;\n        double price = 9.99;\n        double total = count * price; // count widened to double before multiplication\n        System.out.println(\"Total: \" + total);\n    }\n}",
        "output": "Total: 49.95",
        "explanation": "Mixed arithmetic automatically widens operands to the widest type."
      },
      "advanced": {
        "code": "public class LongToFloatPrecisionLoss {\n    public static void main(String[] args) {\n        long big = 123456789012345678L;\n        float f = big; // Widening, but float has only 23-bit mantissa!\n        System.out.println(\"Original long:  \" + big);\n        System.out.println(\"Widened float:  \" + (long) f + \" (precision lost!)\");\n    }\n}",
        "output": "Original long:  123456789012345678\nWidened float:  123456786801999872 (precision lost!)",
        "explanation": "Warns that long to float widening can lose precision because 64-bit bits cannot fit in 23-bit mantissa."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int i = 100;",
        "explanation": "Stores 100 in 32-bit slot.",
        "stackVariables": [
          {
            "name": "i",
            "type": "int",
            "value": "100",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "double d = i;",
        "explanation": "Widened to 64-bit IEEE 754 double (100.0).",
        "stackVariables": [
          {
            "name": "i",
            "type": "int",
            "value": "100"
          },
          {
            "name": "d",
            "type": "double",
            "value": "100.0",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "i = 100, l = 100, d = 100.0"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Assuming widening never loses precision",
        "incorrectSnippet": "long l = 123456789012345L; float f = l;",
        "errorMessage": "No compiler error, but runtime precision drops",
        "explanation": "float mantissa is only 23 bits.",
        "correctedSnippet": "double d = l;",
        "whyCorrectionWorks": "Use double or BigDecimal for large numbers."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Graphics Coordinate Transforms",
        "description": "Integer screen coordinates (X, Y) are widened to double vectors for geometric scaling."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-widening_0",
          "question": "Which conversion happens automatically without an explicit cast?",
          "options": [
            "double to int",
            "int to double",
            "long to int",
            "short to byte"
          ],
          "correctOptionIndex": 1,
          "explanation": "int to double is widening and happens automatically.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Test Widening",
        "description": "Assign byte b = 10 to int x and print x.",
        "starterCode": "byte b = 10; int x = b; System.out.println(x);",
        "hints": [
          "10"
        ],
        "solutionCode": "byte b = 10; int x = b; System.out.println(x);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-type-boolean",
        "title": "boolean Type",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-narrowing",
        "title": "Narrowing Conversion",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 5.1.2: Widening Primitive Conversion",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.2",
        "sourceLabel": "Oracle Docs",
        "description": "Widening rules in Java 21 specification."
      }
    ]
  },
  "vars-narrowing": {
    "id": "vars-narrowing",
    "slug": "vars-narrowing",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Type Conversions",
    "title": "Narrowing Primitive Conversion",
    "subtitle": "Explicit casting required to fit wider types into narrower types with truncation risk",
    "difficulty": "Core",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-widening"
    ],
    "objectives": [
      "Apply explicit cast operator (type).",
      "Explain bit truncation when casting wider to narrower integers.",
      "Understand fractional truncation from double to int."
    ],
    "whatIs": {
      "beginner": "Narrowing is forcing a larger value into a smaller storage box using an explicit cast: (int) 3.14. High-order bits or fractional parts are discarded.",
      "technical": "Converting from a wider type to a narrower type. It requires an explicit cast operator (T) and may cause magnitude overflow or precision truncation.",
      "terminology": [
        {
          "term": "Cast Operator",
          "def": "(TargetType) expression."
        },
        {
          "term": "Bit Truncation",
          "def": "Discarding higher-order bits when integer size shrinks."
        }
      ],
      "exampleSnippet": "double price = 99.99;\nint wholeDollars = (int) price; // Truncates decimal -> 99\nint big = 300;\nbyte small = (byte) big; // Truncates high bits -> 44"
    },
    "whyNeeded": {
      "problemSolved": "Intentional downscaling of precision (e.g. extracting whole dollars from price, packing ints into byte buffers).",
      "whyJavaProvidesIt": "Requires explicit programmer confirmation so accidental data loss cannot happen silently.",
      "withoutIt": "Without mandatory casts, accidental conversions would silently corrupt numbers everywhere.",
      "whenToUse": "When you explicitly intend to discard fractional parts or know the value fits in the target range.",
      "whenNotToUse": "When magnitude exceeds destination range and overflow is unintended."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Syntax Validation",
          "whatHappens": "Compiler verifies explicit cast operator present.",
          "jvmInternals": "Emits narrowing bytecode.",
          "studentObservation": "Cast parsed."
        },
        {
          "stepNum": 2,
          "headline": "Bytecode Execution",
          "whatHappens": "Executes d2i, i2b, etc.",
          "jvmInternals": "Truncates bits or discards fractional exponent.",
          "studentObservation": "Result stored."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "From",
        "To",
        "Data Effect"
      ],
      "tableRows": [
        [
          "double / float",
          "int / long",
          "Fractional part truncated toward zero"
        ],
        [
          "int / long",
          "short / byte",
          "Higher-order bits discarded; may flip sign bit!"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "TargetType var = (TargetType) widerValue;",
      "correctCode": "double d = 42.9; int i = (int) d; // 42",
      "incorrectCode": "double d = 42.9; int i = d; // Error: possible lossy conversion",
      "compilerError": "possible lossy conversion from double to int",
      "rules": [
        "Narrowing always requires (TargetType).",
        "Double to integer casts truncate, they do NOT round!"
      ]
    },
    "conceptTree": {
      "id": "narrow-root",
      "label": "Narrowing Casts",
      "children": [
        {
          "id": "narrow-float",
          "label": "Float to Int (Fraction Truncation)"
        },
        {
          "id": "narrow-bits",
          "label": "Int to Byte (Bit Truncation)"
        }
      ]
    },
    "diagramConfig": {
      "type": "widening-narrowing",
      "title": "Narrowing Casts & Bit Truncation",
      "subtitle": "Explicit casting discarding higher-order bits",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class NarrowingBasics {\n    public static void main(String[] args) {\n        double pi = 3.14159;\n        int truncated = (int) pi;\n        System.out.println(\"pi: \" + pi + \" -> (int): \" + truncated);\n    }\n}",
        "output": "pi: 3.14159 -> (int): 3",
        "explanation": "Fractional digits are truncated toward zero."
      },
      "intermediate": {
        "code": "public class BitTruncationDemo {\n    public static void main(String[] args) {\n        int x = 257;\n        byte b = (byte) x;\n        // 257 in binary is 00000000 00000000 00000001 00000001\n        // Truncating to 8 bits keeps only 00000001 (decimal 1!)\n        System.out.println(\"257 as byte: \" + b);\n    }\n}",
        "output": "257 as byte: 1",
        "explanation": "Shows higher 24 bits being discarded, leaving 1!"
      },
      "advanced": {
        "code": "public class SafeNarrowingRangeCheck {\n    public static void main(String[] args) {\n        int value = 150;\n        if (value >= Byte.MIN_VALUE && value <= Byte.MAX_VALUE) {\n            byte b = (byte) value;\n            System.out.println(\"Safe cast: \" + b);\n        } else {\n            System.out.println(\"Value \" + value + \" exceeds byte range!\");\n        }\n    }\n}",
        "output": "Value 150 exceeds byte range!",
        "explanation": "Production pattern: checking bounds before narrowing cast."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "double pi = 3.14;",
        "explanation": "Stack holds 64-bit double.",
        "stackVariables": [
          {
            "name": "pi",
            "type": "double",
            "value": "3.14",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "int i = (int) pi;",
        "explanation": "Truncated to 3.",
        "stackVariables": [
          {
            "name": "pi",
            "type": "double",
            "value": "3.14"
          },
          {
            "name": "i",
            "type": "int",
            "value": "3",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "pi: 3.14159 -> (int): 3"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Expecting (int) to round to nearest integer",
        "incorrectSnippet": "double d = 9.99; int i = (int) d;",
        "errorMessage": "i becomes 9, NOT 10",
        "explanation": "(int) truncates, discarding decimals without rounding.",
        "correctedSnippet": "int i = (int) Math.round(d);",
        "whyCorrectionWorks": "Use Math.round() before casting if rounding is desired."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Audio Sampling Rate Downsampling",
        "description": "24-bit audio streams are downsampled to 16-bit by explicitly shifting and casting."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-narrowing_0",
          "question": "What is the result of (int) 7.9 in Java?",
          "options": [
            "8",
            "7",
            "0",
            "Compiler Error"
          ],
          "correctOptionIndex": 1,
          "explanation": "Casting to int truncates toward zero, resulting in 7.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Cast Truncate",
        "description": "Cast 9.9 to int and print.",
        "starterCode": "System.out.println((int) 9.9);",
        "hints": [
          "9"
        ],
        "solutionCode": "System.out.println((int) 9.9);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-widening",
        "title": "Widening Conversion",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-overflow",
        "title": "Integer Overflow",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 5.1.3: Narrowing Primitive Conversion",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.3",
        "sourceLabel": "Oracle Docs",
        "description": "Narrowing conversion rules in Java 21 specification."
      }
    ]
  },
  "vars-overflow": {
    "id": "vars-overflow",
    "slug": "vars-overflow",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Arithmetic Mechanics",
    "title": "Integer Overflow & Underflow Mechanics",
    "subtitle": "Two's complement circular wraparound and Math.addExact() safe arithmetic",
    "difficulty": "Advanced",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-narrowing"
    ],
    "objectives": [
      "Explain why integer overflow does not throw exceptions in Java.",
      "Trace two's complement sign bit flip.",
      "Use Java 8+ Math.addExact() and Math.multiplyExact() to detect overflow."
    ],
    "whatIs": {
      "beginner": "Integer overflow happens when a calculation exceeds the maximum capacity of a type. Instead of crashing, the number silently wraps around into negative numbers!",
      "technical": "In two's complement arithmetic, incrementing the maximum positive value causes a binary carry into the sign bit, flipping the sign without raising a CPU interrupt.",
      "terminology": [
        {
          "term": "Overflow",
          "def": "Exceeding MAX_VALUE, wrapping to MIN_VALUE."
        },
        {
          "term": "Underflow",
          "def": "Exceeding MIN_VALUE in negative direction, wrapping to MAX_VALUE."
        },
        {
          "term": "Safe Arithmetic",
          "def": "Methods like Math.addExact() that throw ArithmeticException on overflow."
        }
      ],
      "exampleSnippet": "int max = Integer.MAX_VALUE; // 2147483647\nint wrapped = max + 1; // -2147483648 (Silent wraparound!)\nint safe = Math.addExact(max, 1); // Throws ArithmeticException!"
    },
    "whyNeeded": {
      "problemSolved": "Understanding overflow is crucial to prevent catastrophic security flaws (like negative account balances or infinite loops).",
      "whyJavaProvidesIt": "Java prioritizes maximum hardware CPU performance by default (checking overflow on every instruction would slow down math by 30%).",
      "withoutIt": "Calculations with large integers could silently produce negative results and cause severe financial bugs.",
      "whenToUse": "Always check bounds or use Math.*Exact methods in sensitive monetary or security calculations.",
      "whenNotToUse": "In graphics counters where circular modulo wraparound is intentional."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Binary Addition",
          "whatHappens": "Adds 1 to 01111111 (127).",
          "jvmInternals": "Hardware carry bit propagates into MSB.",
          "studentObservation": "MSB becomes 1."
        },
        {
          "stepNum": 2,
          "headline": "Sign Flip",
          "whatHappens": "MSB 1 indicates negative number.",
          "jvmInternals": "Two's complement interpretation yields -128.",
          "studentObservation": "Wrapped value stored."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Operation",
        "Standard Java Arithmetic",
        "Math.*Exact Methods"
      ],
      "tableRows": [
        [
          "Integer.MAX_VALUE + 1",
          "-2147483648 (Silent wraparound)",
          "Throws java.lang.ArithmeticException"
        ],
        [
          "Integer.MIN_VALUE - 1",
          "2147483647 (Silent wraparound)",
          "Throws java.lang.ArithmeticException"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "Math.addExact(a, b);",
      "correctCode": "int safe = Math.addExact(x, y);",
      "incorrectCode": "int total = max + 1; // Silent bug!",
      "compilerError": "",
      "rules": [
        "Standard operators (+, -, *) never throw on overflow.",
        "Use Math.addExact(), Math.subtractExact(), Math.multiplyExact() for safety."
      ]
    },
    "conceptTree": {
      "id": "over-root",
      "label": "Overflow Mechanics",
      "children": [
        {
          "id": "over-circ",
          "label": "Two's Complement Ring"
        },
        {
          "id": "over-safe",
          "label": "Math.addExact() Safe API"
        }
      ]
    },
    "diagramConfig": {
      "type": "overflow-ring",
      "title": "Two's Complement Wraparound Ring",
      "subtitle": "Demonstrating how +127 + 1 circularly wraps into -128 on an 8-bit circle",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class OverflowDemo {\n    public static void main(String[] args) {\n        int max = Integer.MAX_VALUE;\n        System.out.println(\"Max int:     \" + max);\n        System.out.println(\"Max int + 1: \" + (max + 1) + \" (silent overflow!)\");\n    }\n}",
        "output": "Max int:     2147483647\nMax int + 1: -2147483648 (silent overflow!)",
        "explanation": "Demonstrates the classic integer overflow bug."
      },
      "intermediate": {
        "code": "public class SafeArithmeticDemo {\n    public static void main(String[] args) {\n        int max = Integer.MAX_VALUE;\n        try {\n            int safe = Math.addExact(max, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Safely caught overflow: \" + e.getMessage());\n        }\n    }\n}",
        "output": "Safely caught overflow: integer overflow",
        "explanation": "Math.addExact() detects overflow and prevents silent data corruption."
      },
      "advanced": {
        "code": "public class LoopOverflowBug {\n    public static void main(String[] args) {\n        // int counter = Integer.MAX_VALUE - 2;\n        // while (counter >= 0) { counter++; } // Infinite loop bug!\n        System.out.println(\"Checked safety: use long or termination guard\");\n    }\n}",
        "output": "Checked safety: use long or termination guard",
        "explanation": "Loop counter overflowing into negative numbers can cause infinite loops."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "int max = 2147483647;",
        "explanation": "Max positive int loaded.",
        "stackVariables": [
          {
            "name": "max",
            "type": "int",
            "value": "2147483647",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "int wrapped = max + 1;",
        "explanation": "Carry flips MSB to 1; becomes -2147483648.",
        "stackVariables": [
          {
            "name": "max",
            "type": "int",
            "value": "2147483647"
          },
          {
            "name": "wrapped",
            "type": "int",
            "value": "-2147483648",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Max int + 1: -2147483648"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Thinking Java throws an exception on integer overflow",
        "incorrectSnippet": "int x = Integer.MAX_VALUE + 10;",
        "errorMessage": "Does NOT throw an exception!",
        "explanation": "Standard Java integer arithmetic does not check for overflow.",
        "correctedSnippet": "int x = Math.addExact(Integer.MAX_VALUE, 10);",
        "whyCorrectionWorks": "Use Math.addExact to detect overflow."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Bank Transfer Exploit Prevention",
        "description": "Preventing balance overflow exploits where depositing billions turns an account balance negative."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-overflow_0",
          "question": "What is the result of (byte)(127 + 1) in Java?",
          "options": [
            "128",
            "-128",
            "0",
            "ArithmeticException"
          ],
          "correctOptionIndex": 1,
          "explanation": "Because byte is signed 8-bit, 127 + 1 wraps around to -128.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Overflow Check",
        "description": "Print Integer.MAX_VALUE + 1.",
        "starterCode": "System.out.println(Integer.MAX_VALUE + 1);",
        "hints": [
          "-2147483648"
        ],
        "solutionCode": "System.out.println(Integer.MAX_VALUE + 1);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-narrowing",
        "title": "Narrowing Conversion",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-boxing",
        "title": "Autoboxing & Unboxing",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Java Math.addExact() Docs",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#addExact(int,int)",
        "sourceLabel": "Oracle Docs",
        "description": "Official documentation on safe arithmetic methods in Java 21."
      }
    ]
  },
  "vars-boxing": {
    "id": "vars-boxing",
    "slug": "vars-boxing",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Wrapper Classes",
    "title": "Autoboxing & Unboxing Mechanics",
    "subtitle": "Seamless conversion between primitives and their wrapper class objects with IntegerCache pool",
    "difficulty": "Core",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-overflow"
    ],
    "objectives": [
      "Explain autoboxing (primitive -> wrapper) and unboxing (wrapper -> primitive).",
      "Understand IntegerCache (-128 to 127) pool equality rules.",
      "Prevent NullPointerException on unboxing."
    ],
    "whatIs": {
      "beginner": "Autoboxing is Java automatically putting a primitive into an object box (like int into Integer). Unboxing is taking it back out.",
      "technical": "Automatic syntactic sugar introduced in Java 5 where the compiler inserts Integer.valueOf() for boxing and .intValue() for unboxing.",
      "terminology": [
        {
          "term": "Autoboxing",
          "def": "int -> Integer (via Integer.valueOf)."
        },
        {
          "term": "Unboxing",
          "def": "Integer -> int (via intValue())."
        },
        {
          "term": "IntegerCache",
          "def": "JVM internal pool caching Integer objects from -128 to 127."
        }
      ],
      "exampleSnippet": "Integer boxed = 100; // Autoboxing: Integer.valueOf(100)\nint primitive = boxed; // Unboxing: boxed.intValue()\nList<Integer> list = new ArrayList<>();\nlist.add(42); // Autoboxing inside collections"
    },
    "whyNeeded": {
      "problemSolved": "Allows primitive types to be stored inside generic Java Collections (List<Integer>, Map<String, Double>) which can only hold objects.",
      "whyJavaProvidesIt": "Provides seamless interoperability between primitive performance and object-oriented collections.",
      "withoutIt": "Programmers would manually have to write new Integer(x) and obj.intValue() on every collection operation.",
      "whenToUse": "When adding primitives to generic Collections.",
      "whenNotToUse": "In tight CPU-bound loops (hidden object allocation causes massive GC pressure!)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Autoboxing",
          "whatHappens": "Compiler encounters primitive where Object expected.",
          "jvmInternals": "Inserts Integer.valueOf(x).",
          "studentObservation": "Checks IntegerCache."
        },
        {
          "stepNum": 2,
          "headline": "Unboxing",
          "whatHappens": "Compiler encounters wrapper where primitive expected.",
          "jvmInternals": "Inserts obj.intValue().",
          "studentObservation": "NPE if obj is null!"
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Primitive",
        "Wrapper Class",
        "Cached Range"
      ],
      "tableRows": [
        [
          "byte",
          "Byte",
          "-128 to 127 (All)"
        ],
        [
          "short",
          "Short",
          "-128 to 127"
        ],
        [
          "int",
          "Integer",
          "-128 to 127"
        ],
        [
          "char",
          "Character",
          "\\u0000 to \\u007f (0 to 127)"
        ],
        [
          "boolean",
          "Boolean",
          "Boolean.TRUE, Boolean.FALSE"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "WrapperClass obj = primitiveValue;",
      "correctCode": "Integer a = 50; int b = a;",
      "incorrectCode": "Integer n = null; int x = n; // Throws NullPointerException!",
      "compilerError": "java.lang.NullPointerException",
      "rules": [
        "Unboxing a null wrapper throws NullPointerException.",
        "Do not compare wrappers with ==; use .equals() or unbox first!"
      ]
    },
    "conceptTree": {
      "id": "box-root",
      "label": "Boxing Mechanics",
      "children": [
        {
          "id": "box-cache",
          "label": "IntegerCache (-128 to 127)"
        },
        {
          "id": "box-npe",
          "label": "Unboxing NullPointerException"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Autoboxing Stack to Heap",
      "subtitle": "Stack primitive converted into Heap Integer instance via Integer.valueOf()",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class BoxingBasics {\n    public static void main(String[] args) {\n        Integer a = 100; // Autoboxing\n        int b = a;       // Unboxing\n        System.out.println(\"Boxed: \" + a + \", Unboxed: \" + b);\n    }\n}",
        "output": "Boxed: 100, Unboxed: 100",
        "explanation": "Demonstrates seamless autoboxing and unboxing."
      },
      "intermediate": {
        "code": "public class IntegerCacheSurprise {\n    public static void main(String[] args) {\n        Integer x = 127, y = 127;\n        System.out.println(\"127 == 127? \" + (x == y) + \" (Cached!)\");\n        Integer a = 128, b = 128;\n        System.out.println(\"128 == 128? \" + (a == b) + \" (Different objects!)\");\n        System.out.println(\"a.equals(b)? \" + a.equals(b) + \" (Always use equals!)\");\n    }\n}",
        "output": "127 == 127? true (Cached!)\n128 == 128? false (Different objects!)\na.equals(b)? true (Always use equals!)",
        "explanation": "The famous IntegerCache gotcha: numbers -128..127 share cached heap instances; 128+ allocates distinct objects!"
      },
      "advanced": {
        "code": "public class UnboxingNPE {\n    public static void main(String[] args) {\n        Integer count = null;\n        try {\n            int x = count; // Hidden .intValue() call throws NPE!\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught unboxing NullPointerException!\");\n        }\n    }\n}",
        "output": "Caught unboxing NullPointerException!",
        "explanation": "Unboxing a null wrapper variable results in NullPointerException."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "Integer a = 100;",
        "explanation": "Calls Integer.valueOf(100), returns cached Heap reference.",
        "stackVariables": [
          {
            "name": "a",
            "type": "Integer",
            "value": "@Integer(100)",
            "isHighlighted": true
          }
        ],
        "consoleOutput": "Boxed: 100, Unboxed: 100"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Comparing two Integer wrappers using ==",
        "incorrectSnippet": "Integer a = 1000, b = 1000; if (a == b) {}",
        "errorMessage": "False! Compares memory reference addresses",
        "explanation": "Numbers outside -128..127 allocate separate objects.",
        "correctedSnippet": "if (a.equals(b)) {}",
        "whyCorrectionWorks": "Always compare wrapper class objects using .equals()!"
      }
    ],
    "realWorldApplications": [
      {
        "title": "Generic Collections Framework",
        "description": "java.util.List, Set, and Map rely on autoboxing to store numbers seamlessly."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-boxing_0",
          "question": "Why does Integer a = 128; Integer b = 128; a == b return false?",
          "options": [
            "Java arithmetic error",
            "128 exceeds the -128 to 127 IntegerCache pool",
            "Wrappers cannot be compared",
            "128 overflows"
          ],
          "correctOptionIndex": 1,
          "explanation": "Values outside -128 to 127 allocate separate heap instances with different memory addresses.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Test Equals",
        "description": "Check 100 == 100 vs 200 == 200 on Integer.",
        "starterCode": "Integer a=100, b=100; System.out.println(a==b);",
        "hints": [
          "true"
        ],
        "solutionCode": "Integer a=100, b=100; System.out.println(a==b);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-overflow",
        "title": "Integer Overflow",
        "relationship": "prerequisite"
      },
      {
        "id": "vars-null-aliasing",
        "title": "null & Aliasing",
        "relationship": "next"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "Autoboxing and Unboxing (Oracle Docs)",
        "url": "https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html",
        "sourceLabel": "Oracle Docs",
        "description": "Official Java tutorial on autoboxing."
      }
    ]
  },
  "vars-null-aliasing": {
    "id": "vars-null-aliasing",
    "slug": "vars-null-aliasing",
    "track": "java",
    "moduleNumber": "04",
    "moduleTitle": "Variables and Data Types",
    "topicTitle": "Reference Mechanics",
    "title": "Object References, null, and Aliasing",
    "subtitle": "Memory pointer mechanics, null references, and reference aliasing bugs",
    "difficulty": "Advanced",
    "readingTime": "7 min read",
    "prerequisites": [
      "vars-boxing"
    ],
    "objectives": [
      "Understand null as a 64-bit zero pointer.",
      "Diagnose reference aliasing where two variables mutate one object.",
      "Prevent NullPointerException using modern Java 21 checks."
    ],
    "whatIs": {
      "beginner": "A reference variable doesn't hold data directly; it holds an address. If two variables hold the same address, they are aliases\u2014changing one changes what both see!",
      "technical": "Reference variables store 64-bit addresses pointing to object headers on the Heap. The null literal represents an address of 0x0 pointing to no instance.",
      "terminology": [
        {
          "term": "null",
          "def": "A special literal representing the absence of an object address."
        },
        {
          "term": "Aliasing",
          "def": "Multiple reference variables pointing to the exact same heap instance."
        },
        {
          "term": "Dereferencing",
          "def": "Following a pointer to read or modify fields on the heap."
        }
      ],
      "exampleSnippet": "String a = new String(\"Hello\");\nString b = a; // Aliasing: b now points to the same instance as a!\nString c = null; // Points nowhere"
    },
    "whyNeeded": {
      "problemSolved": "Enables shared state, modular object graphs, and memory efficiency without copying large objects.",
      "whyJavaProvidesIt": "Allows dynamic object relationships, linked structures (trees, graphs), and Polymorphism.",
      "withoutIt": "Every assignment would duplicate entire megabytes of object memory across the system.",
      "whenToUse": "When multiple components need to coordinate over shared state.",
      "whenNotToUse": "When unexpected side-effect mutations must be avoided (use defensive copying or immutable Records)."
    },
    "howItWorks": {
      "steps": [
        {
          "stepNum": 1,
          "headline": "Reference Copy",
          "whatHappens": "b = a copies the 64-bit address.",
          "jvmInternals": "Both variables hold identical pointer.",
          "studentObservation": "Aliasing active."
        },
        {
          "stepNum": 2,
          "headline": "Field Mutation",
          "whatHappens": "b.field = 50 modifies heap memory.",
          "jvmInternals": "a.field reflects change immediately.",
          "studentObservation": "Shared state modified."
        }
      ]
    },
    "classifications": {
      "tableHeaders": [
        "Concept",
        "Behavior",
        "JVM Memory Reality"
      ],
      "tableRows": [
        [
          "Reference Copy (b = a)",
          "Both point to same object",
          "Copies 64-bit memory address only"
        ],
        [
          "Primitive Copy (y = x)",
          "Completely independent",
          "Copies raw data bits into new stack slot"
        ],
        [
          "null Reference",
          "Throws NPE on dereference",
          "Address is binary 0x0000000000000000"
        ]
      ]
    },
    "syntaxAndRules": {
      "syntaxPattern": "ReferenceType var = existingRef;",
      "correctCode": "Person p1 = new Person(); Person p2 = p1;",
      "incorrectCode": "Person p = null; p.getName(); // Throws NullPointerException",
      "compilerError": "java.lang.NullPointerException",
      "rules": [
        "Assigning a reference copies the pointer, NOT the object.",
        "Always check for null before invoking methods."
      ]
    },
    "conceptTree": {
      "id": "alias-root",
      "label": "Reference Mechanics",
      "children": [
        {
          "id": "alias-ptr",
          "label": "Pointer Aliasing (Shared Heap)"
        },
        {
          "id": "alias-null",
          "label": "null Safety & Objects.requireNonNull"
        }
      ]
    },
    "diagramConfig": {
      "type": "stack-heap",
      "title": "Reference Aliasing in Stack and Heap",
      "subtitle": "Two stack variables (p1, p2) holding identical pointer to one Heap instance",
      "config": {}
    },
    "codeExamples": {
      "beginner": {
        "code": "public class AliasingDemo {\n    static class Counter { int val = 10; }\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = c1; // Aliasing!\n        c2.val = 99;\n        System.out.println(\"c1.val: \" + c1.val + \" (mutated through c2!)\");\n    }\n}",
        "output": "c1.val: 99 (mutated through c2!)",
        "explanation": "Because c1 and c2 share the same address, mutating through c2 mutates what c1 sees!"
      },
      "intermediate": {
        "code": "public class ModernNullCheck {\n    public static void main(String[] args) {\n        String name = null;\n        // Java modern Objects.requireNonNullElse\n        String safe = java.util.Objects.requireNonNullElse(name, \"Guest\");\n        System.out.println(\"User: \" + safe);\n    }\n}",
        "output": "User: Guest",
        "explanation": "Modern Java 21 safe null handling with Objects.requireNonNullElse."
      },
      "advanced": {
        "code": "public class DefensiveCopyingFix {\n    record Point(int x, int y) {} // Immutable Java 21 Record eliminates aliasing bugs!\n    public static void main(String[] args) {\n        Point pt1 = new Point(10, 20);\n        Point pt2 = pt1; // Safe! Records are strictly immutable!\n        System.out.println(\"Safe immutable record: \" + pt2);\n    }\n}",
        "output": "Safe immutable record: Point[x=10, y=20]",
        "explanation": "Demonstrates eliminating aliasing bugs with immutable Java 21 Records."
      }
    },
    "visualizerSteps": [
      {
        "step": 1,
        "line": 3,
        "codeSnippet": "Counter c1 = new Counter();",
        "explanation": "Allocates Counter @0x7F01A4 on heap.",
        "stackVariables": [
          {
            "name": "c1",
            "type": "Counter",
            "value": "@0x7F01A4",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 2,
        "line": 4,
        "codeSnippet": "Counter c2 = c1;",
        "explanation": "c2 copies 0x7F01A4 pointer. Aliased!",
        "stackVariables": [
          {
            "name": "c1",
            "type": "Counter",
            "value": "@0x7F01A4"
          },
          {
            "name": "c2",
            "type": "Counter",
            "value": "@0x7F01A4",
            "isHighlighted": true
          }
        ],
        "consoleOutput": ""
      },
      {
        "step": 3,
        "line": 5,
        "codeSnippet": "c2.val = 99;",
        "explanation": "Updates field in heap instance @0x7F01A4.",
        "stackVariables": [
          {
            "name": "c1",
            "type": "Counter",
            "value": "@0x7F01A4"
          },
          {
            "name": "c2",
            "type": "Counter",
            "value": "@0x7F01A4"
          }
        ],
        "consoleOutput": "c1.val: 99 (mutated through c2!)"
      }
    ],
    "commonMistakes": [
      {
        "headline": "Assuming reference assignment clones the object",
        "incorrectSnippet": "List<String> list2 = list1; list2.clear();",
        "errorMessage": "list1 is also cleared!",
        "explanation": "list2 is an alias, not a copy.",
        "correctedSnippet": "List<String> list2 = new ArrayList<>(list1);",
        "whyCorrectionWorks": "Create an explicit defensive copy."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Cache & State Invalidation",
        "description": "State management engines use immutable snapshots to prevent unexpected aliasing mutation bugs across UI components."
      }
    ],
    "practice": {
      "quiz": [
        {
          "id": "q_vars-null-aliasing_0",
          "question": "What happens in memory when you execute: Box b2 = b1;?",
          "options": [
            "A new Box is created on the heap",
            "The 64-bit memory address of b1 is copied to b2",
            "b1 is deallocated",
            "b2 points to null"
          ],
          "correctOptionIndex": 1,
          "explanation": "Only the reference pointer address is copied; both variables reference the identical heap object.",
          "hint": undefined
        }
      ],
      "codingPrompt": {
        "title": "Aliasing Test",
        "description": "Mutate array through alias.",
        "starterCode": "int[] a = {1, 2}; int[] b = a; b[0] = 99; System.out.println(a[0]);",
        "hints": [
          "99"
        ],
        "solutionCode": "int[] a = {1, 2}; int[] b = a; b[0] = 99; System.out.println(a[0]);"
      }
    },
    "relatedConcepts": [
      {
        "id": "vars-boxing",
        "title": "Autoboxing & Unboxing",
        "relationship": "prerequisite"
      }
    ],
    "references": [
      {
        "type": "oracle",
        "title": "JLS 4.3: Reference Types and Values",
        "url": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.3",
        "sourceLabel": "Oracle Docs",
        "description": "Official specification of reference types and null in Java 21."
      }
    ]
  }
};
