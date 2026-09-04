'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Blend,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Hand,
  Copy,
  LoaderCircle,
  Moon,
  MousePointerClick,
  Search,
  Sun,
  WandSparkles,
} from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/lib/use-theme';
import { MagneticButton } from '@/components/ui/magnetic-button';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import magneticButtonSource from '@/components/ui/magnetic-button.tsx?raw';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import liquidMetalButtonSource from '@/components/ui/liquid-metal-button.tsx?raw';
import { GemSmokeButton } from '@/components/ui/gem-smoke-button';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import gemSmokeButtonSource from '@/components/ui/gem-smoke-button.tsx?raw';
import { LustreButton } from '@/components/ui/lustre-button';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import lustreButtonSource from '@/components/ui/lustre-button.tsx?raw';
import { SocialProfileButton } from '@/components/ui/social-profile-button';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import socialProfileButtonSource from '@/components/ui/social-profile-button.tsx?raw';
import { PearlApertureLoader } from '@/components/ui/pearl-aperture-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import pearlApertureLoaderSource from '@/components/ui/pearl-aperture-loader.tsx?raw';
import { HorizonPageLoader } from '@/components/ui/horizon-page-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import horizonPageLoaderSource from '@/components/ui/horizon-page-loader.tsx?raw';
import { MercuryRailLoader } from '@/components/ui/mercury-rail-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import mercuryRailLoaderSource from '@/components/ui/mercury-rail-loader.tsx?raw';
import { FacetBloomLoader } from '@/components/ui/facet-bloom-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import facetBloomLoaderSource from '@/components/ui/facet-bloom-loader.tsx?raw';
import { RibbonFoldLoader } from '@/components/ui/ribbon-fold-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import ribbonFoldLoaderSource from '@/components/ui/ribbon-fold-loader.tsx?raw';
import { PearlMatrixLoader } from '@/components/ui/pearl-matrix-loader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import pearlMatrixLoaderSource from '@/components/ui/pearl-matrix-loader.tsx?raw';
import {
  CardShuffleLoader,
  FluidCellLoader,
  PrismStackLoader,
} from '@/components/ui/sculptural-loaders';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import sculpturalLoadersSource from '@/components/ui/sculptural-loaders.tsx?raw';
import { SignalRevealText } from '@/components/ui/signal-reveal-text';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import signalRevealTextSource from '@/components/ui/signal-reveal-text.tsx?raw';
import { TallyShiftNumber } from '@/components/ui/tally-shift-number';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import tallyShiftNumberSource from '@/components/ui/tally-shift-number.tsx?raw';
import { TidalTypeText } from '@/components/ui/tidal-type-text';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import tidalTypeTextSource from '@/components/ui/tidal-type-text.tsx?raw';
import { SwellText } from '@/components/ui/swell-text';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import swellTextSource from '@/components/ui/swell-text.tsx?raw';
import {
  AuroraText,
  BloomText,
  GravityText,
  LiquidText,
  SlotText,
  TiltText,
} from '@/components/ui/text-motion-effects';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import textMotionEffectsSource from '@/components/ui/text-motion-effects.tsx?raw';
import { PhaseWeaveText } from '@/components/ui/phase-weave-text';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import phaseWeaveTextSource from '@/components/ui/phase-weave-text.tsx?raw';
import { EditorialMosaic } from '@/components/ui/editorial-mosaic';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import editorialMosaicSource from '@/components/ui/editorial-mosaic.tsx?raw';
import { HaloDock } from '@/components/ui/halo-dock';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import haloDockSource from '@/components/ui/halo-dock.tsx?raw';
import { ShutterTrail } from '@/components/ui/shutter-trail';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import shutterTrailSource from '@/components/ui/shutter-trail.tsx?raw';
import { FolioArcCarousel } from '@/components/ui/folio-arc-carousel';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import folioArcCarouselSource from '@/components/ui/folio-arc-carousel.tsx?raw';
import { HelixReel } from '@/components/ui/helix-reel';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import helixReelSource from '@/components/ui/helix-reel.tsx?raw';
import { ToolchainMarquee } from '@/components/ui/toolchain-marquee';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import toolchainMarqueeSource from '@/components/ui/toolchain-marquee.tsx?raw';
import { OrbitLedger } from '@/components/ui/orbit-ledger';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import orbitLedgerSource from '@/components/ui/orbit-ledger.tsx?raw';
import {
  NacreFieldShader,
  type NacreFieldMode,
} from '@/components/ui/nacre-field-shader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import nacreFieldShaderSource from '@/components/ui/nacre-field-shader.tsx?raw';
import {
  IridescentWeaveShader,
  type IridescentWeaveMode,
} from '@/components/ui/iridescent-weave-shader';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import iridescentWeaveShaderSource from '@/components/ui/iridescent-weave-shader.tsx?raw';
import { MeshBackground } from '@/components/ui/mesh-background';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import meshBackgroundSource from '@/components/ui/mesh-background.tsx?raw';
import { MagneticWarpBackground } from '@/components/ui/magnetic-warp-background';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import magneticWarpBackgroundSource from '@/components/ui/magnetic-warp-background.tsx?raw';
import { GrainCurrentBackground } from '@/components/ui/grain-current-background';
// oxlint-disable-next-line import/default -- Vite's raw loader supplies this default export.
import grainCurrentBackgroundSource from '@/components/ui/grain-current-background.tsx?raw';
import {
  FluxBackground,
  fluxFragmentShader,
} from '@/components/ui/flux-background';
import DocumentationSearch from './documentation-search';

const installCommand = 'npx @nacre-ui/cli@latest list';

const catalog = [
  {
    name: 'Button',
    category: 'Actions',
    description:
      'Clear action hierarchy across primary, secondary, quiet, and destructive contexts.',
    status: 'Stable',
  },
  {
    name: 'Magnetic Button',
    category: 'Actions',
    description:
      'A pointer-responsive action with localized light and restrained magnetic movement.',
    status: 'New',
  },
  {
    name: 'Liquid Metal Button',
    category: 'Actions',
    description:
      'A restrained CTA rendered with a continuously shifting metallic surface.',
    status: 'New',
  },
  {
    name: 'Gem Smoke Button',
    category: 'Actions',
    description:
      'A dark jewel action with softly moving color and smoke beneath its surface.',
    status: 'New',
  },
  {
    name: 'Lustre Button',
    category: 'Actions',
    description:
      'A polished ink CTA with a soft diagonal light moving across its surface.',
    status: 'New',
  },
  {
    name: 'Social Profile Button',
    category: 'Actions',
    description:
      'A social profile link that reveals the account handle before opening its destination.',
    status: 'New',
  },
  {
    name: 'Pearl Aperture Loader',
    category: 'Loaders',
    description:
      'A calm indeterminate loader with rotating shell arcs and a softly breathing pearl.',
    status: 'New',
  },
  {
    name: 'Horizon Page Loader',
    category: 'Loaders',
    description:
      'A full-page loading veil built around an opening horizon and a traveling pearlescent light.',
    status: 'New',
  },
  {
    name: 'Mercury Rail Loader',
    category: 'Loaders',
    description:
      'A horizontal loading rail with a shape-shifting mercury bead and a soft reflected trail.',
    status: 'New',
  },
  {
    name: 'Facet Bloom Loader',
    category: 'Loaders',
    description:
      'A compact loading mark whose six pearlescent facets open in a quiet sequence.',
    status: 'New',
  },
  {
    name: 'Ribbon Fold Loader',
    category: 'Loaders',
    description:
      'A satin loading ribbon that folds through four connected planes in sequence.',
    status: 'New',
  },
  {
    name: 'Pearl Matrix Loader',
    category: 'Loaders',
    description:
      'A compact three-by-three pearl field lifted by a traveling diagonal pulse.',
    status: 'New',
  },
  {
    name: 'Fluid Cell Loader',
    category: 'Loaders',
    description:
      'A soft liquid cell that gathers, stretches, and reforms as work continues.',
    status: 'New',
  },
  {
    name: 'Prism Stack Loader',
    category: 'Loaders',
    description:
      'A stack of translucent planes shifts through depth around a luminous core.',
    status: 'New',
  },
  {
    name: 'Card Shuffle Loader',
    category: 'Loaders',
    description:
      'A stack of interface cards reshuffles through a compact depth sequence.',
    status: 'New',
  },
  {
    name: 'Signal Reveal Text',
    category: 'Text & Motion',
    description:
      'A staged text reveal whose words settle into place with a soft cadence.',
    status: 'New',
  },
  {
    name: 'Tally Shift Number',
    category: 'Text & Motion',
    description:
      'A rolling numeric display that turns live values into a dimensional readout.',
    status: 'New',
  },
  {
    name: 'Tidal Type Text',
    category: 'Text & Motion',
    description:
      'A pointer-driven glyph field with a soft lens and a gently responsive surface.',
    status: 'New',
  },
  {
    name: 'Swell Text',
    category: 'Text & Motion',
    description:
      'A single-layer type surface that sends a gentle, looping pressure wave through each glyph.',
    status: 'New',
  },
  {
    name: 'Aurora Text',
    category: 'Text & Motion',
    description:
      'A luminous gradient moves within crisp text without adding a second layer.',
    status: 'New',
  },
  {
    name: 'Liquid Text',
    category: 'Text & Motion',
    description:
      'A living displacement field gives type a controlled fluid surface.',
    status: 'New',
  },
  {
    name: 'Gravity Text',
    category: 'Text & Motion',
    description: 'Glyphs bend toward the pointer in a responsive spring field.',
    status: 'New',
  },
  {
    name: 'Slot Text',
    category: 'Text & Motion',
    description:
      'A phrase switcher rotates through words like a dimensional display slot.',
    status: 'New',
  },
  {
    name: 'Bloom Text',
    category: 'Text & Motion',
    description:
      'A bold character bloom expands, twists, and settles in a compact burst.',
    status: 'New',
  },
  {
    name: 'Tilt Text',
    category: 'Text & Motion',
    description:
      'A dimensional text surface tracks the pointer with spring-backed depth.',
    status: 'New',
  },
  {
    name: 'Phase Weave Text',
    category: 'Text & Motion',
    description:
      'A phrase rotator with a compact, character-by-character handoff.',
    status: 'New',
  },
  {
    name: 'Editorial Mosaic',
    category: 'Interactions',
    description:
      'An image collection that moves from an editorial overview into a focused story and navigation rail.',
    status: 'New',
  },
  {
    name: 'Halo Dock',
    category: 'Interactions',
    description:
      'A focused action dock with single-item lensing, spring separation, and accessible labels.',
    status: 'New',
  },
  {
    name: 'Shutter Trail',
    category: 'Interactions',
    description:
      'An editorial image trail that unfolds each frame from a shutter-thin slice and ages it into depth.',
    status: 'New',
  },
  {
    name: 'Folio Arc Carousel',
    category: 'Interactions',
    description:
      'A drag-ready gallery where the selected folio opens forward and neighboring images compress into an arced spine rail.',
    status: 'New',
  },
  {
    name: 'Helix Reel',
    category: 'Interactions',
    description:
      'A depth-sorted image reel that climbs through a corkscrew path with focused selection, swipe navigation, and optional autoplay.',
    status: 'New',
  },
  {
    name: 'Toolchain Marquee',
    category: 'Interactions',
    description:
      'Three distinct technology stacks travel in alternating directions with a shared, position-preserving motion control.',
    status: 'New',
  },
  {
    name: 'Orbit Ledger',
    category: 'Interactions',
    description:
      'A scroll-driven project index that moves cards through a curved three-dimensional path.',
    status: 'New',
  },
  {
    name: 'Nacre Field Shader',
    category: 'Backgrounds',
    description:
      'An original pointer-responsive WebGL surface with veil, lens, and tide field geometries.',
    status: 'New',
  },
  {
    name: 'Iridescent Weave Shader',
    category: 'Backgrounds',
    description:
      'An animated WebGL textile with woven threads, optical moiré, and responsive interference ripples.',
    status: 'New',
  },
  {
    name: 'Mesh Background',
    category: 'Backgrounds',
    description:
      'A matte satin surface with flowing folds, crossing color, and soft moving light.',
    status: 'New',
  },
  {
    name: 'Flux Background',
    category: 'Backgrounds',
    description:
      'A lively fluid field with orbiting color, crossing light ribbons, and liquid shimmer.',
    status: 'New',
  },
  {
    name: 'Magnetic Warp Background',
    category: 'Backgrounds',
    description:
      'A living field of luminous lines bent by moving magnetic poles and traveling energy pulses.',
    status: 'New',
  },
  {
    name: 'Grain Current Background',
    category: 'Backgrounds',
    description:
      'A soft diagonal color current with slow organic drift and animated film grain.',
    status: 'New',
  },
] as const;

const groups = [
  { name: 'Actions', description: 'Triggers and calls to action.' },
  { name: 'Loaders', description: 'Progress and waiting feedback.' },
  {
    name: 'Text & Motion',
    description: 'Expressive type treatments with a clear reading hierarchy.',
  },
  {
    name: 'Interactions',
    description:
      'Direct-manipulation surfaces that respond to touch, cursor, and drag.',
  },
  {
    name: 'Backgrounds',
    description: 'Atmospheric foundations for immersive product moments.',
  },
] as const;

const groupIcons = {
  Actions: MousePointerClick,
  Loaders: LoaderCircle,
  'Text & Motion': WandSparkles,
  Interactions: Hand,
  Backgrounds: Blend,
} satisfies Record<(typeof groups)[number]['name'], typeof BookOpen>;

type ComponentName = (typeof catalog)[number]['name'];
type DeferredComponentName =
  | 'Input'
  | 'Switch'
  | 'Tabs'
  | 'Sidebar'
  | 'Modal'
  | 'Dropdown'
  | 'Segmented Control'
  | 'Card';
type GettingStartedPage = 'installation' | 'react-next' | 'theming' | 'cli';
type DocView = 'catalog' | GettingStartedPage | ComponentName;
type PackageManager = 'npm' | 'pnpm' | 'bun' | 'yarn';
type PlaygroundValue = string | number | boolean;
type PlaygroundValues = Record<string, PlaygroundValue>;

type PlaygroundControl = {
  key: string;
  label: string;
  max?: number;
  min?: number;
  options?: Array<{ label: string; value: string }>;
  step?: number;
  type: 'color' | 'range' | 'select' | 'text' | 'toggle';
};

type PlaygroundConfig = {
  controls: PlaygroundControl[];
  defaults: PlaygroundValues;
};

const defaultPlayground: PlaygroundConfig = {
  defaults: { scale: 1 },
  controls: [
    {
      key: 'scale',
      label: 'Preview scale',
      type: 'range',
      min: 0.8,
      max: 1.15,
      step: 0.05,
    },
  ],
};

