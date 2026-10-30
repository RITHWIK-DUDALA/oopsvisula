import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { LandingScrollOverlay } from './components/LandingScrollOverlay';
import { NavLink } from 'react-router-dom';
import { Maximize2, Minimize2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }

    const progress = Math.max(0, Math.min(1, el.scrollTop / maxScroll));
    setScrollProgress(progress);
  }, []);

  const stageLabels = [
    '01 // Hero Ring',
    '02 // Compression',
    '03 // DNA Hourglass',
    '04 // Energy Horizon',
    '05 // Black Hole',
    '06 // Energy Burst',
    '07 // Orbital Galaxy',
  ];

  const currentStageIndex = Math.min(6, Math.floor(scrollProgress * 6.99));

  return (
    <div
      className={`${
        isFullscreenMode ? 'fixed inset-0 z-50' : 'relative h-full'
      } w-full overflow-hidden bg-[#030205] text-[#F5F3F7]`}
    >
      {/* Fixed WebGL Canvas Background */}
      {webglSupported ? (
        <ParticleCanvas
          scrollProgress={scrollProgress}
          isReducedMotion={isReducedMotion}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs font-mono text-muted-foreground bg-[#030205]">
          WebGL is disabled or unsupported on this device. Fallback static layout active.
        </div>
      )}

      {/* Floating Header HUD */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/16 bg-black/40 backdrop-blur-md text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#6FA7FF] animate-pulse inline-block" />
            <span className="font-semibold tracking-wider text-white">OOPS LAB</span>
            <span className="text-white/40">•</span>
            <span className="text-[#A6A2AD] text-[11px]">{stageLabels[currentStageIndex]}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <NavLink
            to="/playground"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full border border-white/16 bg-white/5 hover:bg-white/15 text-xs font-medium text-[#F5F3F7] backdrop-blur-md transition-colors"
          >
            Laboratory Workspace
          </NavLink>

          <button
            onClick={() => setIsFullscreenMode(!isFullscreenMode)}
            className="p-2 rounded-full border border-white/16 bg-black/40 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-md transition-colors"
            title={isFullscreenMode ? 'Exit Cinematic Mode' : 'Enter Cinematic Mode'}
            aria-label={isFullscreenMode ? 'Exit Cinematic Mode' : 'Enter Cinematic Mode'}
          >
            {isFullscreenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Fixed DOM Content Overlay synchronized with scroll */}
      <LandingScrollOverlay scrollProgress={scrollProgress} />

      {/* Vertical Progress Bar indicator (Right Edge) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center space-y-1.5 pointer-events-none">
        {stageLabels.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 transition-all duration-200 rounded-full ${
              idx === currentStageIndex
                ? 'h-6 bg-gradient-to-b from-[#6FA7FF] to-[#ED79D8]'
                : idx < currentStageIndex
                ? 'h-2 bg-white/40'
                : 'h-1.5 bg-white/15'
            }`}
          />
        ))}
      </div>

      {/* Actual Scroll Container with 700vh height track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth focus:outline-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* 700vh scroll driver height */}
        <div className="h-[700vh] w-full pointer-events-none" />
      </div>
    </div>
  );
};
