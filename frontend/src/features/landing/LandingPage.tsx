import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Terminal, Eye, Layers, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-8 max-w-6xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-white text-xs text-muted-foreground font-medium">
          <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
          <span>Interactive Java 21 Visualization Laboratory</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
          Demystify Object-Oriented Programming through Deterministic Visualization.
        </h1>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Watch classes, heap allocations, stack frames, reference pointers, and dynamic method dispatch unfold in real time. Built strictly for Java 21 LTS.
        </p>

        <div className="flex items-center justify-center space-x-4 pt-2">
          <NavLink
            to="/playground"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-black/90 active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Launch Playground</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </NavLink>
          <NavLink
            to="/concepts"
            className="px-5 py-2.5 rounded-lg border border-border bg-white text-foreground text-sm font-medium hover:border-foreground transition-all"
          >
            Explore Curriculum
          </NavLink>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-border rounded-xl space-y-3 hover:border-foreground/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
            <Eye className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-foreground text-base tracking-tight">1. Visual Learning</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Observe the true internal behavior of the JVM. Trace reference pointer redirection, object instances, and inheritance hierarchies on a live canvas.
          </p>
        </div>

        <div className="p-6 bg-white border border-border rounded-xl space-y-3 hover:border-foreground/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
            <Terminal className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-foreground text-base tracking-tight">2. Interactive Coding</h3>
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
            Model OOP structures visually with diagram nodes. Generate clean, idiomatic Java code with automated two-way synchronization and AST checks.
          </p>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="p-8 bg-white border border-border rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Engineered for Technical Rigor</h2>
            <p className="text-xs text-muted-foreground mt-1">High-performance runtime safety and complete local isolation.</p>
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
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Runtime</div>
            <div className="text-sm font-semibold text-foreground">Java 21 LTS</div>
            <div className="text-xs text-muted-foreground">Modern records, sealed classes, pattern matching.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Sandbox</div>
            <div className="text-sm font-semibold text-foreground">Isolated Workers</div>
            <div className="text-xs text-muted-foreground">Resource caps, memory limits, no network.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Analysis</div>
            <div className="text-sm font-semibold text-foreground">JavaParser AST</div>
            <div className="text-xs text-muted-foreground">Deterministic static analysis & security filter.</div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Persistence</div>
            <div className="text-sm font-semibold text-foreground">Local-First (IndexedDB)</div>
            <div className="text-xs text-muted-foreground">Zero friction, offline progress saved locally.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

