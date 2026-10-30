export type FormationStage =
  | 'RING'
  | 'COMPRESSION'
  | 'DNA'
  | 'HORIZON'
  | 'BLACK_HOLE'
  | 'BURST'
  | 'GALAXY';

export interface ParticlePoint {
  x: number;
  y: number;
  z: number;
  color: [number, number, number]; // Normalized RGB 0..1
  size: number;
}

export interface FormationCoordinates {
  positions: Float32Array; // 3 floats per particle [x, y, z]
  colors: Float32Array;    // 3 floats per particle [r, g, b]
  sizes: Float32Array;     // 1 float per particle
}

export interface ScrollState {
  progress: number;        // 0.0 to 1.0
  activeStageIndex: number;// 0 to 6
  stageProgress: number;   // 0.0 to 1.0 within current stage
}

