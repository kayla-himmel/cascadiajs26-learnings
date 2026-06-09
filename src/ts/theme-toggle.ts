/**
 * theme-toggle.ts — Light / dark / system theme toggle
 *
 * How it works:
 *   - Three states cycle in order: '' (follow OS) → 'light' → 'dark' → '' …
 *   - The current state is stored in localStorage so it survives page refresh.
 *   - The state is applied by setting data-theme on <html>, which activates
 *     the matching [data-theme] rule in themes.css, overriding the OS setting.
 *   - When state is '' the OS preference wins (color-scheme: light dark on :root).
 *
 * Try it:
 *   - Edit the LABELS or ICONS below to change what the button shows.
 *   - Add a fourth state (e.g. 'high-contrast') and a matching CSS rule.
 */

// ---------------------------------------------------------------------------
// Constants — edit these to customise the button label/icon for each state
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'theme-preference';

/** Maps each state to a human-readable label for aria-label */
const ARIA_LABELS: Record<string, string> = {
  '':      'Switch to light mode',    // currently: following OS
  light:   'Switch to dark mode',     // currently: light
  dark:    'Switch to system/OS mode', // currently: dark
};

/** Maps each state to the visible button content */
const ICONS: Record<string, string> = {
  '':      '&#9728;&#xFE0E; / &#9789;&#xFE0E;', // ☀ / ☽ (text variation selector — no emoji)
  light:   '&#9728;&#xFE0E;',                    // ☀
  dark:    '&#9789;&#xFE0E;',                     // ☽
};

/** Cycle order for the three states */
const CYCLE: string[] = ['', 'light', 'dark'];

// ---------------------------------------------------------------------------
// Apply theme immediately on script load (before first paint) to avoid flash
// ---------------------------------------------------------------------------

const saved = localStorage.getItem(STORAGE_KEY) ?? '';
applyTheme(saved);

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

  // Sync button label/icon with the restored state
  updateButton(button, saved);

  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme ?? '';
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

    applyTheme(next);
    updateButton(button, next);

    // Persist so the next page load (or refresh) restores the choice
    if (next === '') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Set (or clear) data-theme on <html> to activate the chosen scheme */
function applyTheme(theme: string): void {
  if (theme) {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

/** Update the toggle button's visible icon and accessible label */
function updateButton(button: HTMLElement, theme: string): void {
  button.innerHTML = ICONS[theme] ?? ICONS[''];
  button.setAttribute('aria-label', ARIA_LABELS[theme] ?? ARIA_LABELS['']);
}
