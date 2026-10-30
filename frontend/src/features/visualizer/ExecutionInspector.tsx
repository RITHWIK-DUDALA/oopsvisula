import React, { useState } from 'react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import CallChip from '@/components/CallChip';
import CometDial from '@/components/CometDial';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  StepBack,
  Terminal,
  Activity,
  Sliders,
  Gauge,
  X,
} from 'lucide-react';

export const ExecutionInspector: React.FC = () => {
  const {
    currentTrace,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    activeCall,
    triggerCall,
    getCurrentEvent,
    getStdoutHistory,
    stepForward,
    stepBackward,
    togglePlay,
    reset,
    goToStep,
    setPlaybackSpeed,
  } = useSimulationStore();

  const [activeTab, setActiveTab] = useState<'inspector' | 'console' | 'events'>('inspector');
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const event = getCurrentEvent();
  const stdout = getStdoutHistory();

  return (
    <div className="h-full flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-border select-none overflow-hidden">
      {/* Playback Controls Toolbar */}
      <div className="h-12 px-4 border-b border-border bg-surface/50 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={reset}
            aria-label="Reset simulation"
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={stepBackward}
            disabled={currentStepIndex === 0}
            aria-label="Step backward"
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 rounded-md transition-colors"
            title="Previous step"
          >
            <StepBack className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="px-2.5 py-1 bg-foreground text-background text-xs font-medium rounded-md hover:bg-black/90 active:scale-[0.98] transition-all flex items-center space-x-1.5"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 stroke-[2]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 stroke-[2]" />
                <span>Run</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= currentTrace.events.length - 1}
            aria-label="Step forward"
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 rounded-md transition-colors"
            title="Next step"
          >
            <StepForward className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        {/* Speed Selector & Step counter */}
        <div className="relative flex items-center space-x-3 text-xs font-mono">
          <span className="text-muted-foreground">
            Step {currentStepIndex + 1} / {currentTrace.events.length}
          </span>
          <div className="flex items-center space-x-1 bg-white border border-border rounded p-0.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  playbackSpeed === spd
                    ? 'bg-foreground text-background font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {spd}x
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
              className={`p-1 rounded text-[10px] font-mono transition-colors ${
                isSpeedDialOpen || ![0.5, 1, 2].includes(playbackSpeed)
                  ? 'bg-foreground text-background font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Open CometDial Animation Speed Controller"
              aria-label="Animation Speed Dial"
            >
              <Gauge className="w-3 h-3 stroke-[1.8]" />
            </button>
          </div>

          {/* Speed Dial Popover */}
          {isSpeedDialOpen && (
            <div className="absolute right-0 top-10 z-50 p-4 bg-white border border-border rounded-xl shadow-lg flex flex-col items-center space-y-2 select-none animate-in fade-in zoom-in-95 duration-150">
              <div className="w-full flex items-center justify-between pb-1 border-b border-border text-[11px] font-semibold text-foreground">
                <span className="flex items-center space-x-1.5">
                  <Gauge className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Animation Speed</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSpeedDialOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground rounded"
                >
                  <X className="w-3 h-3 stroke-[2]" />
                </button>
              </div>

              <CometDial
                value={playbackSpeed}
                defaultValue={1.0}
                min={0.2}
                max={3.0}
                step={0.1}
                unit="x"
                label="Animation Speed"
                accent="#18181b"
                ink="#71717a"
                size={160}
                sweep={300}
                thickness={5}
                speed={30}
                tapBounce={0.2}
                flickBounce={0.1}
                momentum={1}
                cometReach={160}
                cometWidth={8}
                onChange={(val) => setPlaybackSpeed(Number(val.toFixed(1)))}
              />

              <div className="w-full flex items-center justify-between pt-1 border-t border-border text-[10px] text-muted-foreground font-mono">
                <span>0.2x (Slow)</span>
                <span>Current: {playbackSpeed}x</span>
                <span>3.0x (Fast)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs & Live CallChip */}
      <div className="h-10 px-4 border-b border-border flex items-center justify-between text-xs font-medium shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setActiveTab('inspector');
              triggerCall('inspector', 'view.memory', 'search', 'done');
            }}
            className={`h-full flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === 'inspector'
                ? 'border-foreground text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Activity className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Inspector</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('console');
              triggerCall('inspector', 'view.stdout', 'terminal', 'done');
            }}
            className={`h-full flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === 'console'
                ? 'border-foreground text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Console Output</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('events');
              triggerCall('inspector', 'view.timeline', 'search', 'done');
            }}
            className={`h-full flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === 'events'
                ? 'border-foreground text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Event Timeline</span>
          </button>
        </div>

        {activeCall && (
          <div className="hidden sm:flex items-center">
            <CallChip
              key={activeCall.id}
              icon={activeCall.icon || 'terminal'}
              name={activeCall.name}
              argument={activeCall.argument}
              status={activeCall.status}
              size={24}
              radius={6}
              surfaceColor="#18181b"
              color="#ffffff"
              expectedMs={500}
              showTimer={false}
            />
          </div>
        )}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'inspector' && event && (
          <div className="space-y-4">
            {/* Step summary callout */}
            <div className="p-3 bg-surface border border-border rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-foreground">{event.type}</span>
                <span className="text-[11px] text-muted-foreground">Line {event.line}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Scope Variables Table */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                Active Scope Variables
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead className="bg-surface border-b border-border text-muted-foreground text-[11px]">
                    <tr>
                      <th className="py-1.5 px-3 text-left">Variable</th>
                      <th className="py-1.5 px-3 text-left">Type</th>
                      <th className="py-1.5 px-3 text-left">Value / Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {event.stackFrames.flatMap((f) => f.localVariables).length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-3 px-3 text-center text-muted-foreground italic">
                          No active variables in current frame
                        </td>
                      </tr>
                    ) : (
                      event.stackFrames.flatMap((f) =>
                        f.localVariables.map((v) => (
                          <tr key={`${f.frameId}-${v.name}`} className="hover:bg-surface/50">
                            <td className="py-2 px-3 text-foreground font-semibold">{v.name}</td>
                            <td className="py-2 px-3 text-muted-foreground">{v.type}</td>
                            <td className="py-2 px-3 font-semibold text-foreground">
                              {v.isReference ? (
                                <span className="bg-accent px-1.5 py-0.5 rounded border border-border">
                                  {String(v.value)}
                                </span>
                              ) : (
                                <span>{String(v.value)}</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="h-full flex flex-col space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-muted-foreground text-[11px]">
              <span>stdout (JDI stream)</span>
              <span>UTF-8</span>
            </div>
            <pre className="flex-1 p-3 bg-foreground text-background rounded-lg overflow-auto leading-relaxed">
              {stdout ? stdout : '// No console output emitted yet\n// System.out / System.err will appear here'}
            </pre>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
              Full JDI Step Sequence
            </div>
            <div className="space-y-1.5">
              {currentTrace.events.map((ev, index) => {
                const isActive = index === currentStepIndex;
                const isPast = index < currentStepIndex;
                return (
                  <button
                    key={ev.step}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-foreground text-background font-semibold border-foreground shadow-xs'
                        : isPast
                        ? 'bg-surface text-foreground border-border hover:border-foreground/50'
                        : 'bg-white text-muted-foreground border-border/60 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-1 rounded bg-black/10">#{ev.step}</span>
                      <span className="truncate">{ev.type}</span>
                    </div>
                    <span className="text-[10px] opacity-75">Line {ev.line}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Step Scrubber */}
      <div className="h-10 px-4 border-t border-border bg-surface/30 flex items-center space-x-1.5 shrink-0 overflow-x-auto">
        {currentTrace.events.map((ev, i) => (
          <button
            key={i}
            onClick={() => goToStep(i)}
            title={`Step ${i + 1}: ${ev.type} (Line ${ev.line})`}
            className={`h-2 flex-1 rounded-full transition-all ${
              i === currentStepIndex
                ? 'bg-foreground scale-y-150'
                : i < currentStepIndex
                ? 'bg-muted-foreground/60'
                : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
