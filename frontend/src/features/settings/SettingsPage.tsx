import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettingsStore } from '@/services/storage/settingsStore';
import { useLearnerStore } from '@/services/storage/localStore';
import { useAuthStore } from '@/services/storage/authStore';
import {
  clearAllApplicationStorage,
  getApplicationStorageStats,
} from '@/services/storage/secureStorage';
import CometDial from '@/components/CometDial';
import {
  Sun,
  Type,
  Gauge,
  Sliders,
  RotateCcw,
  Code2,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Database,
  X,
  CheckCircle2,
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

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [storageStats, setStorageStats] = useState({
    keysCount: 0,
    approximateBytes: 0,
    keys: [] as string[],
  });
  const [clearedStatus, setClearedStatus] = useState<string | null>(null);

  const refreshStorageStats = () => {
    const stats = getApplicationStorageStats();
    setStorageStats(stats);
  };

  useEffect(() => {
    refreshStorageStats();
  }, []);

  const handleConfirmClear = () => {
    // 1. Purge strictly OOPS LAB keys from browser storage
    const res = clearAllApplicationStorage();

    // 2. Reset in-memory zustand states to clean defaults
    resetDefaults();
    useLearnerStore.getState().resetProgress();
    useAuthStore.getState().enterAsGuest();

    // 3. Refresh statistics
    refreshStorageStats();
    setClearedStatus(
      `Successfully purged ${res.removedKeysCount} application storage keys. Personal and external data are untouched.`
    );
    setIsClearModalOpen(false);

    // 4. Auto-dismiss banner after 5 seconds
    setTimeout(() => {
      setClearedStatus(null);
    }, 5000);
  };

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
            Customize Monaco editor behavior, playback animation speeds, and storage preferences.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white hover:bg-surface text-foreground text-xs font-medium rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {clearedStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-xl border border-[#D1D5DB] bg-white shadow-xs flex items-center justify-between text-xs text-[#111111]"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-4 h-4 text-[#111111] stroke-[2.2] shrink-0" />
            <span className="font-medium">{clearedStatus}</span>
          </div>
          <button
            onClick={() => setClearedStatus(null)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </motion.div>
      )}

      <div className="p-6 sm:p-8 bg-white border border-border rounded-xl space-y-8 shadow-xs">
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
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
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
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors cursor-pointer ${
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
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors cursor-pointer ${
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
                className={`w-full py-1 px-2.5 text-xs font-mono rounded border text-center transition-colors cursor-pointer ${
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
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
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
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                autoStepOnLoad
                  ? 'bg-white border-foreground text-foreground font-bold shadow-xs'
                  : 'bg-surface border-border text-muted-foreground'
              }`}
            >
              {autoStepOnLoad ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Data Privacy & Storage Management (8pt spacing family) */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-foreground stroke-[1.5]" />
              <h2 className="text-sm font-bold text-foreground">Local Storage & Privacy</h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-surface px-2.5 py-1 rounded-md border border-border">
              {storageStats.keysCount} OOPS Keys ({Math.max(0.1, Math.round((storageStats.approximateBytes / 1024) * 10) / 10)} KB)
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            All your code snippets, visualizer custom designs, and learning progress are saved strictly inside your local browser storage. No cloud database or telemetry server tracks your device.
          </p>

          <div className="p-4 border border-border rounded-xl bg-surface/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground block">
                  Purge Application Data
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Permanently delete all locally stored OOPS LAB code drafts, challenges, and preferences.
                </p>
                <div className="flex items-center space-x-1.5 pt-1 text-[11px] font-mono text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-foreground stroke-[2] shrink-0" />
                  <span>Strict Boundary: Purges only keys starting with &apos;oops&apos;. Personal browser files and other websites are 100% untouched.</span>
                </div>
              </div>

              <button
                onClick={() => setIsClearModalOpen(true)}
                className="px-4 py-2 bg-white hover:bg-[#F3F4F6] text-[#111111] border border-[#D1D5DB] hover:border-[#111111] text-xs font-semibold rounded-lg flex items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs active:scale-98"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Clear All My Data</span>
              </button>
            </div>
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

      {/* Confirmation Dialog Modal */}
      <AnimatePresence>
        {isClearModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md select-none">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsClearModalOpen(false)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden flex flex-col text-[#111111] z-10 p-8 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-xs shrink-0">
                    <AlertTriangle className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] leading-tight">
                      Clear All Application Data?
                    </h3>
                    <p className="text-xs text-[#6B7280] font-normal leading-tight mt-0.5">
                      Confirm permanent local data purge
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsClearModalOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#4B5563] leading-relaxed">
                <p>
                  This action will permanently delete all your locally saved Java code snippets, curriculum progress, custom settings, and browser cached sessions for OOPS LAB.
                </p>

                {/* Scope Guarantee Box */}
                <div className="p-3.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5 text-[11px] font-mono text-[#374151]">
                  <div className="font-semibold text-[#111111] flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#111111] stroke-[2.2]" />
                    <span>Protected Privacy Guarantee:</span>
                  </div>
                  <p className="text-[#4B5563]">
                    This script strictly targets keys starting with <code className="text-[#111111] bg-white px-1 py-0.5 rounded border border-[#E5E7EB]">&apos;oops&apos;</code> or <code className="text-[#111111] bg-white px-1 py-0.5 rounded border border-[#E5E7EB]">&apos;oopslab&apos;</code>.
                  </p>
                  <p className="text-[#6B7280]">
                    Your personal browser history, cookies, saved passwords, and data from any other website or localhost server are <strong>100% untouched and safe</strong>.
                  </p>
                </div>

                {storageStats.keys.length > 0 && (
                  <div className="text-[11px] font-mono text-[#6B7280]">
                    <span className="font-semibold text-[#111111]">Keys queued for deletion ({storageStats.keys.length}):</span>
                    <div className="mt-1 flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {storageStats.keys.map((k) => (
                        <span key={k} className="px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[10px]">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsClearModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmClear}
                  className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Yes, Purge App Data</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
