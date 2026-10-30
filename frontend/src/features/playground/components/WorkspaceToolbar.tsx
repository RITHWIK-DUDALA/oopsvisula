import React, { useState, useRef, useEffect } from 'react';
import {
  Code2,
  ChevronDown,
  Search,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { allSampleTraces } from '@/features/simulation/sampleTraces';

interface WorkspaceToolbarProps {
  onResetLayout?: () => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({ onResetLayout }) => {
  const { currentTrace, loadTrace, workspaceMode, setWorkspaceMode } = useSimulationStore();
  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [scenarioSearch, setScenarioSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsScenarioOpen(false);
      }
    };
    if (isScenarioOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isScenarioOpen]);

  const filteredTraces = allSampleTraces.filter((trace) =>
    trace.programTitle.toLowerCase().includes(scenarioSearch.toLowerCase())
  );

  return (
    <div className="h-[54px] px-4 sm:px-6 bg-white border-b border-[#E8E8E8] flex items-center justify-between shrink-0 select-none">
      {/* Group 1 — Workspace Identity */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="w-8 h-8 rounded-md bg-[#171717] flex items-center justify-center text-white shrink-0 shadow-xs">
          <Code2 className="w-4 h-4 stroke-[2]" />
        </div>
        <div>
          <h1 className="text-[13px] font-bold text-[#171717] tracking-tight leading-none">
            Playground
          </h1>
          <p className="text-[11px] font-mono text-[#999999] mt-0.5 leading-none">
            3-Panel Java 21 Execution Laboratory
          </p>
        </div>
      </div>

      {/* Group 2 — Scenario Selection */}
      <div className="relative mx-4 flex-1 max-w-sm hidden sm:block" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsScenarioOpen(!isScenarioOpen)}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md text-xs font-mono text-[#171717] hover:border-[#171717] transition-colors"
          aria-expanded={isScenarioOpen}
        >
          <div className="flex items-center space-x-2 truncate">
            <span className="text-[10px] uppercase font-bold text-[#999999]">Scenario:</span>
            <span className="truncate font-medium">{currentTrace.programTitle}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-[#777777] shrink-0 ml-1.5 transition-transform ${isScenarioOpen ? 'rotate-180' : ''}`} />
        </button>

        {isScenarioOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-[#E8E8E8] rounded-md shadow-lg overflow-hidden py-1">
            {/* Search filter input */}
            <div className="p-2 border-b border-[#E8E8E8]">
              <div className="flex items-center px-2 py-1 bg-[#FAFAFA] border border-[#E8E8E8] rounded text-xs font-mono">
                <Search className="w-3 h-3 text-[#999999] shrink-0 mr-1.5" />
                <input
                  type="text"
                  placeholder="Filter scenarios..."
                  value={scenarioSearch}
                  onChange={(e) => setScenarioSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[#171717] placeholder:text-[#999999] text-xs font-mono"
                  autoFocus
                />
              </div>
            </div>

            {/* Traces List */}
            <div className="max-h-60 overflow-y-auto py-1">
              {filteredTraces.length === 0 ? (
                <div className="p-3 text-center text-[11px] font-mono text-[#999999]">
                  No matching scenarios found.
                </div>
              ) : (
                filteredTraces.map((trace) => {
                  const isSelected = trace.id === currentTrace.id;
                  return (
                    <button
                      key={trace.id}
                      type="button"
                      onClick={() => {
                        loadTrace(trace);
                        setIsScenarioOpen(false);
                        setScenarioSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-mono transition-colors ${
                        isSelected
                          ? 'bg-[#EEEEEE] text-[#171717] font-semibold'
                          : 'text-[#666666] hover:bg-[#F5F5F5] hover:text-[#171717]'
                      }`}
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="truncate">{trace.programTitle}</span>
                        <span className="text-[10px] text-[#999999]">
                          {trace.totalSteps} execution steps • {trace.durationMs}ms trace
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#171717] shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Group 3 — Workspace Mode Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Segmented Mode Selector */}
        <div className="flex items-center bg-[#FAFAFA] border border-[#E8E8E8] rounded-md p-0.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setWorkspaceMode('split')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              workspaceMode === 'split'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceMode('editor')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              workspaceMode === 'editor'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceMode('visualizer')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              workspaceMode === 'visualizer'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            Visualizer
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceMode('class-builder')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              workspaceMode === 'class-builder'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            Class Builder
          </button>
        </div>

        {/* Reset Layout Separator Button */}
        {onResetLayout && workspaceMode === 'split' && (
          <button
            type="button"
            onClick={onResetLayout}
            title="Reset workspace panels to default 32/40/28 proportions"
            aria-label="Reset workspace proportions"
            className="p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] border border-[#E8E8E8] rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        )}
      </div>
    </div>
  );
};
