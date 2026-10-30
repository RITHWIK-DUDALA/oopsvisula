import React from 'react';
import { Download, Upload } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Analytics & History</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Learner Progress Tracker</h1>
          <p className="text-xs text-muted-foreground">Locally persisted metrics, concept mastery milestones, and code experiment history.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors">
            <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors">
            <Upload className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Import Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <span className="text-xs text-muted-foreground">Total Completion</span>
          <div className="text-3xl font-bold text-foreground">28%</div>
          <div className="w-full h-1.5 bg-surface border border-border rounded-full overflow-hidden">
            <div className="w-[28%] h-full bg-foreground" />
          </div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <span className="text-xs text-muted-foreground">Practice Challenges</span>
          <div className="text-3xl font-bold text-foreground">8 / 25</div>
          <div className="text-xs text-muted-foreground">17 challenges remaining</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <span className="text-xs text-muted-foreground">Trace Snapshots</span>
          <div className="text-3xl font-bold text-foreground">142</div>
          <div className="text-xs text-muted-foreground">Memory states explored</div>
        </div>
      </div>
    </div>
  );
};

