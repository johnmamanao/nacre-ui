'use client';

import type { RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Blend,
  BookOpen,
  Code2,
  Hand,
  House,
  Layers,
  LoaderCircle,
  MousePointerClick,
  Search,
  SlidersHorizontal,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

export type SearchComponentName =
  | 'Button'
  | 'Magnetic Button'
  | 'Liquid Metal Button'
  | 'Gem Smoke Button'
  | 'Lustre Button'
  | 'Social Profile Button'
  | 'Pearl Aperture Loader'
  | 'Horizon Page Loader'
  | 'Mercury Rail Loader'
  | 'Facet Bloom Loader'
  | 'Ribbon Fold Loader'
  | 'Pearl Matrix Loader'
  | 'Fluid Cell Loader'
  | 'Prism Stack Loader'
  | 'Card Shuffle Loader'
  | 'Signal Reveal Text'
  | 'Tally Shift Number'
  | 'Tidal Type Text'
  | 'Swell Text'
  | 'Aurora Text'
  | 'Liquid Text'
  | 'Gravity Text'
  | 'Slot Text'
  | 'Bloom Text'
  | 'Tilt Text'
  | 'Phase Weave Text'
  | 'Editorial Mosaic'
  | 'Halo Dock'
  | 'Shutter Trail'
  | 'Folio Arc Carousel'
  | 'Helix Reel'
  | 'Toolchain Marquee'
  | 'Orbit Ledger'
  | 'Nacre Field Shader'
  | 'Iridescent Weave Shader'
  | 'Mesh Background'
  | 'Flux Background'
  | 'Magnetic Warp Background'
  | 'Grain Current Background';

export type SearchGettingStartedPage =
  | 'installation'
  | 'react-next'
  | 'theming'
  | 'cli';

type SearchCategory =
  | 'Actions'
  | 'Loaders'
  | 'Text & Motion'
  | 'Interactions'
  | 'Backgrounds';

type SearchItem = {
  name: SearchComponentName;
  category: SearchCategory;
  description: string;
};

type Result = {
  id: string;
  label: string;
  description: string;
  kind: string;
  icon: LucideIcon;
  select: () => void;
};

const resultIcons = {
  Actions: MousePointerClick,
  Loaders: LoaderCircle,
  'Text & Motion': WandSparkles,
  Interactions: Hand,
  Backgrounds: Blend,
} satisfies Record<SearchCategory, LucideIcon>;

type DocumentationSearchProps = {
  open: boolean;
  query: string;
  inputRef: RefObject<HTMLInputElement | null>;
  components: readonly SearchItem[];
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
  onHome: () => void;
  onCatalog: () => void;
  onGettingStarted: (page: SearchGettingStartedPage) => void;
  onComponent: (name: SearchComponentName) => void;
};

function matches(result: Result, query: string) {
  if (!query) return true;
  return `${result.label} ${result.description} ${result.kind}`
    .toLowerCase()
    .includes(query);
}

function ResultRow({
  result,
  index,
  selected,
  onPoint,
  onSelect,
}: {
  result: Result;
  index: number;
  selected: boolean;
  onPoint: (index: number) => void;
  onSelect: (result: Result) => void;
}) {
  const Icon = result.icon;
  return (
    <button
      id={`search-result-${result.id}`}
      data-slot="command-item"
      data-selected={selected}
      type="button"
      aria-current={selected ? 'true' : undefined}
      onPointerMove={() => onPoint(index)}
      onFocus={() => onPoint(index)}
      onClick={() => onSelect(result)}
    >
      <span className="search-result-icon">
        <Icon />
      </span>
      <span className="search-result-copy">
        <strong>{result.label}</strong>
        <small>{result.description}</small>
      </span>
      <span data-slot="command-shortcut">{result.kind}</span>
    </button>
  );
}

export default function DocumentationSearch({
  open,
  query,
  inputRef,
  components,
  onOpenChange,
  onQueryChange,
  onHome,
  onCatalog,
  onGettingStarted,
  onComponent,
}: DocumentationSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const quickResults = useMemo<Result[]>(
    () => [
      {
        id: 'home',
        label: 'Home',
        description: 'Nacre UI landing page and product overview.',
        kind: 'Page',
        icon: House,
        select: onHome,
      },
      {
        id: 'catalog',
        label: 'Component catalogue',
        description: 'Browse every available Nacre primitive.',
        kind: 'Page',
        icon: Layers,
        select: onCatalog,
      },
      {
        id: 'installation',
        label: 'Installation',
        description: 'Install the packages and register Nacre.',
        kind: 'Guide',
        icon: BookOpen,
        select: () => onGettingStarted('installation'),
      },
      {
        id: 'react-next',
        label: 'React and Next.js',
        description: 'Use the typed adapter in React applications.',
        kind: 'Guide',
        icon: Code2,
        select: () => onGettingStarted('react-next'),
      },
      {
        id: 'theming',
        label: 'Theming',
        description: 'Adapt semantic roles for light and dark modes.',
        kind: 'Guide',
        icon: SlidersHorizontal,
        select: () => onGettingStarted('theming'),
      },
    ],
    [onCatalog, onGettingStarted, onHome],
  );

  const componentResults = useMemo<Result[]>(
    () =>
      components.map((component) => ({
        id: `component-${component.name.toLowerCase().replaceAll(' ', '-')}`,
        label: component.name,
        description: component.description,
        kind: component.category,
        icon: resultIcons[component.category],
        select: () => onComponent(component.name),
      })),
    [components, onComponent],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const visibleQuickResults = quickResults.filter((result) =>
    matches(result, normalizedQuery),
  );
  const visibleComponentResults = componentResults.filter((result) =>
    matches(result, normalizedQuery),
  );
  const visibleResults = [...visibleQuickResults, ...visibleComponentResults];
  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(visibleResults.length - 1, 0),
  );
  const activeResult = visibleResults[safeActiveIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      if (!dialog.open) dialog.showModal();
      dialog.removeAttribute('data-closed');
      dialog.setAttribute('data-open', '');
      const focusFrame = requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
      return () => cancelAnimationFrame(focusFrame);
    }

    if (dialog.open) {
      dialog.removeAttribute('data-open');
      dialog.setAttribute('data-closed', '');
      closeTimer = setTimeout(() => {
        dialog.close();
        dialog.removeAttribute('data-closed');
      }, 180);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [inputRef, open]);

  const selectResult = (result: Result) => {
    result.select();
    onQueryChange('');
    onOpenChange(false);
  };

  return (
    <dialog
      ref={dialogRef}
      className="docs-search-dialog"
      aria-labelledby="docs-search-title"
      aria-describedby="docs-search-description"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <h2 id="docs-search-title" className="sr-only">
        Search Nacre UI
      </h2>
      <p id="docs-search-description" className="sr-only">
        Search documentation, getting-started guides, and components.
      </p>
      <div data-slot="command" className="docs-search-command">
        <div data-slot="command-input-wrapper">
          <div data-slot="input-group">
            <span data-slot="input-group-addon">
              <Search />
            </span>
            <input
              ref={inputRef}
              data-slot="command-input"
              value={query}
              onChange={(event) => {
                onQueryChange(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  onOpenChange(false);
                } else if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setActiveIndex((current) =>
                    visibleResults.length
                      ? (current + 1) % visibleResults.length
                      : 0,
                  );
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  setActiveIndex((current) =>
                    visibleResults.length
                      ? (current - 1 + visibleResults.length) %
                        visibleResults.length
                      : 0,
                  );
                } else if (event.key === 'Enter' && activeResult) {
                  event.preventDefault();
                  selectResult(activeResult);
                }
              }}
              role="searchbox"
              aria-controls="docs-search-results"
              aria-label="Search Nacre UI"
              placeholder="Search components, guides, docs…"
            />
          </div>
        </div>

        <div
          id="docs-search-results"
          data-slot="command-list"
          className="docs-search-results"
          aria-label="Suggestions"
        >
          {!visibleResults.length ? (
            <div data-slot="command-empty">
              No matching documentation found.
            </div>
          ) : null}

          {visibleQuickResults.length ? (
            <section
              data-slot="command-group"
              aria-labelledby="quick-links-heading"
            >
              <h3 id="quick-links-heading" data-search-group-heading="">
                Quick links
              </h3>
              {visibleQuickResults.map((result, index) => (
                <ResultRow
                  key={result.id}
                  result={result}
                  index={index}
                  selected={safeActiveIndex === index}
                  onPoint={setActiveIndex}
                  onSelect={selectResult}
                />
              ))}
            </section>
          ) : null}

          {visibleQuickResults.length && visibleComponentResults.length ? (
            <hr data-slot="command-separator" />
          ) : null}

          {visibleComponentResults.length ? (
            <section
              data-slot="command-group"
              aria-labelledby="components-heading"
            >
              <h3 id="components-heading" data-search-group-heading="">
                Components
              </h3>
              {visibleComponentResults.map((result, index) => {
                const resultIndex = visibleQuickResults.length + index;
                return (
                  <ResultRow
                    key={result.id}
                    result={result}
                    index={resultIndex}
                    selected={safeActiveIndex === resultIndex}
                    onPoint={setActiveIndex}
                    onSelect={selectResult}
                  />
                );
              })}
            </section>
          ) : null}
        </div>

        <div className="docs-search-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Open
          </span>
          <span>
            <kbd>Esc</kbd> Close
          </span>
        </div>
      </div>
    </dialog>
  );
}
