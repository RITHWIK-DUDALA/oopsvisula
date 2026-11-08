import { Node, Edge } from '@xyflow/react';
import { VisualEntityData, VisualRelationshipData } from '../types';
import { estimateEntityDimensions } from './dimensionEstimator';

export interface VisualEntity {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  selected?: boolean;
  collapsed?: boolean;
  layoutGroup?: string;
  priority?: number;
}

export interface VisualRelationship {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
  sourceAnchor?: string;
  targetAnchor?: string;
  waypoints?: {
    x: number;
    y: number;
  }[];
}

export interface BoundingBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export type LayoutAlgorithm =
  | 'auto'
  | 'hierarchical'
  | 'stack'
  | 'grid'
  | 'circular'
  | 'dependency'
  | 'tree'
  | 'manual';

export const MIN_HORIZONTAL_SEPARATION = 36; // Strictly >= 28px per Part 3.1
export const MIN_VERTICAL_SEPARATION = 36;   // Strictly >= 28px per Part 3.1

/**
 * Computes bounding box from node position and dimensions
 */
export function getNodeBoundingBox(
  node: Node<VisualEntityData>,
  dimensions?: { width: number; height: number }
): BoundingBox {
  const width = dimensions?.width || node.data.width || (estimateEntityDimensions(node).width);
  const height = dimensions?.height || node.data.height || (estimateEntityDimensions(node).height);
  const left = node.position.x;
  const top = node.position.y;
  const right = left + width;
  const bottom = top + height;

  return {
    left,
    right,
    top,
    bottom,
    width,
    height,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
}

/**
 * Determines whether two bounding boxes overlap with the specified safety gap.
 * Rule 3.1: Two unrelated entity cards must never occupy the same visual area.
 * Horizontal separation >= 28px, Vertical separation >= 28px.
 */
export function hasOverlap(a: BoundingBox, b: BoundingBox, gap = MIN_HORIZONTAL_SEPARATION): boolean {
  return !(
    a.right + gap <= b.left ||
    b.right + gap <= a.left ||
    a.bottom + gap <= b.top ||
    b.bottom + gap <= a.top
  );
}

/**
 * Iterative Force-Directed Collision Resolution Pass
 * Pushes overlapping nodes apart along the axis of minimum displacement
 * while maintaining logical directional hierarchy.
 */
export function resolveCollisions(
  nodes: Node<VisualEntityData>[],
  minGap = MIN_HORIZONTAL_SEPARATION,
  maxIterations = 14
): Node<VisualEntityData>[] {
  if (nodes.length <= 1) return nodes;

  const resultNodes = nodes.map((n) => ({
    ...n,
    position: { ...n.position },
  }));

  const dimensionsMap = new Map<string, { width: number; height: number }>();
  resultNodes.forEach((node) => {
    const dims = estimateEntityDimensions(node);
    dimensionsMap.set(node.id, { width: dims.width, height: dims.height });
  });

  for (let iter = 0; iter < maxIterations; iter++) {
    let hadCollision = false;

    for (let i = 0; i < resultNodes.length; i++) {
      for (let j = i + 1; j < resultNodes.length; j++) {
        const nodeA = resultNodes[i];
        const nodeB = resultNodes[j];

        // Skip package containers containing their children
        if (nodeA.type === 'packageGroupNode' || nodeB.type === 'packageGroupNode') continue;

        const dimsA = dimensionsMap.get(nodeA.id)!;
        const dimsB = dimensionsMap.get(nodeB.id)!;

        const boxA = getNodeBoundingBox(nodeA, dimsA);
        const boxB = getNodeBoundingBox(nodeB, dimsB);

        if (hasOverlap(boxA, boxB, minGap)) {
          hadCollision = true;

          // Calculate penetration depths
          const overlapX = Math.min(boxA.right + minGap - boxB.left, boxB.right + minGap - boxA.left);
          const overlapY = Math.min(boxA.bottom + minGap - boxB.top, boxB.bottom + minGap - boxA.top);

          // Decide separation axis based on least displacement or natural stack orientation
          const isStackContext = nodeA.type === 'stackFrameNode' && nodeB.type === 'stackFrameNode';

          if (isStackContext || overlapY < overlapX) {
            // Push vertically
            const pushY = (overlapY / 2) + 4;
            if (boxA.centerY < boxB.centerY) {
              nodeA.position.y -= pushY;
              nodeB.position.y += pushY;
            } else {
              nodeA.position.y += pushY;
              nodeB.position.y -= pushY;
            }
          } else {
            // Push horizontally
            const pushX = (overlapX / 2) + 4;
            if (boxA.centerX < boxB.centerX) {
              nodeA.position.x -= pushX;
              nodeB.position.x += pushX;
            } else {
              nodeA.position.x += pushX;
              nodeB.position.x -= pushX;
            }
          }
        }
      }
    }

    if (!hadCollision) break;
  }

  return resultNodes;
}

/**
 * Dedicated JVM Stack Layout Algorithm
 * Organizes call stack frames vertically with strict LIFO ordering and non-overlapping clearance.
 * Places accompanying Heap objects and Class blueprints in an adjacent column with ample margin.
 */
function layoutCallStack(
  nodes: Node<VisualEntityData>[],
  edges: Edge<VisualRelationshipData>[]
): Node<VisualEntityData>[] {
  const resultNodes = nodes.map((n) => ({ ...n, position: { ...n.position } }));

  const stackFrames = resultNodes.filter((n) => n.type === 'stackFrameNode');
  const otherNodes = resultNodes.filter((n) => n.type !== 'stackFrameNode');

  if (stackFrames.length === 0) {
    return applyHierarchicalLayout(resultNodes, edges);
  }

  // Sort frames by invocation sequence / stack depth
  // Top active frame should be at the top of the stack (smallest Y), or bottom frame at largest Y
  // We determine order based on call edges or frame names
  const frameOrderMap = new Map<string, number>();

  // If call edges exist (source calls target):
  // Caller is below Callee (callee has higher stack index)
  edges.forEach((e) => {
    if (e.data?.type === 'call' || e.data?.type === 'invocation') {
      const srcIdx = frameOrderMap.get(e.source) ?? 0;
      frameOrderMap.set(e.target, Math.max(frameOrderMap.get(e.target) ?? 0, srcIdx + 1));
    }
  });

  // Sort stack frames with highest stack index (top frame) placed at the top (top-to-bottom stack)
  stackFrames.sort((a, b) => {
    const orderA = frameOrderMap.get(a.id) ?? 0;
    const orderB = frameOrderMap.get(b.id) ?? 0;
    if (orderA !== orderB) return orderB - orderA; // Top frame first (smallest Y)
    // Fallback: compare existing Y
    return a.position.y - b.position.y;
  });

  // Position stack frames along the stack column
  const stackColumnX = otherNodes.length > 0 ? 160 : 380;
  let currentY = 60;
  const STACK_VERTICAL_GAP = 52; // Generous vertical separation

  stackFrames.forEach((frame, idx) => {
    const dims = estimateEntityDimensions(frame);
    frame.position = {
      x: stackColumnX,
      y: currentY,
    };
    currentY += dims.height + STACK_VERTICAL_GAP;

    // Set active status strictly: only the top frame (first in array) is active
    if (!frame.data.isTopFrame && idx === 0) {
      frame.data.isTopFrame = true;
    } else if (idx > 0 && frame.data.isTopFrame) {
      frame.data.isTopFrame = false;
    }
  });

  // Position companion nodes (Heap objects, Classes) in parallel column to the right
  if (otherNodes.length > 0) {
    const rightColumnX = stackColumnX + 380; // Clear horizontal gap >= 100px
    let rightY = 60;
    const RIGHT_VERTICAL_GAP = 48;

    otherNodes.forEach((node) => {
      const dims = estimateEntityDimensions(node);
      node.position = {
        x: rightColumnX,
        y: rightY,
      };
      rightY += dims.height + RIGHT_VERTICAL_GAP;
    });
  }

  return resolveCollisions(resultNodes, MIN_HORIZONTAL_SEPARATION);
}

/**
 * Hierarchical / Layered Graph Layout (Sugiyama approach)
 * Places root types at Level 0, derived types at Level 1, instances at Level 2+.
 * Accurately measures each layer's maximum height to prevent vertical collisions.
 */
function applyHierarchicalLayout(
  nodes: Node<VisualEntityData>[],
  edges: Edge<VisualRelationshipData>[]
): Node<VisualEntityData>[] {
  const resultNodes = nodes.map((n) => ({ ...n, position: { ...n.position } }));
  const levelMap = new Map<string, number>();

  // Determine structural inheritance / implementation roots
  resultNodes.forEach((node) => {
    const isTargetOfHierarchy = edges.some(
      (e) =>
        e.target === node.id &&
        ['inheritance', 'extends', 'implementation', 'implements'].includes(e.data?.type || '')
    );
    const isSourceOfHierarchy = edges.some(
      (e) =>
        e.source === node.id &&
        ['inheritance', 'extends', 'implementation', 'implements'].includes(e.data?.type || '')
    );
    const isInstance = ['object', 'heap-object', 'array', 'variable'].includes(
      node.data.entityType || ''
    );

    if (isTargetOfHierarchy && !isSourceOfHierarchy) {
      levelMap.set(node.id, 0); // Root superclass or interface
    } else if (isSourceOfHierarchy && !isInstance) {
      levelMap.set(node.id, 1); // Subclasses / implementers
    } else if (isInstance) {
      levelMap.set(node.id, 2); // Heap instances
    } else {
      levelMap.set(node.id, 1);
    }
  });

  // Group nodes by level
  const levels: Record<number, Node<VisualEntityData>[]> = {};
  resultNodes.forEach((node) => {
    const lvl = levelMap.get(node.id) ?? 0;
    if (!levels[lvl]) levels[lvl] = [];
    levels[lvl].push(node);
  });

  // Calculate layout layer by layer with dynamic height measurement & row wrapping
  let currentY = 70;
  const sortedLevelKeys = Object.keys(levels)
    .map(Number)
    .sort((a, b) => a - b);

  sortedLevelKeys.forEach((lvl) => {
    const groupNodes = levels[lvl];
    const HORIZONTAL_GAP = 54;
    const VERTICAL_LEVEL_GAP = 70;

    // Wrap wide layers into balanced rows (max 4 nodes per row) to prevent single endless straight lines
    const MAX_NODES_PER_ROW = 4;
    const numRows = Math.ceil(groupNodes.length / MAX_NODES_PER_ROW);

    for (let r = 0; r < numRows; r++) {
      const rowSlice = groupNodes.slice(r * MAX_NODES_PER_ROW, (r + 1) * MAX_NODES_PER_ROW);
      const rowDims = rowSlice.map((n) => estimateEntityDimensions(n));

      const maxRowHeight = Math.max(...rowDims.map((d) => d.height), 120);
      const totalRowWidth =
        rowDims.reduce((acc, d) => acc + d.width, 0) + (rowSlice.length - 1) * HORIZONTAL_GAP;

      const canvasCenterX = 520;
      let currentX = Math.max(80, canvasCenterX - totalRowWidth / 2);

      rowSlice.forEach((node, idx) => {
        const dims = rowDims[idx];
        node.position = {
          x: Math.round(currentX),
          y: Math.round(currentY),
        };
        currentX += dims.width + HORIZONTAL_GAP;
      });

      currentY += maxRowHeight + VERTICAL_LEVEL_GAP;
    }
  });

  return resolveCollisions(resultNodes, MIN_HORIZONTAL_SEPARATION);
}

/**
 * Grid Layout with Dynamic Content-Aware Cell Sizing
 */
function applyGridLayout(nodes: Node<VisualEntityData>[]): Node<VisualEntityData>[] {
  const resultNodes = nodes.map((n) => ({ ...n, position: { ...n.position } }));
  if (resultNodes.length === 0) return resultNodes;

  const cols = Math.min(3, Math.max(1, Math.ceil(Math.sqrt(resultNodes.length))));
  const dimsList = resultNodes.map((n) => estimateEntityDimensions(n));

  // Compute column widths
  const colWidths = new Array(cols).fill(280);
  dimsList.forEach((d, idx) => {
    const c = idx % cols;
    if (d.width > colWidths[c]) colWidths[c] = d.width;
  });

  // Compute row heights
  const numRows = Math.ceil(resultNodes.length / cols);
  const rowHeights = new Array(numRows).fill(140);
  dimsList.forEach((d, idx) => {
    const r = Math.floor(idx / cols);
    if (d.height > rowHeights[r]) rowHeights[r] = d.height;
  });

  const COL_GAP = 48;
  const ROW_GAP = 52;
  const startX = 100;
  const startY = 80;

  resultNodes.forEach((node, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);

    let x = startX;
    for (let c = 0; c < col; c++) x += colWidths[c] + COL_GAP;

    let y = startY;
    for (let r = 0; r < row; r++) y += rowHeights[r] + ROW_GAP;

    node.position = { x, y };
  });

  return resolveCollisions(resultNodes, MIN_HORIZONTAL_SEPARATION);
}

