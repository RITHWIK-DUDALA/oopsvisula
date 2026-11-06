import { create } from 'zustand';
import { ExecutionEvent, ExecutionTrace, ReferencePointer } from '@/types/execution';
import { JavaAstParser } from '@/core/engine/javaAstParser';
import { JavaVirtualMachine } from '@/core/engine/javaVirtualMachine';
import type { ConsoleEntry, ExecutionStatus, ParsedJavaProgram } from '@/core/engine/unifiedModel';

export interface VisualizerCall {
  id: string;
  name: string;
  argument: string;
  icon?: 'terminal' | 'file' | 'search' | 'edit';
  status: 'idle' | 'running' | 'done' | 'error';
  timestamp: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  content: string;
  isMain?: boolean;
}

const astParser = new JavaAstParser();
const jvm = new JavaVirtualMachine();

interface SimulationState {
  // Authoritative Execution Session
  sessionId: string;
  projectRevision: number;
  compiledRevision: number;
  executedRevision: number;
  executionStatus: ExecutionStatus;
  consoleEntries: ConsoleEntry[];
  diagnostics: string[];
  parsedProgram: ParsedJavaProgram | null;

  // Execution Trace & Step
  currentTrace: ExecutionTrace;
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // 0.5 | 1 | 2 (multiplier)
  autoPlayTimer: NodeJS.Timeout | null;
  activeCall: VisualizerCall | null;

  // Multi-File Project State
  projectFiles: ProjectFile[];
  activeFileId: string;
  compilationError: string | null;

  // Visualizer & Selection State
  selectedObjectId: string | null;
  selectedVariableName: string | null;
  activeEntitySelection: {
    type: 'class' | 'object' | 'method' | 'variable' | 'relationship' | 'event' | 'concept';
    id: string;
    data?: unknown;
  } | null;
  activeConceptFilter: string | null;
  runtimeView: 'stack-heap' | 'object-graph' | 'memory-map' | 'class-relationships' | 'method-relationships' | 'object-relationships';
  playgroundMode: 'architecture' | 'live';
  visualizerDimension: '2D' | '3D';
  threeMode: 'object-graph' | 'class-arch' | 'method-graph' | 'jvm-memory' | 'exec-flow';
  workspaceMode: 'split' | 'editor' | 'visualizer' | 'class-builder';

  // Actions
  setSelectedObjectId: (id: string | null) => void;
  setSelectedVariableName: (name: string | null) => void;
  setActiveEntitySelection: (selection: SimulationState['activeEntitySelection']) => void;
  setActiveConceptFilter: (concept: string | null) => void;
  setRuntimeView: (view: SimulationState['runtimeView']) => void;
  setPlaygroundMode: (mode: 'architecture' | 'live') => void;
  setVisualizerDimension: (dim: '2D' | '3D') => void;
  setThreeMode: (mode: SimulationState['threeMode']) => void;
  setWorkspaceMode: (mode: 'split' | 'editor' | 'visualizer' | 'class-builder') => void;
  
  // Breakpoints & Debugging
  breakpoints: Array<{ file: string; line: number; enabled: boolean }>;
  toggleBreakpoint: (file: string, line: number) => void;
  continueExecution: () => void;
  stepInto: () => void;
  stepOver: () => void;
  stepOut: () => void;
  stop: () => void;

  // Project & File Actions
  addProjectFile: (name: string, content?: string) => void;
  renameProjectFile: (id: string, newName: string) => void;
  deleteProjectFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  setActiveFileId: (id: string) => void;
  loadProjectTemplate: (templateName: 'banking' | 'shapes' | 'loops-arrays' | 'exceptions' | 'car' | 'custom') => void;
  compileAndExecute: () => boolean;

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
  clearConsole: () => void;

