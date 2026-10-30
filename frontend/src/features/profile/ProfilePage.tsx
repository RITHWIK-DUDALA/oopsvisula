import React from 'react';
import { User, ShieldCheck, Award } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Learner Identity</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Guest Learner Profile</h1>
        <p className="text-xs text-muted-foreground">Session data, local progress achievements, and persistent storage diagnostics.</p>
      </div>

      <div className="p-6 bg-white border border-border rounded-xl space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-foreground">
            <User className="w-7 h-7 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-foreground">Guest Student</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-accent border border-border rounded text-foreground">Local Session</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Session ID: local-guest-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground font-medium">Local Storage Status</span>
            <div className="text-sm font-semibold text-foreground flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-foreground stroke-[1.5]" />
              <span>Healthy (IndexedDB Connected)</span>
            </div>
          </div>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground font-medium">Milestones Unlocked</span>
            <div className="text-sm font-semibold text-foreground flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-foreground stroke-[1.5]" />
              <span>3 Badges Earned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

