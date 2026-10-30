import { FormationCoordinates } from '../types';

export const PARTICLE_COUNT = 18000;

// Deterministic Pseudo-Random Number Generator (PRNG) with stable seed
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pre-generated random seeds for each particle
const prng = mulberry32(133742);
const rndA = new Float32Array(PARTICLE_COUNT);
const rndB = new Float32Array(PARTICLE_COUNT);
const rndC = new Float32Array(PARTICLE_COUNT);
const rndD = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  rndA[i] = prng();
  rndB[i] = prng();
  rndC[i] = prng();
  rndD[i] = prng();
}

/**
 * Palette color interpolator based on spatial horizontal fraction t in [-1, 1]
 * -1.0 (far left)  -> Electric Blue (#347BFF / #6FA7FF)
 * -0.3 (mid left)  -> Violet (#9670FF)
 *  0.0 (center)    -> Pink / Magenta (#ED79D8)
 * +0.4 (mid right) -> Red (#FF5367)
 * +1.0 (far right) -> Orange-Red (#FF754A)
 */
function getParticleColor(t: number, noise: number): [number, number, number] {
  // Normalize t to 0..1 with slight spatial jitter
  const x = Math.max(0, Math.min(1, (t + 1) * 0.5 + (noise - 0.5) * 0.15));

  if (x < 0.25) {
    // Electric blue (#347BFF to #6FA7FF)
    const f = x / 0.25;
    return [0.204 + f * 0.231, 0.482 + f * 0.173, 1.0];
  } else if (x < 0.5) {
    // Blue to Violet (#6FA7FF to #9670FF)
    const f = (x - 0.25) / 0.25;
    return [0.435 + f * 0.153, 0.655 - f * 0.216, 1.0];
  } else if (x < 0.72) {
    // Violet to Pink (#9670FF to #ED79D8)
    const f = (x - 0.5) / 0.22;
    return [0.588 + f * 0.341, 0.439 + f * 0.036, 1.0 - f * 0.153];
  } else if (x < 0.88) {
    // Pink to Red (#ED79D8 to #FF5367)
    const f = (x - 0.72) / 0.16;
    return [0.929 + f * 0.071, 0.475 - f * 0.15, 0.847 - f * 0.443];
  } else {
    // Red to Orange-Red (#FF5367 to #FF754A)
    const f = (x - 0.88) / 0.12;
    return [1.0, 0.325 + f * 0.134, 0.404 - f * 0.114];
  }
}

/**
 * 1. Initial Hero Ring Formation
 * Horizontally centered, open dark center, flowing filament bands extending toward upper & lower bounds
 */
export function generateRingFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = rndA[i] * Math.PI * 2;
    // Ring radius with filament noise thickness
    const ringBase = 3.2;
    const filamentOffset = Math.sin(theta * 6 + rndB[i] * 3.14) * 0.35 + (rndC[i] - 0.5) * 0.65;
    const r = ringBase + filamentOffset;

    // Slight elliptical aspect ratio (wider horizontally on desktop)
    const x = r * Math.cos(theta) * 1.25;
    const y = r * Math.sin(theta);
    const z = (rndD[i] - 0.5) * 0.9;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const [cr, cg, cb] = getParticleColor(x / 4.0, rndB[i]);
    colors[i * 3] = cr;
    colors[i * 3 + 1] = cg;
    colors[i * 3 + 2] = cb;

    sizes[i] = 1.0 + rndC[i] * 2.2;
  }

  return { positions, colors, sizes };
}

/**
 * 2. Particle Compression Formation
 * Left & right move inward, waist narrows, vertical poles stretch
 */
export function generateCompressionFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = rndA[i] * Math.PI * 2;
    const r = 3.0 + (rndB[i] - 0.5) * 0.8;

    // Lateral pinch: x compressed by 55%, y elongated vertically
    const rawX = r * Math.cos(theta);
    const rawY = r * Math.sin(theta);

    // Pinch waist near y=0
    const waistFactor = 0.35 + 0.65 * Math.pow(Math.abs(rawY) / 3.0, 1.4);
    const x = rawX * 0.55 * waistFactor;
    const y = rawY * 1.35;
    const z = (rndD[i] - 0.5) * 1.1;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const [cr, cg, cb] = getParticleColor(rawX / 3.0, rndB[i]);
    colors[i * 3] = cr;
    colors[i * 3 + 1] = cg;
    colors[i * 3 + 2] = cb;

    sizes[i] = 1.2 + rndC[i] * 2.4;
  }

  return { positions, colors, sizes };
}

/**
 * 3. DNA / Hourglass Formation
 * Dual flowing twisted vertical helical paths with narrow central waist
 */
export function generateDnaFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Height y distributed from -4.5 to +4.5
    const yNorm = rndA[i] * 2.0 - 1.0; // -1..1
    const y = yNorm * 4.4;

    // Two strands determined by even/odd index
    const strand = i % 2 === 0 ? 0 : Math.PI;
    const twist = yNorm * Math.PI * 2.5 + strand;

    // Waist narrows at center (yNorm=0) and expands at poles
    const waist = 0.45 + Math.pow(Math.abs(yNorm), 1.6) * 1.65;
    const filamentJitter = (rndB[i] - 0.5) * 0.4;
    const r = waist + filamentJitter;

    const x = r * Math.cos(twist);
    const z = r * Math.sin(twist);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Blue on left strand / red on right strand
    const t = strand === 0 ? -0.7 : 0.7;
    const [cr, cg, cb] = getParticleColor(t, rndC[i]);
    colors[i * 3] = cr;
    colors[i * 3 + 1] = cg;
    colors[i * 3 + 2] = cb;

    sizes[i] = 1.3 + rndD[i] * 2.5;
  }

  return { positions, colors, sizes };
}

