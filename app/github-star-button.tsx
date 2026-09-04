'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const REPOSITORY_URL = 'https://github.com/johnmamanao/nacre-ui';
const REPOSITORY_API_URL = 'https://api.github.com/repos/johnmamanao/nacre-ui';

function formatStarCount(count: number) {
  if (count < 1000) return count.toLocaleString('en-US');

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.3-5.29-1.29-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.72 5.38-5.31 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetch(REPOSITORY_API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load repository stars');
        return response.json() as Promise<{ stargazers_count?: unknown }>;
      })
      .then((repository) => {
        if (typeof repository.stargazers_count === 'number') {
          setStars(repository.stargazers_count);
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const formattedStars = stars === null ? '—' : formatStarCount(stars);
  const label =
    stars === null
      ? 'Open Nacre UI on GitHub'
      : `Open Nacre UI on GitHub, ${stars.toLocaleString('en-US')} ${stars === 1 ? 'star' : 'stars'}`;

  return (
    <a
      className="github-star-button"
      href={REPOSITORY_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <span className="github-star-button-mark" aria-hidden="true">
        <GithubMark />
      </span>
      <span className="github-star-button-count" aria-hidden="true">
        <Star />
        <span>{formattedStars}</span>
      </span>
    </a>
  );
}
