'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './helix-reel.module.css';

export type HelixReelItem = {
  alt?: string;
  eyebrow?: string;
  src: string;
  title: string;
};

export type HelixReelProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> & {
  activeIndex?: number;
  autoPlay?: boolean;
  cardWidth?: number;
  defaultActiveIndex?: number;
  depth?: number;
  interval?: number;
  items?: HelixReelItem[];
  loop?: boolean;
  onActiveIndexChange?: (index: number) => void;
  radius?: number;
  rise?: number;
  showControls?: boolean;
  spread?: number;
};

const defaultItems: HelixReelItem[] = [
  {
    alt: 'Layered modern interior in warm natural light',
    eyebrow: 'Space / 01',
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=88',
    title: 'Shared volume',
  },
  {
    alt: 'Geometric white architecture beneath a pale sky',
    eyebrow: 'Form / 02',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1100&q=88',
    title: 'Open geometry',
  },
  {
    alt: 'Glass building structure viewed from below',
    eyebrow: 'Light / 03',
    src: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1100&q=88',
    title: 'Luminous frame',
  },
  {
    alt: 'Monumental city buildings against an overcast sky',
    eyebrow: 'City / 04',
    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=88',
    title: 'Vertical measure',
  },
  {
    alt: 'Contemporary office with timber details',
    eyebrow: 'Work / 05',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=88',
    title: 'Working atmosphere',
  },
  {
    alt: 'Minimal concrete passage with deep shadows',
    eyebrow: 'Threshold / 06',
    src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=88',
    title: 'Between planes',
  },
  {
    alt: 'Quiet architectural surface at dusk',
    eyebrow: 'Dusk / 07',
    src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1100&q=88',
    title: 'After light',
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function relativeOffset(
  index: number,
  activeIndex: number,
  length: number,
  loop: boolean,
) {
  let offset = index - activeIndex;
  if (!loop || length < 2) return offset;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function HelixReel({
  activeIndex,
  autoPlay = true,
  cardWidth = 188,
  className,
  defaultActiveIndex = 3,
  depth = 185,
  interval = 3200,
  items = defaultItems,
  loop = true,
  onActiveIndexChange,
  onBlurCapture,
  onFocusCapture,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  radius = 246,
  rise = 32,
  showControls = true,
  spread = 34,
  ...props
}: HelixReelProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const safeItems = items.length ? items.slice(0, 11) : defaultItems;
  const safeCardWidth = clamp(cardWidth, 150, 240);
  const safeDepth = clamp(depth, 90, 280);
  const safeInterval = clamp(interval, 1800, 8000);
  const safeRadius = clamp(radius, 180, 330);
  const safeRise = clamp(rise, 18, 58);
  const safeSpread = clamp(spread, 24, 48);
  const [internalActiveIndex, setInternalActiveIndex] = React.useState(() =>
    Math.round(clamp(defaultActiveIndex, 0, safeItems.length - 1)),
  );
  const [hovered, setHovered] = React.useState(false);
  const [focusWithin, setFocusWithin] = React.useState(false);
  const dragStartX = React.useRef<number | null>(null);
  const suppressClick = React.useRef(false);
  const resolvedActiveIndex = Math.round(
    clamp(activeIndex ?? internalActiveIndex, 0, safeItems.length - 1),
  );

  const selectIndex = React.useCallback(
    (nextIndex: number) => {
      let resolvedIndex = nextIndex;
      if (loop) {
        resolvedIndex =
          ((nextIndex % safeItems.length) + safeItems.length) %
          safeItems.length;
      } else {
        resolvedIndex = Math.round(clamp(nextIndex, 0, safeItems.length - 1));
      }
      if (resolvedIndex === resolvedActiveIndex) return;
      if (activeIndex === undefined) setInternalActiveIndex(resolvedIndex);
      onActiveIndexChange?.(resolvedIndex);
    },
    [
      activeIndex,
      loop,
      onActiveIndexChange,
      resolvedActiveIndex,
      safeItems.length,
    ],
  );

  const isPaused = hovered || focusWithin;

  React.useEffect(() => {
    if (!autoPlay || isPaused || reduceMotion || safeItems.length < 2) return;
    const timer = window.setTimeout(
      () => selectIndex(resolvedActiveIndex + 1),
      safeInterval,
    );
    return () => window.clearTimeout(timer);
  }, [
    autoPlay,
    isPaused,
    reduceMotion,
    resolvedActiveIndex,
    safeInterval,
    safeItems.length,
    selectIndex,
  ]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectIndex(resolvedActiveIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectIndex(resolvedActiveIndex + 1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      selectIndex(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      selectIndex(safeItems.length - 1);
    }
    onKeyDown?.(event);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    if (Math.abs(event.clientX - dragStartX.current) > 8) {
      suppressClick.current = true;
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (Math.abs(distance) >= 46) {
      selectIndex(resolvedActiveIndex + (distance < 0 ? 1 : -1));
    }
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = null;
    suppressClick.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const spring = reduceMotion
    ? { duration: 0 }
    : { damping: 26, mass: 0.9, stiffness: 155, type: 'spring' as const };
  const canGoPrevious = loop || resolvedActiveIndex > 0;
  const canGoNext = loop || resolvedActiveIndex < safeItems.length - 1;

  return (
    <section
      aria-label="Helix Reel image gallery"
      className={cn(styles.root, className)}
      data-slot="helix-reel"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
        }
        onBlurCapture?.(event);
      }}
      onFocusCapture={(event) => {
        setFocusWithin(true);
        onFocusCapture?.(event);
      }}
      onPointerEnter={(event) => {
        setHovered(true);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setHovered(false);
        dragStartX.current = null;
        suppressClick.current = false;
        onPointerLeave?.(event);
      }}
      {...props}
    >
      <div className={styles.axisGlow} aria-hidden="true" />
      <motion.div
        className={styles.gestureLayer}
        drag={reduceMotion ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        whileTap={reduceMotion ? undefined : { cursor: 'grabbing' }}
      >
        <fieldset aria-label="Helix slides" className={styles.stage}>
          {safeItems.map((item, index) => {
            const offset = relativeOffset(
              index,
              resolvedActiveIndex,
              safeItems.length,
              loop,
            );
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const isVisible = distance <= 3;
            const angle = offset * safeSpread;
            const radians = (angle * Math.PI) / 180;
            const width = safeCardWidth;
            const height = safeCardWidth * 1.28;
            const x = Math.sin(radians) * safeRadius;
            const y = offset * safeRise;
            const z = (Math.cos(radians) - 1) * safeDepth;
            const opacity = !isVisible
              ? 0
              : distance === 3
                ? 0.34
                : distance === 2
                  ? 0.58
                  : distance === 1
                    ? 0.84
                    : 1;

            return (
              <motion.button
                animate={{
                  filter: `brightness(${1 - distance * 0.13}) saturate(${1 - distance * 0.11})`,
                  opacity,
                  rotateY: clamp(-angle * 0.46, -54, 54),
                  rotateZ: clamp(offset * 1.1, -3.2, 3.2),
                  scale: 1 - Math.min(distance, 3) * 0.075,
                  x: x - width / 2,
                  y: y - height / 2,
                  z,
                }}
                aria-label={`Show ${item.title}. ${item.alt ?? ''}`.trim()}
                aria-pressed={isActive}
                className={styles.card}
                data-active={isActive}
                data-helix-card=""
                disabled={!isVisible}
                initial={false}
                key={`${item.src}-${item.title}`}
                onClick={() => {
                  if (suppressClick.current) return;
                  selectIndex(index);
                }}
                onKeyDown={handleKeyDown}
                style={{
                  height,
                  left: '50%',
                  top: '50%',
                  width,
                  zIndex: safeItems.length - Math.round(distance),
                }}
                tabIndex={isVisible ? 0 : -1}
                transition={spring}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className={styles.image}
                  style={{ backgroundImage: `url("${item.src}")` }}
                />
                <span className={styles.surfaceLight} aria-hidden="true" />
                <span className={styles.caption}>
                  <span>{item.eyebrow ?? `Frame / ${index + 1}`}</span>
                  <strong>{item.title}</strong>
                </span>
              </motion.button>
            );
          })}
        </fieldset>
      </motion.div>

      {showControls ? (
        <div className={styles.controls} aria-label="Helix Reel controls">
          <button
            aria-label="Previous image"
            disabled={!canGoPrevious}
            onClick={() => selectIndex(resolvedActiveIndex - 1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className={styles.markers} aria-label="Choose an image">
            <motion.span
              animate={{ x: resolvedActiveIndex * 28 }}
              aria-hidden="true"
              className={styles.activeMarker}
              initial={false}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.38,
                      ease: [0.2, 0, 0, 1],
                      type: 'tween',
                    }
              }
            />
            {safeItems.map((item, index) => {
              const isActive = index === resolvedActiveIndex;
              return (
                <button
                  aria-label={`Show image ${index + 1}: ${item.title}`}
                  aria-pressed={isActive}
                  className={styles.marker}
                  data-active={isActive}
                  key={`${item.title}-marker`}
                  onClick={() => selectIndex(index)}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.markerDot} />
                </button>
              );
            })}
          </div>
          <span className={styles.announcement} aria-live="polite">
            Image {resolvedActiveIndex + 1} of {safeItems.length}
          </span>
          <button
            aria-label="Next image"
            disabled={!canGoNext}
            onClick={() => selectIndex(resolvedActiveIndex + 1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
