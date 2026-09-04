'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import styles from './editorial-mosaic.module.css';

export type EditorialMosaicItem = {
  src: string;
  alt: string;
  title: string;
  eyebrow?: string;
};

export type EditorialMosaicProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  gap?: number;
  initialIndex?: number;
  items?: EditorialMosaicItem[];
  radius?: number;
  showLabels?: boolean;
  onActiveChange?: (index: number | null) => void;
};

const defaultItems: EditorialMosaicItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    alt: 'Warm modern studio interior',
    title: 'The quiet studio',
    eyebrow: 'Workspace / 01',
  },
  {
    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85',
    alt: 'Concrete geometric building facade',
    title: 'Measured light',
    eyebrow: 'Architecture / 02',
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85',
    alt: 'Contemporary house surrounded by trees',
    title: 'A softer threshold',
    eyebrow: 'Residence / 03',
  },
  {
    src: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Tall city buildings viewed from below',
    title: 'Vertical rhythm',
    eyebrow: 'City / 04',
  },
  {
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85',
    alt: 'Minimal white modern house',
    title: 'Open geometry',
    eyebrow: 'Form / 05',
  },
];

const transition = {
  damping: 28,
  mass: 0.78,
  stiffness: 280,
  type: 'spring' as const,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function EditorialMosaic({
  className,
  gap = 8,
  initialIndex = -1,
  items = defaultItems,
  onActiveChange,
  radius = 12,
  showLabels = true,
  ...props
}: EditorialMosaicProps) {
  const reduceMotion = useReducedMotion();
  const safeItems = React.useMemo(
    () => (items.length ? items.slice(0, 5) : defaultItems),
    [items],
  );
  const layoutTransition = reduceMotion ? { duration: 0 } : transition;
  const normalizedInitialIndex =
    initialIndex < 0 ? null : clamp(initialIndex, 0, safeItems.length - 1);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    normalizedInitialIndex,
  );

  const orderedItems = React.useMemo(() => {
    const indexed = safeItems.map((item, index) => ({ index, item }));
    if (activeIndex === null) return indexed;
    return [
      indexed[activeIndex],
      ...indexed.filter(({ index }) => index !== activeIndex),
    ].filter(Boolean) as Array<{ index: number; item: EditorialMosaicItem }>;
  }, [activeIndex, safeItems]);

  function setActive(nextIndex: number | null) {
    setActiveIndex(nextIndex);
    onActiveChange?.(nextIndex);
  }

  const focused = activeIndex !== null;
  const activeItem = focused ? safeItems[activeIndex] : null;

  return (
    <div
      data-slot="editorial-mosaic"
      data-focused={focused}
      className={cn(styles.root, className)}
      style={
        {
          '--mosaic-gap': `${clamp(gap, 2, 20)}px`,
          '--mosaic-radius': `${clamp(radius, 0, 28)}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <motion.div
        className={styles.stage}
        data-mode={focused ? 'focus' : 'overview'}
        layout
        transition={layoutTransition}
      >
        {orderedItems.map(({ index, item }, orderIndex) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              aria-label={
                isActive
                  ? `Return to mosaic overview from ${item.title}`
                  : `Feature ${item.title}`
              }
              aria-pressed={isActive}
              className={styles.frame}
              data-active={isActive}
              key={`${item.src}-${index}`}
              layout
              transition={layoutTransition}
              type="button"
              whileFocus={reduceMotion ? undefined : { scale: 0.99 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              onClick={() => setActive(isActive ? null : index)}
            >
              <motion.img
                alt={item.alt}
                className={styles.image}
                draggable="false"
                layoutId={`editorial-mosaic-image-${index}`}
                loading="lazy"
                src={item.src}
                transition={layoutTransition}
              />
              <span className={styles.shade} aria-hidden="true" />
              {showLabels ? (
                <span className={styles.caption}>
                  <small>{item.eyebrow ?? `Story / 0${index + 1}`}</small>
                  <strong>{item.title}</strong>
                </span>
              ) : null}
              {!isActive ? (
                <span className={styles.openCue} aria-hidden="true">
                  <ArrowUpRight />
                </span>
              ) : null}
              {focused && !isActive ? (
                <span className={styles.railIndex} aria-hidden="true">
                  {String(orderIndex).padStart(2, '0')}
                </span>
              ) : null}
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className={styles.storyMeta}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.24, ease: [0.2, 0, 0, 1] }
            }
            aria-live="polite"
          >
            <span>{activeItem.eyebrow}</span>
            <strong>{activeItem.title}</strong>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
