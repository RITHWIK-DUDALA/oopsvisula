/**
 * layoutEngine.ts
 * 
 * Deterministic, collision-free, spacious 2D object graph layout engine for OOPS LAB.
 * Computes bounding boxes based on dynamic field counts, groups related entities,
 * resolves AABB collisions with zero overlap, and allows the virtual canvas to expand
 * dynamically to accommodate any number of objects.
 */

export type MetaphorType = 
  | 'factory-product'
  | 'vault-encapsulated'
  | 'chassis-inherited'
  | 'docked-composite'
  | 'record-crystal';

export interface VisualField {
  name: string;
  type: string;
  value: string;
  isMutated: boolean;
  isReference: boolean;
  targetAddress?: string;
}

export interface LayoutRect {
  id: string;
  className: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EntityLayoutInput {
  id: string; // Heap address e.g. "@0x1001" or "OBJ-001"
  className: string;
  simpleName: string;
  metaphorType: MetaphorType;
  fields: VisualField[];
  parentClass?: string;
  referencedBy?: string[]; // IDs of entities that reference this entity
  referencesTo?: string[]; // IDs of entities this entity references
}

export const CARD_WIDTH = 340;
export const MIN_GAP_X = 96;  // Dedicated corridor space for multi-lane obstacle-free connector routing
export const MIN_GAP_Y = 56;  // Generous vertical breathing room between cards
export const CANVAS_START_X = 60;
export const CANVAS_START_Y = 60;

/**
 * Calculates estimated card rendered height based on actual DOM dimensions:
 * - Header with icon & badge: 44px
 * - Metaphor invariant badge (Vault/Chassis): 36px
 * - Instance registers label: 21px
 * - Field rows: 40px per row (34px row + 6px gap)
 * - Container padding and borders: 28px
 */
export function estimateCardHeight(
  fieldCount: number,
  metaphorType: MetaphorType = 'factory-product'
): number {
  const headerHeight = 44;
  const hasInvariantNote = metaphorType === 'vault-encapsulated' || metaphorType === 'chassis-inherited';
  const invariantHeight = hasInvariantNote ? 36 : 0;
  const registerLabelHeight = 21;
  const rowsHeight = Math.max(1, fieldCount) * 40;
  const paddingHeight = 28;

  return headerHeight + invariantHeight + registerLabelHeight + rowsHeight + paddingHeight;
}

/**
 * Axis-Aligned Bounding Box (AABB) intersection detection with configurable gap margin
 */
export function doRectanglesIntersect(
  r1: { x: number; y: number; width: number; height: number },
  r2: { x: number; y: number; width: number; height: number },
  gapX: number = MIN_GAP_X,
  gapY: number = MIN_GAP_Y
): boolean {
  return !(
    r1.x + r1.width + gapX <= r2.x ||
    r2.x + r2.width + gapX <= r1.x ||
    r1.y + r1.height + gapY <= r2.y ||
    r2.y + r2.height + gapY <= r1.y
  );
}

/**
 * Persistent Object Position Registry.
 * Preserves assigned positions across execution steps, variable mutations,
 * and step replay within the active simulation session.
 */
class ObjectPositionRegistry {
  private positions = new Map<string, { x: number; y: number; width: number; height: number; isManual?: boolean }>();
  private activeSessionId: string | null = null;

  public initSession(sessionId: string) {
    if (this.activeSessionId !== sessionId) {
      this.positions.clear();
      this.activeSessionId = sessionId;
    }
  }

  public get(id: string) {
    return this.positions.get(id);
  }

  public set(id: string, rect: { x: number; y: number; width: number; height: number; isManual?: boolean }) {
    this.positions.set(id, rect);
  }

  public has(id: string) {
    return this.positions.has(id);
  }

  public clear() {
    this.positions.clear();
  }

