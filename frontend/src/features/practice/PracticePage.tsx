import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Code } from 'lucide-react';

export const PracticePage: React.FC = () => {
  const challenges = [
    { id: 1, title: 'Encapsulate the BankAccount', difficulty: 'Beginner', category: 'Encapsulation', solved: true },
    { id: 2, title: 'Implement Shape Hierarchy (Circle & Rectangle)', difficulty: 'Intermediate', category: 'Inheritance', solved: false },
    { id: 3, title: 'Polymorphic PaymentProcessor with Interfaces', difficulty: 'Intermediate', category: 'Polymorphism', solved: false },
    { id: 4, title: 'Immutable UserCredentials using Java 21 Records', difficulty: 'Advanced', category: 'Java 21 Modern', solved: false },
    { id: 5, title: 'Sealed Algebraic Hierarchy for TrafficLight', difficulty: 'Advanced', category: 'Sealed Types', solved: false },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Practice Challenges</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">OOP Coding & Design Challenges</h1>
        <p className="text-xs text-muted-foreground">Solve practical problems. Your solutions are automatically evaluated via JavaParser AST assertions and runtime tests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          {challenges.map((c) => (
            <div key={c.id} className="p-4 bg-white border border-border rounded-xl flex items-center justify-between hover:border-foreground/50 transition-all">
              <div className="flex items-center space-x-3.5">
                {c.solved ? (
                  <CheckCircle2 className="w-5 h-5 text-foreground stroke-[1.5]" />
                ) : (
                  <Code className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
                )}
                <div>
                  <div className="text-xs font-semibold text-foreground">{c.title}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center space-x-2 mt-0.5">
                    <span>{c.category}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 bg-surface rounded border border-border">{c.difficulty}</span>
                  </div>
                </div>
              </div>

              <button className="px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-all flex items-center space-x-1">
                <span>{c.solved ? 'Review' : 'Solve'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-4 h-fit">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">Auto-Grader Engine</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our automated grader runs inside the isolated sandbox. It verifies class access modifiers, interface contracts, polymorphism dispatch, and memory footprint without exposing host infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
};

