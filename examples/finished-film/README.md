# Finished Film — Wedding 60-Second Reception Film

## What this is

A 60-second wedding film built from the sample album with the ffmpeg
assembly script in this repo.

## Honest label — read this first

**This film is motion-from-stills.** It is made by slowly zooming and
panning over still photographs, with crossfades between shots and a
title card. **It is NOT AI-generated motion.** No AI video model was
used to make this file, and no AI-generated video clip is included in
this repo. Do not present this film as AI-generated motion.

It exists so you can see the storyboard, the timing, and the assembly
pipeline working end to end before you spend anything on AI generation.
For real AI motion, follow `tutorials/03-generate.md`.

## How it was built

From the repo root:

```bash
bash scripts/assemble-film.sh \
  --album examples/sample-album \
  --storyboard storyboards/wedding-60s-reception-film.json \
  --output examples/finished-film/wedding-60s-reception-film.mp4
```

- Storyboard: `storyboards/wedding-60s-reception-film.json` (10 shots,
  timings sum to exactly 60 seconds)
- Photos: `examples/sample-album/` (10 free-license Unsplash photos —
  see `examples/CREDITS.md`; they are stock photos, not a real wedding)
- Output: `wedding-60s-reception-film.mp4` — 1920×1080, 30 fps, H.264,
  silent (add licensed music as described in
  `tutorials/05-music-and-export.md`)
- Title card: "Emma & James — 14 June 2026" (placeholder names from the
  storyboard; replace them with the real couple's names)

## Verify it yourself

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 \
  examples/finished-film/wedding-60s-reception-film.mp4
# Expected: about 60 seconds
```
