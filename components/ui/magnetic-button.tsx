'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './magnetic-button.module.css';

export type MagneticButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    strength?: number;
  };

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  function MagneticButton(
    {
      children = 'Explore system',
      className,
      strength = 4,
      type = 'button',
      onBlur,
      onPointerLeave,
      onPointerMove,
      style,
      ...props
    },
    ref,
  ) {
    const magneticStrength = Math.min(Math.max(strength, 0), 10);

    const resetPosition = (button: HTMLButtonElement) => {
      button.style.setProperty('--magnetic-x', '0px');
      button.style.setProperty('--magnetic-y', '0px');
      button.style.setProperty('--pointer-x', '50%');
      button.style.setProperty('--pointer-y', '50%');
    };

    return (
      <button
        ref={ref}
        data-slot="magnetic-button"
        type={type}
        className={cn(styles.root, className)}
        style={style}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width;
          const y = (event.clientY - bounds.top) / bounds.height;
          event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`);
          event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`);
          event.currentTarget.style.setProperty(
            '--magnetic-x',
            `${(x - 0.5) * magneticStrength * 2}px`,
          );
          event.currentTarget.style.setProperty(
            '--magnetic-y',
            `${(y - 0.5) * magneticStrength * 2}px`,
          );
          onPointerMove?.(event);
        }}
        onPointerLeave={(event) => {
          resetPosition(event.currentTarget);
          onPointerLeave?.(event);
        }}
        onBlur={(event) => {
          resetPosition(event.currentTarget);
          onBlur?.(event);
        }}
        {...props}
      >
        <span className={styles.glow} aria-hidden="true" />
        <span className={styles.content}>
          <span>{children}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </span>
      </button>
    );
  },
);

MagneticButton.displayName = 'MagneticButton';

export { MagneticButton };
