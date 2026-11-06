import React from 'react';
import { Sparkles, ShieldCheck, GitFork, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import { ExecutionEvent } from '@/types/execution';

interface LiveConceptBannerProps {
  currentEvent: ExecutionEvent | null;
  onNavigateToConcept?: (conceptId: string) => void;
}

export const LiveConceptBanner: React.FC<LiveConceptBannerProps> = ({ currentEvent, onNavigateToConcept }) => {
  if (!currentEvent) return null;

  // Derive dynamic OOP concept detection from event metadata
  let conceptBadge = currentEvent.oopConceptNote;

  if (!conceptBadge) {
    if (currentEvent.type === 'OBJECT_ALLOCATED') {
      conceptBadge = {
        concept: 'Instantiation',
        title: 'Heap Object Allocation',
        explanation: `Allocated dynamic memory for ${currentEvent.className} on the JVM Heap. The 'new' operator initializes default fields before invoking the constructor.`,
        evidence: `new ${currentEvent.className}(...) at line ${currentEvent.line}`
      };
    } else if (currentEvent.methodName && currentEvent.methodName.startsWith('<init>')) {
      conceptBadge = {
        concept: 'Inheritance & Chaining',
        title: 'Constructor Initialization Sequence',
        explanation: `Constructors execute in hierarchical order: the superclass Object/parent constructor executes before child fields and constructor body statements are evaluated.`,
        evidence: `Constructor ${currentEvent.className}() at line ${currentEvent.line}`
      };
    } else if (currentEvent.mutatedField) {
      conceptBadge = {
        concept: 'Encapsulation & State Mutation',
        title: 'Object State Mutation',
        explanation: `Field '${currentEvent.mutatedField.fieldName}' transitioned from ${currentEvent.mutatedField.previousValue ?? 'null'} to ${currentEvent.mutatedField.newValue}. In encapsulated classes, state changes occur through validated method contracts.`,
        evidence: `${currentEvent.mutatedField.objectAddress}.${currentEvent.mutatedField.fieldName} = ${currentEvent.mutatedField.newValue}`
      };
    } else if (currentEvent.type === 'BRANCH_TAKEN') {
      conceptBadge = {
        concept: 'Control Flow',
        title: 'Conditional Branch Decision',
        explanation: `Evaluated conditional invariant. Program execution directed to the selected active branch path based on runtime operand values.`,
        evidence: `Branch at line ${currentEvent.line}`
      };
    } else if (currentEvent.type === 'LOOP_ITERATION') {
      conceptBadge = {
        concept: 'Iteration & Algorithms',
        title: 'Loop Body Execution',
        explanation: `Loop continuation condition satisfied. Iteration variable mutated and loop body executed deterministically.`,
        evidence: `Loop at line ${currentEvent.line}`
      };
    } else if (currentEvent.isException) {
      conceptBadge = {
        concept: 'Exception Handling',
        title: 'Exceptional Control Transfer',
        explanation: `An exception occurred, interrupting sequential flow and unwinding the call stack until a matching catch block or thread boundary is encountered.`,
        evidence: `Exception at line ${currentEvent.line}`
      };
    }
  }

  if (!conceptBadge) return null;

  const getConceptIcon = (concept: string) => {
    const lower = concept.toLowerCase();
    if (lower.includes('encapsulation')) return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    if (lower.includes('inheritance')) return <GitFork className="w-4 h-4 text-blue-600" />;
    if (lower.includes('polymorphism') || lower.includes('dispatch')) return <Zap className="w-4 h-4 text-amber-600" />;
    if (lower.includes('loop') || lower.includes('iteration')) return <RefreshCw className="w-4 h-4 text-purple-600" />;
    return <Sparkles className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 shadow-2xs font-sans text-xs flex items-start justify-between space-x-3 transition-all animate-in fade-in slide-in-from-top-1">
      <div className="flex items-start space-x-2.5">
        <div className="mt-0.5 p-1 bg-white rounded border border-amber-200 shadow-2xs shrink-0">
          {getConceptIcon(conceptBadge.concept)}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-amber-950 font-mono text-[11px] uppercase tracking-wider">
              {conceptBadge.concept}
            </span>
            <span className="text-muted-foreground text-[10px]">•</span>
            <span className="font-bold text-foreground text-xs">{conceptBadge.title}</span>
          </div>
          <p className="text-[11.5px] text-amber-900/90 leading-relaxed font-normal">
            {conceptBadge.explanation}
          </p>
          {conceptBadge.evidence && (
            <div className="text-[10px] font-mono text-amber-800 bg-amber-100/60 px-1.5 py-0.5 rounded inline-block mt-1">
              Evidence: {conceptBadge.evidence}
            </div>
          )}
        </div>
      </div>

      {onNavigateToConcept && (
        <button
          onClick={() => onNavigateToConcept(conceptBadge?.concept.toLowerCase().replace(/\s+/g, '-') || '')}
          className="text-amber-700 hover:text-amber-950 text-[11px] font-medium flex items-center space-x-0.5 shrink-0 px-2 py-1 rounded hover:bg-amber-100/80 transition-colors"
        >
          <span>Learn Concept</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

