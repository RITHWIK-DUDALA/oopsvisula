import React, { useState, useRef } from 'react';
import { Download, Upload, CheckCircle2, RotateCcw, Award, BookOpen, Clock, Cpu } from 'lucide-react';
import { useLearnerStore } from '@/services/storage/localStore';
import { curriculumLessons } from '@/data/curriculumData';

export const ProgressPage: React.FC = () => {
  const {
    masteredTopics,
    solvedChallengeIds,
    simulationsRunCount,
    totalLabSeconds,
    exportSessionJson,
    importSessionJson,
    resetProgress,
  } = useLearnerStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const totalLessons = curriculumLessons.length;
  const completionPercentage = Math.round((masteredTopics.length / totalLessons) * 100);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const handleExport = () => {
    const jsonStr = exportSessionJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oops-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('Progress backup downloaded as JSON');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importSessionJson(content);
      if (success) {
        showNotice('Session progress restored successfully');
      } else {
        showNotice('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      {/* Toast Notice */}
      {notice && (
        <div className="p-3 bg-foreground text-background text-xs font-mono rounded-lg flex items-center justify-between shadow-xs">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="underline hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Analytics & History</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-0.5">Learner Progress Tracker</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Locally persisted metrics, concept mastery milestones, and code experiment history.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Export Data</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors"
          >
            <Upload className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Import Data</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset local progress?')) {
                resetProgress();
                showNotice('Progress reset to zero');
              }
            }}
            className="p-2 border border-border bg-white text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            title="Reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* High-Level Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">Overall Track</span>
            <BookOpen className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{completionPercentage}%</div>
          <div className="w-full h-1.5 bg-surface border border-border rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">Practice Solved</span>
            <Award className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{solvedChallengeIds.length} / 5</div>
          <div className="text-xs text-muted-foreground">Challenges verified</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">Visual Traces</span>
            <Cpu className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{simulationsRunCount}</div>
          <div className="text-xs text-muted-foreground">Snapshots executed</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">Lab Time</span>
            <Clock className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{formatTime(totalLabSeconds)}</div>
          <div className="text-xs text-muted-foreground">Tracked in session</div>
        </div>
      </div>

      {/* Mastered Topics Checklist */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-foreground">Curriculum Mastery Breakdown</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {curriculumLessons.map((lesson) => {
            const mastered = masteredTopics.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="p-3 bg-surface/30 border border-border rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-2 h-2 rounded-full ${mastered ? 'bg-foreground' : 'bg-muted-foreground/30'}`} />
                  <span className={`font-medium ${mastered ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {lesson.stepNumber}. {lesson.title}
                  </span>
                </div>
                {mastered && (
                  <CheckCircle2 className="w-4 h-4 text-foreground stroke-[2]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
