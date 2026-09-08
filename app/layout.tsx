import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://nacre-ui.johnmamanao.com';
const siteDescription =
  'Nacre UI is an open-source React and Next.js component library with editable TypeScript source, live previews, accessible motion, and polished animations.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Nacre UI',
  title: {
    default: 'Nacre UI — Animated React Components for Next.js',
    template: '%s | Nacre UI',
  },
  description: siteDescription,
  keywords: [
    'React components',
    'Next.js components',
    'animated React components',
    'TypeScript UI components',
    'copy paste React components',
    'accessible UI components',
    'React animation library',
    'open source component library',
  ],
  category: 'technology',
  creator: 'Nacre UI',
  publisher: 'Nacre UI',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/nacre-mark.png', type: 'image/png' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nacre UI — Animated React Components for Next.js',
    description: siteDescription,
    type: 'website',
    url: '/',
    siteName: 'Nacre UI',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 943,
        alt: 'Nacre UI component library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nacre UI — Animated React Components for Next.js',
    description: siteDescription,
    images: ['/og.png'],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nacre UI',
    url: siteUrl,
    description: siteDescription,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nacre UI',
    url: siteUrl,
    description: siteDescription,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    softwareVersion: '0.3.0',
    downloadUrl: 'https://www.npmjs.com/package/@nacre-ui/cli',
    license: 'https://opensource.org/license/mit',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    sameAs: [
      'https://github.com/johnmamanao/nacre-ui',
      'https://www.npmjs.com/package/@nacre-ui/cli',
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          id="nacre-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <script
          id="nacre-theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('nacre-theme');var dark=saved===null||saved==='dark';document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';}catch(error){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
        <script
          id="nacre-entry-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.dataset.nacreEntry=location.pathname==='/'?'pending':'seen';})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
