// web.test.js — the prompt browser's embedded data matches prompts/.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildData } = require('../scripts/build-web.js');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'web', 'index.html');

function embeddedData() {
  const html = fs.readFileSync(INDEX, 'utf8');
  const m = html.match(/<script type="application\/json" id="prompt-data">([\s\S]*?)<\/script>/);
  assert.ok(m, 'web/index.html is missing the #prompt-data block');
  return JSON.parse(m[1]);
}

test('web/index.html exists and has the browser UI', () => {
  assert.ok(fs.existsSync(INDEX), 'web/index.html missing');
  const html = fs.readFileSync(INDEX, 'utf8');
  assert.match(html, /id="search"/, 'missing search box');
  assert.match(html, /id="vertical"/, 'missing vertical filter');
  assert.match(html, /id="model"/, 'missing model filter');
  assert.match(html, /Copy prompt/, 'missing copy-prompt button');
  assert.match(html, /PROMPTS/, 'missing prompt data wiring');
});

test('embedded prompt data matches prompts/', () => {
  const embedded = embeddedData();
  const expected = buildData();
  assert.ok(embedded.length > 0, 'no prompts embedded');
  assert.equal(embedded.length, expected.length, 'embedded prompt count differs from prompts/');
  const byId = new Map(embedded.map((p) => [p.id, p]));
  for (const want of expected) {
    const got = byId.get(want.id);
    assert.ok(got, `prompt ${want.id} is missing from web/index.html`);
    for (const field of ['title', 'vertical', 'model', 'model_version', 'duration', 'aspect_ratio', 'camera_motion', 'prompt', 'negative_prompt', 'path']) {
      assert.equal(got[field], want[field], `prompt ${want.id}: field "${field}" differs between web/index.html and prompts/`);
    }
  }
});

test('every embedded prompt has model, version, duration, aspect, camera', () => {
  for (const p of embeddedData()) {
    for (const field of ['model', 'model_version', 'duration', 'aspect_ratio', 'camera_motion']) {
      assert.ok(p[field], `prompt ${p.id}: missing ${field} in web data`);
    }
    assert.ok(p.prompt && p.prompt.length > 50, `prompt ${p.id}: prompt text too short`);
  }
});
