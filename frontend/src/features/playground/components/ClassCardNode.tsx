import React, { useState, useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Box, 
  Layers, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink
} from 'lucide-react';
import { SemanticEntity } from '@/core/engine/semanticModel';
import { Interactive3DCard } from '@/components/shared/Interactive3DCard';

export interface ClassNodeData {
  entity: SemanticEntity;
  fields: SemanticEntity[];
  constructors: SemanticEntity[];
  methods: SemanticEntity[];
  superclass?: string;
  interfaces?: string[];
  detectedConcepts: string[];
  isSelected: boolean;
  isDimmed?: boolean;
  isConceptHighlighted?: boolean;
  density?: 'compact' | 'comfortable';
  onSelectEntity: (id: string, file: string, line?: number) => void;
  onSelectConcept?: (conceptName: string, className: string) => void;
  onJumpToSource: (file: string, line: number) => void;
}

export const ClassCardNode: React.FC<any> = ({ data }) => {
  const { 
    entity, 
    fields = [], 
    constructors = [], 
    methods = [], 
    detectedConcepts = [], 
    isSelected, 
    isDimmed,
    isConceptHighlighted,
    density = 'compact',
    onSelectEntity, 
    onSelectConcept,
    onJumpToSource 
  } = (data || {}) as ClassNodeData;

  const isCompact = density === 'compact';
  // Progressive expansion states (fields & methods default open for small classes, compact for larger)
  const isSmallClass = fields.length + methods.length <= (isCompact ? 8 : 12);
  const [fieldsExpanded, setFieldsExpanded] = useState(isSmallClass);
  const [ctorsExpanded, setCtorsExpanded] = useState(false);
  const [methodsExpanded, setMethodsExpanded] = useState(isSmallClass);
  const [showAllFields, setShowAllFields] = useState(false);
  const [showAllMethods, setShowAllMethods] = useState(false);

  if (!entity) return null;

  const isInterface = entity.entityType === 'interface';
  const isAbstract = entity.entityType === 'abstract-class';
  const isRecord = entity.entityType === 'record';
  const isEnum = entity.entityType === 'enum';

  // Calculate dynamic card width based on content character lengths
  const calculatedWidth = useMemo(() => {
    let maxLen = entity.name.length;
    fields.forEach((f) => {
      const type = f.runtimeState?.declaredType || (f.metadata?.declaredType as string) || '';
      maxLen = Math.max(maxLen, f.name.length + type.length + 4);
    });
    methods.forEach((m) => {
      const sig = (m.metadata?.signature as string) || m.name;
      const ret = m.runtimeState?.declaredType || (m.metadata?.declaredType as string) || '';
      maxLen = Math.max(maxLen, sig.length + ret.length);
    });

    if (maxLen <= 18) return 'w-[220px]';
    if (maxLen <= 26) return 'w-[250px]';
    if (maxLen <= 34) return 'w-[280px]';
    return 'w-[310px]';
  }, [entity.name, fields, methods]);

  // Distinct visual identities per Java specification
  let borderStyle = 'border-blue-500/40 hover:border-blue-600 bg-white';
  let badgeStyle = 'bg-blue-50 text-blue-800 border-blue-200';
  let stereotype = '«class»';
  let headerIconColor = 'text-blue-600';

  if (isInterface) {
    borderStyle = 'border-teal-500/40 hover:border-teal-600 bg-white';
    badgeStyle = 'bg-teal-50 text-teal-800 border-teal-200';
    stereotype = '«interface»';
    headerIconColor = 'text-teal-600';
  } else if (isAbstract) {
    borderStyle = 'border-purple-500/40 hover:border-purple-600 bg-white';
    badgeStyle = 'bg-purple-50 text-purple-800 border-purple-200';
    stereotype = '«abstract»';
    headerIconColor = 'text-purple-600';
  } else if (isRecord) {
    borderStyle = 'border-cyan-500/40 hover:border-cyan-600 bg-white';
    badgeStyle = 'bg-cyan-50 text-cyan-800 border-cyan-200';
    stereotype = '«record»';
    headerIconColor = 'text-cyan-600';
  } else if (isEnum) {
    borderStyle = 'border-amber-500/40 hover:border-amber-600 bg-white';
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
    stereotype = '«enum»';
    headerIconColor = 'text-amber-600';
  }

  const getVisibilitySymbol = (visibility: string) => {
    switch (visibility) {
      case 'public': return '+';
      case 'private': return '-';
      case 'protected': return '#';
      default: return '~';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'text-emerald-600 font-bold';
      case 'private': return 'text-red-500 font-bold';
      case 'protected': return 'text-amber-600 font-bold';
      default: return 'text-neutral-500';
    }
  };

  // Limit members shown by default (5 max) to prevent gigantic vertical cards
  const displayedFields = showAllFields ? fields : fields.slice(0, 5);
  const remainingFields = fields.length - displayedFields.length;

  const displayedMethods = showAllMethods ? methods : methods.slice(0, 6);
  const remainingMethods = methods.length - displayedMethods.length;

  const getConceptBadgeStyle = (concept: string) => {
    const c = concept.toLowerCase();
    if (c.includes('encapsulation')) return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400';
    if (c.includes('inheritance')) return 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-400';
    if (c.includes('abstraction') || c.includes('contract')) return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 hover:border-purple-400';
    if (c.includes('polymorphism') || c.includes('overload') || c.includes('override')) return 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-400';
    if (c.includes('interface')) return 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-400';
    if (c.includes('composition')) return 'bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800';
    if (c.includes('aggregation')) return 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200';
    if (c.includes('association') || c.includes('reference')) return 'bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-400';
    if (c.includes('depend')) return 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:border-sky-400';
    if (c.includes('thread') || c.includes('sync')) return 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400';
    return 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-100';
  };

  return (
    <div 
      className={`${calculatedWidth} relative`}
    >
      {/* Bidirectional Connector Handles on all 4 Cardinal Directions */}
      {/* Top Handles */}
      <Handle type="target" position={Position.Top} id="top-target" className="!w-2 !h-2 !bg-neutral-400 !border-white z-20" />
      <Handle type="source" position={Position.Top} id="top-source" className="!w-2 !h-2 !bg-transparent !border-0 pointer-events-auto z-20" />
      <Handle type="target" position={Position.Top} id="top" className="!opacity-0 !w-1 !h-1 z-20" />

      {/* Bottom Handles */}
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="!w-2 !h-2 !bg-neutral-400 !border-white z-20" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="!w-2 !h-2 !bg-transparent !border-0 pointer-events-auto z-20" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!opacity-0 !w-1 !h-1 z-20" />

      {/* Left Handles */}
      <Handle type="target" position={Position.Left} id="left-target" className="!w-2 !h-2 !bg-neutral-400 !border-white z-20" />
      <Handle type="source" position={Position.Left} id="left-source" className="!w-2 !h-2 !bg-transparent !border-0 pointer-events-auto z-20" />
      <Handle type="target" position={Position.Left} id="left" className="!opacity-0 !w-1 !h-1 z-20" />

      {/* Right Handles */}
      <Handle type="source" position={Position.Right} id="right-source" className="!w-2 !h-2 !bg-neutral-400 !border-white z-20" />
      <Handle type="target" position={Position.Right} id="right-target" className="!w-2 !h-2 !bg-transparent !border-0 pointer-events-auto z-20" />
      <Handle type="source" position={Position.Right} id="right" className="!opacity-0 !w-1 !h-1 z-20" />

      <Interactive3DCard
        maxTilt={6}
        scale={1.018}
        glareSize={240}
        glareOpacity={0.25}
        onClick={() => onSelectEntity?.(entity.id, entity.sourceFile || 'Main.java', entity.sourceLine)}
        className={`w-full rounded-lg border shadow-xs transition-all select-none font-sans text-xs overflow-hidden ${borderStyle} ${
          isSelected ? 'ring-2 ring-blue-600 ring-offset-1 shadow-md' : ''
        } ${
          isConceptHighlighted ? 'ring-2 ring-amber-500 shadow-md scale-[1.02]' : ''
        } ${
          isDimmed ? 'opacity-35 grayscale-[50%]' : 'opacity-100'
        }`}
      >
        {/* Compact Card Header */}
      <div className="px-2.5 py-1.5 bg-neutral-50/80 border-b border-border/70 rounded-t-lg">
        <div className="flex items-center justify-between pb-0.5">
          <span className="text-[9px] font-mono text-muted-foreground tracking-wide font-medium">
            {stereotype}
          </span>
          <span className={`text-[8px] px-1 py-0.2 rounded border font-mono uppercase font-semibold ${badgeStyle}`}>
            {entity.visibility}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 min-w-0">
            {isInterface ? (
              <Layers className={`w-3.5 h-3.5 shrink-0 ${headerIconColor}`} />
            ) : (
              <Box className={`w-3.5 h-3.5 shrink-0 ${headerIconColor}`} />
            )}
            <h4 className="font-mono font-bold text-xs text-foreground truncate" title={entity.name}>
              {entity.name}
            </h4>
          </div>

          {entity.sourceLine && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJumpToSource?.(entity.sourceFile || 'Main.java', entity.sourceLine!);
              }}
              title="Jump to Class Declaration"
              className="p-0.5 rounded hover:bg-neutral-200/70 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* Fields Section (Only rendered if class declares fields) */}
      {fields.length > 0 && (
        <div className="border-b border-border/50">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setFieldsExpanded(!fieldsExpanded);
            }}
            className="px-2.5 py-0.5 bg-neutral-50/50 flex items-center justify-between cursor-pointer hover:bg-neutral-100/60 transition-colors"
          >
            <div className="flex items-center space-x-1 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
              {fieldsExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
              <span>Fields ({fields.length})</span>
            </div>
          </div>

          {fieldsExpanded && (
            <div className="px-2 py-1 space-y-0.5 font-mono text-[10px]">
              {displayedFields.map((f) => {
                const declaredType = f.runtimeState?.declaredType || (f.metadata?.declaredType as string) || 'Object';
                const isStatic = f.modifiers.includes('static');
                const isFinal = f.modifiers.includes('final');

                return (
                  <div
                    key={f.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (f.sourceLine) onJumpToSource?.(f.sourceFile || 'Main.java', f.sourceLine);
                    }}
                    className="flex items-center justify-between px-1 py-0.5 rounded hover:bg-neutral-100 cursor-pointer transition-colors group"
                    title={`${f.visibility} ${declaredType} ${f.name} (line ${f.sourceLine})`}
                  >
                    <div className="flex items-center space-x-1 truncate min-w-0">
                      <span className={getVisibilityColor(f.visibility)}>
                        {getVisibilitySymbol(f.visibility)}
                      </span>
                      <span className="truncate text-foreground font-medium">
                        {f.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 text-[9px] ml-1">
                      {isStatic && <span className="px-1 py-0.2 bg-neutral-100 text-neutral-600 rounded text-[7px] uppercase font-bold">st</span>}
                      {isFinal && <span className="px-1 py-0.2 bg-neutral-100 text-neutral-600 rounded text-[7px] uppercase font-bold">fn</span>}
                      <span className="text-blue-700 font-semibold truncate max-w-[85px]">{declaredType}</span>
                    </div>
                  </div>
                );
              })}

              {remainingFields > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllFields(true);
                  }}
                  className="w-full text-center text-[9px] text-blue-600 hover:underline pt-0.5"
                >
                  +{remainingFields} more fields...
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Constructors Section (Only rendered if constructors exist) */}
      {constructors.length > 0 && (
        <div className="border-b border-border/50">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setCtorsExpanded(!ctorsExpanded);
            }}
            className="px-2.5 py-0.5 bg-neutral-50/50 flex items-center justify-between cursor-pointer hover:bg-neutral-100/60 transition-colors"
          >
            <div className="flex items-center space-x-1 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
              {ctorsExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
              <span>Constructors ({constructors.length})</span>
            </div>
          </div>

          {ctorsExpanded && (
            <div className="px-2 py-1 space-y-0.5 font-mono text-[10px]">
              {constructors.map((c) => {
                const sig = (c.metadata?.signature as string) || `${entity.name}()`;
                return (
                  <div
                    key={c.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (c.sourceLine) onJumpToSource?.(c.sourceFile || 'Main.java', c.sourceLine);
                    }}
                    className="px-1 py-0.5 rounded hover:bg-neutral-100 cursor-pointer transition-colors truncate"
                    title={sig}
                  >
                    <span className={getVisibilityColor(c.visibility)}>
                      {getVisibilitySymbol(c.visibility)}
                    </span>
                    <span className="ml-1 text-foreground truncate">{sig}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Methods Section (Only rendered if methods exist) */}
      {methods.length > 0 && (
        <div>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setMethodsExpanded(!methodsExpanded);
            }}
            className="px-2.5 py-0.5 bg-neutral-50/50 flex items-center justify-between cursor-pointer hover:bg-neutral-100/60 transition-colors"
          >
            <div className="flex items-center space-x-1 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
              {methodsExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
              <span>Methods ({methods.length})</span>
            </div>
          </div>

          {methodsExpanded && (
            <div className="px-2 py-1 space-y-0.5 font-mono text-[10px]">
              {displayedMethods.map((m) => {
                const returnType = m.runtimeState?.declaredType || (m.metadata?.declaredType as string) || (m.metadata?.returnType as string) || 'void';
                const sig = (m.metadata?.signature as string) || `${m.name}()`;
                const isStatic = m.modifiers.includes('static');
                const isAbstractMethod = m.modifiers.includes('abstract');

                return (
                  <div
                    key={m.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (m.sourceLine) onJumpToSource?.(m.sourceFile || 'Main.java', m.sourceLine);
                    }}
                    className="flex items-center justify-between px-1 py-0.5 rounded hover:bg-neutral-100 cursor-pointer transition-colors group"
                    title={`Click to jump to line ${m.sourceLine}`}
                  >
                    <div className="flex items-center space-x-1 truncate min-w-0">
                      <span className={getVisibilityColor(m.visibility)}>
                        {getVisibilitySymbol(m.visibility)}
                      </span>
                      <span className="truncate text-foreground font-medium">
                        {sig}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 text-[9px] ml-1">
                      {isStatic && <span className="px-1 py-0.2 bg-neutral-100 text-neutral-600 rounded text-[7px] uppercase font-bold">st</span>}
                      {isAbstractMethod && <span className="px-1 py-0.2 bg-purple-100 text-purple-700 rounded text-[7px] uppercase font-bold">abs</span>}
                      <span className="text-purple-700 font-semibold truncate max-w-[85px]">{returnType}</span>
                    </div>
                  </div>
                );
              })}

              {remainingMethods > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllMethods(true);
                  }}
                  className="w-full text-center text-[9px] text-purple-600 hover:underline pt-0.5"
                >
                  +{remainingMethods} more methods...
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Detected OOP Concepts Chips (Interactive Footer per Part 9) */}
      {detectedConcepts.length > 0 && (
        <div className="px-2 py-1 border-t border-border/60 bg-neutral-50/50 flex flex-wrap gap-1 rounded-b-lg">
          {detectedConcepts.map((concept) => (
            <button
              key={concept}
              onClick={(e) => {
                e.stopPropagation();
                onSelectConcept?.(concept, entity.name);
              }}
              title={`Click to inspect ground evidence for ${concept}`}
              className={`px-1.5 py-0.2 rounded text-[8px] font-sans font-semibold border shadow-2xs transition-all cursor-pointer ${getConceptBadgeStyle(concept)}`}
            >
              {concept}
            </button>
          ))}
        </div>
      )}
      </Interactive3DCard>
    </div>
  );
};
