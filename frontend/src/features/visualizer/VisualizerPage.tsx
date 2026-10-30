import React from 'react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { allSampleTraces } from '@/features/simulation/sampleTraces';
import { MemoryCanvas } from '@/features/visualizer/MemoryCanvas';
import { ExecutionInspector } from '@/features/visualizer/ExecutionInspector';
import { Eye, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const VisualizerPage: React.FC = () => {
  const { currentTrace, loadTrace } = useSimulationStore();

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = allSampleTraces.find((t) => t.id === e.target.value);
    if (found) {
      loadTrace(found);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Visualizer Top Bar */}
      <div className="h-12 px-4 sm:px-6 bg-white border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 stroke-[1.5] text-foreground" />
            <h1 className="font-semibold text-xs text-foreground tracking-tight">
              JVM Runtime Memory & Reference Graph Visualizer
            </h1>
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-muted-foreground/60">•</span>
            <select
              value={currentTrace.id}
              onChange={handleScenarioChange}
              className="text-xs font-mono bg-surface border border-border rounded px-2 py-1 text-foreground focus:outline-hidden"
            >
              {allSampleTraces.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.programTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <NavLink
            to="/playground"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-all shadow-xs"
          >
            <span>Open in 3-Panel Playground</span>
          </NavLink>
          <NavLink
            to="/concepts"
            className="hidden sm:flex items-center space-x-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Concepts</span>
          </NavLink>
        </div>
      </div>

      {/* Main Dual Workspace: Canvas (Left/Center) & Execution Inspector (Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Memory Canvas: Call Stack & JVM Heap */}
        <div className="lg:col-span-8 h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
          <MemoryCanvas />
        </div>

        {/* Execution Inspector: Step Scrubber, Variables, Console */}
        <div className="lg:col-span-4 h-full overflow-hidden">
          <ExecutionInspector />
        </div>
      </div>
    </div>
  );
};