const componentPlaygrounds: Partial<Record<ComponentName, PlaygroundConfig>> = {
  'Magnetic Button': {
    defaults: { label: 'Explore system', strength: 5 },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      {
        key: 'strength',
        label: 'Magnetic pull',
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
    ],
  },
  'Liquid Metal Button': {
    defaults: {
      colorBack: '#747570',
      colorTint: '#f4f3ee',
      label: 'Enter studio',
      repetition: 3.2,
      speed: 0.48,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'colorBack', label: 'Metal hue', type: 'color' },
      { key: 'colorTint', label: 'Tint color', type: 'color' },
      {
        key: 'repetition',
        label: 'Pattern density',
        type: 'range',
        min: 1,
        max: 8,
        step: 0.1,
      },
      {
        key: 'speed',
        label: 'Motion speed',
        type: 'range',
        min: 0,
        max: 1.4,
        step: 0.01,
      },
    ],
  },
  'Gem Smoke Button': {
    defaults: {
      colorOne: '#d8a7ff',
      colorThree: '#87d9bc',
      colorTwo: '#ffb49a',
      label: 'Reveal collection',
      smokeSize: 0.82,
      speed: 0.4,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'colorOne', label: 'Palette color 1', type: 'color' },
      { key: 'colorTwo', label: 'Palette color 2', type: 'color' },
      { key: 'colorThree', label: 'Palette color 3', type: 'color' },
      {
        key: 'smokeSize',
        label: 'Smoke scale',
        type: 'range',
        min: 0.45,
        max: 1,
        step: 0.01,
      },
      {
        key: 'speed',
        label: 'Motion speed',
        type: 'range',
        min: 0,
        max: 1.2,
        step: 0.01,
      },
    ],
  },
  'Lustre Button': {
    defaults: {
      duration: 3200,
      label: 'Explore components',
      lustreColor: '#ffffff',
      motion: 'loop',
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'lustreColor', label: 'Lustre color', type: 'color' },
      {
        key: 'duration',
        label: 'Sweep duration',
        type: 'range',
        min: 1800,
        max: 6000,
        step: 100,
      },
      {
        key: 'motion',
        label: 'Motion',
        type: 'select',
        options: [
          { label: 'Loop', value: 'loop' },
          { label: 'Hover', value: 'hover' },
        ],
      },
    ],
  },
  'Social Profile Button': {
    defaults: { handle: '@github', label: 'View profile' },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'handle', label: 'Handle', type: 'text' },
    ],
  },
  'Pearl Aperture Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Preparing preview',
      size: 42,
      speed: 1400,
      showLabel: true,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 24, max: 80, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 700,
        max: 3200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Horizon Page Loader': {
    defaults: {
      accent: '#eeeae0',
      eyebrow: 'Nacre UI',
      label: 'Preparing your space',
      speed: 2200,
    },
    controls: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1400,
        max: 4200,
        step: 100,
      },
    ],
  },
  'Mercury Rail Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Syncing changes',
      showLabel: true,
      speed: 2100,
      width: 220,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      {
        key: 'width',
        label: 'Rail width',
        type: 'range',
        min: 140,
        max: 360,
        step: 5,
      },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1200,
        max: 3600,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Facet Bloom Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Composing interface',
      showLabel: true,
      size: 48,
      speed: 1680,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 32, max: 72, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1000,
        max: 3000,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Ribbon Fold Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Folding workspace',
      showLabel: true,
      size: 54,
      speed: 1760,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 40, max: 78, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1100,
        max: 3200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Pearl Matrix Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Indexing library',
      showLabel: true,
      size: 46,
      speed: 1840,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 34, max: 70, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1200,
        max: 3200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Fluid Cell Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Forming shape',
      showLabel: true,
      size: 50,
      speed: 2600,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 34, max: 80, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1100,
        max: 4200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Prism Stack Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Stacking planes',
      showLabel: true,
      size: 50,
      speed: 2400,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 34, max: 80, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1100,
        max: 4200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Card Shuffle Loader': {
    defaults: {
      accent: 'currentColor',
      label: 'Shuffling layers',
      showLabel: true,
      size: 48,
      speed: 1900,
    },
    controls: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'accent', label: 'Accent color', type: 'color' },
      { key: 'size', label: 'Size', type: 'range', min: 34, max: 80, step: 1 },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 1100,
        max: 4200,
        step: 100,
      },
      { key: 'showLabel', label: 'Show label', type: 'toggle' },
    ],
  },
  'Signal Reveal Text': {
    defaults: { speed: 1050, text: 'A softer way to arrive.' },
    controls: [
      { key: 'text', label: 'Text', type: 'text' },
      {
        key: 'speed',
        label: 'Cycle speed',
        type: 'range',
        min: 650,
        max: 1800,
        step: 50,
      },
    ],
  },
  'Tally Shift Number': {
    defaults: { value: 86420 },
    controls: [
      {
        key: 'value',
        label: 'Value',
        type: 'range',
        min: 0,
        max: 99999,
        step: 1,
      },
    ],
  },
  'Tidal Type Text': {
    defaults: { radius: 190, strength: 14, text: 'Feel the surface respond.' },
    controls: [
      { key: 'text', label: 'Text', type: 'text' },
      {
        key: 'strength',
        label: 'Strength',
        type: 'range',
        min: 0,
        max: 24,
        step: 1,
      },
      {
        key: 'radius',
        label: 'Field radius',
        type: 'range',
        min: 90,
        max: 360,
        step: 10,
      },
    ],
  },
  'Swell Text': {
    defaults: { amplitude: 7, duration: 3400, text: 'Make room for motion.' },
    controls: [
      { key: 'text', label: 'Text', type: 'text' },
      {
        key: 'amplitude',
        label: 'Amplitude',
        type: 'range',
        min: 0,
        max: 18,
        step: 1,
      },
      {
        key: 'duration',
        label: 'Cycle duration',
        type: 'range',
        min: 2200,
        max: 8000,
        step: 100,
      },
    ],
  },
  'Aurora Text': {
    defaults: { text: 'Make it luminous.' },
    controls: [{ key: 'text', label: 'Text', type: 'text' }],
  },
  'Liquid Text': {
    defaults: { text: 'Let it move.' },
    controls: [{ key: 'text', label: 'Text', type: 'text' }],
  },
  'Gravity Text': {
    defaults: { text: 'Pull focus here.' },
    controls: [{ key: 'text', label: 'Text', type: 'text' }],
  },
  'Slot Text': {
    defaults: { words: 'Momentum, Presence, Signal' },
    controls: [{ key: 'words', label: 'Words', type: 'text' }],
  },
  'Bloom Text': {
    defaults: { text: 'Break through.' },
    controls: [{ key: 'text', label: 'Text', type: 'text' }],
  },
  'Tilt Text': {
    defaults: { text: 'Take the angle.' },
    controls: [{ key: 'text', label: 'Text', type: 'text' }],
  },
  'Phase Weave Text': {
    defaults: {
      interval: 2800,
      words: 'Find the signal, Shape the path, Keep it clear',
    },
    controls: [
      { key: 'words', label: 'Words', type: 'text' },
      {
        key: 'interval',
        label: 'Interval',
        type: 'range',
        min: 1400,
        max: 10000,
        step: 100,
      },
    ],
  },
  'Editorial Mosaic': {
    defaults: { gap: 8, radius: 12, showLabels: true },
    controls: [
      {
        key: 'gap',
        label: 'Frame gap',
        type: 'range',
        min: 2,
        max: 20,
        step: 1,
      },
      {
        key: 'radius',
        label: 'Corner radius',
        type: 'range',
        min: 0,
        max: 28,
        step: 1,
      },
      { key: 'showLabels', label: 'Show labels', type: 'toggle' },
    ],
  },
  'Halo Dock': {
    defaults: {
      lift: 12,
      magnification: 76,
      showLabels: true,
      size: 46,
    },
    controls: [
      {
        key: 'size',
        label: 'Item size',
        type: 'range',
        min: 36,
        max: 58,
        step: 1,
      },
      {
        key: 'magnification',
        label: 'Magnification',
        type: 'range',
        min: 58,
        max: 94,
        step: 1,
      },
      {
        key: 'lift',
        label: 'Item lift',
        type: 'range',
        min: 0,
        max: 20,
        step: 1,
      },
      { key: 'showLabels', label: 'Show labels', type: 'toggle' },
    ],
  },
  'Shutter Trail': {
    defaults: {
      cardSize: 152,
      persistence: 1.6,
      showIndices: true,
      spacing: 72,
      tilt: 7,
      trailLength: 6,
    },
    controls: [
      {
        key: 'cardSize',
        label: 'Frame size',
        type: 'range',
        min: 104,
        max: 220,
        step: 2,
      },
      {
        key: 'trailLength',
        label: 'Trail length',
        type: 'range',
        min: 3,
        max: 9,
        step: 1,
      },
      {
        key: 'spacing',
        label: 'Frame spacing',
        type: 'range',
        min: 36,
        max: 140,
        step: 2,
      },
      {
        key: 'persistence',
        label: 'Persistence',
        type: 'range',
        min: 0.7,
        max: 4,
        step: 0.05,
      },
      {
        key: 'tilt',
        label: 'Directional tilt',
        type: 'range',
        min: 0,
        max: 14,
        step: 1,
      },
      { key: 'showIndices', label: 'Frame indices', type: 'toggle' },
    ],
  },
  'Folio Arc Carousel': {
    defaults: {
      arc: 18,
      cardWidth: 230,
      depth: 105,
      loop: true,
      showControls: true,
      showLabels: true,
      sideAngle: 30,
      spacing: 158,
    },
    controls: [
      {
        key: 'cardWidth',
        label: 'Open folio width',
        type: 'range',
        min: 180,
        max: 290,
        step: 2,
      },
      {
        key: 'spacing',
        label: 'Spine spacing',
        type: 'range',
        min: 128,
        max: 220,
        step: 2,
      },
      {
        key: 'sideAngle',
        label: 'Side angle',
        type: 'range',
        min: 14,
        max: 50,
        step: 1,
      },
      {
        key: 'depth',
        label: 'Perspective depth',
        type: 'range',
        min: 50,
        max: 220,
        step: 5,
      },
      {
        key: 'arc',
        label: 'Arc drop',
        type: 'range',
        min: 8,
        max: 40,
        step: 1,
      },
      { key: 'showLabels', label: 'Active label', type: 'toggle' },
      { key: 'showControls', label: 'Navigation controls', type: 'toggle' },
      { key: 'loop', label: 'Loop navigation', type: 'toggle' },
    ],
  },
  'Helix Reel': {
    defaults: {
      autoPlay: true,
      cardWidth: 188,
      depth: 185,
      interval: 3200,
      loop: true,
      radius: 246,
      rise: 32,
      showControls: true,
      spread: 34,
    },
    controls: [
      {
        key: 'cardWidth',
        label: 'Frame width',
        type: 'range',
        min: 150,
        max: 240,
        step: 2,
      },
      {
        key: 'radius',
        label: 'Helix radius',
        type: 'range',
        min: 180,
        max: 330,
        step: 5,
      },
      {
        key: 'rise',
        label: 'Vertical rise',
        type: 'range',
        min: 18,
        max: 58,
        step: 1,
      },
      {
        key: 'spread',
        label: 'Angular spread',
        type: 'range',
        min: 24,
        max: 48,
        step: 1,
      },
      {
        key: 'depth',
        label: 'Depth falloff',
        type: 'range',
        min: 90,
        max: 280,
        step: 5,
      },
      {
        key: 'interval',
        label: 'Autoplay interval',
        type: 'range',
        min: 1800,
        max: 8000,
        step: 100,
      },
      { key: 'autoPlay', label: 'Autoplay', type: 'toggle' },
      { key: 'showControls', label: 'Navigation controls', type: 'toggle' },
      { key: 'loop', label: 'Loop navigation', type: 'toggle' },
    ],
  },
  'Toolchain Marquee': {
    defaults: {
      duration: 22,
      rows: 3,
      showControl: false,
    },
    controls: [
      {
        key: 'duration',
        label: 'Loop duration',
        type: 'range',
        min: 8,
        max: 44,
        step: 1,
      },
      {
        key: 'rows',
        label: 'Rows',
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
      { key: 'showControl', label: 'Motion control', type: 'toggle' },
    ],
  },
  'Orbit Ledger': {
    defaults: {
      accent: '#d8a7ff',
      autoPlay: true,
      autoPlayInterval: 3200,
      cardWidth: 246,
      curve: 22,
      depth: 92,
      scrollLength: 1400,
      showProgress: true,
      tilt: 22,
    },
    controls: [
      { key: 'accent', label: 'Orbit accent', type: 'color' },
      { key: 'autoPlay', label: 'Autoplay', type: 'toggle' },
      {
        key: 'autoPlayInterval',
        label: 'Autoplay interval',
        type: 'range',
        min: 1600,
        max: 8000,
        step: 200,
      },
      {
        key: 'cardWidth',
        label: 'Card width',
        type: 'range',
        min: 170,
        max: 310,
        step: 2,
      },
      {
        key: 'curve',
        label: 'Orbit curve',
        type: 'range',
        min: 8,
        max: 54,
        step: 1,
      },
      {
        key: 'depth',
        label: 'Depth falloff',
        type: 'range',
        min: 40,
        max: 180,
        step: 2,
      },
      {
        key: 'tilt',
        label: 'Edge turn',
        type: 'range',
        min: 8,
        max: 36,
        step: 1,
      },
      {
        key: 'scrollLength',
        label: 'Scroll distance',
        type: 'range',
        min: 700,
        max: 2800,
        step: 100,
      },
      { key: 'showProgress', label: 'Progress rail', type: 'toggle' },
    ],
  },
  'Nacre Field Shader': {
    defaults: {
      baseColor: '#0b0b0e',
      colorA: '#c7b5ff',
      colorB: '#6ed8cf',
      distortion: 0.82,
      grain: 0.025,
      highlightColor: '#fff2d5',
      mode: 'veil',
      pointerStrength: 0.72,
      speed: 0.5,
    },
    controls: [
      {
        key: 'mode',
        label: 'Field geometry',
        type: 'select',
        options: [
          { label: 'Veil', value: 'veil' },
          { label: 'Lens', value: 'lens' },
          { label: 'Tide', value: 'tide' },
        ],
      },
      { key: 'baseColor', label: 'Base color', type: 'color' },
      { key: 'colorA', label: 'Primary color', type: 'color' },
      { key: 'colorB', label: 'Secondary color', type: 'color' },
      { key: 'highlightColor', label: 'Highlight color', type: 'color' },
      {
        key: 'distortion',
        label: 'Distortion',
        type: 'range',
        min: 0,
        max: 1.6,
        step: 0.01,
      },
      {
        key: 'pointerStrength',
        label: 'Pointer response',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
      {
        key: 'grain',
        label: 'Grain',
        type: 'range',
        min: 0,
        max: 0.12,
        step: 0.001,
      },
      {
        key: 'speed',
        label: 'Speed',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
    ],
  },
  'Iridescent Weave Shader': {
    defaults: {
      accentColor: '#d468ff',
      baseColor: '#08090d',
      grain: 0.035,
      highlightColor: '#eaffff',
      mode: 'weave',
      pointerLight: 0.85,
      relief: 0.88,
      speed: 0.58,
      surfaceColor: '#4d5ed7',
      textureScale: 1,
    },
    controls: [
      {
        key: 'mode',
        label: 'Pattern',
        type: 'select',
        options: [
          { label: 'Weave', value: 'weave' },
          { label: 'Moiré', value: 'moire' },
          { label: 'Ripple', value: 'ripple' },
        ],
      },
      { key: 'baseColor', label: 'Base color', type: 'color' },
      { key: 'surfaceColor', label: 'Surface color', type: 'color' },
      { key: 'accentColor', label: 'Iridescent color', type: 'color' },
      { key: 'highlightColor', label: 'Light color', type: 'color' },
      {
        key: 'textureScale',
        label: 'Texture scale',
        type: 'range',
        min: 0.5,
        max: 2.5,
        step: 0.01,
      },
      {
        key: 'relief',
        label: 'Thread depth',
        type: 'range',
        min: 0,
        max: 2.2,
        step: 0.01,
      },
      {
        key: 'grain',
        label: 'Fine grain',
        type: 'range',
        min: 0,
        max: 0.14,
        step: 0.001,
      },
      {
        key: 'pointerLight',
        label: 'Pointer light',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
      {
        key: 'speed',
        label: 'Motion speed',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    ],
  },
  'Mesh Background': {
    defaults: { flow: 0.96, lustre: 0.62, speed: 0.62 },
    controls: [
      {
        key: 'flow',
        label: 'Flow',
        type: 'range',
        min: 0.15,
        max: 1.5,
        step: 0.01,
      },
      {
        key: 'lustre',
        label: 'Lustre',
        type: 'range',
        min: 0,
        max: 1.2,
        step: 0.01,
      },
      {
        key: 'speed',
        label: 'Speed',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
    ],
  },
  'Flux Background': {
    defaults: { energy: 0.92, grain: 0.022, speed: 0.62 },
    controls: [
      {
        key: 'energy',
        label: 'Energy',
        type: 'range',
        min: 0.2,
        max: 1.4,
        step: 0.01,
      },
      {
        key: 'grain',
        label: 'Grain',
        type: 'range',
        min: 0,
        max: 0.08,
        step: 0.001,
      },
      {
        key: 'speed',
        label: 'Speed',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
    ],
  },
  'Magnetic Warp Background': {
    defaults: { intensity: 0.92, speed: 0.64, warp: 0.9 },
    controls: [
      {
        key: 'warp',
        label: 'Warp',
        type: 'range',
        min: 0.15,
        max: 1.4,
        step: 0.01,
      },
      {
        key: 'intensity',
        label: 'Intensity',
        type: 'range',
        min: 0.2,
        max: 1.4,
        step: 0.01,
      },
      {
        key: 'speed',
        label: 'Speed',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
    ],
  },
  'Grain Current Background': {
    defaults: { flow: 0.88, grain: 0.052, speed: 0.52 },
    controls: [
      {
        key: 'flow',
        label: 'Flow',
        type: 'range',
        min: 0.15,
        max: 1.4,
        step: 0.01,
      },
      {
        key: 'grain',
        label: 'Grain',
        type: 'range',
        min: 0,
        max: 0.12,
        step: 0.001,
      },
      {
        key: 'speed',
        label: 'Speed',
        type: 'range',
        min: 0,
        max: 1.5,
        step: 0.01,
      },
    ],
  },
};

function playgroundFor(name: ComponentName): PlaygroundConfig {
  return componentPlaygrounds[name] ?? defaultPlayground;
}

const gettingStartedPages: GettingStartedPage[] = [
  'installation',
  'react-next',
  'theming',
  'cli',
];

const componentDocs: Record<
  ComponentName | DeferredComponentName,
  {
    usage: string;
    props: Array<{
      name: string;
      type: string;
      defaultValue: string;
      description: string;
    }>;
    accessibility: string[];
  }
> = {
  Button: {
    usage: `import { Button } from '@nacre-ui/react';\n\n<Button variant="primary" size="medium">\n  Continue\n</Button>`,
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'quiet' | 'destructive'",
        defaultValue: "'primary'",
        description: 'Sets the action hierarchy.',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        defaultValue: "'medium'",
        description: 'Sets control height and horizontal padding.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents activation and exposes disabled state.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Merges behavior into a single child element.',
      },
    ],
    accessibility: [
      'Uses native button behavior by default.',
      'Preserves visible focus in light, dark, and forced-color modes.',
      'Supports Space and Enter activation without custom key handlers.',
    ],
  },
  'Magnetic Button': {
    usage: `import { MagneticButton } from '@nacre-ui/react';

<MagneticButton strength={4}>
  Explore system
</MagneticButton>`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        defaultValue: "'Explore system'",
        description: 'Sets the button label displayed beside the arrow.',
      },
      {
        name: 'strength',
        type: 'number',
        defaultValue: '4',
        description:
          'Controls pointer-follow distance in pixels, clamped from zero through ten.',
      },
      {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        defaultValue: "'button'",
        description: 'Preserves native button and form behavior.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables activation and magnetic feedback.',
      },
    ],
    accessibility: [
      'Uses a native button with Space and Enter activation.',
      'Resets pointer displacement when focus or the pointer leaves.',
      'Removes spatial movement when reduced motion is requested.',
      'Provides visible keyboard focus and a forced-color fallback.',
    ],
  },
  'Liquid Metal Button': {
    usage: `import { LiquidMetalButton } from '@nacre-ui/react';

<LiquidMetalButton colorBack="#747570" speed={0.48}>
  Enter studio
</LiquidMetalButton>`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        defaultValue: "'Enter studio'",
        description: 'Sets the action label displayed over the metal surface.',
      },
      {
        name: 'colorBack',
        type: 'string',
        defaultValue: "'#747570'",
        description: 'Sets the foundational metal color.',
      },
      {
        name: 'colorTint',
        type: 'string',
        defaultValue: "'#f4f3ee'",
        description: 'Sets the reflective metal tint.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.48',
        description: 'Controls shader movement, clamped from zero through 1.4.',
      },
      {
        name: 'repetition',
        type: 'number',
        defaultValue: '3.2',
        description:
          'Controls reflective band density, clamped from one through eight.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables activation and surface feedback.',
      },
    ],
    accessibility: [
      'Uses native button semantics for keyboard, pointer, and form interaction.',
      'Keeps the WebGL material decorative and separate from the accessible label.',
      'Freezes shader time and removes spatial feedback when reduced motion is requested.',
      'Removes the shader while preserving the label and boundary in forced colors.',
    ],
  },
  'Gem Smoke Button': {
    usage: `import { GemSmokeButton } from '@nacre-ui/react';

<GemSmokeButton colors={['#d8a7ff', '#ffb49a', '#87d9bc']}>
  Reveal collection
</GemSmokeButton>`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        defaultValue: "'Reveal collection'",
        description: 'Sets the action label displayed beside the gem mark.',
      },
      {
        name: 'colors',
        type: 'string[]',
        defaultValue: "['#d8a7ff', '#ffb49a', '#87d9bc']",
        description: 'Sets up to six colors used by the smoke field.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.4',
        description: 'Controls shader movement, clamped from zero through 1.2.',
      },
      {
        name: 'smokeSize',
        type: 'number',
        defaultValue: '0.82',
        description: 'Sets smoke coverage, clamped from 0.45 through one.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables activation and material feedback.',
      },
    ],
    accessibility: [
      'Uses native button behavior for keyboard, pointer, and form interaction.',
      'Keeps the shader and gem illustration hidden from assistive technology.',
      'Freezes smoke movement and removes spatial feedback when reduced motion is requested.',
      'Replaces the shader with system colors in forced-color environments.',
    ],
  },
  'Lustre Button': {
    usage: `import { LustreButton } from '@nacre-ui/react';

<LustreButton motion="loop" duration={3200}>
  Explore components
</LustreButton>`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        defaultValue: "'Explore components'",
        description: 'Sets the primary action label.',
      },
      {
        name: 'motion',
        type: "'loop' | 'hover'",
        defaultValue: "'loop'",
        description: 'Runs the lustre periodically or only during interaction.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultValue: '3200',
        description:
          'Sets the loop cadence in milliseconds, clamped from 1800 through 6000.',
      },
      {
        name: 'lustreColor',
        type: 'string',
        defaultValue: "'#ffffff'",
        description: 'Sets the color of the moving surface light.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables activation and decorative motion.',
      },
    ],
    accessibility: [
      'Uses native button semantics for pointer, keyboard, and form interaction.',
      'Keeps the lustre and arrow decorative so they do not add screen reader noise.',
      'Preserves a readable label and stable button boundary without requiring animation.',
      'Stops and removes the moving light when reduced motion is requested.',
      'Preserves a visible boundary, label, and focus ring in forced-color modes.',
    ],
  },
  'Social Profile Button': {
    usage: `import { SocialProfileButton } from '@nacre-ui/react';

<SocialProfileButton
  href="https://github.com"
  label="View profile"
  handle="@github"
/>`,
    props: [
      {
        name: 'href',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the real social profile destination.',
      },
      {
        name: 'label',
        type: 'string',
        defaultValue: "'View profile'",
        description: 'Sets the primary link label.',
      },
      {
        name: 'handle',
        type: 'string',
        defaultValue: "'@nacre.ui'",
        description: 'Sets the account identity revealed during interaction.',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        defaultValue: 'Profile mark',
        description: 'Replaces the decorative platform or account mark.',
      },
      {
        name: 'target',
        type: 'string',
        defaultValue: "'_blank'",
        description: 'Controls where the profile destination opens.',
      },
    ],
    accessibility: [
      'Uses a native anchor whose accessible name includes the account handle.',
      'Keeps the platform mark and external-link icon decorative.',
      'Uses a visible external-link cue that matches the real navigation behavior.',
      'Removes spatial transitions when reduced motion is requested.',
      'Preserves its label and focus boundary in forced-color modes.',
    ],
  },
  'Pearl Aperture Loader': {
    usage: `import { PearlApertureLoader } from '@nacre-ui/react';

<PearlApertureLoader
  label="Preparing preview"
  size={42}
  speed={1400}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Loading'",
        description: 'Names the current indeterminate task.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the aperture.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '42',
        description: 'Sets the aperture size between 24 and 80 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1400',
        description:
          'Sets the base loop duration between 700 and 3200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description:
          'Sets the pearl and arc color, inheriting the surrounding theme by default.',
      },
    ],
    accessibility: [
      'Uses status semantics and a polite live region for non-blocking progress updates.',
      'Retains an accessible label when the visible label is hidden.',
      'Keeps every animated arc decorative so it does not add screen reader noise.',
      'Stops all rotation and breathing when reduced motion is requested.',
      'Preserves a clear static loading mark and label in forced-color modes.',
    ],
  },
  'Horizon Page Loader': {
    usage: `import { HorizonPageLoader } from '@nacre-ui/react';

export default function Loading() {
  return (
    <HorizonPageLoader
      eyebrow="Nacre UI"
      label="Preparing your space"
    />
  );
}`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Preparing your space'",
        description: 'Describes the page-level work in progress.',
      },
      {
        name: 'eyebrow',
        type: 'string',
        defaultValue: "'Nacre UI'",
        description: 'Sets the compact product or section identifier.',
      },
      {
        name: 'mode',
        type: "'fixed' | 'contained'",
        defaultValue: "'fixed'",
        description:
          'Covers the viewport or stays inside a positioned preview surface.',
      },
      {
        name: 'autoPlay',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'Advances contained showcases automatically without pausing on hover. Page-scroll mode remains manual.',
      },
      {
        name: 'autoPlayInterval',
        type: 'number',
        defaultValue: '3200',
        description:
          'Sets the time between automatic project changes from 1600 through 12000 milliseconds.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '2200',
        description:
          'Sets the horizon loop between 1400 and 4200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'#eeeae0'",
        description: 'Sets the pearl, horizon, and ambient light color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region for page-level loading feedback.',
      'Keeps the loading label as real text rather than communicating progress through motion alone.',
      'Hides the atmospheric horizon layers from assistive technology.',
      'Stops the traveling light, breathing pearl, and ambient field when reduced motion is requested.',
      'Provides a high-contrast static horizon, pearl, and text in forced-color modes.',
    ],
  },
  'Mercury Rail Loader': {
    usage: `import { MercuryRailLoader } from '@nacre-ui/react';

<MercuryRailLoader
  label="Syncing changes"
  width={220}
  speed={2100}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Loading'",
        description: 'Names the inline or section-level loading task.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beneath the rail.',
      },
      {
        name: 'width',
        type: 'number',
        defaultValue: '220',
        description: 'Sets the rail width between 140 and 360 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '2100',
        description:
          'Sets the round-trip duration between 1200 and 3600 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the mercury and reflected trail color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Retains an accessible task label when the visible label is hidden.',
      'Keeps the rail, trail, and mercury bead decorative.',
      'Centers a static bead on the rail when reduced motion is requested.',
      'Provides a simplified high-contrast rail and bead in forced-color modes.',
    ],
  },
  'Facet Bloom Loader': {
    usage: `import { FacetBloomLoader } from '@nacre-ui/react';

<FacetBloomLoader
  label="Composing interface"
  size={48}
  speed={1680}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Loading'",
        description: 'Names the current compact loading task.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the bloom.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '48',
        description: 'Sets the bloom size between 32 and 72 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1680',
        description:
          'Sets the facet sequence between 1000 and 3000 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the center pearl and facet color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Retains an accessible task label when the visible label is hidden.',
      'Treats every facet and the central pearl as one decorative loading mark.',
      'Shows a balanced static bloom when reduced motion is requested.',
      'Preserves the bloom geometry and label in forced-color modes.',
    ],
  },
  'Ribbon Fold Loader': {
    usage: `import { RibbonFoldLoader } from '@nacre-ui/react';

<RibbonFoldLoader
  label="Folding workspace"
  size={54}
  speed={1760}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Loading'",
        description: 'Names the current loading operation.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the ribbon.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '54',
        description: 'Sets the ribbon width between 40 and 78 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1760',
        description:
          'Sets the fold sequence between 1100 and 3200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the satin ribbon color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Retains an accessible label when the visible label is hidden.',
      'Treats the entire folded ribbon as decorative.',
      'Shows a stable folded mark when reduced motion is requested.',
      'Preserves the connected ribbon planes in forced-color modes.',
    ],
  },
  'Pearl Matrix Loader': {
    usage: `import { PearlMatrixLoader } from '@nacre-ui/react';

<PearlMatrixLoader
  label="Indexing library"
  size={46}
  speed={1840}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Loading'",
        description: 'Names the task represented by the matrix.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the matrix.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '46',
        description: 'Sets the matrix size between 34 and 70 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1840',
        description:
          'Sets the diagonal pulse between 1200 and 3200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the nine pearl colors.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Retains an accessible label when the visible label is hidden.',
      'Keeps all nine pearls decorative and exposes one loading status.',
      'Displays an evenly weighted static matrix when reduced motion is requested.',
      'Preserves all nine matrix cells in forced-color modes.',
    ],
  },
  'Fluid Cell Loader': {
    usage: `import { FluidCellLoader } from '@nacre-ui/react';

<FluidCellLoader label="Forming shape" size={50} speed={2600} />`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Forming shape'",
        description: 'Names the operation represented by the fluid cell.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the animation.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '50',
        description: 'Sets the loader size between 34 and 80 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '2600',
        description: 'Sets the fluid cycle between 1100 and 4200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the liquid cell color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Keeps the decorative fluid shapes out of the accessibility tree.',
      'Shows a stable fluid mark when reduced motion is requested.',
    ],
  },
  'Prism Stack Loader': {
    usage: `import { PrismStackLoader } from '@nacre-ui/react';

<PrismStackLoader label="Stacking planes" size={50} speed={2400} />`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Stacking planes'",
        description: 'Names the operation represented by the shifting prism.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the animation.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '50',
        description: 'Sets the prism size between 34 and 80 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '2400',
        description:
          'Sets the plane-shift cycle between 1100 and 4200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the prism plane color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Treats the planes and luminous core as decorative.',
      'Shows a stable prism mark when reduced motion is requested.',
    ],
  },
  'Card Shuffle Loader': {
    usage: `import { CardShuffleLoader } from '@nacre-ui/react';

<CardShuffleLoader label="Shuffling layers" size={48} speed={1900} />`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Shuffling layers'",
        description: 'Names the operation represented by the card stack.',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the loading label beside the animation.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '48',
        description: 'Sets the card stack size between 34 and 80 pixels.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1900',
        description:
          'Sets the card shuffle between 1100 and 4200 milliseconds.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the card material color.',
      },
    ],
    accessibility: [
      'Uses native output semantics and a polite live region.',
      'Keeps the animated card stack decorative.',
      'Shows a stable card stack when reduced motion is requested.',
    ],
  },
  'Signal Reveal Text': {
    usage: `import { SignalRevealText } from '@nacre-ui/react';

<SignalRevealText
  as="h2"
  text="A softer way to arrive."
  speed={1050}
/>`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text split into staged word reveals.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '1050',
        description:
          'Sets the reveal duration between 650 and 1800 milliseconds.',
      },
      {
        name: 'delay',
        type: 'number',
        defaultValue: '0',
        description: 'Waits before starting the first word reveal.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description: 'Sets the text color used during the staged reveal.',
      },
    ],
    accessibility: [
      'Renders the requested semantic text element with the complete text as its accessible name.',
      'Treats the individually animated word spans as decorative.',
      'Preserves normal reading order without requiring animation to understand the copy.',
      'Shows every word immediately when reduced motion is requested.',
      'Keeps the text visible in forced-color modes.',
    ],
  },
  'Tally Shift Number': {
    usage: `import { TallyShiftNumber } from '@nacre-ui/react';

<TallyShiftNumber
  value={86420}
  suffix=" users"
  duration={1800}
/>`,
    props: [
      {
        name: 'value',
        type: 'number',
        defaultValue: 'Required',
        description: 'Sets the value presented by the rolling digit slots.',
      },
      {
        name: 'from',
        type: 'number',
        defaultValue: '0',
        description: 'Sets the value used at the start of the count.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultValue: '1800',
        description:
          'Sets the count duration between 600 and 5000 milliseconds.',
      },
      {
        name: 'repeat',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Repeats the count after the configured delay.',
      },
      {
        name: 'prefix / suffix',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Adds compact units before or after the number.',
      },
    ],
    accessibility: [
      'Uses output semantics with the final formatted value as its accessible name.',
      'Treats rolling digit slots as decorative.',
      'Shows the final value immediately when reduced motion is requested.',
      'Uses system text in forced-color modes.',
    ],
  },
  'Tidal Type Text': {
    usage: `import { TidalTypeText } from '@nacre-ui/react';

<TidalTypeText
  as="h2"
  text="Feel the surface respond."
  strength={14}
/>`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description:
          'Sets the display text split into a responsive glyph field.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
      {
        name: 'strength',
        type: 'number',
        defaultValue: '14',
        description: 'Sets the field displacement between 0 and 24 pixels.',
      },
      {
        name: 'radius',
        type: 'number',
        defaultValue: '190',
        description: 'Sets the pointer field radius between 90 and 360 pixels.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'currentColor'",
        description:
          'Sets the color used by the field’s soft interaction lens.',
      },
    ],
    accessibility: [
      'Renders the requested semantic text element with the complete text as its accessible name.',
      'Treats individually moving glyphs and the pointer lens as decorative.',
      'Keeps the text unchanged while users explore the field.',
      'Disables pointer movement and the lens when reduced motion is requested.',
      'Uses ordinary system text and hides the lens in forced-color modes.',
    ],
  },
  'Swell Text': {
    usage: `import { SwellText } from '@nacre-ui/react';

<SwellText
  as="h2"
  text="Make room for motion."
  amplitude={7}
  duration={3400}
/>`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text carried by the repeating pressure wave.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
      {
        name: 'amplitude',
        type: 'number',
        defaultValue: '7',
        description: 'Sets the maximum vertical lift between 0 and 18 pixels.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultValue: '3400',
        description:
          'Sets the resting time between each wave, in milliseconds.',
      },
    ],
    accessibility: [
      'Renders the requested semantic text element with the complete text as its accessible name.',
      'Treats the moving glyphs as decorative while retaining the complete text as its accessible name.',
      'Keeps one crisp text layer visible throughout the motion.',
      'Stops the wave when reduced motion is requested.',
      'Uses ordinary system text in forced-color modes.',
    ],
  },
  'Aurora Text': {
    usage: `import { AuroraText } from '@nacre-ui/react';

<AuroraText as="h2" text="Make it luminous." />`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text carrying the animated material gradient.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats animated glyphs as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Liquid Text': {
    usage: `import { LiquidText } from '@nacre-ui/react';

<LiquidText as="h2" text="Let it move." />`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text rendered through the displacement field.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats animated glyphs as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Gravity Text': {
    usage: `import { GravityText } from '@nacre-ui/react';

<GravityText as="h2" text="Pull focus here." />`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the glyphs that respond to pointer gravity.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats the interactive glyph movement as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Slot Text': {
    usage: `import { SlotText } from '@nacre-ui/react';

<SlotText as="h2" words={['Momentum', 'Presence', 'Signal']} />`,
    props: [
      {
        name: 'words',
        type: 'string[]',
        defaultValue: "['Momentum', 'Presence', 'Signal']",
        description: 'Sets the phrases rotated through the dimensional slot.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats animated words as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Bloom Text': {
    usage: `import { BloomText } from '@nacre-ui/react';

<BloomText as="h2" text="Break through." />`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text that opens through the character bloom.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats animated glyphs as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Tilt Text': {
    usage: `import { TiltText } from '@nacre-ui/react';

<TiltText as="h2" text="Take the angle." />`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Required',
        description: 'Sets the text presented as an interactive depth surface.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Uses the complete text as its accessible name.',
      'Treats animated glyphs as decorative.',
      'Stops animation when reduced motion is requested.',
    ],
  },
  'Phase Weave Text': {
    usage: `import { PhaseWeaveText } from '@nacre-ui/react';

<PhaseWeaveText
  as="h2"
  words={['Find the signal', 'Shape the path', 'Keep it clear']}
  interval={2800}
/>`,
    props: [
      {
        name: 'words',
        type: 'string[]',
        defaultValue: "['Clarity', 'Rhythm', 'Focus']",
        description:
          'Sets the non-empty phrases that rotate through the text field.',
      },
      {
        name: 'interval',
        type: 'number',
        defaultValue: '2800',
        description:
          'Sets how long each phrase rests before the next handoff, in milliseconds.',
      },
      {
        name: 'as',
        type: 'React.ElementType',
        defaultValue: "'p'",
        description: 'Sets the semantic HTML element to render.',
      },
    ],
    accessibility: [
      'Keeps one current phrase in a polite live region for assistive technology.',
      'Treats the outgoing phrase and animated character layers as decorative.',
      'Maintains the widest phrase as invisible layout measurement to prevent width jumps.',
      'Removes the transition motion when reduced motion is requested.',
      'Uses ordinary system text in forced-color modes.',
    ],
  },
  'Editorial Mosaic': {
    usage: `import { EditorialMosaic } from '@nacre-ui/react';

<EditorialMosaic
  items={stories}
  onActiveChange={(index) => setActiveStory(index)}
/>`,
    props: [
      {
        name: 'items',
        type: 'EditorialMosaicItem[]',
        defaultValue: 'Five example stories',
        description:
          'Supplies each image, accessible alternative, title, and optional eyebrow.',
      },
      {
        name: 'initialIndex',
        type: 'number',
        defaultValue: '-1',
        description:
          'Starts in overview at -1 or opens the requested item in the focused layout.',
      },
      {
        name: 'gap',
        type: 'number',
        defaultValue: '8',
        description:
          'Sets the space between image frames from 2 through 20 pixels.',
      },
      {
        name: 'radius',
        type: 'number',
        defaultValue: '12',
        description: 'Sets frame corner radius from zero through 28 pixels.',
      },
      {
        name: 'showLabels',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the title and eyebrow within overview frames.',
      },
      {
        name: 'onActiveChange',
        type: '(index: number | null) => void',
        defaultValue: 'undefined',
        description:
          'Reports focused-item changes and returns null when overview is restored.',
      },
    ],
    accessibility: [
      'Uses one native button per image and exposes the featured frame with aria-pressed.',
      'Keeps informative alternative text on every image while avoiding duplicate decorative labels.',
      'Lets the featured image return to overview when activated again.',
      'Uses a polite live region to announce the focused story.',
      'Removes layout and image transitions when reduced motion is requested.',
    ],
  },
  'Halo Dock': {
    usage: `import { HaloDock } from '@nacre-ui/react';

<HaloDock
  items={workspaceActions}
  defaultActiveId="library"
  onActiveChange={(id) => openWorkspaceView(id)}
/>`,
    props: [
      {
        name: 'items',
        type: 'HaloDockItem[]',
        defaultValue: 'Five example actions',
        description:
          'Supplies each action identifier, accessible label, icon, and optional badge or emphasis.',
      },
      {
        name: 'activeId',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Controls the currently active dock action.',
      },
      {
        name: 'defaultActiveId',
        type: 'string',
        defaultValue: "'library'",
        description: 'Sets the initially active action when uncontrolled.',
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: '46',
        description: 'Sets the resting item size from 36 through 58 pixels.',
      },
      {
        name: 'magnification',
        type: 'number',
        defaultValue: '76',
        description: 'Sets the peak item size near the pointer.',
      },
      {
        name: 'lift',
        type: 'number',
        defaultValue: '12',
        description: 'Sets how far the directly engaged item rises in pixels.',
      },
      {
        name: 'showLabels',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'Shows concise labels on pointer hover and keyboard focus.',
      },
      {
        name: 'onActiveChange',
        type: '(id: string) => void',
        defaultValue: 'undefined',
        description: 'Reports the activated action identifier.',
      },
    ],
    accessibility: [
      'Uses native buttons inside a labeled toolbar.',
      'Exposes the active action through aria-pressed.',
      'Shows the same label on keyboard focus as pointer hover.',
      'Expands only the directly engaged action so selection remains unambiguous.',
      'Keeps notification badges decorative so labels remain concise.',
      'Disables proximity motion when reduced motion is requested.',
      'Provides visible keyboard and forced-color focus treatments.',
    ],
  },
  'Shutter Trail': {
    usage: `import { ShutterTrail } from '@nacre-ui/react';

<ShutterTrail
  images={projectStills}
  trailLength={6}
  onFrozenChange={(frozen) => setInspecting(frozen)}
/>`,
    props: [
      {
        name: 'images',
        type: 'string[]',
        defaultValue: 'Five example scenes',
        description: 'Supplies up to twelve images for the trail sequence.',
      },
      {
        name: 'cardSize',
        type: 'number',
        defaultValue: '152',
        description:
          'Sets the base width of each editorial frame from 104 through 220 pixels.',
      },
      {
        name: 'trailLength',
        type: 'number',
        defaultValue: '6',
        description:
          'Sets the maximum number of visible frames from three through nine.',
      },
      {
        name: 'spacing',
        type: 'number',
        defaultValue: '72',
        description:
          'Sets the pointer travel required before another shutter frame opens.',
      },
      {
        name: 'persistence',
        type: 'number',
        defaultValue: '1.6',
        description: 'Sets how many seconds an unheld frame remains visible.',
      },
      {
        name: 'tilt',
        type: 'number',
        defaultValue: '7',
        description:
          'Controls the movement-aware rotational range of each frame.',
      },
      {
        name: 'showIndices',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows a compact sequence index on every image frame.',
      },
      {
        name: 'onFrozenChange',
        type: '(frozen: boolean) => void',
        defaultValue: 'undefined',
        description:
          'Reports when the user holds or releases the current trail.',
      },
    ],
    accessibility: [
      'Exposes the full interaction as one keyboard-focusable button.',
      'Uses aria-pressed to expose whether the current trail is held.',
      'Supports Enter and Space through native button activation.',
      'Keeps photographic frames decorative while the root announces the interaction.',
      'Disables cursor-generated frames when reduced motion is requested.',
      'Provides a high-contrast static fallback in forced-color modes.',
    ],
  },
  'Folio Arc Carousel': {
    usage: `import { FolioArcCarousel } from '@nacre-ui/react';

<FolioArcCarousel
  items={projects}
  defaultActiveIndex={2}
  onActiveIndexChange={(index) => setActiveProject(index)}
/>`,
    props: [
      {
        name: 'items',
        type: 'FolioArcItem[]',
        defaultValue: 'Five example folios',
        description:
          'Supplies up to nine images with titles, alternative text, and optional eyebrow labels.',
      },
      {
        name: 'activeIndex',
        type: 'number',
        defaultValue: 'undefined',
        description: 'Controls the selected folio externally.',
      },
      {
        name: 'defaultActiveIndex',
        type: 'number',
        defaultValue: '2',
        description: 'Sets the initially selected folio in uncontrolled usage.',
      },
      {
        name: 'cardWidth',
        type: 'number',
        defaultValue: '230',
        description: 'Sets the width of the fully opened folio.',
      },
      {
        name: 'spacing',
        type: 'number',
        defaultValue: '158',
        description:
          'Controls the horizontal separation between adjacent spines.',
      },
      {
        name: 'sideAngle',
        type: 'number',
        defaultValue: '30',
        description: 'Controls how far neighboring folios turn away in 3D.',
      },
      {
        name: 'depth',
        type: 'number',
        defaultValue: '105',
        description: 'Sets the Z-axis distance between folio layers.',
      },
      {
        name: 'arc',
        type: 'number',
        defaultValue: '18',
        description:
          'Sets the vertical drop that forms the shallow gallery arc.',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Wraps previous, next, and drag navigation at the ends.',
      },
      {
        name: 'showControls',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the compact previous, position, and next controls.',
      },
      {
        name: 'showLabels',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows title metadata only on the selected folio.',
      },
      {
        name: 'onActiveIndexChange',
        type: '(index: number) => void',
        defaultValue: 'undefined',
        description:
          'Reports every selection change from drag, click, or keyboard input.',
      },
    ],
    accessibility: [
      'Exposes the gallery and its slide collection as named groups.',
      'Uses native slide buttons and marks the active folio with aria-pressed.',
      'Supports Left, Right, Home, and End keyboard navigation.',
      'Provides named previous and next controls with a polite position announcement.',
      'Removes spring and drag motion when reduced motion is requested.',
      'Preserves focus and structural contrast in forced-color modes.',
    ],
  },
  'Helix Reel': {
    usage: `import { HelixReel } from '@nacre-ui/react';

<HelixReel
  items={projects}
  autoPlay
  onActiveIndexChange={(index) => setActiveProject(index)}
/>`,
    props: [
      {
        name: 'items',
        type: 'HelixReelItem[]',
        defaultValue: 'Seven example frames',
        description:
          'Supplies up to eleven images with titles, alternative text, and optional eyebrow labels.',
      },
      {
        name: 'activeIndex',
        type: 'number',
        defaultValue: 'undefined',
        description: 'Controls the focused frame externally.',
      },
      {
        name: 'defaultActiveIndex',
        type: 'number',
        defaultValue: '3',
        description: 'Sets the initially focused frame in uncontrolled usage.',
      },
      {
        name: 'cardWidth',
        type: 'number',
        defaultValue: '188',
        description: 'Sets the width of every portrait frame.',
      },
      {
        name: 'radius',
        type: 'number',
        defaultValue: '246',
        description: 'Controls the horizontal radius of the helix path.',
      },
      {
        name: 'rise',
        type: 'number',
        defaultValue: '32',
        description: 'Sets the vertical climb between neighboring frames.',
      },
      {
        name: 'spread',
        type: 'number',
        defaultValue: '34',
        description: 'Sets the angular separation between helix positions.',
      },
      {
        name: 'depth',
        type: 'number',
        defaultValue: '185',
        description:
          'Controls how far rear frames recede from the focus plane.',
      },
      {
        name: 'autoPlay',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Advances the focused frame automatically while idle.',
      },
      {
        name: 'interval',
        type: 'number',
        defaultValue: '3200',
        description: 'Sets the idle autoplay delay in milliseconds.',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Wraps navigation through the beginning and end.',
      },
      {
        name: 'showControls',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the compact previous, position, and next controls.',
      },
      {
        name: 'onActiveIndexChange',
        type: '(index: number) => void',
        defaultValue: 'undefined',
        description:
          'Reports selection changes from autoplay, swipe, click, or keyboard input.',
      },
    ],
    accessibility: [
      'Uses a labeled gallery with native buttons for every visible frame.',
      'Marks the focused frame with aria-pressed.',
      'Supports Left, Right, Home, and End keyboard navigation.',
      'Pauses autoplay during pointer hover and keyboard focus.',
      'Provides named navigation controls and a polite position announcement.',
      'Disables autoplay, dragging, and spring motion when reduced motion is requested.',
      'Preserves controls and focus contrast in forced-color modes.',
    ],
  },
  'Toolchain Marquee': {
    usage: `import { ToolchainMarquee } from '@nacre-ui/react';

<ToolchainMarquee
  stacks={projectStacks}
  duration={22}
  rows={3}
/>`,
    props: [
      {
        name: 'items',
        type: 'ToolchainItem[]',
        defaultValue: 'undefined',
        description:
          'Supplies one shared badge set when every row should use the same tools.',
      },
      {
        name: 'stacks',
        type: 'ToolchainItem[][]',
        defaultValue: 'Three example stacks',
        description:
          'Supplies a distinct badge set for each row and repeats the sets only when more rows are requested.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultValue: '22',
        description:
          'Sets the seconds required for one complete, seamless pass.',
      },
      {
        name: 'rows',
        type: 'number',
        defaultValue: '3',
        description:
          'Sets one through eight stacked rails; neighboring rows automatically reverse direction.',
      },
      {
        name: 'showControl',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'Optionally shows a compact pause and resume control beside the rail.',
      },
    ],
    accessibility: [
      'Exposes one semantic copy of every badge in each stack while hiding only the repeated visual sets.',
      'Keeps autoplay running during pointer hover so movement remains predictable.',
      'Provides an optional native pause button without resetting the rail position.',
      'Stops animation automatically and provides a manually scrollable row when reduced motion is requested.',
      'Maintains visible keyboard focus and readable forced-color output.',
    ],
  },
  'Orbit Ledger': {
    usage: `import { OrbitLedger } from '@nacre-ui/react';

<OrbitLedger
  items={projects}
  accent="#d8a7ff"
  onActiveIndexChange={(index) => setActiveProject(index)}
/>`,
    props: [
      {
        name: 'items',
        type: 'OrbitLedgerItem[]',
        defaultValue: 'Six example projects',
        description:
          'Supplies up to ten projects with image, title, description, metadata, tags, and an optional link.',
      },
      {
        name: 'mode',
        type: "'page' | 'contained'",
        defaultValue: "'page'",
        description:
          'Uses page scroll for an immersive section or an internal scroll area for previews and compact placements.',
      },
      {
        name: 'defaultActiveIndex',
        type: 'number',
        defaultValue: '0',
        description:
          'Sets the initial project when the component uses contained scrolling.',
      },
      {
        name: 'cardWidth',
        type: 'number',
        defaultValue: '246',
        description: 'Sets the project card width from 170 through 310 pixels.',
      },
      {
        name: 'curve',
        type: 'number',
        defaultValue: '22',
        description: 'Controls the vertical bend of the project path.',
      },
      {
        name: 'depth',
        type: 'number',
        defaultValue: '92',
        description: 'Controls how far cards recede away from the focus plane.',
      },
      {
        name: 'tilt',
        type: 'number',
        defaultValue: '22',
        description: 'Sets how strongly cards turn toward the center axis.',
      },
      {
        name: 'scrollLength',
        type: 'number',
        defaultValue: '1600',
        description:
          'Sets the scroll distance used to move through the full ledger.',
      },
      {
        name: 'accent',
        type: 'string',
        defaultValue: "'#d8a7ff'",
        description: 'Sets the focus axis, progress, and ambient accent color.',
      },
      {
        name: 'showProgress',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the current position, progress rail, and controls.',
      },
      {
        name: 'onActiveIndexChange',
        type: '(index: number) => void',
        defaultValue: 'undefined',
        description: 'Reports the project nearest the center focus axis.',
      },
    ],
    accessibility: [
      'Uses a named region and announces the active project position politely.',
      'Supports Arrow keys, Home, and End when either navigation button is focused.',
      'Provides native previous and next buttons when progress controls are visible.',
      'Keeps only the focused project link in the keyboard tab order.',
      'Falls back to a static project grid when reduced motion is requested.',
      'Preserves visible focus and structural contrast in forced-color modes.',
    ],
  },
  Input: {
    usage: `import { Input } from '@nacre-ui/react';\n\n<Input\n  label="Work email"\n  name="email"\n  type="email"\n  autoComplete="email"\n/>`,
    props: [
      {
        name: 'type',
        type: 'HTMLInputTypeAttribute',
        defaultValue: "'text'",
        description: 'Uses the matching native input mode.',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        defaultValue: "'medium'",
        description: 'Sets field height and text scale.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables editing and form participation.',
      },
      {
        name: 'isInvalid',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Connects the field to its error message.',
      },
    ],
    accessibility: [
      'Requires a visible label or an accessible name.',
      'Error and description text are connected with aria-describedby.',
      'Retains browser autofill, validation, and form submission behavior.',
    ],
  },
  Switch: {
    usage: `import { Switch } from '@nacre-ui/react';\n\n<Switch\n  checked={updatesEnabled}\n  onCheckedChange={setUpdatesEnabled}\n  label="Automatic updates"\n/>`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: 'undefined',
        description: 'Controls the selected state.',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Sets the initial uncontrolled state.',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        defaultValue: 'undefined',
        description: 'Runs after a user changes the value.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents changes across all input methods.',
      },
    ],
    accessibility: [
      'Exposes role="switch" and the current aria-checked value.',
      'Space toggles the value when the control has focus.',
      'The label and optional description enlarge the effective target.',
    ],
  },
  Tabs: {
    usage: `import { Tabs, TabList, Tab, TabPanel } from '@nacre-ui/react';\n\n<Tabs defaultValue="overview">\n  <TabList aria-label="Project views">\n    <Tab value="overview">Overview</Tab>\n    <Tab value="activity">Activity</Tab>\n  </TabList>\n  <TabPanel value="overview">Project summary</TabPanel>\n</Tabs>`,
    props: [
      {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Controls the active tab.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        defaultValue: 'undefined',
        description: 'Runs when selection changes.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Sets layout and arrow-key direction.',
      },
      {
        name: 'activationMode',
        type: "'automatic' | 'manual'",
        defaultValue: "'automatic'",
        description: 'Controls whether focus immediately selects.',
      },
    ],
    accessibility: [
      'Implements the WAI-ARIA tabs pattern.',
      'Arrow keys move focus with Home and End support.',
      'Each tab is associated with exactly one labelled panel.',
    ],
  },
  Sidebar: {
    usage: `import { Sidebar, SidebarItem } from '@nacre-ui/react';\n\n<Sidebar aria-label="Workspace">\n  <SidebarItem href="/overview" isCurrent>Overview</SidebarItem>\n  <SidebarItem href="/components">Components</SidebarItem>\n</Sidebar>`,
    props: [
      {
        name: 'side',
        type: "'start' | 'end'",
        defaultValue: "'start'",
        description: 'Places navigation on the logical edge.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Allows the navigation rail to contract.',
      },
      {
        name: 'defaultCollapsed',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Sets the initial uncontrolled layout.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Uses the supplied navigation landmark.',
      },
    ],
    accessibility: [
      'Uses a labelled navigation landmark.',
      'Current destinations expose aria-current="page".',
      'Collapsed items retain accessible names and tooltips.',
    ],
  },
  Modal: {
    usage: `import { Modal, ModalContent, ModalTitle } from '@nacre-ui/react';\n\n<Modal open={isOpen} onOpenChange={setIsOpen}>\n  <ModalContent>\n    <ModalTitle>Archive project?</ModalTitle>\n    <p>You can restore it later.</p>\n  </ModalContent>\n</Modal>`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        defaultValue: 'undefined',
        description: 'Controls whether the modal is presented.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        defaultValue: 'undefined',
        description: 'Reports dismissal and trigger actions.',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        defaultValue: "'medium'",
        description: 'Constrains the content width.',
      },
      {
        name: 'initialFocus',
        type: 'RefObject<HTMLElement>',
        defaultValue: 'undefined',
        description: 'Overrides the first focused element.',
      },
    ],
    accessibility: [
      'Moves focus into the modal and restores it on close.',
      'Traps focus while background content is inert.',
      'Escape and the close control provide predictable dismissal.',
    ],
  },
  Dropdown: {
    usage: `import { Dropdown } from '@nacre-ui/react';\n\n<Dropdown\n  label="Appearance"\n  value={appearance}\n  onValueChange={setAppearance}\n  options={['System', 'Light', 'Dark']}\n/>`,
    props: [
      {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Controls the selected option.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        defaultValue: 'undefined',
        description: 'Runs after option selection.',
      },
      {
        name: 'placement',
        type: "'bottom-start' | 'bottom-end' | 'top-start'",
        defaultValue: "'bottom-start'",
        description: 'Sets the preferred overlay position.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents the trigger from opening.',
      },
    ],
    accessibility: [
      'Supports arrow navigation, Home, End, Enter, and Escape.',
      'Typeahead moves focus to matching options.',
      'The popup remains associated with its labelled trigger.',
    ],
  },
  'Segmented Control': {
    usage: `import { SegmentedControl } from '@nacre-ui/react';\n\n<SegmentedControl\n  aria-label="Time range"\n  value={range}\n  onValueChange={setRange}\n  items={['Day', 'Week', 'Month']}\n/>`,
    props: [
      {
        name: 'value',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Controls the selected segment.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        defaultValue: 'undefined',
        description: 'Runs after the single selection changes.',
      },
      {
        name: 'size',
        type: "'small' | 'medium'",
        defaultValue: "'medium'",
        description: 'Sets segment height and spacing.',
      },
      {
        name: 'isDisabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables every segment in the group.',
      },
    ],
    accessibility: [
      'Uses a single-selection radio-group model.',
      'Arrow keys move and select the adjacent segment.',
      'The group requires an accessible label describing the choice.',
    ],
  },
  Card: {
    usage: `import { Card } from '@nacre-ui/react';\n\n<Card variant="raised" padding="medium">\n  <h3>Design review</h3>\n  <p>Six updates are ready for the team.</p>\n</Card>`,
    props: [
      {
        name: 'variant',
        type: "'plain' | 'outlined' | 'raised'",
        defaultValue: "'plain'",
        description: 'Sets surface separation and depth.',
      },
      {
        name: 'padding',
        type: "'none' | 'small' | 'medium' | 'large'",
        defaultValue: "'medium'",
        description: 'Sets the internal spacing.',
      },
      {
        name: 'isInteractive',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Adds interactive focus and pressed states.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies card styling to a semantic child.',
      },
    ],
    accessibility: [
      'Uses neutral grouping semantics unless a semantic child is supplied.',
      'Interactive cards contain one primary action without nested controls.',
      'Raised appearance is never the only indication of interactivity.',
    ],
  },
  'Nacre Field Shader': {
    usage: `import { NacreFieldShader } from '@/components/ui/nacre-field-shader';

<NacreFieldShader
  mode="veil"
  baseColor="#0b0b0e"
  colorA="#c7b5ff"
  colorB="#6ed8cf"
  highlightColor="#fff2d5"
  distortion={0.82}
  pointerStrength={0.72}
/>`,
    props: [
      {
        name: 'mode',
        type: "'veil' | 'lens' | 'tide'",
        defaultValue: "'veil'",
        description:
          'Changes the field geometry rather than only changing its palette.',
      },
      {
        name: 'baseColor',
        type: 'string',
        defaultValue: "'#0b0b0e'",
        description: 'Sets the color beneath the generated field.',
      },
      {
        name: 'colorA',
        type: 'string',
        defaultValue: "'#c7b5ff'",
        description: 'Colors the primary body of the field.',
      },
      {
        name: 'colorB',
        type: 'string',
        defaultValue: "'#6ed8cf'",
        description: 'Colors the counter-flowing body.',
      },
      {
        name: 'highlightColor',
        type: 'string',
        defaultValue: "'#fff2d5'",
        description: 'Colors the brightest refraction and ridge highlights.',
      },
      {
        name: 'distortion',
        type: 'number',
        defaultValue: '0.82',
        description: 'Controls spatial warping from zero through 1.6.',
      },
      {
        name: 'pointerStrength',
        type: 'number',
        defaultValue: '0.72',
        description:
          'Controls how strongly the field bends toward the pointer.',
      },
      {
        name: 'grain',
        type: 'number',
        defaultValue: '0.025',
        description: 'Adds fine procedural texture from zero through 0.12.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.5',
        description: 'Controls animation rate; zero renders a static field.',
      },
      {
        name: 'pixelRatio',
        type: 'number',
        defaultValue: '1.5',
        description: 'Caps device pixel density between 0.75 and 2.',
      },
    ],
    accessibility: [
      'Treats the canvas as decorative and removes it from the accessibility tree.',
      'Renders a static field when reduced motion is requested.',
      'Caps device pixel density and redraws only when needed for static states.',
      'Provides CSS and forced-color fallbacks when WebGL is unavailable.',
    ],
  },
  'Iridescent Weave Shader': {
    usage: `import { IridescentWeaveShader } from '@/components/ui/iridescent-weave-shader';

<IridescentWeaveShader
  mode="weave"
  baseColor="#08090d"
  surfaceColor="#4d5ed7"
  accentColor="#d468ff"
  relief={0.88}
  textureScale={1}
/>`,
    props: [
      {
        name: 'mode',
        type: "'weave' | 'moire' | 'ripple'",
        defaultValue: "'weave'",
        description: 'Selects a distinct animated interference pattern.',
      },
      {
        name: 'baseColor',
        type: 'string',
        defaultValue: "'#08090d'",
        description: 'Sets the darkest color beneath the woven field.',
      },
      {
        name: 'surfaceColor',
        type: 'string',
        defaultValue: "'#4d5ed7'",
        description: 'Sets the primary thread color.',
      },
      {
        name: 'accentColor',
        type: 'string',
        defaultValue: "'#d468ff'",
        description: 'Colors the shifting iridescent interference.',
      },
      {
        name: 'highlightColor',
        type: 'string',
        defaultValue: "'#eaffff'",
        description: 'Colors the reflected thread highlights.',
      },
      {
        name: 'textureScale',
        type: 'number',
        defaultValue: '1',
        description: 'Controls pattern density from 0.5 through 2.5.',
      },
      {
        name: 'relief',
        type: 'number',
        defaultValue: '0.88',
        description: 'Controls simulated thread depth from zero through 2.2.',
      },
      {
        name: 'grain',
        type: 'number',
        defaultValue: '0.035',
        description: 'Adds fine material grain from zero through 0.14.',
      },
      {
        name: 'pointerLight',
        type: 'number',
        defaultValue: '0.85',
        description: 'Blends between fixed and pointer-controlled lighting.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.58',
        description: 'Controls the continuous pattern motion.',
      },
      {
        name: 'pixelRatio',
        type: 'number',
        defaultValue: '1.4',
        description: 'Caps device pixel density between 0.75 and 2.',
      },
    ],
    accessibility: [
      'Treats the generated canvas as decorative.',
      'Stops pattern movement when reduced motion is requested.',
      'Keeps pointer lighting available when animation is disabled.',
      'Provides CSS and forced-color fallbacks when WebGL is unavailable.',
    ],
  },
  'Mesh Background': {
    usage: `import { MeshBackground } from '@nacre-ui/react';

<MeshBackground
  base="#09090b"
  warm="#f36f56"
  cool="#6254d9"
  highlight="#ffe8bc"
  flow={0.92}
  lustre={0.58}
/>`,
    props: [
      {
        name: 'base',
        type: 'string',
        defaultValue: "'#09090b'",
        description: 'Sets the deep color beneath the folded surface.',
      },
      {
        name: 'warm',
        type: 'string',
        defaultValue: "'#f36f56'",
        description: 'Colors the first family of broad moving folds.',
      },
      {
        name: 'cool',
        type: 'string',
        defaultValue: "'#6254d9'",
        description: 'Colors the counter-flowing fold family.',
      },
      {
        name: 'highlight',
        type: 'string',
        defaultValue: "'#ffe8bc'",
        description: 'Colors the soft light traveling across the fabric.',
      },
      {
        name: 'flow',
        type: 'number',
        defaultValue: '0.92',
        description:
          'Controls fold displacement, clamped between 0.15 and 1.5.',
      },
      {
        name: 'lustre',
        type: 'number',
        defaultValue: '0.58',
        description:
          'Controls moving highlights and crossing sheen from 0 to 1.2.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.58',
        description: 'Controls fold travel and moving light speed.',
      },
    ],
    accessibility: [
      'Freezes every fold and soft highlight when reduced motion is requested.',
      'Exposes the shader as decorative and removes it from the accessibility tree.',
      'Limits rendered pixels to protect performance on large displays.',
      'Provides a CSS fallback for forced-color environments.',
    ],
  },
  'Flux Background': {
    usage: `import { FluxBackground } from '@nacre-ui/react';

<FluxBackground
  base="#09090b"
  ember="#ff6047"
  gold="#ffc44f"
  violet="#a77dff"
  energy={0.92}
/>`,
    props: [
      {
        name: 'base',
        type: 'string',
        defaultValue: "'#09090b'",
        description: 'Sets the deep field color beneath the moving lights.',
      },
      {
        name: 'ember',
        type: 'string',
        defaultValue: "'#ff6047'",
        description:
          'Colors the first orbiting fluid body and horizontal ribbon.',
      },
      {
        name: 'gold',
        type: 'string',
        defaultValue: "'#ffc44f'",
        description: 'Colors the second fluid body and crossing highlight.',
      },
      {
        name: 'violet',
        type: 'string',
        defaultValue: "'#a77dff'",
        description: 'Colors the counter-moving body and ribbon intersections.',
      },
      {
        name: 'energy',
        type: 'number',
        defaultValue: '0.92',
        description:
          'Controls fluid displacement, clamped between 0.2 and 1.4.',
      },
      {
        name: 'grain',
        type: 'number',
        defaultValue: '0.022',
        description: 'Adds fine animated texture, clamped between 0 and 0.08.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.62',
        description:
          'Controls the full animation rate; zero renders a static frame.',
      },
    ],
    accessibility: [
      'Exposes the canvas as decorative and removes it from the accessibility tree.',
      'Sets shader speed to zero when reduced motion is requested.',
      'Limits rendered pixels to protect performance on large displays.',
      'Provides a CSS fallback for forced-color environments.',
    ],
  },
  'Magnetic Warp Background': {
    usage: `import { MagneticWarpBackground } from '@nacre-ui/react';

<MagneticWarpBackground
  base="#07080c"
  north="#62e6d6"
  south="#8b72ff"
  pulse="#ff9f66"
  warp={0.9}
  intensity={0.92}
/>`,
    props: [
      {
        name: 'base',
        type: 'string',
        defaultValue: "'#07080c'",
        description: 'Sets the deep color beneath the magnetic field.',
      },
      {
        name: 'north',
        type: 'string',
        defaultValue: "'#62e6d6'",
        description: 'Colors the field around the first moving pole.',
      },
      {
        name: 'south',
        type: 'string',
        defaultValue: "'#8b72ff'",
        description: 'Colors the field around the counter-moving pole.',
      },
      {
        name: 'pulse',
        type: 'string',
        defaultValue: "'#ff9f66'",
        description: 'Colors the energy traveling along the field lines.',
      },
      {
        name: 'warp',
        type: 'number',
        defaultValue: '0.9',
        description:
          'Controls the magnetic displacement, clamped between 0.15 and 1.4.',
      },
      {
        name: 'intensity',
        type: 'number',
        defaultValue: '0.92',
        description:
          'Controls field-line and pole brightness from 0.2 through 1.4.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.64',
        description:
          'Controls pole drift, field deformation, and pulse travel.',
      },
    ],
    accessibility: [
      'Freezes pole drift, field deformation, and energy pulses when reduced motion is requested.',
      'Exposes the shader as decorative and removes it from the accessibility tree.',
      'Limits rendered pixels to protect performance on large displays.',
      'Provides a CSS fallback for forced-color environments.',
    ],
  },
  'Grain Current Background': {
    usage: `import { GrainCurrentBackground } from '@nacre-ui/react';

<GrainCurrentBackground
  base="#080910"
  blue="#477df4"
  pink="#e546aa"
  violet="#9567ff"
  flow={0.88}
  grain={0.052}
/>`,
    props: [
      {
        name: 'base',
        type: 'string',
        defaultValue: "'#080910'",
        description: 'Sets the dark field beneath the moving current.',
      },
      {
        name: 'blue',
        type: 'string',
        defaultValue: "'#477df4'",
        description: 'Colors the broad body of the diagonal current.',
      },
      {
        name: 'pink',
        type: 'string',
        defaultValue: "'#e546aa'",
        description: 'Colors the brighter leading edge of the current.',
      },
      {
        name: 'violet',
        type: 'string',
        defaultValue: "'#9567ff'",
        description: 'Blends the blue body into the pink edge.',
      },
      {
        name: 'flow',
        type: 'number',
        defaultValue: '0.88',
        description: 'Controls the current bend, clamped between 0.15 and 1.4.',
      },
      {
        name: 'grain',
        type: 'number',
        defaultValue: '0.052',
        description:
          'Controls animated film-grain intensity from zero through 0.12.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultValue: '0.52',
        description: 'Controls color drift, bending, and grain refresh.',
      },
    ],
    accessibility: [
      'Freezes the color current and film grain when reduced motion is requested.',
      'Exposes the shader as decorative and removes it from the accessibility tree.',
      'Limits rendered pixels to protect performance on large displays.',
      'Provides a CSS fallback for forced-color environments.',
    ],
  },
};

function slug(value: string) {
  return value.toLowerCase().replaceAll(' ', '-');
}

const fluxBackgroundSource = `'use client';

import {
  getShaderColorFromString,
  ShaderMount,
} from '@paper-design/shaders-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import styles from './flux-background.module.css';

const fluxFragmentShader = \`${fluxFragmentShader}\`;

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

export function FluxBackground({
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
    const sync = () => setReduceMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
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
}`;

function textValue(
  values: PlaygroundValues | undefined,
  key: string,
  fallback: string,
) {
  const value = values?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function numberValue(
  values: PlaygroundValues | undefined,
  key: string,
  fallback: number,
) {
  const value = values?.[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function booleanValue(
  values: PlaygroundValues | undefined,
  key: string,
  fallback: boolean,
) {
  const value = values?.[key];
  return typeof value === 'boolean' ? value : fallback;
}

function wordValues(
  values: PlaygroundValues | undefined,
  key: string,
  fallback: string[],
) {
  const value = values?.[key];
  if (typeof value !== 'string') return fallback;
  const words = value
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean);
  return words.length ? words : fallback;
}

function colorInputValue(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : '#24231f';
}

function NacreFieldShaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <NacreFieldShader
      baseColor={textValue(values, 'baseColor', '#0b0b0e')}
      className="nacre-field-shader-demo-surface"
      colorA={textValue(values, 'colorA', '#c7b5ff')}
      colorB={textValue(values, 'colorB', '#6ed8cf')}
      distortion={numberValue(values, 'distortion', 0.82)}
      grain={numberValue(values, 'grain', 0.025)}
      highlightColor={textValue(values, 'highlightColor', '#fff2d5')}
      mode={textValue(values, 'mode', 'veil') as NacreFieldMode}
      pointerStrength={numberValue(values, 'pointerStrength', 0.72)}
      speed={numberValue(values, 'speed', 0.5)}
    />
  );
}

function IridescentWeaveShaderPreview({
  values,
}: {
  values?: PlaygroundValues;
}) {
  return (
    <IridescentWeaveShader
      accentColor={textValue(values, 'accentColor', '#d468ff')}
      baseColor={textValue(values, 'baseColor', '#08090d')}
      className="iridescent-weave-shader-demo-surface"
      grain={numberValue(values, 'grain', 0.035)}
      highlightColor={textValue(values, 'highlightColor', '#eaffff')}
      mode={textValue(values, 'mode', 'weave') as IridescentWeaveMode}
      pointerLight={numberValue(values, 'pointerLight', 0.85)}
      relief={numberValue(values, 'relief', 0.88)}
      speed={numberValue(values, 'speed', 0.58)}
      surfaceColor={textValue(values, 'surfaceColor', '#4d5ed7')}
      textureScale={numberValue(values, 'textureScale', 1)}
    />
  );
}

function MeshBackgroundPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <MeshBackground
      className="mesh-background-demo-surface"
      flow={numberValue(values, 'flow', 0.96)}
      lustre={numberValue(values, 'lustre', 0.62)}
      speed={numberValue(values, 'speed', 0.62)}
    />
  );
}

function FluxBackgroundPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <FluxBackground
      className="flux-background-demo-surface"
      energy={numberValue(values, 'energy', 0.92)}
      grain={numberValue(values, 'grain', 0.022)}
      speed={numberValue(values, 'speed', 0.62)}
    />
  );
}

function MagneticWarpBackgroundPreview({
  values,
}: {
  values?: PlaygroundValues;
}) {
  return (
    <MagneticWarpBackground
      className="magnetic-warp-background-demo-surface"
      intensity={numberValue(values, 'intensity', 0.92)}
      speed={numberValue(values, 'speed', 0.64)}
      warp={numberValue(values, 'warp', 0.9)}
    />
  );
}

function GrainCurrentBackgroundPreview({
  values,
}: {
  values?: PlaygroundValues;
}) {
  return (
    <GrainCurrentBackground
      className="grain-current-background-demo-surface"
      flow={numberValue(values, 'flow', 0.88)}
      grain={numberValue(values, 'grain', 0.052)}
      speed={numberValue(values, 'speed', 0.52)}
    />
  );
}

function MagneticButtonPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <MagneticButton strength={numberValue(values, 'strength', 5)}>
      {textValue(values, 'label', 'Explore system')}
    </MagneticButton>
  );
}

function LiquidMetalButtonPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <LiquidMetalButton
      colorBack={textValue(values, 'colorBack', '#747570')}
      colorTint={textValue(values, 'colorTint', '#f4f3ee')}
      repetition={numberValue(values, 'repetition', 3.2)}
      speed={numberValue(values, 'speed', 0.48)}
    >
      {textValue(values, 'label', 'Enter studio')}
    </LiquidMetalButton>
  );
}

function GemSmokeButtonPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <GemSmokeButton
      colors={[
        textValue(values, 'colorOne', '#d8a7ff'),
        textValue(values, 'colorTwo', '#ffb49a'),
        textValue(values, 'colorThree', '#87d9bc'),
      ]}
      smokeSize={numberValue(values, 'smokeSize', 0.82)}
      speed={numberValue(values, 'speed', 0.4)}
    >
      {textValue(values, 'label', 'Reveal collection')}
    </GemSmokeButton>
  );
}

function LustreButtonPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <LustreButton
      duration={numberValue(values, 'duration', 3200)}
      lustreColor={textValue(values, 'lustreColor', '#ffffff')}
      motion={textValue(values, 'motion', 'loop') as 'loop' | 'hover'}
    >
      {textValue(values, 'label', 'Explore components')}
    </LustreButton>
  );
}

function SocialProfileButtonPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <SocialProfileButton
      href="https://github.com"
      handle={textValue(values, 'handle', '@github')}
      label={textValue(values, 'label', 'View profile')}
      target="_blank"
    />
  );
}

function PearlApertureLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <PearlApertureLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Preparing preview')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 42)}
      speed={numberValue(values, 'speed', 1400)}
    />
  );
}

function HorizonPageLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <HorizonPageLoader
      accent={textValue(values, 'accent', '#eeeae0')}
      eyebrow={textValue(values, 'eyebrow', 'Nacre UI')}
      label={textValue(values, 'label', 'Preparing your space')}
      mode="contained"
      speed={numberValue(values, 'speed', 2200)}
    />
  );
}

function MercuryRailLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <MercuryRailLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Syncing changes')}
      showLabel={booleanValue(values, 'showLabel', true)}
      speed={numberValue(values, 'speed', 2100)}
      width={numberValue(values, 'width', 220)}
    />
  );
}

function FacetBloomLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <FacetBloomLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Composing interface')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 48)}
      speed={numberValue(values, 'speed', 1680)}
    />
  );
}

function RibbonFoldLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <RibbonFoldLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Folding workspace')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 54)}
      speed={numberValue(values, 'speed', 1760)}
    />
  );
}

function PearlMatrixLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <PearlMatrixLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Indexing library')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 46)}
      speed={numberValue(values, 'speed', 1840)}
    />
  );
}

function FluidCellLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <FluidCellLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Forming shape')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 50)}
      speed={numberValue(values, 'speed', 2600)}
    />
  );
}

function PrismStackLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <PrismStackLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Stacking planes')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 50)}
      speed={numberValue(values, 'speed', 2400)}
    />
  );
}

function CardShuffleLoaderPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <CardShuffleLoader
      accent={textValue(values, 'accent', 'currentColor')}
      label={textValue(values, 'label', 'Shuffling layers')}
      showLabel={booleanValue(values, 'showLabel', true)}
      size={numberValue(values, 'size', 48)}
      speed={numberValue(values, 'speed', 1900)}
    />
  );
}

function SignalRevealTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <SignalRevealText
      as="h2"
      className="catalog-text-motion-preview"
      speed={numberValue(values, 'speed', 1050)}
      text={textValue(values, 'text', 'A softer way to arrive.')}
    />
  );
}

function TallyShiftNumberPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <TallyShiftNumber
      className="catalog-text-motion-preview"
      value={numberValue(values, 'value', 86420)}
      suffix=" users"
      repeat
    />
  );
}

function TidalTypeTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <TidalTypeText
      as="h2"
      className="catalog-text-motion-preview"
      radius={numberValue(values, 'radius', 190)}
      strength={numberValue(values, 'strength', 14)}
      text={textValue(values, 'text', 'Feel the surface respond.')}
    />
  );
}

function SwellTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <SwellText
      as="h2"
      className="catalog-text-motion-preview"
      amplitude={numberValue(values, 'amplitude', 7)}
      duration={numberValue(values, 'duration', 3400)}
      text={textValue(values, 'text', 'Make room for motion.')}
    />
  );
}

function AuroraTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <AuroraText
      as="h2"
      className="catalog-text-motion-preview"
      text={textValue(values, 'text', 'Make it luminous.')}
    />
  );
}

function LiquidTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <LiquidText
      as="h2"
      className="catalog-text-motion-preview"
      text={textValue(values, 'text', 'Let it move.')}
    />
  );
}

function GravityTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <GravityText
      as="h2"
      className="catalog-text-motion-preview"
      text={textValue(values, 'text', 'Pull focus here.')}
    />
  );
}

function SlotTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <SlotText
      as="h2"
      className="catalog-text-motion-preview"
      words={wordValues(values, 'words', ['Momentum', 'Presence', 'Signal'])}
    />
  );
}

function BloomTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <BloomText
      as="h2"
      className="catalog-text-motion-preview"
      text={textValue(values, 'text', 'Break through.')}
    />
  );
}

function TiltTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <TiltText
      as="h2"
      className="catalog-text-motion-preview"
      text={textValue(values, 'text', 'Take the angle.')}
    />
  );
}

function PhaseWeaveTextPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <PhaseWeaveText
      as="h2"
      className="catalog-text-motion-preview"
      interval={numberValue(values, 'interval', 2800)}
      words={wordValues(values, 'words', [
        'Find the signal',
        'Shape the path',
        'Keep it clear',
      ])}
    />
  );
}

function EditorialMosaicPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <EditorialMosaic
      className="editorial-mosaic-demo-surface"
      gap={numberValue(values, 'gap', 8)}
      radius={numberValue(values, 'radius', 12)}
      showLabels={booleanValue(values, 'showLabels', true)}
    />
  );
}

function HaloDockPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <HaloDock
      className="halo-dock-demo-surface"
      lift={numberValue(values, 'lift', 12)}
      magnification={numberValue(values, 'magnification', 76)}
      showLabels={booleanValue(values, 'showLabels', true)}
      size={numberValue(values, 'size', 46)}
    />
  );
}

function ShutterTrailPreview({ values }: { values?: PlaygroundValues }) {
  return (
    <ShutterTrail
      cardSize={numberValue(values, 'cardSize', 152)}
      className="shutter-trail-demo-surface"
      persistence={numberValue(values, 'persistence', 1.6)}
      showIndices={booleanValue(values, 'showIndices', true)}
      spacing={numberValue(values, 'spacing', 72)}
      tilt={numberValue(values, 'tilt', 7)}
      trailLength={numberValue(values, 'trailLength', 6)}
    />
  );
}

function FolioArcCarouselPreview({ values }: { values?: PlaygroundValues }) {
  const compact = values === undefined;

  return (
    <FolioArcCarousel
      arc={numberValue(values, 'arc', compact ? 12 : 18)}
      cardWidth={numberValue(values, 'cardWidth', compact ? 180 : 230)}
      className="folio-arc-carousel-demo-surface"
      depth={numberValue(values, 'depth', compact ? 78 : 105)}
      loop={booleanValue(values, 'loop', true)}
      showControls={booleanValue(values, 'showControls', true)}
      showLabels={booleanValue(values, 'showLabels', true)}
      sideAngle={numberValue(values, 'sideAngle', compact ? 24 : 30)}
      spacing={numberValue(values, 'spacing', compact ? 128 : 158)}
    />
  );
}

function HelixReelPreview({ values }: { values?: PlaygroundValues }) {
  const compact = values === undefined;

  return (
    <HelixReel
      autoPlay={booleanValue(values, 'autoPlay', true)}
      cardWidth={numberValue(values, 'cardWidth', compact ? 150 : 188)}
      className="helix-reel-demo-surface"
      depth={numberValue(values, 'depth', compact ? 120 : 185)}
      interval={numberValue(values, 'interval', 3200)}
      loop={booleanValue(values, 'loop', true)}
      radius={numberValue(values, 'radius', compact ? 190 : 246)}
      rise={numberValue(values, 'rise', compact ? 24 : 32)}
      showControls={booleanValue(values, 'showControls', true)}
      spread={numberValue(values, 'spread', compact ? 28 : 34)}
    />
  );
}

function ToolchainMarqueePreview({ values }: { values?: PlaygroundValues }) {
  return (
    <ToolchainMarquee
      className="toolchain-marquee-demo-surface"
      duration={numberValue(values, 'duration', 22)}
      rows={numberValue(values, 'rows', 3)}
      showControl={booleanValue(values, 'showControl', false)}
    />
  );
}

function OrbitLedgerPreview({ values }: { values?: PlaygroundValues }) {
  const compact = values === undefined;

  return (
    <OrbitLedger
      accent={textValue(values, 'accent', '#d8a7ff')}
      autoPlay={booleanValue(values, 'autoPlay', true)}
      autoPlayInterval={numberValue(values, 'autoPlayInterval', 3200)}
      cardWidth={numberValue(values, 'cardWidth', compact ? 178 : 246)}
      className="orbit-ledger-demo-surface"
      curve={numberValue(values, 'curve', compact ? 15 : 22)}
      defaultActiveIndex={compact ? 2 : 1}
      depth={numberValue(values, 'depth', compact ? 66 : 92)}
      mode="contained"
      scrollLength={numberValue(values, 'scrollLength', compact ? 760 : 1400)}
      showProgress={booleanValue(values, 'showProgress', !compact)}
      tilt={numberValue(values, 'tilt', compact ? 17 : 22)}
    />
  );
}

function ComponentPreview({
  name,
  values,
}: {
  name: ComponentName;
  values?: PlaygroundValues;
}) {
  if (name === 'Magnetic Button')
    return <MagneticButtonPreview values={values} />;
  if (name === 'Liquid Metal Button')
    return <LiquidMetalButtonPreview values={values} />;
  if (name === 'Gem Smoke Button')
    return <GemSmokeButtonPreview values={values} />;
  if (name === 'Lustre Button') return <LustreButtonPreview values={values} />;
  if (name === 'Social Profile Button')
    return <SocialProfileButtonPreview values={values} />;
  if (name === 'Pearl Aperture Loader')
    return <PearlApertureLoaderPreview values={values} />;
  if (name === 'Horizon Page Loader')
    return <HorizonPageLoaderPreview values={values} />;
  if (name === 'Mercury Rail Loader')
    return <MercuryRailLoaderPreview values={values} />;
  if (name === 'Facet Bloom Loader')
    return <FacetBloomLoaderPreview values={values} />;
  if (name === 'Ribbon Fold Loader')
    return <RibbonFoldLoaderPreview values={values} />;
  if (name === 'Pearl Matrix Loader')
    return <PearlMatrixLoaderPreview values={values} />;
  if (name === 'Fluid Cell Loader')
    return <FluidCellLoaderPreview values={values} />;
  if (name === 'Prism Stack Loader')
    return <PrismStackLoaderPreview values={values} />;
  if (name === 'Card Shuffle Loader')
    return <CardShuffleLoaderPreview values={values} />;
  if (name === 'Signal Reveal Text')
    return <SignalRevealTextPreview values={values} />;
  if (name === 'Tally Shift Number')
    return <TallyShiftNumberPreview values={values} />;
  if (name === 'Tidal Type Text')
    return <TidalTypeTextPreview values={values} />;
  if (name === 'Swell Text') return <SwellTextPreview values={values} />;
  if (name === 'Aurora Text') return <AuroraTextPreview values={values} />;
  if (name === 'Liquid Text') return <LiquidTextPreview values={values} />;
  if (name === 'Gravity Text') return <GravityTextPreview values={values} />;
  if (name === 'Slot Text') return <SlotTextPreview values={values} />;
  if (name === 'Bloom Text') return <BloomTextPreview values={values} />;
  if (name === 'Tilt Text') return <TiltTextPreview values={values} />;
  if (name === 'Phase Weave Text')
    return <PhaseWeaveTextPreview values={values} />;
  if (name === 'Editorial Mosaic')
    return <EditorialMosaicPreview values={values} />;
  if (name === 'Halo Dock') return <HaloDockPreview values={values} />;
  if (name === 'Shutter Trail') return <ShutterTrailPreview values={values} />;
  if (name === 'Folio Arc Carousel')
    return <FolioArcCarouselPreview values={values} />;
  if (name === 'Helix Reel') return <HelixReelPreview values={values} />;
  if (name === 'Toolchain Marquee')
    return <ToolchainMarqueePreview values={values} />;
  if (name === 'Orbit Ledger') return <OrbitLedgerPreview values={values} />;
  if (name === 'Nacre Field Shader')
    return <NacreFieldShaderPreview values={values} />;
  if (name === 'Iridescent Weave Shader')
    return <IridescentWeaveShaderPreview values={values} />;
  if (name === 'Mesh Background')
    return <MeshBackgroundPreview values={values} />;
  if (name === 'Flux Background')
    return <FluxBackgroundPreview values={values} />;
  if (name === 'Magnetic Warp Background')
    return <MagneticWarpBackgroundPreview values={values} />;
  if (name === 'Grain Current Background')
    return <GrainCurrentBackgroundPreview values={values} />;
  if (name === 'Button')
    return (
      <div className="catalog-button-preview">
        <button>
          Continue <ArrowRight />
        </button>
        <button>Cancel</button>
      </div>
    );
  return null;
}

function CatalogueComponentPreview({ name }: { name: ComponentName }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => setIsNearby(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearby(entry.isIntersecting),
      { rootMargin: '420px 0px' },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={previewRef}
      className="reference-preview"
      data-preview-active={isNearby || undefined}
    >
      {isNearby ? <ComponentPreview name={name} /> : null}
    </div>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [didCopy, setDidCopy] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setDidCopy(true);
    window.setTimeout(() => setDidCopy(false), 1500);
  }

  return (
    <div className="docs-code-block">
      <div>
        <span>
          <i />
          {label}
        </span>
        <button type="button" onClick={copyCode} aria-label={`Copy ${label}`}>
          {didCopy ? <Check /> : <Copy />}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FullCodeBlock({ label, code }: { label: string; code: string }) {
  const [didCopy, setDidCopy] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setDidCopy(true);
    window.setTimeout(() => setDidCopy(false), 1500);
  }

  return (
    <div className="full-code-block">
      <div className="full-code-header">
        <span>
          <i />
          {label}
        </span>
        <button type="button" onClick={copyCode} aria-label={`Copy ${label}`}>
          {didCopy ? <Check /> : <Copy />}
        </button>
      </div>
      <pre>
        {code.split('\n').map((line, index) => (
          <span className="source-line" key={`${index}-${line}`}>
            <span>{index + 1}</span>
            <code>{line || ' '}</code>
          </span>
        ))}
      </pre>
    </div>
  );
}

function CopyCommand({
  code,
  className = '',
}: {
  code: string;
  className?: string;
}) {
  const [didCopy, setDidCopy] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setDidCopy(true);
    window.setTimeout(() => setDidCopy(false), 1500);
  }

  return (
    <div className={`copy-command ${className}`.trim()}>
      <Code2 />
      <code>{code}</code>
      <button type="button" onClick={copyCode} aria-label="Copy command">
        {didCopy ? <Check /> : <Copy />}
      </button>
    </div>
  );
}

