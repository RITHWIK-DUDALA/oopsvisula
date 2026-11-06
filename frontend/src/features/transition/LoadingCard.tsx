import React from 'react';
import { LogoTraceLoader } from '@/components/LogoTraceLoader';

export interface LoadingCardProps {
  loading?: boolean;
  isComplete?: boolean;
  status: string;
  title?: string;
  subtitle?: string;
  onDone?: () => void;
}

/**
 * Centered Loading Card following production specification:
 * 1. Animated three-layer OOPS LAB logo.
 * 2. OOPS LAB (title).
 * 3. JVM Laboratory (subtitle).
 * 4. Concise loading message (e.g. Preparing OOPS LAB Workspace...).
 * 
 * Compact white card with rounded corners, subtle border, and soft shadow.
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({
  loading = true,
  isComplete = false,
  status,
  title,
  subtitle,
  onDone,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-[min(400px,calc(100vw-40px))] min-h-[220px] px-8 py-8 bg-white border border-[#E5E7EB] rounded-[24px] flex flex-col items-center justify-center shadow-[0_20px_48px_-12px_rgba(20,25,40,0.08),0_4px_12px_-2px_rgba(20,25,40,0.03)] select-none text-center"
    >
      {/* 1. Animated Three-Layer OOPS LAB Logo */}
      <LogoTraceLoader
        loading={loading}
        isComplete={isComplete}
        size={64}
        strokeWidth={3}
        loopDurationSeconds={1.75}
        fillFadeSeconds={0.45}
        onDone={onDone}
      />

      {/* 2. Brand Title */}
      <div className="text-lg font-bold text-[#111111] tracking-tight mt-4 select-none">
        {title || 'OOPS LAB'}
      </div>

      {/* 3. Subtitle */}
      <div className="text-xs font-mono text-[#64748B] mt-0.5 select-none">
        {subtitle || 'JVM Laboratory'}
      </div>

      {/* 4. Concise Loading Status */}
      <div className="mt-4 text-xs font-mono text-[#71717A] max-w-[280px] truncate">
        {status || 'Preparing OOPS LAB Workspace...'}
      </div>
    </div>
  );
};
