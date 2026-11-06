import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from '@xyflow/react';
import { SemanticRelationship } from '@/core/engine/semanticModel';
import { useSimulationStore } from '@/features/simulation/simulationStore';

export const ArchitectureEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) => {
  const { setActiveEntitySelection, activeEntitySelection } = useSimulationStore();
  const rel = (data as any)?.relationship as SemanticRelationship | undefined;
  const isHighlighted = (data as any)?.isHighlighted as boolean | undefined;
  const isDimmed = (data as any)?.isDimmed as boolean | undefined;
  const isSelected = selected || activeEntitySelection?.id === id;

  const kind = rel?.kind || 'associates';

  // Smooth orthogonal routing with generous corner radius to avoid looping
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 14,
    offset: 20,
  });

  // UML Styling Configuration per Relationship Kind
  let strokeColor = '#475569'; // slate grey default
  let strokeWidth = isSelected ? 2.5 : 1.75;
  let strokeDasharray: string | undefined = undefined;
  let edgeLabel = rel?.metadata?.fieldName || rel?.kind || 'relates';
  let labelBg = 'bg-white text-neutral-800 border-neutral-300';
  let markerEndId = 'marker-arrow';
  let markerStartId: string | undefined = undefined;

  switch (kind) {
    case 'extends':
      strokeColor = '#2563EB'; // Blue
      edgeLabel = 'extends';
      markerEndId = 'marker-hollow-triangle-blue';
      labelBg = 'bg-blue-50 text-blue-900 border-blue-200';
      break;

    case 'implements':
      strokeColor = '#0D9488'; // Teal
      strokeDasharray = '5 4';
      edgeLabel = 'implements';
      markerEndId = 'marker-hollow-triangle-teal';
      labelBg = 'bg-teal-50 text-teal-900 border-teal-200';
      break;

    case 'composes':
      strokeColor = '#0F172A'; // Slate-900
      edgeLabel = rel?.metadata?.fieldName ? `owns (${rel.metadata.fieldName})` : 'composes';
      markerStartId = 'marker-filled-diamond';
      markerEndId = 'marker-arrow-dark';
      labelBg = 'bg-neutral-900 text-white border-neutral-800';
      break;

    case 'aggregates':
      strokeColor = '#334155'; // Slate-700
      edgeLabel = rel?.metadata?.fieldName ? `has (${rel.metadata.fieldName})` : 'aggregates';
      markerStartId = 'marker-hollow-diamond';
      markerEndId = 'marker-arrow-dark';
      labelBg = 'bg-neutral-100 text-neutral-800 border-neutral-300';
      break;

    case 'associates':
    case 'references':
      strokeColor = '#475569';
      edgeLabel = rel?.metadata?.fieldName ? `ref (${rel.metadata.fieldName})` : 'references';
      markerEndId = 'marker-open-arrow';
      labelBg = 'bg-white text-neutral-700 border-neutral-200';
      break;

    case 'depends':
      strokeColor = '#64748B';
      strokeDasharray = '4 4';
      edgeLabel = 'depends on';
      markerEndId = 'marker-open-arrow';
      labelBg = 'bg-neutral-50 text-neutral-600 border-neutral-200';
      break;

    case 'invokes':
      strokeColor = '#7C3AED'; // Violet
      strokeDasharray = '3 3';
      edgeLabel = rel?.metadata?.methodName ? `calls ${rel.metadata.methodName}()` : 'invokes';
      markerEndId = 'marker-call-arrow';
      labelBg = 'bg-violet-50 text-violet-900 border-violet-200';
      break;

    default:
      strokeColor = '#64748B';
      markerEndId = 'marker-open-arrow';
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rel) {
      setActiveEntitySelection({
        type: 'relationship',
        id,
        data: rel,
      });
    }
  };

  return (
    <>
      {/* SVG Marker Definitions */}
      <defs>
        {/* UML Inheritance: Hollow triangle at target pointing to superclass */}
        <marker
          id="marker-hollow-triangle-blue"
          viewBox="0 0 16 16"
          refX="14"
          refY="8"
          markerWidth="12"
          markerHeight="12"
          orient="auto-start-reverse"
        >
          <polygon points="2,2 14,8 2,14" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round" />
        </marker>

        {/* UML Implementation: Hollow triangle at target pointing to interface */}
        <marker
          id="marker-hollow-triangle-teal"
          viewBox="0 0 16 16"
          refX="14"
          refY="8"
          markerWidth="12"
          markerHeight="12"
          orient="auto-start-reverse"
        >
          <polygon points="2,2 14,8 2,14" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" strokeLinejoin="round" />
        </marker>

        {/* UML Composition: Filled diamond at owner end */}
        <marker
          id="marker-filled-diamond"
          viewBox="0 0 18 18"
          refX="9"
          refY="9"
          markerWidth="13"
          markerHeight="13"
          orient="auto"
        >
          <polygon points="9,2 16,9 9,16 2,9" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5" />
        </marker>

        {/* UML Aggregation: Hollow diamond at aggregate owner end */}
        <marker
          id="marker-hollow-diamond"
          viewBox="0 0 18 18"
          refX="9"
          refY="9"
          markerWidth="13"
          markerHeight="13"
          orient="auto"
        >
          <polygon points="9,2 16,9 9,16 2,9" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
        </marker>

        {/* Open Directional Arrow */}
        <marker
          id="marker-open-arrow"
          viewBox="0 0 14 14"
          refX="12"
          refY="7"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <polyline points="3,2 11,7 3,12" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>

        {/* Dark Arrow for Composition / Aggregation target */}
        <marker
          id="marker-arrow-dark"
          viewBox="0 0 14 14"
          refX="12"
          refY="7"
          markerWidth="9"
          markerHeight="9"
          orient="auto-start-reverse"
        >
          <path d="M 2 2 L 11 7 L 2 12 z" fill="#0F172A" />
        </marker>

        {/* Call arrow for Method Invocations */}
        <marker
          id="marker-call-arrow"
          viewBox="0 0 14 14"
          refX="12"
          refY="7"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <polygon points="2,2 12,7 2,12" fill="#7C3AED" />
        </marker>
      </defs>

      {/* Main Visible Path */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: isSelected ? '#2563EB' : isHighlighted ? '#F59E0B' : strokeColor,
          strokeWidth: isSelected ? strokeWidth + 1 : isHighlighted ? 2.5 : strokeWidth,
          strokeDasharray,
          opacity: isDimmed ? 0.2 : 1,
          filter: isSelected
            ? 'drop-shadow(0 0 3px rgba(37,99,235,0.45))'
            : isHighlighted
            ? 'drop-shadow(0 0 3px rgba(245,158,11,0.5))'
            : undefined,
          cursor: 'pointer',
        }}
        markerStart={markerStartId ? `url(#${markerStartId})` : undefined}
        markerEnd={markerEndId ? `url(#${markerEndId})` : undefined}
      />

      {/* Invisible Thicker Stroke for Effortless Hover/Clicking */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer pointer-events-auto"
        onClick={handleSelect}
      />

      {/* Edge Interactive Label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            zIndex: isSelected ? 20 : 5,
          }}
          onClick={handleSelect}
          className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-semibold border shadow-2xs select-none transition-all cursor-pointer flex items-center space-x-1 ${labelBg} ${
            isSelected
              ? 'ring-2 ring-blue-500 shadow-md scale-105'
              : 'hover:scale-102 hover:shadow-xs'
          }`}
          title="Click to inspect this Java relationship"
        >
          <span>{edgeLabel}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

