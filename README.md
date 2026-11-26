# ai-photo-to-film-kit

Turn still photos into a cinematic AI video: 38 copy-paste prompts for Kling, Runway, Wan and Veo, complete wedding, anniversary and proposal storyboards, a Claude skill, and an ffmpeg assembly script.
Try it now, no install: https://vietdat.github.io/ai-photo-to-film-kit/

## The problem this solves

You have a set of still photos — a wedding, an anniversary, a proposal — and you want a short cinematic film made from them, not a slideshow. AI video tools like Kling, Runway, Wan and Veo can animate a photo, but a photo plus a one-line prompt usually comes back with warped faces, drifting hands and flickering light. This kit gives you the missing middle: image-to-video prompts that actually work, storyboards with exact timings, and a step-by-step tutorial that takes you from source photos to a finished film. It also includes a working ffmpeg script that turns your photos and storyboard into a preview film, so you can check the timing and the story before you spend anything on AI generation.

## Who is this for

- **Wedding videographers and photographers** who want to offer AI motion films made from a couple's photos — a 60-second reception film, built from the photos they already have.
- **Couples and families** making a film themselves: a wedding film for the reception, an anniversary film from old photos, or a proposal film to show right after the question.
- **Creators and editors** learning image-to-video prompting with Kling, Runway, Wan or Veo, who want prompts that state the model, duration, aspect ratio and camera motion instead of vague advice.
- **Developers** who want a real, tested prompt kit — validated by tests, with a Claude skill and a single-file prompt browser they can reuse.

## Quick start: from photos to a film in three steps

1. **Browse prompts** — open `web/index.html` in a browser (no build step, no server). Search and filter by vertical and model, copy a prompt with one click.
2. **Pick a storyboard** — start with `storyboards/wedding-60s-reception-film.md` (60 seconds, 10 shots), or the 30-second anniversary or 45-second proposal versions.
3. **Follow the tutorial** — `tutorials/01-photo-prep.md` through `tutorials/06-troubleshooting.md` take you from source photos to a finished film.

## What's inside

| Path | What it is |
| ---- | ---------- |
| `prompts/` | 38 copy-paste prompt templates: 15 wedding, 8 anniversary, 8 proposal, 7 general cinematic motion formulas |
| `prompts/general/README.md` | The three prompt formulas used in this kit (Kling five-layer, Veo eight-element, Runway Aleph guidance) |
| `storyboards/` | Three complete storyboards in JSON + Markdown: wedding 60s, anniversary 30s, proposal 45s — timings sum exactly |
| `tutorials/` | Six-step tutorial: photo prep, storyboard, generation, ffmpeg assembly, music and export, troubleshooting |
| `scripts/assemble-film.sh` | ffmpeg assembly: Ken Burns-style zoom/pan, crossfades, title card |
| `scripts/validate.js` | Validates prompt frontmatter and storyboard JSON |
| `scripts/build-web.js` | Regenerates the prompt data embedded in `web/index.html` |
| `web/index.html` | Single-file prompt browser — search, filter, copy |
| `skills/photo-to-film/SKILL.md` | Claude skill: model selector + prompt translator |
| `examples/sample-album/` | 10 free-license Unsplash wedding photos (credited in `examples/CREDITS.md`) |
| `examples/finished-film/` | Reproducible 60-second wedding film built with the ffmpeg script |
| `tests/` | `node:test` suite — prompts, storyboards, tutorials, scripts, web data, secrets scan |
| `DISTRIBUTION.md` | Launch checklist: where to share this repo, draft posts, day-by-day order |

## Wedding, anniversary and proposal films

- **Wedding (flagship)** — 15 prompts, 60-second reception film. First dance, aisle walk, vows, rings, sparkler exit, and more.
- **Anniversary** — 8 prompts, 30-second film. Toasts, photo albums coming alive, kitchen dances, vow renewals, fifty years later.
- **Proposal** — 8 prompts, 45-second film. The knee moment, beach and mountain proposals, the ring reveal, she said yes.

