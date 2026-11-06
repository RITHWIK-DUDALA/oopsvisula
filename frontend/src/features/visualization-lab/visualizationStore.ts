import { create } from 'zustand';
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge as addFlowEdge,
} from '@xyflow/react';
import { VisualEntityData, VisualRelationshipData, RelationshipType, EntityType } from './types';
import { CATEGORY_PRESETS } from './presetsData';
import { SUBSECTIONS_BY_MODULE, getSubsection } from './subsectionsData';
import { LayoutAlgorithm } from './services/layoutEngine';
import { applyCollisionFreeLayout } from './services/collisionFreeLayoutEngine';
import { exportWorkspaceToJson } from './services/workspaceStorage';

interface HistorySnapshot {
  nodes: Node<VisualEntityData>[];
  edges: Edge<VisualRelationshipData>[];
}

interface VisualizationLabStore {
  workspaceName: string;
  activeCategoryId: string;
  snapToGrid: boolean;
  showGrid: boolean;
  showMiniMap: boolean;
  inspectorCollapsed: boolean;
  libraryCollapsed: boolean;
  isCodeDrawerOpen: boolean;
  activeSidebarTab: 'modules' | 'what-is-what';
  searchQuery: string;
  activeSubsectionId: string | null;
  activeScenarioId: string | null;
  currentJavaSource: string;
  isEducationalModalOpen: boolean;

  nodes: Node<VisualEntityData>[];
  edges: Edge<VisualRelationshipData>[];

  selectedNodeId: string | null;
  selectedEdgeId: string | null;

  // History stack for undo/redo
  past: HistorySnapshot[];
  future: HistorySnapshot[];

  // Execution Playback & Live Stepping (Master Prompt Sections 5, 8 & 9)
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  stepForward: () => void;
  stepBackward: () => void;
  jumpToStep: (step: number) => void;
  togglePlay: () => void;

  // Actions
  setWorkspaceName: (name: string) => void;
  setActiveCategory: (categoryId: string) => void;
  setActiveSidebarTab: (tab: 'modules' | 'what-is-what') => void;
  setSearchQuery: (query: string) => void;
  setActiveSubsection: (subsectionId: string) => void;
  setActiveScenario: (scenarioId: string) => void;
  setJavaSource: (source: string) => void;
  toggleEducationalModal: () => void;
  toggleSnapToGrid: () => void;
  toggleShowGrid: () => void;
  toggleMiniMap: () => void;
  toggleInspector: () => void;
  toggleLibrary: () => void;
  toggleCodeDrawer: () => void;
  applyLayout: (algorithm?: 'hierarchical' | 'grid' | 'circular') => void;
  exportCurrentWorkspace: () => void;
  importWorkspace: (workspaceData: {
    name?: string;
    categoryId?: string;
    nodes: Node<VisualEntityData>[];
    edges: Edge<VisualRelationshipData>[];
  }) => void;

  onNodesChange: (changes: NodeChange<Node<VisualEntityData>>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge<VisualRelationshipData>>[]) => void;
  onConnect: (connection: Connection) => void;

  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  clearSelection: () => void;

  addEntity: (type: EntityType, name?: string, position?: { x: number; y: number }) => void;
  updateEntityData: (id: string, updates: Partial<VisualEntityData>) => void;
  rotateEntity: (id: string, degrees?: number) => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;

  addRelationship: (
    sourceId: string,
    targetId: string,
    type: RelationshipType,
    label?: string
  ) => void;
  updateRelationshipData: (id: string, updates: Partial<VisualRelationshipData>) => void;

  undo: () => void;
  redo: () => void;
  resetWorkspace: () => void;
  clearWorkspace: () => void;
}

const MAX_HISTORY = 30;

