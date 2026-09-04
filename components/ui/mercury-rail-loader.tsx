'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './mercury-rail-loader.module.css';

type MercuryRailStyle = React.CSSProperties & {
  '--mercury-accent': string;
  '--mercury-duration': string;
  '--mercury-shape-duration': string;
  '--mercury-width': string;
};

export type MercuryRailLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    accent?: string;
    label?: string;
    showLabel?: boolean;
    speed?: number;
    width?: number;
  };

function MercuryRailLoader({
  accent = 'currentColor',
  className,
  label = 'Loading',
  showLabel = true,
  speed = 2100,
  style,
  width = 220,
  ...props
}: MercuryRailLoaderProps) {
  const duration = Math.min(Math.max(speed, 1200), 3600);
  const loaderStyle = {
    ...style,
    '--mercury-accent': accent,
    '--mercury-duration': `${duration}ms`,
    '--mercury-shape-duration': `${duration / 2}ms`,
    '--mercury-width': `${Math.min(Math.max(width, 140), 360)}px`,
  } as MercuryRailStyle;

  return (
    <output
      data-slot="mercury-rail-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.traveler}>
          <span className={styles.trail} />
          <span className={styles.mercury} />
        </span>
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { MercuryRailLoader };
