import React from 'react';
import { NavLink } from 'react-router-dom';
import { GitBranch, CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { curriculumLessons } from '@/data/curriculumData';
import { useLearnerStore } from '@/services/storage/localStore';

export const RoadmapPage: React.FC = () => {
  const { masteredTopics } = useLearnerStore();

  const stages = [
    {
      title: 'Stage 1: Memory Foundations',
      category: 'Foundations',
      description: 'Stack frames, memory layouts, primitives vs object references.',
    },
    {
      title: 'Stage 2: Core Object-Oriented Programming',
      category: 'Core OOP',
      description: 'Classes, constructors, encapsulation, inheritance, polymorphism, and interfaces.',
    },
    {
      title: 'Stage 3: Object Relationships & Architecture',
      category: 'Relationships',
      description: 'Association, aggregation, composition ownership, and dependency decoupling.',
    },
    {
      title: 'Stage 4: Modern Java 21 Paradigms',
      category: 'Java 21 Modern',
      description: 'Records, sealed hierarchies, algebraic data types, and pattern matching.',
    },
    {
      title: 'Stage 5: Advanced JVM Mechanics',
      category: 'Advanced',
      description: 'Nested inner classes, synthetic references, and stack unwinding.',
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Curriculum Path</span>
          <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
            Linear Progression
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">Java OOP Interactive Learning Roadmap</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Step-by-step conceptual mastery paired with deterministic JVM internal state inspection.
        </p>
      </div>

      <div className="space-y-6">
        {stages.map((stage, idx) => {
          const lessonsInStage = curriculumLessons.filter((l) => l.category === stage.category);
          const completedInStage = lessonsInStage.filter((l) => masteredTopics.includes(l.id));
          const isAllCompleted = completedInStage.length === lessonsInStage.length && lessonsInStage.length > 0;

          return (
            <div key={idx} className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-2">
                <div className="flex items-center space-x-2.5">
                  <GitBranch className="w-4 h-4 text-foreground stroke-[1.5]" />
                  <h2 className="text-sm font-bold text-foreground">{stage.title}</h2>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-muted-foreground">
                    {completedInStage.length} / {lessonsInStage.length} Completed
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border ${
                      isAllCompleted
                        ? 'bg-foreground text-background border-foreground font-semibold'
                        : completedInStage.length > 0
                        ? 'bg-accent text-foreground border-border'
                        : 'text-muted-foreground border-border'
                    }`}
                  >
                    {isAllCompleted ? 'Mastered' : completedInStage.length > 0 ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{stage.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {lessonsInStage.map((lesson) => {
                  const done = masteredTopics.includes(lesson.id);
                  return (
                    <NavLink
                      key={lesson.id}
                      to="/concepts"
                      className="p-3 rounded-lg border border-border bg-surface/30 hover:border-foreground/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-2.5">
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-foreground stroke-[2]" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground stroke-[1.5]" />
                        )}
                        <span className="text-xs font-medium text-foreground group-hover:underline">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        Step {lesson.stepNumber}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-6 bg-surface border border-border rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-foreground stroke-[1.5]" />
          <div>
            <div className="text-xs font-bold text-foreground">Want hands-on code tracing?</div>
            <div className="text-[11px] text-muted-foreground">Open the 3-panel playground to execute live Java 21 programs.</div>
          </div>
        </div>
        <NavLink
          to="/playground"
          className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-all shrink-0"
        >
          <span>Open Playground</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </div>
  );
};