function createComponentPrompt({
  component,
  docs,
  values,
  sourceCode,
}: {
  component: (typeof catalog)[number];
  docs: (typeof componentDocs)[ComponentName];
  values: PlaygroundValues;
  sourceCode: string;
}) {
  const componentSlug = slug(component.name);
  const moduleSlug = componentModuleSlug(component.name);
  const installedUsage = docs.usage.replace(
    "from '@nacre-ui/react'",
    `from '@/components/ui/${moduleSlug}'`,
  );
  const dependencies = [
    sourceCode.includes("from 'framer-motion'") ? 'framer-motion' : null,
    sourceCode.includes("from '@paper-design/shaders")
      ? '@paper-design/shaders-react@0.0.80'
      : null,
  ].filter(Boolean);
  const propLines = docs.props.map(
    (prop) =>
      `- ${prop.name}: ${prop.type} (default: ${prop.defaultValue}) — ${prop.description}`,
  );
  const valueLines = Object.entries(values).map(
    ([key, value]) => `- ${key}: ${JSON.stringify(value)}`,
  );
  const accessibilityLines = docs.accessibility.map((item) => `- ${item}`);

  return [
    `Add the Nacre UI ${component.name} component to my existing React project and use it in the requested interface.`,
    '',
    `Component intent: ${component.description}`,
    `Category: ${component.category}`,
    '',
    'Install it from Nacre UI using the package manager already used by the project:',
    '```bash',
    `# npm\nnpx @nacre-ui/cli@latest add ${componentSlug}`,
    `# pnpm\npnpm dlx @nacre-ui/cli@latest add ${componentSlug}`,
    `# bun\nbunx @nacre-ui/cli@latest add ${componentSlug}`,
    `# yarn\nyarn dlx @nacre-ui/cli@latest add ${componentSlug}`,
    '```',
    '',
    'Integration rules:',
    '- Run only the one installation command that matches the project’s package manager.',
    '- Use the installed Nacre UI component and its styles as the source of truth; do not replace it with a generic lookalike.',
    `- Import the component from '@/components/ui/${moduleSlug}'.`,
    '- Use TypeScript and follow the project’s existing framework, styling system, tokens, and file conventions.',
    '- Do not replace unrelated files or introduce a new design system.',
    '- Adapt surrounding layout and tokens without removing the component’s intended interaction or visual character.',
    '- Make motion smooth and intentional, and provide a quiet prefers-reduced-motion fallback.',
    '- Preserve native semantics, keyboard operation, visible focus, and touch support.',
    '',
    'Public API:',
    ...propLines,
    '',
    'Desired preview configuration:',
    ...valueLines,
    '',
    'Accessibility requirements:',
    ...accessibilityLines,
    '',
    `Component dependencies: ${dependencies.length ? `${dependencies.join(', ')}. The Nacre UI installer should add these; only install them manually if the generated source reports a missing dependency.` : 'No additional component dependency is expected beyond the generated Nacre UI source.'}`,
    '',
    'Representative usage:',
    '```tsx',
    installedUsage,
    '```',
    '',
    'After installation, add the representative usage in the appropriate existing screen, apply the desired configuration, and verify the interaction. Summarize the files changed and the checks you ran.',
  ].join('\n');
}

function componentModuleSlug(name: ComponentName) {
  if (
    name === 'Fluid Cell Loader' ||
    name === 'Prism Stack Loader' ||
    name === 'Card Shuffle Loader'
  ) {
    return 'sculptural-loaders';
  }
  if (
    name === 'Aurora Text' ||
    name === 'Liquid Text' ||
    name === 'Gravity Text' ||
    name === 'Slot Text' ||
    name === 'Bloom Text' ||
    name === 'Tilt Text'
  ) {
    return 'text-motion-effects';
  }
  return slug(name);
}

function componentUsage(name: ComponentName, usage: string) {
  return usage.replace(
    "from '@nacre-ui/react'",
    `from '@/components/ui/${componentModuleSlug(name)}'`,
  );
}

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [didCopy, setDidCopy] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setDidCopy(true);
    window.setTimeout(() => setDidCopy(false), 1800);
  }

  return (
    <button
      type="button"
      className="copy-prompt-button"
      data-copied={didCopy || undefined}
      onClick={copyPrompt}
      aria-live="polite"
    >
      {didCopy ? <Check /> : <WandSparkles />}
      <span>{didCopy ? 'Prompt copied' : 'Copy AI prompt'}</span>
    </button>
  );
}

