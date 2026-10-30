import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResizableWorkspaceProps {
  editor: React.ReactNode;
  visualizer: React.ReactNode;
  inspector: React.ReactNode;
  isInspectorCollapsed?: boolean;
  onToggleInspector?: () => void;
  onResetTrigger?: (resetFn: () => void) => void;
}

const STORAGE_KEY = 'oops_lab_workspace_ratios_v1';
const DEFAULT_RATIOS = [32, 40, 28]; // Exact percentages per Section 7
const MIN_WIDTHS = [320, 380, 300]; // Editor: 320px, Visualizer: 380px, Inspector: 300px

export const ResizableWorkspace: React.FC<ResizableWorkspaceProps> = ({
  editor,
  visualizer,
  inspector,
  isInspectorCollapsed = false,
  onResetTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load persisted ratios or fall back to default 32/40/28
  const [ratios, setRatios] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_RATIOS;
  });

  const [activeSeparator, setActiveSeparator] = useState<number | null>(null);

  const resetProportions = useCallback(() => {
    setRatios(DEFAULT_RATIOS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RATIOS));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    onResetTrigger?.(resetProportions);
  }, [onResetTrigger, resetProportions]);

  // Handle separator dragging
  const handleMouseDown = (separatorIndex: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSeparator(separatorIndex);
  };

  useEffect(() => {
    if (activeSeparator === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalWidth = rect.width;
      if (totalWidth <= 0) return;

      const mouseX = e.clientX - rect.left;

      setRatios((prev) => {
        const newRatios = [...prev];
        if (activeSeparator === 0) {
          // Separator between Editor (0) and Visualizer (1)
          const minRatio0 = (MIN_WIDTHS[0] / totalWidth) * 100;
          const minRatio1 = (MIN_WIDTHS[1] / totalWidth) * 100;
          let candidate0 = (mouseX / totalWidth) * 100;
          candidate0 = Math.max(minRatio0, candidate0);

          const max0 = 100 - minRatio1 - (isInspectorCollapsed ? 0 : prev[2]);
          candidate0 = Math.min(candidate0, max0);

          const delta = candidate0 - prev[0];
          newRatios[0] = candidate0;
          newRatios[1] = Math.max(minRatio1, prev[1] - delta);
        } else if (activeSeparator === 1) {
          // Separator between Visualizer (1) and Inspector (2)
          const minRatio1 = (MIN_WIDTHS[1] / totalWidth) * 100;
          const minRatio2 = (MIN_WIDTHS[2] / totalWidth) * 100;
          const rightRemaining = ((totalWidth - mouseX) / totalWidth) * 100;
          let candidate2 = Math.max(minRatio2, rightRemaining);

          const max2 = 100 - minRatio1 - prev[0];
          candidate2 = Math.min(candidate2, max2);

          const delta = candidate2 - prev[2];
          newRatios[2] = candidate2;
          newRatios[1] = Math.max(minRatio1, prev[1] - delta);
        }
        return newRatios;
      });
    };

    const handleMouseUp = () => {
      setActiveSeparator(null);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ratios));
      } catch {
        // ignore
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeSeparator, ratios, isInspectorCollapsed]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full flex overflow-hidden select-none ${
        activeSeparator !== null ? 'cursor-col-resize' : ''
      }`}
    >
      {/* Panel 1: Source Code Editor (32% default) */}
      <div
        style={{
          width: isInspectorCollapsed
            ? `${(ratios[0] / (ratios[0] + ratios[1])) * 100}%`
            : `${ratios[0]}%`,
          minWidth: `${MIN_WIDTHS[0]}px`,
        }}
        className="h-full flex flex-col overflow-hidden bg-white"
      >
        {editor}
      </div>

      {/* Draggable Separator 0 */}
      <div
        onMouseDown={handleMouseDown(0)}
        className="w-1.5 hover:w-1.5 -mx-[1px] relative z-20 cursor-col-resize bg-[#E8E8E8] hover:bg-[#171717] transition-colors flex items-center justify-center shrink-0 group"
        title="Drag to resize Editor and Visualizer"
      >
        <div className="w-0.5 h-6 bg-[#999999] group-hover:bg-white rounded-full transition-colors" />
      </div>

      {/* Panel 2: Unified JVM Runtime Visualizer (40% default) */}
      <div
        style={{
          width: isInspectorCollapsed
            ? `${(ratios[1] / (ratios[0] + ratios[1])) * 100}%`
            : `${ratios[1]}%`,
          minWidth: `${MIN_WIDTHS[1]}px`,
        }}
        className="h-full flex-1 flex flex-col overflow-hidden bg-white"
      >
        {visualizer}
      </div>

      {!isInspectorCollapsed && (
        <>
          {/* Draggable Separator 1 */}
          <div
            onMouseDown={handleMouseDown(1)}
            className="w-1.5 hover:w-1.5 -mx-[1px] relative z-20 cursor-col-resize bg-[#E8E8E8] hover:bg-[#171717] transition-colors flex items-center justify-center shrink-0 group"
            title="Drag to resize Visualizer and Inspector"
          >
            <div className="w-0.5 h-6 bg-[#999999] group-hover:bg-white rounded-full transition-colors" />
          </div>

          {/* Panel 3: Execution Inspector (28% default) */}
          <div
            style={{
              width: `${ratios[2]}%`,
              minWidth: `${MIN_WIDTHS[2]}px`,
            }}
            className="h-full flex flex-col overflow-hidden bg-white"
          >
            {inspector}
          </div>
        </>
      )}
    </div>
  );
};
