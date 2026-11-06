import React, { useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Layers, AlertTriangle, ChevronDown, ChevronUp, Repeat } from 'lucide-react';
import { VisualEntityData } from '../../types';

export const StackFrameBlockNode: React.FC<NodeProps> = ({ data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const isTop = data.isTopFrame === true;
  const isOverflow = Boolean((data as Record<string, unknown>).isOverflow || (data.name && data.name.includes('[OVERFLOW]')));
  const isRecursiveGroup = Boolean((data as Record<string, unknown>).isRecursiveGroup);
  const collapsedCount = Number((data as Record<string, unknown>).collapsedCount) || 1022;

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubFrameIndex, setSelectedSubFrameIndex] = useState(2);

  // Render dedicated Stack Overflow Boundary Marker if flagged
  if ((data as Record<string, unknown>).isOverflowBoundary) {
    return (
      <div className="relative min-w-[340px] px-4 py-2 bg-rose-50 border-2 border-dashed border-rose-500 rounded-lg text-center font-mono shadow-xs">
        <div className="flex items-center justify-center space-x-2 text-rose-700">
          <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">
            JVM Thread Stack Limit Reached (-Xss1024k)
          </span>
        </div>
        <span className="text-[10px] text-rose-600 block mt-0.5">
          java.lang.StackOverflowError · No further frames can be pushed
        </span>
      </div>
    );
  }

  // Render Collapsed Recursive Group
  if (isRecursiveGroup) {
    return (
      <div
        className={`relative min-w-[300px] max-w-[340px] bg-white rounded-md border text-left shadow-2xs font-sans transition-all group ${
          selected
            ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
            : 'border-amber-300 bg-amber-50/20 hover:border-amber-400'
        }`}
      >
        <NodeResizer
          isVisible={selected}
          minWidth={260}
          minHeight={120}
          handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs"
          lineClassName="border-[#1749C8]"
        />

        {/* Handles */}
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -top-1.5 transition-opacity ${
            selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -bottom-1.5 transition-opacity ${
            selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Header */}
        <div className="px-3 py-2 border-b border-amber-200 bg-amber-50 rounded-t-md flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Repeat className="w-4 h-4 text-amber-600" />
            <div>
              <span className="text-xs font-mono font-bold text-[#172033] block">
                {data.name || 'recurse()'} · Repeated Stack
              </span>
              <span className="text-[9.5px] font-mono text-amber-700">
                Frames #2–#1023 ({collapsedCount.toLocaleString()} invocations)
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-800">
            SUSPENDED ({collapsedCount})
          </span>
        </div>

        {/* Summary Card Body */}
        <div className="p-3 space-y-2">
          <p className="text-[11px] text-[#475569] leading-relaxed">
            Repeated recursive call stack frames collapsed to prevent DOM collision and canvas overflow.
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-full py-1.5 px-2.5 rounded bg-[#F1F4F8] hover:bg-[#E2E8F0] text-[11px] font-mono font-semibold text-[#1749C8] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse Repeated Frames</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expand Frame Inspector ({collapsedCount.toLocaleString()} frames)</span>
              </>
            )}
          </button>

          {/* Virtualized/Sampled Frame Explorer when expanded */}
          {isExpanded && (
            <div className="pt-2 border-t border-amber-200 space-y-2">
              <span className="text-[9.5px] uppercase font-bold text-[#64748B] block font-mono">
                Select Frame to Inspect:
              </span>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
                {[2, 3, 4, 100, 500, 1000, 1022, 1023].map((fNum) => (
                  <button
                    key={fNum}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubFrameIndex(fNum);
                    }}
                    className={`w-full text-left px-2 py-1 rounded flex items-center justify-between text-[11px] cursor-pointer transition-colors ${
                      selectedSubFrameIndex === fNum
                        ? 'bg-[#1749C8] text-white font-bold'
                        : 'bg-[#F8FAFC] text-[#334155] hover:bg-[#EBF0FF]'
                    }`}
                  >
                    <span>recurse() Frame #{fNum}</span>
                    <span className="text-[9.5px] opacity-80">WAITING</span>
                  </button>
                ))}
              </div>

              <div className="p-2 rounded bg-amber-50/60 border border-amber-200/80 font-mono text-[10.5px]">
                <div className="text-[#64748B] text-[9.5px]">Frame #{selectedSubFrameIndex} Inspection:</div>
                <div className="flex justify-between text-[#172033] mt-0.5">
                  <span className="text-[#1749C8]">this:</span>
                  <span>static (no this pointer)</span>
                </div>
                <div className="flex justify-between text-[#172033]">
                  <span className="text-[#1749C8]">return address:</span>
                  <span>Infinite.java:3</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard Stack Frame
  return (
    <div
      className={`relative min-w-[260px] max-w-[320px] bg-white rounded-md border text-left shadow-2xs font-sans transition-all group ${
        selected
          ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
          : isOverflow
          ? 'border-rose-500 ring-2 ring-rose-500/30 shadow-md'
          : isTop
          ? 'border-[#F47721] ring-2 ring-[#F47721]/30 shadow-sm'
          : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={220}
        minHeight={100}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs"
        lineClassName="border-[#1749C8]"
      />

      {/* Handles (hidden by default, appear on hover/selection per Rule 3.5) */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -top-1.5 transition-opacity ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -bottom-1.5 transition-opacity ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -left-1.5 transition-opacity ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -right-1.5 transition-opacity ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Frame Header */}
      <div
        className={`px-3 py-2 border-b rounded-t-md flex items-center justify-between ${
          isOverflow
            ? 'bg-rose-50 border-rose-200'
            : isTop
            ? 'bg-orange-50 border-orange-200'
            : 'bg-[#F1F4F8] border-[#DCE2EA]'
        }`}
      >
        <div className="flex items-center space-x-2">
          {isOverflow ? (
            <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
          ) : (
            <Layers className={`w-4 h-4 ${isTop ? 'text-[#F47721]' : 'text-[#64748B]'}`} />
          )}
          <div>
            <span className="text-xs font-mono font-bold text-[#172033] block">
              {data.name || 'frame'}
            </span>
            <span className="text-[9.5px] font-mono text-[#64748B]">
              Caller: {data.callerFrameId || 'JVM runtime'}
            </span>
          </div>
        </div>

        {isOverflow ? (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
            OVERFLOW (FAILED)
          </span>
        ) : isTop ? (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F47721] text-white">
            ACTIVE (TOP)
          </span>
        ) : (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E2E8F0] text-[#475569]">
            SUSPENDED
          </span>
        )}
      </div>

      {/* Local Variables Slots */}
      <div className="p-2.5 space-y-1 font-mono text-xs">
        <span className="text-[9px] uppercase font-bold text-[#64748B] block mb-1">
          Local Variables & Operands:
        </span>
        {data.localVariables && Object.keys(data.localVariables).length > 0 ? (
          Object.entries(data.localVariables).map(([varName, val]) => (
            <div
              key={varName}
              className="flex items-center justify-between text-[11.5px] py-0.5 border-b border-[#F1F4F8] last:border-0"
            >
              <span className="text-[#1749C8] font-semibold">{varName}</span>
              <span className="text-[#172033] font-bold">{val}</span>
            </div>
          ))
        ) : (
          <span className="text-[10px] text-[#94A3B8] italic">No local slots allocated</span>
        )}

        {data.thisReference && (
          <div className="flex items-center justify-between text-[11px] pt-1 text-[#64748B] border-t border-[#E2E8F0]">
            <span>this:</span>
            <span className="font-mono text-[#1749C8] font-bold">{data.thisReference}</span>
          </div>
        )}
      </div>
    </div>
  );
};
