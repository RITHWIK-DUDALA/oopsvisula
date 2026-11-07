import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, StepForward, MoreVertical, Layers, Box, GitFork, Code } from 'lucide-react';

export const HeroPreviewCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'stack' | 'heap' | 'graph'>('code');
  const [step, setStep] = useState<0 | 1>(0); // 0: line 17 (alloc initial), 1: line 18 (deposit mutated)

  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Parallax Tilt Motion Values (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring physics for smooth, organic 3D movement
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // 3D rotations: subtle depth tilt (-5.5deg to 5.5deg on X, -7.5deg to 7.5deg on Y)
  const rotateX = useTransform(springY, [-0.5, 0.5], [5.5, -5.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7.5, 7.5]);

  // Dynamic light sheen position across the glass surface
  const sheenX = useTransform(springX, [-0.5, 0.5], [20, 80]);
  const sheenY = useTransform(springY, [-0.5, 0.5], [20, 80]);

  // Dynamic 3D depth shadow shifting opposite to the tilt direction
  const shadowX = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [32, 12]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[903px] select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient 3D Depth Glow Backing */}
      <motion.div
        className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#FF9F43]/20 via-[#FFD066]/15 to-[#2463EB]/15 blur-2xl pointer-events-none -z-10"
        style={{
          x: shadowX,
          y: shadowY,
        }}
      />

      {/* Main 3D Card Container with Ambient Floating & Parallax Tilt */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateZ: [0, 0.35, -0.2, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-[509px] bg-gradient-to-b from-white/40 via-white/28 to-white/18 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 rounded-[21px] shadow-[0_24px_65px_-12px_rgba(44,48,65,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col relative z-10 transition-shadow duration-300 hover:shadow-[0_36px_85px_-15px_rgba(44,48,65,0.18),inset_0_1px_1.5px_rgba(255,255,255,1)]"
      >
        {/* Specular Light Sheen Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 rounded-[21px]"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([x, y]) =>
                `radial-gradient(750px circle at ${x}% ${y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)`
            ),
          }}
        />

        {/* Top Preview Toolbar (translateZ 16px) */}
        <div
          className="h-[66px] border-b border-white/50 px-5 flex items-center justify-between shrink-0 bg-white/25 backdrop-blur-md relative z-20"
          style={{ transform: 'translateZ(16px)' }}
        >
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

          {/* Right Stepping Controls (translateZ 24px) */}
          <div
            className="flex items-center space-x-2.5"
            style={{ transform: 'translateZ(24px)' }}
          >
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
        <div
          className="flex-1 grid grid-cols-12 overflow-hidden relative font-sans text-xs"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Column 1: Java Code Panel (~49% -> 6 cols) */}
          <div
            className="col-span-6 border-r border-white/40 p-3.5 overflow-hidden font-mono text-[11px] leading-[1.62] text-[#1F2937] bg-white/20 backdrop-blur-xs flex"
            style={{ transform: 'translateZ(8px)' }}
          >
            {/* Line Numbers Gutter */}
            <div className="w-7 shrink-0 text-right pr-2 text-[#9CA3AF] select-none space-y-0">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((ln) => {
                const isCurrent = ln === activeLine;
                return (
                  <div key={ln} className="h-[18px] flex items-center justify-end">
                    {isCurrent ? (
                      <span className="bg-[#2463EB] text-white rounded px-1 text-[10px] font-bold leading-tight shadow-xs">
                        {ln}
                      </span>
                    ) : (
                      <span>{ln}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Java Code Lines */}
            <div className="flex-1 pl-2 space-y-0 overflow-hidden">
              <div className="h-[18px] whitespace-pre">
                <span className="text-[#2563EB] font-semibold">public class</span>{' '}
                <span className="font-bold text-[#111111]">BankAccount</span> {'{'}
              </div>
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">private</span> String owner;
              </div>
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">private</span>{' '}
                <span className="text-[#2563EB] font-semibold">double</span> balance;
              </div>
              <div className="h-[18px] whitespace-pre" />
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">public</span>{' '}
                <span className="font-bold text-[#111111]">BankAccount</span>(String owner,{' '}
                <span className="text-[#2563EB] font-semibold">double</span> initial) {'{'}
              </div>
              <div className="h-[18px] whitespace-pre pl-8">
                <span className="text-[#F47B20] font-medium">this</span>.owner = owner;
              </div>
              <div className="h-[18px] whitespace-pre pl-8">
                <span className="text-[#F47B20] font-medium">this</span>.balance = initial;
              </div>
              <div className="h-[18px] whitespace-pre pl-4">{'}'}</div>
              <div className="h-[18px] whitespace-pre" />
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">public void</span>{' '}
                <span className="font-bold text-[#111111]">deposit</span>(
                <span className="text-[#2563EB] font-semibold">double</span> amount) {'{'}
              </div>
              <div className="h-[18px] whitespace-pre pl-8">
                <span className="text-[#2563EB] font-semibold">if</span> (amount &gt;{' '}
                <span className="text-[#059669] font-semibold">0</span>) {'{'}
              </div>
              <div className="h-[18px] whitespace-pre pl-12">
                <span className="text-[#F47B20] font-medium">this</span>.balance += amount;
              </div>
              <div className="h-[18px] whitespace-pre pl-8">{'}'}</div>
              <div className="h-[18px] whitespace-pre pl-4">{'}'}</div>
              <div className="h-[18px] whitespace-pre" />
              <div className="h-[18px] whitespace-pre pl-4">
                <span className="text-[#2563EB] font-semibold">public static void</span>{' '}
                <span className="font-bold text-[#111111]">main</span>(String[] args) {'{'}
              </div>

              {/* Line 17 (Allocation & Instantiation) */}
              <div
                className={`h-[18px] whitespace-pre pl-8 transition-colors ${
                  activeLine === 17 ? 'bg-[#EFF6FF] rounded -mx-1 px-1 font-medium shadow-2xs' : ''
                }`}
                style={activeLine === 17 ? { transform: 'translateZ(12px)' } : undefined}
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
                style={activeLine === 18 ? { transform: 'translateZ(12px)' } : undefined}
              >
                account.deposit(<span className="text-[#059669] font-semibold">250.0</span>);
              </div>

              <div className="h-[18px] whitespace-pre pl-4">{'}'}</div>
              <div className="h-[18px] whitespace-pre">{'}'}</div>
            </div>
          </div>

          {/* Column 2: Stack Panel (~26% -> 3 cols) */}
          <div
            className="col-span-3 border-r border-white/40 p-4 bg-white/25 backdrop-blur-xs flex flex-col justify-start space-y-4"
            style={{ transform: 'translateZ(16px)' }}
          >
            <div className="flex items-center space-x-2 font-bold text-xs text-[#111111]">
              <Layers className="w-3.5 h-3.5 text-[#111111]" />
              <span>Stack</span>
            </div>

            {/* Active Stack Frame Card */}
            <div
              className="p-3 bg-white/40 border border-white/60 rounded-xl space-y-0.5 shadow-2xs transition-transform duration-200"
              style={{ transform: 'translateZ(20px)' }}
            >
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

                {/* Account reference variable row (Anchor for SVG connector) */}
                <div
                  id="stack-ref-anchor"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/40 border border-white/60 relative shadow-2xs"
                  style={{ transform: 'translateZ(18px)' }}
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
          <div
            className="col-span-3 p-4 bg-white/30 backdrop-blur-xs flex flex-col justify-start space-y-4 relative"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="flex items-center space-x-2 font-bold text-xs text-[#111111]">
              <Box className="w-3.5 h-3.5 text-[#111111]" />
              <span>Heap</span>
            </div>

            {/* Heap Object #01 Card (Destination for SVG connector - Elevated in 3D) */}
            <div
              id="heap-obj-anchor"
              className="p-3.5 bg-white/50 backdrop-blur-md border border-white/80 rounded-xl shadow-[0_10px_25px_-5px_rgba(36,99,235,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 mt-8 relative"
              style={{ transform: 'translateZ(32px)' }}
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

          {/* Dynamic Curved SVG Reference Connector Line: account #01 -> Object #01 (Floating at translateZ 38px) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translateZ(38px)' }}
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
      </motion.div>
    </div>
  );
};
