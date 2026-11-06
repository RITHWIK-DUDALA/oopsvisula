/**
 * connectorRouter.ts
 * 
 * Obstacle-aware connector routing engine for OOPS LAB.
 * Computes exact field-to-object reference connectors, anchor coordinates,
 * detects card bounding-box obstacles, and routes arrows around cards
 * with zero card interior crossings.
 */

export type MetaphorType =
  | 'factory-product'
  | 'vault-encapsulated'
  | 'chassis-inherited'
  | 'docked-composite'
  | 'record-crystal';

export const CARD_WIDTH = 340;

export interface CardRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  metaphorType?: MetaphorType;
}

export interface ExactFieldReference {
  id: string;
  sourceObjectId: string;
  sourceFieldName: string;
  sourceFieldIdx: number;
  destinationObjectId: string;
  connectorType: 'reference' | 'composition' | 'aggregation';
  isActive: boolean;
}

export interface RoutedConnector {
  id: string;
  sourceObjectId: string;
  sourceFieldName: string;
  sourceFieldIdx: number;
  destinationObjectId: string;
  connectorType: 'reference' | 'composition' | 'aggregation';
  sourceAnchor: { x: number; y: number };
  destinationAnchor: { x: number; y: number };
  isActive: boolean;
  color: string;
  pathD: string;
}

/**
 * Calculates the exact vertical center (Y) of a specific field row inside a card.
 * Aligns 1:1 with PhysicalMetaphorEntity DOM rendering:
 * - Header banner: 44px
 * - Invariant banner (Vault/Chassis): 36px
 * - Top body padding: 14px
 * - "Instance Registers" header: 21px
 * - Each field row: 40px (34px row height + 6px space-y margin)
 * - Row center: 17px
 */
export function getExactFieldRowCenterY(
  cardY: number,
  fieldIdx: number,
  metaphorType: MetaphorType = 'factory-product'
): number {
  const isVaultOrChassis = metaphorType === 'vault-encapsulated' || metaphorType === 'chassis-inherited';
  const invariantOffset = isVaultOrChassis ? 36 : 0;
  return cardY + 95 + invariantOffset + fieldIdx * 40 + 17;
}

/**
 * Tests whether a bounding box intersects a horizontal or diagonal corridor segment
 */
export function doesSegmentIntersectBox(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  box: { left: number; right: number; top: number; bottom: number }
): boolean {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  if (maxX <= box.left || minX >= box.right || maxY <= box.top || minY >= box.bottom) {
    return false;
  }
  return true;
}

/**
 * Generates an obstacle-free SVG path between sourceAnchor and destinationAnchor.
 * Avoids passing through any card rectangles in obstacleCards.
 */
export function routeObstacleFreeConnector(
  source: { x: number; y: number },
  dest: { x: number; y: number },
  sourceCard: CardRect,
  destCard: CardRect,
  allCards: CardRect[],
  laneIndex: number = 0
): string {
  const isTargetRight = dest.x >= source.x;
  const dx = Math.abs(dest.x - source.x);
  const dy = dest.y - source.y;

  // Obstacle cards (all cards except source and destination)
  const obstaclePadding = 18;
  const obstacles = allCards
    .filter(c => c.id !== sourceCard.id && c.id !== destCard.id)
    .map(c => ({
      left: c.x - obstaclePadding,
      right: c.x + c.width + obstaclePadding,
      top: c.y - obstaclePadding,
      bottom: c.y + c.height + obstaclePadding,
      raw: c,
    }));

  // Check if direct bezier would collide with any obstacle
  const directIntersects = obstacles.some(obs =>
    doesSegmentIntersectBox(source.x, source.y, dest.x, dest.y, obs)
  );

  // Case 1: Clear line of sight between columns with no intermediate obstacles
  if (!directIntersects && isTargetRight && dx >= 60) {
    const cx1 = source.x + Math.max(36, dx * 0.42);
    const cy1 = source.y;
    const cx2 = dest.x - Math.max(36, dx * 0.42);
    const cy2 = dest.y;
    return `M ${source.x} ${source.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${dest.x} ${dest.y}`;
  }

  // Case 2: Target is in the same column (above or below) or directly obstructed
  // Route through the dedicated vertical corridor between cards with multi-lane separation
  const laneOffset = (laneIndex % 5) * 12;
  const corridorX = isTargetRight
    ? source.x + 36 + laneOffset
    : source.x - 36 - laneOffset;

  // Check obstacles in the vertical travel corridor
  const corridorObstacles = obstacles.filter(obs =>
    corridorX >= obs.left && corridorX <= obs.right
  );

  let safeCorridorX = corridorX;
  if (corridorObstacles.length > 0) {
    // Shift corridor past the rightmost/leftmost obstacle
    if (isTargetRight) {
      safeCorridorX = Math.max(...corridorObstacles.map(o => o.right)) + 16 + laneOffset;
    } else {
      safeCorridorX = Math.min(...corridorObstacles.map(o => o.left)) - 16 - laneOffset;
    }
  }

  // Generate smooth orthogonal waypoint path with rounded bezier corners
  const radius = 14;

  // Waypoints: source -> safeCorridorX -> approach dest.y -> dest.x
  const dirY = dy >= 0 ? 1 : -1;
  const corner1Y = source.y;
  const corner2Y = dest.y;

  return [
    `M ${source.x} ${source.y}`,
    `H ${safeCorridorX - radius * (isTargetRight ? 1 : -1)}`,
    `Q ${safeCorridorX} ${corner1Y} ${safeCorridorX} ${corner1Y + radius * dirY}`,
    `V ${corner2Y - radius * dirY}`,
    `Q ${safeCorridorX} ${corner2Y} ${safeCorridorX + radius * (isTargetRight ? -1 : 1)} ${corner2Y}`,
    `H ${dest.x}`,
  ].join(' ');
}

