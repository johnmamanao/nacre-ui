'use client';

import {
  ArrowDownToLine,
  Bookmark,
  BookmarkCheck,
  Check,
  Clipboard,
  ClipboardCheck,
  Copy,
  Download,
  FileCheck,
  Heart,
  HeartPulse,
  History,
  ListFilter,
  ListFilterPlus,
  LoaderCircle,
  LockKeyhole,
  LockOpen,
  Moon,
  Pause,
  Play,
  RefreshCw,
  Save,
  Send,
  SendHorizontal,
  Sun,
  Volume2,
  VolumeX,
  type IconNode,
} from 'lucide';
import { MorphIcon } from 'morphicons/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './micro-buttons.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function HoverMorphIcon({
  className,
  hoverIcon,
  icon,
}: {
  className?: string;
  hoverIcon: IconNode;
  icon: IconNode;
}) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const button = root?.closest('button');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!button || !canHover.matches) return;

    const enter = () => {
      if (!(button instanceof HTMLButtonElement) || !button.disabled)
        setHovered(true);
    };
    const leave = () => setHovered(false);
    const commit = () => setHovered(false);
    button.addEventListener('pointerenter', enter);
    button.addEventListener('pointerleave', leave);
    button.addEventListener('click', commit);
    return () => {
      button.removeEventListener('pointerenter', enter);
      button.removeEventListener('pointerleave', leave);
      button.removeEventListener('click', commit);
    };
  }, []);

  return (
    <span
      ref={rootRef}
      className={cn(styles.morphIcon, className)}
      aria-hidden="true"
    >
      <MorphIcon
        icon={hovered ? hoverIcon : icon}
        reducedMotion="user"
        size={18}
        spring="snappy"
        strokeWidth={1.65}
      />
    </span>
  );
}

export type CopyButtonProps = Omit<ButtonProps, 'onCopy'> & {
  copiedLabel?: string;
  label?: string;
  onCopy?: () => void | Promise<void>;
  resetDelay?: number;
  text?: string;
};

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      className,
      copiedLabel = 'Copied',
      disabled,
      label = 'Copy',
      onClick,
      onCopy,
      resetDelay = 1800,
      text,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [copied, setCopied] = React.useState(false);
    const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    React.useEffect(
      () => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
      },
      [],
    );

    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;

      try {
        if (onCopy) await onCopy();
        else if (text) await navigator.clipboard.writeText(text);
        else return;
        setCopied(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(
          () => setCopied(false),
          Math.max(resetDelay, 500),
        );
      } catch {
        setCopied(false);
      }
    }

    return (
      <button
        ref={ref}
        aria-label={copied ? copiedLabel : label}
        aria-live="polite"
        className={cn(styles.button, styles.copyButton, className)}
        data-state={copied ? 'copied' : 'idle'}
        data-slot="copy-button"
        disabled={disabled}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.copyGlyph}
          hoverIcon={copied ? Clipboard : ClipboardCheck}
          icon={copied ? ClipboardCheck : Copy}
        />
        <span className={styles.copyLabels} aria-hidden="true">
          <span className={styles.idleLabel}>{label}</span>
          <span className={styles.successLabel}>{copiedLabel}</span>
        </span>
      </button>
    );
  },
);

CopyButton.displayName = 'CopyButton';

export type MuteButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  defaultMuted?: boolean;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  showLabel?: boolean;
};

