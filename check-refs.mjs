/**
 * check-refs.mjs — Validates @ref annotations in TypeScript source files.
 *
 * What it does:
 *   Scans every .ts file under src/ts/ for lines that contain a @ref annotation,
 *   then checks that the referenced file (and optional heading anchor) actually
 *   exists in the repository. Exits with code 0 if all refs are valid, or code 1
 *   if any are broken.
 *
 * How to run:
 *   npm run check:refs
 *   node check-refs.mjs
 *
 * What a @ref annotation looks like:
 *   // @ref docs/some-file.md#some-heading [relationship] — optional freeform note
 *
 *   The path is relative to the repository root.
 *   The #anchor is optional; when present it must match a `## <anchor>` heading
 *   in the target file (case-sensitive, exact text match).
 *   The bracketed relationship label and trailing comment are ignored by this script.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = __dirname;
const TS_DIR = join(REPO_ROOT, 'src', 'ts');

/**
 * Matches lines like:
 *   // @ref docs/foo.md#bar-heading [label] — note
 *
 * Capture groups:
 *   [1] file path  (e.g. "docs/foo.md")
 *   [2] anchor     (e.g. "#bar-heading") — may be undefined
 */
const REF_REGEX = /\/\/\s*@ref\s+([\w./\-]+)(#[\w\-]+)?/;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect every .ts file under a directory. */
function collectTsFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

/** Return true if a markdown file contains a heading that exactly matches the anchor text. */
function anchorExistsInFile(filePath, anchor) {
  // anchor arrives as "#ref-convention" — strip the leading #
  const headingText = anchor.slice(1);
  const content = readFileSync(filePath, 'utf8');
  // Match lines like "## ref-convention" (with any trailing whitespace)
  const headingRegex = new RegExp(`^##\\s+${escapeRegex(headingText)}\\s*$`, 'm');
  return headingRegex.test(content);
}

/** Escape special regex characters in a plain string. */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Pad a string to a minimum width with trailing spaces. */
function padEnd(str, width) {
  return str.length >= width ? str : str + ' '.repeat(width - str.length);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log('Checking @ref annotations in src/ts/...\n');

const tsFiles = collectTsFiles(TS_DIR);
let totalChecked = 0;
let totalFailed = 0;

for (const filePath of tsFiles) {
  const lines = readFileSync(filePath, 'utf8').split('\n');
  // Make the path relative to the repo root for display
  const displayFile = filePath.replace(REPO_ROOT + '/', '');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = REF_REGEX.exec(line);
    if (!match) continue;

    const refPath = match[1];
    const anchor = match[2]; // may be undefined
    const lineNumber = i + 1;

    const label = `${displayFile}:${lineNumber}`;
    const refDisplay = refPath + (anchor ?? '');

    // Resolve the referenced file relative to the repo root
    const absoluteRefPath = join(REPO_ROOT, refPath);

    let passed = true;
    let reason = '';

    if (!existsSync(absoluteRefPath)) {
      passed = false;
      reason = `file not found: ${refPath}`;
    } else if (anchor && !anchorExistsInFile(absoluteRefPath, anchor)) {
      passed = false;
      reason = `heading "${anchor.slice(1)}" not found in ${refPath}`;
    }

    const status = passed ? '✅' : '❌';
    console.log(`${padEnd(label, 28)} @ref ${padEnd(refDisplay, 42)} ${status}${reason ? `  — ${reason}` : ''}`);

    totalChecked++;
    if (!passed) totalFailed++;
  }
}

console.log('');

if (totalChecked === 0) {
  console.log('No @ref annotations found.');
  process.exit(0);
} else if (totalFailed === 0) {
  console.log(`${totalChecked} refs checked, 0 failed. All good!`);
  process.exit(0);
} else {
  console.log(`${totalChecked} refs checked, ${totalFailed} failed.`);
  process.exit(1);
}
