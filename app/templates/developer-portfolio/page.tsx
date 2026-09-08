'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  ChevronRight,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { BrandMark, TechIcon, VerifiedBadge } from './portfolio-icons';
import { usePortfolioTheme } from './portfolio-theme';
import styles from './portfolio.module.css';

const experience = [
  [
    '2024 — Present',
    'Independent Product Engineer',
    'Freelance studio',
    'Remote',
  ],
  ['2022 — 2024', 'Frontend Developer', 'Northstar Labs', 'London, UK'],
  ['2021 — 2022', 'Creative Technologist', 'Form & Field', 'Berlin, DE'],
  ['2019 — 2021', 'Web Designer', 'Common Ground', 'Remote'],
];

const projects = [
  [
    'Atlas Commerce',
    'Design & development',
    'Editorial storefront for an independent homeware brand.',
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
    'A calm writing tool for connected research and daily notes.',
    ['Electron', 'SQLite', 'React'],
  ],
  [
    'Open Assembly',
    'Technical lead',
    'Membership and events platform for a creative community.',
    ['Next.js', 'Postgres', 'Stripe'],
  ],
];

const technologyRows = [
  ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS', 'Motion'],
  ['Node.js', 'PostgreSQL', 'SQLite', 'REST APIs', 'Vercel', 'GitHub'],
  ['Figma', 'Design Systems', 'Accessibility', 'SEO', 'Analytics', 'Testing'],
];

const outsideImages = [
  {
    src: '/developer-portfolio/outside-climbing.png',
    alt: 'Climbing shoes, chalk bag, rope, and a carabiner on a worn bench',
  },
  {
    src: '/developer-portfolio/outside-printmaking.png',
    alt: 'A handmade botanical print, carved block, and ink roller',
  },
  {
    src: '/developer-portfolio/outside-editor-still-life.png',
    alt: 'Climbing gear, a camera, sketchbook, and a shared meal on a dark table',
  },
  {
    src: '/developer-portfolio/outside-travel.png',
    alt: 'A camera, map, and canvas bag beside a rain-speckled train window',
  },
  {
    src: '/developer-portfolio/outside-cooking.png',
    alt: 'Hands finishing a rustic bowl of roasted squash and grains',
  },
];

const outsideFanPositions = [
  {
    transform: 'translate3d(-112%, 8%, 0) rotate(-18deg) scale(0.9)',
    opacity: 0,
    zIndex: 0,
  },
  {
    transform: 'translate3d(-94%, 0, 0) rotate(-13deg) scale(0.94)',
    opacity: 0.76,
    zIndex: 1,
  },
  {
    transform: 'translate3d(-50%, 16%, 0) rotate(0deg) scale(1.04)',
    opacity: 1,
    zIndex: 3,
  },
  {
    transform: 'translate3d(-6%, 0, 0) rotate(13deg) scale(0.94)',
    opacity: 0.76,
    zIndex: 1,
  },
  {
    transform: 'translate3d(12%, 8%, 0) rotate(18deg) scale(0.9)',
    opacity: 0,
    zIndex: 0,
  },
];

const outsideStackPositions = [
  outsideFanPositions[0],
  {
    transform: 'translate3d(-62%, 3%, 0) rotate(-4deg) scale(0.96)',
    opacity: 0.72,
    zIndex: 1,
  },
  {
    transform: 'translate3d(-50%, 8%, 0) rotate(0deg) scale(1.04)',
    opacity: 1,
    zIndex: 3,
  },
  {
    transform: 'translate3d(-38%, 3%, 0) rotate(4deg) scale(0.96)',
    opacity: 0.72,
    zIndex: 1,
  },
  outsideFanPositions[4],
];

const contributions = Array.from({ length: 364 }, (_, index) => {
  const week = Math.floor(index / 7);
  const day = index % 7;
  const wave = Math.sin(week * 0.41 + day * 0.83);
  if ((week + day * 3) % 19 === 0) return 4;
  if (week > 5 && week < 39 && wave > 0.42) return 3;
  if (week > 2 && week < 44 && wave > -0.22) return 2;
  return (week + day) % 4 === 0 ? 1 : 0;
});

function SectionHeading({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <h2>{children}</h2>
      {href ? (
        <a href={href}>
          View all <ChevronRight />
        </a>
      ) : null}
    </div>
  );
}

