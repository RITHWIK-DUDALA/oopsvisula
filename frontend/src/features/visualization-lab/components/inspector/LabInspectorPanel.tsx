import React, { useState } from 'react';
import {
  Sliders,
  X,
  Info,
  GitBranch,
  ShieldCheck,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useVisualizationLabStore } from '../../visualizationStore';
import { RelationshipType } from '../../types';

export const LabInspectorPanel: React.FC = () => {
  const {
    inspectorCollapsed,
    toggleInspector,
    selectedNodeId,
    selectedEdgeId,
    nodes,
    edges,
    selectNode,
    updateEntityData,
    updateRelationshipData,
  } = useVisualizationLabStore();

  const [activeTab, setActiveTab] = useState<'inspector' | 'dependencies'>('inspector');
  const [relFilter, setRelFilter] = useState<string>('all');

  if (inspectorCollapsed) {
    return null;
  }

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;
  const selectedEdge = selectedEdgeId ? edges.find((e) => e.id === selectedEdgeId) : null;

  // Incoming and Outgoing edges for the selected node
  const incomingEdges = selectedNodeId ? edges.filter((e) => e.target === selectedNodeId) : [];
  const outgoingEdges = selectedNodeId ? edges.filter((e) => e.source === selectedNodeId) : [];

  const filteredIncoming =
    relFilter === 'all'
      ? incomingEdges
      : incomingEdges.filter((e) => e.data?.type === relFilter);

  const filteredOutgoing =
    relFilter === 'all'
      ? outgoingEdges
      : outgoingEdges.filter((e) => e.data?.type === relFilter);

  const getProvenanceBadgeStyle = (category?: string) => {
    switch (category) {
      case 'SOURCE':
        return 'bg-blue-100 text-[#1749C8] border-blue-200';
      case 'STATIC ANALYSIS':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'RUNTIME':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'DERIVED':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'SIMULATED':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <aside className="w-80 border-l border-[#DCE2EA] bg-white flex flex-col h-full select-none font-sans shrink-0 z-10">
      {/* Inspector Header */}
      <div className="p-3 border-b border-[#DCE2EA] flex items-center justify-between bg-[#F1F4F8]">
        <div className="flex items-center space-x-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#1749C8]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#172033]">
            {selectedNode ? 'Entity Inspector' : selectedEdge ? 'Relationship Inspector' : 'Workspace Inspector'}
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleInspector}
          className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] hover:text-[#172033]"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dual Tabs: Inspector vs Dependency Graph */}
      <div className="flex items-center border-b border-[#DCE2EA] bg-white px-2 pt-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center space-x-1.5 py-1.5 px-3 border-b-2 font-mono text-xs font-semibold transition-colors ${
            activeTab === 'inspector'
              ? 'border-[#1749C8] text-[#1749C8]'
              : 'border-transparent text-[#64748B] hover:text-[#172033]'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Inspector</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('dependencies')}
          className={`flex items-center space-x-1.5 py-1.5 px-3 border-b-2 font-mono text-xs font-semibold transition-colors ${
            activeTab === 'dependencies'
              ? 'border-[#1749C8] text-[#1749C8]'
              : 'border-transparent text-[#64748B] hover:text-[#172033]'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Dependencies</span>
          {selectedNode && (
            <span className="text-[10px] bg-[#F1F4F8] text-[#475569] px-1.5 py-0.2 rounded-full">
              {incomingEdges.length + outgoingEdges.length}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activeTab === 'inspector' ? (
          /* TAB 1: INSPECTOR */
          selectedNode ? (
            <div className="space-y-4 text-xs font-mono">
              {/* Name & Type */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#64748B] uppercase font-bold">Entity Name & Identity</label>
                <input
                  type="text"
                  value={selectedNode.data.name}
                  onChange={(e) => updateEntityData(selectedNode.id, { name: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAFBFD] border border-[#DCE2EA] focus:border-[#1749C8] rounded text-xs font-semibold text-[#172033] outline-hidden"
                />
                <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-0.5">
                  <span>Kind: {selectedNode.data.entityType}</span>
                  <span>ID: {selectedNode.id}</span>
                </div>
              </div>

              {/* SECTION 8: DATA PROVENANCE */}
              <div className="p-3 bg-[#FAFBFD] border border-[#DCE2EA] rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Data Provenance</span>
                  </span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold border ${getProvenanceBadgeStyle(
                      selectedNode.data.provenanceCategory || 'RUNTIME'
                    )}`}
                  >
                    {selectedNode.data.provenanceCategory || 'RUNTIME'}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-[#475569]">
                  <div className="flex justify-between border-b border-[#F1F4F8] pb-0.5">
                    <span className="text-[#64748B]">Origin Event:</span>
                    <span className="text-[#172033] font-medium font-mono">
                      {selectedNode.data.provenanceOriginEvent || 'event-verified'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#F1F4F8] pb-0.5">
                    <span className="text-[#64748B]">Source File:</span>
                    <span className="text-[#1749C8] font-mono">
                      {selectedNode.data.provenanceSourceLocation ||
                        selectedNode.data.sourceFile ||
                        'Main.java:14'}
                    </span>
                  </div>
                  {selectedNode.data.provenanceConstructor && (
                    <div className="flex justify-between border-b border-[#F1F4F8] pb-0.5">
                      <span className="text-[#64748B]">Constructor:</span>
                      <span className="text-[#D97706] font-mono">
                        {selectedNode.data.provenanceConstructor}
                      </span>
                    </div>
                  )}
                  {selectedNode.data.provenanceMutations &&
                    selectedNode.data.provenanceMutations.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] text-[#64748B] block mb-0.5">Field Mutation Log:</span>
                        {selectedNode.data.provenanceMutations.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-1 bg-amber-50 text-amber-900 border border-amber-200 rounded text-[10px] font-mono"
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* Program Entity Status & Source Navigation (Decoupled from visual canvas edits) */}
              <div className="p-2.5 bg-[#F1F4F8] border border-[#DCE2EA] rounded-md space-y-1.5">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-[#64748B]">Entity Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    Verified Program Entity
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] pt-0.5 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Mutability:</span>
                  <span className="text-[#172033] font-medium">Governed by Java Source / VM</span>
                </div>
              </div>

              {/* Class Blueprint Details */}
              {selectedNode.data.entityType === 'class' && (
                <div className="space-y-3 border-t border-[#DCE2EA] pt-3">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Class Blueprint</span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Kind:</span>
                      <span className="text-[#172033] font-semibold">{selectedNode.data.classType || 'class'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Source File:</span>
                      <span className="text-[#1749C8]">{selectedNode.data.sourceFile || 'Student.java'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Declared Fields:</span>
                      <span className="text-[#172033]">{selectedNode.data.fields?.length || 0}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Constructors:</span>
                      <span className="text-[#172033]">{selectedNode.data.constructors?.length || 0}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Member Methods:</span>
                      <span className="text-[#172033]">{selectedNode.data.methods?.length || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Object Instance Details */}
              {selectedNode.data.entityType === 'object' && (
                <div className="space-y-3 border-t border-[#DCE2EA] pt-3">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">
                    Observed Heap Object State
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Runtime Class:</span>
                      <span className="text-[#172033] font-semibold">{selectedNode.data.className || 'Student'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Logical Identity:</span>
                      <span className="text-[#1749C8] font-bold">
                        {selectedNode.data.simulatorAddress || selectedNode.id}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Reachability:</span>
                      <span className="text-emerald-700 font-bold">{selectedNode.data.runtimeState || 'active'}</span>
                    </div>
                  </div>

                  {/* Live Field Values */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">Live Field Values</span>
                    <div className="space-y-1 bg-[#FAFBFD] p-2 rounded border border-[#E2E8F0]">
                      {selectedNode.data.instanceFieldValues &&
                      Object.keys(selectedNode.data.instanceFieldValues).length > 0 ? (
                        Object.entries(selectedNode.data.instanceFieldValues).map(([key, val]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between text-[11px] border-b border-[#F1F4F8] pb-0.5 last:border-0"
                          >
                            <span className="text-[#64748B] font-medium">{key}</span>
                            <span className="text-[#172033] font-bold font-mono">{String(val)}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] text-[#94A3B8] italic">No fields initialized</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Variable Specific Details */}
              {selectedNode.data.entityType === 'variable' && (
                <div className="space-y-3 border-t border-[#DCE2EA] pt-3">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Stack Variable Details</span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Declared Type:</span>
                      <span className="text-[#172033] font-semibold">
                        {selectedNode.data.variableType || 'Reference'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Held Value / Pointer:</span>
                      <span className="text-[#1749C8] font-bold">
                        {selectedNode.data.variableValue || 'null'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F1F4F8]">
                      <span className="text-[#64748B]">Scope:</span>
                      <span className="text-[#172033]">{selectedNode.data.variableScope || 'local'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : selectedEdge ? (
            /* Edge Inspector */
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#64748B] uppercase font-bold">Relationship Type</label>
                <select
                  value={selectedEdge.data?.type || 'association'}
                  onChange={(e) =>
                    updateRelationshipData(selectedEdge.id, {
                      type: e.target.value as RelationshipType,
                      label: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-[#FAFBFD] border border-[#DCE2EA] focus:border-[#1749C8] rounded text-xs font-semibold text-[#172033] outline-hidden"
                >
                  <option value="reference">Object Reference (Solid Blue Arrow)</option>
                  <option value="inheritance">Inheritance (extends - Hollow Triangle)</option>
                  <option value="implementation">Implementation (implements - Dashed Hollow Triangle)</option>
                  <option value="composition">Composition (has-a - Filled Diamond)</option>
                  <option value="aggregation">Aggregation (has-a - Hollow Diamond)</option>
                  <option value="association">Association (Class Structural)</option>
                  <option value="dependency">Dependency (instance-of / uses)</option>
                  <option value="invocation">Method Invocation (Amber Arrow)</option>
                </select>
              </div>

              {/* Edge Provenance */}
              <div className="p-3 bg-[#FAFBFD] border border-[#DCE2EA] rounded-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Provenance</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold border ${getProvenanceBadgeStyle(
                      selectedEdge.data?.provenanceCategory || 'RUNTIME'
                    )}`}
                  >
                    {selectedEdge.data?.provenanceCategory || 'RUNTIME'}
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] leading-tight">
                  {selectedEdge.data?.explanation || 'Semantic connector between entities.'}
                </p>
              </div>
            </div>
          ) : (
            /* Workspace Empty State */
            <div className="p-6 text-center space-y-3 font-mono text-[#64748B]">
              <div className="w-10 h-10 rounded-full bg-[#F1F4F8] border border-[#DCE2EA] mx-auto flex items-center justify-center text-[#1749C8]">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#172033] block">No Entity Selected</span>
                <p className="text-[11px] text-[#94A3B8] mt-1">
                  Click any Stack Frame, Heap Object, Class Blueprint, or Connector on the canvas to inspect its
                  verified runtime state and provenance.
                </p>
              </div>
            </div>
          )
        ) : (
          /* TAB 2: DEPENDENCY GRAPH */
          <div className="space-y-4 text-xs font-mono">
            {selectedNode ? (
              <>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-[#64748B] uppercase font-bold">
                      Filter Relationships
                    </label>
                    <Filter className="w-3 h-3 text-[#64748B]" />
                  </div>
                  <select
                    value={relFilter}
                    onChange={(e) => setRelFilter(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#FAFBFD] border border-[#DCE2EA] rounded text-xs text-[#172033] outline-hidden"
                  >
                    <option value="all">All Relationships ({incomingEdges.length + outgoingEdges.length})</option>
                    <option value="reference">References ({incomingEdges.filter((e) => e.data?.type === 'reference').length + outgoingEdges.filter((e) => e.data?.type === 'reference').length})</option>
                    <option value="dependency">Dependencies ({incomingEdges.filter((e) => e.data?.type === 'dependency').length + outgoingEdges.filter((e) => e.data?.type === 'dependency').length})</option>
                    <option value="invocation">Invocations ({incomingEdges.filter((e) => e.data?.type === 'invocation').length + outgoingEdges.filter((e) => e.data?.type === 'invocation').length})</option>
                    <option value="inheritance">Inheritance ({incomingEdges.filter((e) => e.data?.type === 'inheritance').length + outgoingEdges.filter((e) => e.data?.type === 'inheritance').length})</option>
                  </select>
                </div>

                {/* Incoming Connections */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] uppercase font-bold">
                    <span>Incoming Dependencies ({filteredIncoming.length})</span>
                    <span className="text-[#1749C8]">Target</span>
                  </div>
                  {filteredIncoming.length > 0 ? (
                    <div className="space-y-1.5">
                      {filteredIncoming.map((edge) => {
                        const sourceNode = nodes.find((n) => n.id === edge.source);
                        return (
                          <button
                            key={edge.id}
                            type="button"
                            onClick={() => selectNode(edge.source)}
                            className="w-full p-2 bg-[#FAFBFD] hover:bg-white border border-[#DCE2EA] hover:border-[#1749C8] rounded text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#172033] group-hover:text-[#1749C8]">
                                {sourceNode?.data.name || edge.source}
                              </span>
                              <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#1749C8]" />
                            </div>
                            <div className="flex items-center space-x-1 text-[10px] text-[#64748B] mt-0.5">
                              <span className="capitalize">{edge.data?.type || 'link'}:</span>
                              <span className="text-[#1749C8]">{edge.data?.label || 'connects'}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-2 bg-[#FAFBFD] border border-[#F1F4F8] rounded text-[10px] text-[#94A3B8] italic">
                      No incoming dependencies matching filter
                    </div>
                  )}
                </div>

                {/* Outgoing Connections */}
                <div className="space-y-2 pt-2 border-t border-[#DCE2EA]">
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] uppercase font-bold">
                    <span>Outgoing Dependencies ({filteredOutgoing.length})</span>
                    <span className="text-[#1749C8]">Source</span>
                  </div>
                  {filteredOutgoing.length > 0 ? (
                    <div className="space-y-1.5">
                      {filteredOutgoing.map((edge) => {
                        const targetNode = nodes.find((n) => n.id === edge.target);
                        return (
                          <button
                            key={edge.id}
                            type="button"
                            onClick={() => selectNode(edge.target)}
                            className="w-full p-2 bg-[#FAFBFD] hover:bg-white border border-[#DCE2EA] hover:border-[#1749C8] rounded text-left transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#172033] group-hover:text-[#1749C8]">
                                {targetNode?.data.name || edge.target}
                              </span>
                              <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#1749C8]" />
                            </div>
                            <div className="flex items-center space-x-1 text-[10px] text-[#64748B] mt-0.5">
                              <span className="capitalize">{edge.data?.type || 'link'}:</span>
                              <span className="text-[#1749C8]">{edge.data?.label || 'points to'}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-2 bg-[#FAFBFD] border border-[#F1F4F8] rounded text-[10px] text-[#94A3B8] italic">
                      No outgoing dependencies matching filter
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6 text-center space-y-2 text-[#94A3B8]">
                <GitBranch className="w-6 h-6 mx-auto text-[#CBD5E1]" />
                <p className="text-[11px]">Select any entity on canvas to explore its dependency graph.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
