# CascadiaJS '26 Learnings Playground

This repo is a hands-on playground for JavaScript and TypeScript developers who want to explore two modern patterns highlighted at CascadiaJS 2026: cutting-edge CSS color functions and documentation linking techniques that keep code and docs in sync. Clone it, run it, and edit the source files to see changes live in your browser.

---

## What's inside

- **CSS Color Functions** — working demos of `light-dark()`, `color-mix()`, `contrast-color()`, and modern CSS color notation (oklch, oklab, and the new `from` relative-color syntax).
- **Better Documentation Linking** — practical examples of TSDoc `{@link}`, `@see`, and a custom `@ref` annotation convention with a validation script that fails CI when a referenced doc file is missing.
- **Tools** — an overview of three tools from the conference: VideoJS, Wasp, and Kiro.

---

## Getting started

```bash
git clone https://github.com/kayla-himmel/cascadiajs26-learnings.git
cd cascadiajs26-learnings
npm install
npm run dev
```

Then open http://localhost:5173 in your browser. The site has three pages linked from the home page: CSS Color Functions, Documentation Linking, and Tools.

---

## Guided tour

This section tells you exactly which file to edit to see each demo update live in the browser (Vite's HMR refreshes instantly on save).

### CSS color functions

| What you want to try | File to edit |
|---|---|
| Change the light/dark color tokens | `src/css/themes.css` |
| Tweak the `color-mix()` percentages | `src/css/css-colors.css` — color-mix section |
| Change a `contrast-color()` button background | `src/css/css-colors.css` — contrast-color section |

### Documentation linking

| What you want to try | File to edit |
|---|---|
| Add a new `@ref` annotation | `src/ts/example.ts` |
| Break a `@ref` path to see `check:refs` fail | `src/ts/example.ts` — change a path to `docs/nonexistent.md` |
| Validate all `@ref` annotations | Run `npm run check:refs` in your terminal |

---

## Available scripts

```
npm run dev          # Start Vite dev server with HMR at http://localhost:5173
npm run build        # Type-check and produce a production build in dist/
npm run check:refs   # Validate every @ref annotation in src/ts/ against docs/
```

---

## Project structure

```
src/
  css-colors.html       <- CSS color function demos
  docs-linking.html     <- documentation linking guide
  tools.html            <- tools overview
  css/
    themes.css          <- edit me to change color tokens
    css-colors.css      <- edit me to tweak the CSS demos
  ts/
    example.ts          <- annotated @ref demo file
    theme-toggle.ts     <- light/dark toggle
docs/                   <- reference docs for each function
check-refs.mjs          <- @ref validation script
.github/workflows/
  refs.yml              <- CI check for broken @refs
```

---

## Talk references

- CSS color functions talk: https://jdsteinbach.com/practical-color-css/
- Linked Literate Programming (inspiration for `@ref`): https://github.com/ccheever/llp
