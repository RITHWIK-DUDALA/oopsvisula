import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
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
  const [isAutoEntering, setIsAutoEntering] = useState(false);
  const [rememberPreference, setRememberPreference] = useState(false);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoTimer = () => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      clearAutoTimer();
      setIsScanning(true);
      setRevealedIndex(0);
      setDisplayedScore(0);
      setIsAutoEntering(false);
      return;
    }

    clearAutoTimer();
    const result = runSystemCompatibilityScan();
    setScanResult(result);
    setIsScanning(true);
    setRevealedIndex(0);
    setDisplayedScore(0);
    setIsAutoEntering(false);

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

              // Auto-proceed if scan result is 100%
              if (target === 100) {
                setIsAutoEntering(true);
                clearAutoTimer();
                autoTimerRef.current = setTimeout(() => {
                  handleProceed();
                }, 1100);
              }
            } else {
              setDisplayedScore(currentScore);
            }
          }, 20);
        }, 120);
      }
    }, 180);

    return () => {
      clearInterval(interval);
      clearAutoTimer();
    };
  }, [isOpen]);

  const handleProceed = () => {
    clearAutoTimer();
    if (rememberPreference) {
      try {
        localStorage.setItem('oops_skip_system_scan', 'true');
      } catch {
        // Safe storage fallback
      }
    }
    onProceed();
  };

  const handleClose = () => {
    clearAutoTimer();
    setIsAutoEntering(false);
    onClose();
  };

  const handleRescan = () => {
    clearAutoTimer();
    setIsAutoEntering(false);
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

              if (target === 100) {
                setIsAutoEntering(true);
                clearAutoTimer();
                autoTimerRef.current = setTimeout(() => {
                  handleProceed();
                }, 1100);
              }
            } else {
              setDisplayedScore(currentScore);
            }
          }, 20);
        }, 120);
      }
    }, 160);
  };

  if (!isOpen) return null;

  const totalChecks = scanResult?.checks.length || 5;
  const progressPercent = Math.min(100, Math.round((revealedIndex / totalChecks) * 100));
  const isOptimal = scanResult?.status === 'optimal';
  const isCompatible = scanResult?.status === 'compatible';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md select-none">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0"
        />

        {/* Translucent Frosted Glass Card (8pt Spacing Grid) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl lg:max-w-5xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.6)] rounded-2xl overflow-hidden flex flex-col text-[#111111] z-10"
        >
          {/* Top Laser Scanning Beam (Monochromatic) */}
          {isScanning && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#111111] to-transparent z-20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            />
          )}

          {/* Header (px-8 py-4 -> 32px / 16px, Translucent) */}
          <div className="px-8 py-4 border-b border-[#E5E7EB]/70 flex items-center justify-between bg-white/50 backdrop-blur-md relative">
            <div className="flex items-center space-x-4">
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
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5E7EB]/80 text-[#374151] font-semibold uppercase tracking-wider border border-[#E5E7EB]">
                    Java 21 JIT
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] font-normal leading-tight mt-1">
                  Verifying device capability for in-browser Java OOP simulation
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#6B7280] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#E5E7EB]/80">
                <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
                <span>
                  {isScanning
                    ? 'ANALYZING HOST'
                    : isAutoEntering
                    ? 'AUTO-LAUNCHING'
                    : 'DIAGNOSIS COMPLETE'}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-white/80 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Precision Animated Progress Bar */}
          <div className="w-full h-1 bg-[#F3F4F6]/70 relative overflow-hidden">
            <motion.div
              className="h-full bg-[#111111]"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />
          </div>

          {/* Stretched 2-Column Body Content (p-8, gap-8 -> 32px 8pt Grid) */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Capability Matrix (7 cols, space-y-4 -> 16px) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#6B7280] font-semibold">
                  Capability Matrix
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF]">
                  {Math.min(revealedIndex, totalChecks)} of {totalChecks} verified
                </span>
              </div>

              <div className="divide-y divide-[#F3F4F6]/70 border border-[#E5E7EB]/80 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-md shadow-2xs">
                {scanResult?.checks.map((check, index) => {
                  const isRevealed = index < revealedIndex;
                  const isCurrentlyScanning = isScanning && index === revealedIndex - 1;

                  return (
                    <motion.div
                      key={check.id}
                      initial={false}
                      animate={{
                        backgroundColor: isCurrentlyScanning
                          ? 'rgba(255, 255, 255, 0.95)'
                          : 'rgba(255, 255, 255, 0.45)',
                        opacity: isRevealed ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-3 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center space-x-4 min-w-0 pr-4">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isRevealed
                              ? 'bg-white text-[#111111] shadow-2xs border border-[#E5E7EB]/80'
                              : 'bg-transparent text-[#9CA3AF]'
                          }`}
                        >
                          {check.category === 'graphics' && (
                            <Layers className="w-4 h-4 stroke-[2]" />
                          )}
                          {check.category === 'engine' && (
                            <Cpu className="w-4 h-4 stroke-[2]" />
                          )}
                          {check.category === 'storage' && (
                            <HardDrive className="w-4 h-4 stroke-[2]" />
                          )}
                          {check.category === 'display' && (
                            <Monitor className="w-4 h-4 stroke-[2]" />
                          )}
                          {check.category === 'hardware' && (
                            <Sparkles className="w-4 h-4 stroke-[2]" />
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
                                <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-[#111111] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md font-semibold border border-[#E5E7EB] shadow-2xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>READY</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-[#4B5563] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md font-semibold border border-[#E5E7EB] shadow-2xs">
                                  <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>WARN</span>
                                </span>
                              )}
                            </motion.div>
                          ) : (
                            <span className="text-[11px] font-mono text-[#9CA3AF] flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-[#D1D5DB] animate-pulse" />
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

            {/* Right Column: Verdict Banner + Detected Topology + Preferences (5 cols, space-y-4 -> 16px) */}
            <div className="md:col-span-5 space-y-4">
              {/* Verdict Card with Frosted Glass & Auto-Enter Highlight */}
              <motion.div
                layout
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-4 relative overflow-hidden ${
                  isScanning
                    ? 'border-[#E5E7EB]/80 bg-white/50 backdrop-blur-md'
                    : isOptimal
                    ? 'border-[#D1D5DB]/90 bg-white/85 backdrop-blur-md shadow-xs'
                    : 'border-[#E5E7EB]/80 bg-white/60 backdrop-blur-md'
                }`}
              >
                {/* Scan Sweep Shimmer */}
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
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111111] flex items-center space-x-1.5">
                      {isAutoEntering && <Zap className="w-3 h-3 text-[#111111] animate-pulse" />}
                      <span>
                        {isScanning
                          ? `PROBING (${progressPercent}%)...`
                          : isAutoEntering
                          ? '100% READY — AUTO-LAUNCHING...'
                          : isOptimal
                          ? 'SYSTEM SUITABLE'
                          : isCompatible
                          ? 'SYSTEM COMPATIBLE'
                          : 'SYSTEM COMPATIBLE'}
                      </span>
                    </span>

                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-medium">
                      {isScanning ? `${progressPercent}%` : `${displayedScore}/100`}
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed mt-1">
                    {isScanning
                      ? 'Benchmarking WebGL 3D acceleration, AST parsing throughput, and memory isolation...'
                      : isAutoEntering
                      ? 'System is 100% verified. Transitioning directly into the learning workspace...'
                      : scanResult?.summary}
                  </p>
                </div>
              </motion.div>

              {/* Detected Machine Specs Grid (Frosted Glass Sub-Cards) */}
              <div className="p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-[#E5E7EB]/80 text-[11px] font-mono text-[#4B5563] space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">
                  <span>Detected Machine Topology</span>
                  <span className="text-[#111111] font-mono">Zero Cloud • 100% In-Browser</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white/75 backdrop-blur-sm rounded-lg border border-[#E5E7EB]/80 shadow-2xs">
                    <span className="text-[#9CA3AF] block text-[10px]">OPERATING SYSTEM</span>
                    <span className="font-semibold text-[#111111] truncate block mt-0.5">
                      {scanResult ? scanResult.deviceSpecs.os : 'Detecting...'}
                    </span>
                  </div>

                  <div className="p-2 bg-white/75 backdrop-blur-sm rounded-lg border border-[#E5E7EB]/80 shadow-2xs">
                    <span className="text-[#9CA3AF] block text-[10px]">BROWSER RUNTIME</span>
                    <span className="font-semibold text-[#111111] truncate block mt-0.5">
                      {scanResult ? scanResult.deviceSpecs.browser : 'Detecting...'}
                    </span>
                  </div>

                  <div className="p-2 bg-white/75 backdrop-blur-sm rounded-lg border border-[#E5E7EB]/80 shadow-2xs">
                    <span className="text-[#9CA3AF] block text-[10px]">VIEWPORT</span>
                    <span className="font-semibold text-[#111111] truncate block mt-0.5">
                      {scanResult ? scanResult.deviceSpecs.resolution : 'Detecting...'}
                    </span>
                  </div>

                  <div className="p-2 bg-white/75 backdrop-blur-sm rounded-lg border border-[#E5E7EB]/80 shadow-2xs">
                    <span className="text-[#9CA3AF] block text-[10px]">CPU THREADS</span>
                    <span className="font-semibold text-[#111111] truncate block mt-0.5">
                      {scanResult ? `${scanResult.deviceSpecs.cores} Cores` : 'Detecting...'}
                    </span>
                  </div>

                  <div className="p-2 bg-white/75 backdrop-blur-sm rounded-lg border border-[#E5E7EB]/80 shadow-2xs col-span-2">
                    <span className="text-[#9CA3AF] block text-[10px]">GRAPHICS ACCELERATION</span>
                    <span className="font-semibold text-[#111111] truncate block mt-0.5">
                      {scanResult ? scanResult.deviceSpecs.gpu : 'Detecting GPU...'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Remember Choice Checkbox */}
              <div className="flex items-center space-x-2 pt-1 px-1">
                <input
                  type="checkbox"
                  id="remember_scan"
                  checked={rememberPreference}
                  onChange={(e) => setRememberPreference(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D1D5DB] text-[#111111] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="remember_scan" className="text-xs text-[#6B7280] cursor-pointer select-none">
                  Don&apos;t scan again on this device (remember my suitability)
                </label>
              </div>
            </div>
          </div>

          {/* Footer Controls (Translucent Frosted Glass) */}
          <div className="px-8 py-4 border-t border-[#E5E7EB]/70 bg-white/60 backdrop-blur-md flex items-center justify-between">
            <button
              onClick={handleRescan}
              disabled={isScanning}
              className="text-xs font-mono text-[#6B7280] hover:text-[#111111] flex items-center space-x-2 transition-colors cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 stroke-[2] ${isScanning ? 'animate-spin' : ''}`} />
              <span>Rescan System</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] hover:text-[#111111] hover:bg-white/80 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                disabled={isScanning}
                className="group relative px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
              >
                {/* Subtle Button Shimmer Glow */}
                {!isScanning && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                  />
                )}
                <span>{isAutoEntering ? 'Launching Now...' : 'Enter Laboratory'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
