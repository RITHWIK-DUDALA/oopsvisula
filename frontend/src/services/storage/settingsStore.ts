import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkspaceSettings {
  editorFontSize: number;
  editorMinimap: boolean;
  editorLineNumbers: 'on' | 'off';
  editorWordWrap: 'on' | 'off';
  simulationSpeed: number;
  autoStepOnLoad: boolean;
  theme: 'monochrome-light';

  // Actions
  setEditorFontSize: (size: number) => void;
  setEditorMinimap: (enabled: boolean) => void;
  setEditorLineNumbers: (mode: 'on' | 'off') => void;
  setEditorWordWrap: (mode: 'on' | 'off') => void;
  setSimulationSpeed: (speed: number) => void;
  setAutoStepOnLoad: (enabled: boolean) => void;
  resetDefaults: () => void;
}

const defaultSettings = {
  editorFontSize: 13,
  editorMinimap: false,
  editorLineNumbers: 'on' as const,
  editorWordWrap: 'on' as const,
  simulationSpeed: 1.0,
  autoStepOnLoad: false,
  theme: 'monochrome-light' as const,
};

export const useSettingsStore = create<WorkspaceSettings>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setEditorFontSize: (size: number) => set({ editorFontSize: size }),
      setEditorMinimap: (enabled: boolean) => set({ editorMinimap: enabled }),
      setEditorLineNumbers: (mode: 'on' | 'off') => set({ editorLineNumbers: mode }),
      setEditorWordWrap: (mode: 'on' | 'off') => set({ editorWordWrap: mode }),
      setSimulationSpeed: (speed: number) => set({ simulationSpeed: speed }),
      setAutoStepOnLoad: (enabled: boolean) => set({ autoStepOnLoad: enabled }),
      resetDefaults: () => set(defaultSettings),
    }),
    {
      name: 'oopslab-settings-v1',
    }
  )
);
