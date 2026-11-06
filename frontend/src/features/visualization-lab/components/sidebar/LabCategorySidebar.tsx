import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  BookOpen,
  HelpCircle,
  Box,
  Variable,
  FileCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { VISUALIZATION_CATEGORIES, CATEGORY_GROUPS } from '../../categoriesData';
import { useVisualizationLabStore } from '../../visualizationStore';
import { getModuleSubsections } from '../../subsectionsData';

interface ConceptDefinition {
  num: number;
  term: string;
  shortDef: string;
  deepDef: string;
  icon: React.ReactNode;
  category: string;
}

const MODULE_CONCEPTS: Record<string, ConceptDefinition[]> = {
  'object-rep': [
    {
      num: 1,
      term: 'Object Instance',
      shortDef: 'A concrete runtime object allocated on the JVM Heap with distinct identity.',
      deepDef:
        'When `new Student(...)` is executed, the JVM allocates memory on the Heap. Even if two objects have identical field values, they are completely separate instances with independent lifecycles.',
      icon: <Box className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Heap Memory',
    },
    {
      num: 2,
      term: 'Reference Variable',
      shortDef: 'A variable stored on the Call Stack holding a memory pointer to a Heap object.',
      deepDef:
        '`Student s1` does not store the student object itself; it stores a reference pointer pointing to the heap memory location of `obj-001`.',
      icon: <Variable className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Stack Frame',
    },
    {
      num: 3,
      term: 'Instance Field',
      shortDef: 'A variable declared inside a class that belongs to an individual instance.',
      deepDef:
        '`id`, `name`, and `gpa` belong to each Student. Modifying `s1.gpa = 4.0` mutates `obj-001.gpa` while `obj-002.gpa` remains `3.45` unchanged.',
      icon: <FileCode className="w-3.5 h-3.5 text-[#64748B]" />,
      category: 'State & Mutability',
    },
    {
      num: 4,
      term: 'Class Blueprint',
      shortDef: 'The static schema loaded into JVM Metaspace defining object structure.',
      deepDef:
        'The `Student` class serves as the factory template for all instances. It declares field types, methods, and constructors once in memory.',
      icon: <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />,
      category: 'Metaspace',
    },
    {
      num: 5,
      term: 'Constructor',
      shortDef: 'A special routine invoked during `new` allocation to initialize field state.',
      deepDef:
        '`Student(int id, String name, double gpa)` binds incoming arguments to instance fields (`this.id = id; this.name = name; this.gpa = gpa;`).',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
      category: 'Initialization',
    },
    {
      num: 6,
      term: 'Object Identity',
      shortDef: 'A logical JVM identifier (`obj-001`) guaranteeing unique entity distinction.',
      deepDef:
        'OOPS LAB displays educational logical identities rather than fabricating pseudo-hex physical memory addresses that do not exist.',
      icon: <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />,
      category: 'Identity',
    },
    {
      num: 7,
      term: 'Dependency & Connectors',
      shortDef: 'Directional semantic relationships linking stack, heap, and class tiers.',
      deepDef:
        'Connectors show reference pointers (solid blue arrows), class instantiations (dashed purple lines), and constructor executions (amber arrows).',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Semantics',
    },
  ],
  'class-rep': [
    {
      num: 1,
      term: 'Class Definition',
      shortDef: 'Encapsulated blueprint declaring fields, constructors, and member methods.',
      deepDef:
        'Classes organize Java programs into modular, reusable types adhering to object-oriented encapsulation.',
      icon: <Layers className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'OOP Structure',
    },
    {
      num: 2,
      term: 'Access Modifiers',
      shortDef: 'Keywords restricting member visibility: `+` public, `-` private, `#` protected.',
      deepDef:
        'Encapsulation hides internal implementation details (`- private int id`) and exposes safe public APIs (`+ public String getName()`).',
      icon: <FileCode className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'Encapsulation',
    },
    {
      num: 3,
      term: 'Static Members',
      shortDef: 'Class-level fields or methods shared universally across all instances.',
      deepDef:
        '`UNIVERSITY = "Stanford"` is stored in Metaspace once; it does not replicate per heap instance.',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
      category: 'Metaspace',
    },
    {
      num: 4,
      term: 'UML Association',
      shortDef: 'A structural relationship where one class uses or holds references to another.',
      deepDef:
        '`Student` has an association with `Course` indicating enrollment multiplicity (`1..*`).',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />,
      category: 'UML Modeling',
    },
  ],
  'inheritance': [
    {
      num: 1,
      term: 'Superclass (Parent)',
      shortDef: 'The generalized base class declaring shared fields and base behaviors.',
      deepDef:
        '`Vehicle` defines universal attributes (`brand`, `maxSpeed`) and default engine start functionality.',
      icon: <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />,
      category: 'Hierarchy',
    },
    {
      num: 2,
      term: 'Subclass (Child)',
      shortDef: 'The specialized class inheriting superclass members using the `extends` keyword.',
      deepDef:
        '`ElectricCar` inherits all non-private members of `Vehicle` and introduces specialized battery fields.',
      icon: <Box className="w-3.5 h-3.5 text-[#7C3AED]" />,
      category: 'Hierarchy',
    },
    {
      num: 3,
      term: 'Method Overriding',
      shortDef: 'Replacing a superclass method implementation with specialized child logic.',
      deepDef:
        '`@Override startEngine()` replaces internal combustion ignition with silent electric motor engagement.',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />,
      category: 'Polymorphism',
    },
    {
      num: 4,
      term: 'UML Inheritance Marker',
      shortDef: 'A solid connector with an open hollow triangle pointing to the superclass.',
      deepDef:
        'In UML, the hollow triangle points toward the parent (`ElectricCar -> Vehicle`), symbolizing an "is-a" relationship.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />,
      category: 'UML Standard',
    },
  ],
  'method-call-stack': [
    {
      num: 1,
      term: 'Call Stack Frame',
      shortDef: 'An isolated memory record allocated on the thread stack per method invocation.',
      deepDef:
        'Every time a method is called, the JVM pushes a new stack frame holding its parameters, local variables, and return address.',
      icon: <Layers className="w-3.5 h-3.5 text-[#F47721]" />,
      category: 'JVM Execution',
    },
    {
      num: 2,
      term: 'LIFO Execution Order',
      shortDef: 'Last In, First Out: the most recently invoked method executes at the top.',
      deepDef:
        '`calculateHonorRoll()` executes at the top of the stack while `processStudent()` and `main()` are suspended awaiting its return.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#F47721]" />,
      category: 'Stack Discipline',
    },
    {
      num: 3,
      term: 'Frame Return & Pop',
      shortDef: 'When a method returns, its frame is immediately popped and destroyed.',
      deepDef:
        'Local variables cease to exist once their frame pops; return values pass back down to the caller frame.',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'Lifecycle',
    },
  ],
  'ref-graph': [
    {
      num: 1,
      term: 'Reference Variable',
      shortDef: 'Stack variable containing the address/pointer of a heap object.',
      deepDef:
        '`Student s1` holds a directed pointer to `obj-001`.',
      icon: <Variable className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Pointers',
    },
    {
      num: 2,
      term: 'Aliasing',
      shortDef: 'Multiple reference variables pointing to the exact same heap object instance.',
      deepDef:
        '`Student alias = s1;` does NOT duplicate the student. It creates a second pointer to `obj-001`. Changes through `alias` are visible through `s1`.',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
      category: 'Aliasing',
    },
    {
      num: 3,
      term: 'Null Reference',
      shortDef: 'A reference variable holding `null` that points to zero heap objects.',
      deepDef:
        '`Student s3 = null;` allocates a reference slot on the stack, but no heap object exists. Dereferencing causes `NullPointerException`.',
      icon: <HelpCircle className="w-3.5 h-3.5 text-[#E11D48]" />,
      category: 'Safety',
    },
    {
      num: 4,
      term: 'Object-to-Object Reference',
      shortDef: 'An instance field inside one heap object holding a pointer to another heap object.',
      deepDef:
        '`Student.course` contains a reference pointer pointing to a separate `Course` instance on the heap.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#0284C7]" />,
      category: 'Heap Graph',
    },
  ],
  'polymorphism': [
    {
      num: 1,
      term: 'Declared vs Runtime Type',
      shortDef: 'Reference declared as parent type `Shape`, but points to runtime `Circle`.',
      deepDef:
        'The compiler checks members against the declared type `Shape`, but execution resolves to the concrete runtime instance `Circle`.',
      icon: <Layers className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Type System',
    },
    {
      num: 2,
      term: 'Dynamic Method Dispatch',
      shortDef: 'Runtime resolution of overridden method `draw()` via JVM virtual method table (vtable).',
      deepDef:
        'When `shape.draw()` is called, the JVM looks up the actual object header and invokes `Circle.draw()` rather than `Shape.draw()`.',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
      category: 'Runtime Resolution',
    },
  ],
  'interfaces': [
    {
      num: 1,
      term: 'Interface Contract',
      shortDef: 'A pure abstraction defining method signatures without concrete implementation.',
      deepDef:
        '`Payment` declares `void pay(double amount);`. Any class implementing `Payment` must fulfill this contract.',
      icon: <FileCode className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'Contract',
    },
    {
      num: 2,
      term: 'Multiple Implementations',
      shortDef: 'Independent classes implementing the same interface with distinct internal logic.',
      deepDef:
        '`UpiPayment` and `CardPayment` implement `Payment` completely differently while exposing the identical caller API.',
      icon: <Box className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'Decoupling',
    },
    {
      num: 3,
      term: 'UML Implementation Marker',
      shortDef: 'A dashed green connector ending in a hollow closed triangle pointing to the interface.',
      deepDef:
        'In UML class diagrams, `UpiPayment - - ▷ Payment` symbolizes contract realization.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'UML Standard',
    },
  ],
  'composition': [
    {
      num: 1,
      term: 'Strong Ownership',
      shortDef: 'A relationship where the component part lifecycle is strictly bound to the whole.',
      deepDef:
        'A `Car` strictly owns its `Engine` (`private final Engine engine = new Engine();`). If the Car is destroyed, the Engine is destroyed.',
      icon: <Box className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Ownership',
    },
    {
      num: 2,
      term: 'UML Composition Diamond',
      shortDef: 'A solid filled diamond on the owning Car side.',
      deepDef:
        'The filled diamond indicates whole-part ownership and exclusive lifecycle containment.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'UML Standard',
    },
  ],
  'aggregation': [
    {
      num: 1,
      term: 'Shared / Independent Lifecycle',
      shortDef: 'A weak "has-a" relationship where part objects exist independently of the whole.',
      deepDef:
        '`Department` aggregates `List<Professor>`. If the department closes, the professors continue to exist.',
      icon: <Box className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Association',
    },
    {
      num: 2,
      term: 'UML Aggregation Diamond',
      shortDef: 'An open hollow diamond on the aggregate Department side.',
      deepDef:
        'The hollow diamond indicates grouping or collection without destructive lifecycle coupling.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'UML Standard',
    },
  ],
  'class-dep-graph': [
    {
      num: 1,
      term: 'Layered Architecture',
      shortDef: 'Decoupled architectural tiers: Controller -> Service -> Repository -> Entity.',
      deepDef:
        '`UserController` delegates to `UserService`, which delegates persistence to `UserRepository`, operating on domain `User` entities.',
      icon: <Layers className="w-3.5 h-3.5 text-[#1749C8]" />,
      category: 'Architecture',
    },
    {
      num: 2,
      term: 'Dependency Inversion',
      shortDef: 'High-level business policies do not depend directly on database implementations.',
      deepDef:
        'Components communicate through declared interfaces and typed parameter dependencies.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />,
      category: 'Decoupling',
    },
  ],
  'execution-timeline': [
    {
      num: 1,
      term: 'Chronological Runtime Events',
      shortDef: 'Sequential, timestamped record of deterministic JVM state transitions.',
      deepDef:
        'Every step corresponds to a real `RuntimeEvent` (E1 Program Start -> E5 Allocation -> E14 Field Mutation -> E15 Program End).',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
      category: 'Execution History',
    },
    {
      num: 2,
      term: 'Live Trace Scrubber',
      shortDef: 'Interactive playback allowing step-by-step time-travel debugging.',
      deepDef:
        'Students can scrub through events and watch stack frames push/pop and heap fields mutate in real-time.',
      icon: <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />,
      category: 'Pedagogy',
    },
  ],
};

