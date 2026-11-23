---
id: general-golden-hour-glow
title: Golden Hour Glow
vertical: general
model: Veo
model_version: "3.1"
duration: 8s
aspect_ratio: "16:9"
camera_motion: Slow push-in, light warming as the camera moves
best_for: Any outdoor photo, golden-hour looks, Runway Aleph follow-up
---

# Golden Hour Glow

## The prompt (copy-paste)

> Cinematic shot, golden hour. The subject of this photograph stands in warm low sunlight, rim light glowing along their outline, long soft shadows stretching across the ground. The light warms slowly, as if the sun is sinking a fraction lower. The subject is still, breathing gently, looking toward the light. The camera pushes in slowly. Warm amber and rose tones, filmic, soft highlights, peaceful and romantic.

## Negative prompt

> sun flickering or pulsing, subject morphing, shadows jumping, light changing colour mid-shot, lens flare taking over, faces turning to silhouette

## Formula used

Veo eight-element structure: **subject** (whoever is in your photo) +
**context** (golden hour, outdoors) + **action** (standing still, breathing
gently) + **style** (cinematic, filmic) + **camera motion** (slow push-in)
+ **composition** (subject against the light, long shadows) + **ambiance**
(warm amber and rose, peaceful) + **audio** (omit — add music in the
edit; see `tutorials/05-music-and-export.md`).

## Settings

- Mode: frames-to-video / image-to-video (Veo 3.1)
- Duration: 8 seconds (this kit standardises on 8 seconds; Veo 3.1 also supports 4s and 6s)
- Aspect ratio: 16:9
- Generate without audio

## Tips

- This prompt also works as a Runway Aleph 2 edit: "Change the daylight in
  this clip to golden-hour sunset, keep the subject and their movement
  exactly the same." See `prompts/general/README.md` for Aleph guidance.
- If the sun pulses, add "the sun stays steady" and regenerate.
- The light should warm slowly, not change suddenly — sudden light
  changes read as flicker.