  // Derived state extractors
  getActiveFile: () => ProjectFile | undefined;
  getCurrentEvent: () => ExecutionEvent | null;
  getReferencePointers: () => ReferencePointer[];
  getStdoutHistory: () => string;
  isStale: () => boolean;
}

const cleanInitialProject: ProjectFile[] = [
  {
    id: 'file-main',
    name: 'Main.java',
    isMain: true,
    content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, OOPS LAB!");
    }
}
`,
  },
];

const emptyExecutionTrace: ExecutionTrace = {
  id: 'trace-empty',
  programTitle: 'Clean Project',
  sourceCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, OOPS LAB!");\n    }\n}',
  totalSteps: 0,
  durationMs: 0,
  stdoutAggregate: '',
  events: [],
};

const initialParsedProgram = astParser.parseProject(cleanInitialProject.map(f => ({ name: f.name, content: f.content })));

const defaultBankingMultiFile: ProjectFile[] = [
  {
    id: 'file-main',
    name: 'Main.java',
    isMain: true,
    content: `class Address {
    String city;

    Address(String city) {
        this.city = city;
    }
}

class Customer {
    String name;
    Address address;

    Customer(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    void updateCity(String city) {
        address.city = city;
    }
}

class BankAccount {
    String accountNumber;
    double balance;
    Customer owner;

    BankAccount(
        String accountNumber,
        double balance,
        Customer owner
    ) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.owner = owner;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}

class BankService {
    void processDeposit(
        BankAccount account,
        double amount
    ) {
        validate(amount);
        account.deposit(amount);
    }

