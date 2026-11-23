# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Runway Aleph 2 prompt template: `prompts/general/general-aleph-golden-hour-relight.md`
  (37 → 38 prompt templates).
- Validator guard: a storyboard slot may not be longer than the clip its
  referenced prompt produces (`scripts/validate.js`).
- Test comparing each storyboard's Markdown table with its JSON (shot
  count, total duration, tempo) (`tests/storyboards.test.js`).

### Fixed

- Storyboard slots that were longer than their prompt's clip length
  (Wan 2.2 clips are 5s): wedding w03 7s → 5s, with the freed seconds
  moved to w09/w10; wedding w05, anniversary a03, and proposal p03
  re-pointed at prompts whose clip lengths fit their slots.
- Storyboard prompt/photo pairings that contradicted each other
  (wedding w07/w08/w10, proposal p02/p05/p07, anniversary a06).
- Veo wording: prompts no longer call 8 seconds a fixed clip length —
  this kit standardises on 8 seconds; Veo 3.1 also supports 4s and 6s.
- Tutorial 04: ffmpeg output is `yuv420p` (full-range), not plain
  `yuv420p`.
- DISTRIBUTION.md: removed an unverifiable first-person claim, made the
  X thread link placement consistent, and softened the r/VideoEditing
  tutorial claim to "check the current rules".

## [1.0.0] - 2026-11-22

### Added

- 37 copy-paste-ready prompt templates: 15 wedding, 8 anniversary,
  8 proposal, 6 general cinematic motion formulas.
- Three complete storyboards (JSON + Markdown) with exact timings:
  wedding 60-second reception film, anniversary 30-second film,
  proposal 45-second film.
- Six-step tutorial: photo prep, storyboard, generation (Kling / Runway /
  Wan via Fal / Replicate), ffmpeg assembly, music and export,
  troubleshooting.
- `scripts/assemble-film.sh`: ffmpeg assembly with Ken Burns-style
  zoompan motion, crossfades, and a title card.
- `scripts/validate.js`: validates prompt frontmatter and storyboard JSON.
- `web/index.html`: single-file prompt browser with search, filters, and
  copy-prompt buttons. No build step, no dependencies.
- `skills/photo-to-film/SKILL.md`: Claude skill with a model selector and
  a prompt translator.
- `examples/sample-album/`: 10 free-license wedding photos from Unsplash,
  with attribution in `examples/CREDITS.md`.
- `examples/finished-film/`: reproducible 60-second wedding film built
  from the sample album with the ffmpeg script (motion-from-stills,
  honestly labelled — not AI-generated motion).
- Test suite (`node:test`) covering prompts, storyboards, tutorials,
  scripts, the web browser data, and a secrets scan.
- GitHub Actions CI on Node 18, 20, and 22.
