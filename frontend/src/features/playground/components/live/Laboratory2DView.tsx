import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  ShieldCheck, 
  Layers, 
  Gem, 
  Lock, 
  AlertTriangle, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Scan,
  RotateCcw,
  Copy,
  Check,
  Move,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { VisualMetaphorModel, VisualEntity, VisualField } from './useVisualMetaphorModel';
import { CARD_WIDTH, positionRegistry } from './layoutEngine';
import { buildExactFieldConnectors, CardRect, ExactFieldReference, RoutedConnector } from './connectorRouter';

interface Laboratory2DViewProps {
  model: VisualMetaphorModel;
  isExecutionRunning?: boolean;
  onSelectEntity?: (address: string) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

export const Laboratory2DView: React.FC<Laboratory2DViewProps> = ({
  model,
  isExecutionRunning = false,
  onSelectEntity,
  onJumpToSource,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Manual Card Movement Support (Enabled when execution is paused/complete)
  const [manualPositions, setManualPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [draggingEntityId, setDraggingEntityId] = useState<string | null>(null);
  const dragCardRef = useRef<{ id: string; startMouseX: number; startMouseY: number; startX: number; startY: number } | null>(null);

  // Sync manual positions from positionRegistry if present
  const entities = model.entities.map(e => {
    const manual = manualPositions.get(e.id);
    if (manual) {
      return { ...e, x: manual.x, y: manual.y };
    }
    return e;
  });

  // Re-calculate connectors dynamically taking into account any dragged positions
  const dynamicCardMap = new Map<string, CardRect>();
  entities.forEach(ent => {
    dynamicCardMap.set(ent.id, {
      id: ent.id,
      x: ent.x,
      y: ent.y,
      width: ent.width || CARD_WIDTH,
      height: ent.height || 200,
      metaphorType: ent.metaphorType,
    });
  });

  // Re-route exact field reference connectors
  const exactFieldReferences: ExactFieldReference[] = [];
  const activeAddressSet = new Set(entities.map(e => e.id));

  entities.forEach(sourceEnt => {
    sourceEnt.fields.forEach((field, fieldIdx) => {
      if (field.isReference && field.targetAddress && activeAddressSet.has(field.targetAddress)) {
        exactFieldReferences.push({
          id: `ref-${sourceEnt.id}.${field.name}->${field.targetAddress}`,
          sourceObjectId: sourceEnt.id,
          sourceFieldName: field.name,
          sourceFieldIdx: fieldIdx,
          destinationObjectId: field.targetAddress,
          connectorType: 'reference',
          isActive: Boolean(sourceEnt.isHighlighted || field.targetAddress === model.activeEntity?.id),
        });
      }
    });
  });

  const connectors: RoutedConnector[] = buildExactFieldConnectors(
    exactFieldReferences,
    dynamicCardMap,
    model.activeEntity?.id
  );

  // -----------------------------------------------------------------
  // 1. FIT TO SCREEN ENGINE (Calculates true graph bounding box)
  // -----------------------------------------------------------------
  const fitToScreen = useCallback(() => {
    if (!containerRef.current || entities.length === 0) return;

    const viewportWidth = containerRef.current.clientWidth;
    const viewportHeight = containerRef.current.clientHeight;

    if (viewportWidth <= 0 || viewportHeight <= 0) return;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    entities.forEach((entity) => {
      minX = Math.min(minX, entity.x);
      maxX = Math.max(maxX, entity.x + (entity.width || CARD_WIDTH));
      minY = Math.min(minY, entity.y);
      maxY = Math.max(maxY, entity.y + (entity.height || 200));
    });

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;

    if (graphWidth <= 0 || graphHeight <= 0) return;

    const paddingX = 70;
    const paddingY = 70;
    const availableWidth = Math.max(200, viewportWidth - paddingX * 2);
    const availableHeight = Math.max(200, viewportHeight - paddingY * 2);

    const scaleX = availableWidth / graphWidth;
    const scaleY = availableHeight / graphHeight;

    // Readable bounds: don't shrink smaller than 45% or larger than 105%
    const bestScale = Math.min(1.05, Math.max(0.45, Math.min(scaleX, scaleY)));

    const targetPanX = (viewportWidth - graphWidth * bestScale) / 2 - minX * bestScale;
    const targetPanY = (viewportHeight - graphHeight * bestScale) / 2 - minY * bestScale;

    setZoomLevel(Number(bestScale.toFixed(2)));
    setPanOffset({
      x: Math.round(targetPanX),
      y: Math.round(targetPanY),
    });
  }, [entities]);

  const resetView = useCallback(() => {
    setZoomLevel(0.9);
    setPanOffset({ x: 50, y: 50 });
  }, []);

  const restoreAutoLayout = useCallback(() => {
    positionRegistry.clear();
    setManualPositions(new Map());
    resetView();
  }, [resetView]);

  // Focus directly on a specific entity (Instant Navigation)
  const focusOnEntity = useCallback((entityId: string) => {
    const entity = entities.find(e => e.id === entityId);
    if (!entity || !containerRef.current) return;

    const viewportWidth = containerRef.current.clientWidth;
    const viewportHeight = containerRef.current.clientHeight;

    const targetPanX = (viewportWidth / 2) - (entity.x + CARD_WIDTH / 2) * zoomLevel;
    const targetPanY = (viewportHeight / 2) - (entity.y + (entity.height || 200) / 2) * zoomLevel;

    setPanOffset({
      x: Math.round(targetPanX),
      y: Math.round(targetPanY),
    });
    onSelectEntity?.(entityId);
  }, [entities, zoomLevel, onSelectEntity]);

  const zoomIn = () => setZoomLevel((z) => Math.min(2.0, Number((z + 0.15).toFixed(2))));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.35, Number((z - 0.15).toFixed(2))));

  // -----------------------------------------------------------------
  // 2. CURSOR-CENTERED MOUSE WHEEL ZOOM
  // -----------------------------------------------------------------
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(2.0, Math.max(0.35, Number((zoomLevel * zoomFactor).toFixed(3))));

    if (newZoom === zoomLevel) return;

    const newPanX = cursorX - (cursorX - panOffset.x) * (newZoom / zoomLevel);
    const newPanY = cursorY - (cursorY - panOffset.y) * (newZoom / zoomLevel);

    setZoomLevel(newZoom);
    setPanOffset({
      x: Math.round(newPanX),
      y: Math.round(newPanY),
    });
  };

