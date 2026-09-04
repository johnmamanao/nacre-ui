'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './signal-reveal-text.module.css';

type SignalRevealStyle = React.CSSProperties & {
  '--signal-accent': string;
};

export type SignalRevealTextProps = React.HTMLAttributes<HTMLElement> & {
  accent?: string;
  as?: React.ElementType;
  delay?: number;
  speed?: number;
  text: string;
};

function SignalRevealText({
  accent = 'currentColor',
  as: Component = 'p',
  className,
  delay = 0,
  speed = 1050,
  style,
  text,
  ...props
}: SignalRevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = Math.min(Math.max(speed, 650), 1800);
  const words = text.trim().split(/\s+/);
  const wordStagger =
    words.length > 1 ? Math.min(80, 480 / (words.length - 1)) : 0;
  const startDelay = Math.max(delay, 0);
  const revealStyle = {
    ...style,
    '--signal-accent': accent,
  } as SignalRevealStyle;
  const loopDuration = (duration * 3.1) / 1000;

  return (
    <Component
      data-slot="signal-reveal-text"
      aria-label={text}
      className={cn(styles.root, className)}
      style={revealStyle}
      {...props}
    >
      <span className={styles.copy} aria-hidden="true">
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <motion.span
              className={styles.word}
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: '0.2em' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0, 1, 1, 0], y: ['0.2em', 0, 0, '-0.08em'] }
              }
              transition={{
                delay: (startDelay + index * wordStagger) / 1000,
                duration: prefersReducedMotion ? 0 : loopDuration,
                ease: [0.22, 1, 0.36, 1],
                repeat: prefersReducedMotion ? 0 : Infinity,
                times: [0, 0.16, 0.8, 1],
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </Component>
  );
}

export { SignalRevealText };
