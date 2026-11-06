import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { LabTopToolbar } from './components/toolbar/LabTopToolbar';
import { LabCategorySidebar } from './components/sidebar/LabCategorySidebar';
import { VisualizationCanvas } from './components/canvas/VisualizationCanvas';
import { LabInspectorPanel } from './components/inspector/LabInspectorPanel';
import { LabBottomBar } from './components/bottombar/LabBottomBar';
import { JavaCodeDrawer } from './components/code/JavaCodeDrawer';
import { EducationalGuideModal } from './components/educational/EducationalGuideModal';
import { useVisualizationLabStore } from './visualizationStore';

export const VisualizationLabPage: React.FC = () => {
  const { isCodeDrawerOpen, toggleCodeDrawer } = useVisualizationLabStore();

  return (
    <ReactFlowProvider>
      <div className="h-full w-full flex flex-col overflow-hidden bg-[#FAFAFA] font-sans select-none relative">
        {/* A. Top Toolbar */}
        <LabTopToolbar />

        {/* Main 3-Area Workspace: Left Sidebar + Center Canvas + Right Inspector */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* B. Left Sidebar: Visualization Library & Dynamic What-is-What Legend */}
          <LabCategorySidebar />

          {/* C. Main 2D Canvas */}
          <main className="flex-1 h-full overflow-hidden relative">
            <VisualizationCanvas />
          </main>

          {/* D. Right Inspector Panel: Dual Tabs & Data Provenance */}
          <LabInspectorPanel />
        </div>

        {/* E. Bottom Metrics & Execution Playback Bar */}
        <LabBottomBar />

        {/* F. Live Java Source Code & Execution Engine Drawer */}
        <JavaCodeDrawer isOpen={isCodeDrawerOpen} onClose={toggleCodeDrawer} />

        {/* G. Pedagogical Educational Guide Modal (Section 14) */}
        <EducationalGuideModal />
      </div>
    </ReactFlowProvider>
  );
};

