import React, { useState } from 'react';
import { Play, Pause, RotateCcw, StepForward, StepBack, Layers, Box } from 'lucide-react';

export const VisualizerPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { title: '1. Class Loader', desc: 'BankAccount class loaded into Metaspace. Static members initialized.' },
    { title: '2. Stack Frame Created', desc: 'main() frame pushed. Local variable `acc` allocated in stack.' },
    { title: '3. Object Instantiation', desc: 'new BankAccount("Alice", 1000) allocates 24 bytes in Eden Space.' },
    { title: '4. Reference Assigned', desc: 'Stack pointer `acc` updated with address @0x2F1A pointing to heap.' },
    { title: '5. Method Invocation', desc: 'acc.deposit(500) pushes deposit() frame with `this` reference.' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Visualizer Engine</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">JVM Memory & Reference Graph Visualizer</h1>
          <p className="text-xs text-muted-foreground">Interactive projection of Java Stack frames and Heap object instances.</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 bg-white border border-border rounded-lg p-1.5 shadow-sm">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface transition-colors"
            title="Step Backward"
          >
            <StepBack className="w-4 h-4 stroke-[1.5]" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-foreground text-background rounded hover:bg-black/90 transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 stroke-[2]" /> : <Play className="w-4 h-4 stroke-[2]" />}
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface transition-colors"
            title="Step Forward"
          >
            <StepForward className="w-4 h-4 stroke-[1.5]" />
          </button>
          <div className="w-[1px] h-4 bg-border my-auto" />
          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Step Info Card */}
      <div className="p-4 bg-white border border-border rounded-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-xs font-mono text-muted-foreground">STEP {currentStep + 1} OF {steps.length}</div>
          <div className="text-sm font-semibold text-foreground">{steps[currentStep].title}</div>
          <p className="text-xs text-muted-foreground">{steps[currentStep].desc}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono px-2 py-1 bg-surface border border-border rounded text-foreground">
            JVM: HotSpot 21 (x64)
          </span>
        </div>
      </div>

      {/* 2-Column Memory Layout: Stack vs Heap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Stack Panel */}
        <div className="p-6 bg-white border border-border rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-foreground stroke-[1.5]" />
              <h2 className="text-sm font-semibold text-foreground">Call Stack (Thread: main)</h2>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">LIFO Structure</span>
          </div>

          <div className="space-y-3">
            {/* Active Stack Frame */}
            <div className="p-4 bg-surface border-2 border-foreground rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span>main(String[] args)</span>
                <span className="font-mono text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded">Active Frame</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-1.5 bg-white border border-border rounded">
                  <span className="text-muted-foreground">args</span>
                  <span className="text-foreground">String[0] (@0x10A2)</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-white border border-foreground rounded">
                  <span className="font-medium text-foreground">acc</span>
                  <span className="font-bold text-foreground">ref → @0x2F1A</span>
                </div>
              </div>
            </div>

            <div className="p-3 border border-dashed border-border rounded-lg text-center text-xs text-muted-foreground">
              [Bottom of Stack]
            </div>
          </div>
        </div>

        {/* JVM Heap Panel */}
        <div className="p-6 bg-white border border-border rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center space-x-2">
              <Box className="w-4 h-4 text-foreground stroke-[1.5]" />
              <h2 className="text-sm font-semibold text-foreground">JVM Heap (Eden Space)</h2>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Shared Object Pool</span>
          </div>

          <div className="space-y-4">
            {/* Instantiated Heap Object Card */}
            <div className="p-4 bg-white border-2 border-foreground rounded-xl shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-foreground">BankAccount</span>
                  <span className="text-[10px] font-mono text-muted-foreground">(@0x2F1A)</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-accent border border-border rounded text-foreground">24 bytes</span>
              </div>

              {/* Instance Fields */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">owner: String</span>
                  <span className="text-foreground">"Alice"</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">balance: double</span>
                  <span className="text-foreground font-semibold">1000.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">id: long</span>
                  <span className="text-foreground">10492837L</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Header: 12B (MarkWord + Klass)</span>
                <span>GC Age: 0</span>
              </div>
            </div>

            <div className="p-3 border border-dashed border-border rounded-lg text-center text-xs text-muted-foreground">
              Garbage Collector: ZGC Active (0 unreachable objects)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

