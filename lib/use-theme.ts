'use client';

import { useCallback, useSyncExternalStore } from 'react';

const themeStorageKey = 'nacre-theme';
const themeChangeEvent = 'nacre-theme-change';

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerThemeSnapshot() {
  return true;
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey || event.newValue === null) return;
    applyTheme(event.newValue === 'dark');
    onStoreChange();
  };

  window.addEventListener(themeChangeEvent, handleThemeChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(themeChangeEvent, handleThemeChange);
    window.removeEventListener('storage', handleStorage);
  };
}

function persistTheme(isDark: boolean) {
  applyTheme(isDark);

  try {
    window.localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');
  } catch {
    // The document theme still updates when storage is unavailable.
  }

  window.dispatchEvent(new Event(themeChangeEvent));
}

function useTheme() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const setTheme = useCallback((next: boolean) => persistTheme(next), []);
  const toggleTheme = useCallback(() => persistTheme(!getThemeSnapshot()), []);

  return { isDark, setTheme, toggleTheme };
}

export { themeStorageKey, useTheme };
