# light-dark()

## overview

`light-dark()` is a CSS function that returns one of two color values depending on the active `color-scheme` — light or dark. It lets you define your full color palette in one place and have the browser automatically select the right value, with no media queries and no duplicate rule sets.

## usage

Declare `color-scheme` on `:root` to tell the browser which schemes your page supports, then use `light-dark()` for any value that should differ between themes:

```css
:root {
  color-scheme: light dark;
  --surface: light-dark(#f5f5f5, #1a1a1a);
  --text:    light-dark(#111111, #f0f0f0);
}

/* Force a specific theme regardless of OS preference */
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"]  { color-scheme: dark; }
```

The first argument is the light-mode value; the second is the dark-mode value.

## how-it-works

`color-scheme` is an inherited CSS property (also settable via the `<meta name="color-scheme">` HTML tag or HTTP header) that signals to the browser which color schemes an element supports. The browser resolves it against the user's OS-level preference.

`light-dark()` reads the computed value of `color-scheme` on the element it's applied to and returns the corresponding argument:

- If `color-scheme` resolves to `light`, the first argument is used.
- If `color-scheme` resolves to `dark`, the second argument is used.

Setting `color-scheme: light` or `color-scheme: dark` on a `[data-theme]` attribute overrides the OS preference for the entire subtree, which is how a manual theme toggle works without JavaScript having to touch every CSS variable individually.

## browser-support

[View browser support on caniuse](https://caniuse.com/?search=light-dark)

As of 2025, `light-dark()` is supported in all modern evergreen browsers (Chrome 123+, Firefox 120+, Safari 17.5+).

## see-also

- [color-mix()](./color-mix.md) — mix two colors in a given color space
- [contrast-color()](./contrast-color.md) — auto-pick black or white for readable text
- [Modern CSS Color Notation](./modern-color-notation.md) — space-separated channel values, Level 4 syntax
- [Better Documentation Linking](./better-docs-linking.md) — the `@ref` annotation convention used in this repo
- Live demo: `src/css-colors.html#light-dark`
