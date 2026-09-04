'use client';

import {
  getShaderColorFromString,
  ShaderMount,
} from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './mesh-background.module.css';

export const meshFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_base;
uniform vec4 u_warm;
uniform vec4 u_cool;
uniform vec4 u_highlight;
uniform float u_flow;
uniform float u_lustre;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float softBand(float value, float width) {
  return exp(-value * value / width);
}

void main() {
  vec2 point = (2.0 * gl_FragCoord.xy - u_resolution.xy) /
    min(u_resolution.x, u_resolution.y);
  float time = u_time;

  vec2 drift = vec2(
    sin(point.y * 1.35 + time * 0.36),
    cos(point.x * 1.18 - time * 0.3)
  ) * 0.16 * u_flow;
  vec2 silk = point + drift;

  float foldA = sin(
    silk.x * 2.35 +
    sin(silk.y * 1.7 - time * 0.46) * 1.3 +
    time * 0.42
  );
  float foldB = sin(
    silk.y * 2.08 +
    cos(silk.x * 1.48 + time * 0.38) * 1.45 -
    time * 0.35
  );
  float foldC = sin(
    (silk.x + silk.y) * 1.62 +
    sin((silk.x - silk.y) * 1.2 - time * 0.24) * 1.1 +
    time * 0.29
  );

  float fabricHeight = foldA * 0.44 + foldB * 0.34 + foldC * 0.22;
  float slopeX = dFdx(fabricHeight);
  float slopeY = dFdy(fabricHeight);
  vec3 normal = normalize(vec3(-slopeX * 32.0, -slopeY * 32.0, 1.0));
  vec3 lightDirection = normalize(vec3(
    0.72 * sin(time * 0.31),
    0.55 * cos(time * 0.27),
    0.86
  ));
  float diffuse = max(dot(normal, lightDirection), 0.0);
  float specular = pow(max(dot(reflect(-lightDirection, normal), vec3(0.0, 0.0, 1.0)), 0.0), 22.0);

  float ribbonA = softBand(foldA + foldC * 0.34, 0.2);
  float ribbonB = softBand(foldB - foldA * 0.28, 0.24);
  float weave = smoothstep(0.34, 0.9, ribbonA * 0.62 + ribbonB * 0.58);

  vec3 color = u_base.rgb;
  color = mix(color, u_warm.rgb, 0.18 + ribbonA * 0.66);
  color = mix(color, u_cool.rgb, ribbonB * 0.52);
  color = mix(color, mix(u_warm.rgb, u_cool.rgb, 0.5), weave * 0.28);
  color *= 0.62 + diffuse * 0.62;
  color += u_highlight.rgb * specular * (0.08 + u_lustre * 0.14);

  float crossing = pow(clamp(ribbonA * ribbonB, 0.0, 1.0), 2.2);
  color += u_highlight.rgb * crossing * 0.035 * u_lustre;

  float vignette = smoothstep(1.5, 0.22, length(point * vec2(0.74, 1.0)));
  color *= 0.7 + vignette * 0.38;

  float grain = hash21(gl_FragCoord.xy + floor(time * 13.0)) - 0.5;
  color += grain * 0.012;

  fragColor = vec4(color, 1.0);
}`;

type ShaderMountProps = React.ComponentProps<typeof ShaderMount>;

export type MeshBackgroundProps = Omit<
  ShaderMountProps,
  'fragmentShader' | 'uniforms' | 'speed'
> & {
  base?: string;
  warm?: string;
  cool?: string;
  highlight?: string;
  flow?: number;
  lustre?: number;
  speed?: number;
};

function MeshBackground({
  className,
  base = '#09090b',
  warm = '#f36f56',
  cool = '#6254d9',
  highlight = '#ffe8bc',
  flow = 0.92,
  lustre = 0.58,
  speed = 0.58,
  minPixelRatio = 1,
  maxPixelCount = 1_600_000,
  ...props
}: MeshBackgroundProps) {
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
      u_warm: getShaderColorFromString(warm),
      u_cool: getShaderColorFromString(cool),
      u_highlight: getShaderColorFromString(highlight),
      u_flow: Math.min(Math.max(flow, 0.15), 1.5),
      u_lustre: Math.min(Math.max(lustre, 0), 1.2),
    }),
    [base, cool, flow, highlight, lustre, warm],
  );

  return (
    <div
      data-slot="mesh-background"
      className={cn(styles.root, className)}
      aria-hidden="true"
    >
      <ShaderMount
        className={styles.shader}
        fragmentShader={meshFragmentShader}
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

export { MeshBackground };
