/**
 * example.ts — Annotated TypeScript module demonstrating TSDoc documentation linking.
 *
 * This file shows three ways to cross-reference documentation in TypeScript:
 *   1. {@link} — clickable go-to-definition in VS Code hover tooltips
 *   2. @see — "see also" cross-reference in JSDoc block comments
 *   3. @ref — custom convention validated by check-refs.mjs (see docs/better-docs-linking.md)
 *
 * Try it:
 *   - Hover over a function name in VS Code to see the {@link} tooltip
 *   - Run `npm run check:refs` to validate all @ref paths
 *   - Break a @ref path on purpose and run check:refs to see it fail
 */

// @ref docs/better-docs-linking.md#ref-convention [meta] — this file uses the @ref convention
// @ref docs/light-dark.md#how-it-works [describes] — this module manages the light-dark() color scheme

/*
 * Try it:
 * 1. Hover over `applyColorScheme` in VS Code — you'll see the @see link in the tooltip
 * 2. Ctrl/Cmd+Click on `{@link getColorScheme}` to jump to its definition
 * 3. Run `npm run check:refs` — all refs should pass
 * 4. Change one @ref path to something invalid (e.g., docs/nonexistent.md)
 *    and run check:refs again — it will fail with a clear error
 */

/**
 * The color scheme the user has selected or that the system is using.
 *
 * - `'light'` — the page is in light mode (data-theme="light" on <html>)
 * - `'dark'`  — the page is in dark mode (data-theme="dark" on <html>)
 * - `'system'` — no explicit override; the browser's prefers-color-scheme media query controls the theme
 *
 * @see {@link applyColorScheme} to set this value programmatically
 * @see {@link getColorScheme} to read the current value
 */
export type ColorScheme = 'light' | 'dark' | 'system';

/**
 * Reads the current color scheme from the `data-theme` attribute on `<html>`.
 *
 * If the attribute is missing or not a recognised value, returns `'system'`
 * so the browser's own `prefers-color-scheme` media query stays in control.
 *
 * @returns The active {@link ColorScheme} — `'light'`, `'dark'`, or `'system'`.
 *
 * @see {@link applyColorScheme} to change the scheme
 *
 * @example
 * ```ts
 * const scheme = getColorScheme();
 * console.log(scheme); // 'light' | 'dark' | 'system'
 * ```
 */
export function getColorScheme(): ColorScheme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') {
    return attr;
  }
  return 'system';
}

// @ref docs/light-dark.md#usage [describes] — this function drives the light-dark() switch
/**
 * Sets the active color scheme by writing `data-theme` onto the `<html>` element.
 *
 * Passing `'system'` removes the attribute entirely, letting the browser's
 * `prefers-color-scheme` media query take over — no explicit override is stored.
 *
 * @param scheme — The {@link ColorScheme} to apply.
 *
 * @returns `void`
 *
 * @see {@link getColorScheme} to read the current scheme before toggling
 *
 * @example
 * ```ts
 * applyColorScheme('dark');   // forces dark mode
 * applyColorScheme('system'); // reverts to OS preference
 * ```
 */
export function applyColorScheme(scheme: ColorScheme): void {
  if (scheme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', scheme);
  }
}

// @ref docs/color-mix.md#usage [describes] — this function produces color-mix() CSS values
/**
 * Builds a CSS `color-mix()` expression that blends two colors.
 *
 * The returned string is ready to use anywhere a CSS `<color>` is valid —
 * including inside `light-dark()` calls or custom property declarations.
 *
 * @param base       — The starting color (e.g. `'oklch(60% 0.2 240)'`).
 * @param mixer      — The color to blend into `base`.
 * @param percentage — How much of `mixer` to include, as a number 0–100.
 *
 * @returns A `color-mix(in oklch, ...)` CSS string.
 *
 * @see {@link getContrastColor} for choosing a readable foreground over the result
 *
 * @example
 * ```ts
 * const blended = mixColors('oklch(60% 0.2 240)', 'white', 20);
 * // 'color-mix(in oklch, oklch(60% 0.2 240), white 20%)'
 * element.style.backgroundColor = blended;
 * ```
 */
export function mixColors(base: string, mixer: string, percentage: number): string {
  return `color-mix(in oklch, ${base}, ${mixer} ${percentage}%)`;
}

// @ref docs/contrast-color.md#overview [describes] — this function wraps contrast-color()
/**
 * Builds a CSS `contrast-color()` expression that automatically selects
 * a high-contrast foreground for the given background.
 *
 * The browser picks either `white` or `black` (or a custom color when the
 * full `contrast-color()` syntax is supported) to ensure the text meets
 * WCAG contrast requirements against `background`.
 *
 * @param background — A CSS `<color>` value to test against
 *                     (e.g. `'oklch(40% 0.15 300)'` or a custom-property reference).
 *
 * @returns A `contrast-color(...)` CSS string suitable for a `color` property.
 *
 * @see {@link mixColors} to produce the background color before calling this
 *
 * @example
 * ```ts
 * const fg = getContrastColor('oklch(40% 0.15 300)');
 * // 'contrast-color(oklch(40% 0.15 300))'
 * element.style.color = fg;
 * ```
 */
export function getContrastColor(background: string): string {
  return `contrast-color(${background})`;
}
