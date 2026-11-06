import React, { useEffect, useRef, useState } from 'react';

export type LogoTraceLoaderProps = {
  loading?: boolean;
  isComplete?: boolean;
  size?: number;
  strokeWidth?: number;
  loopDurationSeconds?: number;
  fillFadeSeconds?: number;
  className?: string;
  ariaLabel?: string;
  onDone?: () => void;
};

type AnimationStage = 'initial' | 'tracing' | 'outlineComplete' | 'filled';

const LOGO_VIEW_BOX = '0 0 100 100';

/**
 * Approved Three-Layer Stacked SVG Logo Geometry:
 * Symmetrical around (50, 50), total width 72, total height 73.
 * Preserves exact proportions, spacing, negative space, and corner curvature.
 */
export const OOPS_LOGO_PATHS = [
  // 1. Top Layer - Rounded Isometric Diamond
  'M 45.16 16.12 Q 50 13.50 54.84 16.12 L 81.16 30.38 Q 86.00 33.00 81.16 35.62 L 54.84 49.88 Q 50 52.50 45.16 49.88 L 18.84 35.62 Q 14.00 33.00 18.84 30.38 Z',

  // 2. Middle Layer - Stacked Isometric Slab (Outer Lip & Inner Notch)
  'M 18.84 44.50 Q 14.00 48.50 18.84 52.62 L 45.16 66.88 Q 50 69.50 54.84 66.88 L 81.16 52.62 Q 86.00 48.50 81.16 44.50 L 54.84 58.76 Q 50 61.38 45.16 58.76 Z',

  // 3. Bottom Layer - Stacked Isometric Slab (Outer Lip & Inner Notch)
  'M 18.84 61.50 Q 14.00 65.50 18.84 69.62 L 45.16 83.88 Q 50 86.50 54.84 83.88 L 81.16 69.62 Q 86.00 65.50 81.16 61.50 L 54.84 75.76 Q 50 78.38 45.16 75.76 Z',
] as const;

// Sequential layer fill colors matching production specification
export const OOPS_LOGO_FILL_COLORS = [
  '#075CF5', // Layer 1 - Top: Cobalt Blue
  '#75A9FF', // Layer 2 - Middle: Light Blue
  '#073DAB', // Layer 3 - Bottom: Deep Navy Blue
] as const;

// Production stage outline colors
const COLOR_INITIAL_OUTLINE = '#D9DADD';
const COLOR_TRACING_STROKE = '#0860F5';
const COLOR_COMPLETE_OUTLINE = '#17191D';

