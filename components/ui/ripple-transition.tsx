'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './ripple-transition.module.css';

export type RippleTransitionItem = {
  alt: string;
  src: string;
};

export type RippleTransitionProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'children' | 'onChange'
> & {
  autoplay?: boolean;
  colorSplit?: number;
  duration?: number;
  glow?: number;
  interval?: number;
  items?: readonly RippleTransitionItem[];
  onIndexChange?: (index: number) => void;
  origin?: 'center' | 'pointer';
  pattern?: 'ring' | 'sweep' | 'wave';
  radius?: number;
  refraction?: number;
  ringWidth?: number;
};

const defaultItems: readonly RippleTransitionItem[] = [
  {
    alt: 'Road passing between red desert cliffs',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88',
  },
  {
    alt: 'Snow-covered mountain range above a broad valley',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=88',
  },
  {
    alt: 'Sunlight passing through a dense green forest',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=88',
  },
];

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 v_uv;
  uniform sampler2D u_from;
  uniform sampler2D u_to;
  uniform vec2 u_resolution;
  uniform vec2 u_fromSize;
  uniform vec2 u_toSize;
  uniform vec2 u_origin;
  uniform float u_progress;
  uniform float u_refraction;
  uniform float u_ringWidth;
  uniform float u_colorSplit;
  uniform float u_glow;
  uniform float u_pattern;

  vec2 coverUv(vec2 uv, vec2 imageSize) {
    float screenRatio = u_resolution.x / u_resolution.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 scale = imageRatio > screenRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  float fieldNoise(vec2 point) {
    float a = sin(point.x * 13.7 + point.y * 9.2);
    float b = sin(point.x * 31.1 - point.y * 17.3);
    return (a + b) * 0.5;
  }

  vec3 splitSample(sampler2D image, vec2 uv, vec2 offset, float amount) {
    float red = texture2D(image, uv + offset * amount).r;
    float green = texture2D(image, uv).g;
    float blue = texture2D(image, uv - offset * amount).b;
    return vec3(red, green, blue);
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 delta = (v_uv - u_origin) * aspect;
    float distanceFromOrigin = length(delta);
    vec2 direction;
    float signedDistance;
    float motionEnvelope = sin(u_progress * 3.14159265);
    float trailingWaves = 0.0;
    float pointerRipple = 0.0;
    vec2 pointerDirection = vec2(0.0);

    if (u_pattern < 0.5) {
      float front = -0.12 + u_progress * 1.24;
      float phase = (v_uv.y - u_origin.y) * 18.0;
      float bend = sin(phase) * 0.026;
      float surfaceVariation = fieldNoise(v_uv * 4.2)
        * 0.012
        * motionEnvelope;
      signedDistance = v_uv.x - front + bend + surfaceVariation;
      direction = normalize(vec2(1.0, cos(phase) * 0.22));

      float wakeDistance = max(-signedDistance, 0.0);
      float wakeFrequency = 88.0;
      float wakeCrests = pow(sin(wakeDistance * wakeFrequency), 2.0);
      float wakeFade = exp(
        -wakeDistance / max(u_ringWidth * 3.8, 0.01)
      );
      trailingWaves = step(signedDistance, 0.0)
        * wakeCrests
        * wakeFade
        * motionEnvelope;

      float pointerFront = u_progress * 0.92;
      float pointerDistance = distanceFromOrigin - pointerFront;
      float pointerBand = exp(
        -pow(pointerDistance / max(u_ringWidth * 0.72, 0.008), 2.0)
      );
      float pointerWakeDistance = max(-pointerDistance, 0.0);
      float pointerCrests = pow(sin(pointerWakeDistance * 72.0), 2.0);
      float pointerFade = exp(
        -pointerWakeDistance / max(u_ringWidth * 3.0, 0.01)
      );
      pointerRipple = (
        pointerBand * 0.72 +
        step(pointerDistance, 0.0) * pointerCrests * pointerFade * 0.38
      ) * motionEnvelope;
      pointerDirection = distanceFromOrigin > 0.0001
        ? normalize(delta) / aspect
        : vec2(0.0);
    } else if (u_pattern < 1.5) {
      float maximumRadius = length(aspect) * 1.04;
      float front = u_progress * maximumRadius;
      float noise = fieldNoise(delta * 3.2) * 0.018 * motionEnvelope;
      signedDistance = distanceFromOrigin - front + noise;
      direction = distanceFromOrigin > 0.0001
        ? normalize(delta) / aspect
        : vec2(0.0);
    } else {
      vec2 axis = normalize(vec2(0.82, 0.58));
      vec2 perpendicular = vec2(-axis.y, axis.x);
      float front = mix(-1.5, 1.5, u_progress);
      float across = dot(v_uv - u_origin, perpendicular);
      signedDistance = dot(v_uv - u_origin, axis) - front
        + sin(across * 28.0) * 0.014;
      direction = axis;
    }

    float ring = exp(-pow(signedDistance / max(u_ringWidth, 0.001), 2.0));
    float secondary = sin(signedDistance * 92.0) * 0.5 + 0.5;
    float detail = min(
      ring * mix(0.72, 1.0, secondary) + trailingWaves * 0.62,
      1.25
    );
    vec2 displacement = (
      direction * detail + pointerDirection * pointerRipple * 0.58
    ) * u_refraction;

    vec2 fromUv = coverUv(v_uv + displacement, u_fromSize);
    vec2 toUv = coverUv(v_uv - displacement * 0.55, u_toSize);
    float reveal = smoothstep(
      u_ringWidth,
      -u_ringWidth,
      signedDistance
    );

    vec3 fromColor = splitSample(
      u_from,
      fromUv,
      displacement,
      u_colorSplit * detail
    );
    vec3 toColor = splitSample(
      u_to,
      toUv,
      -displacement,
      u_colorSplit * detail
    );
    vec3 color = mix(fromColor, toColor, reveal);
    color += detail * u_glow * vec3(0.72, 0.82, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function compileShader(
  context: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = context.createShader(type);
  if (!shader) return null;
  context.shaderSource(shader, source);
  context.compileShader(shader);
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    context.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(context: WebGLRenderingContext) {
  const vertex = compileShader(context, context.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(
    context,
    context.FRAGMENT_SHADER,
    fragmentShader,
  );
  if (!vertex || !fragment) return null;

  const program = context.createProgram();
  if (!program) return null;
  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  context.linkProgram(program);
  context.deleteShader(vertex);
  context.deleteShader(fragment);

  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    context.deleteProgram(program);
    return null;
  }
  return program;
}

function activateProgram(
  context: WebGLRenderingContext,
  program: WebGLProgram,
) {
  context.useProgram(program);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    if (!src.startsWith('data:') && !src.startsWith('blob:'))
      image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load ${src}`));
    image.src = src;
  });
}

function bezierEase(progress: number) {
  const x1 = 0.77;
  const x2 = 0.175;
  let estimate = progress;

  for (let iteration = 0; iteration < 5; iteration += 1) {
    const inverse = 1 - estimate;
    const x =
      3 * inverse * inverse * estimate * x1 +
      3 * inverse * estimate * estimate * x2 +
      estimate * estimate * estimate;
    const slope =
      3 * inverse * inverse * x1 +
      6 * inverse * estimate * (x2 - x1) +
      3 * estimate * estimate * (1 - x2);
    if (Math.abs(slope) < 0.0001) break;
    estimate = clamp(estimate - (x - progress) / slope, 0, 1);
  }

  return 3 * (1 - estimate) * estimate * estimate + estimate ** 3;
}

export function RippleTransition({
  autoplay = false,
  className,
  colorSplit = 0.65,
  duration = 1200,
  glow = 0.16,
  interval = 3600,
  items = defaultItems,
  onClick,
  onIndexChange,
  origin = 'pointer',
  pattern = 'wave',
  radius = 20,
  refraction = 0.055,
  ringWidth = 0.075,
  style,
  ...props
}: RippleTransitionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [ready, setReady] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const transitionRef = React.useRef<
    ((position?: { x: number; y: number }) => void) | undefined
  >(undefined);
  const indexRef = React.useRef(0);
  const onIndexChangeRef = React.useRef(onIndexChange);
  const safeItems = items.length > 0 ? items : defaultItems;
  const currentItem = safeItems[activeIndex % safeItems.length] ?? safeItems[0];

  React.useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const context = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!context) return;
    const gl = context;
    const renderCanvas = canvas;
    const renderRoot = root;

    const program = createProgram(gl);
    if (!program) return;
    activateProgram(gl, program);

    const position = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      colorSplit: gl.getUniformLocation(program, 'u_colorSplit'),
      from: gl.getUniformLocation(program, 'u_from'),
      fromSize: gl.getUniformLocation(program, 'u_fromSize'),
      glow: gl.getUniformLocation(program, 'u_glow'),
      origin: gl.getUniformLocation(program, 'u_origin'),
      pattern: gl.getUniformLocation(program, 'u_pattern'),
      progress: gl.getUniformLocation(program, 'u_progress'),
      refraction: gl.getUniformLocation(program, 'u_refraction'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      ringWidth: gl.getUniformLocation(program, 'u_ringWidth'),
      to: gl.getUniformLocation(program, 'u_to'),
      toSize: gl.getUniformLocation(program, 'u_toSize'),
    };

    let cancelled = false;
    let frame: number | undefined;
    let animating = false;
    let textures: WebGLTexture[] = [];
    let images: HTMLImageElement[] = [];
    const reduceMotion = window.matchMedia(
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
        gl.viewport(0, 0, width, height);
      }
    }

    function bindTexture(texture: WebGLTexture, unit: number) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    }

    function draw(
      fromIndex: number,
      toIndex: number,
      progress: number,
      rippleOrigin: { x: number; y: number },
    ) {
      const fromImage = images[fromIndex];
      const toImage = images[toIndex];
      const fromTexture = textures[fromIndex];
      const toTexture = textures[toIndex];
      if (!fromImage || !toImage || !fromTexture || !toTexture) return;

      resize();
      bindTexture(fromTexture, 0);
      bindTexture(toTexture, 1);
      gl.uniform1i(uniforms.from, 0);
      gl.uniform1i(uniforms.to, 1);
      gl.uniform2f(
        uniforms.resolution,
        renderCanvas.width,
        renderCanvas.height,
      );
      gl.uniform2f(
        uniforms.fromSize,
        fromImage.naturalWidth,
        fromImage.naturalHeight,
      );
      gl.uniform2f(
        uniforms.toSize,
        toImage.naturalWidth,
        toImage.naturalHeight,
      );
      gl.uniform2f(uniforms.origin, rippleOrigin.x, rippleOrigin.y);
      gl.uniform1f(
        uniforms.pattern,
        pattern === 'wave' ? 0 : pattern === 'ring' ? 1 : 2,
      );
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.refraction, clamp(refraction, 0, 0.18));
      gl.uniform1f(uniforms.ringWidth, clamp(ringWidth, 0.015, 0.2));
      gl.uniform1f(uniforms.colorSplit, clamp(colorSplit, 0, 1.5));
      gl.uniform1f(uniforms.glow, clamp(glow, 0, 0.5));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function chooseOrigin(position?: { x: number; y: number }) {
      if (origin === 'center') return { x: 0.5, y: 0.5 };
      return position ?? { x: 0.5, y: 0.5 };
    }

    function getTransitionDuration() {
      const baseDuration = clamp(duration, 500, 2400);
      return pattern === 'sweep' ? baseDuration + 400 : baseDuration;
    }

    function startTransition(position?: { x: number; y: number }) {
      if (animating || textures.length < 2) return;
      const fromIndex = indexRef.current;
      const toIndex = (fromIndex + 1) % textures.length;
      const rippleOrigin = chooseOrigin(position);

      if (reduceMotion) {
        indexRef.current = toIndex;
        setActiveIndex(toIndex);
        onIndexChangeRef.current?.(toIndex);
        draw(toIndex, toIndex, 0, rippleOrigin);
        return;
      }

      animating = true;
      const startedAt = performance.now();
      const safeDuration = getTransitionDuration();

      function tick(time: number) {
        if (cancelled) return;
        const rawProgress = clamp((time - startedAt) / safeDuration, 0, 1);
        draw(fromIndex, toIndex, bezierEase(rawProgress), rippleOrigin);
        if (rawProgress < 1) {
          frame = window.requestAnimationFrame(tick);
        } else {
          animating = false;
          frame = undefined;
          indexRef.current = toIndex;
          setActiveIndex(toIndex);
          onIndexChangeRef.current?.(toIndex);
        }
      }

      frame = window.requestAnimationFrame(tick);
    }

    transitionRef.current = startTransition;

    Promise.all(safeItems.map((item) => loadImage(item.src)))
      .then((loadedImages) => {
        if (cancelled) return;
        images = loadedImages;
        textures = images.flatMap((image) => {
          const texture = gl.createTexture();
          if (!texture) return [];
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            image,
          );
          return [texture];
        });
        draw(0, 0, 0, { x: 0.5, y: 0.5 });
        setReady(true);
      })
      .catch(() => setReady(false));

    const observer = new ResizeObserver(() =>
      draw(indexRef.current, indexRef.current, 0, { x: 0.5, y: 0.5 }),
    );
    observer.observe(renderRoot);

    let timer: ReturnType<typeof setInterval> | undefined;
    if (autoplay && safeItems.length > 1) {
      timer = setInterval(
        () => startTransition(),
        Math.max(interval, getTransitionDuration() + 400),
      );
    }

    return () => {
      cancelled = true;
      transitionRef.current = undefined;
      observer.disconnect();
      if (timer) clearInterval(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      for (const texture of textures) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [
    autoplay,
    colorSplit,
    duration,
    glow,
    interval,
    origin,
    pattern,
    refraction,
    ringWidth,
    safeItems,
  ]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented || safeItems.length < 2) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    transitionRef.current?.({
      x: clamp((event.clientX - bounds.left) / bounds.width, 0, 1),
      y: clamp(1 - (event.clientY - bounds.top) / bounds.height, 0, 1),
    });
  }

  const componentStyle = {
    '--ripple-radius': `${clamp(radius, 0, 48)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <button
      ref={rootRef}
      aria-label={`Show next image. Currently showing: ${currentItem?.alt ?? 'image'}`}
      className={cn(styles.root, className)}
      data-ready={ready || undefined}
      onClick={handleClick}
      style={componentStyle}
      type="button"
      {...props}
    >
      {currentItem ? (
        // oxlint-disable-next-line next/no-img-element -- Consumer URLs and the WebGL fallback cannot use framework image optimization.
        <img
          alt=""
          aria-hidden="true"
          className={styles.fallback}
          src={currentItem.src}
        />
      ) : null}
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <span className={styles.live} aria-live="polite">
        {currentItem?.alt}
      </span>
    </button>
  );
}
