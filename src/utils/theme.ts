export type ThemeMode = "light" | "dark";

const themeStorageKey = "resumeBuilder:theme:v1";

type ReadableStorage = {
  getItem: (key: string) => string | null;
};

type WritableStorage = ReadableStorage & {
  setItem: (key: string, value: string) => void;
};

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === "light" || value === "dark";

export const getStoredTheme = (storage: ReadableStorage = localStorage): ThemeMode | null => {
  try {
    const value = storage.getItem(themeStorageKey);
    return isThemeMode(value) ? value : null;
  } catch {
    return null;
  }
};

export const setStoredTheme = (
  theme: ThemeMode,
  storage: WritableStorage = localStorage,
): void => {
  try {
    storage.setItem(themeStorageKey, theme);
  } catch {
    // Storage can be unavailable in private browsing or locked-down environments.
  }
};

export const resolveInitialTheme = (
  prefersDark: () => boolean = () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  storage: ReadableStorage = localStorage,
): ThemeMode => getStoredTheme(storage) ?? (prefersDark() ? "dark" : "light");
