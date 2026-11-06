import React, { useState, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import {
  Maximize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
  Box,
  ArrowRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useVisualizationLabStore } from '../../visualizationStore';
import { VISUALIZATION_CATEGORIES } from '../../categoriesData';

export const LabBottomBar: React.FC = () => {
  const { fitView, getZoom } = useReactFlow();
  const {
    nodes,
    edges,
    activeCategoryId,
    currentStepIndex,
    totalSteps,
    isPlaying,
    stepForward,
    stepBackward,
    jumpToStep,
    togglePlay,
  } = useVisualizationLabStore();

  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    const updateZoom = () => {
      try {
        setZoomLevel(Math.round(getZoom() * 100));
      } catch {
        // Safe fallback
      }
    };
    updateZoom();
    const interval = setInterval(updateZoom, 500);
    return () => clearInterval(interval);
  }, [getZoom]);

  const activeCategory = VISUALIZATION_CATEGORIES.find((c) => c.id === activeCategoryId);
  const objectCount = nodes.filter((n) => n.data.entityType === 'object' || n.data.entityType === 'heap-object').length;
  const classCount = nodes.filter((n) => n.data.entityType === 'class').length;
  const relCount = edges.length;

  return (
    <footer className="h-11 px-4 bg-white border-t border-[#DCE2EA] flex items-center justify-between shrink-0 select-none font-mono text-xs z-20">
      {/* Left: Real Metrics (Objects, Classes, Relationships) */}
      <div className="flex items-center space-x-3 text-[11px] text-[#64748B]">
        <div className="flex items-center space-x-1.5 bg-[#FAFBFD] px-2 py-0.5 rounded border border-[#DCE2EA]">
          <Box className="w-3.5 h-3.5 text-[#1749C8]" />
          <span>
            <strong className="text-[#172033]">{objectCount}</strong> Objects
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#FAFBFD] px-2 py-0.5 rounded border border-[#DCE2EA]">
          <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>
            <strong className="text-[#172033]">{classCount}</strong> Classes
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#FAFBFD] px-2 py-0.5 rounded border border-[#DCE2EA]">
          <ArrowRight className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>
            <strong className="text-[#172033]">{relCount}</strong> Connectors
          </span>
        </div>

        {/* Current Visualization Module Badge */}
        <div className="hidden lg:flex items-center space-x-1 pl-1 text-[11px] text-[#172033]">
          <span className="text-[#94A3B8]">Module:</span>
          <span className="font-bold text-[#1749C8]">{activeCategory?.code || '02'}</span>
          <span className="truncate max-w-[200px]">{activeCategory?.title || 'Object Representation'}</span>
        </div>
      </div>

      {/* Center: Execution Step Scrubber & Playback */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-[#DCE2EA] rounded-md overflow-hidden bg-white">
          <button
            type="button"
            onClick={stepBackward}
            disabled={currentStepIndex <= 1}
            className="p-1 hover:bg-[#F1F4F8] disabled:opacity-40 disabled:hover:bg-transparent text-[#172033] transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="px-2 py-1 bg-[#FAFBFD] hover:bg-[#F1F4F8] text-[#1749C8] font-bold flex items-center space-x-1 border-x border-[#DCE2EA] transition-colors"
            title={isPlaying ? 'Pause Execution' : 'Play Execution Steps'}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-[#E11D48]" /> : <Play className="w-3 h-3" />}
            <span className="text-[10px] hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps}
            className="p-1 hover:bg-[#F1F4F8] disabled:opacity-40 disabled:hover:bg-transparent text-[#172033] transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-3 h-3" />
          </button>
        </div>

        {/* Step Slider & Position Indicator */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#FAFBFD] px-2.5 py-0.5 rounded border border-[#DCE2EA]">
          <Activity className="w-3 h-3 text-[#1749C8]" />
          <span className="text-[10.5px] text-[#64748B]">
            Step <strong className="text-[#172033]">{currentStepIndex}</strong> of {totalSteps}
          </span>
          <input
            type="range"
            min={1}
            max={totalSteps}
            value={currentStepIndex}
            onChange={(e) => jumpToStep(Number(e.target.value))}
            className="w-16 sm:w-24 h-1 bg-[#DCE2EA] rounded-lg appearance-none cursor-pointer accent-[#1749C8]"
          />
          {currentStepIndex === totalSteps && (
            <span className="flex items-center space-x-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>FINAL STATE</span>
            </span>
          )}
        </div>
      </div>

      {/* Right: Zoom Level & Fit-to-Content Action */}
      <div className="flex items-center space-x-2 text-[11px] text-[#64748B]">
        <span className="bg-[#FAFBFD] px-2 py-0.5 rounded border border-[#DCE2EA]">
          Zoom: <strong className="text-[#172033]">{zoomLevel}%</strong>
        </span>
        <button
          type="button"
          onClick={() => fitView({ padding: 0.22, duration: 400 })}
          className="flex items-center space-x-1 px-2 py-1 bg-white hover:bg-[#FAFBFD] border border-[#DCE2EA] hover:border-[#172033] rounded text-[#172033] transition-colors"
          title="Fit Diagram to Content"
        >
          <Maximize2 className="w-3 h-3 text-[#1749C8]" />
          <span className="hidden sm:inline">Fit View</span>
        </button>
      </div>
    </footer>
  );
};
