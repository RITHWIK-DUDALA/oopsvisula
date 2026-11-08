import React, { useMemo, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useVisualizationLabStore } from '../../visualizationStore';
import { ClassBlockNode } from '../nodes/ClassBlockNode';
import { ObjectBlockNode } from '../nodes/ObjectBlockNode';
import { ArrayBlockNode } from '../nodes/ArrayBlockNode';
import { VariableBlockNode } from '../nodes/VariableBlockNode';
import { HeapObjectBlockNode } from '../nodes/HeapObjectBlockNode';
import { MethodBlockNode } from '../nodes/MethodBlockNode';
import { StackFrameBlockNode } from '../nodes/StackFrameBlockNode';
import { PackageGroupNode } from '../nodes/PackageGroupNode';
import { RelationshipEdge } from '../edges/RelationshipEdge';
import { LabScenarioBar } from './LabScenarioBar';

export const VisualizationCanvas: React.FC = () => {
  const { fitView } = useReactFlow();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const {
    nodes,
    edges,
    activeCategoryId,
    activeSubsectionId,
    activeScenarioId,
    libraryCollapsed,
    inspectorCollapsed,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    selectEdge,
    clearSelection,
    snapToGrid,
    showGrid,
    showMiniMap,
    toggleMiniMap,
    deleteSelected,
    duplicateSelected,
    undo,
    redo,
  } = useVisualizationLabStore();

  // Auto-center and fit diagram whenever active category, scenario, nodes, or panel layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.22, duration: 400 });
    }, 80);
    return () => clearTimeout(timer);
  }, [
    activeCategoryId,
    activeSubsectionId,
    activeScenarioId,
    nodes.length,
    libraryCollapsed,
    inspectorCollapsed,
    fitView,
  ]);

  // Viewport resize observer to ensure auto-fit on window / panel drag resize
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      fitView({ padding: 0.22, duration: 250 });
    });
    observer.observe(canvasContainerRef.current);
    return () => observer.disconnect();
  }, [fitView]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      classNode: ClassBlockNode,
      objectNode: ObjectBlockNode,
      arrayNode: ArrayBlockNode,
      variableNode: VariableBlockNode,
      heapObjectNode: HeapObjectBlockNode,
      methodNode: MethodBlockNode,
      stackFrameNode: StackFrameBlockNode,
      packageGroupNode: PackageGroupNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      relationshipEdge: RelationshipEdge,
    }),
    []
  );

  // Global Keyboard Shortcuts (Section 8)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, duplicateSelected, deleteSelected]);

  return (
    <div className="w-full h-full relative bg-white select-none flex flex-col">
      {/* Dynamic Scenario Bar with Subsection Badge & Educational Guide trigger */}
      <LabScenarioBar />

      <div ref={canvasContainerRef} className="flex-1 w-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => selectNode(node.id)}
          onEdgeClick={(_, edge) => selectEdge(edge.id)}
          onPaneClick={() => clearSelection()}
          snapToGrid={snapToGrid}
          snapGrid={[16, 16]}
          minZoom={0.2}
          maxZoom={2.5}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          className="touch-none"
        >
          {showGrid && (
            <Background
              variant={BackgroundVariant.Dots}
              gap={16}
              size={1.25}
              color="#DCE2EA"
              className="bg-[#FAFAFA]"
            />
          )}
          <Controls
            showInteractive={false}
            className="!bg-white !border !border-[#DCE2EA] !rounded-md !shadow-2xs !m-3"
          />

          {/* Minimap Toggle Floating Pill */}
          <div className="absolute bottom-3 right-3 z-10 flex flex-col items-end space-y-2 pointer-events-auto">
            {showMiniMap && (
              <MiniMap
                nodeColor="#1749C8"
                maskColor="rgba(245, 247, 250, 0.7)"
                className="!bg-white !border !border-[#DCE2EA] !rounded-md !shadow-md !static !m-0"
              />
            )}
            <button
              type="button"
              onClick={toggleMiniMap}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border shadow-2xs transition-all cursor-pointer flex items-center space-x-1.5 ${
                showMiniMap
                  ? 'bg-[#172033] text-white border-[#172033]'
                  : 'bg-white text-[#475569] border-[#DCE2EA] hover:border-[#1749C8] hover:text-[#1749C8]'
              }`}
              title="Toggle canvas minimap (reserved non-obstructive overlay)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1749C8]" />
              <span>{showMiniMap ? 'Hide Minimap' : 'Show Minimap'}</span>
            </button>
          </div>
        </ReactFlow>
      </div>
    </div>
  );
};

