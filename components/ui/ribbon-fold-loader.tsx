'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './ribbon-fold-loader.module.css';

type RibbonFoldStyle = React.CSSProperties & {
  '--ribbon-accent': string;
  '--ribbon-duration': string;
  '--ribbon-size': string;
};

const ribbonSegments = [
  { id: 'one', delay: 0 },
  { id: 'two', delay: -130 },
  { id: 'three', delay: -260 },
  { id: 'four', delay: -390 },
] as const;

export type RibbonFoldLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    accent?: string;
    label?: string;
    showLabel?: boolean;
    size?: number;
    speed?: number;
  };

function RibbonFoldLoader({
  accent = 'currentColor',
  className,
  label = 'Loading',
  showLabel = true,
  size = 54,
  speed = 1760,
  style,
  ...props
}: RibbonFoldLoaderProps) {
  const loaderStyle = {
    ...style,
    '--ribbon-accent': accent,
    '--ribbon-duration': `${Math.min(Math.max(speed, 1100), 3200)}ms`,
    '--ribbon-size': `${Math.min(Math.max(size, 40), 78)}px`,
  } as RibbonFoldStyle;

  return (
    <output
      data-slot="ribbon-fold-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.ribbon} aria-hidden="true">
        {ribbonSegments.map((segment) => (
          <span
            className={styles.segment}
            key={segment.id}
            style={{ animationDelay: `${segment.delay}ms` }}
          />
        ))}
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { RibbonFoldLoader };
