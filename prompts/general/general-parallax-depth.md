---
id: general-parallax-depth
title: Parallax Depth
vertical: general
model: Wan
model_version: "2.2"
duration: 5s
aspect_ratio: "16:9"
camera_motion: Slow lateral drift, creating parallax between foreground and background
best_for: Landscape photos, venue shots, photos with clear foreground and background layers
---

# Parallax Depth

## The prompt (copy-paste)

> The camera drifts slowly sideways across this photograph, so the foreground and background shift against each other with gentle parallax. A flower in the foreground slides softly past; the couple in the middle distance stays steady; the landscape behind moves slowest of all. Everything stays in place — only the viewpoint moves, like looking out of a slow train window. Calm, spacious, cinematic, natural light.

## Negative prompt

> foreground object detaching, couple sliding, background warping, layers splitting apart, camera moving too fast

## Formula used

Wan image-to-video: **camera-only motion**. No subject moves at all, so
there is nothing to warp — the model only has to shift the viewpoint, and
Wan does that cleanly when the photo has clear depth layers.

## Settings

- Mode: image-to-video (Wan 2.2)
- Duration: 5 seconds
- Aspect ratio: 16:9

## Tips

- This only works on photos with real depth: something close, something
  mid-distance, something far. Flat photos get no parallax and look static.
- Five seconds is enough. Longer drifts start to reveal the edges of the
  model's imagined scene.
- Use it for venue and landscape shots in a film — it turns a still
  establishing shot into a moving one without risking any faces.
