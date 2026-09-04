'use client';

import * as React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  motion,
  type MotionStyle,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './orbit-ledger.module.css';

export type OrbitLedgerItem = {
  accent?: string;
  alt: string;
  description: string;
  eyebrow?: string;
  href?: string;
  image: string;
  tags?: string[];
  title: string;
  year?: string;
};

export type OrbitLedgerProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> & {
  accent?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardWidth?: number;
  curve?: number;
  defaultActiveIndex?: number;
  depth?: number;
  items?: OrbitLedgerItem[];
  mode?: 'contained' | 'page';
  onActiveIndexChange?: (index: number) => void;
  scrollLength?: number;
  showProgress?: boolean;
  tilt?: number;
};

type OrbitLedgerStyle = React.CSSProperties & {
  '--orbit-accent': string;
  '--orbit-card-width': string;
  '--orbit-scroll-length': string;
};

type OrbitCardStyle = MotionStyle & {
  '--orbit-item-accent': string;
};

const defaultItems: OrbitLedgerItem[] = [
  {
    accent: '#d8a7ff',
    alt: 'Soft violet forms across a dark digital canvas',
    description:
      'A spatial publishing system for collecting research, notes, and references.',
    eyebrow: 'Knowledge system',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=88',
    tags: ['React', 'Motion'],
    title: 'Field Notes',
    year: '2026',
  },
  {
    accent: '#8ed8c9',
    alt: 'A precise architectural structure in pale daylight',
    description:
      'A measured project archive that keeps visual decisions close to their context.',
    eyebrow: 'Editorial archive',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=88',
    tags: ['Next.js', 'TypeScript'],
    title: 'Index House',
    year: '2025',
  },
  {
    accent: '#f1c57b',
    alt: 'Warm light moving across a modern studio interior',
    description:
      'A calm scheduling surface for studios balancing rooms, people, and time.',
    eyebrow: 'Planning tool',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88',
    tags: ['Product', 'Systems'],
    title: 'Open Hours',
    year: '2025',
  },
  {
    accent: '#91b9ff',
    alt: 'Glass towers rising into an open sky',
    description:
      'A responsive data story for comparing change across cities and seasons.',
    eyebrow: 'Data narrative',
    image:
      'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=88',
    tags: ['Data', 'WebGL'],
    title: 'Vertical Atlas',
    year: '2024',
  },
  {
    accent: '#ef9b91',
    alt: 'Concrete passage framed by strong shadows',
    description:
      'A minimal commerce concept built around material, provenance, and care.',
    eyebrow: 'Digital storefront',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=88',
    tags: ['Commerce', 'Design'],
    title: 'Common Matter',
    year: '2024',
  },
  {
    accent: '#b7d987',
    alt: 'Quiet landscape fading into mist at dusk',
    description:
      'An ambient listening room that gives each recording space to unfold.',
    eyebrow: 'Audio experience',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=88',
    tags: ['Audio', 'Interaction'],
    title: 'After Light',
    year: '2023',
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function OrbitCard({
  active,
  cardWidth,
  curve,
  depth,
  index,
  item,
  length,
  progress,
  tilt,
}: {
  active: boolean;
  cardWidth: number;
  curve: number;
  depth: number;
  index: number;
  item: OrbitLedgerItem;
  length: number;
  progress: MotionValue<number>;
  tilt: number;
}) {
  const offset = useTransform(
    progress,
    (value) => index - value * Math.max(length - 1, 1),
  );
  const x = useTransform(offset, (value) => value * cardWidth * 0.86);
  const y = useTransform(
    offset,
    (value) => Math.pow(Math.abs(value), 1.42) * curve,
  );
  const z = useTransform(offset, (value) => -Math.abs(value) * depth);
  const rotateY = useTransform(offset, (value) =>
    clamp(value * -tilt, -72, 72),
  );
  const rotateZ = useTransform(offset, (value) =>
    clamp(value * 1.7 + ((index % 3) - 1) * 1.1, -5, 5),
  );
  const scale = useTransform(
    offset,
    (value) => 1 - Math.min(Math.abs(value), 4) * 0.055,
  );
  const opacity = useTransform(offset, (value) =>
    clamp(1 - Math.max(Math.abs(value) - 1.4, 0) * 0.31, 0, 1),
  );
  const filter = useTransform(offset, (value) => {
    const distance = Math.min(Math.abs(value), 4);
    return `brightness(${1 - distance * 0.11}) saturate(${1 - distance * 0.14})`;
  });

  const cardStyle = {
    '--orbit-item-accent': item.accent ?? 'var(--orbit-accent)',
    filter,
    marginLeft: -cardWidth / 2,
    marginTop: -cardWidth * 0.62,
    opacity,
    rotateY,
    rotateZ,
    scale,
    width: cardWidth,
    x,
    y,
    z,
  } as OrbitCardStyle;

  return (
    <motion.article
      aria-hidden={!active || undefined}
      className={styles.card}
      data-active={active || undefined}
      style={cardStyle}
    >
      <div className={styles.imageFrame}>
        {/* oxlint-disable-next-line next/no-img-element -- This distributable component accepts arbitrary remote image URLs. */}
        <img alt={item.alt} draggable={false} src={item.image} />
        <span className={styles.imageVeil} aria-hidden="true" />
        <span className={styles.index}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.cardCopy}>
        <div className={styles.meta}>
          <span>{item.eyebrow ?? 'Selected work'}</span>
          {item.year ? <span>{item.year}</span> : null}
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className={styles.cardFooter}>
          {item.tags?.length ? (
            <span className={styles.tags}>
              {item.tags.slice(0, 3).join(' · ')}
            </span>
          ) : (
            <span />
          )}
          {item.href ? (
            <a href={item.href} tabIndex={active ? 0 : -1}>
              View project
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function OrbitLedger({
  accent = '#d8a7ff',
  'aria-label': ariaLabel = 'Orbit Ledger project showcase',
  autoPlay = true,
  autoPlayInterval = 3200,
  cardWidth = 246,
  className,
  curve = 22,
  defaultActiveIndex = 0,
  depth = 92,
  items = defaultItems,
  mode = 'page',
  onActiveIndexChange,
  onKeyDown,
  scrollLength = 1600,
  showProgress = true,
  style,
  tilt = 22,
  ...props
}: OrbitLedgerProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const safeItems = items.length ? items.slice(0, 10) : defaultItems;
  const safeCardWidth = clamp(cardWidth, 170, 310);
  const safeCurve = clamp(curve, 8, 54);
  const safeDepth = clamp(depth, 40, 180);
  const safeScrollLength = clamp(scrollLength, 700, 2800);
  const safeTilt = clamp(tilt, 8, 36);
  const safeDefaultIndex = Math.round(
    clamp(defaultActiveIndex, 0, safeItems.length - 1),
  );
  const [activeIndex, setActiveIndex] = React.useState(safeDefaultIndex);
  const activeIndexRef = React.useRef(safeDefaultIndex);
  const autoPlayDirectionRef = React.useRef<1 | -1>(1);

  const pageScroll = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  });
  const containedScroll = useScroll({ container: scrollerRef });
  const sourceProgress =
    mode === 'contained'
      ? containedScroll.scrollYProgress
      : pageScroll.scrollYProgress;
  const smoothProgress = useSpring(sourceProgress, {
    damping: 30,
    mass: 0.72,
    stiffness: 128,
  });
  const progress = reduceMotion ? sourceProgress : smoothProgress;

  const goToIndex = React.useCallback(
    (nextIndex: number, behavior: ScrollBehavior = 'smooth') => {
      const resolvedIndex = Math.round(
        clamp(nextIndex, 0, safeItems.length - 1),
      );
      const nextProgress =
        safeItems.length > 1 ? resolvedIndex / (safeItems.length - 1) : 0;

      if (mode === 'contained') {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        scroller.scrollTo({
          behavior: reduceMotion ? 'auto' : behavior,
          top: nextProgress * (scroller.scrollHeight - scroller.clientHeight),
        });
        return;
      }

      const root = rootRef.current;
      if (!root) return;
      const rootTop = window.scrollY + root.getBoundingClientRect().top;
      window.scrollTo({
        behavior: reduceMotion ? 'auto' : behavior,
        top: rootTop + nextProgress * (root.offsetHeight - window.innerHeight),
      });
    },
    [mode, reduceMotion, safeItems.length],
  );

  React.useEffect(() => {
    if (mode !== 'contained' || safeDefaultIndex === 0) return;
    const frame = window.requestAnimationFrame(() =>
      goToIndex(safeDefaultIndex, 'auto'),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [goToIndex, mode, safeDefaultIndex]);

  React.useEffect(() => {
    if (
      !autoPlay ||
      reduceMotion ||
      mode !== 'contained' ||
      safeItems.length < 2
    ) {
      return;
    }

    const interval = window.setInterval(
      () => {
        const currentIndex = activeIndexRef.current;
        if (currentIndex >= safeItems.length - 1) {
          autoPlayDirectionRef.current = -1;
        } else if (currentIndex <= 0) {
          autoPlayDirectionRef.current = 1;
        }
        goToIndex(currentIndex + autoPlayDirectionRef.current);
      },
      clamp(autoPlayInterval, 1600, 12000),
    );

    return () => window.clearInterval(interval);
  }, [
    autoPlay,
    autoPlayInterval,
    goToIndex,
    mode,
    reduceMotion,
    safeItems.length,
  ]);

  useMotionValueEvent(progress, 'change', (value) => {
    const nextIndex = Math.round(value * Math.max(safeItems.length - 1, 1));
    if (nextIndex === activeIndexRef.current) return;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    onActiveIndexChange?.(nextIndex);
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToIndex(activeIndex - 1);
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToIndex(activeIndex + 1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goToIndex(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goToIndex(safeItems.length - 1);
    }
    onKeyDown?.(event);
  }

  const rootStyle = {
    ...style,
    '--orbit-accent': accent,
    '--orbit-card-width': `${safeCardWidth}px`,
    '--orbit-scroll-length': `${safeScrollLength}px`,
  } as OrbitLedgerStyle;

  if (reduceMotion) {
    return (
      <section
        {...props}
        aria-label={ariaLabel}
        className={cn(styles.root, styles.reducedRoot, className)}
        data-reduced-motion=""
        data-slot="orbit-ledger"
        ref={rootRef}
        style={rootStyle}
      >
        <header className={styles.heading}>
          <span>Project index</span>
          <strong>Selected work in clear view</strong>
        </header>
        <div className={styles.reducedGrid}>
          {safeItems.map((item, index) => (
            <article
              className={styles.reducedCard}
              key={`${item.title}-${index}`}
            >
              {/* oxlint-disable-next-line next/no-img-element -- This distributable component accepts arbitrary remote image URLs. */}
              <img alt={item.alt} src={item.image} />
              <div>
                <span>{item.eyebrow ?? 'Selected work'}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.href ? <a href={item.href}>View project</a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      {...props}
      aria-label={ariaLabel}
      className={cn(styles.root, className)}
      data-mode={mode}
      data-slot="orbit-ledger"
      ref={rootRef}
      style={rootStyle}
    >
      <div className={styles.scroller} ref={scrollerRef}>
        <div className={styles.scrollTrack}>
          <div className={styles.viewport}>
            <header className={styles.heading}>
              <span>Project index</span>
              <strong>Selected work in orbit</strong>
            </header>

            <div className={styles.ambient} aria-hidden="true" />
            <div className={styles.axis} aria-hidden="true" />
            <div className={styles.stage}>
              {safeItems.map((item, index) => (
                <OrbitCard
                  active={index === activeIndex}
                  cardWidth={safeCardWidth}
                  curve={safeCurve}
                  depth={safeDepth}
                  index={index}
                  item={item}
                  key={`${item.title}-${index}`}
                  length={safeItems.length}
                  progress={progress}
                  tilt={safeTilt}
                />
              ))}
            </div>

            {showProgress ? (
              <div className={styles.progress}>
                <div className={styles.progressCount} aria-live="polite">
                  <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
                  <span>/ {String(safeItems.length).padStart(2, '0')}</span>
                </div>
                <div className={styles.progressRail} aria-hidden="true">
                  <motion.span style={{ scaleX: progress }} />
                </div>
                <span className={styles.hint}>Scroll to trace the orbit</span>
                <div className={styles.controls}>
                  <button
                    aria-label="Previous project"
                    disabled={activeIndex === 0}
                    onClick={() => goToIndex(activeIndex - 1)}
                    onKeyDown={handleKeyDown}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    aria-label="Next project"
                    disabled={activeIndex === safeItems.length - 1}
                    onClick={() => goToIndex(activeIndex + 1)}
                    onKeyDown={handleKeyDown}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
