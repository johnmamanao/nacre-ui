import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nacre UI — Interfaces with quiet confidence',
  description:
    'A production-ready Web Component library inspired by Apple HIG, built for React, Next.js, and the modern web.',
  openGraph: {
    title: 'Nacre UI — Interfaces with quiet confidence',
    description: 'Accessible Web Components for React, Next.js, and the modern web.',
    type: 'website',
    images: [{ url: '/og.png', width: 1672, height: 943, alt: 'Nacre UI component library' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nacre UI — Interfaces with quiet confidence',
    description: 'Accessible Web Components for React, Next.js, and the modern web.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
