import React, { useRef } from 'react';
import { useReactFlow } from '@xyflow/react';
import {
  Undo,
  Redo,
  RotateCcw,
  Grid,
  Sliders,
  Trash2,
  Copy,
  Code2,
  Upload,
  LayoutGrid,
  Maximize2,
  Layers,
  BookOpen,
  Search,
} from 'lucide-react';
import { useVisualizationLabStore } from '../../visualizationStore';
import { ImageExportButton } from '@/components/shared/ImageExportButton';

export const LabTopToolbar: React.FC = () => {
  const { fitView } = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    snapToGrid,
    toggleSnapToGrid,
    undo,
    redo,
    past,
    future,
    resetWorkspace,
    duplicateSelected,
    deleteSelected,
    selectedNodeId,
    selectedEdgeId,
    inspectorCollapsed,
    toggleInspector,
    isCodeDrawerOpen,
    toggleCodeDrawer,
    applyLayout,
    exportCurrentWorkspace,
    importWorkspace,
    activeSidebarTab,
    setActiveSidebarTab,
    activeCategoryId,
    searchQuery,
    setSearchQuery,
  } = useVisualizationLabStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed && Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
          importWorkspace(parsed);
        } else {
          alert('Invalid diagram JSON format.');
        }
      } catch {
        alert('Failed to parse diagram JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header
      className="h-12 px-3 sm:px-4 bg-white border-b border-[#DCE2EA] flex items-center justify-between shrink-0 select-none font-sans z-20 gap-2 overflow-x-auto no-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Left: Brand + Divider + Mode Switcher + Search Bar */}
      <div className="flex items-center space-x-2.5 min-w-0 shrink">
        <div className="flex items-center space-x-1.5 shrink-0">
          <div className="w-6 h-6 rounded bg-[#1749C8] flex items-center justify-center text-white font-mono text-xs font-bold shadow-2xs shrink-0">
            2D
          </div>
          <span className="font-bold text-xs tracking-tight text-[#172033] whitespace-nowrap">OOPS LAB</span>
        </div>

        <div className="w-[1px] h-4 bg-[#DCE2EA] shrink-0" />

        {/* Dual Mode Switcher: Modules vs What is What? (Blended into background) */}
        <div className="flex items-center space-x-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveSidebarTab('modules')}
            className={`flex items-center space-x-1.5 py-1.5 px-2.5 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSidebarTab === 'modules'
                ? 'text-[#1749C8] font-bold bg-transparent'
                : 'text-[#64748B] hover:text-[#172033] bg-transparent'
            }`}
            style={{
              fontSize: '12px',
              fontFamily: '"Space Mono", monospace',
            }}
            title="Browse all visualization modules"
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Modules</span>
          </button>
          <span className="text-[#CBD5E1] select-none text-xs">/</span>
          <button
            type="button"
            onClick={() => setActiveSidebarTab('what-is-what')}
            className={`flex items-center space-x-1.5 py-1.5 px-2.5 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSidebarTab === 'what-is-what'
                ? 'text-[#1749C8] font-bold bg-transparent'
                : 'text-[#64748B] hover:text-[#172033] bg-transparent'
            }`}
            style={{
              fontSize: '12px',
              fontFamily: '"Space Mono", monospace',
            }}
            title="View What is What dynamic semantic legend"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>What is What?</span>
          </button>
        </div>

        <div className="w-[1px] h-4 bg-[#DCE2EA] shrink-0" />

        {/* Search Concepts Input */}
        <div className="relative min-w-[120px] max-w-[210px] shrink">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts..."
            className="w-full pl-8 pr-6 py-1 bg-[#FAFBFD] hover:bg-white focus:bg-white border border-[#DCE2EA] focus:border-[#1749C8] rounded-md text-[#172033] outline-hidden text-xs transition-colors whitespace-nowrap"
            style={{
              fontFamily: '"IBM Plex Sans Condensed", sans-serif',
              fontSize: '13px',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#172033] text-xs font-mono font-bold"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right: Controls & Actions */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
        {/* Undo / Redo */}
        <div className="flex items-center border border-[#DCE2EA] rounded-md overflow-hidden bg-white shrink-0">
          <button
            type="button"
            onClick={undo}
            disabled={past.length === 0}
            className="p-1.5 hover:bg-[#F1F4F8] disabled:opacity-40 disabled:hover:bg-transparent text-[#172033] transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-[#DCE2EA]" />
          <button
            type="button"
            onClick={redo}
            disabled={future.length === 0}
            className="p-1.5 hover:bg-[#F1F4F8] disabled:opacity-40 disabled:hover:bg-transparent text-[#172033] transition-colors"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Entity Actions */}
        {(selectedNodeId || selectedEdgeId) && (
          <div className="flex items-center space-x-1 border border-[#DCE2EA] rounded-md px-1 bg-[#F1F4F8] shrink-0">
            {selectedNodeId && (
              <button
                type="button"
                onClick={duplicateSelected}
                className="p-1 text-[#64748B] hover:text-[#172033] hover:bg-white rounded transition-colors"
                title="Duplicate Selected (Ctrl+D)"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={deleteSelected}
              className="p-1 text-red-600 hover:bg-white rounded transition-colors"
              title="Delete Selected (Del)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Grid & Snap Toggle */}
        <button
          type="button"
          onClick={toggleSnapToGrid}
          className={`p-1.5 rounded-md border text-xs font-mono transition-colors shrink-0 ${
            snapToGrid
              ? 'bg-[#1749C8] text-white border-[#1749C8]'
              : 'bg-white text-[#64748B] border-[#DCE2EA] hover:border-[#172033]'
          }`}
          title="Toggle Grid Snapping"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        {/* Fit to View */}
        <button
          type="button"
          onClick={() => fitView({ padding: 0.22, duration: 400 })}
          className="p-1.5 rounded-md border border-[#DCE2EA] hover:border-[#172033] bg-white text-[#64748B] hover:text-[#172033] text-xs font-mono transition-colors shrink-0"
          title="Fit Diagram to Canvas"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Automatic Layout Selector */}
        <div className="hidden 2xl:flex items-center space-x-1 border border-[#DCE2EA] rounded-md px-1 py-0.5 bg-white shrink-0">
          <LayoutGrid className="w-3.5 h-3.5 text-[#64748B] ml-1" />
          <select
            onChange={(e) => applyLayout(e.target.value as 'hierarchical' | 'grid' | 'circular')}
            className="text-[11px] font-mono text-[#172033] bg-transparent outline-hidden py-0.5 pr-1 cursor-pointer"
            defaultValue="hierarchical"
            title="Apply automatic layout"
          >
            <option value="hierarchical">Hierarchy</option>
            <option value="grid">Grid</option>
            <option value="circular">Circular</option>
          </select>
        </div>

        {/* Hidden File Input for Import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".json"
          className="hidden"
        />

        {/* Import JSON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 rounded-md border border-[#DCE2EA] hover:border-[#172033] bg-white text-[#172033] text-xs font-mono transition-colors shrink-0"
          title="Import Diagram JSON"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>

        {/* Export Diagram (PNG / JPG / SVG / JSON) */}
        <ImageExportButton
          variant="icon"
          getTargetElement={() =>
            ((document.querySelector('.react-flow__viewport') as HTMLElement) ||
              (document.querySelector('.react-flow') as HTMLElement))
          }
          fileName={`oops-lab-${activeCategoryId || 'diagram'}`}
          onExportJson={exportCurrentWorkspace}
        />

        {/* Reset Workspace */}
        <button
          type="button"
          onClick={resetWorkspace}
          className="flex items-center space-x-1 p-1.5 sm:px-2.5 sm:py-1 bg-white border border-[#DCE2EA] hover:border-[#172033] rounded-md text-xs font-mono text-[#172033] transition-colors shrink-0"
          title="Reset to category preset"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xl:inline whitespace-nowrap">Reset</span>
        </button>

        {/* Toggle Live Java Source Code Drawer */}
        <button
          type="button"
          onClick={toggleCodeDrawer}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors font-semibold shrink-0 whitespace-nowrap ${
            isCodeDrawerOpen
              ? 'bg-[#1749C8] text-white border-[#1749C8]'
              : 'bg-white text-[#172033] border-[#DCE2EA] hover:border-[#1749C8]'
          }`}
          title="Toggle Java Code & Execution Panel"
        >
          <Code2 className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Java Code</span>
        </button>

        {/* Toggle Inspector */}
        <button
          type="button"
          onClick={toggleInspector}
          className={`p-1.5 rounded-md border text-xs font-mono transition-colors shrink-0 ${
            !inspectorCollapsed
              ? 'bg-[#F1F4F8] text-[#1749C8] border-[#1749C8]'
              : 'bg-white text-[#64748B] border-[#DCE2EA] hover:border-[#172033]'
          }`}
          title="Toggle Inspector Panel"
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </header>
  );
};
