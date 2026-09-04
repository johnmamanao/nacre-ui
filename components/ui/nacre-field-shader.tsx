'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './nacre-field-shader.module.css';

export type NacreFieldMode = 'veil' | 'lens' | 'tide';

export type NacreFieldShaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  baseColor?: string;
  colorA?: string;
  colorB?: string;
  distortion?: number;
  grain?: number;
  highlightColor?: string;
  mode?: NacreFieldMode;
  pixelRatio?: number;
  pointerStrength?: number;
  speed?: number;
};

type FieldSettings = {
  base: [number, number, number];
  colorA: [number, number, number];
  colorB: [number, number, number];
  distortion: number;
  grain: number;
  highlight: [number, number, number];
  mode: number;
  pixelRatio: number;
  pointerStrength: number;
  reduceMotion: boolean;
  speed: number;
};

type FieldStyle = React.CSSProperties & {
  '--nacre-field-base': string;
  '--nacre-field-color-a': string;
  '--nacre-field-color-b': string;
  '--nacre-field-highlight': string;
};

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const nacreFieldFragmentShader = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_mode;
uniform float u_distortion;
uniform float u_grain;
uniform float u_pointer_strength;
uniform vec3 u_base;
uniform vec3 u_color_a;
uniform vec3 u_color_b;
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
  float amplitude = 0.54;
  mat2 turn = mat2(0.82, -0.57, 0.57, 0.82);
  for (int i = 0; i < 5; i++) {
    value += amplitude * valueNoise(p);
    p = turn * p * 2.03 + 13.17;
    amplitude *= 0.5;
  }
  return value;
}

vec3 veilField(vec2 p, float time) {
  float broad = fbm(p * 1.42 + vec2(time * 0.075, -time * 0.052));
  float counter = fbm(p.yx * 2.18 + vec2(-time * 0.045, time * 0.062));
  float fold = sin(
    (p.x * 0.82 + p.y * 0.46 + broad * u_distortion * 0.72) * 8.4 +
    time * 0.34
  );
  float crossFold = sin(
    (-p.x * 0.38 + p.y * 0.92 + counter * u_distortion * 0.5) * 6.2 -
    time * 0.26
  );
  float body = smoothstep(-0.92, 0.86, fold + crossFold * 0.38);
  vec3 color = mix(u_base, u_color_a, body * 0.82);
  color = mix(color, u_color_b, smoothstep(0.48, 1.08, counter + fold * 0.18));
  float sheen = pow(max(0.0, 1.0 - abs(fold * 0.68 + crossFold * 0.24)), 8.0);
  return mix(color, u_highlight, sheen * 0.82);
}

vec3 lensField(vec2 p, vec2 pointer, float time) {
  vec2 delta = p - pointer;
  float radius = length(delta);
  float angle = atan(delta.y, delta.x);
  float noise = fbm(p * 2.35 + vec2(time * 0.042, -time * 0.036));
  float refraction = sin(
    radius * 19.0 - time * 0.46 + noise * u_distortion * 4.2 + sin(angle * 3.0) * 0.42
  );
  float halo = exp(-radius * 2.25);
  float split = 0.5 + 0.5 * sin(angle * 2.0 + radius * 7.0 - time * 0.18);
  vec3 color = mix(u_base, u_color_a, halo * (0.55 + split * 0.35));
  color = mix(color, u_color_b, smoothstep(-0.5, 0.9, refraction) * halo);
  float edge = pow(max(0.0, 1.0 - abs(refraction)), 10.0) * halo;
  return mix(color, u_highlight, edge);
}

vec3 tideField(vec2 p, float time) {
  float current = fbm(vec2(p.x * 1.3 - time * 0.055, p.y * 2.1 + time * 0.038));
  vec2 warped = p;
  warped.y += sin(p.x * 2.8 + time * 0.2) * 0.16 * u_distortion;
  warped.x += (current - 0.5) * 0.34 * u_distortion;
  float tide = 0.5 + 0.5 * sin(
    warped.x * 5.1 + warped.y * 8.8 - time * 0.38 + current * 4.0
  );
  float wake = smoothstep(0.2, 0.9, tide);
  vec3 color = mix(u_base, u_color_b, current * 0.78);
  color = mix(color, u_color_a, wake * 0.72);
  float foam = pow(tide, 13.0) * (0.45 + current * 0.55);
  return mix(color, u_highlight, foam * 0.74);
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0);
  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0);
  vec2 toPointer = pointer - p;
  float pointerFalloff = exp(-dot(toPointer, toPointer) * 3.6);
  p += toPointer * pointerFalloff * u_pointer_strength * 0.095;

  vec3 color;
  if (u_mode < 0.5) {
    color = veilField(p, u_time);
  } else if (u_mode < 1.5) {
    color = lensField(p, pointer, u_time);
  } else {
    color = tideField(p, u_time);
  }

  float vignette = 1.0 - smoothstep(0.18, 1.08, length((v_uv - 0.5) * vec2(0.82, 1.0)));
  color *= 0.79 + vignette * 0.21;
  float grain = hash21(gl_FragCoord.xy + fract(u_time) * 173.0) - 0.5;
  color += grain * u_grain;
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
    nacreFieldFragmentShader,
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

