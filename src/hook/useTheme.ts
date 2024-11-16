import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "os";
const LOCAL__KEY = "theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const localTheme = localStorage.getItem(LOCAL__KEY);
    return (localTheme || "light") as Theme;
  });

  useEffect(() => {
    if (theme === "os") {
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(darkQuery.matches ? "dark" : "light");
      darkQuery.addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
      });
    } else {
      document.documentElement.style.setProperty("--color", theme);
      localStorage.setItem(LOCAL__KEY, theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
