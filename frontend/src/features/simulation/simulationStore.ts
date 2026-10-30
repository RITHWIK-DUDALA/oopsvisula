import { create } from 'zustand';
import { ExecutionEvent, ExecutionTrace, ReferencePointer } from '@/types/execution';
import { bankAccountTrace } from './sampleTraces';

export interface VisualizerCall {
  id: string;
  name: string;
  argument: string;
  icon?: 'terminal' | 'file' | 'search' | 'edit';
  status: 'idle' | 'running' | 'done' | 'error';
  timestamp: number;
}

interface SimulationState {
  currentTrace: ExecutionTrace;
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // 0.5 | 1 | 2 (multiplier)
  autoPlayTimer: NodeJS.Timeout | null;
  activeCall: VisualizerCall | null;

  // Actions
  triggerCall: (
    name: string,
    argument: string,
    icon?: 'terminal' | 'file' | 'search' | 'edit',
    status?: 'idle' | 'running' | 'done' | 'error'
  ) => void;
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
  activeCall: null,

  triggerCall: (name, argument, icon = 'terminal', status = 'running') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    set({
      activeCall: {
        id,
        name,
        argument,
        icon,
        status,
        timestamp: Date.now(),
      },
    });

    if (status === 'running') {
      setTimeout(() => {
        const current = get().activeCall;
        if (current && current.id === id) {
          set({
            activeCall: {
              ...current,
              status: 'done',
            },
          });
        }
      }, 500);
    }
  },

  loadTrace: (trace: ExecutionTrace) => {
    get().pause();
    get().triggerCall('jdi-loader', trace.programTitle, 'file');
    set({
      currentTrace: trace,
      currentStepIndex: 0,
    });
  },

  stepForward: () => {
    const { currentTrace, currentStepIndex } = get();
    if (currentStepIndex < currentTrace.events.length - 1) {
      const nextEv = currentTrace.events[currentStepIndex + 1];
      get().triggerCall(
        'jvm-step',
        nextEv?.line ? `line ${nextEv.line}` : `step ${currentStepIndex + 2}`,
        'terminal'
      );
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      get().pause();
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      get().triggerCall('jvm-step', `rewind to ${currentStepIndex}`, 'terminal');
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (stepIndex: number) => {
    const { currentTrace } = get();
    if (stepIndex >= 0 && stepIndex < currentTrace.events.length) {
      get().triggerCall('jdi-seek', `step ${stepIndex + 1}`, 'search');
      set({ currentStepIndex: stepIndex });
    }
  },

  play: () => {
    const { isPlaying, autoPlayTimer } = get();
    if (isPlaying) return;
    if (autoPlayTimer) clearInterval(autoPlayTimer);

    get().triggerCall('jdi-exec', 'resumeExecution()', 'terminal');
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
    const { autoPlayTimer, isPlaying } = get();
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
    if (isPlaying) {
      get().triggerCall('jdi-exec', 'pauseExecution()', 'terminal');
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
    get().triggerCall('jdi-reset', 'trace.rewind(0)', 'terminal');
    set({ currentStepIndex: 0 });
  },

  setPlaybackSpeed: (speed: number) => {
    const wasPlaying = get().isPlaying;
    get().pause();
    get().triggerCall('clock', `${speed}x speed`, 'terminal');
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

