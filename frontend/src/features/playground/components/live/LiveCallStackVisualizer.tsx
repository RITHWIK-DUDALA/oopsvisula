import React from 'react';
import { Layers, ExternalLink } from 'lucide-react';
import { StackFrameSnapshot, ExecutionEvent } from '@/types/execution';

interface LiveCallStackVisualizerProps {
  stackFrames: StackFrameSnapshot[];
  currentEvent: ExecutionEvent | null;
  onSelectFrame?: (frame: StackFrameSnapshot) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

export const LiveCallStackVisualizer: React.FC<LiveCallStackVisualizerProps> = ({
  stackFrames,
  currentEvent,
  onSelectFrame,
  onJumpToSource,
}) => {
  if (!stackFrames || stackFrames.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground font-mono space-y-2 border border-dashed border-border rounded-lg bg-white/50">
        <Layers className="w-8 h-8 text-neutral-300 mx-auto" />
        <div className="text-xs font-semibold text-foreground">Call Stack is Idle</div>
        <p className="text-[11px] text-muted-foreground max-w-xs">
          JVM execution thread is currently halted at the program entry point.
        </p>
      </div>
    );
  }

  // Reverse so top of stack is displayed first (top-down view)
  const reversedFrames = [...stackFrames].reverse();

  return (
    <div className="h-full flex flex-col space-y-3 font-sans select-none overflow-y-auto pr-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
          <Layers className="w-3.5 h-3.5 text-violet-600" />
          <span>Call Stack Frames (LIFO)</span>
          <span className="px-1.5 py-0.2 bg-violet-100 text-violet-800 rounded-full font-mono text-[10px]">
            {stackFrames.length}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Thread: {currentEvent?.threads?.[0]?.name || 'main'}
        </span>
      </div>

      <div className="space-y-2">
        {reversedFrames.map((frame, idx) => {
          const isTopFrame = idx === 0;

          return (
            <div
              key={frame.frameId || idx}
              onClick={() => onSelectFrame?.(frame)}
              className={`p-3 bg-white rounded-lg border transition-all cursor-pointer shadow-2xs font-mono text-xs ${
                isTopFrame
                  ? 'border-violet-500 ring-2 ring-violet-500/20 bg-violet-50/10'
                  : 'border-border hover:border-neutral-400 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-border pb-1.5 mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                      isTopFrame
                        ? 'bg-violet-600 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {reversedFrames.length - idx}
                  </span>
                  <div>
                    <span className="font-bold text-foreground text-xs block">
                      {frame.className}.{frame.methodName}()
                    </span>
                    <span className="text-[10px] text-muted-foreground font-sans">
                      {isTopFrame ? 'Active Executing Frame' : 'Suspended Caller'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {frame.line > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onJumpToSource?.(frame.file || 'Main.java', frame.line);
                      }}
                      className="flex items-center space-x-1 text-[11px] text-violet-700 hover:text-violet-950 hover:underline px-1 py-0.5"
                      title="Jump to source line in editor"
                    >
                      <span>Line {frame.line}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                      isTopFrame
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {isTopFrame ? 'RUNNING' : 'WAITING'}
                  </span>
                </div>
              </div>

              {/* Local Variables Summary */}
              {frame.localVariables && frame.localVariables.length > 0 ? (
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Variables in Frame ({frame.localVariables.length})
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    {frame.localVariables.map((v) => (
                      <div
                        key={v.name}
                        className="bg-neutral-50 px-2 py-1 rounded border border-border flex justify-between items-center"
                      >
                        <span className="text-muted-foreground">{v.name}:</span>
                        <span className="font-semibold text-foreground truncate max-w-[120px]">
                          {v.value === null ? 'null' : String(v.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[10.5px] text-muted-foreground italic">
                  No local variables allocated
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
