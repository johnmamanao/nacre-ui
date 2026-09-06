'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The generated canvas is the semantic image surface. */

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './ascii-image.module.css';

const DEFAULT_CHARACTERS = ' .:-=+*#%@';
const BAYER_MATRIX = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export type AsciiImageProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  allowUpload?: boolean;
  alt?: string;
  backgroundColor?: string;
  brightnessBoost?: number;
  characterSpacing?: number;
  characters?: string;
  colorMode?: 'gradient' | 'source';
  colors?: string[];
  columns?: number;
  contrast?: number;
  crossOrigin?: 'anonymous' | 'use-credentials';
  customText?: string;
  dither?: 'bayer' | 'floyd-steinberg' | 'none';
  ditherStrength?: number;
  dotScale?: number;
  fit?: 'contain' | 'cover' | 'stretch';
  fontFamily?: string;
  fontWeight?: number | string;
  interaction?: 'focus' | 'none' | 'push';
  interactionRadius?: number;
  interactionStrength?: number;
  invert?: boolean;
  lineHeight?: number;
  normalize?: boolean;
  onAsciiChange?: (value: string) => void;
  posterize?: number;
  renderMode?: 'characters' | 'dots';
  scale?: number;
  src: string;
  threshold?: number;
  tone?: string;
};

type RenderState = 'error' | 'loading' | 'ready';

type RenderCell = {
  character: string;
  color: string;
  value: number;
  x: number;
  y: number;
};

type PointerPosition = {
  active: number;
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseHexColor(color: string) {
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color);
  return match
    ? [
        Number.parseInt(match[1] ?? 'ff', 16),
        Number.parseInt(match[2] ?? 'ff', 16),
        Number.parseInt(match[3] ?? 'ff', 16),
      ]
    : undefined;
}

function interpolateColor(colors: string[], amount: number) {
  if (colors.length < 2) return colors[0] ?? '#ffffff';

  const position = clamp(amount, 0, 1) * (colors.length - 1);
  const index = Math.min(Math.floor(position), colors.length - 2);
  const progress = position - index;
  const from = parseHexColor(colors[index] ?? '');
  const to = parseHexColor(colors[index + 1] ?? '');
  if (!from || !to)
    return colors[Math.round(position)] ?? colors[0] ?? '#ffffff';

  return `rgb(${from
    .map((channel, channelIndex) =>
      Math.round(
        channel + ((to[channelIndex] ?? channel) - channel) * progress,
      ),
    )
    .join(', ')})`;
}

