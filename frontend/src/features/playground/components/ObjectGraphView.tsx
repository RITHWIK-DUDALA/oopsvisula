import React, { useState } from 'react';
import {
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { HeapObjectSnapshot } from '@/types/execution';

export const ObjectGraphView: React.FC = () => {
  const {
    getCurrentEvent,
    getReferencePointers,
    selectedObjectId,
    setSelectedObjectId,
  } = useSimulationStore();

  const [zoom, setZoom] = useState(1);
  const event = getCurrentEvent();
  const pointers = getReferencePointers();

  if (!event || event.heapObjects.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-10 h-10 rounded-md bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center text-[#777777] mb-3">
          <Share2 className="w-5 h-5 stroke-[1.5]" />
        </div>
        <h4 className="text-xs font-mono font-bold text-[#171717]">
          No Object Graph Available
        </h4>
        <p className="text-[11px] text-[#777777] max-w-xs mt-1">
          No instances are currently allocated in the Eden heap to generate a reference topology graph.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden select-none">
      {/* Graph Toolbar */}
      <div className="h-9 px-4 border-b border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <Share2 className="w-3.5 h-3.5 text-[#171717] stroke-[1.5]" />
          <span className="font-bold text-[#171717]">Runtime Object Graph</span>
          <span className="text-[#D8D8D8]">•</span>
          <span className="text-[#777777]">
            {event.heapObjects.length} Nodes • {pointers.length} Reference Edges
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
            className="p-1 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <span className="text-[10px] font-mono text-[#777777] w-8 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))}
            className="p-1 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="p-1 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[radial-gradient(#E8E8E8_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          className="flex flex-wrap items-center justify-center gap-8 max-w-4xl transition-transform duration-150"
        >
          {event.heapObjects.map((obj: HeapObjectSnapshot) => {
            const isSelected = selectedObjectId === obj.address;
            const incomingPointers = pointers.filter(
              (p) => p.targetAddress === obj.address
            );

            return (
              <div
                key={obj.address}
                onClick={() =>
                  setSelectedObjectId(isSelected ? null : obj.address)
                }
                className={`w-64 p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#171717] shadow-md ring-2 ring-[#171717]'
                    : 'bg-white border-[#E8E8E8] shadow-xs hover:border-[#171717]/60'
                }`}
              >
                {/* Node Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E8E8]">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-[10px] font-mono font-bold bg-[#171717] text-white px-1.5 py-0.5 rounded">
                      {obj.address}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#171717] truncate">
                      {obj.className}
                    </span>
                  </div>
                </div>

                {/* Node Fields */}
                <div className="space-y-1 text-xs font-mono">
                  {obj.fields.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between py-0.5 text-[11px]"
                    >
                      <span className="text-[#666666]">{f.name}:</span>
                      <span className="font-semibold text-[#171717]">
                        {String(f.value)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Inbound References */}
                {incomingPointers.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#E8E8E8]">
                    <div className="text-[10px] font-mono uppercase text-[#999999] mb-1">
                      Referenced By:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {incomingPointers.map((p, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FAFAFA] border border-[#E8E8E8] text-[10px] font-mono text-[#171717]"
                        >
                          <span>{p.sourceVarName || p.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

