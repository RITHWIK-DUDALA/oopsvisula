import React from 'react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { Cpu, Layers, Box, ArrowRight } from 'lucide-react';

export const MemoryCanvas: React.FC = () => {
  const { getCurrentEvent, getReferencePointers } = useSimulationStore();
  const event = getCurrentEvent();
  const pointers = getReferencePointers();

  if (!event) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
        No active execution trace loaded.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden select-none">
      {/* Header Info */}
      <div className="h-10 px-4 border-b border-border flex items-center justify-between bg-surface/50 shrink-0">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="font-semibold text-foreground flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>JVM Runtime Memory Projection</span>
          </span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground">Step {event.step} ({event.type})</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono text-muted-foreground">
          <span>Frames: {event.stackFrames.length}</span>
          <span>Objects: {event.heapObjects.length}</span>
          <span>Pointers: {pointers.length}</span>
        </div>
      </div>

      {/* Main Memory Area: Stack (Left) & Heap (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border overflow-y-auto">
        {/* Left Column: Call Stack Frames */}
        <div className="p-4 space-y-4 bg-surface/20 overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
            <span className="flex items-center space-x-1.5 font-semibold text-foreground uppercase tracking-wider text-[11px]">
              <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Call Stack (LIFO)</span>
            </span>
            <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">
              {event.stackFrames.length === 0 ? 'Empty Stack' : `${event.stackFrames.length} Active Frame(s)`}
            </span>
          </div>

          {event.stackFrames.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground font-mono">
              Thread terminated. Call stack unwound.
            </div>
          ) : (
            <div className="space-y-3">
              {event.stackFrames.map((frame, idx) => {
                const isTopFrame = idx === event.stackFrames.length - 1;
                return (
                  <div
                    key={frame.frameId}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isTopFrame
                        ? 'bg-white border-foreground shadow-xs ring-1 ring-foreground/10'
                        : 'bg-surface border-border opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold bg-foreground text-background px-1.5 py-0.5 rounded">
                          Frame #{idx + 1}
                        </span>
                        <span className="text-xs font-mono font-bold text-foreground">
                          {frame.methodName}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        Line {frame.line}
                      </span>
                    </div>

                    {/* Local Variables Table */}
                    <div className="space-y-1.5 pt-2 border-t border-border">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                        Local Variables
                      </div>
                      {frame.localVariables.length === 0 ? (
                        <span className="text-xs text-muted-foreground italic">No local variables</span>
                      ) : (
                        frame.localVariables.map((v) => (
                          <div
                            key={v.name}
                            className="flex items-center justify-between text-xs font-mono py-1 px-2 rounded bg-surface border border-border/60"
                          >
                            <div className="flex items-center space-x-1.5">
                              <span className="text-foreground font-medium">{v.name}</span>
                              <span className="text-[10px] text-muted-foreground font-normal">
                                ({v.type})
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              {v.isReference ? (
                                <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-foreground text-background text-[11px] font-mono">
                                  <span>{String(v.value)}</span>
                                  <ArrowRight className="w-2.5 h-2.5 stroke-[2]" />
                                </span>
                              ) : (
                                <span className="text-foreground font-semibold">
                                  {String(v.value)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: JVM Heap (Eden Space) */}
        <div className="p-4 space-y-4 bg-white overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border pb-2">
            <span className="flex items-center space-x-1.5 font-semibold text-foreground uppercase tracking-wider text-[11px]">
              <Box className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>JVM Heap (Eden Space)</span>
            </span>
            <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">
              {event.heapObjects.length} Allocated Instance(s)
            </span>
          </div>

          {event.heapObjects.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground font-mono">
              Heap is empty. No objects instantiated yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {event.heapObjects.map((obj) => (
                <div
                  key={obj.address}
                  className="p-3.5 bg-surface border border-border rounded-xl space-y-2.5 hover:border-foreground/40 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-foreground text-background px-2 py-0.5 rounded">
                        {obj.address}
                      </span>
                      <span className="text-xs font-bold text-foreground">
                        {obj.className}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-white px-1.5 py-0.5 rounded border border-border">
                      Instance
                    </span>
                  </div>

                  {/* Fields list */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      Instance Fields
                    </div>
                    {obj.fields.length === 0 ? (
                      <span className="text-xs text-muted-foreground italic">No fields</span>
                    ) : (
                      obj.fields.map((f) => (
                        <div
                          key={f.name}
                          className="flex items-center justify-between text-xs font-mono py-1 px-2 rounded bg-white border border-border"
                        >
                          <div className="flex items-center space-x-1.5">
                            <span className="text-foreground font-medium">{f.name}</span>
                            <span className="text-[10px] text-muted-foreground">({f.type})</span>
                          </div>
                          <div className="text-foreground font-semibold">
                            {f.isReference ? (
                              <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-accent border border-border text-[11px]">
                                <span>{String(f.value)}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            ) : (
                              <span>{String(f.value)}</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reference Pointers Summary Strip */}
      <div className="p-2.5 px-4 bg-surface border-t border-border flex items-center justify-between text-xs font-mono shrink-0">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <span className="font-semibold text-foreground">Active Pointers:</span>
          {pointers.length === 0 ? (
            <span>None</span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {pointers.map((p, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white border border-border rounded text-[11px] text-foreground font-medium"
                >
                  {p.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
