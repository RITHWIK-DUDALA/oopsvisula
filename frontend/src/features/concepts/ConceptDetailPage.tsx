import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  Check,
  Copy,
  ExternalLink,
  Clock,
  Award,
  Terminal,
  Zap
} from 'lucide-react';
import { detailedConceptsMap } from '@/data/conceptDetailsData';
import { curriculumLessons } from '@/data/curriculumData';
import { useLearnerStore } from '@/services/storage/localStore';
import { JAVA_MODULES, OOP_MODULES } from './curriculumModulesData';
import { LessonNavigationFooter } from './components/LessonNavigationFooter';
import { ApplicationTransition } from '@/features/transition/ApplicationTransition';
import { getCanonicalLesson } from './data/canonicalLessonsRegistry';
import { CanonicalLessonView } from './components/CanonicalLessonView';

export const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'intermediate' | 'advanced' | 'modern'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoadingConcept, setIsLoadingConcept] = useState(true);

  // Trigger loading animation whenever the user enters or switches to a new concept
  useEffect(() => {
    setIsLoadingConcept(true);
  }, [conceptId]);

  const { masteredTopics, markTopicMastered, unmarkTopicMastered } = useLearnerStore();

  const canonicalLesson = useMemo(() => {
    return getCanonicalLesson(conceptId);
  }, [conceptId]);

  const concept = conceptId ? detailedConceptsMap[conceptId] : null;

  // Fallback to curriculum lesson if concept details map is missing
  const fallbackLesson = curriculumLessons.find((l) => l.id === conceptId);

  // Fallback to module sub-concepts across Java and OOP tracks
  const subConceptData = useMemo(() => {
    if (!conceptId || canonicalLesson || concept || fallbackLesson) return null;
    for (const mod of JAVA_MODULES) {
      const match = mod.concepts.find((c) => c.id === conceptId);
      if (match) return { concept: match, module: mod, track: 'java' as const };
    }
    for (const mod of OOP_MODULES) {
      const match = mod.concepts.find((c) => c.id === conceptId);
      if (match) return { concept: match, module: mod, track: 'oop' as const };
    }
    return null;
  }, [conceptId, canonicalLesson, concept, fallbackLesson]);

  if (!canonicalLesson && !concept && !fallbackLesson && !subConceptData) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-xl font-bold text-foreground">Concept Not Found</h1>
        <p className="text-xs text-muted-foreground">The requested concept step "{conceptId}" does not exist in the curriculum.</p>
        <button
          onClick={() => navigate('/app/concepts')}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>
      </div>
    );
  }

  const isMastered = conceptId ? masteredTopics.includes(conceptId) : false;

  const toggleMastery = () => {
    if (!conceptId) return;
    if (isMastered) {
      unmarkTopicMastered(conceptId);
    } else {
      markTopicMastered(conceptId);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLaunchPlayground = () => {
    navigate('/app/playground');
  };

  const conceptTitle =
    canonicalLesson?.title ||
    concept?.title ||
    fallbackLesson?.title ||
    subConceptData?.concept.title ||
    'Java Concept';

  if (canonicalLesson) {
    return (
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Entering Concept Page Loading Animation Overlay */}
        <ApplicationTransition
          isOpen={isLoadingConcept}
          title="OOPS LAB"
          subtitle="Interactive Concept Lab"
          initialStatus={`Loading ${canonicalLesson.title}...`}
          backdropVariant="translucent"
          stages={[
            { timeMs: 320, text: 'Configuring Memory Canvas & Syntax...' },
            { timeMs: 680, text: 'Preparing Interactive Visualizer...', isComplete: true },
            { timeMs: 1000, text: `${canonicalLesson.title} Ready` },
          ]}
          durationMs={1150}
          onComplete={() => setIsLoadingConcept(false)}
        />

        <CanonicalLessonView
          lesson={canonicalLesson}
          isMastered={isMastered}
          onToggleMastery={toggleMastery}
          onLaunchPlayground={(_code) => {
            navigate('/app/playground');
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Entering Concept Page Loading Animation Overlay */}
      <ApplicationTransition
        isOpen={isLoadingConcept}
        title="OOPS LAB"
        subtitle="Interactive Concept Lab"
        initialStatus={`Loading ${conceptTitle}...`}
        backdropVariant="translucent"
        stages={[
          { timeMs: 320, text: 'Configuring Memory Canvas & Syntax...' },
          { timeMs: 680, text: 'Preparing Interactive Visualizer...', isComplete: true },
          { timeMs: 1000, text: `${conceptTitle} Ready` },
        ]}
        durationMs={1150}
        onComplete={() => setIsLoadingConcept(false)}
      />

      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
          <Link to={subConceptData?.track === 'oop' ? "/app/concepts?track=oop" : "/app/concepts?track=java"} className="hover:text-foreground transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">
            {subConceptData
              ? `Module ${subConceptData.module.moduleNumber}`
              : `Step ${(concept ? concept.stepNumber : fallbackLesson?.stepNumber || 1).toString().padStart(2, '0')}`}
          </span>
          <span>/</span>
          <span className="truncate max-w-[200px] text-foreground">
            {concept?.title || fallbackLesson?.title || subConceptData?.concept.title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMastery}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isMastered
                ? 'bg-foreground text-background border-foreground font-semibold shadow-2xs'
                : 'bg-white border-border text-foreground hover:border-foreground'
            }`}
          >
            {isMastered ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-background" />
                <span>Mastered ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" />
                <span>Mark Mastered</span>
              </>
            )}
          </button>

          <button
            onClick={handleLaunchPlayground}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-foreground text-background text-xs font-semibold rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 stroke-[2]" />
            <span>Open in Visualizer</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-foreground text-background">
            Step {concept ? concept.stepNumber.toString().padStart(2, '0') : fallbackLesson?.stepNumber}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-surface border border-border text-foreground font-medium">
            {concept?.category || fallbackLesson?.category}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 text-muted-foreground flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{concept?.readingTime || '6 min read'}</span>
          </span>
          <span className="text-[11px] font-mono bg-accent px-2 py-0.5 rounded text-foreground border border-border">
            Java 21 LTS Verified
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {concept?.title || fallbackLesson?.title}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {concept?.subtitle || fallbackLesson?.subtitle}
        </p>

        {concept && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Target Skills:
            </span>
            {concept.targetSkills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 bg-[#F9FAFB] border border-border rounded text-[#374151]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Progressive Level Navigation Tabs */}
      <div className="border-b border-border flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-px text-xs font-medium no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 sm:px-4 py-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'all'
              ? 'border-foreground text-foreground font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>All Levels</span>
          <span className="hidden xl:inline text-muted-foreground font-normal ml-1">(Overview)</span>
        </button>
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-3 sm:px-4 py-2 border-b-2 transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 ${
            activeTab === 'basic'
              ? 'border-foreground text-foreground font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>1. Basic</span>
          <span className="hidden md:inline text-muted-foreground font-normal ml-0.5">(Foundations)</span>
        </button>
        <button
          onClick={() => setActiveTab('intermediate')}
          className={`px-3 sm:px-4 py-2 border-b-2 transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 ${
            activeTab === 'intermediate'
              ? 'border-foreground text-foreground font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>2. Intermediate</span>
          <span className="hidden md:inline text-muted-foreground font-normal ml-0.5">(Mechanics)</span>
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-3 sm:px-4 py-2 border-b-2 transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 ${
            activeTab === 'advanced'
              ? 'border-foreground text-foreground font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>3. Advanced</span>
          <span className="hidden md:inline text-muted-foreground font-normal ml-0.5">(JVM & Bytecode)</span>
        </button>
        <button
          onClick={() => setActiveTab('modern')}
          className={`px-3 sm:px-4 py-2 border-b-2 transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 ${
            activeTab === 'modern'
              ? 'border-foreground text-foreground font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>4. Java 21</span>
          <span className="hidden md:inline text-muted-foreground font-normal ml-0.5">(Modern)</span>
        </button>
      </div>

      {/* Main Educational Content Area */}
      <div className="space-y-12 text-sm leading-relaxed text-foreground">
        {concept ? (
          <>
            {/* LEVEL 1: BASIC FOUNDATIONS */}
            {(activeTab === 'all' || activeTab === 'basic') && (
              <section className="space-y-6 scroll-mt-20">
                <div className="flex items-center space-x-2 border-b border-border pb-2">
                  <div className="w-6 h-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Basic Foundations & Mental Model</h2>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-surface border border-border">
                    Beginner Level
                  </span>
                </div>

                <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-2xs">
                  <h3 className="text-xs font-mono uppercase font-bold text-muted-foreground tracking-wider">
                    Conceptual Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {concept.basic.overview}
                  </p>
                </div>

                {/* Real-World Analogy Callout */}
                <div className="p-5 bg-[#F9FAFB] border border-border rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-foreground">
                    <Sparkles className="w-4 h-4 text-foreground stroke-[1.5]" />
                    <span>Real-World Mental Model: {concept.basic.realWorldAnalogy.headline}</span>
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {concept.basic.realWorldAnalogy.description}
                  </p>
                </div>

                {/* Why It Matters & Core Rules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-border rounded-xl space-y-2">
                    <div className="font-mono text-xs font-bold text-foreground flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Why This Principle Matters</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                      {concept.basic.whyItMatters.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-white border border-border rounded-xl space-y-2">
                    <div className="font-mono text-xs font-bold text-foreground flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Core Non-Negotiable Rules</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                      {concept.basic.coreRules.map((rule, idx) => (
                        <li key={idx} className="leading-relaxed">{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Starter Code Snippet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="font-semibold text-foreground">Starter Code Example</span>
                    <button
                      onClick={() => handleCopyCode(concept.basic.starterSnippet)}
                      className="hover:text-foreground flex items-center space-x-1"
                    >
                      {copiedCode === concept.basic.starterSnippet ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#111111] text-[#F3F4F6] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
                    {concept.basic.starterSnippet}
                  </pre>
                </div>
              </section>
            )}

            {/* LEVEL 2: INTERMEDIATE MECHANICS */}
            {(activeTab === 'all' || activeTab === 'intermediate') && (
              <section className="space-y-6 scroll-mt-20">
                <div className="flex items-center space-x-2 border-b border-border pb-2">
                  <div className="w-6 h-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
                    2
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Intermediate Mechanics & Syntax Patterns</h2>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-surface border border-border">
                    Developer Level
                  </span>
                </div>

                <div className="p-5 bg-white border border-border rounded-xl space-y-2 shadow-2xs">
                  <h3 className="text-xs font-mono uppercase font-bold text-muted-foreground tracking-wider">
                    How the Mechanics Function
                  </h3>
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {concept.intermediate.conceptualMechanics}
                  </p>
                </div>

                {/* Syntax Breakdowns */}
                <div className="space-y-4">
                  {concept.intermediate.syntaxBreakdown.map((section, idx) => (
                    <div key={idx} className="p-5 bg-white border border-border rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-foreground">{section.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
                      {section.codeSnippet && (
                        <pre className="p-4 bg-[#F9FAFB] border border-border rounded-lg font-mono text-xs text-[#111111] overflow-x-auto leading-relaxed">
                          {section.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>

                {/* Common Pitfalls & Antipatterns */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600 stroke-[1.5]" />
                    <span>Common Anti-Patterns & Mistakes to Avoid</span>
                  </div>

                  {concept.intermediate.commonPitfalls.map((pitfall, idx) => (
                    <div key={idx} className="p-5 bg-white border border-border rounded-xl space-y-4 shadow-2xs">
                      <div>
                        <h5 className="font-bold text-xs text-foreground flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                          <span>{pitfall.mistake}</span>
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {pitfall.explanation}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg space-y-1.5">
                          <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider block">
                            ❌ Common Pitfall (Incorrect)
                          </span>
                          <pre className="text-[11px] text-red-950 overflow-x-auto leading-relaxed">
                            {pitfall.badSnippet}
                          </pre>
                        </div>

                        <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1.5">
                          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                            ✅ Idiomatic Solution (Correct)
                          </span>
                          <pre className="text-[11px] text-emerald-950 overflow-x-auto leading-relaxed">
                            {pitfall.goodSnippet}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LEVEL 3: ADVANCED JVM ARCHITECTURE */}
            {(activeTab === 'all' || activeTab === 'advanced') && (
              <section className="space-y-6 scroll-mt-20">
                <div className="flex items-center space-x-2 border-b border-border pb-2">
                  <div className="w-6 h-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
                    3
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Advanced JVM Memory Layout & Bytecode</h2>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-surface border border-border">
                    Systems Architecture Level
                  </span>
                </div>

                {/* JVM Memory Topology 4-Card Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-bold text-foreground flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Thread Call Stack</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {concept.advanced.jvmMemoryLayout.stackAllocation}
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-bold text-foreground flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>JVM Eden Heap Space</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {concept.advanced.jvmMemoryLayout.heapAllocation}
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-bold text-foreground flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Metaspace (Off-Heap)</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {concept.advanced.jvmMemoryLayout.metaspaceRole}
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-bold text-foreground flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>Garbage Collector Lifecycle</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {concept.advanced.jvmMemoryLayout.gcLifecycle}
                    </p>
                  </div>
                </div>

                {/* Bytecode Insights Table */}
                <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-2xs">
                  <h3 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider flex items-center space-x-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Bytecode Instructions & JVM Opcodes</span>
                  </h3>
                  <div className="divide-y divide-border text-xs font-mono">
                    {concept.advanced.bytecodeInsights.map((b, idx) => (
                      <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-bold text-foreground bg-surface px-2 py-0.5 rounded border border-border w-fit">
                          {b.opcode}
                        </span>
                        <span className="text-muted-foreground font-sans text-xs sm:text-right">
                          {b.explanation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Considerations */}
                <div className="p-4 bg-[#F9FAFB] border border-border rounded-xl space-y-2">
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    High-Throughput Engineering Considerations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                    {concept.advanced.engineeringConsiderations.map((c, idx) => (
                      <li key={idx} className="leading-relaxed">{c}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* LEVEL 4: MODERN JAVA 21 MASTERY */}
            {(activeTab === 'all' || activeTab === 'modern') && (
              <section className="space-y-6 scroll-mt-20">
                <div className="flex items-center space-x-2 border-b border-border pb-2">
                  <div className="w-6 h-6 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
                    4
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Modern Java 21 LTS Practices & Idioms</h2>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-surface border border-border">
                    Mastery Level
                  </span>
                </div>

                <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-2xs">
                  <h3 className="text-xs font-mono uppercase font-bold text-foreground tracking-wider">
                    Production Best Practices
                  </h3>
                  <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside">
                    {concept.modernJava21.bestPractices.map((bp, idx) => (
                      <li key={idx} className="leading-relaxed">{bp}</li>
                    ))}
                  </ul>
                </div>

                {/* Modern Java 21 Code Snippet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="font-semibold text-foreground">Idiomatic Java 21 LTS Implementation</span>
                    <button
                      onClick={() => handleCopyCode(concept.modernJava21.modernSnippet)}
                      className="hover:text-foreground flex items-center space-x-1"
                    >
                      {copiedCode === concept.modernJava21.modernSnippet ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#111111] text-[#F3F4F6] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
                    {concept.modernJava21.modernSnippet}
                  </pre>
                  <p className="text-xs text-muted-foreground italic">
                    {concept.modernJava21.modernExplanation}
                  </p>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Fallback content for any extra steps or sub-concepts */
          <div className="p-6 bg-white border border-border rounded-xl space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              {fallbackLesson?.title || subConceptData?.concept.title || 'Overview'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {fallbackLesson?.subtitle || subConceptData?.concept.description}
            </p>
            <pre className="p-4 bg-[#111111] text-white rounded-xl font-mono text-xs overflow-x-auto">
              {fallbackLesson?.sampleCode ||
                `// ${subConceptData?.module.title || 'Java Learning Module'}\n// Concept: ${subConceptData?.concept.title || 'Lesson Overview'}\n// Type or execute your code directly in the OOPS LAB Interactive Visualizer`}
            </pre>
          </div>
        )}
      </div>

      {/* Bottom Interactive Simulation & Practice Bar */}
      <div className="p-6 bg-white border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-sm text-foreground">Ready to test this concept live?</h3>
          <p className="text-xs text-muted-foreground">
            Step through the deterministic execution engine to observe Stack Frames and Heap Object pointers.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            to="/app/practice"
            className="px-3.5 py-2 border border-border text-foreground hover:bg-surface rounded-lg text-xs font-semibold transition-colors"
          >
            Practice Challenges
          </Link>

          <button
            onClick={handleLaunchPlayground}
            className="flex items-center space-x-1.5 px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all shadow-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch Visualizer</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Universal Reusable Previous / Next Lesson Navigation Footer */}
      <LessonNavigationFooter currentLessonId={conceptId} />
    </div>
  );
};
