import React, { useRef, useEffect } from 'react';
import { 
  Box, 
  ArrowRight, 
  Layers, 
  CornerDownRight, 
  Activity, 
  RefreshCw, 
  AlertTriangle
} from 'lucide-react';
import { ExecutionEvent } from '@/types/execution';

interface LiveEventTimelineProps {
  events: ExecutionEvent[];
  currentStepIndex: number;
  onGoToStep: (stepIndex: number) => void;
}

export const LiveEventTimeline: React.FC<LiveEventTimelineProps> = ({
  events,
  currentStepIndex,
  onGoToStep,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll timeline to keep current event chip centered
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentStepIndex]);

  if (!events || events.length === 0) return null;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'OBJECT_ALLOCATED':
        return <Box className="w-3 h-3 text-emerald-600" />;
      case 'FIELD_MUTATED':
        return <ArrowRight className="w-3 h-3 text-amber-600" />;
      case 'FRAME_PUSH':
        return <Layers className="w-3 h-3 text-violet-600" />;
      case 'FRAME_POP':
        return <CornerDownRight className="w-3 h-3 text-neutral-500" />;
      case 'LOOP_ITERATION':
        return <RefreshCw className="w-3 h-3 text-purple-600" />;
      case 'EXCEPTION_THROWN':
        return <AlertTriangle className="w-3 h-3 text-rose-600" />;
      default:
        return <Activity className="w-3 h-3 text-blue-600" />;
    }
  };

  return (
    <div className="h-14 border-t border-border bg-neutral-50 px-3 flex items-center shrink-0 overflow-hidden font-sans select-none">
      <div className="text-[11px] font-mono font-bold text-foreground pr-3 shrink-0 border-r border-border flex items-center space-x-1.5">
        <Activity className="w-3.5 h-3.5 text-blue-600" />
        <span>Timeline</span>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 px-2"
      >
        {events.map((ev, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={idx}
              data-active={isActive ? 'true' : 'false'}
              onClick={() => onGoToStep(idx)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-[10.5px] font-mono transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-foreground text-background font-bold shadow-2xs scale-105 ring-2 ring-blue-500/30'
                  : isPassed
                  ? 'bg-white hover:bg-neutral-100 text-foreground/80 border border-border'
                  : 'bg-neutral-100 text-muted-foreground/80 border border-transparent hover:border-border'
              }`}
              title={`Step ${idx + 1}: ${ev.type} at line ${ev.line} (${ev.methodName})`}
            >
              <span>{getEventIcon(ev.type)}</span>
              <span>#{idx + 1}</span>
              {ev.line > 0 && <span className="opacity-70 text-[9.5px]">L{ev.line}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
