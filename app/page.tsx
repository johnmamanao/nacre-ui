'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Accessibility,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  Copy,
  Layers3,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const installCommand = 'npm install @nacre-ui/elements @nacre-ui/react';

const componentCatalog = [
  ['Button', 'Actions', '05 variants'],
  ['Card', 'Surfaces', '04 materials'],
  ['Input', 'Forms', 'Form ready'],
  ['Modal', 'Overlays', 'Focus safe'],
  ['Switch', 'Selection', 'Touch ready'],
  ['Tabs', 'Navigation', 'Arrow keys'],
  ['Dropdown', 'Overlays', 'Typeahead'],
  ['Segmented', 'Selection', 'Single value'],
  ['Sidebar', 'Navigation', 'Responsive'],
] as const;

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function toggleTheme(checked: boolean) {
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Nacre UI home">
          <span className="brand-glyph" aria-hidden="true"><span /></span>
          <span>Nacre UI</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <a className="nav-link" href="#components">Components</a>
          <a className="nav-link" href="#tokens">Tokens</a>
          <a className="nav-link" href="#principles">Principles</a>
          <a className="nav-link" href="#docs">Docs</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="search-trigger hidden sm:flex" type="button" aria-label="Search documentation">
            <Command className="size-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={isDark ? 'Use light appearance' : 'Use dark appearance'}
            onClick={() => toggleTheme(!isDark)}
          >
            {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <a className="icon-button" href="https://github.com" aria-label="View Nacre UI on GitHub">
            <Code2 className="size-4" />
          </a>
        </div>
      </header>

      <section id="top" className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow-pill">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Web Components, refined for the modern web
          </div>

          <h1 className="hero-title">
            Interfaces with
            <span>quiet confidence.</span>
          </h1>

          <p className="hero-description">
            A production-ready component system inspired by Apple&apos;s clarity,
            depth, and restraint. Accessible by default. Framework-neutral at its core.
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href="#components">
              Explore components
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a className="secondary-cta" href="#docs">
              Read the docs
              <ChevronRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="install-command" aria-label="Install Nacre UI">
            <span className="prompt" aria-hidden="true">$</span>
            <code>{installCommand}</code>
            <Button
              variant="ghost"
              size="icon"
              className="copy-button"
              onClick={copyInstall}
              aria-label="Copy install command"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
          <p className="sr-only" aria-live="polite">{copied ? 'Install command copied' : ''}</p>

          <div className="hero-proof" aria-label="Library highlights">
            <span><Check className="size-3.5" /> WCAG AAA target</span>
            <span><Check className="size-3.5" /> SSR ready</span>
            <span><Check className="size-3.5" /> Zero styling runtime</span>
          </div>
        </div>

        <div className="showcase-stage" aria-label="Interactive component preview">
          <div className="stage-glow" aria-hidden="true" />
          <div className="workbench glass-panel">
            <div className="workbench-header">
              <div>
                <p className="micro-label">Component workbench</p>
                <h2>Appearance</h2>
              </div>
              <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
            </div>

            <Tabs defaultValue="preview" className="workbench-tabs">
              <TabsList className="segmented-list">
                <TabsTrigger value="preview" className="segmented-trigger">Preview</TabsTrigger>
                <TabsTrigger value="anatomy" className="segmented-trigger">Anatomy</TabsTrigger>
                <TabsTrigger value="code" className="segmented-trigger">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="preview-canvas">
                <div className="preview-card">
                  <div className="preview-card-top">
                    <div className="component-icon"><Layers3 className="size-5" /></div>
                    <span className="status-pill"><CircleDot className="size-3" /> Stable</span>
                  </div>
                  <div>
                    <p className="micro-label">Surface / Regular</p>
                    <h3>Thoughtful defaults.<br />Room to make it yours.</h3>
                  </div>
                  <div className="preview-field">
                    <label htmlFor="preview-email">Email address</label>
                    <input id="preview-email" type="email" placeholder="hello@example.com" />
                  </div>
                  <div className="setting-row">
                    <div>
                      <strong>Product updates</strong>
                      <span>Occasional release notes</span>
                    </div>
                    <Switch defaultChecked aria-label="Product updates" />
                  </div>
                  <div className="preview-actions">
                    <button type="button" className="preview-secondary">Not now</button>
                    <button type="button" className="preview-primary">Continue <ArrowRight className="size-4" /></button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="anatomy" className="preview-canvas anatomy-canvas">
                <div className="anatomy-line"><span>01</span><p>Semantic host</p><code>&lt;nacre-card&gt;</code></div>
                <div className="anatomy-line"><span>02</span><p>Named content slots</p><code>slot=&quot;header&quot;</code></div>
                <div className="anatomy-line"><span>03</span><p>Themeable surface</p><code>--nacre-surface</code></div>
                <div className="anatomy-line"><span>04</span><p>Accessible state</p><code>aria-live</code></div>
              </TabsContent>

              <TabsContent value="code" className="preview-canvas code-canvas">
                <pre><code><span className="code-muted">import</span> {'{ Card, Switch }'} <span className="code-muted">from</span>{'\n'}  <span className="code-string">&apos;@nacre-ui/react&apos;</span>;{'\n\n'}<span className="code-muted">export function</span> <span className="code-accent">Preferences</span>() {'{'}{'\n'}  <span className="code-tag">&lt;Card</span> variant=<span className="code-string">&quot;glass&quot;</span><span className="code-tag">&gt;</span>{'\n'}    <span className="code-tag">&lt;Switch</span> defaultChecked <span className="code-tag">/&gt;</span>{'\n'}  <span className="code-tag">&lt;/Card&gt;</span>{'\n'}{'}'}</code></pre>
              </TabsContent>
            </Tabs>
          </div>

          <div className="floating-token glass-panel" aria-hidden="true">
            <div className="token-swatch" />
            <div><span>Accent</span><strong>#66A9FF</strong></div>
          </div>
          <div className="floating-a11y glass-panel" aria-hidden="true">
            <span className="a11y-score">AAA</span>
            <div><strong>7.60:1</strong><span>Contrast</span></div>
          </div>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Library metrics">
        <div><strong>09</strong><span>Core primitives</span></div>
        <div><strong>&lt;18kB</strong><span>Reference bundle</span></div>
        <div><strong>AAA</strong><span>Accessibility target</span></div>
        <div><strong>04</strong><span>Framework paths</span></div>
      </section>

      <section id="components" className="section-shell component-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Component collection</p>
            <h2>Small set. Deeply considered.</h2>
          </div>
          <p>
            Every primitive carries its own interaction model, accessibility contract,
            responsive behavior, and theme-ready styling surface.
          </p>
        </div>

        <div className="component-grid">
          {componentCatalog.map(([name, category, detail], index) => (
            <a className="component-tile" href="#docs" key={name}>
              <div className="tile-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <ChevronRight className="size-4" aria-hidden="true" />
              </div>
              <div className={`mini-component mini-${name.toLowerCase()}`} aria-hidden="true">
                {name === 'Button' && <button type="button">Continue <ArrowRight className="size-3" /></button>}
                {name === 'Card' && <div className="mini-card"><span /><strong /><i /></div>}
                {name === 'Input' && <div className="mini-input"><span>Email</span><strong>hello@nacre.ui</strong></div>}
                {name === 'Modal' && <div className="mini-modal"><span /><strong /><i /></div>}
                {name === 'Switch' && <div className="mini-switch"><span /></div>}
                {name === 'Tabs' && <div className="mini-tabs"><strong>Preview</strong><span>Code</span><span>API</span></div>}
                {name === 'Dropdown' && <div className="mini-dropdown"><strong>Appearance</strong><ChevronRight className="size-3" /></div>}
                {name === 'Segmented' && <div className="mini-segment"><strong>Day</strong><span>Week</span><span>Month</span></div>}
                {name === 'Sidebar' && <div className="mini-sidebar"><i /><span /><span /><strong /></div>}
              </div>
              <div className="tile-copy">
                <p>{category}</p>
                <h3>{name}</h3>
                <span>{detail}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="tokens" className="section-shell tokens-section">
        <div className="tokens-copy">
          <p className="section-kicker">Token architecture</p>
          <h2>One language.<br />Every appearance.</h2>
          <p>
            Reference values flow into semantic roles, component decisions, and safe
            product overrides. Dark mode is tuned—not inverted—and materials always
            retain an opaque fallback.
          </p>
          <ul className="feature-list">
            <li><Check className="size-4" /> Semantic color roles with verified contrast</li>
            <li><Check className="size-4" /> Four material depths with reduced-transparency modes</li>
            <li><Check className="size-4" /> CSS variables, JSON, TypeScript, and Tailwind exports</li>
          </ul>
          <a className="text-link" href="#docs">Browse the token reference <ArrowRight className="size-4" /></a>
        </div>

        <div className="token-studio glass-panel">
          <div className="studio-header">
            <div><p className="micro-label">Live foundation</p><h3>Semantic tokens</h3></div>
            <span>Dark</span>
          </div>
          <div className="color-rack" aria-label="Color token samples">
            <div className="color-chip blue"><span>Accent</span><code>#66A9FF</code></div>
            <div className="color-chip green"><span>Success</span><code>#79E195</code></div>
            <div className="color-chip violet"><span>Info</span><code>#D2A8FF</code></div>
            <div className="color-chip coral"><span>Danger</span><code>#FF8A8A</code></div>
          </div>
          <div className="material-stack" aria-label="Material depth samples">
            <div className="material-row"><span>ultraThin</span><i className="material-demo ultra" /><code>12px</code></div>
            <div className="material-row"><span>thin</span><i className="material-demo thin" /><code>20px</code></div>
            <div className="material-row"><span>regular</span><i className="material-demo regular" /><code>32px</code></div>
            <div className="material-row"><span>thick</span><i className="material-demo thick" /><code>48px</code></div>
          </div>
          <div className="token-code">
            <span>--nacre-color-accent</span>
            <code>var(--nacre-ref-blue-dark-strong)</code>
          </div>
        </div>
      </section>

      <section id="principles" className="section-shell principles-section">
        <div className="centered-heading">
          <p className="section-kicker">System principles</p>
          <h2>Designed for the work<br />after the screenshot.</h2>
          <p>Beautiful defaults matter. Durable engineering matters more.</p>
        </div>

        <div className="principle-grid">
          <article className="principle-card">
            <span className="principle-icon"><Accessibility className="size-5" /></span>
            <p className="micro-label">01 / Inclusive by construction</p>
            <h3>Accessibility is the API.</h3>
            <p>Keyboard models, focus management, form semantics, forced colors, zoom, and reduced motion ship as component behavior.</p>
            <div className="focus-demo"><button type="button">Focus visible</button><span>3px / 7.6:1</span></div>
          </article>

          <article className="principle-card">
            <span className="principle-icon"><Zap className="size-5" /></span>
            <p className="micro-label">02 / Standards first</p>
            <h3>Light where it counts.</h3>
            <p>Native HTML, explicit registration, open Shadow DOM, and zero styling runtime keep bundles understandable and fast.</p>
            <div className="budget-meter"><div><span>Core</span><strong>4kB</strong></div><i><span /></i><p>Button + Input + Modal &lt; 18kB</p></div>
          </article>

          <article className="principle-card">
            <span className="principle-icon"><Palette className="size-5" /></span>
            <p className="micro-label">03 / Platform aware</p>
            <h3>Familiar, never imitative.</h3>
            <p>HIG principles meet web conventions through semantic tokens, native interactions, and original visual expression.</p>
            <div className="radius-demo"><span>8</span><span>12</span><span>16</span><span>20</span></div>
          </article>
        </div>
      </section>

      <section className="framework-section section-shell" aria-labelledby="framework-heading">
        <div>
          <p className="section-kicker">One core, many adapters</p>
          <h2 id="framework-heading">Use the framework you already chose.</h2>
        </div>
        <div className="framework-list">
          <span><Braces className="size-4" /> Web Components <small>Core</small></span>
          <span>R <strong>React 19</strong></span>
          <span>N <strong>Next.js</strong></span>
          <span>V <strong>Vue</strong></span>
          <span>S <strong>Svelte</strong></span>
        </div>
      </section>

      <section id="docs" className="section-shell final-cta">
        <div className="cta-orbit one" aria-hidden="true" />
        <div className="cta-orbit two" aria-hidden="true" />
        <div className="cta-copy">
          <p className="section-kicker">Ready when you are</p>
          <h2>Build something that<br />feels inevitable.</h2>
          <p>Start with nine carefully engineered primitives. Grow without rebuilding your foundation.</p>
          <div className="hero-actions cta-actions">
            <a className="primary-cta" href="#top">Get started <ArrowRight className="size-4" /></a>
            <a className="secondary-cta" href="https://github.com">View source <Code2 className="size-4" /></a>
          </div>
        </div>
        <div className="cta-command glass-panel">
          <div className="command-title"><span /><span /><span /><code>Terminal</code></div>
          <pre><code><span className="code-muted">$</span> npm install @nacre-ui/elements{`\n`}<span className="code-muted">$</span> npm install @nacre-ui/react{`\n\n`}<span className="code-string">✓</span> 9 components registered{`\n`}<span className="code-string">✓</span> types generated{`\n`}<span className="code-string">✓</span> ready in 412ms</code></pre>
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand-mark"><span className="brand-glyph" aria-hidden="true"><span /></span><span>Nacre UI</span></div>
        <p>Original web components, shaped by human interface principles.</p>
        <div><a href="#components">Components</a><a href="#tokens">Tokens</a><a href="#docs">Docs</a><a href="https://github.com">GitHub</a></div>
        <span>© 2026 Nacre UI</span>
      </footer>
    </main>
  );
}
