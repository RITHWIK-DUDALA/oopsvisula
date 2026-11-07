import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Cpu,
  Layers,
  HardDrive,
  ArrowRight,
  X,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import {
  runSystemCompatibilityScan,
  type SystemCompatibilityResult,
} from '@/services/system/systemCompatibilityScanner';

interface SystemCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const SystemCompatibilityModal: React.FC<SystemCompatibilityModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState<SystemCompatibilityResult | null>(null);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [rememberPreference, setRememberPreference] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsScanning(true);
      setRevealedIndex(0);
      return;
    }

    // Run the detection
    const result = runSystemCompatibilityScan();
    setScanResult(result);
    setIsScanning(true);
    setRevealedIndex(0);

    // Stagger reveal of each check item for a polished high-tech scanning feel
    const checkCount = result.checks.length;
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < checkCount) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          return prev;
        }
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleProceed = () => {
    if (rememberPreference) {
      try {
        localStorage.setItem('oops_skip_system_scan', 'true');
      } catch {
        // Safe storage fallback
      }
    }
    onProceed();
  };

  const handleRescan = () => {
    setIsScanning(true);
    setRevealedIndex(0);
    const result = runSystemCompatibilityScan();
    setScanResult(result);

    const checkCount = result.checks.length;
    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < checkCount) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          return prev;
        }
      });
    }, 150);
  };

  if (!isOpen) return null;

  const isOptimal = scanResult?.status === 'optimal';
  const isCompatible = scanResult?.status === 'compatible';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[#111111]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111111] leading-tight">
                  System Suitability Scan
                </h2>
                <p className="text-xs text-[#6B7280] font-normal leading-tight mt-0.5">
                  Verifying device capability for in-browser Java 21 simulation
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-[#E5E7EB]/60 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Verdict Banner */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] flex items-start space-x-3.5">
              {isScanning ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#111111] border-t-transparent animate-spin shrink-0 mt-0.5" />
              ) : isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-[#111111] stroke-[2.2] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-[#4B5563] stroke-[2.2] shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111111]">
                    {isScanning
                      ? 'SCANNING ENVIRONMENT...'
                      : isOptimal
                      ? 'SYSTEM VERIFIED — 100% SUITABLE'
                      : isCompatible
                      ? 'SYSTEM VERIFIED — COMPATIBLE'
                      : 'SYSTEM COMPATIBLE WITH CAUTION'}
                  </span>
                  {!isScanning && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#111111] text-white font-medium">
                      {scanResult?.score}/100 Score
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {isScanning
                    ? 'Probing WebGL hardware acceleration, JavaScript AST compiler, and memory architecture...'
                    : scanResult?.summary}
                </p>
              </div>
            </div>

            {/* Checklist Matrix */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#6B7280] font-semibold px-1">
                Hardware & Software Capabilities
              </div>

              <div className="divide-y divide-[#F3F4F6] border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
                {scanResult?.checks.map((check, index) => {
                  const isRevealed = index < revealedIndex;
                  return (
                    <div
                      key={check.id}
                      className={`px-4 py-3 flex items-center justify-between text-xs transition-opacity duration-200 ${
                        isRevealed ? 'opacity-100' : 'opacity-25'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 pr-4">
                        {check.category === 'graphics' && (
                          <Layers className="w-4 h-4 text-[#4B5563] stroke-[2] shrink-0" />
                        )}
                        {check.category === 'engine' && (
                          <Cpu className="w-4 h-4 text-[#4B5563] stroke-[2] shrink-0" />
                        )}
                        {check.category === 'storage' && (
                          <HardDrive className="w-4 h-4 text-[#4B5563] stroke-[2] shrink-0" />
                        )}
                        {check.category === 'display' && (
                          <Monitor className="w-4 h-4 text-[#4B5563] stroke-[2] shrink-0" />
                        )}
                        {check.category === 'hardware' && (
                          <Sparkles className="w-4 h-4 text-[#4B5563] stroke-[2] shrink-0" />
                        )}

                        <div className="min-w-0">
                          <div className="font-medium text-[#111111] truncate">{check.name}</div>
                          <div className="text-[11px] text-[#6B7280] truncate mt-0.5">{check.detail}</div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isRevealed ? (
                          check.status === 'pass' ? (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#111111] bg-[#F3F4F6] px-2 py-0.5 rounded-md font-semibold">
                              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                              <span>READY</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#4B5563] bg-[#F3F4F6] px-2 py-0.5 rounded-md font-semibold">
                              <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                              <span>WARN</span>
                            </span>
                          )
                        ) : (
                          <span className="text-[11px] font-mono text-[#9CA3AF]">Checking...</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detected Machine Specs Pill Bar */}
            {scanResult && !isScanning && (
              <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] text-[11px] font-mono text-[#4B5563] space-y-1.5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">
                  Detected Machine Topology
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[#9CA3AF]">OS:</span>{' '}
                    <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.os}</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF]">Browser:</span>{' '}
                    <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.browser}</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF]">Display:</span>{' '}
                    <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.resolution}</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF]">CPU:</span>{' '}
                    <span className="font-semibold text-[#111111]">
                      {scanResult.deviceSpecs.cores} Cores
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#9CA3AF]">GPU:</span>{' '}
                    <span className="font-semibold text-[#111111] truncate inline-block max-w-[200px] align-bottom">
                      {scanResult.deviceSpecs.gpu}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Remember Choice Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember_scan"
                checked={rememberPreference}
                onChange={(e) => setRememberPreference(e.target.checked)}
                className="w-4 h-4 rounded border-[#D1D5DB] text-[#111111] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="remember_scan" className="text-xs text-[#6B7280] cursor-pointer">
                Don&apos;t scan again on this device (remember my suitability)
              </label>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between">
            <button
              onClick={handleRescan}
              disabled={isScanning}
              className="text-xs font-mono text-[#6B7280] hover:text-[#111111] flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 stroke-[2] ${isScanning ? 'animate-spin' : ''}`} />
              <span>Rescan System</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] hover:text-[#111111] hover:bg-[#E5E7EB]/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleProceed}
                disabled={isScanning}
                className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>Enter Laboratory</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
