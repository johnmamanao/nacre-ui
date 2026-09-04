'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './horizon-page-loader.module.css';

type HorizonPageLoaderStyle = React.CSSProperties & {
  '--horizon-accent': string;
  '--horizon-ambient-duration': string;
  '--horizon-duration': string;
};

export type HorizonPageLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    accent?: string;
    eyebrow?: string;
    label?: string;
    mode?: 'fixed' | 'contained';
    speed?: number;
  };

function HorizonPageLoader({
  accent = '#eeeae0',
  className,
  eyebrow = 'Nacre UI',
  label = 'Preparing your space',
  mode = 'fixed',
  speed = 2200,
  style,
  ...props
}: HorizonPageLoaderProps) {
  const duration = Math.min(Math.max(speed, 1400), 4200);
  const loaderStyle = {
    ...style,
    '--horizon-accent': accent,
    '--horizon-ambient-duration': `${duration * 2}ms`,
    '--horizon-duration': `${duration}ms`,
  } as HorizonPageLoaderStyle;

  return (
    <output
      data-slot="horizon-page-loader"
      data-mode={mode}
      aria-live="polite"
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.atmosphere} aria-hidden="true" />
      <span className={styles.content}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <span className={styles.horizon} aria-hidden="true">
          <span className={styles.light} />
          <span className={styles.pearl} />
        </span>
        <span className={styles.label}>{label}</span>
      </span>
    </output>
  );
}

export { HorizonPageLoader };
