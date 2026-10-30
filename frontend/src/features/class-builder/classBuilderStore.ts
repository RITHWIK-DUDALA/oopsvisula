import { create } from 'zustand';
import {
  ClassDiagramModel,
  ClassEntity,
  ClassField,
  ClassMethod,
  ClassRelationship,
  EntityKind,
  RelationshipType,
} from '@/types/classBuilder';
import { generateCompleteJavaModel } from './javaCodeGenerator';

interface ClassBuilderState {
  diagram: ClassDiagramModel;
  selectedEntityId: string | null;

  // Actions
  selectEntity: (id: string | null) => void;
  addEntity: (kind: EntityKind, name?: string) => void;
  removeEntity: (entityId: string) => void;
  updateEntityName: (entityId: string, name: string) => void;
  updatePosition: (entityId: string, x: number, y: number) => void;

  addField: (entityId: string, field: Omit<ClassField, 'id'>) => void;
  removeField: (entityId: string, fieldId: string) => void;

  addMethod: (entityId: string, method: Omit<ClassMethod, 'id'>) => void;
  removeMethod: (entityId: string, methodId: string) => void;

  addRelationship: (sourceEntityId: string, targetEntityId: string, type: RelationshipType) => void;
  removeRelationship: (id: string) => void;

  getGeneratedJavaCode: () => string;
  resetDiagram: () => void;
}

const initialDiagram: ClassDiagramModel = {
  entities: [
    {
      id: 'entity-1',
      name: 'Shape',
      kind: 'interface',
      fields: [],
      methods: [
        {
          id: 'm-1',
          name: 'getArea',
          returnType: 'double',
          modifier: 'public',
          isStatic: false,
          isAbstract: true,
          parameters: [],
        },
        {
          id: 'm-2',
          name: 'draw',
          returnType: 'void',
          modifier: 'public',
          isStatic: false,
          isAbstract: true,
          parameters: [],
        },
      ],
      position: { x: 50, y: 50 },
    },
    {
      id: 'entity-2',
      name: 'Circle',
      kind: 'class',
      fields: [
        {
          id: 'f-1',
          name: 'radius',
          type: 'double',
          modifier: 'private',
          isStatic: false,
          isFinal: false,
        },
      ],
      methods: [
        {
          id: 'm-3',
          name: 'getArea',
          returnType: 'double',
          modifier: 'public',
          isStatic: false,
          isAbstract: false,
          parameters: [],
          body: 'return Math.PI * radius * radius;',
        },
      ],
      position: { x: 350, y: 50 },
    },
    {
      id: 'entity-3',
      name: 'Point',
      kind: 'record',
      fields: [
        { id: 'f-2', name: 'x', type: 'double', modifier: 'public', isStatic: false, isFinal: true },
        { id: 'f-3', name: 'y', type: 'double', modifier: 'public', isStatic: false, isFinal: true },
      ],
      methods: [],
      position: { x: 200, y: 280 },
    },
  ],
  relationships: [
    {
      id: 'rel-1',
      sourceEntityId: 'entity-2',
      targetEntityId: 'entity-1',
      type: 'implements',
      label: 'implements',
    },
  ],
};

export const useClassBuilderStore = create<ClassBuilderState>((set, get) => ({
  diagram: initialDiagram,
  selectedEntityId: 'entity-2',

  selectEntity: (id) => set({ selectedEntityId: id }),

  addEntity: (kind, name) => {
    const id = `entity-${Date.now()}`;
    const defaultName = name || (kind === 'record' ? 'DataRecord' : kind === 'interface' ? 'Contract' : 'NewClass');
    const newEntity: ClassEntity = {
      id,
      name: defaultName,
      kind,
      fields: [],
      methods: [],
      position: { x: 100 + Math.random() * 150, y: 100 + Math.random() * 150 },
    };
    set({
      diagram: {
        ...get().diagram,
        entities: [...get().diagram.entities, newEntity],
      },
      selectedEntityId: id,
    });
  },

  removeEntity: (entityId) => {
    set({
      diagram: {
        entities: get().diagram.entities.filter((e) => e.id !== entityId),
        relationships: get().diagram.relationships.filter(
          (r) => r.sourceEntityId !== entityId && r.targetEntityId !== entityId
        ),
      },
      selectedEntityId: get().selectedEntityId === entityId ? null : get().selectedEntityId,
    });
  },

  updateEntityName: (entityId, name) => {
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, name } : e
        ),
      },
    });
  },

  updatePosition: (entityId, x, y) => {
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, position: { x, y } } : e
        ),
      },
    });
  },

  addField: (entityId, field) => {
    const newField: ClassField = {
      ...field,
      id: `f-${Date.now()}`,
    };
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, fields: [...e.fields, newField] } : e
        ),
      },
    });
  },

  removeField: (entityId, fieldId) => {
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, fields: e.fields.filter((f) => f.id !== fieldId) } : e
        ),
      },
    });
  },

  addMethod: (entityId, method) => {
    const newMethod: ClassMethod = {
      ...method,
      id: `m-${Date.now()}`,
    };
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, methods: [...e.methods, newMethod] } : e
        ),
      },
    });
  },

  removeMethod: (entityId, methodId) => {
    set({
      diagram: {
        ...get().diagram,
        entities: get().diagram.entities.map((e) =>
          e.id === entityId ? { ...e, methods: e.methods.filter((m) => m.id !== methodId) } : e
        ),
      },
    });
  },

  addRelationship: (sourceEntityId, targetEntityId, type) => {
    if (sourceEntityId === targetEntityId) return;
    const exists = get().diagram.relationships.some(
      (r) => r.sourceEntityId === sourceEntityId && r.targetEntityId === targetEntityId && r.type === type
    );
    if (exists) return;

    const newRel: ClassRelationship = {
      id: `rel-${Date.now()}`,
      sourceEntityId,
      targetEntityId,
      type,
      label: type,
    };

    set({
      diagram: {
        ...get().diagram,
        relationships: [...get().diagram.relationships, newRel],
      },
    });
  },

  removeRelationship: (id) => {
    set({
      diagram: {
        ...get().diagram,
        relationships: get().diagram.relationships.filter((r) => r.id !== id),
      },
    });
  },

  getGeneratedJavaCode: () => {
    return generateCompleteJavaModel(get().diagram);
  },

  resetDiagram: () => {
    set({ diagram: initialDiagram, selectedEntityId: 'entity-2' });
  },
}));
