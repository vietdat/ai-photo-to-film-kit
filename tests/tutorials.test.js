// tutorials.test.js — every file referenced by the tutorials exists.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TUTORIALS_DIR = path.join(ROOT, 'tutorials');

const PREFIXES = ['prompts/', 'storyboards/', 'scripts/', 'examples/', 'web/', 'skills/', 'tutorials/'];

test('tutorial files exist', () => {
  const expected = [
    '01-photo-prep.md',
    '02-storyboard.md',
    '03-generate.md',
    '04-ffmpeg-assembly.md',
    '05-music-and-export.md',
    '06-troubleshooting.md',
  ];
  for (const f of expected) {
    assert.ok(fs.existsSync(path.join(TUTORIALS_DIR, f)), `tutorials/${f} missing`);
  }
});

test('every repo file referenced in tutorials exists', () => {
  const files = fs.readdirSync(TUTORIALS_DIR).filter((f) => f.endsWith('.md'));
  const missing = [];
  for (const file of files) {
    const text = fs.readFileSync(path.join(TUTORIALS_DIR, file), 'utf8');
    // Inline-code references to repo paths, e.g. `prompts/wedding/x.md`.
    const refs = [...text.matchAll(/`((?:prompts|storyboards|scripts|examples|web|skills|tutorials)\/[^`\s]+)`/g)];
    for (const [, ref] of refs) {
      const clean = ref.replace(/\/$/, '');
      if (!fs.existsSync(path.join(ROOT, clean))) {
        missing.push(`tutorials/${file} references missing file: ${ref}`);
      }
    }
  }
  assert.deepEqual(missing, [], missing.join('\n'));
});
