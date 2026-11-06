import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Grid3x3, RotateCw } from 'lucide-react';
import { VisualEntityData } from '../../types';
import { useVisualizationLabStore } from '../../visualizationStore';

export const ArrayBlockNode: React.FC<NodeProps> = ({ id, data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const { rotateEntity } = useVisualizationLabStore();
  const rotation = data.rotation || 0;
  const cells = data.arrayCells || [];

  return (
    <div
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
      className={`relative min-w-[240px] bg-white rounded-md border text-left shadow-2xs font-sans transition-all ${
        selected
          ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
          : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={80}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs"
        lineClassName="border-[#1749C8]"
      />

      {/* Bidirectional Handles on all 4 sides */}
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
          <div className="w-6 h-6 rounded bg-blue-100 border border-blue-200 flex items-center justify-center text-[#1749C8]">
            <Grid3x3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#172033] block">
              {data.name || 'Array'}
              <span className="text-[#64748B] font-normal text-[11px]"> : {data.variableType || 'int[]'}</span>
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              length: {cells.length} | {data.simulatorAddress || '@0xARRAY'}
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

      {/* Cells Grid */}
      <div className="p-3 overflow-x-auto">
        <div className="flex items-stretch border border-[#DCE2EA] rounded-md divide-x divide-[#DCE2EA] bg-[#FAFBFD] font-mono shadow-2xs">
          {cells.map((c) => (
            <div
              key={c.index}
              className={`flex-1 min-w-[48px] p-2 text-center transition-colors ${
                c.isHighlighted ? 'bg-orange-50 text-orange-950 font-bold ring-1 ring-orange-400' : ''
              }`}
            >
              <div className="text-[10px] text-[#64748B] font-bold border-b border-[#E2E8F0] pb-1 mb-1">
                [{c.index}]
              </div>
              <div className="text-xs font-semibold text-[#172033] py-0.5">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
