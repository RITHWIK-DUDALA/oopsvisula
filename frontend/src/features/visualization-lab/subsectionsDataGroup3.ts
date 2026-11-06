/**
 * OOPS LAB — GROUP 3: JAVA DATA STRUCTURES REPOSITORY (MODULES 16–21)
 * Conforms strictly to Master Specification Sections 4, 5, 6, 7, 8 & 9.
 * Generated with verified Java source code, 2D AST/runtime nodes, and Section 17 educational walkthroughs.
 */

import { SubsectionDefinition } from './types';

export const GROUP3_SUBSECTIONS_BY_MODULE: Record<string, SubsectionDefinition[]> = {
  "prim-ref-types": [
    {
      "id": "16.1-primitive-types",
      "code": "16.1",
      "title": "Primitive Types & Value Ranges",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.1-s1",
          "title": "1. All 8 Java Primitive Types",
          "level": "beginner",
          "learningObjective": "Inspect Java's eight primitive types, their bit widths, and default values.",
          "javaSource": "public class PrimitiveDemo {\n    byte a = 100;          // 8-bit\n    short b = 1000;        // 16-bit\n    int c = 50000;         // 32-bit\n    long d = 100000L;      // 64-bit\n    float e = 3.14f;       // 32-bit IEEE 754\n    double f = 3.14159;    // 64-bit IEEE 754\n    char g = 'A';          // 16-bit Unicode\n    boolean h = true;      // true / false\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-byte",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "var-byte",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "byte (8-bit)",
                  "variableValue": "100",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-short",
                "type": "variableNode",
                "position": {
                  "x": 340,
                  "y": 80
                },
                "data": {
                  "id": "var-short",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "short (16-bit)",
                  "variableValue": "1000",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-int",
                "type": "variableNode",
                "position": {
                  "x": 580,
                  "y": 80
                },
                "data": {
                  "id": "var-int",
                  "entityType": "variable",
                  "name": "c",
                  "variableType": "int (32-bit)",
                  "variableValue": "50000",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-long",
                "type": "variableNode",
                "position": {
                  "x": 820,
                  "y": 80
                },
                "data": {
                  "id": "var-long",
                  "entityType": "variable",
                  "name": "d",
                  "variableType": "long (64-bit)",
                  "variableValue": "100000L",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-float",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "var-float",
                  "entityType": "variable",
                  "name": "e",
                  "variableType": "float (32-bit)",
                  "variableValue": "3.14f",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-double",
                "type": "variableNode",
                "position": {
                  "x": 340,
                  "y": 240
                },
                "data": {
                  "id": "var-double",
                  "entityType": "variable",
                  "name": "f",
                  "variableType": "double (64-bit)",
                  "variableValue": "3.14159",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-char",
                "type": "variableNode",
                "position": {
                  "x": 580,
                  "y": 240
                },
                "data": {
                  "id": "var-char",
                  "entityType": "variable",
                  "name": "g",
                  "variableType": "char (16-bit)",
                  "variableValue": "'A' (\\u0041)",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-bool",
                "type": "variableNode",
                "position": {
                  "x": 820,
                  "y": 240
                },
                "data": {
                  "id": "var-bool",
                  "entityType": "variable",
                  "name": "h",
                  "variableType": "boolean",
                  "variableValue": "true",
                  "variableScope": "field",
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Primitives are raw binary data values stored directly in execution memory without object overhead.",
            "whyIsItUsed": "Maximizes CPU computation speed and minimizes memory footprint.",
            "javaSyntax": "int c = 50000; double f = 3.14159;",
            "howItWorks": "Stored directly in stack frame slots or inlined within heap object fields.",
            "visualRepresentation": "Memory value cards with type, bit-width, and current literal value.",
            "realWorldExample": "A coin in your wallet representing its exact face value.",
            "commonMistakes": "Assuming uninitialized local variables receive default values (only fields do).",
            "challenge": "Declare a `char` and assign its Unicode hexadecimal literal `\\u0042`."
          }
        }
      ]
    },
    {
      "id": "16.2-primitive-assign",
      "code": "16.2",
      "title": "Primitive Assignment & Independent Copying",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.2-s1",
          "title": "1. Bit-Level Value Duplication",
          "level": "beginner",
          "learningObjective": "Verify that assigning one primitive to another creates an independent value copy.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = a;\n        b = 20; // Does not affect a!\n        System.out.println(a); // 10\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a",
                "type": "variableNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "var-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "int",
                  "variableValue": "10",
                  "variableScope": "local",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-b",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "var-b",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "int",
                  "variableValue": "20 (modified)",
                  "variableScope": "local",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-copy-val",
                "source": "var-a",
                "target": "var-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-copy-val",
                  "type": "data-flow",
                  "label": "copies value 10",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Assigning a primitive copies the literal bits; both variables operate entirely independently.",
            "whyIsItUsed": "Prevents accidental side effects across different parts of the program.",
            "javaSyntax": "int b = a; b = 20;",
            "howItWorks": "JVM executes `iload_1; istore_2;` copying 32 bits from slot 1 to slot 2.",
            "visualRepresentation": "Two separate variable boxes linked by a data-flow copy arrow.",
            "realWorldExample": "Photocopying a paper document and scribbling notes on the copy.",
            "commonMistakes": "Expecting modifying `b` to change `a`.",
            "challenge": "Change `a = 50` after copying and confirm `b` retains 20."
          }
        }
      ]
    },
    {
      "id": "16.3-primitive-conversion",
      "code": "16.3",
      "title": "Primitive Type Conversion (Widening & Narrowing)",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.3-s1",
          "title": "1. Implicit Widening & Explicit Narrowing Casts",
          "level": "intermediate",
          "learningObjective": "Track loss-free widening conversions vs precision-loss narrowing casts.",
          "javaSource": "public class ConversionDemo {\n    public static void main(String[] args) {\n        int a = 10;\n        double b = a;         // Implicit widening (32-bit int -> 64-bit double)\n        double x = 9.87;\n        int y = (int) x;      // Explicit narrowing (truncates fractional digits: 9)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a-src",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 100
                },
                "data": {
                  "id": "var-a-src",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "int (32-bit)",
                  "variableValue": "10",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-b-wide",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 100
                },
                "data": {
                  "id": "var-b-wide",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "double (64-bit)",
                  "variableValue": "10.0 (widened)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-x-src",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 240
                },
                "data": {
                  "id": "var-x-src",
                  "entityType": "variable",
                  "name": "x",
                  "variableType": "double (64-bit)",
                  "variableValue": "9.87",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-y-narrow",
                "type": "variableNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "var-y-narrow",
                  "entityType": "variable",
                  "name": "y",
                  "variableType": "int (32-bit)",
                  "variableValue": "9 (truncated)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-wide",
                "source": "var-a-src",
                "target": "var-b-wide",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-wide",
                  "type": "data-flow",
                  "label": "implicit i2d",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-narrow",
                "source": "var-x-src",
                "target": "var-y-narrow",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-narrow",
                  "type": "data-flow",
                  "label": "explicit (int) d2i",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Widening moves data to a wider type safely; narrowing requires explicit casting and truncates bits.",
            "whyIsItUsed": "Controls numerical precision and memory efficiency in calculations.",
            "javaSyntax": "double b = a; int y = (int) x;",
            "howItWorks": "JVM uses `i2d` instruction for widening, `d2i` instruction for narrowing.",
            "visualRepresentation": "Directional conversion paths with before and after value states.",
            "realWorldExample": "Pouring a small glass of water into a large pitcher vs pouring a large pitcher into a small cup.",
            "commonMistakes": "Assuming narrowing rounds to nearest integer (it truncates toward zero).",
            "challenge": "Cast `(byte) 300` and inspect integer overflow wraparound."
          }
        }
      ]
    },
    {
      "id": "16.4-ref-variables",
      "code": "16.4",
      "title": "Reference Variables & Object Pointers",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.4-s1",
          "title": "1. Reference Slot Pointing to Heap Instance",
          "level": "beginner",
          "learningObjective": "Understand that reference variables store memory addresses, not the object itself.",
          "javaSource": "class Student {\n    String name;\n    Student(String n) { this.name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Alice\");\n        Student s2 = s1; // Copies pointer\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "referenceTargetId": "obj-alice",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-s2",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "var-s2",
                  "entityType": "variable",
                  "name": "s2",
                  "variableType": "Student",
                  "referenceTargetId": "obj-alice",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-alice",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "obj-alice",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0x8F1",
                  "instanceFieldValues": {
                    "name": "\"Alice\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-s1-ptr",
                "source": "var-s1",
                "target": "obj-alice",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s1-ptr",
                  "type": "reference",
                  "label": "points to 0x8F1",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-s2-ptr",
                "source": "var-s2",
                "target": "obj-alice",
                "type": "reference",
                "data": {
                  "id": "rel-s2-ptr",
                  "type": "reference",
                  "label": "points to 0x8F1",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A reference variable stores a 64-bit pointer linking to a heap object instance.",
            "whyIsItUsed": "Enables complex objects to be shared and manipulated without cloning entire memory blocks.",
            "javaSyntax": "Student s1 = new Student(\"Alice\"); Student s2 = s1;",
            "howItWorks": "Stack variable holds memory address; accessing fields dereferences the pointer.",
            "visualRepresentation": "Two stack variable nodes converging on a single heap object card.",
            "realWorldExample": "Two GPS devices displaying the coordinates to the same physical building.",
            "commonMistakes": "Believing `Student s2 = s1` creates a duplicate student.",
            "challenge": "Set `s1 = null` and verify `s2` still points to Alice."
          }
        }
      ]
    },
    {
      "id": "16.5-primitive-vs-ref-assign",
      "code": "16.5",
      "title": "Primitive vs Reference Assignment Side-by-Side",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.5-s1",
          "title": "1. Side-by-Side Comparison of Value Copy vs Pointer Copy",
          "level": "intermediate",
          "learningObjective": "Compare value copy semantics of primitives against address copy semantics of references.",
          "javaSource": "class Student {\n    String name;\n    Student(String n) { this.name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        // Primitive Assignment (Copies value)\n        int a = 10;\n        int b = a;\n        b = 20;\n\n        // Reference Assignment (Copies pointer)\n        Student s1 = new Student(\"Alice\");\n        Student s2 = s1;\n        s2.name = \"Bob\"; // Affects s1.name!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-prim-a",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "var-prim-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "int",
                  "variableValue": "10",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-prim-b",
                "type": "variableNode",
                "position": {
                  "x": 380,
                  "y": 80
                },
                "data": {
                  "id": "var-prim-b",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "int",
                  "variableValue": "20",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-ref-s1",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "var-ref-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "referenceTargetId": "obj-shared-st",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-ref-s2",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 380
                },
                "data": {
                  "id": "var-ref-s2",
                  "entityType": "variable",
                  "name": "s2",
                  "variableType": "Student",
                  "referenceTargetId": "obj-shared-st",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-shared-st",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 300
                },
                "data": {
                  "id": "obj-shared-st",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0x77A",
                  "instanceFieldValues": {
                    "name": "\"Bob\" (mutated via s2)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-s1-sh",
                "source": "var-ref-s1",
                "target": "obj-shared-st",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s1-sh",
                  "type": "reference",
                  "label": "points to 0x77A",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-s2-sh",
                "source": "var-ref-s2",
                "target": "obj-shared-st",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s2-sh",
                  "type": "reference",
                  "label": "points to 0x77A",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Primitive assignment duplicates values; reference assignment duplicates pointers to shared heap memory.",
            "whyIsItUsed": "Foundational distinction governing state isolation vs shared mutability in Java.",
            "javaSyntax": "int b = a; vs Student s2 = s1;",
            "howItWorks": "Primitive copy keeps states disjoint; reference copy shares the single underlying heap instance.",
            "visualRepresentation": "Top panel showing independent primitive cells; bottom panel showing converging reference arrows.",
            "realWorldExample": "Sharing a bank account card with a family member vs giving them physical cash.",
            "commonMistakes": "Thinking assigning an object variable clones its heap memory.",
            "challenge": "Inspect `s1.name` after updating `s2.name`."
          }
        }
      ]
    },
    {
      "id": "16.6-pass-by-value",
      "code": "16.6",
      "title": "Pass-by-Value Semantics in Methods",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.6-s1",
          "title": "1. Primitive vs Reference Parameter Transfer",
          "level": "advanced",
          "learningObjective": "Demonstrate that Java is strictly pass-by-value: passing an object passes a copy of the pointer.",
          "javaSource": "class Student {\n    String name;\n    Student(String n) { this.name = n; }\n}\npublic class Main {\n    static void change(int val) { val = 100; }\n    static void update(Student st) { st.name = \"Bob\"; } // Mutates heap\n    static void replace(Student st) { st = new Student(\"Charlie\"); } // Reassigns copy\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-caller",
                "type": "stackFrameNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "sf-caller",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "num": "5",
                    "s": "ref@0x331"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-callee",
                "type": "stackFrameNode",
                "position": {
                  "x": 420,
                  "y": 60
                },
                "data": {
                  "id": "sf-callee",
                  "entityType": "stack-frame",
                  "name": "replace(Student)",
                  "frameId": "frame-02",
                  "localVariables": {
                    "st (local copy)": "ref@0x999"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-original",
                "type": "objectNode",
                "position": {
                  "x": 760,
                  "y": 140
                },
                "data": {
                  "id": "obj-original",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0x331",
                  "instanceFieldValues": {
                    "name": "\"Bob\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-reassigned",
                "type": "objectNode",
                "position": {
                  "x": 760,
                  "y": 300
                },
                "data": {
                  "id": "obj-reassigned",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0x999",
                  "instanceFieldValues": {
                    "name": "\"Charlie\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-caller-ptr",
                "source": "sf-caller",
                "target": "obj-original",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-caller-ptr",
                  "type": "reference",
                  "label": "main.s pointer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-callee-ptr",
                "source": "sf-callee",
                "target": "obj-reassigned",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-callee-ptr",
                  "type": "reference",
                  "label": "st reassigned",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java is strictly pass-by-value. Parameters receive copies of primitive bits or reference address bits.",
            "whyIsItUsed": "Caller's variable binding cannot be changed by the callee, preserving caller integrity.",
            "javaSyntax": "static void replace(Student st) { st = new Student(\"Charlie\"); }",
            "howItWorks": "Reassigning parameter `st` rewrites the callee frame's local variable slot only; caller pointer is untouched.",
            "visualRepresentation": "Caller frame pointing to original object; callee frame pointing to newly allocated object.",
            "realWorldExample": "Giving someone a house key: they can paint the walls (mutate), but throwing their key away doesn't throw yours away.",
            "commonMistakes": "Believing Java has pass-by-reference because object mutations persist.",
            "challenge": "Explain why `caller.s` still points to Bob after `replace(s)` completes."
          }
        }
      ]
    },
    {
      "id": "16.7-scope-lifetime",
      "code": "16.7",
      "title": "Variable Scope and Execution Lifetime",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.7-s1",
          "title": "1. Local vs Field vs Static Lifetime",
          "level": "intermediate",
          "learningObjective": "Differentiate lexical scope from execution memory lifetime across variable types.",
          "javaSource": "class LifetimeDemo {\n    static int globalCount = 0; // Lifetime: Entire program\n    int instanceId = 1;         // Lifetime: Until object garbage collected\n    void compute() {\n        int temp = 42;          // Lifetime: Until frame popped\n        if (temp > 0) {\n            int blockScoped = 99; // Lifetime: Block exit\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-static",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 100
                },
                "data": {
                  "id": "var-static",
                  "entityType": "variable",
                  "name": "globalCount",
                  "variableType": "int",
                  "variableValue": "0",
                  "variableScope": "static",
                  "provenanceCategory": "METASPACE"
                }
              },
              {
                "id": "var-field",
                "type": "variableNode",
                "position": {
                  "x": 400,
                  "y": 100
                },
                "data": {
                  "id": "var-field",
                  "entityType": "variable",
                  "name": "instanceId",
                  "variableType": "int",
                  "variableValue": "1",
                  "variableScope": "field",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-local",
                "type": "variableNode",
                "position": {
                  "x": 700,
                  "y": 100
                },
                "data": {
                  "id": "var-local",
                  "entityType": "variable",
                  "name": "temp",
                  "variableType": "int",
                  "variableValue": "42",
                  "variableScope": "local",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Scope governs code visibility; lifetime governs how long memory remains allocated.",
            "whyIsItUsed": "Prevents memory leaks and restricts variables to minimal necessary boundaries.",
            "javaSyntax": "int temp = 42;",
            "howItWorks": "Local variables live on stack; fields live in heap objects; statics live with class metadata.",
            "visualRepresentation": "Three distinct scope cards with lifetime indicators (Static -> Heap -> Stack).",
            "realWorldExample": "A company monument (static) vs a company vehicle (heap) vs a disposable sticky note (stack).",
            "commonMistakes": "Confusing variable scope (visibility) with object lifetime (garbage collection).",
            "challenge": "Demonstrate variable shadowing between field and local variable."
          }
        }
      ]
    },
    {
      "id": "16.8-type-compatibility",
      "code": "16.8",
      "title": "Reference Type Compatibility & Casting",
      "moduleId": "prim-ref-types",
      "scenarios": [
        {
          "id": "16.8-s1",
          "title": "1. Upcasting, Downcasting & ClassCastException",
          "level": "advanced",
          "learningObjective": "Understand reference type assignment compatibility, safe upcasting, and runtime cast verification.",
          "javaSource": "class Animal {}\nclass Dog extends Animal {\n    void bark() {}\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog(); // Safe upcast\n        Dog d = (Dog) a;      // Explicit downcast\n        // Cat c = (Cat) a;   // Would throw ClassCastException!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a-ref",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "var-a-ref",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "Animal (declared)",
                  "referenceTargetId": "obj-dog-real",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-d-ref",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "var-d-ref",
                  "entityType": "variable",
                  "name": "d",
                  "variableType": "Dog (downcast)",
                  "referenceTargetId": "obj-dog-real",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dog-real",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 170
                },
                "data": {
                  "id": "obj-dog-real",
                  "entityType": "object",
                  "className": "Dog [Klass Word: Dog.class]",
                  "simulatorAddress": "0x44D",
                  "instanceFieldValues": {},
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-dog",
                "source": "var-a-ref",
                "target": "obj-dog-real",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-dog",
                  "type": "reference",
                  "label": "upcast pointer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-d-dog",
                "source": "var-d-ref",
                "target": "obj-dog-real",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-d-dog",
                  "type": "reference",
                  "label": "downcast verified",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Reference assignment compatibility is governed by the class hierarchy; upcasting is implicit, downcasting requires cast.",
            "whyIsItUsed": "Allows writing generic polymorphic APIs while preserving runtime type safety.",
            "javaSyntax": "Animal a = new Dog(); Dog d = (Dog) a;",
            "howItWorks": "Compiler checks type bounds; JVM checks Klass Word pointer at runtime using `checkcast`.",
            "visualRepresentation": "Two reference variables of different declared types pointing to the same Dog instance.",
            "realWorldExample": "Referring to a Beagle as an Animal (general) vs specifically as a Beagle (specific).",
            "commonMistakes": "Downcasting to an incompatible type causing ClassCastException.",
            "challenge": "Guard the downcast using `if (a instanceof Dog)`."
          }
        }
      ]
    }
  ],
  "arrays": [
    {
      "id": "17.1-declaration",
      "code": "17.1",
      "title": "Array Declaration & Reference Allocation",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.1-s1",
          "title": "1. Declaration vs Allocation",
          "level": "beginner",
          "learningObjective": "Distinguish between reference declaration and array memory allocation on the heap.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] numbers;           // Reference variable (unallocated / null)\n        numbers = new int[5];    // Heap allocation of 5 contiguous integer cells\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-num-ref",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "var-num-ref",
                  "entityType": "variable",
                  "name": "numbers",
                  "variableType": "int[]",
                  "referenceTargetId": "arr-nums-5",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-nums-5",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "arr-nums-5",
                  "entityType": "array",
                  "name": "int[5]",
                  "arrayLength": 5,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    },
                    {
                      "index": 2,
                      "value": "0"
                    },
                    {
                      "index": 3,
                      "value": "0"
                    },
                    {
                      "index": 4,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-num-arr-ref",
                "source": "var-num-ref",
                "target": "arr-nums-5",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-num-arr-ref",
                  "type": "reference",
                  "label": "points to int[5]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An array reference is a variable; `new int[5]` allocates a dedicated array object on the JVM heap.",
            "whyIsItUsed": "Enables dynamic sizing of contiguous data collections during execution.",
            "javaSyntax": "int[] numbers = new int[5];",
            "howItWorks": "JVM allocates contiguous heap block with length header and default zero-initialized elements.",
            "visualRepresentation": "Reference card on left pointing to 5-cell contiguous array card on right.",
            "realWorldExample": "A parking permit linking to a row of 5 reserved parking slots.",
            "commonMistakes": "Thinking `int[] arr;` allocates array slots.",
            "challenge": "Change size to `new int[3]` and verify length field."
          }
        }
      ]
    },
    {
      "id": "17.2-initialization",
      "code": "17.2",
      "title": "Array Initialization & Literals",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.2-s1",
          "title": "1. Array Literal Initialization",
          "level": "beginner",
          "learningObjective": "Inspect array literal shorthand syntax and initial cell values.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] primes = {2, 3, 5, 7, 11};\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-primes",
                "type": "arrayNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "arr-primes",
                  "entityType": "array",
                  "name": "primes (int[5])",
                  "arrayLength": 5,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "2"
                    },
                    {
                      "index": 1,
                      "value": "3"
                    },
                    {
                      "index": 2,
                      "value": "5"
                    },
                    {
                      "index": 3,
                      "value": "7"
                    },
                    {
                      "index": 4,
                      "value": "11"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Array literals initialize both the array length and element values in a single statement.",
            "whyIsItUsed": "Concise, readable syntax for fixed initial datasets.",
            "javaSyntax": "int[] primes = {2, 3, 5, 7, 11};",
            "howItWorks": "Compiler emits bytecode to allocate array of size 5 and store each constant into successive indices.",
            "visualRepresentation": "Indexed array card displaying literal prime numbers.",
            "realWorldExample": "A pre-filled egg carton with numbered positions.",
            "commonMistakes": "Trying to specify size in brackets when using literal `{}` syntax.",
            "challenge": "Add `13` to the literal and verify length updates to 6."
          }
        }
      ]
    },
    {
      "id": "17.3-structure",
      "code": "17.3",
      "title": "Array Internal Structure & Length Header",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.3-s1",
          "title": "1. Header, Length Field & Contiguous Slots",
          "level": "intermediate",
          "learningObjective": "Examine array object layout: Mark Word, Klass Word, 32-bit length header, and elements.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        double[] measurements = new double[]{1.5, 2.7, 3.9};\n        int len = measurements.length; // Final length field\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-meas",
                "type": "arrayNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "arr-meas",
                  "entityType": "array",
                  "name": "measurements [length: 3]",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1.5"
                    },
                    {
                      "index": 1,
                      "value": "2.7"
                    },
                    {
                      "index": 2,
                      "value": "3.9"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Arrays are full Java objects with an intrinsic 32-bit final length field in their header.",
            "whyIsItUsed": "Allows O(1) length inspection without scanning elements.",
            "javaSyntax": "int len = measurements.length;",
            "howItWorks": "Memory address is `base + index * element_size`; bounds checked before every access.",
            "visualRepresentation": "Array card highlighting header length: 3 and contiguous double slots.",
            "realWorldExample": "A ruler with total inches fixed at manufacture.",
            "commonMistakes": "Calling `length()` as a method on arrays (arrays use field `.length`).",
            "challenge": "Inspect how much memory a 3-element double array consumes (24 bytes data + 16 bytes header)."
          }
        }
      ]
    },
    {
      "id": "17.4-indexing",
      "code": "17.4",
      "title": "Array Indexing & Random Access",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.4-s1",
          "title": "1. O(1) Zero-Based Index Access",
          "level": "beginner",
          "learningObjective": "Understand zero-based indexing and instant random access computation.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        char[] letters = {'J', 'A', 'V', 'A'};\n        char first = letters[0]; // 'J'\n        char last = letters[letters.length - 1]; // 'A'\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-letters",
                "type": "arrayNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "arr-letters",
                  "entityType": "array",
                  "name": "letters (char[4])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "'J'",
                      "isHighlighted": true
                    },
                    {
                      "index": 1,
                      "value": "'A'"
                    },
                    {
                      "index": 2,
                      "value": "'V'"
                    },
                    {
                      "index": 3,
                      "value": "'A'",
                      "isHighlighted": true
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Array indices range from 0 to length - 1, providing constant-time O(1) lookup.",
            "whyIsItUsed": "Direct pointer arithmetic enables ultra-fast memory read/write cycles.",
            "javaSyntax": "char first = letters[0];",
            "howItWorks": "JVM adds offset `index * 2` bytes to base address and reads memory.",
            "visualRepresentation": "Array card highlighting first cell [0] and last cell [3].",
            "realWorldExample": "House numbers on a street starting at 0.",
            "commonMistakes": "Using `letters[letters.length]` causing off-by-one error.",
            "challenge": "Access index 2 to read letter 'V'."
          }
        }
      ]
    },
    {
      "id": "17.5-mutation",
      "code": "17.5",
      "title": "Array Mutation in Place",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.5-s1",
          "title": "1. In-Place Element Overwrite",
          "level": "beginner",
          "learningObjective": "Observe that updating an array element mutates the existing cell without resizing or reallocating.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {10, 20, 30};\n        values[1] = 99; // Mutates element at index 1\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-mut",
                "type": "arrayNode",
                "position": {
                  "x": 300,
                  "y": 120
                },
                "data": {
                  "id": "arr-mut",
                  "entityType": "array",
                  "name": "values (int[3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "10"
                    },
                    {
                      "index": 1,
                      "value": "99 (mutated)",
                      "isHighlighted": true
                    },
                    {
                      "index": 2,
                      "value": "30"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Assigning to an indexed cell overwrites the bytes in that specific slot in-place.",
            "whyIsItUsed": "Enables fast data updates without allocating new objects or shifting elements.",
            "javaSyntax": "values[1] = 99;",
            "howItWorks": "JVM executes `iastore` instruction writing integer 99 into slot index 1.",
            "visualRepresentation": "Array card highlighting index 1 with mutated value.",
            "realWorldExample": "Replacing a book on a specific shelf in a bookcase.",
            "commonMistakes": "Assuming changing array contents creates a new array object.",
            "challenge": "Change index 0 to -1 and observe immediate update."
          }
        }
      ]
    },
    {
      "id": "17.6-traversal",
      "code": "17.6",
      "title": "Array Traversal (For vs For-Each)",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.6-s1",
          "title": "1. Sequential Index Traversal",
          "level": "intermediate",
          "learningObjective": "Track iterator index pointer during sequential traversal.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] data = {100, 200, 300, 400};\n        for (int i = 0; i < data.length; i++) {\n            System.out.println(data[i]);\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-i",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "var-i",
                  "entityType": "variable",
                  "name": "i (index cursor)",
                  "variableType": "int",
                  "variableValue": "2",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-trav",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "arr-trav",
                  "entityType": "array",
                  "name": "data (int[4])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "100"
                    },
                    {
                      "index": 1,
                      "value": "200"
                    },
                    {
                      "index": 2,
                      "value": "300",
                      "isHighlighted": true
                    },
                    {
                      "index": 3,
                      "value": "400"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cursor",
                "source": "var-i",
                "target": "arr-trav",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cursor",
                  "type": "data-flow",
                  "label": "data[i=2]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Loops iterate across indices from 0 up to length - 1 to process elements sequentially.",
            "whyIsItUsed": "Standard for-loop allows index tracking; for-each eliminates off-by-one errors.",
            "javaSyntax": "for (int n : data) { ... }",
            "howItWorks": "Bytecode increments index register on each loop iteration until condition fails.",
            "visualRepresentation": "Cursor arrow pointing from index variable `i` to active array cell.",
            "realWorldExample": "Flipping through pages of a catalog one by one.",
            "commonMistakes": "Modifying loop counter inside the loop body unintentionally.",
            "challenge": "Convert to reverse traversal from `data.length - 1` down to 0."
          }
        }
      ]
    },
    {
      "id": "17.7-copying",
      "code": "17.7",
      "title": "Array Copying & Cloning",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.7-s1",
          "title": "1. System.arraycopy & clone()",
          "level": "intermediate",
          "learningObjective": "Compare shallow copy methods: clone(), System.arraycopy(), and Arrays.copyOf().",
          "javaSource": "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] src = {1, 2, 3};\n        int[] dest = Arrays.copyOf(src, src.length);\n        dest[0] = 99; // Does not affect src\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-src",
                "type": "arrayNode",
                "position": {
                  "x": 200,
                  "y": 100
                },
                "data": {
                  "id": "arr-src",
                  "entityType": "array",
                  "name": "src (int[3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-dest",
                "type": "arrayNode",
                "position": {
                  "x": 560,
                  "y": 100
                },
                "data": {
                  "id": "arr-dest",
                  "entityType": "array",
                  "name": "dest (int[3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "99 (copied & mutated)"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-arr-copy",
                "source": "arr-src",
                "target": "arr-dest",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-copy",
                  "type": "data-flow",
                  "label": "Arrays.copyOf",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Array copying allocates a distinct array instance and duplicates element bits.",
            "whyIsItUsed": "Allows modifying elements safely without mutating the original dataset.",
            "javaSyntax": "int[] dest = Arrays.copyOf(src, src.length);",
            "howItWorks": "JVM uses fast memory block copy (memmove in native C).",
            "visualRepresentation": "Two independent array cards linked by copy data-flow arrow.",
            "realWorldExample": "Photocopying a spreadsheet onto a fresh sheet of paper.",
            "commonMistakes": "Believing `dest = src` makes a copy (it only copies the reference pointer).",
            "challenge": "Copy with size 5 and observe default zero padding in extra cells."
          }
        }
      ]
    },
    {
      "id": "17.8-aliasing",
      "code": "17.8",
      "title": "Array References and Aliasing",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.8-s1",
          "title": "1. Two Reference Variables Pointing to One Array",
          "level": "intermediate",
          "learningObjective": "Observe array aliasing where mutations through one reference affect all others.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] b = a; // Aliasing\n        b[0] = 99;\n        System.out.println(a[0]); // Prints 99!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-arr-a",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 80
                },
                "data": {
                  "id": "var-arr-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "int[]",
                  "referenceTargetId": "arr-shared",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-arr-b",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 220
                },
                "data": {
                  "id": "var-arr-b",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "int[]",
                  "referenceTargetId": "arr-shared",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-shared",
                "type": "arrayNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "arr-shared",
                  "entityType": "array",
                  "name": "Shared int[3]",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "99 (mutated via b)"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-arr",
                "source": "var-arr-a",
                "target": "arr-shared",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-arr",
                  "type": "reference",
                  "label": "points to 0xARR_01",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-arr",
                "source": "var-arr-b",
                "target": "arr-shared",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-arr",
                  "type": "reference",
                  "label": "points to 0xARR_01",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Assigning array variables copies the memory pointer, not the underlying array cells.",
            "whyIsItUsed": "Enables fast array passing to methods without memory allocation overhead.",
            "javaSyntax": "int[] b = a; b[0] = 99;",
            "howItWorks": "Both variable slots hold the exact same 64-bit heap address.",
            "visualRepresentation": "Two reference cards pointing to the same central array card.",
            "realWorldExample": "Two roommates sharing a single communal refrigerator.",
            "commonMistakes": "Assuming `b = a` allows safe mutation without affecting `a`.",
            "challenge": "Break aliasing by cloning `b = a.clone()`."
          }
        }
      ]
    },
    {
      "id": "17.9-object-arrays",
      "code": "17.9",
      "title": "Object Arrays & Reference Elements",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.9-s1",
          "title": "1. Array Cells Holding Object References & Nulls",
          "level": "intermediate",
          "learningObjective": "Inspect object arrays where cells hold 64-bit pointers to distinct heap instances.",
          "javaSource": "class Student {\n    String name;\n    Student(String n) { this.name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student[] students = new Student[3];\n        students[0] = new Student(\"Alice\");\n        students[1] = new Student(\"Bob\");\n        students[2] = null; // Unallocated slot\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-studs",
                "type": "arrayNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "arr-studs",
                  "entityType": "array",
                  "name": "Student[3]",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@0xS1"
                    },
                    {
                      "index": 1,
                      "value": "ref@0xS2"
                    },
                    {
                      "index": 2,
                      "value": "null"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-st-alice",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 80
                },
                "data": {
                  "id": "obj-st-alice",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0xS1",
                  "instanceFieldValues": {
                    "name": "\"Alice\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-st-bob",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 240
                },
                "data": {
                  "id": "obj-st-bob",
                  "entityType": "object",
                  "className": "Student",
                  "simulatorAddress": "0xS2",
                  "instanceFieldValues": {
                    "name": "\"Bob\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-arr-s1",
                "source": "arr-studs",
                "target": "obj-st-alice",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-s1",
                  "type": "reference",
                  "label": "students[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-arr-s2",
                "source": "arr-studs",
                "target": "obj-st-bob",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-s2",
                  "type": "reference",
                  "label": "students[1]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An object array stores reference pointers to heap objects, never inlined object payloads.",
            "whyIsItUsed": "Enables polymorphic storage where array cells can hold instances of different subclasses.",
            "javaSyntax": "Student[] students = new Student[3];",
            "howItWorks": "Array cells default to null until explicitly assigned instantiated objects.",
            "visualRepresentation": "Array card fanning out arrows to individual student object cards; null cell marked unlinked.",
            "realWorldExample": "A hotel key rack where each cubbyhole holds a key to an independent room.",
            "commonMistakes": "Trying to call methods on `students[2]` causing NullPointerException.",
            "challenge": "Assign `students[2] = new Student(\"Charlie\")`."
          }
        }
      ]
    },
    {
      "id": "17.10-equality",
      "code": "17.10",
      "title": "Array Equality (== vs Arrays.equals)",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.10-s1",
          "title": "1. Reference Identity vs Deep Content Equality",
          "level": "intermediate",
          "learningObjective": "Distinguish `==` reference comparison from `Arrays.equals()` content comparison.",
          "javaSource": "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] b = {1, 2, 3};\n        boolean refEqual = (a == b);             // false (different heap addresses)\n        boolean valEqual = Arrays.equals(a, b);   // true (matching elements)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-eq-a",
                "type": "arrayNode",
                "position": {
                  "x": 160,
                  "y": 80
                },
                "data": {
                  "id": "arr-eq-a",
                  "entityType": "array",
                  "name": "a (int[3]) @0x10A",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-eq-b",
                "type": "arrayNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "arr-eq-b",
                  "entityType": "array",
                  "name": "b (int[3]) @0x10B",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-cmp-ref",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 100
                },
                "data": {
                  "id": "var-cmp-ref",
                  "entityType": "variable",
                  "name": "a == b",
                  "variableType": "boolean",
                  "variableValue": "false (0x10A != 0x10B)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-cmp-val",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 220
                },
                "data": {
                  "id": "var-cmp-val",
                  "entityType": "variable",
                  "name": "Arrays.equals(a,b)",
                  "variableType": "boolean",
                  "variableValue": "true (content matches)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "`==` tests whether both variables point to the exact same array; `Arrays.equals` compares cell values.",
            "whyIsItUsed": "Essential for validating data integrity without requiring shared instance identity.",
            "javaSyntax": "Arrays.equals(a, b)",
            "howItWorks": "`==` checks address equality; `Arrays.equals()` iterates and tests each index with `==` or `equals()`.",
            "visualRepresentation": "Two identical array cards showing false for identity pointer and true for content equality.",
            "realWorldExample": "Two identical copies of the same book published separately.",
            "commonMistakes": "Using `a.equals(b)` on arrays (arrays inherit `Object.equals` which checks `==`).",
            "challenge": "Compare 2D arrays with `Arrays.deepEquals()`."
          }
        }
      ]
    },
    {
      "id": "17.11-utilities",
      "code": "17.11",
      "title": "Array Utility Operations (Sort & Search)",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.11-s1",
          "title": "1. In-Place Sorting & Binary Search",
          "level": "intermediate",
          "learningObjective": "Observe Dual-Pivot Quicksort sorting and logarithmic binary search on sorted arrays.",
          "javaSource": "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {45, 12, 85, 32, 89};\n        Arrays.sort(numbers); // {12, 32, 45, 85, 89}\n        int idx = Arrays.binarySearch(numbers, 45); // index 2\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-sorted",
                "type": "arrayNode",
                "position": {
                  "x": 260,
                  "y": 120
                },
                "data": {
                  "id": "arr-sorted",
                  "entityType": "array",
                  "name": "numbers (sorted int[5])",
                  "arrayLength": 5,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "12"
                    },
                    {
                      "index": 1,
                      "value": "32"
                    },
                    {
                      "index": 2,
                      "value": "45 (found by binarySearch)",
                      "isHighlighted": true
                    },
                    {
                      "index": 3,
                      "value": "85"
                    },
                    {
                      "index": 4,
                      "value": "89"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-bs-res",
                "type": "variableNode",
                "position": {
                  "x": 620,
                  "y": 140
                },
                "data": {
                  "id": "var-bs-res",
                  "entityType": "variable",
                  "name": "binarySearch result",
                  "variableType": "int",
                  "variableValue": "index 2",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-search-hit",
                "source": "var-bs-res",
                "target": "arr-sorted",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-search-hit",
                  "type": "reference",
                  "label": "matches index 2",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`Arrays.sort` performs Dual-Pivot Quicksort; `Arrays.binarySearch` finds element indices in O(log N).",
            "whyIsItUsed": "High-performance standard algorithmic utilities optimized in Java core runtime.",
            "javaSyntax": "Arrays.sort(numbers); Arrays.binarySearch(numbers, 45);",
            "howItWorks": "Sort mutates the array in-place; binary search repeatedly halves search range.",
            "visualRepresentation": "Sorted array card with target element highlighted.",
            "realWorldExample": "Searching a word in an alphabetized dictionary.",
            "commonMistakes": "Running binary search on an unsorted array (produces undefined/negative index).",
            "challenge": "Fill array with constant using `Arrays.fill(numbers, 0)`."
          }
        }
      ]
    },
    {
      "id": "17.12-exceptions",
      "code": "17.12",
      "title": "Array Boundary Exceptions",
      "moduleId": "arrays",
      "scenarios": [
        {
          "id": "17.12-s1",
          "title": "1. ArrayIndexOutOfBoundsException & Null Check",
          "level": "beginner",
          "learningObjective": "Understand hardware memory safety and runtime boundary exception protection in Java.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] items = new int[3];\n        // int error = items[5]; // Throws ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3\n        // int[] nullArr = null; nullArr[0] = 1; // Throws NullPointerException\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-safe",
                "type": "arrayNode",
                "position": {
                  "x": 200,
                  "y": 120
                },
                "data": {
                  "id": "arr-safe",
                  "entityType": "array",
                  "name": "items (length: 3, valid indices: 0..2)",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    },
                    {
                      "index": 2,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-err-trap",
                "type": "variableNode",
                "position": {
                  "x": 580,
                  "y": 120
                },
                "data": {
                  "id": "var-err-trap",
                  "entityType": "variable",
                  "name": "items[5] Access Trap",
                  "variableType": "Exception",
                  "variableValue": "ArrayIndexOutOfBoundsException",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-bounds-trap",
                "source": "var-err-trap",
                "target": "arr-safe",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-bounds-trap",
                  "type": "exception",
                  "label": "exceeds boundary [0..2]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java strictly enforces array bounds; negative or exceeding indices throw `ArrayIndexOutOfBoundsException`.",
            "whyIsItUsed": "Eliminates buffer overflow vulnerabilities and memory corruption attacks.",
            "javaSyntax": "items[5] -> ArrayIndexOutOfBoundsException",
            "howItWorks": "JVM emits boundary check bytecode before every array access instruction.",
            "visualRepresentation": "Array card showing valid range [0..2] with red boundary violation arrow.",
            "realWorldExample": "Trying to sit in seat #10 on an 8-passenger shuttle.",
            "commonMistakes": "Assuming Java allows negative indices like Python (Java requires 0 <= index < length).",
            "challenge": "Wrap array access in a safe boundary check `if (idx >= 0 && idx < arr.length)`."
          }
        }
      ]
    }
  ],
  "multi-arrays": [
    {
      "id": "18.1-2d-matrix",
      "code": "18.1",
      "title": "Two-Dimensional Arrays (Matrix Grid)",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.1-s1",
          "title": "1. 3x3 Matrix Grid Layout",
          "level": "beginner",
          "learningObjective": "Inspect two-dimensional array representation as rows and columns.",
          "javaSource": "public class MatrixDemo {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        int val = matrix[1][2]; // Row 1, Col 2 -> 6\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-row-0",
                "type": "arrayNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "arr-row-0",
                  "entityType": "array",
                  "name": "matrix[0] (Row 0)",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    },
                    {
                      "index": 2,
                      "value": "3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-row-1",
                "type": "arrayNode",
                "position": {
                  "x": 360,
                  "y": 180
                },
                "data": {
                  "id": "arr-row-1",
                  "entityType": "array",
                  "name": "matrix[1] (Row 1)",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "4"
                    },
                    {
                      "index": 1,
                      "value": "5"
                    },
                    {
                      "index": 2,
                      "value": "6",
                      "isHighlighted": true
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-row-2",
                "type": "arrayNode",
                "position": {
                  "x": 360,
                  "y": 300
                },
                "data": {
                  "id": "arr-row-2",
                  "entityType": "array",
                  "name": "matrix[2] (Row 2)",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "7"
                    },
                    {
                      "index": 1,
                      "value": "8"
                    },
                    {
                      "index": 2,
                      "value": "9"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-outer",
                "type": "arrayNode",
                "position": {
                  "x": 80,
                  "y": 160
                },
                "data": {
                  "id": "arr-outer",
                  "entityType": "array",
                  "name": "matrix (int[][3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@R0"
                    },
                    {
                      "index": 1,
                      "value": "ref@R1"
                    },
                    {
                      "index": 2,
                      "value": "ref@R2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-m0",
                "source": "arr-outer",
                "target": "arr-row-0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-m0",
                  "type": "reference",
                  "label": "matrix[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-m1",
                "source": "arr-outer",
                "target": "arr-row-1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-m1",
                  "type": "reference",
                  "label": "matrix[1]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-m2",
                "source": "arr-outer",
                "target": "arr-row-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-m2",
                  "type": "reference",
                  "label": "matrix[2]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A 2D array in Java is an array of arrays: the outer array holds references to independent row array objects.",
            "whyIsItUsed": "Represents tabular grids, coordinate systems, and matrices.",
            "javaSyntax": "int[][] matrix = new int[3][3];",
            "howItWorks": "Outer array holds 3 reference slots, each targeting an independent 3-element int array on the heap.",
            "visualRepresentation": "Outer array card on left fanning out references to 3 horizontal row array cards on right.",
            "realWorldExample": "A spreadsheet where each row is an independent sheet.",
            "commonMistakes": "Thinking Java allocates a single flat contiguous block for 2D arrays.",
            "challenge": "Access `matrix[0][0]` and mutate its value to 99."
          }
        }
      ]
    },
    {
      "id": "18.2-3d-arrays",
      "code": "18.2",
      "title": "Three-Dimensional Arrays (Layered Cube)",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.2-s1",
          "title": "1. Layer, Row, Column Hierarchy",
          "level": "advanced",
          "learningObjective": "Visualize 3D array hierarchy: layers -> rows -> columns.",
          "javaSource": "public class CubeDemo {\n    public static void main(String[] args) {\n        int[][][] cube = new int[2][2][2];\n        cube[0][1][0] = 42; // Layer 0, Row 1, Col 0\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-cube-root",
                "type": "arrayNode",
                "position": {
                  "x": 60,
                  "y": 140
                },
                "data": {
                  "id": "arr-cube-root",
                  "entityType": "array",
                  "name": "cube (int[2][][])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@Layer0"
                    },
                    {
                      "index": 1,
                      "value": "ref@Layer1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-layer-0",
                "type": "arrayNode",
                "position": {
                  "x": 340,
                  "y": 80
                },
                "data": {
                  "id": "arr-layer-0",
                  "entityType": "array",
                  "name": "Layer 0 (int[2][])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@L0R0"
                    },
                    {
                      "index": 1,
                      "value": "ref@L0R1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-l0-r1",
                "type": "arrayNode",
                "position": {
                  "x": 640,
                  "y": 120
                },
                "data": {
                  "id": "arr-l0-r1",
                  "entityType": "array",
                  "name": "Layer 0 Row 1 (int[2])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "42 (mutated)",
                      "isHighlighted": true
                    },
                    {
                      "index": 1,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-c-l0",
                "source": "arr-cube-root",
                "target": "arr-layer-0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c-l0",
                  "type": "reference",
                  "label": "cube[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-l0-r1",
                "source": "arr-layer-0",
                "target": "arr-l0-r1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-l0-r1",
                  "type": "reference",
                  "label": "layer0[1]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "3D arrays are hierarchical reference trees: array of arrays of arrays.",
            "whyIsItUsed": "Models 3D spatial points, voxel engines, and multi-channel image data.",
            "javaSyntax": "int[][][] cube = new int[2][2][2];",
            "howItWorks": "Three dereferencing steps: root -> layer array -> row array -> primitive cell.",
            "visualRepresentation": "Tree layout with root array fanning out to layers and rows.",
            "realWorldExample": "A filing cabinet (cube) with drawers (layers) containing folders (rows) with pages (cells).",
            "commonMistakes": "Believing 3D arrays require 3D graphics hardware acceleration.",
            "challenge": "Iterate all elements using 3 nested loops."
          }
        }
      ]
    },
    {
      "id": "18.3-jagged-arrays",
      "code": "18.3",
      "title": "Jagged (Ragged) Arrays",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.3-s1",
          "title": "1. Unequal Row Lengths",
          "level": "intermediate",
          "learningObjective": "Demonstrate that Java supports jagged arrays where each row has a different length.",
          "javaSource": "public class JaggedDemo {\n    public static void main(String[] args) {\n        int[][] ragged = {\n            {1, 2},         // length: 2\n            {3, 4, 5, 6},   // length: 4\n            {7}             // length: 1\n        };\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-rag-root",
                "type": "arrayNode",
                "position": {
                  "x": 80,
                  "y": 140
                },
                "data": {
                  "id": "arr-rag-root",
                  "entityType": "array",
                  "name": "ragged (int[3][])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@Row0"
                    },
                    {
                      "index": 1,
                      "value": "ref@Row1"
                    },
                    {
                      "index": 2,
                      "value": "ref@Row2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-r0",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 60
                },
                "data": {
                  "id": "arr-r0",
                  "entityType": "array",
                  "name": "Row 0 (int[2])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-r1",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 160
                },
                "data": {
                  "id": "arr-r1",
                  "entityType": "array",
                  "name": "Row 1 (int[4])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "3"
                    },
                    {
                      "index": 1,
                      "value": "4"
                    },
                    {
                      "index": 2,
                      "value": "5"
                    },
                    {
                      "index": 3,
                      "value": "6"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-r2",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 260
                },
                "data": {
                  "id": "arr-r2",
                  "entityType": "array",
                  "name": "Row 2 (int[1])",
                  "arrayLength": 1,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "7"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-rag-0",
                "source": "arr-rag-root",
                "target": "arr-r0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rag-0",
                  "type": "reference",
                  "label": "ragged[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-rag-1",
                "source": "arr-rag-root",
                "target": "arr-r1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rag-1",
                  "type": "reference",
                  "label": "ragged[1]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-rag-2",
                "source": "arr-rag-root",
                "target": "arr-r2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rag-2",
                  "type": "reference",
                  "label": "ragged[2]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A jagged array has rows of varying lengths, saving memory when rectangular padding is wasteful.",
            "whyIsItUsed": "Ideal for triangle matrices, month-day calendars, and variable-length text lines.",
            "javaSyntax": "int[][] ragged = new int[3][]; ragged[0] = new int[2];",
            "howItWorks": "Each row is an independent heap object allocated with its own discrete length.",
            "visualRepresentation": "Visual layout showing 3 row cards with 2, 4, and 1 cells respectively.",
            "realWorldExample": "A staircase or bookshelf with varying shelf widths.",
            "commonMistakes": "Assuming `ragged[0].length == ragged[1].length`.",
            "challenge": "Access `ragged[2][0]` and verify it returns 7."
          }
        }
      ]
    },
    {
      "id": "18.4-partial-init",
      "code": "18.4",
      "title": "Partial Array Initialization & Null Rows",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.4-s1",
          "title": "1. Unallocated Null Sub-Arrays",
          "level": "intermediate",
          "learningObjective": "Observe partially initialized 2D arrays where sub-array pointers are null.",
          "javaSource": "public class PartialDemo {\n    public static void main(String[] args) {\n        int[][] table = new int[3][]; // Only outer array allocated\n        table[0] = new int[2];\n        // table[1] is still null!\n        // table[2] is still null!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-table",
                "type": "arrayNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "arr-table",
                  "entityType": "array",
                  "name": "table (int[3][])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@Row0"
                    },
                    {
                      "index": 1,
                      "value": "null"
                    },
                    {
                      "index": 2,
                      "value": "null"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-t-r0",
                "type": "arrayNode",
                "position": {
                  "x": 460,
                  "y": 80
                },
                "data": {
                  "id": "arr-t-r0",
                  "entityType": "array",
                  "name": "table[0] (int[2])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t-r0",
                "source": "arr-table",
                "target": "arr-t-r0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-r0",
                  "type": "reference",
                  "label": "table[0]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`new int[3][]` allocates the outer reference array with 3 null slots, deferring row allocations.",
            "whyIsItUsed": "Enables lazy memory allocation for rows only when they are needed.",
            "javaSyntax": "int[][] table = new int[3][];",
            "howItWorks": "Slots [1] and [2] hold null; dereferencing `table[1][0]` throws NullPointerException.",
            "visualRepresentation": "Outer array card with slot [0] pointing to array and slots [1] & [2] marked null.",
            "realWorldExample": "A parking lot where only the first row has asphalt paved.",
            "commonMistakes": "Dereferencing `table[1].length` before initializing row 1.",
            "challenge": "Allocate `table[1] = new int[4]` dynamically."
          }
        }
      ]
    },
    {
      "id": "18.5-dynamic-row-alloc",
      "code": "18.5",
      "title": "Dynamic Row Allocation at Runtime",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.5-s1",
          "title": "1. Allocating Triangular Rows Inside a Loop",
          "level": "intermediate",
          "learningObjective": "Track stepwise allocation of expanding rows inside a for loop.",
          "javaSource": "public class TriangleDemo {\n    public static void main(String[] args) {\n        int n = 4;\n        int[][] tri = new int[n][];\n        for (int i = 0; i < n; i++) {\n            tri[i] = new int[i + 1]; // Row size grows dynamically\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-tri-root",
                "type": "arrayNode",
                "position": {
                  "x": 60,
                  "y": 140
                },
                "data": {
                  "id": "arr-tri-root",
                  "entityType": "array",
                  "name": "tri (int[4][])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@T0"
                    },
                    {
                      "index": 1,
                      "value": "ref@T1"
                    },
                    {
                      "index": 2,
                      "value": "ref@T2"
                    },
                    {
                      "index": 3,
                      "value": "ref@T3"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-t0",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 40
                },
                "data": {
                  "id": "arr-t0",
                  "entityType": "array",
                  "name": "tri[0] (int[1])",
                  "arrayLength": 1,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-t1",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 120
                },
                "data": {
                  "id": "arr-t1",
                  "entityType": "array",
                  "name": "tri[1] (int[2])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-t2",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 200
                },
                "data": {
                  "id": "arr-t2",
                  "entityType": "array",
                  "name": "tri[2] (int[3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    },
                    {
                      "index": 2,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-t3",
                "type": "arrayNode",
                "position": {
                  "x": 380,
                  "y": 280
                },
                "data": {
                  "id": "arr-t3",
                  "entityType": "array",
                  "name": "tri[3] (int[4])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    },
                    {
                      "index": 2,
                      "value": "0"
                    },
                    {
                      "index": 3,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t-0",
                "source": "arr-tri-root",
                "target": "arr-t0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-0",
                  "type": "reference",
                  "label": "tri[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t-1",
                "source": "arr-tri-root",
                "target": "arr-t1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-1",
                  "type": "reference",
                  "label": "tri[1]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t-2",
                "source": "arr-tri-root",
                "target": "arr-t2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-2",
                  "type": "reference",
                  "label": "tri[2]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t-3",
                "source": "arr-tri-root",
                "target": "arr-t3",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-3",
                  "type": "reference",
                  "label": "tri[3]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Dynamic row allocation builds complex triangular data structures like Pascal's triangle.",
            "whyIsItUsed": "Conserves memory by allocating exactly as many cells as mathematically required.",
            "javaSyntax": "tri[i] = new int[i + 1];",
            "howItWorks": "Each loop iteration executes `newarray int`, creating a distinct heap object.",
            "visualRepresentation": "Triangular stair-step visual diagram.",
            "realWorldExample": "A pyramid constructed layer by layer.",
            "commonMistakes": "Allocating before sizing is known.",
            "challenge": "Fill Pascal's triangle values using binomial coefficients."
          }
        }
      ]
    },
    {
      "id": "18.6-nested-traversal",
      "code": "18.6",
      "title": "Nested Traversal & Coordinate Highlighting",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.6-s1",
          "title": "1. Row-Major Traversal Pointer",
          "level": "intermediate",
          "learningObjective": "Track row index `r` and column index `c` during nested matrix traversal.",
          "javaSource": "public class TraverseDemo {\n    public static void main(String[] args) {\n        int[][] grid = {{10, 20}, {30, 40}};\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[r].length; c++) {\n                System.out.println(grid[r][c]);\n            }\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-rc",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "var-rc",
                  "entityType": "variable",
                  "name": "Active Cursor",
                  "variableType": "Coordinates",
                  "variableValue": "[r=1, c=0]",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-g-r0",
                "type": "arrayNode",
                "position": {
                  "x": 420,
                  "y": 80
                },
                "data": {
                  "id": "arr-g-r0",
                  "entityType": "array",
                  "name": "grid[0]",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "10"
                    },
                    {
                      "index": 1,
                      "value": "20"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-g-r1",
                "type": "arrayNode",
                "position": {
                  "x": 420,
                  "y": 200
                },
                "data": {
                  "id": "arr-g-r1",
                  "entityType": "array",
                  "name": "grid[1]",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "30 (active)",
                      "isHighlighted": true
                    },
                    {
                      "index": 1,
                      "value": "40"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-curr-cell",
                "source": "var-rc",
                "target": "arr-g-r1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-curr-cell",
                  "type": "reference",
                  "label": "grid[1][0]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Nested for-loops traverse 2D arrays in row-major order: outer loop steps rows, inner loop steps columns.",
            "whyIsItUsed": "Standard approach for image processing, grid search, and pathfinding algorithms.",
            "javaSyntax": "for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[r].length; c++)",
            "howItWorks": "Inner loop evaluates `grid[r].length` dynamically to remain safe on jagged arrays.",
            "visualRepresentation": "Coordinate badge [r=1, c=0] pointing directly to active cell in row 1.",
            "realWorldExample": "Reading a page line-by-line from left to right.",
            "commonMistakes": "Hardcoding `c < grid[0].length` on jagged arrays causing index errors.",
            "challenge": "Implement column-major traversal instead of row-major."
          }
        }
      ]
    },
    {
      "id": "18.7-matrix-ops",
      "code": "18.7",
      "title": "Matrix Operations (Addition & Transpose)",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.7-s1",
          "title": "1. 2x2 Matrix Addition",
          "level": "intermediate",
          "learningObjective": "Perform elementwise matrix addition `C[i][j] = A[i][j] + B[i][j]`.",
          "javaSource": "public class MatrixAdd {\n    public static void main(String[] args) {\n        int[][] a = {{1, 2}, {3, 4}};\n        int[][] b = {{5, 6}, {7, 8}};\n        int[][] c = new int[2][2];\n        for (int i = 0; i < 2; i++)\n            for (int j = 0; j < 2; j++)\n                c[i][j] = a[i][j] + b[i][j];\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-mat-a",
                "type": "arrayNode",
                "position": {
                  "x": 100,
                  "y": 120
                },
                "data": {
                  "id": "arr-mat-a",
                  "entityType": "array",
                  "name": "Matrix A (Row 0)",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-mat-b",
                "type": "arrayNode",
                "position": {
                  "x": 420,
                  "y": 120
                },
                "data": {
                  "id": "arr-mat-b",
                  "entityType": "array",
                  "name": "Matrix B (Row 0)",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "5"
                    },
                    {
                      "index": 1,
                      "value": "6"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-mat-c",
                "type": "arrayNode",
                "position": {
                  "x": 740,
                  "y": 120
                },
                "data": {
                  "id": "arr-mat-c",
                  "entityType": "array",
                  "name": "Result C (Row 0)",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "6 (1+5)"
                    },
                    {
                      "index": 1,
                      "value": "8 (2+6)"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-op-add",
                "source": "arr-mat-a",
                "target": "arr-mat-c",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-op-add",
                  "type": "data-flow",
                  "label": "A + B -> C",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Matrix addition adds corresponding elements from two identically dimensioned matrices into a new matrix.",
            "whyIsItUsed": "Fundamental mathematical primitive in linear algebra and 3D graphics.",
            "javaSyntax": "c[i][j] = a[i][j] + b[i][j];",
            "howItWorks": "Two nested loops iterate every cell index, summing inputs and writing to result array.",
            "visualRepresentation": "Three side-by-side matrices showing addition flow.",
            "realWorldExample": "Combining two monthly expense spreadsheets.",
            "commonMistakes": "Adding matrices with mismatched row/col dimensions.",
            "challenge": "Implement matrix transpose `T[j][i] = A[i][j]`."
          }
        }
      ]
    },
    {
      "id": "18.8-ref-structure",
      "code": "18.8",
      "title": "Multidimensional Reference Structure",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.8-s1",
          "title": "1. Multi-Hop Pointer Dereferencing",
          "level": "advanced",
          "learningObjective": "Trace the exact pointer path from stack reference -> outer array -> row array -> cell.",
          "javaSource": "public class MultiRefDemo {\n    public static void main(String[] args) {\n        int[][] grid = new int[2][2];\n        // Stack holds grid (pointer to outer array)\n        // Outer array holds 2 pointers (to row 0 and row 1)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-grid-ref",
                "type": "variableNode",
                "position": {
                  "x": 80,
                  "y": 140
                },
                "data": {
                  "id": "var-grid-ref",
                  "entityType": "variable",
                  "name": "grid (Stack)",
                  "variableType": "int[][]",
                  "referenceTargetId": "arr-outer-ptrs",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-outer-ptrs",
                "type": "arrayNode",
                "position": {
                  "x": 360,
                  "y": 120
                },
                "data": {
                  "id": "arr-outer-ptrs",
                  "entityType": "array",
                  "name": "Outer Array @0xOUTER",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@0xROW0"
                    },
                    {
                      "index": 1,
                      "value": "ref@0xROW1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-row0-leaf",
                "type": "arrayNode",
                "position": {
                  "x": 700,
                  "y": 60
                },
                "data": {
                  "id": "arr-row0-leaf",
                  "entityType": "array",
                  "name": "Row 0 @0xROW0",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-row1-leaf",
                "type": "arrayNode",
                "position": {
                  "x": 700,
                  "y": 200
                },
                "data": {
                  "id": "arr-row1-leaf",
                  "entityType": "array",
                  "name": "Row 1 @0xROW1",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "0"
                    },
                    {
                      "index": 1,
                      "value": "0"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-s-to-outer",
                "source": "var-grid-ref",
                "target": "arr-outer-ptrs",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s-to-outer",
                  "type": "reference",
                  "label": "points to 0xOUTER",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-o-to-r0",
                "source": "arr-outer-ptrs",
                "target": "arr-row0-leaf",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-o-to-r0",
                  "type": "reference",
                  "label": "[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-o-to-r1",
                "source": "arr-outer-ptrs",
                "target": "arr-row1-leaf",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-o-to-r1",
                  "type": "reference",
                  "label": "[1]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java does not have true multi-dimensional arrays in memory; it implements arrays of arrays.",
            "whyIsItUsed": "Provides complete flexibility for ragged shapes, row swapping, and row sharing.",
            "javaSyntax": "int val = grid[r][c];",
            "howItWorks": "Two-step bytecode lookup: `aaload` reads row pointer; `iaload` reads integer from row.",
            "visualRepresentation": "Multi-level reference hierarchy graph.",
            "realWorldExample": "A table of contents pointing to chapters, where chapters point to pages.",
            "commonMistakes": "Thinking array cells are placed consecutively in a single cache line.",
            "challenge": "Swap rows using `int[] temp = grid[0]; grid[0] = grid[1]; grid[1] = temp;`."
          }
        }
      ]
    },
    {
      "id": "18.9-irregular-rows",
      "code": "18.9",
      "title": "Irregular & Replaced Rows",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.9-s1",
          "title": "1. Hot-Swapping a Row Array Instance",
          "level": "advanced",
          "learningObjective": "Observe replacing an entire row by assigning a new array reference to `matrix[0]`.",
          "javaSource": "public class RowSwap {\n    public static void main(String[] args) {\n        int[][] m = {{1, 2}, {3, 4}};\n        m[0] = new int[]{99, 98, 97}; // Replaced row 0 with longer array!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-m-root",
                "type": "arrayNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "arr-m-root",
                  "entityType": "array",
                  "name": "m (int[2][])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@NewRow0"
                    },
                    {
                      "index": 1,
                      "value": "ref@Row1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-new-r0",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 60
                },
                "data": {
                  "id": "arr-new-r0",
                  "entityType": "array",
                  "name": "New Row 0 (int[3])",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "99"
                    },
                    {
                      "index": 1,
                      "value": "98"
                    },
                    {
                      "index": 2,
                      "value": "97"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-old-r0",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 240
                },
                "data": {
                  "id": "arr-old-r0",
                  "entityType": "array",
                  "name": "Old Row 0 (int[2]) [ORPHAN]",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "1"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    }
                  ],
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-m-new-r0",
                "source": "arr-m-root",
                "target": "arr-new-r0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-m-new-r0",
                  "type": "reference",
                  "label": "m[0] reassigned",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Assigning `matrix[0] = newArray` changes where the outer array points; old row becomes eligible for GC.",
            "whyIsItUsed": "Enables dynamic resizing or replacing of entire data blocks without copying all matrix data.",
            "javaSyntax": "m[0] = new int[]{99, 98, 97};",
            "howItWorks": "Outer array slot 0 is overwritten with new heap address; old row loses incoming reference.",
            "visualRepresentation": "Active reference pointer to newly allocated row; disconnected ghosted old row below.",
            "realWorldExample": "Swapping a damaged train car with a new one.",
            "commonMistakes": "Assuming row sizes must remain equal to their initial configuration.",
            "challenge": "Inspect how Garbage Collector reclaims the discarded old row."
          }
        }
      ]
    },
    {
      "id": "18.10-multidim-copy",
      "code": "18.10",
      "title": "Multidimensional Array Copying (Shallow vs Deep)",
      "moduleId": "multi-arrays",
      "scenarios": [
        {
          "id": "18.10-s1",
          "title": "1. Shallow Clone vs Deep Independent Clone",
          "level": "advanced",
          "learningObjective": "Demonstrate that `matrix.clone()` is shallow, sharing row arrays.",
          "javaSource": "public class CloneDemo {\n    public static void main(String[] args) {\n        int[][] orig = {{1, 2}, {3, 4}};\n        int[][] shallow = orig.clone(); // Copies outer array only!\n        shallow[0][0] = 99;\n        System.out.println(orig[0][0]); // 99 (Row was shared!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-orig-root",
                "type": "arrayNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "arr-orig-root",
                  "entityType": "array",
                  "name": "orig (int[2][])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@SharedR0"
                    },
                    {
                      "index": 1,
                      "value": "ref@SharedR1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-shal-root",
                "type": "arrayNode",
                "position": {
                  "x": 100,
                  "y": 240
                },
                "data": {
                  "id": "arr-shal-root",
                  "entityType": "array",
                  "name": "shallow (clone)",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "ref@SharedR0"
                    },
                    {
                      "index": 1,
                      "value": "ref@SharedR1"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-shared-r0",
                "type": "arrayNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "arr-shared-r0",
                  "entityType": "array",
                  "name": "Shared Row 0 (int[2])",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "99 (mutated)"
                    },
                    {
                      "index": 1,
                      "value": "2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-o-r0",
                "source": "arr-orig-root",
                "target": "arr-shared-r0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-o-r0",
                  "type": "reference",
                  "label": "orig[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-s-r0",
                "source": "arr-shal-root",
                "target": "arr-shared-r0",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s-r0",
                  "type": "reference",
                  "label": "shallow[0]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`clone()` on a multidimensional array only duplicates the outer array of references; row arrays are shared.",
            "whyIsItUsed": "A classic trap: mutating elements in the cloned array unexpectedly alters the original matrix.",
            "javaSyntax": "int[][] shallow = orig.clone();",
            "howItWorks": "Outer reference array is duplicated; pointers inside it still reference the exact same row objects.",
            "visualRepresentation": "Two outer array cards both pointing to the same shared row array card.",
            "realWorldExample": "Copying a binder index without photocopying the chapters inside.",
            "commonMistakes": "Assuming `clone()` deeply copies multidimensional arrays.",
            "challenge": "Write a deep-copy loop that clones each individual row array."
          }
        }
      ]
    }
  ],
  "string-pool": [
    {
      "id": "19.1-string-literals",
      "code": "19.1",
      "title": "String Literals & Pool Sharing",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.1-s1",
          "title": "1. Canonical String Pool Sharing",
          "level": "beginner",
          "learningObjective": "Observe that identical String literals share a single interned instance.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String a = \"Java\";\n        String b = \"Java\";\n        boolean same = (a == b); // true (Identical pool reference!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-str-a",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 80
                },
                "data": {
                  "id": "var-str-a",
                  "entityType": "variable",
                  "name": "a (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "pool-str-java",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-str-b",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 240
                },
                "data": {
                  "id": "var-str-b",
                  "entityType": "variable",
                  "name": "b (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "pool-str-java",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pool-str-java",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 160
                },
                "data": {
                  "id": "pool-str-java",
                  "entityType": "object",
                  "className": "String [String Intern Pool]",
                  "simulatorAddress": "0xPOOL_JAVA",
                  "instanceFieldValues": {
                    "value": "\"Java\"",
                    "hash": "2301506"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-str-a",
                "source": "var-str-a",
                "target": "pool-str-java",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-str-a",
                  "type": "string-intern",
                  "label": "points to pooled \"Java\"",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-str-b",
                "source": "var-str-b",
                "target": "pool-str-java",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-str-b",
                  "type": "string-intern",
                  "label": "points to pooled \"Java\"",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "String literals are deduplicated by the HotSpot JVM into a native String Intern Pool.",
            "whyIsItUsed": "Conserves memory by ensuring duplicate string constants share a single heap representation.",
            "javaSyntax": "String a = \"Java\"; String b = \"Java\";",
            "howItWorks": "JVM bytecode `ldc #2` loads the interned string address from the runtime constant pool.",
            "visualRepresentation": "Two stack variables converging with purple arrows on a single String Pool card.",
            "realWorldExample": "Two people bookmarking the exact same page in a public library encyclopedia.",
            "commonMistakes": "Assuming `a == b` is always guaranteed for strings constructed dynamically at runtime.",
            "challenge": "Declare a third variable `String c = \"Java\"` and observe instant pool convergence."
          }
        }
      ]
    },
    {
      "id": "19.2-string-ctor",
      "code": "19.2",
      "title": "String Constructor (new String)",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.2-s1",
          "title": "1. Explicit Heap Allocation Bypassing Shared Identity",
          "level": "intermediate",
          "learningObjective": "Differentiate `new String(\"Java\")` allocating a distinct heap object from the pooled literal.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\"); // Distinct heap object\n        String b = \"Java\";             // Intern pool entry\n        boolean same = (a == b);       // false (different heap memory!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-ns-a",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 100
                },
                "data": {
                  "id": "var-ns-a",
                  "entityType": "variable",
                  "name": "a (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "obj-heap-str",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-lit-b",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 260
                },
                "data": {
                  "id": "var-lit-b",
                  "entityType": "variable",
                  "name": "b (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "obj-pool-lit",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-heap-str",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 100
                },
                "data": {
                  "id": "obj-heap-str",
                  "entityType": "object",
                  "className": "String [General Heap]",
                  "simulatorAddress": "0xHEAP_STR_01",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-pool-lit",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 260
                },
                "data": {
                  "id": "obj-pool-lit",
                  "entityType": "object",
                  "className": "String [Intern Pool]",
                  "simulatorAddress": "0xPOOL_JAVA",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-to-heap",
                "source": "var-ns-a",
                "target": "obj-heap-str",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-to-heap",
                  "type": "reference",
                  "label": "points to General Heap 0xHEAP_STR_01",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-to-pool",
                "source": "var-lit-b",
                "target": "obj-pool-lit",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-to-pool",
                  "type": "string-intern",
                  "label": "points to Intern Pool 0xPOOL_JAVA",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`new String(...)` explicitly forces allocation of a new, distinct String object on the general heap.",
            "whyIsItUsed": "Rarely needed; using literals is almost always preferred to avoid wasteful duplicate allocations.",
            "javaSyntax": "String a = new String(\"Java\");",
            "howItWorks": "JVM allocates memory on Heap, copies character array, and returns new address.",
            "visualRepresentation": "Two separate String cards with distinct memory addresses: General Heap vs Intern Pool.",
            "realWorldExample": "Buying a personal copy of a book that already exists in the town library.",
            "commonMistakes": "Using `new String(\"literal\")` unnecessarily in production code.",
            "challenge": "Call `a.intern()` and observe it return the pool address `0xPOOL_JAVA`."
          }
        }
      ]
    },
    {
      "id": "19.3-string-immutability",
      "code": "19.3",
      "title": "String Immutability & Reallocation",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.3-s1",
          "title": "1. Concatenation Creates New Instance",
          "level": "beginner",
          "learningObjective": "Verify that modifying a String never changes the original object; it allocates a brand new String.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String text = \"Hello\";\n        text = text + \" Java\"; // Creates new String \"Hello Java\"\n        // Original \"Hello\" remains completely unchanged\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-txt",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "var-txt",
                  "entityType": "variable",
                  "name": "text",
                  "variableType": "String",
                  "referenceTargetId": "obj-str-new",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-str-orig",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 60
                },
                "data": {
                  "id": "obj-str-orig",
                  "entityType": "object",
                  "className": "String @0xSTR_ORIG",
                  "simulatorAddress": "0xSTR_ORIG",
                  "instanceFieldValues": {
                    "value": "\"Hello\" (unchanged)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-str-new",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 220
                },
                "data": {
                  "id": "obj-str-new",
                  "entityType": "object",
                  "className": "String @0xSTR_NEW",
                  "simulatorAddress": "0xSTR_NEW",
                  "instanceFieldValues": {
                    "value": "\"Hello Java\" (newly allocated)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-txt-new",
                "source": "var-txt",
                "target": "obj-str-new",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-txt-new",
                  "type": "reference",
                  "label": "reassigned to 0xSTR_NEW",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Strings in Java are immutable; their internal byte arrays are final and cannot be modified after creation.",
            "whyIsItUsed": "Guarantees thread safety, secure caching of hash codes in HashMaps, and network security.",
            "javaSyntax": "text = text + \" Java\";",
            "howItWorks": "Concatenation evaluates operands, allocates fresh memory, and reassigns the reference variable.",
            "visualRepresentation": "Original string card preserved unchanged; variable reference redirected to new card.",
            "realWorldExample": "Carving an inscription in stone: updating text requires carving a brand new stone tablet.",
            "commonMistakes": "Using repeated string concatenation `+=` inside large loops (use StringBuilder instead).",
            "challenge": "Measure loop allocations when concatenating 1,000 strings."
          }
        }
      ]
    },
    {
      "id": "19.4-interning",
      "code": "19.4",
      "title": "Manual String Interning (intern())",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.4-s1",
          "title": "1. Resolving Canonical Reference with intern()",
          "level": "intermediate",
          "learningObjective": "Observe `intern()` searching the intern pool and returning the canonical reference.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\"); // Heap instance\n        String b = a.intern();         // Canonical pool instance\n        String c = \"Java\";             // Pool literal\n        boolean match = (b == c);      // true!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-in-a",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "var-in-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "String",
                  "referenceTargetId": "obj-heap-a",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-in-b",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 200
                },
                "data": {
                  "id": "var-in-b",
                  "entityType": "variable",
                  "name": "b (intern)",
                  "variableType": "String",
                  "referenceTargetId": "pool-canon",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-in-c",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 320
                },
                "data": {
                  "id": "var-in-c",
                  "entityType": "variable",
                  "name": "c (literal)",
                  "variableType": "String",
                  "referenceTargetId": "pool-canon",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-heap-a",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 80
                },
                "data": {
                  "id": "obj-heap-a",
                  "entityType": "object",
                  "className": "String [General Heap]",
                  "simulatorAddress": "0xHEAP_A",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pool-canon",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 260
                },
                "data": {
                  "id": "pool-canon",
                  "entityType": "object",
                  "className": "String [Canonical Pool Entry]",
                  "simulatorAddress": "0xPOOL_JAVA",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-to-h",
                "source": "var-in-a",
                "target": "obj-heap-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-to-h",
                  "type": "reference",
                  "label": "points to 0xHEAP_A",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-to-p",
                "source": "var-in-b",
                "target": "pool-canon",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-to-p",
                  "type": "string-intern",
                  "label": "points to 0xPOOL_JAVA",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-c-to-p",
                "source": "var-in-c",
                "target": "pool-canon",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c-to-p",
                  "type": "string-intern",
                  "label": "points to 0xPOOL_JAVA",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`intern()` queries the JVM string table: if present, returns the pooled instance; if absent, adds it and returns.",
            "whyIsItUsed": "Enables fast identity comparisons `==` for parsed strings in compilers and high-throughput systems.",
            "javaSyntax": "String b = a.intern();",
            "howItWorks": "JVM consults internal C++ StringTable hashtable and returns the pooled oop reference.",
            "visualRepresentation": "Variables b and c converging on single purple intern pool entry card.",
            "realWorldExample": "Exchanging a temporary paper ticket for an official permanent membership badge.",
            "commonMistakes": "Over-interning dynamically generated user inputs, which strains JVM StringTable memory.",
            "challenge": "Verify that `(a == b)` evaluates to false while `(b == c)` evaluates to true."
          }
        }
      ]
    },
    {
      "id": "19.5-equals-vs-identity",
      "code": "19.5",
      "title": "== vs equals() in Strings",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.5-s1",
          "title": "1. Reference Identity vs Content Comparison",
          "level": "beginner",
          "learningObjective": "Distinguish between memory address comparison (`==`) and character sequence equality (`equals()`).",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Java\");\n        String b = new String(\"Java\");\n        boolean refEq = (a == b);         // false (distinct heap objects)\n        boolean valEq = a.equals(b);      // true (identical characters)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-s-a",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 80
                },
                "data": {
                  "id": "obj-s-a",
                  "entityType": "object",
                  "className": "String @0x10A",
                  "simulatorAddress": "0x10A",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-s-b",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "obj-s-b",
                  "entityType": "object",
                  "className": "String @0x10B",
                  "simulatorAddress": "0x10B",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-res-ref",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 100
                },
                "data": {
                  "id": "var-res-ref",
                  "entityType": "variable",
                  "name": "a == b",
                  "variableType": "boolean",
                  "variableValue": "false (0x10A != 0x10B)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-res-val",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 220
                },
                "data": {
                  "id": "var-res-val",
                  "entityType": "variable",
                  "name": "a.equals(b)",
                  "variableType": "boolean",
                  "variableValue": "true (content matches)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "`==` compares 64-bit reference memory addresses; `equals()` inspects underlying byte-by-byte characters.",
            "whyIsItUsed": "One of the most frequent beginner bugs in Java: comparing strings with `==`.",
            "javaSyntax": "a.equals(b)",
            "howItWorks": "`equals()` first checks reference identity `this == obj`; if false, checks length and array bytes.",
            "visualRepresentation": "Comparison inspector showing false for address check and true for character equality.",
            "realWorldExample": "Comparing two identical keys to two separate rooms vs testing if a key opens a lock.",
            "commonMistakes": "Using `==` to validate user password or authentication token strings.",
            "challenge": "Use `equalsIgnoreCase(\"JAVA\")` to compare case-insensitively."
          }
        }
      ]
    },
    {
      "id": "19.6-constant-folding",
      "code": "19.6",
      "title": "Compile-Time Constant Concatenation",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.6-s1",
          "title": "1. Compiler Constant Folding Optimization",
          "level": "intermediate",
          "learningObjective": "Understand how the Java compiler evaluates `\"Ja\" + \"va\"` at compile time into `\"Java\"`.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String a = \"Ja\" + \"va\"; // Folded by javac into \"Java\"\n        String b = \"Java\";\n        boolean same = (a == b); // true (Both refer to same interned literal!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-cf-a",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 100
                },
                "data": {
                  "id": "var-cf-a",
                  "entityType": "variable",
                  "name": "a = \"Ja\" + \"va\"",
                  "variableType": "String",
                  "referenceTargetId": "pool-cf-java",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "var-cf-b",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 240
                },
                "data": {
                  "id": "var-cf-b",
                  "entityType": "variable",
                  "name": "b = \"Java\"",
                  "variableType": "String",
                  "referenceTargetId": "pool-cf-java",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "pool-cf-java",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 170
                },
                "data": {
                  "id": "pool-cf-java",
                  "entityType": "object",
                  "className": "String [Constant Folded]",
                  "simulatorAddress": "0xPOOL_JAVA",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-cf-a",
                "source": "var-cf-a",
                "target": "pool-cf-java",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cf-a",
                  "type": "string-intern",
                  "label": "folded by javac to pool",
                  "provenance": "STATIC ANALYSIS"
                }
              },
              {
                "id": "rel-cf-b",
                "source": "var-cf-b",
                "target": "pool-cf-java",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cf-b",
                  "type": "string-intern",
                  "label": "literal pool entry",
                  "provenance": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The Java compiler (javac) evaluates literal expressions at compile-time and emits a single pooled constant.",
            "whyIsItUsed": "Zero runtime computation or allocation overhead for static concatenation.",
            "javaSyntax": "String a = \"Ja\" + \"va\";",
            "howItWorks": "Classfile bytecode contains `ldc #2 // String Java` with no runtime concatenation bytecode.",
            "visualRepresentation": "Both variables pointing directly to single pooled literal with javac optimization badge.",
            "realWorldExample": "Adding 2 + 2 on scratch paper before writing down 4 in your final exam answer.",
            "commonMistakes": "Thinking runtime evaluates `+` when all operands are compile-time constants.",
            "challenge": "Add a non-final variable operand and observe constant folding deactivate."
          }
        }
      ]
    },
    {
      "id": "19.7-runtime-concat",
      "code": "19.7",
      "title": "Runtime String Concatenation",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.7-s1",
          "title": "1. Dynamic String Construction (makeConcatWithConstants)",
          "level": "intermediate",
          "learningObjective": "Track how runtime variable concatenation produces a new heap instance outside the pool.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String prefix = \"Ja\";\n        String a = prefix + \"va\"; // Dynamic runtime concatenation\n        String b = \"Java\";        // Intern pool entry\n        boolean same = (a == b);  // false (a was constructed at runtime!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-dyn-a",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 100
                },
                "data": {
                  "id": "var-dyn-a",
                  "entityType": "variable",
                  "name": "a (prefix + \"va\")",
                  "variableType": "String",
                  "referenceTargetId": "obj-dyn-heap",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-lit-pool",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 240
                },
                "data": {
                  "id": "var-lit-pool",
                  "entityType": "variable",
                  "name": "b (\"Java\")",
                  "variableType": "String",
                  "referenceTargetId": "obj-lit-pool",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dyn-heap",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 100
                },
                "data": {
                  "id": "obj-dyn-heap",
                  "entityType": "object",
                  "className": "String [Runtime Heap Allocation]",
                  "simulatorAddress": "0xHEAP_DYN_01",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-lit-pool",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "obj-lit-pool",
                  "entityType": "object",
                  "className": "String [Intern Pool]",
                  "simulatorAddress": "0xPOOL_JAVA",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dyn-ptr",
                "source": "var-dyn-a",
                "target": "obj-dyn-heap",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dyn-ptr",
                  "type": "reference",
                  "label": "points to 0xHEAP_DYN_01",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-pool-ptr",
                "source": "var-lit-pool",
                "target": "obj-lit-pool",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pool-ptr",
                  "type": "string-intern",
                  "label": "points to 0xPOOL_JAVA",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "When concatenation involves non-constant variables, Java constructs a new String on the general heap.",
            "whyIsItUsed": "Prevents runtime string calculations from corrupting or overloading the intern pool.",
            "javaSyntax": "String a = prefix + \"va\";",
            "howItWorks": "In Java 9+, JVM uses `invokedynamic` with `StringConcatFactory` generating fast runtime bytecode.",
            "visualRepresentation": "Separate heap object for runtime concatenation vs intern pool literal card.",
            "realWorldExample": "Baking a fresh loaf of bread on demand vs picking up a pre-baked loaf from the bakery shelf.",
            "commonMistakes": "Expecting variable concatenation to automatically intern the resulting string.",
            "challenge": "Intern the result `a.intern()` and observe `(a.intern() == b)` evaluate to true."
          }
        }
      ]
    },
    {
      "id": "19.8-stringbuilder",
      "code": "19.8",
      "title": "StringBuilder Mutable Buffer",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.8-s1",
          "title": "1. In-Place Mutable Buffer Appends",
          "level": "intermediate",
          "learningObjective": "Observe `StringBuilder` mutating an internal resizable byte buffer without intermediate allocations.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Java\");\n        sb.append(\" 21\");\n        String result = sb.toString();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-sb-buffer",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "obj-sb-buffer",
                  "entityType": "object",
                  "className": "StringBuilder",
                  "simulatorAddress": "0xSB_01",
                  "instanceFieldValues": {
                    "count": "7",
                    "capacity": "16",
                    "value": "['J','a','v','a',' ','2','1']"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-final-str",
                "type": "objectNode",
                "position": {
                  "x": 580,
                  "y": 140
                },
                "data": {
                  "id": "obj-final-str",
                  "entityType": "object",
                  "className": "String (from toString())",
                  "simulatorAddress": "0xSTR_RES",
                  "instanceFieldValues": {
                    "value": "\"Java 21\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sb-to-str",
                "source": "obj-sb-buffer",
                "target": "obj-final-str",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sb-to-str",
                  "type": "data-flow",
                  "label": "sb.toString()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`StringBuilder` maintains a mutable, resizable character buffer for high-efficiency string assembly.",
            "whyIsItUsed": "Prevents generating thousands of garbage String objects during complex string manipulations.",
            "javaSyntax": "StringBuilder sb = new StringBuilder(); sb.append(\"x\");",
            "howItWorks": "Mutates internal `byte[] value` array directly; doubles capacity when full.",
            "visualRepresentation": "StringBuilder card showing internal character buffer cells and toString() conversion.",
            "realWorldExample": "A whiteboard where you can write, erase, and append text before taking a final photograph.",
            "commonMistakes": "Using immutable String concatenation inside long loops instead of StringBuilder.",
            "challenge": "Call `sb.reverse()` and observe buffer mutate in place."
          }
        }
      ]
    },
    {
      "id": "19.9-stringbuffer",
      "code": "19.9",
      "title": "StringBuffer Thread-Safe Synchronization",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.9-s1",
          "title": "1. Synchronized Methods & Thread Safety",
          "level": "advanced",
          "learningObjective": "Compare thread-safe `StringBuffer` (synchronized) against non-synchronized `StringBuilder`.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        StringBuffer sbf = new StringBuffer();\n        sbf.append(\"ThreadSafe\"); // Synchronized method call\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-sbf",
                "type": "objectNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "obj-sbf",
                  "entityType": "object",
                  "className": "StringBuffer [Thread-Safe]",
                  "simulatorAddress": "0xSBF_01",
                  "instanceFieldValues": {
                    "[Monitor]": "Synchronized on this",
                    "count": "10",
                    "value": "\"ThreadSafe\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "`StringBuffer` is identical to `StringBuilder` but every mutating method is `synchronized`.",
            "whyIsItUsed": "Allows safe string building across concurrent multi-threaded execution environments.",
            "javaSyntax": "StringBuffer sbf = new StringBuffer();",
            "howItWorks": "Every append operation acquires the intrinsic object monitor lock before writing bytes.",
            "visualRepresentation": "Card with lock icon detailing synchronized monitor and internal buffer.",
            "realWorldExample": "A notebook that only one person is permitted to hold and write in at any moment.",
            "commonMistakes": "Using StringBuffer in single-threaded code where StringBuilder has zero synchronization overhead.",
            "challenge": "Compare execution benchmarks between StringBuilder and StringBuffer."
          }
        }
      ]
    },
    {
      "id": "19.10-pool-overview",
      "code": "19.10",
      "title": "Unified String Memory Comparison",
      "moduleId": "string-pool",
      "scenarios": [
        {
          "id": "19.10-s1",
          "title": "1. Tri-Region Unified View: Stack, Heap & Intern Pool",
          "level": "advanced",
          "learningObjective": "Examine the complete relationship between Stack References, General Heap, and Intern Pool.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Data\";              // Intern Pool\n        String s2 = new String(\"Data\");   // Heap Object\n        String s3 = s2.intern();          // Returns Pool pointer\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-u-s1",
                "type": "variableNode",
                "position": {
                  "x": 80,
                  "y": 80
                },
                "data": {
                  "id": "var-u-s1",
                  "entityType": "variable",
                  "name": "s1 (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "pool-unified",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-u-s2",
                "type": "variableNode",
                "position": {
                  "x": 80,
                  "y": 200
                },
                "data": {
                  "id": "var-u-s2",
                  "entityType": "variable",
                  "name": "s2 (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "heap-unified",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-u-s3",
                "type": "variableNode",
                "position": {
                  "x": 80,
                  "y": 320
                },
                "data": {
                  "id": "var-u-s3",
                  "entityType": "variable",
                  "name": "s3 (Stack)",
                  "variableType": "String",
                  "referenceTargetId": "pool-unified",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "heap-unified",
                "type": "objectNode",
                "position": {
                  "x": 440,
                  "y": 140
                },
                "data": {
                  "id": "heap-unified",
                  "entityType": "object",
                  "className": "String @0xHEAP_S2",
                  "simulatorAddress": "0xHEAP_S2",
                  "instanceFieldValues": {
                    "value": "\"Data\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pool-unified",
                "type": "objectNode",
                "position": {
                  "x": 760,
                  "y": 200
                },
                "data": {
                  "id": "pool-unified",
                  "entityType": "object",
                  "className": "String Intern Pool @0xPOOL_DATA",
                  "simulatorAddress": "0xPOOL_DATA",
                  "instanceFieldValues": {
                    "value": "\"Data\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-u1",
                "source": "var-u-s1",
                "target": "pool-unified",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-u1",
                  "type": "string-intern",
                  "label": "literal pointer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-u2",
                "source": "var-u-s2",
                "target": "heap-unified",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-u2",
                  "type": "reference",
                  "label": "heap pointer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-u3",
                "source": "var-u-s3",
                "target": "pool-unified",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-u3",
                  "type": "string-intern",
                  "label": "intern() pointer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Unifies all string concepts: stack references, general heap instances, and interned literals.",
            "whyIsItUsed": "Comprehensive blueprint clarifying string memory management across the JVM.",
            "javaSyntax": "String s1 = \"Data\"; String s2 = new String(\"Data\"); String s3 = s2.intern();",
            "howItWorks": "s1 and s3 share identical address `0xPOOL_DATA`; s2 occupies distinct address `0xHEAP_S2`.",
            "visualRepresentation": "Three-column partition: Stack References -> Heap Objects -> Canonical Intern Pool.",
            "realWorldExample": "A library card index linking to physical books and community shared reference volumes.",
            "commonMistakes": "Confusing content equality with reference pointer identity.",
            "challenge": "Verify that `(s1 == s3)` is true while `(s1 == s2)` is false."
          }
        }
      ]
    }
  ],
  "wrapper-classes": [
    {
      "id": "20.1-mapping",
      "code": "20.1",
      "title": "Primitive & Wrapper Class Mapping",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.1-s1",
          "title": "1. The 8 Java Wrapper Classes",
          "level": "beginner",
          "learningObjective": "Inspect the eight primitive types and their corresponding java.lang wrapper classes.",
          "javaSource": "public class WrapperMap {\n    // byte -> Byte, short -> Short, int -> Integer, long -> Long\n    // float -> Float, double -> Double, char -> Character, boolean -> Boolean\n    int primInt = 42;\n    Integer wrapInt = Integer.valueOf(42);\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-prim-val",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "var-prim-val",
                  "entityType": "variable",
                  "name": "primInt",
                  "variableType": "int (primitive)",
                  "variableValue": "42",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-wrap-val",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-wrap-val",
                  "entityType": "object",
                  "className": "java.lang.Integer",
                  "simulatorAddress": "0xINT_42",
                  "instanceFieldValues": {
                    "value": "42 (private final int)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-wrap-map",
                "source": "var-prim-val",
                "target": "obj-wrap-val",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-wrap-map",
                  "type": "boxing",
                  "label": "Integer.valueOf(42)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Wrapper classes encapsulate primitive values into full Java heap objects.",
            "whyIsItUsed": "Allows primitive types to participate in object-oriented hierarchies and generic collections.",
            "javaSyntax": "Integer wrapInt = Integer.valueOf(42);",
            "howItWorks": "Allocates heap object containing a private final primitive field payload.",
            "visualRepresentation": "Primitive card linking via orange conversion arrow to heap wrapper object.",
            "realWorldExample": "Putting a physical key into a labeled key envelope.",
            "commonMistakes": "Expecting primitive types to have methods (primitives have no methods; wrappers do).",
            "challenge": "Explore wrapper class constants like `Integer.MAX_VALUE`."
          }
        }
      ]
    },
    {
      "id": "20.2-explicit-boxing",
      "code": "20.2",
      "title": "Explicit Boxing (valueOf())",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.2-s1",
          "title": "1. Integer.valueOf() Object Creation",
          "level": "beginner",
          "learningObjective": "Observe explicit primitive-to-object encapsulation via `valueOf()`.",
          "javaSource": "public class BoxingDemo {\n    public static void main(String[] args) {\n        int a = 10;\n        Integer b = Integer.valueOf(a); // Explicit boxing\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-box-src",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "var-box-src",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "int",
                  "variableValue": "10",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-box-tgt",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-box-tgt",
                  "entityType": "object",
                  "className": "Integer",
                  "simulatorAddress": "0xBOX_10",
                  "instanceFieldValues": {
                    "value": "10"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-exp-box",
                "source": "var-box-src",
                "target": "obj-box-tgt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-exp-box",
                  "type": "boxing",
                  "label": "Integer.valueOf(10)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Explicit boxing converts a primitive value into a wrapper object using factory method `valueOf()`.",
            "whyIsItUsed": "Prefers cached instances over `new Integer(...)` (which is deprecated since Java 9).",
            "javaSyntax": "Integer b = Integer.valueOf(a);",
            "howItWorks": "Checks IntegerCache; returns cached instance or allocates new object.",
            "visualRepresentation": "Directional orange boxing arrow connecting primitive value to wrapper object.",
            "realWorldExample": "Boxing up a watch into a gift box.",
            "commonMistakes": "Using deprecated `new Integer(a)` constructor.",
            "challenge": "Box a double value using `Double.valueOf(3.14)`."
          }
        }
      ]
    },
    {
      "id": "20.3-explicit-unboxing",
      "code": "20.3",
      "title": "Explicit Unboxing (intValue())",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.3-s1",
          "title": "1. Extracting Primitive Payload",
          "level": "beginner",
          "learningObjective": "Track extracting primitive bits from a wrapper object using accessor methods.",
          "javaSource": "public class UnboxingDemo {\n    public static void main(String[] args) {\n        Integer a = Integer.valueOf(10);\n        int b = a.intValue(); // Explicit unboxing\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-unbox-src",
                "type": "objectNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "obj-unbox-src",
                  "entityType": "object",
                  "className": "Integer",
                  "simulatorAddress": "0xUNBOX_10",
                  "instanceFieldValues": {
                    "value": "10"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-unbox-tgt",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "var-unbox-tgt",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "int",
                  "variableValue": "10 (primitive)",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-exp-unbox",
                "source": "obj-unbox-src",
                "target": "var-unbox-tgt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-exp-unbox",
                  "type": "unboxing",
                  "label": "a.intValue()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Unboxing extracts the raw primitive value stored inside the wrapper object's private field.",
            "whyIsItUsed": "Allows wrapper values to be used in arithmetic operations.",
            "javaSyntax": "int b = a.intValue();",
            "howItWorks": "Invokes instance method reading internal `value` field and returning primitive bits.",
            "visualRepresentation": "Unboxing arrow flowing from heap object card to primitive stack slot.",
            "realWorldExample": "Opening a gift box to retrieve the watch inside.",
            "commonMistakes": "Unboxing a null wrapper reference causing NullPointerException.",
            "challenge": "Call `doubleValue()` on an Integer to unbox with conversion."
          }
        }
      ]
    },
    {
      "id": "20.4-autoboxing",
      "code": "20.4",
      "title": "Compiler Autoboxing",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.4-s1",
          "title": "1. Implicit Compiler Boxing Desugaring",
          "level": "intermediate",
          "learningObjective": "Observe how compiler automatically transforms `Integer val = 100` into `Integer.valueOf(100)`.",
          "javaSource": "public class AutoBoxingDemo {\n    public static void main(String[] args) {\n        Integer val = 100; // Desugared to Integer.valueOf(100)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-lit-100",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "var-lit-100",
                  "entityType": "variable",
                  "name": "literal 100",
                  "variableType": "int",
                  "variableValue": "100",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "obj-auto-wrap",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-auto-wrap",
                  "entityType": "object",
                  "className": "Integer [Autoboxed]",
                  "simulatorAddress": "0xAUTO_100",
                  "instanceFieldValues": {
                    "value": "100"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-autobox",
                "source": "var-lit-100",
                "target": "obj-auto-wrap",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-autobox",
                  "type": "boxing",
                  "label": "javac: Integer.valueOf(100)",
                  "provenance": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Autoboxing is automatic compile-time syntactic sugar converting primitives to wrappers.",
            "whyIsItUsed": "Eliminates verbose boilerplate code across collections and generic APIs.",
            "javaSyntax": "Integer val = 100;",
            "howItWorks": "Javac injects `invokestatic Integer.valueOf(I)` into the compiled bytecode.",
            "visualRepresentation": "Dashed compiler transformation arrow creating heap wrapper object.",
            "realWorldExample": "An automated packaging machine wrapping items on an assembly line.",
            "commonMistakes": "Believing autoboxing is free (it incurs heap allocation and GC overhead if not cached).",
            "challenge": "Autobox a `boolean` primitive."
          }
        }
      ]
    },
    {
      "id": "20.5-auto-unboxing",
      "code": "20.5",
      "title": "Compiler Auto-Unboxing",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.5-s1",
          "title": "1. Implicit Primitive Extraction in Expressions",
          "level": "intermediate",
          "learningObjective": "Understand implicit invocation of `intValue()` during assignment or arithmetic.",
          "javaSource": "public class AutoUnboxingDemo {\n    public static void main(String[] args) {\n        Integer val = 100;\n        int num = val;       // Desugared to val.intValue()\n        int sum = val + 25;  // Auto-unboxed before addition\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-au-wrap",
                "type": "objectNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "obj-au-wrap",
                  "entityType": "object",
                  "className": "Integer",
                  "simulatorAddress": "0xWRAP_100",
                  "instanceFieldValues": {
                    "value": "100"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-au-num",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "var-au-num",
                  "entityType": "variable",
                  "name": "num (int)",
                  "variableType": "int",
                  "variableValue": "100",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-autounbox",
                "source": "obj-au-wrap",
                "target": "var-au-num",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-autounbox",
                  "type": "unboxing",
                  "label": "javac: val.intValue()",
                  "provenance": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Auto-unboxing automatically extracts the primitive value when a wrapper is used in numeric expressions.",
            "whyIsItUsed": "Enables seamless arithmetic operations on wrapper instances.",
            "javaSyntax": "int num = val; int sum = val + 25;",
            "howItWorks": "Javac injects `invokevirtual Integer.intValue()` before performing the arithmetic opcode.",
            "visualRepresentation": "Arrow extracting integer primitive from heap wrapper card into stack slot.",
            "realWorldExample": "An automated unwrapping machine feeding ingredients into a mixer.",
            "commonMistakes": "Performing auto-unboxing on a null reference.",
            "challenge": "Write an arithmetic expression with multiple wrapper operands."
          }
        }
      ]
    },
    {
      "id": "20.6-wrapper-immutability",
      "code": "20.6",
      "title": "Wrapper Object Immutability",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.6-s1",
          "title": "1. Wrapper Value Field is Final",
          "level": "intermediate",
          "learningObjective": "Verify that all Java primitive wrappers are immutable once instantiated.",
          "javaSource": "public class ImmutabilityDemo {\n    public static void main(String[] args) {\n        Integer val = 50;\n        val++; // Desugared to val = Integer.valueOf(val.intValue() + 1)\n        // Original 50 object is NOT mutated; new Integer(51) allocated!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-val-ref",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "var-val-ref",
                  "entityType": "variable",
                  "name": "val (Stack)",
                  "variableType": "Integer",
                  "referenceTargetId": "obj-wrap-51",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-wrap-50",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 60
                },
                "data": {
                  "id": "obj-wrap-50",
                  "entityType": "object",
                  "className": "Integer @0xINT_50",
                  "simulatorAddress": "0xINT_50",
                  "instanceFieldValues": {
                    "value": "50 (immutable)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-wrap-51",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 220
                },
                "data": {
                  "id": "obj-wrap-51",
                  "entityType": "object",
                  "className": "Integer @0xINT_51",
                  "simulatorAddress": "0xINT_51",
                  "instanceFieldValues": {
                    "value": "51 (newly allocated)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-inc-ptr",
                "source": "var-val-ref",
                "target": "obj-wrap-51",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-inc-ptr",
                  "type": "reference",
                  "label": "reassigned to 0xINT_51",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "All eight primitive wrapper classes in Java are immutable; their internal primitive fields are marked `private final`.",
            "whyIsItUsed": "Guarantees safe sharing across threads and cache reuse without risk of state corruption.",
            "javaSyntax": "val++;",
            "howItWorks": "Increments require unboxing, performing integer addition, and boxing a brand new wrapper object.",
            "visualRepresentation": "Variable reference arrow redirected to a new wrapper card; old card remains unchanged.",
            "realWorldExample": "A numbered billiard ball: you cannot change the number painted on it; you must pick up another ball.",
            "commonMistakes": "Using `Integer` as an accumulator inside high-frequency counting loops.",
            "challenge": "Use `AtomicInteger` if mutable atomic accumulation is needed."
          }
        }
      ]
    },
    {
      "id": "20.7-wrapper-caching",
      "code": "20.7",
      "title": "IntegerCache & Object Reuse ([-128, 127])",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.7-s1",
          "title": "1. IntegerCache Identity Comparison Trap",
          "level": "advanced",
          "learningObjective": "Demonstrate that `IntegerCache` reuses instances in range [-128, 127], while values outside allocate distinct instances.",
          "javaSource": "public class CacheDemo {\n    public static void main(String[] args) {\n        // Within cache [-128, 127]\n        Integer a = 100;\n        Integer b = 100;\n        boolean cachedMatch = (a == b); // true (Shared from IntegerCache!)\n\n        // Outside cache\n        Integer x = 1000;\n        Integer y = 1000;\n        boolean outsideMatch = (x == y); // false (Two distinct heap objects!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a-100",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 80
                },
                "data": {
                  "id": "var-a-100",
                  "entityType": "variable",
                  "name": "a (100)",
                  "variableType": "Integer",
                  "referenceTargetId": "obj-cache-100",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-b-100",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 180
                },
                "data": {
                  "id": "var-b-100",
                  "entityType": "variable",
                  "name": "b (100)",
                  "variableType": "Integer",
                  "referenceTargetId": "obj-cache-100",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-cache-100",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 130
                },
                "data": {
                  "id": "obj-cache-100",
                  "entityType": "object",
                  "className": "Integer [IntegerCache]",
                  "simulatorAddress": "0xCACHE_100",
                  "instanceFieldValues": {
                    "value": "100 (cached)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-x-1000",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 280
                },
                "data": {
                  "id": "var-x-1000",
                  "entityType": "variable",
                  "name": "x (1000)",
                  "variableType": "Integer",
                  "referenceTargetId": "obj-heap-x",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-y-1000",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 380
                },
                "data": {
                  "id": "var-y-1000",
                  "entityType": "variable",
                  "name": "y (1000)",
                  "variableType": "Integer",
                  "referenceTargetId": "obj-heap-y",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-heap-x",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 280
                },
                "data": {
                  "id": "obj-heap-x",
                  "entityType": "object",
                  "className": "Integer @0x1000_A",
                  "simulatorAddress": "0x1000_A",
                  "instanceFieldValues": {
                    "value": "1000"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-heap-y",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 380
                },
                "data": {
                  "id": "obj-heap-y",
                  "entityType": "object",
                  "className": "Integer @0x1000_B",
                  "simulatorAddress": "0x1000_B",
                  "instanceFieldValues": {
                    "value": "1000"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-c",
                "source": "var-a-100",
                "target": "obj-cache-100",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-c",
                  "type": "reference",
                  "label": "points to 0xCACHE_100",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-c",
                "source": "var-b-100",
                "target": "obj-cache-100",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-c",
                  "type": "reference",
                  "label": "points to 0xCACHE_100",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-x-h",
                "source": "var-x-1000",
                "target": "obj-heap-x",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-x-h",
                  "type": "reference",
                  "label": "points to 0x1000_A",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-y-h",
                "source": "var-y-1000",
                "target": "obj-heap-y",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-y-h",
                  "type": "reference",
                  "label": "points to 0x1000_B",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The JVM caches Integer objects for values from -128 to 127 in `IntegerCache` to optimize memory.",
            "whyIsItUsed": "Comparing wrappers with `==` works by coincidence for small numbers, but fails silently for larger values.",
            "javaSyntax": "Integer a = 100; Integer b = 100; (a == b) is true, but for 1000 it is false!",
            "howItWorks": "HotSpot static initializer pre-allocates an array of 256 Integer objects during JVM startup.",
            "visualRepresentation": "Top pair converging on single cached object; bottom pair pointing to separate heap allocations.",
            "realWorldExample": "A post office having pre-printed postage stamps for values under $1, but printing custom stamps for larger amounts.",
            "commonMistakes": "Comparing wrapper values using `==` instead of `equals()`.",
            "challenge": "Test the upper bound of the cache with 127 vs 128."
          }
        }
      ]
    },
    {
      "id": "20.8-null-unboxing",
      "code": "20.8",
      "title": "Null Unboxing & NullPointerException",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.8-s1",
          "title": "1. Unboxing Null Reference Runtime Trap",
          "level": "intermediate",
          "learningObjective": "Observe that attempting to auto-unbox a null wrapper reference immediately throws `NullPointerException`.",
          "javaSource": "public class NullUnboxDemo {\n    public static void main(String[] args) {\n        Integer val = null;\n        // int num = val; // Throws NullPointerException: Cannot invoke \"Integer.intValue()\" because \"val\" is null\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-null-wrap",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "var-null-wrap",
                  "entityType": "variable",
                  "name": "val (Integer)",
                  "variableType": "Integer",
                  "variableValue": "null (0x0)",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-trap-ex",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "var-trap-ex",
                  "entityType": "variable",
                  "name": "Auto-Unbox Operation",
                  "variableType": "Exception",
                  "variableValue": "NullPointerException",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-null-trap",
                "source": "var-null-wrap",
                "target": "var-trap-ex",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-null-trap",
                  "type": "exception",
                  "label": "val.intValue() traps on null",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Auto-unboxing calls `.intValue()` implicitly; if the wrapper is null, the method call throws `NullPointerException`.",
            "whyIsItUsed": "One of the most insidious sources of NPEs in Java code bases.",
            "javaSyntax": "Integer val = null; int num = val;",
            "howItWorks": "JVM attempts virtual invocation `invokevirtual` on null pointer register, triggering CPU trap.",
            "visualRepresentation": "Disconnected variable marked null pointing to red NullPointerException trap node.",
            "realWorldExample": "Opening an empty box expecting a watch, but finding nothing.",
            "commonMistakes": "Assuming primitive assignments can safely accept nullable wrapper variables without null checks.",
            "challenge": "Safely guard using ternary `int num = (val != null) ? val : 0;`."
          }
        }
      ]
    },
    {
      "id": "20.9-parsing",
      "code": "20.9",
      "title": "String Parsing & Number Conversions",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.9-s1",
          "title": "1. parseInt vs valueOf & NumberFormatException",
          "level": "beginner",
          "learningObjective": "Compare parsing primitives via `parseInt` vs parsing objects via `valueOf`.",
          "javaSource": "public class ParseDemo {\n    public static void main(String[] args) {\n        int p = Integer.parseInt(\"123\");       // Returns primitive int\n        Integer w = Integer.valueOf(\"123\");     // Returns wrapper Integer\n        // int err = Integer.parseInt(\"abc\");  // Throws NumberFormatException\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-str-in",
                "type": "variableNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "var-str-in",
                  "entityType": "variable",
                  "name": "\"123\"",
                  "variableType": "String",
                  "variableValue": "\"123\"",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-res-p",
                "type": "variableNode",
                "position": {
                  "x": 480,
                  "y": 80
                },
                "data": {
                  "id": "var-res-p",
                  "entityType": "variable",
                  "name": "p (from parseInt)",
                  "variableType": "int (primitive)",
                  "variableValue": "123",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-res-w",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 220
                },
                "data": {
                  "id": "obj-res-w",
                  "entityType": "object",
                  "className": "w (from valueOf)",
                  "simulatorAddress": "0xW_123",
                  "instanceFieldValues": {
                    "value": "123"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-p-parse",
                "source": "var-str-in",
                "target": "var-res-p",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-p-parse",
                  "type": "data-flow",
                  "label": "parseInt()",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-w-valof",
                "source": "var-str-in",
                "target": "obj-res-w",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-w-valof",
                  "type": "boxing",
                  "label": "valueOf()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`parseInt()` converts String to primitive `int`; `valueOf()` converts String to wrapper `Integer`.",
            "whyIsItUsed": "Standard method for parsing HTTP query parameters, form inputs, and configuration strings.",
            "javaSyntax": "int p = Integer.parseInt(\"123\");",
            "howItWorks": "Parses characters according to radix 10; throws `NumberFormatException` if non-numeric.",
            "visualRepresentation": "Single string source fanning out to primitive result and wrapper object card.",
            "realWorldExample": "Translating a handwritten number on a sign into a numerical bank account balance.",
            "commonMistakes": "Calling parseInt on user input without try-catch handling.",
            "challenge": "Parse a hexadecimal string using `Integer.parseInt(\"FF\", 16)`."
          }
        }
      ]
    },
    {
      "id": "20.10-collections-usage",
      "code": "20.10",
      "title": "Wrappers in Generic Collections",
      "moduleId": "wrapper-classes",
      "scenarios": [
        {
          "id": "20.10-s1",
          "title": "1. Why Collections Require Reference Wrappers",
          "level": "intermediate",
          "learningObjective": "Understand why Java generics require wrapper types (`List<Integer>`) instead of primitive `List<int>`.",
          "javaSource": "import java.util.ArrayList;\nimport java.util.List;\npublic class ColWrapDemo {\n    public static void main(String[] args) {\n        // List<int> list = new ArrayList<>(); // Compile error! Primitives not allowed as type args\n        List<Integer> list = new ArrayList<>();\n        list.add(10); // Autoboxed to Integer.valueOf(10)\n        int val = list.get(0); // Auto-unboxed to 10\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-list-wrap",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "obj-list-wrap",
                  "entityType": "object",
                  "className": "ArrayList<Integer>",
                  "simulatorAddress": "0xLIST_W",
                  "instanceFieldValues": {
                    "elementData[0]": "ref@0xBOX_10"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-elem-box",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-elem-box",
                  "entityType": "object",
                  "className": "Integer @0xBOX_10",
                  "simulatorAddress": "0xBOX_10",
                  "instanceFieldValues": {
                    "value": "10"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-col-elem",
                "source": "obj-list-wrap",
                "target": "obj-elem-box",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-col-elem",
                  "type": "reference",
                  "label": "holds reference",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java generics erase to `Object`; because primitives do not inherit from `Object`, collections require wrappers.",
            "whyIsItUsed": "Underpins the entire Java Collections Framework until Project Valhalla value types arrive.",
            "javaSyntax": "List<Integer> list = new ArrayList<>();",
            "howItWorks": "ArrayList backing array is `Object[]`; autoboxing wraps primitive `10` before inserting pointer into array.",
            "visualRepresentation": "List card pointing to heap wrapper object containing integer payload.",
            "realWorldExample": "An egg carton designed exclusively to hold eggs in padded protective cups.",
            "commonMistakes": "Storing millions of numbers in `List<Integer>` causing heavy memory footprint vs primitive `int[]`.",
            "challenge": "Compare memory usage of `int[1_000_000]` vs `ArrayList<Integer>` of 1,000,000 items."
          }
        }
      ]
    }
  ],
  "collections-generics": [
    {
      "id": "21.1-overview",
      "code": "21.1",
      "title": "Collection Framework Architecture Overview",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.1-s1",
          "title": "1. Hierarchy: Iterable -> Collection -> List / Set / Queue",
          "level": "beginner",
          "learningObjective": "Inspect the root interface hierarchy of the Java Collections Framework (JCF).",
          "javaSource": "public class JCFOverview {\n    // Iterable -> Collection\n    // Collection -> List (Ordered, indexed, allows duplicates)\n    // Collection -> Set (Unique elements, no duplicates)\n    // Collection -> Queue (FIFO processing, head/tail operations)\n    // Map (Key-Value mappings, independent hierarchy!)\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-iterable",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 40
                },
                "data": {
                  "id": "cls-iterable",
                  "entityType": "class",
                  "name": "Iterable<T>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-iter",
                      "name": "iterator()",
                      "returnType": "Iterator<T>",
                      "visibility": "+",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-collection",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 160
                },
                "data": {
                  "id": "cls-collection",
                  "entityType": "class",
                  "name": "Collection<E>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-add",
                      "name": "add(E)",
                      "returnType": "boolean",
                      "visibility": "+",
                      "parameters": [
                        "E e"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-list",
                "type": "classNode",
                "position": {
                  "x": 100,
                  "y": 280
                },
                "data": {
                  "id": "cls-list",
                  "entityType": "class",
                  "name": "List<E>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-get",
                      "name": "get(int)",
                      "returnType": "E",
                      "visibility": "+",
                      "parameters": [
                        "int index"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-set",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 280
                },
                "data": {
                  "id": "cls-set",
                  "entityType": "class",
                  "name": "Set<E>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-queue",
                "type": "classNode",
                "position": {
                  "x": 580,
                  "y": 280
                },
                "data": {
                  "id": "cls-queue",
                  "entityType": "class",
                  "name": "Queue<E>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-poll",
                      "name": "poll()",
                      "returnType": "E",
                      "visibility": "+",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-map",
                "type": "classNode",
                "position": {
                  "x": 800,
                  "y": 160
                },
                "data": {
                  "id": "cls-map",
                  "entityType": "class",
                  "name": "Map<K, V> [Independent]",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-put",
                      "name": "put(K, V)",
                      "returnType": "V",
                      "visibility": "+",
                      "parameters": [
                        "K key",
                        "V val"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-col-iter",
                "source": "cls-collection",
                "target": "cls-iterable",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-col-iter",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-list-col",
                "source": "cls-list",
                "target": "cls-collection",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-list-col",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-set-col",
                "source": "cls-set",
                "target": "cls-collection",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-set-col",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              },
              {
                "id": "rel-q-col",
                "source": "cls-queue",
                "target": "cls-collection",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-q-col",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The Java Collections Framework unifies data structures under standardized interfaces with interchangeable implementations.",
            "whyIsItUsed": "Allows algorithms to operate on abstract collections without coupling to concrete implementations.",
            "javaSyntax": "Collection<String> items = new ArrayList<>();",
            "howItWorks": "Interfaces define behavior; concrete classes (ArrayList, HashSet) provide specialized internal data structures.",
            "visualRepresentation": "Hierarchical interface tree with Map displayed separately.",
            "realWorldExample": "A transportation framework defining Land, Sea, and Air vehicles, with cars, ships, and planes.",
            "commonMistakes": "Believing Map is a sub-interface of Collection (Map is a completely separate hierarchy).",
            "challenge": "Check which interface enables enhanced for-each loops (`Iterable`)."
          }
        }
      ]
    },
    {
      "id": "21.2-arraylist",
      "code": "21.2",
      "title": "ArrayList Internal Array & Resizing",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.2-s1",
          "title": "1. elementData Backing Array & Dynamic Growth",
          "level": "intermediate",
          "learningObjective": "Inspect ArrayList internal `Object[] elementData`, size counter, and 1.5x capacity expansion.",
          "javaSource": "import java.util.ArrayList;\nimport java.util.List;\npublic class ArrayListDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(4);\n        list.add(\"Alpha\");\n        list.add(\"Beta\");\n        list.add(\"Gamma\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-al-ctrl",
                "type": "objectNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "obj-al-ctrl",
                  "entityType": "object",
                  "className": "ArrayList<String>",
                  "simulatorAddress": "0xAL_01",
                  "instanceFieldValues": {
                    "size": "3",
                    "capacity": "4"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-el-data",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "arr-el-data",
                  "entityType": "array",
                  "name": "elementData (Object[4])",
                  "arrayLength": 4,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "\"Alpha\""
                    },
                    {
                      "index": 1,
                      "value": "\"Beta\""
                    },
                    {
                      "index": 2,
                      "value": "\"Gamma\""
                    },
                    {
                      "index": 3,
                      "value": "null"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-al-arr",
                "source": "obj-al-ctrl",
                "target": "arr-el-data",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-al-arr",
                  "type": "reference",
                  "label": "backing array",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`ArrayList` wraps a contiguous `Object[] elementData` array, providing O(1) random index access.",
            "whyIsItUsed": "Dynamic resizing: when capacity is exceeded, it allocates an array 1.5x larger and copies elements.",
            "javaSyntax": "list.add(\"Alpha\");",
            "howItWorks": "Amortized O(1) append; `size` tracks logical element count, distinct from array `length`.",
            "visualRepresentation": "ArrayList controller card pointing to 4-slot backing array with 3 populated slots and 1 null slot.",
            "realWorldExample": "An accordion file folder that can be swapped for a wider one when stuffed full.",
            "commonMistakes": "Calling `list.size()` and confusing it with internal capacity.",
            "challenge": "Add 2 more elements to trigger the 1.5x expansion to 6 slots."
          }
        }
      ]
    },
    {
      "id": "21.3-linkedlist",
      "code": "21.3",
      "title": "LinkedList Doubly-Linked Node Chain",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.3-s1",
          "title": "1. Doubly-Linked Node Pointers (prev, item, next)",
          "level": "intermediate",
          "learningObjective": "Observe bidirectional node pointers in `LinkedList` enabling O(1) insertion at endpoints.",
          "javaSource": "import java.util.LinkedList;\npublic class LinkedListDemo {\n    public static void main(String[] args) {\n        LinkedList<String> list = new LinkedList<>();\n        list.add(\"First\");\n        list.add(\"Second\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-node-1",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "obj-node-1",
                  "entityType": "object",
                  "className": "Node (First)",
                  "simulatorAddress": "0xNODE_1",
                  "instanceFieldValues": {
                    "item": "\"First\"",
                    "prev": "null"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-node-2",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-node-2",
                  "entityType": "object",
                  "className": "Node (Second)",
                  "simulatorAddress": "0xNODE_2",
                  "instanceFieldValues": {
                    "item": "\"Second\"",
                    "next": "null"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-n1-next",
                "source": "obj-node-1",
                "target": "obj-node-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-n1-next",
                  "type": "reference",
                  "label": "next",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-n2-prev",
                "source": "obj-node-2",
                "target": "obj-node-1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-n2-prev",
                  "type": "reference",
                  "label": "prev",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`LinkedList` is a doubly-linked list where each Node stores its payload and pointers to both neighbor nodes.",
            "whyIsItUsed": "Provides constant-time O(1) insertions and removals at head/tail; O(N) index traversal.",
            "javaSyntax": "list.addFirst(\"Start\");",
            "howItWorks": "Allocates a new `Node<E>` on heap and rewrites adjacent `prev` and `next` pointers.",
            "visualRepresentation": "Two node cards linked by reciprocal forward and backward arrows.",
            "realWorldExample": "A human chain where each person holds hands with both their left and right neighbors.",
            "commonMistakes": "Using `LinkedList` for random index lookups with `list.get(i)` (requires O(N) sequential traversal).",
            "challenge": "Insert a third node between First and Second."
          }
        }
      ]
    },
    {
      "id": "21.4-hashset",
      "code": "21.4",
      "title": "HashSet & Duplicate Rejection",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.4-s1",
          "title": "1. Set Uniqueness & Hash Table Buckets",
          "level": "intermediate",
          "learningObjective": "Understand how `HashSet` rejects duplicate elements using `hashCode()` and `equals()`.",
          "javaSource": "import java.util.HashSet;\nimport java.util.Set;\npublic class HashSetDemo {\n    public static void main(String[] args) {\n        Set<String> set = new HashSet<>();\n        set.add(\"Java\");\n        set.add(\"Python\");\n        boolean added = set.add(\"Java\"); // false (Duplicate rejected!)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-hs-ctrl",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "obj-hs-ctrl",
                  "entityType": "object",
                  "className": "HashSet<String>",
                  "simulatorAddress": "0xSET_01",
                  "instanceFieldValues": {
                    "size": "2",
                    "backingMap": "HashMap<String, Object>"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-set-e1",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 80
                },
                "data": {
                  "id": "obj-set-e1",
                  "entityType": "object",
                  "className": "Entry \"Java\"",
                  "simulatorAddress": "0xEJ",
                  "instanceFieldValues": {
                    "hash": "2301506"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-set-e2",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 220
                },
                "data": {
                  "id": "obj-set-e2",
                  "entityType": "object",
                  "className": "Entry \"Python\"",
                  "simulatorAddress": "0xEP",
                  "instanceFieldValues": {
                    "hash": "-1960249764"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-hs-e1",
                "source": "obj-hs-ctrl",
                "target": "obj-set-e1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hs-e1",
                  "type": "collection-containment",
                  "label": "contains \"Java\"",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-hs-e2",
                "source": "obj-hs-ctrl",
                "target": "obj-set-e2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hs-e2",
                  "type": "collection-containment",
                  "label": "contains \"Python\"",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`HashSet` stores unique elements backed by an internal `HashMap` using dummy value objects.",
            "whyIsItUsed": "Provides O(1) membership lookup (`contains`), insertion, and automatic duplicate rejection.",
            "javaSyntax": "set.add(\"Java\");",
            "howItWorks": "Computes `hashCode()`, locates bucket, tests `equals()`; rejects insertion if already present.",
            "visualRepresentation": "Set container card holding unique elements with duplicate rejected.",
            "realWorldExample": "A club guest list where names can only appear once.",
            "commonMistakes": "Assuming `HashSet` maintains insertion order (iteration order is undefined).",
            "challenge": "Override `equals()` and `hashCode()` on a custom Person class in a Set."
          }
        }
      ]
    },
    {
      "id": "21.5-linkedhashset",
      "code": "21.5",
      "title": "LinkedHashSet Insertion-Order Iteration",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.5-s1",
          "title": "1. Hash Table + Doubly-Linked Sequence List",
          "level": "intermediate",
          "learningObjective": "Observe `LinkedHashSet` maintaining predictable insertion-order iteration.",
          "javaSource": "import java.util.LinkedHashSet;\nimport java.util.Set;\npublic class LinkedHashSetDemo {\n    public static void main(String[] args) {\n        Set<String> set = new LinkedHashSet<>();\n        set.add(\"Zebra\");\n        set.add(\"Apple\");\n        set.add(\"Mango\");\n        // Iterates in exact order added: Zebra -> Apple -> Mango\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-lhs-z",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "node-lhs-z",
                  "entityType": "object",
                  "className": "Entry \"Zebra\"",
                  "simulatorAddress": "0xLH_Z",
                  "instanceFieldValues": {
                    "seq": "1st added"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-lhs-a",
                "type": "objectNode",
                "position": {
                  "x": 440,
                  "y": 140
                },
                "data": {
                  "id": "node-lhs-a",
                  "entityType": "object",
                  "className": "Entry \"Apple\"",
                  "simulatorAddress": "0xLH_A",
                  "instanceFieldValues": {
                    "seq": "2nd added"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-lhs-m",
                "type": "objectNode",
                "position": {
                  "x": 720,
                  "y": 140
                },
                "data": {
                  "id": "node-lhs-m",
                  "entityType": "object",
                  "className": "Entry \"Mango\"",
                  "simulatorAddress": "0xLH_M",
                  "instanceFieldValues": {
                    "seq": "3rd added"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-lhs-za",
                "source": "node-lhs-z",
                "target": "node-lhs-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-lhs-za",
                  "type": "reference",
                  "label": "before/after link",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-lhs-am",
                "source": "node-lhs-a",
                "target": "node-lhs-m",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-lhs-am",
                  "type": "reference",
                  "label": "before/after link",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`LinkedHashSet` combines a hash table with a doubly-linked list running through all entries.",
            "whyIsItUsed": "Guarantees iteration order matches the exact sequence elements were inserted.",
            "javaSyntax": "Set<String> set = new LinkedHashSet<>();",
            "howItWorks": "Maintains `before` and `after` pointers on each bucket entry without degrading O(1) operations.",
            "visualRepresentation": "Linear sequence linking hash entries in insertion order.",
            "realWorldExample": "A guest list with arrival timestamps preserving who arrived first.",
            "commonMistakes": "Thinking re-adding an existing element updates its insertion position (it does not).",
            "challenge": "Iterate using enhanced for-loop and verify output order."
          }
        }
      ]
    },
    {
      "id": "21.6-treeset",
      "code": "21.6",
      "title": "TreeSet Red-Black Tree Sorting",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.6-s1",
          "title": "1. Self-Balancing Red-Black Binary Search Tree",
          "level": "advanced",
          "learningObjective": "Inspect `TreeSet` maintaining elements in natural ascending order via a Red-Black BST.",
          "javaSource": "import java.util.TreeSet;\npublic class TreeSetDemo {\n    public static void main(String[] args) {\n        TreeSet<Integer> set = new TreeSet<>();\n        set.add(50);\n        set.add(20);\n        set.add(80);\n        // Naturally sorted: [20, 50, 80]\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "ts-root",
                "type": "objectNode",
                "position": {
                  "x": 380,
                  "y": 60
                },
                "data": {
                  "id": "ts-root",
                  "entityType": "object",
                  "className": "Node (50) [BLACK ROOT]",
                  "simulatorAddress": "0xTS_50",
                  "instanceFieldValues": {
                    "value": "50"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ts-left",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 200
                },
                "data": {
                  "id": "ts-left",
                  "entityType": "object",
                  "className": "Node (20) [RED LEFT]",
                  "simulatorAddress": "0xTS_20",
                  "instanceFieldValues": {
                    "value": "20"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ts-right",
                "type": "objectNode",
                "position": {
                  "x": 560,
                  "y": 200
                },
                "data": {
                  "id": "ts-right",
                  "entityType": "object",
                  "className": "Node (80) [RED RIGHT]",
                  "simulatorAddress": "0xTS_80",
                  "instanceFieldValues": {
                    "value": "80"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ts-l",
                "source": "ts-root",
                "target": "ts-left",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ts-l",
                  "type": "reference",
                  "label": "left (< 50)",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-ts-r",
                "source": "ts-root",
                "target": "ts-right",
                "type": "reference",
                "data": {
                  "id": "rel-ts-r",
                  "type": "reference",
                  "label": "right (> 50)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`TreeSet` is backed by a `TreeMap` (Red-Black self-balancing BST) guaranteeing O(log N) operations.",
            "whyIsItUsed": "Keeps elements sorted according to natural ordering (`Comparable`) or a custom `Comparator`.",
            "javaSyntax": "TreeSet<Integer> set = new TreeSet<>();",
            "howItWorks": "Performs left/right tree rotations upon insertion to maintain black-height balance.",
            "visualRepresentation": "Binary tree layout with root 50 branching to left child 20 and right child 80.",
            "realWorldExample": "A library card catalog maintained in strict alphabetical order.",
            "commonMistakes": "Inserting elements that do not implement `Comparable` without providing a `Comparator`.",
            "challenge": "Use `set.first()` and `set.last()` to retrieve endpoints."
          }
        }
      ]
    },
    {
      "id": "21.7-queue",
      "code": "21.7",
      "title": "Queue FIFO Operations (offer, poll, peek)",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.7-s1",
          "title": "1. First-In First-Out Queue Processing",
          "level": "intermediate",
          "learningObjective": "Track FIFO order: elements offered at tail and polled from head.",
          "javaSource": "import java.util.LinkedList;\nimport java.util.Queue;\npublic class QueueDemo {\n    public static void main(String[] args) {\n        Queue<String> queue = new LinkedList<>();\n        queue.offer(\"Task 1\"); // Added to tail\n        queue.offer(\"Task 2\");\n        String next = queue.peek(); // \"Task 1\" (without removing)\n        String done = queue.poll(); // \"Task 1\" (removed from head)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "q-item-1",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "q-item-1",
                  "entityType": "object",
                  "className": "Task 1 [HEAD]",
                  "simulatorAddress": "0xQ1",
                  "instanceFieldValues": {
                    "status": "polled next"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "q-item-2",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "q-item-2",
                  "entityType": "object",
                  "className": "Task 2 [TAIL]",
                  "simulatorAddress": "0xQ2",
                  "instanceFieldValues": {
                    "status": "queued"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-q-flow",
                "source": "q-item-1",
                "target": "q-item-2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-q-flow",
                  "type": "data-flow",
                  "label": "FIFO Queue",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A `Queue` models First-In-First-Out (FIFO) processing: insert at tail (`offer`), remove at head (`poll`).",
            "whyIsItUsed": "Ideal for task schedulers, print spoolers, and breadth-first search (BFS).",
            "javaSyntax": "queue.offer(\"Task\"); queue.poll();",
            "howItWorks": "`peek()` inspects head without removal; `poll()` retrieves and removes, returning null if empty.",
            "visualRepresentation": "Horizontal pipeline showing head element exiting left and tail element entering right.",
            "realWorldExample": "A checkout line at a grocery store.",
            "commonMistakes": "Using `remove()` on an empty queue (throws NoSuchElementException; `poll()` safely returns null).",
            "challenge": "Poll all items until queue is empty using a while loop."
          }
        }
      ]
    },
    {
      "id": "21.8-deque",
      "code": "21.8",
      "title": "Deque (Double-Ended Queue)",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.8-s1",
          "title": "1. Dual-End Operations (addFirst & addLast)",
          "level": "intermediate",
          "learningObjective": "Demonstrate double-ended queue operations enabling both Queue (FIFO) and Stack (LIFO) semantics.",
          "javaSource": "import java.util.ArrayDeque;\nimport java.util.Deque;\npublic class DequeDemo {\n    public static void main(String[] args) {\n        Deque<String> deque = new ArrayDeque<>();\n        deque.addFirst(\"Front\");\n        deque.addLast(\"Back\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "deq-ctrl",
                "type": "objectNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "deq-ctrl",
                  "entityType": "object",
                  "className": "ArrayDeque<String>",
                  "simulatorAddress": "0xDEQ_01",
                  "instanceFieldValues": {
                    "[front]": "\"Front\"",
                    "[back]": "\"Back\"",
                    "size": "2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A `Deque` allows insertions and removals at both ends, serving as both a FIFO queue and a LIFO stack.",
            "whyIsItUsed": "Preferred over legacy `java.util.Stack` class for stack implementations.",
            "javaSyntax": "deque.addFirst(\"A\"); deque.addLast(\"B\");",
            "howItWorks": "ArrayDeque uses a circular array buffer with head and tail pointer wrap-around.",
            "visualRepresentation": "Dual-ended card showing front and back access points.",
            "realWorldExample": "A deck of cards where you can draw or insert from either top or bottom.",
            "commonMistakes": "Using legacy Vector-based `Stack` class.",
            "challenge": "Implement a LIFO stack using `push()` and `pop()`."
          }
        }
      ]
    },
    {
      "id": "21.9-priority-queue",
      "code": "21.9",
      "title": "PriorityQueue Binary Min-Heap",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.9-s1",
          "title": "1. Min-Heap Priority Ordering",
          "level": "advanced",
          "learningObjective": "Observe `PriorityQueue` ordering elements according to priority using an internal binary min-heap.",
          "javaSource": "import java.util.PriorityQueue;\npublic class PQDemo {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        pq.offer(40);\n        pq.offer(10); // Smallest element floats to root!\n        pq.offer(30);\n        int highestPriority = pq.poll(); // 10\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "pq-root",
                "type": "objectNode",
                "position": {
                  "x": 380,
                  "y": 60
                },
                "data": {
                  "id": "pq-root",
                  "entityType": "object",
                  "className": "Min-Heap Root (10)",
                  "simulatorAddress": "0xPQ_10",
                  "instanceFieldValues": {
                    "value": "10 (Highest Priority)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pq-c1",
                "type": "objectNode",
                "position": {
                  "x": 220,
                  "y": 200
                },
                "data": {
                  "id": "pq-c1",
                  "entityType": "object",
                  "className": "Child (40)",
                  "simulatorAddress": "0xPQ_40",
                  "instanceFieldValues": {
                    "value": "40"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pq-c2",
                "type": "objectNode",
                "position": {
                  "x": 540,
                  "y": 200
                },
                "data": {
                  "id": "pq-c2",
                  "entityType": "object",
                  "className": "Child (30)",
                  "simulatorAddress": "0xPQ_30",
                  "instanceFieldValues": {
                    "value": "30"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pq-l",
                "source": "pq-root",
                "target": "pq-c1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pq-l",
                  "type": "reference",
                  "label": "heap link",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-pq-r",
                "source": "pq-root",
                "target": "pq-c2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pq-r",
                  "type": "reference",
                  "label": "heap link",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`PriorityQueue` implements a binary heap where the highest-priority element is always at the root.",
            "whyIsItUsed": "Crucial for Dijkstra's shortest path, Huffman coding, and real-time event simulations.",
            "javaSyntax": "PriorityQueue<Integer> pq = new PriorityQueue<>();",
            "howItWorks": "Backed by an array: parent `(i-1)/2`, left child `2i+1`, right child `2i+2`; siftUp / siftDown maintains heap invariant.",
            "visualRepresentation": "Binary min-heap tree with minimum value 10 at the root.",
            "realWorldExample": "An emergency room triage desk treating the most critical patient first.",
            "commonMistakes": "Expecting iterating `PriorityQueue` with a for-loop to yield sorted order (only `poll()` guarantees sorted order).",
            "challenge": "Create a max-heap using `Collections.reverseOrder()`."
          }
        }
      ]
    },
    {
      "id": "21.10-hashmap",
      "code": "21.10",
      "title": "HashMap Hash Table & Bucket Array",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.10-s1",
          "title": "1. Key Hash Hashing & Value Replacement",
          "level": "intermediate",
          "learningObjective": "Track how `HashMap.put()` hashes keys, addresses bucket slots, and replaces values on matching keys.",
          "javaSource": "import java.util.HashMap;\nimport java.util.Map;\npublic class HashMapDemo {\n    public static void main(String[] args) {\n        Map<Integer, String> students = new HashMap<>();\n        students.put(101, \"Alice\");\n        students.put(102, \"Bob\");\n        students.put(101, \"Charlie\"); // Overwrites Alice for key 101!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "hm-ctrl",
                "type": "objectNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "hm-ctrl",
                  "entityType": "object",
                  "className": "HashMap<Integer, String>",
                  "simulatorAddress": "0xMAP_01",
                  "instanceFieldValues": {
                    "size": "2",
                    "loadFactor": "0.75"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-e-101",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 80
                },
                "data": {
                  "id": "node-e-101",
                  "entityType": "object",
                  "className": "Node [Key: 101]",
                  "simulatorAddress": "0xN101",
                  "instanceFieldValues": {
                    "key": "101",
                    "value": "\"Charlie\" (overwritten)",
                    "hash": "101"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-e-102",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 240
                },
                "data": {
                  "id": "node-e-102",
                  "entityType": "object",
                  "className": "Node [Key: 102]",
                  "simulatorAddress": "0xN102",
                  "instanceFieldValues": {
                    "key": "102",
                    "value": "\"Bob\"",
                    "hash": "102"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-hm-101",
                "source": "hm-ctrl",
                "target": "node-e-101",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hm-101",
                  "type": "reference",
                  "label": "bucket[5]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-hm-102",
                "source": "hm-ctrl",
                "target": "node-e-102",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-hm-102",
                  "type": "reference",
                  "label": "bucket[6]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`HashMap` stores key-value pairs using hashing to achieve average O(1) time complexity for lookup and insert.",
            "whyIsItUsed": "Most widely used key-value associative dictionary in the Java programming language.",
            "javaSyntax": "map.put(key, val); map.get(key);",
            "howItWorks": "Computes `(n - 1) & hash(key)` to select bucket; traverses bucket linked list / Red-Black tree; replaces value if keys match.",
            "visualRepresentation": "Map container pointing to bucket array entries holding key/value pairs.",
            "realWorldExample": "A coat check room where your claim ticket hash leads directly to your coat hanger.",
            "commonMistakes": "Using mutable objects as keys and mutating them after insertion (corrupts lookup).",
            "challenge": "Check collision handling when two different keys map to the same bucket index."
          }
        }
      ]
    },
    {
      "id": "21.11-linkedhashmap",
      "code": "21.11",
      "title": "LinkedHashMap Insertion & Access Order",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.11-s1",
          "title": "1. Predictable Iteration Order & LRU Caches",
          "level": "intermediate",
          "learningObjective": "Observe `LinkedHashMap` preserving insertion order or access order for LRU caches.",
          "javaSource": "import java.util.LinkedHashMap;\nimport java.util.Map;\npublic class LinkedHashMapDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new LinkedHashMap<>();\n        map.put(\"One\", 1);\n        map.put(\"Two\", 2);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "lhm-e1",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "lhm-e1",
                  "entityType": "object",
                  "className": "Entry [\"One\": 1]",
                  "simulatorAddress": "0xLHM_1",
                  "instanceFieldValues": {
                    "seq": "1st"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "lhm-e2",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "lhm-e2",
                  "entityType": "object",
                  "className": "Entry [\"Two\": 2]",
                  "simulatorAddress": "0xLHM_2",
                  "instanceFieldValues": {
                    "seq": "2nd"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-lhm-order",
                "source": "lhm-e1",
                "target": "lhm-e2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-lhm-order",
                  "type": "reference",
                  "label": "access/insertion link",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`LinkedHashMap` maintains a doubly-linked list through all its entries, providing deterministic iteration.",
            "whyIsItUsed": "Can be configured in access-order mode to build clean Least Recently Used (LRU) caches.",
            "javaSyntax": "Map<K, V> map = new LinkedHashMap<>(16, 0.75f, true);",
            "howItWorks": "Subclasses `HashMap.Node` with `before` and `after` pointers.",
            "visualRepresentation": "Two map entry cards connected by chronological sequence arrow.",
            "realWorldExample": "A grocery list maintaining the exact order items were written down.",
            "commonMistakes": "Assuming standard HashMap has guaranteed iteration order.",
            "challenge": "Override `removeEldestEntry()` to build a bounded LRU cache."
          }
        }
      ]
    },
    {
      "id": "21.12-treemap",
      "code": "21.12",
      "title": "TreeMap Sorted Key Ordering",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.12-s1",
          "title": "1. Navigable Sorted Key-Value Map",
          "level": "advanced",
          "learningObjective": "Inspect `TreeMap` keeping keys in sorted order using an internal Red-Black tree.",
          "javaSource": "import java.util.TreeMap;\npublic class TreeMapDemo {\n    public static void main(String[] args) {\n        TreeMap<String, Integer> map = new TreeMap<>();\n        map.put(\"Charlie\", 85);\n        map.put(\"Alice\", 95);\n        map.put(\"Bob\", 90);\n        // Naturally sorted by key: Alice -> Bob -> Charlie\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "tm-root",
                "type": "objectNode",
                "position": {
                  "x": 380,
                  "y": 60
                },
                "data": {
                  "id": "tm-root",
                  "entityType": "object",
                  "className": "Entry [Bob: 90]",
                  "simulatorAddress": "0xTM_BOB",
                  "instanceFieldValues": {
                    "key": "\"Bob\"",
                    "val": "90"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "tm-left",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 200
                },
                "data": {
                  "id": "tm-left",
                  "entityType": "object",
                  "className": "Entry [Alice: 95]",
                  "simulatorAddress": "0xTM_ALICE",
                  "instanceFieldValues": {
                    "key": "\"Alice\"",
                    "val": "95"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "tm-right",
                "type": "objectNode",
                "position": {
                  "x": 560,
                  "y": 200
                },
                "data": {
                  "id": "tm-right",
                  "entityType": "object",
                  "className": "Entry [Charlie: 85]",
                  "simulatorAddress": "0xTM_CHARLIE",
                  "instanceFieldValues": {
                    "key": "\"Charlie\"",
                    "val": "85"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-tm-l",
                "source": "tm-root",
                "target": "tm-left",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-tm-l",
                  "type": "reference",
                  "label": "left (< Bob)",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-tm-r",
                "source": "tm-root",
                "target": "tm-right",
                "type": "reference",
                "data": {
                  "id": "rel-tm-r",
                  "type": "reference",
                  "label": "right (> Bob)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`TreeMap` implements `NavigableMap` using a Red-Black tree; keys are sorted in O(log N) operations.",
            "whyIsItUsed": "Supports powerful range queries such as `subMap()`, `headMap()`, and `tailMap()`.",
            "javaSyntax": "TreeMap<String, Integer> map = new TreeMap<>();",
            "howItWorks": "Compares keys via `Comparable.compareTo` or provided `Comparator` during tree descent.",
            "visualRepresentation": "Red-black binary tree of key-value cards sorted alphabetically.",
            "realWorldExample": "An alphabetical phone directory.",
            "commonMistakes": "Using keys that do not implement `Comparable`.",
            "challenge": "Query the lowest key using `map.firstKey()`."
          }
        }
      ]
    },
    {
      "id": "21.13-generics-basics",
      "code": "21.13",
      "title": "Generics Basics & Parameterized Types",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.13-s1",
          "title": "1. Generic Type Parameter <T>",
          "level": "beginner",
          "learningObjective": "Understand generic class declaration `Box<T>` and concrete type argument binding.",
          "javaSource": "class Box<T> {\n    private T value;\n    public void set(T val) { this.value = val; }\n    public T get() { return value; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> stringBox = new Box<>();\n        stringBox.set(\"Hello Generics\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-gen-box",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 100
                },
                "data": {
                  "id": "cls-gen-box",
                  "entityType": "class",
                  "name": "Box<T>",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-val",
                      "name": "value",
                      "type": "T",
                      "visibility": "-"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-set",
                      "name": "set(T)",
                      "returnType": "void",
                      "visibility": "+",
                      "parameters": [
                        "T val"
                      ]
                    },
                    {
                      "id": "m-get",
                      "name": "get()",
                      "returnType": "T",
                      "visibility": "+",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "obj-box-inst",
                "type": "objectNode",
                "position": {
                  "x": 560,
                  "y": 120
                },
                "data": {
                  "id": "obj-box-inst",
                  "entityType": "object",
                  "className": "Box<String> [T -> String]",
                  "simulatorAddress": "0xBOX_GEN",
                  "instanceFieldValues": {
                    "value": "\"Hello Generics\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-inst-gen",
                "source": "cls-gen-box",
                "target": "obj-box-inst",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-inst-gen",
                  "type": "reference",
                  "label": "binds T to String",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Generics allow classes, interfaces, and methods to operate on parameterized types with compile-time type safety.",
            "whyIsItUsed": "Eliminates unsafe explicit type casting and catches type mismatches at compile time.",
            "javaSyntax": "Box<String> stringBox = new Box<>();",
            "howItWorks": "Compiler validates assignments against type parameter `T` and inserts checkcast instructions.",
            "visualRepresentation": "Generic class blueprint card with type parameter badge `<T>` pointing to concrete instance.",
            "realWorldExample": "A shipping container labeled to hold fragile glassware.",
            "commonMistakes": "Attempting `new T()` inside a generic class.",
            "challenge": "Create a `Box<Integer>` and set an integer value."
          }
        }
      ]
    },
    {
      "id": "21.14-multi-params",
      "code": "21.14",
      "title": "Multiple Type Parameters (<K, V>)",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.14-s1",
          "title": "1. Generic Pair<K, V> Container",
          "level": "intermediate",
          "learningObjective": "Inspect generic classes with multiple independent type parameters.",
          "javaSource": "class Pair<K, V> {\n    K key;\n    V value;\n    Pair(K k, V v) { this.key = k; this.value = v; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Pair<Integer, String> entry = new Pair<>(1, \"One\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-pair",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 100
                },
                "data": {
                  "id": "cls-pair",
                  "entityType": "class",
                  "name": "Pair<K, V>",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-k",
                      "name": "key",
                      "type": "K",
                      "visibility": "~"
                    },
                    {
                      "id": "f-v",
                      "name": "value",
                      "type": "V",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "obj-pair-inst",
                "type": "objectNode",
                "position": {
                  "x": 560,
                  "y": 120
                },
                "data": {
                  "id": "obj-pair-inst",
                  "entityType": "object",
                  "className": "Pair<Integer, String>",
                  "simulatorAddress": "0xPAIR_01",
                  "instanceFieldValues": {
                    "key": "1",
                    "value": "\"One\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pair-bind",
                "source": "cls-pair",
                "target": "obj-pair-inst",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pair-bind",
                  "type": "reference",
                  "label": "binds K=Integer, V=String",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Generics support arbitrary numbers of type parameters (conventionally E for element, K for key, V for value).",
            "whyIsItUsed": "Models tuples, key-value mappings, and multi-variable functional relationships.",
            "javaSyntax": "Pair<Integer, String> p = new Pair<>(1, \"One\");",
            "howItWorks": "Compiler enforces independent type safety constraints on each parameter position.",
            "visualRepresentation": "Class card displaying multiple type parameters `<K, V>`.",
            "realWorldExample": "A passport displaying both a nationality (K) and passport number (V).",
            "commonMistakes": "Reversing type argument order when instantiating.",
            "challenge": "Add a swap method `Pair<V, K> swap()`."
          }
        }
      ]
    },
    {
      "id": "21.15-bounded-params",
      "code": "21.15",
      "title": "Bounded Type Parameters (<T extends Number>)",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.15-s1",
          "title": "1. Upper Bound Enforcement",
          "level": "intermediate",
          "learningObjective": "Observe `<T extends Number>` restricting type arguments to Number and its subclasses.",
          "javaSource": "class NumberBox<T extends Number> {\n    private T num;\n    NumberBox(T n) { this.num = n; }\n    double doubleVal() { return num.doubleValue(); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        NumberBox<Double> box = new NumberBox<>(3.14);\n        // NumberBox<String> invalid; // Compile error!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-numbox",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-numbox",
                  "entityType": "class",
                  "name": "NumberBox<T extends Number>",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-num",
                      "name": "num",
                      "type": "T extends Number",
                      "visibility": "-"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-dv",
                      "name": "doubleVal()",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Bounded type parameters restrict permissible type arguments to subtypes of a specified class/interface.",
            "whyIsItUsed": "Allows calling methods declared in the bound (e.g. `doubleValue()`) directly on generic instances.",
            "javaSyntax": "class NumberBox<T extends Number>",
            "howItWorks": "Compiler verifies type arguments inherit from `Number`; bytecode erases `T` to `Number`.",
            "visualRepresentation": "Class card featuring upper bound constraint badge `<T extends Number>`.",
            "realWorldExample": "A designated parking lane reserved exclusively for electric vehicles.",
            "commonMistakes": "Using `implements` instead of `extends` in generic bound syntax (always use `extends`).",
            "challenge": "Add an `Integer` to a `NumberBox<Integer>`."
          }
        }
      ]
    },
    {
      "id": "21.16-wildcards",
      "code": "21.16",
      "title": "Wildcards & PECS Principle (? extends / ? super)",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.16-s1",
          "title": "1. Producer Extends, Consumer Super (PECS)",
          "level": "advanced",
          "learningObjective": "Master Java wildcard variance: `? extends T` (read-only producer) vs `? super T` (write-only consumer).",
          "javaSource": "import java.util.List;\npublic class PECSDemo {\n    // Producer Extends: Can read Numbers, cannot add\n    static double sumOfList(List<? extends Number> list) {\n        double s = 0.0;\n        for (Number n : list) s += n.doubleValue();\n        return s;\n    }\n    // Consumer Super: Can add Integers\n    static void addNumbers(List<? super Integer> list) {\n        list.add(1);\n        list.add(2);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-pecs-prod",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "cls-pecs-prod",
                  "entityType": "variable",
                  "name": "List<? extends Number>",
                  "variableType": "Producer (Read-Only)",
                  "variableValue": "Can read: Number, Cannot write",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "cls-pecs-cons",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 100
                },
                "data": {
                  "id": "cls-pecs-cons",
                  "entityType": "variable",
                  "name": "List<? super Integer>",
                  "variableType": "Consumer (Write-Only)",
                  "variableValue": "Can write: Integer, Reads: Object",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Wildcards provide flexible subtyping for collections based on the PECS rule: Producer Extends, Consumer Super.",
            "whyIsItUsed": "Allows passing `List<Integer>` to a method accepting `List<? extends Number>`.",
            "javaSyntax": "void process(List<? extends Number> list)",
            "howItWorks": "Compiler enforces covariance on `extends` and contravariance on `super`.",
            "visualRepresentation": "Two side-by-side rule cards distinguishing producer read capabilities from consumer write capabilities.",
            "realWorldExample": "A reading library (read-only books) vs a donation drop-box (write-only deposits).",
            "commonMistakes": "Trying to add elements to a `List<? extends Number>`.",
            "challenge": "Inspect why `List<Integer>` is not a subtype of `List<Number>`."
          }
        }
      ]
    },
    {
      "id": "21.17-generic-methods",
      "code": "21.17",
      "title": "Generic Methods",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.17-s1",
          "title": "1. Method-Level Type Parameter Scope",
          "level": "intermediate",
          "learningObjective": "Inspect methods declaring their own type parameters independent of class-level types.",
          "javaSource": "public class GenMethodDemo {\n    public static <T> T getMiddle(T[] arr) {\n        return arr[arr.length / 2];\n    }\n    public static void main(String[] args) {\n        String midStr = getMiddle(new String[]{\"A\", \"B\", \"C\"}); // B\n        Integer midInt = getMiddle(new Integer[]{1, 2, 3});       // 2\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-gm",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-gm",
                  "entityType": "class",
                  "name": "GenMethodDemo",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-mid",
                      "name": "<T> getMiddle(T[])",
                      "returnType": "T",
                      "visibility": "+",
                      "parameters": [
                        "T[] arr"
                      ],
                      "isStatic": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Generic methods declare type parameters scoped strictly to the method execution.",
            "whyIsItUsed": "Allows individual utility methods to be type-safe without requiring the enclosing class to be generic.",
            "javaSyntax": "public static <T> T getMiddle(T[] arr)",
            "howItWorks": "Compiler infers type parameter `T` from the passed argument at call site.",
            "visualRepresentation": "Method card with `<T>` badge inside class card.",
            "realWorldExample": "A universal adapter plug fitting multiple electrical socket types.",
            "commonMistakes": "Placing `<T>` after the return type instead of before it.",
            "challenge": "Add a type bound `<T extends Comparable<T>>` to find maximum element."
          }
        }
      ]
    },
    {
      "id": "21.18-type-erasure",
      "code": "21.18",
      "title": "Bytecode Type Erasure",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.18-s1",
          "title": "1. Compile-Time Generics vs Raw Bytecode Objects",
          "level": "advanced",
          "learningObjective": "Understand that Java generics exist solely at compile time and are erased to `Object` in bytecode.",
          "javaSource": "import java.util.ArrayList;\nimport java.util.List;\npublic class ErasureDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        String s = list.get(0); // Compiler injects checkcast (String)\n        // At runtime in bytecode: ArrayList stores plain Object!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-compile-view",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "node-compile-view",
                  "entityType": "variable",
                  "name": "Compile-Time Source",
                  "variableType": "List<String>",
                  "variableValue": "Strict String Type Safety",
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "node-runtime-view",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "node-runtime-view",
                  "entityType": "variable",
                  "name": "JVM Bytecode (Erased)",
                  "variableType": "List<Object>",
                  "variableValue": "Plain Object + checkcast bytecode",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-erasure",
                "source": "node-compile-view",
                "target": "node-runtime-view",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-erasure",
                  "type": "data-flow",
                  "label": "javac type erasure",
                  "provenance": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Type erasure removes all generic type arguments during compilation, ensuring backward compatibility with Java 1.4.",
            "whyIsItUsed": "Explains why generic arrays cannot be created and why `instanceof List<String>` is illegal.",
            "javaSyntax": "List<String> -> List in bytecode",
            "howItWorks": "Compiler erases `T` to its bound (or `Object`), inserting explicit `checkcast` instructions on reads.",
            "visualRepresentation": "Two-panel comparison: Source view with types vs Bytecode view with erased Objects.",
            "realWorldExample": "Scaffolding removed from a building after construction is completed.",
            "commonMistakes": "Trying to check `if (list instanceof List<String>)` at runtime.",
            "challenge": "Verify that `list.getClass()` returns `java.util.ArrayList.class` without type parameters."
          }
        }
      ]
    },
    {
      "id": "21.19-iterators",
      "code": "21.19",
      "title": "Collection Iterators & Cursor Traversal",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.19-s1",
          "title": "1. Iterator Cursor, hasNext(), next() and ConcurrentModificationException",
          "level": "intermediate",
          "learningObjective": "Track iterator cursor movement and `ConcurrentModificationException` fail-fast checks.",
          "javaSource": "import java.util.ArrayList;\nimport java.util.Iterator;\nimport java.util.List;\npublic class IteratorDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        Iterator<String> it = list.iterator();\n        while (it.hasNext()) {\n            String s = it.next();\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "it-cursor",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 140
                },
                "data": {
                  "id": "it-cursor",
                  "entityType": "variable",
                  "name": "it (Iterator cursor)",
                  "variableType": "Iterator",
                  "variableValue": "cursor=1, expectedModCount=2",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "arr-it-col",
                "type": "arrayNode",
                "position": {
                  "x": 480,
                  "y": 120
                },
                "data": {
                  "id": "arr-it-col",
                  "entityType": "array",
                  "name": "ArrayList elements",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "\"A\" (visited)"
                    },
                    {
                      "index": 1,
                      "value": "\"B\" (next)",
                      "isHighlighted": true
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-it-cur",
                "source": "it-cursor",
                "target": "arr-it-col",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-it-cur",
                  "type": "reference",
                  "label": "cursor points to index 1",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An `Iterator` provides standardized step-by-step sequential traversal across any collection implementation.",
            "whyIsItUsed": "Supports safe item removal via `it.remove()` without corrupting collection state.",
            "javaSyntax": "while (it.hasNext()) { String s = it.next(); }",
            "howItWorks": "Checks `expectedModCount == modCount`; throws `ConcurrentModificationException` if collection mutated outside iterator.",
            "visualRepresentation": "Cursor pointer moving across collection cell items.",
            "realWorldExample": "A barcode scanner reading products one after another along a conveyer belt.",
            "commonMistakes": "Calling `list.remove()` inside an enhanced for-loop (causes ConcurrentModificationException).",
            "challenge": "Safely remove an item using `it.remove()`."
          }
        }
      ]
    },
    {
      "id": "21.20-comparable-comparator",
      "code": "21.20",
      "title": "Comparable vs Comparator Ordering",
      "moduleId": "collections-generics",
      "scenarios": [
        {
          "id": "21.20-s1",
          "title": "1. Natural Ordering vs Custom Comparison Strategy",
          "level": "intermediate",
          "learningObjective": "Compare internal natural ordering (`Comparable.compareTo`) against external strategy (`Comparator.compare`).",
          "javaSource": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.Comparator;\nimport java.util.List;\nclass Student implements Comparable<Student> {\n    String name;\n    int age;\n    Student(String n, int a) { this.name = n; this.age = a; }\n    public int compareTo(Student other) { return this.name.compareTo(other.name); } // Natural: by name\n}\npublic class Main {\n    public static void main(String[] args) {\n        List<Student> list = new ArrayList<>();\n        Collections.sort(list); // Natural sort (by name)\n        Collections.sort(list, Comparator.comparingInt(s -> s.age)); // Custom sort (by age)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-comp-nat",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "cls-comp-nat",
                  "entityType": "class",
                  "name": "Comparable<Student>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-c2",
                      "name": "compareTo(Student)",
                      "returnType": "int",
                      "visibility": "+",
                      "parameters": [
                        "Student other"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-comp-ext",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 100
                },
                "data": {
                  "id": "cls-comp-ext",
                  "entityType": "class",
                  "name": "Comparator<Student>",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-cmp",
                      "name": "compare(Student, Student)",
                      "returnType": "int",
                      "visibility": "+",
                      "parameters": [
                        "Student a",
                        "Student b"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "`Comparable` defines a single intrinsic natural order inside the class; `Comparator` defines external comparison strategies.",
            "whyIsItUsed": "Adheres to Strategy Pattern, allowing multiple sorting criteria (e.g. by name, by age, by grade).",
            "javaSyntax": "Collections.sort(list, Comparator.comparing(s -> s.age));",
            "howItWorks": "`compareTo` returns negative (less), zero (equal), or positive (greater).",
            "visualRepresentation": "Comparison cards showing natural ordering contract vs pluggable external Comparator.",
            "realWorldExample": "Alphabetical dictionary ordering (natural) vs sorting books by publication year (custom comparator).",
            "commonMistakes": "Returning `a - b` in `compareTo` causing integer overflow for extreme values (use `Integer.compare`).",
            "challenge": "Sort students descending by age using `Comparator.reversed()`."
          }
        }
      ]
    }
  ]
};

export function getGroup3ModuleSubsections(moduleId: string): SubsectionDefinition[] {
  return GROUP3_SUBSECTIONS_BY_MODULE[moduleId] || [];
}
