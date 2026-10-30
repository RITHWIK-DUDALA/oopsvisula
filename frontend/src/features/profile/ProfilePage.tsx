import React from 'react';
import { User, ShieldCheck, Award, Clock, BookOpen, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLearnerStore } from '@/services/storage/localStore';

export const ProfilePage: React.FC = () => {
  const {
    guestId,
    guestName,
    createdAt,
    totalLabSeconds,
    masteredTopics,
    solvedChallengeIds,
    simulationsRunCount,
  } = useLearnerStore();

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const badges = [
    {
      id: 'badge-1',
      title: 'OOP Pioneer',
      desc: 'Mastered 3+ foundational concepts',
      unlocked: masteredTopics.length >= 3,
    },
    {
      id: 'badge-2',
      title: 'Encapsulation Guardian',
      desc: 'Solved BankAccount encapsulation challenge',
      unlocked: solvedChallengeIds.includes(1),
    },
    {
      id: 'badge-3',
      title: 'Polymorphic Architect',
      desc: 'Solved Polymorphic Shape Hierarchy challenge',
      unlocked: solvedChallengeIds.includes(2),
    },
    {
      id: 'badge-4',
      title: 'Java 21 Modernist',
      desc: 'Mastered Records & Sealed Hierarchies',
      unlocked: masteredTopics.includes('records') || masteredTopics.includes('sealed'),
    },
    {
      id: 'badge-5',
      title: 'Runtime Tracer',
      desc: 'Executed 10+ deterministic JDI simulations',
      unlocked: simulationsRunCount >= 10,
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Learner Identity</span>
          <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
            Zero-Telemetry Local Session
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">Guest Learner Profile</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Local-first progress state, earned achievement badges, and storage diagnostics.
        </p>
      </div>

      {/* User Card */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-foreground shrink-0">
              <User className="w-7 h-7 stroke-[1.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-foreground">{guestName}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-accent border border-border rounded text-foreground">
                  Guest Mode
                </span>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">ID: {guestId}</p>
              <p className="text-[11px] text-muted-foreground">Session created: {new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground bg-surface p-2.5 rounded-lg border border-border self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-foreground stroke-[1.5]" />
            <span>Encrypted in Browser (LocalStorage)</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground text-[11px] flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>Concepts</span>
            </span>
            <div className="text-base font-bold text-foreground">{masteredTopics.length} / 14</div>
          </div>
          <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground text-[11px] flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>Challenges</span>
            </span>
            <div className="text-base font-bold text-foreground">{solvedChallengeIds.length} / 5</div>
          </div>
          <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground text-[11px] flex items-center space-x-1">
              <Cpu className="w-3 h-3" />
              <span>Simulations</span>
            </span>
            <div className="text-base font-bold text-foreground">{simulationsRunCount}</div>
          </div>
          <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-1">
            <span className="text-muted-foreground text-[11px] flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Lab Time</span>
            </span>
            <div className="text-base font-bold text-foreground">{formatTime(totalLabSeconds)}</div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-foreground stroke-[1.5]" />
            <h2 className="text-sm font-bold text-foreground">Achievement Badges ({unlockedCount} / {badges.length})</h2>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Auto-unlocked upon completion</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                b.unlocked
                  ? 'bg-white border-foreground/50 shadow-2xs'
                  : 'bg-surface/30 border-border opacity-50'
              }`}
            >
              <div className={`p-2 rounded-lg border shrink-0 ${
                b.unlocked ? 'bg-foreground text-background border-foreground' : 'bg-surface text-muted-foreground border-border'
              }`}>
                <Award className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-foreground flex items-center space-x-1.5">
                  <span>{b.title}</span>
                  {b.unlocked && <CheckCircle2 className="w-3 h-3 text-foreground" />}
                </div>
                <p className="text-[11px] text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
