'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './pearl-matrix-loader.module.css';

type PearlMatrixStyle = React.CSSProperties & {
  '--matrix-accent': string;
  '--matrix-duration': string;
  '--matrix-size': string;
};

const matrixPearls = [
  { id: 'r1c1', delay: 0 },
  { id: 'r1c2', delay: -110 },
  { id: 'r1c3', delay: -220 },
  { id: 'r2c1', delay: -110 },
  { id: 'r2c2', delay: -220 },
  { id: 'r2c3', delay: -330 },
  { id: 'r3c1', delay: -220 },
  { id: 'r3c2', delay: -330 },
  { id: 'r3c3', delay: -440 },
] as const;

export type PearlMatrixLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    accent?: string;
    label?: string;
    showLabel?: boolean;
    size?: number;
    speed?: number;
  };

function PearlMatrixLoader({
  accent = 'currentColor',
  className,
  label = 'Loading',
  showLabel = true,
  size = 46,
  speed = 1840,
  style,
  ...props
}: PearlMatrixLoaderProps) {
  const loaderStyle = {
    ...style,
    '--matrix-accent': accent,
    '--matrix-duration': `${Math.min(Math.max(speed, 1200), 3200)}ms`,
    '--matrix-size': `${Math.min(Math.max(size, 34), 70)}px`,
  } as PearlMatrixStyle;

  return (
    <output
      data-slot="pearl-matrix-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.matrix} aria-hidden="true">
        {matrixPearls.map((pearl) => (
          <span
            className={styles.pearl}
            key={pearl.id}
            style={{ animationDelay: `${pearl.delay}ms` }}
          />
        ))}
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { PearlMatrixLoader };
