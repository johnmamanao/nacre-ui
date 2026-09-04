'use client';

import {
  getShaderColorFromString,
  ShaderMount,
} from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './magnetic-warp-background.module.css';

export const magneticWarpFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_base;
uniform vec4 u_north;
uniform vec4 u_south;
uniform vec4 u_pulse;
uniform float u_warp;
uniform float u_intensity;

out vec4 fragColor;

float hash21(vec2 point) {
  point = fract(point * vec2(123.34, 345.45));
  point += dot(point, point + 34.345);
  return fract(point.x * point.y);
}

vec2 perpendicular(vec2 vector) {
  return vec2(-vector.y, vector.x);
}

void main() {
  vec2 point = (2.0 * gl_FragCoord.xy - u_resolution.xy) /
    min(u_resolution.x, u_resolution.y);
  float time = u_time;

  vec2 northPole = vec2(
    -0.43 + sin(time * 0.23) * 0.1,
    0.08 + cos(time * 0.29) * 0.12
  );
  vec2 southPole = vec2(
    0.43 + cos(time * 0.21) * 0.1,
    -0.08 + sin(time * 0.27) * 0.12
  );

  vec2 warpedPoint = point;
  vec2 broadWarp = vec2(
    sin(point.y * 1.9 + time * 0.3) + sin(point.y * 3.7 - time * 0.17) * 0.45,
    cos(point.x * 1.7 - time * 0.26) + cos(point.x * 3.2 + time * 0.19) * 0.4
  );
  warpedPoint += broadWarp * 0.09 * u_warp;

  vec2 toNorth = warpedPoint - northPole;
  vec2 toSouth = warpedPoint - southPole;
  float northDistance = max(length(toNorth), 0.035);
  float southDistance = max(length(toSouth), 0.035);

  vec2 orbitalWarp =
    perpendicular(toNorth / northDistance) * exp(-northDistance * 1.65) -
    perpendicular(toSouth / southDistance) * exp(-southDistance * 1.65);
  warpedPoint += orbitalWarp * 0.12 * u_warp;

  toNorth = warpedPoint - northPole;
  toSouth = warpedPoint - southPole;
  northDistance = max(length(toNorth), 0.035);
  southDistance = max(length(toSouth), 0.035);

  float northAngle = atan(toNorth.y, toNorth.x);
  float southAngle = atan(toSouth.y, toSouth.x);
  float magneticPotential = northAngle - southAngle;
  float distanceBias = (northDistance - southDistance) * 1.36;
  float bridgeDistance = northDistance + southDistance;

  float warpRipple = sin(bridgeDistance * 3.1 - time * 0.32) * 0.38 * u_warp;
  float fieldCoordinate =
    magneticPotential * 10.0 + distanceBias * 4.0 + warpRipple * 4.0;

  float fieldWave = cos(fieldCoordinate);
  float fieldLines = pow(0.5 + 0.5 * fieldWave, 13.0);
  float ghostLines = pow(
    0.5 + 0.5 * cos(fieldCoordinate * 2.0 + 1.2),
    22.0
  );

  float travel = bridgeDistance * 4.2 - time * 0.84;
  float energyPulse = pow(0.5 + 0.5 * sin(travel), 10.0);
  float counterPulse = pow(
    0.5 + 0.5 * sin(travel * 0.63 + magneticPotential * 2.0 + 2.1),
    14.0
  );

  float sideMix = smoothstep(-0.58, 0.58, northDistance - southDistance);
  vec3 fieldColor = mix(u_north.rgb, u_south.rgb, sideMix);
  float chromaticShift = 0.5 + 0.5 * sin(magneticPotential * 2.0 + time * 0.18);
  fieldColor = mix(fieldColor, u_pulse.rgb, chromaticShift * 0.24);

  float broadField = 0.5 + 0.5 * sin(
    magneticPotential * 2.0 + distanceBias * 0.7 + warpRipple * 0.7 + time * 0.16
  );
  vec3 color = mix(u_base.rgb, fieldColor, 0.09 + broadField * 0.17);
  color += fieldColor * fieldLines * (0.16 + energyPulse * 0.52) * u_intensity;
  color += u_pulse.rgb * ghostLines * counterPulse * 0.16 * u_intensity;

  float northGlow = exp(-northDistance * 4.2);
  float southGlow = exp(-southDistance * 4.2);
  color += u_north.rgb * northGlow * 0.24 * u_intensity;
  color += u_south.rgb * southGlow * 0.24 * u_intensity;

  float centralCurrent = exp(-abs(bridgeDistance - 0.98) * 8.0);
  color += mix(u_north.rgb, u_south.rgb, sideMix) * centralCurrent * 0.08;

  float vignette = 1.0 - smoothstep(0.72, 1.52, length(point));
  color *= 0.68 + vignette * 0.38;

  float grain = hash21(gl_FragCoord.xy + floor(time * 11.0)) - 0.5;
  color += grain * 0.01;

  fragColor = vec4(color, 1.0);
}`;

type ShaderMountProps = React.ComponentProps<typeof ShaderMount>;

export type MagneticWarpBackgroundProps = Omit<
  ShaderMountProps,
  'fragmentShader' | 'uniforms' | 'speed'
> & {
  base?: string;
  north?: string;
  south?: string;
  pulse?: string;
  warp?: number;
  intensity?: number;
  speed?: number;
};

function MagneticWarpBackground({
  className,
  base = '#07080c',
  north = '#62e6d6',
  south = '#8b72ff',
  pulse = '#ff9f66',
  warp = 0.9,
  intensity = 0.92,
  speed = 0.64,
  minPixelRatio = 1,
  maxPixelCount = 1_600_000,
  ...props
}: MagneticWarpBackgroundProps) {
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
      u_north: getShaderColorFromString(north),
      u_south: getShaderColorFromString(south),
      u_pulse: getShaderColorFromString(pulse),
      u_warp: Math.min(Math.max(warp, 0.15), 1.4),
      u_intensity: Math.min(Math.max(intensity, 0.2), 1.4),
    }),
    [base, intensity, north, pulse, south, warp],
  );

  return (
    <div
      data-slot="magnetic-warp-background"
      className={cn(styles.root, className)}
      aria-hidden="true"
    >
      <ShaderMount
        className={styles.shader}
        fragmentShader={magneticWarpFragmentShader}
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

export { MagneticWarpBackground };
