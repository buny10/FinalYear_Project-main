import { useState } from 'react';
import { setTheme } from '../theme/colors';

export function useTheme() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("themeMode") || "dark";
    setTheme(saved); // mutate C immediately, before the first render ever happens
    return saved;
  });

  const toggleTheme = () => {
    setMode(prev => {
      const next = prev === "dark" ? "light" : "dark";
      setTheme(next);                      // mutate C synchronously, same tick
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  return { mode, isDark: mode === "dark", toggleTheme };
}