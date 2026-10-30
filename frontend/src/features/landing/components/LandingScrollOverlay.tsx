import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Cpu, Layers } from 'lucide-react';

interface LandingScrollOverlayProps {
  scrollProgress: number; // 0.0 to 1.0
}

/**
 * Calculates opacity with smooth entry and exit ramps for section brackets
 */
function getSectionOpacity(
  progress: number,
  start: number,
  peakStart: number,
  peakEnd: number,
  end: number
): number {
  if (progress < start || progress > end) return 0;
  if (progress >= peakStart && progress <= peakEnd) return 1;
  if (progress < peakStart) {
    return (progress - start) / (peakStart - start);
  }
  return 1 - (progress - peakEnd) / (end - peakEnd);
}

export const LandingScrollOverlay: React.FC<LandingScrollOverlayProps> = ({
  scrollProgress,
}) => {
  // Section opacity windows across normalized 0..1
  const opacityHero = getSectionOpacity(scrollProgress, 0.0, 0.0, 0.11, 0.16);
  const opacityCompress = getSectionOpacity(scrollProgress, 0.15, 0.19, 0.24, 0.28);
  const opacityDna = getSectionOpacity(scrollProgress, 0.27, 0.32, 0.38, 0.43);
  const opacityHorizon = getSectionOpacity(scrollProgress, 0.42, 0.46, 0.52, 0.57);
  const opacityBlackHole = getSectionOpacity(scrollProgress, 0.56, 0.60, 0.67, 0.72);
  const opacityBurst = getSectionOpacity(scrollProgress, 0.70, 0.74, 0.81, 0.85);
  const opacityEcosystem = getSectionOpacity(scrollProgress, 0.84, 0.89, 1.0, 1.0);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden font-sans">
      {/* ========================================================
          SECTION 01: HERO / INITIAL RING (0.0 to 0.14)
         ======================================================== */}
      <div
        style={{
          opacity: opacityHero,
          visibility: opacityHero > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-150"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/16 bg-white/5 backdrop-blur-xs text-xs font-mono text-[#F5F3F7]">
            <Sparkles className="w-3.5 h-3.5 text-[#6FA7FF] stroke-[1.5]" />
            <span>Java 21 Virtual Machine Laboratory</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F3F7] leading-tight">
            Master Java OOP Through <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6FA7FF] via-[#ED79D8] to-[#FF754A]">
              Deterministic Visual Traces
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#A6A2AD] max-w-xl mx-auto leading-relaxed">
            Observe JVM runtime call stacks, Eden heap pointer allocations, and polymorphic dynamic dispatch side-by-side with compiled Java 21 source code.
          </p>

          {/* Pill CTAs (Horizontally aligned on desktop, stacked on mobile) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
            <NavLink
              to="/playground"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-medium text-[#F5F3F7] backdrop-blur-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch 3-Panel Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>

            <NavLink
              to="/concepts"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/12 bg-transparent hover:bg-white/5 text-xs font-medium text-[#A6A2AD] hover:text-[#F5F3F7] transition-all flex items-center justify-center"
            >
              <span>Explore 14-Step Curriculum</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 02: PARTICLE COMPRESSION (0.14 to 0.28)
         ======================================================== */}
      <div
        style={{
          opacity: opacityCompress,
          visibility: opacityCompress > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-150"
      >
        <div className="max-w-lg mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/16 bg-white/5 text-[11px] font-mono text-[#A6A2AD]">
            <span>Phase 02 // Lateral Compression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-[#F5F3F7]">
            State-Space Compression
          </h2>
          <p className="text-xs text-[#A6A2AD] leading-relaxed">
            From abstract Java syntax to physical JVM memory cells. The particle field constricts into structural execution streams.
          </p>
        </div>
      </div>

      {/* ========================================================
          SECTION 03: DNA / HOURGLASS FORMATION (0.28 to 0.42)
         ======================================================== */}
      <div
        style={{
          opacity: opacityDna,
          visibility: opacityDna > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex items-center justify-between p-6 sm:p-12 max-w-6xl mx-auto transition-opacity duration-150"
      >
        {/* Metric Chip Left: Heap Graph Topology */}
        <div className="p-4 rounded-xl border border-white/16 bg-white/5 backdrop-blur-md max-w-xs space-y-1.5 pointer-events-auto">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#6FA7FF]">
            <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>JVM Heap References</span>
          </div>
          <div className="text-sm font-semibold font-mono text-[#F5F3F7]">
            @0x7B1A &rarr; @0x9F4C
          </div>
          <p className="text-[11px] text-[#A6A2AD] leading-snug">
            Live pointer resolution tracks parent-child composition relationships without memory leaks.
          </p>
        </div>

        {/* Metric Chip Right: AST Security Boundary */}
        <div className="p-4 rounded-xl border border-white/16 bg-white/5 backdrop-blur-md max-w-xs space-y-1.5 pointer-events-auto text-right">
          <div className="flex items-center justify-end space-x-2 text-[11px] font-mono text-[#FF754A]">
            <span>AST Security Boundary</span>
            <Shield className="w-3.5 h-3.5 stroke-[1.5]" />
          </div>
          <div className="text-sm font-semibold font-mono text-[#F5F3F7]">
            Isolated Worker Sandbox
          </div>
          <p className="text-[11px] text-[#A6A2AD] leading-snug">
            JavaParser statically rejects reflection, file I/O, and system calls before compilation.
          </p>
        </div>
      </div>

      {/* ========================================================
          SECTION 04: HORIZONTAL PARTICLE HORIZON (0.42 to 0.56)
         ======================================================== */}
      <div
        style={{
          opacity: opacityHorizon,
          visibility: opacityHorizon > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col justify-start pt-24 sm:pt-32 px-6 sm:px-16 max-w-6xl mx-auto transition-opacity duration-150"
      >
        {/* Desktop 2-Column Text Layout (Mobile single-column) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Badge & Large Heading */}
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/16 bg-white/5 text-[11px] font-mono text-[#ED79D8]">
              <span>Real-Time Instruction Horizon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F5F3F7] leading-tight">
              A Wide Horizon of <br />
              <span className="font-semibold text-white">Instruction-Level Insight</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description & CTA */}
          <div className="md:col-span-5 space-y-4 pt-2">
            <p className="text-xs sm:text-sm text-[#A6A2AD] leading-relaxed">
              Step forwards and backwards through execution events with microsecond precision. Inspect variable scopes, stack frames, and garbage collection sweeps across the timeline.
            </p>
            <div className="pointer-events-auto">
              <NavLink
                to="/visualizers"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-medium text-[#F5F3F7] backdrop-blur-xs transition-all shadow-sm"
              >
                <span>Inspect Runtime Visualizer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 05: BLACK-HOLE PARTICLE FIELD (0.56 to 0.70)
         ======================================================== */}
      <div
        style={{
          opacity: opacityBlackHole,
          visibility: opacityBlackHole > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-150"
      >
        <div className="max-w-lg mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/16 bg-white/5 text-[11px] font-mono text-[#ED79D8]">
            <Shield className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Gravitational Memory Containment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-[#F5F3F7]">
            Zero Undefined Behavior
          </h2>
          <p className="text-xs text-[#A6A2AD] leading-relaxed">
            Strict isolation guarantees safety: student Java code runs in unprivileged cgroup containers with 256MB RAM and 1 CPU caps. The host API is never compromised.
          </p>
        </div>
      </div>

      {/* ========================================================
          SECTION 06: ENERGY BURST (0.70 to 0.84)
         ======================================================== */}
      <div
        style={{
          opacity: opacityBurst,
          visibility: opacityBurst > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-150"
      >
        <div className="max-w-lg mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/16 bg-white/5 text-[11px] font-mono text-[#F5F3F7]">
            <Layers className="w-3.5 h-3.5 text-[#6FA7FF] stroke-[1.5]" />
            <span>Radial Execution Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-[#F5F3F7]">
            Deterministic Event Stream
          </h2>
          <p className="text-xs text-[#A6A2AD] leading-relaxed">
            Every step generates typed JDI execution events that power the Monaco editor, memory graph canvas, and execution inspector simultaneously.
          </p>
        </div>
      </div>

      {/* ========================================================
          SECTION 07: ORBITAL GALAXY / ECOSYSTEM (0.84 to 1.00)
         ======================================================== */}
      <div
        style={{
          opacity: opacityEcosystem,
          visibility: opacityEcosystem > 0 ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-150"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/16 bg-white/5 backdrop-blur-xs text-xs font-mono text-[#F5F3F7]">
            <Sparkles className="w-3.5 h-3.5 text-[#ED79D8] stroke-[1.5]" />
            <span>The Complete Open-Source Laboratory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#F5F3F7] leading-tight">
            Explore the Complete <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6FA7FF] via-[#ED79D8] to-[#FF754A]">
              Java OOP Ecosystem
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A6A2AD] max-w-xl mx-auto leading-relaxed">
            14-step curriculum track, visual UML class builder, Monaco code editor, and interactive challenge auto-grader. Free, private, and local-first.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
            <NavLink
              to="/concepts"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-medium text-[#F5F3F7] backdrop-blur-xs transition-all flex items-center justify-center space-x-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Learning Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>

            <NavLink
              to="/visualizers"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/12 bg-transparent hover:bg-white/5 text-xs font-medium text-[#A6A2AD] hover:text-[#F5F3F7] transition-all flex items-center justify-center"
            >
              <span>Open Visualizer Hub</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

