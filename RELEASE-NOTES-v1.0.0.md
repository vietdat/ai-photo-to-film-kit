# Release notes — v1.0.0 (draft)

First public release of **ai-photo-to-film-kit**.

## What it is

A kit for turning still photos into cinematic AI motion films: prompt
templates, complete storyboards, a step-by-step tutorial, a real ffmpeg
assembly script, a single-file prompt browser, and a Claude skill.

## Highlights

- **38 prompt templates** across three verticals — wedding (15),
  anniversary (8), proposal (8) — plus 7 general cinematic motion
  formulas. Every prompt states its target model and version, duration,
  aspect ratio, and camera motion.
- **3 complete storyboards** (JSON + Markdown) with timings that sum
  exactly: a 60-second wedding reception film, a 30-second anniversary
  film, and a 45-second proposal film.
- **A working ffmpeg pipeline**: `scripts/assemble-film.sh` turns a
  folder of stills and a storyboard timing file into an MP4 with
  Ken Burns-style motion, crossfades, and a title card. The included
  example film is honestly labelled motion-from-stills, not AI motion.
- **Prompt browser** (`web/index.html`): open the file, search and
  filter prompts by vertical and model, copy with one click.
- **Claude skill** (`skills/photo-to-film/`): picks the model and adapts
  a prompt from a photo description and an occasion.

## Verified in this release

- `npm test` passes (prompts, storyboards, tutorials, scripts, web data,
  secrets scan).
- The example 60-second film was built end to end with the bundled
  script and checked with `ffprobe`.
- No API keys, no prices, no invented numbers anywhere in the repo.

## Known limits

- The ffmpeg assembly produces motion-from-stills (zoom and pan over
  still photos). True AI motion still needs a generation step with
  Kling, Runway, Wan, or Veo — see `tutorials/03-generate.md`.
- Sample photos are free-license Unsplash stock, credited in
  `examples/CREDITS.md`. Replace them with your own photos for real work.
