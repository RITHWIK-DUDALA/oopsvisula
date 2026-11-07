import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  Upload,
  CheckCircle2,
  RotateCcw,
  Award,
  BookOpen,
  Clock,
  Cpu,
  ShieldAlert,
  Send,
  KeyRound,
  Code2,
  X,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useLearnerStore } from '@/services/storage/localStore';
import { useAuthStore } from '@/services/storage/authStore';
import { curriculumLessons } from '@/data/curriculumData';

interface CoolLockIconProps {
  size?: number;
  shake?: boolean;
  locked?: boolean;
  pulseRing?: boolean;
  className?: string;
}

const CoolLockIcon: React.FC<CoolLockIconProps> = ({
  size = 24,
  shake = false,
  locked = true,
  pulseRing = false,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Shockwave Radar Pulse Ring */}
      {pulseRing && (
        <motion.span
          key={`ring-${shake ? 'active' : 'idle'}`}
          className="absolute inset-0 rounded-2xl border border-[#D92638]/50 pointer-events-none"
          initial={{ scale: 0.85, opacity: 0.9 }}
          animate={{ scale: 1.55, opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        />
      )}

      {/* Main Animated Padlock Frame with Denial Shake Physics */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          shake
            ? {
                x: [0, -7, 7, -5, 5, -3, 3, -1, 1, 0],
                rotate: [0, -4, 4, -3, 3, -1.5, 1.5, 0],
              }
            : { x: 0, rotate: 0 }
        }
        transition={{ duration: 0.52, ease: [0.36, 0.07, 0.19, 0.97] }}
      >
        {/* Shackle: Physically springs open/closed with tactile damping */}
        <motion.path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          initial={false}
          animate={
            locked
              ? { y: 0, scaleY: 1 }
              : { y: -3.8, scaleY: 1.05 }
          }
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 18,
            mass: 0.7,
          }}
        />

        {/* Padlock Body */}
        <motion.rect
          x="4"
          y="11"
          width="16"
          height="10"
          rx="3"
          ry="3"
          animate={{
            scale: shake ? [1, 1.05, 0.97, 1] : 1,
          }}
          transition={{ duration: 0.35 }}
        />

        {/* Center Keyhole Core */}
        <circle cx="12" cy="15" r="1.3" fill="currentColor" />
        <path d="M12 16.3v1.7" strokeWidth="2.4" />
      </motion.svg>
    </div>
  );
};

