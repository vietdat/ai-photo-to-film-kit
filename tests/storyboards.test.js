// storyboards.test.js — storyboard JSON is valid, timings sum exactly,
// and every prompt reference and photo exists.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseFrontmatter } = require('../scripts/validate.js');

const ROOT = path.resolve(__dirname, '..');
const STORYBOARDS_DIR = path.join(ROOT, 'storyboards');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const ALBUM_DIR = path.join(ROOT, 'examples', 'sample-album');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function promptIds() {
  const ids = new Set();
  const durations = new Map(); // prompt id -> clip length in seconds
  for (const f of walk(PROMPTS_DIR).filter((x) => path.basename(x) !== 'README.md')) {
    const { data } = parseFrontmatter(fs.readFileSync(f, 'utf8'), f);
    if (data && data.id) {
      ids.add(data.id);
      if (data.duration) durations.set(data.id, parseInt(data.duration, 10));
    }
  }
  return { ids, durations };
}

const { ids, durations } = promptIds();
const boards = fs.readdirSync(STORYBOARDS_DIR).filter((f) => f.endsWith('.json'));

test('storyboard files exist', () => {
  assert.ok(boards.includes('wedding-60s-reception-film.json'));
  assert.ok(boards.includes('anniversary-30s-film.json'));
  assert.ok(boards.includes('proposal-45s-film.json'));
});

for (const file of boards) {
  test(`${file}: valid JSON, timings sum exactly, references exist`, () => {
    const rel = `storyboards/${file}`;
    const sb = JSON.parse(fs.readFileSync(path.join(STORYBOARDS_DIR, file), 'utf8'));
    assert.ok(sb.id, `${rel}: missing id`);
    assert.ok(sb.vertical, `${rel}: missing vertical`);
    assert.equal(typeof sb.total_duration_seconds, 'number', `${rel}: missing total_duration_seconds`);
    assert.ok(Array.isArray(sb.shots) && sb.shots.length > 0, `${rel}: no shots`);
    assert.ok(sb.music && sb.music.mood, `${rel}: missing music notes`);

    let sum = 0;
    let expectedStart = 0;
    for (const [i, shot] of sb.shots.entries()) {
      const where = `${rel} shot ${i + 1} (${shot.id || '?'})`;
      assert.ok(shot.id, `${where}: missing id`);
      assert.ok(shot.type, `${where}: missing type`);
      assert.equal(typeof shot.duration_seconds, 'number', `${where}: bad duration_seconds`);
      assert.ok(shot.duration_seconds > 0, `${where}: duration must be positive`);
      sum += shot.duration_seconds;
      assert.equal(shot.start_seconds, expectedStart, `${where}: start_seconds should be ${expectedStart}`);
      assert.equal(
        shot.end_seconds, shot.start_seconds + shot.duration_seconds,
        `${where}: end_seconds must equal start + duration`
      );
      expectedStart = shot.end_seconds;
      assert.ok(shot.photo, `${where}: missing photo`);
      assert.ok(
        fs.existsSync(path.join(ALBUM_DIR, shot.photo)),
        `${where}: photo not in examples/sample-album/: ${shot.photo}`
      );
      if (shot.prompt_ref !== null && shot.prompt_ref !== undefined) {
        assert.ok(ids.has(shot.prompt_ref), `${where}: prompt_ref "${shot.prompt_ref}" does not exist`);
      } else {
        assert.equal(shot.type, 'title', `${where}: only title shots may omit prompt_ref`);
      }
      assert.ok(shot.camera, `${where}: missing camera`);
      assert.ok(shot.first_frame, `${where}: missing first_frame`);
      assert.ok(shot.last_frame, `${where}: missing last_frame`);
    }
    assert.equal(
      sum, sb.total_duration_seconds,
      `${rel}: shot timings sum to ${sum}s, total is ${sb.total_duration_seconds}s`
    );
  });

  test(`${file}: matching Markdown storyboard exists`, () => {
    const md = file.replace(/\.json$/, '.md');
    assert.ok(fs.existsSync(path.join(STORYBOARDS_DIR, md)), `storyboards/${md} missing`);
  });

  test(`${file}: every clip slot is no longer than its prompt's clip length`, () => {
    const sb = JSON.parse(fs.readFileSync(path.join(STORYBOARDS_DIR, file), 'utf8'));
    for (const shot of sb.shots) {
      if (!shot.prompt_ref) continue; // title shots are exempt
      assert.ok(
        durations.has(shot.prompt_ref),
        `${file} shot ${shot.id}: prompt "${shot.prompt_ref}" has no known clip length`
      );
      assert.ok(
        shot.duration_seconds <= durations.get(shot.prompt_ref),
        `${file} shot ${shot.id}: slot is ${shot.duration_seconds}s but prompt "${shot.prompt_ref}" only produces a ${durations.get(shot.prompt_ref)}s clip`
      );
    }
  });

  test(`${file}: Markdown table matches the JSON (shots, total, tempo)`, () => {
    const sb = JSON.parse(fs.readFileSync(path.join(STORYBOARDS_DIR, file), 'utf8'));
    const md = fs.readFileSync(path.join(STORYBOARDS_DIR, file.replace(/\.json$/, '.md')), 'utf8');
    // Shot rows look like: | 1 | 0:00–0:03 | 3s | photo | prompt | notes |
    const rowLengths = [...md.matchAll(/^\|\s*\d+\s*\|[^|]*\|\s*(\d+)s\s*\|/gm)].map((m) => Number(m[1]));
    assert.equal(rowLengths.length, sb.shots.length, `${file}: Markdown lists ${rowLengths.length} shots, JSON has ${sb.shots.length}`);
    assert.equal(
      rowLengths.reduce((a, b) => a + b, 0),
      sb.total_duration_seconds,
      `${file}: Markdown shot lengths sum to ${rowLengths.reduce((a, b) => a + b, 0)}s, JSON total is ${sb.total_duration_seconds}s`
    );
    const totalMatch = md.match(/\*\*Total length:\*\*\s*(\d+) seconds/);
    assert.ok(totalMatch, `${file}: Markdown is missing a "**Total length:** N seconds" line`);
    assert.equal(Number(totalMatch[1]), sb.total_duration_seconds, `${file}: Markdown total ${totalMatch[1]}s differs from JSON ${sb.total_duration_seconds}s`);
    const bpmMatch = md.match(/about (\d+) BPM/);
    assert.ok(bpmMatch, `${file}: Markdown is missing an "about N BPM" tempo`);
    assert.equal(Number(bpmMatch[1]), sb.music.tempo_bpm, `${file}: Markdown tempo ${bpmMatch[1]} BPM differs from JSON ${sb.music.tempo_bpm} BPM`);
  });
}
