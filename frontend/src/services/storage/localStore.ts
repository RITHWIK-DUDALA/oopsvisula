import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedSnippet {
  id: string;
  title: string;
  code: string;
  updatedAt: string;
}

export interface LearnerProgressState {
  guestId: string;
  guestName: string;
  createdAt: string;
  totalLabSeconds: number;
  simulationsRunCount: number;
  masteredTopics: string[];
  solvedChallengeIds: number[];
  savedSnippets: SavedSnippet[];

  // Actions
  markTopicMastered: (topicId: string) => void;
  unmarkTopicMastered: (topicId: string) => void;
  markChallengeSolved: (challengeId: number) => void;
  incrementSimulationsRun: () => void;
  addLabSeconds: (seconds: number) => void;
  saveSnippet: (title: string, code: string) => string;
  deleteSnippet: (id: string) => void;
  exportSessionJson: () => string;
  importSessionJson: (json: string) => boolean;
  resetProgress: () => void;
}

const initialGuestId = `guest-${Math.random().toString(36).substring(2, 9)}`;

export const useLearnerStore = create<LearnerProgressState>()(
  persist(
    (set, get) => ({
      guestId: initialGuestId,
      guestName: 'Guest Student',
      createdAt: new Date().toISOString(),
      totalLabSeconds: 13200, // baseline demo (~3h 40m)
      simulationsRunCount: 14,
      masteredTopics: ['vars', 'methods', 'classes', 'constructors', 'encapsulation', 'inheritance'],
      solvedChallengeIds: [1],
      savedSnippets: [
        {
          id: 'snip-1',
          title: 'BankAccount Encapsulation Demo',
          code: `public class BankAccount {\n    private double balance;\n    public void deposit(double amount) {\n        if (amount > 0) this.balance += amount;\n    }\n}`,
          updatedAt: new Date().toISOString(),
        },
      ],

      markTopicMastered: (topicId: string) => {
        const { masteredTopics } = get();
        if (!masteredTopics.includes(topicId)) {
          set({ masteredTopics: [...masteredTopics, topicId] });
        }
      },

      unmarkTopicMastered: (topicId: string) => {
        set({ masteredTopics: get().masteredTopics.filter((t) => t !== topicId) });
      },

      markChallengeSolved: (challengeId: number) => {
        const { solvedChallengeIds } = get();
        if (!solvedChallengeIds.includes(challengeId)) {
          set({ solvedChallengeIds: [...solvedChallengeIds, challengeId] });
        }
      },

      incrementSimulationsRun: () => {
        set({ simulationsRunCount: get().simulationsRunCount + 1 });
      },

      addLabSeconds: (seconds: number) => {
        set({ totalLabSeconds: Math.max(0, get().totalLabSeconds + seconds) });
      },

      saveSnippet: (title: string, code: string) => {
        const id = `snip-${Date.now()}`;
        const newSnippet: SavedSnippet = {
          id,
          title,
          code,
          updatedAt: new Date().toISOString(),
        };
        set({ savedSnippets: [newSnippet, ...get().savedSnippets] });
        return id;
      },

      deleteSnippet: (id: string) => {
        set({ savedSnippets: get().savedSnippets.filter((s) => s.id !== id) });
      },

      exportSessionJson: () => {
        const state = get();
        const exportObj = {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          guestId: state.guestId,
          totalLabSeconds: state.totalLabSeconds,
          simulationsRunCount: state.simulationsRunCount,
          masteredTopics: state.masteredTopics,
          solvedChallengeIds: state.solvedChallengeIds,
          savedSnippets: state.savedSnippets,
        };
        return JSON.stringify(exportObj, null, 2);
      },

      importSessionJson: (json: string) => {
        try {
          const parsed = JSON.parse(json);
          if (Array.isArray(parsed.masteredTopics) && Array.isArray(parsed.solvedChallengeIds)) {
            set({
              masteredTopics: parsed.masteredTopics,
              solvedChallengeIds: parsed.solvedChallengeIds,
              simulationsRunCount: typeof parsed.simulationsRunCount === 'number' ? parsed.simulationsRunCount : get().simulationsRunCount,
              totalLabSeconds: typeof parsed.totalLabSeconds === 'number' ? parsed.totalLabSeconds : get().totalLabSeconds,
              savedSnippets: Array.isArray(parsed.savedSnippets) ? parsed.savedSnippets : get().savedSnippets,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      resetProgress: () => {
        set({
          masteredTopics: [],
          solvedChallengeIds: [],
          simulationsRunCount: 0,
          totalLabSeconds: 0,
          savedSnippets: [],
        });
      },
    }),
    {
      name: 'oops-lab-learner-storage',
    }
  )
);

