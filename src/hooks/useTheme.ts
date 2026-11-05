import { useEffect, useState } from "react";

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme-v2") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme-v2", isDarkMode ? "dark" : "light");
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }, [isDarkMode]);
  return { isDarkMode, toggleTheme: () => setIsDarkMode((mode) => !mode) };
}
