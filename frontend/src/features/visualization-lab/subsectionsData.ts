/**
 * OOPS LAB — SEVEN CORE VISUALIZERS: SUBSECTIONS & SCENARIOS REPOSITORY
 * Conforms strictly to Master Specification Sections 4, 5, 6, 7, 8, 9, 10 & 13.
 * Generated with verified Java source code, 2D AST/runtime nodes, and educational walkthroughs.
 */

import { SubsectionDefinition } from './types';
import { GROUP2_SUBSECTIONS_BY_MODULE } from './subsectionsDataGroup2';
import { GROUP3_SUBSECTIONS_BY_MODULE } from './subsectionsDataGroup3';
import { GROUP4_SUBSECTIONS_BY_MODULE } from './subsectionsDataGroup4';

const GROUP1_SUBSECTIONS: Record<string, SubsectionDefinition[]> = {
  "class-rep": [
    {
      "id": "01a-basic-class",
      "code": "01A",
      "title": "Basic Class and Members",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01a-s1",
          "title": "1. Empty Class",
          "level": "beginner",
          "learningObjective": "Understand minimal class declaration syntax in Java.",
          "javaSource": "class Student {\n    // Minimal Java class declaration\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A class is a blueprint or prototype from which individual objects are created.",
            "whyIsItUsed": "Encapsulates data and behavior into a reusable reference type.",
            "javaSyntax": "class Student {\n}",
            "howItWorks": "The compiler emits Student.class bytecode containing an implicit default constructor.",
            "visualRepresentation": "A single class blueprint card with empty member compartments.",
            "realWorldExample": "Empty template for a domain entity awaiting attributes.",
            "commonMistakes": "Assuming an empty class cannot be instantiated.",
            "challenge": "Add an int id field to this class."
          }
        },
        {
          "id": "01a-s2",
          "title": "2. Class with Fields",
          "level": "beginner",
          "learningObjective": "Observe how instance fields declare class state.",
          "javaSource": "class Student {\n    int id;\n    String name;\n    double gpa;\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Fields represent the state attributes declared inside a class.",
            "whyIsItUsed": "Defines the blueprint schema that every object will allocate on the heap.",
            "javaSyntax": "int id;\nString name;\ndouble gpa;",
            "howItWorks": "When instantiated, heap memory slots for each field are reserved.",
            "visualRepresentation": "Class card displaying typed field entries in the fields compartment.",
            "realWorldExample": "Student model storing ID, Name, and GPA attributes.",
            "commonMistakes": "Confusing field declarations with runtime object values.",
            "challenge": "Add a boolean isEnrolled field."
          }
        },
        {
          "id": "01a-s3",
          "title": "3. Class with Methods",
          "level": "beginner",
          "learningObjective": "Examine member methods defining class operations.",
          "javaSource": "class Student {\n    void display() {\n        System.out.println(\"Student\");\n    }\n\n    double getHonorScore() {\n        return 4.0;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "display",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    },
                    {
                      "id": "m2",
                      "name": "getHonorScore",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Methods declare callable operations and behaviors belonging to a class.",
            "whyIsItUsed": "Encapsulate logic and state manipulation into reusable routines.",
            "javaSyntax": "void display() { ... }",
            "howItWorks": "Method bytecode is stored once in Metaspace and shared by all instances.",
            "visualRepresentation": "The methods compartment lists method names, parameters, and return types.",
            "realWorldExample": "Routines like display(), calculate(), and validate().",
            "commonMistakes": "Believing methods are duplicated inside each heap object.",
            "challenge": "Add a method boolean hasPassed()."
          }
        },
        {
          "id": "01a-s4",
          "title": "4. Fields and Methods Combined",
          "level": "beginner",
          "learningObjective": "Understand complete encapsulation of state and behavior in a standard Java class.",
          "javaSource": "class Student {\n    int id;\n    String name;\n    double gpa;\n\n    void display() {\n        System.out.println(name);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "display",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A cohesive Java class combining state fields and behavior methods.",
            "whyIsItUsed": "Core unit of object-oriented programming.",
            "javaSyntax": "class Student {\n    int id;\n    void display() {}\n}",
            "howItWorks": "Methods access instance fields using the implicit this reference.",
            "visualRepresentation": "Unified UML card with distinct Fields and Methods sections.",
            "realWorldExample": "Standard entity models in enterprise Java applications.",
            "commonMistakes": "Omitting return types in method declarations.",
            "challenge": "Add a getter method double getGpa()."
          }
        },
        {
          "id": "01a-s5",
          "title": "5. Class with Explicit Constructor",
          "level": "beginner",
          "learningObjective": "Observe how explicit constructors define initialization contracts.",
          "javaSource": "class Student {\n    int id;\n    String name;\n    double gpa;\n\n    Student(int id, String name, double gpa) {\n        this.id = id;\n        this.name = name;\n        this.gpa = gpa;\n    }\n\n    void display() {\n        System.out.println(name);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c1",
                      "name": "Student",
                      "parameters": [
                        "int id",
                        "String name",
                        "double gpa"
                      ],
                      "visibility": "~"
                    }
                  ],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "display",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A constructor is a special routine invoked during allocation to initialize state.",
            "whyIsItUsed": "Enforces mandatory invariants at creation time.",
            "javaSyntax": "Student(int id, String name, double gpa) { ... }",
            "howItWorks": "The compiler disables the automatic default constructor once an explicit constructor is declared.",
            "visualRepresentation": "Constructor entries are placed in a dedicated constructor compartment.",
            "realWorldExample": "Ensuring bank accounts always have account numbers upon creation.",
            "commonMistakes": "Declaring a return type on a constructor.",
            "challenge": "Add a default no-argument constructor alongside the parameterized one."
          }
        },
        {
          "id": "01a-s6",
          "title": "6. Overloaded Constructors",
          "level": "intermediate",
          "learningObjective": "Learn constructor overloading for flexible object initialization.",
          "javaSource": "class Student {\n    int id;\n    String name;\n\n    Student() {\n        this(0, \"Unknown\");\n    }\n\n    Student(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c1",
                      "name": "Student",
                      "parameters": [],
                      "visibility": "~"
                    },
                    {
                      "id": "c2",
                      "name": "Student",
                      "parameters": [
                        "int id",
                        "String name"
                      ],
                      "visibility": "~"
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Constructor overloading offers multiple ways to initialize an object.",
            "whyIsItUsed": "Supports default fallback values and constructor chaining.",
            "javaSyntax": "Student() { this(0, \"Unknown\"); }",
            "howItWorks": "The compiler determines the target constructor based on argument types.",
            "visualRepresentation": "Both constructor signatures appear in the constructor compartment.",
            "realWorldExample": "Creating geometric shapes with default or custom dimensions.",
            "commonMistakes": "Creating recursive constructor delegation cycles.",
            "challenge": "Add a third constructor Student(String name)."
          }
        },
        {
          "id": "01a-s7",
          "title": "7. Multiple Methods",
          "level": "beginner",
          "learningObjective": "Inspect rich object contracts offering diverse operations.",
          "javaSource": "class Student {\n    String name;\n    double gpa;\n\n    void study(int hours) {\n        gpa += hours * 0.05;\n    }\n\n    boolean isHonorRoll() {\n        return gpa >= 3.8;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "study",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": [
                        "int hours"
                      ]
                    },
                    {
                      "id": "m2",
                      "name": "isHonorRoll",
                      "returnType": "boolean",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Classes declare multiple member methods fulfilling a cohesive domain responsibility.",
            "whyIsItUsed": "Provides clean procedural interfaces to mutate and query state.",
            "javaSyntax": "void study(int hours) { ... }",
            "howItWorks": "Dispatched through virtual method table at runtime.",
            "visualRepresentation": "The methods compartment displays all method signatures.",
            "realWorldExample": "Order processing with calculate(), applyDiscount(), and print().",
            "commonMistakes": "Writing monolithic God methods instead of small, modular routines.",
            "challenge": "Add a void resetGpa() method."
          }
        },
        {
          "id": "01a-s8",
          "title": "8. Nested Class Declarations",
          "level": "advanced",
          "learningObjective": "Understand classes declared inside another enclosing class boundary.",
          "javaSource": "class Outer {\n    int outerVal = 10;\n\n    class Inner {\n        void show() {\n            System.out.println(outerVal);\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-outer",
                "type": "classNode",
                "position": {
                  "x": 240,
                  "y": 100
                },
                "data": {
                  "id": "cls-outer",
                  "entityType": "class",
                  "name": "Outer",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "outerVal",
                      "type": "int",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Outer.java"
                }
              },
              {
                "id": "cls-inner",
                "type": "classNode",
                "position": {
                  "x": 580,
                  "y": 140
                },
                "data": {
                  "id": "cls-inner",
                  "entityType": "class",
                  "name": "Outer.Inner",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "show",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Outer.Inner.java"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-nest",
                "source": "cls-inner",
                "target": "cls-outer",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-nest",
                  "sourceId": "cls-inner",
                  "targetId": "cls-outer",
                  "type": "dependency",
                  "label": "nested inner",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An inner class is declared within the scope of another enclosing outer class.",
            "whyIsItUsed": "Logically groups classes only used in one context, increasing encapsulation.",
            "javaSyntax": "class Outer { class Inner {} }",
            "howItWorks": "Non-static inner classes hold an implicit reference (Outer.this) to the outer instance.",
            "visualRepresentation": "Outer and Inner class nodes connected by a nesting dependency connector.",
            "realWorldExample": "Iterators inside collection classes (e.g. ArrayList.Itr).",
            "commonMistakes": "Instantiating an inner class without an outer class instance.",
            "challenge": "Convert Inner to static class Nested and observe outer reference drop."
          }
        }
      ]
    },
    {
      "id": "01b-access-modifiers",
      "code": "01B",
      "title": "Access Modifiers",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01b-all-modifiers",
          "title": "1. Public, Protected, Package, Private",
          "level": "beginner",
          "learningObjective": "Master Java access modifier symbols and scoping rules.",
          "javaSource": "class Account {\n    public String owner;\n    private double balance;\n    protected String accountType;\n    int accountNumber;\n\n    public void deposit(double amount) {\n        balance += amount;\n    }\n\n    private void validate() {\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-account",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-account",
                  "entityType": "class",
                  "name": "Account",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "owner",
                      "type": "String",
                      "visibility": "+"
                    },
                    {
                      "id": "f2",
                      "name": "balance",
                      "type": "double",
                      "visibility": "-"
                    },
                    {
                      "id": "f3",
                      "name": "accountType",
                      "type": "String",
                      "visibility": "#"
                    },
                    {
                      "id": "f4",
                      "name": "accountNumber",
                      "type": "int",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "deposit",
                      "returnType": "void",
                      "visibility": "+",
                      "parameters": [
                        "double amount"
                      ]
                    },
                    {
                      "id": "m2",
                      "name": "validate",
                      "returnType": "void",
                      "visibility": "-",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Account.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Access modifiers control visibility: public (+), private (-), protected (#), package-private (~).",
            "whyIsItUsed": "Enforces encapsulation by shielding internal implementation details.",
            "javaSyntax": "private double balance;\npublic void deposit() {}",
            "howItWorks": "The compiler validates access at compile time, rejecting unauthorized references.",
            "visualRepresentation": "UML visibility markers: + (public), - (private), # (protected), ~ (package).",
            "realWorldExample": "Hiding financial balances behind validated deposit/withdraw routines.",
            "commonMistakes": "Making fields public, violating encapsulation and invariant integrity.",
            "challenge": "Add a protected void audit() method."
          }
        }
      ]
    },
    {
      "id": "01c-static-vs-instance",
      "code": "01C",
      "title": "Static vs Instance Members",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01c-mixed-members",
          "title": "1. Shared Static Count vs Per-Object State",
          "level": "beginner",
          "learningObjective": "Differentiate class-owned static variables from instance-owned variables.",
          "javaSource": "class Student {\n    static int count = 0;\n    String name;\n    int id;\n\n    Student(String name, int id) {\n        this.name = name;\n        this.id = id;\n        count++;\n    }\n\n    static int getCount() {\n        return count;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "count",
                      "type": "int",
                      "visibility": "~",
                      "isStatic": true,
                      "value": "0"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c1",
                      "name": "Student",
                      "parameters": [
                        "String name",
                        "int id"
                      ],
                      "visibility": "~"
                    }
                  ],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "getCount",
                      "returnType": "int",
                      "visibility": "~",
                      "isStatic": true,
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Static members belong to the class blueprint, while instance members belong to individual objects.",
            "whyIsItUsed": "Share global counters, constants, or utility routines across all instances.",
            "javaSyntax": "static int count = 0;\nstatic int getCount() { return count; }",
            "howItWorks": "Static variables are allocated once when the class is initialized in Metaspace.",
            "visualRepresentation": "Static members are tagged with `static` badges and underline styling.",
            "realWorldExample": "Tracking total student enrollment across all student objects.",
            "commonMistakes": "Attempting to access instance fields (this.name) from static methods.",
            "challenge": "Add a static final double PASSING_GPA = 2.0 constant."
          }
        }
      ]
    },
    {
      "id": "01d-constructors",
      "code": "01D",
      "title": "Constructors and Overloading",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01d-chaining",
          "title": "1. Constructor Chaining with this()",
          "level": "intermediate",
          "learningObjective": "Master constructor delegation using this() syntax.",
          "javaSource": "class Student {\n    String name;\n    int age;\n\n    Student() {\n        this(\"Unknown\", 0);\n    }\n\n    Student(String name) {\n        this(name, 18);\n    }\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "age",
                      "type": "int",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [
                    {
                      "id": "c1",
                      "name": "Student",
                      "parameters": [],
                      "visibility": "~"
                    },
                    {
                      "id": "c2",
                      "name": "Student",
                      "parameters": [
                        "String name"
                      ],
                      "visibility": "~"
                    },
                    {
                      "id": "c3",
                      "name": "Student",
                      "parameters": [
                        "String name",
                        "int age"
                      ],
                      "visibility": "~"
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Constructor chaining delegates initialization from one constructor to another using this().",
            "whyIsItUsed": "Avoids code duplication and centralizes state validation.",
            "javaSyntax": "Student() { this(\"Unknown\", 0); }",
            "howItWorks": "The this() call must be the very first statement in a constructor body.",
            "visualRepresentation": "Separate constructor entries showing parameter signatures.",
            "realWorldExample": "Default user profiles with fallback guest credentials.",
            "commonMistakes": "Placing statements before this(), violating the first-statement rule.",
            "challenge": "Add a constructor Student(int age) that defaults name to Anonymous."
          }
        }
      ]
    },
    {
      "id": "01e-inheritance",
      "code": "01E",
      "title": "Inheritance and Overriding",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01e-hierarchy",
          "title": "1. Person Hierarchy with Method Overriding",
          "level": "intermediate",
          "learningObjective": "Visualize parent-child class hierarchies and method overrides.",
          "javaSource": "class Person {\n    void introduce() {\n        System.out.println(\"Person\");\n    }\n}\n\nclass Student extends Person {\n    @Override\n    void introduce() {\n        System.out.println(\"Student\");\n    }\n}\n\nclass Teacher extends Person {\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-person",
                "type": "classNode",
                "position": {
                  "x": 440,
                  "y": 70
                },
                "data": {
                  "id": "cls-person",
                  "entityType": "class",
                  "name": "Person",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "introduce",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Person.java"
                }
              },
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 260,
                  "y": 260
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m2",
                      "name": "introduce",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              },
              {
                "id": "cls-teacher",
                "type": "classNode",
                "position": {
                  "x": 620,
                  "y": 260
                },
                "data": {
                  "id": "cls-teacher",
                  "entityType": "class",
                  "name": "Teacher",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Teacher.java"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-e1",
                "source": "cls-student",
                "target": "cls-person",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-e1",
                  "sourceId": "cls-student",
                  "targetId": "cls-person",
                  "type": "inheritance",
                  "label": "extends",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "rel-e2",
                "source": "cls-teacher",
                "target": "cls-person",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-e2",
                  "sourceId": "cls-teacher",
                  "targetId": "cls-person",
                  "type": "inheritance",
                  "label": "extends",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Inheritance establishes an IS-A relationship where child classes inherit parent state and behavior.",
            "whyIsItUsed": "Enables polymorphic reuse and behavioral specialization via method overriding.",
            "javaSyntax": "class Student extends Person { @Override void introduce() {} }",
            "howItWorks": "Child class inherits parent members; overridden methods replace parent vtable slots.",
            "visualRepresentation": "Hollow triangle inheritance connectors pointing toward the parent class Person.",
            "realWorldExample": "Employee hierarchy with Manager and Engineer inheriting from BaseEmployee.",
            "commonMistakes": "Attempting multiple class inheritance (Java only supports single class inheritance).",
            "challenge": "Add a field double salary to Teacher."
          }
        }
      ]
    },
    {
      "id": "01f-interfaces",
      "code": "01F",
      "title": "Interfaces and Implementation",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01f-payment",
          "title": "1. Payment Contract & Implementations",
          "level": "intermediate",
          "learningObjective": "Model abstract behavioral contracts using Java interfaces.",
          "javaSource": "interface Payment {\n    void pay(double amount);\n}\n\nclass UpiPayment implements Payment {\n    public void pay(double amount) {\n        System.out.println(\"UPI\");\n    }\n}\n\nclass CardPayment implements Payment {\n    public void pay(double amount) {\n        System.out.println(\"Card\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-payment",
                "type": "classNode",
                "position": {
                  "x": 440,
                  "y": 70
                },
                "data": {
                  "id": "iface-payment",
                  "entityType": "class",
                  "name": "Payment",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "pay",
                      "returnType": "void",
                      "visibility": "+",
                      "parameters": [
                        "double amount"
                      ],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Payment.java"
                }
              },
              {
                "id": "cls-upi",
                "type": "classNode",
                "position": {
                  "x": 260,
                  "y": 260
                },
                "data": {
                  "id": "cls-upi",
                  "entityType": "class",
                  "name": "UpiPayment",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m2",
                      "name": "pay",
                      "returnType": "void",
                      "visibility": "+",
                      "parameters": [
                        "double amount"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in UpiPayment.java"
                }
              },
              {
                "id": "cls-card",
                "type": "classNode",
                "position": {
                  "x": 620,
                  "y": 260
                },
                "data": {
                  "id": "cls-card",
                  "entityType": "class",
                  "name": "CardPayment",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m3",
                      "name": "pay",
                      "returnType": "void",
                      "visibility": "+",
                      "parameters": [
                        "double amount"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in CardPayment.java"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-i1",
                "source": "cls-upi",
                "target": "iface-payment",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-i1",
                  "sourceId": "cls-upi",
                  "targetId": "iface-payment",
                  "type": "implementation",
                  "label": "implements",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "rel-i2",
                "source": "cls-card",
                "target": "iface-payment",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-i2",
                  "sourceId": "cls-card",
                  "targetId": "iface-payment",
                  "type": "implementation",
                  "label": "implements",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An interface specifies a contract of method signatures that implementing classes must satisfy.",
            "whyIsItUsed": "Decouples service callers from concrete implementations, enabling pluggable architectures.",
            "javaSyntax": "interface Payment { void pay(double amt); }",
            "howItWorks": "Implementing classes must provide public bodies for all non-default interface methods.",
            "visualRepresentation": "Dashed cyan connectors with hollow triangles pointing to the interface.",
            "realWorldExample": "Pluggable payment processors (Stripe, PayPal, UPI) adhering to a PaymentGateway interface.",
            "commonMistakes": "Forgetting the public modifier on implemented interface methods.",
            "challenge": "Add a default method void printReceipt() to the Payment interface."
          }
        }
      ]
    },
    {
      "id": "01g-abstract-classes",
      "code": "01G",
      "title": "Abstract Classes",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01g-shape",
          "title": "1. Abstract Shape and Concrete Circle",
          "level": "intermediate",
          "learningObjective": "Distinguish abstract templates with incomplete method bodies.",
          "javaSource": "abstract class Shape {\n    abstract double area();\n\n    void describe() {\n        System.out.println(\"Shape\");\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n\n    @Override\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-shape",
                "type": "classNode",
                "position": {
                  "x": 400,
                  "y": 70
                },
                "data": {
                  "id": "cls-shape",
                  "entityType": "class",
                  "name": "Shape",
                  "classType": "abstract-class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "area",
                      "returnType": "double",
                      "visibility": "~",
                      "isAbstract": true,
                      "parameters": []
                    },
                    {
                      "id": "m2",
                      "name": "describe",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Shape.java"
                }
              },
              {
                "id": "cls-circle",
                "type": "classNode",
                "position": {
                  "x": 400,
                  "y": 260
                },
                "data": {
                  "id": "cls-circle",
                  "entityType": "class",
                  "name": "Circle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "radius",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m3",
                      "name": "area",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Circle.java"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-abs1",
                "source": "cls-circle",
                "target": "cls-shape",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-abs1",
                  "sourceId": "cls-circle",
                  "targetId": "cls-shape",
                  "type": "inheritance",
                  "label": "extends",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An abstract class cannot be instantiated directly and may contain abstract methods without bodies.",
            "whyIsItUsed": "Shares common state and partial implementations across specialized subclasses.",
            "javaSyntax": "abstract class Shape { abstract double area(); }",
            "howItWorks": "Subclasses must implement all inherited abstract methods or be declared abstract themselves.",
            "visualRepresentation": "Italicized abstract class header with designated abstract method badges.",
            "realWorldExample": "Game entity framework where Entity is abstract and Player / Monster are concrete.",
            "commonMistakes": "Attempting `new Shape()` which fails at compile time.",
            "challenge": "Add a Rectangle subclass implementing area()."
          }
        }
      ]
    },
    {
      "id": "01h-nested-classes",
      "code": "01H",
      "title": "Nested and Inner Classes",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01h-static-nested",
          "title": "1. Static Nested Class",
          "level": "advanced",
          "learningObjective": "Differentiate static nested classes from non-static inner classes.",
          "javaSource": "class Outer {\n    static class Nested {\n        void run() {\n            System.out.println(\"Static Nested\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-outer",
                "type": "classNode",
                "position": {
                  "x": 240,
                  "y": 100
                },
                "data": {
                  "id": "cls-outer",
                  "entityType": "class",
                  "name": "Outer",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Outer.java"
                }
              },
              {
                "id": "cls-nested",
                "type": "classNode",
                "position": {
                  "x": 580,
                  "y": 120
                },
                "data": {
                  "id": "cls-nested",
                  "entityType": "class",
                  "name": "Outer.Nested",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "run",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Outer.Nested.java"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sn",
                "source": "cls-nested",
                "target": "cls-outer",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sn",
                  "sourceId": "cls-nested",
                  "targetId": "cls-outer",
                  "type": "dependency",
                  "label": "static nested",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A static nested class is behaviorally a top-level class packaged inside another for naming scope.",
            "whyIsItUsed": "Does not require an enclosing outer instance to be instantiated.",
            "javaSyntax": "Outer.Nested n = new Outer.Nested();",
            "howItWorks": "Loaded independently without holding an implicit reference to an Outer instance.",
            "visualRepresentation": "Nested class node connected to Outer with static nesting connector.",
            "realWorldExample": "Map.Entry inside java.util.Map.",
            "commonMistakes": "Attempting to access non-static outer members from static nested classes.",
            "challenge": "Add a non-static member class Inner to compare."
          }
        }
      ]
    },
    {
      "id": "01i-generics-enums-records",
      "code": "01I",
      "title": "Generics, Enums and Records",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01i-all-modern",
          "title": "1. Generic Box, Status Enum & Point Record",
          "level": "advanced",
          "learningObjective": "Inspect modern Java types including Generics, Enums, and Records.",
          "javaSource": "class Box<T> {\n    private T value;\n    void set(T value) { this.value = value; }\n    T get() { return value; }\n}\n\nenum Status {\n    NEW, ACTIVE, CLOSED\n}\n\nrecord Point(int x, int y) {}\n",
          "diagram": {
            "nodes": [
              {
                "id": "cls-box",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 100
                },
                "data": {
                  "id": "cls-box",
                  "entityType": "class",
                  "name": "Box<T>",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "value",
                      "type": "T",
                      "visibility": "-"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "set",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": [
                        "T value"
                      ]
                    },
                    {
                      "id": "m2",
                      "name": "get",
                      "returnType": "T",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Box<T>.java"
                }
              },
              {
                "id": "cls-status",
                "type": "classNode",
                "position": {
                  "x": 500,
                  "y": 100
                },
                "data": {
                  "id": "cls-status",
                  "entityType": "class",
                  "name": "Status",
                  "classType": "enum",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f2",
                      "name": "NEW",
                      "type": "Status",
                      "visibility": "+",
                      "isStatic": true
                    },
                    {
                      "id": "f3",
                      "name": "ACTIVE",
                      "type": "Status",
                      "visibility": "+",
                      "isStatic": true
                    },
                    {
                      "id": "f4",
                      "name": "CLOSED",
                      "type": "Status",
                      "visibility": "+",
                      "isStatic": true
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Status.java"
                }
              },
              {
                "id": "cls-point",
                "type": "classNode",
                "position": {
                  "x": 780,
                  "y": 100
                },
                "data": {
                  "id": "cls-point",
                  "entityType": "class",
                  "name": "Point",
                  "classType": "record",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f5",
                      "name": "x",
                      "type": "int",
                      "visibility": "+"
                    },
                    {
                      "id": "f6",
                      "name": "y",
                      "type": "int",
                      "visibility": "+"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Point.java"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Modern Java constructs: Generics for compile-time type safety, Enums for finite constants, Records for immutable data carriers.",
            "whyIsItUsed": "Drastically cuts boilerplate and guarantees compile-time correctness.",
            "javaSyntax": "record Point(int x, int y) {}\nenum Status { NEW, ACTIVE }",
            "howItWorks": "Records auto-generate final fields, constructor, getters, equals, hashCode, and toString.",
            "visualRepresentation": "Distinct type badges for generic classes, enums, and records.",
            "realWorldExample": "DTOs, event states, and immutable coordinate models.",
            "commonMistakes": "Declaring mutable fields inside a Java Record.",
            "challenge": "Add a Status transition method boolean canActivate()."
          }
        }
      ]
    },
    {
      "id": "01j-class-dependencies",
      "code": "01J",
      "title": "Class Dependencies",
      "moduleId": "class-rep",
      "scenarios": [
        {
          "id": "01j-layered",
          "title": "1. Layered Architecture: Controller -> Service -> Repository",
          "level": "intermediate",
          "learningObjective": "Analyze field, parameter, and method invocation dependencies.",
          "javaSource": "class UserController {\n    UserService service;\n    void handle() { service.getUser(); }\n}\n\nclass UserService {\n    UserRepository repository;\n    User getUser() { return repository.find(); }\n}\n\nclass UserRepository {\n    User find() { return new User(); }\n}\n\nclass User {}\n",
          "diagram": {
            "nodes": [
              {
                "id": "cls-ctrl",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 120
                },
                "data": {
                  "id": "cls-ctrl",
                  "entityType": "class",
                  "name": "UserController",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "service",
                      "type": "UserService",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "handle",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in UserController.java"
                }
              },
              {
                "id": "cls-svc",
                "type": "classNode",
                "position": {
                  "x": 440,
                  "y": 120
                },
                "data": {
                  "id": "cls-svc",
                  "entityType": "class",
                  "name": "UserService",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f2",
                      "name": "repository",
                      "type": "UserRepository",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m2",
                      "name": "getUser",
                      "returnType": "User",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in UserService.java"
                }
              },
              {
                "id": "cls-repo",
                "type": "classNode",
                "position": {
                  "x": 740,
                  "y": 120
                },
                "data": {
                  "id": "cls-repo",
                  "entityType": "class",
                  "name": "UserRepository",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m3",
                      "name": "find",
                      "returnType": "User",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in UserRepository.java"
                }
              },
              {
                "id": "cls-user",
                "type": "classNode",
                "position": {
                  "x": 580,
                  "y": 300
                },
                "data": {
                  "id": "cls-user",
                  "entityType": "class",
                  "name": "User",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in User.java"
                }
              }
            ],
            "edges": [
              {
                "id": "dep-1",
                "source": "cls-ctrl",
                "target": "cls-svc",
                "type": "relationshipEdge",
                "data": {
                  "id": "dep-1",
                  "sourceId": "cls-ctrl",
                  "targetId": "cls-svc",
                  "type": "dependency",
                  "label": "delegates",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "dep-2",
                "source": "cls-svc",
                "target": "cls-repo",
                "type": "relationshipEdge",
                "data": {
                  "id": "dep-2",
                  "sourceId": "cls-svc",
                  "targetId": "cls-repo",
                  "type": "dependency",
                  "label": "delegates",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "dep-3",
                "source": "cls-repo",
                "target": "cls-user",
                "type": "relationshipEdge",
                "data": {
                  "id": "dep-3",
                  "sourceId": "cls-repo",
                  "targetId": "cls-user",
                  "type": "dependency",
                  "label": "creates",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "dep-4",
                "source": "cls-svc",
                "target": "cls-user",
                "type": "relationshipEdge",
                "data": {
                  "id": "dep-4",
                  "sourceId": "cls-svc",
                  "targetId": "cls-user",
                  "type": "dependency",
                  "label": "returns",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Class dependency occurs when one class refers to, creates, or delegates to another class type.",
            "whyIsItUsed": "Maps structural coupling across architectural layers.",
            "javaSyntax": "class UserController { UserService service; }",
            "howItWorks": "Dependencies can be field types, method parameter types, return types, or local instantiations.",
            "visualRepresentation": "Directional dashed dependency arrows with semantic labels.",
            "realWorldExample": "Three-tier web architecture (Web -> Business Logic -> Data Access).",
            "commonMistakes": "Creating cyclic dependencies (A -> B -> A).",
            "challenge": "Add a UserDTO returned by UserController."
          }
        }
      ]
    }
  ],
  "object-rep": [
    {
      "id": "02a-single-object",
      "code": "02A",
      "title": "Single Object Representation",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02a-s1",
          "title": "1. Single Student Instance on Heap",
          "level": "beginner",
          "learningObjective": "Visualize runtime allocation of a single heap object and its stack reference pointer.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\", 3.92);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 180,
                  "y": 140
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "3.92"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 340
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-s1",
                "source": "var-s1",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1",
                  "sourceId": "var-s1",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "inst-001",
                "source": "obj-001",
                "target": "cls-student",
                "type": "relationshipEdge",
                "data": {
                  "id": "inst-001",
                  "sourceId": "obj-001",
                  "targetId": "cls-student",
                  "type": "association",
                  "label": "instance of",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An object is a concrete instance of a class allocated in JVM Heap memory at runtime.",
            "whyIsItUsed": "Stores actual runtime state values independent of other instances.",
            "javaSyntax": "Student s1 = new Student(101, \"Alice\", 3.92);",
            "howItWorks": "new allocates contiguous bytes on the Heap, invokes the constructor, and returns a reference address to s1 on the Stack.",
            "visualRepresentation": "3-Tier Layout: Upper Stack frame holding s1, Middle Heap holding obj-001, Bottom Metaspace holding Student blueprint.",
            "realWorldExample": "Instantiating an Order object for an active shopping session.",
            "commonMistakes": "Thinking s1 holds the object itself (it only holds a reference pointer).",
            "challenge": "Change Alice's GPA to 3.98."
          }
        }
      ]
    },
    {
      "id": "02b-multiple-objects",
      "code": "02B",
      "title": "Multiple Objects",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02b-two-students",
          "title": "1. Two Independent Student Instances",
          "level": "beginner",
          "learningObjective": "Verify that two objects share the same class blueprint but maintain independent heap identities and field values.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\", 3.92);\n        Student s2 = new Student(102, \"Bob\", 3.45);\n    }\n}",
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
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
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
                  "variableValue": "obj-002",
                  "variableScope": "local",
                  "referenceTargetId": "obj-002",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s2"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 90
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "3.92"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "obj-002",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 230
                },
                "data": {
                  "id": "obj-002",
                  "entityType": "object",
                  "name": "obj-002",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "102",
                    "name": "\"Bob\"",
                    "gpa": "3.45"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "cls-student",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 410
                },
                "data": {
                  "id": "cls-student",
                  "entityType": "class",
                  "name": "Student",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "id",
                      "type": "int",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "name",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f3",
                      "name": "gpa",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE",
                  "provenanceOriginEvent": "Declared in Student.java"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-s1",
                "source": "var-s1",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1",
                  "sourceId": "var-s1",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-s2",
                "source": "var-s2",
                "target": "obj-002",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s2",
                  "sourceId": "var-s2",
                  "targetId": "obj-002",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "inst-1",
                "source": "obj-001",
                "target": "cls-student",
                "type": "relationshipEdge",
                "data": {
                  "id": "inst-1",
                  "sourceId": "obj-001",
                  "targetId": "cls-student",
                  "type": "association",
                  "label": "instance of",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              },
              {
                "id": "inst-2",
                "source": "obj-002",
                "target": "cls-student",
                "type": "relationshipEdge",
                "data": {
                  "id": "inst-2",
                  "sourceId": "obj-002",
                  "targetId": "cls-student",
                  "type": "association",
                  "label": "instance of",
                  "provenanceCategory": "STATIC ANALYSIS"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multiple instances created from one class possess independent lifetimes and separate heap memory allocations.",
            "whyIsItUsed": "Allows managing many independent entities (Alice and Bob) concurrently.",
            "javaSyntax": "Student s1 = new Student(101, \"Alice\", 3.92);\nStudent s2 = new Student(102, \"Bob\", 3.45);",
            "howItWorks": "Each new statement triggers a separate heap allocation with a unique memory address.",
            "visualRepresentation": "Two distinct object cards obj-001 and obj-002 with separate incoming reference arrows.",
            "realWorldExample": "Managing millions of distinct user accounts in a banking system.",
            "commonMistakes": "Merging two objects because they share the same class type.",
            "challenge": "Add a third student s3 = new Student(103, \"Charlie\", 3.88)."
          }
        }
      ]
    },
    {
      "id": "02c-aliasing",
      "code": "02C",
      "title": "Reference Aliasing",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02c-alias-mutation",
          "title": "1. Two Reference Variables Pointing to One Object",
          "level": "intermediate",
          "learningObjective": "Understand reference assignment (s2 = s1) and mutating through an alias.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\", 3.92);\n        Student s2 = s1;\n        Student s3 = s1;\n        s2.gpa = 4.0;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 90
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
                }
              },
              {
                "id": "var-s2",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 190
                },
                "data": {
                  "id": "var-s2",
                  "entityType": "variable",
                  "name": "s2",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s2"
                }
              },
              {
                "id": "var-s3",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 290
                },
                "data": {
                  "id": "var-s3",
                  "entityType": "variable",
                  "name": "s3",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s3"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 170
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "4.0"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-s1",
                "source": "var-s1",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1",
                  "sourceId": "var-s1",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-s2",
                "source": "var-s2",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s2",
                  "sourceId": "var-s2",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "alias to",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-s3",
                "source": "var-s3",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s3",
                  "sourceId": "var-s3",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "alias to",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Aliasing occurs when two or more reference variables hold the memory pointer to the same exact heap instance.",
            "whyIsItUsed": "Enables passing references to methods without cloning heavy objects.",
            "javaSyntax": "Student s2 = s1;\ns2.gpa = 4.0; // mutates obj-001",
            "howItWorks": "Assignment `s2 = s1` copies the 64-bit reference address, NOT the object data.",
            "visualRepresentation": "Three stack reference boxes all directing arrows to a single shared heap object card.",
            "realWorldExample": "Passing a shared database connection pool handle across multiple threads.",
            "commonMistakes": "Thinking `s2 = s1` creates a duplicate second object.",
            "challenge": "Reassign s2 = new Student(102, \"Bob\", 3.45) and observe s1 and s2 decouple."
          }
        }
      ]
    },
    {
      "id": "02d-null-references",
      "code": "02D",
      "title": "Null References",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02d-null-assignment",
          "title": "1. Reference Variable Holding Null",
          "level": "beginner",
          "learningObjective": "Understand null as the absence of a heap target address.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = null;\n        if (s1 == null) {\n            System.out.println(\"No object reference\");\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 240,
                  "y": 160
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "variableValue": "null",
                  "variableScope": "local",
                  "referenceTargetId": null,
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "null represents a literal value indicating a reference variable does not point to any heap object.",
            "whyIsItUsed": "Signifies uninitialized references, missing values, or disconnected targets.",
            "javaSyntax": "Student s1 = null;",
            "howItWorks": "A null reference stores 0x0; attempting to dereference it triggers NullPointerException.",
            "visualRepresentation": "A reference variable box displaying `null` with no outgoing connection arrow.",
            "realWorldExample": "Representing optional fields or empty linked list nodes.",
            "commonMistakes": "Drawing an object card for null (null is NOT an object).",
            "challenge": "Assign s1 = new Student(101, \"Alice\", 3.92) to see the reference hook up."
          }
        }
      ]
    },
    {
      "id": "02e-relationships",
      "code": "02E",
      "title": "Object Relationships & Heap References",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02e-student-course",
          "title": "1. Student Referencing Course Instance",
          "level": "intermediate",
          "learningObjective": "Trace object-to-object references held in instance fields.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Course c1 = new Course(\"CS101\", \"Intro to CS\");\n        Student s1 = new Student(101, \"Alice\");\n        s1.enrolledCourse = c1;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 100
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
                }
              },
              {
                "id": "var-c1",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 260
                },
                "data": {
                  "id": "var-c1",
                  "entityType": "variable",
                  "name": "c1",
                  "variableType": "Course",
                  "variableValue": "obj-002",
                  "variableScope": "local",
                  "referenceTargetId": "obj-002",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Course c1"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 460,
                  "y": 90
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "enrolledCourse": "obj-002"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "obj-002",
                "type": "objectNode",
                "position": {
                  "x": 460,
                  "y": 250
                },
                "data": {
                  "id": "obj-002",
                  "entityType": "object",
                  "name": "obj-002",
                  "className": "Course",
                  "instanceFieldValues": {
                    "code": "\"CS101\"",
                    "title": "\"Intro to CS\""
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Course() on Heap"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-s1",
                "source": "var-s1",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1",
                  "sourceId": "var-s1",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-c1",
                "source": "var-c1",
                "target": "obj-002",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-c1",
                  "sourceId": "var-c1",
                  "targetId": "obj-002",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-s1-c1",
                "source": "obj-001",
                "target": "obj-002",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1-c1",
                  "sourceId": "obj-001",
                  "targetId": "obj-002",
                  "type": "reference",
                  "label": "enrolledCourse",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An object field can store a reference pointer to another concrete heap object.",
            "whyIsItUsed": "Forms object graphs and associations (e.g. Student has an enrolled Course).",
            "javaSyntax": "s1.enrolledCourse = c1;",
            "howItWorks": "The field `enrolledCourse` inside obj-001 stores the memory pointer to obj-002.",
            "visualRepresentation": "Inter-object reference arrow originating directly from the `enrolledCourse` field slot.",
            "realWorldExample": "E-commerce Order holding a reference to a Customer object.",
            "commonMistakes": "Assuming object references automatically imply complete lifecycle ownership (composition).",
            "challenge": "Create a second student s2 also referencing c1 to show shared associations."
          }
        }
      ]
    },
    {
      "id": "02f-arrays",
      "code": "02F",
      "title": "Arrays of Objects",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02f-student-array",
          "title": "1. Student Array with Active and Null Elements",
          "level": "intermediate",
          "learningObjective": "Understand that an array of objects is an array of references, not an array of objects inline.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student[] students = new Student[3];\n        students[0] = new Student(101, \"Alice\", 3.92);\n        students[1] = null;\n        students[2] = new Student(102, \"Bob\", 3.45);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-arr",
                "type": "variableNode",
                "position": {
                  "x": 140,
                  "y": 160
                },
                "data": {
                  "id": "var-arr",
                  "entityType": "variable",
                  "name": "students",
                  "variableType": "Student[]",
                  "variableValue": "arr-001",
                  "variableScope": "local",
                  "referenceTargetId": "arr-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student[] students"
                }
              },
              {
                "id": "arr-001",
                "type": "arrayNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "arr-001",
                  "entityType": "array",
                  "name": "students[]",
                  "arrayLength": 3,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "obj-001",
                      "isHighlighted": true
                    },
                    {
                      "index": 1,
                      "value": "null",
                      "isHighlighted": false
                    },
                    {
                      "index": 2,
                      "value": "obj-002",
                      "isHighlighted": true
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 740,
                  "y": 80
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "3.92"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "obj-002",
                "type": "objectNode",
                "position": {
                  "x": 740,
                  "y": 240
                },
                "data": {
                  "id": "obj-002",
                  "entityType": "object",
                  "name": "obj-002",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "102",
                    "name": "\"Bob\"",
                    "gpa": "3.45"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-arr",
                "source": "var-arr",
                "target": "arr-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-arr",
                  "sourceId": "var-arr",
                  "targetId": "arr-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cell-0",
                "source": "arr-001",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "cell-0",
                  "sourceId": "arr-001",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "[0] -> obj-001",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cell-2",
                "source": "arr-001",
                "target": "obj-002",
                "type": "relationshipEdge",
                "data": {
                  "id": "cell-2",
                  "sourceId": "arr-001",
                  "targetId": "obj-002",
                  "type": "reference",
                  "label": "[2] -> obj-002",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "In Java, an object array stores reference pointers to heap instances, NOT the objects themselves.",
            "whyIsItUsed": "Allows arrays to store null values, polymorphic instances, or shared aliases.",
            "javaSyntax": "Student[] students = new Student[3];",
            "howItWorks": "The array instance itself is allocated on the Heap with indexed reference slots initialized to null.",
            "visualRepresentation": "An array block node with numbered index cells pointing to independent heap object cards.",
            "realWorldExample": "Maintaining student rosters or indexed queues in memory.",
            "commonMistakes": "Thinking `new Student[3]` allocates 3 Student objects automatically.",
            "challenge": "Populate students[1] = new Student(103, \"Charlie\", 3.88)."
          }
        }
      ]
    },
    {
      "id": "02g-mutations",
      "code": "02G",
      "title": "Object State Changes & Mutations",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02g-field-mutation",
          "title": "1. GPA Mutation through Direct Field Write",
          "level": "beginner",
          "learningObjective": "Track how field assignments mutate heap state while preserving object identity.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\", 3.92);\n        s1.gpa = 4.0; // Mutates obj-001\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-s1",
                "type": "variableNode",
                "position": {
                  "x": 180,
                  "y": 140
                },
                "data": {
                  "id": "var-s1",
                  "entityType": "variable",
                  "name": "s1",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student s1"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "4.0 (was 3.92)"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-s1",
                "source": "var-s1",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-s1",
                  "sourceId": "var-s1",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "State mutation changes the values stored inside heap object field slots.",
            "whyIsItUsed": "Reflects real-world state transitions over program execution time.",
            "javaSyntax": "s1.gpa = 4.0;",
            "howItWorks": "Overwrites the 64-bit double slot for gpa inside obj-001; obj-001's identity remains unchanged.",
            "visualRepresentation": "Highlighted field compartment indicating mutated value and provenance history.",
            "realWorldExample": "Updating bank account balance upon completing a transaction.",
            "commonMistakes": "Thinking changing a field creates a new object.",
            "challenge": "Mutate s1.name = \"Alice Smith\"."
          }
        }
      ]
    },
    {
      "id": "02h-identity-equality",
      "code": "02H",
      "title": "Identity vs Equality (== vs equals)",
      "moduleId": "object-rep",
      "scenarios": [
        {
          "id": "02h-comparison",
          "title": "1. Two Objects with Identical Values: == vs equals()",
          "level": "intermediate",
          "learningObjective": "Distinguish reference identity comparison (==) from state equality comparison (equals).",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        Student a = new Student(101, \"Alice\", 3.92);\n        Student b = new Student(101, \"Alice\", 3.92);\n\n        boolean idEqual = (a == b);       // false\n        boolean valEqual = a.equals(b);   // true (custom equals)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "var-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "Student",
                  "variableValue": "obj-001",
                  "variableScope": "local",
                  "referenceTargetId": "obj-001",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student a"
                }
              },
              {
                "id": "var-b",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 260
                },
                "data": {
                  "id": "var-b",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "Student",
                  "variableValue": "obj-002",
                  "variableScope": "local",
                  "referenceTargetId": "obj-002",
                  "provenanceCategory": "STATIC ANALYSIS",
                  "provenanceOriginEvent": "Local variable Student b"
                }
              },
              {
                "id": "obj-001",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 90
                },
                "data": {
                  "id": "obj-001",
                  "entityType": "object",
                  "name": "obj-001",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "3.92"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              },
              {
                "id": "obj-002",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 250
                },
                "data": {
                  "id": "obj-002",
                  "entityType": "object",
                  "name": "obj-002",
                  "className": "Student",
                  "instanceFieldValues": {
                    "id": "101",
                    "name": "\"Alice\"",
                    "gpa": "3.92"
                  },
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME",
                  "provenanceOriginEvent": "Allocated via new Student() on Heap"
                }
              }
            ],
            "edges": [
              {
                "id": "ref-a",
                "source": "var-a",
                "target": "obj-001",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-a",
                  "sourceId": "var-a",
                  "targetId": "obj-001",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "ref-b",
                "source": "var-b",
                "target": "obj-002",
                "type": "relationshipEdge",
                "data": {
                  "id": "ref-b",
                  "sourceId": "var-b",
                  "targetId": "obj-002",
                  "type": "reference",
                  "label": "references",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "`==` compares reference addresses (identity), while `.equals()` evaluates semantic field values (equality).",
            "whyIsItUsed": "Crucial for collections, sets, and map lookups in Java.",
            "javaSyntax": "boolean eq = (a == b); // false (distinct heap objects)",
            "howItWorks": "`a == b` compares pointer addresses 0x01 vs 0x02; `equals()` inspects matching id/name/gpa fields.",
            "visualRepresentation": "Two distinct object cards with identical field values but separate identities.",
            "realWorldExample": "Comparing two matching ID passports issued to the same person.",
            "commonMistakes": "Using `==` to compare Strings or domain entities.",
            "challenge": "Set a = b and verify (a == b) becomes true."
          }
        }
      ]
    }
  ],
  "method-rep": [
    {
      "id": "03a-signature",
      "code": "03A",
      "title": "Method Declaration and Signature",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03a-s1",
          "title": "1. Signature & Parameters",
          "level": "beginner",
          "learningObjective": "Inspect method return type, name, and parameter list.",
          "javaSource": "public class Calculator {\n    public double calculate(double price, int quantity) {\n        return price * quantity;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-calc-m",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-calc-m",
                  "entityType": "class",
                  "name": "Calculator",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m1",
                      "name": "calculate",
                      "returnType": "double",
                      "visibility": "+",
                      "parameters": [
                        "double price",
                        "int quantity"
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
            "whatIsIt": "A method signature consists of the method name and parameter types.",
            "whyIsItUsed": "Defines the exact callable contract.",
            "javaSyntax": "public double calculate(double price, int quantity)",
            "howItWorks": "Stored in Metaspace bytecode definition.",
            "visualRepresentation": "UML method signature in class card.",
            "realWorldExample": "Invoice calculation.",
            "commonMistakes": "Confusing return type as part of signature.",
            "challenge": "Add a tax parameter."
          }
        }
      ]
    },
    {
      "id": "03b-static-instance",
      "code": "03B",
      "title": "Instance and Static Methods",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03b-s1",
          "title": "1. Instance vs Static Method Invocation",
          "level": "intermediate",
          "learningObjective": "Distinguish between static class methods and instance-bound methods.",
          "javaSource": "class MathUtil {\n    static double pi = 3.14159;\n    static double square(double x) { return x * x; }\n    double multiply(double a, double b) { return a * b; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-math-util",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 80
                },
                "data": {
                  "id": "cls-math-util",
                  "entityType": "class",
                  "name": "MathUtil",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "pi",
                      "type": "double",
                      "isStatic": true,
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-sq",
                      "name": "square",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": [
                        "double x"
                      ],
                      "isStatic": true
                    },
                    {
                      "id": "m-mult",
                      "name": "multiply",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": [
                        "double a",
                        "double b"
                      ],
                      "isStatic": false
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Static methods belong to the class; instance methods operate on object state.",
            "whyIsItUsed": "Statics for utility functions, instance methods for object state manipulation.",
            "javaSyntax": "static double square(double x) { ... }",
            "howItWorks": "Static calls bypass 'this' pointer; instance calls pass 'this' implicitly.",
            "visualRepresentation": "Static methods underlined in class card.",
            "realWorldExample": "Math.sqrt() vs String.toLowerCase().",
            "commonMistakes": "Accessing instance variables inside static methods.",
            "challenge": "Try referencing an instance field inside square()."
          }
        }
      ]
    },
    {
      "id": "03c-parameters",
      "code": "03C",
      "title": "Parameters and Pass-by-Value",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03c-s1",
          "title": "1. Primitive vs Reference Pass-by-Value",
          "level": "intermediate",
          "learningObjective": "Observe that Java passes exact copies of bits (values and pointers).",
          "javaSource": "class ParameterDemo {\n    void modify(int x, StringBuilder sb) {\n        x = 99;\n        sb.append(\" World\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-caller",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-caller",
                  "entityType": "stack-frame",
                  "name": "modify(int, StringBuilder)",
                  "frameId": "frame-02",
                  "localVariables": {
                    "x": "99",
                    "sb": "ref@0x4A2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-sb",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-sb",
                  "entityType": "object",
                  "className": "StringBuilder",
                  "simulatorAddress": "0x4A2",
                  "instanceFieldValues": {
                    "value": "\"Hello World\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sb-ref",
                "source": "sf-caller",
                "target": "obj-sb",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sb-ref",
                  "type": "reference",
                  "label": "sb pointer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Java is strictly pass-by-value: passing an object passes a copy of its 64-bit reference.",
            "whyIsItUsed": "Ensures consistent stack frame isolation.",
            "javaSyntax": "void modify(int x, StringBuilder sb)",
            "howItWorks": "Caller's primitive variable remains unchanged; object state mutates via shared reference.",
            "visualRepresentation": "Stack frame local variable slot pointing to heap object.",
            "realWorldExample": "Handing someone a key to your house vs handing them a photocopy of a document.",
            "commonMistakes": "Thinking Java is pass-by-reference because object mutations persist.",
            "challenge": "Reassign `sb = new StringBuilder()` inside modify and observe caller."
          }
        }
      ]
    },
    {
      "id": "03d-return-types",
      "code": "03D",
      "title": "Return Types and Void",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03d-s1",
          "title": "1. Value Return vs Void Flow",
          "level": "beginner",
          "learningObjective": "Track how return values flow from callee stack frame to caller.",
          "javaSource": "class OrderProcessor {\n    int computeTotal(int subtotal, int tax) {\n        return subtotal + tax;\n    }\n    void printStatus() {\n        System.out.println(\"Completed\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-order-proc",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-order-proc",
                  "entityType": "class",
                  "name": "OrderProcessor",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-tot",
                      "name": "computeTotal",
                      "returnType": "int",
                      "visibility": "~",
                      "parameters": [
                        "int subtotal",
                        "int tax"
                      ]
                    },
                    {
                      "id": "m-prn",
                      "name": "printStatus",
                      "returnType": "void",
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
            "whatIsIt": "Return type specifies the data type of the result yielded back to caller.",
            "whyIsItUsed": "Enables functional composition and output propagation.",
            "javaSyntax": "int computeTotal(int subtotal, int tax)",
            "howItWorks": "Result placed in caller operand stack; frame popped.",
            "visualRepresentation": "Return arrow back to calling frame.",
            "realWorldExample": "Cash register returning receipt and total.",
            "commonMistakes": "Missing return statement in non-void method.",
            "challenge": "Change return type to double and return decimal total."
          }
        }
      ]
    },
    {
      "id": "03e-overloading",
      "code": "03E",
      "title": "Method Overloading (Compile-Time)",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03e-s1",
          "title": "1. Static Polymorphism / Overloading",
          "level": "intermediate",
          "learningObjective": "Observe how compiler resolves overloaded methods via parameter types.",
          "javaSource": "class Printer {\n    void print(String msg) { System.out.println(msg); }\n    void print(int num) { System.out.println(num); }\n    void print(String msg, int repeats) { /* ... */ }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-printer",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 90
                },
                "data": {
                  "id": "cls-printer",
                  "entityType": "class",
                  "name": "Printer",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-p1",
                      "name": "print",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": [
                        "String msg"
                      ]
                    },
                    {
                      "id": "m-p2",
                      "name": "print",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": [
                        "int num"
                      ]
                    },
                    {
                      "id": "m-p3",
                      "name": "print",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": [
                        "String msg",
                        "int repeats"
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
            "whatIsIt": "Multiple methods in same class with identical names but differing parameter signatures.",
            "whyIsItUsed": "Provides uniform API for operations on diverse data types.",
            "javaSyntax": "void print(String msg) vs void print(int num)",
            "howItWorks": "Resolved at compile-time by matching call argument types.",
            "visualRepresentation": "Multiple method rows in single class node with distinct parameter badges.",
            "realWorldExample": "System.out.println(anyType).",
            "commonMistakes": "Believing changing only return type overloads a method (it causes compile error).",
            "challenge": "Overload print with boolean flag."
          }
        }
      ]
    },
    {
      "id": "03f-overriding",
      "code": "03F",
      "title": "Method Overriding and Dynamic Dispatch",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03f-s1",
          "title": "1. Virtual Method Table & Dynamic Dispatch",
          "level": "advanced",
          "learningObjective": "Observe runtime polymorphic method dispatch via Virtual Method Table (vtable).",
          "javaSource": "class Animal {\n    void speak() { System.out.println(\"Generic sound\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Bark!\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-animal",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 80
                },
                "data": {
                  "id": "cls-animal",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-a-speak",
                      "name": "speak",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 80
                },
                "data": {
                  "id": "cls-dog",
                  "entityType": "class",
                  "name": "Dog",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-d-speak",
                      "name": "speak",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dog-ext-animal",
                "source": "cls-dog",
                "target": "cls-animal",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-ext-animal",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Subclass provides specific implementation of method declared in superclass.",
            "whyIsItUsed": "Enables runtime polymorphism and behavioral extensibility.",
            "javaSyntax": "@Override void speak() { ... }",
            "howItWorks": "JVM looks up actual runtime class pointer in object header; invokes via vtable index.",
            "visualRepresentation": "Inheritance arrow connecting subclass to superclass with matching method highlighted.",
            "realWorldExample": "Vehicle speed calculation by specific Car or Train model.",
            "commonMistakes": "Overriding private or static methods (they cannot be overridden).",
            "challenge": "Add a Cat subclass overriding speak() with Meow."
          }
        }
      ]
    },
    {
      "id": "03g-abstract-methods",
      "code": "03G",
      "title": "Abstract Methods and Contract Enforcement",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03g-s1",
          "title": "1. Abstract Method Signature Contract",
          "level": "intermediate",
          "learningObjective": "Understand method contracts without body that enforce concrete implementation.",
          "javaSource": "abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double radius = 5.0;\n    double area() { return Math.PI * radius * radius; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-shape",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 80
                },
                "data": {
                  "id": "cls-shape",
                  "entityType": "class",
                  "name": "Shape",
                  "classType": "abstract",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-sh-area",
                      "name": "area",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": [],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-circle",
                "type": "classNode",
                "position": {
                  "x": 500,
                  "y": 80
                },
                "data": {
                  "id": "cls-circle",
                  "entityType": "class",
                  "name": "Circle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-rad",
                      "name": "radius",
                      "type": "double",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-ci-area",
                      "name": "area",
                      "returnType": "double",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-circ-ext-shape",
                "source": "cls-circle",
                "target": "cls-shape",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-circ-ext-shape",
                  "type": "extends",
                  "label": "extends",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A method declaration with no body, forcing subclasses to provide implementation.",
            "whyIsItUsed": "Guarantees polymorphic interface while leaving details to subclasses.",
            "javaSyntax": "abstract double area();",
            "howItWorks": "Class marked abstract; compiler errors if concrete subclass fails to implement.",
            "visualRepresentation": "Italicized method name in abstract class card.",
            "realWorldExample": "PaymentGateway.processPayment() implemented by Stripe or PayPal.",
            "commonMistakes": "Attempting to instantiate an abstract class.",
            "challenge": "Add Rectangle subclass implementing area()."
          }
        }
      ]
    },
    {
      "id": "03h-recursion",
      "code": "03H",
      "title": "Recursive Methods",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03h-s1",
          "title": "1. Call Stack Depth in Recursion",
          "level": "intermediate",
          "learningObjective": "Track stack frame creation and termination condition in recursive calls.",
          "javaSource": "class Factorial {\n    int fact(int n) {\n        if (n <= 1) return 1;\n        return n * fact(n - 1);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-fact3",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 60
                },
                "data": {
                  "id": "sf-fact3",
                  "entityType": "stack-frame",
                  "name": "fact(3)",
                  "frameId": "frame-03",
                  "localVariables": {
                    "n": "3"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-fact2",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 180
                },
                "data": {
                  "id": "sf-fact2",
                  "entityType": "stack-frame",
                  "name": "fact(2)",
                  "frameId": "frame-02",
                  "localVariables": {
                    "n": "2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-fact1",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 300
                },
                "data": {
                  "id": "sf-fact1",
                  "entityType": "stack-frame",
                  "name": "fact(1)",
                  "frameId": "frame-01",
                  "localVariables": {
                    "n": "1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-c1",
                "source": "sf-fact3",
                "target": "sf-fact2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c1",
                  "type": "call",
                  "label": "calls fact(2)",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-c2",
                "source": "sf-fact2",
                "target": "sf-fact1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c2",
                  "type": "call",
                  "label": "calls fact(1)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A method that calls itself with updated parameters until reaching a base condition.",
            "whyIsItUsed": "Solves divide-and-conquer problems like tree traversal and combinatorics.",
            "javaSyntax": "int fact(int n) { if (n <= 1) return 1; return n * fact(n-1); }",
            "howItWorks": "Each invocation pushes an independent stack frame with its own local variables.",
            "visualRepresentation": "Vertical stack of frame cards linked by invocation arrows.",
            "realWorldExample": "Navigating folders within nested folders.",
            "commonMistakes": "Omitting the base case, leading to StackOverflowError.",
            "challenge": "Add base case condition checking for negative inputs."
          }
        }
      ]
    },
    {
      "id": "03i-generics",
      "code": "03I",
      "title": "Generic Methods and Type Erasure",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03i-s1",
          "title": "1. Generic Parameterized Method",
          "level": "advanced",
          "learningObjective": "Inspect compile-time type parameter validation and bytecode type erasure.",
          "javaSource": "class DataHolder {\n    public <T> T getFirst(T[] items) {\n        if (items.length > 0) return items[0];\n        return null;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-data-holder",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-data-holder",
                  "entityType": "class",
                  "name": "DataHolder",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-gf",
                      "name": "<T> getFirst",
                      "returnType": "T",
                      "visibility": "+",
                      "parameters": [
                        "T[] items"
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
            "whatIsIt": "Methods that introduce their own type parameters scoped to method execution.",
            "whyIsItUsed": "Provides compile-time type safety across heterogeneous types without casting.",
            "javaSyntax": "public <T> T getFirst(T[] items)",
            "howItWorks": "Compiler checks type bounds and erases T to Object in generated bytecode.",
            "visualRepresentation": "Generic type badge <T> in method signature.",
            "realWorldExample": "Collections.sort() or Arrays.asList().",
            "commonMistakes": "Attempting `new T()` inside generic method body.",
            "challenge": "Add a type bound `<T extends Comparable<T>>`."
          }
        }
      ]
    },
    {
      "id": "03j-varargs",
      "code": "03J",
      "title": "Varargs and Lambda Expressions",
      "moduleId": "method-rep",
      "scenarios": [
        {
          "id": "03j-s1",
          "title": "1. Varargs Array Desugaring & Lambda Functional Interface",
          "level": "intermediate",
          "learningObjective": "Understand how compiler transforms varargs into array arguments and lambdas into functional objects.",
          "javaSource": "class Util {\n    static int sum(int... numbers) {\n        int s = 0;\n        for (int n : numbers) s += n;\n        return s;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-util-varargs",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-util-varargs",
                  "entityType": "class",
                  "name": "Util",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-sum",
                      "name": "sum",
                      "returnType": "int",
                      "visibility": "~",
                      "parameters": [
                        "int... numbers"
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
            "whatIsIt": "Varargs allows passing arbitrary number of arguments; compiler packages them as an array.",
            "whyIsItUsed": "Eliminates boilerplate array instantiation at call sites.",
            "javaSyntax": "static int sum(int... numbers)",
            "howItWorks": "JVM receives an `int[]` bytecode parameter.",
            "visualRepresentation": "Varargs indicator `...` in parameter list.",
            "realWorldExample": "String.format(\"%s %d\", name, age).",
            "commonMistakes": "Placing varargs parameter anywhere other than the last position.",
            "challenge": "Invoke sum() with 0, 1, and 4 arguments."
          }
        }
      ]
    }
  ],
  "method-call-stack": [
    {
      "id": "04a-single-call",
      "code": "04A",
      "title": "Single Method Invocation",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04a-s1",
          "title": "1. Main to Helper Stack Push",
          "level": "beginner",
          "learningObjective": "Observe pushing a new frame to the call stack upon method call.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        greet();\n    }\n    static void greet() {\n        System.out.println(\"Hello\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-main",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 240
                },
                "data": {
                  "id": "sf-main",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "args": "ref[]"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-greet",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 80
                },
                "data": {
                  "id": "sf-greet",
                  "entityType": "stack-frame",
                  "name": "greet()",
                  "frameId": "frame-02",
                  "localVariables": {},
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-call-greet",
                "source": "sf-main",
                "target": "sf-greet",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-call-greet",
                  "type": "call",
                  "label": "invokes greet()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "When a method is called, a new stack frame is pushed onto the thread call stack.",
            "whyIsItUsed": "Stores local state, return address, and parameters isolated from other frames.",
            "javaSyntax": "greet();",
            "howItWorks": "invokestatic / invokevirtual allocates frame memory on JVM stack.",
            "visualRepresentation": "Stack frame node positioned vertically above caller.",
            "realWorldExample": "Putting a new plate on top of a stack of plates.",
            "commonMistakes": "Assuming local variables persist after frame pop.",
            "challenge": "Step into greet() and observe frame creation."
          }
        }
      ]
    },
    {
      "id": "04b-nested-calls",
      "code": "04B",
      "title": "Nested Method Calls",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04b-s1",
          "title": "1. 3-Level Call Chain (A -> B -> C)",
          "level": "intermediate",
          "learningObjective": "Track stack depth and execution order in nested method invocations.",
          "javaSource": "class Chain {\n    void a() { b(); }\n    void b() { c(); }\n    void c() { System.out.println(\"Deepest\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-a",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 320
                },
                "data": {
                  "id": "sf-a",
                  "entityType": "stack-frame",
                  "name": "a()",
                  "frameId": "frame-01",
                  "localVariables": {},
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-b",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 190
                },
                "data": {
                  "id": "sf-b",
                  "entityType": "stack-frame",
                  "name": "b()",
                  "frameId": "frame-02",
                  "localVariables": {},
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-c",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 60
                },
                "data": {
                  "id": "sf-c",
                  "entityType": "stack-frame",
                  "name": "c()",
                  "frameId": "frame-03",
                  "localVariables": {},
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-b",
                "source": "sf-a",
                "target": "sf-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-b",
                  "type": "call",
                  "label": "calls b()",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-c",
                "source": "sf-b",
                "target": "sf-c",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-c",
                  "type": "call",
                  "label": "calls c()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Nested calls occur when one method calls another before completing.",
            "whyIsItUsed": "Allows modular decomposition of tasks.",
            "javaSyntax": "a() calls b() which calls c()",
            "howItWorks": "LIFO execution: deepest frame c() must complete before b(), and b() before a().",
            "visualRepresentation": "Linear stack of 3 frames with upward arrows.",
            "realWorldExample": "Delegating tasks down a corporate hierarchy.",
            "commonMistakes": "Believing outer frame executes concurrently with inner frame.",
            "challenge": "Trace the order of completion as frames pop."
          }
        }
      ]
    },
    {
      "id": "04c-lifecycle",
      "code": "04C",
      "title": "Stack Frame Lifecycle (Push / Pop)",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04c-s1",
          "title": "1. Push on Invoke & Pop on Return",
          "level": "intermediate",
          "learningObjective": "Observe deallocation of stack memory upon return statement.",
          "javaSource": "class FrameLifecycle {\n    void execute() {\n        int temp = calculate();\n        // calculate frame is now popped\n    }\n    int calculate() { return 42; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-exec",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 200
                },
                "data": {
                  "id": "sf-exec",
                  "entityType": "stack-frame",
                  "name": "execute()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "temp": "42"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A stack frame exists solely during method execution; it is destroyed immediately upon return.",
            "whyIsItUsed": "Instantly frees thread execution memory without GC overhead.",
            "javaSyntax": "return 42;",
            "howItWorks": "JVM stack pointer decrements; local variable table is reclaimed.",
            "visualRepresentation": "Active stack frame with captured return value.",
            "realWorldExample": "Tearing off a scratchpad page after finishing a calculation.",
            "commonMistakes": "Expecting local variables to retain values across method calls.",
            "challenge": "Add a second helper call and watch the stack grow and shrink."
          }
        }
      ]
    },
    {
      "id": "04d-scoping",
      "code": "04D",
      "title": "Local Variable Scoping",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04d-s1",
          "title": "1. Block Scope vs Method Scope",
          "level": "beginner",
          "learningObjective": "Understand variable lifetimes inside if/for blocks.",
          "javaSource": "class Scoping {\n    void test() {\n        int x = 10;\n        if (x > 5) {\n            int y = 20; // Scoped to if-block\n        }\n        // y is not accessible here\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-scope",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 140
                },
                "data": {
                  "id": "sf-scope",
                  "entityType": "stack-frame",
                  "name": "test()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "x": "10",
                    "y (block-scoped)": "20"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Variables declared inside a block {} are accessible only within that block.",
            "whyIsItUsed": "Prevents accidental variable reuse and bugs.",
            "javaSyntax": "if (x > 5) { int y = 20; }",
            "howItWorks": "Slot in LocalVariableTable can be reused by compiler after block ends.",
            "visualRepresentation": "Stack frame local variable slot table.",
            "realWorldExample": "A temporary room reservation during an event.",
            "commonMistakes": "Trying to access block variables outside their enclosing braces.",
            "challenge": "Move `int y` outside the if-statement."
          }
        }
      ]
    },
    {
      "id": "04e-return-passing",
      "code": "04E",
      "title": "Return Value Passing",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04e-s1",
          "title": "1. Transferring Return Value across Frames",
          "level": "intermediate",
          "learningObjective": "Track value transfer from callee operand stack to caller local variable.",
          "javaSource": "class MathService {\n    int add(int a, int b) { return a + b; }\n    void run() {\n        int res = add(10, 25);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-run",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 240
                },
                "data": {
                  "id": "sf-run",
                  "entityType": "stack-frame",
                  "name": "run()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "res": "35"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-add",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 80
                },
                "data": {
                  "id": "sf-add",
                  "entityType": "stack-frame",
                  "name": "add(10, 25)",
                  "frameId": "frame-02",
                  "localVariables": {
                    "a": "10",
                    "b": "25",
                    "RETURN": "35"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ret-val",
                "source": "sf-add",
                "target": "sf-run",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ret-val",
                  "type": "reference",
                  "label": "returns 35",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "When callee completes, its return value is pushed onto the caller's operand stack.",
            "whyIsItUsed": "Allows methods to produce mathematical and logical results.",
            "javaSyntax": "return a + b;",
            "howItWorks": "ireturn / areturn bytecode instruction transfers value across frames.",
            "visualRepresentation": "Downward return arrow carrying computed value.",
            "realWorldExample": "Courier returning signed document to sender.",
            "commonMistakes": "Ignoring return value of pure functions.",
            "challenge": "Return an object reference instead of primitive."
          }
        }
      ]
    },
    {
      "id": "04f-primitive-vs-ref-args",
      "code": "04F",
      "title": "Primitive vs Reference Arguments on Stack",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04f-s1",
          "title": "1. Stack Slot Bit Storage (Value vs Pointer)",
          "level": "intermediate",
          "learningObjective": "Observe primitive bit values stored directly in frame vs 64-bit reference address.",
          "javaSource": "class StackStorage {\n    void execute() {\n        int count = 7;\n        String name = \"Java\";\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-storage",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-storage",
                  "entityType": "stack-frame",
                  "name": "execute()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "count": "7 (raw 32-bit int)",
                    "name": "ref@0x89F"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-str",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-str",
                  "entityType": "object",
                  "className": "String",
                  "simulatorAddress": "0x89F",
                  "instanceFieldValues": {
                    "value": "\"Java\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-name-ptr",
                "source": "sf-storage",
                "target": "obj-str",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-name-ptr",
                  "type": "reference",
                  "label": "points to 0x89F",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Primitives live entirely in the stack frame; reference variables hold only a pointer.",
            "whyIsItUsed": "Stack is fast, cache-friendly; Heap holds variable-size object payloads.",
            "javaSyntax": "int count = 7; String name = \"Java\";",
            "howItWorks": "Stack slot for primitive stores literal bits; slot for reference stores address.",
            "visualRepresentation": "Stack frame node with reference pointer pointing to Heap object.",
            "realWorldExample": "Holding cash in your pocket vs holding a bank account debit card.",
            "commonMistakes": "Assuming `String s = \"x\"` puts the string characters in the stack frame.",
            "challenge": "Add a `double` variable occupying 2 local variable slots."
          }
        }
      ]
    },
    {
      "id": "04g-stack-overflow",
      "code": "04G",
      "title": "Stack Overflow Error",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04g-s1",
          "title": "1. Exceeding JVM Stack Memory Limits",
          "level": "advanced",
          "learningObjective": "Visualize how unbounded recursion exhausts the thread stack memory.",
          "javaSource": "class Infinite {\n    static void recurse() {\n        recurse(); // No base case\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-rec1",
                "type": "stackFrameNode",
                "position": {
                  "x": 340,
                  "y": 470
                },
                "data": {
                  "id": "sf-rec1",
                  "entityType": "stack-frame",
                  "name": "recurse() Frame #1 [Initial Call]",
                  "frameId": "frame-01",
                  "isTopFrame": false,
                  "callerFrameId": "main()",
                  "localVariables": {
                    "depth": "1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-rec-group",
                "type": "stackFrameNode",
                "position": {
                  "x": 330,
                  "y": 255
                },
                "data": {
                  "id": "sf-rec-group",
                  "entityType": "stack-frame",
                  "name": "recurse()",
                  "isRecursiveGroup": true,
                  "collapsedCount": 1022,
                  "callerFrameId": "recurse() #1",
                  "isTopFrame": false,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-rec-boundary",
                "type": "stackFrameNode",
                "position": {
                  "x": 320,
                  "y": 175
                },
                "data": {
                  "id": "sf-rec-boundary",
                  "entityType": "stack-frame",
                  "isOverflowBoundary": true,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-recN",
                "type": "stackFrameNode",
                "position": {
                  "x": 340,
                  "y": 35
                },
                "data": {
                  "id": "sf-recN",
                  "entityType": "stack-frame",
                  "name": "recurse() Frame #1024 [LIMIT EXCEEDED]",
                  "frameId": "frame-MAX",
                  "isTopFrame": true,
                  "isOverflow": true,
                  "callerFrameId": "recurse() #1023",
                  "localVariables": {
                    "depth": "1024",
                    "error": "StackOverflowError"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-so-1",
                "source": "sf-rec1",
                "target": "sf-rec-group",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-so-1",
                  "type": "call",
                  "label": "invokes ×1,022",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-so-N",
                "source": "sf-rec-group",
                "target": "sf-recN",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-so-N",
                  "type": "call",
                  "label": "exhausts thread capacity",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "StackOverflowError is thrown when thread execution creates more frames than stack capacity (-Xss).",
            "whyIsItUsed": "Protects OS memory from runaway infinite recursion.",
            "javaSyntax": "static void recurse() { recurse(); }",
            "howItWorks": "Stack depth exceeds limit; HotSpot JVM throws java.lang.StackOverflowError.",
            "visualRepresentation": "Deep stack of red warning frames terminating at boundary.",
            "realWorldExample": "Stacking cafeteria trays until hitting the ceiling.",
            "commonMistakes": "Assuming garbage collection cleans up stack frames (GC only cleans Heap).",
            "challenge": "Add a termination base condition `if (count > 10) return;`."
          }
        }
      ]
    },
    {
      "id": "04h-unwinding",
      "code": "04H",
      "title": "Recursive Stack Unwinding",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04h-s1",
          "title": "1. Base Case Reached & Frames Popped in Reverse",
          "level": "intermediate",
          "learningObjective": "Observe unwinding where values are accumulated backwards as frames pop.",
          "javaSource": "class Countdown {\n    static void count(int n) {\n        if (n == 0) return;\n        count(n - 1);\n        System.out.println(n);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-cnt2",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 200
                },
                "data": {
                  "id": "sf-cnt2",
                  "entityType": "stack-frame",
                  "name": "count(1)",
                  "frameId": "frame-02",
                  "localVariables": {
                    "n": "1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-cnt1",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 80
                },
                "data": {
                  "id": "sf-cnt1",
                  "entityType": "stack-frame",
                  "name": "count(0) [BASE CASE - RETURN]",
                  "frameId": "frame-03",
                  "localVariables": {
                    "n": "0"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ret-unwind",
                "source": "sf-cnt1",
                "target": "sf-cnt2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ret-unwind",
                  "type": "reference",
                  "label": "returns (unwinds)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Once base case is reached, execution unwinds by popping frames and continuing post-call statements.",
            "whyIsItUsed": "Enables post-order operations such as reverse printing or bottom-up aggregation.",
            "javaSyntax": "count(n - 1); System.out.println(n);",
            "howItWorks": "Stack frames pop in LIFO sequence; previous caller resumes execution.",
            "visualRepresentation": "Upward arrow showing return path as top frame pops.",
            "realWorldExample": "Retracing your steps after hitting the end of a maze.",
            "commonMistakes": "Thinking recursion completes when base case is reached (post-statements must still run).",
            "challenge": "Swap println before recursive call and notice preorder vs postorder output."
          }
        }
      ]
    },
    {
      "id": "04i-shadowing",
      "code": "04I",
      "title": "Multi-Frame Variable Shadowing",
      "moduleId": "method-call-stack",
      "scenarios": [
        {
          "id": "04i-s1",
          "title": "1. Identical Variable Names in Independent Frames",
          "level": "intermediate",
          "learningObjective": "Verify that identical variable names in separate stack frames are completely isolated.",
          "javaSource": "class Shadow {\n    void outer() {\n        int x = 100;\n        inner();\n        System.out.println(x); // Still 100\n    }\n    void inner() {\n        int x = 200; // Does not affect outer x\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-outer",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 220
                },
                "data": {
                  "id": "sf-outer",
                  "entityType": "stack-frame",
                  "name": "outer()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "x": "100"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-inner",
                "type": "stackFrameNode",
                "position": {
                  "x": 260,
                  "y": 70
                },
                "data": {
                  "id": "sf-inner",
                  "entityType": "stack-frame",
                  "name": "inner()",
                  "frameId": "frame-02",
                  "localVariables": {
                    "x": "200"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-call-inner",
                "source": "sf-outer",
                "target": "sf-inner",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-call-inner",
                  "type": "call",
                  "label": "invokes inner()",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Each stack frame has its own private LocalVariableTable; identical names never collide.",
            "whyIsItUsed": "Enables developers to write modular methods without worrying about naming conflicts.",
            "javaSyntax": "int x = 100 vs int x = 200",
            "howItWorks": "Instructions reference slot offsets in the active frame; outer frame memory is untouched.",
            "visualRepresentation": "Two stack frame boxes both containing a local variable 'x' with distinct values.",
            "realWorldExample": "Two people in different rooms both having a notebook labeled 'Notes'.",
            "commonMistakes": "Worrying that helper method variables overwrite caller variables.",
            "challenge": "Add a field `int x = 50` and observe `this.x` vs local `x`."
          }
        }
      ]
    }
  ],
  "jvm-memory": [
    {
      "id": "05a-overview",
      "code": "05A",
      "title": "JVM Runtime Data Areas Overview",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05a-s1",
          "title": "1. Complete JVM Memory Partitioning",
          "level": "beginner",
          "learningObjective": "Identify the 5 core JVM memory regions: Heap, Stack, Metaspace, PC Register, Native Stack.",
          "javaSource": "public class App {\n    static String appName = \"OOPS\"; // Metaspace\n    public static void main(String[] args) {\n        int localId = 1;             // JVM Stack\n        Object obj = new Object();   // Heap\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "mem-stack",
                "type": "memoryRegionNode",
                "position": {
                  "x": 100,
                  "y": 100
                },
                "data": {
                  "id": "mem-stack",
                  "entityType": "memory-region",
                  "name": "JVM Thread Stack",
                  "memoryRegion": "stack",
                  "sizeBytes": 1048576,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mem-heap",
                "type": "memoryRegionNode",
                "position": {
                  "x": 420,
                  "y": 100
                },
                "data": {
                  "id": "mem-heap",
                  "entityType": "memory-region",
                  "name": "JVM Heap",
                  "memoryRegion": "heap",
                  "sizeBytes": 268435456,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mem-meta",
                "type": "memoryRegionNode",
                "position": {
                  "x": 740,
                  "y": 100
                },
                "data": {
                  "id": "mem-meta",
                  "entityType": "memory-region",
                  "name": "Metaspace (Native)",
                  "memoryRegion": "metaspace",
                  "sizeBytes": 67108864,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "The JVM partitions physical memory into distinct areas with dedicated lifecycles and scopes.",
            "whyIsItUsed": "Separates per-thread execution state from shared dynamic object data.",
            "javaSyntax": "JVM Runtime Data Areas Specification (JVMS \u00a72.5)",
            "howItWorks": "Heap & Metaspace are shared across threads; Stacks & PC Registers are per-thread.",
            "visualRepresentation": "Three distinct regional boundary boxes with capacity metrics.",
            "realWorldExample": "A hospital with private consultation rooms (Stacks) and a shared medicine storage (Heap).",
            "commonMistakes": "Confusing JVM Stack with Heap.",
            "challenge": "Trace which region stores a static array vs local primitive."
          }
        }
      ]
    },
    {
      "id": "05b-stack-vs-heap",
      "code": "05B",
      "title": "JVM Stack vs Heap Separation",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05b-s1",
          "title": "1. Stack Frame Pointer Targeting Heap Instance",
          "level": "beginner",
          "learningObjective": "Differentiate between fast thread-private stack execution and shared dynamic heap allocation.",
          "javaSource": "class Person {\n    String name;\n    Person(String n) { this.name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Person p = new Person(\"Alice\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-main",
                "type": "stackFrameNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "sf-main",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "p": "ref@0x45A"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-alice",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "obj-alice",
                  "entityType": "object",
                  "className": "Person",
                  "simulatorAddress": "0x45A",
                  "instanceFieldValues": {
                    "name": "\"Alice\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-p-alice",
                "source": "sf-main",
                "target": "obj-alice",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-p-alice",
                  "type": "reference",
                  "label": "p points to 0x45A",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Stack stores method frames and local variables; Heap stores all instantiated objects.",
            "whyIsItUsed": "Stack memory is freed automatically upon return; Heap objects are managed by GC.",
            "javaSyntax": "Person p = new Person(\"Alice\");",
            "howItWorks": "Variable 'p' contains memory address (0x45A); Person payload lives on Heap.",
            "visualRepresentation": "Stack frame on left pointing across boundary to Heap object on right.",
            "realWorldExample": "A luggage claim ticket (Stack pointer) vs the suitcase (Heap object).",
            "commonMistakes": "Thinking objects are allocated on the stack in standard Java.",
            "challenge": "Reassign `p = null` and observe heap reachability."
          }
        }
      ]
    },
    {
      "id": "05c-metaspace",
      "code": "05C",
      "title": "Metaspace (Method Area) & Class Metadata",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05c-s1",
          "title": "1. Loaded Class Metadata & Bytecode in Native Memory",
          "level": "intermediate",
          "learningObjective": "Observe class metadata, method bytecode, and runtime constant pool stored in Metaspace.",
          "javaSource": "class Engine {\n    static final int MAX_RPM = 8000;\n    void start() { /* Bytecode in Metaspace */ }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-engine-meta",
                "type": "classNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "cls-engine-meta",
                  "entityType": "class",
                  "name": "Engine",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-rpm",
                      "name": "MAX_RPM",
                      "type": "int",
                      "isStatic": true,
                      "visibility": "+"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-st",
                      "name": "start",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "METASPACE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Metaspace holds class definitions, method bytecode, annotations, and constant pools in native OS memory.",
            "whyIsItUsed": "Replaced PermGen in Java 8; expands automatically to avoid fixed-size exhaustion.",
            "javaSyntax": "Class.forName(\"Engine\");",
            "howItWorks": "Class loader loads .class bytes, parses structure, writes Klass instance into Metaspace.",
            "visualRepresentation": "Class metadata card inside native Metaspace boundary.",
            "realWorldExample": "Architectural blueprint of a building.",
            "commonMistakes": "Assuming static variables are stored in Heap Eden space.",
            "challenge": "Look up java.lang.OutOfMemoryError: Metaspace causes."
          }
        }
      ]
    },
    {
      "id": "05d-pc-register",
      "code": "05D",
      "title": "Program Counter (PC) Register",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05d-s1",
          "title": "1. Tracking Bytecode Instruction Offset",
          "level": "intermediate",
          "learningObjective": "Understand how the per-thread PC Register tracks the current bytecode offset.",
          "javaSource": "class Counter {\n    int step() {\n        int a = 1; // offset 0: iconst_1, 1: istore_1\n        int b = 2; // offset 2: iconst_2, 3: istore_2\n        return a + b; // offset 4: iload_1, 5: iload_2, 6: iadd, 7: ireturn\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-step",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 120
                },
                "data": {
                  "id": "sf-step",
                  "entityType": "stack-frame",
                  "name": "step()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "a": "1",
                    "b": "2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "pc-thread",
                "type": "variableNode",
                "position": {
                  "x": 520,
                  "y": 140
                },
                "data": {
                  "id": "pc-thread",
                  "entityType": "variable",
                  "name": "Thread-1 PC Register",
                  "variableType": "offset",
                  "referenceTargetId": "offset-6",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Each thread has a private PC register containing the address of current JVM bytecode instruction.",
            "whyIsItUsed": "Ensures thread knows where to resume after thread context switching.",
            "javaSyntax": "iload_1; iload_2; iadd; ireturn",
            "howItWorks": "Updated by JVM execution engine after executing each opcode.",
            "visualRepresentation": "Indicator pointing to current line in bytecode stream.",
            "realWorldExample": "A bookmark saving your exact page and line in a book.",
            "commonMistakes": "Thinking PC register is shared among multiple threads.",
            "challenge": "Observe PC register jump during an if-else branch."
          }
        }
      ]
    },
    {
      "id": "05e-native-stack",
      "code": "05E",
      "title": "Native Method Stack (JNI)",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05e-s1",
          "title": "1. JNI Invocation of C/C++ Native Library",
          "level": "advanced",
          "learningObjective": "Inspect Native Method Stack supporting C/C++ native invocations via JNI.",
          "javaSource": "class SystemClock {\n    public static native long currentTimeMillis();\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-java",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 120
                },
                "data": {
                  "id": "sf-java",
                  "entityType": "stack-frame",
                  "name": "Java Frame (main)",
                  "frameId": "frame-01",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "sf-native",
                "type": "stackFrameNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "sf-native",
                  "entityType": "stack-frame",
                  "name": "Native C Frame (JNI currentTimeMillis)",
                  "frameId": "native-01",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-jni",
                "source": "sf-java",
                "target": "sf-native",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-jni",
                  "type": "call",
                  "label": "invokes native (JNI)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Supports execution of native C/C++ methods invoked via Java Native Interface (JNI).",
            "whyIsItUsed": "Allows Java programs to interact with operating system hardware and native libraries.",
            "javaSyntax": "public static native long currentTimeMillis();",
            "howItWorks": "Execution engine switches from JVM bytecode interpreter to native OS CPU execution.",
            "visualRepresentation": "Boundary connector linking JVM stack to OS native stack.",
            "realWorldExample": "Using an interpreter to speak to someone in another language.",
            "commonMistakes": "Assuming native memory leaks can be cleaned by Java garbage collector.",
            "challenge": "Inspect java.lang.Thread.sleep() native call."
          }
        }
      ]
    },
    {
      "id": "05f-constant-pool",
      "code": "05F",
      "title": "Runtime Constant Pool",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05f-s1",
          "title": "1. Symbol Resolution & String Constant Table",
          "level": "intermediate",
          "learningObjective": "Track how symbolic references are stored in the constant pool and resolved at runtime.",
          "javaSource": "class PoolDemo {\n    String s1 = \"Constant\";\n    String s2 = \"Constant\"; // Reuses same entry from pool\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-pool",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "cls-pool",
                  "entityType": "class",
                  "name": "PoolDemo",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f1",
                      "name": "s1",
                      "type": "String",
                      "visibility": "~"
                    },
                    {
                      "id": "f2",
                      "name": "s2",
                      "type": "String",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "obj-str-pool",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "obj-str-pool",
                  "entityType": "object",
                  "className": "String [Constant Pool]",
                  "simulatorAddress": "0xPOOL_01",
                  "instanceFieldValues": {
                    "value": "\"Constant\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pool-s1",
                "source": "cls-pool",
                "target": "obj-str-pool",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pool-s1",
                  "type": "reference",
                  "label": "resolves to shared entry",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Per-class constant table storing symbolic references, numeric literals, and interned strings.",
            "whyIsItUsed": "Conserves memory by deduplicating literals across the class bytecode.",
            "javaSyntax": "ldc #2 // String Constant",
            "howItWorks": "HotSpot string table deduplicates identical string literals into a single heap instance.",
            "visualRepresentation": "Reference arrow from class metadata pointing to shared string pool entry.",
            "realWorldExample": "A public library catalog index.",
            "commonMistakes": "Assuming `new String(\"Constant\")` bypasses heap allocation.",
            "challenge": "Test `s1 == s2` identity comparison."
          }
        }
      ]
    },
    {
      "id": "05g-static-fields",
      "code": "05G",
      "title": "Static Fields in Metaspace / Class Object",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05g-s1",
          "title": "1. Class-Level Shared Variable Storage",
          "level": "intermediate",
          "learningObjective": "Verify that static fields live with the java.lang.Class instance, shared across all instances.",
          "javaSource": "class Config {\n    static int timeout = 5000;\n}\nclass Client {\n    void check() { int t = Config.timeout; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-config",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 100
                },
                "data": {
                  "id": "cls-config",
                  "entityType": "class",
                  "name": "Config",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-to",
                      "name": "timeout",
                      "type": "int",
                      "isStatic": true,
                      "visibility": "+"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-client",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 100
                },
                "data": {
                  "id": "cls-client",
                  "entityType": "class",
                  "name": "Client",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-chk",
                      "name": "check",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-read-static",
                "source": "cls-client",
                "target": "cls-config",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-read-static",
                  "type": "reference",
                  "label": "reads Config.timeout",
                  "provenance": "SOURCE"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Static variables belong to the class object; exactly one copy exists across the entire JVM.",
            "whyIsItUsed": "Ideal for global constants, counters, and shared configuration.",
            "javaSyntax": "static int timeout = 5000;",
            "howItWorks": "Stored in Java Heap inside the mirrored `java.lang.Class` object (since Java 8).",
            "visualRepresentation": "Static field marked with underline or badge in class card.",
            "realWorldExample": "A public bulletin board in a town square.",
            "commonMistakes": "Using static fields for mutable state in multi-threaded environments without synchronization.",
            "challenge": "Modify `Config.timeout = 3000` and verify it updates for all callers."
          }
        }
      ]
    },
    {
      "id": "05h-interconnections",
      "code": "05H",
      "title": "Stack-to-Heap-to-Metaspace Interconnections",
      "moduleId": "jvm-memory",
      "scenarios": [
        {
          "id": "05h-s1",
          "title": "1. Full End-to-End Runtime Triad",
          "level": "advanced",
          "learningObjective": "Inspect complete 3-way connection: Stack variable -> Heap object -> Metaspace Class metadata.",
          "javaSource": "class Vehicle {\n    String model = \"Sedan\";\n    void drive() {}\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vehicle v = new Vehicle();\n        v.drive();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-main-triad",
                "type": "stackFrameNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "sf-main-triad",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "v": "ref@0x7B1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-veh",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 140
                },
                "data": {
                  "id": "obj-veh",
                  "entityType": "object",
                  "className": "Vehicle",
                  "simulatorAddress": "0x7B1",
                  "instanceFieldValues": {
                    "model": "\"Sedan\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "cls-veh-meta",
                "type": "classNode",
                "position": {
                  "x": 740,
                  "y": 100
                },
                "data": {
                  "id": "cls-veh-meta",
                  "entityType": "class",
                  "name": "Vehicle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-m",
                      "name": "model",
                      "type": "String",
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "id": "m-dr",
                      "name": "drive",
                      "returnType": "void",
                      "visibility": "~",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "METASPACE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-s-to-h",
                "source": "sf-main-triad",
                "target": "obj-veh",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-s-to-h",
                  "type": "reference",
                  "label": "v points to 0x7B1",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-h-to-m",
                "source": "obj-veh",
                "target": "cls-veh-meta",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-h-to-m",
                  "type": "reference",
                  "label": "klass pointer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The foundational JVM execution triad connecting Thread Stack, Garbage Collected Heap, and Native Metaspace.",
            "whyIsItUsed": "Unifies local execution, dynamic object state, and compiled class bytecode.",
            "javaSyntax": "Vehicle v = new Vehicle(); v.drive();",
            "howItWorks": "Thread stack holds pointer to heap object; object header holds Klass pointer to Metaspace bytecode.",
            "visualRepresentation": "Three linked cards: Stack Frame -> Heap Object -> Metaspace Class.",
            "realWorldExample": "A driver license (Stack) linking to a physical car (Heap) linking to manufacturing blueprint (Metaspace).",
            "commonMistakes": "Treating JVM memory as a single uniform block.",
            "challenge": "Trace how `v.drive()` locates the executable machine code."
          }
        }
      ]
    }
  ],
  "heap-alloc": [
    {
      "id": "06a-new-eden",
      "code": "06A",
      "title": "new Operator & Eden Space Allocation",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06a-s1",
          "title": "1. Dynamic Memory Allocation in Eden Space",
          "level": "beginner",
          "learningObjective": "Observe how `new` allocates bytes in Eden space and initializes fields.",
          "javaSource": "class Point {\n    int x = 10;\n    int y = 20;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Point p = new Point();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-p-main",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-p-main",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "p": "ref@0x11A"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-pt",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-pt",
                  "entityType": "object",
                  "className": "Point",
                  "simulatorAddress": "0x11A",
                  "instanceFieldValues": {
                    "x": "10",
                    "y": "20"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-p-alloc",
                "source": "sf-p-main",
                "target": "obj-pt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-p-alloc",
                  "type": "allocates",
                  "label": "allocates in Eden",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Allocation of memory on the JVM heap using `new` operator.",
            "whyIsItUsed": "Dynamically manages object lifecycles during execution.",
            "javaSyntax": "Point p = new Point();",
            "howItWorks": "JVM checks Eden space, allocates bytes, initializes fields, returns address.",
            "visualRepresentation": "Stack pointer targeting Eden heap object.",
            "realWorldExample": "Renting a storage locker.",
            "commonMistakes": "Thinking `Point p;` allocates memory; it only creates an uninitialized reference slot.",
            "challenge": "Allocate two distinct Points and compare with `==`."
          }
        }
      ]
    },
    {
      "id": "06b-object-header",
      "code": "06B",
      "title": "Object Header, Mark Word & Klass Word",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06b-s1",
          "title": "1. 16-Byte HotSpot Object Header Breakdown",
          "level": "advanced",
          "learningObjective": "Inspect 64-bit Mark Word (hash, age, lock) and 32/64-bit Klass Word pointer.",
          "javaSource": "class Lockable {\n    int data = 100;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Lockable l = new Lockable();\n        synchronized(l) { /* Mark Word locks */ }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-hdr",
                "type": "objectNode",
                "position": {
                  "x": 340,
                  "y": 120
                },
                "data": {
                  "id": "obj-hdr",
                  "entityType": "object",
                  "className": "Lockable",
                  "simulatorAddress": "0x2B4",
                  "instanceFieldValues": {
                    "[Mark Word]": "0x00000001 (hash, age=0, unlocked)",
                    "[Klass Word]": "ptr@Klass(Lockable)",
                    "data": "100"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Every JVM heap object contains a header consisting of Mark Word and Klass Word.",
            "whyIsItUsed": "Carries GC age, hash code, locking state, and type pointer without field overhead.",
            "javaSyntax": "synchronized(l) { ... }",
            "howItWorks": "Mark Word flips bits between unlocked, biased, thin, and fat lock states.",
            "visualRepresentation": "Object card detailing header slots and instance payload.",
            "realWorldExample": "A passport stamp book containing personal identification and status.",
            "commonMistakes": "Assuming Java objects contain only user-declared fields.",
            "challenge": "Compute memory size of empty object (16 bytes aligned to 8-byte boundary)."
          }
        }
      ]
    },
    {
      "id": "06c-primitive-vs-ref-fields",
      "code": "06C",
      "title": "Primitive vs Reference Fields on Heap",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06c-s1",
          "title": "1. Inline Primitive Bytes vs Embedded Pointer",
          "level": "intermediate",
          "learningObjective": "Observe that primitive fields store raw bytes inline inside object body, while reference fields store 64-bit pointers.",
          "javaSource": "class User {\n    int age = 25;       // Inlined 4 bytes\n    String name = \"Bob\";// 8-byte pointer to separate String\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-user",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 140
                },
                "data": {
                  "id": "obj-user",
                  "entityType": "object",
                  "className": "User",
                  "simulatorAddress": "0x3A0",
                  "instanceFieldValues": {
                    "age": "25 (inline int)",
                    "name": "ref@0x90A"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-bob-str",
                "type": "objectNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "obj-bob-str",
                  "entityType": "object",
                  "className": "String",
                  "simulatorAddress": "0x90A",
                  "instanceFieldValues": {
                    "value": "\"Bob\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-usr-str",
                "source": "obj-user",
                "target": "obj-bob-str",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-usr-str",
                  "type": "reference",
                  "label": "name points to 0x90A",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Primitive fields are stored directly in the object layout; reference fields store pointers to other objects.",
            "whyIsItUsed": "Optimizes memory packing while allowing dynamic composition.",
            "javaSyntax": "int age = 25; String name = \"Bob\";",
            "howItWorks": "JVM aligns primitive fields (4 bytes for int, 8 for double); reference fields occupy 4/8 bytes.",
            "visualRepresentation": "User object node holding embedded pointer arrow to String object.",
            "realWorldExample": "A contact card with a phone number (value) and home address (pointer).",
            "commonMistakes": "Assuming inner objects are physically nested inside outer object memory.",
            "challenge": "Add a `double salary` field and observe 8-byte alignment."
          }
        }
      ]
    },
    {
      "id": "06d-array-alloc",
      "code": "06D",
      "title": "Array Allocation on Heap",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06d-s1",
          "title": "1. Contiguous Array Header & Element Slots",
          "level": "intermediate",
          "learningObjective": "Understand array header containing 32-bit length and contiguous memory layout.",
          "javaSource": "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = new int[]{10, 20, 30};\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-arr-main",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-arr-main",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "numbers": "ref[]@0x501"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-arr",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-arr",
                  "entityType": "object",
                  "className": "int[]",
                  "simulatorAddress": "0x501",
                  "instanceFieldValues": {
                    "[length]": "3",
                    "[0]": "10",
                    "[1]": "20",
                    "[2]": "30"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-num-arr",
                "source": "sf-arr-main",
                "target": "obj-arr",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-num-arr",
                  "type": "reference",
                  "label": "points to 0x501",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Arrays are full JVM objects allocated on Heap with an extra 4-byte length field in their header.",
            "whyIsItUsed": "Guarantees O(1) random access via index arithmetic `base + index * element_size`.",
            "javaSyntax": "int[] numbers = new int[]{10, 20, 30};",
            "howItWorks": "JVM allocates contiguous memory block; verifies bounds on every access.",
            "visualRepresentation": "Array card showing length header and indexed element cells.",
            "realWorldExample": "A row of numbered post office boxes.",
            "commonMistakes": "Forgetting that array elements default to zero/null upon allocation.",
            "challenge": "Allocate an array of Object references and inspect null entries."
          }
        }
      ]
    },
    {
      "id": "06e-multi-object",
      "code": "06E",
      "title": "Multi-Object Allocation & Graph",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06e-s1",
          "title": "1. Interconnected Domain Entities on Heap",
          "level": "intermediate",
          "learningObjective": "Track simultaneous allocation and referencing among multiple domain entities.",
          "javaSource": "class Order {\n    Customer customer;\n    Item item;\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-order",
                "type": "objectNode",
                "position": {
                  "x": 340,
                  "y": 100
                },
                "data": {
                  "id": "obj-order",
                  "entityType": "object",
                  "className": "Order",
                  "simulatorAddress": "0x801",
                  "instanceFieldValues": {
                    "customer": "ref@0x802",
                    "item": "ref@0x803"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-cust",
                "type": "objectNode",
                "position": {
                  "x": 140,
                  "y": 240
                },
                "data": {
                  "id": "obj-cust",
                  "entityType": "object",
                  "className": "Customer",
                  "simulatorAddress": "0x802",
                  "instanceFieldValues": {
                    "name": "\"Alice\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-item",
                "type": "objectNode",
                "position": {
                  "x": 540,
                  "y": 240
                },
                "data": {
                  "id": "obj-item",
                  "entityType": "object",
                  "className": "Item",
                  "simulatorAddress": "0x803",
                  "instanceFieldValues": {
                    "sku": "\"SKU-99\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-ord-c",
                "source": "obj-order",
                "target": "obj-cust",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ord-c",
                  "type": "reference",
                  "label": "customer ref",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-ord-i",
                "source": "obj-order",
                "target": "obj-item",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ord-i",
                  "type": "reference",
                  "label": "item ref",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Real-world Java applications instantiate complex webs of interconnected heap objects.",
            "whyIsItUsed": "Models business relationships and aggregate entities cleanly.",
            "javaSyntax": "Order o = new Order(); o.customer = new Customer();",
            "howItWorks": "Each object occupies its own independent heap address; linked by 64-bit pointers.",
            "visualRepresentation": "Graph of interconnected object cards.",
            "realWorldExample": "An order slip linking to customer record and product inventory card.",
            "commonMistakes": "Creating deep object graphs that are difficult to serialize or garbage collect.",
            "challenge": "Add a second Order pointing to the same Customer (shared reference)."
          }
        }
      ]
    },
    {
      "id": "06f-young-generation",
      "code": "06F",
      "title": "Young Generation (Eden, S0, S1)",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06f-s1",
          "title": "1. Minor GC Copying between Survivor Spaces",
          "level": "advanced",
          "learningObjective": "Understand Minor GC copying live objects between From (S0) and To (S1) survivor spaces.",
          "javaSource": "// JVM Generational Heap Spaces:\n// Eden -> S0 (Survivor 0) -> S1 (Survivor 1) -> Tenured (Old Gen)",
          "diagram": {
            "nodes": [
              {
                "id": "mem-eden",
                "type": "memoryRegionNode",
                "position": {
                  "x": 100,
                  "y": 120
                },
                "data": {
                  "id": "mem-eden",
                  "entityType": "memory-region",
                  "name": "Eden Space (Young)",
                  "memoryRegion": "heap",
                  "sizeBytes": 67108864,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mem-s0",
                "type": "memoryRegionNode",
                "position": {
                  "x": 380,
                  "y": 120
                },
                "data": {
                  "id": "mem-s0",
                  "entityType": "memory-region",
                  "name": "Survivor S0 (From)",
                  "memoryRegion": "heap",
                  "sizeBytes": 8388608,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mem-s1",
                "type": "memoryRegionNode",
                "position": {
                  "x": 660,
                  "y": 120
                },
                "data": {
                  "id": "mem-s1",
                  "entityType": "memory-region",
                  "name": "Survivor S1 (To)",
                  "memoryRegion": "heap",
                  "sizeBytes": 8388608,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Young Gen is split into Eden and two Survivor spaces (S0 and S1) based on Weak Generational Hypothesis.",
            "whyIsItUsed": "Most objects die young; minor GC quickly evacuates survivors without scanning Old Gen.",
            "javaSyntax": "Eden allocation -> Minor GC -> S0/S1 copy",
            "howItWorks": "Live objects copied to active survivor space; age counter incremented in Mark Word.",
            "visualRepresentation": "Three side-by-side memory region cards with evacuation arrows.",
            "realWorldExample": "A nursery sorting fast-growing plants into larger pots.",
            "commonMistakes": "Believing both S0 and S1 are active simultaneously (one is always empty 'To' space).",
            "challenge": "Track how an object's age increments with each Minor GC cycle."
          }
        }
      ]
    },
    {
      "id": "06g-old-generation",
      "code": "06G",
      "title": "Old (Tenured) Generation Promotion",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06g-s1",
          "title": "1. Tenuring Threshold & Long-Lived Objects",
          "level": "advanced",
          "learningObjective": "Observe object promotion to Old Generation when GC age reaches tenuring threshold (default 15).",
          "javaSource": "// Object survives MaxTenuringThreshold minor GCs\n// Promoted to Old (Tenured) Generation",
          "diagram": {
            "nodes": [
              {
                "id": "mem-surv",
                "type": "memoryRegionNode",
                "position": {
                  "x": 160,
                  "y": 120
                },
                "data": {
                  "id": "mem-surv",
                  "entityType": "memory-region",
                  "name": "Survivor Space (Young)",
                  "memoryRegion": "heap",
                  "sizeBytes": 8388608,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "mem-old",
                "type": "memoryRegionNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "mem-old",
                  "entityType": "memory-region",
                  "name": "Old (Tenured) Gen",
                  "memoryRegion": "heap",
                  "sizeBytes": 134217728,
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-promote",
                "source": "mem-surv",
                "target": "mem-old",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-promote",
                  "type": "reference",
                  "label": "promotes (age >= 15)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Objects that survive multiple minor GC cycles are promoted to Tenured (Old) Generation.",
            "whyIsItUsed": "Stores long-lived application state such as caches, singletons, and thread pools.",
            "javaSyntax": "-XX:MaxTenuringThreshold=15",
            "howItWorks": "Object header age reaches threshold; memory manager moves payload to Old Gen.",
            "visualRepresentation": "Arrow depicting promotion across generation boundary.",
            "realWorldExample": "Graduating from school to permanent career.",
            "commonMistakes": "Premature promotion due to undersized survivor spaces.",
            "challenge": "Configure `-XX:MaxTenuringThreshold` in JVM options."
          }
        }
      ]
    },
    {
      "id": "06h-field-mutation",
      "code": "06H",
      "title": "Heap Field Mutation",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06h-s1",
          "title": "1. Mutating Heap Object State via Reference",
          "level": "beginner",
          "learningObjective": "Track how field mutation alters the exact bytes inside an existing heap object without reallocating.",
          "javaSource": "class Account {\n    int balance = 100;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Account acc = new Account();\n        acc.balance = 250; // Field mutation\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-acc",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-acc",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "acc": "ref@0x6E1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-acc",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-acc",
                  "entityType": "object",
                  "className": "Account",
                  "simulatorAddress": "0x6E1",
                  "instanceFieldValues": {
                    "balance": "250 (mutated)"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-acc-ptr",
                "source": "sf-acc",
                "target": "obj-acc",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-acc-ptr",
                  "type": "reference",
                  "label": "points to 0x6E1",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Modifying the value of a field updates bytes directly inside the existing heap object.",
            "whyIsItUsed": "Preserves object identity and memory address while evolving its state.",
            "javaSyntax": "acc.balance = 250;",
            "howItWorks": "JVM calculates field offset and writes new value directly into heap memory.",
            "visualRepresentation": "Object card highlighting mutated field value in amber/green.",
            "realWorldExample": "Editing a row in a database table without changing its primary key.",
            "commonMistakes": "Confusing field mutation with creating a new object instance.",
            "challenge": "Make Account immutable with `final int balance`."
          }
        }
      ]
    },
    {
      "id": "06i-ref-replacement",
      "code": "06I",
      "title": "Reference Replacement & Unreachable Objects",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06i-s1",
          "title": "1. Overwriting Pointer & Creating Garbage Object",
          "level": "intermediate",
          "learningObjective": "Observe how reassigning a reference variable leaves the previous object unreachable.",
          "javaSource": "class Token {\n    String id;\n    Token(String i) { this.id = i; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Token t = new Token(\"Old\");\n        t = new Token(\"New\"); // Old token is now garbage\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-tok-main",
                "type": "stackFrameNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "sf-tok-main",
                  "entityType": "stack-frame",
                  "name": "main(String[])",
                  "frameId": "frame-01",
                  "localVariables": {
                    "t": "ref@0x902"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-tok-new",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 80
                },
                "data": {
                  "id": "obj-tok-new",
                  "entityType": "object",
                  "className": "Token",
                  "simulatorAddress": "0x902",
                  "instanceFieldValues": {
                    "id": "\"New\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-tok-old",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 240
                },
                "data": {
                  "id": "obj-tok-old",
                  "entityType": "object",
                  "className": "Token",
                  "simulatorAddress": "0x901",
                  "instanceFieldValues": {
                    "id": "\"Old\""
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t-new",
                "source": "sf-tok-main",
                "target": "obj-tok-new",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-new",
                  "type": "reference",
                  "label": "points to 0x902",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Reassigning a reference discards the old pointer; the previous object becomes eligible for garbage collection.",
            "whyIsItUsed": "Enables automatic memory reclamation when objects are no longer required.",
            "javaSyntax": "t = new Token(\"New\");",
            "howItWorks": "Stack variable slot is overwritten with new address; old object has zero incoming references.",
            "visualRepresentation": "Active reference pointer to new object; ghosted red unreferenced object below.",
            "realWorldExample": "Throwing away an old bus pass when buying a new one.",
            "commonMistakes": "Expecting `delete` or explicit destruction in Java.",
            "challenge": "Trace when the Garbage Collector reclaims 0x901."
          }
        }
      ]
    },
    {
      "id": "06j-gc-events",
      "code": "06J",
      "title": "GC Roots & Garbage Collection Events",
      "moduleId": "heap-alloc",
      "scenarios": [
        {
          "id": "06j-s1",
          "title": "1. Tracing Live Objects from Stack GC Roots",
          "level": "advanced",
          "learningObjective": "Understand Mark-and-Sweep tracing from GC roots to distinguish live from dead objects.",
          "javaSource": "class GCExample {\n    static Node rootNode; // GC Root (Static)\n    void run() {\n        Node localNode = new Node(); // GC Root (Stack)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "root-stack",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "root-stack",
                  "entityType": "variable",
                  "name": "localNode (GC Root)",
                  "variableType": "Node",
                  "referenceTargetId": "obj-live",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-live",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 100
                },
                "data": {
                  "id": "obj-live",
                  "entityType": "object",
                  "className": "Node",
                  "simulatorAddress": "0x401",
                  "instanceFieldValues": {
                    "status": "\"LIVE\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dead",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 240
                },
                "data": {
                  "id": "obj-dead",
                  "entityType": "object",
                  "className": "Node",
                  "simulatorAddress": "0x402",
                  "instanceFieldValues": {
                    "status": "\"UNREACHABLE\""
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-gc-root-live",
                "source": "root-stack",
                "target": "obj-live",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-gc-root-live",
                  "type": "reference",
                  "label": "reachable from root",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "GC roots are starting points (stack variables, static fields, JNI handles) for reachability analysis.",
            "whyIsItUsed": "JVM reclaims every heap object that cannot be reached from any GC root.",
            "javaSyntax": "System.gc(); // Triggers GC analysis",
            "howItWorks": "Garbage collector traces references from roots; unvisited objects are swept.",
            "visualRepresentation": "Green reachable path from GC root vs disconnected faded red object.",
            "realWorldExample": "A family tree tracing ancestry back to verified living ancestors.",
            "commonMistakes": "Believing reference counting is used in HotSpot (it uses tracing reachability).",
            "challenge": "Identify all 4 types of GC Roots in standard Java."
          }
        }
      ]
    }
  ],
  "ref-graph": [
    {
      "id": "07a-stack-to-heap",
      "code": "07A",
      "title": "Single Reference Pointer",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07a-s1",
          "title": "1. Unidirectional Reference Pointers",
          "level": "beginner",
          "learningObjective": "Visualize directional 64-bit pointers from stack to heap.",
          "javaSource": "class Node {\n    String val;\n    Node(String v) { this.val = v; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Node n1 = new Node(\"Alpha\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-n1",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 160
                },
                "data": {
                  "id": "var-n1",
                  "entityType": "variable",
                  "name": "n1",
                  "variableType": "Node",
                  "referenceTargetId": "obj-node-alpha",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-node-alpha",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 160
                },
                "data": {
                  "id": "obj-node-alpha",
                  "entityType": "object",
                  "className": "Node",
                  "simulatorAddress": "0x5C1",
                  "instanceFieldValues": {
                    "val": "\"Alpha\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-n1-alpha",
                "source": "var-n1",
                "target": "obj-node-alpha",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-n1-alpha",
                  "type": "reference",
                  "label": "points to 0x5C1",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Directional reference connecting a stack variable to a heap instance.",
            "whyIsItUsed": "Enables code to manipulate heap objects.",
            "javaSyntax": "Node n1 = new Node(\"Alpha\");",
            "howItWorks": "Stack holds 64-bit memory pointer (compressed OOP in 64-bit HotSpot).",
            "visualRepresentation": "Solid blue directed pointer arrow.",
            "realWorldExample": "A contact card in your phone linking to a physical person.",
            "commonMistakes": "Thinking variables contain the actual object bytes.",
            "challenge": "Assign `n1 = null` and observe pointer disconnection."
          }
        }
      ]
    },
    {
      "id": "07b-aliasing",
      "code": "07B",
      "title": "Multiple References (Aliasing)",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07b-s1",
          "title": "1. Multiple Variables Pointing to One Object",
          "level": "intermediate",
          "learningObjective": "Observe multiple pointers sharing the exact same heap instance.",
          "javaSource": "class Box {\n    int val = 100;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = b1; // Aliasing\n        b2.val = 200;\n        System.out.println(b1.val); // Prints 200!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-b1",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 100
                },
                "data": {
                  "id": "var-b1",
                  "entityType": "variable",
                  "name": "b1",
                  "variableType": "Box",
                  "referenceTargetId": "obj-box-shared",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-b2",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "var-b2",
                  "entityType": "variable",
                  "name": "b2",
                  "variableType": "Box",
                  "referenceTargetId": "obj-box-shared",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-box-shared",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 170
                },
                "data": {
                  "id": "obj-box-shared",
                  "entityType": "object",
                  "className": "Box",
                  "simulatorAddress": "0x33A",
                  "instanceFieldValues": {
                    "val": "200"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-b1-box",
                "source": "var-b1",
                "target": "obj-box-shared",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b1-box",
                  "type": "reference",
                  "label": "points to 0x33A",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b2-box",
                "source": "var-b2",
                "target": "obj-box-shared",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b2-box",
                  "type": "reference",
                  "label": "points to 0x33A",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Aliasing occurs when two or more references point to the exact same heap object.",
            "whyIsItUsed": "Fast reference copying without expensive heap object cloning.",
            "javaSyntax": "Box b2 = b1;",
            "howItWorks": "Copies the 64-bit pointer; mutations through b2 are immediately visible via b1.",
            "visualRepresentation": "Two stack variables converging on one heap object.",
            "realWorldExample": "Two keys to the same front door.",
            "commonMistakes": "Expecting `b2 = b1` to create an independent copy of the box.",
            "challenge": "Create a real clone using copy constructor."
          }
        }
      ]
    },
    {
      "id": "07c-chain",
      "code": "07C",
      "title": "Reference Chain",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07c-s1",
          "title": "1. Multi-Hop Linked Nodes (A -> B -> C)",
          "level": "intermediate",
          "learningObjective": "Inspect linear traversal across chained object references.",
          "javaSource": "class Link {\n    int val;\n    Link next;\n    Link(int v, Link n) { this.val = v; this.next = n; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-c1",
                "type": "objectNode",
                "position": {
                  "x": 140,
                  "y": 140
                },
                "data": {
                  "id": "obj-c1",
                  "entityType": "object",
                  "className": "Link",
                  "simulatorAddress": "0x1A",
                  "instanceFieldValues": {
                    "val": "1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-c2",
                "type": "objectNode",
                "position": {
                  "x": 400,
                  "y": 140
                },
                "data": {
                  "id": "obj-c2",
                  "entityType": "object",
                  "className": "Link",
                  "simulatorAddress": "0x1B",
                  "instanceFieldValues": {
                    "val": "2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-c3",
                "type": "objectNode",
                "position": {
                  "x": 660,
                  "y": 140
                },
                "data": {
                  "id": "obj-c3",
                  "entityType": "object",
                  "className": "Link",
                  "simulatorAddress": "0x1C",
                  "instanceFieldValues": {
                    "val": "3",
                    "next": "null"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-c1-c2",
                "source": "obj-c1",
                "target": "obj-c2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c1-c2",
                  "type": "reference",
                  "label": "next",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-c2-c3",
                "source": "obj-c2",
                "target": "obj-c3",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c2-c3",
                  "type": "reference",
                  "label": "next",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A sequential chain where each object stores a pointer to the next instance.",
            "whyIsItUsed": "Foundation of linked lists and pipeline processing.",
            "javaSyntax": "curr = curr.next;",
            "howItWorks": "Dereferencing pointer loads memory location of subsequent object into register.",
            "visualRepresentation": "Linear sequence of linked object cards with arrows pointing right.",
            "realWorldExample": "A scavenger hunt where each clue points to the next location.",
            "commonMistakes": "Causing NullPointerException on terminal node dereference.",
            "challenge": "Traverse until `curr == null` with a while loop."
          }
        }
      ]
    },
    {
      "id": "07d-tree",
      "code": "07D",
      "title": "Tree Reference Structure",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07d-s1",
          "title": "1. Binary Tree Node References (Left & Right)",
          "level": "intermediate",
          "learningObjective": "Visualize branching reference hierarchy from root to leaves.",
          "javaSource": "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int v) { this.val = v; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "node-root",
                "type": "objectNode",
                "position": {
                  "x": 380,
                  "y": 60
                },
                "data": {
                  "id": "node-root",
                  "entityType": "object",
                  "className": "TreeNode",
                  "simulatorAddress": "0xT_ROOT",
                  "instanceFieldValues": {
                    "val": "10"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-l",
                "type": "objectNode",
                "position": {
                  "x": 200,
                  "y": 220
                },
                "data": {
                  "id": "node-l",
                  "entityType": "object",
                  "className": "TreeNode",
                  "simulatorAddress": "0xT_LEFT",
                  "instanceFieldValues": {
                    "val": "5"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "node-r",
                "type": "objectNode",
                "position": {
                  "x": 560,
                  "y": 220
                },
                "data": {
                  "id": "node-r",
                  "entityType": "object",
                  "className": "TreeNode",
                  "simulatorAddress": "0xT_RIGHT",
                  "instanceFieldValues": {
                    "val": "15"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-t-left",
                "source": "node-root",
                "target": "node-l",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-left",
                  "type": "reference",
                  "label": "left",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-t-right",
                "source": "node-root",
                "target": "node-r",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-t-right",
                  "type": "reference",
                  "label": "right",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Hierarchical branching data structure where root references multiple child subtrees.",
            "whyIsItUsed": "Underpins search trees (BST, Red-Black), file systems, and ASTs.",
            "javaSyntax": "root.left = new TreeNode(5);",
            "howItWorks": "Root holds 2 distinct reference slots targeting separate heap objects.",
            "visualRepresentation": "Inverted tree hierarchy with diagonal pointers.",
            "realWorldExample": "An organizational hierarchy chart.",
            "commonMistakes": "Losing root reference causes entire tree to become garbage.",
            "challenge": "Calculate depth of tree using recursive traversal."
          }
        }
      ]
    },
    {
      "id": "07e-cyclic",
      "code": "07E",
      "title": "Cyclic References",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07e-s1",
          "title": "1. Mutual Circular Pointers & Tracing GC",
          "level": "advanced",
          "learningObjective": "Understand that modern JVM tracing GC cleanly collects cyclic reference islands.",
          "javaSource": "class Partner {\n    Partner peer;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Partner a = new Partner();\n        Partner b = new Partner();\n        a.peer = b;\n        b.peer = a; // Cycle formed\n        a = null; b = null; // Island of isolation\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-cyc-a",
                "type": "objectNode",
                "position": {
                  "x": 220,
                  "y": 140
                },
                "data": {
                  "id": "obj-cyc-a",
                  "entityType": "object",
                  "className": "Partner",
                  "simulatorAddress": "0xC1A",
                  "instanceFieldValues": {
                    "peer": "ref@0xC1B"
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              },
              {
                "id": "obj-cyc-b",
                "type": "objectNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "obj-cyc-b",
                  "entityType": "object",
                  "className": "Partner",
                  "simulatorAddress": "0xC1B",
                  "instanceFieldValues": {
                    "peer": "ref@0xC1A"
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-a-to-b",
                "source": "obj-cyc-a",
                "target": "obj-cyc-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-to-b",
                  "type": "reference",
                  "label": "peer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-b-to-a",
                "source": "obj-cyc-b",
                "target": "obj-cyc-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-to-a",
                  "type": "reference",
                  "label": "peer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Two or more objects referencing each other in a closed loop.",
            "whyIsItUsed": "Proves why HotSpot uses tracing reachability instead of simple reference counting.",
            "javaSyntax": "a.peer = b; b.peer = a;",
            "howItWorks": "If disconnected from GC roots, entire island is reclaimed regardless of internal circular pointers.",
            "visualRepresentation": "Two object nodes with reciprocal curved arrows.",
            "realWorldExample": "Two people holding each other's hands while drifting away from a boat.",
            "commonMistakes": "Assuming cyclic references cause memory leaks in Java (they do not in tracing GCs).",
            "challenge": "Break cycle manually by setting `a.peer = null`."
          }
        }
      ]
    },
    {
      "id": "07f-null",
      "code": "07F",
      "title": "Null References & Disconnection",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07f-s1",
          "title": "1. Pointer Cleared to Null (0x0)",
          "level": "beginner",
          "learningObjective": "Observe that null sets reference bits to zero, disconnecting the pointer.",
          "javaSource": "class Device {\n    void ping() {}\n}\npublic class Main {\n    public static void main(String[] args) {\n        Device dev = new Device();\n        dev = null; // Disconnects pointer\n        // dev.ping(); // Would throw NullPointerException\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-dev",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "var-dev",
                  "entityType": "variable",
                  "name": "dev",
                  "variableType": "Device",
                  "referenceTargetId": null,
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dev-orphan",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-dev-orphan",
                  "entityType": "object",
                  "className": "Device",
                  "simulatorAddress": "0x77F",
                  "instanceFieldValues": {},
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "Null represents the intentional absence of a reference (0x0 memory address).",
            "whyIsItUsed": "Signals uninitialized state, end of lists, or permits garbage collection.",
            "javaSyntax": "Device dev = null;",
            "howItWorks": "Attempting to dereference null generates a hardware trap that JVM converts to NullPointerException.",
            "visualRepresentation": "Disconnected variable card labeled 'null (0x0)' with target object unlinked.",
            "realWorldExample": "A blank address slip with no street written on it.",
            "commonMistakes": "Dereferencing null without safe guard checks (use Optional or Objects.requireNonNull).",
            "challenge": "Wrap with `if (dev != null)` check."
          }
        }
      ]
    },
    {
      "id": "07g-static-roots",
      "code": "07G",
      "title": "Static GC Roots",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07g-s1",
          "title": "1. Permanent Live Root via Static Class Field",
          "level": "intermediate",
          "learningObjective": "Inspect how static references keep heap objects perpetually reachable.",
          "javaSource": "class Cache {\n    static Object globalCache = new Object(); // Static GC Root\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-cache-root",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 120
                },
                "data": {
                  "id": "cls-cache-root",
                  "entityType": "class",
                  "name": "Cache",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "id": "f-gc",
                      "name": "globalCache",
                      "type": "Object",
                      "isStatic": true,
                      "visibility": "~"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "METASPACE"
                }
              },
              {
                "id": "obj-cache-payload",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 120
                },
                "data": {
                  "id": "obj-cache-payload",
                  "entityType": "object",
                  "className": "Object",
                  "simulatorAddress": "0x990",
                  "instanceFieldValues": {},
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-static-gc-root",
                "source": "cls-cache-root",
                "target": "obj-cache-payload",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-static-gc-root",
                  "type": "reference",
                  "label": "GC Root pointer",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Classes loaded by system class loader and their static fields act as permanent GC roots.",
            "whyIsItUsed": "Prevents vital application caches and singletons from being collected.",
            "javaSyntax": "static Object globalCache = new Object();",
            "howItWorks": "Static reference is never reclaimed until the enclosing ClassLoader is unloaded.",
            "visualRepresentation": "Gold badge on static field pointing to protected heap object.",
            "realWorldExample": "A monument anchored into the foundation of a town square.",
            "commonMistakes": "Unbounded static collections (e.g. static List) cause severe memory leaks.",
            "challenge": "Clear cache using `globalCache = null` when shutting down."
          }
        }
      ]
    },
    {
      "id": "07h-local-roots",
      "code": "07H",
      "title": "Local Stack Roots",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07h-s1",
          "title": "1. Active Thread Stack Frames as Transient GC Roots",
          "level": "beginner",
          "learningObjective": "Track how active thread stack local variables pin objects in heap memory.",
          "javaSource": "public class Worker {\n    void process() {\n        byte[] buffer = new byte[1024]; // Pinned by local root\n        // As long as process() runs, buffer is live\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "sf-worker",
                "type": "stackFrameNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "sf-worker",
                  "entityType": "stack-frame",
                  "name": "process()",
                  "frameId": "frame-01",
                  "localVariables": {
                    "buffer": "ref[]@0xBB1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-buf",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 140
                },
                "data": {
                  "id": "obj-buf",
                  "entityType": "object",
                  "className": "byte[]",
                  "simulatorAddress": "0xBB1",
                  "instanceFieldValues": {
                    "[length]": "1024"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-buf-ptr",
                "source": "sf-worker",
                "target": "obj-buf",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-buf-ptr",
                  "type": "reference",
                  "label": "stack GC root",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Local variables in currently executing thread stack frames serve as primary GC roots.",
            "whyIsItUsed": "Ensures memory in active use by the CPU is never collected by GC threads.",
            "javaSyntax": "byte[] buffer = new byte[1024];",
            "howItWorks": "JVM stack maps (OopMaps) tell GC exactly which slots hold live references at each safepoint.",
            "visualRepresentation": "Stack frame arrow pinning heap buffer.",
            "realWorldExample": "Holding onto a balloon string so it does not float away.",
            "commonMistakes": "Holding large arrays in local variables of long-running methods without nulling.",
            "challenge": "Step out of method and observe buffer become garbage."
          }
        }
      ]
    },
    {
      "id": "07i-array-refs",
      "code": "07I",
      "title": "Array Element References",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07i-s1",
          "title": "1. Fan-Out References from Array Slots to Distinct Objects",
          "level": "intermediate",
          "learningObjective": "Inspect array of references fanning out to multiple independent heap objects.",
          "javaSource": "class Item {\n    int id;\n    Item(int i) { this.id = i; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item[] items = new Item[]{ new Item(1), new Item(2) };\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-items-arr",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "obj-items-arr",
                  "entityType": "object",
                  "className": "Item[]",
                  "simulatorAddress": "0xA00",
                  "instanceFieldValues": {
                    "[0]": "ref@0xA01",
                    "[1]": "ref@0xA02"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-item1",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 80
                },
                "data": {
                  "id": "obj-item1",
                  "entityType": "object",
                  "className": "Item",
                  "simulatorAddress": "0xA01",
                  "instanceFieldValues": {
                    "id": "1"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-item2",
                "type": "objectNode",
                "position": {
                  "x": 520,
                  "y": 240
                },
                "data": {
                  "id": "obj-item2",
                  "entityType": "object",
                  "className": "Item",
                  "simulatorAddress": "0xA02",
                  "instanceFieldValues": {
                    "id": "2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-arr-0",
                "source": "obj-items-arr",
                "target": "obj-item1",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-0",
                  "type": "reference",
                  "label": "[0]",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-arr-1",
                "source": "obj-items-arr",
                "target": "obj-item2",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-1",
                  "type": "reference",
                  "label": "[1]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "An object array stores an array of reference pointers, not inlined object bodies.",
            "whyIsItUsed": "Allows polymorphic storage where elements can be subclasses of the array type.",
            "javaSyntax": "Item[] items = new Item[2];",
            "howItWorks": "Array memory contains contiguous 64-bit addresses pointing across the heap.",
            "visualRepresentation": "Array node fanning out separate reference arrows to item objects.",
            "realWorldExample": "An egg carton where each slot holds a ticket to an egg elsewhere.",
            "commonMistakes": "Assuming `new Item[10]` instantiates 10 Item objects (it creates 10 null slots).",
            "challenge": "Set `items[0] = null` and watch target become orphaned."
          }
        }
      ]
    },
    {
      "id": "07j-collection-refs",
      "code": "07J",
      "title": "Collection References",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07j-s1",
          "title": "1. ArrayList Internal Object[] and Element Pointers",
          "level": "intermediate",
          "learningObjective": "Examine internal structure of java.util.ArrayList with elementData array references.",
          "javaSource": "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Alpha\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "obj-list",
                "type": "objectNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "obj-list",
                  "entityType": "object",
                  "className": "ArrayList<String>",
                  "simulatorAddress": "0xL1",
                  "instanceFieldValues": {
                    "size": "1",
                    "elementData": "ref[]@0xL2"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-list-arr",
                "type": "objectNode",
                "position": {
                  "x": 460,
                  "y": 140
                },
                "data": {
                  "id": "obj-list-arr",
                  "entityType": "object",
                  "className": "Object[] (elementData)",
                  "simulatorAddress": "0xL2",
                  "instanceFieldValues": {
                    "[0]": "ref@0xL3",
                    "[1..9]": "null"
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-str-alpha",
                "type": "objectNode",
                "position": {
                  "x": 760,
                  "y": 140
                },
                "data": {
                  "id": "obj-str-alpha",
                  "entityType": "object",
                  "className": "String",
                  "simulatorAddress": "0xL3",
                  "instanceFieldValues": {
                    "value": "\"Alpha\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-l-arr",
                "source": "obj-list",
                "target": "obj-list-arr",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-l-arr",
                  "type": "reference",
                  "label": "elementData",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-arr-elem",
                "source": "obj-list-arr",
                "target": "obj-str-alpha",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-arr-elem",
                  "type": "reference",
                  "label": "[0]",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Collections are composite objects encapsulating internal backing arrays or linked nodes.",
            "whyIsItUsed": "Provides high-level dynamic sizing, searching, and sorting abstractions.",
            "javaSyntax": "list.add(\"Alpha\");",
            "howItWorks": "ArrayList wraps `Object[] elementData`; grows by 1.5x upon reaching capacity.",
            "visualRepresentation": "Two-hop reference path: List -> Backing Array -> Element Payload.",
            "realWorldExample": "A filing cabinet (List) containing folders (Array) containing documents (Elements).",
            "commonMistakes": "Assuming `list.clear()` immediately deallocates elements (it nulls internal array slots).",
            "challenge": "Add a second element and observe size increase to 2."
          }
        }
      ]
    },
    {
      "id": "07k-reachability",
      "code": "07K",
      "title": "Reachability Analysis",
      "moduleId": "ref-graph",
      "scenarios": [
        {
          "id": "07k-s1",
          "title": "1. Live Reachable Subgraph vs Orphan Island",
          "level": "advanced",
          "learningObjective": "Distinguish between live objects reachable from GC roots and disconnected orphan islands.",
          "javaSource": "// Reachability Analysis:\n// GC Root -> Live A -> Live B\n// Disconnected: Dead C <-> Dead D (Reclaimed by GC)",
          "diagram": {
            "nodes": [
              {
                "id": "root-active",
                "type": "variableNode",
                "position": {
                  "x": 120,
                  "y": 80
                },
                "data": {
                  "id": "root-active",
                  "entityType": "variable",
                  "name": "activeRef (Stack GC Root)",
                  "variableType": "Node",
                  "referenceTargetId": "obj-live-a",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-live-a",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 80
                },
                "data": {
                  "id": "obj-live-a",
                  "entityType": "object",
                  "className": "Node A",
                  "simulatorAddress": "0xA1",
                  "instanceFieldValues": {
                    "status": "\"REACHABLE\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-live-b",
                "type": "objectNode",
                "position": {
                  "x": 720,
                  "y": 80
                },
                "data": {
                  "id": "obj-live-b",
                  "entityType": "object",
                  "className": "Node B",
                  "simulatorAddress": "0xA2",
                  "instanceFieldValues": {
                    "status": "\"REACHABLE\""
                  },
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dead-c",
                "type": "objectNode",
                "position": {
                  "x": 420,
                  "y": 240
                },
                "data": {
                  "id": "obj-dead-c",
                  "entityType": "object",
                  "className": "Node C",
                  "simulatorAddress": "0xDEAD_1",
                  "instanceFieldValues": {
                    "status": "\"ORPHAN\""
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              },
              {
                "id": "obj-dead-d",
                "type": "objectNode",
                "position": {
                  "x": 720,
                  "y": 240
                },
                "data": {
                  "id": "obj-dead-d",
                  "entityType": "object",
                  "className": "Node D",
                  "simulatorAddress": "0xDEAD_2",
                  "instanceFieldValues": {
                    "status": "\"ORPHAN\""
                  },
                  "provenanceCategory": "UNREACHABLE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-root-a",
                "source": "root-active",
                "target": "obj-live-a",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-root-a",
                  "type": "reference",
                  "label": "root pointer",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-a-b",
                "source": "obj-live-a",
                "target": "obj-live-b",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-a-b",
                  "type": "reference",
                  "label": "link",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-c-d",
                "source": "obj-dead-c",
                "target": "obj-dead-d",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c-d",
                  "type": "reference",
                  "label": "internal cyclic",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-d-c",
                "source": "obj-dead-d",
                "target": "obj-dead-c",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-d-c",
                  "type": "reference",
                  "label": "internal cyclic",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "HotSpot garbage collectors partition heap into Strongly Reachable, Softly/Weakly Reachable, and Unreachable.",
            "whyIsItUsed": "Accurate reachability ensures memory safety without memory leaks or premature collection.",
            "javaSyntax": "GC Tracing Phase (Safepoint)",
            "howItWorks": "Breadth-first/depth-first graph traversal from root set; unmarked objects are collected.",
            "visualRepresentation": "Green path for reachable nodes; red dashed outline for orphan island.",
            "realWorldExample": "Electric grid supplying power to connected buildings vs severed power lines.",
            "commonMistakes": "Failing to recognize that internal cyclic references cannot save an island from GC.",
            "challenge": "Trace how breaking the root link turns the entire graph into garbage."
          }
        }
      ]
    }
  ]
};

export const SUBSECTIONS_BY_MODULE: Record<string, SubsectionDefinition[]> = {
  ...GROUP1_SUBSECTIONS,
  ...GROUP2_SUBSECTIONS_BY_MODULE,
  ...GROUP3_SUBSECTIONS_BY_MODULE,
  ...GROUP4_SUBSECTIONS_BY_MODULE,
};

export function getModuleSubsections(moduleId: string): SubsectionDefinition[] {
  return SUBSECTIONS_BY_MODULE[moduleId] || [];
}

export function getSubsection(subId: string): SubsectionDefinition | undefined {
  for (const moduleSubs of Object.values(SUBSECTIONS_BY_MODULE)) {
    const found = moduleSubs.find((s) => s.id === subId);
    if (found) return found;
  }
  return undefined;
}
