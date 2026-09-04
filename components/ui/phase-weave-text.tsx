'use client';

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  stagger,
  useReducedMotion,
} from 'framer-motion';
import type { Variants } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './phase-weave-text.module.css';

const defaultWords = ['Clarity', 'Rhythm', 'Focus'];

export type PhaseWeaveTextProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  interval?: number;
  words?: string[];
};

function PhaseWeaveText({
  as: Component = 'p',
  className,
  interval = 2800,
  style,
  words = defaultWords,
  ...props
}: PhaseWeaveTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const usableWords = words.filter((word) => word.trim().length > 0);
  const resolvedWords = usableWords.length > 0 ? usableWords : defaultWords;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const safeInterval = Math.min(Math.max(interval, 1400), 10000);
  const activeWord =
    resolvedWords[currentIndex % resolvedWords.length] ?? resolvedWords[0];

  React.useEffect(() => {
    if (resolvedWords.length < 2) return;

    const cycle = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % resolvedWords.length);
    }, safeInterval);

    return () => window.clearInterval(cycle);
  }, [resolvedWords.length, safeInterval]);

  const characterVariants: Variants | undefined = prefersReducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: '0.3em', scaleY: 0.84 },
        animate: {
          opacity: 1,
          scaleY: 1,
          y: 0,
          transition: {
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
        exit: {
          opacity: 0,
          scaleY: 0.9,
          y: '-0.16em',
          transition: {
            duration: 0.24,
            ease: [0.4, 0, 1, 1] as const,
          },
        },
      };

  const wordVariants: Variants | undefined = prefersReducedMotion
    ? undefined
    : {
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: {
            when: 'beforeChildren' as const,
            delayChildren: stagger(0.024, { startDelay: 0.03 }),
          },
        },
        exit: {
          opacity: 1,
          transition: {
            when: 'afterChildren' as const,
            delayChildren: stagger(0.014, { from: 'last', startDelay: 0.008 }),
          },
        },
      };

  return (
    <Component
      data-slot="phase-weave-text"
      className={cn(styles.root, className)}
      style={style}
      {...props}
    >
      <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {activeWord}
      </span>
      <span className={styles.measure} aria-hidden="true">
        {resolvedWords.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
      <AnimatePresence initial={!prefersReducedMotion} mode="wait">
        <motion.span
          key={`${activeWord}-${currentIndex}`}
          aria-hidden="true"
          className={styles.word}
          initial={prefersReducedMotion ? false : 'initial'}
          animate="animate"
          exit="exit"
          variants={wordVariants}
        >
          {Array.from(activeWord).map((character, index) => (
            <motion.span
              key={`${character}-${index}`}
              className={styles.character}
              variants={characterVariants}
            >
              {character === ' ' ? '\u00a0' : character}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
}

export { PhaseWeaveText };
