function setupTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

type ThemeScheme = "light" | "dark";

export function setTheme(theme: ThemeScheme) {
  localStorage.theme = theme;
}

export function osPreference(os: boolean) {
  if (!os) {
    return setupTheme();
  }

  localStorage.removeItem("theme");
}

setupTheme();
