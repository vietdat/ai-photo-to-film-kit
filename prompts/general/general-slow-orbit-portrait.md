---
id: general-slow-orbit-portrait
title: Slow Orbit Portrait
vertical: general
model: Runway
model_version: "Gen-4"
duration: 10s
aspect_ratio: "16:9"
camera_motion: Slow orbit around the subject, 30–45 degrees of arc
best_for: Portraits, couple shots, any photo with a clean background
---

# Slow Orbit Portrait

## The prompt (copy-paste)

> The camera orbits slowly around the subject of this photograph, moving through a gentle arc of about thirty degrees. The subject stays in place, turning their head almost imperceptibly to follow the light, expression soft and natural. The background shifts slowly behind them, revealing a little more of the scene. Soft natural light, shallow depth of field, cinematic portrait look, calm and graceful.

## Negative prompt

> face morphing as the angle changes, subject rotating with the camera, background warping, hair detaching, camera orbiting too fast or too far

## Formula used

Runway image-to-video guidance: one **simple camera move** (a slow,
limited orbit) and an almost-still subject. The orbit is the motion; the
person is the anchor.

## Settings

- Mode: image-to-video (Gen-4)
- Duration: 10 seconds
- Aspect ratio: 16:9
- Keep the prompt under 120 words

## Tips

- Limit the arc. A 30–45 degree orbit reads as cinematic; a 180-degree
  orbit asks the model to invent the back of someone's head, and it will
  get it wrong.
- Works best when the background is simple — a garden, a wall, open sky.
  Busy backgrounds warp as the camera moves.
- If the face drifts during the orbit, regenerate with the orbit
  shortened to "a very slight arc".
