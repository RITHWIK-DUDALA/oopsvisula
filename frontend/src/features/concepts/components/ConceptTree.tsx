import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ImageExportButton } from '@/components/shared/ImageExportButton';

export interface ConceptTreeNode {
  id: string;
  label: string;
  category?: string;
  description?: string;
  targetLessonId?: string;
  children?: ConceptTreeNode[];
}

export interface ConceptTreeProps {
  data: ConceptTreeNode;
  activeLessonId?: string;
  onSelectLesson?: (lessonId: string) => void;
  title?: string;
}

/**
 * Interactive Concept Tree Component
 * Follows stageshow craft standards:
 * - Minimal, high-clarity technical visualization.
 * - Monochromatic ink palette with cobalt blue (#075CF5) and warm orange (#FF7A00) accents.
 * - Interactive Controls: Zoom (+/-), Pan (drag), Expand All, Collapse All, Reset, Fullscreen.
 * - Node selection with contextual definition drawer and parent-path highlighting.
 */
export const ConceptTree: React.FC<ConceptTreeProps> = ({
  data,
  activeLessonId,
  onSelectLesson,
  title = 'Interactive Concept Map',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<ConceptTreeNode | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Set default selected node to active or root
  useEffect(() => {
    const findActive = (node: ConceptTreeNode): ConceptTreeNode | null => {
      if (node.targetLessonId === activeLessonId || node.id === activeLessonId) return node;
      if (node.children) {
        for (const child of node.children) {
          const res = findActive(child);
          if (res) return res;
        }
      }
      return null;
    };
    setSelectedNode(findActive(data) || data);
  }, [activeLessonId, data]);

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setCollapsedNodes(new Set());
  };

  const collapseAll = () => {
    const allIds = new Set<string>();
    const collectIds = (node: ConceptTreeNode) => {
      if (node.children && node.children.length > 0) {
        allIds.add(node.id);
        node.children.forEach(collectIds);
      }
    };
    collectIds(data);
    setCollapsedNodes(allIds);
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom controls
  const zoomIn = () => setScale((s) => Math.min(s + 0.15, 2.0));
  const zoomOut = () => setScale((s) => Math.max(s - 0.15, 0.5));

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.tree-node-interactive')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Check if a node is on the path to the selected node
  const isNodeOnSelectedPath = (node: ConceptTreeNode, targetId: string): boolean => {
    if (node.id === targetId) return true;
    if (node.children) {
      return node.children.some((child) => isNodeOnSelectedPath(child, targetId));
    }
    return false;
  };

  // Recursive tree renderer
  const renderNode = (node: ConceptTreeNode, depth: number = 0) => {
    const isCollapsed = collapsedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;
    const isTargetLesson = node.targetLessonId === activeLessonId;
    const onActivePath = selectedNode ? isNodeOnSelectedPath(node, selectedNode.id) : false;

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Capsule */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedNode(node)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedNode(node);
            }
          }}
          className={`tree-node-interactive group relative flex items-center space-x-2 px-3.5 py-2 rounded-xl border transition-all duration-200 select-none cursor-pointer shadow-xs ${
            isSelected
              ? 'bg-[#075CF5] text-white border-[#075CF5] shadow-[0_4px_16px_rgba(7,92,245,0.25)] scale-[1.02] z-20'
              : isTargetLesson
              ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA] font-semibold ring-2 ring-[#FF7A00]/40 z-10'
              : onActivePath
              ? 'bg-white text-[#17191D] border-[#075CF5]/50 ring-1 ring-[#075CF5]/20'
              : 'bg-white/90 text-[#374151] border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-white'
          }`}
        >
          {/* Depth badge or Category */}
          {node.category && (
            <span
              className={`text-[9.5px] font-mono uppercase px-1.5 py-0.5 rounded ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-[#F1F5F9] text-[#64748B]'
              }`}
            >
              {node.category}
            </span>
          )}

          {/* Node Label */}
          <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
            {node.label}
          </span>

          {/* Collapse/Expand Toggle Button */}
          {hasChildren && (
            <button
              type="button"
              onClick={(e) => toggleCollapse(node.id, e)}
              className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                isSelected
                  ? 'hover:bg-white/20 text-white'
                  : 'text-[#64748B] hover:text-[#17191D] hover:bg-black/5'
              }`}
              title={isCollapsed ? 'Expand Children' : 'Collapse Children'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-3 h-3 stroke-[2.5]" />
              )}
            </button>
          )}

          {/* Target Lesson Indicator */}
          {node.targetLessonId && (
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSelected ? 'bg-white' : 'bg-[#FF7A00]'
              }`}
              title="Has dedicated lesson"
            />
          )}
        </div>

        {/* Children branch with SVG vertical & horizontal connectors */}
        {hasChildren && !isCollapsed && (
          <div className="relative pt-6 flex justify-center">
            {/* Vertical connector down from parent */}
            <div
              className={`absolute top-0 w-px h-6 -translate-x-1/2 left-1/2 ${
                onActivePath ? 'bg-[#075CF5]' : 'bg-[#CBD5E1]'
              }`}
            />

            {/* Horizontal connector across all child siblings */}
            {node.children!.length > 1 && (
              <div
                className="absolute top-6 h-px bg-[#CBD5E1]"
                style={{
                  left: `calc(100% / (${node.children!.length} * 2))`,
                  right: `calc(100% / (${node.children!.length} * 2))`,
                }}
              />
            )}

            {/* Child columns */}
            <div className="flex space-x-6 sm:space-x-8">
              {node.children!.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical connector to child */}
                  <div className="w-px h-6 bg-[#CBD5E1]" />
                  {renderNode(child, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col select-none transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-white' : 'w-full min-h-[480px]'
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="h-12 px-4 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#075CF5] stroke-[2]" />
          <span className="text-xs font-bold text-[#17191D] tracking-tight">{title}</span>
          <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">
            Interactive Visual Structure
          </span>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={expandAll}
            className="px-2 py-1 text-[11px] font-mono text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title="Expand All Nodes"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2 py-1 text-[11px] font-mono text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title="Collapse All Nodes"
          >
            Collapse All
          </button>

          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

          <button
            type="button"
            onClick={zoomIn}
            className="p-1 text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={zoomOut}
            className="p-1 text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title="Reset Zoom & Position"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1 text-[#64748B] hover:text-[#17191D] hover:bg-[#F1F5F9] rounded transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 stroke-[2]" />
            )}
          </button>

          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

          <ImageExportButton
            getTargetElement={() => containerRef.current}
            fileName={`oops-lab-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            variant="compact"
          />
        </div>
      </div>

      {/* Main Interactive Canvas Area (Pan & Zoom) */}
      <div
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing p-8 flex items-center justify-center min-h-[380px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="transition-transform duration-75 origin-center inline-block"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          {renderNode(data)}
        </div>
      </div>

      {/* Bottom Contextual Definition Drawer for Selected Node */}
      {selectedNode && (
        <div className="border-t border-[#E5E7EB] bg-white/95 backdrop-blur-xs p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 z-20">
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#075CF5]" />
              <h4 className="text-xs font-bold text-[#17191D] truncate">
                {selectedNode.label}
              </h4>
              {selectedNode.category && (
                <span className="text-[10px] font-mono text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.2 rounded">
                  {selectedNode.category}
                </span>
              )}
            </div>
            <p className="text-xs text-[#50566A] line-clamp-2">
              {selectedNode.description ||
                'Explore the structural properties, JVM memory mechanics, and syntax rules for this concept.'}
            </p>
          </div>

          {selectedNode.targetLessonId && (
            <button
              type="button"
              onClick={() => {
                if (onSelectLesson && selectedNode.targetLessonId) {
                  onSelectLesson(selectedNode.targetLessonId);
                }
              }}
              className="px-3.5 py-1.5 bg-[#17191D] hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <span>Explore Lesson</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
