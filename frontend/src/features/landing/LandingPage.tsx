import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Eye,
  Layers,
  Sparkles,
  Code2,
  Cpu,
  ShieldAlert,
  Database,
  Play,
  RotateCcw,
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  label: string;
  concept: string;
  code: string;
  stackFrame: { method: string; line: number; vars: { name: string; val: string }[] };
  heapObject: { id: string; type: string; fields: { name: string; val: string }[] };
}

const snippets: CodeSnippet[] = [
  {
    id: 'encap',
    label: 'Encapsulation',
    concept: 'Data Hiding & State Validation',
    code: `public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}`,
    stackFrame: {
      method: 'deposit(amount: 250.0)',
      line: 6,
      vars: [
        { name: 'this', val: 'ref @0x2F1A' },
        { name: 'amount', val: '250.0 (double)' },
      ],
    },
    heapObject: {
      id: '@0x2F1A',
      type: 'BankAccount',
      fields: [{ name: 'balance', val: '750.0' }],
    },
  },
  {
    id: 'inherit',
    label: 'Inheritance & super',
    concept: 'Hierarchy & Constructor Chaining',
    code: `public class Employee extends Person {
    private String department;

    public Employee(String name, String dept) {
        super(name); // Invokes Person.<init>
        this.department = dept;
    }
}`,
    stackFrame: {
      method: 'Employee.<init>(name, dept)',
      line: 5,
      vars: [
        { name: 'this', val: 'ref @0x8E3B' },
        { name: 'dept', val: '"Engineering"' },
      ],
    },
    heapObject: {
      id: '@0x8E3B',
      type: 'Employee (extends Person)',
      fields: [
        { name: 'name (super)', val: '"Alice"' },
        { name: 'department', val: '"Engineering"' },
      ],
    },
  },
  {
    id: 'poly',
    label: 'Polymorphism',
    concept: 'Dynamic Method Dispatch (vtable)',
    code: `Shape s = new Circle(5.0);
s.draw(); // Dispatches dynamically to Circle.draw()
// JVM resolves target at runtime via vtable`,
    stackFrame: {
      method: 'main(args)',
      line: 2,
      vars: [
        { name: 's (declared: Shape)', val: 'ref @0x4C9D (actual: Circle)' },
      ],
    },
    heapObject: {
      id: '@0x4C9D',
      type: 'Circle (implements Shape)',
      fields: [{ name: 'radius', val: '5.0' }],
    },
  },
  {
    id: 'records',
    label: 'Java 21 Records',
    concept: 'Immutable Data Carriers',
    code: `public record Transaction(
    String id,
    double amount,
    Instant timestamp
) {} // Auto-generates getters, equals, hashCode`,
    stackFrame: {
      method: 'processTransaction(tx)',
      line: 1,
      vars: [{ name: 'tx', val: 'ref @0x11AB' }],
    },
    heapObject: {
      id: '@0x11AB',
      type: 'Transaction[Record]',
      fields: [
        { name: 'id', val: '"TXN-9021"' },
        { name: 'amount', val: '1200.50' },
      ],
    },
  },
];

