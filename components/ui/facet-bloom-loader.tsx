'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './facet-bloom-loader.module.css';

type FacetBloomStyle = React.CSSProperties & {
  '--facet-accent': string;
  '--facet-duration': string;
  '--facet-size': string;
};

export type FacetBloomLoaderProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    accent?: string;
    label?: string;
    showLabel?: boolean;
    size?: number;
    speed?: number;
  };

function FacetBloomLoader({
  accent = 'currentColor',
  className,
  label = 'Loading',
  showLabel = true,
  size = 48,
  speed = 1680,
  style,
  ...props
}: FacetBloomLoaderProps) {
  const duration = Math.min(Math.max(speed, 1000), 3000);
  const loaderStyle = {
    ...style,
    '--facet-accent': accent,
    '--facet-duration': `${duration}ms`,
    '--facet-size': `${Math.min(Math.max(size, 32), 72)}px`,
  } as FacetBloomStyle;

  return (
    <output
      data-slot="facet-bloom-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.bloom} aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <span
            className={styles.facetPosition}
            key={index}
            style={{ transform: `rotate(${index * 60}deg)` }}
          >
            <span
              className={styles.facet}
              style={{ animationDelay: `${index * -140}ms` }}
            />
          </span>
        ))}
        <span className={styles.center} />
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { FacetBloomLoader };
