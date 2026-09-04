import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Components — Nacre UI',
  description:
    'Browse accessible Nacre UI primitives for React, Next.js, and the web platform.',
};

export default function ComponentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
