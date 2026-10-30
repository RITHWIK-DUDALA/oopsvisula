import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { precomputedStages } from './particleFormations';

interface ParticleCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  isReducedMotion?: boolean;
}

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 targetPosition;
  attribute vec3 color;
  attribute vec3 targetColor;
  attribute float size;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Hermite cubic smoothing for organic transition between formations
    float t = smoothstep(0.0, 1.0, uProgress);
    vec3 mixedPos = mix(position, targetPosition, t);

    // Subtle organic breathing drift
    float drift = sin(uTime * 0.9 + mixedPos.y * 1.8) * 0.045;
    mixedPos.x += drift;
    mixedPos.y += cos(uTime * 0.7 + mixedPos.x * 1.5) * 0.045;
    mixedPos.z += sin(uTime * 0.6 + mixedPos.z * 1.4) * 0.04;

    vec4 mvPosition = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation based on depth
    gl_PointSize = size * uPixelRatio * (28.0 / -mvPosition.z);

    vColor = mix(color, targetColor, t);
    vAlpha = clamp(1.2 / (-mvPosition.z * 0.18), 0.35, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft radial circular falloff with illuminated filament glow
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float strength = pow(1.0 - (dist * 2.0), 1.7);
    vec3 glowColor = vColor * (1.0 + strength * 0.55);

    gl_FragColor = vec4(glowColor, strength * vAlpha);
  }
`;

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  scrollProgress,
  isReducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const currentStageRef = useRef<number>(-1);
  const animFrameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030205);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 100);
    camera.position.z = 7.5;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Geometry Buffers with stable particle count
    const geometry = new THREE.BufferGeometry();
    const stage0 = precomputedStages[0];
    const stage1 = precomputedStages[1];

    const posAttr = new THREE.BufferAttribute(new Float32Array(stage0.positions), 3);
    const targetPosAttr = new THREE.BufferAttribute(new Float32Array(stage1.positions), 3);
    const colorAttr = new THREE.BufferAttribute(new Float32Array(stage0.colors), 3);
    const targetColorAttr = new THREE.BufferAttribute(new Float32Array(stage1.colors), 3);
    const sizeAttr = new THREE.BufferAttribute(new Float32Array(stage0.sizes), 1);

    geometry.setAttribute('position', posAttr);
    geometry.setAttribute('targetPosition', targetPosAttr);
    geometry.setAttribute('color', colorAttr);
    geometry.setAttribute('targetColor', targetColorAttr);
    geometry.setAttribute('size', sizeAttr);
    geometryRef.current = geometry;
    currentStageRef.current = 0;

    // 4. Custom Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0.0 },
        uTime: { value: 0.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2.0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 5. Render Loop with time drift
    const render = () => {
      const elapsed = isReducedMotion ? 0 : clockRef.current.getElapsedTime();
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = elapsed;
      }
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      // Adjust camera distance for mobile portrait ratios
      if (w < 768) {
        camera.position.z = 9.2;
      } else {
        camera.position.z = 7.5;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (materialRef.current) {
        materialRef.current.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2.0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isReducedMotion]);

  // Update particle stage and interpolation progress on scroll
  useEffect(() => {
    if (!materialRef.current || !geometryRef.current) return;

    // Total 7 stages (0 through 6) across normalized 0.0 to 1.0
    // Stage intervals: 0: 0-0.166, 1: 0.166-0.333, 2: 0.333-0.5, 3: 0.5-0.666, 4: 0.666-0.833, 5: 0.833-1.0
    const totalTransitions = 6;
    const clampedProgress = Math.max(0, Math.min(0.9999, scrollProgress));
    const activeStage = Math.min(totalTransitions - 1, Math.floor(clampedProgress * totalTransitions));
    const nextStage = Math.min(totalTransitions, activeStage + 1);
    const stageT = (clampedProgress * totalTransitions) - activeStage;

    // If active stage bracket changed, update vertex attributes
    if (activeStage !== currentStageRef.current) {
      currentStageRef.current = activeStage;
      const from = precomputedStages[activeStage];
      const to = precomputedStages[nextStage];

      const pos = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
      const targetPos = geometryRef.current.getAttribute('targetPosition') as THREE.BufferAttribute;
      const col = geometryRef.current.getAttribute('color') as THREE.BufferAttribute;
      const targetCol = geometryRef.current.getAttribute('targetColor') as THREE.BufferAttribute;

      (pos.array as Float32Array).set(from.positions);
      (targetPos.array as Float32Array).set(to.positions);
      (col.array as Float32Array).set(from.colors);
      (targetCol.array as Float32Array).set(to.colors);

      pos.needsUpdate = true;
      targetPos.needsUpdate = true;
      col.needsUpdate = true;
      targetCol.needsUpdate = true;
    }

    materialRef.current.uniforms.uProgress.value = stageT;
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#030205]"
    />
  );
};
