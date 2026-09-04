'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './swell-text.module.css';

export type SwellTextProps = React.HTMLAttributes<HTMLElement> & {
  amplitude?: number;
  as?: React.ElementType;
  duration?: number;
  text: string;
};

function SwellText({
  amplitude = 7,
  as: Component = 'p',
  className,
  duration = 3400,
  text,
  ...props
}: SwellTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = Array.from(text);
  const safeAmplitude = Math.min(Math.max(amplitude, 0), 18);
  const safeDuration = Math.min(Math.max(duration, 2200), 8000) / 1000;
  const stagger =
    characters.length > 1 ? Math.min(0.07, 0.7 / characters.length) : 0;

  return (
    <Component
      data-slot="swell-text"
      aria-label={text}
      className={cn(styles.root, className)}
      {...props}
    >
      <span className={styles.copy} aria-hidden="true">
        {characters.map((character, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const delay = index * stagger;

          return (
            <motion.span
              key={`${character}-${index}`}
              className={styles.glyph}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, rotate: 0, scaleY: 1, y: 0 }
                  : {
                      opacity: [1, 1, 0.94, 1],
                      rotate: [0, 0, direction * 0.55, 0],
                      scaleY: [1, 1, 1.035, 1],
                      y: [0, 0, -safeAmplitude, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      delay,
                      duration: 1.18,
                      ease: [0.4, 0, 0.2, 1],
                      repeat: Infinity,
                      repeatDelay: Math.max(safeDuration - 1.18, 0.7),
                      times: [0, 0.3, 0.62, 1],
                    }
              }
            >
              {character === ' ' ? '\u00a0' : character}
            </motion.span>
          );
        })}
      </span>
    </Component>
  );
}

export { SwellText };
