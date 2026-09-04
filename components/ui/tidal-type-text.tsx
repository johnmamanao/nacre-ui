'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './tidal-type-text.module.css';

type TidalTypeStyle = React.CSSProperties & {
  '--tidal-accent': string;
};

type TidalGlyphStyle = React.CSSProperties & {
  '--tidal-idle-index': number;
};

export type TidalTypeTextProps = React.HTMLAttributes<HTMLElement> & {
  accent?: string;
  as?: React.ElementType;
  radius?: number;
  strength?: number;
  text: string;
};

function TidalTypeText({
  accent = 'currentColor',
  as: Component = 'p',
  className,
  onPointerLeave,
  onPointerMove,
  radius = 190,
  strength = 14,
  style,
  text,
  ...props
}: TidalTypeTextProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const glyphRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = React.useRef<number | undefined>(undefined);
  const pointerRef = React.useRef({ x: 0, y: 0 });
  const reducedMotionRef = React.useRef(false);
  const safeRadius = Math.min(Math.max(radius, 90), 360);
  const safeStrength = Math.min(Math.max(strength, 0), 24);
  const characters = Array.from(text);

  const resetField = React.useCallback(() => {
    if (frameRef.current !== undefined) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }

    rootRef.current?.removeAttribute('data-active');
    glyphRefs.current.forEach((glyph) => {
      glyph?.style.setProperty('--tidal-x', '0px');
      glyph?.style.setProperty('--tidal-y', '0px');
      glyph?.style.setProperty('--tidal-scale', '1');
      glyph?.style.setProperty('--tidal-rotate', '0deg');
    });
  }, []);

  const updateField = React.useCallback(() => {
    frameRef.current = undefined;
    const root = rootRef.current;
    if (!root || reducedMotionRef.current) return;

    const rootBounds = root.getBoundingClientRect();
    root.setAttribute('data-active', 'true');
    root.style.setProperty(
      '--tidal-lens-x',
      `${pointerRef.current.x - rootBounds.left}px`,
    );
    root.style.setProperty(
      '--tidal-lens-y',
      `${pointerRef.current.y - rootBounds.top}px`,
    );

    glyphRefs.current.forEach((glyph) => {
      if (!glyph) return;

      const bounds = glyph.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = centerX - pointerRef.current.x;
      const deltaY = centerY - pointerRef.current.y;
      const distance = Math.max(Math.hypot(deltaX, deltaY), 1);
      const influence = Math.max(0, 1 - distance / safeRadius) ** 2;
      const displacement = influence * safeStrength;

      glyph.style.setProperty(
        '--tidal-x',
        `${(deltaX / distance) * displacement}px`,
      );
      glyph.style.setProperty(
        '--tidal-y',
        `${(deltaY / distance) * displacement * 0.62}px`,
      );
      glyph.style.setProperty('--tidal-scale', `${1 + influence * 0.055}`);
      glyph.style.setProperty(
        '--tidal-rotate',
        `${(deltaX / safeRadius) * influence * 4.5}deg`,
      );
    });
  }, [safeRadius, safeStrength]);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) resetField();
    };

    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => {
      media.removeEventListener('change', updatePreference);
      resetField();
    };
  }, [resetField]);

  let glyphIndex = 0;
  const tidalStyle = {
    ...style,
    '--tidal-accent': accent,
  } as TidalTypeStyle;

  return (
    <Component
      ref={rootRef}
      data-slot="tidal-type-text"
      aria-label={text}
      className={cn(styles.root, className)}
      style={tidalStyle}
      onPointerMove={(event: React.PointerEvent<HTMLElement>) => {
        if (!reducedMotionRef.current && event.pointerType !== 'touch') {
          pointerRef.current = { x: event.clientX, y: event.clientY };
          if (frameRef.current === undefined) {
            frameRef.current = requestAnimationFrame(updateField);
          }
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event: React.PointerEvent<HTMLElement>) => {
        resetField();
        onPointerLeave?.(event);
      }}
      {...props}
    >
      <span className={styles.lens} aria-hidden="true" />
      <span className={styles.copy} aria-hidden="true">
        {characters.map((character, index) => {
          if (/\s/.test(character)) {
            return (
              <span key={`space-${index}`} className={styles.space}>
                {character}
              </span>
            );
          }

          const currentGlyphIndex = glyphIndex++;
          return (
            <span
              key={`${character}-${index}`}
              ref={(node) => {
                glyphRefs.current[currentGlyphIndex] = node;
              }}
              className={styles.glyph}
              style={
                {
                  '--tidal-idle-index': currentGlyphIndex,
                } as TidalGlyphStyle
              }
            >
              {character}
            </span>
          );
        })}
      </span>
    </Component>
  );
}

export { TidalTypeText };
