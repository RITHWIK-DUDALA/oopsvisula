import React from 'react';
import { UserCheck, ArrowRight, Search, Code2 } from 'lucide-react';

interface LandingHeaderProps {
  onEnterAsGuest: () => void;
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onOpenSearch?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onEnterAsGuest,
  onSmoothScroll,
  onOpenSearch,
}) => {
  return (
    <header className="h-[90px] w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between border-b border-[#3C3219]/10 bg-transparent relative z-30 select-none">
      {/* A. Logo Branding — Left */}
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="w-[49px] h-[51px] rounded-[12px] bg-[#111111] text-white flex items-center justify-center shadow-xs shrink-0">
          <Code2 className="w-[22px] h-[22px] stroke-[2.2]" />
        </div>
        <div>
          <span className="font-bold text-[19px] tracking-tight text-[#111111] block leading-snug">
            OOPS LAB
          </span>
          <span className="text-[13.5px] text-[#50566A] block leading-tight font-normal">
            Java 21 OOP Laboratory
          </span>
        </div>
      </div>

      {/* B. Center Navigation Links */}
      <nav className="hidden md:flex items-center space-x-10 text-[14.5px] font-medium text-[#252525]">
        <a
          href="#what-we-do"
          onClick={(e) => onSmoothScroll(e, 'what-we-do')}
          className="hover:text-[#111111] transition-colors"
        >
          What We Do
        </a>
        <a
          href="#features"
          onClick={(e) => onSmoothScroll(e, 'features')}
          className="hover:text-[#111111] transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          onClick={(e) => onSmoothScroll(e, 'how-it-works')}
          className="hover:text-[#111111] transition-colors"
        >
          How It Works
        </a>
        <a
          href="#architecture"
          onClick={(e) => onSmoothScroll(e, 'architecture')}
          className="hover:text-[#111111] transition-colors"
        >
          Open Source
        </a>
      </nav>

      {/* C. Right Actions: Search + Guest Access */}
      <div className="flex items-center space-x-5">
        <button
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#3C3219]/10 transition-colors cursor-pointer"
          title="Search / Quick Find (Ctrl+K)"
          aria-label="Search"
        >
          <Search className="w-[19px] h-[19px] stroke-[2]" />
        </button>

        <button
          onClick={onEnterAsGuest}
          className="w-[214px] h-[51px] rounded-[12px] bg-[#111111] hover:bg-[#222222] text-white text-[14px] font-semibold flex items-center justify-center space-x-2.5 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <UserCheck className="w-[18px] h-[18px] stroke-[2]" />
          <span>Enter as Guest</span>
          <ArrowRight className="w-[16px] h-[16px] stroke-[2.2]" />
        </button>
      </div>
    </header>
  );
};
