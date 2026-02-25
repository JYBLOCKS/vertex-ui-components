import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Select } from "../../Form";
import { Flex } from "../../Layout";
import "./Theme.css";

export type ThemePalette = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
  muted: string;
  mode?: "light" | "dark";
};

const defaultThemes: ThemePalette[] = [
  {
    name: "azure",
    primary: "#2563eb",
    secondary: "#0ea5e9",
    accent: "#7c3aed",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#475569",
    mode: "light",
  },
  {
    name: "emerald",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#0ea5e9",
    surface: "#ffffff",
    text: "#052e16",
    muted: "#064e3b",
    mode: "light",
  },
  {
    name: "sunset",
    primary: "#f97316",
    secondary: "#f59e0b",
    accent: "#ef4444",
    surface: "#ffffff",
    text: "#3f1d0b",
    muted: "#92400e",
    mode: "light",
  },
  {
    name: "midnight",
    primary: "#2563eb",
    secondary: "#10b981",
    accent: "#f59e0b",
    surface: "#0b1224",
    text: "#e2e8f0",
    muted: "#94a3b8",
    mode: "dark",
  },
];

type ThemeContextValue = {
  theme: ThemePalette;
  setThemeByName: (name: string) => void;
  setThemeOverrides: (overrides: Partial<Omit<ThemePalette, "name">>) => void;
  themes: ThemePalette[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export type ThemeProviderProps = {
  children: ReactNode;
  themes?: ThemePalette[];
  defaultName?: string;
};

export function ThemeProvider({
  children,
  themes = defaultThemes,
  defaultName,
}: ThemeProviderProps) {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const initial = useMemo(() => {
    if (defaultName) return defaultName;
    const preferred = prefersDark
      ? themes.find((t) => t.mode === "dark")?.name
      : undefined;
    return preferred ?? themes[0]?.name;
  }, [defaultName, prefersDark, themes]);
  const [activeName, setActiveName] = useState(initial ?? themes[0]?.name);
  const [overrides, setOverrides] = useState<
    Partial<Omit<ThemePalette, "name">>
  >({});

  const baseTheme = useMemo(
    () => themes.find((t) => t.name === activeName) ?? themes[0],
    [activeName, themes]
  );
  const activeTheme = useMemo(
    () => ({
      ...baseTheme,
      ...overrides,
      name: baseTheme?.name ?? "custom",
    }),
    [baseTheme, overrides]
  );

  useEffect(() => {
    if (!activeTheme) return;
    const root = document.documentElement;
    const isDark = activeTheme.mode === "dark";
    const border = isDark ? "#1f2937" : "#e2e8f0";
    const surfaceMuted = isDark ? "#0f172a" : "#f6f8fb";
    const surfaceElevated = isDark ? "#111827" : "#ffffff";
    const codeBg = isDark ? "#0b1224" : "#0f172a";
    const shadow = isDark
      ? "0 10px 30px rgba(0, 0, 0, 0.45)"
      : "0 8px 20px rgba(15, 23, 42, 0.05)";
    root.style.setProperty("--vx-primary", activeTheme.primary);
    root.style.setProperty("--vx-secondary", activeTheme.secondary);
    root.style.setProperty("--vx-accent", activeTheme.accent);
    root.style.setProperty("--vx-surface", activeTheme.surface);
    root.style.setProperty("--vx-text", activeTheme.text);
    root.style.setProperty("--vx-muted", activeTheme.muted);
    root.style.setProperty("--vx-border", border);
    root.style.setProperty("--vx-surface-muted", surfaceMuted);
    root.style.setProperty("--vx-surface-elevated", surfaceElevated);
    root.style.setProperty("--vx-code-bg", codeBg);
    root.style.setProperty("--vx-code-text", "#e2e8f0");
    root.style.setProperty("--vx-shadow", shadow);
    root.dataset.themeMode = activeTheme.mode ?? "light";
    document.body.dataset.themeMode = activeTheme.mode ?? "light";
    if (activeTheme.mode === "dark") {
      root.style.setProperty("color-scheme", "dark");
    } else {
      root.style.setProperty("color-scheme", "light");
    }
  }, [activeTheme]);

  const value: ThemeContextValue = useMemo(
    () => ({
      theme: activeTheme ?? themes[0],
      setThemeByName: setActiveName,
      setThemeOverrides: setOverrides,
      themes,
    }),
    [activeTheme, themes]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return ctx;
}

export type ThemeSwitcherProps = {
  label?: string;
};

export function ThemeSwitcher({ label = "Tema" }: ThemeSwitcherProps) {
  const { themes, theme, setThemeByName, setThemeOverrides } = useTheme();

  const handleThemeChange = (name: string) => {
    setThemeOverrides({});
    setThemeByName(name);
  };

  const handleModeChange = (mode: "light" | "dark") => {
    const matchingTheme = themes.find((t) => t.mode === mode);
    if (matchingTheme) {
      handleThemeChange(matchingTheme.name);
      return;
    }
    setThemeOverrides({ ...theme, mode });
  };

  const handleOverride =
    (field: keyof Omit<ThemePalette, "name">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      if (field === "mode" && (value === "light" || value === "dark")) {
        handleModeChange(value);
        return;
      }
      setThemeOverrides({ ...theme, [field]: value });
    };

  return (
    <div className="vx-theme">
      <label>
        <span className="w-15">{label}</span>
        <Select
          value={theme.name}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          {themes.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </Select>
      </label>
      <div className="vx-theme">
        <label>
          <span className="w-15">Modo</span>
          <Select
            value={theme.mode ?? "light"}
            onChange={handleOverride("mode")}
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </Select>
        </label>
      </div>
      <div className="vx-theme__palette">
        <Flex direction="row" gap={1}>
          {(
            [
              "primary",
              "secondary",
              "accent",
              "surface",
              "text",
              "muted",
            ] as const
          ).map((key) => (
            <label key={key}>
              <span>{key}</span>
              <input
                type="color"
                value={theme[key]}
                onChange={handleOverride(key)}
              />
            </label>
          ))}
        </Flex>
      </div>
    </div>
  );
}
