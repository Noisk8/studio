
'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeOutput {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'vinylvision-theme';

export function useTheme(): UseThemeOutput {
  const [theme, setThemeState] = useState<Theme>('light'); // Default to light

  useEffect(() => {
    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    // Or use system preference if no stored theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (prefersDark) {
      setThemeState('dark');
    } else {
      setThemeState('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, toggleTheme, setTheme };
}
