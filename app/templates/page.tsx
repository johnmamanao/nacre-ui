import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import styles from './templates.module.css';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Complete, responsive website templates from Nacre UI.',
};

export default function TemplatesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Nacre UI
        </Link>
        <Link href="/components">Components</Link>
      </header>

      <section className={styles.intro}>
        <span>Templates / 01</span>
        <h1>Complete starting points.</h1>
        <p>
          Responsive pages with the structure, polish, and edge cases already
          considered. Replace the sample content and make them yours.
        </p>
      </section>

      <Link href="/templates/developer-portfolio" className={styles.card}>
        <div className={styles.preview} aria-hidden="true">
          <div className={styles.previewNav} />
          <div className={styles.previewHero}>
            <i />
            <div>
              <b />
              <b />
              <b />
            </div>
          </div>
          <div className={styles.previewGrid}>
            <i />
            <i />
          </div>
        </div>
        <div className={styles.cardCopy}>
          <div>
            <span>Portfolio</span>
            <h2>Developer Portfolio</h2>
            <p>
              A compact, information-rich portfolio for independent developers
              and technical creatives.
            </p>
          </div>
          <ArrowUpRight />
        </div>
      </Link>
    </main>
  );
}
