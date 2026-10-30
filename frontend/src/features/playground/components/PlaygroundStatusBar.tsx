import React from 'react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

export const PlaygroundStatusBar: React.FC = () => {
  const { currentTrace, isPlaying } = useSimulationStore();

  return (
    <footer className="h-[30px] px-4 sm:px-6 bg-[#FAFAFA] border-t border-[#E8E8E8] flex items-center justify-between text-[11px] font-mono text-[#777777] shrink-0 select-none">
      {/* Left Metadata per Section 13 */}
      <div className="flex items-center space-x-3">
        <span className="flex items-center space-x-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              isPlaying ? 'bg-[#287A4B] animate-ping' : 'bg-[#287A4B]'
            }`}
          />
          <span className="text-[#171717] font-medium">
            Execution Engine: {isPlaying ? 'Stepping...' : 'Ready'}
          </span>
        </span>
        <span className="text-[#D8D8D8]">•</span>
        <span>Java 21 LTS</span>
        <span className="text-[#D8D8D8] hidden sm:inline">•</span>
        <span className="hidden sm:inline">AST Determinism: Active</span>
      </div>

      {/* Right Metadata per Section 13 */}
      <div className="flex items-center space-x-3">
        <span>Execution: {currentTrace.durationMs}ms</span>
        <span className="text-[#D8D8D8]">•</span>
        <span className="font-semibold text-[#171717]">Deterministic State: Valid</span>
      </div>
    </footer>
  );
};
