import React from 'react';
import { AnimatedOOPSLogo } from './AnimatedOOPSLogo';
import { RotateCw, ArrowLeft } from 'lucide-react';

export interface TransitionErrorProps {
  onRetry: () => void;
  onCancel: () => void;
}

export const TransitionError: React.FC<TransitionErrorProps> = ({ onRetry, onCancel }) => {
  return (
    <div
      role="alert"
      className="w-[min(426px,calc(100vw-40px))] min-h-[232px] px-7 py-8 bg-white border border-[#E8E8E8] rounded-[26px] flex flex-col items-center justify-center shadow-[0_22px_45px_rgba(30,30,20,0.12),0_4px_12px_rgba(30,30,20,0.04)] select-none text-center"
    >
      <AnimatedOOPSLogo phase="filled" size={50} />

      <div className="text-[16px] font-bold text-[#111111] tracking-tight mt-3">
        OOPS LAB
      </div>

      <p className="text-[13px] text-[#596078] font-mono mt-2 leading-relaxed">
        Unable to initialize the workspace.
        <br />
        Please try again.
      </p>

      <div className="flex items-center space-x-3 mt-5">
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#50566A] text-xs font-medium rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </button>
      </div>
    </div>
  );
};

