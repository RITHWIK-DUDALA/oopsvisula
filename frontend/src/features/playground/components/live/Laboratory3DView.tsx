import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, ShieldCheck, Layers, Gem, Factory } from 'lucide-react';
import { VisualMetaphorModel, VisualEntity } from './useVisualMetaphorModel';

interface Laboratory3DViewProps {
  model: VisualMetaphorModel;
  onSelectEntity?: (address: string) => void;
  onJumpToSource?: (file: string, line: number) => void;
}

export const Laboratory3DView: React.FC<Laboratory3DViewProps> = ({
  model,
  onSelectEntity,
}) => {
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] select-none font-sans overflow-hidden">
      {/* Top 3D Control Bar */}
      <div className="absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-mono text-slate-500 font-semibold">
          3D SPATIAL LAB
        </span>
        <div className="h-3 w-px bg-slate-200" />
        <button
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="flex items-center space-x-1 text-[11px] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Camera</span>
        </button>
      </div>

      {/* R3F 3D Canvas */}
      <Canvas
        camera={{ position: [0, 8, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Studio Floor Grid */}
        <gridHelper args={[30, 30, '#94A3B8', '#E2E8F0']} position={[0, -0.01, 0]} />

        {/* 3D Allocation Bay Platform */}
        <mesh position={[-5, 0.1, 4]}>
          <cylinderGeometry args={[2, 2.2, 0.2, 32]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[-5, 0.22, 4]}>
          <cylinderGeometry args={[1.8, 1.8, 0.05, 32]} />
          <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={0.2} roughness={0.2} />
        </mesh>
        <Html position={[-5, 1.2, 4]} center>
          <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-blue-200 shadow-sm text-[10px] font-mono font-bold text-blue-900 flex items-center space-x-1 whitespace-nowrap">
            <Factory className="w-3 h-3 text-blue-600" />
            <span>Fabrication Bay</span>
          </div>
        </Html>

        {/* 3D Variable Reference Pedestals */}
        {model.tethers.filter(t => t.sourceType === 'stack').map((tether, idx) => {
          const pedX = -5;
          const pedZ = 1 - idx * 2;
          return (
            <group key={tether.id} position={[pedX, 0.5, pedZ]}>
              <mesh>
                <cylinderGeometry args={[0.5, 0.6, 1, 16]} />
                <meshStandardMaterial color="#F1F5F9" roughness={0.4} />
              </mesh>
              <Html position={[0, 0.9, 0]} center>
                <div 
                  className="px-2 py-0.5 rounded-lg border shadow-xs text-[10px] font-mono font-bold whitespace-nowrap bg-white text-slate-900"
                  style={{ borderColor: tether.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block mr-1" style={{ backgroundColor: tether.color }} />
                  {tether.sourceVarName}
                </div>
              </Html>
            </group>
          );
        })}

        {/* 3D Reference Tethers (Connecting Variable Pedestals to Object Anchors) */}
        {model.tethers.map((tether, idx) => {
          const targetEntity = model.entities.find(e => e.id === tether.targetAddress);
          if (!targetEntity) return null;

          const startX = -5;
          const startY = 1.0;
          const startZ = tether.sourceType === 'stack' ? 1 - idx * 2 : 4;

          const endX = targetEntity.pos3D[0];
          const endY = targetEntity.pos3D[1] + 1.2;
          const endZ = targetEntity.pos3D[2];

          const midX = (startX + endX) / 2;
          const midY = Math.max(startY, endY) + 1.5;
          const midZ = (startZ + endZ) / 2;

          return (
            <QuadraticBezierLine
              key={tether.id}
              start={[startX, startY, startZ]}
              end={[endX, endY, endZ]}
              mid={[midX, midY, midZ]}
              color={tether.color}
              lineWidth={tether.isActive ? 3 : 1.5}
              dashed={false}
            />
          );
        })}

        {/* 3D Physical Object Entities */}
        {model.entities.map((entity) => (
          <Entity3DMesh
            key={entity.id}
            entity={entity}
            onClick={() => onSelectEntity?.(entity.id)}
          />
        ))}

        {/* 3D Worker Drones */}
        {model.workers.map((worker) => (
          <group key={worker.threadId} position={[3 + worker.laneIndex * 1.5, 2.5, -2]}>
            <mesh>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial 
                color={worker.isCurrent ? '#06B6D4' : '#64748B'} 
                emissive={worker.isCurrent ? '#0891B2' : '#000000'}
                emissiveIntensity={worker.isCurrent ? 0.6 : 0}
              />
            </mesh>
            <Html position={[0, 0.6, 0]} center>
              <div className="bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded border border-cyan-200 text-[9px] font-mono text-cyan-950 font-bold whitespace-nowrap shadow-xs">
                {worker.name}
              </div>
            </Html>
          </group>
        ))}

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={3}
          maxDistance={35}
        />
      </Canvas>
    </div>
  );
};

interface Entity3DMeshProps {
  entity: VisualEntity;
  onClick: () => void;
}

const Entity3DMesh: React.FC<Entity3DMeshProps> = ({ entity, onClick }) => {
  const isVault = entity.metaphorType === 'vault-encapsulated';
  const isChassis = entity.metaphorType === 'chassis-inherited';
  const isRecord = entity.metaphorType === 'record-crystal';

  return (
    <group position={entity.pos3D} onClick={onClick}>
      {/* 1. Base Physical Pedestal */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 0.2, 32]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
      </mesh>

      {/* 2. Metaphor Specific Physical Body */}
      {isVault && (
        <group position={[0, 0.8, 0]}>
          {/* Internal Solid Core */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.4, 1.2, 1.4]} />
            <meshStandardMaterial color="#EFF6FF" roughness={0.2} metalness={0.2} />
          </mesh>
          {/* Protective Translucent Vault Dome */}
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial
              color="#3B82F6"
              transparent
              opacity={0.35}
              roughness={0.1}
              metalness={0.1}
              transmission={0.6}
              ior={1.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {isChassis && (
        <group position={[0, 0.8, 0]}>
          {/* Base Modular Chassis */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1.8, 0.6, 1.8]} />
            <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Extension Deck Module */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.3, 0.6, 1.3]} />
            <meshStandardMaterial color="#818CF8" roughness={0.2} metalness={0.2} />
          </mesh>
        </group>
      )}

      {isRecord && (
        <group position={[0, 0.9, 0]}>
          {/* Refractive Octahedral Crystal */}
          <mesh>
            <octahedronGeometry args={[1]} />
            <meshPhysicalMaterial
              color="#F59E0B"
              roughness={0.15}
              metalness={0.2}
              transmission={0.4}
              ior={1.6}
            />
          </mesh>
        </group>
      )}

      {!isVault && !isChassis && !isRecord && (
        <group position={[0, 0.8, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 1.3, 1.5]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.1} />
          </mesh>
        </group>
      )}

      {/* Floating 3D/HTML Tag */}
      <Html position={[0, 2.2, 0]} center distanceFactor={12}>
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-center cursor-pointer hover:scale-105 transition-transform min-w-[120px]">
          <div className="flex items-center justify-center space-x-1 text-slate-800 font-bold font-mono text-xs">
            {isVault && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
            {isChassis && <Layers className="w-3.5 h-3.5 text-indigo-600" />}
            {isRecord && <Gem className="w-3.5 h-3.5 text-amber-600" />}
            {!isVault && !isChassis && !isRecord && <Factory className="w-3.5 h-3.5 text-slate-600" />}
            <span>{entity.simpleName}</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            {entity.id}
          </div>

          {/* Quick Field Pills */}
          {entity.fields.length > 0 && (
            <div className="mt-1.5 pt-1 border-t border-slate-100 flex flex-wrap gap-1 justify-center max-w-[180px]">
              {entity.fields.slice(0, 3).map((f) => (
                <span
                  key={f.name}
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                    f.isMutated
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {f.name}: {f.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

