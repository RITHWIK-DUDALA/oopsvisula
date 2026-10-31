import React from 'react';
import { motion } from 'motion/react';

interface ScrollIndicatorProps {
  onScrollToExplore: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollToExplore }) => {
  return (
    <div
      onClick={onScrollToExplore}
      className="flex flex-col items-center space-y-2 cursor-pointer group pb-4 select-none z-20"
      role="button"
      tabIndex={0}
      aria-label="Scroll to explore features"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onScrollToExplore();
        }
      }}
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[1.5px] h-[48px] bg-[#2463EB] relative flex flex-col justify-end items-center"
      >
        <div className="w-[7px] h-[7px] rounded-full bg-[#2463EB] -mb-1 shadow-[0_0_8px_rgba(36,99,235,0.6)]" />
      </motion.div>

      <span className="text-[11px] font-mono tracking-[1.5px] text-[#60677B] group-hover:text-[#111111] transition-colors uppercase">
        SCROLL TO EXPLORE
      </span>
    </div>
  );
};

