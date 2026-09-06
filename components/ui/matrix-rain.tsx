'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './matrix-rain.module.css';

const defaultCharacters =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

type Column = {
  head: number;
  seed: number;
  velocity: number;
};

export type MatrixRainProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  background?: string;
  characters?: string;
  color?: string;
  density?: number;
  fontSize?: number;
  glow?: number;
  highlight?: string;
  pointerResponse?: boolean;
  speed?: number;
  trail?: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function randomFrom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createColumn(index: number, rowCount: number): Column {
  const seed = index * 47.17 + 11.3;
  return {
    head: randomFrom(seed) * rowCount,
    seed,
    velocity: 9 + randomFrom(seed + 5.7) * 11,
  };
}

export function MatrixRain({
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel = 'Animated field of falling characters',
  background = '#020604',
  characters = defaultCharacters,
  className,
  color = '#39ff68',
  density = 0.9,
  fontSize = 16,
  glow = 8,
  highlight = '#eaffed',
  pointerResponse = true,
  speed = 1,
  style,
  trail = 0.9,
  ...props
}: MatrixRainProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    const renderRoot = root;
    const renderCanvas = canvas;
    const renderContext = context;

    const safeFontSize = clamp(fontSize, 10, 32);
    const safeDensity = clamp(density, 0.45, 1.4);
    const safeSpeed = clamp(speed, 0.2, 2.5);
    const safeTrail = clamp(trail, 0.72, 0.97);
    const glyphs = Array.from(characters || defaultCharacters);
    const pointer = { active: false, x: 0, y: 0 };
    let columns: Column[] = [];
    let columnWidth = safeFontSize / safeDensity;
    let frame: number | undefined;
    let lastTime = performance.now();
    let elapsed = 0;
    let frameAccumulator = 0;
    let visible = true;
    let reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    function resize() {
      const bounds = renderRoot.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));

      if (renderCanvas.width !== width || renderCanvas.height !== height) {
        renderCanvas.width = width;
        renderCanvas.height = height;
      }

      renderContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      columnWidth = safeFontSize / safeDensity;
      const count = Math.ceil(bounds.width / columnWidth) + 1;
      const rows = Math.ceil(bounds.height / safeFontSize);
      columns = Array.from({ length: count }, (_, index) =>
        createColumn(index, rows),
      );
      renderContext.fillStyle = background;
      renderContext.fillRect(0, 0, bounds.width, bounds.height);
    }

    function characterAt(seed: number) {
      const index = Math.floor(randomFrom(seed) * glyphs.length);
      return glyphs[index] ?? glyphs[0] ?? '0';
    }

    function drawStatic() {
      const bounds = renderRoot.getBoundingClientRect();
      renderContext.globalAlpha = 1;
      renderContext.fillStyle = background;
      renderContext.fillRect(0, 0, bounds.width, bounds.height);
      renderContext.font = `500 ${safeFontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      renderContext.textAlign = 'center';
      renderContext.textBaseline = 'middle';

      for (
        let columnIndex = 0;
        columnIndex < columns.length;
        columnIndex += 1
      ) {
        const column = columns[columnIndex];
        if (!column) continue;
        const x = columnIndex * columnWidth + columnWidth * 0.5;
        const staticLength = 10 + Math.floor(randomFrom(column.seed + 8) * 16);

        for (let offset = 0; offset < staticLength; offset += 1) {
          const row = Math.floor(column.head) - offset;
          const y = row * safeFontSize;
          if (y < -safeFontSize || y > bounds.height + safeFontSize) continue;
          const progress = offset / Math.max(staticLength - 1, 1);
          const glyph = characterAt(column.seed + row * 2.73);
          renderContext.globalAlpha = Math.pow(1 - progress, 2.2);
          renderContext.fillStyle = offset === 0 ? highlight : color;
          renderContext.shadowColor = color;
          renderContext.shadowBlur = clamp(glow, 0, 18) * (1 - progress);
          renderContext.fillText(glyph, x, y);
        }
      }

      renderContext.globalAlpha = 1;
      renderContext.shadowBlur = 0;
    }

    function drawRainTick(deltaSeconds: number) {
      const bounds = renderRoot.getBoundingClientRect();
      const rows = Math.ceil(bounds.height / safeFontSize);
      const pointerRadius = Math.max(84, safeFontSize * 7.5);

      renderContext.globalAlpha = (1 - safeTrail) * 0.5;
      renderContext.fillStyle = background;
      renderContext.fillRect(0, 0, bounds.width, bounds.height);
      renderContext.font = `500 ${safeFontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      renderContext.textAlign = 'center';
      renderContext.textBaseline = 'middle';

      for (
        let columnIndex = 0;
        columnIndex < columns.length;
        columnIndex += 1
      ) {
        const column = columns[columnIndex];
        if (!column) continue;

        column.head += column.velocity * safeSpeed * deltaSeconds;
        if (column.head > rows + 4) {
          const reset = createColumn(
            columnIndex + Math.floor(elapsed * 0.01),
            rows,
          );
          column.head = -4 - randomFrom(reset.seed + 9) * rows * 0.5;
          column.seed = reset.seed;
          column.velocity = reset.velocity;
        }

        const x = columnIndex * columnWidth + columnWidth * 0.5;
        const y = Math.floor(column.head) * safeFontSize;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence =
          pointerResponse && pointer.active
            ? Math.max(0, 1 - distance / pointerRadius)
            : 0;
        const displacement = distance > 0 ? (dx / distance) * influence * 7 : 0;
        const glyph = characterAt(
          column.seed + Math.floor(column.head) * 2.73 + elapsed * 0.0041,
        );

        renderContext.globalAlpha = 0.82 + influence * 0.18;
        renderContext.fillStyle = color;
        renderContext.shadowColor = color;
        renderContext.shadowBlur = clamp(glow, 0, 18) * (0.7 + influence * 0.5);
        renderContext.fillText(glyph, x + displacement, y);
        renderContext.globalAlpha = 0.62 + influence * 0.38;
        renderContext.fillStyle = highlight;
        renderContext.shadowBlur = clamp(glow, 0, 18) * 0.45;
        renderContext.fillText(glyph, x + displacement, y);
      }

      renderContext.globalAlpha = 1;
      renderContext.shadowBlur = 0;
    }

    function tick(time: number) {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      elapsed += deltaSeconds * 1000;
      frameAccumulator += deltaSeconds;
      if (frameAccumulator >= 0.05) {
        drawRainTick(frameAccumulator);
        frameAccumulator = 0;
      }
      frame =
        visible && !reduceMotion
          ? window.requestAnimationFrame(tick)
          : undefined;
    }

    function start() {
      if (frame !== undefined || !visible || reduceMotion) return;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(tick);
    }

    function stop() {
      if (frame === undefined) return;
      window.cancelAnimationFrame(frame);
      frame = undefined;
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = renderRoot.getBoundingClientRect();
      pointer.active = true;
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const handleMotionPreference = () => {
      reduceMotion = motionPreference.matches;
      if (reduceMotion) {
        stop();
        drawStatic();
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) drawStatic();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    });

    resize();
    if (reduceMotion) drawStatic();
    start();
    resizeObserver.observe(root);
    visibilityObserver.observe(root);
    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerleave', handlePointerLeave);
    motionPreference.addEventListener('change', handleMotionPreference);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, [
    background,
    characters,
    color,
    density,
    fontSize,
    glow,
    highlight,
    pointerResponse,
    speed,
    trail,
  ]);

  const componentStyle = {
    '--matrix-background': background,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : ariaLabel}
      className={cn(styles.root, className)}
      data-slot="matrix-rain"
      role={ariaHidden ? undefined : 'img'}
      style={componentStyle}
      {...props}
    >
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
    </div>
  );
}
