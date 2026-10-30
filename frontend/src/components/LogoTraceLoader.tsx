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

type LoaderPhase = 'loop' | 'closingOutline' | 'fadingFill' | 'done';

const LOGO_VIEW_BOX = '0 0 24 24';

// Single clean continuous outer contour around the logo silhouette
const TRACE_PATH = 'M 12 2 L 22 7 L 22 17 L 12 22 L 2 17 L 2 7 Z';

// Clean filled vector shapes matching the logo mark
const FILL_PATHS = [
  'M 12 2 L 22 7 L 12 12 L 2 7 Z',
  'M 2 12 L 12 17 L 22 12 L 22 14 L 12 19 L 2 14 Z',
  'M 2 17 L 12 22 L 22 17 L 22 19 L 12 24 L 2 19 Z',
] as const;

export const LogoTraceLoader: React.FC<LogoTraceLoaderProps> = ({
  loading = true,
  isComplete = false,
  size = 40,
  strokeWidth = 2,
  loopDurationSeconds = 1.6,
  fillFadeSeconds = 0.35,
  className = '',
  ariaLabel = 'Loading...',
  onDone,
}) => {
  const [phase, setPhase] = useState<LoaderPhase>(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return 'done';
    }
    return !loading || isComplete ? 'closingOutline' : 'loop';
  });

  const [fillOpacity, setFillOpacity] = useState(phase === 'done' ? 1 : 0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneFiredRef = useRef(false);

  // Fallback safety timeout reference
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fireDoneOnce = () => {
    if (!doneFiredRef.current) {
      doneFiredRef.current = true;
      onDoneRef.current?.();
    }
  };

  useEffect(() => {
    // Respect prefers-reduced-motion immediately
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      setFillOpacity(1);
      fireDoneOnce();
      return;
    }

    const shouldResolve = isComplete || !loading;

    if (shouldResolve && phase === 'loop') {
      // 1. Transition from loop to closing outline
      setPhase('closingOutline');

      const closingDurationMs = 300;
      timeoutRef.current = setTimeout(() => {
        // 2. Transition from closed outline to fading fill
        setPhase('fadingFill');
        requestAnimationFrame(() => {
          setFillOpacity(1);
        });

        const fillFadeMs = fillFadeSeconds * 1000;
        timeoutRef.current = setTimeout(() => {
          // 3. Complete and resolve
          setPhase('done');
          fireDoneOnce();
        }, fillFadeMs);
      }, closingDurationMs);
    } else if (!shouldResolve && (phase === 'done' || phase === 'closingOutline' || phase === 'fadingFill')) {
      // Reset back to looping if loading is restarted
      doneFiredRef.current = false;
      setPhase('loop');
      setFillOpacity(0);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, isComplete, phase, fillFadeSeconds]);

  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      viewBox={LOGO_VIEW_BOX}
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Faint Track */}
      <g opacity="0.18">
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={Math.max(1, strokeWidth / 2)}
          strokeLinejoin="round"
        />
        <path
          d="M 2 12 L 12 17 L 22 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={Math.max(1, strokeWidth / 2)}
          strokeLinejoin="round"
        />
        <path
          d="M 2 17 L 12 22 L 22 17"
          fill="none"
          stroke="currentColor"
          strokeWidth={Math.max(1, strokeWidth / 2)}
          strokeLinejoin="round"
        />
      </g>

      {/* Active Animated Looping Trace */}
      {phase === 'loop' && (
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.16 0.84"
          style={{
            animation: `logo-trace-loader-loop ${loopDurationSeconds}s linear infinite`,
          }}
        />
      )}

      {/* Closing Outline Transition */}
      {phase === 'closingOutline' && (
        <path
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: '1 0',
            transition: 'stroke-dasharray 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      )}

      {/* Fading Fill and Final Resolved State */}
      {(phase === 'fadingFill' || phase === 'done') && (
        <g
          style={{
            opacity: fillOpacity,
            transition: `opacity ${fillFadeSeconds}s ease-in-out`,
          }}
        >
          {FILL_PATHS.map((path) => (
            <path key={path} d={path} fill="currentColor" />
          ))}
        </g>
      )}
    </svg>
  );
};

