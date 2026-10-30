import React from 'react';
import { useSettingsStore } from '@/services/storage/settingsStore';
import CometDial from '@/components/CometDial';
import {
  Sun,
  Type,
  Gauge,
  Sliders,
  RotateCcw,
  Code2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    editorFontSize,
    editorMinimap,
    editorLineNumbers,
    editorWordWrap,
    simulationSpeed,
    autoStepOnLoad,
    setEditorFontSize,
    setEditorMinimap,
    setEditorLineNumbers,
    setEditorWordWrap,
    setSimulationSpeed,
    setAutoStepOnLoad,
    resetDefaults,
  } = useSettingsStore();

  const fontSizes = [12, 13, 14, 16];
  const speeds = [0.5, 1.0, 1.5, 2.0];

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Preferences</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Workspace & Editor Settings</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Customize Monaco editor behavior, playback animation speeds, and accessibility preferences.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white hover:bg-surface text-foreground text-xs font-medium rounded-lg transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="p-6 bg-white border border-border rounded-xl space-y-8 shadow-xs">
        {/* Theme Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Visual Theme</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            OOPS LAB uses a standardized monochromatic light theme to maximize code readability and minimize cognitive fatigue.
          </p>
          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-2 border-2 border-foreground bg-white text-xs font-medium rounded-lg text-foreground flex items-center space-x-2">
              <Sun className="w-4 h-4 stroke-[1.5]" />
              <span>Monochrome Light (Locked)</span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">System-wide standard</span>
          </div>
        </div>

        {/* Editor Configuration */}
        <div className="pt-6 border-t border-border space-y-6">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Monaco Java Editor</h2>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground block">Editor Font Size</label>
            <div className="flex items-center space-x-2">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setEditorFontSize(size)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                    editorFontSize === size
                      ? 'bg-foreground text-background font-bold'
                      : 'bg-surface border border-border text-foreground hover:bg-surface/80'
                  }`}
                >
                  {size}px {size === 13 && '(Default)'}
                </button>
              ))}
            </div>
          </div>

          {/* Line Numbers & Minimap & WordWrap Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <span className="text-xs font-semibold text-foreground block">Line Numbers</span>
              <p className="text-[11px] text-muted-foreground">Toggle gutter line numbers in editor.</p>
              <button
                onClick={() => setEditorLineNumbers(editorLineNumbers === 'on' ? 'off' : 'on')}
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors ${
                  editorLineNumbers === 'on'
                    ? 'bg-white border-foreground text-foreground font-bold shadow-xs'
                    : 'bg-surface border-border text-muted-foreground'
                }`}
              >
                {editorLineNumbers === 'on' ? 'Line Numbers: ON' : 'Line Numbers: OFF'}
              </button>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <span className="text-xs font-semibold text-foreground block">Code Minimap</span>
              <p className="text-[11px] text-muted-foreground">Right-side code overview navigation.</p>
              <button
                onClick={() => setEditorMinimap(!editorMinimap)}
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors ${
                  editorMinimap
                    ? 'bg-white border-foreground text-foreground font-bold shadow-xs'
                    : 'bg-surface border-border text-muted-foreground'
                }`}
              >
                {editorMinimap ? 'Minimap: Visible' : 'Minimap: Hidden'}
              </button>
            </div>

            <div className="p-4 border border-border rounded-lg bg-surface/30 space-y-2">
              <span className="text-xs font-semibold text-foreground block">Word Wrap</span>
              <p className="text-[11px] text-muted-foreground">Wrap long lines at viewport edge.</p>
              <button
                onClick={() => setEditorWordWrap(editorWordWrap === 'on' ? 'off' : 'on')}
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors ${
                  editorWordWrap === 'on'
                    ? 'bg-white border-foreground text-foreground font-bold shadow-xs'
                    : 'bg-surface border-border text-muted-foreground'
                }`}
              >
                {editorWordWrap === 'on' ? 'Word Wrap: ON' : 'Word Wrap: OFF'}
              </button>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 border border-border rounded-lg bg-white space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-muted-foreground">
              <Code2 className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
              <span>Live Monaco Preview ({editorFontSize}px)</span>
            </div>
            <pre
              style={{ fontSize: `${editorFontSize}px` }}
              className="p-3 bg-surface border border-border rounded-md font-mono text-foreground overflow-x-auto leading-relaxed"
            >
{`public record Student(String name, int id) {
    public void study() {
        System.out.println(name + " is mastering Java OOP.");
    }
}`}
            </pre>
          </div>
        </div>

        {/* Visualizer Simulation Settings */}
        <div className="pt-6 border-t border-border space-y-6">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Simulation & Visualizer Engine</h2>
          </div>

          <div className="p-5 border border-border rounded-xl bg-surface/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-foreground block">Animation Playback Speed (CometDial)</span>
                <p className="text-xs text-muted-foreground mt-1 max-w-md">
                  Calibrate the step-by-step animation delay between bytecode execution events. Drag the dial or flick for momentum physics.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSimulationSpeed(s)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                      simulationSpeed === s
                        ? 'bg-foreground text-background font-bold'
                        : 'bg-white border border-border text-foreground hover:bg-surface'
                    }`}
                  >
                    {s.toFixed(1)}x {s === 1.0 && '(Normal)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white border border-border rounded-xl shadow-xs shrink-0">
              <CometDial
                value={simulationSpeed}
                defaultValue={1.0}
                min={0.2}
                max={3.0}
                step={0.1}
                unit="x"
                label="Animation Speed"
                accent="#18181b"
                ink="#71717a"
                size={150}
                sweep={300}
                thickness={5}
                speed={30}
                tapBounce={0.2}
                flickBounce={0.1}
                momentum={1}
                cometReach={160}
                cometWidth={8}
                onChange={(val) => setSimulationSpeed(Number(val.toFixed(1)))}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                Drag dial or flick
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface/30">
            <div>
              <span className="text-xs font-semibold text-foreground block">Auto-Step on Load</span>
              <p className="text-[11px] text-muted-foreground">Advance automatically when a new execution trace is loaded.</p>
            </div>
            <button
              onClick={() => setAutoStepOnLoad(!autoStepOnLoad)}
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                autoStepOnLoad
                  ? 'bg-white border-foreground text-foreground font-bold shadow-xs'
                  : 'bg-surface border-border text-muted-foreground'
              }`}
            >
              {autoStepOnLoad ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Environmental Metadata */}
        <div className="pt-6 border-t border-border space-y-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Client Environment & Storage</h2>
          </div>
          <div className="p-4 bg-surface/50 border border-border rounded-lg text-xs font-mono space-y-1 text-muted-foreground">
            <div>Storage Driver: <span className="text-foreground">LocalStorage (`oopslab-settings-v1`)</span></div>
            <div>Runtime Environment: <span className="text-foreground">Browser Client (Zero Cloud Tracking)</span></div>
            <div>Target JDK: <span className="text-foreground">Java 21 LTS</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
