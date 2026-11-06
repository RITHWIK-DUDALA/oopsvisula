import React from 'react';
import { Box, Layers, Link as LinkIcon } from 'lucide-react';
import { ReferencePointer, HeapObjectSnapshot, StackFrameSnapshot } from '@/types/execution';

interface LiveReferenceGraphProps {
  references: ReferencePointer[];
  heapObjects: HeapObjectSnapshot[];
  topFrame: StackFrameSnapshot | null;
  onSelectObject?: (objectId: string) => void;
}

export const LiveReferenceGraph: React.FC<LiveReferenceGraphProps> = ({
  references,
  heapObjects,
  topFrame,
  onSelectObject,
}) => {
  if (!references || references.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground font-mono space-y-2 border border-dashed border-border rounded-lg bg-white/50">
        <LinkIcon className="w-8 h-8 text-neutral-300 mx-auto" />
        <div className="text-xs font-semibold text-foreground">No Active Object References</div>
        <p className="text-[11px] text-muted-foreground max-w-xs">
          Variables in the active method currently hold primitive values or are uninitialized. Once a reference type is assigned, its pointer to the JVM heap will be mapped here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 font-sans select-none overflow-y-auto pr-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
          <LinkIcon className="w-3.5 h-3.5 text-indigo-600" />
          <span>Active Reference Connections</span>
          <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded-full font-mono text-[10px]">
            {references.length}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Stack Pointers & Heap Aliasing
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {references.map((ref, idx) => {
          const targetObj = heapObjects.find(
            (o) => o.id === ref.targetAddress || o.address === ref.targetAddress
          );

          return (
            <div
              key={idx}
              className="p-3 bg-white rounded-lg border border-border hover:border-indigo-400 transition-all shadow-2xs flex items-center justify-between"
            >
              {/* Source (Stack or Heap) */}
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-neutral-100 rounded border border-border text-neutral-600">
                  {ref.sourceType === 'stack' ? (
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Box className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">
                    {ref.sourceType === 'stack' ? `Stack (${topFrame?.methodName || 'main'})` : 'Heap Object'}
                  </span>
                  <span className="font-bold text-foreground text-xs">
                    {ref.sourceType === 'stack' ? ref.sourceVarName : `${ref.sourceHeapAddress}.${ref.sourceFieldName}`}
                  </span>
                </div>
              </div>

              {/* Reference Connector Arrow */}
              <div className="flex items-center space-x-1 px-3 text-indigo-600">
                <span className="text-[10px] text-indigo-500 font-semibold hidden sm:inline">references</span>
                <span className="font-bold">{'──►'}</span>
              </div>

              {/* Target Heap Object */}
              <button
                onClick={() => onSelectObject?.(ref.targetAddress)}
                className="flex items-center space-x-2 p-1.5 px-2.5 rounded bg-indigo-50/70 border border-indigo-200 hover:bg-indigo-100 text-left transition-colors cursor-pointer group"
                title="Click to view target object"
              >
                <div className="w-5 h-5 rounded bg-white border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
                  #
                </div>
                <div>
                  <span className="font-bold text-indigo-950 text-xs block group-hover:underline">
                    {targetObj ? targetObj.className : ref.targetAddress}
                  </span>
                  <span className="text-[9.5px] text-indigo-700 font-mono">
                    {ref.targetAddress}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
