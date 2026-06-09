# color-mix()

## overview

`color-mix()` blends two colors together in a specified color space, returning the resulting mixed color. It eliminates the need for a preprocessor or JavaScript to generate tints, shades, and hover states — you can do it all in CSS at the call site.

## usage

```css
/* Mix 75% of a base color with 25% white, in the sRGB color space */
.swatch { background: color-mix(in srgb, #0066cc 75%, white); }

/* Generate a hover state that is 20% lighter */
.button:hover { background: color-mix(in srgb, var(--btn-color) 80%, white); }

/* Mix in oklch for perceptually uniform results */
.oklch-tint { background: color-mix(in oklch, #0066cc 60%, white); }
```

The color space parameter (`srgb`, `hsl`, `oklch`, `lab`, `display-p3`, etc.) controls the blending math. Different color spaces produce visually different midpoints — `oklch` tends to stay more vivid at 50/50 blends, while `srgb` can produce muddier results with complementary colors.

Percentages must sum to 100%. If only one percentage is given, the second color fills the remainder.

## how-it-works

The browser interpolates each channel of the two colors in the specified color space according to the given percentages, then converts the result back to the output color space for rendering. Because the interpolation happens in the declared color space, the choice of space meaningfully affects the result:

- `in srgb` — straightforward channel-by-channel linear blend
- `in hsl` — blends hue, saturation, and lightness; hue wraps around the color wheel
- `in oklch` — perceptually uniform; maintains chroma/lightness balance across hues
- `in lab` / `in oklab` — good for neutral, grey-safe blends

## browser-support

[View browser support on caniuse](https://caniuse.com/?search=color-mix)

Supported in all modern evergreen browsers as of 2023 (Chrome 111+, Firefox 113+, Safari 16.2+).

## see-also

- [light-dark()](./light-dark.md) — return different colors based on color scheme
- [contrast-color()](./contrast-color.md) — auto-pick black or white for readable text
- [Modern CSS Color Notation](./modern-color-notation.md) — space-separated channel values, Level 4 syntax
- [Better Documentation Linking](./better-docs-linking.md) — the `@ref` annotation convention used in this repo
- Live demo: `src/css-colors.html#color-mix`
