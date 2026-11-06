import { Node, Edge } from '@xyflow/react';
import { VisualEntityData, VisualRelationshipData } from '../types';
import {
  applyCollisionFreeLayout,
  resolveCollisions,
  optimizeRelationshipEdges,
  LayoutAlgorithm,
  hasOverlap,
  getNodeBoundingBox,
  MIN_HORIZONTAL_SEPARATION,
  MIN_VERTICAL_SEPARATION,
} from './collisionFreeLayoutEngine';

export type { LayoutAlgorithm };
export {
  applyCollisionFreeLayout,
  resolveCollisions,
  optimizeRelationshipEdges,
  hasOverlap,
  getNodeBoundingBox,
  MIN_HORIZONTAL_SEPARATION,
  MIN_VERTICAL_SEPARATION,
};

/**
 * Universal Auto-Layout Bridge
 * Applies content-aware sizing, topological layout, and collision resolution.
 */
export function applyAutoLayout(
  nodes: Node<VisualEntityData>[],
  edges: Edge<VisualRelationshipData>[],
  algorithm: LayoutAlgorithm = 'auto'
): { nodes: Node<VisualEntityData>[]; edges: Edge<VisualRelationshipData>[] } {
  return applyCollisionFreeLayout(nodes, edges, algorithm);
}
