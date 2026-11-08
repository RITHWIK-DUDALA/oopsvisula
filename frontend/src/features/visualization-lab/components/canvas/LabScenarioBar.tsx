import React from 'react';
import { useReactFlow } from '@xyflow/react';
import {
  BookOpen,
  Code2,
  ChevronRight,
  Sparkles,
  Layers,
  LayoutGrid,
  Maximize2,
} from 'lucide-react';
import { useVisualizationLabStore } from '../../visualizationStore';
import { getSubsection } from '../../subsectionsData';

export const LabScenarioBar: React.FC = () => {
  const { fitView } = useReactFlow();
  const {
    activeSubsectionId,
    activeScenarioId,
    setActiveScenario,
    toggleCodeDrawer,
    toggleEducationalModal,
    applyLayout,
  } = useVisualizationLabStore();

  const sub = activeSubsectionId ? getSubsection(activeSubsectionId) : undefined;
  const scenarios = sub?.scenarios || [];
  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  if (!sub || scenarios.length === 0) {
    return null;
  }

  return (
    <div
      className="h-10 px-3 bg-white border-b border-[#DCE2EA] flex items-center justify-between shrink-0 select-none z-10 gap-2 overflow-x-auto overflow-y-hidden shadow-2xs font-sans no-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Left: Breadcrumb & Scenario Selector */}
      <div className="flex items-center space-x-2 min-w-0 shrink">
        {/* Subsection Pill */}
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#F1F4F8] text-[#172033] text-xs font-semibold shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#1749C8] shrink-0" />
          <span className="font-mono text-[11px] text-[#1749C8]" style={{ fontFamily: '"Space Mono", monospace' }}>
            {sub.code}
          </span>
          <span className="truncate max-w-[150px] sm:max-w-[200px] text-[12.5px]">
            {sub.title}
          </span>
        </div>

        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />

        {/* Scenario Selector Dropdown */}
        <div className="flex items-center space-x-1 shrink-0">
          <label className="text-[11px] font-mono text-[#64748B] hidden sm:inline" style={{ fontFamily: '"Space Mono", monospace' }}>
            Scenario:
          </label>
          <select
            value={activeScenarioId || currentScenario?.id}
            onChange={(e) => setActiveScenario(e.target.value)}
            className="text-xs font-semibold text-[#172033] bg-[#FAFBFD] hover:bg-white border border-[#DCE2EA] focus:border-[#1749C8] rounded px-2 py-1 outline-hidden cursor-pointer shadow-2xs"
            style={{ fontFamily: '"IBM Plex Sans Condensed", sans-serif' }}
          >
            {scenarios.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.title} ({sc.level})
              </option>
            ))}
          </select>
        </div>

        {/* Learning Objective summary snippet */}
        {currentScenario?.learningObjective && (
          <div className="hidden lg:flex items-center space-x-1.5 px-2 py-0.5 rounded bg-blue-50/60 border border-blue-200/50 text-[11px] text-[#1749C8] truncate max-w-[360px]">
            <Sparkles className="w-3 h-3 text-[#1749C8] shrink-0" />
            <span className="truncate">{currentScenario.learningObjective}</span>
          </div>
        )}
      </div>

      {/* Right: Concept Guide & Java Code Action Buttons */}
      <div className="flex items-center space-x-1.5 shrink-0">
        {/* Auto Fit Button */}
        <button
          type="button"
          onClick={() => fitView({ padding: 0.22, duration: 400 })}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#FAFBFD] hover:bg-white text-[#172033] border border-[#DCE2EA] hover:border-[#1749C8] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          title="Auto-fit diagram to canvas viewport"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#1749C8] shrink-0" />
          <span className="hidden sm:inline">Auto-Fit</span>
        </button>

        {/* Auto Layout Button */}
        <button
          type="button"
          onClick={() => applyLayout()}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#FAFBFD] hover:bg-white text-[#172033] border border-[#DCE2EA] hover:border-[#1749C8] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          title="Auto-arrange visualization layout with zero entity collisions"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[#1749C8] shrink-0" />
          <span className="hidden sm:inline">Auto-Layout</span>
        </button>

        {/* Concept Guide Button (Master Prompt Section 14) */}
        <button
          type="button"
          onClick={toggleEducationalModal}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#FAFBFD] hover:bg-white text-[#172033] border border-[#DCE2EA] hover:border-[#1749C8] text-xs font-semibold transition-colors shadow-2xs"
          title="Open complete educational concept guide (What is it, Why, How, Syntax, Mistakes, Challenge)"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#1749C8] shrink-0" />
          <span className="hidden sm:inline">Concept Guide</span>
        </button>

        {/* Java Source Code Button */}
        <button
          type="button"
          onClick={toggleCodeDrawer}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#FAFBFD] hover:bg-white text-[#172033] border border-[#DCE2EA] hover:border-[#1749C8] text-xs font-mono font-semibold transition-colors shadow-2xs"
          title="Open Java Source Code Editor"
        >
          <Code2 className="w-3.5 h-3.5 text-[#C65A19] shrink-0" />
          <span className="hidden sm:inline">Java Code</span>
        </button>
      </div>
    </div>
  );
};
