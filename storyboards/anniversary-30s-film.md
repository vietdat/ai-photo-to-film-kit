# Anniversary 30-Second Film

- **Total length:** 30 seconds exactly
- **Aspect ratio:** 16:9, 30 fps
- **Vertical:** anniversary
- **Photos:** `examples/sample-album/` (sample names "Emma & James" and
  "Twenty-five years" are placeholders — replace them with the real
  couple's names and milestone)
- **Machine-readable version:** `anniversary-30s-film.json`

## Music

Licensed solo piano, about 60 BPM, gentle and unhurried. Tender,
nostalgic, warm. A single melody that repeats with small variations —
the past and the present in the same tune. No drums.

## Shot list

| # | Time | Length | Photo | Prompt | Camera / notes |
| - | ---- | ------ | ----- | ------ | -------------- |
| 1 | 0:00–0:03 | 3s | `01-golden-hour-bouquet.jpg` | — (title card) | Title: "Emma & James", subtitle: "Twenty-five years". Piano enters, quiet. |
| 2 | 0:03–0:08 | 5s | `08-lakeside-portrait.jpg` | `anniversary-golden-hour-toast` | Slow dolly-in, settling on the couple. Melody begins. |
| 3 | 0:08–0:14 | 6s | `04-holding-hands.jpg` | `general-emotional-close-up` | Static with an almost imperceptible push-in. Melody repeats, slightly fuller. |
| 4 | 0:14–0:19 | 5s | `03-rings-close-up.jpg` | `anniversary-then-and-now` | Very slow push-in on the held photograph. Music softens. |
| 5 | 0:19–0:25 | 6s | `07-hilltop-walk.jpg` | `anniversary-vow-renewal` | Slow push-in, then a gentle lateral drift. Emotional peak. |
| 6 | 0:25–0:30 | 5s | `10-palm-dusk-walk.jpg` | `general-golden-hour-glow` | Slow push-in, light warming. Hold the final frame two beats, then fade to names. Melody resolves. |

## A note on the sample pairings

Shots 2 and 5 are loose stand-ins with the sample album: the lakeside
portrait shows no glasses or toast, and the hilltop walk is not a vow
renewal. They are here so the storyboard is complete and buildable with
the free sample photos. For your own photos, re-pick the prompt to match
what the photo actually shows — the JSON is the plan, the photo is the
truth.

## First and last frames

- **First frame:** the title card over `01-golden-hour-bouquet.jpg`,
  darkened.
- **Last frame:** `10-palm-dusk-walk.jpg` at the end of the push-in —
  the couple close together in warm light. Hold it, then fade to the
  names card.

## How to build it

1. Generate each clip with the prompt listed (see
   `tutorials/03-generate.md`).
2. Or build the motion-from-stills preview with the ffmpeg script — see
   `scripts/assemble-film.sh` and `tutorials/04-ffmpeg-assembly.md`.
   That version is honestly labelled motion-from-stills, not AI motion.
3. Assemble in the order above and check the total is exactly 30 seconds.
