import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0.1,
  wordDelay = 0.04,
  as: Component = 'span',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.26em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