    void validate(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException(
                "Invalid amount"
            );
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address("Vijayawada");

        Customer customer =
            new Customer("Alice", address);

        BankAccount account =
            new BankAccount("ACC101", 500.0, customer);

        BankService service = new BankService();

        service.processDeposit(account, 250.0);

        account.withdraw(100.0);

        System.out.println(account.balance);
    }
}
`,
  },
];

const defaultShapesMultiFile: ProjectFile[] = [
  {
    id: 'file-shapes-main',
    name: 'Main.java',
    isMain: true,
    content: `class Shape {
    String color;

    Shape(String color) {
        this.color = color;
    }

    double getArea() {
        return 0.0;
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    double getArea() {
        return 3.14159 * radius * radius;
    }
}

class Rectangle extends Shape {
    double width;
    double height;

    Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    double getArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle("Crimson", 7.5);
        Rectangle rect = new Rectangle("Cobalt", 10.0, 5.0);

        System.out.println(circle.radius);
        System.out.println(rect.width);
    }
}
`,
  },
];

const defaultLoopsMultiFile: ProjectFile[] = [
  {
    id: 'file-loops-main',
    name: 'Main.java',
    isMain: true,
    content: `class Accumulator {
    int total;

    Accumulator(int initial) {
        this.total = initial;
    }

    void add(int value) {
        total += value;
    }
}

public class Main {
    public static void main(String[] args) {
        Accumulator acc = new Accumulator(0);

        for (int i = 1; i <= 3; i++) {
            acc.add(10);
        }

        System.out.println(acc.total);
    }
}
`,
  },
];

const defaultExceptionsMultiFile: ProjectFile[] = [
  {
    id: 'file-exc-main',
    name: 'Main.java',
    isMain: true,
    content: `class SafeDivider {
    int compute(int numerator, int denominator) {
        if (denominator == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return numerator / denominator;
    }
}

public class Main {
    public static void main(String[] args) {
        SafeDivider divider = new SafeDivider();
        divider.compute(100, 0);
    }
}
`,
  },
];

export const useSimulationStore = create<SimulationState>((set, get) => ({
  // Session tracking
  sessionId: 'ses-init',
  projectRevision: 1,
  compiledRevision: 0,
  executedRevision: 0,
  executionStatus: 'idle',
  consoleEntries: [],
  diagnostics: [],
  parsedProgram: initialParsedProgram,

  currentTrace: emptyExecutionTrace,
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1,
  autoPlayTimer: null,
  activeCall: null,
  breakpoints: [],

  projectFiles: cleanInitialProject,
  activeFileId: 'file-main',
  compilationError: null,

  selectedObjectId: null,
  selectedVariableName: null,
  activeEntitySelection: null,
  activeConceptFilter: null,
  runtimeView: 'stack-heap',
  playgroundMode: 'live',
  visualizerDimension: '2D',
  threeMode: 'jvm-memory',
  workspaceMode: 'split',

  setSelectedObjectId: (id) => {
    set({
      selectedObjectId: id,
      activeEntitySelection: id ? { type: 'object', id } : null,
    });
  },
  setSelectedVariableName: (name) => {
    set({
      selectedVariableName: name,
      activeEntitySelection: name ? { type: 'variable', id: name } : null,
    });
  },
  setActiveEntitySelection: (selection) => {
    set({
      activeEntitySelection: selection,
      selectedObjectId: selection?.type === 'object' ? selection.id : null,
    });
  },
  setActiveConceptFilter: (concept) => set({ activeConceptFilter: concept }),
  setRuntimeView: (view) => set({ runtimeView: view }),
  setPlaygroundMode: (mode) => set({ playgroundMode: mode }),
  setVisualizerDimension: (dim) => set({ visualizerDimension: dim }),
  setThreeMode: (mode) => set({ threeMode: mode }),
  setWorkspaceMode: (mode) => set({ workspaceMode: mode }),

  // Multi-File Project Implementations
  addProjectFile: (name: string, content = '') => {
    const trimmed = name.trim();
    const finalName = trimmed.endsWith('.java') ? trimmed : `${trimmed}.java`;
    const newId = `file-${Date.now()}`;
    const defaultTemplate = content || `public class ${finalName.replace('.java', '')} {\n    \n}\n`;

    set((state) => {
      const nextRevision = state.projectRevision + 1;
      return {
        projectFiles: [
          ...state.projectFiles,
          {
            id: newId,
            name: finalName,
            content: defaultTemplate,
            isMain: false,
          },
        ],
        activeFileId: newId,
        projectRevision: nextRevision,
        executionStatus: state.executedRevision > 0 ? 'stale' : state.executionStatus,
      };
    });
    get().triggerCall('fs-add', finalName, 'file');
  },

  renameProjectFile: (id: string, newName: string) => {
    const trimmed = newName.trim();
    const finalName = trimmed.endsWith('.java') ? trimmed : `${trimmed}.java`;
    set((state) => ({
      projectFiles: state.projectFiles.map((f) => (f.id === id ? { ...f, name: finalName } : f)),
      projectRevision: state.projectRevision + 1,
      executionStatus: state.executedRevision > 0 ? 'stale' : state.executionStatus,
    }));
  },

  deleteProjectFile: (id: string) => {
    const files = get().projectFiles;
    if (files.length <= 1) return; // Retain at least one file
    const fileToDelete = files.find((f) => f.id === id);
    if (fileToDelete?.isMain) return; // Protect main entry

    const remaining = files.filter((f) => f.id !== id);
    const nextActive = get().activeFileId === id ? remaining[0].id : get().activeFileId;

    set((state) => ({
      projectFiles: remaining,
      activeFileId: nextActive,
      projectRevision: state.projectRevision + 1,
      executionStatus: state.executedRevision > 0 ? 'stale' : state.executionStatus,
    }));
  },

  updateFileContent: (id: string, content: string) => {
    set((state) => {
      const nextFiles = state.projectFiles.map((f) => (f.id === id ? { ...f, content } : f));
      const nextRevision = state.projectRevision + 1;
      const isOutdated = state.executedRevision > 0;
      return {
        projectFiles: nextFiles,
        projectRevision: nextRevision,
        executionStatus: isOutdated ? 'stale' : state.executionStatus,
      };
    });
  },

  setActiveFileId: (id: string) => {
    set({ activeFileId: id });
  },

  toggleBreakpoint: (file: string, line: number) => {
    set((state) => {
      const existing = state.breakpoints.find((b) => b.file === file && b.line === line);
      if (existing) {
        return {
          breakpoints: state.breakpoints.filter((b) => !(b.file === file && b.line === line)),
        };
      }
      return {
        breakpoints: [...state.breakpoints, { file, line, enabled: true }],
      };
    });
  },

  loadProjectTemplate: (templateName) => {
    get().pause();
    if (templateName === 'banking') {
      set({
        projectFiles: defaultBankingMultiFile,
        activeFileId: 'file-main',
        projectRevision: get().projectRevision + 1,
        executionStatus: 'stale',
      });
      get().compileAndExecute();
    } else if (templateName === 'shapes') {
      set({
        projectFiles: defaultShapesMultiFile,
        activeFileId: 'file-shapes-main',
        projectRevision: get().projectRevision + 1,
        executionStatus: 'stale',
      });
      get().compileAndExecute();
    } else if (templateName === 'loops-arrays') {
      set({
        projectFiles: defaultLoopsMultiFile,
        activeFileId: 'file-loops-main',
        projectRevision: get().projectRevision + 1,
        executionStatus: 'stale',
      });
      get().compileAndExecute();
    } else if (templateName === 'exceptions') {
      set({
        projectFiles: defaultExceptionsMultiFile,
        activeFileId: 'file-exc-main',
        projectRevision: get().projectRevision + 1,
        executionStatus: 'stale',
      });
      get().compileAndExecute();
    } else if (templateName === 'custom') {
      const nextRev = get().projectRevision + 1;
      const parsed = astParser.parseProject(cleanInitialProject.map((f) => ({ name: f.name, content: f.content })));
      set({
        projectFiles: cleanInitialProject,
        activeFileId: 'file-main',
        projectRevision: nextRev,
        parsedProgram: parsed,
        currentTrace: emptyExecutionTrace,
        currentStepIndex: 0,
        executionStatus: 'idle',
        consoleEntries: [],
      });
      get().compileAndExecute();
    }
  },

  compileAndExecute: () => {
    get().pause();
    const files = get().projectFiles;
    const activeFile = get().getActiveFile();
    const currentRev = get().projectRevision;
    const newSessionId = `SES-${Date.now().toString(36).toUpperCase()}`;

    set({ executionStatus: 'compiling' });

    try {
      get().triggerCall('javac', 'Compiling and verifying project AST...', 'terminal');
      
      // Parse all project source files preserving file attribution and scopes
      const parsed = astParser.parseProject(files.map((f) => ({ name: f.name, content: f.content })));

      if (!parsed.classes || parsed.classes.length === 0) {
        const errorMsg = 'Compilation Error: No valid Java class declaration found in project.';
        set({
          compilationError: errorMsg,
          executionStatus: 'compile-error',
          consoleEntries: [
            ...get().consoleEntries,
            {
              id: `err-${Date.now()}`,
              sessionId: newSessionId,
              revision: currentRev,
              type: 'stderr',
              text: errorMsg,
              timestamp: Date.now(),
            },
          ],
        });
        return false;
      }

      // Execute in isolated virtual machine
      const dynamicTrace = jvm.execute(parsed, activeFile?.name || 'Main.java');
      dynamicTrace.id = `user-project-${Date.now()}`;
      dynamicTrace.programTitle = activeFile ? activeFile.name : 'User Project';
      dynamicTrace.sourceCode = activeFile?.content || files.map((f) => f.content).join('\n\n');

      const consoleOutput: ConsoleEntry[] = [
        {
          id: `log-${Date.now()}-1`,
          sessionId: newSessionId,
          revision: currentRev,
          type: 'system',
          text: `[OOPS LAB Virtual Machine] Session ${newSessionId} initialized (Rev ${currentRev}).`,
          timestamp: Date.now(),
        },
        {
          id: `log-${Date.now()}-2`,
          sessionId: newSessionId,
          revision: currentRev,
          type: 'system',
          text: `Compiled ${parsed.classes.length} classes, ${parsed.methods.length} methods. Recorded ${dynamicTrace.events.length} execution events.`,
          timestamp: Date.now(),
        },
      ];

      if (dynamicTrace.stdoutAggregate && dynamicTrace.stdoutAggregate.trim()) {
        consoleOutput.push({
          id: `out-${Date.now()}`,
          sessionId: newSessionId,
          revision: currentRev,
          type: 'stdout',
          text: dynamicTrace.stdoutAggregate,
          timestamp: Date.now(),
        });
      }

      set({
        sessionId: newSessionId,
        compiledRevision: currentRev,
        executedRevision: currentRev,
        executionStatus: 'ready',
        currentTrace: dynamicTrace,
        parsedProgram: parsed,
        currentStepIndex: 0,
        selectedObjectId: null,
        selectedVariableName: null,
        compilationError: null,
        consoleEntries: consoleOutput,
      });

      get().triggerCall('jvm-exec', `Ready: ${dynamicTrace.events.length} execution events recorded.`, 'terminal', 'done');
      return true;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      set({
        compilationError: errMsg,
        executionStatus: 'compile-error',
        consoleEntries: [
          ...get().consoleEntries,
          {
            id: `err-${Date.now()}`,
            sessionId: newSessionId,
            revision: currentRev,
            type: 'stderr',
            text: `Compilation Error: ${errMsg}`,
            timestamp: Date.now(),
          },
        ],
      });
      get().triggerCall('compiler-error', errMsg, 'terminal', 'error');
      return false;
    }
  },

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
    const mainName = trace.id.includes('bank')
      ? 'BankAccount.java'
      : trace.id.includes('shape')
      ? 'ShapeHierarchy.java'
      : trace.id.includes('composition')
      ? 'CarComposition.java'
      : trace.id.includes('record')
      ? 'PointRecord.java'
      : `${trace.programTitle.split(' ')[0]}.java`;

    const fileId = `file-${Date.now()}`;
    set({
      currentTrace: trace,
      currentStepIndex: 0,
      selectedObjectId: null,
      selectedVariableName: null,
      projectFiles: [
        {
          id: fileId,
          name: mainName,
          content: trace.sourceCode,
          isMain: true,
        },
      ],
      activeFileId: fileId,
      compilationError: null,
      executionStatus: 'ready',
    });
  },

  stepForward: () => {
    if (get().isStale()) {
      get().compileAndExecute();
      return;
    }

    const { currentTrace, currentStepIndex } = get();
    if (currentStepIndex < currentTrace.events.length - 1) {
      const nextEv = currentTrace.events[currentStepIndex + 1];
      get().triggerCall(
        'jvm-step',
        nextEv?.line ? `line ${nextEv.line}` : `step ${currentStepIndex + 2}`,
        'terminal'
      );
      set({
        currentStepIndex: currentStepIndex + 1,
        executionStatus: currentStepIndex + 1 === currentTrace.events.length - 1 ? 'completed' : 'ready',
      });
    } else {
      get().pause();
      set({ executionStatus: 'completed' });
    }
  },

  stepInto: () => {
    get().stepForward();
  },

  stepOver: () => {
    if (get().isStale()) {
      get().compileAndExecute();
      return;
    }
    const { currentTrace, currentStepIndex } = get();
    const currentEvent = currentTrace.events[currentStepIndex];
    if (!currentEvent) {
      get().stepForward();
      return;
    }

    const currentDepth = currentEvent.stackFrames.length;
    let targetStep = currentStepIndex + 1;
    while (targetStep < currentTrace.events.length) {
      const ev = currentTrace.events[targetStep];
      if (ev.stackFrames.length <= currentDepth) {
        break;
      }
      targetStep++;
    }

    if (targetStep < currentTrace.events.length) {
      get().goToStep(targetStep);
    } else {
      get().goToStep(currentTrace.events.length - 1);
    }
  },

  stepOut: () => {
    if (get().isStale()) {
      get().compileAndExecute();
      return;
    }
    const { currentTrace, currentStepIndex } = get();
    const currentEvent = currentTrace.events[currentStepIndex];
    if (!currentEvent || currentEvent.stackFrames.length <= 1) {
      get().stepForward();
      return;
    }

    const targetDepth = currentEvent.stackFrames.length - 1;
    let targetStep = currentStepIndex + 1;
    while (targetStep < currentTrace.events.length) {
      const ev = currentTrace.events[targetStep];
      if (ev.stackFrames.length <= targetDepth) {
        break;
      }
      targetStep++;
    }

    if (targetStep < currentTrace.events.length) {
      get().goToStep(targetStep);
    } else {
      get().goToStep(currentTrace.events.length - 1);
    }
  },

  continueExecution: () => {
    if (get().isStale()) {
      get().compileAndExecute();
    }
    const { currentTrace, currentStepIndex, breakpoints } = get();
    const activeBps = breakpoints.filter((b) => b.enabled);
    if (activeBps.length === 0) {
      get().play();
      return;
    }

    let targetStep = -1;
    for (let i = currentStepIndex + 1; i < currentTrace.events.length; i++) {
      const ev = currentTrace.events[i];
      const match = activeBps.some((b) => b.line === ev.line && (!ev.file || b.file === ev.file));
      if (match) {
        targetStep = i;
        break;
      }
    }

    if (targetStep !== -1) {
      get().pause();
      get().goToStep(targetStep);
    } else {
      get().pause();
      get().goToStep(currentTrace.events.length - 1);
      set({ executionStatus: 'completed' });
    }
  },

  stop: () => {
    get().pause();
    set({ currentStepIndex: 0, executionStatus: 'ready' });
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      get().triggerCall('jvm-step', `rewind to ${currentStepIndex}`, 'terminal');
      set({ currentStepIndex: currentStepIndex - 1, executionStatus: 'ready' });
    }
  },

  goToStep: (stepIndex: number) => {
    if (get().isStale()) {
      get().compileAndExecute();
    }
    const { currentTrace } = get();
    if (stepIndex >= 0 && stepIndex < currentTrace.events.length) {
      get().triggerCall('jdi-seek', `step ${stepIndex + 1}`, 'search');
      set({
        currentStepIndex: stepIndex,
        executionStatus: stepIndex === currentTrace.events.length - 1 ? 'completed' : 'ready',
      });
    }
  },

  play: () => {
    if (get().isStale()) {
      get().compileAndExecute();
    }

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
        set({ executionStatus: 'completed' });
      }
    }, intervalMs);

    set({ isPlaying: true, executionStatus: 'running', autoPlayTimer: timer });
  },

  pause: () => {
    const { autoPlayTimer, isPlaying } = get();
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
    if (isPlaying) {
      get().triggerCall('jdi-exec', 'pauseExecution()', 'terminal');
    }
    set({ isPlaying: false, executionStatus: 'paused', autoPlayTimer: null });
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
    set({ currentStepIndex: 0, selectedObjectId: null, selectedVariableName: null, executionStatus: 'ready' });
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

  clearConsole: () => {
    set({ consoleEntries: [] });
  },

  getActiveFile: () => {
    const { projectFiles, activeFileId } = get();
    return projectFiles.find((f) => f.id === activeFileId) || projectFiles[0];
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

  isStale: () => {
    const { executedRevision, projectRevision, executionStatus } = get();
    return executionStatus === 'stale' || (executedRevision > 0 && executedRevision !== projectRevision);
  },
}));
