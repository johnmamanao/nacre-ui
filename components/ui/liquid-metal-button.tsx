'use client';

import { LiquidMetal } from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './liquid-metal-button.module.css';

export type LiquidMetalButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    colorBack?: string;
    colorTint?: string;
    speed?: number;
    repetition?: number;
  };

type LiquidMetalButtonStyle = React.CSSProperties & {
  '--liquid-metal-base': string;
};

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const LiquidMetalButton = React.forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(function LiquidMetalButton(
  {
    children = 'Enter studio',
    className,
    colorBack = '#747570',
    colorTint = '#f4f3ee',
    repetition = 3.2,
    speed = 0.48,
    style,
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
  const buttonStyle = {
    ...style,
    '--liquid-metal-base': colorBack,
  } as LiquidMetalButtonStyle;

  return (
    <button
      ref={ref}
      data-slot="liquid-metal-button"
      type={type}
      className={cn(styles.root, className)}
      style={buttonStyle}
      {...props}
    >
      <span className={styles.material} aria-hidden="true">
        <LiquidMetal
          key={`${colorBack}-${colorTint}-${repetition}`}
          width="100%"
          height="100%"
          colorBack={colorBack}
          colorTint={colorTint}
          shape="none"
          repetition={Math.min(Math.max(repetition, 1), 8)}
          softness={0.22}
          shiftRed={0.04}
          shiftBlue={-0.03}
          distortion={0.13}
          contour={0.08}
          angle={68}
          speed={reduceMotion ? 0 : Math.min(Math.max(speed, 0), 1.4)}
          scale={1.15}
          fit="cover"
          minPixelRatio={1}
          maxPixelCount={180_000}
        />
      </span>
      <span className={styles.scrim} aria-hidden="true" />
      <span className={styles.content}>
        <span>{children}</span>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
        </svg>
      </span>
    </button>
  );
});

LiquidMetalButton.displayName = 'LiquidMetalButton';

export { LiquidMetalButton };