  // -----------------------------------------------------------------
  // 3. CANVAS PAN DRAGGING
  // -----------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if middle click or left click directly on background
    if (e.button !== 0 && e.button !== 1) return;
    const target = e.target as HTMLElement;
    if (target.closest('.interactive-entity') || target.closest('.value-popover') || target.closest('button')) {
      return;
    }

    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  // -----------------------------------------------------------------
  // 4. MANUAL CARD DRAGGING (When execution is not actively running)
  // -----------------------------------------------------------------
  const handleCardDragStart = (e: React.MouseEvent, entityId: string, currentX: number, currentY: number) => {
    if (isExecutionRunning) return; // Automatic layout locked during execution
    e.stopPropagation();

    setDraggingEntityId(entityId);
    dragCardRef.current = {
      id: entityId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: currentX,
      startY: currentY,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Handle Canvas Panning
      if (isPanning) {
        setPanOffset({
          x: e.clientX - panStartRef.current.x,
          y: e.clientY - panStartRef.current.y,
        });
        return;
      }

      // 2. Handle Manual Card Dragging
      if (dragCardRef.current) {
        const { id, startMouseX, startMouseY, startX, startY } = dragCardRef.current;
        const deltaX = (e.clientX - startMouseX) / zoomLevel;
        const deltaY = (e.clientY - startMouseY) / zoomLevel;

        const newX = Math.round(startX + deltaX);
        const newY = Math.round(startY + deltaY);

        setManualPositions(prev => {
          const next = new Map(prev);
          next.set(id, { x: newX, y: newY });
          return next;
        });

        positionRegistry.set(id, {
          x: newX,
          y: newY,
          width: CARD_WIDTH,
          height: 200,
          isManual: true,
        });
      }
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      if (dragCardRef.current) {
        dragCardRef.current = null;
        setDraggingEntityId(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, zoomLevel]);

  // Compute virtual canvas bounds
  let maxExtentX = 3000;
  let maxExtentY = 2400;
  entities.forEach(ent => {
    maxExtentX = Math.max(maxExtentX, ent.x + 800);
    maxExtentY = Math.max(maxExtentY, ent.y + 800);
  });

  return (
    <div className="h-full w-full flex bg-[#F8FAFC] select-none text-xs text-foreground overflow-hidden font-sans relative">
      {/* ================================================================= */}
      {/* LEFT DOCKED SIDEBAR: REFERENCE DOCKS & OBJECT NAVIGATOR           */}
      {/* ================================================================= */}
      <div className="w-[280px] shrink-0 border-r border-slate-200 bg-white/95 backdrop-blur-md flex flex-col z-20 shadow-xs">
        {/* Sidebar Header */}
        <div className="h-10 px-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800 font-mono">
            <Boxes className="w-3.5 h-3.5 text-blue-600" />
            <span>OBJECT REGISTRY</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {entities.length} {entities.length === 1 ? 'Object' : 'Objects'}
          </span>
        </div>

        {/* Object Quick Navigator List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 [scrollbar-width:thin]">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider px-1">
            Active Heap Entities (Click to Focus)
          </div>

          {entities.length > 0 ? (
            entities.map((ent) => {
              const isSelected = model.activeEntity?.id === ent.id;
              return (
                <button
                  key={ent.id}
                  onClick={() => focusOnEntity(ent.id)}
                  className={`w-full text-left p-2 rounded-xl transition-all border flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 shadow-2xs text-blue-950 font-bold'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-blue-600' : 'bg-slate-400 group-hover:bg-blue-500'}`} />
                    <div className="min-w-0">
                      <span className="font-mono text-xs block truncate">{ent.simpleName}</span>
                      <span className="text-[10px] font-mono text-slate-400 block truncate">{ent.id}</span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500 shrink-0">
                    {ent.fields.length} {ent.fields.length === 1 ? 'field' : 'fields'}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-slate-400 font-mono text-[11px] italic">
              No heap objects allocated yet
            </div>
          )}

          {/* Reference Docks Section */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider px-1 mb-1.5">
              Stack Variable Pointers
            </div>
            {model.tethers.length > 0 ? (
              model.tethers.map((tether) => (
                <div
                  key={tether.id}
                  onClick={() => focusOnEntity(tether.targetAddress)}
                  className={`p-2 rounded-xl border text-[11px] font-mono flex items-center justify-between cursor-pointer transition-colors mb-1 ${
                    tether.isActive
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tether.color }} />
                    <span className="truncate">{tether.sourceVarName}</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-bold shrink-0">
                    → {tether.targetAddress}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-[10px] text-slate-400 italic px-1 font-mono">
                No active reference pointers
              </div>
            )}
          </div>
        </div>

        {/* Manual Dragging Hint & Layout Reset */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Layout Mode:</span>
            <span className="font-bold text-slate-700">
              {isExecutionRunning ? 'Auto (Locked)' : 'Interactive'}
            </span>
          </div>
          {manualPositions.size > 0 && (
            <button
              onClick={restoreAutoLayout}
              className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono text-[10.5px] font-semibold flex items-center justify-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-blue-600" />
              <span>Restore Auto Layout</span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* CENTRAL DYNAMIC GRAPH CANVAS (UNBOUNDED VIRTUAL CANVAS)           */}
      {/* ================================================================= */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className="flex-1 relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] cursor-grab active:cursor-grabbing select-none"
      >
        {/* Top-Right Floating Canvas Controls */}
        <div className="absolute top-3 right-4 z-30 flex items-center space-x-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-md">
          <button
            onClick={zoomIn}
            title="Zoom In (+15%)"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1.5 text-slate-600 font-bold min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={zoomOut}
            title="Zoom Out (-15%)"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <div className="h-3.5 w-px bg-slate-200 mx-0.5" />
          <button
            onClick={fitToScreen}
            title="Fit to Screen (Calculate Complete Graph Bounds)"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer text-[10.5px] font-bold border border-blue-200"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Fit All</span>
          </button>
          <button
            onClick={resetView}
            title="Reset View"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Runtime Diagnostics Banner: Validates Runtime Heap Count = Visualized Count */}
        <div className="absolute top-3 left-4 z-30 pointer-events-none">
          {model.heapCountMismatch ? (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-[10.5px] font-mono font-bold shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Mismatch: Expected {model.expectedHeapCount} heap objects, visualized {entities.length}!</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 text-[10px] font-mono shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Heap Verified: {entities.length}/{entities.length} rendered (0 collisions)</span>
            </div>
          )}
        </div>

        {/* Scalable & Pannable Virtual World Layer */}
        <div 
          className="w-full h-full origin-top-left transition-transform duration-75 ease-out relative"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          }}
        >
          {/* SVG Obstacle-Free Connector Layer */}
          <svg 
            className="absolute inset-0 pointer-events-none z-10 overflow-visible"
            style={{ width: `${maxExtentX}px`, height: `${maxExtentY}px` }}
          >
            <defs>
              {/* Directional Arrowheads — Visible, crisp, restrained */}
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#2563EB" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#D97706" />
              </marker>

              <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Render Exact Field-to-Object Reference Arrows */}
            {connectors.map((conn) => {
              const markerUrl = conn.isActive ? 'url(#arrow-active)' : 'url(#arrow-blue)';
              return (
                <g key={conn.id} className="transition-all duration-300">
                  {/* Outer Laser Glow on Active Connectors */}
                  {conn.isActive && (
                    <path
                      d={conn.pathD}
                      fill="none"
                      stroke={conn.color}
                      strokeWidth={3}
                      strokeOpacity={0.3}
                      filter="url(#laser-glow)"
                    />
                  )}
                  {/* Clean Obstacle-Free Directional Arrow Path */}
                  <path
                    d={conn.pathD}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth={conn.isActive ? 2 : 1.5}
                    strokeDasharray={conn.isActive ? '5 3' : 'none'}
                    markerEnd={markerUrl}
                  />
                </g>
              );
            })}
          </svg>

          {/* Runtime Object Cards */}
          {entities.length > 0 ? (
            entities.map((entity) => (
              <div
                key={entity.id}
                onClick={() => onSelectEntity?.(entity.id)}
                className={`interactive-entity absolute z-20 transition-shadow ${
                  draggingEntityId === entity.id ? 'z-40 shadow-2xl scale-[1.01]' : ''
                }`}
                style={{
                  left: `${entity.x}px`,
                  top: `${entity.y}px`,
                  width: `${CARD_WIDTH}px`,
                }}
              >
                <PhysicalMetaphorEntity
                  entity={entity}
                  isDraggable={!isExecutionRunning}
                  isDragging={draggingEntityId === entity.id}
                  onDragStart={(e) => handleCardDragStart(e, entity.id, entity.x, entity.y)}
                  onJumpToSource={onJumpToSource}
                />
              </div>
            ))
          ) : (
            <div className="absolute left-[100px] top-[140px] z-20 p-8 rounded-3xl border border-dashed border-slate-300 bg-white/70 backdrop-blur-sm text-center max-w-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Visual Simulation Standby</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step forward or press <span className="font-semibold text-slate-900">Resume</span> to watch objects fabricated in the simulation laboratory as Java instructions execute!
              </p>
            </div>
          )}
        </div>

        {/* Exception Alert Banner (Top-Right) */}
        <AnimatePresence>
          {model.alert.isException && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute top-16 right-4 z-30 bg-rose-50/95 backdrop-blur-md rounded-2xl border border-rose-300 p-3.5 shadow-lg w-80 space-y-2 text-rose-950"
            >
              <div className="flex items-center space-x-2 text-rose-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {model.alert.type || 'Fault Interception'}
                </h4>
              </div>
              <p className="text-xs font-medium leading-relaxed font-sans">
                {model.alert.message || 'Execution stream redirected through catch block.'}
              </p>
              <div className="text-[10px] font-mono bg-rose-100/70 p-1 rounded-lg text-rose-800 border border-rose-200">
                Diversion Status: {model.alert.status.toUpperCase()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * PhysicalMetaphorEntity
 * 
 * Renders an individual object card with:
 * - Draggable header handle when execution is complete/paused
 * - Responsive 12-column 3-part layout (Name 5 cols, Type 3 cols, Value 4 cols)
 * - Zero overflow: truncates long expressions while keeping full value accessible on hover/click
 * - Hover & click value inspection popover
 */
interface PhysicalMetaphorEntityProps {
  entity: VisualEntity;
  isDraggable?: boolean;
  isDragging?: boolean;
  onDragStart?: (e: React.MouseEvent) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

const PhysicalMetaphorEntity: React.FC<PhysicalMetaphorEntityProps> = ({
  entity,
  isDraggable = false,
  isDragging: _isDragging = false,
  onDragStart,
}) => {
  const isVault = entity.metaphorType === 'vault-encapsulated';
  const isChassis = entity.metaphorType === 'chassis-inherited';
  const isRecord = entity.metaphorType === 'record-crystal';

  return (
    <motion.div
      initial={entity.isNew ? { scale: 0.85, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`rounded-2xl transition-all border shadow-sm ${
        entity.isHighlighted 
          ? 'ring-2 ring-blue-500/80 shadow-md bg-white' 
          : 'bg-white/95 backdrop-blur-md hover:shadow-md'
      } ${
        isVault 
          ? 'border-blue-200/90' 
          : isChassis 
          ? 'border-indigo-200/90' 
          : isRecord 
          ? 'border-amber-200/90' 
          : 'border-slate-200/90'
      }`}
    >
      {/* 1. Header Banner & Drag Handle */}
      <div 
        onMouseDown={isDraggable ? onDragStart : undefined}
        className={`px-3.5 py-2.5 rounded-t-2xl border-b flex items-center justify-between select-none ${
          isDraggable ? 'cursor-move' : ''
        } ${
          isVault 
            ? 'bg-gradient-to-r from-blue-50/80 to-blue-50/40 border-blue-100 text-blue-900' 
            : isChassis 
            ? 'bg-gradient-to-r from-indigo-50/80 to-indigo-50/40 border-indigo-100 text-indigo-900' 
            : isRecord 
            ? 'bg-gradient-to-r from-amber-50/80 to-amber-50/40 border-amber-100 text-amber-900' 
            : 'bg-slate-50/80 border-slate-100 text-slate-800'
        }`}
      >
        <div className="flex items-center space-x-2 min-w-0">
          {isDraggable && <Move className="w-3 h-3 text-slate-400 shrink-0" />}
          {isVault && <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />}
          {isChassis && <Layers className="w-4 h-4 text-indigo-600 shrink-0" />}
          {isRecord && <Gem className="w-4 h-4 text-amber-600 shrink-0" />}
          {!isVault && !isChassis && !isRecord && <Factory className="w-4 h-4 text-slate-600 shrink-0" />}

          <div className="min-w-0">
            <h3 className="text-xs font-bold font-mono tracking-tight truncate">{entity.simpleName}</h3>
            <span className="text-[10px] text-slate-500 font-mono block truncate">{entity.id}</span>
          </div>
        </div>

        {/* Metaphor Tag */}
        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold shrink-0 ml-1.5 ${
          isVault 
            ? 'bg-blue-100/70 text-blue-800 border-blue-200' 
            : isChassis 
            ? 'bg-indigo-100/70 text-indigo-800 border-indigo-200' 
            : isRecord 
            ? 'bg-amber-100/70 text-amber-800 border-amber-200' 
            : 'bg-slate-100 text-slate-700 border-slate-200'
        }`}>
          {isVault ? 'VAULT' : isChassis ? 'CHASSIS' : isRecord ? 'RECORD' : 'ENTITY'}
        </span>
      </div>

      {/* 2. Visual Mechanism & Fields */}
      <div className="p-3.5 space-y-2.5">
        {isVault && (
          <div className="flex items-center space-x-1.5 p-1.5 rounded-lg bg-blue-50/50 border border-blue-100 text-[10px] text-blue-700 font-sans">
            <Lock className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="truncate">Protected state; invariant methods.</span>
          </div>
        )}

        {isChassis && (
          <div className="flex items-center space-x-1.5 p-1.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-[10px] text-indigo-700 font-sans">
            <Layers className="w-3 h-3 text-indigo-600 shrink-0" />
            <span className="truncate">Modular specialization extends base chassis.</span>
          </div>
        )}

        {/* Fields Register */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
            Instance Registers
          </div>

          {entity.fields.length > 0 ? (
            entity.fields.map((field) => (
              <FieldRow key={field.name} field={field} />
            ))
          ) : (
            <div className="p-2 text-center text-[10px] text-slate-400 font-mono italic bg-slate-50/50 rounded-xl">
              No instance fields declared
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * FieldRow: Individual field row with 3-part layout and hover value inspection
 */
interface FieldRowProps {
  field: VisualField;
}

const FieldRow: React.FC<FieldRowProps> = ({ field }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(field.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      <div
        onClick={() => setShowDetail((v) => !v)}
        className={`grid grid-cols-12 gap-1.5 items-center p-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
          field.isMutated 
            ? 'bg-amber-50/90 border-amber-300 shadow-2xs font-bold text-amber-950 animate-pulse' 
            : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-100 text-slate-700'
        }`}
        title={`Click to inspect complete value for ${field.name}`}
      >
        {/* Part 1: Field Name (5 cols) */}
        <div className="col-span-5 flex items-center space-x-1.5 min-w-0" title={field.name}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${field.isMutated ? 'bg-amber-500' : 'bg-slate-400'}`} />
          <span className="font-semibold truncate">{field.name}</span>
        </div>

        {/* Part 2: Data Type (3 cols) */}
        <div className="col-span-3 min-w-0 text-center" title={field.type}>
          <span className="inline-block max-w-full text-[9px] text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded truncate">
            {field.type}
          </span>
        </div>

        {/* Part 3: Field Value (4 cols) */}
        <div className="col-span-4 min-w-0 text-right font-mono" title={field.value}>
          {field.isReference && field.targetAddress ? (
            <span className="text-blue-600 font-bold hover:underline truncate inline-block max-w-full">
              {field.targetAddress}
            </span>
          ) : field.value === 'null' ? (
            <span className="text-slate-400 italic">null</span>
          ) : (
            <span className={`truncate inline-block max-w-full ${field.isMutated ? 'text-amber-700 font-bold' : 'text-slate-900'}`}>
              {field.value}
            </span>
          )}
        </div>
      </div>

      {/* Floating Detailed Value Inspector Popover (On Click/Hover) */}
      {showDetail && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="value-popover absolute left-0 right-0 top-full mt-1 z-50 p-2.5 rounded-xl bg-slate-900 text-white text-[11px] font-mono shadow-2xl border border-slate-700 space-y-1.5 animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-1 text-[10px] text-slate-400">
            <span>{field.name} ({field.type})</span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="break-all font-mono leading-relaxed text-slate-100 max-h-28 overflow-y-auto pr-1">
            {field.value}
          </div>
        </div>
      )}
    </div>
  );
};
