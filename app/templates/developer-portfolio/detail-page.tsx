'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Moon,
  Sun,
} from 'lucide-react';

import { TechIcon } from './portfolio-icons';
import { usePortfolioTheme } from './portfolio-theme';
import styles from './portfolio.module.css';

type DetailKind =
  | 'projects'
  | 'experience'
  | 'technology'
  | 'credentials'
  | 'events';

const projectDetails = [
  [
    'Atlas Commerce',
    'Design & development',
    'Editorial commerce for independent objects.',
    ['Next.js', 'TypeScript', 'CMS'],
  ],
  [
    'Monument Index',
    'Frontend engineering',
    'A searchable archive for modern public architecture.',
    ['React', 'Motion', 'API'],
  ],
  [
    'Current Notes',
    'Creator',
    'A calm writing tool for connected research.',
    ['Electron', 'SQLite', 'React'],
  ],
  [
    'Open Assembly',
    'Technical lead',
    'Membership and events for a creative community.',
    ['Next.js', 'Postgres', 'Stripe'],
  ],
  [
    'Field Manual',
    'Product engineer',
    'An offline guide for remote research teams.',
    ['PWA', 'Maps', 'IndexedDB'],
  ],
  [
    'Common Weather',
    'Designer & developer',
    'Slow weather data for everyday planning.',
    ['Canvas', 'API', 'React'],
  ],
  [
    'Studio Ledger',
    'Frontend developer',
    'Projects and finances for small studios.',
    ['TypeScript', 'Charts', 'Auth'],
  ],
  [
    'Margin Reader',
    'Creator',
    'A quiet place to annotate long-form writing.',
    ['Next.js', 'MDX', 'Search'],
  ],
] as const;

const roles = [
  {
    date: '2024 — Present',
    role: 'Independent Product Engineer',
    company: 'Freelance studio · Remote',
    details: [
      'Designed and shipped responsive products for early-stage teams.',
      'Built accessible component systems and maintainable application foundations.',
      'Partnered directly with founders from product definition through release.',
    ],
  },
  {
    date: '2022 — 2024',
    role: 'Frontend Developer',
    company: 'Northstar Labs · London, UK',
    details: [
      'Led frontend delivery across commerce and editorial products.',
      'Improved performance, accessibility, and design-system adoption.',
    ],
  },
  {
    date: '2021 — 2022',
    role: 'Creative Technologist',
    company: 'Form & Field · Berlin, DE',
    details: [
      'Prototyped interactive campaigns and experimental interfaces.',
      'Translated visual direction into durable production systems.',
    ],
  },
  {
    date: '2019 — 2021',
    role: 'Web Designer',
    company: 'Common Ground · Remote',
    details: [
      'Created identity-led websites for cultural organizations.',
      'Maintained content, analytics, and search foundations after launch.',
    ],
  },
];

const stacks = [
  [
    'Frontend',
    ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS', 'Motion', 'WebGL'],
  ],
  [
    'Design & prototyping',
    ['Figma', 'Design systems', 'Prototyping', 'Accessibility'],
  ],
  [
    'Backend & data',
    ['Node.js', 'PostgreSQL', 'SQLite', 'REST APIs', 'GraphQL'],
  ],
  ['CMS & growth', ['Contentful', 'Sanity', 'SEO', 'Analytics', 'Email']],
  [
    'Tools & delivery',
    ['Git', 'GitHub Actions', 'Vercel', 'Docker', 'Testing'],
  ],
  ['AI systems', ['OpenAI API', 'Embeddings', 'Retrieval', 'Evaluation']],
] as const;

const credentials = [
  [
    '2025',
    'Advanced Web Accessibility',
    'Open Learning Institute',
    'Credential A11Y-25018',
  ],
  [
    '2024',
    'Design Systems for Product Teams',
    'Interface Academy',
    'Show credential',
  ],
  [
    '2023',
    'Modern Application Architecture',
    'Open Technology Guild',
    'Show credential',
  ],
  [
    '2022',
    'Practical Product Analytics',
    'Data School',
    'Credential DATA-1184',
  ],
] as const;

const events = [
  [
    'Oct 2026',
    'Designing for durable products',
    'Guest talk · Product Assembly',
  ],
  ['Jun 2026', 'Interfaces with less noise', 'Workshop · Independent Web Week'],
  [
    'Mar 2026',
    'Local-first patterns in practice',
    'Panel · Open Systems Night',
  ],
] as const;