function PackageManagerIcon({ manager }: { manager: PackageManager }) {
  if (manager === 'pnpm') {
    return (
      <span className="package-manager-icon pnpm-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM2 2h3.5v3.5H2zm8.25 0h3.498v3.5H10.25zm8.25 0H22v3.5h-3.5zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zm2 2H22v3.5h-3.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
        </svg>
      </span>
    );
  }

  if (manager === 'bun') {
    return (
      <span className="package-manager-icon bun-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z" />
        </svg>
      </span>
    );
  }

  if (manager === 'yarn') {
    return (
      <span className="package-manager-icon yarn-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="package-manager-icon npm-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
      </svg>
    </span>
  );
}

function GettingStartedContent({ page }: { page: GettingStartedPage }) {
  if (page === 'installation') {
    return (
      <article className="getting-started-article">
        <header>
          <span>Getting started</span>
          <h1>Installation</h1>
          <p>
            Nacre installs as editable React source, so the component becomes
            part of your project instead of a hidden runtime dependency.
          </p>
        </header>
        <section>
          <h2>Choose a component</h2>
          <p>
            Run the add command from a React project. The CLI copies the TSX,
            colocated CSS module, and required shared utilities.
          </p>
          <CodeBlock
            label="Terminal"
            code={`npx @nacre-ui/cli@latest add magnetic-button`}
          />
        </section>
        <section>
          <h2>Import the local source</h2>
          <p>
            Installed components live in your source tree and use the existing
            <code>@/</code> project alias.
          </p>
          <CodeBlock
            label="React"
            code={`import { MagneticButton } from '@/components/ui/magnetic-button';`}
          />
        </section>
        <section>
          <h2>Use and adapt it</h2>
          <p>
            Keep the interaction contract intact while adapting labels,
            surrounding layout, and exposed component props.
          </p>
          <CodeBlock
            label="React"
            code={`<MagneticButton strength={4}>\n  Explore system\n</MagneticButton>`}
          />
        </section>
        <div className="docs-callout">
          <strong>Project requirements</strong>
          <p>
            Use React with TypeScript, CSS Modules, and an <code>@/*</code>{' '}
            alias. The CLI installs component-specific runtime dependencies for
            you.
          </p>
        </div>
      </article>
    );
  }

  if (page === 'react-next') {
    return (
      <article className="getting-started-article">
        <header>
          <span>Getting started</span>
          <h1>React and Next.js</h1>
          <p>
            Nacre components are typed source files and work directly in React
            and the Next.js App Router.
          </p>
        </header>
        <section>
          <h2>Add the source</h2>
          <p>
            Install one component or several in the same command. Dependencies
            are deduplicated before they are added.
          </p>
          <CodeBlock
            label="Terminal"
            code={`npx @nacre-ui/cli@latest add halo-dock facet-bloom-loader`}
          />
        </section>
        <section>
          <h2>Respect client boundaries</h2>
          <p>
            Interactive Nacre files already declare their client boundary. They
            can be rendered beneath server layouts without a provider.
          </p>
          <CodeBlock
            label="app/page.tsx"
            code={`import { FacetBloomLoader } from '@/components/ui/facet-bloom-loader';\n\nexport default function Page() {\n  return <FacetBloomLoader label="Preparing workspace" />;\n}`}
          />
        </section>
        <section>
          <h2>Keep assets explicit</h2>
          <p>
            Gallery components receive their images as props. Use local paths or
            configure remote image hosts using your framework’s normal rules.
          </p>
          <CodeBlock
            label="React"
            code={`<FolioArcCarousel\n  images={projectImages}\n  aria-label="Selected work"\n/>`}
          />
        </section>
      </article>
    );
  }

  if (page === 'theming') {
    return (
      <article className="getting-started-article">
        <header>
          <span>Getting started</span>
          <h1>Theming</h1>
          <p>
            Start with component props, then edit the copied CSS module when a
            product needs a deeper visual change.
          </p>
        </header>
        <section>
          <h2>Use exposed appearance props</h2>
          <p>
            Color, scale, speed, and motion controls stay close to the component
            that owns them.
          </p>
          <CodeBlock
            label="React"
            code={`<FacetBloomLoader\n  accent="#9567ff"\n  size={52}\n  speed={1800}\n/>`}
          />
        </section>
        <section>
          <h2>Edit the copied styles</h2>
          <p>
            Every visual component keeps its CSS module beside the TSX file, so
            changes remain local and reviewable.
          </p>
          <CodeBlock
            label="CSS"
            code={`.root {\n  border-radius: 14px;\n  color: var(--foreground);\n}`}
          />
        </section>
        <section>
          <h2>Respect system preference</h2>
          <p>
            Use an explicit class for user-controlled themes and the media query
            as the no-JavaScript fallback.
          </p>
          <CodeBlock
            label="CSS"
            code={`@media (prefers-color-scheme: dark) {\n  :root:not(.light) { color-scheme: dark; }\n}`}
          />
        </section>
      </article>
    );
  }

  return (
    <article className="getting-started-article">
      <header>
        <span>Getting started</span>
        <h1>CLI</h1>
        <p>
          Add only the Nacre source files and dependencies your project uses.
        </p>
      </header>
      <section>
        <h2>Initialize the project</h2>
        <p>
          The initializer checks for a project package and creates the local
          component and utility directories.
        </p>
        <CodeBlock label="Terminal" code={`npx @nacre-ui/cli@latest init`} />
      </section>
      <section>
        <h2>Add components</h2>
        <p>Choose one component or pass several names in the same command.</p>
        <CodeBlock
          label="Terminal"
          code={`npx @nacre-ui/cli@latest add halo-dock facet-bloom-loader`}
        />
      </section>
      <section>
        <h2>Review the generated files</h2>
        <p>
          Component source, styles, and shared utilities are copied into your
          project. Changed files are protected by default.
        </p>
        <CodeBlock
          label="Output"
          code={`components/ui/halo-dock.tsx\ncomponents/ui/halo-dock.module.css\ncomponents/ui/facet-bloom-loader.tsx\ncomponents/ui/facet-bloom-loader.module.css\nlib/utils.ts`}
        />
      </section>
      <div className="docs-callout">
        <strong>CI usage</strong>
        <p>
          Add <code>--skip-install</code> when dependency changes are managed
          elsewhere. Use <code>--overwrite</code> only when replacing edited
          component files is intentional.
        </p>
      </div>
    </article>
  );
}

const playgroundColors = [
  '#171716',
  '#f4f3ee',
  '#747570',
  '#f36f56',
  '#ffb49a',
  '#ffe8bc',
  '#87d9bc',
  '#62e6d6',
  '#6254d9',
  '#9567ff',
  '#d8a7ff',
  '#e546aa',
];

function PlaygroundColorControl({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const pickerValue = colorInputValue(value);

  return (
    <div className="live-playground-field live-playground-color-field">
      <span>{label}</span>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="live-color-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <i style={{ background: pickerValue }} />
        <code>{value}</code>
        <ChevronDown aria-hidden="true" />
      </button>
      {open ? (
        <dialog
          open
          className="live-color-popover"
          aria-label={`${label} picker`}
        >
          <div className="live-color-popover-header">
            <span>Choose {label.toLowerCase()}</span>
            <input
              aria-label={`Pick ${label}`}
              type="color"
              value={pickerValue}
              onChange={(event) => onChange(event.target.value)}
            />
          </div>
          <div className="live-color-swatches" aria-label={`${label} palette`}>
            {playgroundColors.map((color) => (
              <button
                aria-label={`Use ${color}`}
                className={
                  color.toLowerCase() === pickerValue.toLowerCase()
                    ? 'selected'
                    : ''
                }
                key={color}
                style={{ background: color }}
                type="button"
                onClick={() => onChange(color)}
              />
            ))}
          </div>
          <label className="live-color-value">
            <span>Exact value</span>
            <input
              aria-label={`${label} value`}
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
            />
          </label>
        </dialog>
      ) : null}
    </div>
  );
}

function PlaygroundSelectControl({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const activeOption = options.find((option) => option.value === value);

  return (
    <div className="live-playground-field live-playground-select-field">
      <span>{label}</span>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="live-select-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{activeOption?.label ?? value}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      {open ? (
        <dialog
          open
          className="live-select-popover"
          aria-label={`${label} options`}
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                aria-pressed={selected}
                className={selected ? 'selected' : ''}
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {selected ? <Check aria-hidden="true" /> : null}
              </button>
            );
          })}
        </dialog>
      ) : null}
    </div>
  );
}

function LivePlaygroundControls({
  config,
  onChange,
  onReset,
  values,
}: {
  config: PlaygroundConfig;
  onChange: (key: string, value: PlaygroundValue) => void;
  onReset: () => void;
  values: PlaygroundValues;
}) {
  return (
    <section className="live-playground" aria-label="Live preview controls">
      <div className="live-playground-heading">
        <div>
          <span>Live playground</span>
          <p>Adjust values and see the preview update instantly.</p>
        </div>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="live-playground-controls">
        {config.controls.map((control) => {
          const value = values[control.key] ?? config.defaults[control.key];

          if (control.type === 'text') {
            return (
              <label className="live-playground-field" key={control.key}>
                <span>{control.label}</span>
                <input
                  aria-label={control.label}
                  type="text"
                  value={String(value)}
                  onChange={(event) =>
                    onChange(control.key, event.target.value)
                  }
                />
              </label>
            );
          }

          if (control.type === 'color') {
            return (
              <PlaygroundColorControl
                key={control.key}
                label={control.label}
                value={String(value)}
                onChange={(color) => onChange(control.key, color)}
              />
            );
          }

          if (control.type === 'select') {
            return (
              <PlaygroundSelectControl
                key={control.key}
                label={control.label}
                options={control.options ?? []}
                value={String(value)}
                onChange={(selected) => onChange(control.key, selected)}
              />
            );
          }

          if (control.type === 'toggle') {
            return (
              <label
                className="live-playground-field live-playground-toggle"
                key={control.key}
              >
                <span>{control.label}</span>
                <input
                  aria-label={control.label}
                  checked={Boolean(value)}
                  type="checkbox"
                  onChange={(event) =>
                    onChange(control.key, event.target.checked)
                  }
                />
              </label>
            );
          }

          return (
            <label
              className="live-playground-field live-playground-range"
              key={control.key}
            >
              <span>
                {control.label}
                <output>{value}</output>
              </span>
              <span
                className="live-range-rail"
                style={
                  {
                    '--range-progress': `${(((Number(value) - (control.min ?? 0)) / ((control.max ?? 1) - (control.min ?? 0))) * 100).toFixed(2)}%`,
                  } as React.CSSProperties
                }
              >
                <i aria-hidden="true" />
                <input
                  aria-label={control.label}
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={Number(value)}
                  onChange={(event) =>
                    onChange(control.key, Number(event.target.value))
                  }
                />
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function ComponentContent({ name }: { name: ComponentName }) {
  const component = catalog.find((item) => item.name === name)!;
  const docs = componentDocs[name];
  const usage = componentUsage(name, docs.usage);
  const playgroundConfig = playgroundFor(name);
  const [demoTab, setDemoTab] = useState<'preview' | 'code'>('preview');
  const [installMode, setInstallMode] = useState<'cli' | 'manual'>('cli');
  const [packageManager, setPackageManager] = useState<PackageManager>('npm');
  const [playgroundValues, setPlaygroundValues] = useState<PlaygroundValues>(
    () => playgroundConfig.defaults,
  );

  const componentSlug = slug(name);
  const exportName = name.replaceAll(' ', '');
  const usesPaperShader =
    name === 'Liquid Metal Button' ||
    name === 'Gem Smoke Button' ||
    name === 'Mesh Background' ||
    name === 'Flux Background' ||
    name === 'Magnetic Warp Background' ||
    name === 'Grain Current Background';
  const usesFramerMotion =
    name === 'Toolchain Marquee' || name === 'Orbit Ledger';
  const sourceCode =
    name === 'Magnetic Button'
      ? magneticButtonSource
      : name === 'Liquid Metal Button'
        ? liquidMetalButtonSource
        : name === 'Gem Smoke Button'
          ? gemSmokeButtonSource
          : name === 'Lustre Button'
            ? lustreButtonSource
            : name === 'Social Profile Button'
              ? socialProfileButtonSource
              : name === 'Pearl Aperture Loader'
                ? pearlApertureLoaderSource
                : name === 'Horizon Page Loader'
                  ? horizonPageLoaderSource
                  : name === 'Mercury Rail Loader'
                    ? mercuryRailLoaderSource
                    : name === 'Facet Bloom Loader'
                      ? facetBloomLoaderSource
                      : name === 'Ribbon Fold Loader'
                        ? ribbonFoldLoaderSource
                        : name === 'Pearl Matrix Loader'
                          ? pearlMatrixLoaderSource
                          : name === 'Fluid Cell Loader' ||
                              name === 'Prism Stack Loader' ||
                              name === 'Card Shuffle Loader'
                            ? sculpturalLoadersSource
                            : name === 'Signal Reveal Text'
                              ? signalRevealTextSource
                              : name === 'Tally Shift Number'
                                ? tallyShiftNumberSource
                                : name === 'Tidal Type Text'
                                  ? tidalTypeTextSource
                                  : name === 'Swell Text'
                                    ? swellTextSource
                                    : name === 'Aurora Text' ||
                                        name === 'Liquid Text' ||
                                        name === 'Gravity Text' ||
                                        name === 'Slot Text' ||
                                        name === 'Bloom Text' ||
                                        name === 'Tilt Text'
                                      ? textMotionEffectsSource
                                      : name === 'Phase Weave Text'
                                        ? phaseWeaveTextSource
                                        : name === 'Editorial Mosaic'
                                          ? editorialMosaicSource
                                          : name === 'Halo Dock'
                                            ? haloDockSource
                                            : name === 'Shutter Trail'
                                              ? shutterTrailSource
                                              : name === 'Folio Arc Carousel'
                                                ? folioArcCarouselSource
                                                : name === 'Helix Reel'
                                                  ? helixReelSource
                                                  : name === 'Toolchain Marquee'
                                                    ? toolchainMarqueeSource
                                                    : name === 'Orbit Ledger'
                                                      ? orbitLedgerSource
                                                      : name ===
                                                          'Nacre Field Shader'
                                                        ? nacreFieldShaderSource
                                                        : name ===
                                                            'Iridescent Weave Shader'
                                                          ? iridescentWeaveShaderSource
                                                          : name ===
                                                              'Mesh Background'
                                                            ? meshBackgroundSource
                                                            : name ===
                                                                'Flux Background'
                                                              ? fluxBackgroundSource
                                                              : name ===
                                                                  'Magnetic Warp Background'
                                                                ? magneticWarpBackgroundSource
                                                                : name ===
                                                                    'Grain Current Background'
                                                                  ? grainCurrentBackgroundSource
                                                                  : `'use client';

import * as React from 'react';

export type ${exportName}Props = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
${docs.props.map((prop) => `  ${prop.name}?: ${prop.type.replace('HTMLInputTypeAttribute', 'React.HTMLInputTypeAttribute').replace('RefObject', 'React.RefObject')};`).join('\n')}
};

export const ${exportName} = React.forwardRef<HTMLElement, ${exportName}Props>(
  function ${exportName}({ children, ...props }, ref) {
    return (
      <nacre-${componentSlug} ref={ref} {...props}>
        {children}
      </nacre-${componentSlug}>
    );
  },
);

${exportName}.displayName = '${exportName}';`;
  const addCommands = {
    npm: `npx @nacre-ui/cli@latest add ${componentSlug}`,
    pnpm: `pnpm dlx @nacre-ui/cli@latest add ${componentSlug}`,
    bun: `bunx @nacre-ui/cli@latest add ${componentSlug}`,
    yarn: `yarn dlx @nacre-ui/cli@latest add ${componentSlug}`,
  };
  const componentPrompt = createComponentPrompt({
    component,
    docs,
    values: playgroundValues,
    sourceCode,
  });

  return (
    <article className="component-doc-article">
      <nav className="component-doc-breadcrumb" aria-label="Breadcrumb">
        <Link href="/components">Components</Link>
        <span>/</span>
        <strong>{component.name}</strong>
      </nav>

      <header className="component-doc-header">
        <h1>{component.name}</h1>
        <p>{component.description}</p>
      </header>

      <div className="component-doc-toolbar">
        <div
          className="component-view-tabs"
          aria-label={`${name} example view`}
        >
          <button
            type="button"
            aria-pressed={demoTab === 'preview'}
            onClick={() => setDemoTab('preview')}
          >
            Preview
          </button>
          <button
            type="button"
            aria-pressed={demoTab === 'code'}
            onClick={() => setDemoTab('code')}
          >
            Code
          </button>
        </div>
        <div className="component-toolbar-actions">
          <CopyPromptButton prompt={componentPrompt} />
          <CopyCommand
            code={addCommands.npm}
            className="component-add-command"
          />
        </div>
      </div>

      <div className="component-doc-preview-shell">
        {demoTab === 'preview' ? (
          <>
            <div className="component-doc-preview">
              <div
                className="component-live-preview"
                style={{
                  transform: `scale(${numberValue(playgroundValues, 'scale', 1)})`,
                }}
              >
                <ComponentPreview name={name} values={playgroundValues} />
              </div>
            </div>
            <LivePlaygroundControls
              config={playgroundConfig}
              values={playgroundValues}
              onChange={(key, value) =>
                setPlaygroundValues((current) => ({ ...current, [key]: value }))
              }
              onReset={() => setPlaygroundValues(playgroundConfig.defaults)}
            />
          </>
        ) : (
          <div className="component-doc-code-preview">
            <FullCodeBlock label={`${componentSlug}.tsx`} code={sourceCode} />
          </div>
        )}
      </div>

      <section className="component-installation">
        <h2>Installation</h2>
        <div className="installation-mode" aria-label="Installation method">
          <button
            type="button"
            aria-pressed={installMode === 'cli'}
            onClick={() => setInstallMode('cli')}
          >
            CLI
          </button>
          <button
            type="button"
            aria-pressed={installMode === 'manual'}
            onClick={() => setInstallMode('manual')}
          >
            Manual
          </button>
        </div>
        <p>
          {installMode === 'cli'
            ? 'Run the following command.'
            : usesPaperShader
              ? 'Install the exact Paper Shaders version used by this component.'
              : usesFramerMotion
                ? 'Install Framer Motion before copying the component source.'
                : 'Install the core package and React adapter, then import the component.'}
        </p>
        {installMode === 'cli' ? (
          <div className="package-command-panel">
            <div className="package-tabs" aria-label="Package manager">
              {(Object.keys(addCommands) as PackageManager[]).map((manager) => (
                <button
                  key={manager}
                  type="button"
                  aria-pressed={packageManager === manager}
                  onClick={() => setPackageManager(manager)}
                >
                  <PackageManagerIcon manager={manager} />
                  <span>{manager}</span>
                </button>
              ))}
            </div>
            <CopyCommand code={addCommands[packageManager]} />
          </div>
        ) : (
          <CodeBlock
            label="Terminal"
            code={
              usesPaperShader
                ? 'npm install --save-exact @paper-design/shaders-react@0.0.80'
                : usesFramerMotion
                  ? 'npm install framer-motion'
                  : installCommand
            }
          />
        )}
      </section>

      <section>
        <h2>Usage</h2>
        <CodeBlock label="Code" code={usage} />
      </section>

      <section>
        <h2>Props</h2>
        <div className="component-api-table">
          <table aria-label={`${name} properties`}>
            <thead>
              <tr>
                <th>Prop Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {docs.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <code>{prop.type}</code>
                  </td>
                  <td>
                    <code>{prop.defaultValue}</code>
                  </td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <ul className="component-a11y-list">
          {docs.accessibility.map((item) => (
            <li key={item}>
              <Check />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function isGettingStartedPage(view: DocView): view is GettingStartedPage {
  return gettingStartedPages.includes(view as GettingStartedPage);
}

function isComponentPage(view: DocView): view is ComponentName {
  return catalog.some((component) => component.name === view);
}

function docViewFromHash(hash: string): DocView {
  const value = hash.replace(/^#/, '');
  if (gettingStartedPages.includes(value as GettingStartedPage))
    return value as GettingStartedPage;
  if (value === 'tension-field') return 'Editorial Mosaic';
  return (
    catalog.find((component) => slug(component.name) === value)?.name ??
    'catalog'
  );
}

const useClientLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

function scrollComponentsToTop(behavior: ScrollBehavior = 'smooth') {
  document
    .querySelector<HTMLElement>(
      ".components-page-scroll > [data-slot='scroll-area-viewport']",
    )
    ?.scrollTo({ top: 0, behavior });
}

export default function ComponentsPage() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const { toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocView>('catalog');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const [sidebarIndicator, setSidebarIndicator] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const moveSidebarIndicator = useCallback((target: HTMLElement | null) => {
    const container = sidebarContentRef.current;
    if (!container || !target) {
      setSidebarIndicator((current) => ({ ...current, visible: false }));
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setSidebarIndicator({
      x: targetRect.left - containerRect.left,
      y: targetRect.top - containerRect.top,
      width: targetRect.width,
      height: targetRect.height,
      visible: true,
    });
  }, []);

  const hideSidebarIndicator = useCallback(() => {
    setSidebarIndicator((current) => ({ ...current, visible: false }));
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  useClientLayoutEffect(() => {
    const syncFromLocation = () => {
      const nextView = docViewFromHash(window.location.hash);
      setActiveDoc(nextView);
      if (nextView === 'catalog' && window.location.hash) {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}`,
        );
      }
      scrollComponentsToTop('auto');
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === 'k';

      if (isSearchShortcut) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, [openSearch]);

  useEffect(() => {
    const container = sidebarContentRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-sidebar-item]'),
    );
    const showItem = (event: Event) => {
      const item = event.currentTarget as HTMLElement;
      if (item.classList.contains('active')) hideSidebarIndicator();
      else moveSidebarIndicator(item);
    };

    items.forEach((item) => {
      item.addEventListener('pointerenter', showItem);
      item.addEventListener('focus', showItem);
      item.addEventListener('blur', hideSidebarIndicator);
    });
    container.addEventListener('pointerleave', hideSidebarIndicator);

    return () => {
      items.forEach((item) => {
        item.removeEventListener('pointerenter', showItem);
        item.removeEventListener('focus', showItem);
        item.removeEventListener('blur', hideSidebarIndicator);
      });
      container.removeEventListener('pointerleave', hideSidebarIndicator);
    };
  }, [hideSidebarIndicator, moveSidebarIndicator]);

  const visibleGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: catalog.filter(
          (component) =>
            component.category === group.name &&
            (!normalized ||
              `${component.name} ${component.description} ${component.category}`
                .toLowerCase()
                .includes(normalized)),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function openGettingStarted(page: GettingStartedPage) {
    setActiveDoc(page);
    window.history.replaceState(null, '', `#${page}`);
    window.requestAnimationFrame(() => scrollComponentsToTop());
  }

  function openComponent(name: ComponentName) {
    setActiveDoc(name);
    window.history.replaceState(null, '', `#${slug(name)}`);
    window.requestAnimationFrame(() => scrollComponentsToTop());
  }

  return (
    <ScrollArea className="components-page-scroll">
      <main className="components-page reference-layout">
        <header className="site-header components-header">
          <Link className="brand" href="/" aria-label="Nacre UI home">
            <Image
              src="/nacre-mark.png"
              alt=""
              width={22}
              height={22}
              priority
            />
            Nacre UI
          </Link>
          <nav aria-label="Primary navigation">
            <Link className="current" href="/components" aria-current="page">
              Components
            </Link>
          </nav>
          <div className="header-tools">
            <button
              className="header-search"
              type="button"
              onClick={openSearch}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K"
              aria-label="Search documentation"
            >
              <Search />
              <span>Search documentation…</span>
              <kbd aria-label="Control K or Command K">Ctrl/⌘ K</kbd>
            </button>
            <button
              className="theme-button"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle appearance"
            >
              <Sun className="theme-icon theme-icon-light" />
              <Moon className="theme-icon theme-icon-dark" />
            </button>
          </div>
        </header>

        <DocumentationSearch
          open={isSearchOpen}
          query={query}
          inputRef={searchInputRef}
          components={catalog}
          onOpenChange={(open) => {
            setIsSearchOpen(open);
            if (!open) setQuery('');
          }}
          onQueryChange={setQuery}
          onHome={() => window.location.assign('/')}
          onCatalog={() => {
            setActiveDoc('catalog');
            window.history.replaceState(
              null,
              '',
              `${window.location.pathname}${window.location.search}`,
            );
          }}
          onGettingStarted={openGettingStarted}
          onComponent={openComponent}
        />

        <div className="docs-shell">
          <aside
            className="docs-sidebar"
            aria-label="Component documentation navigation"
          >
            <ScrollArea className="docs-sidebar-scroll">
              <div className="docs-sidebar-content" ref={sidebarContentRef}>
                <div
                  className="sidebar-hover-indicator"
                  aria-hidden="true"
                  style={{
                    width: sidebarIndicator.width,
                    height: sidebarIndicator.height,
                    opacity: sidebarIndicator.visible ? 1 : 0,
                    transform: `translate3d(${sidebarIndicator.x}px, ${sidebarIndicator.y}px, 0)`,
                  }}
                />
                <div
                  className={`sidebar-section sidebar-menu getting-started-menu ${isGettingStartedPage(activeDoc) ? 'active-group' : ''}`}
                >
                  <div className="sidebar-parent" data-sidebar-item>
                    <span>
                      <BookOpen />
                      Getting started
                    </span>
                  </div>
                  <div className="sidebar-children">
                    <button
                      className={activeDoc === 'installation' ? 'active' : ''}
                      data-sidebar-item
                      type="button"
                      onClick={() => openGettingStarted('installation')}
                    >
                      Installation
                    </button>
                    <button
                      className={activeDoc === 'react-next' ? 'active' : ''}
                      data-sidebar-item
                      type="button"
                      onClick={() => openGettingStarted('react-next')}
                    >
                      React and Next.js
                    </button>
                    <button
                      className={activeDoc === 'theming' ? 'active' : ''}
                      data-sidebar-item
                      type="button"
                      onClick={() => openGettingStarted('theming')}
                    >
                      Theming
                    </button>
                    <button
                      className={activeDoc === 'cli' ? 'active' : ''}
                      data-sidebar-item
                      type="button"
                      onClick={() => openGettingStarted('cli')}
                    >
                      CLI
                    </button>
                  </div>
                </div>

                {groups.map((group) => {
                  const GroupIcon = groupIcons[group.name];
                  const isActive =
                    isComponentPage(activeDoc) &&
                    catalog.find((component) => component.name === activeDoc)
                      ?.category === group.name;

                  return (
                    <div
                      className={`sidebar-section sidebar-menu ${isActive ? 'active-group' : ''}`}
                      key={group.name}
                    >
                      <div className="sidebar-parent" data-sidebar-item>
                        <span>
                          <GroupIcon />
                          {group.name}
                        </span>
                      </div>
                      <div className="sidebar-children">
                        {catalog
                          .filter(
                            (component) => component.category === group.name,
                          )
                          .map((component) => (
                            <button
                              className={
                                activeDoc === component.name ? 'active' : ''
                              }
                              data-sidebar-item
                              key={component.name}
                              type="button"
                              onClick={() => openComponent(component.name)}
                            >
                              {component.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}

                <div className="sidebar-follow">
                  <span>Release 0.1</span>
                  <strong>{catalog.length} components</strong>
                  <small>React / Next.js ready</small>
                </div>
              </div>
            </ScrollArea>
          </aside>

          <div className="docs-content">
            {activeDoc === 'catalog' ? (
              <>
                <section className="components-hero">
                  <span>Component catalogue</span>
                  <h1>
                    Browse the Nacre UI
                    <br />
                    component library.
                  </h1>
                  <p>
                    Pick a category, open a component, try the preview, then
                    copy the install command or continue into its API reference.
                  </p>
                  <div className="components-hero-actions">
                    <button
                      type="button"
                      onClick={() => openComponent('Button')}
                    >
                      Start with Button
                    </button>
                    <button
                      type="button"
                      onClick={copyInstall}
                      aria-live="polite"
                    >
                      {copied ? <Check /> : <Code2 />}
                      {copied ? 'Copied' : 'Copy CLI install'}
                    </button>
                  </div>
                </section>

                <section
                  id="catalogue-summary"
                  className="components-summary"
                  aria-label="Catalogue summary"
                >
                  <div>
                    <strong>{String(catalog.length).padStart(2, '0')}</strong>
                    <span>components</span>
                  </div>
                  <div>
                    <strong>{String(groups.length).padStart(2, '0')}</strong>
                    <span>families</span>
                  </div>
                  <div>
                    <strong>AAA</strong>
                    <span>contrast target</span>
                  </div>
                  <div className="summary-command">
                    <code>{installCommand}</code>
                    <button
                      type="button"
                      onClick={copyInstall}
                      aria-label="Copy installation command"
                    >
                      {copied ? <Check /> : <Copy />}
                    </button>
                  </div>
                  <p className="sr-only" aria-live="polite">
                    {copied ? 'Installation command copied' : ''}
                  </p>
                </section>

                {visibleGroups.length ? (
                  visibleGroups.map((group) => (
                    <section
                      className="component-group"
                      id={slug(group.name)}
                      key={group.name}
                    >
                      <div className="group-heading">
                        <div>
                          <h2>{group.name}</h2>
                          <p>{group.description}</p>
                        </div>
                        <span>
                          {String(group.items.length).padStart(2, '0')}{' '}
                          components
                        </span>
                      </div>
                      <div className="reference-card-grid">
                        {group.items.map((component) => (
                          <article
                            id={slug(component.name)}
                            className="reference-component-card"
                            key={component.name}
                          >
                            <CatalogueComponentPreview name={component.name} />
                            <button
                              className="component-card-link"
                              type="button"
                              onClick={() => openComponent(component.name)}
                            >
                              <div>
                                <h3>{component.name}</h3>
                                <p>{component.description}</p>
                              </div>
                              <span
                                className={`catalog-status ${component.status.toLowerCase()}`}
                              >
                                <i />
                                {component.status}
                              </span>
                              <ArrowRight />
                            </button>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))
                ) : (
                  <div className="catalog-empty">
                    <Search />
                    <h2>No components found</h2>
                    <p>Try a different component name.</p>
                    <button type="button" onClick={() => setQuery('')}>
                      Clear search
                    </button>
                  </div>
                )}
              </>
            ) : isGettingStartedPage(activeDoc) ? (
              <GettingStartedContent page={activeDoc} />
            ) : isComponentPage(activeDoc) ? (
              <ComponentContent key={activeDoc} name={activeDoc} />
            ) : null}

            <footer>
              <div className="brand">
                <Image src="/nacre-mark.png" alt="" width={22} height={22} />
                Nacre UI
              </div>
              <p>Source-based React components for product interfaces.</p>
              <nav aria-label="Footer navigation">
                <Link href="/components">Components</Link>
                <Link href="https://github.com/johnmamanao/nacre-ui">
                  GitHub
                </Link>
                <Link href="https://github.com/johnmamanao/nacre-ui/issues/new?template=component-request.yml">
                  Request a component
                </Link>
              </nav>
              <small>© 2026</small>
            </footer>
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}
