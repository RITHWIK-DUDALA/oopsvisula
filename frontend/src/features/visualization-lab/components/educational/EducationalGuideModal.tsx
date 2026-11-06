import React from 'react';
import {
  X,
  BookOpen,
  Code2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Play,
  Layers,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { useVisualizationLabStore } from '../../visualizationStore';
import { getSubsection } from '../../subsectionsData';

export const EducationalGuideModal: React.FC = () => {
  const {
    isEducationalModalOpen,
    toggleEducationalModal,
    activeSubsectionId,
    activeScenarioId,
    toggleCodeDrawer,
    isCodeDrawerOpen,
  } = useVisualizationLabStore();

  if (!isEducationalModalOpen) return null;

  const sub = activeSubsectionId ? getSubsection(activeSubsectionId) : undefined;
  const scenarios = sub?.scenarios || [];
  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
  const edu = currentScenario?.educational;

  const howItWorksSteps: string[] = Array.isArray(edu?.howItWorks)
    ? edu.howItWorks
    : edu?.howItWorks
    ? [edu.howItWorks]
    : [];

  const commonMistakesList: string[] = Array.isArray(edu?.commonMistakes)
    ? edu.commonMistakes
    : edu?.commonMistakes
    ? [edu.commonMistakes]
    : [];

  const handleOpenEditor = () => {
    toggleEducationalModal();
    if (!isCodeDrawerOpen) {
      toggleCodeDrawer();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 sm:p-6 select-none animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl border border-[#DCE2EA] shadow-2xl flex flex-col overflow-hidden text-[#172033]"
        style={{ fontFamily: '"IBM Plex Sans Condensed", sans-serif' }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DCE2EA] bg-[#FAFBFD] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#EBF0FF] border border-[#CBD5E1] flex items-center justify-center text-[#1749C8]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded bg-[#1749C8] text-white font-bold"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  {sub?.code || '01'}
                </span>
                <h2 className="text-base font-bold text-[#172033] tracking-tight">
                  {sub?.title}
                </h2>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Scenario: <span className="font-semibold text-[#172033]">{currentScenario?.title}</span> • Level: <span className="font-mono text-[11px] text-[#1749C8]">{currentScenario?.level}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleOpenEditor}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#1749C8] text-white text-xs font-semibold hover:bg-[#12389C] transition-colors cursor-pointer shadow-2xs"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Open in Java Editor</span>
            </button>
            <button
              type="button"
              onClick={toggleEducationalModal}
              className="p-1.5 rounded-md text-[#64748B] hover:text-[#172033] hover:bg-[#F1F4F8] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
          {/* 1. What is it? & Why is it used? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center space-x-2 text-[#1749C8] font-bold text-xs uppercase tracking-wide">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>1. What is It?</span>
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                {edu?.whatIsIt || 'An essential structural construct in Java object-oriented programming.'}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center space-x-2 text-[#0284C7] font-bold text-xs uppercase tracking-wide">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>2. Why Is It Used?</span>
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                {edu?.whyIsItUsed || currentScenario?.learningObjective}
              </p>
            </div>
          </div>

          {/* 3. Java Syntax & Code Example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#172033] font-bold text-xs uppercase tracking-wide">
                <Code2 className="w-3.5 h-3.5 text-[#1749C8]" />
                <span>3. Java Syntax & Source Implementation</span>
              </div>
              <button
                type="button"
                onClick={handleOpenEditor}
                className="text-xs text-[#1749C8] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Edit in live workspace</span>
                <Play className="w-3 h-3 fill-[#1749C8]" />
              </button>
            </div>
            <pre
              className="p-4 rounded-lg bg-[#0F172A] text-[#F8FAFC] text-xs font-mono overflow-x-auto leading-relaxed border border-[#334155]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {currentScenario?.javaSource || edu?.javaSyntax}
            </pre>
          </div>

          {/* 4. How It Works (Step-by-step JVM Execution) */}
          <div className="p-4 rounded-lg bg-[#FAFBFD] border border-[#DCE2EA] space-y-3">
            <div className="flex items-center space-x-2 text-[#172033] font-bold text-xs uppercase tracking-wide">
              <Cpu className="w-3.5 h-3.5 text-[#1749C8]" />
              <span>4. Step-by-Step JVM Execution</span>
            </div>
            <ol className="space-y-2 text-sm text-[#334155]">
              {howItWorksSteps.length > 0 ? (
                howItWorksSteps.map((step: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span
                      className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#EBF0FF] text-[#1749C8] font-bold shrink-0 mt-0.5"
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-[#64748B]">
                  JVM loads the compiled class bytecode into Metaspace, resolves static members, creates Stack frames during execution, and allocates heap instances upon `new`.
                </li>
              )}
            </ol>
          </div>

          {/* 5. Visual Representation in 2D Canvas */}
          <div className="p-4 rounded-lg bg-[#FAFBFD] border border-[#DCE2EA] space-y-2">
            <div className="flex items-center space-x-2 text-[#1749C8] font-bold text-xs uppercase tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              <span>5. Visual Representation (Stack • Heap • Metaspace)</span>
            </div>
            <p className="text-sm text-[#334155] leading-relaxed">
              {edu?.visualRepresentation}
            </p>
          </div>

          {/* 6. Real-World Analogy */}
          {edu?.realWorldExample && (
            <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
              <div className="flex items-center space-x-2 text-[#B45309] font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>6. Real-World Analogy</span>
              </div>
              <p className="text-sm text-[#78350F] leading-relaxed">
                {edu.realWorldExample}
              </p>
            </div>
          )}

          {/* 7. Common Mistakes & Pitfalls */}
          {commonMistakesList.length > 0 && (
            <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] space-y-2">
              <div className="flex items-center space-x-2 text-[#B91C1C] font-bold text-xs uppercase tracking-wide">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>7. Common Pitfalls & Anti-Patterns</span>
              </div>
              <ul className="space-y-1.5 text-sm text-[#7F1D1D]">
                {commonMistakesList.map((mistake: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#DC2626] font-bold">•</span>
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 8. Interactive Challenge */}
          {edu?.challenge && (
            <div className="p-4 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
              <div className="flex items-center space-x-2 text-[#15803D] font-bold text-xs uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>8. Student Practice Challenge</span>
              </div>
              <p className="text-sm text-[#14532D] leading-relaxed font-medium">
                {edu.challenge}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenEditor}
                  className="px-3 py-1.5 rounded-md bg-[#16A34A] text-white text-xs font-semibold hover:bg-[#15803D] transition-colors cursor-pointer shadow-2xs inline-flex items-center space-x-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Launch Challenge in Java Editor</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#DCE2EA] bg-[#FAFBFD] flex items-center justify-between text-xs text-[#64748B] shrink-0">
          <div className="flex items-center space-x-2">
            <span>OOPS LAB Pedagogical Guide</span>
            <span>•</span>
            <span className="font-mono text-[#1749C8]">Deterministic JVM Visualizer</span>
          </div>
          <button
            type="button"
            onClick={toggleEducationalModal}
            className="px-3 py-1 text-xs font-semibold text-[#172033] hover:bg-[#F1F4F8] rounded transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
