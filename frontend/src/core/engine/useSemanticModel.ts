/**
 * OOPS LAB — UNIFIED SEMANTIC MODEL HOOK
 * Conforms to Master Plan Phase 3.
 * React hook that derives the authoritative SemanticModel from the active execution session.
 * Consumed by all 2D and 3D visualizers, inspectors, and graph views.
 */

import { useMemo } from 'react';
import { useSimulationStore } from '../../features/simulation/simulationStore';
import { buildSemanticModel, SemanticModel, SemanticEntity, SemanticRelationship } from './semanticModel';
import { analyzeProjectConcepts, ConceptIntelligenceReport, DetectedConcept, ConceptSummaryCount } from './conceptIntelligence';

export interface UseSemanticModelReturn {
  model: SemanticModel;
  classes: SemanticEntity[];
  interfaces: SemanticEntity[];
  records: SemanticEntity[];
  enums: SemanticEntity[];
  heapObjects: SemanticEntity[];
  activeCallStack: SemanticEntity[];
  threads: SemanticEntity[];
  relationships: SemanticRelationship[];
  activeRelationships: SemanticRelationship[];
  activeStep: number;
  totalSteps: number;
  currentEvent: SemanticModel['currentEvent'];

  // Concept Intelligence
  conceptReport: ConceptIntelligenceReport;
  concepts: DetectedConcept[];
  conceptSummary: ConceptSummaryCount[];
  getConceptsForEntity: (entityId: string) => DetectedConcept[];

  // Fast lookups
  getEntity: (id: string) => SemanticEntity | undefined;
  getChildren: (parentId: string) => SemanticEntity[];
  getParent: (entityId: string) => SemanticEntity | undefined;
  getOutgoing: (sourceId: string) => SemanticRelationship[];
  getIncoming: (targetId: string) => SemanticRelationship[];
  getHierarchy: (classId: string) => SemanticEntity[];
  search: (query: string) => SemanticEntity[];

  // Entity categorization counts
  stats: {
    classCount: number;
    objectCount: number;
    relationshipCount: number;
    activeCallDepth: number;
    threadCount: number;
  };
}

export function useSemanticModel(): UseSemanticModelReturn {
  const parsedProgram = useSimulationStore((state) => state.parsedProgram);
  const currentTrace = useSimulationStore((state) => state.currentTrace);
  const currentStepIndex = useSimulationStore((state) => state.currentStepIndex);

  const currentEvent = useMemo(() => {
    if (!currentTrace || !currentTrace.events || currentTrace.events.length === 0) {
      return undefined;
    }
    return currentTrace.events[currentStepIndex] || currentTrace.events[0];
  }, [currentTrace, currentStepIndex]);

  const allEvents = useMemo(() => {
    return currentTrace?.events || [];
  }, [currentTrace]);

  const model = useMemo(() => {
    return buildSemanticModel(parsedProgram, currentEvent, allEvents);
  }, [parsedProgram, currentEvent, allEvents]);

  // Derived filtered views for fast component rendering
  const classes = useMemo(() => model.getEntitiesByType(['class', 'abstract-class']), [model]);
  const interfaces = useMemo(() => model.getEntitiesByType('interface'), [model]);
  const records = useMemo(() => model.getEntitiesByType('record'), [model]);
  const enums = useMemo(() => model.getEntitiesByType('enum'), [model]);
  const heapObjects = useMemo(() => model.getHeapObjects(), [model]);
  const activeCallStack = useMemo(() => model.getActiveCallStack(), [model]);
  const threads = useMemo(() => model.getEntitiesByType('thread'), [model]);
  const activeRelationships = useMemo(() => model.getActiveRelationships(), [model]);

  const conceptReport = useMemo(() => {
    return analyzeProjectConcepts(model, parsedProgram || undefined, currentEvent, currentTrace);
  }, [model, parsedProgram, currentEvent, currentTrace]);

  const stats = useMemo(() => ({
    classCount: classes.length + interfaces.length + records.length + enums.length,
    objectCount: heapObjects.length,
    relationshipCount: model.relationships.length,
    activeCallDepth: activeCallStack.length,
    threadCount: threads.length,
  }), [classes, interfaces, records, enums, heapObjects, model, activeCallStack, threads]);

  return {
    model,
    classes,
    interfaces,
    records,
    enums,
    heapObjects,
    activeCallStack,
    threads,
    relationships: model.relationships,
    activeRelationships,
    activeStep: model.activeStep,
    totalSteps: allEvents.length,
    currentEvent,

    // Concept Intelligence
    conceptReport,
    concepts: conceptReport.concepts,
    conceptSummary: conceptReport.summary,
    getConceptsForEntity: conceptReport.getConceptsForEntity,

    getEntity: model.getEntity,
    getChildren: model.getChildren,
    getParent: model.getParent,
    getOutgoing: model.getOutgoingRelationships,
    getIncoming: model.getIncomingRelationships,
    getHierarchy: model.getClassHierarchy,
    search: model.searchEntities,
    stats,
  };
}
