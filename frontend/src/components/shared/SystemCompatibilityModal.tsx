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
  Activity,
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
  const [displayedScore, setDisplayedScore] = useState(0);
  const [rememberPreference, setRememberPreference] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsScanning(true);
      setRevealedIndex(0);
      setDisplayedScore(0);
      return;
    }

    const result = runSystemCompatibilityScan();
    setScanResult(result);
    setIsScanning(true);
    setRevealedIndex(0);
    setDisplayedScore(0);

    const checkCount = result.checks.length;
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx += 1;
      setRevealedIndex(currentIdx);

      if (currentIdx >= checkCount) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          // Animate score rollup smoothly
          const target = result.score;
          let currentScore = 0;
          const scoreStep = Math.max(1, Math.floor(target / 25));
          const scoreInterval = setInterval(() => {
            currentScore += scoreStep;
            if (currentScore >= target) {
              setDisplayedScore(target);
              clearInterval(scoreInterval);
            } else {
              setDisplayedScore(currentScore);
            }
          }, 20);
        }, 150);
      }
    }, 200);

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
    setDisplayedScore(0);
    const result = runSystemCompatibilityScan();
    setScanResult(result);

    const checkCount = result.checks.length;
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx += 1;
      setRevealedIndex(currentIdx);

      if (currentIdx >= checkCount) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          const target = result.score;
          let currentScore = 0;
          const scoreStep = Math.max(1, Math.floor(target / 25));
          const scoreInterval = setInterval(() => {
            currentScore += scoreStep;
            if (currentScore >= target) {
              setDisplayedScore(target);
              clearInterval(scoreInterval);
            } else {
              setDisplayedScore(currentScore);
            }
          }, 20);
        }, 150);
      }
    }, 180);
  };

  if (!isOpen) return null;

  const totalChecks = scanResult?.checks.length || 5;
  const progressPercent = Math.min(100, Math.round((revealedIndex / totalChecks) * 100));
  const isOptimal = scanResult?.status === 'optimal';
  const isCompatible = scanResult?.status === 'compatible';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs select-none">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col text-[#111111] z-10"
        >
          {/* Scanning Laser Beam (Monochromatic) */}
          {isScanning && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#111111] to-transparent z-20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            />
          )}

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA] relative">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />

                {/* Radar Sonar Ring Pulse */}
                {isScanning && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border border-[#111111]/30 pointer-events-none"
                    animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: 'easeOut' }}
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-[#111111] leading-tight">
                    System Suitability Scan
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5E7EB] text-[#374151] font-semibold uppercase tracking-wider">
                    Java 21 JIT
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] font-normal leading-tight mt-0.5">
                  Verifying device capability for in-browser Java OOP simulation
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

          {/* Precision Animated Progress Bar */}
          <div className="w-full h-1 bg-[#F3F4F6] relative overflow-hidden">
            <motion.div
              className="h-full bg-[#111111]"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Verdict Card with Spring Transition */}
            <motion.div
              layout
              className={`p-4 rounded-xl border transition-all duration-300 flex items-start space-x-3.5 relative overflow-hidden ${
                isScanning
                  ? 'border-[#E5E7EB] bg-[#F9FAFB]'
                  : isOptimal
                  ? 'border-[#D1D5DB] bg-white shadow-xs'
                  : 'border-[#E5E7EB] bg-[#F9FAFB]'
              }`}
            >
              {/* Scan Sweep Shimmer over Verdict Banner */}
              {isScanning && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                />
              )}

              {isScanning ? (
                <div className="relative w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#111111] stroke-[2.2] animate-pulse" />
                </div>
              ) : isOptimal ? (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                  className="shrink-0 mt-0.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#111111] stroke-[2.2]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="shrink-0 mt-0.5"
                >
                  <AlertTriangle className="w-5 h-5 text-[#4B5563] stroke-[2.2]" />
                </motion.div>
              )}

              <div className="space-y-1 min-w-0 flex-1 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111111]">
                    {isScanning
                      ? `PROBING HARDWARE ARCHITECTURE (${progressPercent}%)...`
                      : isOptimal
                      ? 'SYSTEM VERIFIED — 100% SUITABLE'
                      : isCompatible
                      ? 'SYSTEM VERIFIED — COMPATIBLE'
                      : 'SYSTEM COMPATIBLE WITH CAUTION'}
                  </span>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#111111] text-white font-medium">
                    {isScanning ? `${progressPercent}%` : `${displayedScore}/100`}
                  </span>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {isScanning
                    ? 'Benchmarking WebGL 3D acceleration, AST parsing throughput, and memory isolation...'
                    : scanResult?.summary}
                </p>
              </div>
            </motion.div>

            {/* Checklist Matrix with Sequential Spring Animation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#6B7280] font-semibold">
                  Capability Matrix
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF]">
                  {Math.min(revealedIndex, totalChecks)} of {totalChecks} verified
                </span>
              </div>

              <div className="divide-y divide-[#F3F4F6] border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-2xs">
                {scanResult?.checks.map((check, index) => {
                  const isRevealed = index < revealedIndex;
                  const isCurrentlyScanning = isScanning && index === revealedIndex - 1;

                  return (
                    <motion.div
                      key={check.id}
                      initial={false}
                      animate={{
                        backgroundColor: isCurrentlyScanning ? '#F9FAFB' : '#FFFFFF',
                        opacity: isRevealed ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-3 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0 pr-4">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isRevealed
                              ? 'bg-[#F3F4F6] text-[#111111]'
                              : 'bg-transparent text-[#9CA3AF]'
                          }`}
                        >
                          {check.category === 'graphics' && (
                            <Layers className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                          {check.category === 'engine' && (
                            <Cpu className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                          {check.category === 'storage' && (
                            <HardDrive className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                          {check.category === 'display' && (
                            <Monitor className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                          {check.category === 'hardware' && (
                            <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="font-medium text-[#111111] truncate">{check.name}</div>
                          <div className="text-[11px] text-[#6B7280] truncate mt-0.5">
                            {check.detail}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <AnimatePresence mode="wait">
                          {isRevealed ? (
                            <motion.div
                              key="ready"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              {check.status === 'pass' ? (
                                <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#111111] bg-[#F3F4F6] px-2.5 py-0.5 rounded-md font-semibold border border-[#E5E7EB]">
                                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                                  <span>READY</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#4B5563] bg-[#F3F4F6] px-2.5 py-0.5 rounded-md font-semibold border border-[#E5E7EB]">
                                  <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                                  <span>WARN</span>
                                </span>
                              )}
                            </motion.div>
                          ) : (
                            <span className="text-[11px] font-mono text-[#9CA3AF] flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] animate-pulse" />
                              <span>QUEUED</span>
                            </span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Detected Machine Specs Pill Bar with Smooth Slide-In */}
            <AnimatePresence>
              {scanResult && !isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="p-3.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] text-[11px] font-mono text-[#4B5563] space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">
                    <span>Detected Machine Topology</span>
                    <span className="text-[#111111] font-mono">Zero Cloud • 100% In-Browser</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block text-[10px]">OPERATING SYSTEM</span>
                      <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.os}</span>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block text-[10px]">BROWSER RUNTIME</span>
                      <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.browser}</span>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block text-[10px]">VIEWPORT</span>
                      <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.resolution}</span>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block text-[10px]">CPU CORES</span>
                      <span className="font-semibold text-[#111111]">{scanResult.deviceSpecs.cores} Logical Cores</span>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-[#E5E7EB] col-span-2">
                      <span className="text-[#9CA3AF] block text-[10px]">GRAPHICS ACCELERATION</span>
                      <span className="font-semibold text-[#111111] truncate block">
                        {scanResult.deviceSpecs.gpu}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember Choice Checkbox */}
            <div className="flex items-center space-x-2.5 pt-1">
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                disabled={isScanning}
                className="group relative px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
              >
                {/* Subtle Button Shimmer Glow */}
                {!isScanning && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                  />
                )}
                <span>Enter Laboratory</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
