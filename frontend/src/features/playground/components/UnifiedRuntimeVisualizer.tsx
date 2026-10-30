import React from 'react';
import {
  Layers,
  Share2,
  Database,
  Cpu,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { StackHeapView } from './StackHeapView';
import { ObjectGraphView } from './ObjectGraphView';
import { MemoryMapView } from './MemoryMapView';

export const UnifiedRuntimeVisualizer: React.FC = () => {
  const { runtimeView, setRuntimeView, getCurrentEvent } = useSimulationStore();
  const event = getCurrentEvent();

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden select-none">
      {/* Header with View Tabs per Section 9 */}
      <div className="h-10 px-4 border-b border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-[#171717] stroke-[1.5]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
            Runtime Visualizer
          </span>
          {event && (
            <>
              <span className="text-[#D8D8D8]">•</span>
              <span className="text-xs font-mono text-[#777777]">
                Step {event.step} ({event.type})
              </span>
            </>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-white border border-[#E8E8E8] rounded-md p-0.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setRuntimeView('stack-heap')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
              runtimeView === 'stack-heap'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            <Layers className="w-3 h-3 stroke-[1.5]" />
            <span>Stack + Heap</span>
          </button>

          <button
            type="button"
            onClick={() => setRuntimeView('object-graph')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
              runtimeView === 'object-graph'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            <Share2 className="w-3 h-3 stroke-[1.5]" />
            <span>Object Graph</span>
          </button>

          <button
            type="button"
            onClick={() => setRuntimeView('memory-map')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
              runtimeView === 'memory-map'
                ? 'bg-[#171717] text-white font-semibold shadow-xs'
                : 'text-[#777777] hover:text-[#171717]'
            }`}
          >
            <Database className="w-3 h-3 stroke-[1.5]" />
            <span>Memory Map</span>
          </button>
        </div>
      </div>

      {/* View Canvas Body */}
      <div className="flex-1 overflow-hidden relative">
        {runtimeView === 'stack-heap' && <StackHeapView />}
        {runtimeView === 'object-graph' && <ObjectGraphView />}
        {runtimeView === 'memory-map' && <MemoryMapView />}
      </div>
    </div>
  );
};
