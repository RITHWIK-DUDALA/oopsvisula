import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
} from '@xyflow/react';
import { VisualRelationshipData, RelationshipType } from '../../types';
import { useVisualizationLabStore } from '../../visualizationStore';

export const RelationshipEdge: React.FC<EdgeProps> = ({
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
  const { selectEdge } = useVisualizationLabStore();
  const relData = data as VisualRelationshipData | undefined;
  const relType: RelationshipType = relData?.type || 'association';

  // Determine routing: default to orthogonal (smoothstep) routing with rounded corners
  // to avoid overlapping curved loops and keep professional UML & runtime diagrams clean.
  const preferredRouting = relData?.routing || 'orthogonal';

  let edgePath = '';
  let labelX = 0;
  let labelY = 0;

  if (preferredRouting === 'orthogonal') {
    [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 12,
      offset: 24,
    });
  } else if (preferredRouting === 'straight') {
    [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  } else {
    [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: 0.28,
    });
  }

  // Color mapping per OOPS LAB design system
  let strokeColor = '#64748B'; // slate grey default
  let isDashed = false;
  let strokeDasharray: string | undefined = undefined;

  switch (relType) {
    case 'inheritance':
    case 'extends':
      strokeColor = '#16A34A'; // Emerald Green per Master Spec Section 2.2
      break;
    case 'implementation':
    case 'implements':
      strokeColor = '#0891B2'; // Cyan Blue per Master Spec Section 2.2
      isDashed = true;
      strokeDasharray = '6 4';
      break;
    case 'composition':
      strokeColor = '#172033'; // Whole-Part Dark Slate
      break;
    case 'aggregation':
      strokeColor = '#64748B'; // Whole-Part Slate Grey
      break;
    case 'association':
      strokeColor = '#64748B'; // Slate Grey
      break;
    case 'dependency':
      strokeColor = '#64748B'; // Neutral Slate per Section 2.2
      isDashed = true;
      strokeDasharray = '5 4';
      break;
    case 'invocation':
    case 'call':
      strokeColor = '#D97706'; // Amber Method Invocation per Section 2.2
      break;
    case 'reference':
    case 'field-ref':
    case 'allocates':
      strokeColor = '#1749C8'; // Cobalt Blue Reference Pointer
      break;
    case 'string-intern':
      strokeColor = '#9333EA'; // Purple String Intern Pointer
      break;
    case 'collection-containment':
      strokeColor = '#0F766E'; // Deep Teal Collection Pointer
      break;
    case 'boxing':
    case 'unboxing':
      strokeColor = '#C65A19'; // Burnt Orange Boxing/Unboxing
      isDashed = true;
      strokeDasharray = '4 3';
      break;
    case 'exception':
    case 'exception-flow':
      strokeColor = '#DC2626'; // Red Exception Flow
      break;
    case 'thread-lock':
    case 'monitor':
      strokeColor = '#0891B2'; // Cyan Monitor/Lock
      break;
    case 'data-flow':
      strokeColor = '#0284C7'; // Cyan-Blue
      break;
    case 'control-flow':
      strokeColor = '#334155'; // Dark Slate
      break;
    case 'execution-sequence':
      strokeColor = '#D97706'; // Amber
      break;
  }

  // Override color if explicitly set in relationship data
  if (relData?.color) {
    strokeColor = relData.color;
  }

  // UML Marker Logic:
  // - Inheritance (extends): Hollow triangle at target (pointing to superclass)
  // - Implementation (implements): Hollow triangle at target (pointing to interface), dashed line
  // - Composition (has-a strong): Filled diamond at source (at the whole/owner class)
  // - Aggregation (has-a weak): Hollow diamond at source (at the aggregate owner)
  // - Invocation & Dependency: Directional arrowhead at target
  // - Reference & field-ref: Directional pointer arrowhead at target

  const markerInheritanceId = `marker-inheritance-${id}`;
  const markerImplementationId = `marker-implementation-${id}`;
  const markerCompDiamondId = `marker-composition-${id}`;
  const markerAggDiamondId = `marker-aggregation-${id}`;
  const markerArrowId = `marker-arrow-${id}`;

  let markerStart: string | undefined = undefined;
  let markerEnd: string | undefined = undefined;

  if (relType === 'inheritance' || relType === 'extends') {
    markerEnd = `url(#${markerInheritanceId})`;
  } else if (relType === 'implementation' || relType === 'implements') {
    markerEnd = `url(#${markerImplementationId})`;
  } else if (relType === 'composition') {
    markerStart = `url(#${markerCompDiamondId})`;
  } else if (relType === 'aggregation') {
    markerStart = `url(#${markerAggDiamondId})`;
  } else {
    markerEnd = `url(#${markerArrowId})`;
  }

  return (
    <>
      <defs>
        {/* UML Inheritance: Hollow closed triangle at target */}
        <marker
          id={markerInheritanceId}
          viewBox="0 0 16 16"
          refX="14"
          refY="8"
          markerWidth="13"
          markerHeight="13"
          orient="auto-start-reverse"
        >
          <polygon points="1,2 14,8 1,14" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
        </marker>

        {/* UML Implementation: Hollow closed triangle at target with dashed line */}
        <marker
          id={markerImplementationId}
          viewBox="0 0 16 16"
          refX="14"
          refY="8"
          markerWidth="13"
          markerHeight="13"
          orient="auto-start-reverse"
        >
          <polygon points="1,2 14,8 1,14" fill="#FFFFFF" stroke="#0891B2" strokeWidth="2" />
        </marker>

        {/* UML Composition: Solid filled diamond at source */}
        <marker
          id={markerCompDiamondId}
          viewBox="0 0 18 18"
          refX="9"
          refY="9"
          markerWidth="13"
          markerHeight="13"
          orient="auto"
        >
          <polygon points="9,2 16,9 9,16 2,9" fill="#172033" stroke="#172033" strokeWidth="1.5" />
        </marker>

        {/* UML Aggregation: Hollow diamond at source */}
        <marker
          id={markerAggDiamondId}
          viewBox="0 0 18 18"
          refX="9"
          refY="9"
          markerWidth="13"
          markerHeight="13"
          orient="auto"
        >
          <polygon points="9,2 16,9 9,16 2,9" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
        </marker>

        {/* Directional Arrow at target */}
        <marker
          id={markerArrowId}
          viewBox="0 0 14 14"
          refX="11"
          refY="7"
          markerWidth="9"
          markerHeight="9"
          orient="auto-start-reverse"
        >
          <path d="M 1 2 L 11 7 L 1 12 z" fill={strokeColor} />
        </marker>
      </defs>

      {/* Main Path */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? '#1749C8' : strokeColor,
          strokeWidth: selected ? 2.5 : 1.75,
          strokeDasharray: isDashed ? strokeDasharray : undefined,
          filter: selected ? 'drop-shadow(0 0 2px rgba(23,73,200,0.4))' : undefined,
          cursor: 'pointer',
        }}
        markerStart={markerStart}
        markerEnd={markerEnd}
      />

      {/* Invisible thicker interaction stroke for easier clicking/selection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        className="cursor-pointer pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          selectEdge(id);
        }}
      />

      {/* Relationship Label & Multiplicity */}
      {(relData?.label || relData?.multiplicity) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              zIndex: selected ? 15 : 5,
            }}
            onClick={(e) => {
              e.stopPropagation();
              selectEdge(id);
            }}
            className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono font-medium border shadow-2xs select-none transition-all cursor-pointer flex items-center space-x-1.5 ${
              selected
                ? 'bg-[#172033] text-white border-[#172033] ring-2 ring-[#1749C8]/30 shadow-sm scale-105'
                : 'bg-white text-[#172033] border-[#DCE2EA] hover:border-[#1749C8] hover:bg-[#FAFBFD]'
            }`}
          >
            {relData.label && <span>{relData.label}</span>}
            {relData.multiplicity && (
              <span className={`text-[9.5px] font-semibold px-1 rounded ${
                selected ? 'bg-white/20 text-white' : 'bg-[#F1F4F8] text-[#1749C8]'
              }`}>
                {relData.multiplicity}
              </span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
