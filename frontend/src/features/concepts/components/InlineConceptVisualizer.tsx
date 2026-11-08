import React, { useState, useRef } from 'react';
import {
  Play,
  SkipForward,
  RotateCcw,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ImageExportButton } from '@/components/shared/ImageExportButton';

export interface VisualizerStep {
  step: number;
  line: number;
  codeSnippet: string;
  explanation: string;
  stackVariables: { name: string; type: string; value: string; isHighlighted?: boolean }[];
  heapObjects?: { id: string; className: string; address: string; fields: { name: string; val: string }[] }[];
  consoleOutput?: string | null;
}

export interface InlineConceptVisualizerProps {
  initialCode: string;
  steps: VisualizerStep[];
  title?: string;
  lessonId?: string;
}

/**
 * InlineConceptVisualizer Component
 * Synchronized in-lesson execution simulator:
 * - Direct execution stepping (Run, Step Forward, Reset).
 * - Real-time stack variable updates and memory projection.
 * - Real-time standard output console.
 * - Minimal monochrome interface with cobalt (#075CF5) and warm orange (#FF7A00).
 */
export const InlineConceptVisualizer: React.FC<InlineConceptVisualizerProps> = ({
  initialCode,
  steps,
  title = 'Interactive Execution Visualizer',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'memory' | 'console'>('memory');
  const visualizerRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleRunAll = () => {
    setCurrentStepIndex(steps.length - 1);
  };

  return (
    <div ref={visualizerRef} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs space-y-0">
      {/* Visualizer Top Bar */}
      <div className="h-12 px-4 bg-white/80 border-b border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[#075CF5]" />
          <h4 className="text-xs font-bold text-[#17191D]">{title}</h4>
          <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Execution Step Controls */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRunAll}
            className="px-2.5 py-1 text-xs font-semibold text-[#17191D] hover:bg-[#F1F5F9] rounded-lg transition-colors flex items-center space-x-1"
            title="Execute All Steps"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">Run All</span>
          </button>

          <button
            type="button"
            onClick={handleStepForward}
            disabled={currentStepIndex >= steps.length - 1}
            className="px-3 py-1 text-xs font-semibold bg-[#075CF5] hover:bg-[#064ECC] text-white rounded-lg transition-colors flex items-center space-x-1 shadow-2xs disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            title="Step Forward (F10)"
          >
            <span>Step</span>
            <SkipForward className="w-3 h-3 fill-current" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-[#E5E7EB] mx-0.5" />

          <ImageExportButton
            getTargetElement={() => visualizerRef.current}
            fileName={`oops-lab-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            variant="compact"
          />
        </div>
      </div>

      {/* Split Grid: Code on Left, Runtime State on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB]">
        {/* Left: Code Viewer with Active Line Highlight */}
        <div className="p-4 bg-[#111111] text-[#F3F4F6] font-mono text-xs overflow-x-auto min-h-[220px]">
          <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2 font-mono flex items-center justify-between border-b border-[#333333] pb-1.5">
            <span>Java 21 Source File</span>
            <span className="text-[#FF7A00]">Active Line: {currentStep.line}</span>
          </div>

          <div className="space-y-1">
            {initialCode.split('\n').map((codeLine, idx) => {
              const lineNum = idx + 1;
              const isCurrentLine = lineNum === currentStep.line;

              return (
                <div
                  key={lineNum}
                  className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                    isCurrentLine
                      ? 'bg-[#FF7A00]/20 border-l-2 border-[#FF7A00] text-white font-semibold'
                      : 'text-[#D1D5DB]'
                  }`}
                >
                  <span className="w-6 text-[10px] text-[#6B7280] select-none text-right mr-3 font-mono">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre">{codeLine}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Runtime State Tabs (Stack Memory & Console) */}
        <div className="flex flex-col bg-white min-h-[220px]">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-[#E5E7EB] px-4 pt-1 bg-[#F9FAFB]">
            <button
              type="button"
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'memory'
                  ? 'border-[#075CF5] text-[#075CF5]'
                  : 'border-transparent text-[#64748B] hover:text-[#17191D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Stack & Heap Memory</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('console')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'console'
                  ? 'border-[#075CF5] text-[#075CF5]'
                  : 'border-transparent text-[#64748B] hover:text-[#17191D]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Standard Output</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            {activeTab === 'memory' ? (
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-[#64748B] flex items-center justify-between">
                  <span>Stack Frame: main()</span>
                  <span className="text-[10px] text-[#047857] font-semibold">Active Memory Frame</span>
                </div>

                <div className="space-y-1.5">
                  {currentStep.stackVariables.map((v, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border flex items-center justify-between text-xs font-mono transition-all ${
                        v.isHighlighted
                          ? 'bg-[#FFF7ED] border-[#FED7AA] ring-1 ring-[#FF7A00]/40'
                          : 'bg-[#F9FAFB] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[#64748B] text-[10px]">{v.type}</span>
                        <span className="font-bold text-[#17191D]">{v.name}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-white border border-[#E5E7EB] rounded font-bold text-[#075CF5]">
                        {v.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Heap Objects if applicable */}
                {currentStep.heapObjects && currentStep.heapObjects.length > 0 && (
                  <div className="pt-2 border-t border-[#E5E7EB] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                      Heap Space Instances
                    </span>
                    {currentStep.heapObjects.map((obj) => (
                      <div key={obj.id} className="p-2 bg-white border border-[#FED7AA] rounded-lg text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px] text-[#C2410C]">
                          <span className="font-bold">{obj.className}</span>
                          <span>@{obj.address}</span>
                        </div>
                        <div className="mt-1 divide-y divide-[#F1F5F9]">
                          {obj.fields.map((f, fi) => (
                            <div key={fi} className="flex justify-between py-0.5 text-[10px]">
                              <span className="text-[#64748B]">{f.name}:</span>
                              <span className="font-bold text-[#17191D]">{f.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-[#0F172A] rounded-xl text-xs font-mono text-[#F8FAFC] flex-1 overflow-y-auto min-h-[140px]">
                <div className="text-[10px] text-[#64748B] pb-1 border-b border-[#334155] mb-2">
                  System.out Console Log
                </div>
                {currentStep.consoleOutput ? (
                  <pre className="text-[#38BDF8] whitespace-pre-wrap">{currentStep.consoleOutput}</pre>
                ) : (
                  <span className="text-[#64748B] italic">No output produced at this execution step.</span>
                )}
              </div>
            )}

            {/* Explanation Footer */}
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-start space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
              <p className="text-xs text-[#50566A] leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