export const LogoTraceLoader: React.FC<LogoTraceLoaderProps> = ({
  loading = true,
  isComplete = false,
  size = 64,
  strokeWidth = 3,
  loopDurationSeconds = 1.75,
  fillFadeSeconds = 0.45,
  className = '',
  ariaLabel = 'Loading OOPS LAB...',
  onDone,
}) => {
  const isStaticMode = !loading || isComplete;

  const [stage, setStage] = useState<AnimationStage>(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return 'filled';
    }
    return isStaticMode ? 'filled' : 'initial';
  });

  const [outlineColor, setOutlineColor] = useState<string>(
    isStaticMode ? COLOR_COMPLETE_OUTLINE : COLOR_INITIAL_OUTLINE
  );
  const [fillOpacities, setFillOpacities] = useState<[number, number, number]>(
    isStaticMode ? [1, 1, 1] : [0, 0, 0]
  );

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneFiredRef = useRef(false);

  const fireDoneOnce = () => {
    if (!doneFiredRef.current) {
      doneFiredRef.current = true;
      onDoneRef.current?.();
    }
  };

  useEffect(() => {
    // 1. Reduced motion: immediately render filled state and fire onDone
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setStage('filled');
      setOutlineColor(COLOR_COMPLETE_OUTLINE);
      setFillOpacities([1, 1, 1]);
      fireDoneOnce();
      return;
    }

    // 2. Static / Finished State
    if (!loading || isComplete) {
      setStage('filled');
      setOutlineColor(COLOR_COMPLETE_OUTLINE);
      setFillOpacities([1, 1, 1]);
      fireDoneOnce();
      return;
    }

    // 3. Active Animation Sequence
    let isCancelled = false;
    const timers: NodeJS.Timeout[] = [];

    // Scale nominal timings proportionately to loopDurationSeconds
    const totalCycleMs = Math.max(1000, loopDurationSeconds * 1000);
    const scale = totalCycleMs / 1750;

    const tStage2Tracing = Math.round(250 * scale);
    const tStage3OutlineComplete = Math.round(950 * scale);
    const tStage4FillLayer1 = Math.round(1300 * scale);
    const tStage4FillLayer2 = Math.round(1400 * scale);
    const tStage4FillLayer3 = Math.round(1500 * scale);
    const tCycleEnd = Math.round(1750 * scale);

    const runCycle = () => {
      if (isCancelled) return;
      doneFiredRef.current = false;

      // Phase 1 — INITIAL (0.00 – 0.25s)
      setStage('initial');
      setOutlineColor(COLOR_INITIAL_OUTLINE);
      setFillOpacities([0, 0, 0]);

      // Phase 2 — TRACING (0.25 – 0.95s)
      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setStage('tracing');
        }, tStage2Tracing)
      );

      // Phase 3 — OUTLINE COMPLETE (0.95 – 1.30s)
      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setStage('outlineComplete');
          setOutlineColor(COLOR_COMPLETE_OUTLINE);
        }, tStage3OutlineComplete)
      );

      // Phase 4 — FILLED LOGO (1.30 – 1.75s) with ~100ms sequential stagger
      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setStage('filled');
          setFillOpacities([1, 0, 0]); // Layer 1 Top
        }, tStage4FillLayer1)
      );

      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setFillOpacities([1, 1, 0]); // Layer 2 Middle
        }, tStage4FillLayer2)
      );

      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setFillOpacities([1, 1, 1]); // Layer 3 Bottom
        }, tStage4FillLayer3)
      );

      // End of cycle check
      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          if (isComplete || !loading) {
            fireDoneOnce();
          } else {
            // Repeat cycle while loading
            runCycle();
          }
        }, tCycleEnd)
      );
    };

    runCycle();

    return () => {
      isCancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [loading, isComplete, loopDurationSeconds]);

  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      viewBox={LOGO_VIEW_BOX}
      width={size}
      height={size}
      className={`inline-block shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        overflow: 'visible',
      }}
    >
      {/* 1. Underlying Base Outlines for All Three Layers */}
      {OOPS_LOGO_PATHS.map((path, idx) => (
        <path
          key={`base-outline-${idx}`}
          d={path}
          fill="none"
          stroke={outlineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      ))}

      {/* 2. Phase 2 (TRACING): Cobalt-Blue Animated Stroke Tracing Upper Layer */}
      {stage === 'tracing' && (
        <path
          d={OOPS_LOGO_PATHS[0]}
          fill="none"
          stroke={COLOR_TRACING_STROKE}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.32 0.68"
          style={{
            animation: `oops-logo-trace-stroke ${
              (0.7 * (loopDurationSeconds / 1.75)).toFixed(2)
            }s linear forwards`,
          }}
        />
      )}

      {/* 3. Phase 4 (FILLED LOGO): Sequentially Faded Layer Fills */}
      {OOPS_LOGO_PATHS.map((path, idx) => (
        <path
          key={`fill-layer-${idx}`}
          d={path}
          fill={OOPS_LOGO_FILL_COLORS[idx]}
          stroke={stage === 'filled' || isStaticMode ? COLOR_COMPLETE_OUTLINE : 'none'}
          strokeWidth={stage === 'filled' || isStaticMode ? strokeWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: fillOpacities[idx],
            transition: `opacity ${fillFadeSeconds}s cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        />
      ))}
    </svg>
  );
};
