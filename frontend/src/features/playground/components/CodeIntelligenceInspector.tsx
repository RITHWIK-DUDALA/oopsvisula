import React from 'react';
import { 
  Sparkles, 
  Box, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSemanticModel } from '@/core/engine/useSemanticModel';
import { SemanticEntity, SemanticRelationship } from '@/core/engine/semanticModel';
import { DetectedConcept } from '@/core/engine/conceptIntelligence';

interface CodeIntelligenceInspectorProps {
  onJumpToSource?: (file: string, line: number) => void;
  onClose?: () => void;
}

export const CodeIntelligenceInspector: React.FC<CodeIntelligenceInspectorProps> = ({ onJumpToSource, onClose }) => {
  const { activeEntitySelection, setActiveEntitySelection, setActiveFileId, projectFiles } = useSimulationStore();
  const { model, getEntity, getOutgoing, getIncoming, getChildren } = useSemanticModel();

  const isConceptSelected = activeEntitySelection?.type === 'concept';
  const selectedConcept: DetectedConcept | undefined = isConceptSelected
    ? (activeEntitySelection?.data as DetectedConcept)
    : undefined;

  const isRelationshipSelected = activeEntitySelection?.type === 'relationship';
  const selectedRelationship: SemanticRelationship | undefined = isRelationshipSelected
    ? (activeEntitySelection?.data as SemanticRelationship)
    : undefined;

  const selectedEntity: SemanticEntity | undefined = !isRelationshipSelected && !isConceptSelected && activeEntitySelection?.id
    ? getEntity(activeEntitySelection.id)
    : undefined;

  const outgoingRels = selectedEntity ? getOutgoing(selectedEntity.id) : [];
  const incomingRels = selectedEntity ? getIncoming(selectedEntity.id) : [];
  const children = selectedEntity ? getChildren(selectedEntity.id) : [];

  const handleJump = (file?: string, line?: number) => {
    if (!file && !line) return;
    const targetFile = file || 'Main.java';
    const projFile = projectFiles.find(f => f.name === targetFile);
    if (projFile) {
      setActiveFileId(projFile.id);
    }
    if (onJumpToSource && line) {
      onJumpToSource(targetFile, line);
    }
  };

  // Derive OOP Concepts detected for the active project
  const detectedConcepts = React.useMemo(() => {
    const concepts: Array<{
      name: string;
      category: string;
      status: 'Declared' | 'Statically detected' | 'Runtime observed' | 'Not detected';
      evidence: string;
      line?: number;
      file?: string;
    }> = [];

    const allEntities = Array.from(model.entities.values());

    // 1. Inheritance
    const inheritanceRels = model.relationships.filter(r => r.kind === 'extends');
    if (inheritanceRels.length > 0) {
      concepts.push({
        name: 'Inheritance & Extension',
        category: 'Class Hierarchy',
        status: 'Declared',
        evidence: inheritanceRels.map(r => `${getEntity(r.sourceId)?.name || r.sourceId} extends ${getEntity(r.targetId)?.name || r.targetId}`).join(', '),
        line: inheritanceRels[0].sourceLocation?.line,
        file: inheritanceRels[0].sourceLocation?.file,
      });
    }

    // 2. Interfaces & Abstraction
    const implementsRels = model.relationships.filter(r => r.kind === 'implements');
    const abstractClasses = model.getEntitiesByType('abstract-class');
    if (implementsRels.length > 0 || abstractClasses.length > 0) {
      const parts = [];
      if (abstractClasses.length > 0) parts.push(`Abstract: ${abstractClasses.map(a => a.name).join(', ')}`);
      if (implementsRels.length > 0) parts.push(`Implements: ${implementsRels.map(r => `${getEntity(r.sourceId)?.name || r.sourceId} -> ${getEntity(r.targetId)?.name || r.targetId}`).join(', ')}`);
      concepts.push({
        name: 'Abstraction & Contracts',
        category: 'Type System',
        status: 'Declared',
        evidence: parts.join(' | '),
        line: implementsRels[0]?.sourceLocation?.line || abstractClasses[0]?.sourceLine,
        file: implementsRels[0]?.sourceLocation?.file || abstractClasses[0]?.sourceFile,
      });
    }

    // 3. Encapsulation
    const fieldsWithPrivate = allEntities.filter(e => e.entityType === 'field' && e.visibility === 'private');
    if (fieldsWithPrivate.length > 0) {
      concepts.push({
        name: 'Encapsulation',
        category: 'Information Hiding',
        status: 'Statically detected',
        evidence: `${fieldsWithPrivate.length} private field(s) protected: ${fieldsWithPrivate.map(f => f.name).slice(0, 3).join(', ')}`,
        line: fieldsWithPrivate[0].sourceLine,
        file: fieldsWithPrivate[0].sourceFile,
      });
    }

    // 4. Polymorphism / Dynamic Dispatch
    const overriddenMethods = model.relationships.filter(r => r.kind === 'overrides');
    if (overriddenMethods.length > 0) {
      concepts.push({
        name: 'Runtime Polymorphism',
        category: 'Dynamic Dispatch',
        status: 'Statically detected',
        evidence: `Overridden methods detected: ${overriddenMethods.map(r => `${getEntity(r.sourceId)?.name || r.sourceId}()`).join(', ')}`,
        line: overriddenMethods[0].sourceLocation?.line,
        file: overriddenMethods[0].sourceLocation?.file,
      });
    }

    // 5. Association & Composition
    const references = model.relationships.filter(r => r.kind === 'references' || r.kind === 'associates' || r.kind === 'composes');
    if (references.length > 0) {
      concepts.push({
        name: 'Association & Reference Linking',
        category: 'Object Relations',
        status: 'Statically detected',
        evidence: references.map(r => `${getEntity(r.sourceId)?.name || r.sourceId} -> ${getEntity(r.targetId)?.name || r.targetId}`).slice(0, 3).join(', '),
        line: references[0].sourceLocation?.line,
        file: references[0].sourceLocation?.file,
      });
    }

    return concepts;
  }, [model, getEntity]);

  return (
    <div className="h-full flex flex-col bg-white border-l border-border select-none text-xs text-foreground overflow-hidden">
      {/* Header */}
      <div className="h-9 px-3 border-b border-border flex items-center justify-between bg-surface/50 font-medium shrink-0">
        <div className="flex items-center space-x-1.5 text-foreground/80">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Code Intelligence</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-muted-foreground font-mono">
            {selectedEntity ? selectedEntity.entityType : 'No selection'}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              title="Close Inspector"
              className="p-1 rounded hover:bg-neutral-200/70 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Case 0: Concept Selected (Part 10 Concept Inspector) */}
        {isConceptSelected && selectedConcept ? (
          <div className="space-y-3">
            {/* Overview Card */}
            <div className="p-3 bg-white border border-border rounded-lg space-y-2 shadow-2xs">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
                  {selectedConcept.category}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
                  {selectedConcept.status.replace('-', ' ')}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-foreground">{selectedConcept.name}</h3>
                {selectedConcept.primaryClassName && (
                  <div className="text-[11px] font-mono text-muted-foreground pt-0.5">
                    Class: <strong className="text-foreground">{selectedConcept.primaryClassName}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Explanations: Level 1 (Intuitive) & Level 2 (Technical) */}
            <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-2.5">
              <div className="space-y-1">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center space-x-1">
                  <span>Level 1: Intuitive Concept Explanation</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {selectedConcept.explanationSimple}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40 space-y-1">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Level 2: Technical Java Mechanics
                </div>
                <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
                  {selectedConcept.explanationTechnical}
                </p>
              </div>
            </div>

            {/* Why it Matters */}
            <div className="p-3 bg-white border border-border rounded-lg space-y-1.5 shadow-2xs">
              <div className="text-[10px] font-semibold text-blue-800 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Why It Matters in Software Design</span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {selectedConcept.whyItMatters}
              </p>
            </div>

            {/* Ground Evidence Members */}
            {selectedConcept.involvedMembers.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Where it is Used ({selectedConcept.involvedMembers.length} Members)
                </div>
                <div className="space-y-1 font-mono text-[10px] max-h-44 overflow-y-auto">
                  {selectedConcept.involvedMembers.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleJump(m.sourceFile, m.sourceLine)}
                      className="p-2 rounded bg-white border border-border hover:border-blue-500 hover:bg-blue-50/40 cursor-pointer transition-colors space-y-0.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground group-hover:text-blue-700">{m.name}</span>
                        <span className="text-[9px] text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                          {m.entityType}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-[9.5px] truncate">{m.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source Locations & Jump Buttons */}
            {selectedConcept.sourceLocations.length > 0 && (
              <div className="p-3 bg-white border border-border rounded-lg space-y-2 shadow-2xs">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Source Evidence Grounding
                </div>
                <div className="space-y-1.5 divide-y divide-border/40">
                  {selectedConcept.sourceLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] pt-1.5 first:pt-0">
                      <span className="font-mono text-muted-foreground text-[10px] truncate max-w-[65%]">
                        {loc.file}:{loc.line} — {loc.label}
                      </span>
                      <button
                        onClick={() => handleJump(loc.file, loc.line)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-[10.5px]"
                      >
                        <span>Line {loc.line}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : isRelationshipSelected && selectedRelationship ? (
          <div className="space-y-3">
            {(() => {
              const rel = selectedRelationship;
              const sourceEntity = getEntity(rel.sourceId);
              const targetEntity = getEntity(rel.targetId);
              const sourceName = sourceEntity?.name || rel.sourceId.replace('class-', '');
              const targetName = targetEntity?.name || rel.targetId.replace('class-', '');
              const kind = rel.kind;

              let typeLabel = 'ASSOCIATION';
              let symbolStr = '──>';
              let typeBadgeClass = 'bg-slate-100 text-slate-800 border-slate-300';
              let conceptName = 'Association & Reference Types';
              let explanation = `'${sourceName}' maintains a reference to '${targetName}'.`;

              if (kind === 'extends') {
                typeLabel = 'INHERITANCE (IS-A)';
                symbolStr = '──▷ (Solid line with hollow triangle)';
                typeBadgeClass = 'bg-blue-100 text-blue-900 border-blue-200';
                conceptName = 'Inheritance & Subtype Polymorphism';
                explanation = `'${sourceName}' inherits all accessible fields and methods from '${targetName}', establishing a foundational IS-A hierarchy and enabling code reuse.`;
              } else if (kind === 'implements') {
                typeLabel = 'INTERFACE IMPLEMENTATION';
                symbolStr = '- -▷ (Dashed line with hollow triangle)';
                typeBadgeClass = 'bg-teal-100 text-teal-900 border-teal-200';
                conceptName = 'Abstraction & Interface Contracts';
                explanation = `'${sourceName}' implements the interface contract declared by '${targetName}'. It guarantees concrete behavior for all declared abstract methods.`;
              } else if (kind === 'composes') {
                typeLabel = 'COMPOSITION (STRONG OWNERSHIP)';
                symbolStr = '◆── (Filled diamond at owner)';
                typeBadgeClass = 'bg-neutral-900 text-white border-neutral-800';
                conceptName = 'Composition & Lifecycle Binding';
                explanation = `'${sourceName}' strongly owns '${targetName}'. The lifecycle of the contained object is strictly bound to the owner.`;
              } else if (kind === 'aggregates') {
                typeLabel = 'AGGREGATION (HAS-A)';
                symbolStr = '◇── (Hollow diamond at owner)';
                typeBadgeClass = 'bg-neutral-100 text-neutral-800 border-neutral-300';
                conceptName = 'Aggregation & Loose Coupling';
                explanation = `'${sourceName}' aggregates '${targetName}'. '${targetName}' can exist independently outside the lifecycle of '${sourceName}'.`;
              } else if (kind === 'depends') {
                typeLabel = 'DEPENDENCY (USES-A)';
                symbolStr = '- -> (Dashed line with arrow)';
                typeBadgeClass = 'bg-neutral-100 text-neutral-700 border-neutral-300';
                conceptName = 'Dependency & Separation of Concerns';
                explanation = `'${sourceName}' depends on '${targetName}' to execute operations (passed as parameter or instantiated locally).`;
              } else if (kind === 'invokes') {
                typeLabel = 'METHOD INVOCATION';
                symbolStr = '··> (Dotted line with call arrow)';
                typeBadgeClass = 'bg-violet-100 text-violet-900 border-violet-200';
                conceptName = 'Dynamic Method Dispatch';
                explanation = `'${sourceName}' invokes method '${rel.metadata?.methodName || 'call'}()' on '${targetName}'.`;
              }

              return (
                <div className="space-y-3">
                  {/* Relationship Type Banner */}
                  <div className="p-3 bg-white border border-border rounded-lg space-y-2 shadow-2xs">
                    <div className="flex items-start justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${typeBadgeClass}`}>
                        {typeLabel}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{rel.id}</span>
                    </div>

                    {/* UML Visual Syntax Display */}
                    <div className="py-1.5 px-2 bg-neutral-50 rounded border border-neutral-200/80 font-mono text-xs flex items-center justify-between">
                      <button
                        onClick={() => sourceEntity && setActiveEntitySelection({ type: 'class', id: sourceEntity.id, data: sourceEntity })}
                        className="font-bold text-blue-700 hover:underline truncate max-w-[40%]"
                        title="Inspect source class"
                      >
                        {sourceName}
                      </button>
                      <span className="text-[11px] text-neutral-500 font-semibold px-1">
                        {kind === 'extends' ? '──▷' : kind === 'implements' ? '- -▷' : kind === 'composes' ? '◆──' : kind === 'aggregates' ? '◇──' : '──>'}
                      </span>
                      <button
                        onClick={() => targetEntity && setActiveEntitySelection({ type: 'class', id: targetEntity.id, data: targetEntity })}
                        className="font-bold text-teal-700 hover:underline truncate max-w-[40%]"
                        title="Inspect target class"
                      >
                        {targetName}
                      </button>
                    </div>

                    <div className="text-[10px] text-muted-foreground font-mono">
                      UML Notation: <span className="text-foreground">{symbolStr}</span>
                    </div>
                  </div>

                  {/* Pedagogical Explanation */}
                  <div className="p-3 bg-surface/50 border border-border rounded-lg space-y-1.5">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Pedagogical Concept: {conceptName}
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      {explanation}
                    </p>
                  </div>

                  {/* Evidence & Source Location */}
                  <div className="p-3 bg-white border border-border rounded-lg space-y-2">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Code Evidence & AST Grounding
                    </div>

                    {rel.metadata?.evidence && (
                      <div className="p-2 bg-neutral-900 text-neutral-100 rounded text-[11px] font-mono break-all leading-tight">
                        {rel.metadata.evidence}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                      <span className="text-muted-foreground font-mono">
                        {rel.sourceLocation?.file || sourceEntity?.sourceFile || 'Main.java'}:
                        {rel.sourceLocation?.line || sourceEntity?.sourceLine || 1}
                      </span>
                      <button
                        onClick={() => handleJump(
                          rel.sourceLocation?.file || sourceEntity?.sourceFile, 
                          rel.sourceLocation?.line || sourceEntity?.sourceLine
                        )}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <span>Jump to Line</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : selectedEntity ? (
          /* Case 2: Selected Entity Details */
          <div className="space-y-3">
            <div className="p-3 bg-surface/40 border border-border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <Box className="w-4 h-4 text-blue-600" />
                    <span className="font-mono font-bold text-sm text-foreground">{selectedEntity.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">{selectedEntity.qualifiedName}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-50 text-blue-800 border border-blue-200">
                  {selectedEntity.entityType}
                </span>
              </div>

              {/* Source Location */}
              {selectedEntity.sourceLine && (
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                  <span className="text-muted-foreground font-mono">
                    {selectedEntity.sourceFile || 'Main.java'}:{selectedEntity.sourceLine}
                  </span>
                  <button
                    onClick={() => handleJump(selectedEntity.sourceFile, selectedEntity.sourceLine)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Jump to Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Evidence Classification */}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Evidence Status</div>
              <div className="flex items-center space-x-2 p-2 bg-emerald-50/60 border border-emerald-200 rounded text-emerald-900 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  {selectedEntity.provenance === 'source' ? 'Declared directly in source AST' : 'Observed during execution'}
                </span>
              </div>
            </div>

            {/* Members / Fields / Methods */}
            {children.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Declared Members ({children.length})
                </div>
                <div className="border border-border rounded-md divide-y divide-border/60 max-h-48 overflow-y-auto">
                  {children.map(child => (
                    <div 
                      key={child.id}
                      onClick={() => handleJump(child.sourceFile, child.sourceLine)}
                      className="px-2.5 py-1.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${child.visibility === 'private' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                        <span className="font-mono text-[11px] truncate">{child.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {child.entityType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relationships */}
            {(outgoingRels.length > 0 || incomingRels.length > 0) && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Relationships ({outgoingRels.length + incomingRels.length})
                </div>
                <div className="space-y-1">
                  {outgoingRels.map(rel => {
                    const targetName = getEntity(rel.targetId)?.name || rel.targetId;
                    return (
                      <div key={rel.id} className="p-2 border border-border rounded bg-neutral-50/70 text-[11px] space-y-1">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-medium">{selectedEntity.name}</span>
                          <span className="px-1 py-0.2 bg-blue-100 text-blue-800 rounded text-[9px] uppercase font-sans">
                            {rel.kind}
                          </span>
                          <span className="text-muted-foreground">{targetName}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          Evidence: {rel.metadata?.evidence || rel.kind}
                        </div>
                      </div>
                    );
                  })}
                  {incomingRels.map(rel => {
                    const sourceName = getEntity(rel.sourceId)?.name || rel.sourceId;
                    return (
                      <div key={rel.id} className="p-2 border border-border rounded bg-neutral-50/70 text-[11px] space-y-1">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-muted-foreground">{sourceName}</span>
                          <span className="px-1 py-0.2 bg-purple-100 text-purple-800 rounded text-[9px] uppercase font-sans">
                            {rel.kind}
                          </span>
                          <span className="font-medium">{selectedEntity.name}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          Evidence: {rel.metadata?.evidence || rel.kind}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground space-y-2">
            <HelpCircle className="w-6 h-6 mx-auto text-neutral-400" />
            <p className="text-xs">Click any class, interface, or object in the workspace to inspect its code intelligence and evidence.</p>
          </div>
        )}

        {/* Global Detected OOP Concepts in Code */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Discovered OOP Concepts ({detectedConcepts.length})
            </span>
          </div>

          {detectedConcepts.length > 0 ? (
            <div className="space-y-2">
              {detectedConcepts.map((concept, idx) => (
                <div key={idx} className="p-2.5 border border-border rounded-lg bg-surface/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground text-[11px]">{concept.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {concept.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                    {concept.evidence}
                  </p>
                  {concept.line && (
                    <button
                      onClick={() => handleJump(concept.file, concept.line)}
                      className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center space-x-1 font-mono pt-1"
                    >
                      <span>Line {concept.line} in {concept.file || 'Main.java'}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-[11px] text-muted-foreground italic text-center">
              No advanced OOP constructs detected yet in active code.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
