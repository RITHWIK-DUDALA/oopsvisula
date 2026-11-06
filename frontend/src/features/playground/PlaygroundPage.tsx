import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause,
  RotateCcw, 
  Columns, 
  Code, 
  Layers,
  Folder,
  Sparkles,
  Terminal,
  PanelLeftClose,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Zap
} from 'lucide-react';
import { LiveExecutionVisualizer } from './components/live/LiveExecutionVisualizer';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useShellStore } from '@/app/store/shellStore';
import { ProjectExplorer } from './components/ProjectExplorer';
import { JavaEditor } from './components/JavaEditor';
import { VisualizationWorkspace } from './components/VisualizationWorkspace';
import { CodeIntelligenceInspector } from './components/CodeIntelligenceInspector';
import { ExecutionPanel } from './components/ExecutionPanel';

export const PlaygroundPage: React.FC = () => {
  const { 
    compileAndExecute, 
    reset, 
    isPlaying,
    togglePlay,
    stepForward,
    stepBackward,
    currentStepIndex,
    currentTrace,
    loadProjectTemplate,
    playgroundMode,
    setPlaygroundMode,
    workspaceMode,
    setWorkspaceMode,
    compilationError
  } = useSimulationStore();

  const { isSidebarCollapsed, toggleSidebarCollapse } = useShellStore();

  // Collapsible panel visibility states (Defaults: Explorer closed, Inspector closed, Bottom panel compact)
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [explorerWidth, setExplorerWidth] = useState(240);

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [inspectorWidth, setInspectorWidth] = useState(300);

  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [bottomHeight, setBottomHeight] = useState(200);

  // Central workspace split ratio (0.5 = 50% Editor / 50% Visualization)
  const [splitRatio, setSplitRatio] = useState(0.5);

  // Active drag tracking for fluid resizers
  const [activeDrag, setActiveDrag] = useState<'explorer' | 'split' | 'inspector' | 'bottom' | null>(null);

  // Source line navigation target
  const [targetLine, setTargetLine] = useState<number | null>(null);

  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);

  const totalSteps = currentTrace?.events?.length || 0;

  // Responsive layout: auto-collapse secondary sidebars on smaller screens (<1200px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1180) {
        setIsInspectorOpen(false);
      }
      if (window.innerWidth < 960) {
        setIsExplorerOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global Keyboard Shortcuts (IDE standard: Ctrl+B for explorer, Ctrl+J for terminal, Ctrl+Enter for run)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is actively typing in a form input or textarea
      if (
        (e.target instanceof HTMLInputElement && e.target.type === 'text') ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsExplorerOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsBottomOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsInspectorOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        compileAndExecute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [compileAndExecute]);

  // Unified Mouse Dragging for All 4 Resizable Dividers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeDrag) return;

    if (activeDrag === 'explorer') {
      const newWidth = Math.min(Math.max(180, e.clientX - (isSidebarCollapsed ? 64 : 228)), 400);
      setExplorerWidth(newWidth);
    } else if (activeDrag === 'inspector') {
      const newWidth = Math.min(Math.max(240, window.innerWidth - e.clientX), 460);
      setInspectorWidth(newWidth);
    } else if (activeDrag === 'bottom') {
      const newHeight = Math.min(Math.max(120, window.innerHeight - e.clientY), 450);
      setBottomHeight(newHeight);
    } else if (activeDrag === 'split' && splitContainerRef.current) {
      const rect = splitContainerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const newRatio = Math.min(Math.max(0.18, relativeX / rect.width), 0.82);
      setSplitRatio(newRatio);
    }
  }, [activeDrag, isSidebarCollapsed]);

  const handleMouseUp = useCallback(() => {
    setActiveDrag(null);
  }, []);

  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDrag, handleMouseMove, handleMouseUp]);

  // Navigation callbacks
  const handleSelectEntity = (_id: string, _file: string, line?: number) => {
    if (line) {
      setTargetLine(line);
    }
  };

  const handleJumpToSource = (_file: string, line: number) => {
    setTargetLine(line);
  };

  return (
    <div className="h-full w-full flex flex-col bg-surface text-foreground overflow-hidden font-sans select-none min-w-0 min-h-0 relative">
      {/* Invisible Global Overlay during active drag to prevent iframe / Monaco cursor trapping */}
      {activeDrag && (
        <div 
          className={`fixed inset-0 z-50 ${
            activeDrag === 'bottom' ? 'cursor-row-resize' : 'cursor-col-resize'
          }`} 
        />
      )}

      {/* 1. Main Professional IDE Application Toolbar (Height: 44px) */}
      <header className="h-11 border-b border-border bg-white px-3 flex items-center justify-between shrink-0 z-20 shadow-2xs">
        {/* Left Section: Nav Toggle + Branding + Project Selector */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleSidebarCollapse}
            title={isSidebarCollapsed ? 'Expand Main Navigation' : 'Collapse Main Navigation'}
            className="p-1.5 rounded-md hover:bg-neutral-100 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono shadow-xs">
              ☕
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-tight text-foreground">
                OOPS LAB <span className="font-mono font-normal text-muted-foreground">/ Playground</span>
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Project Template Quick Loader */}
          <div className="flex items-center space-x-1.5 text-xs">
            <select
              onChange={(e) => loadProjectTemplate(e.target.value as any)}
              defaultValue="custom"
              aria-label="Workspace Project Template"
              className="px-2 py-1 bg-surface border border-border rounded text-[11px] font-mono outline-none cursor-pointer hover:border-foreground/40 transition-colors max-w-[160px] sm:max-w-[210px] truncate"
            >
              <option value="custom">Clean Project (Blank Main)</option>
              <option value="banking">Optional Sample: Banking</option>
              <option value="shapes">Optional Sample: Shapes</option>
              <option value="loops-arrays">Optional Sample: Arrays & Loops</option>
              <option value="exceptions">Optional Sample: Exceptions</option>
            </select>
          </div>
        </div>

        {/* Center Section: Java 21 + Primary Run & Stepping Controls */}
        <div className="flex items-center space-x-2">
          <span className="hidden md:inline-flex px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-mono font-medium rounded border border-border">
            Java 21 LTS
          </span>

          <button
            onClick={() => compileAndExecute()}
            disabled={isPlaying}
            title="Compile & Run Project (Ctrl+Enter)"
            className="flex items-center space-x-1.5 px-3 py-1 bg-foreground text-background text-xs font-medium rounded hover:bg-black/90 transition-all shadow-xs disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Compile & Run</span>
            <span className="sm:hidden">Run</span>
          </button>

          {/* Execution Stepping Controls */}
          <div className="hidden sm:flex items-center space-x-0.5 bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => reset()}
              title="Reset Execution (F9)"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => stepBackward()}
              disabled={currentStepIndex <= 0}
              title="Step Backward (Left Arrow)"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => togglePlay()}
              title={isPlaying ? 'Pause' : 'Play Timeline'}
              className="p-1 rounded hover:bg-white text-foreground transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => stepForward()}
              disabled={currentStepIndex >= totalSteps - 1}
              title="Step Forward (Right Arrow / F10)"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground px-1.5">
              {totalSteps > 0 ? `${currentStepIndex + 1}/${totalSteps}` : '0/0'}
            </span>
          </div>
        </div>

        {/* Right Section: 2D/3D Mode + Workspace Views + Panel Toggles */}
        <div className="flex items-center space-x-2">
          {/* Architecture / Live Mode Switcher */}
          <div className="hidden sm:flex items-center bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => setPlaygroundMode('architecture')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                playgroundMode === 'architecture' ? 'bg-white shadow-2xs text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Architecture Mode: Static UML diagrams, relationships & concepts"
            >
              <Layers className="w-3 h-3 text-blue-600" />
              <span>Architecture</span>
            </button>
            <button
              onClick={() => setPlaygroundMode('live')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                playgroundMode === 'live' ? 'bg-white shadow-2xs text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Live Mode: Progressive line-by-line Java execution visualization"
            >
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500/20" />
              <span>Live Mode</span>
            </button>
          </div>

          {/* Workspace Layout Mode (Split / Full Editor / Full Visualizer) */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => setWorkspaceMode('split')}
              title="Split View (Editor + Visualizer)"
              className={`p-1 rounded text-xs transition-all ${
                workspaceMode === 'split' ? 'bg-white shadow-2xs text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setWorkspaceMode('editor')}
              title="Editor Full View"
              className={`p-1 rounded text-xs transition-all ${
                workspaceMode === 'editor' ? 'bg-white shadow-2xs text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setWorkspaceMode('visualizer')}
              title="Visualizer Full View"
              className={`p-1 rounded text-xs transition-all ${
                workspaceMode === 'visualizer' ? 'bg-white shadow-2xs text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-border mx-0.5" />

          {/* Project Explorer Toggle */}
          <button
            onClick={() => setIsExplorerOpen((prev) => !prev)}
            title="Toggle Project Explorer (Ctrl+B)"
            className={`p-1.5 rounded-md border transition-all ${
              isExplorerOpen 
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs' 
                : 'bg-white border-border text-muted-foreground hover:text-foreground hover:bg-neutral-50'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
          </button>

          {/* Code Intelligence Inspector Toggle */}
          <button
            onClick={() => setIsInspectorOpen((prev) => !prev)}
            title="Toggle Code Intelligence Inspector (Ctrl+I)"
            className={`p-1.5 rounded-md border transition-all ${
              isInspectorOpen 
                ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-2xs' 
                : 'bg-white border-border text-muted-foreground hover:text-foreground hover:bg-neutral-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Bottom Execution Panel Toggle */}
          <button
            onClick={() => setIsBottomOpen((prev) => !prev)}
            title="Toggle Terminal & Execution Panel (Ctrl+J)"
            className={`p-1.5 rounded-md border transition-all relative ${
              isBottomOpen 
                ? 'bg-neutral-900 border-neutral-900 text-white shadow-2xs' 
                : 'bg-white border-border text-muted-foreground hover:text-foreground hover:bg-neutral-50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            {compilationError && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Body (Full viewport height, 0 outer scroll) */}
      <div ref={workspaceRef} className="flex-1 flex overflow-hidden min-w-0 min-h-0 relative">
        {/* A. Collapsible Left Project Explorer */}
        {isExplorerOpen ? (
          <div 
            style={{ width: `${explorerWidth}px` }}
            className="h-full shrink-0 flex relative bg-white border-r border-border min-w-0 min-h-0"
          >
            <div className="flex-1 h-full min-w-0 min-h-0 overflow-hidden">
              <ProjectExplorer 
                onSelectEntity={handleSelectEntity} 
                onClose={() => setIsExplorerOpen(false)} 
              />
            </div>
            {/* Draggable Divider */}
            <div
              onMouseDown={() => setActiveDrag('explorer')}
              title="Drag to resize explorer"
              className="w-1 absolute right-0 top-0 bottom-0 hover:bg-blue-500/40 active:bg-blue-600 cursor-col-resize transition-colors z-20"
            />
          </div>
        ) : (
          /* Collapsed Explorer Narrow Strip */
          <div className="w-10 shrink-0 h-full border-r border-border bg-neutral-50/70 flex flex-col items-center py-2 space-y-2 select-none">
            <button
              onClick={() => setIsExplorerOpen(true)}
              title="Expand Project Explorer (Ctrl+B)"
              className="p-1.5 rounded-md hover:bg-neutral-200/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Folder className="w-4 h-4" />
            </button>
            <div 
              onClick={() => setIsExplorerOpen(true)}
              className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground [writing-mode:vertical-lr] rotate-180 cursor-pointer hover:text-foreground pt-2"
            >
              Files
            </div>
          </div>
        )}

        {/* B. Central Editor + Visualization + Bottom Panel Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 min-h-0 overflow-hidden">
          {/* Central Workspace (Split or Solo Mode) */}
          <div 
            ref={splitContainerRef}
            className="flex-1 flex overflow-hidden min-w-0 min-h-0 relative"
          >
            {/* Java Code Editor */}
            {(workspaceMode === 'split' || workspaceMode === 'editor') && (
              <div 
                style={{ 
                  width: workspaceMode === 'split' ? `calc(${splitRatio * 100}% - 4px)` : '100%' 
                }}
                className="h-full min-w-[200px] min-h-0 overflow-hidden relative"
              >
                <JavaEditor targetLine={targetLine} onRunCode={compileAndExecute} />
              </div>
            )}

            {/* Draggable Splitter Divider in Split Mode */}
            {workspaceMode === 'split' && (
              <div
                onMouseDown={() => setActiveDrag('split')}
                onDoubleClick={() => setSplitRatio(0.5)}
                title="Drag to adjust split. Double-click to reset (50/50)."
                className="w-2 relative bg-neutral-100 hover:bg-blue-500/30 active:bg-blue-600/50 cursor-col-resize transition-colors flex items-center justify-center shrink-0 z-10 border-x border-border/60 group"
              >
                <div className="w-0.5 h-6 bg-neutral-300 group-hover:bg-blue-600 rounded-full transition-colors" />
              </div>
            )}

            {/* Visualization Workspace / Live Visualizer */}
            {(workspaceMode === 'split' || workspaceMode === 'visualizer') && (
              <div 
                style={{ 
                  width: workspaceMode === 'split' ? `calc(${(1 - splitRatio) * 100}% - 4px)` : '100%' 
                }}
                className="h-full min-w-[200px] min-h-0 overflow-hidden relative"
              >
                {playgroundMode === 'live' ? (
                  <LiveExecutionVisualizer 
                    onJumpToSource={handleJumpToSource}
                    onNavigateToArchitecture={() => setPlaygroundMode('architecture')}
                  />
                ) : (
                  <VisualizationWorkspace 
                    onSelectEntity={handleSelectEntity} 
                    onJumpToSource={handleJumpToSource} 
                  />
                )}
              </div>
            )}
          </div>

          {/* C. Collapsible Bottom Execution Panel */}
          {isBottomOpen ? (
            <div 
              style={{ height: `${bottomHeight}px` }}
              className="shrink-0 flex flex-col relative bg-white border-t border-border min-w-0 min-h-0"
            >
              {/* Draggable Horizontal Resizer */}
              <div
                onMouseDown={() => setActiveDrag('bottom')}
                title="Drag to resize execution panel"
                className="h-1.5 absolute -top-1 left-0 right-0 hover:bg-blue-500/40 active:bg-blue-600 cursor-row-resize transition-colors z-20"
              />
              <div className="flex-1 h-full min-w-0 min-h-0 overflow-hidden">
                <ExecutionPanel onClose={() => setIsBottomOpen(false)} />
              </div>
            </div>
          ) : (
            /* Collapsed Bottom Status Strip (Compact 28px) */
            <div 
              onClick={() => setIsBottomOpen(true)}
              className="h-7 px-3 border-t border-border bg-neutral-50 flex items-center justify-between shrink-0 text-xs text-muted-foreground hover:bg-neutral-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-600" />
                <span className="font-semibold text-foreground text-[11px]">Terminal & Execution</span>
                {compilationError ? (
                  <span className="text-[10px] text-red-600 font-mono font-bold bg-red-100 px-1.5 py-0.2 rounded border border-red-200">
                    Compilation Error
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-[10px] text-emerald-700 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Ready</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 text-[11px]">
                <span className="font-mono text-neutral-500">
                  {totalSteps > 0 ? `Step ${currentStepIndex + 1}/${totalSteps}` : 'No active trace'}
                </span>
                <span className="text-neutral-400 flex items-center space-x-1 text-[10px] hover:text-foreground">
                  <span>Open Panel</span>
                  <ChevronUp className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* D. Optional Right Code Intelligence Inspector */}
        {isInspectorOpen && (
          <div 
            style={{ width: `${inspectorWidth}px` }}
            className="h-full shrink-0 flex relative bg-white border-l border-border min-w-0 min-h-0"
          >
            {/* Draggable Divider on Left Edge */}
            <div
              onMouseDown={() => setActiveDrag('inspector')}
              title="Drag to resize inspector"
              className="w-1 absolute left-0 top-0 bottom-0 hover:bg-blue-500/40 active:bg-blue-600 cursor-col-resize transition-colors z-20"
            />
            <div className="flex-1 h-full min-w-0 min-h-0 overflow-hidden">
              <CodeIntelligenceInspector 
                onJumpToSource={handleJumpToSource} 
                onClose={() => setIsInspectorOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