export const MuteButton = React.forwardRef<HTMLButtonElement, MuteButtonProps>(
  function MuteButton(
    {
      className,
      defaultMuted = false,
      disabled,
      muted: controlledMuted,
      onClick,
      onMutedChange,
      showLabel = true,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalMuted, setInternalMuted] = React.useState(defaultMuted);
    const muted = controlledMuted ?? internalMuted;
    const label = muted ? 'Unmute' : 'Mute';

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const nextMuted = !muted;
      if (controlledMuted === undefined) setInternalMuted(nextMuted);
      onMutedChange?.(nextMuted);
    }

    return (
      <button
        ref={ref}
        aria-label={label}
        aria-pressed={muted}
        className={cn(styles.button, styles.muteButton, className)}
        data-state={muted ? 'muted' : 'audible'}
        data-slot="mute-button"
        disabled={disabled}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.muteGlyph}
          hoverIcon={muted ? Volume2 : VolumeX}
          icon={muted ? VolumeX : Volume2}
        />
        {showLabel ? (
          <span className={styles.muteLabels} aria-hidden="true">
            <span className={styles.idleLabel}>Mute</span>
            <span className={styles.successLabel}>Unmute</span>
          </span>
        ) : null}
      </button>
    );
  },
);

MuteButton.displayName = 'MuteButton';

export type DownloadButtonStatus = 'idle' | 'downloading' | 'complete';

export type DownloadButtonProps = Omit<ButtonProps, 'onProgress'> & {
  completeLabel?: string;
  downloadingLabel?: string;
  label?: string;
  onDownload?: () => void | Promise<void>;
  resetDelay?: number;
  status?: DownloadButtonStatus;
};

export const DownloadButton = React.forwardRef<
  HTMLButtonElement,
  DownloadButtonProps
>(function DownloadButton(
  {
    className,
    completeLabel = 'Downloaded',
    disabled,
    downloadingLabel = 'Downloading',
    label = 'Download',
    onClick,
    onDownload,
    resetDelay = 1800,
    status: controlledStatus,
    type = 'button',
    ...props
  },
  ref,
) {
  const [internalStatus, setInternalStatus] =
    React.useState<DownloadButtonStatus>('idle');
  const status = controlledStatus ?? internalStatus;
  const accessibleLabel =
    status === 'downloading'
      ? downloadingLabel
      : status === 'complete'
        ? completeLabel
        : label;
  const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const requestId = React.useRef(0);

  React.useEffect(
    () => () => {
      requestId.current += 1;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      status === 'downloading' ||
      !onDownload
    )
      return;

    const currentRequest = ++requestId.current;
    if (controlledStatus === undefined) setInternalStatus('downloading');

    try {
      await onDownload();
      if (currentRequest !== requestId.current) return;
      if (controlledStatus === undefined) {
        setInternalStatus('complete');
        resetTimer.current = setTimeout(
          () => setInternalStatus('idle'),
          Math.max(resetDelay, 500),
        );
      }
    } catch {
      if (
        currentRequest === requestId.current &&
        controlledStatus === undefined
      )
        setInternalStatus('idle');
    }
  }

  return (
    <button
      ref={ref}
      aria-busy={status === 'downloading'}
      aria-label={accessibleLabel}
      aria-live="polite"
      className={cn(styles.button, styles.downloadButton, className)}
      data-state={status}
      data-slot="download-button"
      disabled={disabled || status === 'downloading'}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <HoverMorphIcon
        className={styles.downloadIcon}
        hoverIcon={status === 'complete' ? Download : ArrowDownToLine}
        icon={
          status === 'downloading'
            ? LoaderCircle
            : status === 'complete'
              ? ClipboardCheck
              : Download
        }
      />
      <span className={styles.downloadProgress} aria-hidden="true" />
      <span className={styles.downloadLabels} aria-hidden="true">
        <span>{label}</span>
        <span>{downloadingLabel}</span>
        <span>{completeLabel}</span>
      </span>
    </button>
  );
});

DownloadButton.displayName = 'DownloadButton';

export type LikeButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  defaultLiked?: boolean;
  label?: string;
  liked?: boolean;
  likedLabel?: string;
  onLikedChange?: (liked: boolean) => void;
};

