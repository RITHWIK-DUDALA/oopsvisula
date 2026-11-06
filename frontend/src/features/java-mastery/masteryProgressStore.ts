import { create } from 'zustand';
import { LearnerProgressState } from './types';

const STORAGE_KEY = 'oopslab_java_mastery_progress';

interface JavaMasteryStore extends LearnerProgressState {
  isTopicCompleted: (topicId: string) => boolean;
  toggleTopicCompletion: (topicId: string) => void;
  markTopicCompleted: (topicId: string) => void;
  markExerciseCompleted: (exerciseId: string) => void;
  recordQuizScore: (topicId: string, score: number) => void;
  toggleProjectCompletion: (projectId: string) => void;
  addTimeSpent: (minutes: number) => void;
  setLastActiveTopic: (topicId: string) => void;
  getOverallProgressPercentage: (totalTopicsCount: number) => number;
  resetProgress: () => void;
}

const loadInitialState = (): LearnerProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load Java Mastery progress from storage', e);
  }

  return {
    completedTopicIds: [
      'foundations-jvm',
      'foundations-variables', // seed initial progress for pleasant onboarding
    ],
    completedExerciseIds: ['ex-jvm-1'],
    completedProjectIds: [],
    quizScores: {
      'foundations-jvm': 100,
    },
    totalTimeMinutes: 45,
    lastActiveTopicId: 'foundations-variables',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

const saveState = (state: LearnerProgressState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist Java Mastery progress', e);
  }
};

export const useJavaMasteryStore = create<JavaMasteryStore>((set, get) => {
  const initial = loadInitialState();

  return {
    ...initial,

    isTopicCompleted: (topicId: string) => {
      return get().completedTopicIds.includes(topicId);
    },

    toggleTopicCompletion: (topicId: string) => {
      set((state) => {
        const isCompleted = state.completedTopicIds.includes(topicId);
        const updated = isCompleted
          ? state.completedTopicIds.filter((id) => id !== topicId)
          : [...state.completedTopicIds, topicId];

        const newState: LearnerProgressState = {
          ...state,
          completedTopicIds: updated,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { completedTopicIds: updated, updatedAt: newState.updatedAt };
      });
    },

    markTopicCompleted: (topicId: string) => {
      set((state) => {
        if (state.completedTopicIds.includes(topicId)) return state;
        const updated = [...state.completedTopicIds, topicId];
        const newState: LearnerProgressState = {
          ...state,
          completedTopicIds: updated,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { completedTopicIds: updated, updatedAt: newState.updatedAt };
      });
    },

    markExerciseCompleted: (exerciseId: string) => {
      set((state) => {
        if (state.completedExerciseIds.includes(exerciseId)) return state;
        const updated = [...state.completedExerciseIds, exerciseId];
        const newState: LearnerProgressState = {
          ...state,
          completedExerciseIds: updated,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { completedExerciseIds: updated, updatedAt: newState.updatedAt };
      });
    },

    recordQuizScore: (topicId: string, score: number) => {
      set((state) => {
        const updatedScores = { ...state.quizScores, [topicId]: score };
        const newState: LearnerProgressState = {
          ...state,
          quizScores: updatedScores,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { quizScores: updatedScores, updatedAt: newState.updatedAt };
      });
    },

    toggleProjectCompletion: (projectId: string) => {
      set((state) => {
        const isCompleted = state.completedProjectIds.includes(projectId);
        const updated = isCompleted
          ? state.completedProjectIds.filter((id) => id !== projectId)
          : [...state.completedProjectIds, projectId];

        const newState: LearnerProgressState = {
          ...state,
          completedProjectIds: updated,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { completedProjectIds: updated, updatedAt: newState.updatedAt };
      });
    },

    addTimeSpent: (minutes: number) => {
      set((state) => {
        const updated = state.totalTimeMinutes + minutes;
        const newState: LearnerProgressState = {
          ...state,
          totalTimeMinutes: updated,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { totalTimeMinutes: updated, updatedAt: newState.updatedAt };
      });
    },

    setLastActiveTopic: (topicId: string) => {
      set((state) => {
        const newState: LearnerProgressState = {
          ...state,
          lastActiveTopicId: topicId,
          updatedAt: new Date().toISOString(),
        };
        saveState(newState);
        return { lastActiveTopicId: topicId, updatedAt: newState.updatedAt };
      });
    },

    getOverallProgressPercentage: (totalTopicsCount: number) => {
      if (totalTopicsCount <= 0) return 0;
      const count = get().completedTopicIds.length;
      return Math.min(100, Math.round((count / totalTopicsCount) * 100));
    },

    resetProgress: () => {
      const emptyState: LearnerProgressState = {
        completedTopicIds: [],
        completedExerciseIds: [],
        completedProjectIds: [],
        quizScores: {},
        totalTimeMinutes: 0,
        lastActiveTopicId: null,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveState(emptyState);
      set(emptyState);
    },
  };
});

