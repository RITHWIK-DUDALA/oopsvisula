import React from 'react';
import { cn } from '@/lib/utils';
import { Interactive3DCard } from '@/components/shared/Interactive3DCard';

export interface CloudCardSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'panel' | 'subtle';
  intensity?: 'subtle' | 'medium';
  interactive3D?: boolean;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glareOpacity?: number;
  glareSize?: number;
  borderGlow?: boolean;
  borderGlowColor?: string;
  borderGlowSize?: number;
  shadow3D?: boolean;
  stopPropagation?: boolean;
  contentClassName?: string;
  wrapperClassName?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
}

/**
 * CloudCardSurface / CloudSurface Component
 * 
 * Delivers the approved OOPS LAB frosted glassmorphic surface system across UI cards:
 * - High-end translucent frosted glass with soft backdrop blur (backdrop-blur-xl / backdrop-blur-lg)
 * - Refined specular highlights (inset_0_1px_1.5px_rgba(255,255,255,0.95))
 * - Crisp, clean, luminous white borders (border-white/70)
 * - Specular top-down glass shine reflection gradient
 * - Dynamic 3D interactive cursor-tracking tilt, specular glare physics, and multi-plane depth
 * - High text readability and dark charcoal typography with zero blur interference
 * - Allows the atmospheric blue sky to gently refract through with modern elegance
 */
export const CloudCardSurface: React.FC<CloudCardSurfaceProps> = ({
  variant = 'card',
  intensity: _intensity = 'medium',
  interactive3D = false,
  maxTilt,
  scale,
  perspective,
  glareOpacity,
  glareSize,
  borderGlow = true,
  borderGlowColor,
  borderGlowSize,
  shadow3D = true,
  stopPropagation = false,
  contentClassName,
  wrapperClassName,
  className,
  children,
  as: Component = 'div',
  ...rest
}) => {
  const isPanel = variant === 'panel';
  const isSubtle = variant === 'subtle';

  // Dynamic default parameters depending on surface type
  const effectiveMaxTilt = maxTilt !== undefined ? maxTilt : isPanel ? 5 : isSubtle ? 14 : 15;
  const effectiveScale = scale !== undefined ? scale : isPanel ? 1.008 : isSubtle ? 1.035 : 1.04;
  const effectivePerspective = perspective !== undefined ? perspective : isPanel ? 1100 : 850;
  const effectiveGlareOpacity = glareOpacity !== undefined ? glareOpacity : isPanel ? 0.22 : 0.42;
  const effectiveGlareSize = glareSize !== undefined ? glareSize : isPanel ? 500 : 360;

  const surfaceClasses = cn(
    'relative',
    // When NOT 3D interactive, use smooth CSS transitions for normal hover
    !interactive3D && 'transition-all duration-300',
    // Level 1: Outer section container panels (crystal translucent glassy frosted panel)
    isPanel && [
      'bg-gradient-to-b from-white/32 via-white/22 to-white/14 backdrop-blur-2xl backdrop-saturate-150',
      'border border-white/65',
      'shadow-[0_16px_40px_rgba(15,23,42,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.9)]',
    ],
    // Level 2: Individual content cards (translucent, transparent, luminous frosted glass card)
    !isPanel && !isSubtle && [
      'bg-gradient-to-b from-white/42 via-white/28 to-white/20 backdrop-blur-xl backdrop-saturate-150',
      'border border-white/75',
      'shadow-[0_10px_30px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.02),inset_0_1px_1.5px_rgba(255,255,255,0.95)]',
      !interactive3D && 'hover:from-white/48 hover:via-white/34 hover:to-white/24 hover:border-white hover:shadow-[0_20px_48px_rgba(15,23,42,0.08),inset_0_1px_1.5px_rgba(255,255,255,1)]',
    ],
    // Level 3: Subtle technical / sub-panel elements (high transparency frosted sub-surface)
    isSubtle && [
      'bg-gradient-to-b from-white/34 to-white/20 backdrop-blur-lg backdrop-saturate-150',
      'border border-white/65',
      'shadow-[0_4px_16px_rgba(15,23,42,0.02),inset_0_1px_0_rgba(255,255,255,0.85)]',
      !interactive3D && 'hover:border-white/80 hover:bg-white/35',
    ],
    className
  );

  const innerContent = (
    <>
      {/* Specular glass reflection layer */}
      <div 
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent rounded-[inherit] z-0 overflow-hidden" 
        aria-hidden="true" 
      />
      
      <div className={cn("relative z-10 w-full h-full", !interactive3D && contentClassName)}>
        {children}
      </div>
    </>
  );

  if (interactive3D) {
    return (
      <Interactive3DCard
        maxTilt={effectiveMaxTilt}
        scale={effectiveScale}
        perspective={effectivePerspective}
        glareOpacity={effectiveGlareOpacity}
        glareSize={effectiveGlareSize}
        borderGlow={borderGlow}
        borderGlowColor={borderGlowColor}
        borderGlowSize={borderGlowSize}
        shadow3D={shadow3D}
        stopPropagation={stopPropagation}
        contentClassName={contentClassName}
        wrapperClassName={wrapperClassName}
        className={surfaceClasses}
        {...rest}
      >
        {innerContent}
      </Interactive3DCard>
    );
  }

  return (
    <Component className={surfaceClasses} {...rest}>
      {innerContent}
    </Component>
  );
};

// Aliases for compatibility across the codebase
export const CloudSurface = CloudCardSurface;
export type CloudSurfaceProps = CloudCardSurfaceProps;
export default CloudCardSurface;
