export const THEME_STORAGE_KEY = "terminal_theme";
export const THEMES = {
  dark: "dark",
  light: "light",
};

export function resolveTheme(value) {
  if (!value) return null;
  const normalized = String(value).toLowerCase().trim();
  return Object.prototype.hasOwnProperty.call(THEMES, normalized) ? normalized : null;
}

export function getInitialTheme(defaultTheme = "dark") {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const resolved = resolveTheme(stored);
    if (resolved) return resolved;
  } catch (error) {
    // ignore storage errors
  }
  return resolveTheme(defaultTheme) || "dark";
}

export function applyTheme(theme) {
  const resolved = resolveTheme(theme) || "dark";
  document.body.dataset.theme = resolved;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, resolved);
  } catch (error) {
    // ignore storage errors
  }
  return resolved;
}

export function toggleTheme(currentTheme) {
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  return applyTheme(nextTheme);
}
