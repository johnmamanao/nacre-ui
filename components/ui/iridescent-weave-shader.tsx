'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './iridescent-weave-shader.module.css';

export type IridescentWeaveMode = 'weave' | 'moire' | 'ripple';

export type IridescentWeaveShaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  accentColor?: string;
  baseColor?: string;
  grain?: number;
  highlightColor?: string;
  mode?: IridescentWeaveMode;
  pixelRatio?: number;
  pointerLight?: number;
  relief?: number;
  speed?: number;
  surfaceColor?: string;
  textureScale?: number;
};

type SurfaceSettings = {
  accent: [number, number, number];
  base: [number, number, number];
  grain: number;
  highlight: [number, number, number];
  mode: number;
  pixelRatio: number;
  pointerLight: number;
  reduceMotion: boolean;
  relief: number;
  speed: number;
  surface: [number, number, number];
  textureScale: number;
};

type SurfaceStyle = React.CSSProperties & {
  '--weave-accent': string;
  '--weave-base': string;
  '--weave-highlight': string;
  '--weave-surface': string;
};

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const iridescentWeaveFragmentShader = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_mode;
uniform float u_scale;
uniform float u_relief;
uniform float u_grain;
uniform float u_hover;
uniform float u_pointer_light;
uniform vec3 u_base;
uniform vec3 u_surface;
uniform vec3 u_accent;
uniform vec3 u_highlight;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), local.x),
    mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + 1.0), local.x),
    local.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.52;
  mat2 turn = mat2(0.86, -0.51, 0.51, 0.86);
  for (int i = 0; i < 5; i++) {
    value += amplitude * valueNoise(p);
    p = turn * p * 2.04 + 17.13;
    amplitude *= 0.49;
  }
  return value;
}

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float weaveHeight(vec2 p, float motion) {
  vec2 drift = vec2(motion * 0.12, -motion * 0.085);
  vec2 warp = vec2(
    fbm(p * 1.35 + drift),
    fbm(p.yx * 1.48 - drift + 8.7)
  ) - 0.5;
  vec2 q = p + warp * 0.46;
  float horizontal = pow(0.5 + 0.5 * sin(q.y * 34.0 + motion * 0.72), 10.0);
  float vertical = pow(0.5 + 0.5 * sin(q.x * 31.0 - motion * 0.61), 10.0);
  float overUnder = smoothstep(-0.18, 0.18, sin((q.x + q.y) * 15.5));
  return mix(horizontal, vertical, overUnder) * 0.7 + (horizontal + vertical) * 0.15;
}

float moireHeight(vec2 p, float motion) {
  vec2 a = rotate2d(0.28 + sin(motion * 0.17) * 0.045) * p;
  vec2 b = rotate2d(-0.31 + cos(motion * 0.14) * 0.05) * p;
  float linesA = sin(a.x * 42.0 + motion * 0.9 + sin(a.y * 2.4));
  float linesB = sin(b.x * 39.0 - motion * 0.72 + sin(b.y * 2.1));
  float interference = 0.5 + 0.5 * linesA * linesB;
  float soft = fbm(p * 1.25 + vec2(motion * 0.045, 0.0));
  return interference * 0.78 + soft * 0.22;
}

float rippleHeight(vec2 p, float motion) {
  vec2 centerA = vec2(sin(motion * 0.29), cos(motion * 0.23)) * 0.24;
  vec2 centerB = vec2(cos(motion * 0.19), sin(motion * 0.31)) * 0.31;
  float radialA = sin(length(p - centerA) * 25.0 - motion * 1.55);
  float radialB = sin(length(p - centerB) * 31.0 - motion * 1.18);
  float interference = 0.5 + 0.25 * radialA + 0.25 * radialB;
  return interference * 0.82 +
    fbm(p * 1.8 - vec2(motion * 0.035)) * 0.18;
}

