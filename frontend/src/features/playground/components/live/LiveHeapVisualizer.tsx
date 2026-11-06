import React from 'react';
import { Box, ArrowRight } from 'lucide-react';
import { HeapObjectSnapshot, ExecutionEvent } from '@/types/execution';

interface LiveHeapVisualizerProps {
  heapObjects: HeapObjectSnapshot[];
  currentEvent: ExecutionEvent | null;
  onSelectObject?: (objectId: string) => void;
  selectedObjectId?: string | null;
}

export const LiveHeapVisualizer: React.FC<LiveHeapVisualizerProps> = ({
  heapObjects,
  currentEvent,
  onSelectObject,
  selectedObjectId,
}) => {
  if (!heapObjects || heapObjects.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground font-mono space-y-2 border border-dashed border-border rounded-lg bg-white/50">
        <Box className="w-8 h-8 text-neutral-300 mx-auto" />
        <div className="text-xs font-semibold text-foreground">JVM Eden Heap is Empty</div>
        <p className="text-[11px] text-muted-foreground max-w-xs">
          No dynamic objects have been allocated yet. Advance execution to a statement containing the <code className="text-blue-600 font-bold">new</code> operator.
        </p>
      </div>
    );
  }

  const mutatedAddress = currentEvent?.mutatedField?.objectAddress;
  const mutatedFieldName = currentEvent?.mutatedField?.fieldName;
  const isAllocationStep = currentEvent?.type === 'OBJECT_ALLOCATED';
  const newlyAllocatedId = currentEvent?.allocatedObjectId;

  return (
    <div className="h-full flex flex-col space-y-3 font-sans select-none overflow-y-auto pr-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
          <Box className="w-3.5 h-3.5 text-emerald-600" />
          <span>Active JVM Heap Instances</span>
          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full font-mono text-[10px]">
            {heapObjects.length}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Eden Space (@0x4000+)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {heapObjects.map((obj, idx) => {
          const isSelected = selectedObjectId === obj.id || selectedObjectId === obj.address;
          const isNewlyAllocated = isAllocationStep && (obj.id === newlyAllocatedId || obj.address === newlyAllocatedId);
          const hasMutatedField = mutatedAddress === obj.id || mutatedAddress === obj.address;

          return (
            <div
              key={obj.id || obj.address || idx}
              onClick={() => onSelectObject?.(obj.id || obj.address)}
              className={`p-3 bg-white rounded-lg border transition-all cursor-pointer relative shadow-2xs ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                  : hasMutatedField
                  ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/10'
                  : isNewlyAllocated
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/10'
                  : 'border-border hover:border-neutral-400'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2 font-mono">
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                    isNewlyAllocated ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      {obj.className}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {obj.address || `@0x${(0x4000 + idx * 0x20).toString(16).toUpperCase()}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {isNewlyAllocated && (
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                      Just Allocated
                    </span>
                  )}
                  {hasMutatedField && (
                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      Mutated
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-neutral-100 text-neutral-600 border border-border">
                    Active
                  </span>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-1.5 font-mono text-xs">
                {obj.fields && obj.fields.length > 0 ? (
                  obj.fields.map((f) => {
                    const isThisFieldMutated = hasMutatedField && f.name === mutatedFieldName;
                    return (
                      <div
                        key={f.name}
                        className={`p-1.5 rounded flex items-center justify-between text-[11px] transition-all ${
                          isThisFieldMutated
                            ? 'bg-amber-100/70 border border-amber-300 shadow-2xs font-bold'
                            : 'hover:bg-neutral-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span className="text-muted-foreground font-normal">{f.name}:</span>
                          <span className="text-[10px] text-neutral-400 font-sans">({f.type})</span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {isThisFieldMutated && f.previousValue !== undefined && (
                            <span className="text-neutral-400 line-through text-[10px]">
                              {JSON.stringify(f.previousValue)}
                            </span>
                          )}
                          {isThisFieldMutated && <ArrowRight className="w-2.5 h-2.5 text-amber-600" />}
                          <span
                            className={`font-semibold ${
                              isThisFieldMutated
                                ? 'text-amber-900'
                                : f.isReference
                                ? 'text-blue-700 underline cursor-pointer'
                                : 'text-foreground'
                            }`}
                          >
                            {f.value === null ? 'null' : JSON.stringify(f.value)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[10.5px] text-muted-foreground italic py-1">
                    No instance fields declared
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