export const LikeButton = React.forwardRef<HTMLButtonElement, LikeButtonProps>(
  function LikeButton(
    {
      className,
      defaultLiked = false,
      disabled,
      label = 'Like',
      liked: controlledLiked,
      likedLabel = 'Liked',
      onClick,
      onLikedChange,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalLiked, setInternalLiked] = React.useState(defaultLiked);
    const liked = controlledLiked ?? internalLiked;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const nextLiked = !liked;
      if (controlledLiked === undefined) setInternalLiked(nextLiked);
      onLikedChange?.(nextLiked);
    }

    return (
      <button
        ref={ref}
        aria-label={liked ? likedLabel : label}
        aria-pressed={liked}
        className={cn(styles.button, styles.likeButton, className)}
        data-slot="like-button"
        data-state={liked ? 'liked' : 'idle'}
        disabled={disabled}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.likeIcon}
          hoverIcon={HeartPulse}
          icon={liked ? HeartPulse : Heart}
        />
        <span className={styles.likeLabels} aria-hidden="true">
          <span className={styles.idleLabel}>{label}</span>
          <span className={styles.successLabel}>{likedLabel}</span>
        </span>
      </button>
    );
  },
);

LikeButton.displayName = 'LikeButton';

export type ThemeButtonTheme = 'light' | 'dark';

export type ThemeButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  defaultTheme?: ThemeButtonTheme;
  onThemeChange?: (theme: ThemeButtonTheme) => void;
  showLabel?: boolean;
  theme?: ThemeButtonTheme;
};

export const ThemeButton = React.forwardRef<
  HTMLButtonElement,
  ThemeButtonProps
>(function ThemeButton(
  {
    className,
    defaultTheme = 'light',
    disabled,
    onClick,
    onThemeChange,
    showLabel = true,
    theme: controlledTheme,
    type = 'button',
    ...props
  },
  ref,
) {
  const [internalTheme, setInternalTheme] =
    React.useState<ThemeButtonTheme>(defaultTheme);
  const theme = controlledTheme ?? internalTheme;
  const isDark = theme === 'dark';
  const actionLabel = isDark ? 'Use light theme' : 'Use dark theme';

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const nextTheme = isDark ? 'light' : 'dark';
    if (controlledTheme === undefined) setInternalTheme(nextTheme);
    onThemeChange?.(nextTheme);
  }

  return (
    <button
      ref={ref}
      aria-label={actionLabel}
      aria-pressed={isDark}
      className={cn(styles.button, styles.themeButton, className)}
      data-slot="theme-button"
      data-state={theme}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <HoverMorphIcon
        className={styles.themeGlyph}
        hoverIcon={isDark ? Sun : Moon}
        icon={isDark ? Moon : Sun}
      />
      {showLabel ? (
        <span className={styles.themeLabels} aria-hidden="true">
          <span className={styles.idleLabel}>Light</span>
          <span className={styles.successLabel}>Dark</span>
        </span>
      ) : null}
    </button>
  );
});

ThemeButton.displayName = 'ThemeButton';

export type RefreshButtonStatus = 'idle' | 'refreshing' | 'complete';

export type RefreshButtonProps = ButtonProps & {
  completeLabel?: string;
  label?: string;
  onRefresh?: () => void | Promise<void>;
  refreshingLabel?: string;
  resetDelay?: number;
  status?: RefreshButtonStatus;
};

export const RefreshButton = React.forwardRef<
  HTMLButtonElement,
  RefreshButtonProps
