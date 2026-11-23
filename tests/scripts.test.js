// scripts.test.js — shell scripts pass bash -n, the validator runs clean,
// and the skill has valid frontmatter.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRIPTS_DIR = path.join(ROOT, 'scripts');

test('all shell scripts pass bash -n', () => {
  const scripts = fs.readdirSync(SCRIPTS_DIR).filter((f) => f.endsWith('.sh'));
  assert.ok(scripts.length > 0, 'no shell scripts found');
  for (const script of scripts) {
    const res = spawnSync('bash', ['-n', path.join(SCRIPTS_DIR, script)], { encoding: 'utf8' });
    assert.equal(res.status, 0, `${script} failed bash -n: ${res.stderr}`);
  }
});

test('assemble-film.sh --help works', () => {
  const res = spawnSync('bash', [path.join(SCRIPTS_DIR, 'assemble-film.sh'), '--help'], { encoding: 'utf8' });
  assert.equal(res.status, 0, res.stderr);
  assert.match(res.stdout, /--album/);
  assert.match(res.stdout, /--storyboard/);
  assert.match(res.stdout, /--output/);
});

test('validate.js exits 0 on the current repo', () => {
  const out = execFileSync('node', [path.join(SCRIPTS_DIR, 'validate.js')], { encoding: 'utf8' });
  assert.match(out, /valid/);
});

test('skills/photo-to-film/SKILL.md has valid frontmatter', () => {
  const text = fs.readFileSync(path.join(ROOT, 'skills', 'photo-to-film', 'SKILL.md'), 'utf8');
  assert.ok(text.startsWith('---\n'), 'SKILL.md must start with YAML frontmatter');
  const end = text.indexOf('\n---', 3);
  assert.ok(end > 0, 'SKILL.md frontmatter is not closed');
  const front = text.slice(4, end);
  assert.match(front, /^name: photo-to-film$/m);
  assert.match(front, /^description: .+/m);
  assert.match(text, /model/i, 'skill should mention model selection');
});
