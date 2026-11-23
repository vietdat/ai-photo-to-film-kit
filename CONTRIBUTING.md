# Contributing to ai-photo-to-film-kit

Thanks for helping make this kit better. A few ground rules keep the repo
honest and usable:

## What we accept

- New prompt templates for the wedding, anniversary, or proposal verticals
  (or a genuinely new vertical, with a storyboard to match).
- New storyboards, tutorial improvements, and fixes to the ffmpeg assembly
  script.
- Corrections to model names, versions, durations, and aspect ratios as
  providers change them.

## Prompt rules

Every prompt file must:

- Live under `prompts/<vertical>/` with YAML frontmatter: `id`, `title`,
  `vertical`, `model`, `model_version`, `duration`, `aspect_ratio`,
  `camera_motion`.
- Contain a real, copy-paste-ready prompt — no placeholder text, no
  lorem ipsum.
- State a duration the named model actually supports (for example, Kling
  image-to-video clips are 5 or 10 seconds; Veo clips are 8 seconds).
- Describe only formulas that are real and standard. If you are unsure
  about a formula detail, keep it generic rather than inventing specs.

## Storyboard rules

- Shot timings in a storyboard JSON must sum exactly to the stated total.
- Every `prompt_ref` must point at a prompt file that exists in `prompts/`.
- Every `photo` must point at a file that exists in
  `examples/sample-album/`.

## Media honesty

- Do not submit real client wedding photos. Sample photos must be
  free-license (Unsplash, Pexels, or similar) with attribution recorded in
  `examples/CREDITS.md`, or clearly labelled placeholders.
- Never present an AI-generated image as a real wedding photo, and never
  claim an AI-generated video clip exists. The only reproducible video
  output in this repo is the ffmpeg motion-from-stills assembly, and it
  must stay labelled as such.
- No prices, no invented star/download counts, no invented testimonials.

## Secrets

Never commit API keys or credentials. Keys appear only as obvious
placeholders such as `FAL_KEY=your-key-here`. The test suite scans for
common key patterns and will fail the build if one slips in.

## Before you open a pull request

```bash
npm test          # all tests must pass
bash -n scripts/*.sh
```

If you changed `prompts/`, regenerate the prompt browser data so
`web/index.html` stays in sync:

```bash
npm run build:web
```
