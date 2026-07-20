import { useState, useEffect, useCallback } from 'react';

/**
 * Theme management hook.
 * Persists preference in localStorage and applies data-theme to <html>.
 * Dispatches a 'themechanged' custom event for the Canvas particle system.
 */
const useTheme = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
