'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Layers3,
  Moon,
  Sun,
  Terminal,
} from 'lucide-react';

import { FacetBloomLoader } from '@/components/ui/facet-bloom-loader';
import { GemSmokeButton } from '@/components/ui/gem-smoke-button';
import { HaloDock } from '@/components/ui/halo-dock';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { PhaseWeaveText } from '@/components/ui/phase-weave-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolchainMarquee } from '@/components/ui/toolchain-marquee';
import { useTheme } from '@/lib/use-theme';
import { ChangelogUpdate } from './changelog-update';
import { GithubStarButton } from './github-star-button';
import styles from './landing-story.module.css';

const installCommand = 'npm install @nacre-ui/cli';

export default function Home() {
  const { isDark, setTheme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const revealGroups = new Map<Element, HTMLElement[]>();

    elements.forEach((element) => {
      const trigger = element.parentElement ?? element;
      revealGroups.set(trigger, [
        ...(revealGroups.get(trigger) ?? []),
        element,
      ]);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealGroups.get(entry.target)?.forEach((element) => {
            element.dataset.visible = 'true';
          });
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    revealGroups.forEach((_, trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <ScrollArea className="landing-page-scroll">
      <main id="top" className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.brandCluster}>
              <a
                className={styles.brand}
                href="#top"
                aria-label="Nacre UI home"
              >
                <Image
                  src="/nacre-mark.png"
                  alt=""
                  width={22}
                  height={22}
                  priority
                />
                <span>Nacre UI</span>
              </a>
              <ChangelogUpdate />
            </div>
            <nav className={styles.nav} aria-label="Primary navigation">
              <a href="#story">The process</a>
              <Link href="/components">Components</Link>
              <Link href="/templates">Templates</Link>
            </nav>
            <div className={styles.headerTools}>
              <GithubStarButton />
              <button
                className={styles.iconButton}
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle appearance"
              >
                {isDark ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroMeta} aria-hidden="true">
            <span>Source collection</span>
            <span>React / TypeScript</span>
          </div>
          <h1 id="hero-title" aria-label="Nacre UI">
            <span className={styles.heroWord} aria-hidden="true">
              NACRE
            </span>
            <span className={styles.heroIndex} aria-hidden="true">
              UI
            </span>
          </h1>
          <p className={styles.heroCopy}>
            Editable React and Next.js components you install as TypeScript
            source. Try each one live, tune its parameters, and make the
            implementation yours.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/components">
              <Layers3 /> Browse components
            </Link>
            <button
              className={styles.command}
              type="button"
              onClick={copyInstallCommand}
              aria-label={
                copied
                  ? 'Installation command copied'
                  : 'Copy installation command'
              }
            >
              <span aria-hidden="true">~</span>
              <code>{installCommand}</code>
              {copied ? <Check /> : <Copy />}
            </button>
          </div>
          <a className={styles.scrollCue} href="#story">
            See how it works <ArrowDown />
          </a>
        </section>

        <section
          id="story"
          className={styles.prologue}
          aria-labelledby="story-title"
        >
          <div className={styles.prologueInner} data-reveal data-motion="clip">
            <p className={styles.kicker}>
              A component library should show its work
            </p>
            <h2 id="story-title">
              See the idea.
              <br />
              Touch the details.
              <br />
              Keep the source.
            </h2>
          </div>
        </section>

        <article className={`${styles.chapter} ${styles.discoverChapter}`}>
          <div className={styles.chapterInner}>
            <div
              className={styles.chapterCopy}
              data-reveal
              data-motion="discover-copy"
            >
              <p className={styles.kicker}>Meet it in motion</p>
              <h2>First, find the feeling.</h2>
              <p>
                Components are easier to understand when they are running.
                Explore the motion, texture, and interaction before reading a
                line of code.
              </p>
              <Link href="/components">
                Explore all components <ArrowRight />
              </Link>
            </div>
            <div
              className={styles.typeStage}
              data-reveal
              data-motion="discover-stage"
            >
              <div className={styles.stageLabel}>
                <span>Phase Weave</span>
                <span>Live type</span>
              </div>
              <PhaseWeaveText
                interval={2400}
                words={['Clarity', 'Rhythm', 'Character']}
              />
              <p className={styles.stageCaption}>
                Every preview is the real component.
              </p>
            </div>
          </div>
        </article>

        <article className={`${styles.chapter} ${styles.tuneChapter}`}>
          <div className={styles.chapterInner}>
            <div
              className={styles.dockStage}
              data-reveal
              data-motion="tune-stage"
            >
              <div className={styles.stageLabel}>
                <span>Halo Dock</span>
                <span>Interactive</span>
              </div>
              <HaloDock magnification={68} size={44} />
              <div className={styles.parameterLine}>
                <span>size</span>
                <code>44</code>
                <span>magnification</span>
                <code>68</code>
              </div>
            </div>
            <div
              className={styles.chapterCopy}
              data-reveal
              data-motion="tune-copy"
            >
              <p className={styles.kicker}>Tune it in context</p>
              <h2>The demo is the documentation.</h2>
              <p>
                Change the useful parameters, test the response, and arrive at a
                starting point that already belongs in your product.
              </p>
              <Link href="/components#halo-dock">
                Open the interactive demo <ArrowRight />
              </Link>
            </div>
          </div>
        </article>

        <article className={`${styles.chapter} ${styles.ownChapter}`}>
          <div className={styles.chapterInner}>
            <div
              className={styles.chapterCopy}
              data-reveal
              data-motion="own-copy"
            >
              <p className={styles.kicker}>Take it home</p>
              <h2>No package-shaped black box.</h2>
              <p>
                The CLI writes clean TypeScript into your repository. Read it,
                reshape it, and ship it without a runtime dependency on Nacre.
              </p>
              <Link href="/components#installation">
                Read installation <ArrowRight />
              </Link>
            </div>
            <div
              className={styles.sourceStage}
              data-reveal
              data-motion="own-stage"
            >
              <div className={styles.sourceTopbar}>
                <span>terminal</span>
                <span>nacre / add</span>
              </div>
              <div className={styles.codeLine}>
                <span>$</span>
                <code>npx @nacre-ui/cli add liquid-metal-button</code>
              </div>
              <div className={styles.fileTree}>
                <span>components</span>
                <span>└─ ui</span>
                <strong>└─ liquid-metal-button.tsx</strong>
              </div>
              <div className={styles.added}>
                <Check />
                <span>Source added. It is yours now.</span>
              </div>
            </div>
          </div>
        </article>

        <section
          className={styles.collection}
          aria-labelledby="collection-title"
        >
          <header
            className={styles.collectionHeader}
            data-reveal
            data-motion="clip"
          >
            <div>
              <p className={styles.kicker}>Selected from the collection</p>
              <h2 id="collection-title">Pieces with presence.</h2>
            </div>
            <Link href="/components">
              View all 55 <ArrowRight />
            </Link>
          </header>
          <div className={styles.mosaic} data-reveal data-motion="stagger">
            <Link
              className={`${styles.mosaicItem} ${styles.metalPiece}`}
              href="/components#liquid-metal-button"
            >
              <span>01 / Actions</span>
              <div>
                <LiquidMetalButton>Enter studio</LiquidMetalButton>
              </div>
              <strong>
                Liquid Metal Button <ArrowRight />
              </strong>
            </Link>
            <Link
              className={`${styles.mosaicItem} ${styles.smokePiece}`}
              href="/components#gem-smoke-button"
            >
              <span>02 / Actions</span>
              <div>
                <GemSmokeButton>Reveal collection</GemSmokeButton>
              </div>
              <strong>
                Gem Smoke Button <ArrowRight />
              </strong>
            </Link>
            <Link
              className={`${styles.mosaicItem} ${styles.loaderPiece}`}
              href="/components#facet-bloom-loader"
            >
              <span>03 / Loaders</span>
              <div>
                <FacetBloomLoader
                  accent="currentColor"
                  label="Composing"
                  size={64}
                  speed={2100}
                />
              </div>
              <strong>
                Facet Bloom Loader <ArrowRight />
              </strong>
            </Link>
            <Link
              className={`${styles.mosaicItem} ${styles.toolsPiece}`}
              href="/components#toolchain-marquee"
            >
              <span>04 / Motion systems</span>
              <div>
                <ToolchainMarquee duration={28} rows={3} />
              </div>
              <strong>
                Toolchain Marquee <ArrowRight />
              </strong>
            </Link>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-title">
          <div data-reveal data-motion="clip">
            <p className={styles.kicker}>Open collection · 55 pieces</p>
            <h2 id="final-title">
              Start with source.
              <br />
              End with yours.
            </h2>
            <div className={styles.finalActions}>
              <Link className={styles.primaryAction} href="/components">
                Explore the collection <ArrowRight />
              </Link>
              <button
                className={styles.command}
                type="button"
                onClick={copyInstallCommand}
              >
                <Terminal />
                <code>{copied ? 'Copied to clipboard' : installCommand}</code>
                {copied ? <Check /> : <Copy />}
              </button>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerMain}>
            <div className={styles.footerIntro}>
              <div className={styles.brand}>
                <Image src="/nacre-mark.png" alt="" width={22} height={22} />
                <span>Nacre UI</span>
              </div>
              <p>
                Unusually crafted React components, delivered as editable
                source.
              </p>
            </div>
            <nav className={styles.footerLinks} aria-label="Footer navigation">
              <div>
                <span>Explore</span>
                <Link href="/components">Components</Link>
                <Link href="/templates">Templates</Link>
                <Link href="/components#installation">Installation</Link>
              </div>
              <div>
                <span>Connect</span>
                <Link href="https://github.com/johnmamanao/nacre-ui">
                  GitHub
                </Link>
                <Link href="https://github.com/johnmamanao/nacre-ui/issues/new?template=component-request.yml">
                  Request a component
                </Link>
              </div>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <small>© 2026 Nacre UI. Open source, made with care.</small>
            <fieldset className={styles.appearance}>
              <legend className="sr-only">Appearance</legend>
              <button
                type="button"
                onClick={() => setTheme(false)}
                aria-pressed={!isDark}
              >
                <Sun /> Light
              </button>
              <button
                type="button"
                onClick={() => setTheme(true)}
                aria-pressed={isDark}
              >
                <Moon /> Dark
              </button>
            </fieldset>
          </div>
        </footer>
      </main>
    </ScrollArea>
  );
}