>(function RefreshButton(
  {
    className,
    completeLabel = 'Updated',
    disabled,
    label = 'Refresh',
    onClick,
    onRefresh,
    refreshingLabel = 'Refreshing',
    resetDelay = 1400,
    status: controlledStatus,
    type = 'button',
    ...props
  },
  ref,
) {
  const [internalStatus, setInternalStatus] =
    React.useState<RefreshButtonStatus>('idle');
  const status = controlledStatus ?? internalStatus;
  const accessibleLabel =
    status === 'refreshing'
      ? refreshingLabel
      : status === 'complete'
        ? completeLabel
        : label;
  const requestId = React.useRef(0);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(
    () => () => {
      requestId.current += 1;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      status === 'refreshing' ||
      !onRefresh
    )
      return;

    const currentRequest = ++requestId.current;
    if (controlledStatus === undefined) setInternalStatus('refreshing');

    try {
      await onRefresh();
      if (currentRequest !== requestId.current) return;
      if (controlledStatus === undefined) {
        setInternalStatus('complete');
        resetTimer.current = setTimeout(
          () => setInternalStatus('idle'),
          Math.max(resetDelay, 500),
        );
      }
    } catch {
      if (
        currentRequest === requestId.current &&
        controlledStatus === undefined
      )
        setInternalStatus('idle');
    }
  }

  return (
    <button
      ref={ref}
      aria-busy={status === 'refreshing'}
      aria-label={accessibleLabel}
      aria-live="polite"
      className={cn(styles.button, styles.refreshButton, className)}
      data-slot="refresh-button"
      data-state={status}
      disabled={disabled || status === 'refreshing'}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <HoverMorphIcon
        className={styles.refreshIcon}
        hoverIcon={History}
        icon={
          status === 'refreshing'
            ? LoaderCircle
            : status === 'complete'
              ? Check
              : RefreshCw
        }
      />
      <span className={styles.refreshLabels} aria-hidden="true">
        <span>{label}</span>
        <span>{refreshingLabel}</span>
        <span>{completeLabel}</span>
      </span>
    </button>
  );
});

RefreshButton.displayName = 'RefreshButton';

export type BookmarkButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  bookmarked?: boolean;
  bookmarkedLabel?: string;
  defaultBookmarked?: boolean;
  label?: string;
  onBookmarkedChange?: (bookmarked: boolean) => void;
};

export const BookmarkButton = React.forwardRef<
  HTMLButtonElement,
  BookmarkButtonProps
>(function BookmarkButton(
  {
    bookmarked: controlledBookmarked,
    bookmarkedLabel = 'Saved',
    className,
    defaultBookmarked = false,
    disabled,
    label = 'Bookmark',
    onBookmarkedChange,
    onClick,
    type = 'button',
    ...props
  },
  ref,
) {
  const [internalBookmarked, setInternalBookmarked] =
    React.useState(defaultBookmarked);
  const bookmarked = controlledBookmarked ?? internalBookmarked;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const nextBookmarked = !bookmarked;
    if (controlledBookmarked === undefined)
      setInternalBookmarked(nextBookmarked);
    onBookmarkedChange?.(nextBookmarked);
  }

  return (
    <button
      ref={ref}
      aria-label={bookmarked ? bookmarkedLabel : label}
      aria-pressed={bookmarked}
      className={cn(styles.button, styles.bookmarkButton, className)}
      data-slot="bookmark-button"
      data-state={bookmarked ? 'bookmarked' : 'idle'}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <HoverMorphIcon
        className={styles.bookmarkIcon}
        hoverIcon={bookmarked ? Bookmark : BookmarkCheck}
        icon={bookmarked ? BookmarkCheck : Bookmark}
      />
      <span className={styles.bookmarkLabels} aria-hidden="true">
        <span>{label}</span>
        <span>{bookmarkedLabel}</span>
      </span>
    </button>
  );
});

BookmarkButton.displayName = 'BookmarkButton';

export type LockButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  defaultLocked?: boolean;
  label?: string;
  locked?: boolean;
  lockedLabel?: string;
  onLockedChange?: (locked: boolean) => void;
};

