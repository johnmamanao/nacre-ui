'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './text-motion-effects.module.css';

type MotionTextProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  text: string;
};

const MotionTextFrame = React.forwardRef<
  HTMLElement,
  MotionTextProps & { children: React.ReactNode; slot: string }
>(function MotionTextFrame(
  { as: Component = 'p', children, className, slot, text, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      data-slot={slot}
      aria-label={text}
      className={cn(styles.root, className)}
      {...props}
    >
      {children}
    </Component>
  );
});

function AuroraText({ as, className, text, ...props }: MotionTextProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <MotionTextFrame
      as={as}
      className={className}
      slot="aurora-text"
      text={text}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className={cn(styles.copy, styles.aurora)}
        animate={
          prefersReducedMotion
            ? { backgroundPosition: '50% 50%' }
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 6.8,
          ease: 'easeInOut',
          repeat: prefersReducedMotion ? 0 : Infinity,
        }}
      >
        {text}
      </motion.span>
    </MotionTextFrame>
  );
}

function LiquidText({ as, className, text, ...props }: MotionTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const filterId = `nacre-liquid-${React.useId().replace(/:/g, '')}`;
  return (
    <MotionTextFrame
      as={as}
      className={className}
      slot="liquid-text"
      text={text}
      {...props}
    >
      <svg className={styles.filter} aria-hidden="true">
        <defs>
          <filter id={filterId} x="-8%" y="-35%" width="116%" height="170%">
            <motion.feTurbulence
              type="turbulence"
              baseFrequency="0.008 0.04"
              numOctaves="2"
              seed="12"
              animate={
                prefersReducedMotion
                  ? { baseFrequency: '0.008 0.04' }
                  : {
                      baseFrequency: [
                        '0.008 0.04',
                        '0.018 0.025',
                        '0.008 0.04',
                      ],
                    }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 5.6,
                ease: 'easeInOut',
                repeat: prefersReducedMotion ? 0 : Infinity,
              }}
            />
            <feDisplacementMap in="SourceGraphic" scale="7" />
          </filter>
        </defs>
      </svg>
      <motion.span
        aria-hidden="true"
        className={cn(styles.copy, styles.liquid)}
        style={{ filter: `url(#${filterId})` }}
        animate={
          prefersReducedMotion
            ? { scaleY: 1, y: 0 }
            : { scaleY: [1, 1.05, 0.97, 1], y: [0, -1.5, 1, 0] }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 4.6,
          ease: [0.4, 0, 0.2, 1],
          repeat: prefersReducedMotion ? 0 : Infinity,
          times: [0, 0.34, 0.7, 1],
        }}
      >
        {text}
      </motion.span>
    </MotionTextFrame>
  );
}