export const ProgressPage: React.FC = () => {
  const {
    masteredTopics,
    solvedChallengeIds,
    simulationsRunCount,
    totalLabSeconds,
    exportSessionJson,
    importSessionJson,
    resetProgress,
  } = useLearnerStore();

  const { isAuthenticated, isGuest, user, signOut } = useAuthStore();
  const navigate = useNavigate();

  // Beta Request State
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  // Beta Sign-In Modal State
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [betaKey, setBetaKey] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Smooth Lock Animation State
  const [isCardLocked, setIsCardLocked] = useState(true);
  const [headerLockHovered, setHeaderLockHovered] = useState(false);
  const [modalShaking, setModalShaking] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // File import & notification state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('oops_beta_requests');
      if (existing) {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRequestSubmitted(true);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const totalLessons = curriculumLessons.length;
  const completionPercentage = Math.round((masteredTopics.length / totalLessons) * 100);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const handleExport = () => {
    const jsonStr = exportSessionJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oops-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('Progress backup downloaded as JSON');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importSessionJson(content);
      if (success) {
        showNotice('Session progress restored successfully');
      } else {
        showNotice('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleBetaRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestEmail.trim())) {
      setRequestError('Please provide a valid email address.');
      return;
    }

    try {
      const existing = localStorage.getItem('oops_beta_requests');
      const list = existing ? JSON.parse(existing) : [];
      if (!list.includes(requestEmail.trim())) {
        list.push(requestEmail.trim());
        localStorage.setItem('oops_beta_requests', JSON.stringify(list));
      }
    } catch {
      // Safe storage fallback
    }

    setRequestSubmitted(true);
  };

  const handleBetaLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setModalShaking(true);
    setIsCardLocked(true);
    setShakeKey((prev) => prev + 1);

    if (!loginEmail.trim() || !betaKey.trim()) {
      setLoginError('Both email and password are required.');
      setTimeout(() => setModalShaking(false), 550);
      return;
    }

    // For any combination of mail and password for now say "oops you are not a verified beta tester"
    setLoginError('Oops, you are not a verified beta tester.');
    setTimeout(() => setModalShaking(false), 550);
  };

  // If user is a guest or not authenticated, render the Protected Closed Beta Gate Screen
  if (!isAuthenticated || isGuest) {
    return (
      <div className="p-6 sm:p-12 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Beta Restriction Notice Card - Neutral Clean Card with Full-Card Lock Mechanism */}
        <motion.div
          animate={
            modalShaking
              ? {
                  x: [0, -12, 12, -9, 9, -5, 5, -2, 2, 0],
                  scale: [1, 0.993, 1.004, 1],
                }
              : { x: 0, scale: 1 }
          }
          transition={{ duration: 0.52, ease: [0.36, 0.07, 0.19, 0.97] }}
          className="relative bg-white border border-[#E5E7EB] rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] overflow-hidden text-[#111111]"
        >
          {/* Sweeping Laser Scan Line Across Entire Card */}
          <motion.div
            className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D92638]/50 to-transparent pointer-events-none z-20"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Full-Card Mechanical Vault Lock Shutter Bar */}
          <div className="relative w-full border-b border-[#E5E7EB] bg-[#F9FAFB]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between overflow-hidden">
            {/* Continuous Horizontal Scanning Light */}
            <motion.div
              className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-[#D92638]/15 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '800%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />

            {/* Left Mechanical Deadbolt Bar */}
            <div className="flex items-center space-x-3 flex-1 min-w-0 pr-4">
              <div className="h-1.5 flex-1 bg-[#E5E7EB] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#D92638]"
                  initial={false}
                  animate={{ width: isCardLocked ? '100%' : '15%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase hidden md:inline">
                VAULT SECURED
              </span>
            </div>

            {/* Center Hero Mechanical Vault Lock Hub */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setIsCardLocked((prev) => !prev);
                setModalShaking(true);
                setTimeout(() => setModalShaking(false), 520);
              }}
              className="relative px-4 sm:px-5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex items-center space-x-3 cursor-pointer shrink-0 group select-none"
              title="Click to engage/disengage card lock mechanism"
            >
              {/* Shockwave Radar Ring */}
              <motion.span
                className="absolute inset-0 rounded-xl border border-[#D92638]/40 pointer-events-none"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              />

              {/* Counter-rotating Gyro Dial + Padlock */}
              <div className="relative w-7 h-7 flex items-center justify-center text-[#D92638]">
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  className="absolute inset-0 text-[#E5E7EB]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    fill="none"
                  />
                </motion.svg>
                <CoolLockIcon size={18} locked={isCardLocked} shake={modalShaking} />
              </div>

              <div className="text-left">
                <div className="text-[11px] font-mono font-bold tracking-wider text-[#D92638] uppercase flex items-center space-x-1.5">
                  <span>{isCardLocked ? 'CARD LOCKED' : 'CARD UNLOCKED'}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCardLocked ? 'bg-[#D92638] animate-pulse' : 'bg-[#10B981]'}`} />
                </div>
                <div className="text-[10px] font-mono text-[#6B7280]">BATCH #03 ONLY</div>
              </div>
            </motion.div>

            {/* Right Mechanical Deadbolt Bar */}
            <div className="flex items-center space-x-3 flex-1 min-w-0 pl-4 justify-end">
              <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase hidden md:inline">
                256-BIT ISOLATION
              </span>
              <div className="h-1.5 flex-1 bg-[#E5E7EB] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#D92638]"
                  initial={false}
                  animate={{ width: isCardLocked ? '100%' : '15%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                />
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            {/* Top Badge Section */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                {/* Interactive Animated Padlock with Mechanical Spring Shackle */}
                <motion.div
                  onMouseEnter={() => setHeaderLockHovered(true)}
                  onMouseLeave={() => setHeaderLockHovered(false)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative w-12 h-12 rounded-2xl bg-[#F9FAFB] text-[#D92638] border border-[#E5E7EB] flex items-center justify-center shadow-xs shrink-0 cursor-pointer group"
                  title="Closed Beta - Click or hover to test lock mechanism"
                >
                  <CoolLockIcon
                    size={22}
                    locked={!headerLockHovered}
                    shake={false}
                    pulseRing={true}
                  />
                </motion.div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D92638] font-bold block">
                      Closed Beta Restricted Area
                    </span>
                    <span className="text-[11px] font-mono text-[#EA580C] font-semibold">• Testing Phase</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-0.5">
                    Learner <span className="text-[#D92638]">Progress</span> & <span className="text-[#075CF5]">Cloud Analytics</span>
                  </h1>
                </div>
              </div>

              {/* Neutral Container with Cobalt Blue Text */}
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F9FAFB] text-[#075CF5] border border-[#E5E7EB] uppercase tracking-wider">
                Batch #03 Testing Cohort
              </span>
            </div>

            {/* User Directive Notice - Neutral Card with Colored Text */}
            <div className="p-5 sm:p-6 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D92638]">
                <ShieldAlert className="w-4 h-4 stroke-[2.2] shrink-0" />
                <span>Restricted Access Specification</span>
              </div>
              <p className="text-sm text-[#374151] leading-relaxed">
                This mode is currently in <strong className="text-[#D92638]">beta testing</strong>. Only a selected <strong className="text-[#075CF5]">batch of people</strong> are granted access to this version and it is not ready for mass usage. Please <strong className="text-[#EA580C]">submit a request</strong> to receive an invite for the upcoming cohort.
              </p>
            </div>

            {/* Interactive Request Form / Submission Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Request Beta Access Invitation
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F9FAFB] text-[#EA580C] border border-[#E5E7EB] font-semibold">
                  Queue Open
                </span>
              </div>

              {requestSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-2xs space-y-2"
                >
                  <div className="flex items-center space-x-2.5 text-sm font-semibold text-[#075CF5]">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                    <span>Request Received & Queued</span>
                  </div>
                  <p className="text-xs text-[#374151] leading-relaxed">
                    Your request has been logged. Access is provisioned in <span className="text-[#075CF5] font-semibold">sequential cohorts</span>. You will receive an invitation access key once your <span className="text-[#EA580C] font-semibold">cohort slot</span> becomes active.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleBetaRequestSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    <input
                      type="email"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      placeholder="Enter your email to request beta invitation..."
                      className="flex-1 px-4 py-3 rounded-xl border border-[#D1D5DB] bg-white text-xs text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#075CF5] focus:ring-2 focus:ring-[#075CF5]/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs active:scale-98"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2]" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                  {requestError && (
                    <p className="text-xs text-[#D92638] font-mono font-medium">{requestError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Alternative Action Rows */}
            <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Cobalt Blue Text Link */}
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="text-xs font-mono font-semibold text-[#075CF5] hover:text-[#064ECC] hover:underline flex items-center space-x-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 stroke-[2]" />
                <span>Already have beta credentials? Sign in here</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/app/concepts')}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                >
                  Browse Concepts
                </button>

                {/* Neutral Button with Orange Text */}
                <button
                  onClick={() => navigate('/app/playground')}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#EA580C] text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer active:scale-98 shadow-2xs"
                >
                  <Code2 className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Open Playground</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beta Sign-In Modal */}
        <AnimatePresence>
          {isSignInModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md select-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSignInModalOpen(false)}
                className="absolute inset-0"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md bg-white border border-[#E5E7EB] shadow-2xl rounded-2xl overflow-hidden text-[#111111] z-10"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Animated Padlock Icon in Modal Header */}
                      <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] text-[#D92638] border border-[#E5E7EB] flex items-center justify-center shadow-xs">
                        <CoolLockIcon size={20} shake={modalShaking} locked={true} pulseRing={modalShaking} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#111111]">
                          Beta Access <span className="text-[#075CF5]">Sign In</span>
                        </h3>
                        <p className="text-xs text-[#6B7280]">Authorized tester authorization</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSignInModalOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>

                  {/* Neutral Card with Colored Text */}
                  <div className="p-3.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] text-xs text-[#4B5563] leading-relaxed">
                    <strong className="text-[#D92638]">Notice:</strong> This mode is currently in <span className="text-[#D92638] font-semibold">beta testing</span>. Only a <span className="text-[#075CF5] font-semibold">batch of people</span> are granted access to this version. Please <span className="text-[#EA580C] font-semibold">submit a request</span> if you have not been assigned an access key.
                  </div>

                  <form onSubmit={handleBetaLoginSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111111] block">Beta Tester Email</label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. beta@oopslab.dev"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] text-xs text-[#111111] focus:outline-none focus:border-[#075CF5] focus:ring-1 focus:ring-[#075CF5]/30 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111111] block">Beta Access Key / Password</label>
                      <input
                        type="password"
                        value={betaKey}
                        onChange={(e) => setBetaKey(e.target.value)}
                        placeholder="Enter your cohort invite token..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] text-xs text-[#111111] focus:outline-none focus:border-[#075CF5] focus:ring-1 focus:ring-[#075CF5]/30 transition-all"
                        required
                      />
                    </div>

                    {loginError && (
                      <motion.div
                        key={`error-${shakeKey}`}
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center space-x-3 text-xs text-[#D92638] font-medium shadow-2xs"
                      >
                        <div className="shrink-0 p-1.5 rounded-lg bg-white border border-[#E5E7EB] shadow-2xs flex items-center justify-center">
                          <CoolLockIcon size={18} shake={modalShaking} locked={true} pulseRing={modalShaking} />
                        </div>
                        <span className="leading-tight font-medium">{loginError}</span>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSignInModalOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        Authorize & Enter
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If user is authenticated and not a guest, render the full Progress Tracker with Color Highlights
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      {/* Toast Notice */}
      {notice && (
        <div className="p-3 bg-foreground text-background text-xs font-mono rounded-lg flex items-center justify-between shadow-xs">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="underline hover:opacity-80 cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Header with Authenticated Badge & Sign Out */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Analytics & History
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F9FAFB] text-[#075CF5] border border-[#E5E7EB] font-bold uppercase tracking-wider">
              BETA TESTER: {user?.email || 'Authorized'}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Learner <span className="text-[#D92638]">Progress</span> <span className="text-[#075CF5]">Tracker</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Locally persisted metrics, concept mastery milestones, and code experiment history.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Export Data</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-border bg-white text-xs font-medium rounded-lg hover:border-foreground transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Import Data</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset local progress?')) {
                resetProgress();
                showNotice('Progress reset to zero');
              }
            }}
            className="p-2 border border-border bg-white text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer"
            title="Reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              signOut();
              showNotice('Signed out of Progress beta session');
            }}
            className="p-2 border border-border bg-white text-muted-foreground hover:text-[#D92638] rounded-lg transition-colors cursor-pointer"
            title="Sign Out of Beta"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* High-Level Stat Cards - Clean Neutral Cards with Colored Metric Text */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cobalt Blue Text Accent (Overall Track) */}
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Overall Track</span>
            <BookOpen className="w-4 h-4 text-[#075CF5] stroke-[1.8]" />
          </div>
          <div className="text-2xl font-bold text-[#075CF5]">{completionPercentage}%</div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#075CF5] transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Card 2: Orange Text Accent (Practice Solved) */}
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Practice Solved</span>
            <Award className="w-4 h-4 text-[#EA580C] stroke-[1.8]" />
          </div>
          <div className="text-2xl font-bold text-[#EA580C]">{solvedChallengeIds.length} / 5</div>
          <div className="text-xs text-muted-foreground">Challenges verified</div>
        </div>

        {/* Card 3: Cherry Red Text Accent (Visual Traces) */}
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Visual Traces</span>
            <Cpu className="w-4 h-4 text-[#D92638] stroke-[1.8]" />
          </div>
          <div className="text-2xl font-bold text-[#D92638]">{simulationsRunCount}</div>
          <div className="text-xs text-muted-foreground">Snapshots executed</div>
        </div>

        {/* Card 4: Cobalt Blue Text Accent (Lab Time) */}
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Lab Time</span>
            <Clock className="w-4 h-4 text-[#075CF5] stroke-[1.8]" />
          </div>
          <div className="text-2xl font-bold text-foreground">{formatTime(totalLabSeconds)}</div>
          <div className="text-xs text-muted-foreground">Tracked in session</div>
        </div>
      </div>

      {/* Mastered Topics Checklist with Cobalt Blue Accents */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Curriculum Mastery Breakdown</h2>
          <span className="text-xs font-mono text-[#075CF5] font-semibold flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
            <span>{masteredTopics.length} Mastered</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {curriculumLessons.map((lesson) => {
            const mastered = masteredTopics.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="p-3 bg-surface/30 border border-border rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      mastered ? 'bg-[#075CF5]' : 'bg-muted-foreground/30'
                    }`}
                  />
                  <span className={`font-medium ${mastered ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {lesson.stepNumber}. {lesson.title}
                  </span>
                </div>
                {mastered && (
                  <CheckCircle2 className="w-4 h-4 text-[#075CF5] stroke-[2]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
