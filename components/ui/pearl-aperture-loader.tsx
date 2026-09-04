'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './pearl-aperture-loader.module.css';

type PearlApertureStyle = React.CSSProperties & {
  '--aperture-accent': string;
  '--aperture-breathe-duration': string;
  '--aperture-duration': string;
  '--aperture-inner-duration': string;
  '--aperture-middle-duration': string;
  '--aperture-size': string;
};

export type PearlApertureLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    label?: string;
    showLabel?: boolean;
    size?: number;
    speed?: number;
    accent?: string;
  };

function PearlApertureLoader({
  accent = 'currentColor',
  className,
  label = 'Loading',
  showLabel = true,
  size = 42,
  speed = 1400,
  style,
  ...props
}: PearlApertureLoaderProps) {
  const duration = Math.min(Math.max(speed, 700), 3200);
  const loaderStyle = {
    ...style,
    '--aperture-accent': accent,
    '--aperture-breathe-duration': `${duration * 1.7}ms`,
    '--aperture-duration': `${duration}ms`,
    '--aperture-inner-duration': `${duration * 1.8}ms`,
    '--aperture-middle-duration': `${duration * 1.35}ms`,
    '--aperture-size': `${Math.min(Math.max(size, 24), 80)}px`,
  } as PearlApertureStyle;

  return (
    <output
      data-slot="pearl-aperture-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.aperture} aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle
            className={styles.outer}
            cx="24"
            cy="24"
            r="18"
            pathLength="100"
          />
          <circle
            className={styles.middle}
            cx="24"
            cy="24"
            r="12"
            pathLength="100"
          />
          <circle
            className={styles.inner}
            cx="24"
            cy="24"
            r="7"
            pathLength="100"
          />
        </svg>
        <span className={styles.pearl} />
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { PearlApertureLoader };
