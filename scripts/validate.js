// validate.js — checks prompt files and storyboard JSON against the repo schema.
// Run: node scripts/validate.js   (also run by the test suite)
// Exit code 0 = everything valid, 1 = problems found. No dependencies.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const STORYBOARDS_DIR = path.join(ROOT, 'storyboards');
const ALBUM_DIR = path.join(ROOT, 'examples', 'sample-album');

const REQUIRED_PROMPT_FIELDS = [
  'id',
  'title',
  'vertical',
  'model',
  'model_version',
  'duration',
  'aspect_ratio',
  'camera_motion',
];
const ALLOWED_MODELS = new Set(['Kling', 'Runway', 'Wan', 'Veo']);
const ALLOWED_VERTICALS = new Set(['wedding', 'anniversary', 'proposal', 'general']);

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdown(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

// Minimal YAML-frontmatter parser: only the flat `key: value` lines this
// repo uses. Values may be quoted.
function parseFrontmatter(text, file) {
  const errors = [];
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) {
    return { data: null, errors: [`${file}: missing YAML frontmatter`] };
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) {
    return { data: null, errors: [`${file}: frontmatter is not closed`] };
  }
  const data = {};
  const body = text.slice(4, end);
  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const m = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) {
      errors.push(`${file}: cannot parse frontmatter line: ${line}`);
      continue;
    }
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, errors, rest: text.slice(end + 4) };
}

function validatePrompts() {
  const errors = [];
  const ids = new Map(); // id -> file
  const durations = new Map(); // id -> clip length in seconds
  const files = walkMarkdown(PROMPTS_DIR).filter(
    (f) => path.basename(f) !== 'README.md'
  );
  if (files.length === 0) errors.push('prompts/: no prompt files found');
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, 'utf8');
    const { data, errors: parseErrors, rest } = parseFrontmatter(text, rel);
    errors.push(...parseErrors);
    if (!data) continue;
    for (const field of REQUIRED_PROMPT_FIELDS) {
      if (!data[field]) errors.push(`${rel}: missing required field "${field}"`);
    }
    if (data.vertical && !ALLOWED_VERTICALS.has(data.vertical)) {
      errors.push(`${rel}: unknown vertical "${data.vertical}"`);
    }
    if (data.model && !ALLOWED_MODELS.has(data.model)) {
      errors.push(`${rel}: unknown model "${data.model}"`);
    }
    if (data.duration && !/^\d+s$/.test(data.duration)) {
      errors.push(`${rel}: duration "${data.duration}" must look like "10s"`);
    }
    if (data.aspect_ratio && !/^\d+:\d+$/.test(data.aspect_ratio)) {
      errors.push(`${rel}: aspect_ratio "${data.aspect_ratio}" must look like "16:9"`);
    }
    if (data.id) {
      if (ids.has(data.id)) {
        errors.push(`${rel}: duplicate prompt id "${data.id}" (also in ${ids.get(data.id)})`);
      }
      ids.set(data.id, rel);
      if (data.duration) durations.set(data.id, parseInt(data.duration, 10));
      const expectedDir = path.join(PROMPTS_DIR, data.vertical || '');
      if (data.vertical && ALLOWED_VERTICALS.has(data.vertical) &&
          !file.startsWith(expectedDir + path.sep)) {
        errors.push(`${rel}: prompt with vertical "${data.vertical}" lives outside prompts/${data.vertical}/`);
      }
    }
    if (rest && !rest.includes('## The prompt')) {
      errors.push(`${rel}: missing "## The prompt" section`);
    }
    if (/lorem ipsum/i.test(text)) {
      errors.push(`${rel}: contains lorem ipsum placeholder text`);
    }
  }
  return { errors, ids, durations };
}

