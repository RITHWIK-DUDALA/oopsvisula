import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Command, LogIn, Menu, User, LogOut } from 'lucide-react';
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
    <header className="h-[58px] bg-white border-b border-[#EAEAEA] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
      {/* Left: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={toggleMobileDrawer}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors"
        >
          <Menu className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="flex items-center space-x-2 text-xs sm:text-[13px] font-sans">
          <span className="text-[#999999] hidden sm:inline font-normal">OOPS LAB</span>
          <span className="text-[#D8D8D8] hidden sm:inline">/</span>
          <span className="font-semibold text-[#171717] tracking-tight">
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
          className="hidden md:flex items-center space-x-2 px-2.5 py-1.5 text-xs text-[#777777] bg-[#FAFAFA] border border-[#E8E8E8] rounded-md hover:border-[#171717] hover:text-[#171717] transition-colors"
        >
          <Command className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Quick Find</span>
          <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8E8E8] font-mono text-[#777777]">
            Ctrl K
          </kbd>
        </button>

        {isAuthenticated && user ? (
          <>
            {/* Registered User Pill */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-[#171717] bg-[#FAFAFA] border border-[#E8E8E8] rounded-md">
              <User className="w-3.5 h-3.5 text-[#171717] stroke-[1.5]" />
              <span className="font-semibold">{user.name}</span>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out and return to landing page"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium border border-[#E8E8E8] bg-white text-[#777777] hover:text-[#171717] hover:bg-[#FAFAFA] rounded-md transition-all"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        ) : (
          <>
            {/* Subdued Guest Mode Badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-[#666666] bg-[#FAFAFA] border border-[#E8E8E8] rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#777777] inline-block" />
              <span className="font-medium text-[#666666]">Guest Mode</span>
            </div>

            {/* Restrained Sign In Entry Point */}
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-[#171717] text-white rounded-md hover:bg-black/90 active:scale-[0.98] transition-all shadow-xs"
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
