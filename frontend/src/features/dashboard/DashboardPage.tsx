import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  Eye,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useLearnerStore } from '@/services/storage/localStore';

export const DashboardPage: React.FC = () => {
  const {
    guestName,
    masteredTopics,
    solvedChallengeIds,
    simulationsRunCount,
    totalLabSeconds,
    exportSessionJson,
    resetProgress,
  } = useLearnerStore();

  const [notification, setNotification] = useState<string | null>(null);

  const formatLabTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  const handleExport = () => {
    const dataStr = exportSessionJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oops-lab-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('Progress exported to JSON file');
  };

  const handleReset = () => {
    if (window.confirm('Reset local progress? All mastered topics and session data will be cleared.')) {
      resetProgress();
      showNotice('Session progress reset to baseline');
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      {/* Toast Notice */}
      {notification && (
        <div className="p-3 bg-foreground text-background text-xs font-mono rounded-lg flex items-center justify-between shadow-sm">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="underline hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="p-6 bg-white border border-border rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Learner Dashboard</span>
            <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
              Local-First
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back, {guestName}</h1>
          <p className="text-xs text-muted-foreground">
            Your learning progress is stored locally in your browser with zero telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3 py-2 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-all"
            title="Download JSON progress backup"
          >
            <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 border border-border bg-white text-xs text-muted-foreground hover:text-foreground hover:border-foreground rounded-lg transition-all"
            title="Reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Reset</span>
          </button>

          <NavLink
            to="/playground"
            className="flex items-center space-x-2 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all"
          >
            <Terminal className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Open Playground</span>
          </NavLink>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Concepts Mastered</span>
            <BookOpen className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {masteredTopics.length} <span className="text-sm font-normal text-muted-foreground">/ 14</span>
          </div>
          <div className="text-[11px] text-muted-foreground">
            {masteredTopics.length >= 6 ? 'Core OOP unlocked' : 'Foundations in progress'}
          </div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Visual Simulations</span>
            <Eye className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{simulationsRunCount}</div>
          <div className="text-[11px] text-muted-foreground">Deterministic JDI traces executed</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Practice Solved</span>
            <Award className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {solvedChallengeIds.length} <span className="text-sm font-normal text-muted-foreground">/ 5</span>
          </div>
          <div className="text-[11px] text-muted-foreground">AST structural assertions passed</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Active Lab Time</span>
            <Clock className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{formatLabTime(totalLabSeconds)}</div>
          <div className="text-[11px] text-muted-foreground">Locally tracked in browser</div>
        </div>
      </div>

      {/* Active Modules & Recent Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Learning Path */}
        <div className="lg:col-span-2 p-6 bg-white border border-border rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground tracking-tight">Active Curriculum Sequence</h2>
              <p className="text-[11px] text-muted-foreground">Structured OOP progression from primitives to Java 21</p>
            </div>
            <NavLink to="/concepts" className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1">
              <span>View All 14</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </NavLink>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-surface transition-colors">
              <div className="flex items-center space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-foreground stroke-[1.5]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">1. Classes & Heap Allocation</div>
                  <div className="text-[11px] text-muted-foreground">Metaspace blueprints vs Eden space object instances</div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-accent rounded text-foreground">Mastered</span>
            </div>

            <div className="p-4 border border-border rounded-lg flex items-center justify-between bg-surface/50">
              <div className="flex items-center space-x-3.5">
                <Sparkles className="w-5 h-5 text-foreground stroke-[1.5]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">2. Constructors & `this` Reference Chaining</div>
                  <div className="text-[11px] text-muted-foreground">Default constructors, overloaded forms, explicit invocation</div>
                </div>
              </div>
              <NavLink to="/concepts" className="text-xs font-medium text-foreground hover:underline flex items-center space-x-1">
                <span>Resume</span>
                <ArrowRight className="w-3 h-3 stroke-[2]" />
              </NavLink>
            </div>

            <div className="p-4 border border-border rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <Circle className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">3. Encapsulation & Access Modifiers</div>
                  <div className="text-[11px] text-muted-foreground">private, protected, public, package-private, validation invariants</div>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">Up Next</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Tools */}
        <div className="p-6 bg-white border border-border rounded-xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground tracking-tight">Interactive Laboratories</h2>

          <div className="space-y-3">
            <NavLink
              to="/visualizers"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Visualizer Hub</span>
                <Eye className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Interactive diagrams: Heap allocations, Stack frames, Reference graphs.</p>
            </NavLink>

            <NavLink
              to="/playground"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Java 21 Playground</span>
                <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Write Java code and trace variables step-by-step with JDI execution events.</p>
            </NavLink>

            <NavLink
              to="/practice"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Practice Challenges</span>
                <Award className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Solve OOP design problems with automatic structural AST verification.</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