/**
 * Builds the complete set of exact field-to-object reference connectors
 */
export function buildExactFieldConnectors(
  references: ExactFieldReference[],
  cardMap: Map<string, CardRect>,
  activeTetherAddress?: string | null
): RoutedConnector[] {
  const result: RoutedConnector[] = [];
  const incomingCountMap = new Map<string, number>();

  references.forEach((ref, idx) => {
    const sourceCard = cardMap.get(ref.sourceObjectId);
    const destCard = cardMap.get(ref.destinationObjectId);

    if (!sourceCard || !destCard) return;

    // Calculate exact source anchor from the specific field row
    const sourceY = getExactFieldRowCenterY(
      sourceCard.y,
      ref.sourceFieldIdx,
      sourceCard.metaphorType
    );

    // Track incoming index to stagger connector endpoints
    const incomingIdx = incomingCountMap.get(ref.destinationObjectId) || 0;
    incomingCountMap.set(ref.destinationObjectId, incomingIdx + 1);

    const isTargetRight = destCard.x >= sourceCard.x + CARD_WIDTH;
    const isTargetLeft = destCard.x + CARD_WIDTH <= sourceCard.x;

    let sourceX: number;
    let destX: number;

    if (isTargetLeft) {
      // Exit left, enter right
      sourceX = sourceCard.x;
      destX = destCard.x + CARD_WIDTH;
    } else if (isTargetRight) {
      // Exit right, enter left
      sourceX = sourceCard.x + CARD_WIDTH;
      destX = destCard.x;
    } else {
      // Stacked in same column: exit right, enter right with staggered port
      sourceX = sourceCard.x + CARD_WIDTH;
      destX = destCard.x + CARD_WIDTH;
    }

    // Stagger destination Y port to prevent overlapping arrowheads
    const destY = destCard.y + 26 + (incomingIdx % 4) * 16;

    const sourceAnchor = { x: sourceX, y: sourceY };
    const destinationAnchor = { x: destX, y: destY };

    const allCardsList = Array.from(cardMap.values());
    const pathD = routeObstacleFreeConnector(
      sourceAnchor,
      destinationAnchor,
      sourceCard,
      destCard,
      allCardsList,
      idx
    );

    const isActive = Boolean(
      ref.isActive ||
      activeTetherAddress === ref.sourceObjectId ||
      activeTetherAddress === ref.destinationObjectId
    );

    // Unified palette: Blue (#2864F0) for domain references, Teal (#089E9A) for collections, Amber (#D97706) for active
    let color = isActive ? '#D97706' : '#2864F0';
    if (!isActive && ref.connectorType === 'aggregation') {
      color = '#089E9A';
    }

    result.push({
      id: `exact-ref-${ref.sourceObjectId}-${ref.sourceFieldName}-${ref.destinationObjectId}`,
      sourceObjectId: ref.sourceObjectId,
      sourceFieldName: ref.sourceFieldName,
      sourceFieldIdx: ref.sourceFieldIdx,
      destinationObjectId: ref.destinationObjectId,
      connectorType: ref.connectorType,
      sourceAnchor,
      destinationAnchor,
      isActive,
      color,
      pathD,
    });
  });

  return result;
}
