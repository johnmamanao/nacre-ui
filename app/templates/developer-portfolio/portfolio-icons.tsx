import {
  siAuth0,
  siCanvas,
  siChartdotjs,
  siContentful,
  siCss,
  siDocker,
  siElectron,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleanalytics,
  siGooglesearchconsole,
  siGraphql,
  siJavascript,
  siMailchimp,
  siMapbox,
  siMdnwebdocs,
  siMdx,
  siNextdotjs,
  siNodedotjs,
  siOpenaigym,
  siOpenapiinitiative,
  siPostgresql,
  siPwa,
  siReact,
  siSanity,
  siSimpleicons,
  siSqlite,
  siStorybook,
  siStripe,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siVitest,
  siWebgl,
  type SimpleIcon,
} from 'simple-icons';

import styles from './portfolio.module.css';

type BrandIcon = Pick<SimpleIcon, 'hex' | 'path'>;
type IconDefinition = { icon: BrandIcon; color?: string };

const linkedinIcon: BrandIcon = {
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM3.56 9h3.558v11.452H3.56V9zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',
};

const iconDefinitions: Array<[RegExp, IconDefinition]> = [
  [/github actions/i, { icon: siGithubactions }],
  [/linkedin/i, { icon: linkedinIcon }],
  [/next\.js|nextjs/i, { icon: siNextdotjs, color: '#8b5cf6' }],
  [/typescript/i, { icon: siTypescript }],
  [/javascript/i, { icon: siJavascript }],
  [/react/i, { icon: siReact }],
  [/electron/i, { icon: siElectron, color: '#7dd3fc' }],
  [/postgres/i, { icon: siPostgresql }],
  [/sqlite|indexeddb/i, { icon: siSqlite, color: '#22a6d5' }],
  [/node\.js|nodejs/i, { icon: siNodedotjs }],
  [/graphql/i, { icon: siGraphql }],
  [/rest api|\bapi\b/i, { icon: siOpenapiinitiative }],
  [/figma/i, { icon: siFigma }],
  [/design system/i, { icon: siStorybook }],
  [/prototyping|motion/i, { icon: siFramer }],
  [/accessibility/i, { icon: siMdnwebdocs, color: '#06b6d4' }],
  [/seo|search/i, { icon: siGooglesearchconsole }],
  [/analytics/i, { icon: siGoogleanalytics }],
  [/chart/i, { icon: siChartdotjs }],
  [/testing/i, { icon: siTestinglibrary }],
  [/evaluation/i, { icon: siVitest }],
  [/contentful|\bcms\b/i, { icon: siContentful }],
  [/sanity/i, { icon: siSanity, color: '#f36458' }],
  [/vercel|deploy/i, { icon: siVercel, color: '#ec4899' }],
  [/github/i, { icon: siGithub, color: '#a78bfa' }],
  [/\bgit\b/i, { icon: siGit }],
  [/docker/i, { icon: siDocker }],
  [/stripe/i, { icon: siStripe }],
  [/pwa/i, { icon: siPwa }],
  [/map/i, { icon: siMapbox, color: '#3b82f6' }],
  [/canvas/i, { icon: siCanvas }],
  [/webgl/i, { icon: siWebgl, color: '#ef4444' }],
  [/auth/i, { icon: siAuth0 }],
  [/mdx/i, { icon: siMdx, color: '#f59e0b' }],
  [/mail/i, { icon: siMailchimp }],
  [
    /openai|embedding|retrieval|\bai\b/i,
    { icon: siOpenaigym, color: '#10b981' },
  ],
  [/css/i, { icon: siCss }],
];

function iconFor(name: string): IconDefinition {
  return (
    iconDefinitions.find(([pattern]) => pattern.test(name))?.[1] ?? {
      icon: siSimpleicons,
      color: '#f43f5e',
    }
  );
}

export function TechIcon({ name }: { name: string }) {
  const definition = iconFor(name);
  const color = definition.color ?? `#${definition.icon.hex}`;
  return (
    <span className={styles.techIcon} style={{ color }}>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d={definition.icon.path} fill="currentColor" />
      </svg>
    </span>
  );
}

export function BrandMark({ name }: { name: string }) {
  const definition = iconFor(name);
  const color = definition.color ?? `#${definition.icon.hex}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" style={{ color }}>
      <path d={definition.icon.path} fill="currentColor" />
    </svg>
  );
}

export function VerifiedBadge() {
  return (
    <svg
      className={styles.verifiedBadge}
      viewBox="0 0 24 24"
      aria-label="Verified"
    >
      <path
        fill="currentColor"
        d="m23 12-2.44-2.79.34-3.69-3.61-.82L15.4 1.5 12 2.96 8.6 1.5 6.71 4.69 3.1 5.51l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.81 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12Z"
      />
      <path
        fill="white"
        d="m10.1 16.2-3.3-3.3 1.4-1.4 1.9 1.9 5.7-5.7 1.4 1.4-7.1 7.1Z"
      />
    </svg>
  );
}
