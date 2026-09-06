'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './liquid-metal-shader.module.css';

export type LiquidMetalShaderProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'color'
> & {
  baseColor?: string;
  distortion?: number;
  highlightColor?: string;
  interactive?: boolean;
  metalColor?: string;
  pixelRatio?: number;
  scale?: number;
  speed?: number;
};

type ShaderSettings = {
  base: [number, number, number];
  distortion: number;
  highlight: [number, number, number];
  interactive: boolean;
  metal: [number, number, number];
  pixelRatio: number;
  reduceMotion: boolean;
  scale: number;
  speed: number;
};

type LiquidMetalStyle = React.CSSProperties & {
  '--liquid-metal-base': string;
  '--liquid-metal-highlight': string;
  '--liquid-metal-mid': string;
};

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const liquidMetalFragmentShader = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_strength;
uniform float u_time;
uniform float u_distortion;
uniform float u_scale;
uniform vec3 u_base;
uniform vec3 u_metal;
uniform vec3 u_highlight;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + 1.0), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float weight = 0.52;
  mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);
  for (int octave = 0; octave < 4; octave++) {
    value += noise(p) * weight;
    p = rotation * p * 2.03 + 17.17;
    weight *= 0.5;
  }
  return value;
}

float liquidField(vec2 p, float time) {
  vec2 drift = vec2(time * 0.045, -time * 0.032);
  vec2 firstWarp = vec2(
    fbm(p * 0.72 + drift),
    fbm(p * 0.76 + vec2(5.2, 1.3) - drift.yx)
  );
  vec2 secondWarp = vec2(
    fbm(p * 0.78 + firstWarp * 2.7 + vec2(1.7, 9.2) + drift * 1.3),
    fbm(p * 0.74 + firstWarp * 2.5 + vec2(8.3, 2.8) - drift * 1.1)
  );
  return fbm(p * 0.68 + secondWarp * (2.75 * u_distortion));
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 delta = p - pointer;
  float pointerFalloff = exp(-dot(delta, delta) * 2.6);
  float distanceFromPointer = max(length(delta), 0.001);
  p += (delta / distanceFromPointer) * pointerFalloff * u_distortion * 0.16 * u_pointer_strength;

  float field = liquidField(p, u_time);
  float shadow = smoothstep(0.18, 0.42, field);
  float silver = smoothstep(0.38, 0.64, field);
  float specular = smoothstep(0.60, 0.82, field);
  vec3 color = mix(vec3(0.0), u_base, shadow);
  color = mix(color, u_metal, silver * 0.88);
  color = mix(color, u_highlight, specular * 0.94);

  float softReflection = smoothstep(0.0, 0.13, 0.13 - abs(field - 0.51));
  color = mix(color, u_highlight, softReflection * 0.12);
  color += (hash21(gl_FragCoord.xy + floor(u_time * 12.0)) - 0.5) * 0.004;

  float vignette = 1.0 - smoothstep(0.48, 1.08, length((v_uv - 0.5) * vec2(0.82, 1.0)));
  color *= 0.76 + vignette * 0.24;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function parseHexColor(value: string, fallback: string) {
  const normalized = /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  return [
    Number.parseInt(normalized.slice(1, 3), 16) / 255,
    Number.parseInt(normalized.slice(3, 5), 16) / 255,
    Number.parseInt(normalized.slice(5, 7), 16) / 255,
  ] as [number, number, number];
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    liquidMetalFragmentShader,
  );
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function LiquidMetalShader({
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel = 'Animated liquid metal surface',
  baseColor = '#1a1a1a',
  className,
  distortion = 0.6,
  highlightColor = '#ffffff',
  interactive = true,
  metalColor = '#ccd0e2',
  pixelRatio = 1.4,
  scale = 0.92,
  speed = 0.72,
  style,
  ...props
}: LiquidMetalShaderProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const invalidateRef = React.useRef<() => void>(() => undefined);
  const reduceMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [webGLAvailable, setWebGLAvailable] = React.useState(true);
  const currentSettings = React.useMemo<ShaderSettings>(
    () => ({
      base: parseHexColor(baseColor, '#1a1a1a'),
      distortion: clamp(distortion, 0, 1.5),
      highlight: parseHexColor(highlightColor, '#ffffff'),
      interactive,
      metal: parseHexColor(metalColor, '#ccd0e2'),
      pixelRatio: clamp(pixelRatio, 0.75, 2),
      reduceMotion,
      scale: clamp(scale, 0.6, 2.4),
      speed: clamp(speed, 0, 1.5),
    }),
    [
      baseColor,
      distortion,
      highlightColor,
      interactive,
      metalColor,
      pixelRatio,
      reduceMotion,
      scale,
      speed,
    ],
  );
  const settingsRef = React.useRef(currentSettings);

  React.useEffect(() => {
    settingsRef.current = currentSettings;
    invalidateRef.current();
  }, [currentSettings]);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
      stencil: false,
    });
    if (!gl) {
      setWebGLAvailable(false);
      return;
    }

    const program = createProgram(gl);
    const buffer = gl.createBuffer();
    if (!program || !buffer) {
      setWebGLAvailable(false);
      return;
    }

    const renderRoot = root;
    const renderCanvas = canvas;
    const context = gl;
    const positionLocation = context.getAttribLocation(program, 'a_position');
    const uniforms = {
      base: context.getUniformLocation(program, 'u_base'),
      distortion: context.getUniformLocation(program, 'u_distortion'),
      highlight: context.getUniformLocation(program, 'u_highlight'),
      metal: context.getUniformLocation(program, 'u_metal'),
      pointer: context.getUniformLocation(program, 'u_pointer'),
      pointerStrength: context.getUniformLocation(
        program,
        'u_pointer_strength',
      ),
      resolution: context.getUniformLocation(program, 'u_resolution'),
      scale: context.getUniformLocation(program, 'u_scale'),
      time: context.getUniformLocation(program, 'u_time'),
    };

    WebGLRenderingContext.prototype.useProgram.call(context, program);
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      context.STATIC_DRAW,
    );
    context.enableVertexAttribArray(positionLocation);
    context.vertexAttribPointer(
      positionLocation,
      2,
      context.FLOAT,
      false,
      0,
      0,
    );

    let animationFrame: number | undefined;
    let elapsed = 0;
    let lastTime = performance.now();
    let visible = true;
    const pointer = {
      currentStrength: 0,
      currentX: 0.5,
      currentY: 0.5,
      strength: 0,
      x: 0.5,
      y: 0.5,
    };

    function resize() {
      const settings = settingsRef.current;
      const ratio = Math.min(window.devicePixelRatio || 1, settings.pixelRatio);
      const rect = renderRoot.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (renderCanvas.width !== width || renderCanvas.height !== height) {
        renderCanvas.width = width;
        renderCanvas.height = height;
      }
      context.viewport(0, 0, width, height);
    }

    function draw(timestamp: number) {
      animationFrame = undefined;
      const settings = settingsRef.current;
      const delta = Math.min(Math.max((timestamp - lastTime) / 1000, 0), 0.05);
      lastTime = timestamp;
      if (!settings.reduceMotion) elapsed += delta * settings.speed;

      const pointerEase = 1 - Math.exp(-delta * 8);
      const targetStrength =
        settings.interactive && !settings.reduceMotion ? pointer.strength : 0;
      pointer.currentX += (pointer.x - pointer.currentX) * pointerEase;
      pointer.currentY += (pointer.y - pointer.currentY) * pointerEase;
      pointer.currentStrength +=
        (targetStrength - pointer.currentStrength) * pointerEase;
      resize();
      context.uniform2f(
        uniforms.resolution,
        renderCanvas.width,
        renderCanvas.height,
      );
      context.uniform2f(uniforms.pointer, pointer.currentX, pointer.currentY);
      context.uniform1f(uniforms.pointerStrength, pointer.currentStrength);
      context.uniform1f(uniforms.time, elapsed);
      context.uniform1f(uniforms.distortion, settings.distortion);
      context.uniform1f(uniforms.scale, settings.scale);
      context.uniform3fv(uniforms.base, settings.base);
      context.uniform3fv(uniforms.metal, settings.metal);
      context.uniform3fv(uniforms.highlight, settings.highlight);
      context.drawArrays(context.TRIANGLES, 0, 3);

      const pointerIsSettling =
        Math.abs(pointer.x - pointer.currentX) > 0.001 ||
        Math.abs(pointer.y - pointer.currentY) > 0.001 ||
        Math.abs(targetStrength - pointer.currentStrength) > 0.001;
      if (
        visible &&
        !settings.reduceMotion &&
        (settings.speed > 0 || pointerIsSettling)
      ) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    function invalidate() {
      if (animationFrame !== undefined || !visible) return;
      lastTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    }

    function stop() {
      if (animationFrame === undefined) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }

    function handlePointerMove(event: PointerEvent) {
      const settings = settingsRef.current;
      if (!settings.interactive || settings.reduceMotion) return;
      const rect = renderRoot.getBoundingClientRect();
      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointer.y = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      pointer.strength = 1;
      invalidate();
    }

    function handlePointerLeave() {
      pointer.x = 0.5;
      pointer.y = 0.5;
      pointer.strength = 0;
      invalidate();
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      stop();
      setWebGLAvailable(false);
    }

    const resizeObserver = new ResizeObserver(invalidate);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) invalidate();
      else stop();
    });

    resizeObserver.observe(renderRoot);
    visibilityObserver.observe(renderRoot);
    renderRoot.addEventListener('pointermove', handlePointerMove);
    renderRoot.addEventListener('pointerleave', handlePointerLeave);
    renderCanvas.addEventListener('webglcontextlost', handleContextLost);
    invalidateRef.current = invalidate;
    setWebGLAvailable(true);
    invalidate();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderRoot.removeEventListener('pointermove', handlePointerMove);
      renderRoot.removeEventListener('pointerleave', handlePointerLeave);
      renderCanvas.removeEventListener('webglcontextlost', handleContextLost);
      invalidateRef.current = () => undefined;
      context.deleteBuffer(buffer);
      context.deleteProgram(program);
    };
  }, []);

  const componentStyle = {
    ...style,
    '--liquid-metal-base': baseColor,
    '--liquid-metal-highlight': highlightColor,
    '--liquid-metal-mid': metalColor,
  } as LiquidMetalStyle;

  return (
    <div
      ref={rootRef}
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : ariaLabel}
      className={cn(styles.root, className)}
      data-slot="liquid-metal-shader"
      data-webgl={webGLAvailable}
      role={ariaHidden ? undefined : 'img'}
      style={componentStyle}
      {...props}
    >
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
    </div>
  );
}
