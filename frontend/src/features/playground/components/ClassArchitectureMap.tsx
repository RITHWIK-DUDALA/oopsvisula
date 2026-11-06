import React, { useMemo, useState, useEffect, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  BackgroundVariant, 
  Node, 
  Edge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSemanticModel } from '@/core/engine/useSemanticModel';
import { SemanticEntity } from '@/core/engine/semanticModel';
import { ClassCardNode } from './ClassCardNode';
import { ArchitectureEdge } from './ArchitectureEdge';
import { 
  Filter, 
  Search,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Map as MapIcon,
  SlidersHorizontal,
  Info,
  Download,
  Layers,
  Sparkles
} from 'lucide-react';

interface ClassArchitectureMapProps {
  onSelectEntity?: (id: string, file: string, line?: number) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

const nodeTypes = {
  classCard: ClassCardNode,
};

const edgeTypes = {
  architectureEdge: ArchitectureEdge,
};

type GroupingPerspective = 'architecture' | 'package' | 'inheritance' | 'interface' | 'dependencies';

// Internal Canvas Component to utilize useReactFlow hook controls
const ArchitectureCanvasInner: React.FC<ClassArchitectureMapProps> = ({ 
  onSelectEntity, 
  onJumpToSource 
}) => {
  const { fitView, zoomIn, zoomOut, zoomTo } = useReactFlow();

  const { 
    activeEntitySelection, 
    setActiveEntitySelection,
    activeConceptFilter,
    setActiveConceptFilter
  } = useSimulationStore();

  const { 
    classes, 
    interfaces, 
    records, 
    enums, 
    relationships, 
    getChildren, 
    getEntity,
    conceptReport
  } = useSemanticModel();

  const [filterType, setFilterType] = useState<'all' | 'class' | 'interface' | 'abstract' | 'record' | 'enum'>('all');
  const [groupingPerspective, setGroupingPerspective] = useState<GroupingPerspective>('architecture');
  const [searchQuery, setSearchQuery] = useState('');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');
  const [showMinimap, setShowMinimap] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Collect all user-defined types
  const allClasses = useMemo(() => {
    return [...classes, ...interfaces, ...records, ...enums];
  }, [classes, interfaces, records, enums]);

  // Set default minimap visibility: show only if more than 3 classes
  useEffect(() => {
    setShowMinimap(allClasses.length > 3);
  }, [allClasses.length]);

  // Filtered classes based on user toolbar selection
  const filteredClasses = useMemo(() => {
    return allClasses.filter((c) => {
      if (filterType === 'class' && c.entityType !== 'class') return false;
      if (filterType === 'interface' && c.entityType !== 'interface') return false;
      if (filterType === 'abstract' && c.entityType !== 'abstract-class') return false;
      if (filterType === 'record' && c.entityType !== 'record') return false;
      if (filterType === 'enum' && c.entityType !== 'enum') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.qualifiedName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allClasses, filterType, searchQuery]);

  // Estimate Node Dimensions (Dynamic Content-Aware Sizing)
  const getNodeDimensions = (cls: SemanticEntity, children: SemanticEntity[]) => {
    const fields = children.filter((m) => m.entityType === 'field');
    const ctors = children.filter((m) => m.entityType === 'constructor');
    const methods = children.filter((m) => m.entityType === 'method');

    let maxLen = cls.name.length;
    fields.forEach((f) => {
      const type = f.runtimeState?.declaredType || (f.metadata?.declaredType as string) || '';
      maxLen = Math.max(maxLen, f.name.length + type.length + 4);
    });
    methods.forEach((m) => {
      const sig = (m.metadata?.signature as string) || m.name;
      const ret = m.runtimeState?.declaredType || (m.metadata?.declaredType as string) || '';
      maxLen = Math.max(maxLen, sig.length + ret.length);
    });

    // Dynamic width (220px to 310px)
    const width = maxLen <= 18 ? 220 : maxLen <= 26 ? 250 : maxLen <= 34 ? 280 : 310;

    // Compact dynamic height calculation (Relationship badges removed from card body)
    let height = 48; // Compact header & title

    if (fields.length > 0) {
      const visibleFields = Math.min(fields.length, 5);
      height += 16 + visibleFields * 18 + (fields.length > 5 ? 14 : 0);
    }
    if (ctors.length > 0) {
      height += 16 + Math.min(ctors.length, 2) * 18;
    }
    if (methods.length > 0) {
      const visibleMethods = Math.min(methods.length, 6);
      height += 16 + visibleMethods * 18 + (methods.length > 6 ? 14 : 0);
    }
    height += 16; // Bottom padding

    return { width, height };
  };

  // Compute Adaptive Graph Layout (Topological DAG & Perspective Grouping)
  const { nodes: initialNodes, positions } = useMemo(() => {
    if (filteredClasses.length === 0) {
      return { nodes: [] as Node[], positions: new Map<string, { x: number; y: number }>() };
    }

    const nodeDimsMap = new Map<string, { width: number; height: number }>();
    const nodeChildrenMap = new Map<string, SemanticEntity[]>();

    filteredClasses.forEach((cls) => {
      const children = getChildren(cls.id);
      nodeChildrenMap.set(cls.id, children);
      nodeDimsMap.set(cls.id, getNodeDimensions(cls, children));
    });

    // Structural in/out-degree tracking
    const inDegree = new Map<string, number>(); // extended or implemented by others
    const outDegree = new Map<string, number>(); // extends or implements another class

    filteredClasses.forEach((c) => {
      inDegree.set(c.id, 0);
      outDegree.set(c.id, 0);
    });

    relationships.forEach((r) => {
      if (r.kind === 'extends' || r.kind === 'implements') {
        if (inDegree.has(r.targetId) && outDegree.has(r.sourceId)) {
          inDegree.set(r.targetId, (inDegree.get(r.targetId) || 0) + 1);
          outDegree.set(r.sourceId, (outDegree.get(r.sourceId) || 0) + 1);
        }
      }
    });

    const horizontalGap = density === 'compact' ? 36 : 56;
    const verticalGap = density === 'compact' ? 52 : 72;
    const positionsMap = new Map<string, { x: number; y: number }>();
    const canvasCenterX = 450;

    // Layout based on selected grouping perspective
    if (groupingPerspective === 'package') {
      // Group classes strictly by Java package
      const packageGroups = new Map<string, SemanticEntity[]>();
      filteredClasses.forEach((c) => {
        const pkg = c.metadata?.package || (c.qualifiedName.includes('.') ? c.qualifiedName.slice(0, c.qualifiedName.lastIndexOf('.')) : 'default');
        if (!packageGroups.has(pkg)) packageGroups.set(pkg, []);
        packageGroups.get(pkg)!.push(c);
      });

      let currentX = 60;
      packageGroups.forEach((pkgClasses) => {
        let currentY = 50;
        const maxColWidth = Math.max(...pkgClasses.map((c) => nodeDimsMap.get(c.id)!.width), 220);

        pkgClasses.forEach((c) => {
          const dims = nodeDimsMap.get(c.id)!;
          positionsMap.set(c.id, {
            x: Math.round(currentX + (maxColWidth - dims.width) / 2),
            y: Math.round(currentY),
          });
          currentY += dims.height + verticalGap;
        });

        currentX += maxColWidth + horizontalGap * 1.5;
      });
    } else {
      // Topological level assignment
      const levelMap = new Map<string, number>();

      filteredClasses.forEach((c) => {
        const isRoot = (inDegree.get(c.id) || 0) > 0 && (outDegree.get(c.id) || 0) === 0;
        const isSubclass = (outDegree.get(c.id) || 0) > 0;
        const isServiceOrMain = c.name === 'Main' || c.name.endsWith('Service') || c.name.endsWith('App');

        if (groupingPerspective === 'inheritance') {
          // Inheritance view: Base classes on top, subclasses below
          if (c.entityType === 'interface' || isRoot) {
            levelMap.set(c.id, 0);
          } else if (isSubclass) {
            levelMap.set(c.id, 1);
          } else {
            levelMap.set(c.id, 2);
          }
        } else if (groupingPerspective === 'interface') {
          // Interface view: Interfaces on top, implementers below
          if (c.entityType === 'interface') {
            levelMap.set(c.id, 0);
          } else if (relationships.some((r) => r.kind === 'implements' && r.sourceId === c.id)) {
            levelMap.set(c.id, 1);
          } else {
            levelMap.set(c.id, 2);
          }
        } else if (groupingPerspective === 'dependencies') {
          // Dependency view: Orchestrator on top/left, dependencies below
          if (isServiceOrMain) {
            levelMap.set(c.id, 0);
          } else if (relationships.some((r) => (r.kind === 'composes' || r.kind === 'associates') && r.targetId === c.id)) {
            levelMap.set(c.id, 2);
          } else {
            levelMap.set(c.id, 1);
          }
        } else {
          // Default Complete Architecture DAG
          if (c.entityType === 'interface' || isRoot) {
            levelMap.set(c.id, 0);
          } else if (isSubclass) {
            levelMap.set(c.id, 1);
          } else if (isServiceOrMain) {
            levelMap.set(c.id, 2);
          } else {
            levelMap.set(c.id, filteredClasses.length <= 3 ? 0 : 1);
          }
        }
      });

      // Group nodes by level
      const levels: Record<number, SemanticEntity[]> = {};
      filteredClasses.forEach((c) => {
        const lvl = levelMap.get(c.id) ?? 0;
        if (!levels[lvl]) levels[lvl] = [];
        levels[lvl].push(c);
      });

      const sortedLevelKeys = Object.keys(levels).map(Number).sort((a, b) => a - b);
      let currentY = 50;

      sortedLevelKeys.forEach((lvl) => {
        const groupNodes = levels[lvl];
        const dimsList = groupNodes.map((n) => nodeDimsMap.get(n.id)!);

        const layerTotalWidth = dimsList.reduce((acc, d) => acc + d.width, 0) + (groupNodes.length - 1) * horizontalGap;
        let startX = canvasCenterX - layerTotalWidth / 2;

        const maxLayerHeight = Math.max(...dimsList.map((d) => d.height), 100);

        groupNodes.forEach((node, idx) => {
          const dims = dimsList[idx];
          positionsMap.set(node.id, {
            x: Math.round(startX),
            y: Math.round(currentY),
          });
          startX += dims.width + horizontalGap;
        });

        currentY += maxLayerHeight + verticalGap;
      });
    }

    // Construct React Flow Node definitions
    const flowNodes: Node[] = filteredClasses.map((cls) => {
      const members: SemanticEntity[] = nodeChildrenMap.get(cls.id) || [];
      const fields: SemanticEntity[] = members.filter((m: SemanticEntity) => m.entityType === 'field');
      const ctors: SemanticEntity[] = members.filter((m: SemanticEntity) => m.entityType === 'constructor');
      const methods: SemanticEntity[] = members.filter((m: SemanticEntity) => m.entityType === 'method');
      const superclass = cls.metadata?.superclass as string | undefined;
      const classInterfaces = (cls.metadata?.interfaces as string[]) || [];

      // Dynamically extract detected OOP concepts from evidence engine (Part 3 & 9)
      const classConcepts = conceptReport.getConceptsForEntity(cls.id);
      const concepts = Array.from(
        new Set(
          classConcepts.map((c) => {
            if (c.conceptType.includes('encapsulation')) return 'Encapsulation';
            if (c.conceptType.includes('inheritance')) return 'Inheritance';
            if (c.conceptType.includes('abstract') || c.conceptType.includes('interface')) return 'Abstraction';
            if (c.conceptType.includes('overload') || c.conceptType.includes('override') || c.conceptType.includes('polymorphism')) return 'Polymorphism';
            if (c.conceptType.includes('composition')) return 'Composition';
            if (c.conceptType.includes('aggregation')) return 'Aggregation';
            if (c.conceptType.includes('association')) return 'Association';
            if (c.conceptType.includes('depend')) return 'Dependency';
            return c.name.split(':')[0].trim();
          })
        )
      );

      // Evaluate active concept filter highlighting (Part 11)
      const participatesInConcept = activeConceptFilter
        ? conceptReport.concepts.some(
            (c) =>
              (c.conceptType.toLowerCase().includes(activeConceptFilter.toLowerCase()) ||
                c.name.toLowerCase().includes(activeConceptFilter.toLowerCase())) &&
              (c.primaryClassId === cls.id || c.involvedMembers.some((m) => m.entityId === cls.id))
          )
        : false;

      const isDimmed = activeConceptFilter ? !participatesInConcept : false;
      const isConceptHighlighted = activeConceptFilter ? participatesInConcept : false;

      const pos = positionsMap.get(cls.id) || { x: 50, y: 50 };

      return {
        id: cls.id,
        type: 'classCard',
        position: pos,
        data: {
          entity: cls,
          fields,
          constructors: ctors,
          methods,
          superclass,
          interfaces: classInterfaces,
          detectedConcepts: concepts,
          isSelected: activeEntitySelection?.id === cls.id,
          isDimmed,
          isConceptHighlighted,
          density,
          onSelectEntity,
          onSelectConcept: (conceptName: string, className: string) => {
            const cLower = conceptName.toLowerCase();
            const matched =
              conceptReport.concepts.find(
                (c) =>
                  c.primaryClassName === className &&
                  (c.name.toLowerCase().includes(cLower) || c.conceptType.toLowerCase().includes(cLower))
              ) ||
              conceptReport.concepts.find(
                (c) => c.name.toLowerCase().includes(cLower) || c.conceptType.toLowerCase().includes(cLower)
              );
            if (matched) {
              setActiveEntitySelection({
                type: 'concept',
                id: matched.id,
                data: matched,
              });
            }
          },
          onJumpToSource,
        },
      };
    });

    return { nodes: flowNodes, positions: positionsMap };
  }, [filteredClasses, getChildren, relationships, density, groupingPerspective, activeConceptFilter, conceptReport, activeEntitySelection?.id, onSelectEntity, onJumpToSource]);

  // Compute Layout Edges with ArchitectureEdge and Adaptive Directional Handles
  const initialEdges: Edge[] = useMemo(() => {
    const classIdSet = new Set(filteredClasses.map((c) => c.id));
    const edges: Edge[] = [];
    const edgeSet = new Set<string>();

    relationships.forEach((rel) => {
      let sourceClassId = rel.sourceId;
      let targetClassId = rel.targetId;

      if (!sourceClassId.startsWith('class-')) {
        const sourceEntity = getEntity(sourceClassId);
        if (sourceEntity?.parentId) sourceClassId = sourceEntity.parentId;
      }
      if (!targetClassId.startsWith('class-')) {
        const targetEntity = getEntity(targetClassId);
        if (targetEntity?.parentId) targetClassId = targetEntity.parentId;
      }

      if (classIdSet.has(sourceClassId) && classIdSet.has(targetClassId) && sourceClassId !== targetClassId) {
        const edgeKey = `${sourceClassId}->${targetClassId}-${rel.kind}`;
        if (edgeSet.has(edgeKey)) return;
        edgeSet.add(edgeKey);

        const edgeId = `edge-${rel.id}`;

        // Compute adaptive cardinal handles using relative node geometry
        const sourcePos = positions.get(sourceClassId);
        const targetPos = positions.get(targetClassId);

        let sourceHandle = 'bottom-source';
        let targetHandle = 'top-target';

        if (sourcePos && targetPos) {
          const dx = targetPos.x - sourcePos.x;
          const dy = targetPos.y - sourcePos.y;

          if (Math.abs(dy) > Math.abs(dx)) {
            if (dy < 0) {
              // Target is above source (standard subclass -> superclass orientation)
              sourceHandle = 'top-source';
              targetHandle = 'bottom-target';
            } else {
              // Target is below source
              sourceHandle = 'bottom-source';
              targetHandle = 'top-target';
            }
          } else {
            if (dx > 0) {
              // Target is to the right
              sourceHandle = 'right-source';
              targetHandle = 'left-target';
            } else {
              // Target is to the left
              sourceHandle = 'left-source';
              targetHandle = 'right-target';
            }
          }
        }

        const isEdgeInConcept = activeConceptFilter
          ? conceptReport.concepts.some(
              (c) =>
                (c.conceptType.toLowerCase().includes(activeConceptFilter.toLowerCase()) ||
                  c.name.toLowerCase().includes(activeConceptFilter.toLowerCase())) &&
                c.involvedRelationships.includes(rel.id)
            )
          : false;

        edges.push({
          id: edgeId,
          source: sourceClassId,
          target: targetClassId,
          sourceHandle,
          targetHandle,
          type: 'architectureEdge',
          animated: rel.isActive,
          data: {
            relationship: rel,
            isHighlighted: isEdgeInConcept,
            isDimmed: activeConceptFilter ? !isEdgeInConcept : false,
          },
        });
      }
    });

    return edges;
  }, [filteredClasses, relationships, getEntity, positions, activeConceptFilter, conceptReport]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state when nodes or layout changes
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Viewport-aware auto-fitting on load or perspective change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filteredClasses.length <= 3) {
        fitView({ padding: 0.28, duration: 400, maxZoom: 1 });
      } else {
        fitView({ padding: 0.18, duration: 400 });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [filteredClasses.length, density, groupingPerspective, fitView]);

  // Click on connector edge to inspect evidence
  const handleEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    const rel = edge.data?.relationship;
    if (rel) {
      setActiveEntitySelection({
        type: 'relationship',
        id: edge.id,
        data: rel,
      });
    }
  };

  // Export diagram to JSON or SVG
  const handleExportJson = () => {
    const exportData = {
      project: 'OOPS LAB Architecture Export',
      timestamp: new Date().toISOString(),
      classes: filteredClasses.map((c) => ({
        id: c.id,
        name: c.name,
        type: c.entityType,
        visibility: c.visibility,
        modifiers: c.modifiers,
      })),
      relationships: relationships.map((r) => ({
        id: r.id,
        kind: r.kind,
        source: r.sourceId,
        target: r.targetId,
        metadata: r.metadata,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `java-architecture-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col bg-neutral-50/70 relative select-none overflow-hidden">
      {/* Top Filter and Perspective Control Bar */}
      <div className="h-9 px-3 border-b border-border bg-white flex items-center justify-between shrink-0 shadow-2xs z-10">
        {/* Left: Entity Type Filters & Perspectives */}
        <div className="flex items-center space-x-2 text-xs">
          {/* Perspective Dropdown Selector */}
          <div className="flex items-center space-x-1 border-r border-border pr-2">
            <Layers className="w-3.5 h-3.5 text-blue-600 mr-0.5" />
            <select
              value={groupingPerspective}
              onChange={(e) => setGroupingPerspective(e.target.value as GroupingPerspective)}
              className="text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200/80 border border-border rounded px-1.5 py-0.5 outline-none cursor-pointer text-foreground"
              title="Select Class Grouping Perspective"
            >
              <option value="architecture">DAG Architecture</option>
              <option value="package">Package View</option>
              <option value="inheritance">Inheritance View</option>
              <option value="interface">Interface View</option>
              <option value="dependencies">Dependency View</option>
            </select>
          </div>

          {/* Concept Filter Selector */}
          <div className="flex items-center space-x-1 border-r border-border pr-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
            <select
              value={activeConceptFilter || ''}
              onChange={(e) => setActiveConceptFilter(e.target.value || null)}
              className="text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200/80 border border-border rounded px-1.5 py-0.5 outline-none cursor-pointer text-foreground"
              title="Filter and highlight OOP Concept"
            >
              <option value="">All Concepts</option>
              <option value="encapsulation">Encapsulation</option>
              <option value="inheritance">Inheritance</option>
              <option value="abstraction">Abstraction</option>
              <option value="polymorphism">Polymorphism</option>
              <option value="composition">Composition</option>
              <option value="aggregation">Aggregation</option>
              <option value="association">Association</option>
              <option value="dependency">Dependency</option>
              <option value="interfaces">Interface Contracts</option>
              <option value="method-overloading">Method Overloading</option>
              <option value="method-overriding">Method Overriding</option>
              <option value="multithreading">Multithreading</option>
            </select>
            {activeConceptFilter && (
              <button
                onClick={() => setActiveConceptFilter(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground px-1"
                title="Clear Concept Filter"
              >
                ✕
              </button>
            )}
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mr-0.5" />
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-neutral-200 text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({allClasses.length})
            </button>
            <button
              onClick={() => setFilterType('class')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                filterType === 'class'
                  ? 'bg-blue-100 text-blue-900 font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Classes ({classes.length})
            </button>
            {interfaces.length > 0 && (
              <button
                onClick={() => setFilterType('interface')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  filterType === 'interface'
                    ? 'bg-teal-100 text-teal-900 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Interfaces ({interfaces.length})
              </button>
            )}
            {records.length > 0 && (
              <button
                onClick={() => setFilterType('record')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  filterType === 'record'
                    ? 'bg-cyan-100 text-cyan-900 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Records ({records.length})
              </button>
            )}
            {enums.length > 0 && (
              <button
                onClick={() => setFilterType('enum')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  filterType === 'enum'
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Enums ({enums.length})
              </button>
            )}
          </div>
        </div>

        {/* Right: Search, Density, Export, Legend, Zoom Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Search box */}
          <div className="relative flex items-center">
            <Search className="w-3 h-3 text-muted-foreground absolute left-2 pointer-events-none" />
            <input
              type="text"
              placeholder="Find type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 pr-2 py-0.5 text-[10px] bg-neutral-100 border border-border rounded outline-none focus:bg-white focus:border-blue-500 w-24 sm:w-28 font-mono"
            />
          </div>

          <div className="h-3.5 w-px bg-border mx-0.5" />

          {/* Density Switcher */}
          <button
            onClick={() => setDensity(density === 'compact' ? 'comfortable' : 'compact')}
            title={`Density: ${density} (Click to toggle)`}
            className={`p-1 rounded text-[10px] flex items-center space-x-1 border transition-colors ${
              density === 'compact'
                ? 'bg-neutral-100 text-foreground border-border'
                : 'bg-white text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden md:inline font-mono text-[9px] uppercase">{density}</span>
          </button>

          {/* Legend Toggle */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            title={showLegend ? 'Hide UML Legend' : 'Show UML Legend'}
            className={`p-1 rounded border transition-colors ${
              showLegend
                ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
                : 'bg-white border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Info className="w-3 h-3" />
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJson}
            title="Export Architecture Model (JSON)"
            className="p-1 rounded border bg-white border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-3 h-3" />
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-0.5 bg-neutral-100 p-0.5 rounded border border-border">
            <button
              onClick={() => zoomIn({ duration: 250 })}
              title="Zoom In"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={() => zoomOut({ duration: 250 })}
              title="Zoom Out"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={() => zoomTo(1, { duration: 250 })}
              title="Reset Zoom to 100%"
              className="px-1 py-0.5 rounded hover:bg-white text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              1:1
            </button>
            <button
              onClick={() => fitView({ padding: 0.2, duration: 350 })}
              title="Fit Graph to View"
              className="p-1 rounded hover:bg-white text-muted-foreground hover:text-foreground transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Minimap Toggle */}
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            title={showMinimap ? 'Hide Minimap' : 'Show Minimap'}
            className={`p-1 rounded border transition-colors ${
              showMinimap
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <MapIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive React Flow Canvas */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes as any}
          edgeTypes={edgeTypes as any}
          onEdgeClick={handleEdgeClick}
          fitView
          fitViewOptions={{ padding: 0.22 }}
          minZoom={0.25}
          maxZoom={1.75}
          defaultViewport={{ x: 0, y: 0, zoom: 0.95 }}
        >
          <Background variant={BackgroundVariant.Dots} gap={14} size={1} color="#CBD5E1" />
          <Controls position="bottom-left" showInteractive={false} className="!bg-white/90 !shadow-xs !border !border-border !rounded-md" />
          {showMinimap && (
            <MiniMap 
              position="bottom-right"
              nodeColor={(n) => {
                if (n.id.includes('interface')) return '#0D9488';
                if (n.id.includes('abstract')) return '#7C3AED';
                if (n.id.includes('record')) return '#0891B2';
                if (n.id.includes('enum')) return '#D97706';
                return '#2563EB';
              }}
              maskColor="rgba(245, 248, 252, 0.75)"
              className="!border !border-border !rounded-md !shadow-xs !w-32 !h-20 sm:!w-36 sm:!h-24 !bg-white/90"
            />
          )}
        </ReactFlow>

        {/* Collapsible Interactive UML Legend Overlay */}
        {showLegend && (
          <div className="absolute top-3 right-3 w-72 bg-white/95 backdrop-blur-md border border-border shadow-lg rounded-lg p-3 text-xs space-y-3 z-30 select-none">
            <div className="flex items-center justify-between border-b border-border pb-1.5">
              <span className="font-bold text-foreground flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>UML Notation & Syntax Guide</span>
              </span>
              <button
                onClick={() => setShowLegend(false)}
                className="text-muted-foreground hover:text-foreground text-[11px]"
              >
                ✕
              </button>
            </div>

            {/* Node Entity Stereotypes */}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Entity Types
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-xs bg-blue-500" />
                  <span>«class» Concrete</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-xs bg-teal-500" />
                  <span>«interface» Contract</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-xs bg-purple-500" />
                  <span>«abstract» Class</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-xs bg-amber-500" />
                  <span>«enum» Constants</span>
                </div>
              </div>
            </div>

            {/* Connector Symbols */}
            <div className="space-y-1 border-t border-border/60 pt-2">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Relationship Connectors
              </div>
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 font-bold">──▷</span>
                  <span className="text-foreground">Inheritance (extends)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-700 font-bold">- -▷</span>
                  <span className="text-foreground">Implementation (implements)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-900 font-bold">◆──</span>
                  <span className="text-foreground">Composition (owns)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-bold">◇──</span>
                  <span className="text-foreground">Aggregation (has-a)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-bold">{'──>'}</span>
                  <span className="text-foreground">Association (references)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-bold">{'- ->'}</span>
                  <span className="text-foreground">Dependency (depends on)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-violet-600 font-bold">{'··>'}</span>
                  <span className="text-foreground">Method Call (invokes)</span>
                </div>
              </div>
            </div>

            <div className="pt-1 text-[9.5px] text-muted-foreground italic border-t border-border/50">
              Click any connector or node to inspect code evidence and pedagogical explanation in the Inspector.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ClassArchitectureMap: React.FC<ClassArchitectureMapProps> = (props) => {
  return (
    <ReactFlowProvider>
      <ArchitectureCanvasInner {...props} />
    </ReactFlowProvider>
  );
};
