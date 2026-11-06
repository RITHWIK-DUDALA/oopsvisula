import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Activity, 
  AlertTriangle,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

interface ExecutionPanelProps {
  onClose?: () => void;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ onClose }) => {
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
    togglePlay, 
    reset, 
    clearConsole,
    consoleEntries,
    compilationError
  } = useSimulationStore();

  const [activeTab, setActiveTab] = useState<'console' | 'events' | 'memory'>('console');

  const totalSteps = currentTrace?.events?.length || 0;
  const currentEvent = currentTrace?.events?.[currentStepIndex];

  return (
    <div className="h-full flex flex-col bg-white border-t border-border select-none text-xs text-foreground">
      {/* Panel Top Control Bar */}
      <div className="h-10 px-3 border-b border-border bg-neutral-50 flex items-center justify-between shrink-0">
        {/* Left: Tab selection */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'console'
                ? 'bg-white shadow-2xs text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal & Output</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-white shadow-2xs text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Execution Timeline</span>
            {totalSteps > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 text-neutral-800 rounded-full text-[10px] font-mono">
                {totalSteps}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'memory'
                ? 'bg-white shadow-2xs text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Scope & Heap</span>
          </button>
        </div>

        {/* Center: Execution Stepper Controls */}
        <div className="flex items-center space-x-1.5 bg-white px-2 py-0.5 rounded border border-border shadow-2xs">
          <button
            onClick={reset}
            title="Reset Execution (F9)"
            className="p-1 rounded hover:bg-neutral-100 text-foreground/70 hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={stepBackward}
            disabled={currentStepIndex <= 0}
            title="Step Backward (Left Arrow)"
            className="p-1 rounded hover:bg-neutral-100 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play Simulation'}
            className="p-1 px-2 rounded bg-foreground text-background hover:bg-black/90 transition-colors flex items-center space-x-1 text-[11px] font-medium"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Forward (Right Arrow)"
            className="p-1 rounded hover:bg-neutral-100 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-border mx-0.5" />

          {/* Stepper Modes: Into / Over / Out */}
          <button
            onClick={stepInto}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Into (F11) - Advance into next method call"
            className="px-1.5 py-0.5 rounded text-[10.5px] font-mono hover:bg-neutral-100 text-foreground/80 hover:text-foreground transition-colors disabled:opacity-30"
          >
            Into
          </button>

          <button
            onClick={stepOver}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Over (F10) - Execute line without stepping into methods"
            className="px-1.5 py-0.5 rounded text-[10.5px] font-mono hover:bg-neutral-100 text-foreground/80 hover:text-foreground transition-colors disabled:opacity-30"
          >
            Over
          </button>

          <button
            onClick={stepOut}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Step Out (Shift+F11) - Finish current method and return"
            className="px-1.5 py-0.5 rounded text-[10.5px] font-mono hover:bg-neutral-100 text-foreground/80 hover:text-foreground transition-colors disabled:opacity-30"
          >
            Out
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Step Counter */}
          <span className="text-[11px] font-mono text-muted-foreground px-1">
            Step {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
          </span>

          {/* Speed Selector */}
          <div className="flex items-center space-x-0.5 pl-1">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                  playbackSpeed === spd
                    ? 'bg-neutral-200 font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-neutral-100'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {activeTab === 'console' && (
            <button
              onClick={clearConsole}
              title="Clear Console"
              className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-neutral-200/60"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center space-x-1 text-[11px] font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              title="Collapse Execution Panel"
              className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-neutral-200/60 ml-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs bg-neutral-950 text-neutral-200 select-text">
        {activeTab === 'console' ? (
          <div className="space-y-1">
            {compilationError && (
              <div className="text-red-400 bg-red-950/40 p-2 rounded border border-red-800/50 mb-2">
                <div className="flex items-center space-x-1.5 font-bold pb-1 text-red-300">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Compilation Diagnostic:</span>
                </div>
                <pre className="whitespace-pre-wrap text-[11px]">{compilationError}</pre>
              </div>
            )}

            {consoleEntries.length > 0 ? (
              consoleEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className={`leading-relaxed text-[11px] ${entry.type === 'stderr' ? 'text-red-400' : 'text-neutral-200'}`}
                >
                  <span className="text-neutral-600 select-none mr-2">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
                  <span>{entry.text}</span>
                </div>
              ))
            ) : (
              <div className="text-neutral-500 text-xs italic select-none">
                Program output will appear here. Press "Run Project" to compile and execute.
              </div>
            )}
          </div>
        ) : activeTab === 'events' ? (
          /* Execution Event Timeline View */
          <div className="space-y-2">
            {totalSteps > 0 ? (
              <div className="space-y-1">
                {currentTrace.events.slice(0, currentStepIndex + 1).map((evt, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div
                      key={evt.step || idx}
                      className={`p-2 rounded text-[11px] transition-colors border ${
                        isCurrent
                          ? 'bg-blue-950/70 border-blue-600 text-blue-200 font-medium'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold uppercase tracking-wider text-[10px]">
                          Step {idx + 1}: {evt.type}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {evt.file || 'Main.java'}:{evt.line}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-200 pt-0.5">
                        {evt.description || `Executed statement at line ${evt.line}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-neutral-500 text-xs italic select-none">
                No active execution timeline. Press "Run Project" to trace bytecode steps.
              </div>
            )}
          </div>
        ) : (
          /* Active Call Stack & Heap Snapshot */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Call Stack */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-1 flex items-center justify-between">
                <span>Call Stack Frames</span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {currentEvent?.stackFrames?.length || 0} frames
                </span>
              </div>
              {currentEvent?.stackFrames && currentEvent.stackFrames.length > 0 ? (
                <div className="space-y-1.5">
                  {currentEvent.stackFrames.map((frame, fIdx) => (
                    <div key={frame.frameId || fIdx} className="p-2 bg-neutral-900 rounded border border-neutral-800 space-y-1">
                      <div className="flex justify-between items-center text-xs text-blue-300 font-bold">
                        <span>{frame.methodName}()</span>
                        <span className="text-[10px] text-neutral-400">{frame.className}.java:{frame.line}</span>
                      </div>
                      {frame.localVariables && frame.localVariables.length > 0 && (
                        <div className="space-y-0.5 pt-1 border-t border-neutral-800/60">
                          {frame.localVariables.map((v) => (
                            <div key={v.name} className="flex justify-between text-[11px]">
                              <span className="text-neutral-400">{v.name}:</span>
                              <span className="text-emerald-300 font-bold">{JSON.stringify(v.value)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-neutral-500 text-xs italic">No active stack frames in current step.</div>
              )}
            </div>

            {/* Heap Instances */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-1 flex items-center justify-between">
                <span>Heap Instances</span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {currentEvent?.heapObjects?.length || 0} objects
                </span>
              </div>
              {currentEvent?.heapObjects && currentEvent.heapObjects.length > 0 ? (
                <div className="space-y-1.5">
                  {currentEvent.heapObjects.map((obj) => (
                    <div key={obj.address} className="p-2 bg-neutral-900 rounded border border-neutral-800 space-y-1">
                      <div className="flex justify-between items-center text-xs text-emerald-300 font-bold">
                        <span>{obj.className}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{obj.address}</span>
                      </div>
                      {obj.fields && obj.fields.length > 0 && (
                        <div className="space-y-0.5 pt-1 border-t border-neutral-800/60">
                          {obj.fields.map((f) => (
                            <div key={f.name} className="flex justify-between text-[11px]">
                              <span className="text-neutral-400">{f.name}:</span>
                              <span className="text-neutral-200">{JSON.stringify(f.value)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-neutral-500 text-xs italic">No heap instances instantiated yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
