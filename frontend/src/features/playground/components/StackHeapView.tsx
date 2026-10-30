import React, { useRef, useState, useEffect } from 'react';
import {
  Layers,
  Box,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { StackFrameSnapshot, HeapObjectSnapshot } from '@/types/execution';

export const StackHeapView: React.FC = () => {
  const {
    getCurrentEvent,
    selectedObjectId,
    selectedVariableName,
    setSelectedObjectId,
    setSelectedVariableName,
  } = useSimulationStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const stackColRef = useRef<HTMLDivElement | null>(null);
  const heapColRef = useRef<HTMLDivElement | null>(null);

  const [referenceLines, setReferenceLines] = useState<
    Array<{
      id: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      label: string;
      isSelected: boolean;
      targetAddress: string;
    }>
  >([]);

  const event = getCurrentEvent();

  // Calculate dynamic SVG connecting lines between stack variables and heap objects
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !event) {
      setReferenceLines([]);
      return;
    }

    const updateLines = () => {
      const containerRect = container.getBoundingClientRect();
      const lines: typeof referenceLines = [];

      event.stackFrames.forEach((frame) => {
        frame.localVariables.forEach((v) => {
          if (v.isReference && v.targetAddress && v.value !== 'null' && v.value !== null) {
            const varEl = container.querySelector(
              `[data-var-address="${frame.frameId}-${v.name}"]`
            );
            const objEl = container.querySelector(
              `[data-heap-address="${v.targetAddress}"]`
            );

            if (varEl && objEl) {
              const varRect = varEl.getBoundingClientRect();
              const objRect = objEl.getBoundingClientRect();

              const startX = varRect.right - containerRect.left;
              const startY = varRect.top + varRect.height / 2 - containerRect.top;
              const endX = objRect.left - containerRect.left;
              const endY = objRect.top + objRect.height / 2 - containerRect.top;

              const isSelected =
                selectedObjectId === v.targetAddress ||
                selectedVariableName === v.name;

              lines.push({
                id: `${frame.frameId}-${v.name}->${v.targetAddress}`,
                startX,
                startY,
                endX,
                endY,
                label: `${v.name} → ${v.targetAddress}`,
                isSelected,
                targetAddress: v.targetAddress,
              });
            }
          }
        });
      });

      setReferenceLines(lines);
    };

    updateLines();
    const ro = new ResizeObserver(updateLines);
    ro.observe(container);
    return () => ro.disconnect();
  }, [event, selectedObjectId, selectedVariableName]);

  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-10 h-10 rounded-md bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center text-[#777777] mb-3">
          <Layers className="w-5 h-5 stroke-[1.5]" />
        </div>
        <h4 className="text-xs font-mono font-bold text-[#171717]">
          No Runtime Objects Loaded
        </h4>
        <p className="text-[11px] text-[#777777] max-w-xs mt-1">
          Run or step through your program to inspect JVM stack frames and heap instances.
        </p>
      </div>
    );
  }

  const isFieldMutated = event.type === 'FIELD_MUTATED';

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E8E8E8] overflow-y-auto bg-white"
    >
      {/* SVG Reference Connectors Overlay */}
      <svg
        className="absolute inset-0 pointer-events-none z-20 w-full h-full hidden md:block"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="ref-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#171717" />
          </marker>
          <marker
            id="ref-arrow-active"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#171717" />
          </marker>
        </defs>

        {referenceLines.map((line) => {
          const dx = Math.abs(line.endX - line.startX) * 0.5;
          const pathD = `M ${line.startX} ${line.startY} C ${line.startX + dx} ${line.startY}, ${line.endX - dx} ${line.endY}, ${line.endX} ${line.endY}`;

          return (
            <g key={line.id}>
              {/* Reference Path */}
              <path
                d={pathD}
                fill="none"
                stroke={line.isSelected ? '#171717' : '#B0B0B0'}
                strokeWidth={line.isSelected ? 2 : 1.25}
                strokeDasharray={line.isSelected ? 'none' : '4 3'}
                markerEnd={line.isSelected ? 'url(#ref-arrow-active)' : 'url(#ref-arrow)'}
                className="transition-all duration-200"
              />
            </g>
          );
        })}
      </svg>

      {/* Column A: Call Stack (LIFO) */}
      <div
        ref={stackColRef}
        className="p-4 space-y-4 bg-[#FAFAFA] overflow-y-auto z-10"
      >
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#E8E8E8]">
          <span className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[11px] text-[#171717]">
            <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Call Stack (LIFO)</span>
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E8E8E8] text-[#777777] font-semibold">
            {event.stackFrames.length === 0
              ? 'Empty Stack'
              : `${event.stackFrames.length} Frame(s)`}
          </span>
        </div>

        {event.stackFrames.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#999999] border border-dashed border-[#E8E8E8] rounded-md">
            Thread terminated. All call stack frames unwound.
          </div>
        ) : (
          <div className="space-y-3">
            {event.stackFrames.map((frame: StackFrameSnapshot, idx: number) => {
              const isTop = idx === event.stackFrames.length - 1;

              return (
                <div
                  key={frame.frameId}
                  className={`p-3.5 rounded-md border transition-all ${
                    isTop
                      ? 'bg-white border-[#171717] shadow-xs ring-1 ring-[#171717]/10'
                      : 'bg-white/80 border-[#E8E8E8] opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E8E8E8]">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] font-mono font-bold bg-[#171717] text-white px-1.5 py-0.5 rounded">
                        Frame #{idx + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#171717] truncate">
                        {frame.methodName}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#777777] shrink-0 ml-2">
                      Line {frame.line}
                    </span>
                  </div>

                  {/* Local Variables List */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999999] mb-1">
                      Local Variables
                    </div>

                    {frame.localVariables.length === 0 ? (
                      <span className="text-xs text-[#999999] italic font-mono block">
                        No local variables declared
                      </span>
                    ) : (
                      frame.localVariables.map((v) => {
                        const isVarSelected = selectedVariableName === v.name;
                        const isTargetSelected =
                          v.isReference && selectedObjectId === v.targetAddress;

                        return (
                          <div
                            key={v.name}
                            data-var-address={`${frame.frameId}-${v.name}`}
                            onClick={() => {
                              setSelectedVariableName(
                                isVarSelected ? null : v.name
                              );
                              if (v.isReference && v.targetAddress) {
                                setSelectedObjectId(
                                  isTargetSelected ? null : v.targetAddress
                                );
                              }
                            }}
                            className={`flex items-center justify-between text-xs font-mono py-1.5 px-2 rounded cursor-pointer transition-colors ${
                              isVarSelected || isTargetSelected
                                ? 'bg-[#EEEEEE] border border-[#171717] font-semibold text-[#171717]'
                                : 'bg-[#FAFAFA] border border-[#E8E8E8] text-[#171717] hover:border-[#171717]/50'
                            }`}
                          >
                            <div className="flex items-center space-x-1.5 truncate">
                              <span className="font-semibold truncate">{v.name}</span>
                              <span className="text-[10px] text-[#777777]">({v.type})</span>
                            </div>

                            <div className="flex items-center space-x-1 shrink-0 ml-2">
                              {v.isReference ? (
                                <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#171717] text-white text-[10px] font-mono font-medium">
                                  <span>{String(v.value)}</span>
                                  <ArrowRight className="w-2.5 h-2.5 stroke-[2]" />
                                </span>
                              ) : (
                                <span className="font-mono font-bold text-[#171717]">
                                  {String(v.value)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Column B: JVM Heap (Eden Space) */}
      <div
        ref={heapColRef}
        className="p-4 space-y-4 bg-white overflow-y-auto z-10"
      >
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#E8E8E8]">
          <span className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[11px] text-[#171717]">
            <Box className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>JVM Heap (Eden Space)</span>
          </span>
          <span className="text-[10px] bg-[#FAFAFA] px-2 py-0.5 rounded border border-[#E8E8E8] text-[#777777] font-semibold">
            {event.heapObjects.length} Instance(s)
          </span>
        </div>

        {event.heapObjects.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#999999] border border-dashed border-[#E8E8E8] rounded-md">
            Heap is empty. No objects instantiated in Eden Space yet.
          </div>
        ) : (
          <div className="space-y-3">
            {event.heapObjects.map((obj: HeapObjectSnapshot) => {
              const isObjSelected = selectedObjectId === obj.address;

              return (
                <div
                  key={obj.address}
                  data-heap-address={obj.address}
                  onClick={() =>
                    setSelectedObjectId(isObjSelected ? null : obj.address)
                  }
                  className={`p-3.5 rounded-md border cursor-pointer transition-all ${
                    isObjSelected
                      ? 'bg-white border-[#171717] shadow-sm ring-1 ring-[#171717]'
                      : 'bg-[#FAFAFA] border-[#E8E8E8] hover:border-[#171717]/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-2 mb-2">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] font-mono font-bold bg-[#171717] text-white px-1.5 py-0.5 rounded">
                        {obj.address}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#171717] truncate">
                        {obj.className}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#777777] bg-white px-1.5 py-0.5 rounded border border-[#E8E8E8]">
                      Instance
                    </span>
                  </div>

                  {/* Instance Fields List */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999999] mb-1">
                      Instance Fields
                    </div>

                    {obj.fields.length === 0 ? (
                      <span className="text-xs text-[#999999] italic font-mono block">
                        No instance fields
                      </span>
                    ) : (
                      obj.fields.map((f) => {
                        const isMutatedThisStep =
                          isFieldMutated && f.name === 'balance' && Number(f.value) === 750;

                        return (
                          <div
                            key={f.name}
                            className={`flex items-center justify-between text-xs font-mono py-1.5 px-2 rounded border transition-colors ${
                              isMutatedThisStep
                                ? 'bg-[#EEEEEE] border-[#171717] font-bold'
                                : 'bg-white border-[#E8E8E8]'
                            }`}
                          >
                            <div className="flex items-center space-x-1.5 truncate">
                              <span className="font-semibold text-[#171717] truncate">
                                {f.name}
                              </span>
                              <span className="text-[10px] text-[#777777]">({f.type})</span>
                              {isMutatedThisStep && (
                                <span className="inline-flex items-center text-[10px] text-[#287A4B] font-bold">
                                  <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                  Mutated
                                </span>
                              )}
                            </div>

                            <div className="text-right shrink-0 ml-2">
                              {f.isReference ? (
                                <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FAFAFA] border border-[#E8E8E8] text-[10px]">
                                  <span>{String(f.value)}</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </span>
                              ) : isMutatedThisStep ? (
                                <div className="flex items-center space-x-1">
                                  <span className="text-[#999999] line-through text-[11px]">
                                    500.0
                                  </span>
                                  <span className="text-[#171717] font-bold text-xs">
                                    → {String(f.value)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-[#171717]">
                                  {String(f.value)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
