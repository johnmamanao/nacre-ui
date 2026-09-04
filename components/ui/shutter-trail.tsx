'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './shutter-trail.module.css';

type TrailFrame = {
  height: number;
  id: number;
  imageIndex: number;
  rotation: number;
  width: number;
  x: number;
  y: number;
};

export type ShutterTrailProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> & {
  cardSize?: number;
  images?: string[];
  onFrozenChange?: (frozen: boolean) => void;
  persistence?: number;
  showIndices?: boolean;
  spacing?: number;
  tilt?: number;
  trailLength?: number;
};

const defaultImages = [
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=88',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=88',
  'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=88',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=88',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88',
];

const frameRatios = [1.34, 0.78, 1.08, 1.46, 0.88];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ShutterTrail({
  cardSize = 152,
  className,
  images = defaultImages,
  onClick,
  onFrozenChange,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  persistence = 1.6,
  showIndices = true,
  spacing = 72,
  style,
  tilt = 7,
  trailLength = 6,
  ...props
}: ShutterTrailProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const nextId = React.useRef(0);
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null);
  const timers = React.useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const [frames, setFrames] = React.useState<TrailFrame[]>([]);
  const [discovered, setDiscovered] = React.useState(false);
  const [frozen, setFrozen] = React.useState(false);
  const safeImages = images.length ? images.slice(0, 12) : defaultImages;
  const safeCardSize = clamp(cardSize, 104, 220);
  const safePersistence = clamp(persistence, 0.7, 4);
  const safeSpacing = clamp(spacing, 36, 140);
  const safeTilt = clamp(tilt, 0, 14);
  const safeTrailLength = Math.round(clamp(trailLength, 3, 9));

  React.useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach((timer) => clearTimeout(timer));
  }, []);

  function clearFrames() {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
    setFrames([]);
  }

  function removeFrame(id: number) {
    setFrames((current) => current.filter((frame) => frame.id !== id));
    timers.current.delete(id);
  }

  function addFrame(
    x: number,
    y: number,
    bounds: DOMRect,
    velocityX: number,
    velocityY: number,
  ) {
    const id = nextId.current++;
    const ratio = frameRatios[id % frameRatios.length];
    const width = safeCardSize * (ratio < 0.9 ? 0.82 : 1);
    const height = width / ratio;
    const direction =
      velocityX === 0 ? (id % 2 ? 1 : -1) : Math.sign(velocityX);
    const velocityTilt = clamp(
      (velocityY / Math.max(Math.abs(velocityX), 18)) * 2,
      -2.5,
      2.5,
    );
    const rotation =
      direction * (safeTilt * (0.48 + (id % 3) * 0.16)) + velocityTilt;
    const frame: TrailFrame = {
      height,
      id,
      imageIndex: id % safeImages.length,
      rotation,
      width,
      x: clamp(x, width * 0.42, bounds.width - width * 0.42),
      y: clamp(y, height * 0.42, bounds.height - height * 0.42),
    };

    setFrames((current) => [...current, frame].slice(-safeTrailLength));
    const timer = setTimeout(() => removeFrame(id), safePersistence * 1000);
    timers.current.set(id, timer);
  }

  function handlePointerEnter(event: React.PointerEvent<HTMLButtonElement>) {
    setDiscovered(true);
    const bounds = rootRef.current?.getBoundingClientRect();
    if (bounds && !reduceMotion && !frozen) {
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      lastPoint.current = { x, y };
      addFrame(x, y, bounds, 1, 0);
    }
    onPointerEnter?.(event);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const bounds = rootRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = clamp(event.clientX - bounds.left, 0, bounds.width);
    const y = clamp(event.clientY - bounds.top, 0, bounds.height);
    const last = lastPoint.current;

    if (!reduceMotion && !frozen && last) {
      const distance = Math.hypot(x - last.x, y - last.y);
      if (distance >= safeSpacing) {
        addFrame(x, y, bounds, x - last.x, y - last.y);
        lastPoint.current = { x, y };
      }
    }

    if (!last) lastPoint.current = { x, y };
    onPointerMove?.(event);
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLButtonElement>) {
    lastPoint.current = null;
    onPointerLeave?.(event);
  }

  function toggleFrozen(event: React.MouseEvent<HTMLButtonElement>) {
    const nextFrozen = !frozen;
    setFrozen(nextFrozen);
    if (nextFrozen) {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    } else {
      clearFrames();
    }
    onFrozenChange?.(nextFrozen);
    onClick?.(event);
  }

  return (
    <button
      ref={rootRef}
      aria-label="Shutter Trail. Move the pointer to develop an image sequence. Activate to hold or release the frames."
      aria-pressed={frozen}
      className={cn(styles.root, className)}
      data-frozen={frozen}
      data-slot="shutter-trail"
      type="button"
      {...props}
      style={style}
      onClick={toggleFrozen}
      onKeyDown={onKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <AnimatePresence>
        {!discovered ? (
          <motion.span
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-hidden="true"
            className={styles.idleCueStage}
            data-idle-cue=""
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.18, ease: [0.3, 0, 1, 1] },
              y: -5,
            }}
            initial={{ opacity: 0, scale: 0.97, y: 7 }}
            transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
          >
            <span className={styles.idleCue}>
              <span className={styles.cueTrack}>
                <motion.svg
                  animate={
                    reduceMotion
                      ? { x: 0, y: 0 }
                      : { x: [-4, 5, -4], y: [3, -3, 3] }
                  }
                  aria-hidden="true"
                  className={styles.cuePointer}
                  fill="none"
                  transition={{
                    duration: 2.2,
                    ease: 'easeInOut',
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  viewBox="0 0 18 18"
                >
                  <path d="M4 2.75 14.6 9l-4.35 1.12L8 14.25 4 2.75Z" />
                </motion.svg>
              </span>
              <span className={styles.cueLabel}>Move or drag to reveal</span>
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {frames.map((frame, index) => {
          const age = frames.length - index - 1;
          const ageRatio = age / Math.max(safeTrailLength - 1, 1);
          return (
            <motion.span
              aria-hidden="true"
              animate={{
                clipPath: 'inset(0% 0 0% 0 round 9px)',
                filter: `grayscale(${ageRatio * 0.58}) blur(${ageRatio * 1.2}px)`,
                opacity: 1 - ageRatio * 0.54,
                rotate: frame.rotation,
                scale: 1 - ageRatio * 0.1,
              }}
              className={styles.trailFrame}
              data-trail-frame=""
              exit={{
                clipPath: 'inset(48% 0 48% 0 round 9px)',
                filter: 'grayscale(.75) blur(3px)',
                opacity: 0,
                scale: 0.92,
              }}
              initial={{
                clipPath: 'inset(48% 0 48% 0 round 9px)',
                filter: 'grayscale(.2) blur(2px)',
                opacity: 0,
                rotate: frame.rotation * 0.45,
                scale: 0.9,
              }}
              key={frame.id}
              style={{
                backgroundImage: `url("${safeImages[frame.imageIndex]}")`,
                height: frame.height,
                left: frame.x - frame.width / 2,
                top: frame.y - frame.height / 2,
                width: frame.width,
                zIndex: index + 3,
              }}
              transition={{
                clipPath: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
                default: { duration: 0.38, ease: [0.2, 0, 0, 1] },
                opacity: { duration: 0.3 },
              }}
            >
              <span className={styles.shutterGlint} />
              {showIndices ? (
                <span className={styles.frameIndex}>
                  {String(frame.imageIndex + 1).padStart(2, '0')}
                </span>
              ) : null}
            </motion.span>
          );
        })}
      </AnimatePresence>

      <span className={styles.holdMark} aria-hidden="true">
        {frozen ? 'Held · click to release' : 'Move to develop · click to hold'}
      </span>
    </button>
  );
}
