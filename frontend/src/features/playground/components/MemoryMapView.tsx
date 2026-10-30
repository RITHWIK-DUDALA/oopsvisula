import React from 'react';
import {
  Layers,
  Box,
  Cpu,
  Info,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

export const MemoryMapView: React.FC = () => {
  const { getCurrentEvent, currentTrace } = useSimulationStore();
  const event = getCurrentEvent();

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-y-auto select-none p-5 space-y-5">
      {/* Educational Notice Banner */}
      <div className="p-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md flex items-start space-x-2 text-xs">
        <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5 stroke-[1.5]" />
        <div className="space-y-0.5">
          <span className="font-semibold text-[#171717] block">
            Logical Educational Memory Architecture
          </span>
          <p className="text-[11px] text-[#777777] leading-relaxed">
            This visualization presents the logical organization of JVM runtime memory areas (JLS §12 & JVMS §2.5), illustrating the separation between class bytecode metadata, thread execution stacks, and dynamically allocated heap objects.
          </p>
        </div>
      </div>

      {/* 3 JVM Memory Regions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Region 1: Metaspace (Native Memory) */}
        <div className="p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E8]">
            <span className="flex items-center space-x-1.5 font-bold text-xs font-mono text-[#171717]">
              <Cpu className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Metaspace (Native)</span>
            </span>
            <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8E8E8] text-[#777777]">
              Class Metadata
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-white border border-[#E8E8E8] rounded space-y-1">
              <span className="font-bold text-[#171717] block text-[11px]">
                {currentTrace.programTitle.split(' ')[0]} Type Blueprint
              </span>
              <p className="text-[10px] text-[#777777] leading-relaxed">
                Loaded bytecode, method descriptors, constant pool references, and static class fields.
              </p>
            </div>
            <div className="p-2 bg-white/70 border border-[#E8E8E8] rounded text-[10px] text-[#777777]">
              vtable entries registered for dynamic dispatch.
            </div>
          </div>
        </div>

        {/* Region 2: Thread Call Stack (LIFO) */}
        <div className="p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E8]">
            <span className="flex items-center space-x-1.5 font-bold text-xs font-mono text-[#171717]">
              <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>JVM Thread Stack</span>
            </span>
            <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8E8E8] text-[#777777]">
              {event?.stackFrames.length || 0} Frames
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {event?.stackFrames.map((frame, i) => (
              <div
                key={frame.frameId}
                className="p-2.5 bg-white border border-[#E8E8E8] rounded space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-[#171717] text-[11px]">
                  <span>{frame.methodName}</span>
                  <span className="text-[#999999] font-normal">#{i + 1}</span>
                </div>
                <div className="text-[10px] text-[#777777]">
                  {frame.localVariables.length} variable slot(s) allocated
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Region 3: JVM Heap (Eden Space) */}
        <div className="p-4 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E8]">
            <span className="flex items-center space-x-1.5 font-bold text-xs font-mono text-[#171717]">
              <Box className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Eden Heap Storage</span>
            </span>
            <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8E8E8] text-[#777777]">
              {event?.heapObjects.length || 0} Object(s)
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {event?.heapObjects.map((obj) => (
              <div
                key={obj.address}
                className="p-2.5 bg-white border border-[#E8E8E8] rounded space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-[#171717] text-[11px]">
                  <span>{obj.className}</span>
                  <span className="text-[10px] bg-[#171717] text-white px-1 py-0.2 rounded font-normal">
                    {obj.address}
                  </span>
                </div>
                <div className="text-[10px] text-[#777777]">
                  {obj.fields.length} instance field(s) resident
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
