# 04 — ffmpeg Assembly

There are two ways to assemble a film in this kit: the ffmpeg script
(motion-from-stills) and a video editor (for real AI clips). This tutorial
covers both.

## What the ffmpeg script does

`scripts/assemble-film.sh` takes a folder of still photos and a
storyboard JSON and produces an MP4. For each shot it renders a short
segment with Ken Burns-style motion (a slow zoom in or out), joins the
segments with crossfades, and renders the first shot as a title card
with the couple's names over a darkened photo.

**Be honest about what it is:** the output is motion-from-stills — zoom
and pan over still photos. It is **not** AI-generated motion. It is a
preview, a placeholder while AI clips generate, or a deliverable in its
own right for clients who want a gentle photo film. Label it that way
wherever you share it.

## Requirements

- `ffmpeg` and `ffprobe` (version 8 tested; any recent version works)
- `node` (only to read the storyboard JSON)
- A font for the title card — DejaVu is used if present, and the script
  warns if no font is found

Check yours:

```bash
ffmpeg -version | head -1
node --version
```

## Building the example film

From the repo root:

```bash
bash scripts/assemble-film.sh \
  --album examples/sample-album \
  --storyboard storyboards/wedding-60s-reception-film.json \
  --output examples/finished-film/wedding-60s-reception-film.mp4
```

The script prints each shot as it renders, then verifies the output
duration against the storyboard total (60 seconds). The finished example
is documented in `examples/finished-film/README.md`.

## Building your own film

1. Put your photos in a folder (for example `my-album/`).
2. Adapt a storyboard as described in `tutorials/02-storyboard.md` — the
   `photo` values must match your file names.
3. Run the script with your folder and storyboard:

```bash
bash scripts/assemble-film.sh \
  --album my-album \
  --storyboard storyboards/my-wedding-film.json \
  --output my-wedding-film.mp4
```

## Options

| Option | Default | Notes |
| ------ | ------- | ----- |
| `--album DIR` | — (required) | Folder of still photos |
| `--storyboard FILE` | — (required) | Storyboard JSON |
| `--output FILE` | — (required) | Output MP4 path |
| `--resolution WxH` | `1920x1080` | Try `1280x720` for a faster preview |
| `--fade SECONDS` | `0.5` | Crossfade length; longer fades feel dreamier |
| `--title TEXT` | from storyboard | Override the title-card text |
| `--subtitle TEXT` | from storyboard | Override the title-card subtitle |

## How it works

- Each segment is rendered slightly longer than its storyboard duration
  (by one fade length), so the crossfades overlap without shortening the
  film. The final duration matches the storyboard total exactly.
- Zoom direction alternates per shot (in, out, in, out…) so the film
  does not feel like one long zoom.
- Portrait photos are cropped to 16:9 (centre crop). If the crop cuts
  someone's head, use a landscape photo for that shot instead.
- The output is H.264, 30 fps, `yuv420p` (full-range — inherited from
  the JPEG sources), with `faststart` so it plays
  while downloading.

## Checking the output

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 \
  examples/finished-film/wedding-60s-reception-film.mp4
# Expected: about 60 seconds
```

Play it back and watch for: a title card that reads clearly, smooth
zooms (no stutter), and crossfades that land on the storyboard's shot
boundaries.

## Assembling real AI clips (in an editor)

When your generated clips are ready (see `tutorials/03-generate.md`):

1. Import the clips in storyboard order.
2. Trim each clip to its storyboard slot. A 10-second Kling clip in a
   6-second slot: keep the best 6 seconds, usually the middle.
3. Add a 0.5-second cross-dissolve between clips, matching the ffmpeg
   script's fade.
4. Add the title card: export the first frame of the ffmpeg preview, or
   build the same card in your editor with the names and date.
5. Check the total against the storyboard — 60, 30, or 45 seconds exactly.

## Next step

Add music and export — see `tutorials/05-music-and-export.md`.
