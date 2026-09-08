'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Layers3,
  Moon,
  Sun,
  Terminal,
} from 'lucide-react';

import { FacetBloomLoader } from '@/components/ui/facet-bloom-loader';
import { FolioArcCarousel } from '@/components/ui/folio-arc-carousel';
import { GemSmokeButton } from '@/components/ui/gem-smoke-button';
import { HaloDock } from '@/components/ui/halo-dock';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { PhaseWeaveText } from '@/components/ui/phase-weave-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolchainMarquee } from '@/components/ui/toolchain-marquee';
import { useTheme } from '@/lib/use-theme';
import { GithubStarButton } from './github-star-button';
import { SiteEntryLoader } from './site-entry-loader';
import { ChangelogUpdate } from './changelog-update';

export default function Home() {
  const { isDark, setTheme, toggleTheme } = useTheme();
  const [installCopied, setInstallCopied] = useState(false);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText('npm install @nacre-ui/cli');
    setInstallCopied(true);
    window.setTimeout(() => setInstallCopied(false), 1600);
  }

  return (
    <ScrollArea className="landing-page-scroll">
      <SiteEntryLoader />
      <main id="top" className="home-page">
        <div className="home-hero-shell">
          <header className="site-header home-header">
            <a className="brand" href="#top" aria-label="Nacre UI home">
              <Image
                src="/nacre-mark.png"
                alt=""
                width={22}
                height={22}
                priority
              />
              Nacre UI
            </a>
            <div className="home-header-release">
              <ChangelogUpdate />
            </div>
            <div className="header-tools">
              <GithubStarButton />
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

          <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero-copy">
              <div className="hero-wordmark-meta" aria-hidden="true">
                <span>Source collection</span>
                <span>React / TypeScript</span>
              </div>
              <h1 id="home-title" aria-label="Nacre UI">
                <span
                  className="hero-wordmark-name"
                  data-word="NACRE"
                  aria-hidden="true"
                >
                  NACRE
                </span>
                <span className="hero-wordmark-index" aria-hidden="true">
                  <strong>UI</strong>
                </span>
              </h1>
              <p>
                Editable React and Next.js components you install as TypeScript
                source. Try each one in a live preview, tune its parameters, and
                copy the implementation into your project.
              </p>
              <div className="home-hero-actions">
                <Link href="/components">
                  <Layers3 /> Browse components
                </Link>
                <button
                  className="hero-install-command"
                  type="button"
                  onClick={copyInstallCommand}
                  aria-label={
                    installCopied
                      ? 'Installation command copied'
                      : 'Copy npm installation command'
                  }
                >
                  <span aria-hidden="true">~</span>
                  <code>npm install @nacre-ui/cli</code>
                  {installCopied ? <Check /> : <Copy />}
                </button>
              </div>
            </div>

            <section
              className="hero-live-stage"
              aria-labelledby="hero-live-title"
            >
              <div className="hero-stage-heading">
                <span>From the collection</span>
                <strong id="hero-live-title">
                  Three components, running live
                </strong>
              </div>

              <div className="hero-float hero-float-metal">
                <small>Liquid Metal Button</small>
                <LiquidMetalButton>Enter studio</LiquidMetalButton>
              </div>

              <div className="hero-float hero-float-smoke">
                <small>Gem Smoke Button</small>
                <GemSmokeButton>Reveal collection</GemSmokeButton>
              </div>

              <div className="hero-float hero-float-loader">
                <small>Facet Bloom Loader</small>
                <FacetBloomLoader
                  accent="currentColor"
                  aria-label="Preparing preview"
                  label="Preparing preview"
                  size={54}
                  speed={1900}
                />
              </div>
            </section>
          </section>
        </div>

        <section
          id="featured"
          className="collection-showcase"
          aria-labelledby="collection-showcase-title"
        >
          <header className="collection-intro">
            <div>
              <span>Featured components</span>
              <h2 id="collection-showcase-title">Try the components here.</h2>
            </div>
            <div>
              <p>
                A wider look at the collection—from spatial layouts to animated
                type and compact interface patterns.
              </p>
              <Link href="/components">
                View all components <ArrowRight />
              </Link>
            </div>
          </header>

          <div className="collection-folio">
            <div className="collection-folio-bar">
              <div>
                <span>Carousel</span>
                <strong>Folio Arc Carousel</strong>
              </div>
              <Link href="/components#folio-arc-carousel">
                View component <ArrowRight />
              </Link>
            </div>
            <div className="collection-folio-stage">
              <FolioArcCarousel
                arc={15}
                autoPlay
                autoPlayInterval={4800}
                cardWidth={224}
                defaultActiveIndex={2}
                depth={96}
                spacing={168}
              />
            </div>
          </div>

          <div className="collection-shelf">
            <article className="collection-shelf-piece collection-shelf-type">
              <header>
                <span>Text &amp; motion</span>
                <Link href="/components#phase-weave-text">Phase Weave</Link>
              </header>
              <PhaseWeaveText
                interval={2400}
                words={['Clarity', 'Rhythm', 'Focus']}
              />
            </article>

            <article className="collection-shelf-piece collection-shelf-dock">
              <header>
                <span>Interaction</span>
                <Link href="/components#halo-dock">Halo Dock</Link>
              </header>
              <HaloDock magnification={68} size={44} />
            </article>

            <article className="collection-shelf-piece collection-shelf-tools">
              <header>
                <span>Motion system</span>
                <Link href="/components#toolchain-marquee">
                  Toolchain Marquee
                </Link>
              </header>
              <ToolchainMarquee duration={26} rows={3} />
            </article>
          </div>
        </section>

        <section className="home-cta" aria-labelledby="home-cta-title">
          <div className="home-cta-mark" aria-hidden="true">
            <Image src="/nacre-mark.png" alt="" width={112} height={112} />
          </div>

          <div className="home-cta-copy">
            <span className="home-cta-kicker">Open collection · 55 pieces</span>
            <h2 id="home-cta-title">Start with source. End with yours.</h2>
            <p>
              Choose a component, copy the TypeScript, then tune every detail
              until it belongs completely to your product.
            </p>
          </div>

          <div className="home-cta-utility">
            <button
              className="home-cta-command"
              type="button"
              onClick={copyInstallCommand}
              aria-label={
                installCopied
                  ? 'Installation command copied'
                  : 'Copy npm installation command'
              }
            >
              <Terminal aria-hidden="true" />
              <code>npm install @nacre-ui/cli</code>
              <span>{installCopied ? 'Copied' : 'Copy'}</span>
              {installCopied ? <Check /> : <Copy />}
            </button>

            <div className="home-cta-actions">
              <Link href="/components">
                Explore all components <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/components#installation">Read installation</Link>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <div className="home-footer-inner">
            <div className="footer-intro">
              <div className="brand">
                <Image src="/nacre-mark.png" alt="" width={22} height={22} />
                Nacre UI
              </div>
              <p>
                React components with interactive previews, copyable source, and
                editable preview controls.
              </p>
            </div>

            <nav className="footer-columns" aria-label="Footer navigation">
              <div>
                <span>Collection</span>
                <Link href="/components">All components</Link>
                <Link href="/components#liquid-metal-button">Actions</Link>
                <Link href="/components#horizon-page-loader">Loaders</Link>
                <Link href="/components#tidal-type-text">
                  Text &amp; Motion
                </Link>
                <Link href="/components#editorial-mosaic">Interactions</Link>
                <Link href="/components#mesh-background">Backgrounds</Link>
              </div>
              <div>
                <span>Docs</span>
                <Link href="/components#installation">Installation</Link>
                <Link href="/components#react-next">React and Next.js</Link>
                <Link href="/components#theming">Theming</Link>
                <Link href="/components#cli">CLI</Link>
              </div>
            </nav>
          </div>

          <div className="footer-bottom">
            <small>© 2026 Nacre UI. All rights reserved.</small>
            <div className="footer-utility">
              <Link href="https://github.com/johnmamanao/nacre-ui">GitHub</Link>
              <Link href="https://github.com/johnmamanao/nacre-ui/issues/new?template=component-request.yml">
                Request a component
              </Link>
              <span>React · Next.js · TypeScript</span>
              <fieldset className="footer-appearance">
                <legend className="sr-only">Appearance</legend>
                <button
                  className="light-appearance"
                  type="button"
                  onClick={() => setTheme(false)}
                  aria-label="Use light appearance"
                  aria-pressed={!isDark}
                >
                  <Sun />
                </button>
                <button
                  className="dark-appearance"
                  type="button"
                  onClick={() => setTheme(true)}
                  aria-label="Use dark appearance"
                  aria-pressed={isDark}
                >
                  <Moon />
                </button>
              </fieldset>
            </div>
          </div>
        </footer>
      </main>
    </ScrollArea>
  );
}
