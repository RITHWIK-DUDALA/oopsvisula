import React from 'react';
import { Sun } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Preferences</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Workspace & Editor Settings</h1>
        <p className="text-xs text-muted-foreground">Customize Monaco editor behavior, playback animation speeds, and accessibility preferences.</p>
      </div>

      <div className="p-6 bg-white border border-border rounded-xl space-y-6">
        <div>
          <h2 className="text-sm font-bold text-foreground mb-1">Theme Selection</h2>
          <p className="text-xs text-muted-foreground mb-3">OOPS LAB uses a standardized monochromatic light theme to maximize legibility.</p>
          <div className="flex items-center space-x-3">
            <button className="px-3.5 py-2 border-2 border-foreground bg-white text-xs font-medium rounded-lg text-foreground flex items-center space-x-2">
              <Sun className="w-4 h-4 stroke-[1.5]" />
              <span>Monochrome Light (Default)</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h2 className="text-sm font-bold text-foreground mb-1">Editor Font Size</h2>
          <p className="text-xs text-muted-foreground mb-3">Adjust the font size of the Monaco Java editor.</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono bg-surface border border-border px-3 py-1.5 rounded-lg text-foreground">13px (Recommended)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h2 className="text-sm font-bold text-foreground mb-1">Simulation Speed</h2>
          <p className="text-xs text-muted-foreground mb-3">Step delay for automated trace playback.</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono bg-surface border border-border px-3 py-1.5 rounded-lg text-foreground">1.0x (Normal)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