const headings: Record<DetailKind, [string, string]> = {
  projects: [
    'Selected projects',
    'A collection of digital products designed, built, and refined across different scales.',
  ],
  experience: [
    'Experience',
    'Where I have worked, what I owned, and the outcomes I helped create.',
  ],
  technology: [
    'Full technology stack',
    'The tools and practices I use to take products from idea to production.',
  ],
  credentials: [
    'Credentials',
    'Professional training across product engineering, design systems, and accessibility.',
  ],
  events: [
    'Events',
    'Selected talks, workshops, and conversations with the wider design and development community.',
  ],
};

export function PortfolioDetailPage({ kind }: { kind: DetailKind }) {
  const { light, toggleTheme } = usePortfolioTheme();
  const [title, description] = headings[kind];

  function moveSpotlight(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--pointer-x',
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      '--pointer-y',
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div className={styles.template}>
      <header className={styles.nav}>
        <Link href="/templates/developer-portfolio" className={styles.monogram}>
          AC
        </Link>
        <nav aria-label="Portfolio navigation">
          <Link href="/templates/developer-portfolio/projects">Projects</Link>
          <Link href="/templates/developer-portfolio/experience">
            Experience
          </Link>
          <Link href="/templates/developer-portfolio/events">Events</Link>
          <i aria-hidden="true" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <Sun className={styles.sunIcon} />
            <Moon className={styles.moonIcon} />
          </button>
        </nav>
      </header>

      <main className={`${styles.content} ${styles.detailContent}`}>
        <Link className={styles.backLink} href="/templates/developer-portfolio">
          <ArrowLeft /> Back to home
        </Link>
        <header className={styles.detailHeader}>
          <span>Portfolio / {kind}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        {kind === 'projects' ? (
          <div className={styles.projectGrid}>
            {projectDetails.map(([name, role, copy, tags], index) => (
              <article
                className={styles.projectCard}
                key={name}
                onPointerMove={moveSpotlight}
              >
                <div
                  className={styles.projectSkeleton}
                  aria-label="Project image placeholder"
                >
                  <div>
                    <span />
                    <b />
                    <b />
                    <i />
                  </div>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                </div>
                <div className={styles.projectCopy}>
                  <h3>{name}</h3>
                  <b>{role}</b>
                  <p>{copy}</p>
                  <div className={styles.projectTags}>
                    {tags.map((tag) => (
                      <span key={tag}>
                        <TechIcon name={tag} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a href="#contact">
                  View project <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        ) : null}

        {kind === 'experience' ? (
          <div className={styles.experienceList}>
            {roles.map((item) => (
              <article key={item.role}>
                <time>{item.date}</time>
                <div>
                  <h2>{item.role}</h2>
                  <b>{item.company}</b>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {kind === 'technology' ? (
          <div className={styles.stackList}>
            {stacks.map(([group, items]) => (
              <section key={group}>
                <h2>{group}</h2>
                <div>
                  {items.map((item) => (
                    <span key={item}>
                      <TechIcon name={item} />
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {kind === 'credentials' ? (
          <div className={styles.credentialList}>
            {credentials.map(([date, name, issuer, action]) => (
              <article key={name}>
                <time>{date}</time>
                <div>
                  <h2>
                    {name} <CheckCircle2 />
                  </h2>
                  <b>{issuer}</b>
                  <a href="#contact">
                    {action} <ChevronRight />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {kind === 'events' ? (
          <div className={styles.eventList}>
            {events.map(([date, name, meta], index) => (
              <article key={name}>
                <div
                  className={styles.eventSkeleton}
                  aria-label="Event image placeholder"
                >
                  <span>0{index + 1}</span>
                </div>
                <time>{date}</time>
                <h2>{name}</h2>
                <p>{meta}</p>
              </article>
            ))}
          </div>
        ) : null}

        <footer id="contact" className={styles.footer}>
          <div>
            <em>Stay curious. Keep shipping.</em>
            <p>Avery Chen / Product engineer / Available worldwide</p>
          </div>
          <span>Template by Nacre UI</span>
        </footer>
      </main>
    </div>
  );
}
