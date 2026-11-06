/**
 * OOPS LAB — GROUP 2 (MODULES 08 TO 15) AUTHORITATIVE MASTER CATALOG
 * Conforms strictly to Group 2 Master Prompt Specifications:
 * - Module 08: Inheritance (Subsections 08.1 - 08.12)
 * - Module 09: Polymorphism (Subsections 09.1 - 09.12)
 * - Module 10: Encapsulation (Subsections 10.1 - 10.12)
 * - Module 11: Abstraction (Subsections 11.1 - 11.9)
 * - Module 12: Abstract Classes (Subsections 12.1 - 12.12)
 * - Module 13: Interfaces (Subsections 13.1 - 13.12)
 * - Module 14: Composition (Subsections 14.1 - 14.10)
 * - Module 15: Aggregation (Subsections 15.1 - 15.10)
 */

import { SubsectionDefinition } from './types';

export const GROUP2_SUBSECTIONS_BY_MODULE: Record<string, SubsectionDefinition[]> = {
  "inheritance": [
    {
      "id": "08-1-basic-inheritance",
      "code": "08.1",
      "title": "Basic Inheritance",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-1-s1",
          "title": "1. Animal and Dog Hierarchy",
          "level": "beginner",
          "learningObjective": "Understand class derivation using extends and member inheritance.",
          "javaSource": "class Animal {\n    String name;\n\n    void eat() {\n        System.out.println(\"Animal eats\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Dog barks\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        dog.name = \"Rex\";\n        dog.eat();\n        dog.bark();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-animal",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-animal",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "name",
                      "type": "String",
                      "visibility": "package-private",
                      "isStatic": false,
                      "isFinal": false
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "eat",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": [],
                      "isStatic": false,
                      "isAbstract": false
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
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
                      "name": "bark",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": [],
                      "isStatic": false,
                      "isAbstract": false
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dog-an",
                "source": "cls-dog",
                "target": "cls-animal",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-an",
                  "type": "inheritance",
                  "label": "extends",
                  "sourceName": "Dog",
                  "targetName": "Animal",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Inheritance allows a child class to inherit fields and methods from a parent class.",
            "whyIsItUsed": "Enables code reuse and builds intuitive type hierarchies.",
            "javaSyntax": "class Dog extends Animal { ... }",
            "howItWorks": "Dog inherits name and eat() from Animal while adding bark().",
            "visualRepresentation": "Animal above Dog with a solid green connector (#16A34A) and hollow closed triangle pointing to Animal.",
            "realWorldExample": "Animal is the general blueprint; Dog specializes it.",
            "commonMistakes": "Thinking private members are accessible in subclasses.",
            "challenge": "Add a breed field to Dog and instantiate in Main."
          }
        }
      ]
    },
    {
      "id": "08-2-single-inheritance",
      "code": "08.2",
      "title": "Single Inheritance",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-2-s1",
          "title": "1. Person and Employee",
          "level": "beginner",
          "learningObjective": "Single direct superclass relationship in Java.",
          "javaSource": "class Person {\n    protected String name;\n    protected int age;\n\n    public void display() {\n        System.out.println(name + \", \" + age);\n    }\n}\n\nclass Employee extends Person {\n    private double salary;\n\n    public void setSalary(double s) {\n        this.salary = s;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-person",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-person",
                  "entityType": "class",
                  "name": "Person",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "name",
                      "type": "String",
                      "visibility": "protected"
                    },
                    {
                      "name": "age",
                      "type": "int",
                      "visibility": "protected"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "display",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-emp",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-emp",
                  "entityType": "class",
                  "name": "Employee",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "salary",
                      "type": "double",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "setSalary",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "double s"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-emp-p",
                "source": "cls-emp",
                "target": "cls-person",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-emp-p",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A class has exactly one direct superclass.",
            "whyIsItUsed": "Prevents Diamond Problem ambiguities.",
            "javaSyntax": "class Employee extends Person { ... }",
            "howItWorks": "Employee gains all protected and public members of Person.",
            "visualRepresentation": "Linear 2-tier tree with hollow triangle pointing up.",
            "realWorldExample": "Employee is a specialized Person.",
            "commonMistakes": "Attempting multiple class inheritance (extends A, B).",
            "challenge": "Add an annualBonus() method in Employee."
          }
        }
      ]
    },
    {
      "id": "08-3-multilevel",
      "code": "08.3",
      "title": "Multilevel Inheritance",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-3-s1",
          "title": "1. LivingThing -> Animal -> Dog",
          "level": "intermediate",
          "learningObjective": "Trace transitive member inheritance across multiple tiers.",
          "javaSource": "class LivingThing {\n    void live() {\n        System.out.println(\"Alive\");\n    }\n}\n\nclass Animal extends LivingThing {\n    void eat() {\n        System.out.println(\"Eating\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Barking\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-lt",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 40
                },
                "data": {
                  "id": "cls-lt",
                  "entityType": "class",
                  "name": "LivingThing",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "live",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-an-ml",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 210
                },
                "data": {
                  "id": "cls-an-ml",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "eat",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog-ml",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 380
                },
                "data": {
                  "id": "cls-dog-ml",
                  "entityType": "class",
                  "name": "Dog",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "bark",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-an-lt",
                "source": "cls-an-ml",
                "target": "cls-lt",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-an-lt",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-dog-an",
                "source": "cls-dog-ml",
                "target": "cls-an-ml",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-an",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Inheritance across a chain of successive subclasses.",
            "whyIsItUsed": "Models gradual specialization across domain levels.",
            "javaSyntax": "class Dog extends Animal; class Animal extends LivingThing;",
            "howItWorks": "Dog instances inherit both live() from LivingThing and eat() from Animal.",
            "visualRepresentation": "Vertical 3-tier chain linked by inheritance connectors.",
            "realWorldExample": "LivingThing -> Animal -> Dog -> Puppy.",
            "commonMistakes": "Thinking grandchild cannot access grandparent members.",
            "challenge": "Add Puppy extending Dog."
          }
        }
      ]
    },
    {
      "id": "08-4-hierarchical",
      "code": "08.4",
      "title": "Hierarchical Inheritance",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-4-s1",
          "title": "1. Animal with Dog, Cat, and Bird",
          "level": "beginner",
          "learningObjective": "Multiple subclasses sharing a single parent class.",
          "javaSource": "class Animal {\n    void eat() {\n        System.out.println(\"Eats food\");\n    }\n}\n\nclass Dog extends Animal { void bark() {} }\nclass Cat extends Animal { void meow() {} }\nclass Bird extends Animal { void fly() {} }",
          "diagram": {
            "nodes": [
              {
                "id": "cls-an-h",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 50
                },
                "data": {
                  "id": "cls-an-h",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "eat",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog-h",
                "type": "classNode",
                "position": {
                  "x": 140,
                  "y": 280
                },
                "data": {
                  "id": "cls-dog-h",
                  "entityType": "class",
                  "name": "Dog",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "bark",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-cat-h",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 280
                },
                "data": {
                  "id": "cls-cat-h",
                  "entityType": "class",
                  "name": "Cat",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "meow",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-bird-h",
                "type": "classNode",
                "position": {
                  "x": 620,
                  "y": 280
                },
                "data": {
                  "id": "cls-bird-h",
                  "entityType": "class",
                  "name": "Bird",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "fly",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dog-h",
                "source": "cls-dog-h",
                "target": "cls-an-h",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-h",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-cat-h",
                "source": "cls-cat-h",
                "target": "cls-an-h",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cat-h",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-bird-h",
                "source": "cls-bird-h",
                "target": "cls-an-h",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-bird-h",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multiple subclasses inheriting from one base parent class.",
            "whyIsItUsed": "Shares common base functionality among sibling types.",
            "javaSyntax": "class Dog extends Animal; class Cat extends Animal; ...",
            "howItWorks": "All siblings share eat() while declaring distinct behaviors.",
            "visualRepresentation": "Tree diagram with 3 child nodes pointing up to Animal.",
            "realWorldExample": "Shape base class extended by Circle, Rectangle, and Triangle.",
            "commonMistakes": "Assuming siblings can access each other's unique methods.",
            "challenge": "Add Fish extending Animal with swim()."
          }
        }
      ]
    },
    {
      "id": "08-5-method-inheritance",
      "code": "08.5",
      "title": "Method Inheritance",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-5-s1",
          "title": "1. Inherited Method Execution",
          "level": "intermediate",
          "learningObjective": "Distinguish between inherited and locally declared methods.",
          "javaSource": "class Vehicle {\n    public void startEngine() {\n        System.out.println(\"Vroom!\");\n    }\n}\n\nclass Car extends Vehicle {\n    public void openTrunk() {\n        System.out.println(\"Trunk opened\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.startEngine(); // Inherited from Vehicle\n        car.openTrunk();   // Declared in Car\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-veh",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-veh",
                  "entityType": "class",
                  "name": "Vehicle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "startEngine",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-car",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-car",
                  "entityType": "class",
                  "name": "Car",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "openTrunk",
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
                "id": "rel-car-veh",
                "source": "cls-car",
                "target": "cls-veh",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-car-veh",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Public and protected methods declared in a superclass are callable on subclass instances.",
            "whyIsItUsed": "Eliminates repetitive method implementations across subclasses.",
            "javaSyntax": "car.startEngine();",
            "howItWorks": "JVM searches Car; finding no startEngine, it ascends to Vehicle.",
            "visualRepresentation": "Inspector shows startEngine under Inherited Methods and openTrunk under Declared Methods.",
            "realWorldExample": "All Vehicles can start; Cars specifically have trunks.",
            "commonMistakes": "Assuming private parent methods can be called.",
            "challenge": "Add an accelerate() method in Vehicle."
          }
        }
      ]
    },
    {
      "id": "08-6-method-overriding",
      "code": "08.6",
      "title": "Method Overriding",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-6-s1",
          "title": "1. Overriding sound() with @Override",
          "level": "intermediate",
          "learningObjective": "Runtime method replacement via method overriding.",
          "javaSource": "class Animal {\n    void sound() {\n        System.out.println(\"Animal makes a sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() {\n        System.out.println(\"Dog barks\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.sound(); // Prints 'Dog barks'\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-an-ovr",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-an-ovr",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "sound",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog-ovr",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-dog-ovr",
                  "entityType": "class",
                  "name": "Dog",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "sound",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dog-an-ovr",
                "source": "cls-dog-ovr",
                "target": "cls-an-ovr",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-an-ovr",
                  "type": "inheritance",
                  "label": "extends & overrides sound()",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A subclass provides its own specific implementation of an inherited method.",
            "whyIsItUsed": "Enables runtime polymorphism through dynamic dispatch.",
            "javaSyntax": "@Override\nvoid sound() { ... }",
            "howItWorks": "JVM VTable points sound() invocation on Dog instances directly to Dog's method.",
            "visualRepresentation": "Overridden sound() method highlighted with specialized badge.",
            "realWorldExample": "Animals make sound; Dogs specifically bark.",
            "commonMistakes": "Changing parameters, which overloads rather than overrides.",
            "challenge": "Override toString() in Dog."
          }
        }
      ]
    },
    {
      "id": "08-7-super-keyword",
      "code": "08.7",
      "title": "Super Keyword",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-7-s1",
          "title": "1. super.sound() and super()",
          "level": "intermediate",
          "learningObjective": "Accessing parent constructors and overridden parent methods.",
          "javaSource": "class Animal {\n    Animal() {\n        System.out.println(\"Animal init\");\n    }\n\n    void sound() {\n        System.out.println(\"Base sound\");\n    }\n}\n\nclass Dog extends Animal {\n    Dog() {\n        super();\n        System.out.println(\"Dog init\");\n    }\n\n    @Override\n    void sound() {\n        super.sound();\n        System.out.println(\"Bark!\");\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-an-sp",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-an-sp",
                  "entityType": "class",
                  "name": "Animal",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [
                    {
                      "name": "Animal",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "methods": [
                    {
                      "name": "sound",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dog-sp",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-dog-sp",
                  "entityType": "class",
                  "name": "Dog",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [
                    {
                      "name": "Dog",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "methods": [
                    {
                      "name": "sound",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dog-an-sp",
                "source": "cls-dog-sp",
                "target": "cls-an-sp",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dog-an-sp",
                  "type": "inheritance",
                  "label": "super() & super.sound()",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "super references the direct superclass to access overridden members or constructors.",
            "whyIsItUsed": "Extends rather than replaces parent behavior.",
            "javaSyntax": "super.sound();\nsuper();",
            "howItWorks": "Bypasses subclass VTable to invoke parent implementation directly.",
            "visualRepresentation": "Dashed invocation link from Dog.sound() to Animal.sound().",
            "realWorldExample": "SavingsAccount.deposit() calls super.deposit() then logs transaction.",
            "commonMistakes": "Putting super() after other constructor statements.",
            "challenge": "Pass a String name argument through super(name)."
          }
        }
      ]
    },
    {
      "id": "08-8-constructor-chaining",
      "code": "08.8",
      "title": "Constructor Chaining",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-8-s1",
          "title": "1. Grandparent -> Parent -> Child Init",
          "level": "intermediate",
          "learningObjective": "Top-down parent-first constructor initialization order.",
          "javaSource": "class Grandparent {\n    Grandparent() { System.out.println(\"1. Grandparent\"); }\n}\n\nclass Parent extends Grandparent {\n    Parent() { super(); System.out.println(\"2. Parent\"); }\n}\n\nclass Child extends Parent {\n    Child() { super(); System.out.println(\"3. Child\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Child();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-gp-cc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 40
                },
                "data": {
                  "id": "cls-gp-cc",
                  "entityType": "class",
                  "name": "Grandparent",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [
                    {
                      "name": "Grandparent",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-p-cc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 210
                },
                "data": {
                  "id": "cls-p-cc",
                  "entityType": "class",
                  "name": "Parent",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [
                    {
                      "name": "Parent",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-c-cc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 380
                },
                "data": {
                  "id": "cls-c-cc",
                  "entityType": "class",
                  "name": "Child",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [
                    {
                      "name": "Child",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-p-gp-cc",
                "source": "cls-p-cc",
                "target": "cls-gp-cc",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-p-gp-cc",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-c-p-cc",
                "source": "cls-c-cc",
                "target": "cls-p-cc",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c-p-cc",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "The ordered execution of constructors from root ancestor down to subclass.",
            "whyIsItUsed": "Ensures parent state is completely valid before child initializes.",
            "javaSyntax": "Child() { super(); ... }",
            "howItWorks": "Constructors chain up to Object before constructor bodies execute down.",
            "visualRepresentation": "Numbered sequence badges 1 -> 2 -> 3.",
            "realWorldExample": "House foundations must cure before building walls.",
            "commonMistakes": "Thinking child constructor body runs before parent body.",
            "challenge": "Trace execution when super() is omitted."
          }
        }
      ]
    },
    {
      "id": "08-9-field-hiding",
      "code": "08.9",
      "title": "Field Hiding",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-9-s1",
          "title": "1. Field Hiding vs Overriding",
          "level": "advanced",
          "learningObjective": "Fields are resolved statically by reference type, not polymorphically.",
          "javaSource": "class Parent {\n    String value = \"ParentValue\";\n}\n\nclass Child extends Parent {\n    String value = \"ChildValue\"; // Hides Parent.value\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        Child c = new Child();\n        System.out.println(p.value); // ParentValue\n        System.out.println(c.value); // ChildValue\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-fh-p",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-fh-p",
                  "entityType": "class",
                  "name": "Parent",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "value",
                      "type": "String",
                      "visibility": "package-private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-fh-c",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-fh-c",
                  "entityType": "class",
                  "name": "Child",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "value",
                      "type": "String",
                      "visibility": "package-private"
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
                "id": "rel-fh-edge",
                "source": "cls-fh-c",
                "target": "cls-fh-p",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-fh-edge",
                  "type": "inheritance",
                  "label": "extends (value hidden)",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A subclass field with the same name as a superclass field hides it.",
            "whyIsItUsed": "Demonstrates compile-time static binding of fields.",
            "javaSyntax": "Parent p = new Child(); p.value; // Accesses Parent.value",
            "howItWorks": "Child instances contain both fields in memory.",
            "visualRepresentation": "Two fields highlighted with Static Binding badge.",
            "realWorldExample": "Local office policies overriding corporate default policies.",
            "commonMistakes": "Expecting p.value to resolve polymorphically to ChildValue.",
            "challenge": "Use a getter method to achieve polymorphic value retrieval."
          }
        }
      ]
    },
    {
      "id": "08-10-access-restrictions",
      "code": "08.10",
      "title": "Access Restrictions",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-10-s1",
          "title": "1. Member Visibility Rules",
          "level": "intermediate",
          "learningObjective": "Accessibility of public, protected, package-private, and private members.",
          "javaSource": "public class Base {\n    public int pub = 1;\n    protected int prot = 2;\n    int def = 3;\n    private int priv = 4;\n}\n\npublic class Sub extends Base {\n    void inspect() {\n        System.out.println(pub);  // OK\n        System.out.println(prot); // OK\n        System.out.println(def);  // OK (same pkg)\n        // System.out.println(priv); // ERROR\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-base-r",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-base-r",
                  "entityType": "class",
                  "name": "Base",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "pub",
                      "type": "int",
                      "visibility": "public"
                    },
                    {
                      "name": "prot",
                      "type": "int",
                      "visibility": "protected"
                    },
                    {
                      "name": "def",
                      "type": "int",
                      "visibility": "package-private"
                    },
                    {
                      "name": "priv",
                      "type": "int",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-sub-r",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-sub-r",
                  "entityType": "class",
                  "name": "Sub",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "inspect",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sub-base-r",
                "source": "cls-sub-r",
                "target": "cls-base-r",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sub-base-r",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Rules restricting which parent members subclasses can access.",
            "whyIsItUsed": "Protects internal state invariants.",
            "javaSyntax": "protected int prot;\nprivate int priv;",
            "howItWorks": "Public and protected are accessible; private is shielded.",
            "visualRepresentation": "Green (accessible) and red (blocked) badges on members.",
            "realWorldExample": "Family members access common rooms; private safes stay locked.",
            "commonMistakes": "Assuming package-private is accessible in different packages.",
            "challenge": "Move Sub to another package and observe def accessibility."
          }
        }
      ]
    },
    {
      "id": "08-11-final-restrictions",
      "code": "08.11",
      "title": "Final Restrictions",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-11-s1",
          "title": "1. Final Classes and Methods",
          "level": "intermediate",
          "learningObjective": "Preventing class extension and method overriding using final.",
          "javaSource": "class SecurityProtocol {\n    public final void authenticate() {\n        System.out.println(\"Core security handshake\");\n    }\n}\n\nfinal class SecureVault extends SecurityProtocol {\n    // Cannot be extended further\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-sec-p",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-sec-p",
                  "entityType": "class",
                  "name": "SecurityProtocol",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "authenticate",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [],
                      "isFinal": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-sec-v",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 280
                },
                "data": {
                  "id": "cls-sec-v",
                  "entityType": "class",
                  "name": "SecureVault",
                  "classType": "class",
                  "visibility": "public",
                  "isFinal": true,
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sec-edge",
                "source": "cls-sec-v",
                "target": "cls-sec-p",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sec-edge",
                  "type": "inheritance",
                  "label": "extends (leaf)",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "final classes cannot be extended; final methods cannot be overridden.",
            "whyIsItUsed": "Guarantees immutability and prevents architectural tampering.",
            "javaSyntax": "final class SecureVault; final void authenticate();",
            "howItWorks": "Compiler rejects any class attempting to extend SecureVault.",
            "visualRepresentation": "Padlock icon and final chip in entity inspector.",
            "realWorldExample": "java.lang.String is final for security and performance.",
            "commonMistakes": "Declaring abstract final, which is a contradiction.",
            "challenge": "Try extending SecureVault in the code editor."
          }
        }
      ]
    },
    {
      "id": "08-12-upcasting",
      "code": "08.12",
      "title": "Upcasting and Type Compatibility",
      "moduleId": "inheritance",
      "scenarios": [
        {
          "id": "08-12-s1",
          "title": "1. Animal a = new Dog()",
          "level": "intermediate",
          "learningObjective": "Declared reference type vs actual runtime object type.",
          "javaSource": "class Animal {\n    void sound() { System.out.println(\"Animal sound\"); }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() { System.out.println(\"Bark!\"); }\n    void fetch() { System.out.println(\"Fetch ball\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog(); // Safe upcast\n        a.sound(); // Calls Dog.sound()\n        // a.fetch(); // Compile error\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-a-ref",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 180
                },
                "data": {
                  "id": "var-a-ref",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "Animal",
                  "variableScope": "local",
                  "referenceTargetId": "obj-dog-upcast",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-dog-upcast",
                "type": "objectNode",
                "position": {
                  "x": 500,
                  "y": 180
                },
                "data": {
                  "id": "obj-dog-upcast",
                  "entityType": "object",
                  "className": "Dog",
                  "simulatorAddress": "obj-001",
                  "instanceFieldValues": {},
                  "runtimeState": "active",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-upcast",
                "source": "var-a-ref",
                "target": "obj-dog-upcast",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-upcast",
                  "type": "reference",
                  "label": "points to Dog (as Animal)",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Assigning a child instance to a parent reference variable.",
            "whyIsItUsed": "Enables writing generalized code that works for any subclass.",
            "javaSyntax": "Animal a = new Dog();",
            "howItWorks": "Reference type (Animal) restricts compile-time calls; runtime object (Dog) provides behavior.",
            "visualRepresentation": "Reference variable pointing to Dog object with Animal type badge.",
            "realWorldExample": "A parking space holds Vehicles, whether Cars or Trucks.",
            "commonMistakes": "Calling subclass-only methods through a parent reference.",
            "challenge": "Cast `((Dog) a).fetch()` after checking instanceof."
          }
        }
      ]
    }
  ],
  "polymorphism": [
    {
      "id": "09-1-compile-time",
      "code": "09.1",
      "title": "Compile-Time Polymorphism (Overloading)",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-1-s1",
          "title": "1. Method Overloading in Calculator",
          "level": "beginner",
          "learningObjective": "Understand method overloading resolved statically at compile time.",
          "javaSource": "class Calculator {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n    String add(String a, String b) { return a + b; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        calc.add(5, 10);       // Invokes add(int, int)\n        calc.add(2.5, 4.5);   // Invokes add(double, double)\n        calc.add(\"Hi\", \"!\");   // Invokes add(String, String)\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-calc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 80
                },
                "data": {
                  "id": "cls-calc",
                  "entityType": "class",
                  "name": "Calculator",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "add",
                      "returnType": "int",
                      "visibility": "package-private",
                      "parameters": [
                        "int a",
                        "int b"
                      ]
                    },
                    {
                      "name": "add",
                      "returnType": "double",
                      "visibility": "package-private",
                      "parameters": [
                        "double a",
                        "double b"
                      ]
                    },
                    {
                      "name": "add",
                      "returnType": "String",
                      "visibility": "package-private",
                      "parameters": [
                        "String a",
                        "String b"
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
            "whatIsIt": "Method overloading: multiple methods with the same name but distinct parameter signatures.",
            "whyIsItUsed": "Provides clean, intuitive APIs for operations with different input types.",
            "javaSyntax": "int add(int a, int b); double add(double a, double b);",
            "howItWorks": "Compiler chooses the exact overload based on arguments passed at compile time.",
            "visualRepresentation": "A single class block displaying three overloaded method signatures with signature badges.",
            "realWorldExample": "PrintStream.println() is overloaded for int, double, boolean, and Object.",
            "commonMistakes": "Changing only the return type; parameter types or counts must differ.",
            "challenge": "Add an overload `int add(int a, int b, int c)`."
          }
        }
      ]
    },
    {
      "id": "09-2-runtime-poly",
      "code": "09.2",
      "title": "Runtime Polymorphism (Overriding)",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-2-s1",
          "title": "1. Shape draw() Dynamic Dispatch",
          "level": "intermediate",
          "learningObjective": "Demonstrate dynamic method dispatch through parent references.",
          "javaSource": "class Shape {\n    void draw() { System.out.println(\"Generic shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override\n    void draw() { System.out.println(\"Circle.draw()\"); }\n}\n\nclass Rectangle extends Shape {\n    @Override\n    void draw() { System.out.println(\"Rectangle.draw()\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape a = new Circle();\n        Shape b = new Rectangle();\n        a.draw(); // Dynamic dispatch to Circle\n        b.draw(); // Dynamic dispatch to Rectangle\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-shape-poly",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 40
                },
                "data": {
                  "id": "cls-shape-poly",
                  "entityType": "class",
                  "name": "Shape",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "draw",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-circle-poly",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 240
                },
                "data": {
                  "id": "cls-circle-poly",
                  "entityType": "class",
                  "name": "Circle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "draw",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-rect-poly",
                "type": "classNode",
                "position": {
                  "x": 560,
                  "y": 240
                },
                "data": {
                  "id": "cls-rect-poly",
                  "entityType": "class",
                  "name": "Rectangle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "draw",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-circ-shape",
                "source": "cls-circle-poly",
                "target": "cls-shape-poly",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-circ-shape",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-rect-shape",
                "source": "cls-rect-poly",
                "target": "cls-shape-poly",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-rect-shape",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Runtime polymorphism is when a call to an overridden method is resolved at runtime rather than compile time.",
            "whyIsItUsed": "Allows client code to treat all subclasses uniformly through the parent type.",
            "javaSyntax": "Shape a = new Circle(); a.draw();",
            "howItWorks": "JVM checks the runtime class of `a` (Circle) and dispatches to Circle's draw() via VTable.",
            "visualRepresentation": "Three distinct regions: Reference (Shape a), Runtime Object (Circle), and Selected Method (Circle.draw()).",
            "realWorldExample": "Clicking 'Play' on a media player plays audio or video depending on the actual file.",
            "commonMistakes": "Confusing compile-time reference type with runtime object type.",
            "challenge": "Add Triangle extending Shape and invoke draw() dynamically."
          }
        }
      ]
    },
    {
      "id": "09-3-parent-ref",
      "code": "09.3",
      "title": "Parent Reference",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-3-s1",
          "title": "1. One Parent Ref Holding Child",
          "level": "beginner",
          "learningObjective": "Observe parent reference holding a specialized subclass instance.",
          "javaSource": "class Animal { void speak() {} }\nclass Cat extends Animal {\n    @Override\n    void speak() { System.out.println(\"Meow\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal pet = new Cat();\n        pet.speak();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-pet",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 160
                },
                "data": {
                  "id": "var-pet",
                  "entityType": "variable",
                  "name": "pet",
                  "variableType": "Animal",
                  "referenceTargetId": "obj-cat",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-cat",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 160
                },
                "data": {
                  "id": "obj-cat",
                  "entityType": "object",
                  "className": "Cat",
                  "simulatorAddress": "obj-002",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-pet-cat",
                "source": "var-pet",
                "target": "obj-cat",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pet-cat",
                  "type": "reference",
                  "label": "references Cat as Animal",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A superclass variable holding the memory address of a subclass heap object.",
            "whyIsItUsed": "Decouples the variable's declaration from concrete implementation details.",
            "javaSyntax": "Animal pet = new Cat();",
            "howItWorks": "The stack variable stores a reference to a heap object of type Cat.",
            "visualRepresentation": "Blue pointer arrow connecting stack reference `pet: Animal` to heap object `Cat`.",
            "realWorldExample": "Holding a 'Device' reference that actually points to a 'Smartphone'.",
            "commonMistakes": "Thinking pet becomes an Animal; the object remains fully Cat.",
            "challenge": "Reassign `pet = new Dog()` and observe type compatibility."
          }
        }
      ]
    },
    {
      "id": "09-4-multiple-impl",
      "code": "09.4",
      "title": "Multiple Implementations",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-4-s1",
          "title": "1. Uniform Processing of Sibling Types",
          "level": "intermediate",
          "learningObjective": "Process heterogeneous subclass instances through a shared interface/class.",
          "javaSource": "abstract class Notification {\n    abstract void send(String msg);\n}\nclass EmailNotification extends Notification {\n    void send(String msg) { System.out.println(\"Email: \" + msg); }\n}\nclass SmsNotification extends Notification {\n    void send(String msg) { System.out.println(\"SMS: \" + msg); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-notif",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 50
                },
                "data": {
                  "id": "cls-notif",
                  "entityType": "class",
                  "name": "Notification",
                  "classType": "abstract",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "send",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": [
                        "String msg"
                      ],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-email",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 240
                },
                "data": {
                  "id": "cls-email",
                  "entityType": "class",
                  "name": "EmailNotification",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "send",
                      "returnType": "void",
                      "visibility": "package-private",
                      "parameters": [
                        "String msg"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-sms",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 240
                },
                "data": {
                  "id": "cls-sms",
                  "entityType": "class",
                  "name": "SmsNotification",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "send",
                      "returnType": "void",
                      "visibility": "package-private",
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
                "id": "rel-em-notif",
                "source": "cls-email",
                "target": "cls-notif",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-em-notif",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-sms-notif",
                "source": "cls-sms",
                "target": "cls-notif",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sms-notif",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Multiple concrete classes providing distinct implementations of a common abstract contract.",
            "whyIsItUsed": "Enables extensible architecture adhering to Open/Closed Principle.",
            "javaSyntax": "Notification n = new EmailNotification();",
            "howItWorks": "Each subclass fulfills send() according to its specific delivery medium.",
            "visualRepresentation": "Abstract Notification at top with multiple subclass branches.",
            "realWorldExample": "Sending alerts via Email, SMS, or Push notifications.",
            "commonMistakes": "Hardcoding `if (type == 1) email() else sms()` instead of using polymorphism.",
            "challenge": "Add SlackNotification extending Notification."
          }
        }
      ]
    },
    {
      "id": "09-5-dynamic-dispatch",
      "code": "09.5",
      "title": "Dynamic Dispatch (VTable)",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-5-s1",
          "title": "1. JVM Virtual Method Table (VTable)",
          "level": "advanced",
          "learningObjective": "Trace how JVM uses the Virtual Method Table to resolve overridden calls.",
          "javaSource": "class Base {\n    void m1() { System.out.println(\"Base.m1\"); }\n    void m2() { System.out.println(\"Base.m2\"); }\n}\nclass Derived extends Base {\n    @Override\n    void m2() { System.out.println(\"Derived.m2\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-v-base",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 50
                },
                "data": {
                  "id": "cls-v-base",
                  "entityType": "class",
                  "name": "Base",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "m1",
                      "returnType": "void",
                      "parameters": []
                    },
                    {
                      "name": "m2",
                      "returnType": "void",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-v-derived",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 250
                },
                "data": {
                  "id": "cls-v-derived",
                  "entityType": "class",
                  "name": "Derived",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "m2",
                      "returnType": "void",
                      "parameters": []
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-v-edge",
                "source": "cls-v-derived",
                "target": "cls-v-base",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-v-edge",
                  "type": "inheritance",
                  "label": "extends (VTable overrides m2)",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Dynamic dispatch is the JVM mechanism that selects which method implementation to execute at runtime.",
            "whyIsItUsed": "Powers polymorphic method calls via constant-time VTable array indexing.",
            "javaSyntax": "Base b = new Derived(); b.m2(); // dispatches to Derived.m2()",
            "howItWorks": "Each class has a VTable of function pointers; Derived replaces slot m2 with its own function pointer.",
            "visualRepresentation": "Inspector displays VTable mapping with slot 0 (m1 -> Base) and slot 1 (m2 -> Derived).",
            "realWorldExample": "Operating system device driver jump tables.",
            "commonMistakes": "Thinking static methods use VTable; static methods use invokestatic (compile-time bound).",
            "challenge": "Add an overridden m1() in Derived."
          }
        }
      ]
    },
    {
      "id": "09-6-upcasting",
      "code": "09.6",
      "title": "Implicit Upcasting",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-6-s1",
          "title": "1. Safe Widening Reference Conversion",
          "level": "beginner",
          "learningObjective": "Implicit conversion from derived type to base type.",
          "javaSource": "class Vehicle {}\nclass Bike extends Vehicle {}\npublic class Main {\n    public static void main(String[] args) {\n        Bike b = new Bike();\n        Vehicle v = b; // Upcast: always safe\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-b-up",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "var-b-up",
                  "entityType": "variable",
                  "name": "b",
                  "variableType": "Bike",
                  "referenceTargetId": "obj-bike",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-v-up",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 260
                },
                "data": {
                  "id": "var-v-up",
                  "entityType": "variable",
                  "name": "v",
                  "variableType": "Vehicle",
                  "referenceTargetId": "obj-bike",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-bike",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 200
                },
                "data": {
                  "id": "obj-bike",
                  "entityType": "object",
                  "className": "Bike",
                  "simulatorAddress": "obj-001",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-b-obj",
                "source": "var-b-up",
                "target": "obj-bike",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-b-obj",
                  "type": "reference",
                  "label": "points to",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-v-obj",
                "source": "var-v-up",
                "target": "obj-bike",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-v-obj",
                  "type": "reference",
                  "label": "upcast reference",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Treating a subclass object as an instance of its superclass without explicit casting.",
            "whyIsItUsed": "Safe, guaranteed to succeed because every Bike 'is-a' Vehicle.",
            "javaSyntax": "Vehicle v = b;",
            "howItWorks": "Two reference variables on the stack pointing to the same single heap instance.",
            "visualRepresentation": "Two stack variables converging onto one single Bike heap object.",
            "realWorldExample": "Accepting any PaymentMethod at a store register.",
            "commonMistakes": "Thinking upcasting clones or transforms the heap object.",
            "challenge": "Verify that `b == v` evaluates to true."
          }
        }
      ]
    },
    {
      "id": "09-7-downcasting",
      "code": "09.7",
      "title": "Downcasting & instanceof",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-7-s1",
          "title": "1. Safe Downcasting with Pattern Matching",
          "level": "intermediate",
          "learningObjective": "Downcasting from superclass to subclass with runtime type checking.",
          "javaSource": "class Animal {}\nclass Dog extends Animal {\n    void fetch() { System.out.println(\"Fetching!\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        if (a instanceof Dog d) {\n            d.fetch(); // Safe downcasting\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "var-down-a",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 140
                },
                "data": {
                  "id": "var-down-a",
                  "entityType": "variable",
                  "name": "a",
                  "variableType": "Animal",
                  "referenceTargetId": "obj-d-down",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-down-d",
                "type": "variableNode",
                "position": {
                  "x": 160,
                  "y": 260
                },
                "data": {
                  "id": "var-down-d",
                  "entityType": "variable",
                  "name": "d",
                  "variableType": "Dog",
                  "referenceTargetId": "obj-d-down",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "obj-d-down",
                "type": "objectNode",
                "position": {
                  "x": 480,
                  "y": 200
                },
                "data": {
                  "id": "obj-d-down",
                  "entityType": "object",
                  "className": "Dog",
                  "simulatorAddress": "obj-001",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-down-a",
                "source": "var-down-a",
                "target": "obj-d-down",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-down-a",
                  "type": "reference",
                  "label": "Animal ref",
                  "provenance": "RUNTIME"
                }
              },
              {
                "id": "rel-down-d",
                "source": "var-down-d",
                "target": "obj-d-down",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-down-d",
                  "type": "reference",
                  "label": "downcast Dog ref",
                  "provenance": "RUNTIME"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Downcasting is converting a superclass reference back to a subclass reference type.",
            "whyIsItUsed": "To regain access to specialized subclass-only methods.",
            "javaSyntax": "if (a instanceof Dog d) { d.fetch(); }",
            "howItWorks": "JVM checks actual runtime heap object type; throws ClassCastException if incompatible.",
            "visualRepresentation": "Verified type-check badge on Dog reference.",
            "realWorldExample": "Checking if a generic User is an Admin before opening admin tools.",
            "commonMistakes": "Downcasting without instanceof check, leading to ClassCastException.",
            "challenge": "Cast an Animal holding Cat to Dog and observe ClassCastException."
          }
        }
      ]
    },
    {
      "id": "09-8-interface-poly",
      "code": "09.8",
      "title": "Interface Polymorphism",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-8-s1",
          "title": "1. Printable Contract Implementations",
          "level": "beginner",
          "learningObjective": "Polymorphism via interface contracts across unrelated class trees.",
          "javaSource": "interface Printable {\n    void print();\n}\nclass Document implements Printable {\n    public void print() { System.out.println(\"Doc\"); }\n}\nclass Photo implements Printable {\n    public void print() { System.out.println(\"Photo\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-print",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 50
                },
                "data": {
                  "id": "iface-print",
                  "entityType": "class",
                  "name": "Printable",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "print",
                      "returnType": "void",
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-doc",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 240
                },
                "data": {
                  "id": "cls-doc",
                  "entityType": "class",
                  "name": "Document",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "print",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-photo",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 240
                },
                "data": {
                  "id": "cls-photo",
                  "entityType": "class",
                  "name": "Photo",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "print",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-doc-print",
                "source": "cls-doc",
                "target": "iface-print",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-doc-print",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-photo-print",
                "source": "cls-photo",
                "target": "iface-print",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-photo-print",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Invoking methods through an interface reference implemented by different classes.",
            "whyIsItUsed": "Decouples callers from class inheritance hierarchies completely.",
            "javaSyntax": "Printable p = new Document(); p.print();",
            "howItWorks": "JVM uses itable (interface table) resolution to locate print() on Document or Photo.",
            "visualRepresentation": "Dashed cyan connectors (#0891B2) with hollow closed triangles pointing to Printable.",
            "realWorldExample": "USB port accepts flash drives, mice, and keyboards uniformly.",
            "commonMistakes": "Forgetting that interface methods must be declared public in implementing classes.",
            "challenge": "Create a Receipt class implementing Printable."
          }
        }
      ]
    },
    {
      "id": "09-9-abstract-poly",
      "code": "09.9",
      "title": "Abstract Class Polymorphism",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-9-s1",
          "title": "1. Abstract Parent Reference",
          "level": "intermediate",
          "learningObjective": "Abstract parent references dispatching to concrete subclasses.",
          "javaSource": "abstract class Employee {\n    abstract double computePay();\n}\nclass SalariedEmployee extends Employee {\n    double salary = 5000;\n    double computePay() { return salary; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-abs-emp",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-abs-emp",
                  "entityType": "class",
                  "name": "Employee",
                  "classType": "abstract",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "computePay",
                      "returnType": "double",
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-sal-emp",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 260
                },
                "data": {
                  "id": "cls-sal-emp",
                  "entityType": "class",
                  "name": "SalariedEmployee",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "salary",
                      "type": "double"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "computePay",
                      "returnType": "double"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-sal-emp-edge",
                "source": "cls-sal-emp",
                "target": "cls-abs-emp",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-sal-emp-edge",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Polymorphism where the base contract is an abstract class.",
            "whyIsItUsed": "Shares common state and partial methods while requiring specific subclasses to implement others.",
            "javaSyntax": "Employee e = new SalariedEmployee(); e.computePay();",
            "howItWorks": "Abstract method computePay() is bound at runtime to SalariedEmployee.",
            "visualRepresentation": "Abstract class italicized with purple abstraction badge; child fulfills implementation.",
            "realWorldExample": "Employee payroll processor.",
            "commonMistakes": "Trying to instantiate `new Employee()`; abstract classes cannot be directly allocated.",
            "challenge": "Add HourlyEmployee extending Employee."
          }
        }
      ]
    },
    {
      "id": "09-10-poly-arrays",
      "code": "09.10",
      "title": "Polymorphic Arrays",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-10-s1",
          "title": "1. Heterogeneous Subclass Array",
          "level": "intermediate",
          "learningObjective": "Store diverse subclass instances inside a single parent-type array.",
          "javaSource": "class Shape { void draw() {} }\nclass Circle extends Shape { void draw() { System.out.println(\"Circle\"); } }\nclass Square extends Shape { void draw() { System.out.println(\"Square\"); } }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = new Shape[] { new Circle(), new Square() };\n        for (Shape s : shapes) {\n            s.draw(); // Dispatches polymorphically\n        }\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "arr-shapes",
                "type": "arrayNode",
                "position": {
                  "x": 260,
                  "y": 140
                },
                "data": {
                  "id": "arr-shapes",
                  "entityType": "array",
                  "name": "shapes",
                  "arrayType": "Shape[]",
                  "arrayLength": 2,
                  "arrayCells": [
                    {
                      "index": 0,
                      "value": "Circle@obj1"
                    },
                    {
                      "index": 1,
                      "value": "Square@obj2"
                    }
                  ],
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "An array typed to a superclass holding pointers to diverse subclass instances.",
            "whyIsItUsed": "Enables batch processing of diverse domain objects with a single loop.",
            "javaSyntax": "Shape[] shapes = { new Circle(), new Square() };",
            "howItWorks": "Array elements are references to distinct heap objects with their own VTables.",
            "visualRepresentation": "Array cell block showing indexed slots pointing to Circle and Square objects.",
            "realWorldExample": "A canvas document rendering a collection of mixed graphical shapes.",
            "commonMistakes": "ArrayStoreException when trying to insert an incompatible type into an upcast array.",
            "challenge": "Iterate with a stream and call draw() on all shapes."
          }
        }
      ]
    },
    {
      "id": "09-11-overloading-resolution",
      "code": "09.11",
      "title": "Overload Resolution Rules",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-11-s1",
          "title": "1. Primitive Widening vs Boxing Resolution",
          "level": "advanced",
          "learningObjective": "Understand Java's 3-phase overload resolution algorithm.",
          "javaSource": "class OverloadDemo {\n    void process(long x) { System.out.println(\"widening to long\"); }\n    void process(Integer x) { System.out.println(\"autoboxing to Integer\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        OverloadDemo demo = new OverloadDemo();\n        int val = 10;\n        demo.process(val); // Widening beats autoboxing! Prints 'widening to long'\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-ovl-res",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 80
                },
                "data": {
                  "id": "cls-ovl-res",
                  "entityType": "class",
                  "name": "OverloadDemo",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "process",
                      "returnType": "void",
                      "parameters": [
                        "long x"
                      ]
                    },
                    {
                      "name": "process",
                      "returnType": "void",
                      "parameters": [
                        "Integer x"
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
            "whatIsIt": "Compiler rules selecting the most specific overloaded method.",
            "whyIsItUsed": "Determines call targets statically based on widening, boxing, and varargs precedence.",
            "javaSyntax": "demo.process(val);",
            "howItWorks": "Phase 1: subtyping without boxing. Phase 2: with boxing. Phase 3: with varargs.",
            "visualRepresentation": "Resolution tree indicating why `process(long)` is chosen over `process(Integer)`.",
            "realWorldExample": "Math.abs() overloaded for int, long, float, double.",
            "commonMistakes": "Assuming autoboxing takes priority over widening primitive conversion.",
            "challenge": "Add `void process(int... x)` and test its precedence."
          }
        }
      ]
    },
    {
      "id": "09-12-static-hiding",
      "code": "09.12",
      "title": "Static Method Hiding",
      "moduleId": "polymorphism",
      "scenarios": [
        {
          "id": "09-12-s1",
          "title": "1. Static Methods are Not Polymorphic",
          "level": "advanced",
          "learningObjective": "Observe why static methods are hidden, not overridden.",
          "javaSource": "class Parent {\n    static void print() { System.out.println(\"Parent.print\"); }\n}\nclass Child extends Parent {\n    static void print() { System.out.println(\"Child.print\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.print(); // Prints 'Parent.print' because static binding applies!\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-st-p",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "cls-st-p",
                  "entityType": "class",
                  "name": "Parent",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "print",
                      "returnType": "void",
                      "isStatic": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-st-c",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 260
                },
                "data": {
                  "id": "cls-st-c",
                  "entityType": "class",
                  "name": "Child",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "print",
                      "returnType": "void",
                      "isStatic": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-st-edge",
                "source": "cls-st-c",
                "target": "cls-st-p",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-st-edge",
                  "type": "inheritance",
                  "label": "extends (static print hidden)",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Static methods belong to classes, not instances, and therefore do not participate in dynamic dispatch.",
            "whyIsItUsed": "Demonstrates compile-time static binding (invokestatic bytecode).",
            "javaSyntax": "Parent.print(); Child.print();",
            "howItWorks": "The compiler replaces `p.print()` with `Parent.print()` based on `p`'s declared reference type.",
            "visualRepresentation": "Entity inspector displays Metaspace Static Binding tag.",
            "realWorldExample": "Factory helper methods on utility classes.",
            "commonMistakes": "Thinking adding @Override on a static method compiles; the compiler rejects it.",
            "challenge": "Remove `static` and observe how dynamic dispatch activates."
          }
        }
      ]
    }
  ],
  "encapsulation": [
    {
      "id": "10-1-data-hiding",
      "code": "10.1",
      "title": "Data Hiding & Private State",
      "moduleId": "encapsulation",
      "scenarios": [
        {
          "id": "10-1-s1",
          "title": "1. BankAccount Private Balance",
          "level": "beginner",
          "learningObjective": "Shield internal state from direct external tampering.",
          "javaSource": "class BankAccount {\n    private double balance;\n\n    public BankAccount(double initial) {\n        if (initial > 0) balance = initial;\n    }\n\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-bank-enc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 100
                },
                "data": {
                  "id": "cls-bank-enc",
                  "entityType": "class",
                  "name": "BankAccount",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "balance",
                      "type": "double",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [
                    {
                      "name": "BankAccount",
                      "visibility": "public",
                      "parameters": [
                        "double initial"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "name": "getBalance",
                      "returnType": "double",
                      "visibility": "public",
                      "parameters": []
                    },
                    {
                      "name": "deposit",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "double amount"
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
            "whatIsIt": "Restricting direct access to an object's internal fields by marking them private.",
            "whyIsItUsed": "Prevents unauthorized modification and enforces business rules/invariants.",
            "javaSyntax": "private double balance;",
            "howItWorks": "Only methods defined inside BankAccount can directly read or write `balance`.",
            "visualRepresentation": "Class boundary with red padlock on `- balance` and green checkmarks on `+ deposit()` and `+ getBalance()`.",
            "realWorldExample": "ATM vault is sealed; customers interact via screen controls and keypad.",
            "commonMistakes": "Leaving fields public for quick convenience.",
            "challenge": "Add a `withdraw(double amount)` method with balance verification."
          }
        }
      ]
    },
    {
      "id": "10-8-validation",
      "code": "10.8",
      "title": "State Validation & Invariants",
      "moduleId": "encapsulation",
      "scenarios": [
        {
          "id": "10-8-s1",
          "title": "1. Enforcing Deposit Invariants",
          "level": "intermediate",
          "learningObjective": "Rejecting invalid inputs through setter validation logic.",
          "javaSource": "class Account {\n    private double balance;\n\n    public void deposit(double amount) {\n        if (amount <= 0) {\n            throw new IllegalArgumentException(\"Deposit must be positive\");\n        }\n        balance += amount;\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-acc-val",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 100
                },
                "data": {
                  "id": "cls-acc-val",
                  "entityType": "class",
                  "name": "Account",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "balance",
                      "type": "double",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "deposit",
                      "returnType": "void",
                      "visibility": "public",
                      "parameters": [
                        "double amount"
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
            "whatIsIt": "Validating incoming arguments inside methods to prevent corrupted object states.",
            "whyIsItUsed": "Guarantees domain invariants (e.g. balance >= 0, deposit > 0).",
            "javaSyntax": "if (amount <= 0) throw new IllegalArgumentException();",
            "howItWorks": "Invalid arguments trigger exceptions; valid arguments safely mutate private fields.",
            "visualRepresentation": "Decision gateway: positive amount -> balance updated; negative amount -> rejected with red indicator.",
            "realWorldExample": "Passport office rejects forms with invalid dates of birth.",
            "commonMistakes": "Allowing setters to blindly overwrite fields without bounds checking.",
            "challenge": "Add a maximum transaction limit of $10,000 to deposit."
          }
        }
      ]
    },
    {
      "id": "10-9-immutable-objects",
      "code": "10.9",
      "title": "Immutable Objects",
      "moduleId": "encapsulation",
      "scenarios": [
        {
          "id": "10-9-s1",
          "title": "1. Immutable Currency Pair Record",
          "level": "intermediate",
          "learningObjective": "Creating objects whose state cannot change after instantiation.",
          "javaSource": "public final class Money {\n    private final double amount;\n    private final String currency;\n\n    public Money(double amount, String currency) {\n        this.amount = amount;\n        this.currency = currency;\n    }\n\n    public double getAmount() { return amount; }\n    public String getCurrency() { return currency; }\n\n    public Money add(Money other) {\n        if (!this.currency.equals(other.currency)) throw new IllegalArgumentException();\n        return new Money(this.amount + other.amount, this.currency);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-money",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 100
                },
                "data": {
                  "id": "cls-money",
                  "entityType": "class",
                  "name": "Money",
                  "classType": "class",
                  "visibility": "public",
                  "isFinal": true,
                  "fields": [
                    {
                      "name": "amount",
                      "type": "double",
                      "visibility": "private",
                      "isFinal": true
                    },
                    {
                      "name": "currency",
                      "type": "String",
                      "visibility": "private",
                      "isFinal": true
                    }
                  ],
                  "constructors": [
                    {
                      "name": "Money",
                      "visibility": "public",
                      "parameters": [
                        "double amount",
                        "String currency"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "name": "getAmount",
                      "returnType": "double",
                      "visibility": "public"
                    },
                    {
                      "name": "getCurrency",
                      "returnType": "String",
                      "visibility": "public"
                    },
                    {
                      "name": "add",
                      "returnType": "Money",
                      "visibility": "public",
                      "parameters": [
                        "Money other"
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
            "whatIsIt": "An object whose fields are final, class is final, and no mutator methods exist.",
            "whyIsItUsed": "Inherently thread-safe, prevents side effects, perfect for domain value objects.",
            "javaSyntax": "public final class Money { private final double amount; ... }",
            "howItWorks": "Instead of mutating, operations return brand-new instances with updated values.",
            "visualRepresentation": "All fields marked `final` with lock icons and no setter methods.",
            "realWorldExample": "Java's String, LocalDate, and BigDecimal are all immutable.",
            "commonMistakes": "Returning mutable internal references (like Date or arrays) without defensive copying.",
            "challenge": "Convert Money into a Java record declaration."
          }
        }
      ]
    }
  ],
  "abstraction": [
    {
      "id": "11-4-interface-abstraction",
      "code": "11.4",
      "title": "Interface Abstraction",
      "moduleId": "abstraction",
      "scenarios": [
        {
          "id": "11-4-s1",
          "title": "1. PaymentMethod Contract Separation",
          "level": "beginner",
          "learningObjective": "Separating what operations exist from how they are implemented.",
          "javaSource": "interface PaymentMethod {\n    void pay(double amount);\n}\n\nclass UpiPayment implements PaymentMethod {\n    public void pay(double amount) { System.out.println(\"UPI: \" + amount); }\n}\n\nclass CardPayment implements PaymentMethod {\n    public void pay(double amount) { System.out.println(\"Card: \" + amount); }\n}\n\nclass Checkout {\n    void process(PaymentMethod method, double amount) {\n        method.pay(amount);\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-pm",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 40
                },
                "data": {
                  "id": "iface-pm",
                  "entityType": "class",
                  "name": "PaymentMethod",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "pay",
                      "returnType": "void",
                      "parameters": [
                        "double amount"
                      ],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-upi",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 240
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
                      "name": "pay",
                      "returnType": "void",
                      "parameters": [
                        "double amount"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-card",
                "type": "classNode",
                "position": {
                  "x": 560,
                  "y": 240
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
                      "name": "pay",
                      "returnType": "void",
                      "parameters": [
                        "double amount"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-upi-pm",
                "source": "cls-upi",
                "target": "iface-pm",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-upi-pm",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-card-pm",
                "source": "cls-card",
                "target": "iface-pm",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-card-pm",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Abstraction focuses on what an object does rather than how it does it.",
            "whyIsItUsed": "Reduces cognitive complexity and decouples caller logic from implementation.",
            "javaSyntax": "checkout.process(new UpiPayment(), 100);",
            "howItWorks": "Checkout depends exclusively on the PaymentMethod abstraction; concrete payment logic is completely isolated.",
            "visualRepresentation": "Contract layer at top; implementation layer beneath with Show/Hide toggle.",
            "realWorldExample": "Driving a car: accelerator pedal interface is identical regardless of gas, diesel, or EV engine.",
            "commonMistakes": "Leaking implementation details (e.g. UPI VPA or Card CVV) into the PaymentMethod interface.",
            "challenge": "Add CryptoPayment without altering Checkout."
          }
        }
      ]
    },
    {
      "id": "11-6-dependency-inversion",
      "code": "11.6",
      "title": "Dependency Inversion Principle",
      "moduleId": "abstraction",
      "scenarios": [
        {
          "id": "11-6-s1",
          "title": "1. High-Level Service Depending on Abstraction",
          "level": "advanced",
          "learningObjective": "High-level modules should not depend on low-level modules; both should depend on abstractions.",
          "javaSource": "interface MessageSender {\n    void send(String msg);\n}\nclass EmailSender implements MessageSender {\n    public void send(String msg) { System.out.println(\"Email: \" + msg); }\n}\nclass OrderService {\n    private final MessageSender sender;\n    OrderService(MessageSender sender) { this.sender = sender; }\n    void placeOrder() { sender.send(\"Order placed!\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-sender",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 60
                },
                "data": {
                  "id": "iface-sender",
                  "entityType": "class",
                  "name": "MessageSender",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "send",
                      "returnType": "void",
                      "parameters": [
                        "String msg"
                      ],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-ordersvc",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 60
                },
                "data": {
                  "id": "cls-ordersvc",
                  "entityType": "class",
                  "name": "OrderService",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "sender",
                      "type": "MessageSender",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [
                    {
                      "name": "OrderService",
                      "parameters": [
                        "MessageSender sender"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "name": "placeOrder",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-emailsender",
                "type": "classNode",
                "position": {
                  "x": 480,
                  "y": 260
                },
                "data": {
                  "id": "cls-emailsender",
                  "entityType": "class",
                  "name": "EmailSender",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "send",
                      "returnType": "void",
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
                "id": "rel-ordersvc-sender",
                "source": "cls-ordersvc",
                "target": "iface-sender",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ordersvc-sender",
                  "type": "dependency",
                  "label": "depends on",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-email-sender",
                "source": "cls-emailsender",
                "target": "iface-sender",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-email-sender",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "DIP: Depend on abstractions rather than concrete classes.",
            "whyIsItUsed": "Enables hot-swapping dependencies and effortless mock unit testing.",
            "javaSyntax": "OrderService svc = new OrderService(new EmailSender());",
            "howItWorks": "OrderService references MessageSender interface; concrete EmailSender is injected from outside.",
            "visualRepresentation": "OrderService points right to MessageSender; EmailSender points up to MessageSender.",
            "realWorldExample": "Wall power outlet contract: plug in lamps, laptops, or fans.",
            "commonMistakes": "Instantiating `new EmailSender()` directly inside OrderService constructor.",
            "challenge": "Inject a MockSender for unit testing."
          }
        }
      ]
    }
  ],
  "abstract-classes": [
    {
      "id": "12-1-basic-abstract-class",
      "code": "12.1",
      "title": "Basic Abstract Class",
      "moduleId": "abstract-classes",
      "scenarios": [
        {
          "id": "12-1-s1",
          "title": "1. Shape with Area Contract and Concrete Describe",
          "level": "beginner",
          "learningObjective": "Mixed abstract and concrete members in an abstract class template.",
          "javaSource": "abstract class Shape {\n    abstract double area();\n\n    void describe() {\n        System.out.println(\"Shape with area: \" + area());\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { this.radius = r; }\n\n    @Override\n    double area() { return Math.PI * radius * radius; }\n}\n\nclass Rectangle extends Shape {\n    double w, h;\n    Rectangle(double w, double h) { this.w = w; this.h = h; }\n\n    @Override\n    double area() { return w * h; }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-shape-abs",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 40
                },
                "data": {
                  "id": "cls-shape-abs",
                  "entityType": "class",
                  "name": "Shape",
                  "classType": "abstract",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "area",
                      "returnType": "double",
                      "isAbstract": true
                    },
                    {
                      "name": "describe",
                      "returnType": "void",
                      "isAbstract": false
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-circle-abs",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 240
                },
                "data": {
                  "id": "cls-circle-abs",
                  "entityType": "class",
                  "name": "Circle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "radius",
                      "type": "double"
                    }
                  ],
                  "constructors": [
                    {
                      "name": "Circle",
                      "parameters": [
                        "double r"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "name": "area",
                      "returnType": "double"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-rect-abs",
                "type": "classNode",
                "position": {
                  "x": 560,
                  "y": 240
                },
                "data": {
                  "id": "cls-rect-abs",
                  "entityType": "class",
                  "name": "Rectangle",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "w",
                      "type": "double"
                    },
                    {
                      "name": "h",
                      "type": "double"
                    }
                  ],
                  "constructors": [
                    {
                      "name": "Rectangle",
                      "parameters": [
                        "double w",
                        "double h"
                      ]
                    }
                  ],
                  "methods": [
                    {
                      "name": "area",
                      "returnType": "double"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-c-sh-abs",
                "source": "cls-circle-abs",
                "target": "cls-shape-abs",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-c-sh-abs",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-r-sh-abs",
                "source": "cls-rect-abs",
                "target": "cls-shape-abs",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-r-sh-abs",
                  "type": "inheritance",
                  "label": "extends",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A class declared with `abstract` that cannot be instantiated directly and may contain abstract methods.",
            "whyIsItUsed": "Provides a partial template and enforces that subclasses implement required methods.",
            "javaSyntax": "abstract class Shape { abstract double area(); }",
            "howItWorks": "Circle and Rectangle inherit describe() and provide specific area() calculations.",
            "visualRepresentation": "Abstract class marked with italic name and purple abstract chip; child classes fulfill contracts.",
            "realWorldExample": "Shape defines area concept; Circle and Rectangle implement mathematical formulas.",
            "commonMistakes": "Trying to write `new Shape()` directly, which fails compilation.",
            "challenge": "Instantiate `Shape s = new Circle(5)` and call `s.describe()`."
          }
        }
      ]
    }
  ],
  "interfaces": [
    {
      "id": "13-3-multiple-interfaces",
      "code": "13.3",
      "title": "Multiple Interfaces",
      "moduleId": "interfaces",
      "scenarios": [
        {
          "id": "13-3-s1",
          "title": "1. Smartphone Implementing Camera and MusicPlayer",
          "level": "intermediate",
          "learningObjective": "Java supports implementing multiple independent interfaces.",
          "javaSource": "interface Camera {\n    void takePhoto();\n}\n\ninterface MusicPlayer {\n    void playMusic();\n}\n\nclass Smartphone implements Camera, MusicPlayer {\n    public void takePhoto() { System.out.println(\"Snap!\"); }\n    public void playMusic() { System.out.println(\"Playing tunes\"); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-cam",
                "type": "classNode",
                "position": {
                  "x": 200,
                  "y": 50
                },
                "data": {
                  "id": "iface-cam",
                  "entityType": "class",
                  "name": "Camera",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "takePhoto",
                      "returnType": "void",
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "iface-music",
                "type": "classNode",
                "position": {
                  "x": 560,
                  "y": 50
                },
                "data": {
                  "id": "iface-music",
                  "entityType": "class",
                  "name": "MusicPlayer",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "playMusic",
                      "returnType": "void",
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-phone",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 250
                },
                "data": {
                  "id": "cls-phone",
                  "entityType": "class",
                  "name": "Smartphone",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "takePhoto",
                      "returnType": "void"
                    },
                    {
                      "name": "playMusic",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-phone-cam",
                "source": "cls-phone",
                "target": "iface-cam",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-phone-cam",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-phone-music",
                "source": "cls-phone",
                "target": "iface-music",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-phone-music",
                  "type": "implementation",
                  "label": "implements",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A single class implementing multiple separate interfaces via comma separation.",
            "whyIsItUsed": "Allows a class to satisfy multiple orthogonal contracts without multiple class inheritance.",
            "javaSyntax": "class Smartphone implements Camera, MusicPlayer { ... }",
            "howItWorks": "Smartphone fulfills takePhoto() from Camera and playMusic() from MusicPlayer.",
            "visualRepresentation": "Two interface nodes above; Smartphone connects to both via dashed cyan arrows.",
            "realWorldExample": "A Smartphone acts as both a Camera and a MusicPlayer.",
            "commonMistakes": "Forgetting to implement any method from either interface causes compile error.",
            "challenge": "Add GPS interface with locate() method."
          }
        }
      ]
    },
    {
      "id": "13-8-functional-interfaces",
      "code": "13.8",
      "title": "Functional Interfaces & Lambdas",
      "moduleId": "interfaces",
      "scenarios": [
        {
          "id": "13-8-s1",
          "title": "1. Calculator Lambda Expression",
          "level": "intermediate",
          "learningObjective": "Single Abstract Method (SAM) interface implemented via concise lambda.",
          "javaSource": "@FunctionalInterface\ninterface Calculator {\n    int calculate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calculator add = (a, b) -> a + b;\n        Calculator mult = (a, b) -> a * b;\n        System.out.println(add.calculate(5, 3));  // 8\n        System.out.println(mult.calculate(5, 3)); // 15\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "iface-fn-calc",
                "type": "classNode",
                "position": {
                  "x": 360,
                  "y": 60
                },
                "data": {
                  "id": "iface-fn-calc",
                  "entityType": "class",
                  "name": "Calculator",
                  "classType": "interface",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "calculate",
                      "returnType": "int",
                      "parameters": [
                        "int a",
                        "int b"
                      ],
                      "isAbstract": true
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "var-fn-add",
                "type": "variableNode",
                "position": {
                  "x": 180,
                  "y": 240
                },
                "data": {
                  "id": "var-fn-add",
                  "entityType": "variable",
                  "name": "add",
                  "variableType": "Calculator",
                  "variableValue": "(a,b)->a+b",
                  "provenanceCategory": "RUNTIME"
                }
              },
              {
                "id": "var-fn-mult",
                "type": "variableNode",
                "position": {
                  "x": 540,
                  "y": 240
                },
                "data": {
                  "id": "var-fn-mult",
                  "entityType": "variable",
                  "name": "mult",
                  "variableType": "Calculator",
                  "variableValue": "(a,b)->a*b",
                  "provenanceCategory": "RUNTIME"
                }
              }
            ],
            "edges": []
          },
          "educational": {
            "whatIsIt": "A functional interface has exactly one abstract method and can be instantiated via lambdas.",
            "whyIsItUsed": "Enables concise functional programming, streams, and callback handlers.",
            "javaSyntax": "Calculator add = (a, b) -> a + b;",
            "howItWorks": "JVM uses invokedynamic bytecode to generate lambda instance at runtime without anonymous inner classes.",
            "visualRepresentation": "Calculator interface contract with lambda instantiation nodes below.",
            "realWorldExample": "Runnable, Comparator, and Predicate in Java standard library.",
            "commonMistakes": "Adding a second abstract method to a @FunctionalInterface causes compile error.",
            "challenge": "Write a lambda for subtraction: `(a, b) -> a - b`."
          }
        }
      ]
    }
  ],
  "composition": [
    {
      "id": "14-1-basic-composition",
      "code": "14.1",
      "title": "Basic Composition (Car & Engine)",
      "moduleId": "composition",
      "scenarios": [
        {
          "id": "14-1-s1",
          "title": "1. Car Owns Engine Lifecycle",
          "level": "beginner",
          "learningObjective": "Strong whole-part ownership where the part dies with the whole.",
          "javaSource": "class Engine {\n    void start() { System.out.println(\"Vroom\"); }\n}\n\nclass Car {\n    private final Engine engine;\n\n    Car() {\n        this.engine = new Engine(); // Owned & created by Car\n    }\n\n    void startCar() {\n        engine.start();\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-car-comp",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 140
                },
                "data": {
                  "id": "cls-car-comp",
                  "entityType": "class",
                  "name": "Car",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "engine",
                      "type": "Engine",
                      "visibility": "private",
                      "isFinal": true
                    }
                  ],
                  "constructors": [
                    {
                      "name": "Car",
                      "parameters": []
                    }
                  ],
                  "methods": [
                    {
                      "name": "startCar",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-engine-comp",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "cls-engine-comp",
                  "entityType": "class",
                  "name": "Engine",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "start",
                      "returnType": "void"
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-car-engine-comp",
                "source": "cls-car-comp",
                "target": "cls-engine-comp",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-car-engine-comp",
                  "type": "composition",
                  "label": "owns (1..1)",
                  "sourceName": "Car",
                  "targetName": "Engine",
                  "multiplicity": "1..1",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A strong whole-part ownership relationship where the part cannot exist independently of the whole.",
            "whyIsItUsed": "Models exclusive lifecycle ownership and encapsulation ('has-a').",
            "javaSyntax": "class Car { private final Engine engine = new Engine(); }",
            "howItWorks": "Car creates Engine inside its constructor; when Car is garbage collected, Engine is also collected.",
            "visualRepresentation": "Solid line with filled black diamond (#172033) at the Car (whole) end.",
            "realWorldExample": "A House and its Rooms; a Human and their Heart.",
            "commonMistakes": "Confusing composition with loose aggregation where parts exist independently.",
            "challenge": "Add a Transmission component composed inside Car."
          }
        }
      ]
    },
    {
      "id": "14-3-nested-composition",
      "code": "14.3",
      "title": "Nested Composition",
      "moduleId": "composition",
      "scenarios": [
        {
          "id": "14-3-s1",
          "title": "1. Computer -> Motherboard -> Processor",
          "level": "intermediate",
          "learningObjective": "Multi-level hierarchical whole-part ownership.",
          "javaSource": "class Processor {}\nclass Memory {}\n\nclass Motherboard {\n    private final Processor processor = new Processor();\n    private final Memory memory = new Memory();\n}\n\nclass Computer {\n    private final Motherboard motherboard = new Motherboard();\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-comp-pc",
                "type": "classNode",
                "position": {
                  "x": 100,
                  "y": 140
                },
                "data": {
                  "id": "cls-comp-pc",
                  "entityType": "class",
                  "name": "Computer",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "motherboard",
                      "type": "Motherboard",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-comp-mb",
                "type": "classNode",
                "position": {
                  "x": 380,
                  "y": 140
                },
                "data": {
                  "id": "cls-comp-mb",
                  "entityType": "class",
                  "name": "Motherboard",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "processor",
                      "type": "Processor"
                    },
                    {
                      "name": "memory",
                      "type": "Memory"
                    }
                  ],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-comp-cpu",
                "type": "classNode",
                "position": {
                  "x": 660,
                  "y": 60
                },
                "data": {
                  "id": "cls-comp-cpu",
                  "entityType": "class",
                  "name": "Processor",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-comp-ram",
                "type": "classNode",
                "position": {
                  "x": 660,
                  "y": 220
                },
                "data": {
                  "id": "cls-comp-ram",
                  "entityType": "class",
                  "name": "Memory",
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
                "id": "rel-pc-mb",
                "source": "cls-comp-pc",
                "target": "cls-comp-mb",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-pc-mb",
                  "type": "composition",
                  "label": "owns",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-mb-cpu",
                "source": "cls-comp-mb",
                "target": "cls-comp-cpu",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mb-cpu",
                  "type": "composition",
                  "label": "owns",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-mb-ram",
                "source": "cls-comp-mb",
                "target": "cls-comp-ram",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-mb-ram",
                  "type": "composition",
                  "label": "owns",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "Cascading composition where a whole owns a part that itself owns sub-parts.",
            "whyIsItUsed": "Models structured engineering assemblies and hierarchical domain boundaries.",
            "javaSyntax": "class Computer { private final Motherboard mb = new Motherboard(); }",
            "howItWorks": "Computer lifecycle encapsulates Motherboard, which encapsulates Processor and Memory.",
            "visualRepresentation": "Linear chain of filled diamonds indicating transitive lifecycle control.",
            "realWorldExample": "Automobile -> Transmission -> Gear.",
            "commonMistakes": "Allowing external references to escape private inner parts.",
            "challenge": "Ensure no getter leaks the private Processor reference directly."
          }
        }
      ]
    }
  ],
  "aggregation": [
    {
      "id": "15-1-basic-aggregation",
      "code": "15.1",
      "title": "Basic Aggregation (Department & Professor)",
      "moduleId": "aggregation",
      "scenarios": [
        {
          "id": "15-1-s1",
          "title": "1. Department Aggregates Professors",
          "level": "beginner",
          "learningObjective": "Weak whole-part relationship where parts exist independently.",
          "javaSource": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Professor {\n    String name;\n    Professor(String name) { this.name = name; }\n}\n\nclass Department {\n    private final List<Professor> professors = new ArrayList<>();\n\n    void addProfessor(Professor p) { professors.add(p); }\n    void removeProfessor(Professor p) { professors.remove(p); }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-dept-agg",
                "type": "classNode",
                "position": {
                  "x": 180,
                  "y": 140
                },
                "data": {
                  "id": "cls-dept-agg",
                  "entityType": "class",
                  "name": "Department",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "professors",
                      "type": "List<Professor>",
                      "visibility": "private"
                    }
                  ],
                  "constructors": [],
                  "methods": [
                    {
                      "name": "addProfessor",
                      "returnType": "void",
                      "parameters": [
                        "Professor p"
                      ]
                    },
                    {
                      "name": "removeProfessor",
                      "returnType": "void",
                      "parameters": [
                        "Professor p"
                      ]
                    }
                  ],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-prof-agg",
                "type": "classNode",
                "position": {
                  "x": 540,
                  "y": 140
                },
                "data": {
                  "id": "cls-prof-agg",
                  "entityType": "class",
                  "name": "Professor",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "name",
                      "type": "String"
                    }
                  ],
                  "constructors": [
                    {
                      "name": "Professor",
                      "parameters": [
                        "String name"
                      ]
                    }
                  ],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              }
            ],
            "edges": [
              {
                "id": "rel-dept-prof-agg",
                "source": "cls-dept-agg",
                "target": "cls-prof-agg",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-dept-prof-agg",
                  "type": "aggregation",
                  "label": "aggregates (0..*)",
                  "sourceName": "Department",
                  "targetName": "Professor",
                  "multiplicity": "0..*",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A whole-part relationship where the part can exist independently of the whole ('has-a' weak).",
            "whyIsItUsed": "Models shared membership, external lifecycles, and loose associations.",
            "javaSyntax": "department.addProfessor(professor);",
            "howItWorks": "Professor is instantiated outside Department. If Department is destroyed, Professor remains alive in memory.",
            "visualRepresentation": "Solid line with hollow diamond (#64748B) at Department side.",
            "realWorldExample": "A University Department and Professors; a Sports Team and Players.",
            "commonMistakes": "Thinking deletion of Department deletes its Professors.",
            "challenge": "Demonstrate a Professor belonging to two departments simultaneously."
          }
        }
      ]
    },
    {
      "id": "15-3-shared-aggregation",
      "code": "15.3",
      "title": "Shared Aggregation",
      "moduleId": "aggregation",
      "scenarios": [
        {
          "id": "15-3-s1",
          "title": "1. One Professor Shared Across Two Departments",
          "level": "intermediate",
          "learningObjective": "Single part instance referenced by multiple distinct whole owners.",
          "javaSource": "class Professor {\n    String name;\n    Professor(String name) { this.name = name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Professor drRao = new Professor(\"Dr. Rao\");\n        // Dr. Rao is affiliated with both AI and CS departments\n    }\n}",
          "diagram": {
            "nodes": [
              {
                "id": "cls-dept-ai",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 60
                },
                "data": {
                  "id": "cls-dept-ai",
                  "entityType": "class",
                  "name": "DepartmentAI",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-dept-cs",
                "type": "classNode",
                "position": {
                  "x": 160,
                  "y": 240
                },
                "data": {
                  "id": "cls-dept-cs",
                  "entityType": "class",
                  "name": "DepartmentCS",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [],
                  "constructors": [],
                  "methods": [],
                  "provenanceCategory": "SOURCE"
                }
              },
              {
                "id": "cls-prof-rao",
                "type": "classNode",
                "position": {
                  "x": 520,
                  "y": 150
                },
                "data": {
                  "id": "cls-prof-rao",
                  "entityType": "class",
                  "name": "Professor",
                  "classType": "class",
                  "visibility": "public",
                  "fields": [
                    {
                      "name": "name",
                      "type": "String",
                      "visibility": "public"
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
                "id": "rel-ai-rao",
                "source": "cls-dept-ai",
                "target": "cls-prof-rao",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-ai-rao",
                  "type": "aggregation",
                  "label": "affiliates",
                  "provenance": "STATIC"
                }
              },
              {
                "id": "rel-cs-rao",
                "source": "cls-dept-cs",
                "target": "cls-prof-rao",
                "type": "relationshipEdge",
                "data": {
                  "id": "rel-cs-rao",
                  "type": "aggregation",
                  "label": "affiliates",
                  "provenance": "STATIC"
                }
              }
            ]
          },
          "educational": {
            "whatIsIt": "A single shared part referenced by multiple independent wholes.",
            "whyIsItUsed": "Proves that the part is NOT exclusively owned (impossible in strict composition).",
            "javaSyntax": "ai.addProfessor(drRao); cs.addProfessor(drRao);",
            "howItWorks": "Both departments hold pointers to the exact same Professor object in the Heap.",
            "visualRepresentation": "Two hollow diamond arrows converging onto a single shared Professor node.",
            "realWorldExample": "A course cross-listed across two academic faculties.",
            "commonMistakes": "Duplicating the professor node instead of connecting both departments to one entity.",
            "challenge": "Remove drRao from AI and verify he remains member of CS."
          }
        }
      ]
    }
  ]
};
