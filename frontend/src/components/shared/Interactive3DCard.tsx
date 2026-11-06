import React, { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface Interactive3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareColor?: string;
  glareSize?: number;
  glareOpacity?: number;
  borderGlow?: boolean;
  borderGlowColor?: string;
  borderGlowSize?: number;
  shadow3D?: boolean;
  tiltReverse?: boolean;
  preserve3D?: boolean;
  disabled?: boolean;
  stopPropagation?: boolean;
  contentClassName?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Interactive3DCard
 * 
 * High-performance 3D perspective card with:
 * - Direct DOM-level transform updates via RAF for responsive 120fps tracking
 * - Smooth physics: instant cursor tracking + spring cubic-bezier return on mouse leave
 * - True 3D spatial tilt (rotateX, rotateY, scale3d)
 * - Dynamic cursor-following specular glare sheen overlay
 * - Dynamic cursor-following radiant border spotlight
 * - Dynamic opposite-direction 3D drop-shadow lighting with realistic cast distance
 * - Tactile active-press feedback on mousedown / touch
 * - True multi-layer 3D depth preservation (children with translateZ float in real parallax)
 * - Event propagation control for nested cards
 */
export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  maxTilt = 15,
  scale = 1.04,
  perspective = 900,
  glare = true,
  glareColor = 'rgba(255, 255, 255, 0.55)',
  glareSize = 360,
  glareOpacity = 0.45,
  borderGlow = true,
  borderGlowColor = 'rgba(255, 255, 255, 0.95)',
  borderGlowSize = 280,
  shadow3D = true,
  tiltReverse = false,
  preserve3D = true,
  disabled = false,
  stopPropagation = false,
  contentClassName,
  wrapperClassName,
  children,
  className,
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const isHovered = useRef<boolean>(false);
  const isPressed = useRef<boolean>(false);

  const updateCardTransform = useCallback(
    (clientX: number, clientY: number, immediate: boolean = false) => {
      if (!cardRef.current || !wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mult = tiltReverse ? -1 : 1;
      const normX = Math.max(-1, Math.min(1, (x - centerX) / (centerX || 1)));
      const normY = Math.max(-1, Math.min(1, (y - centerY) / (centerY || 1)));

      const rotateX = (-normY * maxTilt * mult).toFixed(2);
      const rotateY = (normX * maxTilt * mult).toFixed(2);
      const currentScale = isPressed.current ? scale * 0.98 : scale;

      // Apply true 3D spatial rotation & scale
      cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${currentScale}, ${currentScale}, 1)`;
      cardRef.current.style.transition = immediate
        ? 'transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s cubic-bezier(0.23, 1, 0.32, 1)'
        : 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.08s cubic-bezier(0.16, 1, 0.3, 1)';

      // Opposite-direction dynamic 3D drop shadow
      if (shadow3D) {
        const shadowX = (-normX * 22).toFixed(1);
        const shadowY = (normY * 20 + 20).toFixed(1);
        const shadowBlur = (Math.hypot(normX, normY) * 24 + 28).toFixed(1);
        cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(15, 23, 42, 0.13), 0 4px 14px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)`;
      }

      // Specular glare position & opacity
      if (glare && glareRef.current) {
        glareRef.current.style.opacity = `${glareOpacity}`;
        glareRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }

      // Dynamic radiant border spotlight
      if (borderGlow && borderGlowRef.current) {
        borderGlowRef.current.style.opacity = '1';
        borderGlowRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    },
    [maxTilt, tiltReverse, scale, shadow3D, glare, glareOpacity, borderGlow]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      onMouseMove?.(e);
      if (disabled || !cardRef.current || !wrapperRef.current) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        updateCardTransform(clientX, clientY, false);
      });
    },
    [disabled, stopPropagation, onMouseMove, updateCardTransform]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      isHovered.current = true;
      onMouseEnter?.(e);
      if (disabled || !cardRef.current || !wrapperRef.current) return;

      // Immediately lift and calculate initial 3D pose on entrance
      updateCardTransform(e.clientX, e.clientY, true);
    },
    [disabled, stopPropagation, onMouseEnter, updateCardTransform]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      isHovered.current = false;
      isPressed.current = false;
      onMouseLeave?.(e);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (!cardRef.current) return;

      // Smooth organic spring return to rest
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      if (shadow3D) {
        cardRef.current.style.boxShadow = '';
      }

      if (glare && glareRef.current) {
        glareRef.current.style.opacity = '0';
      }

      if (borderGlow && borderGlowRef.current) {
        borderGlowRef.current.style.opacity = '0';
      }
    },
    [shadow3D, glare, borderGlow, stopPropagation, onMouseLeave]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      isPressed.current = true;
      onMouseDown?.(e);
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.08s ease-out';
      }
    },
    [stopPropagation, onMouseDown]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      isPressed.current = false;
      onMouseUp?.(e);
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
      }
    },
    [stopPropagation, onMouseUp]
  );

  return (
    <div
      ref={wrapperRef}
      className={cn('relative', wrapperClassName)}
      style={{
        perspective: `${perspective}px`,
        transformStyle: preserve3D ? 'preserve-3d' : 'flat',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={cn(
          'relative group select-none',
          preserve3D ? '[transform-style:preserve-3d]' : '',
          className
        )}
        style={{
          ...style,
          transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          willChange: 'transform, box-shadow',
        }}
        {...props}
      >
        {/* Dynamic Radiant Border Spotlight Overlay */}
        {borderGlow && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden p-[1px] z-20"
            aria-hidden="true"
          >
            <div
              ref={borderGlowRef}
              className="absolute rounded-full pointer-events-none opacity-0 transition-opacity duration-300 blur-xs"
              style={{
                width: `${borderGlowSize}px`,
                height: `${borderGlowSize}px`,
                background: `radial-gradient(circle, ${borderGlowColor} 0%, rgba(255,255,255,0.2) 40%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* 3D Content Container with true Z-plane depth preservation */}
        <div
          className={cn(
            'w-full h-full relative z-10',
            preserve3D ? '[transform-style:preserve-3d]' : '',
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Dynamic Specular Glare / Sheen Overlay */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
            aria-hidden="true"
          >
            <div
              ref={glareRef}
              className="absolute rounded-full pointer-events-none blur-sm opacity-0 transition-opacity duration-200"
              style={{
                width: `${glareSize}px`,
                height: `${glareSize}px`,
                background: `radial-gradient(circle, ${glareColor} 0%, rgba(255,255,255,0.08) 55%, transparent 100%)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Interactive3DCard;
