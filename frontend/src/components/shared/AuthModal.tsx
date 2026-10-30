import React from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, title = "Authentication" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white border border-border rounded-xl shadow-2xl p-6 text-foreground animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-surface transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-foreground stroke-[1.5]" />
          </div>

          <span className="px-2.5 py-0.5 mb-2 text-xs font-medium tracking-wide uppercase bg-accent text-accent-foreground rounded-full border border-border">
            Coming Soon
          </span>

          <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Cloud authentication and multi-device account sync are currently scheduled for a future milestone. Guest learners have full, unrestricted access to all simulation tools, visualizers, and coding playgrounds.
          </p>

          <div className="w-full bg-surface border border-border rounded-lg p-3.5 mb-6 text-left flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-foreground shrink-0 mt-0.5 stroke-[1.5]" />
            <div className="text-xs text-muted-foreground leading-normal">
              <span className="font-semibold text-foreground block mb-0.5">Local Storage Active</span>
              Your practice solutions, custom class models, and workspace experiments are automatically persisted in your local browser storage.
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-black/90 active:scale-[0.99] transition-all"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