export const LockButton = React.forwardRef<HTMLButtonElement, LockButtonProps>(
  function LockButton(
    {
      className,
      defaultLocked = false,
      disabled,
      label = 'Lock',
      locked: controlledLocked,
      lockedLabel = 'Locked',
      onClick,
      onLockedChange,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalLocked, setInternalLocked] = React.useState(defaultLocked);
    const locked = controlledLocked ?? internalLocked;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const nextLocked = !locked;
      if (controlledLocked === undefined) setInternalLocked(nextLocked);
      onLockedChange?.(nextLocked);
    }

    return (
      <button
        ref={ref}
        aria-label={locked ? 'Unlock' : label}
        aria-pressed={locked}
        className={cn(styles.button, styles.lockButton, className)}
        data-slot="lock-button"
        data-state={locked ? 'locked' : 'unlocked'}
        disabled={disabled}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.lockIcon}
          hoverIcon={locked ? LockOpen : LockKeyhole}
          icon={locked ? LockKeyhole : LockOpen}
        />
        <span className={styles.lockLabels} aria-hidden="true">
          <span>{label}</span>
          <span>{lockedLabel}</span>
        </span>
      </button>
    );
  },
);

LockButton.displayName = 'LockButton';

export type PlayButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  defaultPlaying?: boolean;
  label?: string;
  onPlayingChange?: (playing: boolean) => void;
  pauseLabel?: string;
  playing?: boolean;
};

export const PlayButton = React.forwardRef<HTMLButtonElement, PlayButtonProps>(
  function PlayButton(
    {
      className,
      defaultPlaying = false,
      disabled,
      label = 'Play',
      onClick,
      onPlayingChange,
      pauseLabel = 'Pause',
      playing: controlledPlaying,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalPlaying, setInternalPlaying] =
      React.useState(defaultPlaying);
    const playing = controlledPlaying ?? internalPlaying;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const nextPlaying = !playing;
      if (controlledPlaying === undefined) setInternalPlaying(nextPlaying);
      onPlayingChange?.(nextPlaying);
    }

    return (
      <button
        ref={ref}
        aria-label={playing ? pauseLabel : label}
        aria-pressed={playing}
        className={cn(styles.button, styles.playButton, className)}
        data-slot="play-button"
        data-state={playing ? 'playing' : 'paused'}
        disabled={disabled}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.playIcon}
          hoverIcon={playing ? Play : Pause}
          icon={playing ? Pause : Play}
        />
        <span className={styles.playLabels} aria-hidden="true">
          <span>{label}</span>
          <span>{pauseLabel}</span>
        </span>
      </button>
    );
  },
);

PlayButton.displayName = 'PlayButton';

export type FilterButtonProps = Omit<ButtonProps, 'defaultValue'> & {
  active?: boolean;
  activeLabel?: string;
  defaultActive?: boolean;
  label?: string;
  onActiveChange?: (active: boolean) => void;
};

export const FilterButton = React.forwardRef<
  HTMLButtonElement,
  FilterButtonProps
