import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface LoadingStatusProps {
  status: string;
}

export const LoadingStatus: React.FC<LoadingStatusProps> = ({ status }) => {
  return (
    <div className="h-6 flex items-center justify-center overflow-hidden w-full mt-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-[13px] sm:text-[13.5px] text-[#596078] font-mono font-normal tracking-tight text-center select-none"
        >
          {status}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

