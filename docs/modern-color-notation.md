# Modern CSS Color Notation

## overview

CSS Color Level 4 introduced a cleaner syntax for color functions: space-separated channel values with a `/` separator before the alpha component. The old comma-separated `rgba()` and `hsla()` forms still work, but the new syntax is more consistent, more readable, and now widely supported across all modern browsers.

## usage

```css
/* Old — comma-separated; alpha requires the 'a' suffix variant */
rgba(25, 25, 25, 0.8)
hsla(120, 50%, 50%, 0.4)

/* New — space-separated channels; alpha after / ; no 'a' suffix needed */
rgb(25 25 25 / 0.8)
hsl(120 50% 50% / 0.4)
```

Both pairs above render identically. The new syntax works for `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklch()`, and `oklab()`.

## how-it-works

Three changes define the Level 4 syntax:

1. **No commas between channels.** Values are space-separated: `rgb(25 25 25)` instead of `rgb(25, 25, 25)`.
2. **Alpha is separated by `/`.** The alpha value comes after a forward slash: `rgb(25 25 25 / 0.8)`. Omitting the slash and alpha defaults to fully opaque.
3. **No `a` suffix needed.** `rgb()` and `hsl()` (and all other color functions) accept an optional alpha component in Level 4, so `rgba()` and `hsla()` are no longer necessary. They remain valid aliases for backward compatibility, but writing `rgb()` with a `/` alpha is preferred.

The new syntax is part of a broader effort in CSS Color Level 4 to unify how all color functions work — the same space-separated-with-alpha pattern applies across `lab()`, `oklch()`, and others that were never given an `a`-suffix variant to begin with.

## browser-support

[Browser support for modern color notation (caniuse.com)](https://caniuse.com/mdn-css_types_color_space_separated_functional_notation)

Supported in all modern evergreen browsers. Chrome 65+, Firefox 52+, Safari 12.1+.

## see-also

- [light-dark()](./light-dark.md) — return different colors based on color scheme
- [color-mix()](./color-mix.md) — mix two colors in a given color space
- [contrast-color()](./contrast-color.md) — auto-pick black or white for readable text
- [Better Documentation Linking](./better-docs-linking.md) — the `@ref` annotation convention used in this repo
- Live demo: `src/css-colors.html#modern-color-notation`
- [CSS Color Level 4 spec](https://www.w3.org/TR/css-color-4/)
