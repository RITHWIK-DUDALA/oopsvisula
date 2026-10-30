import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, Circle, BookOpen, Cpu, Code2, Sparkles, X } from 'lucide-react';
import { curriculumLessons, CurriculumLesson } from '@/data/curriculumData';
import { useLearnerStore } from '@/services/storage/localStore';

export const ConceptsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(null);

  const { masteredTopics, markTopicMastered, unmarkTopicMastered } = useLearnerStore();
  const navigate = useNavigate();

  const categories = ['All', 'Foundations', 'Core OOP', 'Relationships', 'Java 21 Modern', 'Advanced'];

  const filteredLessons = curriculumLessons.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || l.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const isMastered = (id: string) => masteredTopics.includes(id);

  const toggleMastery = (id: string) => {
    if (isMastered(id)) {
      unmarkTopicMastered(id);
    } else {
      markTopicMastered(id);
    }
  };

  const handleLaunchPlayground = () => {
    navigate('/playground');
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Curriculum Catalog</span>
          <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
            Java 21 LTS
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">14-Step Java OOP Learning Track</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Step-by-step conceptual mastery paired with deterministic JVM internal state inspection.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search concepts (e.g. polymorphism, sealed, heap)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border bg-white text-xs rounded-lg focus:outline-hidden font-mono"
          >
          </input>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-foreground text-background shadow-xs font-semibold'
                  : 'bg-white border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 14 Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const completed = isMastered(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="p-5 bg-white border border-border rounded-xl space-y-3.5 hover:border-foreground/50 transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-surface border border-border text-foreground">
                    Step {lesson.stepNumber.toString().padStart(2, '0')} • {lesson.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastery(lesson.id);
                    }}
                    title={completed ? 'Mark unmastered' : 'Mark mastered'}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4 text-foreground stroke-[2]" />
                    ) : (
                      <Circle className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-foreground text-sm tracking-tight group-hover:underline">
                  {lesson.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {lesson.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="text-[11px] font-mono truncate max-w-[200px]">{lesson.jvmBehavior.slice(0, 36)}...</span>
                <span className="text-foreground group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Lesson Walkthrough Modal / Drawer */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-surface/50">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
                  <span>Step {activeLesson.stepNumber} of 14</span>
                  <span>•</span>
                  <span>{activeLesson.category}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{activeLesson.title}</h2>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                aria-label="Close modal"
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* JVM Internal State Highlight */}
              <div className="p-4 bg-surface border border-border rounded-xl space-y-1.5">
                <div className="flex items-center space-x-1.5 font-mono font-semibold text-foreground uppercase tracking-wider text-[11px]">
                  <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>JVM Memory Mechanics (Stack vs Heap)</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activeLesson.jvmBehavior}
                </p>
              </div>

              {/* Theory Pillars */}
              <div className="space-y-2">
                <div className="font-mono uppercase font-semibold text-foreground text-[11px] flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Core Conceptual Rules</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-muted-foreground leading-relaxed">
                  {activeLesson.theory.map((point, i) => (
                    <li key={i} className="text-xs">{point}</li>
                  ))}
                </ul>
              </div>

              {/* Code Syntax Sample */}
              <div className="space-y-2">
                <div className="font-mono uppercase font-semibold text-foreground text-[11px] flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Idiomatic Java 21 Implementation</span>
                </div>
                <pre className="p-4 bg-surface/50 border border-border rounded-xl font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
                  {activeLesson.sampleCode}
                </pre>
              </div>

              {/* Exercise Prompt */}
              <div className="p-3.5 bg-accent/50 border border-border rounded-xl space-y-1">
                <div className="font-semibold text-foreground flex items-center space-x-1.5 text-[11px] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
                  <span>Practice Exercise</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activeLesson.exercisePrompt}
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-border bg-surface/30 flex items-center justify-between">
              <button
                onClick={() => toggleMastery(activeLesson.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isMastered(activeLesson.id)
                    ? 'bg-foreground text-background border-foreground font-semibold'
                    : 'bg-white border-border text-foreground hover:border-foreground'
                }`}
              >
                {isMastered(activeLesson.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mastered ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    <span>Mark as Mastered</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLaunchPlayground}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all"
                >
                  <span>Launch in Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
