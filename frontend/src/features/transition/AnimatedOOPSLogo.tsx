import React from 'react';
import { LogoTraceLoader } from '@/components/LogoTraceLoader';

export type LogoAnimationPhase = 'loop' | 'closing' | 'filled';

export interface AnimatedOOPSLogoProps {
  phase: LogoAnimationPhase;
  size?: number;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Re-routes any reference to the legacy AnimatedOOPSLogo to the approved
 * three-layer stacked geometric LogoTraceLoader component.
 * Prevents the rejected hexagonal loader from ever returning.
 */
export const AnimatedOOPSLogo: React.FC<AnimatedOOPSLogoProps> = ({
  phase,
  size = 60,
  strokeWidth = 3.5,
  className = '',
  ariaLabel = 'OOPS LAB Logo',
}) => {
  return (
    <LogoTraceLoader
      loading={phase === 'loop'}
      isComplete={phase === 'closing' || phase === 'filled'}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
};
