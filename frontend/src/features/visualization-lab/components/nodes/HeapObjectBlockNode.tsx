import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Database, RotateCw } from 'lucide-react';
import { VisualEntityData } from '../../types';
import { useVisualizationLabStore } from '../../visualizationStore';

export const HeapObjectBlockNode: React.FC<NodeProps> = ({ id, data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const { rotateEntity } = useVisualizationLabStore();
  const rotation = data.rotation || 0;

  return (
    <div
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
      className={`relative min-w-[220px] bg-white rounded-md border text-left shadow-2xs font-sans transition-all ${
        selected
          ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
          : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={100}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs"
        lineClassName="border-[#1749C8]"
      />

      {/* Bidirectional Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -top-1.5 transition-transform hover:scale-125"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-src"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -top-1.5 pointer-events-auto"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -bottom-1.5 transition-transform hover:scale-125"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-tgt"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -bottom-1.5 pointer-events-auto"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -left-1.5 transition-transform hover:scale-125"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-src"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -left-1.5 pointer-events-auto"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#1749C8] !rounded-full -right-1.5 transition-transform hover:scale-125"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-tgt"
        className="!w-2.5 !h-2.5 !bg-transparent !border-0 !rounded-full -right-1.5 pointer-events-auto"
      />

      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#F1F4F8] border-b border-[#DCE2EA] rounded-t-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#172033] block">
              {data.name}
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
            className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] hover:text-[#172033]"
            title="Rotate 90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* State Fields */}
      <div className="p-2.5 space-y-1 font-mono text-xs text-[#172033]">
        {data.instanceFieldValues && Object.keys(data.instanceFieldValues).length > 0 ? (
          Object.entries(data.instanceFieldValues).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-[11.5px] leading-tight py-0.5 border-b border-[#F1F4F8] last:border-0">
              <span className="text-[#64748B]">{key}:</span>
              <span className="font-bold text-[#172033] font-mono">{String(val)}</span>
            </div>
          ))
        ) : (
          <span className="text-[10px] text-[#94A3B8] italic">No fields allocated</span>
        )}
      </div>
    </div>
  );
};
