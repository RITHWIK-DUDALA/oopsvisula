/**
 * verify_stage2_layout.cjs
 * 
 * Comprehensive Automated Validation Suite for Stage 2:
 * 1. Collision detection between multiple Address & Customer objects (10+ objects)
 * 2. Dynamic card height estimation based on field count
 * 3. Position stability during step progression and backward replay
 * 4. Handling long Java expressions and reference values
 */

const {
  estimateCardHeight,
  doRectanglesIntersect,
  computeCollisionFreeLayout,
  positionRegistry,
  CARD_WIDTH,
  MIN_GAP_X,
  MIN_GAP_Y
} = require('../frontend/src/features/playground/components/live/layoutEngine.ts');

function runTests() {
  console.log('================================================================');
  console.log('  OOPS LAB — STAGE 2 LAYOUT & COLLISION TEST SUITE              ');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ ${message}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failed++;
    }
  }

  // TEST 1: Card Height Estimation
  console.log('[TEST 1] Dynamic Card Height Estimation...');
  const h1 = estimateCardHeight(1, 'factory-product');
  const h3 = estimateCardHeight(3, 'vault-encapsulated');
  const h6 = estimateCardHeight(6, 'chassis-inherited');

  assert(h1 > 0 && h3 > h1 && h6 > h3, `Card height scales monotonically with field count (h1=${h1}px, h3=${h3}px, h6=${h6}px)`);
  assert(estimateCardHeight(0, 'factory-product') > 100, 'Empty cards have adequate base height for header/registers');

  // TEST 2: 5 Customer + 5 Address Objects Collision Verification
  console.log('\n[TEST 2] 5 Customer + 5 Address Objects Collision Verification...');
  positionRegistry.clear();

  const mockEntities = [];

  // 5 Customer objects
  for (let i = 1; i <= 5; i++) {
    mockEntities.push({
      id: `@0x200${i}`,
      className: 'com.example.Customer',
      simpleName: 'Customer',
      metaphorType: 'vault-encapsulated',
      fields: [
        { name: 'id', type: 'String', value: `"C" + COUNTER.incrementAndGet()`, isMutated: true, isReference: false },
        { name: 'name', type: 'String', value: `"Customer_${i}"`, isMutated: false, isReference: false },
        { name: 'shippingAddress', type: 'Address', value: `@0x100${i}`, isMutated: false, isReference: true, targetAddress: `@0x100${i}` }
      ],
      referencesTo: [`@0x100${i}`],
      referencedBy: []
    });
  }

  // 5 Address objects
  for (let i = 1; i <= 5; i++) {
    mockEntities.push({
      id: `@0x100${i}`,
      className: 'com.example.Address',
      simpleName: 'Address',
      metaphorType: 'factory-product',
      fields: [
        { name: 'street', type: 'String', value: `"1234 Metropolis Way, Suite #${i}00"`, isMutated: false, isReference: false },
        { name: 'city', type: 'String', value: `"Metropolis"`, isMutated: false, isReference: false },
        { name: 'zipCode', type: 'int', value: `1000${i}`, isMutated: false, isReference: false }
      ],
      referencesTo: [],
      referencedBy: [`@0x200${i}`]
    });
  }

  const layout = computeCollisionFreeLayout(mockEntities);
  assert(layout.size === 10, 'All 10 objects received valid layout coordinates');

  // Pairwise collision test across all 10 cards
  let collisionCount = 0;
  const cards = Array.from(layout.values());

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const c1 = cards[i];
      const c2 = cards[j];

      // Test intersection
      const xOverlap = c1.x < c2.x + c2.width && c1.x + c1.width > c2.x;
      const yOverlap = c1.y < c2.y + c2.height && c1.y + c1.height > c2.y;

      if (xOverlap && yOverlap) {
        console.error(`COLLISION DETECTED between card ${c1.id} (${c1.x},${c1.y}) and ${c2.id} (${c2.x},${c2.y})!`);
        collisionCount++;
      }
    }
  }

  assert(collisionCount === 0, `Zero collisions detected among 10 runtime object cards (tested ${cards.length * (cards.length - 1) / 2} pairs)`);

  // TEST 3: Minimum Gap Verification
  console.log('\n[TEST 3] Minimum Separation Margin Enforcement...');
  let minGapViolations = 0;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const c1 = cards[i];
      const c2 = cards[j];

      // If in same column (similar x), vertical gap must be >= MIN_GAP_Y
      if (Math.abs(c1.x - c2.x) < 20) {
        const actualGapY = Math.abs(c1.y - c2.y) - (c1.y < c2.y ? c1.height : c2.height);
        if (actualGapY < MIN_GAP_Y - 1) {
          minGapViolations++;
        }
      }
    }
  }
  assert(minGapViolations === 0, 'Vertical separation margins strictly respect MIN_GAP_Y (40px)');

  // TEST 4: Position Stability During Execution Step Progression & Replay
  console.log('\n[TEST 4] Spatial Position Stability Across Steps...');
  const initialPositions = new Map();
  layout.forEach((pos, id) => {
    initialPositions.set(id, { x: pos.x, y: pos.y });
  });

  // Step 2: Mutate fields on existing Customer 1 & allocate a new Customer 6
  const step2Entities = [...mockEntities];
  step2Entities[0].fields[0].value = `"C" + COUNTER.incrementAndGet() + "_UPDATED"`;
  step2Entities[0].fields.push({ name: 'vipStatus', type: 'boolean', value: 'true', isMutated: true, isReference: false });

  // Add 11th entity
  step2Entities.push({
    id: '@0x2006',
    className: 'com.example.Customer',
    simpleName: 'Customer',
    metaphorType: 'vault-encapsulated',
    fields: [{ name: 'id', type: 'String', value: `"C999"`, isMutated: true, isReference: false }],
    referencesTo: [],
    referencedBy: []
  });

  const step2Layout = computeCollisionFreeLayout(step2Entities);
  assert(step2Layout.size === 11, 'Step 2 layout has 11 objects');

  let movedCount = 0;
  initialPositions.forEach((initialPos, id) => {
    const newPos = step2Layout.get(id);
    if (newPos.x !== initialPos.x || newPos.y !== initialPos.y) {
      movedCount++;
    }
  });

  assert(movedCount === 0, 'Existing 10 objects maintained strictly stable (x, y) coordinates when new object was allocated and fields mutated');

  // Step 3: Replay backward to Step 1 entities
  const replayLayout = computeCollisionFreeLayout(mockEntities);
  let replayMovedCount = 0;
  initialPositions.forEach((initialPos, id) => {
    const replayPos = replayLayout.get(id);
    if (replayPos.x !== initialPos.x || replayPos.y !== initialPos.y) {
      replayMovedCount++;
    }
  });

  assert(replayMovedCount === 0, 'Replay backward restored exact stable positions with zero spatial jumps');

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();

