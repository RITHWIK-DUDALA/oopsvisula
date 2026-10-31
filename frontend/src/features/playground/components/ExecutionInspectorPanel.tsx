import React, { useState } from 'react';
import {
  Activity,
  Terminal,
  Sliders,
  Copy,
  Check,
  Trash2,
  ChevronRight,
  ChevronDown,
  Info,
  Box,
  Layers,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

export const ExecutionInspectorPanel: React.FC = () => {
  const {
    currentTrace,
    currentStepIndex,
    getCurrentEvent,
    getStdoutHistory,
    selectedObjectId,
    selectedVariableName,
    goToStep,
    setSelectedObjectId,
    setSelectedVariableName,
  } = useSimulationStore();

  const [activeTab, setActiveTab] = useState<'inspector' | 'console' | 'events'>('inspector');
  const [copiedConsole, setCopiedConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  // Section collapse state
  const [openSections, setOpenSections] = useState({
    currentEvent: true,
    activeScope: true,
    selectedItem: true,
    metadata: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const event = getCurrentEvent();
  const stdout = consoleOutput !== null ? consoleOutput : getStdoutHistory();

  // Find selected variable snapshot if any
  const selectedVariable = event?.stackFrames
    .flatMap((f) => f.localVariables)
    .find((v) => v.name === selectedVariableName);

  // Find selected object snapshot if any
  const selectedObject = event?.heapObjects.find(
    (obj) => obj.address === selectedObjectId
  );

  const handleCopyConsole = () => {
    navigator.clipboard.writeText(stdout);
    setCopiedConsole(true);
    setTimeout(() => setCopiedConsole(false), 1500);
  };

  const handleClearConsole = () => {
    setConsoleOutput('');
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#E8E8E8] select-none overflow-hidden">
      {/* Header Tabs per Section 10 */}
      <div className="h-10 px-4 border-b border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'inspector'
                ? 'bg-[#EEEEEE] text-[#171717] font-bold'
                : 'text-[#777777] hover:text-[#171717] hover:bg-[#F5F5F5]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Inspector</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'console'
                ? 'bg-[#EEEEEE] text-[#171717] font-bold'
                : 'text-[#777777] hover:text-[#171717] hover:bg-[#F5F5F5]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Console</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'events'
                ? 'bg-[#EEEEEE] text-[#171717] font-bold'
                : 'text-[#777777] hover:text-[#171717] hover:bg-[#F5F5F5]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Events</span>
          </button>
        </div>

        {activeTab === 'console' && (
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleCopyConsole}
              title="Copy Console Output"
              className="p-1 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
            >
              {copiedConsole ? (
                <Check className="w-3.5 h-3.5 text-[#287A4B] stroke-[2]" />
              ) : (
                <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
              )}
            </button>
            <button
              type="button"
              onClick={handleClearConsole}
              title="Clear Console Output"
              className="p-1 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'inspector' && (
          <div className="space-y-4">
            {/* Section 1: Current Event */}
            <div className="border border-[#E8E8E8] rounded-md overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleSection('currentEvent')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAFAFA] text-xs font-mono font-bold text-[#171717] border-b border-[#E8E8E8]"
              >
                <span className="flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Current Event</span>
                </span>
                {openSections.currentEvent ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#777777]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
                )}
              </button>

              {openSections.currentEvent && event && (
                <div className="p-3 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded bg-[#171717] text-white font-bold text-[10px]">
                      {event.type}
                    </span>
                    <span className="text-[#777777] text-[11px]">
                      Line {event.line} • {event.methodName}()
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666] leading-relaxed pt-1">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            {/* Section 2: Active Scope Variables Table */}
            <div className="border border-[#E8E8E8] rounded-md overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleSection('activeScope')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAFAFA] text-xs font-mono font-bold text-[#171717] border-b border-[#E8E8E8]"
              >
                <span className="flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Active Scope</span>
                </span>
                {openSections.activeScope ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#777777]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
                )}
              </button>

              {openSections.activeScope && event && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono border-collapse">
                    <thead className="bg-[#FAFAFA] border-b border-[#E8E8E8] text-[#999999] text-[10px] uppercase">
                      <tr>
                        <th className="py-1.5 px-3 text-left">Variable</th>
                        <th className="py-1.5 px-3 text-left">Type</th>
                        <th className="py-1.5 px-3 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8E8]">
                      {event.stackFrames.flatMap((f) => f.localVariables).length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-3 px-3 text-center text-[#999999] italic">
                            No local variables in current frame
                          </td>
                        </tr>
                      ) : (
                        event.stackFrames.flatMap((f) =>
                          f.localVariables.map((v) => {
                            const isSelected = selectedVariableName === v.name;
                            return (
                              <tr
                                key={`${f.frameId}-${v.name}`}
                                onClick={() => {
                                  setSelectedVariableName(isSelected ? null : v.name);
                                  if (v.isReference && v.targetAddress) {
                                    setSelectedObjectId(v.targetAddress);
                                  }
                                }}
                                className={`cursor-pointer transition-colors ${
                                  isSelected ? 'bg-[#EEEEEE] font-semibold' : 'hover:bg-[#FAFAFA]'
                                }`}
                              >
                                <td className="py-2 px-3 text-[#171717] font-medium">{v.name}</td>
                                <td className="py-2 px-3 text-[#777777]">{v.type}</td>
                                <td className="py-2 px-3 text-[#171717]">
                                  {v.isReference ? (
                                    <span className="bg-[#FAFAFA] px-1.5 py-0.5 rounded border border-[#E8E8E8] text-[10px] font-semibold">
                                      {String(v.value)}
                                    </span>
                                  ) : (
                                    <span>{String(v.value)}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Section 3: Selected Variable / Object Inspector */}
            <div className="border border-[#E8E8E8] rounded-md overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleSection('selectedItem')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAFAFA] text-xs font-mono font-bold text-[#171717] border-b border-[#E8E8E8]"
              >
                <span className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Item Inspector</span>
                </span>
                {openSections.selectedItem ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#777777]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
                )}
              </button>

              {openSections.selectedItem && (
                <div className="p-3 text-xs font-mono space-y-3">
                  {selectedObject ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#E8E8E8]">
                        <span className="font-bold text-[#171717]">{selectedObject.className}</span>
                        <span className="px-1.5 py-0.5 bg-[#171717] text-white rounded text-[10px]">
                          {selectedObject.address}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase text-[#999999] block font-semibold">
                          Fields:
                        </span>
                        {selectedObject.fields.map((f) => (
                          <div key={f.name} className="flex justify-between py-0.5 text-[11px]">
                            <span className="text-[#777777]">{f.name} ({f.type})</span>
                            <span className="font-bold text-[#171717]">{String(f.value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : selectedVariable ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#E8E8E8]">
                        <span className="font-bold text-[#171717]">{selectedVariable.name}</span>
                        <span className="text-[10px] text-[#777777]">{selectedVariable.type}</span>
                      </div>
                      <div className="text-[11px] text-[#666666]">
                        Current Value: <span className="font-bold text-[#171717]">{String(selectedVariable.value)}</span>
                      </div>
                      {selectedVariable.targetAddress && (
                        <div className="text-[11px] text-[#666666]">
                          Points to: <span className="font-mono text-[#171717] bg-[#EEEEEE] px-1 rounded">{selectedVariable.targetAddress}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-[11px] text-[#999999] italic">
                      Click a stack variable or heap object to inspect detailed state.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 4: Execution Metadata */}
            <div className="border border-[#E8E8E8] rounded-md overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleSection('metadata')}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAFAFA] text-xs font-mono font-bold text-[#171717] border-b border-[#E8E8E8]"
              >
                <span className="flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Execution Metadata</span>
                </span>
                {openSections.metadata ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#777777]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
                )}
              </button>

              {openSections.metadata && (
                <div className="p-3 text-[11px] font-mono space-y-1.5 text-[#666666]">
                  <div className="flex justify-between">
                    <span>Target Engine:</span>
                    <span className="font-semibold text-[#171717]">Java 21 LTS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deterministic State:</span>
                    <span className="font-semibold text-[#287A4B]">Valid (Trace verified)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Execution Duration:</span>
                    <span className="font-semibold text-[#171717]">{currentTrace.durationMs}ms</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Console */}
        {activeTab === 'console' && (
          <div className="h-full flex flex-col space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-[#999999] text-[11px]">
              <span>stdout (JDI execution stream)</span>
              <span>UTF-8</span>
            </div>
            <pre className="flex-1 p-3 bg-[#171717] text-[#FAFAFA] rounded-md overflow-auto leading-relaxed text-[11px]">
              {stdout
                ? stdout
                : '// No console output emitted yet\n// System.out / System.err statements will stream here.'}
            </pre>
          </div>
        )}

        {/* Tab 3: Events Timeline List */}
        {activeTab === 'events' && (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[11px] text-[#999999] uppercase tracking-wider mb-2 font-semibold">
              Chronological Execution Sequence
            </div>
            <div className="space-y-1.5">
              {currentTrace.events.map((ev, index) => {
                const isActive = index === currentStepIndex;
                const isPast = index < currentStepIndex;

                return (
                  <button
                    key={ev.step}
                    type="button"
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-2.5 rounded-md border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#171717] text-white font-semibold border-[#171717] shadow-xs'
                        : isPast
                        ? 'bg-[#FAFAFA] text-[#171717] border-[#E8E8E8] hover:border-[#171717]/60'
                        : 'bg-white text-[#999999] border-[#E8E8E8] hover:text-[#171717]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#EEEEEE] text-[#171717]'
                        }`}
                      >
                        #{ev.step}
                      </span>
                      <span className="truncate">{ev.type}</span>
                    </div>
                    <span className="text-[10px] opacity-80 shrink-0">
                      Line {ev.line}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