export const LandingPage: React.FC = () => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const navigate = useNavigate();
  const current = snippets[activeSnippetIndex];

  return (
    <div className="min-h-full py-10 px-4 sm:px-8 max-w-6xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-white text-xs text-muted-foreground font-medium">
          <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
          <span>Interactive Java 21 Visualization Laboratory</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
          Demystify Object-Oriented Programming through Deterministic Visualization.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Watch classes, heap allocations, call stack frames, reference pointers, and dynamic method dispatch unfold in real time. Built strictly for Java 21 LTS.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <NavLink
            to="/playground"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-black/90 active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Launch Playground</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </NavLink>
          <NavLink
            to="/visualizers"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-border bg-white text-foreground text-sm font-medium hover:border-foreground transition-all"
          >
            <span>Explore Visualizers</span>
          </NavLink>
          <NavLink
            to="/concepts"
            className="px-5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            View Curriculum
          </NavLink>
        </div>
      </section>

      {/* Interactive 3-Panel Preview Showcase */}
      <section className="bg-white border border-border rounded-2xl overflow-hidden shadow-xs space-y-0">
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface/50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Interactive Demo</span>
              <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">Java 21</span>
            </div>
            <h2 className="text-base font-bold text-foreground mt-0.5">{current.concept}</h2>
          </div>

          {/* Snippet Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {snippets.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSnippetIndex(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  idx === activeSnippetIndex
                    ? 'bg-foreground text-background shadow-xs'
                    : 'bg-white border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Panel Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border min-h-[300px]">
          {/* Panel 1: Code Editor Preview */}
          <div className="lg:col-span-5 p-4 sm:p-5 flex flex-col justify-between bg-surface/30">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-mono">
                <span className="flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Editor (Java 21)</span>
                </span>
                <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">Read-Only Preview</span>
              </div>
              <pre className="font-mono text-xs text-foreground bg-white p-3.5 rounded-lg border border-border overflow-x-auto leading-relaxed">
                {current.code}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Open this snippet in the full execution editor</span>
              <button
                onClick={() => navigate('/playground')}
                className="flex items-center space-x-1 text-xs font-medium text-foreground hover:underline"
              >
                <span>Open in Playground</span>
                <ArrowRight className="w-3 h-3 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Panel 2: Interactive Memory Visualizer (Stack & Heap) */}
          <div className="lg:col-span-7 p-4 sm:p-5 space-y-4 bg-white">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Deterministic Memory Projection</span>
              </span>
              <span className="text-[10px] text-muted-foreground">Snapshot Step #3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stack Frame Box */}
              <div className="p-3.5 bg-surface border border-border rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Call Stack
                  </span>
                  <span className="text-[10px] font-mono bg-white border border-border px-1.5 py-0.5 rounded text-foreground">
                    Frame 1
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold text-foreground truncate">
                  {current.stackFrame.method}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  Line {current.stackFrame.line}
                </div>
                <div className="pt-2 border-t border-border space-y-1">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">Local Variables</span>
                  {current.stackFrame.vars.map((v) => (
                    <div key={v.name} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">{v.name}:</span>
                      <span className="text-foreground font-medium">{v.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heap Object Box */}
              <div className="p-3.5 bg-surface border border-border rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    JVM Heap (Eden)
                  </span>
                  <span className="text-[10px] font-mono bg-foreground text-background px-1.5 py-0.5 rounded">
                    {current.heapObject.id}
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold text-foreground truncate">
                  {current.heapObject.type}
                </div>
                <div className="pt-2 border-t border-border space-y-1">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">Object Fields</span>
                  {current.heapObject.fields.map((f) => (
                    <div key={f.name} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">{f.name}:</span>
                      <span className="text-foreground font-medium">{f.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Playback Simulation Toolbar */}
            <div className="flex items-center justify-between p-2.5 bg-surface/50 border border-border rounded-lg text-xs">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1 text-foreground hover:bg-accent rounded transition-colors"
                  title="Run simulation"
                >
                  <Play className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
                <button
                  type="button"
                  className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                  title="Reset trace"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
                <span className="text-[11px] font-mono text-muted-foreground">Step 3 of 5</span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">JDI event captured (2.4ms)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Architecture Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-border rounded-xl space-y-3 hover:border-foreground/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
            <Eye className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-foreground text-base tracking-tight">1. Deterministic Visualization</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Observe the true internal state of the JVM. Trace reference pointer redirection, object instances, and inheritance hierarchies on an interactive canvas.
          </p>
        </div>

        <div className="p-6 bg-white border border-border rounded-xl space-y-3 hover:border-foreground/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
            <Terminal className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-foreground text-base tracking-tight">2. Sandboxed Java 21 Execution</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Write clean Java 21 in the embedded Monaco editor. Step forward and backward through runtime execution snapshots with sub-millisecond precision.
          </p>
        </div>

        <div className="p-6 bg-white border border-border rounded-xl space-y-3 hover:border-foreground/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
            <Layers className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-foreground text-base tracking-tight">3. Visual Class Builder</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Model OOP structures visually with node diagrams. Generate clean, idiomatic Java code with automated two-way synchronization and AST checks.
          </p>
        </div>
      </section>

      {/* System Infrastructure Standards */}
      <section className="p-6 sm:p-8 bg-white border border-border rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Engineered for Technical Rigor & Security
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Zero-trust worker boundary, multi-layer defense, and local-first persistence.
            </p>
          </div>
          <NavLink
            to="/about"
            className="text-xs font-medium text-foreground hover:underline flex items-center space-x-1"
          >
            <span>Read Architecture Spec</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="flex items-center space-x-1 text-[11px] font-mono text-muted-foreground uppercase">
              <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Runtime</span>
            </div>
            <div className="text-sm font-semibold text-foreground">Java 21 LTS</div>
            <div className="text-xs text-muted-foreground">Modern records, sealed interfaces, and pattern matching.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="flex items-center space-x-1 text-[11px] font-mono text-muted-foreground uppercase">
              <ShieldAlert className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Sandbox</span>
            </div>
            <div className="text-sm font-semibold text-foreground">Isolated Workers</div>
            <div className="text-xs text-muted-foreground">Resource caps, memory limits, and process isolation.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="flex items-center space-x-1 text-[11px] font-mono text-muted-foreground uppercase">
              <Code2 className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Analysis</span>
            </div>
            <div className="text-sm font-semibold text-foreground">JavaParser AST</div>
            <div className="text-xs text-muted-foreground">Deterministic static analysis and security policy filter.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="flex items-center space-x-1 text-[11px] font-mono text-muted-foreground uppercase">
              <Database className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Persistence</span>
            </div>
            <div className="text-sm font-semibold text-foreground">Local-First Storage</div>
            <div className="text-xs text-muted-foreground">Zero friction, guest experiments preserved in browser.</div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Strip */}
      <section className="p-6 bg-surface border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground">Ready to start mastering Java OOP?</h4>
          <p className="text-xs text-muted-foreground">
            Explore 14 curriculum topics spanning Foundations, Core OOP, Relationships, and Java 21 Modern Syntax.
          </p>
        </div>
        <NavLink
          to="/concepts"
          className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-all shrink-0"
        >
          <span>Start Curriculum</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
        </NavLink>
      </section>
    </div>
  );
};