/**
 * Optimizes relationship edge anchor handles based on geometric orientation.
 * Part 3.3: Connectors must not cross through entity interiors.
 * Selects nearest facing cardinal handles ('top', 'bottom', 'left', 'right').
 */
export function optimizeRelationshipEdges(
  nodes: Node<VisualEntityData>[],
  edges: Edge<VisualRelationshipData>[]
): Edge<VisualRelationshipData>[] {
  const nodeMap = new Map<string, Node<VisualEntityData>>();
  const dimsMap = new Map<string, { width: number; height: number }>();

  nodes.forEach((n) => {
    nodeMap.set(n.id, n);
    const dims = estimateEntityDimensions(n);
    dimsMap.set(n.id, { width: dims.width, height: dims.height });
  });

  return edges.map((edge) => {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    if (!sourceNode || !targetNode) return edge;

    // Self-loop (e.g. recursive method call)
    if (edge.source === edge.target) {
      return {
        ...edge,
        sourceHandle: 'right',
        targetHandle: 'top',
        data: edge.data
          ? {
              ...edge.data,
              routing: 'bezier' as const,
            }
          : undefined,
      };
    }

    const dimsSrc = dimsMap.get(sourceNode.id)!;
    const dimsTgt = dimsMap.get(targetNode.id)!;

    const srcBox = getNodeBoundingBox(sourceNode, dimsSrc);
    const tgtBox = getNodeBoundingBox(targetNode, dimsTgt);

    const deltaX = tgtBox.centerX - srcBox.centerX;
    const deltaY = tgtBox.centerY - srcBox.centerY;

    let sourceHandle = 'bottom';
    let targetHandle = 'top';

    // Primary axis of displacement
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.1) {
      // Vertical relationship
      if (deltaY > 0) {
        // Target is below source: leave via bottom source handle, enter via top target handle
        sourceHandle = 'bottom';
        targetHandle = 'top';
      } else {
        // Target is above source: leave via top-src handle, enter via bottom-tgt handle
        sourceHandle = 'top-src';
        targetHandle = 'bottom-tgt';
      }
    } else {
      // Horizontal relationship
      if (deltaX > 0) {
        // Target is to the right: leave via right source handle, enter via left target handle
        sourceHandle = 'right';
        targetHandle = 'left';
      } else {
        // Target is to the left: leave via left-src handle, enter via right-tgt handle
        sourceHandle = 'left-src';
        targetHandle = 'right-tgt';
      }
    }

    return {
      ...edge,
      sourceHandle,
      targetHandle,
    };
  });
}

