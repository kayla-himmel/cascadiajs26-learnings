# Better Documentation Linking

Notes from the CascadiaJS 2026 talk on Linked Literate Programming (LLP) adapted for TypeScript projects.

## tsdoc-natives

What TSDoc gives you natively:

- `{@link}` inline tag — clickable go-to-definition link in VS Code hover tooltips
- `@see` block tag — adds a "see also" cross-reference in JSDoc comments

Neither validates that the target actually exists. A `{@link}` to a renamed function silently becomes a dead link; a `@see` pointing at a deleted doc file is never caught at build time.

## ref-convention

The `@ref` custom convention used in this repo:

```ts
// @ref docs/light-dark.md#usage [describes] — describes what this code does
// @ref docs/better-docs-linking.md#ref-convention [meta] — explains this annotation format
```

Format: `// @ref <path>#<anchor> [relationship] — <note>`

- `path`: relative path from repo root to the doc file
- `anchor`: heading in that file (lowercase, spaces as hyphens)
- `relationship`: optional label like `[describes]`, `[constrains]`, `[meta]`
- `note`: human-readable explanation of why the reference is relevant

The `@ref` lines are plain comments — they do not affect runtime behavior or TypeScript compilation. Their value comes entirely from the validation step below.

## validation

`check-refs.mjs` at the repo root validates that:

1. All `@ref` file paths exist on disk
2. All `#anchor` headings exist in the target file

Run it: `npm run check:refs`

The script scans every `.ts` file under `src/` for lines matching `// @ref`, parses the path and anchor, then verifies both against the filesystem. Any broken reference exits with a non-zero status code and prints the offending file, line number, and the missing path or anchor.

## ci-check

`.github/workflows/refs.yml` runs `check-refs.mjs` on every push. CI fails if a ref is broken.

This closes the feedback loop that TSDoc's `{@link}` and `@see` leave open: documentation links are now validated the same way imports are — at CI time, before anything merges.

## see-also

- [TSDoc spec](https://tsdoc.org/)
- [Original talk: Linked Literate Programming](https://github.com/ccheever/llp)
- [light-dark()](./light-dark.md)
- [color-mix()](./color-mix.md)
- [contrast-color()](./contrast-color.md)
- [Modern CSS Color Notation](./modern-color-notation.md)
