'use client';

import { GemSmoke } from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './gem-smoke-button.module.css';

const defaultColors = ['#d8a7ff', '#ffb49a', '#87d9bc'];

export type GemSmokeButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    colors?: string[];
    speed?: number;
    smokeSize?: number;
  };

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const GemSmokeButton = React.forwardRef<HTMLButtonElement, GemSmokeButtonProps>(
  function GemSmokeButton(
    {
      children = 'Reveal collection',
      className,
      colors = defaultColors,
      smokeSize = 0.82,
      speed = 0.4,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const reduceMotion = React.useSyncExternalStore(
      subscribeToReducedMotion,
      getReducedMotion,
      () => false,
    );

    return (
      <button
        ref={ref}
        data-slot="gem-smoke-button"
        type={type}
        className={cn(styles.root, className)}
        {...props}
      >
        <span className={styles.material} aria-hidden="true">
          <GemSmoke
            width="100%"
            height="100%"
            colors={colors.slice(0, 6)}
            colorBack="#121114"
            colorInner="#f5f1eb"
            shape="metaballs"
            innerDistortion={0.78}
            outerDistortion={0.68}
            outerGlow={0.72}
            innerGlow={0.92}
            offset={-0.08}
            angle={18}
            size={Math.min(Math.max(smokeSize, 0.45), 1)}
            speed={reduceMotion ? 0 : Math.min(Math.max(speed, 0), 1.2)}
            scale={1.38}
            fit="cover"
            minPixelRatio={1}
            maxPixelCount={180_000}
          />
        </span>
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.content}>
          <span>{children}</span>
          <span className={styles.gem} aria-hidden="true">
            <svg viewBox="0 0 18 18" fill="none">
              <path d="m9 2.5 5.5 4.2L12.4 15H5.6L3.5 6.7 9 2.5Z" />
              <path d="m3.8 6.8 5.2 2 5.2-2M9 8.8V15" />
            </svg>
          </span>
        </span>
      </button>
    );
  },
);

GemSmokeButton.displayName = 'GemSmokeButton';

export { GemSmokeButton };
