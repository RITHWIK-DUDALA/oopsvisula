import React, { useState, useRef, useEffect } from 'react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { VisualClassBuilder } from '@/features/class-builder/VisualClassBuilder';
import { scanJavaSourceSecurity } from '@/services/ast/astSecurityFilter';
import { ShieldAlert, X } from 'lucide-react';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { ResizableWorkspace } from './components/ResizableWorkspace';
import { SourceEditorPanel } from './components/SourceEditorPanel';
import { UnifiedRuntimeVisualizer } from './components/UnifiedRuntimeVisualizer';
import { ExecutionInspectorPanel } from './components/ExecutionInspectorPanel';
import { ExecutionControlBar } from './components/ExecutionControlBar';
import { PlaygroundStatusBar } from './components/PlaygroundStatusBar';

export const PlaygroundPage: React.FC = () => {
  const { currentTrace, workspaceMode } = useSimulationStore();

  const [securityAlert, setSecurityAlert] = useState<string | null>(null);
  const [mobileActiveView, setMobileActiveView] = useState<'editor' | 'visualizer' | 'inspector'>('visualizer');
  const resetLayoutRef = useRef<(() => void) | null>(null);

  // Run security scan when trace code changes
  useEffect(() => {
    const scan = scanJavaSourceSecurity(currentTrace.sourceCode);
    if (!scan.passed) {
      setSecurityAlert(scan.violations[0]);
    } else {
      setSecurityAlert(null);
    }
  }, [currentTrace.id, currentTrace.sourceCode]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-white select-none">
      {/* 1. Workspace Toolbar (Section 6) */}
      <WorkspaceToolbar
        onResetLayout={() => resetLayoutRef.current?.()}
      />

      {/* Security Alert Toast if violation caught */}
      {securityAlert && (
        <div className="px-4 py-2 bg-[#171717] text-white text-xs font-mono flex items-center justify-between shrink-0 shadow-sm z-30">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-white shrink-0 stroke-[2]" />
            <span>[AST Security Filter] {securityAlert}</span>
          </div>
          <button
            type="button"
            onClick={() => setSecurityAlert(null)}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Dismiss security alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mobile-Only Panel Switcher (Section 17: single-view mode below 768px) */}
      <div className="md:hidden h-9 px-4 bg-[#FAFAFA] border-b border-[#E8E8E8] flex items-center justify-between text-xs font-mono shrink-0">
        <span className="text-[10px] text-[#999999] uppercase font-bold">Active View:</span>
        <div className="flex items-center bg-white border border-[#E8E8E8] rounded p-0.5">
          <button
            type="button"
            onClick={() => setMobileActiveView('editor')}
            className={`px-2 py-0.5 rounded text-[10px] ${
              mobileActiveView === 'editor'
                ? 'bg-[#171717] text-white font-bold'
                : 'text-[#777777]'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveView('visualizer')}
            className={`px-2 py-0.5 rounded text-[10px] ${
              mobileActiveView === 'visualizer'
                ? 'bg-[#171717] text-white font-bold'
                : 'text-[#777777]'
            }`}
          >
            Visualizer
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveView('inspector')}
            className={`px-2 py-0.5 rounded text-[10px] ${
              mobileActiveView === 'inspector'
                ? 'bg-[#171717] text-white font-bold'
                : 'text-[#777777]'
            }`}
          >
            Inspector
          </button>
        </div>
      </div>

      {/* 2. Main 3-Panel Workspace (Section 7, 8, 9, 10) */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {/* Full-width Class Builder Mode */}
        {workspaceMode === 'class-builder' && (
          <div className="h-full w-full overflow-hidden">
            <VisualClassBuilder />
          </div>
        )}

        {/* Full-width Editor Mode */}
        {workspaceMode === 'editor' && (
          <div className="h-full w-full overflow-hidden">
            <SourceEditorPanel />
          </div>
        )}

        {/* Full-width Visualizer Mode */}
        {workspaceMode === 'visualizer' && (
          <div className="h-full w-full overflow-hidden">
            <UnifiedRuntimeVisualizer />
          </div>
        )}

        {/* Split View Mode (Desktop 3-Panel Resizable / Mobile Single-View) */}
        {workspaceMode === 'split' && (
          <>
            {/* Desktop Three-Panel Resizable Workspace */}
            <div className="hidden md:block h-full w-full overflow-hidden">
              <ResizableWorkspace
                editor={<SourceEditorPanel />}
                visualizer={<UnifiedRuntimeVisualizer />}
                inspector={<ExecutionInspectorPanel />}
                onResetTrigger={(resetFn) => {
                  resetLayoutRef.current = resetFn;
                }}
              />
            </div>

            {/* Mobile Adaptive Single-View */}
            <div className="md:hidden h-full w-full overflow-hidden">
              {mobileActiveView === 'editor' && <SourceEditorPanel />}
              {mobileActiveView === 'visualizer' && <UnifiedRuntimeVisualizer />}
              {mobileActiveView === 'inspector' && <ExecutionInspectorPanel />}
            </div>
          </>
        )}
      </div>

      {/* 3. Execution Control Bar & Interactive Timeline (Section 11, 12) */}
      <ExecutionControlBar />

      {/* 4. Compact Status Bar (Section 13) */}
      <PlaygroundStatusBar />
    </div>
  );
};
