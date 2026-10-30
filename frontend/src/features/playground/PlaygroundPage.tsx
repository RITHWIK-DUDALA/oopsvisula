import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { allSampleTraces } from '@/features/simulation/sampleTraces';
import { MemoryCanvas } from '@/features/visualizer/MemoryCanvas';
import { ExecutionInspector } from '@/features/visualizer/ExecutionInspector';
import { VisualClassBuilder } from '@/features/class-builder/VisualClassBuilder';
import {
  Play,
  RotateCcw,
  Code2,
} from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  const {
    currentTrace,
    loadTrace,
    getCurrentEvent,
    reset,
    play,
    isPlaying,
  } = useSimulationStore();

  const [activePanelTab, setActivePanelTab] = useState<'both' | 'visualizer' | 'editor' | 'class-builder'>('both');
  const event = getCurrentEvent();

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = allSampleTraces.find((t) => t.id === e.target.value);
    if (found) {
      loadTrace(found);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Playground Top Action Bar */}
      <div className="h-12 px-4 sm:px-6 bg-white border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 stroke-[1.5] text-foreground" />
            <span className="font-semibold text-xs text-foreground tracking-tight">
              3-Panel Java 21 Execution Laboratory
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5">
            <span className="text-muted-foreground/60">•</span>
            {/* Scenario dropdown */}
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

        {/* View Switchers & Run Controls */}
        <div className="flex items-center space-x-2">
          {/* Panel Layout Switcher */}
          <div className="hidden md:flex items-center space-x-1 bg-surface border border-border rounded p-0.5 text-xs font-mono">
            <button
              onClick={() => setActivePanelTab('both')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePanelTab === 'both' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setActivePanelTab('editor')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePanelTab === 'editor' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Editor Only
            </button>
            <button
              onClick={() => setActivePanelTab('visualizer')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePanelTab === 'visualizer' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Visualizer Only
            </button>
            <button
              onClick={() => setActivePanelTab('class-builder')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePanelTab === 'class-builder' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Class Builder
            </button>
          </div>

          <button
            type="button"
            onClick={reset}
            aria-label="Reset execution"
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface border border-border rounded-lg transition-colors"
            title="Reset execution"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <button
            type="button"
            onClick={play}
            disabled={isPlaying}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.98] disabled:opacity-50 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 stroke-[2]" />
            <span>Trace Execution</span>
          </button>
        </div>
      </div>

      {/* 3-Panel Main Execution Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Full-width Class Builder */}
        {activePanelTab === 'class-builder' && (
          <div className="lg:col-span-12 h-full overflow-hidden">
            <VisualClassBuilder />
          </div>
        )}

        {/* Panel 1: Monaco Java Editor */}
        {(activePanelTab === 'both' || activePanelTab === 'editor') && (
          <div
            className={`${
              activePanelTab === 'both' ? 'lg:col-span-4' : 'lg:col-span-12'
            } flex flex-col border-b lg:border-b-0 lg:border-r border-border bg-white overflow-hidden`}
          >
            <div className="h-9 px-4 border-b border-border bg-surface/50 flex items-center justify-between text-xs font-mono text-muted-foreground shrink-0">
              <span className="flex items-center space-x-1.5 text-foreground font-semibold">
                <span>Source Code</span>
              </span>
              <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">
                {event ? `Executing Line ${event.line}` : 'Ready'}
              </span>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <Editor
                height="100%"
                defaultLanguage="java"
                theme="light"
                value={currentTrace.sourceCode}
                options={{
                  readOnly: false,
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  renderLineHighlight: 'all',
                }}
              />
            </div>
          </div>
        )}

        {/* Panel 2 & 3: Visualizer Canvas (Center) & Execution Inspector (Right) */}
        {(activePanelTab === 'both' || activePanelTab === 'visualizer') && (
          <div
            className={`${
              activePanelTab === 'both' ? 'lg:col-span-8' : 'lg:col-span-12'
            } grid grid-cols-1 md:grid-cols-12 overflow-hidden`}
          >
            {/* Panel 2: Interactive Memory Visualizer (Stack & Heap) */}
            <div className="md:col-span-7 h-full overflow-hidden border-b md:border-b-0 md:border-r border-border">
              <MemoryCanvas />
            </div>

            {/* Panel 3: Execution Inspector & Console */}
            <div className="md:col-span-5 h-full overflow-hidden">
              <ExecutionInspector />
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-8 px-4 bg-surface border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground shrink-0">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-foreground inline-block" />
            <span className="text-foreground font-medium">JDI Step Tracer: Ready</span>
          </span>
          <span>Target: Java 21 LTS</span>
          <span className="hidden sm:inline">AST Isolation: Active</span>
        </div>

        <div className="flex items-center space-x-3">
          <span>Execution Time: {currentTrace.durationMs}ms</span>
          <span>Deterministic State: OK</span>
        </div>
      </div>
    </div>
  );
};