General prompts (`prompts/general/`) work across all three: cinematic push-in, slow orbit, parallax depth, golden-hour glow, emotional close-up, wide to detail.

## How the ffmpeg assembly works

`scripts/assemble-film.sh` takes a folder of stills and a storyboard JSON and produces an MP4:

```bash
bash scripts/assemble-film.sh \
  --album examples/sample-album \
  --storyboard storyboards/wedding-60s-reception-film.json \
  --output examples/finished-film/wedding-60s-reception-film.mp4
```

Each shot becomes a short segment with a slow zoom in or out (alternating per shot), joined with 0.5-second crossfades, with the first shot rendered as a title card. The output is 1920×1080, 30 fps, H.264.

**Honest label:** the output is **motion-from-stills** — zoom and pan over still photographs. It is **not** AI-generated motion. The included example film is labelled that way in `examples/finished-film/README.md`, and this repo contains no AI-generated video clip. For real AI motion, generate clips with Kling, Runway, Wan, or Veo following `tutorials/03-generate.md`, then assemble them in an editor.

## The Claude skill

Copy `skills/photo-to-film/` into your Claude skills directory, then ask it to animate a photo. It picks the model (Kling, Runway, Wan, or Veo) from the photo and the occasion, adapts a prompt from `prompts/`, and places the clip in the matching storyboard.

## The prompt browser

Open `web/index.html` directly in a browser — no build step, no dependencies, no server. Search prompts, filter by vertical and model, and copy a prompt with one click. Every prompt shows its model and version, duration, aspect ratio, and camera motion.

If you add or change prompts, regenerate the embedded data so the browser stays in sync:

```bash
npm run build:web
```

## Example storyboard excerpt

From `storyboards/wedding-60s-reception-film.md` — the 60-second reception film:

| # | Time | Photo | Prompt | Notes |
| - | ---- | ----- | ------ | ----- |
| 1 | 0:00–0:03 | `01-golden-hour-bouquet.jpg` | — (title card) | "Emma & James", 14 June 2026 |
| 2 | 0:03–0:09 | `09-ceremony-aisle.jpg` | `wedding-aisle-walk` | Slow backward track |
| 3 | 0:09–0:14 | `03-rings-close-up.jpg` | `wedding-rings-close-up` | Very slow push-in, almost static |
| 8 | 0:38–0:44 | `02-balloon-release.jpg` | `general-golden-hour-glow` | Biggest moment — music peaks here |
| 10 | 0:52–1:00 | `10-palm-dusk-walk.jpg` | `wedding-sunset-portrait` | Hold the final frame, fade to names |

Shot timings sum to exactly 60 seconds. The full shot list, music notes, and first/last frame references are in the storyboard file.

## Related projects

- [vibe-code-rescue](https://github.com/vietdat/vibe-code-rescue) — sibling repo: a skill and CLI for rescuing vibe-coded apps and turning them into production-ready code.
- [wedding-invitation-starter](https://github.com/vietdat/wedding-invitation-starter) — open-source Next.js wedding invitation template with sample data, from the same author.
- [damcuoionline](https://github.com/vietdat/damcuoionline) — Virtual Wedding 3D: attend a wedding online in a 3D world (React + Vite + Three.js), from the same author.

## Tests

```bash
npm test          # node:test suite — must be green before any pull request
node scripts/validate.js
bash -n scripts/*.sh
```

## Sharing this repo

See `DISTRIBUTION.md` for the launch checklist: where to post, honest draft posts for each channel, and the day-by-day order.

## Contributing

See `CONTRIBUTING.md`. In short: real prompts only, no placeholder text, no secrets (keys appear only as placeholders like `FAL_KEY=your-key-here`), no invented numbers, and never present an AI image as a real wedding photo.

## Licence

MIT — see `LICENSE`.
