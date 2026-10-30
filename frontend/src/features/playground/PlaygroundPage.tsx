import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, StepForward, StepBack, RotateCcw, Layers, Box, CheckCircle } from 'lucide-react';

const defaultCode = `public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        this.balance += amount;
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("Alice", 500.0);
        account.deposit(250.0);
        System.out.println("Balance: " + account.balance);
    }
}`;

export const PlaygroundPage: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [activeStep, setActiveStep] = useState(1);
  const [isTracing, setIsTracing] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* Playground Top Action Bar */}
      <div className="h-12 px-6 bg-white border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-xs text-foreground tracking-tight">BankAccount.java</span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-accent text-muted-foreground border border-border rounded">Java 21 LTS</span>
        </div>

        {/* Tracing Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsTracing(!isTracing)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5 stroke-[2]" />
            <span>{isTracing ? "Stop Tracing" : "Run & Trace"}</span>
          </button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <button
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface border border-border transition-colors"
            title="Step Back"
          >
            <StepBack className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => setActiveStep((s) => s + 1)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface border border-border transition-colors"
            title="Step Next"
          >
            <StepForward className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => { setActiveStep(1); }}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-surface border border-border transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* 3-Panel Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Panel 1: Monaco Java Code Editor (5 cols) */}
        <div className="lg:col-span-5 h-full border-r border-border flex flex-col bg-white">
          <div className="px-4 py-2 border-b border-border bg-surface text-[11px] font-mono text-muted-foreground flex items-center justify-between">
            <span>Source Editor</span>
            <span>Line 14: Active Step</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="java"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                renderLineHighlight: 'all',
              }}
            />
          </div>
        </div>

        {/* Panel 2: Interactive Memory Visualizer (4 cols) */}
        <div className="lg:col-span-4 h-full border-r border-border flex flex-col bg-surface/50">
          <div className="px-4 py-2 border-b border-border bg-white text-[11px] font-mono text-muted-foreground flex items-center justify-between">
            <span className="font-semibold text-foreground">Interactive Visualizer</span>
            <span>Step {activeStep} / 6</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Stack Frame Snapshot */}
            <div className="p-3.5 bg-white border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
                  <span>main() Frame</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">Line 14</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="p-1.5 bg-surface border border-border rounded flex items-center justify-between">
                  <span className="text-muted-foreground">account</span>
                  <span className="font-semibold text-foreground">ref → @0x4A12</span>
                </div>
              </div>
            </div>

            {/* Heap Allocation Snapshot */}
            <div className="p-3.5 bg-white border-2 border-foreground rounded-xl space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-1.5">
                <div className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
                  <span className="text-xs font-bold text-foreground">BankAccount</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">@0x4A12</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">owner:</span>
                  <span className="text-foreground">"Alice"</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">balance:</span>
                  <span className="font-bold text-foreground">500.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Execution Inspector & Console (3 cols) */}
        <div className="lg:col-span-3 h-full flex flex-col bg-white">
          <div className="px-4 py-2 border-b border-border bg-surface text-[11px] font-mono text-muted-foreground">
            Execution Inspector
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase mb-1">Runtime Status</div>
              <div className="flex items-center space-x-2 text-foreground font-medium">
                <CheckCircle className="w-4 h-4 text-foreground stroke-[2]" />
                <span>Deterministic JDI Trace Ready</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase mb-1">Active Object State</div>
              <p className="text-muted-foreground leading-relaxed">
                `BankAccount` allocated on heap. Pointer assigned to local variable `account`. Next instruction: `account.deposit(250.0)`.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-[11px] font-mono text-muted-foreground uppercase mb-2 flex items-center justify-between">
                <span>Console Output</span>
                <span className="text-[10px] text-muted-foreground">stdout</span>
              </div>
              <div className="p-3 bg-surface border border-border rounded-lg font-mono text-xs text-foreground min-h-[90px]">
                <div>[Compiled with Java 21]</div>
                <div className="text-muted-foreground mt-1">// Awaiting completion of deposit()...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

