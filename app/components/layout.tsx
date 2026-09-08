import type { Metadata } from 'next';

const componentsUrl = 'https://nacre-ui.johnmamanao.com/components';
const componentsDescription =
  'Browse 55 copy-paste React and Next.js components: animated buttons, loaders, text effects, interactions, and backgrounds with editable TypeScript source.';

export const metadata: Metadata = {
  title: 'Animated React Components & UI Effects',
  description: componentsDescription,
  alternates: {
    canonical: '/components',
  },
  openGraph: {
    title: 'Animated React Components & UI Effects — Nacre UI',
    description: componentsDescription,
    type: 'website',
    url: '/components',
    siteName: 'Nacre UI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animated React Components & UI Effects — Nacre UI',
    description: componentsDescription,
  },
};

const collectionStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nacre UI React Component Library',
  url: componentsUrl,
  description: componentsDescription,
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Nacre UI',
    url: 'https://nacre-ui.johnmamanao.com',
  },
  about: [
    'React components',
    'Next.js components',
    'TypeScript UI components',
    'Accessible web animation',
  ],
};

export default function ComponentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        id="nacre-components-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      {children}
    </>
  );
}
