import React, { useState } from 'react';
import { Play, StepForward, MoreVertical, Layers, Box, GitFork, Code } from 'lucide-react';

export const HeroPreviewCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'stack' | 'heap' | 'graph'>('code');
  const [step, setStep] = useState<0 | 1>(0); // 0: line 17 (alloc initial), 1: line 18 (deposit mutated)

  const handleStep = () => {
    setStep((prev) => (prev === 0 ? 1 : 0));
  };

  const handleRun = () => {
    setStep(1);
  };

  const handleRestart = () => {
    setStep(0);
  };

  const activeLine = step === 0 ? 17 : 18;
  const balanceVal = step === 0 ? '500.0' : '750.0';

  return (
    <div className="relative w-full max-w-[903px] select-none">
      {/* Ambient Depth Glow Backing */}
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#FF9F43]/20 via-[#FFD066]/15 to-[#2463EB]/15 blur-2xl pointer-events-none -z-10" />

      {/* Main Glass Card Container */}
      <div className="w-full h-[509px] bg-gradient-to-b from-white/40 via-white/28 to-white/18 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 rounded-[21px] shadow-[0_24px_65px_-12px_rgba(44,48,65,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col relative z-10 transition-shadow duration-300 hover:shadow-[0_30px_70px_-15px_rgba(44,48,65,0.16),inset_0_1px_1.5px_rgba(255,255,255,1)]">
        {/* Top Preview Toolbar */}
        <div className="h-[66px] border-b border-white/50 px-5 flex items-center justify-between shrink-0 bg-white/25 backdrop-blur-md relative z-20">
          {/* Left Tabs */}
          <div className="flex items-center space-x-7 text-xs font-medium text-[#50566A]">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 py-5 transition-colors relative cursor-pointer ${
                activeTab === 'code' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
            >
              <Code className="w-4 h-4 stroke-[2]" />
              <span>Code</span>
              {activeTab === 'code' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2463EB] rounded-full shadow-xs" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('stack')}
              className={`flex items-center space-x-2 py-5 transition-colors relative cursor-pointer ${
                activeTab === 'stack' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
            >
              <Layers className="w-4 h-4 stroke-[1.8]" />
              <span>Stack</span>
              {activeTab === 'stack' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2463EB] rounded-full shadow-xs" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('heap')}
              className={`flex items-center space-x-2 py-5 transition-colors relative cursor-pointer ${
                activeTab === 'heap' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
            >
              <Box className="w-4 h-4 stroke-[1.8]" />
              <span>Heap</span>
              {activeTab === 'heap' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2463EB] rounded-full shadow-xs" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-2 py-5 transition-colors relative cursor-pointer ${
                activeTab === 'graph' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
            >
              <GitFork className="w-4 h-4 stroke-[1.8]" />
              <span>Object Graph</span>
              {activeTab === 'graph' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2463EB] rounded-full shadow-xs" />
              )}
            </button>
          </div>

          {/* Right Stepping Controls */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleRun}
              className="h-[34px] px-3.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>

            <button
              onClick={handleStep}
              className="h-[34px] px-3 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#111111] text-xs font-medium rounded-lg flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              title="Step next execution event"
            >
              <StepForward className="w-3.5 h-3.5" />
              <span>Step</span>
            </button>

            <button
              onClick={handleRestart}
              className="w-[34px] h-[34px] border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#50566A] rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              title="Reset to Line 17"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main 3-Column Preview Body */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden relative font-sans text-xs">
          {/* Column 1: Java Code Panel (~49% -> 6 cols) */}
          <div className="col-span-6 border-r border-white/40 p-3.5 overflow-hidden font-mono text-[11px] leading-[1.62] text-[#1F2937] bg-white/20 backdrop-blur-xs flex">
            {/* Line Numbers Gutter */}
            <div className="w-7 shrink-0 text-right pr-2 text-[#9CA3AF] select-none space-y-0">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((ln) => {
                const isCurrent = ln === activeLine;
                return (
                  <div key={ln} className="h-[18px] flex items-center justify-end">
                    <span
                      className={`font-mono text-[10px] ${
                        isCurrent ? 'text-[#2563EB] font-bold' : 'text-[#9CA3AF]'
                      }`}
                    >
                      {ln}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-hidden space-y-0 text-left">
              <div className="h-[18px] whitespace-pre">
                <span className="text-[#2563EB] font-semibold">public class</span>{' '}
                <span className="font-bold text-[#111111]">BankAccountDemo</span> {'{'}
              </div>

              {/* ... Hidden Class Body Lines for Spacing ... */}
              <div className="h-[18px] text-[#9CA3AF] italic pl-4">// ... encapsulated fields ...</div>
              <div className="h-[18px] text-[#9CA3AF] italic pl-4">// ... constructor & methods ...</div>
              <div className="h-[18px] whitespace-pre pl-4" />

              {/* Main Method Entry */}
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">public static void</span>{' '}
                <span className="font-bold text-[#111111]">main</span>(String[] args) {'{'}
              </div>

              {/* Line 17 (Allocation & Instantiation) */}
              <div
                className={`h-[18px] whitespace-pre pl-8 transition-colors ${
                  activeLine === 17 ? 'bg-[#EFF6FF] rounded -mx-1 px-1 font-medium shadow-2xs' : ''
                }`}
              >
                <span className="text-[#111111] font-bold">BankAccount</span> account ={' '}
                <span className="text-[#2563EB] font-semibold">new</span> BankAccount(
                <span className="text-[#D97706]">"Alice"</span>,{' '}
                <span className="text-[#059669] font-semibold">500.0</span>);
              </div>

              {/* Line 18 (Mutation invocation) */}
              <div
                className={`h-[18px] whitespace-pre pl-8 transition-colors ${
                  activeLine === 18 ? 'bg-[#EFF6FF] rounded -mx-1 px-1 font-medium shadow-2xs' : ''
                }`}
              >
                account.deposit(<span className="text-[#059669] font-semibold">250.0</span>);
              </div>

              <div className="h-[18px] whitespace-pre pl-4">{'}'}</div>
              <div className="h-[18px] whitespace-pre">{'}'}</div>
            </div>
          </div>

          {/* Column 2: Stack Panel (~26% -> 3 cols) */}
          <div className="col-span-3 border-r border-white/40 p-4 bg-white/25 backdrop-blur-xs flex flex-col justify-start space-y-4">
            <div className="flex items-center space-x-2 font-bold text-xs text-[#111111]">
              <Layers className="w-3.5 h-3.5 text-[#111111]" />
              <span>Stack</span>
            </div>

            {/* Active Stack Frame Card */}
            <div className="p-3 bg-white/40 border border-white/60 rounded-xl space-y-0.5 shadow-2xs">
              <div className="font-bold text-xs text-[#1E3A8A]">main(String[] args)</div>
              <div className="text-[10px] font-mono text-[#3B82F6]">Line {activeLine}</div>
            </div>

            {/* Local Variables Container */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">
                Local Variables
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/30 border border-white/50">
                  <span className="text-[#374151] font-medium">args</span>
                  <span className="text-[11px] text-[#9CA3AF]">String[]</span>
                  <span className="text-[#6B7280]">null</span>
                </div>

                {/* Account reference variable row */}
                <div
                  id="stack-ref-anchor"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/40 border border-white/60 relative shadow-2xs"
                >
                  <span className="text-[#2463EB] font-bold">account</span>
                  <span className="text-[11px] text-[#9CA3AF]">BankAccount</span>
                  <span className="px-1.5 py-0.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#2463EB] font-bold rounded text-[11px] shadow-xs">
                    #01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Heap Panel (~25% -> 3 cols) */}
          <div className="col-span-3 p-4 bg-white/30 backdrop-blur-xs flex flex-col justify-start space-y-4 relative">
            <div className="flex items-center space-x-2 font-bold text-xs text-[#111111]">
              <Box className="w-3.5 h-3.5 text-[#111111]" />
              <span>Heap</span>
            </div>

            {/* Heap Object #01 Card */}
            <div
              id="heap-obj-anchor"
              className="p-3.5 bg-white/50 backdrop-blur-md border border-white/80 rounded-xl shadow-[0_10px_25px_-5px_rgba(36,99,235,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 mt-8 relative"
            >
              <div className="border-b border-[#F1F5F9] pb-1.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#111111] block">Object #01</span>
                  <span className="text-[10px] font-mono text-[#64748B] block">BankAccount</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">owner</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-medium text-[11px]">
                    "Alice"
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">balance</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#D1FAE5] text-[#065F46] font-bold text-[11px] transition-all">
                    {balanceVal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Curved SVG Reference Connector Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Curved cobalt reference connector path */}
            <path
              d="M 685,245 C 710,245 725,225 765,225"
              fill="none"
              stroke="#2463EB"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Start node at stack variable */}
            <circle cx="685" cy="245" r="3.5" fill="#2463EB" />
            {/* End node at heap object card */}
            <circle cx="765" cy="225" r="3.5" fill="#2463EB" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroPreviewCard;
