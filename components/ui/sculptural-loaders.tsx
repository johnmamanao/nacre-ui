'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './sculptural-loaders.module.css';

type LoaderProps = React.OutputHTMLAttributes<HTMLOutputElement> & {
  accent?: string;
  label?: string;
  showLabel?: boolean;
  size?: number;
  speed?: number;
};

type LoaderStyle = React.CSSProperties & {
  '--loader-accent': string;
  '--loader-duration': string;
  '--loader-size': string;
};

function useLoaderStyle(
  accent: string,
  size: number,
  speed: number,
  style: React.CSSProperties | undefined,
) {
  return {
    ...style,
    '--loader-accent': accent,
    '--loader-duration': `${Math.min(Math.max(speed, 1100), 4200)}ms`,
    '--loader-size': `${Math.min(Math.max(size, 34), 80)}px`,
  } as LoaderStyle;
}

function FluidCellLoader({
  accent = 'currentColor',
  className,
  label = 'Forming shape',
  showLabel = true,
  size = 50,
  speed = 2600,
  style,
  ...props
}: LoaderProps) {
  const loaderStyle = useLoaderStyle(accent, size, speed, style);

  return (
    <output
      data-slot="fluid-cell-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.fluid} aria-hidden="true">
        <span className={styles.fluidHalo} />
        <span className={styles.fluidCore} />
        <span className={styles.fluidOrb} />
        <span className={styles.fluidOrb} />
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

function PrismStackLoader({
  accent = 'currentColor',
  className,
  label = 'Stacking planes',
  showLabel = true,
  size = 50,
  speed = 2400,
  style,
  ...props
}: LoaderProps) {
  const loaderStyle = useLoaderStyle(accent, size, speed, style);

  return (
    <output
      data-slot="prism-stack-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.prism} aria-hidden="true">
        <span className={styles.prismPane} />
        <span className={styles.prismPane} />
        <span className={styles.prismPane} />
        <span className={styles.prismLight} />
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

const cards = Array.from({ length: 3 }, (_, index) => index);

function CardShuffleLoader({
  accent = 'currentColor',
  className,
  label = 'Shuffling layers',
  showLabel = true,
  size = 48,
  speed = 1900,
  style,
  ...props
}: LoaderProps) {
  const loaderStyle = useLoaderStyle(accent, size, speed, style);

  return (
    <output
      data-slot="card-shuffle-loader"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      className={cn(styles.root, className)}
      style={loaderStyle}
      {...props}
    >
      <span className={styles.shuffle} aria-hidden="true">
        {cards.map((card) => (
          <span
            className={styles.shuffleCard}
            key={card}
            style={{ animationDelay: `${card * -420}ms` }}
          />
        ))}
      </span>
      {showLabel ? <span className={styles.label}>{label}</span> : null}
    </output>
  );
}

export { CardShuffleLoader, FluidCellLoader, PrismStackLoader };