/**
 * 4. Horizontal Particle Horizon
 * Wide horizontal energy ridge spanning full width, glowing central transition, negative space above
 */
export function generateHorizonFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Wide horizontal span x in [-6.5, 6.5]
    const x = (rndA[i] * 2.0 - 1.0) * 6.5;

    // Energy ridge centered slightly below middle (y ~ -0.4)
    // Ridge elevation decays toward the edges
    const ridgeProfile = Math.exp(-Math.pow(x / 4.0, 2)) * 0.5;
    const verticalSpread = Math.pow(rndB[i], 2.2) * 2.2; // denser near ridge, trailing below
    const y = -0.5 + ridgeProfile - verticalSpread + (rndC[i] - 0.5) * 0.35;
    const z = (rndD[i] - 0.5) * 1.4;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const [cr, cg, cb] = getParticleColor(x / 5.5, rndB[i]);
    colors[i * 3] = cr;
    colors[i * 3 + 1] = cg;
    colors[i * 3 + 2] = cb;

    // Brighter & larger particles on the energy crest
    const onCrest = Math.abs(y - (-0.5 + ridgeProfile)) < 0.25;
    sizes[i] = onCrest ? 2.2 + rndC[i] * 2.8 : 0.9 + rndC[i] * 1.5;
  }

  return { positions, colors, sizes };
}

/**
 * 5. Black-Hole Particle Field
 * Particles curve around a dark central void (radius ~1.5) with soft gravitational halo
 */
export function generateBlackHoleFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = rndA[i] * Math.PI * 2;
    // Radial distribution: Void region from 0 to 1.4, dense halo from 1.4 to 2.8, diffuse out to 5.5
    const innerVoidRadius = 1.45;
    const r = innerVoidRadius + Math.pow(rndB[i], 1.5) * 3.8;

    // Orbital distortion: particles curve in swirling streamlines
    const swirl = theta + 1.2 / (r + 0.3);
    const x = r * Math.cos(swirl) * 1.25;
    const y = r * Math.sin(swirl);
    const z = (rndD[i] - 0.5) * 1.2;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Halo region gets boosted pink/violet accents near the event horizon
    const nearHorizon = r < 2.0;
    const [cr, cg, cb] = getParticleColor(x / 4.5, rndC[i]);
    if (nearHorizon) {
      // Infuse vibrant violet/pink halo
      colors[i * 3] = Math.min(1.0, cr * 1.2 + 0.2);
      colors[i * 3 + 1] = Math.min(1.0, cg * 1.1 + 0.1);
      colors[i * 3 + 2] = Math.min(1.0, cb * 1.2 + 0.3);
    } else {
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }

    sizes[i] = nearHorizon ? 2.4 + rndC[i] * 2.6 : 1.0 + rndC[i] * 1.8;
  }

  return { positions, colors, sizes };
}

/**
 * 6. Energy Burst Formation
 * Dark center ignites with glowing white/pink core; particles accelerate radially outward
 */
export function generateBurstFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = rndA[i] * Math.PI * 2;
    // Radial explosion velocity: dense center expanding to large radius
    const r = Math.pow(rndB[i], 0.7) * 5.8;

    const x = r * Math.cos(theta) * 1.15;
    const y = r * Math.sin(theta);
    const z = (rndC[i] - 0.5) * (r * 0.45);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Core particles (< 1.0) turn bright white-pink
    const isCore = r < 1.1;
    if (isCore) {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.85 + rndD[i] * 0.15;
      colors[i * 3 + 2] = 0.95 + rndD[i] * 0.05;
      sizes[i] = 3.0 + rndC[i] * 3.5;
    } else {
      const [cr, cg, cb] = getParticleColor(x / 4.5, rndD[i]);
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
      sizes[i] = 1.2 + rndC[i] * 2.2;
    }
  }

  return { positions, colors, sizes };
}

/**
 * 7. Orbital Galaxy / Ecosystem Formation
 * Broad horizontal disc with bright core and multi-filament logarithmic spiral arms
 */
export function generateGalaxyFormation(): FormationCoordinates {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // 2 primary logarithmic spiral arms
    const armIndex = i % 2;
    const armAngleOffset = armIndex * Math.PI;

    const distNorm = Math.pow(rndA[i], 0.85); // 0..1
    const r = 0.3 + distNorm * 5.2;

    // Logarithmic spiral angle theta = b * ln(r)
    const spiralAngle = armAngleOffset + 2.4 * Math.log(r + 0.5);
    // Filament thickness noise
    const armWidth = 0.2 + distNorm * 0.65;
    const theta = spiralAngle + (rndB[i] - 0.5) * armWidth;

    // Tilted disc (inclined ~ 65 degrees toward camera)
    const discX = r * Math.cos(theta) * 1.35;
    const discY = r * Math.sin(theta) * 0.42; // compressed vertical perspective
    const discZ = (rndC[i] - 0.5) * 0.65;

    positions[i * 3] = discX;
    positions[i * 3 + 1] = discY;
    positions[i * 3 + 2] = discZ;

    // Bright core in center, blue on left, red/orange on right
    if (r < 0.9) {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 0.98;
      sizes[i] = 2.8 + rndD[i] * 3.0;
    } else {
      const [cr, cg, cb] = getParticleColor(discX / 5.0, rndC[i]);
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
      sizes[i] = 1.1 + rndD[i] * 2.0;
    }
  }

  return { positions, colors, sizes };
}

// Master precomputed cache for all 7 stages
export const precomputedStages = [
  generateRingFormation(),
  generateCompressionFormation(),
  generateDnaFormation(),
  generateHorizonFormation(),
  generateBlackHoleFormation(),
  generateBurstFormation(),
  generateGalaxyFormation(),
];

