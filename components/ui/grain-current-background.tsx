'use client';

import {
  getShaderColorFromString,
  ShaderMount,
} from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './grain-current-background.module.css';

export const grainCurrentFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_base;
uniform vec4 u_blue;
uniform vec4 u_pink;
uniform vec4 u_violet;
uniform float u_flow;
uniform float u_grain;

out vec4 fragColor;

float hash21(vec2 point) {
  point = fract(point * vec2(123.34, 345.45));
  point += dot(point, point + 34.345);
  return fract(point.x * point.y);
}

float softCurrent(float coordinate, float center, float spread) {
  float distance = coordinate - center;
  return exp(-(distance * distance) / spread);
}

void main() {
  vec2 point = (2.0 * gl_FragCoord.xy - u_resolution.xy) /
    min(u_resolution.x, u_resolution.y);
  float time = u_time;

  float slowDrift = sin(time * 0.17) * 0.13;
  float primaryBend = sin(point.x * 1.18 - time * 0.28) * 0.16;
  float secondaryBend = sin(point.x * 2.46 + time * 0.19) * 0.052;
  float current = point.y + point.x * 0.47;
  current += (primaryBend + secondaryBend) * u_flow + slowDrift;

  float blueCurrent = softCurrent(current, -0.2, 0.74);
  float violetCurrent = softCurrent(current, 0.02, 0.38);
  float pinkCurrent = softCurrent(current, 0.22, 0.12);

  float longitudinalLight =
    0.86 + 0.14 * sin(point.x * 0.72 - time * 0.24);
  float breathing = 0.94 + 0.06 * sin(time * 0.21 + point.x * 0.18);

  vec3 color = u_base.rgb;
  color = mix(color, u_blue.rgb, blueCurrent * 0.72 * breathing);
  color = mix(color, u_violet.rgb, violetCurrent * 0.46);
  color += u_pink.rgb * pinkCurrent * 0.62 * longitudinalLight;

  float edgeBloom = softCurrent(current, 0.17, 0.035);
  color += mix(u_pink.rgb, u_violet.rgb, 0.34) * edgeBloom * 0.12;

  float vignette = 1.0 - smoothstep(0.76, 1.72, length(point * vec2(0.72, 1.0)));
  color *= 0.72 + vignette * 0.34;

  vec2 grainFrame = vec2(floor(time * 23.0), floor(time * 17.0));
  float fineGrain = hash21(gl_FragCoord.xy + grainFrame) - 0.5;
  float coarseGrain = hash21(floor(gl_FragCoord.xy * 0.5) + grainFrame * 1.7) - 0.5;
  float filmGrain = fineGrain * 0.68 + coarseGrain * 0.32;
  color += filmGrain * u_grain;

  fragColor = vec4(color, 1.0);
}`;

type ShaderMountProps = React.ComponentProps<typeof ShaderMount>;

export type GrainCurrentBackgroundProps = Omit<
  ShaderMountProps,
  'fragmentShader' | 'uniforms' | 'speed'
> & {
  base?: string;
  blue?: string;
  pink?: string;
  violet?: string;
  flow?: number;
  grain?: number;
  speed?: number;
};

function GrainCurrentBackground({
  className,
  base = '#080910',
  blue = '#477df4',
  pink = '#e546aa',
  violet = '#9567ff',
  flow = 0.88,
  grain = 0.052,
  speed = 0.52,
  minPixelRatio = 1,
  maxPixelCount = 1_600_000,
  ...props
}: GrainCurrentBackgroundProps) {
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
      u_blue: getShaderColorFromString(blue),
      u_pink: getShaderColorFromString(pink),
      u_violet: getShaderColorFromString(violet),
      u_flow: Math.min(Math.max(flow, 0.15), 1.4),
      u_grain: Math.min(Math.max(grain, 0), 0.12),
    }),
    [base, blue, flow, grain, pink, violet],
  );

  return (
    <div
      data-slot="grain-current-background"
      className={cn(styles.root, className)}
      aria-hidden="true"
    >
      <ShaderMount
        className={styles.shader}
        fragmentShader={grainCurrentFragmentShader}
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

export { GrainCurrentBackground };
