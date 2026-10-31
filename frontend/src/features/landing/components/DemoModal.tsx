import React from 'react';
import { X, Play, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6] bg-[#FAFAFA]">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#111111] block">OOPS LAB Interactive Demo</span>
              <span className="text-[11px] text-[#6B7280] block font-mono">Real-time JVM Execution & Memory Inspection</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="relative aspect-video rounded-xl bg-[#111111] text-white flex flex-col items-center justify-center p-6 text-center space-y-3 overflow-hidden border border-[#27272A]">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-[#FFB05B]" />
            </div>
            <h3 className="font-bold text-lg">Interactive Java 21 Laboratory</h3>
            <p className="text-xs text-[#A1A1AA] max-w-md leading-relaxed">
              Experience deterministic JDI event simulation, inspect Stack Frames and Eden Heap instances, and trace pointer references in real time.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#6B7280]">Target Engine: Java 21 LTS</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#4B5563] hover:text-[#111111] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/playground');
                }}
                className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>Launch Full Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

