import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Sparkles,
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CanonicalLesson } from '../data/module04Data';
import { ConceptTree } from './ConceptTree';
import { TechnicalDiagram } from './TechnicalDiagram';
import { InlineConceptVisualizer } from './InlineConceptVisualizer';
import { CommonMistakesCard } from './CommonMistakesCard';
import { PracticeChallengeWidget } from './PracticeChallengeWidget';
import { VerifiedResourceCard } from './VerifiedResourceCard';
import { LessonNavigationFooter } from './LessonNavigationFooter';

export interface CanonicalLessonViewProps {
  lesson: CanonicalLesson;
  isMastered: boolean;
  onToggleMastery: () => void;
  onLaunchPlayground: (code?: string) => void;
}

export const CanonicalLessonView: React.FC<CanonicalLessonViewProps> = ({
  lesson,
  isMastered,
  onToggleMastery,
  onLaunchPlayground,
}) => {
  const navigate = useNavigate();
  const [activeCodeTab, setActiveCodeTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentExample = lesson.codeExamples[activeCodeTab];

  return (
    <div className="space-y-10">
      {/* 6.1 Top Breadcrumbs & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
          <Link to={lesson.track === 'oop' ? "/app/concepts?track=oop" : "/app/concepts?track=java"} className="hover:text-foreground transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Module {lesson.moduleNumber}</span>
          <span>/</span>
          <span className="text-muted-foreground">{lesson.topicTitle}</span>
          <span>/</span>
          <span className="truncate max-w-[220px] text-foreground font-medium">{lesson.title}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMastery}
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
            onClick={() => onLaunchPlayground(currentExample?.code)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#075CF5] hover:bg-[#064ed8] text-white text-xs font-semibold rounded-lg active:scale-[0.98] transition-all shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 stroke-[2]" />
            <span>Open in Visualizer</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
          </button>
        </div>
      </div>

      {/* 6.2 Lesson Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-foreground text-background">
            Lesson {(lesson.lessonNumber || 1).toString().padStart(2, '0')}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[#075CF5] font-semibold">
            Module {lesson.moduleNumber}: {lesson.moduleTitle}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 border border-border text-neutral-800 font-medium">
            {lesson.difficulty}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 text-muted-foreground flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.readingTime}</span>
          </span>
          <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-medium">
            Java 21 LTS Verified
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{lesson.title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">{lesson.subtitle}</p>
      </div>

      {/* 6.3 Objectives Card */}
      <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#075CF5]">
          <Sparkles className="w-4 h-4" />
          <span>Core Learning Objectives</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {lesson.objectives.map((obj, i) => (
            <li key={i} className="flex items-start space-x-2 text-xs text-neutral-800 leading-normal">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-[#075CF5] font-mono text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 6.4 What Is It? */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <BookOpen className="w-4 h-4 text-[#075CF5]" />
          <h2 className="text-lg font-bold text-foreground">1. What is {lesson.title}?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-border rounded-xl space-y-2 shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center space-x-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Intuitive Plain-English Concept</span>
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed">{lesson.whatIs.beginner}</p>
          </div>

          <div className="p-4 bg-white border border-border rounded-xl space-y-2 shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#075CF5] font-semibold flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical & JVM Architecture Definition</span>
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed">{lesson.whatIs.technical}</p>
          </div>
        </div>

        {lesson.whatIs.terminology.length > 0 && (
          <div className="p-4 bg-surface border border-border rounded-xl space-y-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold tracking-wider">
              Essential Technical Terminology
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {lesson.whatIs.terminology.map((t, idx) => (
                <div key={idx} className="p-2.5 bg-white border border-border rounded-lg space-y-1">
                  <span className="text-xs font-mono font-bold text-[#075CF5]">{t.term}</span>
                  <p className="text-[11px] text-muted-foreground leading-snug">{t.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6.5 Why Is It Needed? */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h2 className="text-lg font-bold text-foreground">2. Why is this Needed in Java?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-border rounded-xl space-y-2 shadow-2xs">
            <span className="text-[11px] font-mono uppercase font-bold text-neutral-900">Problem It Solves</span>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson.whyNeeded.problemSolved}</p>
          </div>
          <div className="p-4 bg-white border border-border rounded-xl space-y-2 shadow-2xs">
            <span className="text-[11px] font-mono uppercase font-bold text-[#075CF5]">Why Java Provides It</span>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson.whyNeeded.whyJavaProvidesIt}</p>
          </div>
          <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl space-y-2 shadow-2xs">
            <span className="text-[11px] font-mono uppercase font-bold text-red-600">Without It</span>
            <p className="text-xs text-red-950/80 leading-relaxed">{lesson.whyNeeded.withoutIt}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-lg text-xs text-emerald-950">
            <strong className="font-semibold block mb-1 text-emerald-800 font-mono">When to Use:</strong>
            {lesson.whyNeeded.whenToUse}
          </div>
          <div className="p-3.5 bg-amber-50/40 border border-amber-100 rounded-lg text-xs text-amber-950">
            <strong className="font-semibold block mb-1 text-amber-800 font-mono">When NOT to Use:</strong>
            {lesson.whyNeeded.whenNotToUse}
          </div>
        </div>
      </section>

      {/* 6.6 How It Works Step-by-Step */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <Layers className="w-4 h-4 text-[#075CF5]" />
          <h2 className="text-lg font-bold text-foreground">3. How It Works Step-by-Step</h2>
        </div>

        <div className="space-y-3">
          {lesson.howItWorks.steps.map((st) => (
            <div key={st.stepNum} className="p-4 bg-white border border-border rounded-xl space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-xs font-bold">
                    {st.stepNum}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">{st.headline}</h3>
                </div>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed pl-7">{st.whatHappens}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7 pt-1">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] space-y-1">
                  <span className="font-mono font-bold text-[#075CF5] block">JVM Internals:</span>
                  <span className="text-neutral-600 leading-normal">{st.jvmInternals}</span>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] space-y-1">
                  <span className="font-mono font-bold text-neutral-900 block">Student Observation:</span>
                  <span className="text-neutral-600 leading-normal">{st.studentObservation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6.7 Classifications / Types Table */}
      {lesson.classifications && (
        <section className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2">
            <Cpu className="w-4 h-4 text-[#075CF5]" />
            <h2 className="text-lg font-bold text-foreground">4. Technical Specifications & Classifications</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-border text-[11px] font-mono uppercase text-muted-foreground">
                <tr>
                  {lesson.classifications.tableHeaders.map((hdr, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-bold">{hdr}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lesson.classifications.tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-50/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-mono font-bold text-[#075CF5]' : 'text-neutral-700'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 6.8 Formal Syntax and Language Rules */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <Code2 className="w-4 h-4 text-[#075CF5]" />
          <h2 className="text-lg font-bold text-foreground">5. Formal Syntax & Compiler Rules</h2>
        </div>

        <div className="p-4 bg-white border border-border rounded-xl space-y-4 shadow-2xs">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-muted-foreground block mb-1">
              General Syntax Specification
            </span>
            <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto border border-neutral-800">
              {lesson.syntaxAndRules.syntaxPattern}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-emerald-800 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Valid Java 21 Code</span>
              </span>
              <pre className="p-2.5 bg-white border border-emerald-200 rounded font-mono text-xs text-neutral-800 overflow-x-auto">
                {lesson.syntaxAndRules.correctCode}
              </pre>
            </div>

            <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-red-800 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Compiler Error Example</span>
              </span>
              <pre className="p-2.5 bg-white border border-red-200 rounded font-mono text-xs text-neutral-800 overflow-x-auto">
                {lesson.syntaxAndRules.incorrectCode}
              </pre>
              <div className="text-[10px] font-mono text-red-600 bg-red-100/50 p-1.5 rounded">
                {lesson.syntaxAndRules.compilerError}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase font-bold text-muted-foreground block mb-2">
              Compiler Rules & Invariants
            </span>
            <ul className="space-y-1.5">
              {lesson.syntaxAndRules.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-neutral-700">
                  <span className="text-[#075CF5] font-mono font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6.9 Interactive Concept Tree */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <Layers className="w-4 h-4 text-[#075CF5]" />
          <h2 className="text-lg font-bold text-foreground">6. Concept Architecture Tree</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Explore the hierarchical structure of this concept. Click nodes to view descriptions or jump to related lessons.
        </p>
        <ConceptTree
          data={lesson.conceptTree}
          activeLessonId={lesson.id}
          onSelectLesson={(lessonId) => navigate(`/app/concepts/${lessonId}`)}
          title={`${lesson.title} — Concept Map`}
        />
      </section>

      {/* 6.10 Precision Technical Diagram */}
      {lesson.diagramConfig && (
        <section className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2">
            <Cpu className="w-4 h-4 text-[#075CF5]" />
            <h2 className="text-lg font-bold text-foreground">7. Precision Memory & Architectural Diagram</h2>
          </div>
          <TechnicalDiagram
            type={lesson.diagramConfig.type}
            title={lesson.diagramConfig.title}
            subtitle={lesson.diagramConfig.subtitle}
            config={lesson.diagramConfig.config}
          />
        </section>
      )}

      {/* 6.11 Code Examples (Tabbed: Beginner / Intermediate / Advanced) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-[#075CF5]" />
            <h2 className="text-lg font-bold text-foreground">8. Java 21 Code Examples</h2>
          </div>

          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg text-xs font-mono font-semibold">
            {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCodeTab(tab)}
                className={`px-3 py-1 rounded-md transition-all capitalize ${
                  activeCodeTab === tab
                    ? 'bg-white text-foreground shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground uppercase tracking-wider font-semibold">
              {activeCodeTab} Demonstration
            </span>
            <button
              onClick={() => handleCopy(`example-${activeCodeTab}`, currentExample.code)}
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border bg-neutral-50"
            >
              {copiedKey === `example-${activeCodeTab}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
            {currentExample.code}
          </pre>

          <div className="p-3 bg-neutral-950 text-emerald-400 font-mono text-xs rounded-lg border border-neutral-800 space-y-1">
            <span className="text-[10px] uppercase text-neutral-400 font-bold block">Console Output:</span>
            <pre className="whitespace-pre-wrap">{currentExample.output}</pre>
          </div>

          <p className="text-xs text-neutral-700 leading-relaxed border-t border-border pt-3">
            <strong className="font-semibold text-neutral-900">Technical Breakdown: </strong>
            {currentExample.explanation}
          </p>
        </div>
      </section>

      {/* 6.12 Interactive In-Lesson Visualizer */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <Terminal className="w-4 h-4 text-[#075CF5]" />
          <h2 className="text-lg font-bold text-foreground">9. Interactive Execution Visualizer</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Step through the execution line-by-line to inspect Stack Frame variables, Heap allocations, and standard output.
        </p>
        <InlineConceptVisualizer
          initialCode={currentExample.code}
          steps={lesson.visualizerSteps}
          title={`${lesson.title} — Step Execution`}
          lessonId={lesson.id}
        />
      </section>

      {/* 6.13 Execution State Visualizer CTA */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50/30 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-sm text-neutral-900">Experience Full Deterministic Simulation</h3>
          <p className="text-xs text-neutral-600">
            Jump to the 3-panel OOPS LAB Playground to edit, compile, and step through bytecode instructions.
          </p>
        </div>
        <button
          onClick={() => onLaunchPlayground(currentExample?.code)}
          className="shrink-0 flex items-center space-x-2 px-4 py-2 bg-[#075CF5] hover:bg-[#064ed8] text-white text-xs font-semibold rounded-lg shadow-sm active:scale-95 transition-all"
        >
          <Terminal className="w-4 h-4" />
          <span>Launch Full Visualizer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6.14 Common Mistakes & Compiler Pitfalls */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h2 className="text-lg font-bold text-foreground">10. Common Mistakes & Compiler Diagnostics</h2>
        </div>
        <CommonMistakesCard mistakes={lesson.commonMistakes} />
      </section>

      {/* 6.15 Real-World Applications */}
      {lesson.realWorldApplications.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2">
            <Zap className="w-4 h-4 text-[#FF7A00]" />
            <h2 className="text-lg font-bold text-foreground">11. Real-World Industry Applications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.realWorldApplications.map((app, idx) => (
              <div key={idx} className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs">
                <h3 className="text-xs font-bold text-neutral-900 font-mono">{app.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6.16 Practice Challenges */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2 border-b border-border pb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <h2 className="text-lg font-bold text-foreground">12. Self-Assessment Practice Challenges</h2>
        </div>
        <PracticeChallengeWidget
          quiz={lesson.practice.quiz}
          codingPrompt={lesson.practice.codingPrompt}
        />
      </section>

      {/* 6.17 Related Concepts */}
      {lesson.relatedConcepts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2">
            <Layers className="w-4 h-4 text-[#075CF5]" />
            <h2 className="text-lg font-bold text-foreground">13. Related & Next Concepts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lesson.relatedConcepts.map((rel) => (
              <button
                key={rel.id}
                onClick={() => navigate(`/app/concepts/${rel.id}`)}
                className="p-3 text-left bg-white hover:bg-neutral-50 border border-border rounded-xl space-y-1 transition-all group"
              >
                <span className="text-[10px] font-mono uppercase font-bold text-[#075CF5]">
                  {rel.relationship}
                </span>
                <div className="text-xs font-bold text-neutral-900 group-hover:text-[#075CF5] flex items-center justify-between">
                  <span>{rel.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 6.18 Verified Authoritative References */}
      <section className="space-y-3">
        <VerifiedResourceCard resources={lesson.references} />
      </section>

      {/* 6.19 Universal Reusable Previous / Next Lesson Navigation Footer */}
      <LessonNavigationFooter currentLessonId={lesson.id} />
    </div>
  );
};
