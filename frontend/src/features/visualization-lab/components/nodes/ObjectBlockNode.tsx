import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Box, RotateCw } from 'lucide-react';
import { VisualEntityData } from '../../types';
import { useVisualizationLabStore } from '../../visualizationStore';

export const ObjectBlockNode: React.FC<NodeProps> = ({ id, data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const { rotateEntity } = useVisualizationLabStore();
  const rotation = data.rotation || 0;

  return (
    <div
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
      className="relative min-w-[240px] max-w-[320px]"
    >
      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={100}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs z-30"
        lineClassName="border-[#1749C8] z-30"
      />

      {/* Bidirectional Handles on all 4 sides */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -top-1.5 transition-opacity z-20 ${
          selected ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'
        }`}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-src"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -top-1.5 pointer-events-auto z-20"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -bottom-1.5 transition-opacity z-20 ${
          selected ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'
        }`}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-tgt"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -bottom-1.5 pointer-events-auto z-20"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -left-1.5 transition-opacity z-20 ${
          selected ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'
        }`}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-src"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -left-1.5 pointer-events-auto z-20"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={`!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -right-1.5 transition-opacity z-20 ${
          selected ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'
        }`}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-tgt"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -right-1.5 pointer-events-auto z-20"
      />

      <div
        className={`relative w-full bg-white rounded-md border text-left shadow-2xs font-sans transition-all group overflow-hidden ${
          selected
            ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
            : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
        }`}
      >
        {/* Object Header */}
        <div className="px-3.5 py-2.5 bg-[#F1F4F8] border-b border-[#DCE2EA] rounded-t-md flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-100 border border-blue-200 flex items-center justify-center text-[#1749C8]">
              <Box className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#1749C8] block tracking-tight">
                {data.name}
                <span className="text-[#64748B] font-normal"> : {data.className || 'Object'}</span>
              </span>
              <span className="text-[10px] font-mono font-medium text-[#475569] bg-white px-1.5 py-0.2 rounded border border-[#DCE2EA] inline-block mt-0.5">
                {data.simulatorAddress || '@0xHEAP'}
              </span>
            </div>
          </div>

          {selected && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                rotateEntity(id, 90);
              }}
              className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] hover:text-[#172033] transition-colors"
              title="Rotate 90°"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Instance State (Fields) */}
        <div className="p-2.5 font-mono text-xs">
          <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold mb-1 flex items-center justify-between">
            <span>Instance State</span>
            <span className={`text-[9px] px-1 rounded font-semibold ${
              data.runtimeState === 'active'
                ? 'bg-emerald-100 text-emerald-800'
                : data.runtimeState === 'unreachable'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {data.runtimeState || 'active'}
            </span>
          </div>

          <div className="space-y-1 bg-[#FAFBFD] p-2 rounded border border-[#E2E8F0]">
            {data.instanceFieldValues && Object.keys(data.instanceFieldValues).length > 0 ? (
              Object.entries(data.instanceFieldValues).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-[11.5px] border-b border-[#F1F4F8] pb-0.5 last:border-0">
                  <span className="text-[#64748B] font-medium">{key}</span>
                  <span className="text-[#172033] font-bold font-mono">{String(val)}</span>
                </div>
              ))
            ) : (
              <span className="text-[10px] text-[#94A3B8] italic">Default initial values</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
