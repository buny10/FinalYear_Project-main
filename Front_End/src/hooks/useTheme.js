import { useState, useEffect } from 'react';
import { setTheme } from '../theme/colors';

export function useTheme() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "dark");

  useEffect(() => {
    setTheme(mode);
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === "dark" ? "light" : "dark"));

  return { mode, isDark: mode === "dark", toggleTheme };
}