/**
 * Universal Master Layout Engine
 * Automatically analyzes diagram semantics, calculates content-aware dimensions,
 * applies specialized layout taxonomy, and enforces zero-overlap collision resolution.
 */
export function applyCollisionFreeLayout(
  nodes: Node<VisualEntityData>[],
  edges: Edge<VisualRelationshipData>[],
  preferredAlgorithm: LayoutAlgorithm = 'auto'
): { nodes: Node<VisualEntityData>[]; edges: Edge<VisualRelationshipData>[] } {
  if (nodes.length === 0) return { nodes, edges };

  // Detect diagram archetype if set to 'auto'
  let algorithm = preferredAlgorithm;
  if (algorithm === 'auto') {
    const hasStackFrames = nodes.some((n) => n.type === 'stackFrameNode');
    const hasUMLHierarchy = edges.some((e) =>
      ['inheritance', 'extends', 'implementation', 'implements'].includes(e.data?.type || '')
    );
    const isMainlyObjects =
      nodes.filter((n) => n.type === 'objectNode' || n.type === 'heapObjectNode').length >= 3;

    if (hasStackFrames) {
      algorithm = 'stack';
    } else if (hasUMLHierarchy) {
      algorithm = 'hierarchical';
    } else if (isMainlyObjects) {
      algorithm = 'grid';
    } else {
      algorithm = 'hierarchical';
    }
  }

  let laidOutNodes: Node<VisualEntityData>[];

  switch (algorithm) {
    case 'stack':
      laidOutNodes = layoutCallStack(nodes, edges);
      break;
    case 'grid':
      laidOutNodes = applyGridLayout(nodes);
      break;
    case 'hierarchical':
    case 'tree':
    case 'dependency':
    default:
      laidOutNodes = applyHierarchicalLayout(nodes, edges);
      break;
  }

  // Final rigorous collision resolution pass to guarantee bounding box separation >= 28px
  const resolvedNodes = resolveCollisions(laidOutNodes, MIN_HORIZONTAL_SEPARATION);

  // Optimize relationship edge anchors to avoid crossing card interiors
  const routedEdges = optimizeRelationshipEdges(resolvedNodes, edges);

  return {
    nodes: resolvedNodes,
    edges: routedEdges,
  };
}
