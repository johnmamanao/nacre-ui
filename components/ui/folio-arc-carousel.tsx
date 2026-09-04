'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './folio-arc-carousel.module.css';

export type FolioArcItem = {
  alt?: string;
  eyebrow?: string;
  src: string;
  title: string;
};

export type FolioArcCarouselProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> & {
  activeIndex?: number;
  arc?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardWidth?: number;
  defaultActiveIndex?: number;
  depth?: number;
  items?: FolioArcItem[];
  loop?: boolean;
  onActiveIndexChange?: (index: number) => void;
  showControls?: boolean;
  showLabels?: boolean;
  sideAngle?: number;
  spacing?: number;
};

const defaultItems: FolioArcItem[] = [
  {
    alt: 'Sunlit modern interior with a long communal table',
    eyebrow: 'Interior / 01',
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=88',
    title: 'A room for exchange',
  },
  {
    alt: 'Geometric concrete building against a pale sky',
    eyebrow: 'Structure / 02',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=88',
    title: 'Measured elevation',
  },
  {
    alt: 'Minimal white building framed by open space',
    eyebrow: 'Form / 03',
    src: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=88',
    title: 'Quiet geometry',
  },
  {
    alt: 'Tall buildings converging toward the sky',
    eyebrow: 'City / 04',
    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=88',
    title: 'Vertical interval',
  },
  {
    alt: 'Contemporary workspace with warm timber details',
    eyebrow: 'Workspace / 05',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88',
    title: 'Working light',
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

export function FolioArcCarousel({
  activeIndex,
  arc = 18,
  autoPlay = false,
  autoPlayInterval = 4800,
  cardWidth = 230,
  className,
  defaultActiveIndex = 2,
  depth = 105,
  items = defaultItems,
  loop = true,
  onActiveIndexChange,
  onKeyDown,
  showControls = true,
  showLabels = true,
  sideAngle = 30,
  spacing = 158,
  ...props
}: FolioArcCarouselProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const safeItems = items.length ? items.slice(0, 9) : defaultItems;
  const safeCardWidth = clamp(cardWidth, 180, 290);
  const safeArc = clamp(arc, 8, 40);
  const safeDepth = clamp(depth, 50, 220);
  const safeSideAngle = clamp(sideAngle, 14, 50);
  const safeSpacing = clamp(spacing, 128, 220);
  const [internalActiveIndex, setInternalActiveIndex] = React.useState(() =>
    Math.round(clamp(defaultActiveIndex, 0, safeItems.length - 1)),
  );
  const [isFocusedWithin, setIsFocusedWithin] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const dragStartX = React.useRef<number | null>(null);
  const suppressClick = React.useRef(false);
  const resolvedActiveIndex = Math.round(
    clamp(activeIndex ?? internalActiveIndex, 0, safeItems.length - 1),
  );

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleFocusIn = () => setIsFocusedWithin(true);
    const handleFocusOut = (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node)) {
        setIsFocusedWithin(false);
        return;
      }
      if (!root.contains(event.relatedTarget)) setIsFocusedWithin(false);
    };

    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('focusout', handleFocusOut);
    return () => {
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  React.useEffect(() => {
    if (!autoPlay || reduceMotion || isFocusedWithin || safeItems.length < 2) {
      return;
    }

    const delay = clamp(autoPlayInterval, 2800, 12000);
    const timeout = window.setTimeout(() => {
      const nextIndex = loop
        ? (resolvedActiveIndex + 1) % safeItems.length
        : Math.min(resolvedActiveIndex + 1, safeItems.length - 1);
      if (nextIndex === resolvedActiveIndex) return;
      if (activeIndex === undefined) setInternalActiveIndex(nextIndex);
      onActiveIndexChange?.(nextIndex);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    activeIndex,
    autoPlay,
    autoPlayInterval,
    isFocusedWithin,
    loop,
    onActiveIndexChange,
    reduceMotion,
    resolvedActiveIndex,
    safeItems.length,
  ]);

  function selectIndex(nextIndex: number) {
    let resolvedIndex = nextIndex;
    if (loop) {
      resolvedIndex =
        ((nextIndex % safeItems.length) + safeItems.length) % safeItems.length;
    } else {
      resolvedIndex = Math.round(clamp(nextIndex, 0, safeItems.length - 1));
    }
    if (resolvedIndex === resolvedActiveIndex) return;
    if (activeIndex === undefined) setInternalActiveIndex(resolvedIndex);
    onActiveIndexChange?.(resolvedIndex);
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
    if (Math.abs(distance) >= 48) {
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

  const spring = reduceMotion
    ? { duration: 0 }
    : { damping: 28, mass: 0.88, stiffness: 195, type: 'spring' as const };
  const canGoPrevious = loop || resolvedActiveIndex > 0;
  const canGoNext = loop || resolvedActiveIndex < safeItems.length - 1;

  return (
    <section
      {...props}
      aria-label="Folio Arc image carousel"
      className={cn(styles.root, className)}
      data-slot="folio-arc-carousel"
      ref={rootRef}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <motion.div
        className={styles.gestureLayer}
        drag={reduceMotion ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        dragMomentum={false}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        whileTap={reduceMotion ? undefined : { cursor: 'grabbing' }}
      >
        <fieldset
          aria-label="Gallery slides"
          className={styles.stage}
          style={{ perspective: `${Math.max(700, safeDepth * 8)}px` }}
        >
          {safeItems.map((item, index) => {
            const offset = relativeOffset(
              index,
              resolvedActiveIndex,
              safeItems.length,
              loop,
            );
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const isVisible = distance <= 2;
            const direction = Math.sign(offset);
            const width = isActive
              ? safeCardWidth
              : safeCardWidth * (distance === 1 ? 0.68 : 0.46);
            const height =
              safeCardWidth * (isActive ? 1.18 : distance === 1 ? 1.04 : 0.9);
            const x =
              direction *
              (safeSpacing * Math.min(distance, 2) +
                (distance > 1 ? safeCardWidth * 0.05 : 0));
            const y = isActive
              ? -safeArc * 0.38
              : safeArc * Math.pow(Math.min(distance, 2), 1.35);

            return (
              <motion.button
                animate={{
                  filter: isActive
                    ? 'brightness(1) saturate(1)'
                    : `brightness(${distance === 1 ? 0.84 : 0.64}) saturate(${distance === 1 ? 0.82 : 0.62})`,
                  height,
                  opacity: isVisible ? (distance === 2 ? 0.64 : 1) : 0,
                  rotateY: isActive
                    ? 0
                    : direction * -(safeSideAngle + (distance - 1) * 7),
                  rotateZ: isActive
                    ? 0
                    : direction * (distance === 1 ? 1.2 : 2.4),
                  scale: isActive ? 1 : distance === 1 ? 0.95 : 0.88,
                  width,
                  x: x - width / 2,
                  y: y - height / 2,
                  z: isActive ? 28 : -safeDepth * distance,
                }}
                aria-label={`Show ${item.title}`}
                aria-pressed={isActive}
                className={styles.card}
                data-active={isActive}
                data-folio-card=""
                disabled={!isVisible}
                initial={false}
                key={`${item.src}-${item.title}`}
                onClick={() => {
                  if (suppressClick.current) return;
                  selectIndex(index);
                }}
                onKeyDown={handleKeyDown}
                style={{
                  left: '50%',
                  top: '50%',
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
                <span className={styles.edgeLight} aria-hidden="true" />
                {showLabels ? (
                  <span className={styles.caption}>
                    <span>{item.eyebrow ?? `Folio / ${index + 1}`}</span>
                    <strong>{item.title}</strong>
                  </span>
                ) : null}
              </motion.button>
            );
          })}
        </fieldset>
      </motion.div>

      {showControls ? (
        <div className={styles.controls} aria-label="Carousel controls">
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
              animate={{ x: resolvedActiveIndex * 24 }}
              aria-hidden="true"
              className={styles.activeMarker}
              initial={false}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.42, ease: [0.2, 0, 0, 1], type: 'tween' }
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
                  <span className={styles.markerDot} aria-hidden="true" />
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
