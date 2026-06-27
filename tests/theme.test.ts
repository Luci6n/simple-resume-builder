import { describe, expect, test } from "bun:test";
import { getStoredTheme, resolveInitialTheme, setStoredTheme } from "../src/utils/theme";

describe("theme helpers", () => {
  test("uses a stored theme before falling back to system preference", () => {
    const storage = new Map<string, string>();

    setStoredTheme("dark", {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    });

    expect(getStoredTheme({ getItem: (key) => storage.get(key) ?? null })).toBe("dark");
    expect(resolveInitialTheme(() => false, { getItem: (key) => storage.get(key) ?? null })).toBe(
      "dark",
    );
    expect(resolveInitialTheme(() => true, { getItem: () => null })).toBe("dark");
    expect(resolveInitialTheme(() => false, { getItem: () => null })).toBe("light");
  });
});
