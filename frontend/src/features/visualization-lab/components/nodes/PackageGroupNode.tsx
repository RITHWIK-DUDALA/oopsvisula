import React from 'react';
import { NodeProps, NodeResizer } from '@xyflow/react';
import { Package } from 'lucide-react';
import { VisualEntityData } from '../../types';

export const PackageGroupNode: React.FC<NodeProps> = ({ data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;

  return (
    <div
      className={`relative w-full h-full min-w-[280px] min-h-[220px] rounded-lg border-2 border-dashed bg-[#F8FAFC]/50 p-3 text-left font-sans select-none pointer-events-auto transition-colors ${
        selected ? 'border-[#1749C8] bg-blue-50/20' : 'border-[#CBD5E1]'
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={220}
        minHeight={160}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs"
        lineClassName="border-[#1749C8]"
      />

      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#64748B] mb-2 pointer-events-none">
        <Package className="w-3.5 h-3.5 text-[#1749C8]" />
        <span>{data.name || 'package com.oopslab'}</span>
      </div>
    </div>
  );
};

