import React from 'react';
import { GitBranch, CheckCircle2, Circle } from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const roadmapStages = [
    {
      title: 'Stage 1: Java Foundations',
      items: ['Variables & Primitive Types', 'Control Flow & Loops', 'Method Scopes & Call Stack', 'Arrays & Reference Pointers'],
      status: 'completed',
    },
    {
      title: 'Stage 2: Core Object-Oriented Programming',
      items: ['Classes & Blueprint Models', 'Object Lifecycle & Constructors', 'Encapsulation & Access Modifiers', 'Inheritance & Hierarchy Chains', 'Polymorphism & Dynamic Dispatch', 'Abstraction & Interfaces'],
      status: 'in-progress',
    },
    {
      title: 'Stage 3: Object Relationships & UML',
      items: ['Association vs Aggregation', 'Composition & Lifetime Ownership', 'Dependency Injection Basics', 'Class Diagrams & UML Modeling'],
      status: 'upcoming',
    },
    {
      title: 'Stage 4: Java 21 Modern Capabilities',
      items: ['Records & Immutability Patterns', 'Sealed Classes & Exhaustive Switches', 'Pattern Matching for instanceof', 'Virtual Threads & Concurrency Mental Models'],
      status: 'upcoming',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Curriculum Path</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Java OOP Learning Roadmap</h1>
        <p className="text-xs text-muted-foreground">Follow the prerequisite progression from memory fundamentals to advanced modern Java 21 architectures.</p>
      </div>

      <div className="space-y-6">
        {roadmapStages.map((stage, idx) => (
          <div key={idx} className="p-6 bg-white border border-border rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2.5">
                <GitBranch className="w-4 h-4 text-foreground stroke-[1.5]" />
                <h2 className="text-sm font-bold text-foreground">{stage.title}</h2>
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                stage.status === 'completed'
                  ? 'bg-foreground text-background border-foreground font-medium'
                  : stage.status === 'in-progress'
                  ? 'bg-accent text-foreground border-border font-medium'
                  : 'text-muted-foreground border-border'
              }`}>
                {stage.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stage.items.map((item, i) => (
                <div key={i} className="flex items-center space-x-2.5 p-2.5 bg-surface border border-border rounded-lg text-xs">
                  {stage.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-foreground stroke-[1.5] shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground stroke-[1.5] shrink-0" />
                  )}
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

