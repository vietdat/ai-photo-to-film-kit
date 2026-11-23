// prompts.test.js — every prompt file parses and has all required fields.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseFrontmatter } = require('../scripts/validate.js');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');

const REQUIRED = [
  'id', 'title', 'vertical', 'model', 'model_version',
  'duration', 'aspect_ratio', 'camera_motion',
];
const MODELS = new Set(['Kling', 'Runway', 'Wan', 'Veo']);
const VERTICALS = new Set(['wedding', 'anniversary', 'proposal', 'general']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const files = walk(PROMPTS_DIR).filter((f) => path.basename(f) !== 'README.md');

test('there are prompt files in every vertical', () => {
  const counts = { wedding: 0, anniversary: 0, proposal: 0, general: 0 };
  for (const f of files) {
    const vertical = path.basename(path.dirname(f));
    counts[vertical] = (counts[vertical] || 0) + 1;
  }
  assert.ok(counts.wedding >= 15, `wedding prompts: ${counts.wedding}, need >= 15`);
  assert.ok(counts.anniversary >= 8, `anniversary prompts: ${counts.anniversary}, need >= 8`);
  assert.ok(counts.proposal >= 8, `proposal prompts: ${counts.proposal}, need >= 8`);
  assert.ok(counts.general >= 1, `general prompts: ${counts.general}, need >= 1`);
});

test('every prompt file parses and has all required fields', () => {
  const ids = new Set();
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, 'utf8');
    const { data, errors, rest } = parseFrontmatter(text, rel);
    assert.equal(errors.length, 0, `${rel}: ${errors.join('; ')}`);
    assert.ok(data, `${rel}: no frontmatter`);
    for (const field of REQUIRED) {
      assert.ok(data[field], `${rel}: missing required field "${field}"`);
    }
    assert.ok(VERTICALS.has(data.vertical), `${rel}: unknown vertical "${data.vertical}"`);
    assert.ok(MODELS.has(data.model), `${rel}: unknown model "${data.model}"`);
    assert.match(data.duration, /^\d+s$/, `${rel}: bad duration "${data.duration}"`);
    assert.match(data.aspect_ratio, /^\d+:\d+$/, `${rel}: bad aspect_ratio "${data.aspect_ratio}"`);
    assert.ok(!ids.has(data.id), `${rel}: duplicate id "${data.id}"`);
    ids.add(data.id);
    assert.ok(rest.includes('## The prompt'), `${rel}: missing "## The prompt" section`);
    assert.ok(!/lorem ipsum/i.test(text), `${rel}: contains lorem ipsum`);
  }
});

test('prompt durations are plausible for the named model', () => {
  // Kling 5s/10s, Runway 5s/10s, Wan 5s, Veo 8s — the durations this kit uses.
  const allowed = { Kling: ['5s', '10s'], Runway: ['5s', '10s'], Wan: ['5s'], Veo: ['8s'] };
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const { data } = parseFrontmatter(fs.readFileSync(file, 'utf8'), rel);
    assert.ok(
      allowed[data.model].includes(data.duration),
      `${rel}: ${data.model} with duration ${data.duration} (expected one of ${allowed[data.model].join(', ')})`
    );
  }
});
