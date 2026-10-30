import { create } from 'zustand';
import { ExecutionEvent, ExecutionTrace, ReferencePointer } from '@/types/execution';
import { bankAccountTrace } from './sampleTraces';

interface SimulationState {
  currentTrace: ExecutionTrace;
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // 0.5 | 1 | 2 (multiplier)
  autoPlayTimer: NodeJS.Timeout | null;

  // Actions
  loadTrace: (trace: ExecutionTrace) => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (stepIndex: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  reset: () => void;
  setPlaybackSpeed: (speed: number) => void;

  // Derived state extractors
  getCurrentEvent: () => ExecutionEvent | null;
  getReferencePointers: () => ReferencePointer[];
  getStdoutHistory: () => string;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  currentTrace: bankAccountTrace,
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1,
  autoPlayTimer: null,

  loadTrace: (trace: ExecutionTrace) => {
    get().pause();
    set({
      currentTrace: trace,
      currentStepIndex: 0,
    });
  },

  stepForward: () => {
    const { currentTrace, currentStepIndex } = get();
    if (currentStepIndex < currentTrace.events.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      get().pause();
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (stepIndex: number) => {
    const { currentTrace } = get();
    if (stepIndex >= 0 && stepIndex < currentTrace.events.length) {
      set({ currentStepIndex: stepIndex });
    }
  },

  play: () => {
    const { isPlaying, autoPlayTimer } = get();
    if (isPlaying) return;
    if (autoPlayTimer) clearInterval(autoPlayTimer);

    const speed = get().playbackSpeed;
    const intervalMs = Math.round(1500 / speed);

    const timer = setInterval(() => {
      const state = get();
      if (state.currentStepIndex < state.currentTrace.events.length - 1) {
        state.stepForward();
      } else {
        state.pause();
      }
    }, intervalMs);

    set({ isPlaying: true, autoPlayTimer: timer });
  },

  pause: () => {
    const { autoPlayTimer } = get();
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
    set({ isPlaying: false, autoPlayTimer: null });
  },

  togglePlay: () => {
    if (get().isPlaying) {
      get().pause();
    } else {
      get().play();
    }
  },

  reset: () => {
    get().pause();
    set({ currentStepIndex: 0 });
  },

  setPlaybackSpeed: (speed: number) => {
    const wasPlaying = get().isPlaying;
    get().pause();
    set({ playbackSpeed: speed });
    if (wasPlaying) {
      get().play();
    }
  },

  getCurrentEvent: () => {
    const { currentTrace, currentStepIndex } = get();
    return currentTrace.events[currentStepIndex] || null;
  },

  getReferencePointers: () => {
    const event = get().getCurrentEvent();
    if (!event) return [];

    const pointers: ReferencePointer[] = [];

    // 1. Stack to Heap references
    event.stackFrames.forEach((frame) => {
      frame.localVariables.forEach((v) => {
        if (v.isReference && v.targetAddress) {
          pointers.push({
            sourceType: 'stack',
            sourceFrameId: frame.frameId,
            sourceVarName: v.name,
            targetAddress: v.targetAddress,
            label: `${frame.methodName} :: ${v.name} -> ${v.targetAddress}`,
          });
        }
      });
    });

    // 2. Heap to Heap references
    event.heapObjects.forEach((obj) => {
      obj.fields.forEach((field) => {
        if (field.isReference && field.targetAddress) {
          pointers.push({
            sourceType: 'heap',
            sourceHeapAddress: obj.address,
            sourceFieldName: field.name,
            targetAddress: field.targetAddress,
            label: `${obj.address}.${field.name} -> ${field.targetAddress}`,
          });
        }
      });
    });

    return pointers;
  },

  getStdoutHistory: () => {
    const { currentTrace, currentStepIndex } = get();
    let stdoutAcc = '';
    for (let i = 0; i <= currentStepIndex; i++) {
      const ev = currentTrace.events[i];
      if (ev.stdout) {
        stdoutAcc += ev.stdout;
      }
    }
    return stdoutAcc;
  },
}));