export function AsciiImage({
  allowUpload = false,
  alt = 'ASCII rendering',
  backgroundColor = '#000000',
  brightnessBoost = 1,
  characterSpacing = 1,
  characters = DEFAULT_CHARACTERS,
  className,
  colorMode = 'gradient',
  colors,
  columns = 240,
  contrast = 1.16,
  crossOrigin = 'anonymous',
  customText,
  dither = 'floyd-steinberg',
  ditherStrength = 0.8,
  dotScale = 0.72,
  fit = 'contain',
  fontFamily = 'Arial, Helvetica, sans-serif',
  fontWeight = 400,
  interaction = 'none',
  interactionRadius = 0.27,
  interactionStrength = 0.5,
  invert = false,
  lineHeight = 1,
  normalize = true,
  onAsciiChange,
  posterize = 32,
  renderMode = 'characters',
  scale = 1,
  src,
  style,
  threshold = 0.3,
  tone = '#dbe7ff',
  ...props
}: AsciiImageProps) {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [localSource, setLocalSource] = React.useState<string>();
  const [state, setState] = React.useState<RenderState>('loading');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const lastAsciiRef = React.useRef('');
  const objectUrlRef = React.useRef<string | undefined>(undefined);
  const onAsciiChangeRef = React.useRef(onAsciiChange);

  React.useEffect(() => {
    onAsciiChangeRef.current = onAsciiChange;
  }, [onAsciiChange]);

  React.useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  React.useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  const effectiveSource = localSource ?? src;
  const palette = characters.length > 1 ? characters : DEFAULT_CHARACTERS;
  const colorStops = React.useMemo(
    () => (colors && colors.length > 0 ? colors : [tone]),
    [colors, tone],
  );
  const safeBrightness = Math.max(0, brightnessBoost);
  const safeColumns = Math.round(clamp(columns, 24, 240));
  const safeContrast = Math.max(0, contrast);
  const safeDitherStrength = clamp(ditherStrength, 0, 1);
  const safeDotScale = clamp(dotScale, 0.1, 1);
  const safeInteractionRadius = clamp(interactionRadius, 0.05, 0.75);
  const safeInteractionStrength = clamp(interactionStrength, 0, 1);
  const safePosterize = Math.round(clamp(posterize, 2, 64));
  const safeThreshold = clamp(threshold, 0, 0.95);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    const sampleCanvas = document.createElement('canvas');
    const sampleContext = sampleCanvas.getContext('2d', {
      willReadFrequently: true,
    });
    if (!context || !sampleContext) return;
    const renderCanvas = canvas;
    const renderContainer = container;
    const renderContext = context;
    const samplingContext = sampleContext;

    let cancelled = false;
    let loaded = false;
    let animationFrame: number | undefined;
    let drawInteractiveFrame: ((pointer: PointerPosition) => void) | undefined;
    const pointer: PointerPosition = { active: 0, x: 0, y: 0 };
    const pointerTarget: PointerPosition = { active: 0, x: 0, y: 0 };
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const image = new Image();
    const loadingFrame = window.requestAnimationFrame(() => {
      if (!cancelled) setState('loading');
    });

    if (!effectiveSource.startsWith('data:')) image.crossOrigin = crossOrigin;

    function render() {
      if (cancelled || !loaded) return;

      try {
        const { height, width } = renderContainer.getBoundingClientRect();
        if (width < 1 || height < 1) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderCanvas.width = Math.round(width * dpr);
        renderCanvas.height = Math.round(height * dpr);
        renderCanvas.style.width = `${width}px`;
        renderCanvas.style.height = `${height}px`;
        renderContext.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderContext.imageSmoothingEnabled = true;
        renderContext.imageSmoothingQuality = 'high';
        renderContext.font = `${fontWeight} 100px ${fontFamily}`;
        const normalizedGlyphWidth = Math.max(
          0.2,
          renderContext.measureText('M').width / 100,
        );
        const cellWidth = width / safeColumns;
        const fontSize =
          cellWidth / (normalizedGlyphWidth * Math.max(0.5, characterSpacing));
        const cellHeight = Math.max(3, fontSize * Math.max(0.5, lineHeight));
        const rows = Math.max(1, Math.ceil(height / cellHeight));

        sampleCanvas.width = safeColumns;
        sampleCanvas.height = rows;
        samplingContext.clearRect(0, 0, safeColumns, rows);
        samplingContext.imageSmoothingEnabled = true;
        samplingContext.imageSmoothingQuality = 'high';

        let drawX = 0;
        let drawY = 0;
        let drawWidth = safeColumns;
        let drawHeight = rows;

        if (fit !== 'stretch') {
          const imageScale =
            (fit === 'cover'
              ? Math.max(
                  safeColumns / image.naturalWidth,
                  rows / image.naturalHeight,
                )
              : Math.min(
                  safeColumns / image.naturalWidth,
                  rows / image.naturalHeight,
                )) * Math.max(0.1, scale);
          drawWidth = image.naturalWidth * imageScale;
          drawHeight = image.naturalHeight * imageScale;
          drawX = (safeColumns - drawWidth) / 2;
          drawY = (rows - drawHeight) / 2;
        }

        samplingContext.drawImage(image, drawX, drawY, drawWidth, drawHeight);

        const pixels = samplingContext.getImageData(
          0,
          0,
          safeColumns,
          rows,
        ).data;
        const luminanceField = new Float32Array(safeColumns * rows);

        for (let index = 0; index < luminanceField.length; index += 1) {
          const pixel = index * 4;
          const alpha = (pixels[pixel + 3] ?? 0) / 255;
          const luminance =
            ((pixels[pixel] ?? 0) * 0.2126 +
              (pixels[pixel + 1] ?? 0) * 0.7152 +
              (pixels[pixel + 2] ?? 0) * 0.0722) /
            255;
          const contrasted = clamp(
            (luminance - 0.5) * safeContrast + 0.5,
            0,
            1,
          );
          const boosted = clamp(contrasted * safeBrightness, 0, 1);
          const keyed =
            boosted <= safeThreshold
              ? 0
              : (boosted - safeThreshold) / (1 - safeThreshold);
          luminanceField[index] = (invert ? 1 - keyed : keyed) * alpha;
        }

        if (normalize) {
          let minimum = 1;
          let maximum = 0;
          for (const value of luminanceField) {
            if (value <= 0) continue;
            minimum = Math.min(minimum, value);
            maximum = Math.max(maximum, value);
          }
          const range = maximum - minimum;
          if (range > 0.001) {
            for (let index = 0; index < luminanceField.length; index += 1) {
              const value = luminanceField[index] ?? 0;
              if (value > 0) luminanceField[index] = (value - minimum) / range;
            }
          }
        }

        if (dither === 'floyd-steinberg') {
          for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < safeColumns; column += 1) {
              const index = row * safeColumns + column;
              const oldValue = clamp(luminanceField[index] ?? 0, 0, 1);
              const quantized =
                Math.round(oldValue * (safePosterize - 1)) /
                (safePosterize - 1);
              const nextValue =
                oldValue + (quantized - oldValue) * safeDitherStrength;
              const error = oldValue - nextValue;
              luminanceField[index] = nextValue;
              if (column + 1 < safeColumns)
                luminanceField[index + 1] += error * (7 / 16);
              if (row + 1 < rows) {
                if (column > 0)
                  luminanceField[index + safeColumns - 1] += error * (3 / 16);
                luminanceField[index + safeColumns] += error * (5 / 16);
                if (column + 1 < safeColumns)
                  luminanceField[index + safeColumns + 1] += error * (1 / 16);
              }
            }
          }
        } else if (dither === 'bayer') {
          for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < safeColumns; column += 1) {
              const index = row * safeColumns + column;
              const matrixValue =
                BAYER_MATRIX[(row % 4) * 4 + (column % 4)] ?? 0;
              const offset =
                (matrixValue / 16 - 0.5) * safeDitherStrength * 0.25;
              luminanceField[index] = clamp(
                (luminanceField[index] ?? 0) + offset,
                0,
                1,
              );
            }
          }
        } else {
          for (let index = 0; index < luminanceField.length; index += 1) {
            luminanceField[index] =
              Math.round(
                clamp(luminanceField[index] ?? 0, 0, 1) * (safePosterize - 1),
              ) /
              (safePosterize - 1);
          }
        }

        const cells: RenderCell[] = [];
        const lines: string[] = [];
        for (let row = 0; row < rows; row += 1) {
          let line = '';
          for (let column = 0; column < safeColumns; column += 1) {
            const value = clamp(
              luminanceField[row * safeColumns + column] ?? 0,
              0,
              1,
            );
            const paletteIndex = Math.min(
              palette.length - 1,
              Math.floor(value * (palette.length - 1)),
            );
            const mappedCharacter = palette[paletteIndex] ?? ' ';
            const textCharacter = customText?.trim()
              ? (customText[(row * safeColumns + column) % customText.length] ??
                mappedCharacter)
              : mappedCharacter;
            const character = value <= 0 ? ' ' : textCharacter;
            line += character;
            if (character.trim()) {
              const pixel = (row * safeColumns + column) * 4;
              cells.push({
                character,
                color:
                  colorMode === 'source'
                    ? `rgb(${pixels[pixel] ?? 255}, ${pixels[pixel + 1] ?? 255}, ${pixels[pixel + 2] ?? 255})`
                    : interpolateColor(colorStops, value),
                value,
                x: column * cellWidth + cellWidth / 2,
                y: row * cellHeight + cellHeight / 2,
              });
            }
          }
          lines.push(line);
        }

        drawInteractiveFrame = (pointerPosition) => {
          renderContext.globalAlpha = 1;
          renderContext.fillStyle = backgroundColor;
          renderContext.fillRect(0, 0, width, height);
          renderContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          renderContext.textAlign = 'center';
          renderContext.textBaseline = 'middle';

          const radius = Math.min(width, height) * safeInteractionRadius;
          for (const cell of cells) {
            const distance = Math.hypot(
              cell.x - pointerPosition.x,
              cell.y - pointerPosition.y,
            );
            const proximity =
              pointerPosition.active * clamp(1 - distance / radius, 0, 1);
            const influence = proximity * proximity * (3 - 2 * proximity);
            let offsetX = 0;
            let offsetY = 0;
            let cellScale = 1;

            if (interaction === 'push' && distance > 0.01) {
              const displacement =
                influence * safeInteractionStrength * cellWidth * 2.4;
              offsetX =
                ((cell.x - pointerPosition.x) / distance) * displacement;
              offsetY =
                ((cell.y - pointerPosition.y) / distance) * displacement;
              cellScale = 1 - influence * safeInteractionStrength * 0.12;
            } else if (interaction === 'focus') {
              cellScale = 1 + influence * safeInteractionStrength * 0.28;
            }

            renderContext.save();
            renderContext.translate(cell.x + offsetX, cell.y + offsetY);
            renderContext.scale(cellScale, cellScale);
            renderContext.fillStyle = cell.color;
            renderContext.globalAlpha =
              interaction === 'focus' && pointerPosition.active > 0
                ? 0.68 + influence * 0.32
                : 1;

            if (renderMode === 'dots') {
              const radius =
                Math.min(cellWidth, cellHeight) *
                safeDotScale *
                0.5 *
                Math.sqrt(cell.value);
              renderContext.beginPath();
              renderContext.arc(0, 0, radius, 0, Math.PI * 2);
              renderContext.fill();
            } else {
              renderContext.fillText(cell.character, 0, 0);
            }
            renderContext.restore();
          }
          renderContext.globalAlpha = 1;
        };
        drawInteractiveFrame(pointer);

        const nextAscii = lines.join('\n');
        if (nextAscii !== lastAsciiRef.current) {
          lastAsciiRef.current = nextAscii;
          onAsciiChangeRef.current?.(nextAscii);
        }
        setState('ready');
      } catch {
        setState('error');
      }
    }

    image.onload = () => {
      if (cancelled) return;
      loaded = true;
      setDimensions({
        height: image.naturalHeight,
        width: image.naturalWidth,
      });
      render();
    };
    image.onerror = () => {
      if (!cancelled) setState('error');
    };
    image.src = effectiveSource;
    if (image.complete && image.naturalWidth > 0)
      image.onload(new Event('load'));

    const observer = new ResizeObserver(render);
    observer.observe(renderContainer);

    function animatePointer() {
      animationFrame = undefined;
      const smoothing = 0.18;
      pointer.x += (pointerTarget.x - pointer.x) * smoothing;
      pointer.y += (pointerTarget.y - pointer.y) * smoothing;
      pointer.active += (pointerTarget.active - pointer.active) * smoothing;
      drawInteractiveFrame?.(pointer);

      if (
        Math.abs(pointerTarget.x - pointer.x) > 0.1 ||
        Math.abs(pointerTarget.y - pointer.y) > 0.1 ||
        Math.abs(pointerTarget.active - pointer.active) > 0.01
      ) {
        animationFrame = window.requestAnimationFrame(animatePointer);
      }
    }

    function requestPointerFrame() {
      if (animationFrame === undefined)
        animationFrame = window.requestAnimationFrame(animatePointer);
    }

    function handlePointerMove(event: PointerEvent) {
      if (interaction === 'none' || reduceMotion) return;
      const bounds = renderContainer.getBoundingClientRect();
      pointerTarget.x = event.clientX - bounds.left;
      pointerTarget.y = event.clientY - bounds.top;
      pointerTarget.active = 1;
      requestPointerFrame();
    }

    function handlePointerLeave() {
      pointerTarget.active = 0;
      requestPointerFrame();
    }

    renderContainer.addEventListener('pointermove', handlePointerMove);
    renderContainer.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelled = true;
      observer.disconnect();
      renderContainer.removeEventListener('pointermove', handlePointerMove);
      renderContainer.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(loadingFrame);
      if (animationFrame !== undefined)
        window.cancelAnimationFrame(animationFrame);
      image.onload = null;
      image.onerror = null;
    };
  }, [
    backgroundColor,
    characterSpacing,
    colorMode,
    colorStops,
    crossOrigin,
    customText,
    dither,
    effectiveSource,
    fit,
    fontFamily,
    fontWeight,
    interaction,
    normalize,
    invert,
    lineHeight,
    palette,
    safeBrightness,
    safeColumns,
    safeContrast,
    safeDitherStrength,
    safeDotScale,
    safeInteractionRadius,
    safeInteractionStrength,
    safePosterize,
    safeThreshold,
    scale,
    renderMode,
  ]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setLocalSource(objectUrlRef.current);
    event.target.value = '';
  }

  async function toggleFullscreen() {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  }

  const componentStyle = {
    '--ascii-background': backgroundColor,
    '--ascii-tone': tone,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={cn(styles.root, className)}
      data-state={state}
      style={componentStyle}
      {...props}
    >
      <figure
        ref={containerRef}
        className={styles.viewport}
        aria-busy={state === 'loading'}
      >
        <header className={styles.header}>
          <span className={styles.meta} aria-live="polite">
            {dimensions.width > 0
              ? `${dimensions.width} × ${dimensions.height} · ${safeColumns} cols`
              : `${safeColumns} cols`}
          </span>
          <button
            className={styles.fullscreenButton}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20">
              {isFullscreen ? (
                <path d="M7.5 3.5v4h-4M12.5 3.5v4h4M7.5 16.5v-4h-4M12.5 16.5v-4h4" />
              ) : (
                <path d="M7.5 3.5h-4v4M12.5 3.5h4v4M7.5 16.5h-4v-4M12.5 16.5h4v-4" />
              )}
            </svg>
          </button>
          {allowUpload ? (
            <label className={styles.upload}>
              Replace image
              <input
                accept="image/*"
                onChange={handleImageChange}
                type="file"
              />
            </label>
          ) : null}
        </header>

        <canvas
          ref={canvasRef}
          aria-label={alt}
          className={styles.canvas}
          role="img"
        />
        <output
          className={styles.status}
          aria-hidden={state === 'ready'}
          aria-live="polite"
        >
          {state === 'error'
            ? 'This image could not be read. Check its URL or choose a local file.'
            : 'Sampling image'}
        </output>
      </figure>
    </div>
  );
}
