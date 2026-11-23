// build-web.js — regenerates the prompt data embedded in web/index.html
// from the prompt files in prompts/ so the browser can never go stale.
// Run: node scripts/build-web.js   (also documented in CONTRIBUTING.md)
// The browser reads the data from a <script type="application/json">
// block; this script replaces that block's contents. Idempotent.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'web', 'index.html');

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdown(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function parseFrontmatter(text) {
  const end = text.indexOf('\n---', 3);
  const data = {};
  for (const line of text.slice(4, end).split('\n')) {
    const m = line.trim().match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    data[m[1]] = v;
  }
  return { data, rest: text.slice(end + 4) };
}

// Extract the blockquote text under a given "## Heading" section.
function extractSection(rest, heading) {
  const lines = rest.split('\n');
  let inSection = false;
  const out = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inSection) break;
      if (line.trim() === `## ${heading}`) inSection = true;
      continue;
    }
    if (!inSection) continue;
    if (line.startsWith('> ')) out.push(line.slice(2));
    else if (line.trim() === '>') out.push('');
  }
  return out.join('\n').trim();
}

function buildData() {
  const files = walkMarkdown(path.join(ROOT, 'prompts')).filter(
    (f) => path.basename(f) !== 'README.md'
  );
  const prompts = files.map((file) => {
    const text = fs.readFileSync(file, 'utf8');
    const { data, rest } = parseFrontmatter(text);
    return {
      id: data.id,
      title: data.title,
      vertical: data.vertical,
      model: data.model,
      model_version: data.model_version,
      duration: data.duration,
      aspect_ratio: data.aspect_ratio,
      camera_motion: data.camera_motion,
      best_for: data.best_for || '',
      prompt: extractSection(rest, 'The prompt (copy-paste)'),
      negative_prompt: extractSection(rest, 'Negative prompt'),
      path: path.relative(ROOT, file),
    };
  });
  prompts.sort((a, b) => a.id.localeCompare(b.id));
  return prompts;
}

function main() {
  const prompts = buildData();
  const html = fs.readFileSync(INDEX, 'utf8');
  const re = /(<script type="application\/json" id="prompt-data">)[\s\S]*?(<\/script>)/;
  if (!re.test(html)) {
    console.error('build-web.js: could not find the #prompt-data block in web/index.html');
    process.exit(1);
  }
  const next = html.replace(re, `$1\n${JSON.stringify(prompts)}\n$2`);
  fs.writeFileSync(INDEX, next);
  console.log(`build-web.js: embedded ${prompts.length} prompts into web/index.html`);
}

if (require.main === module) main();

module.exports = { buildData, extractSection };