export const LabCategorySidebar: React.FC = () => {
  const {
    activeCategoryId,
    setActiveCategory,
    activeSubsectionId,
    setActiveSubsection,
    libraryCollapsed,
    toggleLibrary,
    selectedNodeId,
    selectedEdgeId,
    nodes,
    edges,
    activeSidebarTab,
    searchQuery,
  } = useVisualizationLabStore();

  const [expandedConcept, setExpandedConcept] = useState<number | null>(1);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'GROUP 1 — OBJECT FUNDAMENTALS': true,
    'GROUP 2 — OBJECT-ORIENTED PROGRAMMING': true,
    'GROUP 3 — JAVA DATA STRUCTURES': true,
    'GROUP 4 — EXECUTION AND DEPENDENCIES': true,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const filteredCategories = VISUALIZATION_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;
  const selectedEdge = selectedEdgeId ? edges.find((e) => e.id === selectedEdgeId) : null;

  const allModuleConcepts =
    MODULE_CONCEPTS[activeCategoryId] || MODULE_CONCEPTS['object-rep'];
  const currentConcepts = searchQuery
    ? allModuleConcepts.filter(
        (c) =>
          c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortDef.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allModuleConcepts;

  const activeCategory = VISUALIZATION_CATEGORIES.find((c) => c.id === activeCategoryId);

  if (libraryCollapsed) {
    return (
      <aside className="w-10 border-r border-[#DCE2EA] bg-white flex flex-col items-center py-3 select-none">
        <button
          type="button"
          onClick={toggleLibrary}
          className="p-1.5 hover:bg-[#F1F4F8] rounded text-[#64748B] hover:text-[#172033]"
          title="Expand Visualization Library"
        >
          <Layers className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="w-72 border-r border-[#DCE2EA] bg-white flex flex-col h-full select-none shrink-0"
      style={{ fontFamily: '"IBM Plex Sans Condensed", sans-serif' }}
    >
      {/* Sidebar Header */}
      <div className="px-3.5 py-3 border-b border-[#DCE2EA] bg-white flex items-center justify-between">
        {activeSidebarTab === 'modules' ? (
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#1749C8] shrink-0" />
            <span
              className="text-[#172033] uppercase tracking-wide font-semibold text-[13.5px]"
              style={{
                fontFamily: '"IBM Plex Sans Condensed", sans-serif',
              }}
            >
              VISUALIZATION LIBRARY
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#1749C8] shrink-0" />
            <span
              className="text-[#172033] uppercase tracking-wide font-semibold text-[13.5px]"
              style={{
                fontFamily: '"IBM Plex Sans Condensed", sans-serif',
              }}
            >
              WHAT IS WHAT?
            </span>
          </div>
        )}
      </div>

      {/* Main Tab Body */}
      {activeSidebarTab === 'modules' ? (
        /* 6: Category Groups List */
        <div
          className="flex-1 overflow-y-auto no-scrollbar divide-y divide-[#F1F4F8] p-2 space-y-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORY_GROUPS.map((group) => {
            const groupCategories = filteredCategories.filter((c) => c.group === group);
            if (groupCategories.length === 0) return null;
            const isExpanded = searchQuery.trim() !== '' ? true : expandedGroups[group];

            return (
              <div key={group} className="pt-2 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between uppercase text-[#64748B] hover:text-[#172033] px-2 py-1.5 transition-colors cursor-pointer"
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.7px',
                    fontFamily: '"Space Mono", monospace',
                  }}
                >
                  <span className="truncate">{group}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[#64748B]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[#64748B]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-0.5">
                    {groupCategories.map((cat) => {
                      const isActive = cat.id === activeCategoryId;
                      const subsections = getModuleSubsections(cat.id);
                      const hasSubsections = subsections.length > 0;

                      return (
                        <div key={cat.id} className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#1749C8] text-white font-semibold shadow-xs'
                                : 'hover:bg-[#F1F4F8] text-[#172033]'
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate">
                              <span
                                className={`shrink-0 ${
                                  isActive ? 'text-white/80' : 'text-[#64748B]'
                                }`}
                                style={{
                                  fontSize: '11px',
                                  fontFamily: '"Space Mono", monospace',
                                }}
                              >
                                {cat.code}
                              </span>
                              <span
                                className="truncate text-[13.5px] tracking-tight"
                                style={{
                                  fontFamily: '"IBM Plex Sans Condensed", sans-serif',
                                  fontWeight: isActive ? 600 : 500,
                                }}
                              >
                                {cat.title}
                              </span>
                            </div>
                            {hasSubsections && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                  isActive ? 'bg-white/20 text-white' : 'text-[#64748B] bg-[#F1F4F8]'
                                }`}
                              >
                                {subsections.length}
                              </span>
                            )}
                          </button>

                          {/* Subsections Accordion when Category is Active */}
                          {isActive && hasSubsections && (
                            <div className="ml-3 pl-2.5 border-l-2 border-[#1749C8]/30 py-1 space-y-0.5">
                              {subsections.map((sub) => {
                                const isSubActive = sub.id === activeSubsectionId;
                                return (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveSubsection(sub.id);
                                    }}
                                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                                      isSubActive
                                        ? 'bg-[#EBF0FF] text-[#1749C8] font-bold'
                                        : 'text-[#475569] hover:text-[#172033] hover:bg-[#F1F4F8]'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-1.5 truncate">
                                      <span
                                        className="font-mono text-[10.5px] shrink-0"
                                        style={{ fontFamily: '"Space Mono", monospace' }}
                                      >
                                        {sub.code}
                                      </span>
                                      <span
                                        className="truncate text-[12px]"
                                        style={{ fontFamily: '"IBM Plex Sans Condensed", sans-serif' }}
                                      >
                                        {sub.title}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-[#94A3B8] font-mono shrink-0 ml-1">
                                      {sub.scenarios.length}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* What is What? Dynamic Semantic Legend */
        <div
          className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Active Module Headline */}
          <div className="p-2.5 bg-[#FAFBFD] border border-[#DCE2EA] rounded-md space-y-1">
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Semantic Legend
              </span>
              <span
                className="text-[10px] text-[#1749C8] font-bold px-1.5 py-0.2 bg-blue-50 border border-blue-200 rounded"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                {activeCategory?.code || '02'}
              </span>
            </div>
            <h3 className="text-xs font-bold text-[#172033] tracking-tight">
              {activeCategory?.title || 'Object / Instance Representation'}
            </h3>
            <p className="text-[11px] text-[#64748B] leading-snug">
              Every representation reflects its actual Java semantics and runtime behavior.
            </p>
          </div>

          {/* Active Canvas Selection Breakdown */}
          {(selectedNode || selectedEdge) && (
            <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-md space-y-1 animate-fadeIn">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span
                  className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  Selected Canvas Entity
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-[#172033]">
                {selectedNode ? selectedNode.data.name : selectedEdge?.data?.label || selectedEdge?.id}
              </div>
              <p className="text-[11px] text-[#475569] leading-tight pt-0.5">
                {selectedNode?.data?.description ||
                  selectedEdge?.data?.explanation ||
                  `Interactive ${selectedNode?.data?.entityType || selectedEdge?.data?.type} component.`}
              </p>
            </div>
          )}

          {/* 7 Concepts List */}
          <div className="space-y-1.5">
            <span
              className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block px-1"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              Core Concepts ({currentConcepts.length})
            </span>
            {currentConcepts.map((item) => {
              const isSelected = expandedConcept === item.num;
              return (
                <div
                  key={item.num}
                  className={`border rounded-md transition-all ${
                    isSelected
                      ? 'border-[#1749C8] bg-white shadow-2xs'
                      : 'border-[#DCE2EA] bg-[#FAFBFD] hover:border-[#B5C2D4]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedConcept(isSelected ? null : item.num)}
                    className="w-full flex items-center justify-between p-2 text-left"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span
                        className="text-[10.5px] font-bold text-[#1749C8] w-4 shrink-0 text-center"
                        style={{ fontFamily: '"Space Mono", monospace' }}
                      >
                        {item.num}
                      </span>
                      {item.icon}
                      <span className="text-xs font-bold text-[#172033] truncate">
                        {item.term}
                      </span>
                    </div>
                    {isSelected ? (
                      <ChevronDown className="w-3 h-3 text-[#1749C8] shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-[#94A3B8] shrink-0" />
                    )}
                  </button>

                  {isSelected && (
                    <div className="px-3 pb-2.5 pt-0.5 space-y-1.5 border-t border-[#F1F4F8] text-[11px]">
                      <p className="text-[#334155] font-medium leading-relaxed">
                        {item.shortDef}
                      </p>
                      <p className="text-[#64748B] text-[10.5px] leading-relaxed bg-[#F8FAFC] p-1.5 rounded border border-[#E2E8F0]">
                        {item.deepDef}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connector Line Style Guide */}
          <div className="p-2.5 bg-white border border-[#DCE2EA] rounded-md space-y-2">
            <span
              className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              Relationship Line Styles
            </span>
            <div className="space-y-1.5 text-[10.5px] font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#1749C8] font-bold">──► Reference</span>
                <span className="text-[#64748B]">Solid Cobalt Blue</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7C3AED] font-bold">──▷ Inheritance</span>
                <span className="text-[#64748B]">Hollow Triangle</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#16A34A] font-bold">- - ▷ Implements</span>
                <span className="text-[#64748B]">Dashed Green</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#D97706] font-bold">──► Invocation</span>
                <span className="text-[#64748B]">Amber Arrow</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#1749C8] font-bold">◆── Composition</span>
                <span className="text-[#64748B]">Filled Diamond</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7: Sidebar Footer Labels: Space Mono, 11px */}
      <div
        className="p-3 border-t border-[#DCE2EA] bg-[#FAFBFD] flex items-center justify-between text-[#64748B] shrink-0"
        style={{
          fontSize: '11px',
          fontFamily: '"Space Mono", monospace',
        }}
      >
        <span>OOPS LAB v2.4</span>
        <span className="text-[#1749C8] font-semibold">Deterministic VM</span>
      </div>
    </aside>
  );
};
