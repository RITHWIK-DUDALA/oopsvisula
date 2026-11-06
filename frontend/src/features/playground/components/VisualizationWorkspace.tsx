import React, { useState } from 'react';
import { 
  Layers, 
  Box, 
  GitFork,
  ArrowRightLeft,
  PhoneCall,
  GitMerge,
  ExternalLink,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';
import { OopConceptsExplorer } from './OopConceptsExplorer';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSemanticModel } from '@/core/engine/useSemanticModel';
import { ClassArchitectureMap } from './ClassArchitectureMap';

interface VisualizationWorkspaceProps {
  onSelectEntity?: (id: string, file: string, line?: number) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

type WorkspaceTab = 'architecture' | 'concepts' | 'dataflow' | 'callflow' | 'controlflow' | 'objects' | 'hierarchy';

export const VisualizationWorkspace: React.FC<VisualizationWorkspaceProps> = ({ 
  onSelectEntity, 
  onJumpToSource 
}) => {
  const { 
    playgroundMode,
    setPlaygroundMode,
    setActiveEntitySelection,
    setActiveFileId,
    setActiveConceptFilter,
    projectFiles,
    currentTrace,
    currentStepIndex
  } = useSimulationStore();

  const { 
    classes, 
    interfaces, 
    records, 
    enums, 
    heapObjects, 
    relationships, 
    activeCallStack,
    concepts,
    getEntity
  } = useSemanticModel();

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('architecture');

  const allClasses = [...classes, ...interfaces, ...records, ...enums];

  const handleSelectClassEntity = (id: string, file: string, line?: number) => {
    const entity = getEntity(id);
    if (entity) {
      setActiveEntitySelection({
        type: 'class',
        id: entity.id,
        data: entity,
      });
    }

    if (file) {
      const projFile = projectFiles.find((f) => f.name === file);
      if (projFile) {
        setActiveFileId(projFile.id);
      }
    }

    if (onSelectEntity) {
      onSelectEntity(id, file, line);
    }
  };

  const handleJump = (file: string, line: number) => {
    const projFile = projectFiles.find((f) => f.name === file);
    if (projFile) {
      setActiveFileId(projFile.id);
    }
    if (onJumpToSource) {
      onJumpToSource(file, line);
    }
  };

  // Derive call relationships from AST and active trace
  const callRelationships = relationships.filter((r) => r.kind === 'invokes' || r.kind === 'instantiates');

  // Derive mutated fields and data transitions from execution trace
  const activeMutations = currentTrace?.events.slice(0, currentStepIndex + 1).filter((e) => e.mutatedField) || [];

  return (
    <div className="h-full flex flex-col bg-neutral-50/60 select-none text-xs text-foreground overflow-hidden">
      {/* Visualizer Top Control Bar */}
      <div className="h-10 px-3 border-b border-border bg-white flex items-center justify-between shrink-0 shadow-2xs">
        {/* Perspective Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Class Architecture</span>
            <span className="ml-1 px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-[10px] font-mono">
              {allClasses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'concepts'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>OOP Concepts</span>
            <span className="ml-1 px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[10px] font-mono">
              {concepts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dataflow')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'dataflow'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span>Data Flow</span>
            {activeMutations.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-mono">
                {activeMutations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('callflow')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'callflow'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-violet-600" />
            <span>Method Calls</span>
            {callRelationships.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-violet-100 text-violet-800 rounded-full text-[10px] font-mono">
                {callRelationships.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('controlflow')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'controlflow'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-amber-600" />
            <span>Control Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('objects')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'objects'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-emerald-600" />
            <span>Heap Objects</span>
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-mono">
              {heapObjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'hierarchy'
                ? 'bg-neutral-100 text-foreground font-semibold shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-purple-600" />
            <span>Hierarchy Tree</span>
            <span className="ml-1 px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-full text-[10px] font-mono">
              {relationships.length}
            </span>
          </button>
        </div>

        {/* Architecture Mode / Live Mode Switcher */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => setPlaygroundMode('architecture')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                playgroundMode === 'architecture'
                  ? 'bg-white shadow-2xs text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Architecture Mode: Static UML diagrams, relationships & concepts"
            >
              <Layers className="w-3 h-3 text-blue-600" />
              <span>Architecture</span>
            </button>
            <button
              onClick={() => setPlaygroundMode('live')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                playgroundMode === 'live'
                  ? 'bg-white shadow-2xs text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Live Mode: Progressive line-by-line Java execution visualization"
            >
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500/20" />
              <span>Live Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Perspective Body */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        {/* 0. OOP Concepts Perspective */}
        {activeTab === 'concepts' && (
          <OopConceptsExplorer
            onJumpToSource={handleJump}
            onNavigateToArchitecture={(c) => {
              setActiveConceptFilter(c || null);
              setActiveTab('architecture');
            }}
          />
        )}

        {/* 1. Class Architecture 2D Map */}
        {activeTab === 'architecture' && (
          <ClassArchitectureMap
            onSelectEntity={handleSelectClassEntity}
            onJumpToSource={handleJump}
          />
        )}

        {/* 2. Data Flow Perspective */}
        {activeTab === 'dataflow' && (
          <div className="h-full overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Java Data Flow & Mutation Inspector</h3>
              <p className="text-xs text-muted-foreground">
                Tracks state transformations, parameter passing, and member variable modifications throughout execution.
              </p>
            </div>

            {activeMutations.length > 0 ? (
              <div className="space-y-3">
                {activeMutations.map((ev, idx) => {
                  const m = ev.mutatedField!;
                  return (
                    <div key={idx} className="p-3 bg-white border border-border rounded-lg shadow-2xs flex items-center justify-between font-mono text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="font-bold text-foreground">{ev.className || 'Object'}</span>
                          <span className="text-muted-foreground font-normal">.{m.fieldName}</span>
                          <span className="text-xs text-neutral-400">mutated in</span>
                          <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 text-[10px]">
                            {ev.methodName}()
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center space-x-2 pl-5">
                          <span>Previous: <span className="font-semibold text-neutral-600">{JSON.stringify(m.previousValue)}</span></span>
                          <span>→</span>
                          <span>New Value: <span className="font-bold text-emerald-600">{JSON.stringify(m.newValue)}</span></span>
                        </div>
                      </div>

                      {ev.line && (
                        <button
                          onClick={() => handleJump(ev.file || 'Main.java', ev.line)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-[11px]"
                        >
                          <span>Line {ev.line}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 bg-white border border-dashed border-border rounded-xl text-center text-muted-foreground space-y-2">
                <ArrowRightLeft className="w-8 h-8 mx-auto text-neutral-400" />
                <p className="text-xs">No field mutations recorded in the current execution step. Advance execution to observe state changes.</p>
              </div>
            )}
          </div>
        )}

        {/* 3. Method Call Flow Perspective */}
        {activeTab === 'callflow' && (
          <div className="h-full overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Method Call Graph & Dynamic Dispatch</h3>
              <p className="text-xs text-muted-foreground">
                Visualizes caller-callee relationships, static invocations, and runtime dynamic method dispatch.
              </p>
            </div>

            {/* Active JVM Call Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Call Stack Frames</h4>
              {activeCallStack.length > 0 ? (
                <div className="space-y-1.5">
                  {activeCallStack.map((frame, idx) => (
                    <div key={frame.id} className="p-2.5 bg-violet-50/70 border border-violet-200 rounded-lg flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-violet-900">{frame.name}</span>
                        <span className="text-[10px] text-violet-600">({frame.qualifiedName})</span>
                      </div>
                      {frame.sourceLine && (
                        <button
                          onClick={() => handleJump(frame.sourceFile || 'Main.java', frame.sourceLine!)}
                          className="text-violet-700 hover:underline text-[11px] flex items-center space-x-1"
                        >
                          <span>Line {frame.sourceLine}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white border border-border rounded-lg text-xs text-muted-foreground">
                  Call stack is currently idle at JVM entry point.
                </div>
              )}
            </div>

            {/* Declared Invocations in Code */}
            {callRelationships.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Declared Method Invocations</h4>
                <div className="space-y-1.5">
                  {callRelationships.map((call) => (
                    <div key={call.id} className="p-2.5 bg-white border border-border rounded-lg flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-foreground">{getEntity(call.sourceId)?.name || call.sourceId}</span>
                        <span className="text-violet-600 font-bold">{'··>'}</span>
                        <span className="font-semibold text-foreground">{getEntity(call.targetId)?.name || call.targetId}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {call.metadata?.evidence || 'invokes'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. Control Flow Perspective */}
        {activeTab === 'controlflow' && (
          <div className="h-full overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Control Flow & Branch Decisions</h3>
              <p className="text-xs text-muted-foreground">
                Branching paths, loop conditions, and structured exception handling constructs detected in AST.
              </p>
            </div>

            <div className="p-4 bg-white border border-border rounded-lg space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Deterministic Execution Trace Loaded</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Step-by-step control transitions are evaluated sequentially per statement. Use the bottom execution bar controls (Step Forward, Step Backward, Scrub) to step through branch paths and method entries.
              </p>
            </div>
          </div>
        )}

        {/* 5. Runtime Objects Perspective */}
        {activeTab === 'objects' && (
          <div className="h-full overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Active Heap Instances</h3>
              <p className="text-xs text-muted-foreground">
                Actual live objects allocated in JVM heap memory during execution, strictly distinguished from static class blueprints.
              </p>
            </div>

            {heapObjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heapObjects.map((obj) => (
                  <div key={obj.id} className="p-4 bg-white border border-emerald-500/40 rounded-xl shadow-xs space-y-2 font-mono">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="font-bold text-emerald-900">{obj.name}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                        {obj.runtimeState?.runtimeType || 'Object'}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Heap Address: <span className="text-foreground">{obj.runtimeState?.address || '@0x0'}</span>
                    </div>
                    {obj.runtimeState?.fields && Object.keys(obj.runtimeState.fields).length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] uppercase font-semibold text-muted-foreground">Observed Field Values</div>
                        {Object.entries(obj.runtimeState.fields).map(([k, v]) => (
                          <div key={k} className="flex justify-between text-[11px]">
                            <span className="text-muted-foreground">{k}:</span>
                            <span className="font-semibold text-foreground">{JSON.stringify(v.value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white border border-dashed border-border rounded-xl text-center text-muted-foreground space-y-2">
                <Box className="w-8 h-8 mx-auto text-neutral-400" />
                <p className="text-xs">No runtime objects allocated yet. Click "Run Project" to execute the program and instantiate objects in the JVM heap.</p>
              </div>
            )}
          </div>
        )}

        {/* 6. Hierarchy Perspective */}
        {activeTab === 'hierarchy' && (
          <div className="h-full overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Class Relationships & Inheritance Tree</h3>
              <p className="text-xs text-muted-foreground">
                Detected extends, implements, composition, aggregation, and association connections derived strictly from code evidence.
              </p>
            </div>

            {relationships.length > 0 ? (
              <div className="space-y-2">
                {relationships.map((rel) => {
                  const sourceName = getEntity(rel.sourceId)?.name || rel.sourceId;
                  const targetName = getEntity(rel.targetId)?.name || rel.targetId;
                  return (
                    <div 
                      key={rel.id} 
                      onClick={() => setActiveEntitySelection({ type: 'relationship', id: rel.id, data: rel })}
                      className="p-3 bg-white border border-border rounded-lg shadow-2xs flex items-center justify-between font-mono text-xs hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-foreground">{sourceName}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] uppercase">
                          {rel.kind}
                        </span>
                        <span className="font-bold text-foreground">{targetName}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        Evidence: {rel.metadata?.evidence || rel.kind}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 bg-white border border-dashed border-border rounded-xl text-center text-muted-foreground space-y-2">
                <GitFork className="w-8 h-8 mx-auto text-neutral-400" />
                <p className="text-xs">No relationships detected in current code.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
