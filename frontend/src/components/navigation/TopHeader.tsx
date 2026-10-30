import React from 'react';
import { useLocation } from 'react-router-dom';
import { Command, LogIn, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  onOpenAuth: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAuth }) => {
  const location = useLocation();

  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Public Overview';
    const clean = path.replace('/', '');
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  return (
    <header className="h-14 bg-white border-b border-border px-6 flex items-center justify-between shrink-0">
      {/* Breadcrumbs / Page Context */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-muted-foreground">OOPS LAB</span>
        <span className="text-muted-foreground/60">/</span>
        <span className="font-medium text-foreground tracking-tight">
          {getBreadcrumbTitle()}
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Search trigger placeholder */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-xs text-muted-foreground bg-surface border border-border rounded-lg hover:border-foreground transition-colors"
        >
          <Command className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Quick Find...</span>
          <kbd className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border font-mono text-muted-foreground">Ctrl K</kbd>
        </button>

        {/* Guest Badge */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-muted-foreground bg-accent border border-border rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
          <span className="font-medium text-foreground">Guest Mode</span>
        </div>

        {/* Postponed Auth Entry Point */}
        <button
          onClick={onOpenAuth}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all"
        >
          <LogIn className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Sign In</span>
        </button>
      </div>
    </header>
  );
};

