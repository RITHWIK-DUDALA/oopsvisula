import React, { useRef, useEffect, useState } from 'react';

export interface AeroShardsProps {
  shardColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  lightMode?: boolean;
  placement?: 'full' | 'left' | 'right' | 'center';
  material?: 'glass' | 'chrome' | 'satin' | 'pearl';
  markers?: 'none' | 'dots' | 'crosses';
  count?: number;
  depthOfField?: number;
  glow?: number;
  grain?: number;
  vignette?: number;
  intro?: boolean;
  mouseInteraction?: boolean;
  pulseOnClick?: boolean;
  holdToGather?: boolean;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Shard3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  aspect: number;
  foldAngle: number;
  alpha: number;
  isAccent: boolean;
}

export const AeroShards: React.FC<AeroShardsProps> = ({
  shardColor = '#075CF5',
  accentColor = '#FF8500',
  backgroundColor = 'transparent',
  lightMode = true,
  placement: _placement = 'full',
  material: _material = 'glass',
  markers: _markers = 'none',
  count = 550,
  depthOfField = 0.45,
  glow = 0.18,
  grain: _grain = 0,
  vignette: _vignette = 0.1,
  intro: _intro = true,
  mouseInteraction: _mouseInteraction = false,
  pulseOnClick: _pulseOnClick = false,
  holdToGather: _holdToGather = false,
  paused = false,
  dpr = 1,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [renderMode, setRenderMode] = useState<'canvas' | 'css-fallback'>('canvas');

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRenderMode('css-fallback');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setRenderMode('css-fallback');
      return;
    }

    let animationFrameId: number;
    let isDestroyed = false;

    // Parse hex colors to RGB components for dynamic alpha blending
    const hexToRgb = (hex: string, fallback: { r: number; g: number; b: number }) => {
      const clean = hex.replace('#', '');
      if (clean.length === 6) {
        return {
          r: parseInt(clean.substring(0, 2), 16),
          g: parseInt(clean.substring(2, 4), 16),
          b: parseInt(clean.substring(4, 6), 16),
        };
      }
      return fallback;
    };

    const shardRgb = hexToRgb(shardColor, { r: 7, g: 92, b: 245 });
    const accentRgb = hexToRgb(accentColor, { r: 255, g: 133, b: 0 });

    let width = 0;
    let height = 0;

    const updateSize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = Math.max(rect.width, 100);
      height = Math.max(rect.height, 100);

      const effectiveDpr = Math.min(window.devicePixelRatio || 1, dpr || 1);
      canvas.width = Math.floor(width * effectiveDpr);
      canvas.height = Math.floor(height * effectiveDpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(effectiveDpr, effectiveDpr);
    };

    updateSize();

    // Generate folded 3D glass shards
    const shards: Shard3D[] = [];
    const shardCount = Math.min(Math.max(count, 100), 800);

    for (let i = 0; i < shardCount; i++) {
      shards.push({
        x: Math.random() * (width + 200) - 100,
        y: Math.random() * (height + 100) - 50,
        z: Math.random() * 200 - 100, // -100 to 100 depth
        vx: 1.2 + Math.random() * 2.5, // Horizontal drift sweep
        vy: (Math.random() - 0.5) * 0.4,
        size: 7 + Math.random() * 16,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.04,
        vRotY: (Math.random() - 0.5) * 0.05,
        vRotZ: (Math.random() - 0.5) * 0.03,
        aspect: 0.35 + Math.random() * 0.5,
        foldAngle: 0.2 + Math.random() * 0.4,
        alpha: 0.35 + Math.random() * 0.45,
        isAccent: Math.random() < 0.18, // 18% accent shards for refined orange highlights
      });
    }

    let time = 0;

    const render = () => {
      if (isDestroyed) return;

      if (!paused) {
        time += 0.016;
      }

      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Sort shards by depth for realistic glass layering
      shards.sort((a, b) => a.z - b.z);

      // Light direction vector (normalized)
      const lx = 0.577;
      const ly = -0.577;
      const lz = 0.577;

      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];

        if (!paused) {
          s.x += s.vx;
          s.y += s.vy + Math.sin(time * 2 + s.x * 0.01) * 0.3;
          s.rotX += s.vRotX;
          s.rotY += s.vRotY;
          s.rotZ += s.vRotZ;

          // Wrap horizontally around container
          if (s.x > width + 100) {
            s.x = -100;
            s.y = Math.random() * height;
          }
        }

        // Depth perspective calculation
        const fov = 350;
        const scale = fov / (fov + s.z);
        const px = s.x;
        const py = s.y;
        const currentSize = s.size * scale;

        // Depth of field softness factor
        const dofDist = Math.abs(s.z) / 100;
        const blurAlpha = Math.max(0.15, 1 - dofDist * depthOfField * 0.8);

        // Rotation matrix components for facet normal calculation
        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);
        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);

        // Facet 1 Normal
        const n1x = sinY * cosX;
        const n1y = -sinX;
        const n1z = cosY * cosX;
        const diff1 = Math.max(0.15, Math.min(1, n1x * lx + n1y * ly + n1z * lz));

        // Facet 2 Normal (with fold angle)
        const n2x = Math.sin(s.rotY + s.foldAngle) * cosX;
        const n2y = -sinX;
        const n2z = Math.cos(s.rotY + s.foldAngle) * cosX;
        const diff2 = Math.max(0.15, Math.min(1, n2x * lx + n2y * ly + n2z * lz));

        const baseColor = s.isAccent ? accentRgb : shardRgb;
        const effectiveAlpha = s.alpha * blurAlpha;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(s.rotZ);

        // Folded Glass Shard Geometry:
        // Vertex A: (-w/2, -h/2), Vertex B: (0, 0) [central fold], Vertex C: (w/2, -h/2), Vertex D: (0, h/2)
        const halfW = (currentSize * s.aspect) / 2;
        const halfH = currentSize / 2;

        // Facet 1 (Left Wing)
        ctx.beginPath();
        ctx.moveTo(-halfW, -halfH);
        ctx.lineTo(0, -halfH * 0.4);
        ctx.lineTo(0, halfH);
        ctx.closePath();

        const alpha1 = Math.min(1, effectiveAlpha * (0.4 + diff1 * 0.6));
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha1})`;
        ctx.fill();

        // Facet 2 (Right Wing)
        ctx.beginPath();
        ctx.moveTo(halfW, -halfH);
        ctx.lineTo(0, -halfH * 0.4);
        ctx.lineTo(0, halfH);
        ctx.closePath();

        const alpha2 = Math.min(1, effectiveAlpha * (0.3 + diff2 * 0.7));
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha2})`;
        ctx.fill();

        // Glass Edge Specular Highlight (Rim lighting)
        ctx.beginPath();
        ctx.moveTo(-halfW, -halfH);
        ctx.lineTo(0, -halfH * 0.4);
        ctx.lineTo(halfW, -halfH);
        ctx.strokeStyle = s.isAccent
          ? `rgba(255, 180, 80, ${Math.min(1, alpha1 + 0.35)})`
          : `rgba(180, 210, 255, ${Math.min(1, alpha2 + 0.3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Subtle Central Crease Fold Line
        ctx.beginPath();
        ctx.moveTo(0, -halfH * 0.4);
        ctx.lineTo(0, halfH);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.6, effectiveAlpha + 0.2)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    shardColor,
    accentColor,
    backgroundColor,
    lightMode,
    count,
    depthOfField,
    glow,
    paused,
    dpr,
  ]);

  if (renderMode === 'css-fallback') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative overflow-hidden pointer-events-none select-none ${className}`}
        style={{ ...style }}
      >
        <div
          className="absolute inset-0 animate-pulse pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(7,92,245,0.12) 35%, rgba(255,133,0,0.18) 50%, rgba(7,92,245,0.12) 65%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ ...style }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default AeroShards;
