'use client';

import {
  AnimatePresence,
  motion,
  stagger,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useState } from 'react';

import styles from './site-entry-loader.module.css';

const revealDelay = 1080;
const wordmark = ['N', 'a', 'c', 'r', 'e'];

function markEntrySeen() {
  document.documentElement.dataset.nacreEntry = 'seen';
}

function SiteEntryLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      const skipTimer = window.setTimeout(() => {
        markEntrySeen();
        setIsVisible(false);
      }, 0);

      return () => window.clearTimeout(skipTimer);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dismissTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, revealDelay);

    return () => {
      window.clearTimeout(dismissTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence onExitComplete={markEntrySeen}>
      {isVisible ? (
        <motion.output
          className={styles.root}
          aria-label="Opening Nacre UI"
          aria-live="polite"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <motion.span
            className={styles.materialWash}
            aria-hidden="true"
            initial={{ opacity: 0, x: '-62%', y: '-50%', scale: 0.82 }}
            animate={{ opacity: 0.9, x: '-38%', y: '-50%', scale: 1.06 }}
            transition={{
              duration: 1.05,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          <motion.div
            className={styles.stage}
            aria-hidden="true"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: stagger(0.045, { startDelay: 0.08 }),
                },
              },
            }}
          >
            <span className={styles.word}>
              {wordmark.map((letter, index) => (
                <motion.span
                  className={styles.letter}
                  key={`${letter}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: '105%' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.56,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            <motion.span
              className={styles.ui}
              variants={{
                hidden: { opacity: 0, x: -7 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              UI
            </motion.span>

            <motion.span
              className={styles.glint}
              initial={{ x: '-20vw', opacity: 0 }}
              animate={{ x: '120vw', opacity: [0, 0.85, 0] }}
              transition={{
                duration: 0.82,
                delay: 0.18,
                ease: [0.65, 0, 0.35, 1],
              }}
            />
          </motion.div>
        </motion.output>
      ) : null}
    </AnimatePresence>
  );
}

export { SiteEntryLoader };
