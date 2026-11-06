/**
 * OOPS LAB — GROUP 4: EXECUTION AND DEPENDENCIES REPOSITORY (MODULES 22–26)
 * Conforms strictly to Master Specification Sections 10, 11, 12, 13 & 14.
 * Generated with verified Java source code, 2D AST/runtime nodes, and Section 17 educational walkthroughs.
 */

import { SubsectionDefinition } from './types';

export const GROUP4_SUBSECTIONS_BY_MODULE: Record<string, SubsectionDefinition[]> = {
  "exception-flow": [
    {
      "id": "22.1-normal-exec",
      "code": "22.1",
      "title": "Normal Sequential Control Flow",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.1-s1",
          "title": "1. Uninterrupted Sequential Path",
          "level": "beginner",
          "learningObjective": "Track standard sequential instruction execution when no exceptions are thrown.",
          "javaSource": "public class NormalFlow {\n    public static void main(String[] args) {\n        System.out.println(\"Step 1: Start\");\n        int result = 10 / 2;\n        System.out.println(\"Step 2: Success = \" + result);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-flow-1",
                "type": "variableNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "node-flow-1",
                  "entityType": "variable",
                  "name": "Step 1: Start",
                  "variableType": "Execution Step",
                  "variableValue": "Normal Exit",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-flow-2",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "node-flow-2",
                  "entityType": "variable",
                  "name": "Step 2: 10 / 2 = 5",
                  "variableType": "Result",
                  "variableValue": "Completed without exception",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-seq-flow",
                "source": "node-flow-1",
                "target": "node-flow-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-seq-flow",
                  "type": "call",
                  "label": "sequential continuation",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Normal execution follows a deterministic sequential control path from statement to statement.",
            "whyIsItUsed": "Baseline for understanding how exceptional conditions disrupt and branch execution.",
            "javaSyntax": "int result = 10 / 2;",
            "howItWorks": "PC register advances monotonically through method bytecode.",
            "visualRepresentation": "Straight sequence arrow between execution step nodes.",
            "realWorldExample": "Driving along a clear, unobstructed highway.",
            "commonMistakes": "Assuming exceptions occur in predictable normal flows.",
            "challenge": "Step into next statement."
          }
        }
      ]
    },
    {
      "id": "22.2-try-catch",
      "code": "22.2",
      "title": "try-catch Block Handling",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.2-s1",
          "title": "1. Catching ArithmeticException (Division by Zero)",
          "level": "beginner",
          "learningObjective": "Observe execution jumping from throw point inside `try` directly into matching `catch` block.",
          "javaSource": "public class TryCatchDemo {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0; // Throws ArithmeticException\n            System.out.println(\"Unreachable\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"Handled: Cannot divide by zero!\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-try-err",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 120
                },
                "data": {
                  "id": "node-try-err",
                  "entityType": "variable",
                  "name": "try: 10 / 0",
                  "variableType": "Exception Point",
                  "variableValue": "Throws ArithmeticException",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-catch-handler",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "node-catch-handler",
                  "entityType": "variable",
                  "name": "catch (ArithmeticException e)",
                  "variableType": "Exception Handler",
                  "variableValue": "Handled: / by zero",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ex-jump",
                "source": "node-try-err",
                "target": "node-catch-handler",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ex-jump",
                  "type": "exception-flow",
                  "label": "exception caught",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`try-catch` intercepts exceptions and redirects control flow to a designated error-handling block.",
            "whyIsItUsed": "Prevents program crashes and allows graceful degradation or error recovery.",
            "javaSyntax": "try { ... } catch (ArithmeticException e) { ... }",
            "howItWorks": "JVM consults method's Exception Table; matches PC offset to catch handler range.",
            "visualRepresentation": "Red exception jump arrow bypassing remaining try body and entering catch block.",
            "realWorldExample": "A fire alarm redirecting occupants directly to the emergency exit stairs.",
            "commonMistakes": "Swallowing exceptions with empty catch blocks without logging.",
            "challenge": "Inspect the stack trace with `e.printStackTrace()`."
          }
        }
      ]
    },
    {
      "id": "22.3-multiple-catches",
      "code": "22.3",
      "title": "Multiple Catch Blocks & Precedence",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.3-s1",
          "title": "1. Specific to General Catch Matching",
          "level": "intermediate",
          "learningObjective": "Demonstrate that catch blocks are evaluated top-to-bottom and must be ordered from specific to general.",
          "javaSource": "public class MultiCatchDemo {\n    public static void main(String[] args) {\n        try {\n            String s = null;\n            s.length(); // Throws NullPointerException\n        } catch (NullPointerException e) {\n            System.out.println(\"Matched specific NullPointerException!\");\n        } catch (Exception e) {\n            System.out.println(\"Generic Exception fallback\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-ex-src",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "node-ex-src",
                  "entityType": "variable",
                  "name": "s.length()",
                  "variableType": "Throw Event",
                  "variableValue": "NullPointerException",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-c1-hit",
                "type": "variableNode",
                "position": {
                  "x": 460,
                  "y": 80
                },
                "data": {
                  "id": "node-c1-hit",
                  "entityType": "variable",
                  "name": "catch (NullPointerException) [MATCHED]",
                  "variableType": "Handler",
                  "variableValue": "Executed",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-c2-skip",
                "type": "variableNode",
                "position": {
                  "x": 460,
                  "y": 220
                },
                "data": {
                  "id": "node-c2-skip",
                  "entityType": "variable",
                  "name": "catch (Exception) [SKIPPED]",
                  "variableType": "Handler",
                  "variableValue": "Bypassed",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-hit-c1",
                "source": "node-ex-src",
                "target": "node-c1-hit",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hit-c1",
                  "type": "exception-flow",
                  "label": "matches 1st handler",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multiple catch blocks allow handling different exception types with specialized logic.",
            "whyIsItUsed": "Specific child exceptions must precede parent exceptions; otherwise, unreachable code compile error occurs.",
            "javaSyntax": "catch (NullPointerException e) { ... } catch (Exception e) { ... }",
            "howItWorks": "JVM checks exception type against each handler entry in top-to-bottom order.",
            "visualRepresentation": "Red arrow entering matched specific catch block; general handler marked skipped.",
            "realWorldExample": "A medical triage center directing patients to dental, trauma, or general care.",
            "commonMistakes": "Placing `catch (Exception e)` before `catch (NullPointerException e)` (compile error).",
            "challenge": "Add a third catch for `IllegalArgumentException`."
          }
        }
      ]
    },
    {
      "id": "22.4-hierarchy",
      "code": "22.4",
      "title": "Java Exception Class Hierarchy",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.4-s1",
          "title": "1. Throwable -> Error & Exception -> RuntimeException",
          "level": "intermediate",
          "learningObjective": "Inspect the root Java exception hierarchy and distinguish checked from unchecked branches.",
          "javaSource": "public class ExceptionHierarchy {\n    // java.lang.Throwable\n    //   |-- java.lang.Error (Fatal JVM issues: OutOfMemoryError, StackOverflowError)\n    //   |-- java.lang.Exception (Checked exceptions: IOException, SQLException)\n    //         |-- java.lang.RuntimeException (Unchecked: NullPointer, Arithmetic)\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-throwable",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 40
                },
                "data": {
                  "id": "cls-throwable",
                  "entityType": "class",
                  "name": "Throwable",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-msg",
                      "name": "getMessage()",
                      "returnType": "String",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-error",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 180
                },
                "data": {
                  "id": "cls-error",
                  "entityType": "class",
                  "name": "Error [Unchecked/Fatal]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-exception",
                "type": "classNode",
                "position": {
                  "x": 600,
                  "y": 180
                },
                "data": {
                  "id": "cls-exception",
                  "entityType": "class",
                  "name": "Exception [Checked]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-runtime",
                "type": "classNode",
                "position": {
                  "x": 600,
                  "y": 320
                },
                "data": {
                  "id": "cls-runtime",
                  "entityType": "class",
                  "name": "RuntimeException [Unchecked]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-err-ext",
                "source": "cls-error",
                "target": "cls-throwable",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-err-ext",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-ex-ext",
                "source": "cls-exception",
                "target": "cls-throwable",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ex-ext",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-rt-ext",
                "source": "cls-runtime",
                "target": "cls-exception",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rt-ext",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Throwable is the superclass of all errors and exceptions in the Java language.",
            "whyIsItUsed": "Enables polymorphism across error handling routines and establishes language-enforced checked exception rules.",
            "javaSyntax": "public class CustomEx extends Exception { ... }",
            "howItWorks": "JVM class loader loads Throwable tree into Metaspace and builds vtable references.",
            "visualRepresentation": "Hierarchical inheritance tree with Error on left branch and Exception/RuntimeException on right.",
            "realWorldExample": "A company reporting hierarchy from CEO down to hardware failures vs recoverable procedural errors.",
            "commonMistakes": "Catching `Throwable` directly instead of specific exceptions (catches fatal JVM Errors).",
            "challenge": "Add an `IOException` node under `Exception`."
          }
        }
      ]
    },
    {
      "id": "22.5-checked-unchecked",
      "code": "22.5",
      "title": "Checked vs Unchecked Exceptions",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.5-s1",
          "title": "1. Compiler Verification vs Runtime Panics",
          "level": "intermediate",
          "learningObjective": "Compare compile-time checked exceptions (must declare or catch) with runtime unchecked exceptions.",
          "javaSource": "import java.io.*;\npublic class CheckedUnchecked {\n    void readFile() throws IOException {\n        // Checked: must declare throws or catch\n        FileReader fr = new FileReader(\"missing.txt\");\n    }\n    void divide(int a, int b) {\n        // Unchecked: compiles without throws\n        int res = a / b;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-chk",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "node-chk",
                  "entityType": "variable",
                  "name": "IOException [Checked]",
                  "variableType": "Compile-Time Enforced",
                  "variableValue": "Must handle or declare throws",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "node-unchk",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "node-unchk",
                  "entityType": "variable",
                  "name": "ArithmeticException [Unchecked]",
                  "variableType": "Runtime Flaw",
                  "variableValue": "Subclass of RuntimeException",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-comp-diff",
                "source": "node-chk",
                "target": "node-unchk",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-comp-diff",
                  "type": "dependency",
                  "label": "contrasts with",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Checked exceptions are verified by javac at compile-time; unchecked exceptions subclass RuntimeException and occur at runtime.",
            "whyIsItUsed": "Checked exceptions model anticipated recoverable external failures (network, file missing); unchecked indicate bugs.",
            "javaSyntax": "void fn() throws IOException { ... }",
            "howItWorks": "javac inspects AST method declarations; unhandled checked throws emit compiler errors.",
            "visualRepresentation": "Two distinct cards contrasting compile-time safety badge with runtime bug indicator.",
            "realWorldExample": "A passport check at airport customs (checked) vs accidentally tripping on the runway (unchecked).",
            "commonMistakes": "Catching unchecked NullPointerException with try-catch instead of doing null checks.",
            "challenge": "Add a null check to eliminate NullPointerException safely."
          }
        }
      ]
    },
    {
      "id": "22.6-throw-statement",
      "code": "22.6",
      "title": "throw Statement Execution",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.6-s1",
          "title": "1. Instantiating and Throwing IllegalArgumentException",
          "level": "beginner",
          "learningObjective": "Trace how the `throw` keyword creates an exception object on the heap and initiates immediate control transfer.",
          "javaSource": "public class ThrowDemo {\n    public static void setAge(int age) {\n        if (age < 0) {\n            throw new IllegalArgumentException(\"Age cannot be negative: \" + age);\n        }\n    }\n    public static void main(String[] args) {\n        setAge(-5);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-throw-point",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "node-throw-point",
                  "entityType": "variable",
                  "name": "setAge(-5)",
                  "variableType": "Validator Check",
                  "variableValue": "Condition age < 0 evaluates true",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "heap-ex-obj",
                "type": "heapObjectNode",
                "position": {
                  "x": 500,
                  "y": 120
                },
                "data": {
                  "id": "heap-ex-obj",
                  "entityType": "heap-object",
                  "name": "IllegalArgumentException",
                  "className": "IllegalArgumentException",
                  "address": "@0xEX01",
                  "fields": [
                    {
                      "id": "f-det",
                      "name": "detailMessage",
                      "type": "String",
                      "value": "\"Age cannot be negative: -5\""
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-alloc-throw",
                "source": "node-throw-point",
                "target": "heap-ex-obj",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-alloc-throw",
                  "type": "exception-flow",
                  "label": "allocates & throws",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The `throw` keyword explicitly terminates normal execution and raises an exception object instance.",
            "whyIsItUsed": "Guards method invariants and prevents invalid state from corrupting program memory.",
            "javaSyntax": "throw new IllegalArgumentException(\"Invalid input\");",
            "howItWorks": "Bytecode `athrow` allocates exception instance on heap, populates stack trace, and halts method execution.",
            "visualRepresentation": "Red dashed flow originating from validation statement pointing to newly allocated heap exception object.",
            "realWorldExample": "An umpire blowing a whistle to halt play after a foul.",
            "commonMistakes": "Throwing generic `new Exception()` instead of descriptive specific types.",
            "challenge": "Validate maximum age limit of 150."
          }
        }
      ]
    },
    {
      "id": "22.7-throws-clause",
      "code": "22.7",
      "title": "throws Clause Contract",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.7-s1",
          "title": "1. Method Signature Exception Declaration",
          "level": "intermediate",
          "learningObjective": "Understand how the `throws` keyword in a method signature declares checked exceptions to callers.",
          "javaSource": "import java.io.*;\npublic class ThrowsDemo {\n    public static void loadConfig(String path) throws FileNotFoundException, IOException {\n        FileInputStream fis = new FileInputStream(path);\n    }\n    public static void main(String[] args) {\n        try {\n            loadConfig(\"app.properties\");\n        } catch (IOException e) {\n            System.out.println(\"Config missing!\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "m-caller",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "m-caller",
                  "entityType": "method",
                  "name": "main(String[] args)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String[] args"
                  ],
                  "body": "try { loadConfig(); } catch (IOException e) { ... }",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "m-callee",
                "type": "methodNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "m-callee",
                  "entityType": "method",
                  "name": "loadConfig(String path)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String path"
                  ],
                  "body": "throws FileNotFoundException, IOException",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-throws-contract",
                "source": "m-caller",
                "target": "m-callee",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-throws-contract",
                  "type": "call",
                  "label": "invokes (caller handles IOException)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The `throws` clause declares the list of checked exceptions that a method may pass up to callers.",
            "whyIsItUsed": "Documents failure modes in the public API contract so callers are forced to handle them.",
            "javaSyntax": "public void process() throws IOException { ... }",
            "howItWorks": "Recorded in classfile method_info attribute `Exceptions`. javac forces calling methods to catch or re-throw.",
            "visualRepresentation": "Caller method card connected to callee method card with amber contract label.",
            "realWorldExample": "A package delivery label declaring hazardous contents that the courier must handle with care.",
            "commonMistakes": "Adding `throws Exception` to every method blindly instead of specific exceptions.",
            "challenge": "Remove the throws clause and observe javac compile failure."
          }
        }
      ]
    },
    {
      "id": "22.8-finally-block",
      "code": "22.8",
      "title": "finally Block Guaranteed Execution",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.8-s1",
          "title": "1. Finally Running on Both Success and Exception",
          "level": "intermediate",
          "learningObjective": "Verify that `finally` runs regardless of whether an exception was thrown or handled.",
          "javaSource": "public class FinallyDemo {\n    public static void test(boolean fail) {\n        try {\n            if (fail) throw new RuntimeException(\"Simulated failure\");\n            System.out.println(\"Try finished\");\n        } catch (RuntimeException e) {\n            System.out.println(\"Catch handled\");\n        } finally {\n            System.out.println(\"FINALLY: Cleanup guaranteed!\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "n-try",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "n-try",
                  "entityType": "variable",
                  "name": "try { if (fail) throw; }",
                  "variableType": "Try Block",
                  "variableValue": "fail = true",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "n-catch",
                "type": "variableNode",
                "position": {
                  "x": 400,
                  "y": 80
                },
                "data": {
                  "id": "n-catch",
                  "entityType": "variable",
                  "name": "catch (RuntimeException e)",
                  "variableType": "Catch Handler",
                  "variableValue": "Executed",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "n-finally",
                "type": "variableNode",
                "position": {
                  "x": 700,
                  "y": 140
                },
                "data": {
                  "id": "n-finally",
                  "entityType": "variable",
                  "name": "finally { Cleanup }",
                  "variableType": "Guaranteed Block",
                  "variableValue": "ALWAYS EXECUTED",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-tc",
                "source": "n-try",
                "target": "n-catch",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-tc",
                  "type": "exception-flow",
                  "label": "throws to catch",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-cf",
                "source": "n-catch",
                "target": "n-finally",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cf",
                  "type": "call",
                  "label": "always enters finally",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The `finally` block always executes when the try block exits, whether normally or abnormally.",
            "whyIsItUsed": "Used to release critical system resources: closing file descriptors, DB connections, or releasing locks.",
            "javaSyntax": "finally { lock.unlock(); }",
            "howItWorks": "Compiler injects finally bytecode into all normal and exceptional exit paths.",
            "visualRepresentation": "Green guaranteed block receiving converging flow arrows from both try and catch paths.",
            "realWorldExample": "A plane's landing gear cleanup checklist running whether the flight was smooth or had turbulence.",
            "commonMistakes": "Putting `return` inside `finally` which swallows all pending exceptions.",
            "challenge": "Inspect behavior when fail is false."
          }
        }
      ]
    },
    {
      "id": "22.9-try-finally",
      "code": "22.9",
      "title": "try-finally Block",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.9-s1",
          "title": "1. Cleanup Without Catching",
          "level": "intermediate",
          "learningObjective": "Observe `try-finally` executing cleanup while allowing exceptions to propagate up to callers.",
          "javaSource": "import java.util.concurrent.locks.*;\npublic class TryFinallyDemo {\n    private static final Lock lock = new ReentrantLock();\n    public static void performTask() {\n        lock.lock();\n        try {\n            System.out.println(\"Critical section holding lock\");\n            // ... work ...\n        } finally {\n            lock.unlock(); // Always released!\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "tf-try",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "tf-try",
                  "entityType": "variable",
                  "name": "try { criticalWork() }",
                  "variableType": "Protected Code",
                  "variableValue": "lock held",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "tf-fin",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "tf-fin",
                  "entityType": "variable",
                  "name": "finally { lock.unlock() }",
                  "variableType": "Guaranteed Cleanup",
                  "variableValue": "lock released",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-tf-flow",
                "source": "tf-try",
                "target": "tf-fin",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-tf-flow",
                  "type": "call",
                  "label": "guaranteed transition",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`try-finally` guarantees cleanup execution without suppressing or handling the exception.",
            "whyIsItUsed": "Ideal pattern for lock release where the caller is responsible for handling domain errors.",
            "javaSyntax": "try { ... } finally { lock.unlock(); }",
            "howItWorks": "Any exception in `try` pauses, `finally` executes, and then the original exception resumes propagating.",
            "visualRepresentation": "Direct sequence connector from protected section to unlock block.",
            "realWorldExample": "Leaving a rented room: turning off lights regardless of whether you left voluntarily or were evicted.",
            "commonMistakes": "Forgetting `try-finally` when using explicit locks, causing permanent thread lockups.",
            "challenge": "Trigger an exception in the try block and verify unlock executes."
          }
        }
      ]
    },
    {
      "id": "22.10-try-catch-finally",
      "code": "22.10",
      "title": "Combined try-catch-finally Triad",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.10-s1",
          "title": "1. Complete Three-Stage Exception Lifecycle",
          "level": "intermediate",
          "learningObjective": "Track the full sequence: try statement -> catch handler -> finally cleanup -> post-block continuation.",
          "javaSource": "public class FullTriadDemo {\n    public static int compute() {\n        try {\n            int x = 10 / 0;\n            return x;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught in catch\");\n            return -1;\n        } finally {\n            System.out.println(\"Finally executed before return\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "triad-try",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "triad-try",
                  "entityType": "variable",
                  "name": "1. try: 10 / 0",
                  "variableType": "Stage 1",
                  "variableValue": "Throws ArithmeticException",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "triad-catch",
                "type": "variableNode",
                "position": {
                  "x": 400,
                  "y": 140
                },
                "data": {
                  "id": "triad-catch",
                  "entityType": "variable",
                  "name": "2. catch: prepare return -1",
                  "variableType": "Stage 2",
                  "variableValue": "Catches & logs",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "triad-finally",
                "type": "variableNode",
                "position": {
                  "x": 700,
                  "y": 140
                },
                "data": {
                  "id": "triad-finally",
                  "entityType": "variable",
                  "name": "3. finally: cleanup",
                  "variableType": "Stage 3",
                  "variableValue": "Runs before return executes",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t12",
                "source": "triad-try",
                "target": "triad-catch",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t12",
                  "type": "exception-flow",
                  "label": "exception caught",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t23",
                "source": "triad-catch",
                "target": "triad-finally",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t23",
                  "type": "call",
                  "label": "enters finally before return",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The try-catch-finally triad provides complete error isolation, handling, and guaranteed cleanup in a single construct.",
            "whyIsItUsed": "Enables resilient routines that handle known problems and always maintain invariant cleanliness.",
            "javaSyntax": "try { ... } catch (E e) { ... } finally { ... }",
            "howItWorks": "Return value is evaluated in catch, saved to a temporary local slot, finally runs, then ireturn executes.",
            "visualRepresentation": "Three consecutive stages connected with error jump and finally transition arrows.",
            "realWorldExample": "Customer order transaction: attempt charge -> charge failed alert -> audit log entry.",
            "commonMistakes": "Overwriting the return value inside finally.",
            "challenge": "Predict what return value is emitted if finally also contains `return 99;`."
          }
        }
      ]
    },
    {
      "id": "22.11-nested-try-catch",
      "code": "22.11",
      "title": "Nested try-catch Blocks",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.11-s1",
          "title": "1. Inner and Outer Exception Boundaries",
          "level": "intermediate",
          "learningObjective": "Analyze how inner try-catch blocks resolve local exceptions without triggering outer catch handlers.",
          "javaSource": "public class NestedTryDemo {\n    public static void main(String[] args) {\n        try {\n            System.out.println(\"Outer try\");\n            try {\n                int val = Integer.parseInt(\"abc\"); // Inner NumberFormatException\n            } catch (NumberFormatException inner) {\n                System.out.println(\"Inner catch handled parsing\");\n            }\n            int res = 100 / 0; // Outer ArithmeticException\n        } catch (ArithmeticException outer) {\n            System.out.println(\"Outer catch handled div by zero\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "nest-inner",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "nest-inner",
                  "entityType": "variable",
                  "name": "Inner try-catch [NumberFormatException]",
                  "variableType": "Inner Scope",
                  "variableValue": "Handled locally; outer unaffected",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "nest-outer",
                "type": "variableNode",
                "position": {
                  "x": 560,
                  "y": 140
                },
                "data": {
                  "id": "nest-outer",
                  "entityType": "variable",
                  "name": "Outer try-catch [ArithmeticException]",
                  "variableType": "Outer Scope",
                  "variableValue": "Catches 100 / 0",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-nest-flow",
                "source": "nest-inner",
                "target": "nest-outer",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-nest-flow",
                  "type": "call",
                  "label": "resumes outer block",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Nested try blocks provide localized error recovery without aborting the broader workflow.",
            "whyIsItUsed": "Allows attempting fallbacks for non-fatal steps while preserving the outer process.",
            "javaSyntax": "try { try { ... } catch (E1 e) { ... } } catch (E2 e) { ... }",
            "howItWorks": "JVM checks innermost matching exception table entry first before unwinding to outer ranges.",
            "visualRepresentation": "Box-in-box nesting showing local error loop inside broader outer container.",
            "realWorldExample": "A transaction system where loading user profile avatar fails locally but checkout proceeds.",
            "commonMistakes": "Excessive nesting leading to arrow anti-pattern (refactor to helper methods).",
            "challenge": "Extract inner try-catch into a `parseSafe()` helper method."
          }
        }
      ]
    },
    {
      "id": "22.12-exception-propagation",
      "code": "22.12",
      "title": "Exception Propagation Across Call Stack",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.12-s1",
          "title": "1. Uncaught Exception Traveling Up 3 Frames",
          "level": "intermediate",
          "learningObjective": "Track an unhandled exception bubbling from method C -> method B -> method A.",
          "javaSource": "public class PropagationDemo {\n    static void methodC() {\n        int x = 10 / 0; // Unhandled here\n    }\n    static void methodB() {\n        methodC();      // Unhandled here\n    }\n    static void methodA() {\n        try {\n            methodB();\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught in methodA!\");\n        }\n    }\n    public static void main(String[] args) { methodA(); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "f-c",
                "type": "stackFrameNode",
                "position": {
                  "x": 100,
                  "y": 60
                },
                "data": {
                  "id": "f-c",
                  "entityType": "stack-frame",
                  "name": "methodC()",
                  "methodSignature": "methodC(): void",
                  "localVariables": {},
                  "operandStack": [
                    "10",
                    "0"
                  ],
                  "currentLineNumber": 3,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "f-b",
                "type": "stackFrameNode",
                "position": {
                  "x": 380,
                  "y": 140
                },
                "data": {
                  "id": "f-b",
                  "entityType": "stack-frame",
                  "name": "methodB()",
                  "methodSignature": "methodB(): void",
                  "localVariables": {},
                  "operandStack": [],
                  "currentLineNumber": 6,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "f-a",
                "type": "stackFrameNode",
                "position": {
                  "x": 660,
                  "y": 220
                },
                "data": {
                  "id": "f-a",
                  "entityType": "stack-frame",
                  "name": "methodA() [CATCH]",
                  "methodSignature": "methodA(): void",
                  "localVariables": {},
                  "operandStack": [],
                  "currentLineNumber": 11,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-prop-cb",
                "source": "f-c",
                "target": "f-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-prop-cb",
                  "type": "exception-flow",
                  "label": "propagates unhandled",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-prop-ba",
                "source": "f-b",
                "target": "f-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-prop-ba",
                  "type": "exception-flow",
                  "label": "caught by handler",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "When a method throws an exception it does not catch, the JVM pops its stack frame and propagates the exception to the caller.",
            "whyIsItUsed": "Separates detection of an error in low-level code from high-level policy deciding how to handle it.",
            "javaSyntax": "void lowLevel() { throw new CustomEx(); }",
            "howItWorks": "JVM stack walker inspects each caller frame's exception table until a matching catch is discovered.",
            "visualRepresentation": "Three diagonal stack frames with red upward propagation arrows jumping between frames.",
            "realWorldExample": "A junior employee encountering a system outage and escalating it up through managers to VP.",
            "commonMistakes": "Assuming an exception disappears if ignored in a helper method.",
            "challenge": "Inspect the stack trace produced by `Thread.dumpStack()`."
          }
        }
      ]
    },
    {
      "id": "22.13-stack-unwinding",
      "code": "22.13",
      "title": "Stack Unwinding & Frame Deallocation",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.13-s1",
          "title": "1. Popping Frames and Preserving Stack Trace Elements",
          "level": "advanced",
          "learningObjective": "Observe the JVM deallocating local stack frames during unwinding while recording stack trace snapshots.",
          "javaSource": "public class StackUnwindDemo {\n    static void step3() { throw new RuntimeException(\"Error at step 3\"); }\n    static void step2() { step3(); }\n    static void step1() { step2(); }\n    public static void main(String[] args) {\n        try {\n            step1();\n        } catch (RuntimeException e) {\n            StackTraceElement[] trace = e.getStackTrace();\n            System.out.println(\"Frames unwound: \" + trace.length);\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "u-st3",
                "type": "stackFrameNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "u-st3",
                  "entityType": "stack-frame",
                  "name": "step3() [POPPED]",
                  "methodSignature": "step3(): void",
                  "localVariables": {},
                  "operandStack": [],
                  "currentLineNumber": 2,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "u-st2",
                "type": "stackFrameNode",
                "position": {
                  "x": 380,
                  "y": 140
                },
                "data": {
                  "id": "u-st2",
                  "entityType": "stack-frame",
                  "name": "step2() [POPPED]",
                  "methodSignature": "step2(): void",
                  "localVariables": {},
                  "operandStack": [],
                  "currentLineNumber": 3,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "u-st1",
                "type": "stackFrameNode",
                "position": {
                  "x": 660,
                  "y": 200
                },
                "data": {
                  "id": "u-st1",
                  "entityType": "stack-frame",
                  "name": "step1() [POPPED]",
                  "methodSignature": "step1(): void",
                  "localVariables": {},
                  "operandStack": [],
                  "currentLineNumber": 4,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-unwind-all",
                "source": "u-st3",
                "target": "u-st1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-unwind-all",
                  "type": "exception-flow",
                  "label": "frames deallocated",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Stack unwinding is the JVM process of popping call frames off the thread stack until a matching catch block is found.",
            "whyIsItUsed": "Restores the stack pointer and operand stacks of prior callers safely.",
            "javaSyntax": "e.getStackTrace()",
            "howItWorks": "JVM copies instruction pointers and method metadata into `Throwable.backtrace` native array.",
            "visualRepresentation": "Ghosted/dashed stack frames showing instantaneous deallocation during exception travel.",
            "realWorldExample": "Emergency stop on an assembly line: all active robotic arms retract back to safe home position.",
            "commonMistakes": "Believing local variables in unwound frames remain accessible (they are wiped with the frame).",
            "challenge": "Count the total frames printed in `e.printStackTrace()`."
          }
        }
      ]
    },
    {
      "id": "22.14-custom-exceptions",
      "code": "22.14",
      "title": "Custom User-Defined Exception Classes",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.14-s1",
          "title": "1. InsufficientFundsException Subclassing Exception",
          "level": "intermediate",
          "learningObjective": "Design custom domain exception classes with meaningful attributes and error codes.",
          "javaSource": "class InsufficientFundsException extends Exception {\n    private final double deficit;\n    public InsufficientFundsException(String msg, double deficit) {\n        super(msg);\n        this.deficit = deficit;\n    }\n    public double getDeficit() { return deficit; }\n}\npublic class BankDemo {\n    public static void withdraw(double bal, double amount) throws InsufficientFundsException {\n        if (amount > bal) throw new InsufficientFundsException(\"Overdraft\", amount - bal);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-custom-ex",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cls-custom-ex",
                  "entityType": "class",
                  "name": "InsufficientFundsException",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-def",
                      "name": "deficit",
                      "type": "double",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c-cust",
                      "name": "InsufficientFundsException(String, double)",
                      "parameters": [
                        "String msg",
                        "double deficit"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "id": "m-gdef",
                      "name": "getDeficit()",
                      "returnType": "double",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-base-ex",
                "type": "classNode",
                "position": {
                  "x": 560,
                  "y": 120
                },
                "data": {
                  "id": "cls-base-ex",
                  "entityType": "class",
                  "name": "java.lang.Exception",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cust-ext",
                "source": "cls-custom-ex",
                "target": "cls-base-ex",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cust-ext",
                  "type": "extends",
                  "label": "extends (checked)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Custom exceptions create meaningful, strongly typed error models tailored to business domain requirements.",
            "whyIsItUsed": "Callers can extract structured diagnostic data (like deficit amount) rather than parsing raw text strings.",
            "javaSyntax": "class InsufficientFundsException extends Exception { ... }",
            "howItWorks": "Subclasses Exception (checked) or RuntimeException (unchecked), invoking super(message) constructor.",
            "visualRepresentation": "Class card showing custom fields (`deficit`) with inheritance arrow to java.lang.Exception.",
            "realWorldExample": "A specialized medical diagnostic code (e.g. Type 2 Diabetes) vs generic 'Patient Sick'.",
            "commonMistakes": "Failing to pass cause exception to `super(msg, cause)` when chaining exceptions.",
            "challenge": "Add a `getErrorCode()` method to the custom exception."
          }
        }
      ]
    },
    {
      "id": "22.15-try-with-resources",
      "code": "22.15",
      "title": "try-with-resources & AutoCloseable",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.15-s1",
          "title": "1. Automatic Resource Closure via AutoCloseable",
          "level": "intermediate",
          "learningObjective": "Demonstrate automated resource deallocation without verbose nested finally blocks.",
          "javaSource": "class DatabaseConnection implements AutoCloseable {\n    public void executeQuery(String q) { System.out.println(\"Running: \" + q); }\n    @Override\n    public void close() {\n        System.out.println(\"Connection closed automatically!\");\n    }\n}\npublic class TWRDemo {\n    public static void main(String[] args) {\n        try (DatabaseConnection db = new DatabaseConnection()) {\n            db.executeQuery(\"SELECT * FROM users\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "twr-res",
                "type": "heapObjectNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "twr-res",
                  "entityType": "heap-object",
                  "name": "DatabaseConnection",
                  "className": "DatabaseConnection (implements AutoCloseable)",
                  "address": "@0xDB10",
                  "fields": [
                    {
                      "id": "f-st",
                      "name": "isOpen",
                      "type": "boolean",
                      "value": "true -> false"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "twr-scope",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 120
                },
                "data": {
                  "id": "twr-scope",
                  "entityType": "variable",
                  "name": "try-with-resources Block",
                  "variableType": "Auto-Management",
                  "variableValue": "Auto-invokes close() at block exit",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-twr-close",
                "source": "twr-scope",
                "target": "twr-res",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-twr-close",
                  "type": "call",
                  "label": "invokes close() on exit",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`try-with-resources` automatically closes any resource that implements java.lang.AutoCloseable at block exit.",
            "whyIsItUsed": "Eliminates resource leaks and removes bulky boilerplate finally blocks.",
            "javaSyntax": "try (BufferedReader br = new BufferedReader(...)) { ... }",
            "howItWorks": "Compiler generates synthetic finally block that calls `.close()` and manages suppressed exceptions.",
            "visualRepresentation": "Resource block connected to AutoCloseable method node with automatic shutdown trigger.",
            "realWorldExample": "A revolving door that automatically locks and seals behind the last departing customer.",
            "commonMistakes": "Using non-AutoCloseable classes inside the try parameter parentheses.",
            "challenge": "Implement AutoCloseable on a custom FileLogger class."
          }
        }
      ]
    },
    {
      "id": "22.16-multi-catch-suppressed",
      "code": "22.16",
      "title": "Multi-catch (|) & Suppressed Exceptions",
      "moduleId": "exception-flow",
      "scenarios": [
        {
          "id": "22.16-s1",
          "title": "1. Disjoint Catch Types & Throwable.getSuppressed()",
          "level": "advanced",
          "learningObjective": "Inspect multi-catch syntax (`catch (IOException | SQLException e)`) and suppressed exception preservation.",
          "javaSource": "import java.io.*;\nimport java.sql.*;\npublic class MultiCatchSuppressedDemo {\n    public static void execute() {\n        try {\n            if (Math.random() > 0.5) throw new IOException(\"Disk full\");\n            else throw new SQLException(\"Connection lost\");\n        } catch (IOException | SQLException e) {\n            System.out.println(\"Handled: \" + e.getMessage());\n            for (Throwable s : e.getSuppressed()) {\n                System.out.println(\"Suppressed: \" + s.getMessage());\n            }\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mc-pipe",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "mc-pipe",
                  "entityType": "variable",
                  "name": "catch (IOException | SQLException e)",
                  "variableType": "Multi-Catch Handler",
                  "variableValue": "e is implicitly final",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "mc-suppressed",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "mc-suppressed",
                  "entityType": "variable",
                  "name": "e.getSuppressed()",
                  "variableType": "Suppressed Array",
                  "variableValue": "Preserves exceptions thrown during close()",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-mc-edge",
                "source": "mc-pipe",
                "target": "mc-suppressed",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mc-edge",
                  "type": "exception-flow",
                  "label": "preserves suppressed errors",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multi-catch combines multiple unrelated catch blocks with pipe `|`, and suppressed exceptions preserve secondary failures.",
            "whyIsItUsed": "Reduces code duplication without losing exception types, and ensures no exception is silently lost.",
            "javaSyntax": "catch (IOException | SQLException e) { ... }",
            "howItWorks": "Compiler treats `e` as the common ancestor type and marks parameter implicitly final.",
            "visualRepresentation": "Multi-catch node connected to suppressed exceptions list inspector card.",
            "realWorldExample": "An umbrella shielding against both hail and rain while logging minor wind gusts.",
            "commonMistakes": "Using multi-catch with types that have inheritance relationship (`FileNotFoundException | IOException`).",
            "challenge": "Inspect `e.addSuppressed()` manually."
          }
        }
      ]
    }
  ],
  "thread-viz": [
    {
      "id": "23.1-main-thread",
      "code": "23.1",
      "title": "Main Thread Execution & Thread Identity",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.1-s1",
          "title": "1. Inspecting Thread.currentThread()",
          "level": "beginner",
          "learningObjective": "Inspect JVM initial main thread: name, ID, priority, and thread group.",
          "javaSource": "public class MainThreadDemo {\n    public static void main(String[] args) {\n        Thread current = Thread.currentThread();\n        System.out.println(\"Name: \" + current.getName());\n        System.out.println(\"ID: \" + current.threadId());\n        System.out.println(\"Priority: \" + current.getPriority());\n        System.out.println(\"State: \" + current.getState());\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-main",
                "type": "variableNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "th-main",
                  "entityType": "variable",
                  "name": "Thread [main]",
                  "variableType": "Platform Thread",
                  "variableValue": "ID=1, Priority=5, State=RUNNABLE",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Every Java application begins with a primary execution thread called 'main' launched by the JVM runtime.",
            "whyIsItUsed": "The baseline sequential context before spawning concurrent worker threads.",
            "javaSyntax": "Thread.currentThread().getName()",
            "howItWorks": "OS allocates native OS thread; JVM wraps it in a java.lang.Thread instance.",
            "visualRepresentation": "Single active thread node with state badge (RUNNABLE) and thread attributes.",
            "realWorldExample": "The conductor walking onto the stage to begin directing an orchestra.",
            "commonMistakes": "Assuming an application terminates before all non-daemon user threads finish.",
            "challenge": "Change thread name using `Thread.currentThread().setName(\"WorkerOne\")`."
          }
        }
      ]
    },
    {
      "id": "23.2-thread-subclass",
      "code": "23.2",
      "title": "Creating Thread via Thread Subclass",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.2-s1",
          "title": "1. Overriding run() and calling start()",
          "level": "beginner",
          "learningObjective": "Demonstrate spawning a new concurrent thread by extending `Thread` and invoking `.start()`.",
          "javaSource": "class WorkerThread extends Thread {\n    @Override\n    public void run() {\n        System.out.println(\"Worker executing in: \" + Thread.currentThread().getName());\n    }\n}\npublic class ThreadSubclassDemo {\n    public static void main(String[] args) {\n        WorkerThread t1 = new WorkerThread();\n        t1.start(); // Spawns new thread!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-parent",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "th-parent",
                  "entityType": "variable",
                  "name": "Thread [main]",
                  "variableType": "Parent Thread",
                  "variableValue": "RUNNABLE",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-child",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "th-child",
                  "entityType": "variable",
                  "name": "Thread [WorkerThread-1]",
                  "variableType": "Spawned Child Thread",
                  "variableValue": "NEW -> RUNNABLE",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-th-spawn",
                "source": "th-parent",
                "target": "th-child",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-th-spawn",
                  "type": "thread-lock",
                  "label": "invokes t1.start()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Subclassing Thread allows encapsulating thread behavior by overriding the `run()` entry method.",
            "whyIsItUsed": "Basic technique for dedicated long-running background tasks.",
            "javaSyntax": "WorkerThread t = new WorkerThread(); t.start();",
            "howItWorks": "Calling `start()` invokes native JNI method that creates OS thread; OS scheduler executes `run()` asynchronously.",
            "visualRepresentation": "Fork arrow branching from main thread node to worker thread node.",
            "realWorldExample": "A manager dispatching a courier to make a delivery in parallel with office tasks.",
            "commonMistakes": "Calling `t.run()` instead of `t.start()` (runs synchronously on current thread, no new thread).",
            "challenge": "Convert this into an anonymous inner Thread class."
          }
        }
      ]
    },
    {
      "id": "23.3-runnable-interface",
      "code": "23.3",
      "title": "Creating Thread via Runnable Interface",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.3-s1",
          "title": "1. Decoupling Task from Thread Execution",
          "level": "beginner",
          "learningObjective": "Understand the preferred separation of concerns: task (`Runnable`) vs execution engine (`Thread`).",
          "javaSource": "public class RunnableDemo {\n    public static void main(String[] args) {\n        Runnable task = () -> {\n            System.out.println(\"Task running concurrently in: \" + Thread.currentThread().getName());\n        };\n        Thread thread = new Thread(task, \"TaskWorker-1\");\n        thread.start();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "run-task",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "run-task",
                  "entityType": "variable",
                  "name": "task: Runnable",
                  "variableType": "Task Definition",
                  "variableValue": "Functional lambda () -> { ... }",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "run-thread",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "run-thread",
                  "entityType": "variable",
                  "name": "Thread [TaskWorker-1]",
                  "variableType": "Execution Engine",
                  "variableValue": "RUNNABLE",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-run-exec",
                "source": "run-thread",
                "target": "run-task",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-run-exec",
                  "type": "call",
                  "label": "executes task.run()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`Runnable` separates the unit of work from the execution vehicle, avoiding single inheritance limitations.",
            "whyIsItUsed": "Enables reusing task instances across thread pools and executors.",
            "javaSyntax": "Thread t = new Thread(() -> doWork());",
            "howItWorks": "Thread constructor stores Runnable in private `target` field and invokes `target.run()` inside its own run loop.",
            "visualRepresentation": "Task object card connected to Thread execution engine with execution arrow.",
            "realWorldExample": "A music CD (Runnable task) inserted into a CD player (Thread execution engine).",
            "commonMistakes": "Extending Thread when the class only needs to execute a task.",
            "challenge": "Pass the same Runnable to multiple separate Threads."
          }
        }
      ]
    },
    {
      "id": "23.4-thread-lifecycle",
      "code": "23.4",
      "title": "Thread Lifecycle & 6 Thread States",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.4-s1",
          "title": "1. NEW -> RUNNABLE -> TIMED_WAITING -> TERMINATED",
          "level": "intermediate",
          "learningObjective": "Trace the state transitions of a Java thread as defined by `Thread.State` enum.",
          "javaSource": "public class ThreadStateDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread t = new Thread(() -> {\n            try { Thread.sleep(50); } catch (InterruptedException e) {}\n        });\n        System.out.println(t.getState()); // NEW\n        t.start();\n        System.out.println(t.getState()); // RUNNABLE\n        Thread.sleep(10);\n        System.out.println(t.getState()); // TIMED_WAITING\n        t.join();\n        System.out.println(t.getState()); // TERMINATED\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "st-new",
                "type": "variableNode",
                "position": {
                  "x": 80,
                  "y": 120
                },
                "data": {
                  "id": "st-new",
                  "entityType": "variable",
                  "name": "1. NEW",
                  "variableType": "Thread State",
                  "variableValue": "Allocated but not started",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "st-run",
                "type": "variableNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "st-run",
                  "entityType": "variable",
                  "name": "2. RUNNABLE",
                  "variableType": "Thread State",
                  "variableValue": "Executing or ready to run",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "st-wait",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "st-wait",
                  "entityType": "variable",
                  "name": "3. TIMED_WAITING",
                  "variableType": "Thread State",
                  "variableValue": "Sleeping for 50ms",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "st-term",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 120
                },
                "data": {
                  "id": "st-term",
                  "entityType": "variable",
                  "name": "4. TERMINATED",
                  "variableType": "Thread State",
                  "variableValue": "Execution finished",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-s12",
                "source": "st-new",
                "target": "st-run",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s12",
                  "type": "call",
                  "label": "start()",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-s23",
                "source": "st-run",
                "target": "st-wait",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s23",
                  "type": "call",
                  "label": "sleep(50)",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-s34",
                "source": "st-wait",
                "target": "st-term",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s34",
                  "type": "call",
                  "label": "run() exits",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java threads exist in one of six states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, or TERMINATED.",
            "whyIsItUsed": "Essential for debugging thread starvation, deadlocks, and performance bottlenecks.",
            "javaSyntax": "t.getState() == Thread.State.RUNNABLE",
            "howItWorks": "JVM monitors OS thread status and updates Java Thread state register.",
            "visualRepresentation": "State machine flow pipeline with directional transition triggers.",
            "realWorldExample": "A patient's hospital visit: Admissions (NEW) -> Treatment (RUNNABLE) -> Observation (WAITING) -> Discharged (TERMINATED).",
            "commonMistakes": "Calling `start()` twice on the same thread (throws IllegalThreadStateException).",
            "challenge": "Observe what state is emitted when waiting on an intrinsic monitor lock (BLOCKED)."
          }
        }
      ]
    },
    {
      "id": "23.5-multiple-threads",
      "code": "23.5",
      "title": "Multiple Concurrent Threads",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.5-s1",
          "title": "1. Three Threads Running Concurrently",
          "level": "intermediate",
          "learningObjective": "Visualize independent instruction execution across multiple parallel worker threads.",
          "javaSource": "public class MultiThreadDemo {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            int id = i;\n            new Thread(() -> {\n                System.out.println(\"Worker \" + id + \" running\");\n            }, \"Worker-\" + i).start();\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-w1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "th-w1",
                  "entityType": "variable",
                  "name": "Thread [Worker-1]",
                  "variableType": "Worker Thread",
                  "variableValue": "Executing concurrently",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-w2",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 180
                },
                "data": {
                  "id": "th-w2",
                  "entityType": "variable",
                  "name": "Thread [Worker-2]",
                  "variableType": "Worker Thread",
                  "variableValue": "Executing concurrently",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-w3",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 280
                },
                "data": {
                  "id": "th-w3",
                  "entityType": "variable",
                  "name": "Thread [Worker-3]",
                  "variableType": "Worker Thread",
                  "variableValue": "Executing concurrently",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Multiple threads execute instructions independently across available CPU cores.",
            "whyIsItUsed": "Unlocks parallelism for high-throughput computing and responsive user interfaces.",
            "javaSyntax": "new Thread(task).start();",
            "howItWorks": "OS thread scheduler assigns time slices (quanta) across available physical CPU cores.",
            "visualRepresentation": "Parallel vertical swimlanes showing concurrent thread progress.",
            "realWorldExample": "Three chefs in a commercial kitchen preparing different menu orders simultaneously.",
            "commonMistakes": "Assuming thread output print statements will always appear in numerical order.",
            "challenge": "Add thread sleep times to vary completion order."
          }
        }
      ]
    },
    {
      "id": "23.6-shared-data",
      "code": "23.6",
      "title": "Shared Heap Data & Thread Stacks",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.6-s1",
          "title": "1. Thread-Local Stacks Referencing Shared Heap Object",
          "level": "intermediate",
          "learningObjective": "Contrast isolated thread-local stack frames with shared objects located in common heap memory.",
          "javaSource": "class Counter {\n    int count = 0;\n}\npublic class SharedDataDemo {\n    public static void main(String[] args) {\n        Counter shared = new Counter();\n        Thread t1 = new Thread(() -> shared.count++, \"T1\");\n        Thread t2 = new Thread(() -> shared.count++, \"T2\");\n        t1.start(); t2.start();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-st-1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "th-st-1",
                  "entityType": "variable",
                  "name": "T1 Stack: local ref",
                  "variableType": "Thread 1 Stack",
                  "variableValue": "ref -> @0xCNT",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-st-2",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "th-st-2",
                  "entityType": "variable",
                  "name": "T2 Stack: local ref",
                  "variableType": "Thread 2 Stack",
                  "variableValue": "ref -> @0xCNT",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "shared-obj",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "shared-obj",
                  "entityType": "heap-object",
                  "name": "Counter [SHARED]",
                  "className": "Counter",
                  "address": "@0xCNT",
                  "fields": [
                    {
                      "id": "f-cnt",
                      "name": "count",
                      "type": "int",
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t1-cnt",
                "source": "th-st-1",
                "target": "shared-obj",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t1-cnt",
                  "type": "reference",
                  "label": "references shared heap object",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t2-cnt",
                "source": "th-st-2",
                "target": "shared-obj",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t2-cnt",
                  "type": "reference",
                  "label": "references shared heap object",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Each thread maintains its own private call stack, but all threads share access to the common heap space.",
            "whyIsItUsed": "Allows efficient communication and data sharing between concurrent workers.",
            "javaSyntax": "class SharedState { ... }",
            "howItWorks": "Local variables reside in thread stacks (isolated); instance variables reside in heap (shared).",
            "visualRepresentation": "Two thread stack nodes with converging reference arrows pointing to a central shared heap object.",
            "realWorldExample": "Two people in different rooms writing into the same physical notebook on a shared desk.",
            "commonMistakes": "Assuming instance variables are thread-safe by default.",
            "challenge": "Inspect what happens when both write without synchronization."
          }
        }
      ]
    },
    {
      "id": "23.7-race-condition",
      "code": "23.7",
      "title": "Race Condition & Lost Updates",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.7-s1",
          "title": "1. Non-Atomic count++ Read-Modify-Write Conflict",
          "level": "intermediate",
          "learningObjective": "Visualize the three-step read-modify-write cycle of `count++` causing lost updates under concurrency.",
          "javaSource": "public class RaceConditionDemo {\n    private static int counter = 0;\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(() -> { for(int i=0; i<1000; i++) counter++; });\n        Thread t2 = new Thread(() -> { for(int i=0; i<1000; i++) counter++; });\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"Expected: 2000, Actual: \" + counter); // Often < 2000!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "rc-t1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "rc-t1",
                  "entityType": "variable",
                  "name": "Thread 1: reads 5, writes 6",
                  "variableType": "Interleaved Read",
                  "variableValue": "Writes back 6",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "rc-t2",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "rc-t2",
                  "entityType": "variable",
                  "name": "Thread 2: reads 5, writes 6",
                  "variableType": "Interleaved Read",
                  "variableValue": "Overwrites with 6 (LOST UPDATE)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "rc-heap",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "rc-heap",
                  "entityType": "variable",
                  "name": "counter: int",
                  "variableType": "Shared Field",
                  "variableValue": "6 instead of 7 (Race Condition)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-rc-1",
                "source": "rc-t1",
                "target": "rc-heap",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rc-1",
                  "type": "call",
                  "label": "overwrites",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-rc-2",
                "source": "rc-t2",
                "target": "rc-heap",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rc-2",
                  "type": "call",
                  "label": "conflicting write",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A race condition occurs when concurrent threads access and mutate shared mutable state without proper synchronization.",
            "whyIsItUsed": "Demonstrates why thread synchronization is necessary to prevent silent data corruption.",
            "javaSyntax": "counter++; // 1. read, 2. increment, 3. write",
            "howItWorks": "Bytecode: getstatic, iconst_1, iadd, putstatic. Thread switch between getstatic and putstatic causes lost updates.",
            "visualRepresentation": "Two competing thread arrows colliding at the shared field value node.",
            "realWorldExample": "Two bank clerks simultaneously withdrawing money from an account before either update is committed.",
            "commonMistakes": "Thinking `count++` is an atomic single instruction.",
            "challenge": "Fix the race condition with `synchronized`."
          }
        }
      ]
    },
    {
      "id": "23.8-synchronized-method",
      "code": "23.8",
      "title": "synchronized Instance Method",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.8-s1",
          "title": "1. Intrinsic Monitor Lock on `this`",
          "level": "intermediate",
          "learningObjective": "Demonstrate mutual exclusion: one thread holds the lock while others wait in BLOCKED state.",
          "javaSource": "class SafeCounter {\n    private int count = 0;\n    public synchronized void increment() {\n        count++; // Protected by this object monitor\n    }\n    public synchronized int getCount() { return count; }\n}\npublic class SyncMethodDemo {\n    public static void main(String[] args) {\n        SafeCounter c = new SafeCounter();\n        new Thread(c::increment).start();\n        new Thread(c::increment).start();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-lock-owner",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 80
                },
                "data": {
                  "id": "th-lock-owner",
                  "entityType": "variable",
                  "name": "Thread-1 [LOCK OWNER]",
                  "variableType": "Thread State",
                  "variableValue": "RUNNABLE (Holds Monitor)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-lock-waiter",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 240
                },
                "data": {
                  "id": "th-lock-waiter",
                  "entityType": "variable",
                  "name": "Thread-2 [BLOCKED]",
                  "variableType": "Thread State",
                  "variableValue": "Waiting for Monitor",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mon-lock",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "mon-lock",
                  "entityType": "heap-object",
                  "name": "SafeCounter [this]",
                  "className": "SafeCounter",
                  "address": "@0xMON1",
                  "fields": [
                    {
                      "id": "f-c",
                      "name": "count",
                      "type": "int",
                      "value": "1"
                    },
                    {
                      "id": "f-l",
                      "name": "_monitorOwner",
                      "type": "Thread",
                      "value": "Thread-1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-holds-lock",
                "source": "th-lock-owner",
                "target": "mon-lock",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-holds-lock",
                  "type": "thread-lock",
                  "label": "holds intrinsic lock",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-blocked-lock",
                "source": "th-lock-waiter",
                "target": "mon-lock",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-blocked-lock",
                  "type": "thread-lock",
                  "label": "blocked waiting for lock",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A `synchronized` instance method acquires the intrinsic monitor lock of the `this` object before executing.",
            "whyIsItUsed": "Enforces mutual exclusion (mutex): only one thread executes inside synchronized methods on that instance at a time.",
            "javaSyntax": "public synchronized void increment() { ... }",
            "howItWorks": "Method flag `ACC_SYNCHRONIZED`. JVM invokes monitorenter before execution and monitorexit on return or exception.",
            "visualRepresentation": "Lock badge on object card with green active owner connector and red blocked connector.",
            "realWorldExample": "A single-occupant dressing room: whoever has the key enters; the next person waits outside.",
            "commonMistakes": "Synchronizing on different object instances thinking it protects shared state.",
            "challenge": "Check if static synchronized methods share this same lock (they lock on the Class object instead)."
          }
        }
      ]
    },
    {
      "id": "23.9-synchronized-block",
      "code": "23.9",
      "title": "synchronized Block & Explicit Monitor Object",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.9-s1",
          "title": "1. Fine-Grained Locking with Private Lock Object",
          "level": "intermediate",
          "learningObjective": "Compare synchronized methods with fine-grained synchronized blocks using private lock instances.",
          "javaSource": "public class SyncBlockDemo {\n    private final Object lock = new Object();\n    private int balance = 100;\n    public void withdraw(int amount) {\n        // Only critical section is synchronized\n        synchronized (lock) {\n            if (balance >= amount) {\n                balance -= amount;\n            }\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sb-th",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "sb-th",
                  "entityType": "variable",
                  "name": "Thread [Worker-1]",
                  "variableType": "Executing Thread",
                  "variableValue": "Inside synchronized(lock) block",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sb-lock",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "sb-lock",
                  "entityType": "heap-object",
                  "name": "lock: Object",
                  "className": "Object",
                  "address": "@0xLOCK_OBJ",
                  "fields": [
                    {
                      "id": "f-own",
                      "name": "monitorOwner",
                      "type": "Thread",
                      "value": "Worker-1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sb-lock",
                "source": "sb-th",
                "target": "sb-lock",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sb-lock",
                  "type": "thread-lock",
                  "label": "monitorenter / monitorexit",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A `synchronized(lock)` block restricts the lock scope strictly to the critical section, improving concurrency.",
            "whyIsItUsed": "Using a private `final Object lock = new Object()` prevents external callers from locking your instance.",
            "javaSyntax": "synchronized (lock) { ... }",
            "howItWorks": "Bytecodes `monitorenter` and `monitorexit` surround the bytecode range of the block.",
            "visualRepresentation": "Thread node pointing to dedicated lock object with monitor enter/exit badge.",
            "realWorldExample": "Locking a specific cash register drawer rather than locking the entire department store.",
            "commonMistakes": "Synchronizing on a non-final reference that can change (locks on different objects!).",
            "challenge": "Explain why String literals should never be used as lock objects."
          }
        }
      ]
    },
    {
      "id": "23.10-wait-notify",
      "code": "23.10",
      "title": "Object wait() and notify() Coordination",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.10-s1",
          "title": "1. Producer-Consumer Signaling on Monitor Wait-Set",
          "level": "advanced",
          "learningObjective": "Trace how `wait()` releases the monitor lock and enters the object wait-set until awakened by `notify()`.",
          "javaSource": "class MessageQueue {\n    private String msg;\n    private boolean empty = true;\n    public synchronized void produce(String m) throws InterruptedException {\n        while (!empty) wait(); // Wait for consumer\n        msg = m; empty = false;\n        notifyAll(); // Wake up consumer\n    }\n    public synchronized String consume() throws InterruptedException {\n        while (empty) wait(); // Wait for producer\n        empty = true;\n        notifyAll();\n        return msg;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-prod",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "th-prod",
                  "entityType": "variable",
                  "name": "Producer Thread",
                  "variableType": "Thread",
                  "variableValue": "Calls notifyAll()",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-waitset",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "th-waitset",
                  "entityType": "variable",
                  "name": "Monitor Wait-Set",
                  "variableType": "Waiting Threads Pool",
                  "variableValue": "Consumer (WAITING)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-cons",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 200
                },
                "data": {
                  "id": "th-cons",
                  "entityType": "variable",
                  "name": "Consumer Thread",
                  "variableType": "Thread",
                  "variableValue": "Awakened -> RUNNABLE",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-wn-notify",
                "source": "th-prod",
                "target": "th-waitset",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-wn-notify",
                  "type": "call",
                  "label": "signals notifyAll()",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-wn-wake",
                "source": "th-waitset",
                "target": "th-cons",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-wn-wake",
                  "type": "call",
                  "label": "awakens & re-acquires lock",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`wait()` and `notify()` enable inter-thread communication and coordination using the object's wait-set.",
            "whyIsItUsed": "Prevents busy-waiting / spinlocks by putting waiting threads into inactive sleep until signaled.",
            "javaSyntax": "synchronized (obj) { while (condition) obj.wait(); }",
            "howItWorks": "Thread releases monitor lock and is moved to object's native wait-set; notify moves thread back to blocked entry set.",
            "visualRepresentation": "Wait-set pool container between producer and consumer nodes with signaling arrow.",
            "realWorldExample": "A customer holding a buzzer in a restaurant waiting for their order to be ready.",
            "commonMistakes": "Using `if` instead of `while` to check wait conditions (vulnerable to spurious wakeups).",
            "challenge": "Why must wait() always be called inside a synchronized context?"
          }
        }
      ]
    },
    {
      "id": "23.11-sleep-vs-wait",
      "code": "23.11",
      "title": "Thread sleep() vs Object wait()",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.11-s1",
          "title": "1. Retaining vs Releasing Lock",
          "level": "intermediate",
          "learningObjective": "Compare `Thread.sleep()` (does NOT release locks) with `Object.wait()` (releases monitor lock).",
          "javaSource": "public class SleepVsWaitDemo {\n    static final Object lock = new Object();\n    void usingSleep() {\n        synchronized (lock) {\n            try { Thread.sleep(1000); } catch (InterruptedException e) {}\n            // Lock is STILL HELD during entire 1000ms sleep!\n        }\n    }\n    void usingWait() {\n        synchronized (lock) {\n            try { lock.wait(1000); } catch (InterruptedException e) {}\n            // Lock is RELEASED during wait; others can enter!\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "c-sleep",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "c-sleep",
                  "entityType": "variable",
                  "name": "Thread.sleep(1000)",
                  "variableType": "Timed Pause",
                  "variableValue": "HOLDS Lock; Blocks Others",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "c-wait",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "c-wait",
                  "entityType": "variable",
                  "name": "lock.wait(1000)",
                  "variableType": "Coordination Pause",
                  "variableValue": "RELEASES Lock; Others Proceed",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-svw-diff",
                "source": "c-sleep",
                "target": "c-wait",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-svw-diff",
                  "type": "dependency",
                  "label": "contrasting lock behavior",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`Thread.sleep()` pauses execution while retaining held monitor locks; `Object.wait()` releases the lock so other threads can proceed.",
            "whyIsItUsed": "Crucial distinction to avoid causing accidental deadlocks and system starvation.",
            "javaSyntax": "Thread.sleep(ms); vs lock.wait(ms);",
            "howItWorks": "sleep() yields CPU to OS scheduler; wait() enqueues thread on object wait-set and clears monitor ownership.",
            "visualRepresentation": "Two contrasting nodes showing Lock Held badge vs Lock Released badge.",
            "realWorldExample": "Sleeping at your office desk holding the restroom key vs leaving the key on the hook while you rest.",
            "commonMistakes": "Calling sleep() inside a synchronized block expecting other threads to make progress.",
            "challenge": "Inspect the thread dump when thread sleeps inside synchronized block."
          }
        }
      ]
    },
    {
      "id": "23.12-thread-join",
      "code": "23.12",
      "title": "Thread join() Synchronization Barrier",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.12-s1",
          "title": "1. Waiting for Worker Thread Termination",
          "level": "intermediate",
          "learningObjective": "Understand how `t.join()` pauses the calling thread until target thread `t` terminates.",
          "javaSource": "public class JoinDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            System.out.println(\"Calculating complex data...\");\n        });\n        worker.start();\n        worker.join(); // Main thread WAITING until worker terminates\n        System.out.println(\"Worker finished. Main thread continues.\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "th-main-wait",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "th-main-wait",
                  "entityType": "variable",
                  "name": "Thread [main]",
                  "variableType": "Calling Thread",
                  "variableValue": "State: WAITING on worker.join()",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "th-worker-run",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "th-worker-run",
                  "entityType": "variable",
                  "name": "Thread [worker]",
                  "variableType": "Worker Thread",
                  "variableValue": "RUNNABLE -> TERMINATED",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-join-sync",
                "source": "th-main-wait",
                "target": "th-worker-run",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-join-sync",
                  "type": "call",
                  "label": "waits for termination barrier",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`thread.join()` pauses the calling thread until the target thread finishes execution.",
            "whyIsItUsed": "Ensures asynchronous computations complete before consuming their results.",
            "javaSyntax": "worker.join();",
            "howItWorks": "Implemented internally via `while (isAlive()) wait(0);` on the Thread instance.",
            "visualRepresentation": "Synchronizing arrow between caller and worker converging at a barrier point.",
            "realWorldExample": "A chef waiting for the oven timer thread to ring before plating the meal.",
            "commonMistakes": "Calling `join()` before `start()` (join returns immediately because thread isn't alive yet).",
            "challenge": "Use `worker.join(1000)` with a timeout."
          }
        }
      ]
    },
    {
      "id": "23.13-deadlock-condition",
      "code": "23.13",
      "title": "Deadlock Condition & Circular Waiting",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.13-s1",
          "title": "1. Two Threads Holding Lock A & Lock B in Reverse Order",
          "level": "advanced",
          "learningObjective": "Analyze how circular lock acquisition order causes permanent thread deadlock.",
          "javaSource": "public class DeadlockDemo {\n    static final Object lockA = new Object();\n    static final Object lockB = new Object();\n    public static void main(String[] args) {\n        Thread t1 = new Thread(() -> {\n            synchronized (lockA) {\n                try { Thread.sleep(10); } catch (Exception e) {}\n                synchronized (lockB) { System.out.println(\"T1 acquired both\"); }\n            }\n        });\n        Thread t2 = new Thread(() -> {\n            synchronized (lockB) {\n                try { Thread.sleep(10); } catch (Exception e) {}\n                synchronized (lockA) { System.out.println(\"T2 acquired both\"); }\n            }\n        });\n        t1.start(); t2.start();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "dl-t1",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 80
                },
                "data": {
                  "id": "dl-t1",
                  "entityType": "variable",
                  "name": "Thread-1 [Holds Lock A]",
                  "variableType": "Thread",
                  "variableValue": "BLOCKED waiting for Lock B",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "dl-t2",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 240
                },
                "data": {
                  "id": "dl-t2",
                  "entityType": "variable",
                  "name": "Thread-2 [Holds Lock B]",
                  "variableType": "Thread",
                  "variableValue": "BLOCKED waiting for Lock A",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "dl-la",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 240
                },
                "data": {
                  "id": "dl-la",
                  "entityType": "variable",
                  "name": "Lock A",
                  "variableType": "Lock",
                  "variableValue": "Held by Thread-1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "dl-lb",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 80
                },
                "data": {
                  "id": "dl-lb",
                  "entityType": "variable",
                  "name": "Lock B",
                  "variableType": "Lock",
                  "variableValue": "Held by Thread-2",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dl-1",
                "source": "dl-t1",
                "target": "dl-lb",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dl-1",
                  "type": "thread-lock",
                  "label": "waits for Lock B",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-dl-2",
                "source": "dl-t2",
                "target": "dl-la",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dl-2",
                  "type": "thread-lock",
                  "label": "waits for Lock A",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A deadlock occurs when two or more threads are permanently blocked, each waiting for a lock held by the other.",
            "whyIsItUsed": "Understanding Coffman conditions (circular wait) allows designing deadlock-free concurrent algorithms.",
            "javaSyntax": "synchronized(A) { synchronized(B) { ... } }",
            "howItWorks": "Both threads enter BLOCKED state; JVM deadlock detector (`ThreadMXBean`) detects cycles in lock graph.",
            "visualRepresentation": "Circular red dependency cycle between Thread 1, Lock A, Thread 2, and Lock B.",
            "realWorldExample": "Gridlock at a four-way intersection where every car is blocked by the car to its right.",
            "commonMistakes": "Acquiring nested locks in inconsistent order across different classes.",
            "challenge": "Fix the deadlock by ordering lock acquisition (both acquire Lock A before Lock B)."
          }
        }
      ]
    },
    {
      "id": "23.14-executor-service",
      "code": "23.14",
      "title": "ExecutorService & Thread Pools",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.14-s1",
          "title": "1. FixedThreadPool Task Queue & Worker Reuse",
          "level": "intermediate",
          "learningObjective": "Demonstrate worker thread reuse across a blocking task queue in `Executors.newFixedThreadPool(2)`.",
          "javaSource": "import java.util.concurrent.*;\npublic class ExecutorDemo {\n    public static void main(String[] args) {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n        for (int i = 1; i <= 4; i++) {\n            int taskId = i;\n            pool.submit(() -> System.out.println(\"Task \" + taskId + \" on \" + Thread.currentThread().getName()));\n        }\n        pool.shutdown();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "pool-q",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "pool-q",
                  "entityType": "variable",
                  "name": "LinkedBlockingQueue",
                  "variableType": "Work Queue",
                  "variableValue": "[Task 3, Task 4] queued",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pool-w1",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 80
                },
                "data": {
                  "id": "pool-w1",
                  "entityType": "variable",
                  "name": "pool-thread-1",
                  "variableType": "Worker Thread",
                  "variableValue": "Executing Task 1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pool-w2",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 200
                },
                "data": {
                  "id": "pool-w2",
                  "entityType": "variable",
                  "name": "pool-thread-2",
                  "variableType": "Worker Thread",
                  "variableValue": "Executing Task 2",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pw1",
                "source": "pool-w1",
                "target": "pool-q",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pw1",
                  "type": "call",
                  "label": "takes work",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-pw2",
                "source": "pool-w2",
                "target": "pool-q",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pw2",
                  "type": "call",
                  "label": "takes work",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "ExecutorService manages a pool of worker threads, decoupling task submission from thread management and reuse.",
            "whyIsItUsed": "Avoids the overhead of repeatedly creating and destroying OS threads.",
            "javaSyntax": "ExecutorService pool = Executors.newFixedThreadPool(4);",
            "howItWorks": "Pool keeps worker threads alive; threads loop polling `BlockingQueue.take()` for incoming tasks.",
            "visualRepresentation": "Queue card connected to two active worker thread cards pulling tasks.",
            "realWorldExample": "A taxi stand with 2 cabs serving a line of 4 passengers in sequence.",
            "commonMistakes": "Forgetting to call `pool.shutdown()`, preventing JVM termination.",
            "challenge": "Submit a task that returns a value."
          }
        }
      ]
    },
    {
      "id": "23.15-callable-future",
      "code": "23.15",
      "title": "Callable & Future Result Handling",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.15-s1",
          "title": "1. Asynchronous Value Computation & Future.get()",
          "level": "intermediate",
          "learningObjective": "Compare Runnable (void return) with Callable<V> and inspect `Future.get()` blocking resolution.",
          "javaSource": "import java.util.concurrent.*;\npublic class CallableFutureDemo {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newSingleThreadExecutor();\n        Callable<Integer> computeTask = () -> {\n            Thread.sleep(100);\n            return 42;\n        };\n        Future<Integer> future = pool.submit(computeTask);\n        System.out.println(\"Is done? \" + future.isDone()); // false\n        int result = future.get(); // Blocks until 42 is ready\n        System.out.println(\"Result: \" + result);\n        pool.shutdown();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "fut-task",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "fut-task",
                  "entityType": "variable",
                  "name": "Callable<Integer>",
                  "variableType": "Async Computation",
                  "variableValue": "Computes return 42",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "fut-handle",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "fut-handle",
                  "entityType": "variable",
                  "name": "Future<Integer>",
                  "variableType": "Promise Handle",
                  "variableValue": "future.get() -> 42",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-fut-res",
                "source": "fut-handle",
                "target": "fut-task",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fut-res",
                  "type": "call",
                  "label": "resolves value asynchronously",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`Callable<V>` returns a typed value and can throw checked exceptions; `Future<V>` is the handle to access that pending result.",
            "whyIsItUsed": "Enables parallel data processing where results from multiple workers are merged.",
            "javaSyntax": "Future<Integer> f = executor.submit(() -> compute());",
            "howItWorks": "FutureTask transitions through states: NEW -> COMPLETING -> NORMAL/EXCEPTIONAL.",
            "visualRepresentation": "Callable computation card delivering result value to Future handle card.",
            "realWorldExample": "A coat check ticket: you submit your coat and get a ticket (Future) to claim it later.",
            "commonMistakes": "Calling `future.get()` immediately on main thread without letting it run asynchronously.",
            "challenge": "Use `future.get(50, TimeUnit.MILLISECONDS)` with a timeout."
          }
        }
      ]
    },
    {
      "id": "23.16-atomic-classes",
      "code": "23.16",
      "title": "Atomic Variables & Lock-Free CAS",
      "moduleId": "thread-viz",
      "scenarios": [
        {
          "id": "23.16-s1",
          "title": "1. AtomicInteger Compare-And-Swap (CAS) Hardware Primitive",
          "level": "advanced",
          "learningObjective": "Observe lock-free thread safety using `AtomicInteger.incrementAndGet()` powered by CPU CAS instructions.",
          "javaSource": "import java.util.concurrent.atomic.AtomicInteger;\npublic class AtomicDemo {\n    private static final AtomicInteger atomicCount = new AtomicInteger(0);\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(() -> { for(int i=0; i<1000; i++) atomicCount.incrementAndGet(); });\n        Thread t2 = new Thread(() -> { for(int i=0; i<1000; i++) atomicCount.incrementAndGet(); });\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"Exact Count: \" + atomicCount.get()); // Exactly 2000 guaranteed!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cas-t1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "cas-t1",
                  "entityType": "variable",
                  "name": "Thread 1",
                  "variableType": "Thread",
                  "variableValue": "CAS loop retry on conflict",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cas-t2",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "cas-t2",
                  "entityType": "variable",
                  "name": "Thread 2",
                  "variableType": "Thread",
                  "variableValue": "CAS loop retry on conflict",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cas-atom",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "cas-atom",
                  "entityType": "variable",
                  "name": "AtomicInteger: 2000",
                  "variableType": "Hardware CAS Value",
                  "variableValue": "Lock-Free Atomic Update",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cas-1",
                "source": "cas-t1",
                "target": "cas-atom",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cas-1",
                  "type": "call",
                  "label": "hardware CAS atomic update",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-cas-2",
                "source": "cas-t2",
                "target": "cas-atom",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cas-2",
                  "type": "call",
                  "label": "hardware CAS atomic update",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`AtomicInteger` provides lock-free thread-safe updates using CPU Compare-And-Swap (CAS) instructions.",
            "whyIsItUsed": "Provides higher throughput than synchronized locks under low-to-moderate contention without context-switch overhead.",
            "javaSyntax": "atomic.incrementAndGet()",
            "howItWorks": "Uses `VarHandle.compareAndSet` or `Unsafe.compareAndSwapInt` mapping to x86 `LOCK CMPXCHG` instruction.",
            "visualRepresentation": "Two threads performing optimistic lock-free CAS updates against atomic integer node.",
            "realWorldExample": "A turnstile with a mechanical ratchet that only moves forward one notch at a time without needing a key.",
            "commonMistakes": "Using atomic variables for complex multiple-field invariants (use synchronized or StampedLock instead).",
            "challenge": "Compare performance of synchronized counter vs AtomicInteger."
          }
        }
      ]
    }
  ],
  "method-call-graph": [
    {
      "id": "24.1-single-call",
      "code": "24.1",
      "title": "Single Direct Method Call",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.1-s1",
          "title": "1. Caller to Callee Direct Invocations",
          "level": "beginner",
          "learningObjective": "Map the foundational directed edge from caller method node to callee method node.",
          "javaSource": "public class DirectCallDemo {\n    public static void greet() {\n        System.out.println(\"Hello World!\");\n    }\n    public static void main(String[] args) {\n        greet(); // Direct call\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mc-main",
                "type": "methodNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "mc-main",
                  "entityType": "method",
                  "name": "main(String[])",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String[] args"
                  ],
                  "body": "greet();",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "mc-greet",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "mc-greet",
                  "entityType": "method",
                  "name": "greet()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "System.out.println(\"Hello World!\");",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-mc-dir",
                "source": "mc-main",
                "target": "mc-greet",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mc-dir",
                  "type": "call",
                  "label": "invokestatic",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A method call graph models methods as vertices and method invocations as directed edges.",
            "whyIsItUsed": "Visualizes program control flow structure, architectural layering, and coupling.",
            "javaSyntax": "greet();",
            "howItWorks": "Compiler emits `invokestatic DirectCallDemo.greet:()V`.",
            "visualRepresentation": "Directed connector with invocation badge leading from caller to callee.",
            "realWorldExample": "Dialing a specific extension number from a receptionist phone.",
            "commonMistakes": "Confusing the call graph with the inheritance hierarchy.",
            "challenge": "Add a parameter to greet(String name)."
          }
        }
      ]
    },
    {
      "id": "24.2-nested-calls",
      "code": "24.2",
      "title": "Nested / Chained Method Calls",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.2-s1",
          "title": "1. Multi-tier Call Chain A -> B -> C",
          "level": "beginner",
          "learningObjective": "Track nested call propagation through intermediate delegating methods.",
          "javaSource": "public class NestedCallsDemo {\n    static void stepA() { stepB(); }\n    static void stepB() { stepC(); }\n    static void stepC() { System.out.println(\"Target reached\"); }\n    public static void main(String[] args) { stepA(); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "nc-main",
                "type": "methodNode",
                "position": {
                  "x": 60,
                  "y": 140
                },
                "data": {
                  "id": "nc-main",
                  "entityType": "method",
                  "name": "main()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "stepA()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "nc-a",
                "type": "methodNode",
                "position": {
                  "x": 300,
                  "y": 140
                },
                "data": {
                  "id": "nc-a",
                  "entityType": "method",
                  "name": "stepA()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "stepB()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "nc-b",
                "type": "methodNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "nc-b",
                  "entityType": "method",
                  "name": "stepB()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "stepC()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "nc-c",
                "type": "methodNode",
                "position": {
                  "x": 780,
                  "y": 140
                },
                "data": {
                  "id": "nc-c",
                  "entityType": "method",
                  "name": "stepC()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "println",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ma",
                "source": "nc-main",
                "target": "nc-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ma",
                  "type": "call",
                  "label": "calls",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-ab",
                "source": "nc-a",
                "target": "nc-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ab",
                  "type": "call",
                  "label": "calls",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-bc",
                "source": "nc-b",
                "target": "nc-c",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-bc",
                  "type": "call",
                  "label": "calls",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Nested calls create a transitive path through the call graph, pushing frames on the thread stack at each stage.",
            "whyIsItUsed": "Reveals delegation patterns, layer boundaries, and deep call paths.",
            "javaSyntax": "stepA(); // calls stepB() which calls stepC()",
            "howItWorks": "Each call pushes a new StackFrame; return pops frames in reverse order (LIFO).",
            "visualRepresentation": "Horizontal linear pipeline of method cards connected by sequential invocation arrows.",
            "realWorldExample": "A bucket brigade passing water buckets down a line of workers.",
            "commonMistakes": "Creating overly deep call chains that risk StackOverflowError.",
            "challenge": "Trace return paths back to main."
          }
        }
      ]
    },
    {
      "id": "24.3-multiple-callers",
      "code": "24.3",
      "title": "Multiple Callers to Single Method",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.3-s1",
          "title": "1. Shared Utility Method Invocations",
          "level": "intermediate",
          "learningObjective": "Inspect high in-degree vertices representing widely shared utility routines.",
          "javaSource": "public class MultiCallerDemo {\n    static String formatName(String n) { return n.trim().toUpperCase(); }\n    static void registerUser(String n) { String clean = formatName(n); }\n    static void updateProfile(String n) { String clean = formatName(n); }\n    public static void main(String[] args) {\n        registerUser(\" alice \");\n        updateProfile(\" bob \");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mc-reg",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 60
                },
                "data": {
                  "id": "mc-reg",
                  "entityType": "method",
                  "name": "registerUser(String)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String n"
                  ],
                  "body": "formatName(n)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "mc-upd",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 220
                },
                "data": {
                  "id": "mc-upd",
                  "entityType": "method",
                  "name": "updateProfile(String)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String n"
                  ],
                  "body": "formatName(n)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "mc-fmt",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "mc-fmt",
                  "entityType": "method",
                  "name": "formatName(String) [HUB]",
                  "returnType": "String",
                  "visibility": "public",
                  "parameters": [
                    "String n"
                  ],
                  "body": "trim().toUpperCase()",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-reg-fmt",
                "source": "mc-reg",
                "target": "mc-fmt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-reg-fmt",
                  "type": "call",
                  "label": "invokes (in-degree=2)",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-upd-fmt",
                "source": "mc-upd",
                "target": "mc-fmt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-upd-fmt",
                  "type": "call",
                  "label": "invokes (in-degree=2)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Methods with high in-degree are utility hubs that centralize reusable logic across callers.",
            "whyIsItUsed": "Identifies critical path methods where regressions will impact multiple subsystems.",
            "javaSyntax": "formatName(n);",
            "howItWorks": "Call graph in-degree calculation counts distinct call sites targeting the method signature.",
            "visualRepresentation": "Fan-in pattern with converging arrows from multiple callers pointing to target hub.",
            "realWorldExample": "A central water fountain serving multiple park trails.",
            "commonMistakes": "Modifying the behavior of a shared utility method without checking all callers.",
            "challenge": "Calculate in-degree if main also calls formatName directly."
          }
        }
      ]
    },
    {
      "id": "24.4-single-to-multiple",
      "code": "24.4",
      "title": "Single Caller to Multiple Callee Methods",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.4-s1",
          "title": "1. Orchestration & Fan-Out",
          "level": "intermediate",
          "learningObjective": "Visualize orchestrator methods that coordinate multiple specialized sub-tasks.",
          "javaSource": "public class OrchestratorDemo {\n    static void validate() { System.out.println(\"1. Validating\"); }\n    static void process() { System.out.println(\"2. Processing\"); }\n    static void notifyUser() { System.out.println(\"3. Notifying\"); }\n    public static void executeOrder() {\n        validate();\n        process();\n        notifyUser();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "fan-orch",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "fan-orch",
                  "entityType": "method",
                  "name": "executeOrder() [FAN-OUT]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "validate(); process(); notifyUser();",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "fan-val",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 40
                },
                "data": {
                  "id": "fan-val",
                  "entityType": "method",
                  "name": "validate()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "fan-proc",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "fan-proc",
                  "entityType": "method",
                  "name": "process()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "fan-not",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 240
                },
                "data": {
                  "id": "fan-not",
                  "entityType": "method",
                  "name": "notifyUser()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-fan-1",
                "source": "fan-orch",
                "target": "fan-val",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fan-1",
                  "type": "call",
                  "label": "step 1",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-fan-2",
                "source": "fan-orch",
                "target": "fan-proc",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fan-2",
                  "type": "call",
                  "label": "step 2",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-fan-3",
                "source": "fan-orch",
                "target": "fan-not",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fan-3",
                  "type": "call",
                  "label": "step 3",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An orchestrator method coordinates complex workflows by dispatching sub-tasks to specialized routines.",
            "whyIsItUsed": "Fosters Single Responsibility Principle by breaking monolithic methods into cohesive steps.",
            "javaSyntax": "validate(); process(); notifyUser();",
            "howItWorks": "Call graph out-degree calculation counts outgoing edges from orchestrator vertex.",
            "visualRepresentation": "Fan-out star pattern with diverging arrows from orchestrator to worker methods.",
            "realWorldExample": "An executive delegating legal, accounting, and marketing tasks to department heads.",
            "commonMistakes": "Creating 'god methods' with excessive out-degree (> 15).",
            "challenge": "Refactor by grouping steps into a pipeline."
          }
        }
      ]
    },
    {
      "id": "24.5-direct-recursion",
      "code": "24.5",
      "title": "Direct Recursion Self-Loop",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.5-s1",
          "title": "1. Factorial Self-Invocation Edge",
          "level": "intermediate",
          "learningObjective": "Observe self-referencing directed edges representing direct recursion in call graphs.",
          "javaSource": "public class RecursionGraphDemo {\n    public static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1); // Direct recursion!\n    }\n    public static void main(String[] args) {\n        factorial(4);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "rec-main",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "rec-main",
                  "entityType": "method",
                  "name": "main(String[])",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String[] args"
                  ],
                  "body": "factorial(4)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "rec-fact",
                "type": "methodNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "rec-fact",
                  "entityType": "method",
                  "name": "factorial(int n) [RECURSIVE]",
                  "returnType": "int",
                  "visibility": "public",
                  "parameters": [
                    "int n"
                  ],
                  "body": "n * factorial(n - 1)",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-init-rec",
                "source": "rec-main",
                "target": "rec-fact",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-init-rec",
                  "type": "call",
                  "label": "initial call",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-self-loop",
                "source": "rec-fact",
                "target": "rec-fact",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-self-loop",
                  "type": "call",
                  "label": "recursive self-loop (n > 1)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Direct recursion appears in the call graph as a self-referencing directed cycle edge from a vertex to itself.",
            "whyIsItUsed": "Solves naturally inductive mathematical and tree-traversal algorithms.",
            "javaSyntax": "return n * factorial(n - 1);",
            "howItWorks": "Each self-invocation pushes a new StackFrame with decrementing arguments until base case returns.",
            "visualRepresentation": "Looping edge that curves from top of method card and re-enters its side.",
            "realWorldExample": "Russian Matryoshka nesting dolls opening smaller versions of themselves.",
            "commonMistakes": "Omitting or incorrectly defining the base case condition (causes StackOverflowError).",
            "challenge": "Inspect stack depth for factorial(5)."
          }
        }
      ]
    },
    {
      "id": "24.6-mutual-recursion",
      "code": "24.6",
      "title": "Mutual / Indirect Recursion Cycle",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.6-s1",
          "title": "1. isEven() <-> isOdd() Cycle",
          "level": "advanced",
          "learningObjective": "Detect cycles across multiple method nodes: Method A calls Method B, which calls Method A.",
          "javaSource": "public class MutualRecursionDemo {\n    public static boolean isEven(int n) {\n        if (n == 0) return true;\n        return isOdd(n - 1); // Calls isOdd\n    }\n    public static boolean isOdd(int n) {\n        if (n == 0) return false;\n        return isEven(n - 1); // Calls isEven\n    }\n    public static void main(String[] args) {\n        isEven(4);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mr-even",
                "type": "methodNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "mr-even",
                  "entityType": "method",
                  "name": "isEven(int n)",
                  "returnType": "boolean",
                  "visibility": "public",
                  "parameters": [
                    "int n"
                  ],
                  "body": "isOdd(n - 1)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "mr-odd",
                "type": "methodNode",
                "position": {
                  "x": 560,
                  "y": 140
                },
                "data": {
                  "id": "mr-odd",
                  "entityType": "method",
                  "name": "isOdd(int n)",
                  "returnType": "boolean",
                  "visibility": "public",
                  "parameters": [
                    "int n"
                  ],
                  "body": "isEven(n - 1)",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-e2o",
                "source": "mr-even",
                "target": "mr-odd",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-e2o",
                  "type": "call",
                  "label": "calls isOdd",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-o2e",
                "source": "mr-odd",
                "target": "mr-even",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-o2e",
                  "type": "call",
                  "label": "calls isEven (cycle)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Mutual recursion exists when two or more distinct methods invoke each other, forming a directed cycle.",
            "whyIsItUsed": "Used in recursive descent parsers and alternating state machines.",
            "javaSyntax": "isOdd(n - 1); vs isEven(n - 1);",
            "howItWorks": "Cycle detection algorithm (Tarjan or Johnson) identifies strongly connected components (SCC) in call graph.",
            "visualRepresentation": "Two opposing curved arrows forming an oval cycle between both method nodes.",
            "realWorldExample": "Two ping-pong players hitting a ball back and forth until the rally ends.",
            "commonMistakes": "Failing to decrement argument in one of the branches, causing infinite circular calls.",
            "challenge": "Trace stack frames when evaluating isEven(3)."
          }
        }
      ]
    },
    {
      "id": "24.7-overloaded-methods",
      "code": "24.7",
      "title": "Overloaded Method Calls (Compile-Time)",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.7-s1",
          "title": "1. Static Resolution by Argument Types",
          "level": "intermediate",
          "learningObjective": "Demonstrate that method overloading binds to distinct vertices determined at compile-time by signature.",
          "javaSource": "public class OverloadGraphDemo {\n    static void print(int x) { System.out.println(\"int: \" + x); }\n    static void print(String s) { System.out.println(\"String: \" + s); }\n    static void print(double d) { System.out.println(\"double: \" + d); }\n    public static void main(String[] args) {\n        print(10);      // Binds to print(int)\n        print(\"Java\");  // Binds to print(String)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ov-main",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "ov-main",
                  "entityType": "method",
                  "name": "main()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "print(10); print(\"Java\");",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "ov-int",
                "type": "methodNode",
                "position": {
                  "x": 500,
                  "y": 40
                },
                "data": {
                  "id": "ov-int",
                  "entityType": "method",
                  "name": "print(int)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "int x"
                  ],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "ov-str",
                "type": "methodNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "ov-str",
                  "entityType": "method",
                  "name": "print(String)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "String s"
                  ],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "ov-dbl",
                "type": "methodNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "ov-dbl",
                  "entityType": "method",
                  "name": "print(double) [UNUSED]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "double d"
                  ],
                  "body": "...",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ov-1",
                "source": "ov-main",
                "target": "ov-int",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ov-1",
                  "type": "call",
                  "label": "invokestatic print(I)V",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-ov-2",
                "source": "ov-main",
                "target": "ov-str",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ov-2",
                  "type": "call",
                  "label": "invokestatic print(LString;)V",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Overloaded methods sharing the same name represent completely distinct nodes in the call graph.",
            "whyIsItUsed": "Compiler matches arguments to the most specific signature; resolution is purely static.",
            "javaSyntax": "print(10); vs print(\"Java\");",
            "howItWorks": "javac resolves candidate signatures during compilation and bakes exact method descriptor into bytecode.",
            "visualRepresentation": "Main node with separate arrows targeting print(int) and print(String); unused print(double) unlinked.",
            "realWorldExample": "A multi-slot sorting mailbox with separate slots for letters, packages, and magazines.",
            "commonMistakes": "Expecting runtime type to choose overload when passed through generic Object reference.",
            "challenge": "Add a call to print(3.14) and observe the new edge."
          }
        }
      ]
    },
    {
      "id": "24.8-overridden-methods",
      "code": "24.8",
      "title": "Overridden Method Calls (Dynamic Dispatch)",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.8-s1",
          "title": "1. Polymorphic Invocation via Vtable",
          "level": "intermediate",
          "learningObjective": "Visualize runtime polymorphic dispatch branching from interface/base method to concrete subclass.",
          "javaSource": "abstract class Animal { abstract void speak(); }\nclass Dog extends Animal { void speak() { System.out.println(\"Woof\"); } }\nclass Cat extends Animal { void speak() { System.out.println(\"Meow\"); } }\npublic class DispatchDemo {\n    public static void makeNoise(Animal a) {\n        a.speak(); // Dynamic dispatch at runtime!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "dp-caller",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "dp-caller",
                  "entityType": "method",
                  "name": "makeNoise(Animal a)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "Animal a"
                  ],
                  "body": "a.speak()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "dp-poly",
                "type": "methodNode",
                "position": {
                  "x": 460,
                  "y": 140
                },
                "data": {
                  "id": "dp-poly",
                  "entityType": "method",
                  "name": "Animal.speak() [VIRTUAL]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "abstract",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "dp-dog",
                "type": "methodNode",
                "position": {
                  "x": 760,
                  "y": 60
                },
                "data": {
                  "id": "dp-dog",
                  "entityType": "method",
                  "name": "Dog.speak()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "println(\"Woof\")",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "dp-cat",
                "type": "methodNode",
                "position": {
                  "x": 760,
                  "y": 220
                },
                "data": {
                  "id": "dp-cat",
                  "entityType": "method",
                  "name": "Cat.speak()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "println(\"Meow\")",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dp-inv",
                "source": "dp-caller",
                "target": "dp-poly",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dp-inv",
                  "type": "call",
                  "label": "invokevirtual",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-dp-dog",
                "source": "dp-poly",
                "target": "dp-dog",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dp-dog",
                  "type": "call",
                  "label": "vtable dispatch if Dog",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-dp-cat",
                "source": "dp-poly",
                "target": "dp-cat",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dp-cat",
                  "type": "call",
                  "label": "vtable dispatch if Cat",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Dynamic dispatch in call graphs branches from the static call site to the concrete runtime receiver implementations.",
            "whyIsItUsed": "Core engine of object-oriented polymorphism.",
            "javaSyntax": "a.speak();",
            "howItWorks": "Bytecode `invokevirtual` inspects receiver object's vtable header at runtime to locate method pointer.",
            "visualRepresentation": "Virtual method node splitting into multiple runtime receiver target branches.",
            "realWorldExample": "A universal TV remote 'Power' button turning on Sony, Samsung, or LG TV depending on room.",
            "commonMistakes": "Assuming the compiler decides which overridden method runs.",
            "challenge": "Add a `Bird.speak()` subclass."
          }
        }
      ]
    },
    {
      "id": "24.9-interface-calls",
      "code": "24.9",
      "title": "Interface Method Invocation (invokeinterface)",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.9-s1",
          "title": "1. Itable Resolution Across Disjoint Implementations",
          "level": "intermediate",
          "learningObjective": "Compare `invokevirtual` single-inheritance dispatch with `invokeinterface` dynamic table lookup.",
          "javaSource": "interface Flyable { void fly(); }\nclass Airplane implements Flyable { public void fly() { System.out.println(\"Turbines\"); } }\nclass Bird implements Flyable { public void fly() { System.out.println(\"Wings\"); } }\npublic class InterfaceCallDemo {\n    public static void takeFlight(Flyable f) { f.fly(); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ic-call",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "ic-call",
                  "entityType": "method",
                  "name": "takeFlight(Flyable f)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "Flyable f"
                  ],
                  "body": "f.fly()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "ic-iface",
                "type": "methodNode",
                "position": {
                  "x": 460,
                  "y": 140
                },
                "data": {
                  "id": "ic-iface",
                  "entityType": "method",
                  "name": "Flyable.fly() [INTERFACE]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "interface contract",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "ic-plane",
                "type": "methodNode",
                "position": {
                  "x": 760,
                  "y": 60
                },
                "data": {
                  "id": "ic-plane",
                  "entityType": "method",
                  "name": "Airplane.fly()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "...",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ic-bird",
                "type": "methodNode",
                "position": {
                  "x": 760,
                  "y": 220
                },
                "data": {
                  "id": "ic-bird",
                  "entityType": "method",
                  "name": "Bird.fly()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "...",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ic-call",
                "source": "ic-call",
                "target": "ic-iface",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ic-call",
                  "type": "call",
                  "label": "invokeinterface",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-ic-p",
                "source": "ic-iface",
                "target": "ic-plane",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ic-p",
                  "type": "implements",
                  "label": "itable dispatch",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-ic-b",
                "source": "ic-iface",
                "target": "ic-bird",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ic-b",
                  "type": "implements",
                  "label": "itable dispatch",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`invokeinterface` handles invocations on interface types where multiple unrelated classes implement the contract.",
            "whyIsItUsed": "Allows total decoupling between caller and diverse implementing classes.",
            "javaSyntax": "Flyable f = getFlyer(); f.fly();",
            "howItWorks": "JVM uses inline caching (monomorphic/megamorphic) and itable lookups in instance Metaspace layout.",
            "visualRepresentation": "Interface node with cyan dashed implementation dispatch arrows.",
            "realWorldExample": "A USB-C port accepting chargers, headphones, or external drives seamlessly.",
            "commonMistakes": "Believing interface invocations carry massive performance penalties (JIT compiles monomorphic calls directly).",
            "challenge": "Add a third implementing class Drone."
          }
        }
      ]
    },
    {
      "id": "24.10-constructor-chaining",
      "code": "24.10",
      "title": "Constructor Chaining (this() / super())",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.10-s1",
          "title": "1. <init> Invocation Sequence",
          "level": "intermediate",
          "learningObjective": "Track constructor call graph edges representing `this(...)` and `super(...)` initialization chaining.",
          "javaSource": "class Vehicle {\n    Vehicle(String brand) { System.out.println(\"Vehicle brand: \" + brand); }\n}\nclass Car extends Vehicle {\n    Car() { this(\"DefaultBrand\"); }\n    Car(String brand) { super(brand); }\n}\npublic class ChainDemo {\n    public static void main(String[] args) { new Car(); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cc-car0",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "cc-car0",
                  "entityType": "method",
                  "name": "Car()",
                  "parameters": [],
                  "body": "this(\"DefaultBrand\")",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cc-car1",
                "type": "methodNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "cc-car1",
                  "entityType": "method",
                  "name": "Car(String)",
                  "parameters": [
                    "String brand"
                  ],
                  "body": "super(brand)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cc-veh",
                "type": "methodNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "cc-veh",
                  "entityType": "method",
                  "name": "Vehicle(String)",
                  "parameters": [
                    "String brand"
                  ],
                  "body": "super() -> Object.<init>",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-this-chain",
                "source": "cc-car0",
                "target": "cc-car1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-this-chain",
                  "type": "call",
                  "label": "invokespecial this()",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-super-chain",
                "source": "cc-car1",
                "target": "cc-veh",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-super-chain",
                  "type": "call",
                  "label": "invokespecial super()",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Constructor chaining creates a deterministic initialization DAG ensuring base classes initialize before subclasses.",
            "whyIsItUsed": "Guarantees object invariants are established from the root of the hierarchy downward.",
            "javaSyntax": "Car() { this(\"Default\"); }",
            "howItWorks": "Bytecode `invokespecial <init>` links constructor entries sequentially.",
            "visualRepresentation": "Horizontal constructor sequence cards with amber initialization flow arrows.",
            "realWorldExample": "Building a house: foundation first, then framing, then interior fixtures.",
            "commonMistakes": "Recursive constructor invocation (`Car() { this(); }` which javac rejects).",
            "challenge": "Trace initialization order when fields also have initial values."
          }
        }
      ]
    },
    {
      "id": "24.11-static-calls",
      "code": "24.11",
      "title": "Static Method Calls (invokestatic)",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.11-s1",
          "title": "1. Direct Class Binding Without Heap Receivers",
          "level": "beginner",
          "learningObjective": "Demonstrate static method calls that bind directly to classes without object instances.",
          "javaSource": "public class MathUtils {\n    public static int square(int x) { return x * x; }\n    public static int cube(int x) { return x * square(x); }\n    public static void main(String[] args) {\n        cube(3);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sm-main",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "sm-main",
                  "entityType": "method",
                  "name": "main()",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "cube(3)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "sm-cube",
                "type": "methodNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "sm-cube",
                  "entityType": "method",
                  "name": "cube(int)",
                  "returnType": "int",
                  "visibility": "public",
                  "parameters": [
                    "int x"
                  ],
                  "body": "x * square(x)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "sm-sq",
                "type": "methodNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "sm-sq",
                  "entityType": "method",
                  "name": "square(int)",
                  "returnType": "int",
                  "visibility": "public",
                  "parameters": [
                    "int x"
                  ],
                  "body": "x * x",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-mc-cb",
                "source": "sm-main",
                "target": "sm-cube",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mc-cb",
                  "type": "call",
                  "label": "invokestatic",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-cb-sq",
                "source": "sm-cube",
                "target": "sm-sq",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cb-sq",
                  "type": "call",
                  "label": "invokestatic",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Static methods belong to the class itself and are resolved directly at compile time via `invokestatic`.",
            "whyIsItUsed": "Used for pure functions and stateless mathematical algorithms.",
            "javaSyntax": "MathUtils.square(5);",
            "howItWorks": "No receiver object or null checks required; method pointer resolved directly via Constant Pool.",
            "visualRepresentation": "Direct solid invocation arrows between static method vertices.",
            "realWorldExample": "A scientific calculator button that always squares any number given to it.",
            "commonMistakes": "Calling static methods on instance references (`myObj.square()`), which misleads readers.",
            "challenge": "Make `square` private and verify it remains static."
          }
        }
      ]
    },
    {
      "id": "24.12-standard-library-calls",
      "code": "24.12",
      "title": "Standard Library / External Boundary Calls",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.12-s1",
          "title": "1. Invoking java.lang.Math and System.out",
          "level": "intermediate",
          "learningObjective": "Distinguish application code nodes from external JDK standard library boundary nodes in call graphs.",
          "javaSource": "public class StdLibDemo {\n    public static void computeHypotenuse(double a, double b) {\n        double sum = Math.pow(a, 2) + Math.pow(b, 2);\n        double c = Math.sqrt(sum);\n        System.out.println(\"Hypotenuse = \" + c);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sl-app",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "sl-app",
                  "entityType": "method",
                  "name": "computeHypotenuse(double, double)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "double a",
                    "double b"
                  ],
                  "body": "Math.pow, Math.sqrt",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "sl-pow",
                "type": "methodNode",
                "position": {
                  "x": 560,
                  "y": 60
                },
                "data": {
                  "id": "sl-pow",
                  "entityType": "method",
                  "name": "Math.pow(double, double) [JDK]",
                  "returnType": "double",
                  "visibility": "public",
                  "parameters": [
                    "double",
                    "double"
                  ],
                  "body": "native",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "sl-sqrt",
                "type": "methodNode",
                "position": {
                  "x": 560,
                  "y": 220
                },
                "data": {
                  "id": "sl-sqrt",
                  "entityType": "method",
                  "name": "Math.sqrt(double) [JDK]",
                  "returnType": "double",
                  "visibility": "public",
                  "parameters": [
                    "double"
                  ],
                  "body": "native",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-app-pow",
                "source": "sl-app",
                "target": "sl-pow",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-app-pow",
                  "type": "call",
                  "label": "invokestatic (external boundary)",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-app-sqrt",
                "source": "sl-app",
                "target": "sl-sqrt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-app-sqrt",
                  "type": "call",
                  "label": "invokestatic (external boundary)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Boundary calls cross from user application packages into standard JDK or third-party library namespaces.",
            "whyIsItUsed": "Helps isolate application business logic from external runtime dependencies.",
            "javaSyntax": "Math.sqrt(x);",
            "howItWorks": "ClassLoader binds references to `java.base` module runtime symbols.",
            "visualRepresentation": "Dashed boundary enclosure separating internal methods from grey-badge JDK library nodes.",
            "realWorldExample": "An architect's blueprint referencing municipal electrical grid tie-in points.",
            "commonMistakes": "Attempting to step into native JDK intrinsics without native debug symbols.",
            "challenge": "Identify which Math methods compile down to single CPU instructions (intrinsics)."
          }
        }
      ]
    },
    {
      "id": "24.13-cross-class-calls",
      "code": "24.13",
      "title": "Cross-Class Method Invocations",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.13-s1",
          "title": "1. Service Layer Calling Data Access Object",
          "level": "intermediate",
          "learningObjective": "Trace inter-class collaboration edges where methods in Class A call methods in Class B.",
          "javaSource": "class OrderDao {\n    public boolean saveOrder(int id) { return true; }\n}\nclass OrderService {\n    private final OrderDao dao = new OrderDao();\n    public void placeOrder(int id) {\n        dao.saveOrder(id); // Cross-class call\n    }\n}\npublic class Main { public static void main(String[] args) { new OrderService().placeOrder(101); } }",
          "diagram": {
            "nodes": [
              {
                "id": "xc-svc",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "xc-svc",
                  "entityType": "method",
                  "name": "OrderService.placeOrder(int)",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [
                    "int id"
                  ],
                  "body": "dao.saveOrder(id)",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "xc-dao",
                "type": "methodNode",
                "position": {
                  "x": 560,
                  "y": 140
                },
                "data": {
                  "id": "xc-dao",
                  "entityType": "method",
                  "name": "OrderDao.saveOrder(int)",
                  "returnType": "boolean",
                  "visibility": "public",
                  "parameters": [
                    "int id"
                  ],
                  "body": "return true",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cross-cls",
                "source": "xc-svc",
                "target": "xc-dao",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cross-cls",
                  "type": "call",
                  "label": "cross-class call (service -> dao)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Cross-class invocations represent collaborations between distinct classes in the system.",
            "whyIsItUsed": "Forms the basis for class dependency graphs and architectural layer verification.",
            "javaSyntax": "orderDao.save(order);",
            "howItWorks": "invokevirtual crosses class symbol references via constant pool Fieldref/Methodref entries.",
            "visualRepresentation": "Two distinct class cluster containers with inter-cluster bridge invocation connector.",
            "realWorldExample": "A cashier calling the warehouse manager to confirm stock availability.",
            "commonMistakes": "Violating layer rules (e.g. database DAO calling controller UI methods directly).",
            "challenge": "Add an audit logger call from OrderService."
          }
        }
      ]
    },
    {
      "id": "24.14-call-frequency",
      "code": "24.14",
      "title": "Call Frequency & Hot Path Detection",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.14-s1",
          "title": "1. JIT Compilation Hotspot Profiling",
          "level": "advanced",
          "learningObjective": "Observe weighted call graph edges identifying methods executed inside tight loops (hot paths).",
          "javaSource": "public class HotPathDemo {\n    static int hash(int x) {\n        return (x ^ (x >>> 16)) * 0x45d9f3b; // Executed 1,000,000 times!\n    }\n    public static void main(String[] args) {\n        int acc = 0;\n        for (int i = 0; i < 1_000_000; i++) {\n            acc += hash(i); // Hot path!\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "hp-main",
                "type": "methodNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "hp-main",
                  "entityType": "method",
                  "name": "main() [Loop Caller]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "for (1M) hash(i)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "hp-hash",
                "type": "methodNode",
                "position": {
                  "x": 560,
                  "y": 140
                },
                "data": {
                  "id": "hp-hash",
                  "entityType": "method",
                  "name": "hash(int) [HOT PATH / JIT C2]",
                  "returnType": "int",
                  "visibility": "public",
                  "parameters": [
                    "int x"
                  ],
                  "body": "JIT inlined into native machine code",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-hot-edge",
                "source": "hp-main",
                "target": "hp-hash",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hot-edge",
                  "type": "call",
                  "label": "invoked 1,000,000x (JIT inlined)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Hot paths are call graph edges with high execution frequency that trigger JIT compiler optimization.",
            "whyIsItUsed": "Directs profiling and optimization efforts where performance gains will have the greatest impact.",
            "javaSyntax": "for (int i=0; i<1000000; i++) hash(i);",
            "howItWorks": "JVM HotSpot invocation counters exceed CompileThreshold; JIT C2 compiler compiles hash() to native code.",
            "visualRepresentation": "Thick amber call connector with execution counter badge indicating high throughput.",
            "realWorldExample": "A highway carrying 100,000 cars a day receiving asphalt paving and express lanes.",
            "commonMistakes": "Prematurely optimizing cold methods that execute once at startup.",
            "challenge": "Observe JIT inlining with `-XX:+PrintCompilation`."
          }
        }
      ]
    },
    {
      "id": "24.15-dead-methods",
      "code": "24.15",
      "title": "Dead / Unreachable Method Detection",
      "moduleId": "method-call-graph",
      "scenarios": [
        {
          "id": "24.15-s1",
          "title": "1. Zero In-Degree Orphan Methods",
          "level": "intermediate",
          "learningObjective": "Detect dead code in call graphs by identifying methods with zero in-degree from entry points.",
          "javaSource": "public class DeadCodeDemo {\n    static void activeMethod() { System.out.println(\"Active!\"); }\n    static void deadMethod() { System.out.println(\"Never called!\"); }\n    public static void main(String[] args) {\n        activeMethod();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "dc-main",
                "type": "methodNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "dc-main",
                  "entityType": "method",
                  "name": "main() [ENTRY]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "activeMethod()",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "dc-active",
                "type": "methodNode",
                "position": {
                  "x": 460,
                  "y": 80
                },
                "data": {
                  "id": "dc-active",
                  "entityType": "method",
                  "name": "activeMethod() [REACHABLE]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "println(\"Active!\")",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "dc-dead",
                "type": "methodNode",
                "position": {
                  "x": 460,
                  "y": 240
                },
                "data": {
                  "id": "dc-dead",
                  "entityType": "method",
                  "name": "deadMethod() [UNREACHABLE]",
                  "returnType": "void",
                  "visibility": "public",
                  "parameters": [],
                  "body": "Never invoked",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dc-act",
                "source": "dc-main",
                "target": "dc-active",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dc-act",
                  "type": "call",
                  "label": "invokes (in-degree=1)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Unreachable methods are graph vertices that cannot be reached by traversing directed edges from entry points.",
            "whyIsItUsed": "Identifies redundant code for tree-shaking, dead code elimination, and binary size reduction.",
            "javaSyntax": "deadMethod(); // Absent from main path",
            "howItWorks": "Static reachability analysis performs breadth-first search from `main()`; unvisited nodes are dead.",
            "visualRepresentation": "Reachable methods highlighted green; unreferenced method greyed out with dashed border.",
            "realWorldExample": "An unused railway track spur with severed connections where trains can never travel.",
            "commonMistakes": "Retaining obsolete legacy helper methods that clutter class interfaces.",
            "challenge": "Safely delete deadMethod and re-verify compile."
          }
        }
      ]
    }
  ],
  "class-dep-graph": [
    {
      "id": "25.1-inheritance-dep",
      "code": "25.1",
      "title": "Direct Inheritance Dependency (extends)",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.1-s1",
          "title": "1. Subclass Strongly Coupled to Superclass",
          "level": "beginner",
          "learningObjective": "Model the strongest coupling relationship in Java: class inheritance (`extends`).",
          "javaSource": "class Shape {\n    int color;\n    void draw() {}\n}\nclass Circle extends Shape {\n    double radius;\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-shape",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "cdg-shape",
                  "entityType": "class",
                  "name": "Shape",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-c",
                      "name": "color",
                      "type": "int",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-d",
                      "name": "draw()",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-circ",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-circ",
                  "entityType": "class",
                  "name": "Circle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-r",
                      "name": "radius",
                      "type": "double",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cdg-ext",
                "source": "cdg-circ",
                "target": "cdg-shape",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cdg-ext",
                  "type": "extends",
                  "label": "extends (inheritance dependency)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Inheritance creates an explicit dependency where the child class cannot compile or exist without the parent.",
            "whyIsItUsed": "Enables polymorphism and code reuse, but creates tight white-box coupling.",
            "javaSyntax": "class Circle extends Shape { ... }",
            "howItWorks": "Classfile header `super_class` index points directly to Shape in the Constant Pool.",
            "visualRepresentation": "Green solid arrow with hollow arrowhead pointing from subclass to superclass.",
            "realWorldExample": "A residential high-rise building completely dependent on the structural foundation beneath it.",
            "commonMistakes": "Using inheritance purely for code reuse instead of true 'is-a' relationships.",
            "challenge": "Change Shape to an abstract class."
          }
        }
      ]
    },
    {
      "id": "25.2-interface-dep",
      "code": "25.2",
      "title": "Interface Realization Dependency (implements)",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.2-s1",
          "title": "1. Conformance to Interface Contract",
          "level": "beginner",
          "learningObjective": "Inspect interface realization edges linking concrete classes to their contract interfaces.",
          "javaSource": "interface Printable {\n    void print();\n}\nclass Invoice implements Printable {\n    public void print() { System.out.println(\"Invoice #123\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-print",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "cdg-print",
                  "entityType": "class",
                  "name": "Printable",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-p",
                      "name": "print()",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-inv",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-inv",
                  "entityType": "class",
                  "name": "Invoice",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-pi",
                      "name": "print()",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cdg-impl",
                "source": "cdg-inv",
                "target": "cdg-print",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cdg-impl",
                  "type": "implements",
                  "label": "implements",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Interface realization represents contract adherence without inheriting state implementation.",
            "whyIsItUsed": "Allows loose coupling: callers interact with Printable without caring how Invoice prints.",
            "javaSyntax": "class Invoice implements Printable { ... }",
            "howItWorks": "Classfile `interfaces_count` and `interfaces[]` table point to Printable entry in Constant Pool.",
            "visualRepresentation": "Cyan dashed line with hollow triangle pointing from implementing class to interface.",
            "realWorldExample": "A vendor agreeing to conform to a standardized shipping label format.",
            "commonMistakes": "Adding methods to an interface which forces all implementing classes to break.",
            "challenge": "Add a second interface `Exportable` to Invoice."
          }
        }
      ]
    },
    {
      "id": "25.3-field-dependency",
      "code": "25.3",
      "title": "Field Association Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.3-s1",
          "title": "1. Class Holding Instance Field of Another Class",
          "level": "beginner",
          "learningObjective": "Model has-a associations where Class A declares a field of type Class B.",
          "javaSource": "class Engine {\n    int horsepower = 300;\n}\nclass Car {\n    private Engine engine = new Engine(); // Field association\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-car",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-car",
                  "entityType": "class",
                  "name": "Car",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-eng",
                      "name": "engine",
                      "type": "Engine",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-eng",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-eng",
                  "entityType": "class",
                  "name": "Engine",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-hp",
                      "name": "horsepower",
                      "type": "int",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-car-eng",
                "source": "cdg-car",
                "target": "cdg-eng",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-car-eng",
                  "type": "dependency",
                  "label": "field association (has-a)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Field association establishes structural coupling where an instance holds a persistent reference to another class.",
            "whyIsItUsed": "Favors composition over inheritance for sharing functionality.",
            "javaSyntax": "private Engine engine;",
            "howItWorks": "Field descriptor `Lcom/example/Engine;` recorded in classfile `field_info` table.",
            "visualRepresentation": "Directed dependency arrow from container class to field type class.",
            "realWorldExample": "A car containing an installed engine under the hood.",
            "commonMistakes": "Hardcoding instantiation inside field declaration instead of dependency injection.",
            "challenge": "Inject Engine via Car constructor."
          }
        }
      ]
    },
    {
      "id": "25.4-constructor-param-dep",
      "code": "25.4",
      "title": "Constructor Parameter Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.4-s1",
          "title": "1. Constructor Dependency Injection",
          "level": "intermediate",
          "learningObjective": "Visualize dependency injection coupling where Class A requires Class B at instantiation time.",
          "javaSource": "class Database {\n    void connect() {}\n}\nclass UserService {\n    private final Database db;\n    public UserService(Database db) { // Constructor injection\n        this.db = db;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-svc",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-svc",
                  "entityType": "class",
                  "name": "UserService",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-db",
                      "name": "db",
                      "type": "Database",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c-svc",
                      "name": "UserService(Database)",
                      "parameters": [
                        "Database db"
                      ]
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-db",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-db",
                  "entityType": "class",
                  "name": "Database",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-conn",
                      "name": "connect()",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-svc-db",
                "source": "cdg-svc",
                "target": "cdg-db",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-svc-db",
                  "type": "dependency",
                  "label": "constructor dependency (DI)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Constructor parameter dependency explicitly exposes what collaborating objects a class needs to function.",
            "whyIsItUsed": "Fundamental pillar of Dependency Injection (DI) and clean testable architecture.",
            "javaSyntax": "public UserService(Database db)",
            "howItWorks": "Constructor signature encodes `(LDatabase;)V` descriptor in class metadata.",
            "visualRepresentation": "Directed dependency connector labeled with constructor parameter signature.",
            "realWorldExample": "A printer requiring a power cable to be supplied before it can be turned on.",
            "commonMistakes": "Passing overly generic Object parameters that must be cast inside constructor.",
            "challenge": "Pass an interface `IDatabase` instead to achieve true inversion."
          }
        }
      ]
    },
    {
      "id": "25.5-method-param-dep",
      "code": "25.5",
      "title": "Method Parameter Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.5-s1",
          "title": "1. Ephemeral Method Parameter Coupling",
          "level": "intermediate",
          "learningObjective": "Distinguish transient method parameter dependencies from permanent field associations.",
          "javaSource": "class Document {\n    String content;\n}\nclass Printer {\n    public void print(Document doc) { // Parameter dependency\n        System.out.println(doc.content);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-prn",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-prn",
                  "entityType": "class",
                  "name": "Printer",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-pr",
                      "name": "print(Document)",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "Document doc"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-doc",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-doc",
                  "entityType": "class",
                  "name": "Document",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-cnt",
                      "name": "content",
                      "type": "String",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-prn-doc",
                "source": "cdg-prn",
                "target": "cdg-doc",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-prn-doc",
                  "type": "dependency",
                  "label": "uses parameter (transient)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Method parameter dependencies represent transient 'uses' relationships without persistent object ownership.",
            "whyIsItUsed": "Much looser coupling than field association because Printer does not store Document long-term.",
            "javaSyntax": "public void print(Document doc)",
            "howItWorks": "Method parameter descriptor encodes `(LDocument;)V` in classfile `method_info`.",
            "visualRepresentation": "Dashed dependency connector with 'uses' tag.",
            "realWorldExample": "A cash register scanning a customer loyalty card during a checkout transaction.",
            "commonMistakes": "Storing transient method parameters into long-lived static fields (causes memory leaks).",
            "challenge": "Return a `Receipt` object from `print`."
          }
        }
      ]
    },
    {
      "id": "25.6-return-type-dep",
      "code": "25.6",
      "title": "Return Type Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.6-s1",
          "title": "1. Factory Method Coupling via Return Type",
          "level": "intermediate",
          "learningObjective": "Track class dependencies created when a method returns an instance of another class.",
          "javaSource": "class Connection {\n    void close() {}\n}\nclass ConnectionFactory {\n    public static Connection create() { // Return dependency\n        return new Connection();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-fac",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-fac",
                  "entityType": "class",
                  "name": "ConnectionFactory",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-cr",
                      "name": "create()",
                      "returnType": "Connection",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-conn",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-conn",
                  "entityType": "class",
                  "name": "Connection",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-cl",
                      "name": "close()",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-fac-conn",
                "source": "cdg-fac",
                "target": "cdg-conn",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fac-conn",
                  "type": "dependency",
                  "label": "creates & returns",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Factory classes depend on the product classes they manufacture and return to clients.",
            "whyIsItUsed": "Centralizes object construction so callers only depend on the factory and abstract product.",
            "javaSyntax": "public Connection create()",
            "howItWorks": "Method descriptor `()LConnection;` links Constant Pool Class entry.",
            "visualRepresentation": "Factory creation arrow pointing to created return type.",
            "realWorldExample": "A car assembly plant producing and shipping out finished vehicles.",
            "commonMistakes": "Returning raw concrete types instead of interfaces from factory methods.",
            "challenge": "Return an interface `IConnection` instead."
          }
        }
      ]
    },
    {
      "id": "25.7-method-invocation-dep",
      "code": "25.7",
      "title": "Method Invocation Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.7-s1",
          "title": "1. Invoking Static or Instance Methods Across Classes",
          "level": "intermediate",
          "learningObjective": "Visualize operational dependency when Class A invokes methods declared on Class B.",
          "javaSource": "class Logger {\n    public static void log(String msg) { System.out.println(\"[LOG] \" + msg); }\n}\nclass PaymentGateway {\n    public void charge(double amt) {\n        Logger.log(\"Charging: \" + amt); // Invocation dependency\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-pay",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-pay",
                  "entityType": "class",
                  "name": "PaymentGateway",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-ch",
                      "name": "charge(double)",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "double amt"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-log",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-log",
                  "entityType": "class",
                  "name": "Logger",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-lg",
                      "name": "log(String)",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "String msg"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pay-log",
                "source": "cdg-pay",
                "target": "cdg-log",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pay-log",
                  "type": "dependency",
                  "label": "invokes Logger.log()",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Method invocation coupling occurs when Class A's bytecode calls a method declared in Class B.",
            "whyIsItUsed": "If Class B alters its method signature, Class A fails to recompile.",
            "javaSyntax": "Logger.log(\"...\");",
            "howItWorks": "Bytecode contains Methodref resolving to Logger class in constant pool.",
            "visualRepresentation": "Call dependency connector linking calling class to callee class.",
            "realWorldExample": "An accountant calling the company bank to confirm account balance.",
            "commonMistakes": "Tightly coupling business logic to static utility methods (hard to mock in tests).",
            "challenge": "Replace static Logger with injected `ILogger`."
          }
        }
      ]
    },
    {
      "id": "25.8-local-var-instantiation",
      "code": "25.8",
      "title": "Local Variable Instantiation Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.8-s1",
          "title": "1. `new Helper()` Inside Method Body",
          "level": "beginner",
          "learningObjective": "Detect dependencies introduced when a method instantiates an object inside its local body.",
          "javaSource": "class EmailHelper {\n    void send(String to, String msg) {}\n}\nclass Notifier {\n    public void alertUser(String to) {\n        EmailHelper helper = new EmailHelper(); // Local instantiation\n        helper.send(to, \"Alert\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-not",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-not",
                  "entityType": "class",
                  "name": "Notifier",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-al",
                      "name": "alertUser(String)",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "String to"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-hlp",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-hlp",
                  "entityType": "class",
                  "name": "EmailHelper",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-sd",
                      "name": "send(String, String)",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "String to",
                        "String msg"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-not-hlp",
                "source": "cdg-not",
                "target": "cdg-hlp",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-not-hlp",
                  "type": "dependency",
                  "label": "instantiates locally",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Local instantiation directly couples the enclosing class to the concrete implementation being created.",
            "whyIsItUsed": "Bypasses dependency injection and makes isolated unit testing difficult.",
            "javaSyntax": "EmailHelper h = new EmailHelper();",
            "howItWorks": "Bytecode `new EmailHelper` followed by `invokespecial <init>` links EmailHelper class.",
            "visualRepresentation": "Dashed arrow tagged 'instantiates' pointing from caller to constructed class.",
            "realWorldExample": "A chef stepping outside the kitchen to buy a single spice from the grocery store.",
            "commonMistakes": "Instantiating concrete dependencies inside methods rather than injecting them.",
            "challenge": "Refactor Notifier to receive EmailHelper in its constructor."
          }
        }
      ]
    },
    {
      "id": "25.9-explicit-import-dep",
      "code": "25.9",
      "title": "Explicit Import Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.9-s1",
          "title": "1. Import Statement Source-Level Coupling",
          "level": "beginner",
          "learningObjective": "Observe source code level dependencies created by package import declarations.",
          "javaSource": "package com.app.ui;\nimport com.app.model.UserProfile; // Explicit import dependency\npublic class UserView {\n    UserProfile profile;\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-view",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-view",
                  "entityType": "class",
                  "name": "UserView (com.app.ui)",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-p",
                      "name": "profile",
                      "type": "UserProfile",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-prof",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-prof",
                  "entityType": "class",
                  "name": "UserProfile (com.app.model)",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ui-model",
                "source": "cdg-view",
                "target": "cdg-prof",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ui-model",
                  "type": "dependency",
                  "label": "import dependency",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Import statements declare cross-package dependencies required for compiler symbol resolution.",
            "whyIsItUsed": "Maps architectural package dependencies between UI, business, and domain models.",
            "javaSyntax": "import com.app.model.UserProfile;",
            "howItWorks": "AST import declarations bind unqualified type names to fully qualified canonical class names.",
            "visualRepresentation": "Cross-package dependency arrow crossing boundary box.",
            "realWorldExample": "An office worker requesting a file from another department's archive.",
            "commonMistakes": "Wildcard imports (`import com.pkg.*`) that obscure true specific dependencies.",
            "challenge": "Organize imports to remove unused references."
          }
        }
      ]
    },
    {
      "id": "25.10-same-package-dep",
      "code": "25.10",
      "title": "Same-Package Implicit Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.10-s1",
          "title": "1. Package-Private Collaboration Without Imports",
          "level": "beginner",
          "learningObjective": "Demonstrate implicit same-package dependencies that require no explicit import statements.",
          "javaSource": "package com.app.engine;\nclass InternalState { int step = 0; }\nclass EngineWorker {\n    InternalState state = new InternalState(); // Same package, no import\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-worker",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-worker",
                  "entityType": "class",
                  "name": "EngineWorker (pkg-private)",
                  "classType": "class",
                  "visibility": "package",
                  "fields": [
                    {
                      "id": "f-s",
                      "name": "state",
                      "type": "InternalState",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-state",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-state",
                  "entityType": "class",
                  "name": "InternalState (pkg-private)",
                  "classType": "class",
                  "visibility": "package",
                  "fields": [
                    {
                      "id": "f-st",
                      "name": "step",
                      "type": "int",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pkg-dep",
                "source": "cdg-worker",
                "target": "cdg-state",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pkg-dep",
                  "type": "dependency",
                  "label": "same-package implicit",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Classes in the same package access package-private types without explicit import statements.",
            "whyIsItUsed": "Encapsulates module internals so external packages cannot see or depend on helper classes.",
            "javaSyntax": "InternalState state;",
            "howItWorks": "javac symbol resolver searches current compilation package before inspecting imports.",
            "visualRepresentation": "Enclosing package boundary container enclosing both collaborating nodes.",
            "realWorldExample": "Co-workers sharing internal notes inside the same conference room.",
            "commonMistakes": "Assuming package-private classes are visible to sub-packages (they are not).",
            "challenge": "Make InternalState public."
          }
        }
      ]
    },
    {
      "id": "25.11-cyclic-dependency",
      "code": "25.11",
      "title": "Cyclic Class Dependency (A <-> B)",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.11-s1",
          "title": "1. Two Classes Mutually Referencing Each Other",
          "level": "advanced",
          "learningObjective": "Identify architectural code smells where Class A depends on Class B, and Class B depends on Class A.",
          "javaSource": "class Order {\n    Customer customer;\n    public void setCustomer(Customer c) { this.customer = c; }\n}\nclass Customer {\n    Order activeOrder;\n    public void setOrder(Order o) { this.activeOrder = o; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-ord",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "cdg-ord",
                  "entityType": "class",
                  "name": "Order [CYCLIC]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-c",
                      "name": "customer",
                      "type": "Customer",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-cust",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "cdg-cust",
                  "entityType": "class",
                  "name": "Customer [CYCLIC]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-o",
                      "name": "activeOrder",
                      "type": "Order",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cyc-1",
                "source": "cdg-ord",
                "target": "cdg-cust",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cyc-1",
                  "type": "dependency",
                  "label": "references Customer",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-cyc-2",
                "source": "cdg-cust",
                "target": "cdg-ord",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cyc-2",
                  "type": "dependency",
                  "label": "references Order (cycle)",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A cyclic class dependency exists when two classes depend on each other, creating tight bidirectional coupling.",
            "whyIsItUsed": "Makes classes impossible to reuse, test, or refactor independently.",
            "javaSyntax": "class Order { Customer c; } class Customer { Order o; }",
            "howItWorks": "Cycle detection identifies strongly connected components (SCC) in class dependency DAG.",
            "visualRepresentation": "Red circular dependency arrows looping between Order and Customer.",
            "realWorldExample": "Two people holding each other's coats so neither can put their own coat on.",
            "commonMistakes": "Allowing cyclic dependencies between packages (violates Acyclic Dependencies Principle).",
            "challenge": "Break the cycle by storing only `customerId` in Order."
          }
        }
      ]
    },
    {
      "id": "25.12-multitier-chains",
      "code": "25.12",
      "title": "Multi-tier Dependency Chains (A -> B -> C)",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.12-s1",
          "title": "1. Controller -> Service -> Repository Layering",
          "level": "intermediate",
          "learningObjective": "Analyze clean multi-tier architecture flow through layered dependency chains.",
          "javaSource": "class UserRepository {}\nclass UserService {\n    private final UserRepository repo = new UserRepository();\n}\nclass UserController {\n    private final UserService service = new UserService();\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-ctrl",
                "type": "classNode",
                "position": {
                  "x": 80,
                  "y": 140
                },
                "data": {
                  "id": "cdg-ctrl",
                  "entityType": "class",
                  "name": "UserController [Presentation]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-s",
                      "name": "service",
                      "type": "UserService",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-serv",
                "type": "classNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "cdg-serv",
                  "entityType": "class",
                  "name": "UserService [Business]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-r",
                      "name": "repo",
                      "type": "UserRepository",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-repo",
                "type": "classNode",
                "position": {
                  "x": 760,
                  "y": 140
                },
                "data": {
                  "id": "cdg-repo",
                  "entityType": "class",
                  "name": "UserRepository [Data]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cs",
                "source": "cdg-ctrl",
                "target": "cdg-serv",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cs",
                  "type": "dependency",
                  "label": "calls service",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-sr",
                "source": "cdg-serv",
                "target": "cdg-repo",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sr",
                  "type": "dependency",
                  "label": "calls repository",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multi-tier layering enforces a directed acyclic dependency flow from presentation to business to persistence.",
            "whyIsItUsed": "Protects business logic from UI changes and separates data storage concerns.",
            "javaSyntax": "Controller -> Service -> Repository",
            "howItWorks": "Class dependency transitive closure traces reachable nodes across consecutive layers.",
            "visualRepresentation": "Horizontal 3-tier layout with strict left-to-right dependency connectors.",
            "realWorldExample": "A restaurant where diners order from waiters (Controller), who notify chefs (Service), who pull ingredients from the pantry (Repo).",
            "commonMistakes": "Bypassing intermediate layers (e.g. Controller directly calling Repository).",
            "challenge": "Verify that Repository never imports Controller."
          }
        }
      ]
    },
    {
      "id": "25.13-coupling-analysis",
      "code": "25.13",
      "title": "Afferent & Efferent Coupling Analysis",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.13-s1",
          "title": "1. Measuring Instability (I = Ce / (Ca + Ce))",
          "level": "advanced",
          "learningObjective": "Calculate Robert C. Martin's package instability metric using incoming and outgoing class dependencies.",
          "javaSource": "class CoreModel {} // Ca = 2, Ce = 0 -> Instability I = 0.0 (Max Stable!)\nclass ServiceA { CoreModel m; }\nclass ServiceB { CoreModel m; }",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-core",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 140
                },
                "data": {
                  "id": "cdg-core",
                  "entityType": "class",
                  "name": "CoreModel [STABLE]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-sa",
                "type": "classNode",
                "position": {
                  "x": 120,
                  "y": 60
                },
                "data": {
                  "id": "cdg-sa",
                  "entityType": "class",
                  "name": "ServiceA [Ca=0, Ce=1]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-m",
                      "name": "m",
                      "type": "CoreModel",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-sb",
                "type": "classNode",
                "position": {
                  "x": 120,
                  "y": 220
                },
                "data": {
                  "id": "cdg-sb",
                  "entityType": "class",
                  "name": "ServiceB [Ca=0, Ce=1]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-mb",
                      "name": "m",
                      "type": "CoreModel",
                      "visibility": "package"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sa-core",
                "source": "cdg-sa",
                "target": "cdg-core",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sa-core",
                  "type": "dependency",
                  "label": "Efferent Ce=1",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-sb-core",
                "source": "cdg-sb",
                "target": "cdg-core",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sb-core",
                  "type": "dependency",
                  "label": "Efferent Ce=1",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Afferent coupling (Ca) is incoming dependencies; Efferent coupling (Ce) is outgoing dependencies. Instability I = Ce / (Ca + Ce).",
            "whyIsItUsed": "Core domain models should have I near 0.0 (highly stable); top-level apps can have I near 1.0 (flexible).",
            "javaSyntax": "Instability I = Ce / (Ca + Ce)",
            "howItWorks": "Graph metric computes in-degree (Ca) and out-degree (Ce) for each class vertex.",
            "visualRepresentation": "Target core node badge displaying Ca=2, Ce=0, Instability I=0.00.",
            "realWorldExample": "The foundation stones of a house: many elements rest on them (Ca high), they rest on bedrock (Ce low).",
            "commonMistakes": "Making a widely used class (high Ca) depend on volatile, frequently changing utility classes.",
            "challenge": "Calculate instability of ServiceA."
          }
        }
      ]
    },
    {
      "id": "25.14-dependency-inversion",
      "code": "25.14",
      "title": "Dependency Inversion Principle (DIP)",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.14-s1",
          "title": "1. High-Level and Low-Level Modules Depending on Abstraction",
          "level": "advanced",
          "learningObjective": "Inspect Dependency Inversion: StudentService depends on Repository interface, not DatabaseRepository.",
          "javaSource": "interface Repository { Student findById(int id); }\nclass DatabaseRepository implements Repository { public Student findById(int id) { return null; } }\nclass StudentService {\n    private final Repository repo;\n    StudentService(Repository r) { this.repo = r; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-svc",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "cdg-svc",
                  "entityType": "class",
                  "name": "StudentService (High-Level)",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-r",
                      "name": "repo",
                      "type": "Repository",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-repo-iface",
                "type": "classNode",
                "position": {
                  "x": 500,
                  "y": 60
                },
                "data": {
                  "id": "cdg-repo-iface",
                  "entityType": "class",
                  "name": "Repository (Abstraction)",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-f",
                      "name": "findById(int)",
                      "returnType": "Student",
                      "visibility": "public",
                      "parameters": [
                        "int id"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-db-repo",
                "type": "classNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "cdg-db-repo",
                  "entityType": "class",
                  "name": "DatabaseRepository (Low-Level)",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-svc-dep-iface",
                "source": "cdg-svc",
                "target": "cdg-repo-iface",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-svc-dep-iface",
                  "type": "dependency",
                  "label": "depends on abstraction",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-db-impl-iface",
                "source": "cdg-db-repo",
                "target": "cdg-repo-iface",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-db-impl-iface",
                  "type": "implements",
                  "label": "implements",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Dependency Inversion states high-level modules should not depend on low-level modules; both should depend on abstractions.",
            "whyIsItUsed": "Decouples business logic from persistence technologies and enables easy mock testing.",
            "javaSyntax": "StudentService(Repository repo)",
            "howItWorks": "Both Service and DB implementation point toward the central Repository interface contract.",
            "visualRepresentation": "Arrows from high-level service and low-level DB both converging on central interface.",
            "realWorldExample": "A wall electrical outlet: appliances and power plants both conform to the standardized plug interface.",
            "commonMistakes": "High-level service directly instantiating `new DatabaseRepository()`.",
            "challenge": "Substitute a `MockRepository` for unit testing without changing StudentService."
          }
        }
      ]
    },
    {
      "id": "25.15-third-party-libs",
      "code": "25.15",
      "title": "External Third-Party Library Dependency",
      "moduleId": "class-dep-graph",
      "scenarios": [
        {
          "id": "25.15-s1",
          "title": "1. Boundary Edges Crossing External Library Packages",
          "level": "intermediate",
          "learningObjective": "Differentiate internal application package vertices from external third-party dependency nodes.",
          "javaSource": "import com.google.gson.Gson;\npublic class JsonService {\n    private final Gson gson = new Gson();\n    public String toJson(Object obj) {\n        return gson.toJson(obj); // External library dependency\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cdg-json",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cdg-json",
                  "entityType": "class",
                  "name": "JsonService (com.app)",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-g",
                      "name": "gson",
                      "type": "Gson",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-tj",
                      "name": "toJson(Object)",
                      "returnType": "String",
                      "visibility": "public",
                      "parameters": [
                        "Object obj"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cdg-gson",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "cdg-gson",
                  "entityType": "class",
                  "name": "Gson [com.google.gson]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ext-lib",
                "source": "cdg-json",
                "target": "cdg-gson",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ext-lib",
                  "type": "dependency",
                  "label": "external maven dependency",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "External dependencies cross module boundaries to third-party libraries managed by build tools (Maven, Gradle).",
            "whyIsItUsed": "Helps track external security vulnerabilities (CVEs) and licensing compliance.",
            "javaSyntax": "import com.google.gson.Gson;",
            "howItWorks": "Resolved by ModuleLayer or class path JAR loader at runtime.",
            "visualRepresentation": "Distinct grey badge node indicating third-party vendor library.",
            "realWorldExample": "Plugging an off-the-shelf alternator into a custom-built sports car.",
            "commonMistakes": "Allowing third-party types to leak deeply into core business entities (use an adapter instead).",
            "challenge": "Wrap Gson behind an internal `JsonSerializer` interface."
          }
        }
      ]
    }
  ],
  "execution-timeline": [
    {
      "id": "26.1-sequential-timeline",
      "code": "26.1",
      "title": "Sequential Execution Event Timeline",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.1-s1",
          "title": "1. Chronological Step-by-Step Runtime Ledger",
          "level": "beginner",
          "learningObjective": "Track chronological program execution events with before and after state snapshots.",
          "javaSource": "class Student {\n    String name;\n    double gpa;\n    Student(String n, double g) { this.name = n; this.gpa = g; }\n    void updateGpa(double val) { this.gpa = val; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Alice\", 3.5);\n        s1.updateGpa(4.0);\n        System.out.println(s1.gpa);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ev-1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "ev-1",
                  "entityType": "variable",
                  "name": "Event #1 (t=0ms)",
                  "variableType": "ALLOCATION",
                  "variableValue": "new Student(\"Alice\", 3.5) @0xS1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ev-2",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "ev-2",
                  "entityType": "variable",
                  "name": "Event #2 (t=2ms)",
                  "variableType": "METHOD_CALL",
                  "variableValue": "s1.updateGpa(4.0)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ev-3",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "ev-3",
                  "entityType": "variable",
                  "name": "Event #3 (t=3ms)",
                  "variableType": "MUTATION",
                  "variableValue": "gpa: 3.5 -> 4.0",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ev-12",
                "source": "ev-1",
                "target": "ev-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ev-12",
                  "type": "call",
                  "label": "step 1 -> 2",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-ev-23",
                "source": "ev-2",
                "target": "ev-3",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ev-23",
                  "type": "call",
                  "label": "step 2 -> 3",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The execution timeline records every state mutation, allocation, and method call in chronological order.",
            "whyIsItUsed": "Enables time-travel debugging: step forward, step backward, and inspect past program state.",
            "javaSyntax": "s1.updateGpa(4.0);",
            "howItWorks": "Runtime event collector intercepts bytecodes and emits typed execution events into the chronological log.",
            "visualRepresentation": "Horizontal event ribbon with sequence numbers, timestamps, and before/after states.",
            "realWorldExample": "A flight data recorder (black box) recording flight parameters millisecond by millisecond.",
            "commonMistakes": "Attempting to reverse state by rerunning the program (timeline restores recorded snapshots).",
            "challenge": "Step backward to inspect GPA before update."
          }
        }
      ]
    },
    {
      "id": "26.2-var-init-event",
      "code": "26.2",
      "title": "Variable Initialization Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.2-s1",
          "title": "1. Local Variable Declaration & Value Assignment",
          "level": "beginner",
          "learningObjective": "Capture local variable creation events on the timeline with exact byte and type information.",
          "javaSource": "public class VarInitDemo {\n    public static void main(String[] args) {\n        int count = 10;     // t0: local var allocated\n        double rate = 0.05; // t1: local var allocated\n        boolean active = true; // t2: local var allocated\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "vi-0",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "vi-0",
                  "entityType": "variable",
                  "name": "t0: count = 10",
                  "variableType": "INIT [int]",
                  "variableValue": "Slot 1: 10",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "vi-1",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "vi-1",
                  "entityType": "variable",
                  "name": "t1: rate = 0.05",
                  "variableType": "INIT [double]",
                  "variableValue": "Slot 2-3: 0.05",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "vi-2",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "vi-2",
                  "entityType": "variable",
                  "name": "t2: active = true",
                  "variableType": "INIT [boolean]",
                  "variableValue": "Slot 4: 1 (true)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-vi-01",
                "source": "vi-0",
                "target": "vi-1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-vi-01",
                  "type": "call",
                  "label": "sequential init",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-vi-12",
                "source": "vi-1",
                "target": "vi-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-vi-12",
                  "type": "call",
                  "label": "sequential init",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Variable initialization events mark the exact moment a local slot is allocated and assigned its initial value.",
            "whyIsItUsed": "Demonstrates how primitive values reside directly within the stack frame local variable table.",
            "javaSyntax": "int count = 10;",
            "howItWorks": "Bytecodes: `bipush 10`, `istore_1`. Modifies local variable table entry at index 1.",
            "visualRepresentation": "Timeline milestone cards showing variable name, data type, slot index, and initial literal value.",
            "realWorldExample": "Placing labeled folders into filing cabinet drawers one by one.",
            "commonMistakes": "Assuming uninitialized local variables receive default zeros (Java requires definite assignment).",
            "challenge": "Add an uninitialized variable and observe compiler error."
          }
        }
      ]
    },
    {
      "id": "26.3-heap-alloc-event",
      "code": "26.3",
      "title": "Heap Object Allocation Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.3-s1",
          "title": "1. `new` Expression Heap Allocation & Memory Address",
          "level": "beginner",
          "learningObjective": "Record the heap allocation event: Eden memory allocation, object header setup, and constructor completion.",
          "javaSource": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n}\npublic class AllocEventDemo {\n    public static void main(String[] args) {\n        Point p = new Point(10, 20); // ALLOCATION EVENT\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ev-new-expr",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "ev-new-expr",
                  "entityType": "variable",
                  "name": "Event: new Point(10, 20)",
                  "variableType": "BYTECODE: new",
                  "variableValue": "Allocated 24 bytes in Eden",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ev-obj-created",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "ev-obj-created",
                  "entityType": "heap-object",
                  "name": "Point @0x7FA1",
                  "className": "Point",
                  "address": "@0x7FA1",
                  "fields": [
                    {
                      "id": "f-x",
                      "name": "x",
                      "type": "int",
                      "value": "10"
                    },
                    {
                      "id": "f-y",
                      "name": "y",
                      "type": "int",
                      "value": "20"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-alloc-link",
                "source": "ev-new-expr",
                "target": "ev-obj-created",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-alloc-link",
                  "type": "allocates",
                  "label": "allocates 24B @0x7FA1",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Heap allocation events track the memory lifecycle of object instances from creation in Eden generation.",
            "whyIsItUsed": "Audits memory footprint, allocation velocity, and garbage collection pressure.",
            "javaSyntax": "Point p = new Point(10, 20);",
            "howItWorks": "Bytecode `new Point` allocates object header in Eden; `invokespecial <init>` populates fields.",
            "visualRepresentation": "Allocation pulse connector linking bytecode statement to newly spawned heap object card.",
            "realWorldExample": "A birth certificate issued the moment a new citizen enters the registry.",
            "commonMistakes": "Assuming `new` only runs the constructor (memory allocation occurs before constructor executes).",
            "challenge": "Inspect object header size (mark word + klass word)."
          }
        }
      ]
    },
    {
      "id": "26.4-method-entry-event",
      "code": "26.4",
      "title": "Method Entry / Push Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.4-s1",
          "title": "1. Stack Frame Creation on Method Entry",
          "level": "intermediate",
          "learningObjective": "Visualize the creation and activation of a new stack frame when a method is called.",
          "javaSource": "public class MethodEntryDemo {\n    public static int calculateTotal(int base, int tax) {\n        // Method entry event: frame pushed with arguments\n        return base + tax;\n    }\n    public static void main(String[] args) {\n        calculateTotal(100, 15);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "me-call",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "me-call",
                  "entityType": "variable",
                  "name": "t=4ms: invoke calculateTotal",
                  "variableType": "Method Call Event",
                  "variableValue": "Args: base=100, tax=15",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "me-frame",
                "type": "stackFrameNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "me-frame",
                  "entityType": "stack-frame",
                  "name": "calculateTotal(100, 15)",
                  "methodSignature": "calculateTotal(int, int): int",
                  "localVariables": {
                    "base": "100",
                    "tax": "15"
                  },
                  "operandStack": [],
                  "currentLineNumber": 3,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-me-push",
                "source": "me-call",
                "target": "me-frame",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-me-push",
                  "type": "call",
                  "label": "pushes stack frame",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Method entry events record when the thread pushes a new frame onto its private execution stack.",
            "whyIsItUsed": "Initializes argument slots in the local variable array from caller operand values.",
            "javaSyntax": "calculateTotal(100, 15);",
            "howItWorks": "JVM updates current frame pointer, passes parameters into local slots 0..N, and sets PC register to method start.",
            "visualRepresentation": "Timeline event card with downward frame push animation arrow.",
            "realWorldExample": "A surgeon stepping up to the operating table and receiving sterilized surgical tools.",
            "commonMistakes": "Assuming arguments are modified in the caller when changed in the callee (Java is strictly pass-by-value).",
            "challenge": "Check the value of `tax` after the method completes."
          }
        }
      ]
    },
    {
      "id": "26.5-method-return-event",
      "code": "26.5",
      "title": "Method Return / Pop Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.5-s1",
          "title": "1. Frame Popping & Return Value Delivery",
          "level": "intermediate",
          "learningObjective": "Capture stack frame deallocation and return value delivery back to caller operand stack.",
          "javaSource": "public class MethodReturnDemo {\n    static int compute() {\n        int res = 42;\n        return res; // RETURN EVENT\n    }\n    public static void main(String[] args) {\n        int ans = compute();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mr-frame",
                "type": "stackFrameNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "mr-frame",
                  "entityType": "stack-frame",
                  "name": "compute() [POPPED]",
                  "methodSignature": "compute(): int",
                  "localVariables": {
                    "res": "42"
                  },
                  "operandStack": [
                    "42"
                  ],
                  "currentLineNumber": 4,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mr-caller",
                "type": "stackFrameNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "mr-caller",
                  "entityType": "stack-frame",
                  "name": "main() [RECEIVER]",
                  "methodSignature": "main(String[]): void",
                  "localVariables": {
                    "ans": "42"
                  },
                  "operandStack": [],
                  "currentLineNumber": 7,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ret-val",
                "source": "mr-frame",
                "target": "mr-caller",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ret-val",
                  "type": "call",
                  "label": "returns value 42 & pops frame",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Method return events capture when a frame is popped from the stack and its computed value is pushed onto the caller operand stack.",
            "whyIsItUsed": "Completes the method lifecycle and restores caller execution context.",
            "javaSyntax": "return res;",
            "howItWorks": "Bytecode `ireturn` pops frame, deallocates local slots, and transfers top operand to caller frame.",
            "visualRepresentation": "Dashed deallocating frame card with value delivery arrow targeting caller frame.",
            "realWorldExample": "A delivery courier dropping off a package at customer doorstep and departing.",
            "commonMistakes": "Assuming values can be returned without capturing them in caller variables.",
            "challenge": "Inspect return bytecode for `double` (`dreturn`) vs `void` (`return`)."
          }
        }
      ]
    },
    {
      "id": "26.6-state-mutation-event",
      "code": "26.6",
      "title": "Field / State Mutation Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.6-s1",
          "title": "1. Field Value Transition Before and After",
          "level": "beginner",
          "learningObjective": "Track object field mutation events recording exact before-value and after-value transitions.",
          "javaSource": "class BankAccount {\n    double balance = 100.0;\n    void deposit(double amt) {\n        this.balance += amt; // MUTATION EVENT\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.deposit(50.0);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mut-ev",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "mut-ev",
                  "entityType": "variable",
                  "name": "t=8ms: Field Mutation",
                  "variableType": "PUTFIELD: balance",
                  "variableValue": "Target: @0xACC1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mut-snap",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "mut-snap",
                  "entityType": "heap-object",
                  "name": "BankAccount @0xACC1",
                  "className": "BankAccount",
                  "address": "@0xACC1",
                  "fields": [
                    {
                      "id": "f-b",
                      "name": "balance",
                      "type": "double",
                      "value": "100.0 -> 150.0 (MUTATED)"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-mut-apply",
                "source": "mut-ev",
                "target": "mut-snap",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mut-apply",
                  "type": "call",
                  "label": "balance: 100.0 -> 150.0",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "State mutation events record the exact moment an instance or static field value is updated.",
            "whyIsItUsed": "Crucial for identifying invariant violations and unexpected side-effects.",
            "javaSyntax": "this.balance += amount;",
            "howItWorks": "Bytecode `putfield` updates the memory offset inside the heap object struct.",
            "visualRepresentation": "Mutation badge displaying `100.0 -> 150.0` with before/after comparison.",
            "realWorldExample": "A bank statement line item showing balance before and after a deposit transaction.",
            "commonMistakes": "Accidental mutation of shared objects across threads without locking.",
            "challenge": "Make balance immutable by declaring it `final`."
          }
        }
      ]
    },
    {
      "id": "26.7-branching-event",
      "code": "26.7",
      "title": "Conditional Branching Event (if-else)",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.7-s1",
          "title": "1. Branch Condition Evaluation & Taken Path",
          "level": "beginner",
          "learningObjective": "Record conditional evaluations and track which execution branch was taken vs skipped.",
          "javaSource": "public class BranchDemo {\n    public static void checkStatus(int score) {\n        if (score >= 50) { // BRANCH EVENT: evaluates true\n            System.out.println(\"PASSED\");\n        } else {\n            System.out.println(\"FAILED\"); // SKIPPED\n        }\n    }\n    public static void main(String[] args) { checkStatus(75); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "br-cond",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "br-cond",
                  "entityType": "variable",
                  "name": "Condition: score >= 50",
                  "variableType": "Branch Decision",
                  "variableValue": "75 >= 50 -> TRUE",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "br-taken",
                "type": "variableNode",
                "position": {
                  "x": 480,
                  "y": 60
                },
                "data": {
                  "id": "br-taken",
                  "entityType": "variable",
                  "name": "Branch: if body [TAKEN]",
                  "variableType": "Executed Path",
                  "variableValue": "println(\"PASSED\")",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "br-skipped",
                "type": "variableNode",
                "position": {
                  "x": 480,
                  "y": 220
                },
                "data": {
                  "id": "br-skipped",
                  "entityType": "variable",
                  "name": "Branch: else body [SKIPPED]",
                  "variableType": "Bypassed Path",
                  "variableValue": "Unexecuted",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-br-t",
                "source": "br-cond",
                "target": "br-taken",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-br-t",
                  "type": "call",
                  "label": "true path taken",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-br-s",
                "source": "br-cond",
                "target": "br-skipped",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-br-s",
                  "type": "call",
                  "label": "false path skipped",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Branching events log boolean condition outcomes and track which execution path was activated.",
            "whyIsItUsed": "Analyzes branch prediction accuracy and code coverage during test runs.",
            "javaSyntax": "if (score >= 50)",
            "howItWorks": "Bytecode `if_icmplt` jumps past if-body when condition fails; otherwise falls through.",
            "visualRepresentation": "Forking timeline path showing green illuminated path and greyed out unvisited branch.",
            "realWorldExample": "A railway switch track directing a train onto the mainline while siding remains empty.",
            "commonMistakes": "Assuming both sides of short-circuit operators (`&&`, `||`) always evaluate.",
            "challenge": "Change score to 30 and observe else branch take precedence."
          }
        }
      ]
    },
    {
      "id": "26.8-loop-iteration-event",
      "code": "26.8",
      "title": "Loop Iteration Timeline Events",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.8-s1",
          "title": "1. For Loop Unrolling Across 3 Iterations",
          "level": "intermediate",
          "learningObjective": "Unroll loop iterations onto a horizontal timeline to inspect index variable evolution.",
          "javaSource": "public class LoopTimelineDemo {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 3; i++) {\n            sum += i; // Iterations i=1, i=2, i=3\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "lp-it1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "lp-it1",
                  "entityType": "variable",
                  "name": "Iteration #1 (i=1)",
                  "variableType": "Loop Step",
                  "variableValue": "sum: 0 + 1 = 1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "lp-it2",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "lp-it2",
                  "entityType": "variable",
                  "name": "Iteration #2 (i=2)",
                  "variableType": "Loop Step",
                  "variableValue": "sum: 1 + 2 = 3",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "lp-it3",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "lp-it3",
                  "entityType": "variable",
                  "name": "Iteration #3 (i=3)",
                  "variableType": "Loop Step",
                  "variableValue": "sum: 3 + 3 = 6 (Exit)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-lp-12",
                "source": "lp-it1",
                "target": "lp-it2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-lp-12",
                  "type": "call",
                  "label": "i++ (i=2)",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-lp-23",
                "source": "lp-it2",
                "target": "lp-it3",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-lp-23",
                  "type": "call",
                  "label": "i++ (i=3)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Loop timeline unrolling displays each iteration as a distinct chronological event with updated index variables.",
            "whyIsItUsed": "Eliminates confusion regarding off-by-one errors and loop termination conditions.",
            "javaSyntax": "for (int i=1; i<=3; i++)",
            "howItWorks": "Bytecodes `iinc`, `iload`, `if_icmple`, `goto`. Repeats loop body until conditional jump succeeds.",
            "visualRepresentation": "Sequential iteration cards linked with loop increment connectors.",
            "realWorldExample": "Laps run by an athlete on a track, recording split times and accumulated distance per lap.",
            "commonMistakes": "Off-by-one errors (using `<` instead of `<=` or vice versa).",
            "challenge": "Add a `break` statement when `i == 2`."
          }
        }
      ]
    },
    {
      "id": "26.9-exception-timeline-event",
      "code": "26.9",
      "title": "Exception Throw & Catch Events",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.9-s1",
          "title": "1. Disruption of Normal Sequence by Exception",
          "level": "intermediate",
          "learningObjective": "Track how an exception throw abruptly aborts sequential statements on the timeline.",
          "javaSource": "public class ExceptionTimelineDemo {\n    public static void main(String[] args) {\n        System.out.println(\"t0: Start\");\n        try {\n            int x = 10 / 0; // t1: EXCEPTION THROW\n            System.out.println(\"t2: Aborted\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"t3: Handled in catch\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ex-ev-start",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "ex-ev-start",
                  "entityType": "variable",
                  "name": "t0: Start (Normal)",
                  "variableType": "Execution Step",
                  "variableValue": "Completed",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ex-ev-throw",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 60
                },
                "data": {
                  "id": "ex-ev-throw",
                  "entityType": "variable",
                  "name": "t1: athrow (Div by Zero)",
                  "variableType": "Exception Disruption",
                  "variableValue": "ArithmeticException thrown",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ex-ev-catch",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "ex-ev-catch",
                  "entityType": "variable",
                  "name": "t3: catch handler",
                  "variableType": "Recovery Event",
                  "variableValue": "Normal flow resumes",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ex-jump-tl",
                "source": "ex-ev-start",
                "target": "ex-ev-throw",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ex-jump-tl",
                  "type": "exception-flow",
                  "label": "triggers exception",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-ex-catch-tl",
                "source": "ex-ev-throw",
                "target": "ex-ev-catch",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ex-catch-tl",
                  "type": "exception-flow",
                  "label": "jumps to handler",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Exception events visually disrupt the normal horizontal timeline flow, jumping directly to handler blocks.",
            "whyIsItUsed": "Illustrates non-local transfer of control and aborted downstream statements.",
            "javaSyntax": "int x = 10 / 0;",
            "howItWorks": "Bytecode `idiv` triggers hardware fault; JVM wraps it into ArithmeticException and jumps to catch PC offset.",
            "visualRepresentation": "Red warning event node with bypass arc skipping interrupted statements.",
            "realWorldExample": "An emergency stop pull cord on a conveyor belt stopping all subsequent assembly stations.",
            "commonMistakes": "Assuming statements immediately after an exception throw will still run.",
            "challenge": "Trace what happens if catch block also throws an exception."
          }
        }
      ]
    },
    {
      "id": "26.10-thread-context-switch",
      "code": "26.10",
      "title": "Thread Context Switch Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.10-s1",
          "title": "1. Multi-Thread Timeline Interleaving",
          "level": "advanced",
          "learningObjective": "Inspect interleaved execution timelines showing CPU context switches between Thread-1 and Thread-2.",
          "javaSource": "public class ContextSwitchDemo {\n    public static void main(String[] args) {\n        // Thread 1: Task A1 -> Task A2\n        // Thread 2: Task B1 -> Task B2\n        // OS Scheduler interleaves: A1 -> B1 -> A2 -> B2\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cs-a1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "cs-a1",
                  "entityType": "variable",
                  "name": "t0: Thread-1 (Task A1)",
                  "variableType": "Thread 1 Active",
                  "variableValue": "Executing",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cs-b1",
                "type": "variableNode",
                "position": {
                  "x": 340,
                  "y": 200
                },
                "data": {
                  "id": "cs-b1",
                  "entityType": "variable",
                  "name": "t1: Thread-2 (Task B1)",
                  "variableType": "Thread 2 Active",
                  "variableValue": "Context Switch to T2",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cs-a2",
                "type": "variableNode",
                "position": {
                  "x": 580,
                  "y": 80
                },
                "data": {
                  "id": "cs-a2",
                  "entityType": "variable",
                  "name": "t2: Thread-1 (Task A2)",
                  "variableType": "Thread 1 Active",
                  "variableValue": "Context Switch back to T1",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cs-b2",
                "type": "variableNode",
                "position": {
                  "x": 820,
                  "y": 200
                },
                "data": {
                  "id": "cs-b2",
                  "entityType": "variable",
                  "name": "t3: Thread-2 (Task B2)",
                  "variableType": "Thread 2 Active",
                  "variableValue": "Context Switch to T2",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cs-1",
                "source": "cs-a1",
                "target": "cs-b1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cs-1",
                  "type": "call",
                  "label": "context switch",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-cs-2",
                "source": "cs-b1",
                "target": "cs-a2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cs-2",
                  "type": "call",
                  "label": "context switch",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-cs-3",
                "source": "cs-a2",
                "target": "cs-b2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cs-3",
                  "type": "call",
                  "label": "context switch",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Context switch events log when the OS scheduler preempts an active thread and assigns CPU time to another thread.",
            "whyIsItUsed": "Explains non-deterministic thread ordering and potential race conditions.",
            "javaSyntax": "Thread.yield();",
            "howItWorks": "OS kernel saves register state into Thread Control Block (TCB) and loads register state of next thread.",
            "visualRepresentation": "Dual-swimlane timeline with zig-zag connectors showing CPU focus bouncing between threads.",
            "realWorldExample": "A chess grandmaster playing a simultaneous exhibition against two opponents, making one move per board.",
            "commonMistakes": "Assuming concurrent threads run synchronously in strict alternating order.",
            "challenge": "Observe context switch frequency with virtual threads."
          }
        }
      ]
    },
    {
      "id": "26.11-collection-mutation",
      "code": "26.11",
      "title": "Collection Mutation Timeline Event",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.11-s1",
          "title": "1. ArrayList.add() Growth & Capacity Resizing",
          "level": "intermediate",
          "learningObjective": "Track collection mutation timeline events showing element insertions and backing array resizing.",
          "javaSource": "import java.util.*;\npublic class CollectionMutationDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(2);\n        list.add(\"A\"); // t0: size=1, cap=2\n        list.add(\"B\"); // t1: size=2, cap=2 (FULL)\n        list.add(\"C\"); // t2: RESIZE! size=3, cap=3\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cm-0",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "cm-0",
                  "entityType": "variable",
                  "name": "t0: list.add(\"A\")",
                  "variableType": "Collection Insert",
                  "variableValue": "size=1, cap=2",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cm-1",
                "type": "variableNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "cm-1",
                  "entityType": "variable",
                  "name": "t1: list.add(\"B\")",
                  "variableType": "Collection Insert",
                  "variableValue": "size=2, cap=2 (Full)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cm-2",
                "type": "variableNode",
                "position": {
                  "x": 740,
                  "y": 140
                },
                "data": {
                  "id": "cm-2",
                  "entityType": "variable",
                  "name": "t2: list.add(\"C\") [RESIZE]",
                  "variableType": "Grow & Reallocate",
                  "variableValue": "size=3, cap=3 (Arrays.copyOf)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cm-01",
                "source": "cm-0",
                "target": "cm-1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cm-01",
                  "type": "collection-containment",
                  "label": "appends element",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-cm-12",
                "source": "cm-1",
                "target": "cm-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cm-12",
                  "type": "collection-containment",
                  "label": "reallocates backing buffer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Collection mutation events audit operations like add, remove, and backing array growth.",
            "whyIsItUsed": "Detects amortized resizing costs and `ConcurrentModificationException` during iteration.",
            "javaSyntax": "list.add(\"C\");",
            "howItWorks": "When size reaches capacity, ArrayList allocates a new array of size `oldCapacity + (oldCapacity >> 1)` and copies elements.",
            "visualRepresentation": "Collection timeline card highlighting backing array reallocation and size indicators.",
            "realWorldExample": "An expanding accordion folder: adding dividers as more files are inserted.",
            "commonMistakes": "Modifying a collection while iterating over it with a for-each loop.",
            "challenge": "Pre-allocate ArrayList with expected capacity (`new ArrayList<>(1000)`)."
          }
        }
      ]
    },
    {
      "id": "26.12-ref-reassignment-gc",
      "code": "26.12",
      "title": "Reference Reassignment & GC Eligibility",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.12-s1",
          "title": "1. Pointing Reference to null Creating Heap Garbage",
          "level": "intermediate",
          "learningObjective": "Capture the exact timeline instant when an object becomes unreachable and eligible for garbage collection.",
          "javaSource": "class Node { String tag; Node(String t) { this.tag = t; } }\npublic class RefReassignDemo {\n    public static void main(String[] args) {\n        Node n1 = new Node(\"Alpha\"); // t0: Live\n        n1 = null;                   // t1: Alpha becomes UNREACHABLE (GC Eligible)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "gc-t0",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "gc-t0",
                  "entityType": "variable",
                  "name": "t0: n1 = new Node(\"Alpha\")",
                  "variableType": "Allocation",
                  "variableValue": "Root reachable ref",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "gc-t1",
                "type": "heapObjectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "gc-t1",
                  "entityType": "heap-object",
                  "name": "Node(\"Alpha\") [UNREACHABLE]",
                  "className": "Node",
                  "address": "@0xGC01",
                  "fields": [
                    {
                      "id": "f-t",
                      "name": "tag",
                      "type": "String",
                      "value": "\"Alpha\""
                    }
                  ],
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-gc-sever",
                "source": "gc-t0",
                "target": "gc-t1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-gc-sever",
                  "type": "reference",
                  "label": "n1 = null (severed link -> GC eligible)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Reference reassignment events mark when pointers are overwritten or set to null, potentially creating garbage.",
            "whyIsItUsed": "Illustrates automatic memory management and garbage collection eligibility.",
            "javaSyntax": "n1 = null;",
            "howItWorks": "Overwrites local variable slot with 0x0; breaks reachability path from GC root set.",
            "visualRepresentation": "Ghosted object card with severed reference connector and red GC recycling badge.",
            "realWorldExample": "A ship unmooring from a dock: once the last line is cast off, it drifts into open waters.",
            "commonMistakes": "Believing `n1 = null` immediately invokes the garbage collector (GC runs on its own schedule).",
            "challenge": "Call `System.gc()` and observe GC logs."
          }
        }
      ]
    },
    {
      "id": "26.13-class-init-event",
      "code": "26.13",
      "title": "Static Class Initialization Event (<clinit>)",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.13-s1",
          "title": "1. Class Loading & Static Initializer Block Execution",
          "level": "advanced",
          "learningObjective": "Inspect the timeline event when a class is loaded into Metaspace and its `<clinit>` static block executes.",
          "javaSource": "class Config {\n    public static final String API_KEY;\n    static {\n        System.out.println(\"<clinit> running: initializing API_KEY\");\n        API_KEY = \"SECRET-KEY-123\";\n    }\n}\npublic class ClinitDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Before access\");\n        System.out.println(Config.API_KEY); // Triggers <clinit>\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cl-main",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "cl-main",
                  "entityType": "variable",
                  "name": "t0: First Reference to Config",
                  "variableType": "Trigger Point",
                  "variableValue": "Accesses Config.API_KEY",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cl-init",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "cl-init",
                  "entityType": "class",
                  "name": "Config [<clinit> EXECUTED]",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-key",
                      "name": "API_KEY",
                      "type": "String",
                      "visibility": "public"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "METASPACE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-clinit-trigger",
                "source": "cl-main",
                "target": "cl-init",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-clinit-trigger",
                  "type": "call",
                  "label": "lazy class initialization (<clinit>)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Static class initialization `<clinit>` occurs lazily on the first active use of a class.",
            "whyIsItUsed": "Sets up static constant tables, database connection pools, and singleton instances.",
            "javaSyntax": "static { API_KEY = \"...\"; }",
            "howItWorks": "JVM class loader loads bytecode, acquires initialization lock for class, and executes `<clinit>` once per ClassLoader.",
            "visualRepresentation": "Metaspace class card illuminated with static initialization badge.",
            "realWorldExample": "Turning on the main electrical breaker in a building before turning on individual office room lights.",
            "commonMistakes": "Causing deadlocks inside `<clinit>` by spawning threads that depend on the uninitialized class.",
            "challenge": "Check if accessing a compile-time constant `static final int X = 42;` triggers `<clinit>` (it does not!)."
          }
        }
      ]
    },
    {
      "id": "26.14-branch-comparison",
      "code": "26.14",
      "title": "Execution Comparison (Branch A vs Branch B)",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.14-s1",
          "title": "1. Side-by-Side Timeline Trace for Different Inputs",
          "level": "advanced",
          "learningObjective": "Compare two execution timelines side-by-side to understand algorithmic divergence.",
          "javaSource": "public class CompareDemo {\n    public static int discount(int price, boolean isMember) {\n        if (isMember) return price - 20; // Trace A: Member\n        else return price;                // Trace B: Non-Member\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cmp-tr-a",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 80
                },
                "data": {
                  "id": "cmp-tr-a",
                  "entityType": "variable",
                  "name": "Trace A: isMember = true",
                  "variableType": "Execution Path A",
                  "variableValue": "price: 100 -> 80 (Discount Applied)",
                  "provenanceCategory": "SIMULATED"
                }
              },
              {
                "id": "cmp-tr-b",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 240
                },
                "data": {
                  "id": "cmp-tr-b",
                  "entityType": "variable",
                  "name": "Trace B: isMember = false",
                  "variableType": "Execution Path B",
                  "variableValue": "price: 100 -> 100 (No Discount)",
                  "provenanceCategory": "SIMULATED"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cmp-diff",
                "source": "cmp-tr-a",
                "target": "cmp-tr-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cmp-diff",
                  "type": "dependency",
                  "label": "contrasting execution trace",
                  "provenance": "SIMULATED"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Execution timeline comparison places two execution paths side-by-side to highlight state divergences.",
            "whyIsItUsed": "Powerful for regression testing, performance profiling, and bug reproduction.",
            "javaSyntax": "discount(100, true) vs discount(100, false)",
            "howItWorks": "Simulates or replays two recorded execution traces simultaneously, highlighting step differences.",
            "visualRepresentation": "Dual horizontal timeline ribbons showing synchronized step-by-step divergence.",
            "realWorldExample": "Two runners taking different route forks during a marathon and comparing split times.",
            "commonMistakes": "Assuming both branches produce identical side effects.",
            "challenge": "Test with an edge condition where price is negative."
          }
        }
      ]
    },
    {
      "id": "26.15-timeline-filter",
      "code": "26.15",
      "title": "Timeline Event Filtering (Memory vs Calls vs Mutations)",
      "moduleId": "execution-timeline",
      "scenarios": [
        {
          "id": "26.15-s1",
          "title": "1. Multi-Category Event Stream Filtering",
          "level": "intermediate",
          "learningObjective": "Filter high-density timeline streams by event category: ALLOCATION, METHOD_CALL, MUTATION, or EXCEPTION.",
          "javaSource": "public class FilterDemo {\n    public static void main(String[] args) {\n        // Timeline can filter by:\n        // 1. ALLOCATION: new Object()\n        // 2. METHOD_CALL: calculate()\n        // 3. MUTATION: field = value\n        // 4. EXCEPTION: throw/catch\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "flt-all",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "flt-all",
                  "entityType": "variable",
                  "name": "Raw Event Stream (100%)",
                  "variableType": "All Events",
                  "variableValue": "Memory + Calls + Mutations",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "flt-mem",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 40
                },
                "data": {
                  "id": "flt-mem",
                  "entityType": "variable",
                  "name": "Filter: ALLOCATIONS ONLY",
                  "variableType": "Memory View",
                  "variableValue": "Isolates heap allocations",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "flt-call",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "flt-call",
                  "entityType": "variable",
                  "name": "Filter: METHOD CALLS ONLY",
                  "variableType": "Call View",
                  "variableValue": "Isolates control flow",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "flt-mut",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "flt-mut",
                  "entityType": "variable",
                  "name": "Filter: MUTATIONS ONLY",
                  "variableType": "State View",
                  "variableValue": "Isolates data changes",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-flt-1",
                "source": "flt-all",
                "target": "flt-mem",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-flt-1",
                  "type": "call",
                  "label": "filter category",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-flt-2",
                "source": "flt-all",
                "target": "flt-call",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-flt-2",
                  "type": "call",
                  "label": "filter category",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-flt-3",
                "source": "flt-all",
                "target": "flt-mut",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-flt-3",
                  "type": "call",
                  "label": "filter category",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Timeline filtering allows developers to focus on specific dimensions of execution (e.g. only state mutations).",
            "whyIsItUsed": "Prevents information overload in large programs with thousands of runtime events.",
            "javaSyntax": "timeline.filter(e -> e.type == MUTATION);",
            "howItWorks": "UI predicate pipeline filters the underlying event list without mutating the recorded history.",
            "visualRepresentation": "Stream splitting funnel icon routing into specialized categorized timeline views.",
            "realWorldExample": "Audio mixing console isolating the vocal track from guitar and drum tracks.",
            "commonMistakes": "Filtering out relevant causal events that led up to an error.",
            "challenge": "Filter by method name to observe only calls to `deposit()`."
          }
        }
      ]
    }
  ]
};

export function getGroup4ModuleSubsections(moduleId: string): SubsectionDefinition[] {
  return GROUP4_SUBSECTIONS_BY_MODULE[moduleId] || [];
}
