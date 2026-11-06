import React from 'react';
import { Cpu, Lock } from 'lucide-react';
import { ThreadSnapshot, ExecutionEvent } from '@/types/execution';

interface LiveThreadVisualizerProps {
  threads?: ThreadSnapshot[];
  currentEvent: ExecutionEvent | null;
}

export const LiveThreadVisualizer: React.FC<LiveThreadVisualizerProps> = ({
  threads,
  currentEvent,
}) => {
  const activeThreads = threads && threads.length > 0 ? threads : [
    {
      threadId: 'thread-main',
      name: 'main',
      state: 'RUNNABLE' as const,
      callStack: currentEvent?.stackFrames || [],
      isCurrent: true,
    }
  ];

  return (
    <div className="h-full flex flex-col space-y-3 font-sans select-none overflow-y-auto pr-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
          <Cpu className="w-3.5 h-3.5 text-cyan-600" />
          <span>Active JVM Thread Activity</span>
          <span className="px-1.5 py-0.2 bg-cyan-100 text-cyan-800 rounded-full font-mono text-[10px]">
            {activeThreads.length}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Concurrency & Locks
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {activeThreads.map((thread) => {
          const isRunnable = thread.state === 'RUNNABLE';
          const isBlocked = thread.state === 'BLOCKED';
          const isWaiting = thread.state === 'WAITING' || thread.state === 'TIMED_WAITING';

          return (
            <div
              key={thread.threadId}
              className={`p-3 bg-white rounded-lg border transition-all shadow-2xs ${
                thread.isCurrent
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isRunnable
                        ? 'bg-emerald-500 animate-pulse'
                        : isBlocked
                        ? 'bg-rose-500'
                        : isWaiting
                        ? 'bg-amber-500'
                        : 'bg-neutral-400'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-foreground text-xs block">
                      {thread.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ID: {thread.threadId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {thread.lockAcquired && (
                    <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
                      <Lock className="w-2.5 h-2.5 text-amber-600" />
                      <span>Lock: {thread.lockAcquired}</span>
                    </div>
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                      isRunnable
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isBlocked
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-neutral-100 text-neutral-600 border border-border'
                    }`}
                  >
                    {thread.state}
                  </span>
                </div>
              </div>

              {/* Call Stack summary for this thread */}
              <div className="space-y-1 text-[11px]">
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Thread Call Stack ({thread.callStack.length} frames)
                </div>
                {thread.callStack && thread.callStack.length > 0 ? (
                  <div className="space-y-1 bg-neutral-50 p-2 rounded border border-border">
                    {thread.callStack.slice(-3).reverse().map((f, fIdx) => (
                      <div key={fIdx} className="flex justify-between items-center text-[10.5px]">
                        <span className="font-semibold text-foreground">
                          {f.className}.{f.methodName}()
                        </span>
                        <span className="text-muted-foreground">Line {f.line}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10.5px] text-muted-foreground italic">Stack empty</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
