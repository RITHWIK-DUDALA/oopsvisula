import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, validatePasswordStrength } from '@/services/storage/authStore';
import { LogoTraceLoader } from '@/components/LogoTraceLoader';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  initialMode?: 'signin' | 'signup';
  onContinueAsGuest?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Laboratory Authentication',
  initialMode = 'signin',
  onContinueAsGuest,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);
  const [authTarget, setAuthTarget] = useState<string>('/app/dashboard');
  const navigate = useNavigate();
  const { signIn, enterAsGuest } = useAuthStore();

  if (!isOpen) return null;

  const handleGuestEntry = () => {
    setErrorMessage(null);
    setAuthTarget('/app/concepts');
    setIsAuthenticating(true);
    setAuthComplete(false);
    setTimeout(() => {
      setAuthComplete(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email) return;

    if (authMode === 'signup' && password) {
      const pwCheck = validatePasswordStrength(password);
      if (!pwCheck.valid) {
        setErrorMessage(pwCheck.errors[0] || 'Password does not meet security requirements.');
        return;
      }
    }

    setAuthTarget('/app/dashboard');
    setIsAuthenticating(true);
    setAuthComplete(false);
    setTimeout(() => {
      setAuthComplete(true);
    }, 1200);
  };

  const handleAuthDone = () => {
    if (authTarget === '/app/dashboard') {
      const res = signIn(email);
      if (!res.success) {
        setIsAuthenticating(false);
        setAuthComplete(false);
        setErrorMessage(res.error || 'Authentication failed.');
        return;
      }
    } else {
      enterAsGuest();
    }
    setIsAuthenticating(false);
    setAuthComplete(false);
    onClose();
    if (onContinueAsGuest) {
      onContinueAsGuest();
    } else {
      navigate(authTarget);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-border rounded-2xl shadow-2xl p-6 text-foreground animate-in zoom-in-95 duration-150 overflow-hidden">
        {isAuthenticating && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 space-y-4 animate-in fade-in duration-200">
            <LogoTraceLoader
              loading={!authComplete}
              isComplete={authComplete}
              size={56}
              strokeWidth={2.5}
              loopDurationSeconds={1.2}
              fillFadeSeconds={0.35}
              className="text-foreground"
              onDone={handleAuthDone}
            />
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-foreground">
                {authTarget === '/dashboard' ? 'Authenticating Session...' : 'Preparing Guest Workspace...'}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                Java 21 JVM Laboratory
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-surface transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-foreground stroke-[1.5]" />
          </div>

          <h3 className="text-lg font-bold text-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Sign in to access your personal Learner Dashboard, cloud profile, and save persistent progress across devices.
          </p>

          {/* Mode Tabs */}
          <div className="w-full grid grid-cols-2 p-1 bg-surface border border-border rounded-lg mt-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`py-1.5 rounded-md transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-1.5 rounded-md transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground font-mono"
            />
          </div>

          {errorMessage && (
            <div className="p-2 text-[11px] rounded bg-red-50 border border-red-200 text-red-600 font-mono">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-2.5 px-4 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <span>{authMode === 'signin' ? 'Sign In & Open Dashboard' : 'Create Account & Open Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Guest Alternative Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
            <span className="bg-white px-2 text-muted-foreground">or continue as guest</span>
          </div>
        </div>

        {/* Primary Guest Entry Action */}
        <button
          type="button"
          onClick={handleGuestEntry}
          className="w-full py-2.5 px-4 border border-border bg-surface hover:bg-surface/80 text-foreground text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
        >
          <UserCheck className="w-4 h-4 stroke-[1.5]" />
          <span>Explore Laboratory as Guest (No Dashboard/Profile)</span>
        </button>

        {/* Note */}
        <div className="mt-4 pt-3 border-t border-border flex items-center space-x-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-foreground shrink-0 stroke-[1.5]" />
          <span>Guest mode grants immediate access to Playground, Visualizers, and Practice without an account.</span>
        </div>
      </div>
    </div>
  );
};
