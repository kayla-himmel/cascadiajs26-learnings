/**
 * theme-toggle.ts — Light / dark theme toggle
 *
 * How it works:
 *   - Two states toggle: 'light' ↔ 'dark'
 *   - On first load (no saved preference), the OS preference is detected via
 *     prefers-color-scheme and used as the starting state.
 *   - The current state is stored in localStorage so it survives page refresh.
 *   - The state is applied by setting data-theme on <html>, which activates
 *     the matching [data-theme] rule in themes.css.
 *   - Moon (☽) is shown in light mode — click to switch to dark.
 *   - Sun (☀) is shown in dark mode — click to switch to light.
 *
 * Try it:
 *   - Edit ICONS below to change the button symbols.
 *   - Edit ARIA_LABELS to change the accessible button text.
 */

// ---------------------------------------------------------------------------
// Constants — edit these to customise the button label/icon for each state
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'theme-preference';

/** Maps each state to a human-readable label for aria-label */
const ARIA_LABELS: Record<string, string> = {
  light: 'Switch to dark mode',   // currently light — button switches to dark
  dark:  'Switch to light mode',  // currently dark — button switches to light
};

/** Maps each state to the visible button content */
const ICONS: Record<string, string> = {
  light: '&#9789;&#xFE0E;',  // ☽ moon — shown in light mode
  dark:  '&#9728;&#xFE0E;',  // ☀ sun  — shown in dark mode
};

// ---------------------------------------------------------------------------
// Determine initial state: saved preference, or OS preference as fallback
// ---------------------------------------------------------------------------

function getInitialTheme(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const initial = getInitialTheme();
applyTheme(initial);

// ---------------------------------------------------------------------------
// Wire up the toggle button once the DOM is ready
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Enable theme transitions only after initial load to prevent
  // background-color animating from light→dark on page load
  document.documentElement.classList.add('theme-transitions-ready');

  const button = document.getElementById('theme-toggle');

  if (!button) {
    // The button is expected on every page — warn in dev so it is not missed
    console.warn('[theme-toggle] No element with id="theme-toggle" found.');
    return;
  }

  // Sync button label/icon with the initial state
  updateButton(button, initial);

  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme ?? 'light';
    const next = current === 'light' ? 'dark' : 'light';

    applyTheme(next);
    updateButton(button, next);
    localStorage.setItem(STORAGE_KEY, next);
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Set data-theme on <html> to activate the chosen scheme */
function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

/** Update the toggle button's visible icon and accessible label */
function updateButton(button: HTMLElement, theme: string): void {
  button.innerHTML = ICONS[theme] ?? ICONS['light'];
  button.setAttribute('aria-label', ARIA_LABELS[theme] ?? ARIA_LABELS['light']);
}
