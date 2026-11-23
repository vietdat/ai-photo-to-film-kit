---
id: general-wide-to-detail
title: Wide to Detail
vertical: general
model: Runway
model_version: "Gen-4"
duration: 10s
aspect_ratio: "16:9"
camera_motion: Slow push-in from a wide shot toward one small detail
best_for: Venue shots, tablescapes, photos with a meaningful small detail
---

# Wide to Detail

## The prompt (copy-paste)

> The camera starts wide on the whole scene of this photograph, then pushes in slowly and steadily toward one small detail — the rings on the table, the handwritten place card, the single flower on the chair. The room stays still around it; only the camera moves, closing in until the detail fills the frame, sharp and warm in the light. Calm, deliberate, cinematic, shallow depth of field at the end of the move.

## Negative prompt

> detail morphing as the camera approaches, objects appearing or disappearing, camera rushing, focus hunting, background people moving

## Formula used

Runway image-to-video guidance: **one camera move with a destination**.
Tell the model where the camera ends (on the detail) and it will hold the
scene steady while it travels there.

## Settings

- Mode: image-to-video (Gen-4)
- Duration: 10 seconds
- Aspect ratio: 16:9
- Keep the prompt under 120 words

## Tips

- Pick a detail that is actually in the photo and reasonably large — a
  ring box, a bouquet, a place card. A tiny detail the model has to invent
  will warp.
- The push-in should take the whole ten seconds. A fast push-in feels like
  a zoom punch, not a reveal.
- Use this to open a film: wide room, then in on the detail, then cut to
  the people. It tells the audience where they are before the story
  starts.
