---
id: general-aleph-golden-hour-relight
title: Aleph Golden-Hour Relight
vertical: general
model: Runway
model_version: "Aleph 2"
duration: 10s
aspect_ratio: "16:9"
camera_motion: Unchanged — Aleph preserves the original camera move
best_for: Relighting a clip you already generated, golden-hour looks
---

# Aleph Golden-Hour Relight

## The prompt (copy-paste)

> Change the daylight in this clip to golden-hour sunset, keep the subject and their movement exactly the same. Warm low sun, long soft shadows, amber and rose tones on skin and clothes. The background keeps its shapes and positions — only the light and colour change. No new objects, no new people, no change to faces, hands, or the camera move.

## Negative prompt

> faces changing, hands morphing, new objects appearing, background warping, camera moving differently, flickering light, oversaturated orange

## Formula used

Runway Aleph guidance: describe **what to change** (daylight to
golden-hour sunset) and **what to keep** (the subject, the movement, the
camera, the background shapes) in the same instruction. One change per
generation — this prompt changes light only. See
`prompts/general/README.md` for the full Aleph guidance.

## Settings

- Mode: video-to-video edit (Runway Aleph 2), input = a clip you already
  generated with one of the other prompts in this kit
- Duration: matches your input clip — the example here is 10 seconds.
  Aleph 2 outputs up to 30 seconds, matching the input length. (The
  original Aleph from 2025 output 5-second clips; if you are on the
  original, keep the input to 5 seconds.)
- Aspect ratio: same as the input clip (16:9 here)
- Generate 2 takes: relighting is usually clean on the first, but the
  second sometimes holds faces better

## Tips

- Start from a clip that is already good. Aleph edits light well; it
  cannot rescue a clip with warped faces or hands.
- If the background warps, add "the background keeps its exact shapes
  and positions" (already in the prompt above) and regenerate.
- One change per generation. If you also want a different season or
  setting, do it as a second, separate Aleph pass on the relit clip.
- This pairs with `prompts/general/general-golden-hour-glow.md`: generate
  the Veo clip first, then relight it with Aleph if the light is not
  warm enough.