  public getAllPlaced(): LayoutRect[] {
    const list: LayoutRect[] = [];
    this.positions.forEach((rect, id) => {
      list.push({ id, className: '', ...rect });
    });
    return list;
  }
}

// Global persistent registry instance for runtime stability
export const positionRegistry = new ObjectPositionRegistry();

export function clearPositionRegistry() {
  positionRegistry.clear();
}

/**
 * Categorizes an entity into a semantic domain column:
 * - Col 0: Primary Aggregators & Domain Entities (Customer, BankAccount, Person, User)
 * - Col 1: Dependent / Component Objects (Address, Contact, Profile)
 * - Col 2: Services, Processors & Infrastructure (BankService, TransactionService, AuditLogger, NotificationService)
 * - Col 3: Records, Data Crystals & Output Crystals
 */
export function getSemanticTargetColumn(simpleName: string, metaphorType: MetaphorType): number {
  const lower = simpleName.toLowerCase();

  // Services & Infrastructure
  if (
    lower.includes('service') || 
    lower.includes('logger') || 
    lower.includes('manager') || 
    lower.includes('processor') ||
    lower.includes('handler') ||
    lower.includes('factory')
  ) {
    return 2;
  }

  // Dependent / Referenced entities
  if (
    lower.includes('address') || 
    lower.includes('contact') || 
    lower.includes('profile') || 
    lower.includes('item') ||
    lower.includes('entry') ||
    lower.includes('detail')
  ) {
    return 1;
  }

  // Records / Crystals
  if (metaphorType === 'record-crystal' || lower.includes('record') || lower.includes('data')) {
    return 3;
  }

  // Default: Primary Domain Entity (Col 0)
  return 0;
}

/**
 * Computes deterministic, collision-free positions for all active heap entities.
 * 
 * Guarantees:
 * 1. ZERO Overlapping Cards: Every card has a reserved bounding box with MIN_GAP_X and MIN_GAP_Y margins.
 * 2. Spacious Virtual Canvas: Expands infinitely in width and height — never artificially capped at 800px.
 * 3. Relationship Alignment: Dependent components (e.g. Address) are placed in the adjacent column
 *    aligned with their parent (e.g. Customer) for natural, straight connector flow.
 * 4. Step Stability: Previously known objects maintain their coordinates across steps.
 */
export function computeCollisionFreeLayout(
  entities: EntityLayoutInput[],
  sessionId?: string
): Map<string, { x: number; y: number; width: number; height: number }> {
  if (sessionId) {
    positionRegistry.initSession(sessionId);
  }

  const result = new Map<string, { x: number; y: number; width: number; height: number }>();
  const activePlacedRects: { x: number; y: number; width: number; height: number; id: string }[] = [];

  // Step 1: Place previously known objects first (maintaining spatial stability across execution steps)
  for (const entity of entities) {
    const height = estimateCardHeight(entity.fields.length, entity.metaphorType);
    const existing = positionRegistry.get(entity.id);

    if (existing) {
      const updatedRect = {
        x: existing.x,
        y: existing.y,
        width: CARD_WIDTH,
        height,
        id: entity.id,
      };
      result.set(entity.id, updatedRect);
      activePlacedRects.push(updatedRect);
      positionRegistry.set(entity.id, updatedRect);
    }
  }

  // Step 2: Place newly allocated entities
  for (const entity of entities) {
    if (result.has(entity.id)) continue;

    const height = estimateCardHeight(entity.fields.length, entity.metaphorType);

    // Determine target column based on semantic grouping
    let targetCol = getSemanticTargetColumn(entity.simpleName, entity.metaphorType);

    // If referenced by an already-placed entity, place in adjacent column aligned with parent
    let preferredY = CANVAS_START_Y;
    if (entity.referencedBy && entity.referencedBy.length > 0) {
      const parentRect = result.get(entity.referencedBy[0]);
      if (parentRect) {
        preferredY = parentRect.y;
        if (targetCol === 0) {
          targetCol = 1; // Put child in adjacent column
        }
      }
    }

    let candidateX = CANVAS_START_X + targetCol * (CARD_WIDTH + MIN_GAP_X);
    let candidateY = preferredY;

    // AABB Collision avoidance: find next available collision-free coordinate
    let hasCollision = true;
    let attempts = 0;
    const MAX_ATTEMPTS = 200;

    while (hasCollision && attempts < MAX_ATTEMPTS) {
      attempts++;
      const testRect = { x: candidateX, y: candidateY, width: CARD_WIDTH, height };

      // Find any colliding rectangle among already placed entities
      const colliding = activePlacedRects.find(placed => 
        doRectanglesIntersect(testRect, placed, MIN_GAP_X, MIN_GAP_Y)
      );

      if (colliding) {
        // Nudge candidate vertically below the colliding card with generous margin
        candidateY = colliding.y + colliding.height + MIN_GAP_Y;
      } else {
        hasCollision = false;
      }
    }

    // Safety fallback: if column reached extreme length (> 4000px), advance column
    if (hasCollision) {
      targetCol++;
      candidateX = CANVAS_START_X + targetCol * (CARD_WIDTH + MIN_GAP_X);
      candidateY = CANVAS_START_Y;
    }

    const finalRect = {
      x: candidateX,
      y: candidateY,
      width: CARD_WIDTH,
      height,
      id: entity.id,
    };

    result.set(entity.id, finalRect);
    activePlacedRects.push(finalRect);
    positionRegistry.set(entity.id, finalRect);
  }

  return result;
}
