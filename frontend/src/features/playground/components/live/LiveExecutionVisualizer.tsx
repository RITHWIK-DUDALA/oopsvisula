import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Info, 
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  X,
  Cuboid,
  Compass
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useVisualMetaphorModel } from './useVisualMetaphorModel';
import { Laboratory2DView } from './Laboratory2DView';
import { Laboratory3DView } from './Laboratory3DView';
import { LiveHeapVisualizer } from './LiveHeapVisualizer';
import { LiveVariablesVisualizer } from './LiveVariablesVisualizer';
import { LiveReferenceGraph } from './LiveReferenceGraph';
import { LiveCallStackVisualizer } from './LiveCallStackVisualizer';
import { LiveThreadVisualizer } from './LiveThreadVisualizer';
import { LiveEventTimeline } from './LiveEventTimeline';
import { StackFrameSnapshot } from '@/types/execution';

interface LiveExecutionVisualizerProps {
  onJumpToSource?: (file: string, line: number) => void;
  onNavigateToArchitecture?: () => void;
}

type TechnicalTab = 'variables-heap' | 'references' | 'stack' | 'threads';

export const LiveExecutionVisualizer: React.FC<LiveExecutionVisualizerProps> = ({
  onJumpToSource,
  onNavigateToArchitecture,
}) => {
  const {
    currentTrace,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    stepForward,
    stepBackward,
    stepOver,
    stepInto,
    stepOut,
    goToStep,
    togglePlay,
    reset,
    getReferencePointers,
    selectedObjectId,
    setSelectedObjectId,
    setSelectedVariableName,
    visualizerDimension,
    setVisualizerDimension,
    sessionId,
  } = useSimulationStore();

  const [isTechnicalDrawerOpen, setIsTechnicalDrawerOpen] = useState(false);
  const [technicalTab, setTechnicalTab] = useState<TechnicalTab>('variables-heap');
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);

  const totalSteps = currentTrace?.events?.length || 0;
  const currentEvent = currentTrace?.events?.[currentStepIndex] || null;
  const topFrame = currentEvent?.stackFrames?.[currentEvent.stackFrames.length - 1] || null;
  const heapObjects = currentEvent?.heapObjects || [];
  const references = getReferencePointers();

  // Dynamic visual metaphor mapping model with collision-free layout
  const metaphorModel = useVisualMetaphorModel(
    currentEvent,
    heapObjects,
    topFrame,
    references,
    currentEvent?.threads,
    selectedObjectId,
    sessionId
  );

  const handleSelectFrame = (frame: StackFrameSnapshot) => {
    if (frame.line && onJumpToSource) {
      onJumpToSource(frame.file || 'Main.java', frame.line);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F8FAFC] select-none text-xs text-foreground overflow-hidden font-sans">
      {/* ----------------------------------------------------------------- */}
      {/* 1. TOP TOOLBAR: Status, Stepper, Dimension Toggle, Inspector Pill */}
      {/* ----------------------------------------------------------------- */}
      <div className="h-10 px-3 border-b border-border bg-white flex items-center justify-between shrink-0 shadow-2xs z-30">
        {/* Left: Status & Current Execution Pointer */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 font-bold text-xs text-foreground font-mono">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span className="tracking-tight">SIMULATION LAB</span>
          </div>

          <div className="h-4 w-px bg-border" />

          {currentEvent ? (
            <div className="flex items-center space-x-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                Line {currentEvent.line}
              </span>
              <span className="text-muted-foreground hidden sm:inline font-mono">
                {currentEvent.className}.{currentEvent.methodName}()
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground text-[11px] font-mono">Ready</span>
          )}
        </div>

        {/* Center: Stepper Playback Controls */}
        <div className="flex items-center space-x-1 bg-neutral-100 p-0.5 rounded border border-border">
          <button
            onClick={reset}
            title="Restart Execution (F9)"
            className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={stepBackward}
            disabled={currentStepIndex <= 0}
            title="Previous Step (Left Arrow)"
            className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play / Resume (Space)'}
            className="px-2.5 py-0.5 rounded bg-foreground text-background font-medium hover:bg-black/90 transition-all flex items-center space-x-1 text-[11px] cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Next Step (Right Arrow / F10)"
            className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="h-3 w-px bg-neutral-300 mx-0.5" />

          {/* Stepper modes */}
          <button
            onClick={stepInto}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Into (F11)"
            className="px-1.5 py-0.2 rounded text-[10px] font-mono hover:bg-white text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 cursor-pointer"
          >
            Into
          </button>
          <button
            onClick={stepOver}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Over (F10)"
            className="px-1.5 py-0.2 rounded text-[10px] font-mono hover:bg-white text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 cursor-pointer"
          >
            Over
          </button>
          <button
            onClick={stepOut}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Out (Shift+F11)"
            className="px-1.5 py-0.2 rounded text-[10px] font-mono hover:bg-white text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 cursor-pointer"
          >
            Out
          </button>

          <div className="h-3 w-px bg-neutral-300 mx-0.5" />

          {/* Speed Selector */}
          <div className="flex items-center space-x-0.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-white shadow-2xs font-bold text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Right: 2D/3D Mode Switcher & Technical Inspector Button */}
        <div className="flex items-center space-x-2">
          {/* 2D / 3D Dimension Pills */}
          <div className="flex items-center space-x-0.5 bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => setVisualizerDimension('2D')}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-all cursor-pointer ${
                visualizerDimension === '2D'
                  ? 'bg-white text-foreground shadow-2xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Compass className="w-3 h-3 text-blue-600" />
              <span>2D Lab</span>
            </button>
            <button
              onClick={() => setVisualizerDimension('3D')}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-all cursor-pointer ${
                visualizerDimension === '3D'
                  ? 'bg-white text-foreground shadow-2xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Cuboid className="w-3 h-3 text-indigo-600" />
              <span>3D Spatial</span>
            </button>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Toggle Technical Inspection Drawer */}
          <button
            onClick={() => setIsTechnicalDrawerOpen((open) => !open)}
            title="Inspect raw debugger state (Heap, Stack, Variables)"
            className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-medium border transition-all cursor-pointer ${
              isTechnicalDrawerOpen
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect Data</span>
          </button>

          {onNavigateToArchitecture && (
            <button
              onClick={onNavigateToArchitecture}
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center space-x-1 font-mono transition-colors ml-1"
              title="Switch to full project architecture diagram"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. DEDICATED EXECUTION NOTIFICATION SUB-BAR                       */}
      {/* (Completely outside the graph: zero overlap with cards or timeline)*/}
      {/* ----------------------------------------------------------------- */}
      {currentEvent && (
        <div className="h-9 shrink-0 px-3 bg-white/95 border-b border-border/80 flex items-center justify-between z-20 text-xs">
          <div className="flex items-center space-x-2 min-w-0 flex-1 mr-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold shrink-0">
              Step {currentStepIndex + 1}/{totalSteps}
            </span>
            <span 
              className="text-slate-800 font-semibold truncate" 
              title={currentEvent.whatHappened || currentEvent.description}
            >
              {currentEvent.whatHappened || currentEvent.description}
            </span>
            {currentEvent.whatChanged && (
              <span className="hidden md:inline text-[9.5px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 truncate max-w-[280px]">
                Δ {currentEvent.whatChanged}
              </span>
            )}
          </div>

          <button
            onClick={() => setShowDetailedExplanation((prev) => !prev)}
            className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 shrink-0 cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>{showDetailedExplanation ? 'Hide JVM Mechanics' : 'Why'}</span>
          </button>
        </div>
      )}

      {/* Expandable JVM Mechanics Details Accordion (Inline sub-bar) */}
      {showDetailedExplanation && currentEvent && (
        <div className="shrink-0 bg-blue-50/70 border-b border-blue-100 px-4 py-2 text-[11px] text-slate-700 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="font-semibold text-blue-900 font-mono text-[10px] uppercase shrink-0">
              JVM Mechanics:
            </span>
            <span className="truncate">
              {currentEvent.whyItHappened || 'Sequential statement execution advancing the instruction pointer in the active activation frame.'}
            </span>
          </div>
          <button 
            onClick={() => setShowDetailedExplanation(false)} 
            className="text-slate-400 hover:text-slate-700 ml-2 shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. CENTRAL GRAPH WORKSPACE                                        */}
      {/* (Strict flex bounds with min-h-0: no overflow into bottom timeline)*/}
      {/* ----------------------------------------------------------------- */}
      <div className="flex-1 min-h-0 min-w-0 w-full relative overflow-hidden">
        {visualizerDimension === '3D' ? (
          <Laboratory3DView
            model={metaphorModel}
            onSelectEntity={setSelectedObjectId}
            onJumpToSource={onJumpToSource}
          />
        ) : (
          <Laboratory2DView
            model={metaphorModel}
            isExecutionRunning={isPlaying}
            onSelectEntity={setSelectedObjectId}
            onJumpToSource={onJumpToSource}
          />
        )}

        {/* Collapsible Technical Drawer (Off-canvas, opens on demand) */}
        {isTechnicalDrawerOpen && (
          <div className="absolute top-0 right-0 bottom-0 w-96 z-40 bg-white/98 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="h-10 px-3 border-b border-border flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-foreground font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>TECHNICAL INSPECTOR</span>
              </div>
              <button
                onClick={() => setIsTechnicalDrawerOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Technical Tab Switcher */}
            <div className="flex items-center border-b border-border bg-slate-100/70 p-1 space-x-1">
              <button
                onClick={() => setTechnicalTab('variables-heap')}
                className={`flex-1 py-1 rounded text-[10px] font-medium transition-all ${
                  technicalTab === 'variables-heap'
                    ? 'bg-white shadow-2xs font-bold text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Heap & Scope
              </button>
              <button
                onClick={() => setTechnicalTab('references')}
                className={`flex-1 py-1 rounded text-[10px] font-medium transition-all ${
                  technicalTab === 'references'
                    ? 'bg-white shadow-2xs font-bold text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                References
              </button>
              <button
                onClick={() => setTechnicalTab('stack')}
                className={`flex-1 py-1 rounded text-[10px] font-medium transition-all ${
                  technicalTab === 'stack'
                    ? 'bg-white shadow-2xs font-bold text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Stack
              </button>
              <button
                onClick={() => setTechnicalTab('threads')}
                className={`flex-1 py-1 rounded text-[10px] font-medium transition-all ${
                  technicalTab === 'threads'
                    ? 'bg-white shadow-2xs font-bold text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Threads
              </button>
            </div>

            {/* Technical Tab Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {technicalTab === 'variables-heap' && (
                <div className="space-y-3">
                  <LiveVariablesVisualizer
                    topFrame={topFrame}
                    currentEvent={currentEvent}
                    onSelectVariable={setSelectedVariableName}
                    onSelectObject={setSelectedObjectId}
                  />
                  <LiveHeapVisualizer
                    heapObjects={heapObjects}
                    currentEvent={currentEvent}
                    onSelectObject={setSelectedObjectId}
                    selectedObjectId={selectedObjectId}
                  />
                </div>
              )}

              {technicalTab === 'references' && (
                <LiveReferenceGraph
                  references={references}
                  heapObjects={heapObjects}
                  topFrame={topFrame}
                  onSelectObject={setSelectedObjectId}
                />
              )}

              {technicalTab === 'stack' && (
                <LiveCallStackVisualizer
                  stackFrames={currentEvent?.stackFrames || []}
                  currentEvent={currentEvent}
                  onSelectFrame={handleSelectFrame}
                  onJumpToSource={onJumpToSource}
                />
              )}

              {technicalTab === 'threads' && (
                <LiveThreadVisualizer
                  threads={currentEvent?.threads}
                  currentEvent={currentEvent}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. BOTTOM EXECUTION TIMELINE SCRUBBER                             */}
      {/* (Docked strictly at bottom: objects never render underneath it)   */}
      {/* ----------------------------------------------------------------- */}
      <div className="shrink-0 z-30">
        <LiveEventTimeline
          events={currentTrace?.events || []}
          currentStepIndex={currentStepIndex}
          onGoToStep={goToStep}
        />
      </div>
    </div>
  );
};