export const useVisualizationLabStore = create<VisualizationLabStore>((set) => {
  const initialCategory = 'class-rep';
  const initialPreset = CATEGORY_PRESETS[initialCategory] || { nodes: [], edges: [] };
  const initialLayout = applyCollisionFreeLayout(
    JSON.parse(JSON.stringify(initialPreset.nodes)),
    JSON.parse(JSON.stringify(initialPreset.edges))
  );

  const pushSnapshot = (state: VisualizationLabStore) => {
    const currentSnapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(state.nodes)),
      edges: JSON.parse(JSON.stringify(state.edges)),
    };
    return {
      past: [...state.past.slice(-MAX_HISTORY + 1), currentSnapshot],
      future: [],
    };
  };

  return {
    workspaceName: 'Java & OOP 2D Workspace',
    activeCategoryId: initialCategory,
    snapToGrid: true,
    showGrid: true,
    showMiniMap: false,
    inspectorCollapsed: false,
    libraryCollapsed: false,
    isCodeDrawerOpen: false,
    activeSidebarTab: 'modules',
    searchQuery: '',
    activeSubsectionId: '01a-basic-class',
    activeScenarioId: '01a-s1',
    currentJavaSource: 'class Student {\n    // Minimal Java class declaration\n}',
    isEducationalModalOpen: false,

    nodes: initialLayout.nodes,
    edges: initialLayout.edges,

    selectedNodeId: initialLayout.nodes[0]?.id || null,
    selectedEdgeId: null,

    past: [],
    future: [],

    currentStepIndex: 15,
    totalSteps: 15,
    isPlaying: false,

    setWorkspaceName: (name) => set({ workspaceName: name }),
    setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab, libraryCollapsed: false }),
    setSearchQuery: (query) => set({ searchQuery: query }),

    setActiveCategory: (categoryId) => {
      const moduleSubs = SUBSECTIONS_BY_MODULE[categoryId] || [];
      const firstSub = moduleSubs[0];
      const firstScenario = firstSub?.scenarios?.[0];

      if (firstScenario) {
        const { nodes: layoutNodes, edges: layoutEdges } = applyCollisionFreeLayout(
          JSON.parse(JSON.stringify(firstScenario.diagram.nodes)),
          JSON.parse(JSON.stringify(firstScenario.diagram.edges))
        );
        set(() => ({
          activeCategoryId: categoryId,
          activeSubsectionId: firstSub.id,
          activeScenarioId: firstScenario.id,
          currentJavaSource: firstScenario.javaSource,
          nodes: layoutNodes,
          edges: layoutEdges,
          selectedNodeId: layoutNodes[0]?.id || null,
          selectedEdgeId: null,
          past: [],
          future: [],
          currentStepIndex: 15,
          isPlaying: false,
        }));
      } else {
        const preset = CATEGORY_PRESETS[categoryId] || { nodes: [], edges: [] };
        const { nodes: layoutNodes, edges: layoutEdges } = applyCollisionFreeLayout(
          JSON.parse(JSON.stringify(preset.nodes)),
          JSON.parse(JSON.stringify(preset.edges))
        );
        set(() => ({
          activeCategoryId: categoryId,
          activeSubsectionId: null,
          activeScenarioId: null,
          nodes: layoutNodes,
          edges: layoutEdges,
          selectedNodeId: layoutNodes[0]?.id || null,
          selectedEdgeId: null,
          past: [],
          future: [],
          currentStepIndex: 15,
          isPlaying: false,
        }));
      }
    },

    setActiveSubsection: (subsectionId) => {
      const sub = getSubsection(subsectionId);
      if (!sub) return;
      const firstScenario = sub.scenarios[0];
      if (firstScenario) {
        const { nodes: layoutNodes, edges: layoutEdges } = applyCollisionFreeLayout(
          JSON.parse(JSON.stringify(firstScenario.diagram.nodes)),
          JSON.parse(JSON.stringify(firstScenario.diagram.edges))
        );
        set(() => ({
          activeCategoryId: sub.moduleId,
          activeSubsectionId: sub.id,
          activeScenarioId: firstScenario.id,
          currentJavaSource: firstScenario.javaSource,
          nodes: layoutNodes,
          edges: layoutEdges,
          selectedNodeId: layoutNodes[0]?.id || null,
          selectedEdgeId: null,
          past: [],
          future: [],
        }));
      } else {
        // Fallback to module's distinct preset so the canvas never displays stale diagrams from other modules
        const preset = CATEGORY_PRESETS[sub.moduleId] || { nodes: [], edges: [] };
        const { nodes: layoutNodes, edges: layoutEdges } = applyCollisionFreeLayout(
          JSON.parse(JSON.stringify(preset.nodes)),
          JSON.parse(JSON.stringify(preset.edges))
        );
        set(() => ({
          activeCategoryId: sub.moduleId,
          activeSubsectionId: sub.id,
          activeScenarioId: null,
          nodes: layoutNodes,
          edges: layoutEdges,
          selectedNodeId: layoutNodes[0]?.id || null,
          selectedEdgeId: null,
          past: [],
          future: [],
        }));
      }
    },

    setActiveScenario: (scenarioId) => {
      const { activeSubsectionId } = useVisualizationLabStore.getState();
      const sub = activeSubsectionId ? getSubsection(activeSubsectionId) : undefined;
      const scenario = sub?.scenarios.find((s) => s.id === scenarioId);
      if (!scenario) return;
      const { nodes: layoutNodes, edges: layoutEdges } = applyCollisionFreeLayout(
        JSON.parse(JSON.stringify(scenario.diagram.nodes)),
        JSON.parse(JSON.stringify(scenario.diagram.edges))
      );
      set(() => ({
        activeScenarioId: scenario.id,
        currentJavaSource: scenario.javaSource,
        nodes: layoutNodes,
        edges: layoutEdges,
        selectedNodeId: layoutNodes[0]?.id || null,
        selectedEdgeId: null,
      }));
    },

    setJavaSource: (source) => set({ currentJavaSource: source }),
    toggleEducationalModal: () => set((state) => ({ isEducationalModalOpen: !state.isEducationalModalOpen })),

    stepForward: () => {
      const { currentStepIndex, totalSteps, jumpToStep } = useVisualizationLabStore.getState();
      if (currentStepIndex < totalSteps) {
        jumpToStep(currentStepIndex + 1);
      }
    },

    stepBackward: () => {
      const { currentStepIndex, jumpToStep } = useVisualizationLabStore.getState();
      if (currentStepIndex > 1) {
        jumpToStep(currentStepIndex - 1);
      }
    },

    jumpToStep: (targetStep: number) => {
      set((state) => {
        const step = Math.max(1, Math.min(state.totalSteps, targetStep));
        // For object-rep, simulate live execution progression
        if (state.activeCategoryId === 'object-rep') {
          const fullPreset = CATEGORY_PRESETS['object-rep'];
          if (!fullPreset) return { currentStepIndex: step };

          const allNodes = JSON.parse(JSON.stringify(fullPreset.nodes)) as Node<VisualEntityData>[];
          const allEdges = JSON.parse(JSON.stringify(fullPreset.edges)) as Edge<VisualRelationshipData>[];

          let visibleNodes = allNodes;
          let visibleEdges = allEdges;

          if (step <= 3) {
            // Only Metaspace class blueprint and top main() stack frame
            visibleNodes = allNodes.filter((n) => n.id === 'cls-student' || n.id === 'stack-main');
            visibleEdges = [];
          } else if (step <= 6) {
            // obj-001 allocated with initial gpa 3.92, var-s1 allocated
            visibleNodes = allNodes
              .filter((n) => n.id !== 'obj-002' && n.id !== 'var-s2')
              .map((n) => {
                if (n.id === 'obj-001') {
                  return {
                    ...n,
                    data: {
                      ...n.data,
                      instanceFieldValues: { id: '101', name: '"Alice Johnson"', gpa: '3.92' },
                      provenanceMutations: ['event-004: Allocated via Student(101, "Alice Johnson", 3.92)'],
                    },
                  };
                }
                return n;
              });
            visibleEdges = allEdges.filter(
              (e) => !e.source.includes('s2') && !e.target.includes('obj-002')
            );
          } else if (step <= 10) {
            // obj-002 allocated with 3.45, var-s2 allocated, obj-001 still 3.92
            visibleNodes = allNodes.map((n) => {
              if (n.id === 'obj-001') {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    instanceFieldValues: { id: '101', name: '"Alice Johnson"', gpa: '3.92' },
                    provenanceMutations: ['event-004: Allocated via Student(101, "Alice Johnson", 3.92)'],
                  },
                };
              }
              return n;
            });
            visibleEdges = allEdges;
          } else {
            // Step 11+: s1.gpa mutated to 4.0 (Final State)
            visibleNodes = allNodes;
            visibleEdges = allEdges;
          }

          return {
            currentStepIndex: step,
            nodes: visibleNodes,
            edges: visibleEdges,
          };
        }

        return { currentStepIndex: step };
      });
    },

    togglePlay: () => {
      const { isPlaying } = useVisualizationLabStore.getState();
      if (!isPlaying) {
        set({ isPlaying: true });
        const intervalId = window.setInterval(() => {
          const current = useVisualizationLabStore.getState();
          if (!current.isPlaying || current.currentStepIndex >= current.totalSteps) {
            window.clearInterval(intervalId);
            set({ isPlaying: false });
          } else {
            current.stepForward();
          }
        }, 900);
      } else {
        set({ isPlaying: false });
      }
    },

    toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
    toggleShowGrid: () => set((state) => ({ showGrid: !state.showGrid })),
    toggleMiniMap: () => set((state) => ({ showMiniMap: !state.showMiniMap })),
    toggleInspector: () => set((state) => ({ inspectorCollapsed: !state.inspectorCollapsed })),
    toggleLibrary: () => set((state) => ({ libraryCollapsed: !state.libraryCollapsed })),
    toggleCodeDrawer: () => set((state) => ({ isCodeDrawerOpen: !state.isCodeDrawerOpen })),

    applyLayout: (algorithm = 'hierarchical') => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        const { nodes: arrangedNodes, edges: arrangedEdges } = applyCollisionFreeLayout(
          state.nodes,
          state.edges,
          algorithm as LayoutAlgorithm
        );
        return {
          ...historyUpdate,
          nodes: arrangedNodes,
          edges: arrangedEdges,
        };
      });
    },

    exportCurrentWorkspace: () => {
      const state = useVisualizationLabStore.getState();
      exportWorkspaceToJson({
        id: `ws-${Date.now()}`,
        name: state.workspaceName,
        categoryId: state.activeCategoryId,
        updatedAt: new Date().toISOString(),
        nodes: state.nodes,
        edges: state.edges,
      });
    },

    importWorkspace: (data) => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        const { nodes: arrangedNodes, edges: arrangedEdges } = applyCollisionFreeLayout(
          data.nodes || [],
          data.edges || []
        );
        return {
          ...historyUpdate,
          workspaceName: data.name || state.workspaceName,
          activeCategoryId: data.categoryId || state.activeCategoryId,
          nodes: arrangedNodes,
          edges: arrangedEdges,
          selectedNodeId: arrangedNodes[0]?.id || null,
          selectedEdgeId: null,
        };
      });
    },

    onNodesChange: (changes) => {
      set((state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
      }));
    },

    onEdgesChange: (changes) => {
      set((state) => ({
        edges: applyEdgeChanges(changes, state.edges),
      }));
    },

    onConnect: (connection) => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        const newEdge: Edge<VisualRelationshipData> = {
          id: `edge-${Date.now()}`,
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle,
          targetHandle: connection.targetHandle,
          type: 'relationshipEdge',
          data: {
            id: `rel-${Date.now()}`,
            sourceId: connection.source,
            targetId: connection.target,
            type: 'association',
            label: 'associates',
            explanation: 'Semantic association between entities.',
          },
        };
        return {
          ...historyUpdate,
          edges: addFlowEdge(newEdge, state.edges),
        };
      });
    },

    selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
    selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
    clearSelection: () => set({ selectedNodeId: null, selectedEdgeId: null }),

    addEntity: (type, name, position) => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        const count = state.nodes.filter((n) => n.data.entityType === type).length + 1;
        const newId = `${type}-${Date.now().toString(36)}`;
        const entityName = name || `${type.charAt(0).toUpperCase() + type.slice(1)}_${count}`;

        let entityData: VisualEntityData = {
          id: newId,
          entityType: type,
          name: entityName,
          rotation: 0,
        };

        if (type === 'class') {
          entityData = {
            ...entityData,
            classType: 'class',
            visibility: 'public',
            sourceFile: `${entityName}.java`,
            fields: [
              { id: `f-${Date.now()}-1`, name: 'id', type: 'int', visibility: '-' },
              { id: `f-${Date.now()}-2`, name: 'title', type: 'String', visibility: '-' },
            ],
            constructors: [
              { id: `c-${Date.now()}-1`, name: entityName, parameters: [], visibility: '+' },
            ],
            methods: [
              { id: `m-${Date.now()}-1`, name: 'getId', returnType: 'int', visibility: '+', parameters: [] },
              { id: `m-${Date.now()}-2`, name: 'execute', returnType: 'void', visibility: '+', parameters: [] },
            ],
          };
        } else if (type === 'object') {
          entityData = {
            ...entityData,
            className: 'Entity',
            simulatorAddress: `@0x${Math.floor(Math.random() * 0xffff).toString(16).toUpperCase()}`,
            runtimeState: 'active',
            instanceFieldValues: {
              state: '"Initialized"',
            },
          };
        } else if (type === 'array') {
          entityData = {
            ...entityData,
            variableType: 'int[]',
            arrayLength: 3,
            arrayCells: [
              { index: 0, value: '10' },
              { index: 1, value: '20' },
              { index: 2, value: '30' },
            ],
          };
        } else if (type === 'variable') {
          entityData = {
            ...entityData,
            variableType: 'int',
            variableValue: '42',
            variableScope: 'local',
          };
        }

        const newNode: Node<VisualEntityData> = {
          id: newId,
          type: `${type}Node`,
          position: position || { x: 300 + Math.random() * 80, y: 150 + Math.random() * 80 },
          data: entityData,
        };

        return {
          ...historyUpdate,
          nodes: [...state.nodes, newNode],
          selectedNodeId: newId,
          selectedEdgeId: null,
        };
      });
    },

    updateEntityData: (id, updates) => {
      set((state) => ({
        nodes: state.nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...updates } } : n
        ),
      }));
    },

    rotateEntity: (id, degrees = 90) => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        return {
          ...historyUpdate,
          nodes: state.nodes.map((n) => {
            if (n.id !== id) return n;
            const currentRot = n.data.rotation || 0;
            return {
              ...n,
              data: { ...n.data, rotation: (currentRot + degrees) % 360 },
            };
          }),
        };
      });
    },

    duplicateSelected: () => {
      set((state) => {
        if (!state.selectedNodeId) return state;
        const target = state.nodes.find((n) => n.id === state.selectedNodeId);
        if (!target) return state;

        const historyUpdate = pushSnapshot(state);
        const newId = `${target.data.entityType}-${Date.now().toString(36)}`;
        const cloneNode: Node<VisualEntityData> = {
          ...JSON.parse(JSON.stringify(target)),
          id: newId,
          position: { x: target.position.x + 40, y: target.position.y + 40 },
          data: {
            ...JSON.parse(JSON.stringify(target.data)),
            id: newId,
            name: `${target.data.name}_Copy`,
          },
        };

        return {
          ...historyUpdate,
          nodes: [...state.nodes, cloneNode],
          selectedNodeId: newId,
        };
      });
    },

    deleteSelected: () => {
      set((state) => {
        if (!state.selectedNodeId && !state.selectedEdgeId) return state;
        const historyUpdate = pushSnapshot(state);

        if (state.selectedNodeId) {
          const nodeId = state.selectedNodeId;
          return {
            ...historyUpdate,
            nodes: state.nodes.filter((n) => n.id !== nodeId),
            edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
            selectedNodeId: null,
          };
        }

        if (state.selectedEdgeId) {
          const edgeId = state.selectedEdgeId;
          return {
            ...historyUpdate,
            edges: state.edges.filter((e) => e.id !== edgeId),
            selectedEdgeId: null,
          };
        }

        return state;
      });
    },

    addRelationship: (sourceId, targetId, type, label) => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        const newEdgeId = `rel-${Date.now().toString(36)}`;
        const newEdge: Edge<VisualRelationshipData> = {
          id: newEdgeId,
          source: sourceId,
          target: targetId,
          type: 'relationshipEdge',
          data: {
            id: newEdgeId,
            sourceId,
            targetId,
            type,
            label: label || type,
            explanation: `Relationship of type ${type}`,
          },
        };

        return {
          ...historyUpdate,
          edges: [...state.edges, newEdge],
          selectedEdgeId: newEdgeId,
          selectedNodeId: null,
        };
      });
    },

    updateRelationshipData: (id, updates) => {
      set((state) => ({
        edges: state.edges.map((e) =>
          e.id === id ? { ...e, data: { ...e.data!, ...updates } } : e
        ),
      }));
    },

    undo: () => {
      set((state) => {
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, state.past.length - 1);
        const currentSnapshot: HistorySnapshot = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          edges: JSON.parse(JSON.stringify(state.edges)),
        };

        return {
          nodes: previous.nodes,
          edges: previous.edges,
          past: newPast,
          future: [currentSnapshot, ...state.future],
          selectedNodeId: null,
          selectedEdgeId: null,
        };
      });
    },

    redo: () => {
      set((state) => {
        if (state.future.length === 0) return state;
        const next = state.future[0];
        const newFuture = state.future.slice(1);
        const currentSnapshot: HistorySnapshot = {
          nodes: JSON.parse(JSON.stringify(state.nodes)),
          edges: JSON.parse(JSON.stringify(state.edges)),
        };

        return {
          nodes: next.nodes,
          edges: next.edges,
          past: [...state.past, currentSnapshot],
          future: newFuture,
          selectedNodeId: null,
          selectedEdgeId: null,
        };
      });
    },

    resetWorkspace: () => {
      set((state) => {
        const preset = CATEGORY_PRESETS[state.activeCategoryId] || { nodes: [], edges: [] };
        const historyUpdate = pushSnapshot(state);
        return {
          ...historyUpdate,
          nodes: JSON.parse(JSON.stringify(preset.nodes)),
          edges: JSON.parse(JSON.stringify(preset.edges)),
          selectedNodeId: preset.nodes[0]?.id || null,
          selectedEdgeId: null,
        };
      });
    },

    clearWorkspace: () => {
      set((state) => {
        const historyUpdate = pushSnapshot(state);
        return {
          ...historyUpdate,
          nodes: [],
          edges: [],
          selectedNodeId: null,
          selectedEdgeId: null,
        };
      });
    },
  };
});
