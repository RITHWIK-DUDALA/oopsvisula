import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export interface UseSmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  enabled?: boolean;
}

/**
 * useSmoothScroll
 * 
 * Delivers momentum-dampened 120fps smooth scrolling throughout the page.
 * Powered by Lenis with natural physics, easing, and seamless anchor targeting.
 */
export function useSmoothScroll({
  duration = 1.25,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel = true,
  syncTouch = false,
  enabled = true,
}: UseSmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Respect reduced motion accessibility preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration,
      easing,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel,
      syncTouch,
      touchMultiplier: 1.8,
      wheelMultiplier: 0.95,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to global window.__lenis for debugging/tools if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [duration, easing, smoothWheel, syncTouch, enabled]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset: number = 0, scrollDuration?: number) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset,
          duration: scrollDuration ?? duration,
          easing,
        });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [duration, easing]
  );

  return { lenisRef, scrollTo };
}

export default useSmoothScroll;

