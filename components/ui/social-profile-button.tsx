'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './social-profile-button.module.css';

export type SocialProfileButtonProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    handle?: string;
    label?: string;
    icon?: React.ReactNode;
  };

function DefaultMark() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="2.6" />
      <path d="M4.4 14.2c.7-2.8 2.25-4.2 4.6-4.2s3.9 1.4 4.6 4.2" />
    </svg>
  );
}

const SocialProfileButton = React.forwardRef<
  HTMLAnchorElement,
  SocialProfileButtonProps
>(function SocialProfileButton(
  {
    'aria-label': ariaLabel,
    className,
    handle = '@nacre.ui',
    href,
    icon,
    label = 'View profile',
    rel,
    target = '_blank',
    ...props
  },
  ref,
) {
  const safeRel = target === '_blank' ? (rel ?? 'noreferrer') : rel;

  return (
    <a
      ref={ref}
      data-slot="social-profile-button"
      href={href}
      target={target}
      rel={safeRel}
      className={cn(styles.root, className)}
      aria-label={ariaLabel ?? `${label}: ${handle}`}
      {...props}
    >
      <span className={styles.mark} aria-hidden="true">
        {icon ?? <DefaultMark />}
      </span>
      <span className={styles.identity} aria-hidden="true">
        <span className={styles.label}>{label}</span>
        <span className={styles.handle}>{handle}</span>
      </span>
      <span className={styles.action} aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M5 11 11.5 4.5M6.5 4.5h5v5" />
        </svg>
      </span>
    </a>
  );
});

SocialProfileButton.displayName = 'SocialProfileButton';

export { SocialProfileButton };
