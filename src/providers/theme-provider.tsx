"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  attribute?: "class";
  children: React.ReactNode;
  defaultTheme?: Theme;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  enableSystem?: boolean;
  forcedTheme?: Theme;
  storageKey?: string;
};

type ThemeContextValue = {
  forcedTheme?: Theme;
  resolvedTheme?: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  systemTheme?: "light" | "dark";
  theme: string;
  themes: Theme[];
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(storageKey: string, defaultTheme: Theme) {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  try {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    return storedTheme ?? defaultTheme;
  } catch {
    return defaultTheme;
  }
}

function applyTheme(theme: Theme, enableColorScheme: boolean) {
  const root = document.documentElement;
  const resolvedTheme = theme === "system" ? getSystemTheme() ?? "light" : theme;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = enableColorScheme ? resolvedTheme : "";
}

export function ThemeProvider({
  children,
  attribute: _attribute = "class",
  defaultTheme = "system",
  disableTransitionOnChange: _disableTransitionOnChange = false,
  enableColorScheme = true,
  enableSystem = true,
  forcedTheme,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">(
    () => getSystemTheme() ?? "light"
  );

  void _attribute;
  void _disableTransitionOnChange;

  React.useEffect(() => {
    const initialTheme = forcedTheme ?? getStoredTheme(storageKey, defaultTheme);
    setThemeState(initialTheme);
  }, [defaultTheme, forcedTheme, storageKey]);

  React.useEffect(() => {
    if (!enableSystem || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, [enableSystem]);

  React.useEffect(() => {
    const activeTheme = forcedTheme ?? theme;
    applyTheme(activeTheme, enableColorScheme);
  }, [enableColorScheme, forcedTheme, systemTheme, theme]);

  const setTheme = React.useCallback<React.Dispatch<React.SetStateAction<string>>>(
    (value) => {
      setThemeState((currentTheme) => {
        const nextTheme =
          typeof value === "function"
            ? (value(currentTheme) as Theme)
            : (value as Theme);

        if (forcedTheme) {
          return forcedTheme;
        }

        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {}

        return nextTheme;
      });
    },
    [forcedTheme, storageKey]
  );

  const activeTheme = forcedTheme ?? theme;
  const resolvedTheme: "light" | "dark" =
    activeTheme === "system" ? systemTheme : activeTheme;

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      forcedTheme,
      resolvedTheme,
      setTheme,
      systemTheme: enableSystem ? systemTheme : undefined,
      theme: forcedTheme ?? theme,
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"],
    }),
    [enableSystem, forcedTheme, resolvedTheme, setTheme, systemTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