export default function DeveloperPortfolioTemplate() {
  const { light, toggleTheme } = usePortfolioTheme();
  const [activeOutsideImage, setActiveOutsideImage] = useState(2);
  const [isOutsideStackHovered, setIsOutsideStackHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = 'true';
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -80px', threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

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

  function selectOutsideImage(index: number) {
    setActiveOutsideImage((current) =>
      current === index ? (current + 1) % outsideImages.length : index,
    );
  }

  function getOutsideImageSlot(index: number) {
    const offset = index - activeOutsideImage;
    if (offset > 2) return offset - outsideImages.length;
    if (offset < -2) return offset + outsideImages.length;
    return offset;
  }

  return (
    <div className={styles.template}>
      <header className={styles.nav}>
        <Link
          href="/templates"
          className={styles.monogram}
          aria-label="Back to templates"
        >
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

      <main className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.identity}>
            <div className={styles.avatarSkeleton}>
              <Image
                src="/developer-portfolio/avery-dither-portrait.png"
                alt="Dithered illustrated portrait of Avery Chen"
                fill
                priority
                sizes="(max-width: 640px) 120px, 156px"
              />
            </div>
            <div>
              <h1>
                Avery Chen <VerifiedBadge />
              </h1>
              <div className={styles.socials}>
                <a
                  href="#contact"
                  aria-label="GitHub profile"
                  data-social="github"
                >
                  <BrandMark name="GitHub" />
                </a>
                <a
                  href="#contact"
                  aria-label="LinkedIn profile"
                  data-social="linkedin"
                >
                  <BrandMark name="LinkedIn" />
                </a>
                <a
                  href="mailto:hello@example.com"
                  aria-label="Email"
                  data-social="email"
                >
                  <AtSign />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.heroHeading}>
            <span className={styles.heroRole}>Full-Stack Product Engineer</span>
            <h2>Thoughtful digital systems.</h2>
          </div>
          <p className={styles.lede}>
            I build dependable web products from interface to infrastructure. My
            work combines
            <em>
              <TechIcon name="React" /> React
            </em>
            ,
            <em>
              <TechIcon name="TypeScript" /> TypeScript
            </em>
            , and
            <em>
              <TechIcon name="Node.js" /> Node.js
            </em>{' '}
            with careful product thinking, accessible interactions, and a bias
            toward simple systems that last.
          </p>
          <a className={styles.primaryButton} href="#experience">
            View résumé <ChevronRight />
          </a>
        </section>

        <section className={styles.featured} data-reveal>
          <div
            className={styles.featuredMedia}
            aria-label="Featured project image placeholder"
          >
            <div className={styles.browserSkeleton}>
              <span />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className={styles.featuredCopy}>
            <span>Featured build</span>
            <h2>Parcel: an independent publishing workspace.</h2>
            <p>
              A local-first editor designed for focused, long-form research.
            </p>
            <div className={styles.tags}>
              {['Electron', 'React', 'SQLite'].map((technology) => (
                <i key={technology}>
                  <TechIcon name={technology} /> {technology}
                </i>
              ))}
            </div>
            <a href="#projects">
              Read case study <ArrowUpRight />
            </a>
          </div>
        </section>

        <section id="experience" className={styles.section} data-reveal>
          <SectionHeading href="/templates/developer-portfolio/experience">
            Experience
          </SectionHeading>
          <div className={styles.timeline}>
            {experience.map(([date, role, company, location]) => (
              <article key={role}>
                <time>{date}</time>
                <div>
                  <h3>{role}</h3>
                  <b>{company}</b>
                  <p>{location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className={styles.section} data-reveal>
          <SectionHeading href="/templates/developer-portfolio/projects">
            Projects
          </SectionHeading>
          <div className={styles.projectGrid}>
            {projects.map(([title, role, description, tags], index) => (
              <article
                key={title as string}
                className={styles.projectCard}
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
                  <small>0{index + 1}</small>
                </div>
                <div className={styles.projectCopy}>
                  <h3>{title as string}</h3>
                  <b>{role as string}</b>
                  <p>{description as string}</p>
                  <div className={styles.projectTags}>
                    {(tags as string[]).map((tag) => (
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
          <Link
            className={styles.centerButton}
            href="/templates/developer-portfolio/projects"
          >
            Explore all projects <ChevronRight />
          </Link>
        </section>

        <section className={styles.section} data-reveal>
          <SectionHeading href="/templates/developer-portfolio/technology">
            Technologies
          </SectionHeading>
          <div id="technologies" className={styles.techStack}>
            {technologyRows.map((row, rowIndex) => (
              <div className={styles.techRow} key={rowIndex}>
                {[...row, ...row].map((tech, index) => (
                  <span key={`${tech}-${index}`}>
                    <TechIcon name={tech} /> {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} data-reveal>
          <SectionHeading href="/templates/developer-portfolio/credentials">
            Credentials
          </SectionHeading>
          <div className={styles.timeline}>
            <article>
              <time>2025</time>
              <div>
                <h3>Advanced Web Accessibility</h3>
                <b>Open Learning Institute</b>
                <p>Certificate ID DEMO-2025-018</p>
              </div>
            </article>
            <article>
              <time>2024</time>
              <div>
                <h3>Design Systems for Product Teams</h3>
                <b>Interface Academy</b>
                <p>Professional certificate</p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} data-reveal>
          <SectionHeading>Education</SectionHeading>
          <div className={styles.timeline}>
            <article>
              <time>2016 — 2020</time>
              <div>
                <h3>Bachelor of Science in Computer Science</h3>
                <b>Example State University</b>
                <p>Department of Computing</p>
              </div>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.outside}`} data-reveal>
          <SectionHeading>Outside the editor</SectionHeading>
          <div className={styles.outsideGrid}>
            <div>
              <p>
                I reset through long walks, print, climbing, and unhurried meals
                with friends.
              </p>
              <div className={styles.tags}>
                <i>Climbing</i>
                <i>Print</i>
                <i>Travel</i>
                <i>Cooking</i>
              </div>
            </div>
            <motion.figure
              className={styles.photoStack}
              aria-label="Avery's life outside the editor"
              onHoverStart={() => setIsOutsideStackHovered(true)}
              onHoverEnd={() => setIsOutsideStackHovered(false)}
            >
              {outsideImages.map((image, index) => {
                const slot = getOutsideImageSlot(index);
                const positions = isOutsideStackHovered
                  ? outsideFanPositions
                  : outsideStackPositions;
                const position = positions[slot + 2];

                return (
                  <motion.button
                    className={styles.photoCard}
                    data-slot={slot}
                    type="button"
                    aria-label={
                      index === activeOutsideImage
                        ? `Show the next image after ${image.alt.toLowerCase()}`
                        : `Show ${image.alt.toLowerCase()}`
                    }
                    aria-hidden={Math.abs(slot) === 2}
                    inert={Math.abs(slot) === 2}
                    tabIndex={Math.abs(slot) === 2 ? -1 : 0}
                    initial={false}
                    animate={{
                      transform: position.transform,
                      opacity: position.opacity,
                    }}
                    transition={
                      prefersReducedMotion
                        ? {
                            transform: { duration: 0 },
                            opacity: {
                              duration: 0.16,
                              ease: [0.23, 1, 0.32, 1],
                            },
                          }
                        : {
                            transform: {
                              type: 'spring',
                              duration: 0.5,
                              bounce: 0.2,
                            },
                            opacity: {
                              duration: 0.18,
                              ease: [0.23, 1, 0.32, 1],
                            },
                          }
                    }
                    style={{ zIndex: position.zIndex }}
                    key={image.src}
                    onClick={() => selectOutsideImage(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 130px, 150px"
                    />
                  </motion.button>
                );
              })}
            </motion.figure>
          </div>
        </section>

        <section className={styles.section} data-reveal>
          <SectionHeading>GitHub activity</SectionHeading>
          <div className={styles.activity}>
            <div className={styles.months}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
            <div className={styles.graph}>
              {contributions.map((level, index) => (
                <i key={index} data-level={level} />
              ))}
            </div>
            <div className={styles.activityMeta}>
              <p>864 contributions in the last year</p>
              <div aria-label="Contribution intensity legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <i key={level} data-level={level} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`${styles.section} ${styles.contact}`}
          data-reveal
        >
          <div>
            <h2>Let’s work together.</h2>
            <p>
              Available for product engineering, design-system work, and focused
              web builds.
            </p>
          </div>
          <div className={styles.contactLinks}>
            <a href="mailto:hello@example.com">
              <Mail />
              <span>
                <small>Email</small>hello@example.com
              </span>
              <ChevronRight />
            </a>
            <a href="#contact">
              <CalendarDays />
              <span>
                <small>Let’s talk</small>Schedule a call
              </span>
              <ChevronRight />
            </a>
          </div>
        </section>

        <footer className={`${styles.footer} ${styles.homeFooter}`}>
          <div className={styles.footerClosing}>
            <span className={styles.footerKicker}>One last thing</span>
            <p>
              Make it useful. <em>Then make it feel inevitable.</em>
            </p>
          </div>
          <div className={styles.footerRail}>
            <p>
              <strong>Avery Chen</strong>
              <span>Product engineer · San Juan City, PH</span>
            </p>
            <nav aria-label="Footer links">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="mailto:hello@example.com">Email</a>
            </nav>
            <span className={styles.footerYear}>© 2026</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
