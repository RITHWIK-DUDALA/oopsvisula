import React from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Variable } from 'lucide-react';
import { VisualEntityData } from '../../types';

export const VariableBlockNode: React.FC<NodeProps> = ({ data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const rotation = data.rotation || 0;

  return (
    <div
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
      className={`relative min-w-[170px] bg-white rounded-md border text-left shadow-2xs font-sans transition-all ${
        selected
          ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
          : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={150}
        minHeight={60}
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

      <div className="px-3 py-1.5 bg-[#F1F4F8] border-b border-[#DCE2EA] rounded-t-md flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Variable className="w-3.5 h-3.5 text-[#1749C8]" />
          <span className="text-xs font-mono font-bold text-[#172033]">{data.name}</span>
        </div>
        <span className="text-[9px] font-mono text-[#64748B] px-1 bg-white border border-[#DCE2EA] rounded">
          {data.variableScope || 'local'}
        </span>
      </div>

      <div className="p-2.5 font-mono text-xs flex items-center justify-between">
        <span className="text-[#64748B] text-[11px]">{data.variableType || 'int'}:</span>
        <span className="font-bold text-[#172033] font-mono">{data.variableValue || 'null'}</span>
      </div>
    </div>
  );
};
