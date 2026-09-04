'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './tally-shift-number.module.css';

export type TallyShiftNumberProps =
  React.OutputHTMLAttributes<HTMLOutputElement> & {
    duration?: number;
    formatOptions?: Intl.NumberFormatOptions;
    from?: number;
    prefix?: string;
    repeat?: boolean;
    repeatDelay?: number;
    suffix?: string;
    value: number;
  };

type DigitReelProps = {
  delay: number;
  duration: number;
  from: number;
  index: number;
  reducedMotion: boolean | null;
  to: number;
};

function DigitReel({
  delay,
  duration,
  from,
  index,
  reducedMotion,
  to,
}: DigitReelProps) {
  const distance = (to - from + 10) % 10;
  const turns = distance + 10 + Math.max(0, 4 - index) * 2;
  const faces = Array.from(
    { length: turns + 1 },
    (_, faceIndex) => (from + faceIndex) % 10,
  );

  return (
    <span className={styles.digitSlot}>
      <motion.span
        className={styles.digitReel}
        initial={{ y: 0 }}
        animate={{ y: `${-turns}em` }}
        transition={{
          delay: reducedMotion ? 0 : delay,
          duration: reducedMotion ? 0 : duration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {faces.map((face, faceIndex) => (
          <span className={styles.digitFace} key={faceIndex}>
            {face}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function TallyShiftNumber({
  className,
  duration = 1800,
  formatOptions,
  from = 0,
  prefix,
  repeat = false,
  repeatDelay = 2100,
  suffix,
  value,
  ...props
}: TallyShiftNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const [cycle, setCycle] = React.useState(0);
  const safeDuration = Math.min(Math.max(duration, 600), 5000) / 1000;
  const safeRepeatDelay = Math.min(Math.max(repeatDelay, 700), 10000);
  const formatter = React.useMemo(
    () => new Intl.NumberFormat(undefined, formatOptions),
    [formatOptions],
  );
  const formattedValue = formatter.format(value);
  const targetDigits = Array.from(formattedValue).filter((character) =>
    /\d/.test(character),
  );
  const startDigits = Array.from(formatter.format(from)).filter((character) =>
    /\d/.test(character),
  );
  const paddedStartDigits = [
    ...Array(Math.max(0, targetDigits.length - startDigits.length)).fill('0'),
    ...startDigits,
  ];
  const accessibleValue = `${prefix ?? ''}${formattedValue}${suffix ?? ''}`;
  const reelDuration = Math.max(
    safeDuration / Math.max(targetDigits.length, 1),
    0.26,
  );
  const cycleDuration = reelDuration * targetDigits.length;
  let digitIndex = 0;

  React.useEffect(() => {
    if (!repeat || prefersReducedMotion) return;

    const timer = window.setInterval(
      () => setCycle((current) => current + 1),
      cycleDuration * 1000 + safeRepeatDelay,
    );

    return () => window.clearInterval(timer);
  }, [cycleDuration, prefersReducedMotion, repeat, safeRepeatDelay]);

  return (
    <output
      data-slot="tally-shift-number"
      aria-label={accessibleValue}
      className={cn(styles.root, className)}
      {...props}
    >
      {prefix ? <span className={styles.affix}>{prefix}</span> : null}
      <span className={styles.digits} aria-hidden="true" key={cycle}>
        {Array.from(formattedValue).map((character, characterIndex) => {
          if (!/\d/.test(character)) {
            return (
              <span
                className={styles.separator}
                key={`separator-${characterIndex}`}
              >
                {character}
              </span>
            );
          }

          const currentIndex = digitIndex++;
          return (
            <DigitReel
              delay={currentIndex * reelDuration}
              duration={reelDuration}
              from={Number(paddedStartDigits[currentIndex] ?? '0')}
              index={currentIndex}
              key={`digit-${characterIndex}`}
              reducedMotion={prefersReducedMotion}
              to={Number(character)}
            />
          );
        })}
      </span>
      {suffix ? <span className={styles.affix}>{suffix}</span> : null}
    </output>
  );
}

export { TallyShiftNumber };
