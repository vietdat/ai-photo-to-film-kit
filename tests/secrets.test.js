// secrets.test.js — no secrets or API keys anywhere in the repo.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

// Patterns for real credential formats. Obvious placeholders such as
// FAL_KEY=your-key-here do not match these.
const PATTERNS = [
  { name: 'OpenAI-style key', re: /sk-[A-Za-z0-9]{20,}/ },
  { name: 'AWS access key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'GitHub PAT', re: /ghp_[A-Za-z0-9]{36}/ },
  { name: 'GitHub fine-grained PAT', re: /github_pat_[A-Za-z0-9_]{20,}/ },
  { name: 'Slack token', re: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'private key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'generic api_key assignment', re: /api[_-]?key\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i },
  { name: 'generic token assignment', re: /(?:FAL_KEY|REPLICATE_API_TOKEN)\s*=\s*['"]?[A-Za-z0-9_\-]{16,}['"]?/ },
];

const SKIP_DIRS = new Set(['.git', 'node_modules']);
const SKIP_EXTS = new Set(['.mp4', '.jpg', '.jpeg', '.png', '.gif']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out);
    } else if (e.isFile() && !SKIP_EXTS.has(path.extname(e.name).toLowerCase())) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

test('no secrets or API keys in the repo', () => {
  const hits = [];
  for (const file of walk(ROOT)) {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, 'utf8');
    for (const line of text.split('\n')) {
      // Placeholders are explicitly allowed.
      if (/your-(key|token)-here/.test(line)) continue;
      for (const { name, re } of PATTERNS) {
        if (re.test(line)) hits.push(`${rel}: ${name}: ${line.trim().slice(0, 120)}`);
      }
    }
  }
  assert.deepEqual(hits, [], `possible secrets found:\n${hits.join('\n')}`);
});

test('no lorem ipsum in user-facing content', () => {
  // Only content dirs are scanned: tests and tooling legitimately mention
  // "lorem ipsum" when describing the rule itself.
  const contentDirs = ['prompts', 'storyboards', 'tutorials', 'web', 'skills', 'examples'];
  const hits = [];
  for (const dir of contentDirs) {
    for (const file of walk(path.join(ROOT, dir))) {
      if (/lorem ipsum/i.test(fs.readFileSync(file, 'utf8'))) hits.push(path.relative(ROOT, file));
    }
  }
  if (/lorem ipsum/i.test(fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8'))) {
    hits.push('README.md');
  }
  assert.deepEqual(hits, [], `lorem ipsum found in: ${hits.join(', ')}`);
});
