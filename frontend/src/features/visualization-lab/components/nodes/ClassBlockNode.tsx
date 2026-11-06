import React, { useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { ChevronDown, ChevronRight, Box, Layers, Code2, RotateCw } from 'lucide-react';
import { VisualEntityData } from '../../types';
import { useVisualizationLabStore } from '../../visualizationStore';
import { Interactive3DCard } from '@/components/shared/Interactive3DCard';

export const ClassBlockNode: React.FC<NodeProps> = ({ id, data: nodeData, selected }) => {
  const data = nodeData as VisualEntityData;
  const { rotateEntity } = useVisualizationLabStore();
  
  const [fieldsExpanded, setFieldsExpanded] = useState(true);
  const [constructorsExpanded, setConstructorsExpanded] = useState(false);
  const [methodsExpanded, setMethodsExpanded] = useState(true);

  const rotation = data.rotation || 0;
  const isInterface = data.classType === 'interface';
  const isAbstract = data.classType === 'abstract-class';
  const isRecord = data.classType === 'record';
  const isEnum = data.classType === 'enum';

  const typeBadge = isInterface
    ? '«interface»'
    : isAbstract
    ? '«abstract class»'
    : isRecord
    ? '«record»'
    : isEnum
    ? '«enum»'
    : '«class»';

  const getVisibilitySymbol = (vis?: string) => {
    switch (vis) {
      case 'public':
        return <span className="text-emerald-600 font-bold w-2.5" title="public">+</span >;
      case 'private':
        return <span className="text-rose-600 font-bold w-2.5" title="private">-</span >;
      case 'protected':
        return <span className="text-amber-600 font-bold w-2.5" title="protected">#</span >;
      default:
        return <span className="text-slate-400 font-bold w-2.5" title="package-private">~</span >;
    }
  };

  return (
    <div
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center center',
      }}
      className="relative min-w-[250px] max-w-[360px]"
    >
      <NodeResizer
        isVisible={selected}
        minWidth={220}
        minHeight={120}
        handleClassName="w-2.5 h-2.5 bg-white border-2 border-[#1749C8] rounded-xs z-30"
        lineClassName="border-[#1749C8] z-30"
      />

      {/* Bidirectional Handles on all 4 cardinal directions */}
      {/* Top Handles */}
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

      {/* Bottom Handles */}
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

      {/* Left Handles */}
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

      {/* Right Handles */}
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

      <Interactive3DCard
        maxTilt={7}
        scale={1.018}
        glareSize={280}
        glareOpacity={0.25}
        className={`relative w-full bg-white rounded-md border text-left shadow-2xs font-sans transition-all group overflow-hidden ${
          selected
            ? 'border-[#1749C8] ring-2 ring-[#1749C8]/20 shadow-md'
            : 'border-[#DCE2EA] hover:border-[#B5C2D4]'
        }`}
      >
        {/* Class Header */}
      <div className="px-3.5 py-2.5 bg-[#F8FAFC] border-b border-[#DCE2EA] rounded-t-md flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase font-semibold">
              {typeBadge}
            </span>
            {data.visibility && getVisibilitySymbol(data.visibility)}
            {data.packageName && (
              <span className="text-[9.5px] font-mono text-[#94A3B8] hidden sm:inline">
                {data.packageName}
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold font-mono text-[#0F172A] tracking-tight">{data.name}</h3>
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

      {/* Class Body: Compartments */}
      <div className="divide-y divide-[#E2E8F0]">
        {/* Fields */}
        <div className="p-2 space-y-1">
          <button
            type="button"
            onClick={() => setFieldsExpanded(!fieldsExpanded)}
            className="w-full flex items-center justify-between text-[11px] font-mono font-semibold text-[#64748B] hover:text-[#172033] px-1 cursor-pointer"
          >
            <span className="flex items-center space-x-1">
              <Box className="w-3 h-3 text-[#1749C8]" />
              <span>Fields ({data.fields?.length || 0})</span>
            </span>
            {fieldsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {fieldsExpanded && (
            <div className="space-y-1 pt-1 pl-1 font-mono text-xs text-[#172033]">
              {data.fields && data.fields.length > 0 ? (
                data.fields.map((f) => (
                  <div key={f.id} className="flex items-center space-x-1 text-[11.5px] leading-tight">
                    <span className="font-bold w-2.5">
                      {f.visibility === '+' ? <span className="text-emerald-600">+</span> : f.visibility === '-' ? <span className="text-rose-600">-</span> : f.visibility === '#' ? <span className="text-amber-600">#</span> : <span className="text-slate-400">~</span>}
                    </span>
                    <span className={`font-semibold ${f.isStatic ? 'underline' : 'text-[#172033]'}`}>{f.name}</span>
                    <span className="text-[#94A3B8]">:</span>
                    <span className="text-[#1749C8] font-medium">{f.type}</span>
                    {f.value && <span className="text-[#64748B] text-[10px]">= {f.value}</span>}
                    {f.isStatic && <span className="text-[9px] px-1 bg-[#F1F4F8] text-[#475569] border border-[#DCE2EA] rounded font-sans font-semibold">static</span>}
                  </div>
                ))
              ) : (
                <span className="text-[10px] text-[#94A3B8] italic block py-0.5">No fields declared</span>
              )}
            </div>
          )}
        </div>

        {/* Constructors */}
        {data.constructors && data.constructors.length > 0 && (
          <div className="p-2 space-y-1">
            <button
              type="button"
              onClick={() => setConstructorsExpanded(!constructorsExpanded)}
              className="w-full flex items-center justify-between text-[11px] font-mono font-semibold text-[#64748B] hover:text-[#172033] px-1 cursor-pointer"
            >
              <span className="flex items-center space-x-1">
                <Layers className="w-3 h-3 text-[#F47721]" />
                <span>Constructors ({data.constructors.length})</span>
              </span>
              {constructorsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {constructorsExpanded && (
              <div className="space-y-1 pt-1 pl-1 font-mono text-[11.5px] text-[#172033]">
                {data.constructors.map((c) => (
                  <div key={c.id} className="flex items-center space-x-1 leading-tight">
                    <span className="font-bold w-2.5">
                      {c.visibility === '+' ? <span className="text-emerald-600">+</span> : <span className="text-slate-400">~</span>}
                    </span>
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-[#64748B] text-[10.5px] truncate max-w-[180px]" title={`(${c.parameters?.join(', ') || ''})`}>
                      ({c.parameters?.join(', ') || ''})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Methods */}
        <div className="p-2 space-y-1">
          <button
            type="button"
            onClick={() => setMethodsExpanded(!methodsExpanded)}
            className="w-full flex items-center justify-between text-[11px] font-mono font-semibold text-[#64748B] hover:text-[#172033] px-1 cursor-pointer"
          >
            <span className="flex items-center space-x-1">
              <Code2 className="w-3 h-3 text-[#16A34A]" />
              <span>Methods ({data.methods?.length || 0})</span>
            </span>
            {methodsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {methodsExpanded && (
            <div className="space-y-1 pt-1 pl-1 font-mono text-xs text-[#172033]">
              {data.methods && data.methods.length > 0 ? (
                data.methods.map((m) => (
                  <div key={m.id} className="flex items-center space-x-1 text-[11.5px] leading-tight flex-wrap">
                    <span className="font-bold w-2.5">
                      {m.visibility === '+' ? <span className="text-emerald-600">+</span> : m.visibility === '-' ? <span className="text-rose-600">-</span> : m.visibility === '#' ? <span className="text-amber-600">#</span> : <span className="text-slate-400">~</span>}
                    </span>
                    <span className={`font-semibold ${m.isStatic ? 'underline' : 'text-[#172033]'}`}>{m.name}</span>
                    <span className="text-[#64748B] text-[10.5px] truncate max-w-[150px]" title={`(${m.parameters?.join(', ') || ''})`}>
                      ({m.parameters?.join(', ') || ''})
                    </span>
                    <span className="text-[#94A3B8]">:</span>
                    <span className="text-[#1749C8] font-medium">{m.returnType}</span>
                    {m.isStatic && <span className="text-[9px] px-1 bg-[#F1F4F8] text-[#475569] border border-[#DCE2EA] rounded font-sans font-semibold">static</span>}
                    {m.isAbstract && <span className="text-[9px] px-1 bg-amber-50 text-amber-700 border border-amber-200 rounded font-sans italic">abstract</span>}
                  </div>
                ))
              ) : (
                <span className="text-[10px] text-[#94A3B8] italic block py-0.5">No methods declared</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Class Footer */}
      <div className="px-3 py-1.5 bg-[#FAFBFD] border-t border-[#DCE2EA] rounded-b-md flex items-center justify-between text-[10px] font-mono text-[#64748B]">
        <span>{data.sourceFile || `${data.name}.java`}</span>
        <span className="text-[#94A3B8]">ID: {data.id}</span>
      </div>
      </Interactive3DCard>
    </div>
  );
};
