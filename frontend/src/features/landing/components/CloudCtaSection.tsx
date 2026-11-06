import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, Code2 } from 'lucide-react';

interface CloudCtaSectionProps {
  onEnterLaboratory: () => void;
  isTransitioning?: boolean;
}

export const CloudCtaSection: React.FC<CloudCtaSectionProps> = ({
  onEnterLaboratory,
  isTransitioning = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = prefersReducedMotion !== true;

  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-visible z-20">
      {/* Main Volumetric Cloud Container: Occupies ~94-98% Desktop Width, Max 1697px */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[1697px] min-h-[580px] sm:min-h-[720px] lg:min-h-[860px] xl:min-h-[920px] flex items-center justify-center px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24 select-none"
      >
        {/* ========================================================================= */}
        {/* 1. COMPLETELY STATIONARY BASE CLOUD LAYER (ZERO WHOLE-CLOUD MOTION)        */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <img
            src="/images/realistic-cumulus-cloud.png?v=9"
            alt="Volumetric Cumulus Cloud Formation"
            className="w-[96%] sm:w-[97%] lg:w-[98%] max-w-[1697px] h-full object-contain pointer-events-none select-none filter drop-shadow-[0_20px_45px_rgba(20,50,90,0.07)]"
            draggable={false}
          />
        </div>

        {/* ========================================================================= */}
        {/* 2. LOCALIZED CLOUD MICRO-ANIMATION: GENTLY ALIVE, VISIBLE & SEAMLESS       */}
        {/* ========================================================================= */}
        {shouldAnimate && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-visible"
          >
            {/* The micro-animation container accurately matches the 1697x918 cloud frame */}
            <div className="relative w-[96%] sm:w-[97%] lg:w-[98%] max-w-[1697px] h-full pointer-events-none select-none">
              
              {/* Region A: Upper-Right Prominent Peak Wisp (~62% X, ~7% Y) */}
              <motion.div
                animate={{
                  x: [0, 14, -8, 0],
                  y: [0, -6, 4, 0],
                  scaleX: [1, 1.05, 0.98, 1],
                  scaleY: [1, 1.04, 0.99, 1],
                  opacity: [0.65, 0.92, 0.70, 0.65],
                }}
                transition={{
                  duration: 10.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-[56%] top-[3%] w-[16%] h-[15%] rounded-full pointer-events-none select-none mix-blend-screen filter blur-[6px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(230, 246, 255, 0.45) 45%, transparent 75%)',
                }}
              />

              {/* Region B: Upper-Left Billowing Crest (~25% X, ~12% Y) */}
              <motion.div
                animate={{
                  x: [0, -12, 6, 0],
                  y: [0, 7, -5, 0],
                  scaleX: [1, 1.04, 0.97, 1],
                  scaleY: [1, 1.03, 0.98, 1],
                  opacity: [0.6, 0.88, 0.68, 0.6],
                }}
                transition={{
                  duration: 12.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2,
                }}
                className="absolute left-[19%] top-[9%] w-[15%] h-[14%] rounded-full pointer-events-none select-none mix-blend-screen filter blur-[7px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 45% 45%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 250, 255, 0.4) 48%, transparent 75%)',
                }}
              />

              {/* Region C: Far-Left Billowing Lobe (~10% X, ~32% Y) */}
              <motion.div
                animate={{
                  x: [0, -14, 8, 0],
                  y: [0, 8, -6, 0],
                  scale: [1, 1.06, 0.98, 1],
                  opacity: [0.55, 0.85, 0.62, 0.55],
                }}
                transition={{
                  duration: 13.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2.5,
                }}
                className="absolute left-[5%] top-[24%] w-[14%] h-[20%] rounded-full pointer-events-none select-none mix-blend-screen filter blur-[8px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 248, 255, 0.4) 50%, transparent 75%)',
                }}
              />

              {/* Region D: Far-Right Rolling Billow (~88% X, ~30% Y) */}
              <motion.div
                animate={{
                  x: [0, 12, -7, 0],
                  y: [0, -7, 5, 0],
                  scale: [1, 1.05, 0.97, 1],
                  opacity: [0.55, 0.85, 0.65, 0.55],
                }}
                transition={{
                  duration: 11.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                className="absolute right-[5%] top-[22%] w-[14%] h-[20%] rounded-full pointer-events-none select-none mix-blend-screen filter blur-[8px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 248, 255, 0.4) 50%, transparent 75%)',
                }}
              />

              {/* Region E: Lower-Left Sunset Peach Puff (~35% X, ~86% Y) */}
              <motion.div
                animate={{
                  x: [0, -9, 8, 0],
                  y: [0, 6, -7, 0],
                  scale: [1, 1.05, 0.98, 1],
                  opacity: [0.58, 0.86, 0.64, 0.58],
                }}
                transition={{
                  duration: 12.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.8,
                }}
                className="absolute left-[28%] bottom-[6%] w-[18%] h-[14%] rounded-full pointer-events-none select-none filter blur-[8px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 228, 210, 0.75) 0%, rgba(255, 240, 228, 0.35) 50%, transparent 75%)',
                }}
              />

              {/* Region F: Lower-Right Sunset Peach Formation (~72% X, ~87% Y) */}
              <motion.div
                animate={{
                  x: [0, 11, -9, 0],
                  y: [0, -6, 7, 0],
                  scale: [1, 1.05, 0.99, 1],
                  opacity: [0.6, 0.9, 0.68, 0.6],
                }}
                transition={{
                  duration: 14.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                className="absolute right-[20%] bottom-[5%] w-[20%] h-[15%] rounded-full pointer-events-none select-none filter blur-[8px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 224, 204, 0.8) 0%, rgba(255, 238, 225, 0.4) 50%, transparent 75%)',
                }}
              />

              {/* Region G: Central Volumetric Sunlit Radiance (Gentle Light Breathing) */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.68, 0.42, 0.35],
                  scale: [1, 1.025, 0.99, 1],
                }}
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-[34%] top-[24%] w-[32%] h-[34%] rounded-full pointer-events-none select-none mix-blend-screen filter blur-[20px]"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.3) 60%, transparent 80%)',
                }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CTA CONTENT: 100% STATIONARY, CRISP TEXT & INTERACTIVE CONTROLS         */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full sm:w-[88%] lg:w-[76%] max-w-[1240px] mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-7 lg:space-y-8 bg-transparent border-0 shadow-none backdrop-filter-none pt-4 lg:pt-8">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFFBEA]/95 border border-[#FDE68A] shadow-xs text-xs sm:text-[13.5px] font-mono text-[#B45309]">
            <span className="w-2 h-2 rounded-full bg-[#FF781F] shrink-0 animate-pulse" />
            <span className="font-semibold tracking-wide">Ready to Get Started?</span>
          </div>

          {/* Main Heading: Exactly One Line on Desktop Screens, 54-58px font */}
          <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[54px] xl:text-[58px] font-[800] tracking-[-1.5px] leading-[1.12] text-[#111318] max-w-[1120px]">
            Enter the <span className="text-[#2563EB]">Java 21</span>{' '}
            <span className="text-[#D99A00]">Laboratory</span>{' '}
            <span className="text-[#FF781F]">Today.</span>
          </h2>

          {/* Description: Exactly Two Centered Lines with Highlighted Keywords */}
          <p className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-[1.55] text-[#334155] max-w-[940px] font-normal">
            Join hundreds of students, educators, and engineers mastering{' '}
            <span className="text-[#FF781F] font-semibold">object-oriented programming</span>{' '}
            through{' '}
            <span className="text-[#2563EB] font-semibold">interactive deterministic visualization</span>.
          </p>

          {/* Action Buttons: Side-by-Side Centered Group with Exact Reference Proportions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[17px] pt-3 sm:pt-5 lg:pt-6 w-full">
            {/* Primary Action Button (Target ~322 x 69px) */}
            <button
              type="button"
              disabled={isTransitioning}
              onClick={onEnterLaboratory}
              className="w-full sm:w-auto min-w-[280px] lg:min-w-[322px] h-[64px] lg:h-[69px] px-8 rounded-[20px] bg-[#1859F5] hover:bg-[#1349cb] text-white text-[16px] lg:text-[16.5px] font-bold flex items-center justify-center space-x-3 shadow-[0_8px_25px_rgba(24,89,245,0.32)] transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current stroke-[1.5]" />
              <span>Enter the Laboratory</span>
            </button>

            {/* Secondary Action Button (Target ~403 x 69px) */}
            <button
              type="button"
              disabled={isTransitioning}
              onClick={onEnterLaboratory}
              className="w-full sm:w-auto min-w-[320px] lg:min-w-[403px] h-[64px] lg:h-[69px] px-8 rounded-[20px] bg-white/95 hover:bg-white border border-white text-[#111827] text-[16px] lg:text-[16.5px] font-semibold flex items-center justify-center space-x-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Code2 className="w-5 h-5 text-[#2563EB] stroke-[2]" />
              <span>Launch Interactive Playground</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CloudCtaSection;
