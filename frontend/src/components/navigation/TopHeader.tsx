import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Command, LogIn, Sparkles, Menu, User, LogOut } from 'lucide-react';
import { useShellStore } from '@/app/store/shellStore';
import { useAuthStore } from '@/services/storage/authStore';

interface TopHeaderProps {
  onOpenAuth: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleMobileDrawer } = useShellStore();
  const { isAuthenticated, user, signOut } = useAuthStore();

  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Public Overview';
    const clean = path.replace('/', '');
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="h-14 bg-white border-b border-border px-4 sm:px-6 flex items-center justify-between shrink-0">
      {/* Left: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={toggleMobileDrawer}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="flex items-center space-x-2 text-xs sm:text-sm">
          <span className="text-muted-foreground hidden sm:inline">OOPS LAB</span>
          <span className="text-muted-foreground/60 hidden sm:inline">/</span>
          <span className="font-medium text-foreground tracking-tight">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Right: Action Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Search */}
        <button
          type="button"
          onClick={() => {}}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-xs text-muted-foreground bg-surface border border-border rounded-lg hover:border-foreground transition-colors"
        >
          <Command className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Quick Find...</span>
          <kbd className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono text-muted-foreground">
            Ctrl K
          </kbd>
        </button>

        {isAuthenticated && user ? (
          <>
            {/* Registered User Pill */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-foreground bg-surface border border-border rounded-lg">
              <User className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
              <span className="font-semibold">{user.name}</span>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out and return to landing page"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium border border-border bg-white text-muted-foreground hover:text-foreground hover:bg-surface rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        ) : (
          <>
            {/* Guest Badge */}
            <div className="flex items-center space-x-1.5 px-2 py-1 sm:px-2.5 sm:py-1 text-xs text-muted-foreground bg-accent border border-border rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
              <span className="font-medium text-foreground">Guest Mode</span>
            </div>

            {/* Sign In Entry Point */}
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium bg-foreground text-background rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all"
            >
              <LogIn className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Sign In</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
