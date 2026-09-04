import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nacre-ui.johnmamanao.com'),
  title: 'Nacre UI — React components for expressive interfaces',
  description:
    'A source-based React component collection with live previews, configurable interactions, and accessible motion.',
  icons: {
    icon: [{ url: '/nacre-mark.png', type: 'image/png' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nacre UI — React components for expressive interfaces',
    description:
      'Source-based React components with live previews, configurable interactions, and accessible motion.',
    type: 'website',
    url: '/',
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
    title: 'Nacre UI — React components for expressive interfaces',
    description:
      'Source-based React components with live previews, configurable interactions, and accessible motion.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          id="nacre-theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('nacre-theme');var dark=saved===null||saved==='dark';document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';}catch(error){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
