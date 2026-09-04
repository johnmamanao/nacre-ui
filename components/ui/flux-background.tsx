'use client';

import {
  getShaderColorFromString,
  ShaderMount,
} from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './flux-background.module.css';

export const fluxFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_base;
uniform vec4 u_ember;
uniform vec4 u_gold;
uniform vec4 u_violet;
uniform float u_energy;
uniform float u_grain;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);

  float a = hash21(cell);
  float b = hash21(cell + vec2(1.0, 0.0));
  float c = hash21(cell + vec2(0.0, 1.0));
  float d = hash21(cell + vec2(1.0, 1.0));

  return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amplitude = 0.52;
  mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);

  for (int octave = 0; octave < 5; octave++) {
    sum += amplitude * valueNoise(p);
    p = turn * p * 2.02 + vec2(9.3, 5.7);
    amplitude *= 0.5;
  }

  return sum;
}

float softOrb(vec2 point, vec2 center, float radius) {
  vec2 delta = point - center;
  return exp(-dot(delta, delta) / radius);
}

void main() {
  vec2 point = (2.0 * gl_FragCoord.xy - u_resolution.xy) /
    min(u_resolution.x, u_resolution.y);
  float time = u_time;

  float broadNoise = fbm(point * 0.82 + vec2(time * 0.08, -time * 0.05));
  float counterNoise = fbm(point * 1.34 + vec2(-time * 0.06, time * 0.09));
  vec2 warpedPoint = point + u_energy * vec2(
    sin(point.y * 2.0 + broadNoise * 4.8 + time * 0.48),
    cos(point.x * 1.7 - counterNoise * 4.1 - time * 0.38)
  ) * 0.17;

  vec2 emberCenter = vec2(
    -0.46 + 0.5 * sin(time * 0.37),
    0.2 + 0.38 * cos(time * 0.29)
  );
  vec2 goldCenter = vec2(
    0.42 + 0.48 * cos(time * 0.31 + 1.7),
    -0.16 + 0.42 * sin(time * 0.35 + 0.8)
  );
  vec2 violetCenter = vec2(
    0.06 + 0.58 * sin(time * 0.23 + 3.1),
    0.36 * cos(time * 0.41 + 2.2)
  );

  float emberBody = softOrb(warpedPoint, emberCenter, 0.52);
  float goldBody = softOrb(warpedPoint, goldCenter, 0.46);
  float violetBody = softOrb(warpedPoint, violetCenter, 0.58);

  float ribbonAPath = warpedPoint.y -
    0.28 * sin(warpedPoint.x * 2.2 + time * 0.72) -
    0.08 * sin(warpedPoint.x * 5.1 - time * 0.34);
  float ribbonBPath = warpedPoint.x +
    0.34 * cos(warpedPoint.y * 1.8 - time * 0.57) +
    0.06 * sin(warpedPoint.y * 6.0 + time * 0.42);
  float ribbonA = exp(-abs(ribbonAPath) * 9.5);
  float ribbonB = exp(-abs(ribbonBPath) * 10.5);

  vec3 color = u_base.rgb;
  color = mix(color, u_ember.rgb, clamp(emberBody * 0.92 + ribbonA * 0.38, 0.0, 1.0));
  color = mix(color, u_gold.rgb, clamp(goldBody * 0.82 + ribbonB * 0.28, 0.0, 0.9));
  color = mix(color, u_violet.rgb, clamp(violetBody * 0.74 + ribbonA * ribbonB * 0.5, 0.0, 0.86));

  float crossingLight = pow(clamp(ribbonA * ribbonB, 0.0, 1.0), 0.72);
  float liquidSheen = pow(
    0.5 + 0.5 * sin((warpedPoint.x + warpedPoint.y + broadNoise) * 7.0 - time * 1.15),
    12.0
  );
  color += mix(u_gold.rgb, vec3(1.0), 0.62) * crossingLight * 0.42;
  color += vec3(1.0, 0.88, 0.72) * liquidSheen * 0.1;

  float vignette = smoothstep(1.45, 0.24, length(point * vec2(0.76, 1.0)));
  color *= 0.66 + vignette * 0.42;

  float grain = hash21(gl_FragCoord.xy + floor(time * 18.0)) - 0.5;
  color += grain * u_grain;

  fragColor = vec4(color, 1.0);
}`;

type ShaderMountProps = React.ComponentProps<typeof ShaderMount>;

export type FluxBackgroundProps = Omit<
  ShaderMountProps,
  'fragmentShader' | 'uniforms' | 'speed'
> & {
  base?: string;
  ember?: string;
  gold?: string;
  violet?: string;
  energy?: number;
  grain?: number;
  speed?: number;
};

function FluxBackground({
  className,
  base = '#09090b',
  ember = '#ff6047',
  gold = '#ffc44f',
  violet = '#a77dff',
  energy = 0.92,
  grain = 0.022,
  speed = 0.62,
  minPixelRatio = 1,
  maxPixelCount = 1_600_000,
  ...props
}: FluxBackgroundProps) {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  const uniforms = React.useMemo(
    () => ({
      u_base: getShaderColorFromString(base),
      u_ember: getShaderColorFromString(ember),
      u_gold: getShaderColorFromString(gold),
      u_violet: getShaderColorFromString(violet),
      u_energy: Math.min(Math.max(energy, 0.2), 1.4),
      u_grain: Math.min(Math.max(grain, 0), 0.08),
    }),
    [base, ember, energy, gold, grain, violet],
  );

  return (
    <div
      data-slot="flux-background"
      className={cn(styles.root, className)}
      aria-hidden="true"
    >
      <ShaderMount
        className={styles.shader}
        fragmentShader={fluxFragmentShader}
        uniforms={uniforms}
        speed={reduceMotion ? 0 : speed}
        minPixelRatio={minPixelRatio}
        maxPixelCount={maxPixelCount}
        width="100%"
        height="100%"
        {...props}
      />
    </div>
  );
}

export { FluxBackground };
