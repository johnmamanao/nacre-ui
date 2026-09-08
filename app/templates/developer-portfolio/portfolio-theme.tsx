'use client';

import { useCallback, useSyncExternalStore } from 'react';

type PortfolioTheme = 'dark' | 'light';

const STORAGE_KEY = 'nacre-developer-portfolio-theme';
const themeListeners = new Set<() => void>();

function getStoredTheme(): PortfolioTheme {
  return window.localStorage.getItem(STORAGE_KEY) === 'light'
    ? 'light'
    : 'dark';
}

function getServerTheme(): PortfolioTheme {
  return 'dark';
}

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);

  function syncTheme(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    document.documentElement.dataset.portfolioTheme = getStoredTheme();
    listener();
  }

  window.addEventListener('storage', syncTheme);
  return () => {
    themeListeners.delete(listener);
    window.removeEventListener('storage', syncTheme);
  };
}

function saveTheme(theme: PortfolioTheme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.dataset.portfolioTheme = theme;
  themeListeners.forEach((listener) => listener());
}

export function usePortfolioTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme,
  );

  const toggleTheme = useCallback(() => {
    const updateTheme = () => {
      saveTheme(theme === 'light' ? 'dark' : 'light');
    };
    const pageDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (pageDocument.startViewTransition) {
      pageDocument.startViewTransition(updateTheme);
      return;
    }
    updateTheme();
  }, [theme]);

  return { light: theme === 'light', toggleTheme };
}
