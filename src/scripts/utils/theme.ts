const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon")!;
const themeToggleLightIcon = document.getElementById(
  "theme-toggle-light-icon"
)!;
const themeToggleBtn = document.getElementById(
  "theme-toggle"
)! as HTMLButtonElement;

type ThemeScheme = "light" | "dark";

export function setupTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
    themeToggleDarkIcon.classList.remove("hidden");
  }
}

themeToggleBtn.onclick = function () {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  localStorage.theme = localStorage.theme === "light" ? "dark" : "light";

  setupTheme();
};

setupTheme();
