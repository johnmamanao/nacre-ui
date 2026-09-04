'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './lustre-button.module.css';

type LustreStyle = React.CSSProperties & {
  '--lustre-color': string;
  '--lustre-duration': string;
};

export type LustreButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    lustreColor?: string;
    duration?: number;
    motion?: 'loop' | 'hover';
  };

const LustreButton = React.forwardRef<HTMLButtonElement, LustreButtonProps>(
  function LustreButton(
    {
      children = 'Explore components',
      className,
      duration = 3200,
      lustreColor = '#ffffff',
      motion = 'loop',
      style,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const lustreStyle = {
      ...style,
      '--lustre-color': lustreColor,
      '--lustre-duration': `${Math.min(Math.max(duration, 1800), 6000)}ms`,
    } as LustreStyle;

    return (
      <button
        ref={ref}
        data-slot="lustre-button"
        data-motion={motion}
        type={type}
        className={cn(styles.root, className)}
        style={lustreStyle}
        {...props}
      >
        <span className={styles.lustre} aria-hidden="true" />
        <span className={styles.edge} aria-hidden="true" />
        <span className={styles.content}>
          <span>{children}</span>
          <svg
            className={styles.arrow}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </span>
      </button>
    );
  },
);

LustreButton.displayName = 'LustreButton';

export { LustreButton };
