import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  StepBack,
  CornerDownRight,
  CornerRightDown,
  CornerUpRight,
  Gauge,
  X,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import CometDial from '@/components/CometDial';

export const ExecutionControlBar: React.FC = () => {
  const {
    currentTrace,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    stepForward,
    stepBackward,
    togglePlay,
    reset,
    goToStep,
    setPlaybackSpeed,
  } = useSimulationStore();

  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  const totalSteps = currentTrace.events.length;
  const progressPct = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="border-t border-[#E8E8E8] bg-white flex flex-col shrink-0 select-none">
      {/* Top Half: Step & Playback Controls Toolbar */}
      <div className="h-11 px-4 sm:px-6 bg-[#FAFAFA] border-b border-[#E8E8E8] flex items-center justify-between">
        {/* Left: Stepping Actions per Section 11 */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={reset}
            aria-label="Restart execution"
            title="Restart execution (Rewind to Step 1)"
            className="p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <button
            type="button"
            onClick={stepBackward}
            disabled={currentStepIndex === 0}
            aria-label="Step Back"
            title="Step Back (Previous step)"
            className="p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] disabled:opacity-30 rounded-md transition-colors"
          >
            <StepBack className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>

          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            aria-label="Step Into"
            title="Step Into method call"
            className="flex items-center space-x-1 px-2 py-1 text-xs font-mono text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] disabled:opacity-30 rounded-md transition-colors"
          >
            <CornerDownRight className="w-3 h-3 stroke-[1.5]" />
            <span className="hidden sm:inline">Into</span>
          </button>

          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            aria-label="Step Over"
            title="Step Over current statement"
            className="flex items-center space-x-1 px-2 py-1 text-xs font-mono text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] disabled:opacity-30 rounded-md transition-colors"
          >
            <CornerRightDown className="w-3 h-3 stroke-[1.5]" />
            <span className="hidden sm:inline">Over</span>
          </button>

          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            aria-label="Step Out"
            title="Step Out to caller"
            className="flex items-center space-x-1 px-2 py-1 text-xs font-mono text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] disabled:opacity-30 rounded-md transition-colors"
          >
            <CornerUpRight className="w-3 h-3 stroke-[1.5]" />
            <span className="hidden sm:inline">Out</span>
          </button>

          {/* Prominent Primary Run Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause execution' : 'Run execution'}
            className="ml-2 flex items-center space-x-1.5 px-3 py-1 bg-[#171717] text-white text-xs font-semibold rounded-md hover:bg-black/90 active:scale-[0.98] transition-all shadow-xs"
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
        </div>

        {/* Right: Step Counter, Progress Bar & Speed Selector */}
        <div className="flex items-center space-x-4">
          {/* Step Indicator & Mini Progress */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="font-bold text-[#171717]">
              STEP {String(currentStepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
            <div className="w-16 h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden hidden sm:block">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-[#171717] transition-all duration-200"
              />
            </div>
          </div>

          {/* Speed Selector */}
          <div className="relative flex items-center bg-white border border-[#E8E8E8] rounded-md p-0.5 text-xs font-mono">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-[#171717] text-white font-bold shadow-xs'
                    : 'text-[#777777] hover:text-[#171717]'
                }`}
              >
                {spd}x
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
              className={`p-1 rounded text-[10px] transition-colors ${
                isSpeedDialOpen || ![0.5, 1, 2].includes(playbackSpeed)
                  ? 'bg-[#171717] text-white font-bold'
                  : 'text-[#777777] hover:text-[#171717]'
              }`}
              title="Animation Speed Controller"
              aria-label="Open Speed Controller"
            >
              <Gauge className="w-3 h-3 stroke-[1.8]" />
            </button>

            {/* CometDial Speed Popover */}
            {isSpeedDialOpen && (
              <div className="absolute right-0 bottom-full mb-2 z-50 p-4 bg-white border border-[#E8E8E8] rounded-lg shadow-xl flex flex-col items-center space-y-2 select-none animate-in fade-in zoom-in-95 duration-150">
                <div className="w-full flex items-center justify-between pb-1 border-b border-[#E8E8E8] text-[11px] font-semibold text-[#171717]">
                  <span className="flex items-center space-x-1.5">
                    <Gauge className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Speed Calibration</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSpeedDialOpen(false)}
                    className="p-0.5 text-[#777777] hover:text-[#171717] rounded"
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
                  label="Speed"
                  accent="#171717"
                  ink="#777777"
                  size={150}
                  sweep={300}
                  thickness={5}
                  speed={30}
                  tapBounce={0.2}
                  flickBounce={0.1}
                  momentum={1}
                  cometReach={150}
                  cometWidth={8}
                  onChange={(val) => setPlaybackSpeed(Number(val.toFixed(1)))}
                />

                <div className="w-full flex items-center justify-between pt-1 border-t border-[#E8E8E8] text-[10px] text-[#777777] font-mono">
                  <span>0.2x</span>
                  <span className="font-bold text-[#171717]">{playbackSpeed}x</span>
                  <span>3.0x</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Half: Execution Timeline Scrubber per Section 12 */}
      <div className="h-9 px-4 sm:px-6 bg-white flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-[#999999] shrink-0 mr-4 font-semibold">
          <span>Execution Timeline:</span>
        </div>

        <div className="flex items-center space-x-3 flex-1 max-w-2xl py-1">
          {currentTrace.events.map((ev, i) => {
            const isCurrent = i === currentStepIndex;
            const isCompleted = i < currentStepIndex;

            return (
              <button
                key={ev.step}
                type="button"
                onClick={() => goToStep(i)}
                title={`Step ${ev.step}: ${ev.type} (Line ${ev.line})\n${ev.description}`}
                className="group relative flex items-center focus:outline-hidden"
              >
                {/* Connecting track line between dots */}
                {i > 0 && (
                  <span
                    className={`absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-[2px] transition-colors ${
                      isCompleted || isCurrent ? 'bg-[#171717]' : 'bg-[#E8E8E8]'
                    }`}
                  />
                )}

                {/* Marker Dot */}
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#171717] text-white ring-2 ring-[#171717]/20 scale-110 shadow-xs'
                      : isCompleted
                      ? 'bg-[#EEEEEE] text-[#171717] hover:bg-[#E8E8E8]'
                      : 'bg-white border border-[#E8E8E8] text-[#999999] hover:border-[#171717]'
                  }`}
                >
                  {String(ev.step).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-[#777777] shrink-0 ml-4 hidden md:block">
          Active: Step {currentStepIndex + 1}
        </div>
      </div>
    </div>
  );
};