function validateStoryboards(promptIds, promptDurations) {
  const errors = [];
  const files = fs.readdirSync(STORYBOARDS_DIR).filter((f) => f.endsWith('.json'));
  if (files.length === 0) errors.push('storyboards/: no storyboard JSON found');
  for (const file of files) {
    const rel = path.relative(ROOT, path.join(STORYBOARDS_DIR, file));
    let sb;
    try {
      sb = JSON.parse(fs.readFileSync(path.join(STORYBOARDS_DIR, file), 'utf8'));
    } catch (e) {
      errors.push(`${rel}: invalid JSON (${e.message})`);
      continue;
    }
    if (!sb.id) errors.push(`${rel}: missing "id"`);
    if (!sb.vertical) errors.push(`${rel}: missing "vertical"`);
    if (typeof sb.total_duration_seconds !== 'number') {
      errors.push(`${rel}: missing numeric "total_duration_seconds"`);
      continue;
    }
    if (!Array.isArray(sb.shots) || sb.shots.length === 0) {
      errors.push(`${rel}: "shots" must be a non-empty array`);
      continue;
    }
    if (!sb.music || !sb.music.mood) errors.push(`${rel}: missing music notes`);
    let sum = 0;
    let expectedStart = 0;
    sb.shots.forEach((shot, i) => {
      const where = `${rel} shot ${i + 1} (${shot.id || '?'})`;
      if (!shot.id) errors.push(`${where}: missing "id"`);
      if (!shot.type) errors.push(`${where}: missing "type"`);
      if (typeof shot.duration_seconds !== 'number' || shot.duration_seconds <= 0) {
        errors.push(`${where}: bad "duration_seconds"`);
        return;
      }
      sum += shot.duration_seconds;
      if (shot.start_seconds !== expectedStart) {
        errors.push(`${where}: start_seconds ${shot.start_seconds} but previous shots end at ${expectedStart}`);
      }
      if (shot.end_seconds !== shot.start_seconds + shot.duration_seconds) {
        errors.push(`${where}: end_seconds must equal start_seconds + duration_seconds`);
      }
      expectedStart = shot.start_seconds + shot.duration_seconds;
      if (!shot.photo) {
        errors.push(`${where}: missing "photo"`);
      } else if (!fs.existsSync(path.join(ALBUM_DIR, shot.photo))) {
        errors.push(`${where}: photo not found in examples/sample-album/: ${shot.photo}`);
      }
      if (shot.prompt_ref !== null && shot.prompt_ref !== undefined) {
        if (!promptIds.has(shot.prompt_ref)) {
          errors.push(`${where}: prompt_ref "${shot.prompt_ref}" does not exist in prompts/`);
        } else if (promptDurations && promptDurations.has(shot.prompt_ref)) {
          // A storyboard slot must be no longer than the clip its prompt
          // produces — you can trim a clip, never stretch it.
          const clipSeconds = promptDurations.get(shot.prompt_ref);
          if (shot.duration_seconds > clipSeconds) {
            errors.push(`${where}: slot is ${shot.duration_seconds}s but prompt "${shot.prompt_ref}" only produces a ${clipSeconds}s clip`);
          }
        }
      } else if (shot.type !== 'title') {
        errors.push(`${where}: non-title shot without a prompt_ref`);
      }
      if (!shot.camera) errors.push(`${where}: missing "camera"`);
      if (!shot.first_frame) errors.push(`${where}: missing "first_frame"`);
      if (!shot.last_frame) errors.push(`${where}: missing "last_frame"`);
    });
    if (sum !== sb.total_duration_seconds) {
      errors.push(`${rel}: shot timings sum to ${sum}s, but total_duration_seconds is ${sb.total_duration_seconds}s`);
    }
  }
  return errors;
}

function validate() {
  const errors = [];
  const { errors: promptErrors, ids, durations } = validatePrompts();
  errors.push(...promptErrors);
  errors.push(...validateStoryboards(ids, durations));
  return errors;
}

if (require.main === module) {
  const errors = validate();
  if (errors.length === 0) {
    console.log('validate.js: all prompt files and storyboards are valid.');
  } else {
    console.error(`validate.js: ${errors.length} problem(s):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
}

module.exports = { validate, validatePrompts, validateStoryboards, parseFrontmatter };