float surfaceHeight(vec2 p) {
  float motion = u_time * (1.0 + u_hover * 0.55);
  if (u_mode < 0.5) return weaveHeight(p, motion);
  if (u_mode < 1.5) return moireHeight(p, motion);
  return rippleHeight(p, motion);
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 pointerDelta = (v_uv - u_pointer) * vec2(aspect, 1.0);
  float pointerDistance = length(pointerDelta);
  float pointerInfluence = exp(-pointerDistance * pointerDistance * 7.5) * u_hover * u_pointer_light;
  float pointerWave = sin(pointerDistance * 34.0 - u_time * 3.6) * pointerInfluence;
  p += normalize(pointerDelta + vec2(0.0001)) * pointerWave * 0.038;
  float height = surfaceHeight(p);
  float epsilon = 0.0045 * u_scale;
  float heightX = surfaceHeight(p + vec2(epsilon, 0.0));
  float heightY = surfaceHeight(p + vec2(0.0, epsilon));
  vec3 normal = normalize(vec3(
    (height - heightX) * u_relief,
    (height - heightY) * u_relief,
    0.085
  ));

  vec2 pointer = mix(vec2(0.68, 0.72), u_pointer, u_pointer_light);
  vec3 lightPosition = vec3(
    (pointer.x - v_uv.x) * aspect,
    pointer.y - v_uv.y,
    0.46
  );
  vec3 lightDirection = normalize(lightPosition);
  float diffuse = max(dot(normal, lightDirection), 0.0);
  float grazing = pow(1.0 - max(normal.z, 0.0), 1.8);
  float specular = pow(max(dot(reflect(-lightDirection, normal), vec3(0.0, 0.0, 1.0)), 0.0), 18.0);
  float chroma = 0.5 + 0.5 * sin(
    height * 8.5 + normal.x * 4.0 - normal.y * 3.0 + u_time * 0.38
  );
  float brightThread = smoothstep(0.58, 0.96, height);

  vec3 color = mix(u_base, u_surface, 0.3 + height * 0.52);
  color = mix(color, u_accent, chroma * (0.32 + brightThread * 0.48));
  color *= 0.66 + diffuse * (0.5 + u_hover * 0.14);
  color = mix(
    color,
    u_highlight,
    specular * (0.68 + u_hover * 0.25) + grazing * 0.12 + pointerInfluence * 0.1
  );
  float grain = hash21(gl_FragCoord.xy + fract(u_time) * 139.0) - 0.5;
  float microWeave = sin(gl_FragCoord.x * 1.17) * sin(gl_FragCoord.y * 1.11);
  color += (grain + microWeave * 0.22) * u_grain;

  float edge = 1.0 - smoothstep(0.24, 1.06, length((v_uv - 0.5) * vec2(0.86, 1.0)));
  color *= 0.84 + edge * 0.16;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
    iridescentWeaveFragmentShader,
  );
  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }
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

