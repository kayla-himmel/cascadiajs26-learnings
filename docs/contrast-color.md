# contrast-color()

## overview

`contrast-color()` automatically returns whichever of black or white has better contrast against a given background color. It eliminates manual contrast math and keeps text readable on any dynamically-set background color.

**Note: this is experimental — limited browser support.** As of 2025, only a small number of browsers ship this function. Check the caniuse link below before using in production.

## usage

```css
.button {
  background: var(--btn-color);
  /* Automatically picks black or white — whichever is more readable */
  color: contrast-color(var(--btn-color));
}
```

The argument is any valid CSS `<color>` value, including custom properties, `light-dark()`, `color-mix()`, or computed values.

## how-it-works

The browser computes the relative luminance of the supplied color (per the WCAG 2.x algorithm), then returns:

- `black` (`#000000`) if it provides a higher contrast ratio against the background
- `white` (`#ffffff`) if it provides a higher contrast ratio against the background

This is effectively the same calculation a developer would perform manually using the WCAG contrast-ratio formula — `contrast-color()` just does it natively in CSS, with no JavaScript and no build step.

Because the output is always either black or white, `contrast-color()` guarantees at minimum a ~4.5:1 contrast ratio on any solid background that is not a perfectly mid-grey (where both would be equally poor). For edge cases, the spec defines a tiebreaker in favor of black.

## browser-support

[View browser support on caniuse](https://caniuse.com/?search=contrast-color)

Support is very limited. As of mid-2025, only experimental/flag-gated builds support this function. Plan a fallback for any production use.

## see-also

- [light-dark()](./light-dark.md) — return different colors based on color scheme
- [color-mix()](./color-mix.md) — mix two colors in a given color space
- [Modern CSS Color Notation](./modern-color-notation.md) — space-separated channel values, Level 4 syntax
- [Better Documentation Linking](./better-docs-linking.md) — the `@ref` annotation convention used in this repo
- Live demo: `src/css-colors.html#contrast-color`
- [WCAG 2.x contrast ratio algorithm](https://www.w3.org/TR/WCAG21/#contrast-minimum)
