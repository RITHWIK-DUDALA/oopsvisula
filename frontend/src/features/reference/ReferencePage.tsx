import React, { useState } from 'react';
import {
  Search,
  Lock,
  Cpu,
  Boxes,
  Sparkles,
  AlertTriangle,
  Check,
  Copy,
} from 'lucide-react';

type ReferenceCategory = 'all' | 'modifiers' | 'jvm' | 'uml' | 'java21' | 'solid';

export const ReferencePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReferenceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (snippet: string, key: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'All References' },
    { id: 'modifiers', label: 'Access Modifiers' },
    { id: 'jvm', label: 'JVM Memory Architecture' },
    { id: 'uml', label: 'UML & Relationships' },
    { id: 'java21', label: 'Java 21 Modern Syntax' },
    { id: 'solid', label: 'SOLID & Anti-Patterns' },
  ];

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Cheat Sheet & API Guide</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Java 21 OOP Reference Guide</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Standardized cheat sheets for access modifiers, JVM memory regions, UML relationships, Java 21 features, and OOP architecture.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as ReferenceCategory)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === c.id
                  ? 'bg-foreground text-background shadow-xs'
                  : 'bg-white text-muted-foreground hover:text-foreground border border-border hover:bg-surface'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, syntax..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground"
          />
        </div>
      </div>

      {/* Section 1: Access Modifiers Matrix */}
      {(activeCategory === 'all' || activeCategory === 'modifiers') && matchesSearch('public protected private default access modifier') && (
        <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Access Modifiers Visibility Matrix</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Java defines four levels of access protection to enforce the principle of encapsulation and information hiding.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono bg-surface/50">
                  <th className="py-2.5 px-3">Modifier</th>
                  <th className="py-2.5 px-3">Same Class</th>
                  <th className="py-2.5 px-3">Same Package</th>
                  <th className="py-2.5 px-3">Subclass (Diff Package)</th>
                  <th className="py-2.5 px-3">World (Diff Package)</th>
                  <th className="py-2.5 px-3">Best Practice Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                <tr className="hover:bg-surface/30">
                  <td className="py-2.5 px-3 font-semibold text-foreground">public</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 font-sans text-muted-foreground">Exposed API entry points, interfaces, record types.</td>
                </tr>
                <tr className="hover:bg-surface/30">
                  <td className="py-2.5 px-3 font-semibold text-foreground">protected</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 font-sans text-muted-foreground">Hook methods and extensible base class members.</td>
                </tr>
                <tr className="hover:bg-surface/30">
                  <td className="py-2.5 px-3 font-semibold text-foreground">(default / package-private)</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 font-sans text-muted-foreground">Internal package collaborators not visible outside package.</td>
                </tr>
                <tr className="hover:bg-surface/30">
                  <td className="py-2.5 px-3 font-semibold text-foreground">private</td>
                  <td className="py-2.5 px-3 text-foreground font-bold">Yes</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 text-muted-foreground">No</td>
                  <td className="py-2.5 px-3 font-sans text-muted-foreground">All mutable state fields and internal helper routines.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 2: JVM Memory Architecture */}
      {(activeCategory === 'all' || activeCategory === 'jvm') && matchesSearch('jvm memory heap stack metaspace eden survivor tenured garbage collection') && (
        <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">JVM Runtime Memory Architecture</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            The Java Virtual Machine organizes memory into distinct runtime data areas with different lifetimes, scopes, and garbage collection mechanisms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Metaspace (Native)</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">JVM-Wide</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Stores loaded class definitions, method bytecode metadata, the constant pool, and static fields. Allocated from native OS RAM (replaces PermGen since Java 8).
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: Cleaned when ClassLoader is unloaded.
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Call Stack Frames</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">Thread-Local</span>
              </div>
              <p className="text-xs text-muted-foreground">
                LIFO stack created per execution thread. Each frame holds local primitive variables, heap object references, operand stack, and return addresses.
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: None. Automatically popped upon method return.
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Eden Space (Young Gen)</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">Heap Shared</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Landing zone for newly instantiated objects (`new`). Allocation uses fast pointer-bump mechanics and Thread-Local Allocation Buffers (TLAB).
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: Minor GC evacuates survivors to S0/S1.
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Survivor Spaces (S0 / S1)</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">Heap Shared</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Twin alternating staging spaces (FromSpace and ToSpace). Objects survive Minor GCs here, incrementing an age counter until reaching the tenuring threshold.
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: Compacted & copied each Minor GC cycle.
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Tenured / Old Generation</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">Heap Shared</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Home of long-lived objects that survived multiple GC sweeps (e.g., caches, singletons, connection pools) or oversized allocations bypassed from Eden.
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: Major / Full GC (G1GC, ZGC concurrent cycles).
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">JIT Code Cache</span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono">Native RAM</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Stores machine code compiled by Tiered JIT compilation (C1 Client & C2 Server compilers) for frequently executed "hot" methods and loops.
              </p>
              <div className="text-[11px] font-mono text-foreground pt-1 border-t border-border">
                GC: Swept when methods are deoptimized or invalidated.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: UML & Object Relationships */}
      {(activeCategory === 'all' || activeCategory === 'uml') && matchesSearch('uml inheritance realization composition aggregation dependency relationships') && (
        <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <Boxes className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">UML & Object Relationships Guide</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Structural relationship conventions mapping UML class diagrams directly to Java 21 syntax.
          </p>

          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-foreground">1. Generalization / Inheritance (`extends`)</span>
                  <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border font-mono">Solid Line + Hollow Arrowhead</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Coupling: Highest (Is-A)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Child class inherits all visible fields and methods of parent class. Subclass can override behavior or introduce specialized members.
              </p>
              <pre className="p-2.5 bg-surface border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public class Vehicle { protected int speed; }
public class Car extends Vehicle { private int numDoors; }`}
              </pre>
            </div>

            <div className="p-4 border border-border rounded-lg bg-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-foreground">2. Realization / Interface Implementation (`implements`)</span>
                  <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border font-mono">Dashed Line + Hollow Arrowhead</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Coupling: Contractual</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Class guarantees fulfillment of abstract method signatures declared in the interface.
              </p>
              <pre className="p-2.5 bg-surface border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public interface Flyable { void fly(); }
public class Airplane implements Flyable { public void fly() { /* ... */ } }`}
              </pre>
            </div>

            <div className="p-4 border border-border rounded-lg bg-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-foreground">3. Composition (`Part-Of` Strong Ownership)</span>
                  <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border font-mono">Solid Line + Filled Diamond</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Coupling: Strong Lifecycle Bound</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The constituent component cannot exist without its enclosing parent. When parent is garbage-collected, the child object is also eligible for GC.
              </p>
              <pre className="p-2.5 bg-surface border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public class Engine { /* engine state */ }
public class Car {
    private final Engine engine = new Engine(); // Car owns and creates Engine lifecycle
}`}
              </pre>
            </div>

            <div className="p-4 border border-border rounded-lg bg-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-foreground">4. Aggregation (`Has-A` Shared Ownership)</span>
                  <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border font-mono">Solid Line + Hollow Diamond</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Coupling: Loose Lifecycle Bound</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The referenced object has an independent lifecycle outside the container (passed in via constructor or setter injection).
              </p>
              <pre className="p-2.5 bg-surface border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public class Department {
    private List<Professor> professors; // Professors continue to exist if Department dissolves
    public Department(List<Professor> profs) { this.professors = profs; }
}`}
              </pre>
            </div>

            <div className="p-4 border border-border rounded-lg bg-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-foreground">5. Dependency (`Uses-A` Ephemeral)</span>
                  <span className="text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border font-mono">Dashed Line + Open Arrow</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Coupling: Temporary / Method-Scoped</span>
              </div>
              <p className="text-xs text-muted-foreground">
                A class uses an instance of another class solely as a method parameter, local variable, or static utility call.
              </p>
              <pre className="p-2.5 bg-surface border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public class InvoicePrinter {
    public void print(Invoice invoice) { /* invoice passed temporarily as parameter */ }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Modern Java 21 Syntax */}
      {(activeCategory === 'all' || activeCategory === 'java21') && matchesSearch('java 21 modern records sealed pattern matching switch when sequenced collections') && (
        <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Modern Java 21 OOP Features</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Java 21 LTS introduced modern type-system features that transform object modeling, eliminating boilerplate and enabling algebraic data types.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Records */}
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Records (Transparent Data Carriers)</span>
                <button
                  onClick={() => handleCopy(`public record Point(int x, int y) {\n    public Point {\n        if (x < 0 || y < 0) throw new IllegalArgumentException();\n    }\n}`, 'records')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy record snippet"
                >
                  {copiedSnippet === 'records' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Immutable classes automatically generating private final fields, canonical constructor, getters (`x()`, `y()`), `equals()`, `hashCode()`, and `toString()`.
              </p>
              <pre className="p-2.5 bg-white border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public record Point(int x, int y) {
    // Compact constructor for validation
    public Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException();
    }
}`}
              </pre>
            </div>

            {/* Sealed Types */}
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Sealed Classes & Interfaces</span>
                <button
                  onClick={() => handleCopy(`public sealed interface Shape permits Circle, Rectangle {}\npublic record Circle(double radius) implements Shape {}\npublic record Rectangle(double w, double h) implements Shape {}`, 'sealed')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy sealed snippet"
                >
                  {copiedSnippet === 'sealed' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Restricts which classes or records can extend or implement this type. Enables exhaustive compiler checks without fallback `default` branches.
              </p>
              <pre className="p-2.5 bg-white border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public sealed interface Shape permits Circle, Rectangle {}

public record Circle(double radius) implements Shape {}
public record Rectangle(double w, double h) implements Shape {}`}
              </pre>
            </div>

            {/* Pattern Matching for switch */}
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Pattern Matching for switch</span>
                <button
                  onClick={() => handleCopy(`public static double area(Shape s) {\n    return switch (s) {\n        case Circle c -> Math.PI * c.radius() * c.radius();\n        case Rectangle r -> r.w() * r.h();\n    };\n}`, 'switch')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy switch snippet"
                >
                  {copiedSnippet === 'switch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Matches type patterns directly in `switch` expressions, avoiding verbose `instanceof` cascades and safe type-casting.
              </p>
              <pre className="p-2.5 bg-white border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public static double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
    }; // Exhaustive! No default case needed
}`}
              </pre>
            </div>

            {/* Guarded Patterns */}
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground font-mono">Guarded Patterns (`when` Clause)</span>
                <button
                  onClick={() => handleCopy(`public static String classify(Object obj) {\n    return switch (obj) {\n        case String s when s.length() > 10 -> "Long String";\n        case String s -> "Short String";\n        case Integer i when i > 0 -> "Positive Int";\n        default -> "Other";\n    };\n}`, 'guarded')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy guarded snippet"
                >
                  {copiedSnippet === 'guarded' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Refines type patterns with arbitrary boolean conditions before entering the case branch.
              </p>
              <pre className="p-2.5 bg-white border border-border rounded font-mono text-xs text-foreground overflow-x-auto">
{`public static String classify(Object obj) {
    return switch (obj) {
        case String s when s.length() > 10 -> "Long String";
        case String s -> "Short String";
        case Integer i when i > 0 -> "Positive Int";
        default -> "Other";
    };
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: SOLID Principles & Common Anti-Patterns */}
      {(activeCategory === 'all' || activeCategory === 'solid') && matchesSearch('solid anti-pattern srp ocp lsp isp dip god object code smell') && (
        <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">SOLID Principles & Common OOP Anti-Patterns</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Core design heuristics that distinguish maintainable object models from brittle, tightly coupled monoliths.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">SOLID Principles</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 border border-border rounded-lg bg-surface/30">
                  <span className="font-bold text-foreground font-mono">S — Single Responsibility (SRP)</span>
                  <p className="text-muted-foreground mt-0.5">A class should have only one reason to change. Separate domain calculation from I/O or rendering.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-surface/30">
                  <span className="font-bold text-foreground font-mono">O — Open / Closed (OCP)</span>
                  <p className="text-muted-foreground mt-0.5">Classes should be open for extension (via polymorphism or interfaces), but closed for modification.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-surface/30">
                  <span className="font-bold text-foreground font-mono">L — Liskov Substitution (LSP)</span>
                  <p className="text-muted-foreground mt-0.5">Subtypes must be substitutable for their base types without altering correctness (e.g., Square extending Rectangle trap).</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-surface/30">
                  <span className="font-bold text-foreground font-mono">I — Interface Segregation (ISP)</span>
                  <p className="text-muted-foreground mt-0.5">Clients should not be forced to depend on methods they do not use. Prefer narrow, cohesive interfaces.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-surface/30">
                  <span className="font-bold text-foreground font-mono">D — Dependency Inversion (DIP)</span>
                  <p className="text-muted-foreground mt-0.5">Depend upon abstractions, not concrete implementations. High-level modules should never directly instantiate low-level services.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Common Anti-Patterns</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 border border-border rounded-lg bg-white">
                  <span className="font-bold text-foreground font-mono">The God Object (Blob)</span>
                  <p className="text-muted-foreground mt-0.5">A single class accumulating dozens of responsibilities, static helpers, and private state while other classes act as passive data holders.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-white">
                  <span className="font-bold text-foreground font-mono">Anemic Domain Model</span>
                  <p className="text-muted-foreground mt-0.5">Classes containing only public getters and setters with zero business logic or domain invariants, turning OOP into procedural programming.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-white">
                  <span className="font-bold text-foreground font-mono">Primitive Obsession</span>
                  <p className="text-muted-foreground mt-0.5">Using raw `String` or `int` to represent domain concepts (e.g., zip codes, money, email) instead of lightweight value objects or Java 21 records.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-white">
                  <span className="font-bold text-foreground font-mono">Yo-Yo Hierarchy</span>
                  <p className="text-muted-foreground mt-0.5">Excessively deep inheritance trees (5+ levels) where tracking method dispatch requires bouncing up and down multiple abstract classes.</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-white">
                  <span className="font-bold text-foreground font-mono">Feature Envy</span>
                  <p className="text-muted-foreground mt-0.5">A method in Class A incessantly querying and operating on fields of Class B. Remedy: move the method into Class B.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