export function IridescentWeaveShader({
  accentColor = '#d468ff',
  baseColor = '#08090d',
  className,
  grain = 0.035,
  highlightColor = '#eaffff',
  mode = 'weave',
  pixelRatio = 1.4,
  pointerLight = 0.85,
  relief = 0.88,
  speed = 0.58,
  style,
  surfaceColor = '#4d5ed7',
  textureScale = 1,
  ...props
}: IridescentWeaveShaderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const invalidateRef = React.useRef<() => void>(() => undefined);
  const reduceMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [webGLAvailable, setWebGLAvailable] = React.useState(true);
  const currentSettings = React.useMemo<SurfaceSettings>(
    () => ({
      accent: parseHexColor(accentColor, '#d468ff'),
      base: parseHexColor(baseColor, '#08090d'),
      grain: clamp(grain, 0, 0.14),
      highlight: parseHexColor(highlightColor, '#eaffff'),
      mode: mode === 'moire' ? 1 : mode === 'ripple' ? 2 : 0,
      pixelRatio: clamp(pixelRatio, 0.75, 2),
      pointerLight: clamp(pointerLight, 0, 1),
      reduceMotion,
      relief: clamp(relief, 0, 2.2),
      speed: clamp(speed, 0, 1),
      surface: parseHexColor(surfaceColor, '#4d5ed7'),
      textureScale: clamp(textureScale, 0.5, 2.5),
    }),
    [
      accentColor,
      baseColor,
      grain,
      highlightColor,
      mode,
      pixelRatio,
      pointerLight,
      reduceMotion,
      relief,
      speed,
      surfaceColor,
      textureScale,
    ],
  );
  const settingsRef = React.useRef<SurfaceSettings>(currentSettings);

  React.useEffect(() => {
    settingsRef.current = currentSettings;
    invalidateRef.current();
  }, [currentSettings]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    const targetCanvas: HTMLCanvasElement = canvas;
    const context: WebGLRenderingContext = gl;
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const uniforms = {
      accent: gl.getUniformLocation(program, 'u_accent'),
      base: gl.getUniformLocation(program, 'u_base'),
      grain: gl.getUniformLocation(program, 'u_grain'),
      highlight: gl.getUniformLocation(program, 'u_highlight'),
      hover: gl.getUniformLocation(program, 'u_hover'),
      mode: gl.getUniformLocation(program, 'u_mode'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      pointerLight: gl.getUniformLocation(program, 'u_pointer_light'),
      relief: gl.getUniformLocation(program, 'u_relief'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      surface: gl.getUniformLocation(program, 'u_surface'),
      time: gl.getUniformLocation(program, 'u_time'),
    };

    WebGLRenderingContext.prototype.useProgram.call(gl, program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let animationFrame = 0;
    let stopped = false;
    const startedAt = performance.now();
    const pointer = { currentX: 0.68, currentY: 0.72, x: 0.68, y: 0.72 };
    const hover = { current: 0, target: 0 };

    function resize() {
      const settings = settingsRef.current;
      const ratio = Math.min(window.devicePixelRatio || 1, settings.pixelRatio);
      const rect = targetCanvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (targetCanvas.width !== width || targetCanvas.height !== height) {
        targetCanvas.width = width;
        targetCanvas.height = height;
      }
      context.viewport(0, 0, width, height);
    }

    function draw(timestamp: number) {
      if (stopped) return;
      const settings = settingsRef.current;
      resize();
      pointer.currentX += (pointer.x - pointer.currentX) * 0.065;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.065;
      hover.current += (hover.target - hover.current) * 0.085;
      const elapsed = settings.reduceMotion
        ? 0
        : ((timestamp - startedAt) / 1000) * settings.speed;

      context.uniform2f(
        uniforms.resolution,
        targetCanvas.width,
        targetCanvas.height,
      );
      context.uniform2f(uniforms.pointer, pointer.currentX, pointer.currentY);
      context.uniform1f(uniforms.time, elapsed);
      context.uniform1f(uniforms.mode, settings.mode);
      context.uniform1f(uniforms.scale, settings.textureScale);
      context.uniform1f(uniforms.relief, settings.relief);
      context.uniform1f(uniforms.grain, settings.grain);
      context.uniform1f(uniforms.hover, hover.current);
      context.uniform1f(uniforms.pointerLight, settings.pointerLight);
      context.uniform3fv(uniforms.base, settings.base);
      context.uniform3fv(uniforms.surface, settings.surface);
      context.uniform3fv(uniforms.accent, settings.accent);
      context.uniform3fv(uniforms.highlight, settings.highlight);
      context.drawArrays(context.TRIANGLES, 0, 3);

      const pointerSettling =
        Math.abs(pointer.x - pointer.currentX) > 0.001 ||
        Math.abs(pointer.y - pointer.currentY) > 0.001;
      const hoverSettling = Math.abs(hover.target - hover.current) > 0.001;
      if (
        (!settings.reduceMotion && settings.speed > 0) ||
        pointerSettling ||
        hoverSettling
      ) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function invalidate() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(draw);
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = targetCanvas.getBoundingClientRect();
      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointer.y = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      if (settingsRef.current.reduceMotion || settingsRef.current.speed === 0) {
        pointer.currentX = pointer.x;
        pointer.currentY = pointer.y;
        invalidate();
      }
    }

    function handlePointerEnter() {
      hover.target = 1;
      if (settingsRef.current.reduceMotion) hover.current = 1;
      invalidate();
    }

    function handlePointerLeave() {
      hover.target = 0;
      pointer.x = 0.68;
      pointer.y = 0.72;
      if (settingsRef.current.reduceMotion) {
        hover.current = 0;
      }
      if (settingsRef.current.reduceMotion || settingsRef.current.speed === 0) {
        pointer.currentX = pointer.x;
        pointer.currentY = pointer.y;
        invalidate();
      }
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      setWebGLAvailable(false);
    }

    const resizeObserver = new ResizeObserver(invalidate);
    resizeObserver.observe(targetCanvas);
    targetCanvas.addEventListener('pointerenter', handlePointerEnter);
    targetCanvas.addEventListener('pointermove', handlePointerMove);
    targetCanvas.addEventListener('pointerleave', handlePointerLeave);
    targetCanvas.addEventListener('webglcontextlost', handleContextLost);
    invalidateRef.current = invalidate;
    setWebGLAvailable(true);
    invalidate();

    return () => {
      stopped = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      targetCanvas.removeEventListener('pointerenter', handlePointerEnter);
      targetCanvas.removeEventListener('pointermove', handlePointerMove);
      targetCanvas.removeEventListener('pointerleave', handlePointerLeave);
      targetCanvas.removeEventListener('webglcontextlost', handleContextLost);
      invalidateRef.current = () => undefined;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  const surfaceStyle = {
    ...style,
    '--weave-accent': accentColor,
    '--weave-base': baseColor,
    '--weave-highlight': highlightColor,
    '--weave-surface': surfaceColor,
  } as SurfaceStyle;

  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(styles.root, className)}
      data-mode={mode}
      data-webgl={webGLAvailable}
      style={surfaceStyle}
    >
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
