'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bell, Grid2X2, Plus, Search, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';

import styles from './halo-dock.module.css';

export type HaloDockItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: boolean;
  emphasis?: boolean;
};

export type HaloDockProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  activeId?: string;
  defaultActiveId?: string;
  items?: HaloDockItem[];
  lift?: number;
  magnification?: number;
  showLabels?: boolean;
  size?: number;
  onActiveChange?: (id: string) => void;
};

const defaultItems: HaloDockItem[] = [
  { id: 'library', label: 'Library', icon: <Grid2X2 /> },
  { id: 'search', label: 'Search', icon: <Search /> },
  { id: 'create', label: 'Create', icon: <Plus />, emphasis: true },
  { id: 'updates', label: 'Updates', icon: <Bell />, badge: true },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type DockItemProps = {
  active: boolean;
  item: HaloDockItem;
  lift: number;
  magnification: number;
  reduceMotion: boolean;
  showLabel: boolean;
  size: number;
  onSelect: () => void;
};

function DockItem({
  active,
  item,
  lift,
  magnification,
  reduceMotion,
  showLabel,
  size,
  onSelect,
}: DockItemProps) {
  const [engaged, setEngaged] = React.useState(false);
  const springConfig = { damping: 24, mass: 0.38, stiffness: 330 };
  const expanded = engaged && !reduceMotion;

  return (
    <motion.div
      animate={{ width: expanded ? magnification : size }}
      className={styles.itemSlot}
      initial={false}
      transition={reduceMotion ? { duration: 0 } : springConfig}
    >
      <AnimatePresence>
        {showLabel && engaged ? (
          <motion.span
            aria-hidden="true"
            className={styles.tooltip}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 3 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.16,
              ease: [0.2, 0, 0, 1],
            }}
          >
            {item.label}
          </motion.span>
        ) : null}
      </AnimatePresence>
      <motion.button
        aria-label={item.label}
        aria-pressed={active}
        animate={{
          height: expanded ? magnification : size,
          width: expanded ? magnification : size,
          y: expanded ? -lift : 0,
        }}
        className={styles.item}
        data-active={active}
        data-emphasis={item.emphasis || undefined}
        initial={false}
        transition={reduceMotion ? { duration: 0 } : springConfig}
        type="button"
        whileTap={reduceMotion ? undefined : { scale: 0.92 }}
        onBlur={() => setEngaged(false)}
        onClick={onSelect}
        onFocus={() => setEngaged(true)}
        onPointerEnter={() => setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
      >
        <span className={styles.icon} aria-hidden="true">
          {item.icon}
        </span>
        {item.badge ? (
          <span className={styles.badge} aria-hidden="true" />
        ) : null}
      </motion.button>
    </motion.div>
  );
}

export function HaloDock({
  activeId,
  className,
  defaultActiveId = 'library',
  items = defaultItems,
  lift = 12,
  magnification = 76,
  onActiveChange,
  showLabels = true,
  size = 46,
  ...props
}: HaloDockProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const safeItems = items.length ? items.slice(0, 8) : defaultItems;
  const [internalActiveId, setInternalActiveId] =
    React.useState(defaultActiveId);
  const currentActiveId = activeId ?? internalActiveId;
  const baseSize = clamp(size, 36, 58);
  const peakSize = clamp(magnification, baseSize, 94);
  const liftDistance = clamp(lift, 0, 20);

  function handleSelect(id: string) {
    if (activeId === undefined) setInternalActiveId(id);
    onActiveChange?.(id);
  }

  return (
    <div
      className={cn(styles.root, className)}
      data-slot="halo-dock"
      style={{ '--dock-size': `${baseSize}px` } as React.CSSProperties}
      {...props}
    >
      <div className={styles.rail} role="toolbar" aria-label="Quick actions">
        {safeItems.map((item) => (
          <DockItem
            active={item.id === currentActiveId}
            item={item}
            key={item.id}
            lift={liftDistance}
            magnification={peakSize}
            reduceMotion={reduceMotion}
            showLabel={showLabels}
            size={baseSize}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
