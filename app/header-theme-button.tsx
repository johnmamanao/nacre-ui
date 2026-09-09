'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/lib/use-theme';

export function HeaderThemeButton() {
  const { toggleTheme } = useTheme();

  return (
    <button
      className="theme-button"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle appearance"
    >
      <Sun className="theme-icon theme-icon-light" />
      <Moon className="theme-icon theme-icon-dark" />
    </button>
  );
}