>(function FilterButton(
  {
    active: controlledActive,
    activeLabel = 'Applied',
    className,
    defaultActive = false,
    disabled,
    label = 'Filter',
    onActiveChange,
    onClick,
    type = 'button',
    ...props
  },
  ref,
) {
  const [internalActive, setInternalActive] = React.useState(defaultActive);
  const active = controlledActive ?? internalActive;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const nextActive = !active;
    if (controlledActive === undefined) setInternalActive(nextActive);
    onActiveChange?.(nextActive);
  }

  return (
    <button
      ref={ref}
      aria-label={active ? 'Clear filter' : label}
      aria-pressed={active}
      className={cn(styles.button, styles.filterButton, className)}
      data-slot="filter-button"
      data-state={active ? 'active' : 'idle'}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <HoverMorphIcon
        className={styles.filterIcon}
        hoverIcon={active ? ListFilter : ListFilterPlus}
        icon={active ? ListFilterPlus : ListFilter}
      />
      <span className={styles.filterLabels} aria-hidden="true">
        <span>{label}</span>
        <span>{activeLabel}</span>
      </span>
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

type AsyncActionStatus = 'idle' | 'pending' | 'complete';

type AsyncActionButtonProps = ButtonProps & {
  completeLabel?: string;
  label?: string;
  pendingLabel?: string;
  resetDelay?: number;
  status?: AsyncActionStatus;
};

export type SendButtonProps = AsyncActionButtonProps & {
  onSend?: () => void | Promise<void>;
};

export const SendButton = React.forwardRef<HTMLButtonElement, SendButtonProps>(
  function SendButton(
    {
      className,
      completeLabel = 'Sent',
      disabled,
      label = 'Send',
      onClick,
      onSend,
      pendingLabel = 'Sending',
      resetDelay = 1400,
      status: controlledStatus,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalStatus, setInternalStatus] =
      React.useState<AsyncActionStatus>('idle');
    const status = controlledStatus ?? internalStatus;
    const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    React.useEffect(
      () => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
      },
      [],
    );

    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled || status === 'pending' || !onSend)
        return;
      if (controlledStatus === undefined) setInternalStatus('pending');
      try {
        await onSend();
        if (controlledStatus === undefined) {
          setInternalStatus('complete');
          resetTimer.current = setTimeout(
            () => setInternalStatus('idle'),
            Math.max(resetDelay, 500),
          );
        }
      } catch {
        if (controlledStatus === undefined) setInternalStatus('idle');
      }
    }

    const accessibleLabel =
      status === 'pending'
        ? pendingLabel
        : status === 'complete'
          ? completeLabel
          : label;

    return (
      <button
        ref={ref}
        aria-busy={status === 'pending'}
        aria-label={accessibleLabel}
        aria-live="polite"
        className={cn(styles.button, styles.sendButton, className)}
        data-slot="send-button"
        data-state={status}
        disabled={disabled || status === 'pending'}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.sendIcon}
          hoverIcon={SendHorizontal}
          icon={status === 'complete' ? Check : Send}
        />
        <span className={styles.sendLabels} aria-hidden="true">
          <span>{label}</span>
          <span>{pendingLabel}</span>
          <span>{completeLabel}</span>
        </span>
      </button>
    );
  },
);

SendButton.displayName = 'SendButton';

export type SaveButtonProps = AsyncActionButtonProps & {
  onSave?: () => void | Promise<void>;
};

export const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(
  function SaveButton(
    {
      className,
      completeLabel = 'Saved',
      disabled,
      label = 'Save',
      onClick,
      onSave,
      pendingLabel = 'Saving',
      resetDelay = 1400,
      status: controlledStatus,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const [internalStatus, setInternalStatus] =
      React.useState<AsyncActionStatus>('idle');
    const status = controlledStatus ?? internalStatus;
    const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    React.useEffect(
      () => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
      },
      [],
    );

    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled || status === 'pending' || !onSave)
        return;
      if (controlledStatus === undefined) setInternalStatus('pending');
      try {
        await onSave();
        if (controlledStatus === undefined) {
          setInternalStatus('complete');
          resetTimer.current = setTimeout(
            () => setInternalStatus('idle'),
            Math.max(resetDelay, 500),
          );
        }
      } catch {
        if (controlledStatus === undefined) setInternalStatus('idle');
      }
    }

    const accessibleLabel =
      status === 'pending'
        ? pendingLabel
        : status === 'complete'
          ? completeLabel
          : label;

    return (
      <button
        ref={ref}
        aria-busy={status === 'pending'}
        aria-label={accessibleLabel}
        aria-live="polite"
        className={cn(styles.button, styles.saveButton, className)}
        data-slot="save-button"
        data-state={status}
        disabled={disabled || status === 'pending'}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <HoverMorphIcon
          className={styles.saveIcon}
          hoverIcon={FileCheck}
          icon={status === 'complete' ? Check : Save}
        />
        <span className={styles.saveLabels} aria-hidden="true">
          <span>{label}</span>
          <span>{pendingLabel}</span>
          <span>{completeLabel}</span>
        </span>
      </button>
    );
  },
);

SaveButton.displayName = 'SaveButton';