function GravityText({
  as,
  className,
  onPointerLeave,
  onPointerMove,
  text,
  ...props
}: MotionTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [focus, setFocus] = React.useState(-1);
  const glyphs = Array.from(text);
  return (
    <MotionTextFrame
      ref={rootRef}
      as={as}
      className={className}
      slot="gravity-text"
      text={text}
      onPointerMove={(event: React.PointerEvent<HTMLElement>) => {
        if (!prefersReducedMotion && event.pointerType !== 'touch') {
          const bounds = rootRef.current?.getBoundingClientRect();
          if (bounds?.width)
            setFocus(
              Math.round(
                ((event.clientX - bounds.left) / bounds.width) *
                  (glyphs.length - 1),
              ),
            );
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event: React.PointerEvent<HTMLElement>) => {
        setFocus(-1);
        onPointerLeave?.(event);
      }}
      {...props}
    >
      <span className={styles.copy} aria-hidden="true">
        {glyphs.map((glyph, index) => {
          const distance = focus < 0 ? 99 : Math.abs(index - focus);
          const pull = Math.max(0, 1 - distance / 3);
          const direction = index < focus ? -1 : 1;
          return (
            <motion.span
              key={`${glyph}-${index}`}
              className={styles.glyph}
              animate={{
                opacity: 1 - pull * 0.12,
                rotate: pull * direction * 4,
                scale: 1 + pull * 0.12,
                x: pull * direction * 5,
                y: -pull * 9,
              }}
              transition={{
                type: 'spring',
                stiffness: 330,
                damping: 24,
                mass: 0.34,
              }}
            >
              {glyph === ' ' ? '\u00a0' : glyph}
            </motion.span>
          );
        })}
      </span>
    </MotionTextFrame>
  );
}

export type SlotTextProps = Omit<MotionTextProps, 'text'> & {
  interval?: number;
  words?: string[];
};

function SlotText({
  as,
  className,
  interval = 2600,
  words = ['Momentum', 'Presence', 'Signal'],
  ...props
}: SlotTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const available = words.filter((word) => word.trim());
  const resolvedWords = available.length ? available : ['Momentum'];
  const [index, setIndex] = React.useState(0);
  const activeWord =
    resolvedWords[index % resolvedWords.length] ?? resolvedWords[0];
  const safeInterval = Math.min(Math.max(interval, 1600), 8000);
  React.useEffect(() => {
    if (resolvedWords.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % resolvedWords.length),
      safeInterval,
    );
    return () => window.clearInterval(timer);
  }, [resolvedWords.length, safeInterval]);
  return (
    <MotionTextFrame
      as={as}
      className={className}
      slot="slot-text"
      text={activeWord}
      {...props}
    >
      <span className={styles.measure} aria-hidden="true">
        {resolvedWords.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
      <AnimatePresence initial={!prefersReducedMotion} mode="wait">
        <motion.span
          key={`${activeWord}-${index}`}
          aria-hidden="true"
          className={cn(styles.copy, styles.slot)}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, rotateX: -72, scaleY: 0.82, y: '0.42em' }
          }
          animate={{ opacity: 1, rotateX: 0, scaleY: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, rotateX: 72, scaleY: 0.82, y: '-0.34em' }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </MotionTextFrame>
  );
}

function BloomText({ as, className, text, ...props }: MotionTextProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <MotionTextFrame
      as={as}
      className={className}
      slot="bloom-text"
      text={text}
      {...props}
    >
      <span className={styles.copy} aria-hidden="true">
        {Array.from(text).map((glyph, index) => {
          const angle = (index % 5) * 18 - 36;
          return (
            <motion.span
              key={`${glyph}-${index}`}
              className={styles.glyph}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, rotate: 0, scale: 1, y: 0 }
                  : {
                      opacity: [1, 0.35, 1],
                      rotate: [0, angle, 0],
                      scale: [1, 1.16, 1],
                      y: [0, -7, 0],
                    }
              }
              transition={{
                delay: index * 0.045,
                duration: prefersReducedMotion ? 0 : 0.76,
                ease: [0.175, 0.885, 0.32, 1.1],
                repeat: prefersReducedMotion ? 0 : Infinity,
                repeatDelay: 3.1,
                times: [0, 0.48, 1],
              }}
            >
              {glyph === ' ' ? '\u00a0' : glyph}
            </motion.span>
          );
        })}
      </span>
    </MotionTextFrame>
  );
}

function TiltText({
  as,
  className,
  onPointerLeave,
  onPointerMove,
  text,
  ...props
}: MotionTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = React.useState({
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
  });
  return (
    <MotionTextFrame
      ref={rootRef}
      as={as}
      className={className}
      slot="tilt-text"
      text={text}
      onPointerMove={(event: React.PointerEvent<HTMLElement>) => {
        if (!prefersReducedMotion && event.pointerType !== 'touch') {
          const bounds = rootRef.current?.getBoundingClientRect();
          if (bounds) {
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            setTilt({
              rotateX: -y * 16,
              rotateY: x * 18,
              x: x * 2.5,
              y: y * 2.5,
            });
          }
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event: React.PointerEvent<HTMLElement>) => {
        setTilt({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
        onPointerLeave?.(event);
      }}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className={cn(styles.copy, styles.tilt)}
        animate={tilt}
        transition={{ type: 'spring', stiffness: 260, damping: 21, mass: 0.38 }}
      >
        {text}
      </motion.span>
    </MotionTextFrame>
  );
}

export { AuroraText, BloomText, GravityText, LiquidText, SlotText, TiltText };
