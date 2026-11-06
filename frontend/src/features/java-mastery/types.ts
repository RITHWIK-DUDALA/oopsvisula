export type StageStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type TopicDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface CodeExample {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  code: string;
  lineByLine: { line: number; explanation: string }[];
  expectedOutput: string;
  commonMistakes?: {
    incorrectCode: string;
    errorExplanation: string;
    correctedCode: string;
  };
}

export interface PracticeExercise {
  id: string;
  title: string;
  type: 'multiple-choice' | 'predict-output' | 'find-error' | 'code-challenge';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
  starterCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface TopicQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MasteryTopic {
  id: string;
  title: string;
  stageId: number;
  moduleId: string;
  durationMinutes: number;
  difficulty: TopicDifficulty;
  prerequisites: string[]; // array of topicIds
  visualizerCategory?: string; // id in 26 visualization modules
  summary: string;

  // 8-Part Structure
  introduction: {
    what: string;
    whyExists: string;
    whyUsed: string;
    whereUsed: string;
    whenUsed: string;
  };
  hierarchy: {
    parentCategory: string;
    subtopics: string[];
    relatedConcepts: string[];
  };
  deepExplanation: {
    definitions: string[];
    syntax: string;
    rules: string[];
    constraints: string[];
    internalBehavior: string;
    advantages: string[];
    limitations: string[];
    comparison?: {
      target: string;
      difference: string;
    };
  };
  visualLearning: {
    title: string;
    description: string;
    diagramType: 'memory-layout' | 'flowchart' | 'hierarchy-tree' | 'vtable-dispatch';
    visualizerCategory?: string;
    asciiDiagram?: string;
  };
  codeExamples: CodeExample[];
  practicalApplications: {
    realWorldScenario: string;
    bestPractices: string[];
    engineeringConsiderations: string;
  };
  exercises: PracticeExercise[];
  quiz: TopicQuizQuestion[];
}

export interface MasteryModule {
  id: string;
  stageId: number;
  title: string;
  description: string;
  topicIds: string[];
}

export interface MasteryProject {
  id: string;
  stageId: number;
  title: string;
  difficulty: TopicDifficulty;
  estimatedHours: number;
  problemStatement: string;
  requirements: string[];
  architectureOverview: string;
  suggestedClassStructure: {
    className: string;
    role: string;
    methods: string[];
  }[];
  milestones: {
    step: number;
    title: string;
    tasks: string[];
  }[];
  testCases: {
    description: string;
    input: string;
    expectedOutput: string;
  }[];
  evaluationCriteria: string[];
  extensions: string[];
}

export interface MasteryStage {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  durationWeeks: string;
  modules: MasteryModule[];
  projectMilestone: MasteryProject;
}

export interface LearnerProgressState {
  completedTopicIds: string[];
  completedExerciseIds: string[];
  completedProjectIds: string[];
  quizScores: Record<string, number>; // topicId -> score percentage
  totalTimeMinutes: number;
  lastActiveTopicId: string | null;
  startedAt: string;
  updatedAt: string;
}

