import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GitBranch, CheckCircle2, Circle, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { curriculumLessons } from '@/data/curriculumData';
import { useLearnerStore } from '@/services/storage/localStore';

export const RoadmapPage: React.FC = () => {
  const { masteredTopics } = useLearnerStore();
  const [expandedStages, setExpandedStages] = useState<Set<number>>(() => new Set([0, 1, 2, 3, 4]));

  const toggleStage = (idx: number) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

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

      <div className="space-y-4 sm:space-y-6">
        {stages.map((stage, idx) => {
          const lessonsInStage = curriculumLessons.filter((l) => l.category === stage.category);
          const completedInStage = lessonsInStage.filter((l) => masteredTopics.includes(l.id));
          const isAllCompleted = completedInStage.length === lessonsInStage.length && lessonsInStage.length > 0;
          const isExpanded = expandedStages.has(idx);

          return (
            <div
              key={idx}
              className={`p-5 sm:p-6 bg-white rounded-xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xs ${
                isExpanded ? 'border border-[#CBD5E1]' : 'border border-border hover:border-[#CBD5E1]/80'
              }`}
            >
              {/* Interactive Stage Header with Dropdown Chevron */}
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleStage(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleStage(idx);
                  }
                }}
                className="flex items-center justify-between cursor-pointer select-none gap-3 -m-2 p-2 rounded-lg hover:bg-black/[0.015] transition-colors"
              >
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <GitBranch className="w-4 h-4 text-foreground stroke-[1.5] shrink-0" />
                  <h2 className="text-sm font-bold text-foreground truncate">{stage.title}</h2>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                  <span className="text-muted-foreground hidden sm:inline">
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

                  {/* Smooth 280ms Rotating Chevron */}
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground oops-chevron-rotate ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Smooth Animated Accordion Panel */}
              <div className={`oops-accordion-grid ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="oops-accordion-inner">
                  <div className="oops-accordion-content space-y-4 pt-4 mt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">{stage.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {lessonsInStage.map((lesson) => {
                        const done = masteredTopics.includes(lesson.id);
                        return (
                          <NavLink
                            key={lesson.id}
                            to={`/app/concepts/${lesson.id}`}
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner — Contextual Progression to Visualizers and Playground */}
      <div className="p-6 bg-surface border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-foreground stroke-[1.5]" />
          <div>
            <div className="text-xs font-bold text-foreground">Next Step: Explore Interactive Visualizers</div>
            <div className="text-[11px] text-muted-foreground">Observe JVM runtime memory mechanics, stack frames, and object graphs in 2D and 3D.</div>
          </div>
        </div>
        <div className="flex items-center space-x-2.5 shrink-0">
          <NavLink
            to="/app/visualizers"
            className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:bg-black/90 transition-all shadow-xs"
          >
            <span>Explore Visualizers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
          <NavLink
            to="/app/playground"
            className="flex items-center space-x-1.5 px-3.5 py-2 border border-border bg-white text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-all"
          >
            <span>Playground</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
