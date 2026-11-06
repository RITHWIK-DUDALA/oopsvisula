import React from 'react';
import { Layers, CornerDownRight } from 'lucide-react';
import { StackFrameSnapshot, ExecutionEvent } from '@/types/execution';

interface LiveVariablesVisualizerProps {
  topFrame: StackFrameSnapshot | null;
  currentEvent: ExecutionEvent | null;
  onSelectVariable?: (varName: string) => void;
  onSelectObject?: (objectId: string) => void;
}

export const LiveVariablesVisualizer: React.FC<LiveVariablesVisualizerProps> = ({
  topFrame,
  currentEvent,
  onSelectVariable,
  onSelectObject,
}) => {
  if (!topFrame || !topFrame.localVariables || topFrame.localVariables.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground font-mono space-y-2 border border-dashed border-border rounded-lg bg-white/50">
        <Layers className="w-7 h-7 text-neutral-300 mx-auto" />
        <div className="text-xs font-semibold text-foreground">No Local Variables in Current Scope</div>
        <p className="text-[11px] text-muted-foreground max-w-xs">
          The current activation frame ({topFrame?.methodName || 'entry'}) has not initialized local variables or arguments yet.
        </p>
      </div>
    );
  }

  const isVarDeclaration = currentEvent?.description?.toLowerCase().includes('declare') || currentEvent?.description?.toLowerCase().includes('initializ');

  return (
    <div className="h-full flex flex-col space-y-3 font-sans select-none overflow-y-auto pr-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Local Scope Variables</span>
          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full font-mono text-[10px]">
            {topFrame.localVariables.length}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Frame: {topFrame.className}.{topFrame.methodName}()
        </span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {topFrame.localVariables.map((v, idx) => {
          const isNewlyDeclared = isVarDeclaration && idx === topFrame.localVariables.length - 1;

          return (
            <div
              key={v.name}
              onClick={() => onSelectVariable?.(v.name)}
              className={`p-2.5 rounded-lg border bg-white flex items-center justify-between shadow-2xs transition-all cursor-pointer ${
                isNewlyDeclared
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10'
                  : 'border-border hover:border-neutral-400'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground text-xs">{v.name}</span>
                  <span className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.2 rounded border border-border">
                    {v.type}
                  </span>
                  {v.isReference && (
                    <span className="text-[9.5px] px-1 bg-purple-50 text-purple-700 border border-purple-200 rounded font-sans">
                      reference
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-muted-foreground font-sans">
                  Storage: Call Stack Frame ({topFrame.methodName})
                </div>
              </div>

              <div className="flex items-center space-x-2 text-right">
                {v.isReference && v.targetAddress ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectObject?.(v.targetAddress!);
                    }}
                    className="flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                    title={`Click to inspect heap object ${v.targetAddress}`}
                  >
                    <span>{v.targetAddress}</span>
                    <CornerDownRight className="w-3 h-3 text-blue-600" />
                  </button>
                ) : (
                  <span className="font-bold text-foreground bg-neutral-50 px-2 py-0.5 rounded border border-border">
                    {v.value === null ? 'null' : JSON.stringify(v.value)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