export function NacreFieldShader({
  baseColor = '#0b0b0e',
  className,
  colorA = '#c7b5ff',
  colorB = '#6ed8cf',
  distortion = 0.82,
  grain = 0.025,
  highlightColor = '#fff2d5',
  mode = 'veil',
  pixelRatio = 1.5,
  pointerStrength = 0.72,
  speed = 0.5,
  style,
  ...props
}: NacreFieldShaderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const invalidateRef = React.useRef<() => void>(() => undefined);
  const reduceMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [webGLAvailable, setWebGLAvailable] = React.useState(true);
  const currentSettings = React.useMemo<FieldSettings>(
    () => ({
      base: parseHexColor(baseColor, '#0b0b0e'),
      colorA: parseHexColor(colorA, '#c7b5ff'),
      colorB: parseHexColor(colorB, '#6ed8cf'),
      distortion: clamp(distortion, 0, 1.6),
      grain: clamp(grain, 0, 0.12),
      highlight: parseHexColor(highlightColor, '#fff2d5'),
      mode: mode === 'lens' ? 1 : mode === 'tide' ? 2 : 0,
      pixelRatio: clamp(pixelRatio, 0.75, 2),
      pointerStrength: clamp(pointerStrength, 0, 1.5),
      reduceMotion,
      speed: clamp(speed, 0, 1.5),
    }),
    [
      baseColor,
      colorA,
      colorB,
      distortion,
      grain,
      highlightColor,
      mode,
      pixelRatio,
      pointerStrength,
      reduceMotion,
      speed,
    ],
  );
  const settingsRef = React.useRef<FieldSettings>(currentSettings);

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
      base: gl.getUniformLocation(program, 'u_base'),
      colorA: gl.getUniformLocation(program, 'u_color_a'),
      colorB: gl.getUniformLocation(program, 'u_color_b'),
      distortion: gl.getUniformLocation(program, 'u_distortion'),
      grain: gl.getUniformLocation(program, 'u_grain'),
      highlight: gl.getUniformLocation(program, 'u_highlight'),
      mode: gl.getUniformLocation(program, 'u_mode'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      pointerStrength: gl.getUniformLocation(program, 'u_pointer_strength'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
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
    const pointer = { currentX: 0.5, currentY: 0.5, x: 0.5, y: 0.5 };

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
      pointer.currentX += (pointer.x - pointer.currentX) * 0.075;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.075;
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
      context.uniform1f(uniforms.distortion, settings.distortion);
      context.uniform1f(uniforms.grain, settings.grain);
      context.uniform1f(uniforms.pointerStrength, settings.pointerStrength);
      context.uniform3fv(uniforms.base, settings.base);
      context.uniform3fv(uniforms.colorA, settings.colorA);
      context.uniform3fv(uniforms.colorB, settings.colorB);
      context.uniform3fv(uniforms.highlight, settings.highlight);
      context.drawArrays(context.TRIANGLES, 0, 3);

      if (!settings.reduceMotion && settings.speed > 0) {
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

    function handlePointerLeave() {
      pointer.x = 0.5;
      pointer.y = 0.5;
      if (settingsRef.current.reduceMotion || settingsRef.current.speed === 0) {
        pointer.currentX = 0.5;
        pointer.currentY = 0.5;
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
      targetCanvas.removeEventListener('pointermove', handlePointerMove);
      targetCanvas.removeEventListener('pointerleave', handlePointerLeave);
      targetCanvas.removeEventListener('webglcontextlost', handleContextLost);
      invalidateRef.current = () => undefined;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  const fieldStyle = {
    ...style,
    '--nacre-field-base': baseColor,
    '--nacre-field-color-a': colorA,
    '--nacre-field-color-b': colorB,
    '--nacre-field-highlight': highlightColor,
  } as FieldStyle;

  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(styles.root, className)}
      data-mode={mode}
      data-webgl={webGLAvailable}
      style={fieldStyle}
    >
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
