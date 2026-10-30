import React, { useEffect, useState } from 'react';
import { LogoTraceLoader } from '@/components/LogoTraceLoader';

export interface SkeletonLoadingPageProps {
  durationSeconds?: number;
  onFinished?: () => void;
}

export const SkeletonLoadingPage: React.FC<SkeletonLoadingPageProps> = ({
  durationSeconds = 2.5,
  onFinished,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fadeOutDelay = Math.max(100, Math.round(durationSeconds * 1000) - 300);
    const totalDelay = Math.round(durationSeconds * 1000);

    const fadeTimer = setTimeout(() => {
      setIsExiting(true);
    }, fadeOutDelay);

    const finishTimer = setTimeout(() => {
      setIsMounted(false);
      onFinished?.();
    }, totalDelay);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationSeconds, onFinished]);

  if (!isMounted) return null;

  return (
    <div
      aria-label="Loading workspace"
      aria-busy="true"
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 ease-out select-none flex overflow-hidden pointer-events-none ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Sidebar Skeleton (256px wide) */}
      <aside className="w-64 border-r border-border bg-white flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="h-14 px-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-md skeleton-shimmer shrink-0" />
            <div className="w-20 h-4 rounded skeleton-shimmer" />
          </div>
          <div className="w-5 h-5 rounded skeleton-shimmer" />
        </div>

        {/* Main Nav Skeleton */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-hidden">
          {/* Section 1: Laboratory */}
          <div className="space-y-2">
            <div className="w-16 h-3 rounded skeleton-shimmer mb-2" />
            <div className="space-y-1.5">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 px-2.5 py-2 rounded-lg"
                >
                  <div className="w-4 h-4 rounded skeleton-shimmer shrink-0" />
                  <div
                    className="h-3.5 rounded skeleton-shimmer"
                    style={{ width: `${60 + ((i * 13) % 40)}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Preferences */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <div className="w-20 h-3 rounded skeleton-shimmer mb-2" />
            <div className="space-y-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 px-2.5 py-2 rounded-lg"
                >
                  <div className="w-4 h-4 rounded skeleton-shimmer shrink-0" />
                  <div
                    className="h-3.5 rounded skeleton-shimmer"
                    style={{ width: `${55 + ((i * 17) % 35)}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Engine Card Skeleton */}
        <div className="p-3 border-t border-border">
          <div className="border border-border rounded-lg p-2.5 space-y-2 bg-surface">
            <div className="flex items-center justify-between">
              <div className="w-20 h-3.5 rounded skeleton-shimmer" />
              <div className="w-12 h-3.5 rounded skeleton-shimmer" />
            </div>
            <div className="w-full h-2.5 rounded skeleton-shimmer" />
          </div>
        </div>
      </aside>

      {/* Main Workspace Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Top Header Skeleton */}
        <header className="h-14 px-6 border-b border-border bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-3.5 rounded skeleton-shimmer" />
            <span className="text-muted-foreground/40">/</span>
            <div className="w-24 h-3.5 rounded skeleton-shimmer" />
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-44 h-8 rounded-lg skeleton-shimmer hidden md:block" />
            <div className="w-24 h-8 rounded-lg skeleton-shimmer" />
            <div className="w-20 h-8 rounded-lg skeleton-shimmer" />
          </div>
        </header>

        {/* Content Body Skeleton */}
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Welcome Banner Skeleton */}
          <div className="p-6 bg-white border border-border rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="w-32 h-3 rounded skeleton-shimmer" />
                <div className="w-64 h-6 rounded skeleton-shimmer" />
                <div className="w-80 h-3.5 rounded skeleton-shimmer" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-8 rounded-lg skeleton-shimmer" />
                <div className="w-16 h-8 rounded-lg skeleton-shimmer" />
                <div className="w-32 h-8 rounded-lg skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* 4-Card Metric Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white border border-border rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-24 h-3 rounded skeleton-shimmer" />
                  <div className="w-4 h-4 rounded skeleton-shimmer" />
                </div>
                <div className="w-16 h-7 rounded skeleton-shimmer" />
                <div className="w-32 h-2.5 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>

          {/* Main Workspace Split Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main View (8 cols) */}
            <div className="lg:col-span-8 p-6 bg-white border border-border rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="w-40 h-4 rounded skeleton-shimmer" />
                <div className="w-16 h-3 rounded skeleton-shimmer" />
              </div>

              {/* Code / Visualizer simulation lines */}
              <div className="space-y-3 py-2">
                {[80, 50, 65, 45, 90, 70, 35, 60, 75, 40].map((w, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-3 rounded skeleton-shimmer shrink-0 opacity-50" />
                    <div
                      className="h-3.5 rounded skeleton-shimmer"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Panel (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-white border border-border rounded-xl space-y-4">
              <div className="w-32 h-4 rounded skeleton-shimmer pb-1" />
              <div className="space-y-3">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-border rounded-lg bg-surface/50 space-y-2"
                  >
                    <div className="w-28 h-3 rounded skeleton-shimmer" />
                    <div className="w-full h-2.5 rounded skeleton-shimmer" />
                    <div className="w-4/5 h-2.5 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Center Floating Initialization Badge */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 bg-foreground text-background px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-3 border border-border/20 backdrop-blur-md">
        <LogoTraceLoader size={20} strokeWidth={2.2} loopDurationSeconds={1.2} />
        <span className="text-xs font-mono font-medium tracking-tight">
          Bootstrapping Java 21 Laboratory...
        </span>
        <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{
              animation: `skeleton-progress ${durationSeconds}s linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
