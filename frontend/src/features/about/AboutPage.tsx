import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Mission & Architecture</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">About OOPS LAB</h1>
        <p className="text-xs text-muted-foreground">An open-source laboratory dedicated to making Object-Oriented Programming intuitive, visual, and rigorous.</p>
      </div>

      <div className="p-6 bg-white border border-border rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-foreground">Open-Source Core Philosophy</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Traditional Java OOP instruction relies heavily on dry abstract explanations without letting students observe actual JVM internal state. OOPS LAB pairs real-time Java 21 compilation with deterministic JDI execution tracing, displaying heap allocations, stack frames, and reference arrows side-by-side with source code.
        </p>

        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-semibold text-foreground block mb-1">Strict Isolation</span>
            <span className="text-muted-foreground">Student code runs in disposable, resource-constrained container workers. The primary API process never executes student submissions directly.</span>
          </div>
          <div>
            <span className="font-semibold text-foreground block mb-1">Monochrome Light Design</span>
            <span className="text-muted-foreground">Minimalist, sophisticated aesthetic engineered to reduce cognitive fatigue and eliminate visual distraction.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

