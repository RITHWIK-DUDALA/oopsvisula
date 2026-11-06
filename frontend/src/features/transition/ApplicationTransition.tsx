import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingCard } from './LoadingCard';
import { TransitionError } from './TransitionError';

export interface TransitionStage {
  timeMs: number;
  text: string;
  isComplete?: boolean;
}

export interface ApplicationTransitionProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel?: () => void;
  targetRoute?: string;
  title?: string;
  subtitle?: string;
  initialStatus?: string;
  stages?: TransitionStage[];
  durationMs?: number;
  backdropVariant?: 'warm' | 'minimal' | 'translucent';
}

/**
 * Application Transition Overlay
 * Implements stageshow motion choreography:
 * - Clean arrival curve: cubic-bezier(0.25, 0.8, 0.25, 1)
 * - Soft departure travel: cubic-bezier(0.45, 0, 0.1, 1)
 * - Coordinated phase sequencing driving the three-layer stacked LogoTraceLoader
 * - Failsafe timeout to guarantee no stuck states
 */
export const ApplicationTransition: React.FC<ApplicationTransitionProps> = ({
  isOpen,
  onComplete,
  onCancel,
  title,
  subtitle,
  initialStatus,
  stages,
  durationMs,
  backdropVariant = 'warm',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState(initialStatus || 'Preparing OOPS LAB Workspace...');
  const [hasError, setHasError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 280);
  };

  const startSequence = () => {
    completedRef.current = false;
    setHasError(false);
    setIsExiting(false);

    // Respect prefers-reduced-motion: immediate readiness
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false);
      setIsComplete(true);
      const readyText = stages && stages.length > 0 ? stages[stages.length - 1].text : 'Workspace Ready';
      setStatusText(readyText);
      const timer = setTimeout(() => {
        handleFinish();
      }, 300);
      return () => clearTimeout(timer);
    }

    const startingText = initialStatus || (stages && stages.length > 0 ? stages[0].text : 'Preparing OOPS LAB Workspace...');
    setIsLoading(true);
    setIsComplete(false);
    setStatusText(startingText);

    const timers: NodeJS.Timeout[] = [];

    if (stages && stages.length > 0) {
      // Dynamic custom stages (e.g. Concept Page / Concept Detail Page)
      stages.forEach((stage) => {
        timers.push(
          setTimeout(() => {
            setStatusText(stage.text);
            if (stage.isComplete) {
              setIsComplete(true);
              setIsLoading(false);
            }
          }, stage.timeMs)
        );
      });

      const totalDuration = durationMs || Math.max(stages[stages.length - 1].timeMs + 300, 1200);
      timers.push(
        setTimeout(() => {
          handleFinish();
        }, totalDuration)
      );
    } else {
      // Default standard sequence (Landing Page / Global App entry)
      // Stage 1 -> 2: Java 21 Environment (550ms)
      timers.push(
        setTimeout(() => {
          setStatusText('Initializing Java 21 Environment...');
        }, 550)
      );

      // Stage 2 -> 3: Execution Laboratory (1150ms)
      timers.push(
        setTimeout(() => {
          setStatusText('Preparing Execution Laboratory...');
        }, 1150)
      );

      // Stage 3 -> 4: Completion trigger -> triggers closingOutline and three-blue fill fade (1750ms)
      timers.push(
        setTimeout(() => {
          setIsComplete(true);
          setIsLoading(false);
          setStatusText('Loading Learning Workspace...');
        }, 1750)
      );

      // Stage 4 -> 5: Final readiness status confirmation (2250ms)
      timers.push(
        setTimeout(() => {
          setStatusText('Workspace Ready');
        }, 2250)
      );

      // Stage 5 -> 6: Hard fallback guarantee (3400ms)
      timers.push(
        setTimeout(() => {
          handleFinish();
        }, 3400)
      );
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  };

  useEffect(() => {
    if (!isOpen) {
      completedRef.current = false;
      setIsExiting(false);
      return;
    }

    const cleanup = startSequence();
    return () => {
      cleanup?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const backdropStyle =
    backdropVariant === 'translucent'
      ? {
          background: 'rgba(250, 250, 250, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }
      : backdropVariant === 'minimal'
      ? {
          background: '#FAFAFA',
        }
      : {
          background: `
            radial-gradient(circle at 50% 45%, rgba(255, 248, 220, 0.96) 0%, rgba(255, 244, 205, 0.90) 45%, rgba(255, 249, 232, 0.98) 100%)
          `,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Initializing JVM Laboratory Workspace"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.45, 0, 0.1, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none pointer-events-auto"
        style={backdropStyle}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.97 : 1, y: isExiting ? -8 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
        >
          {hasError ? (
            <TransitionError
              onRetry={startSequence}
              onCancel={() => onCancel?.()}
            />
          ) : (
            <LoadingCard
              loading={isLoading}
              isComplete={isComplete}
              status={statusText}
              title={title}
              subtitle={subtitle}
              onDone={handleFinish}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
