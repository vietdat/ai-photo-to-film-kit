---
id: wedding-vows-close-up
title: Vows Close-Up
vertical: wedding
model: Kling
model_version: "2.1"
duration: 10s
aspect_ratio: "9:16"
camera_motion: Static with a very slow push-in
best_for: Vows, emotional close-ups, vertical social cuts
---

# Vows Close-Up

## The prompt (copy-paste)

> Intimate vertical close-up of a bride speaking her vows, eyes shining, a tear gathering but not falling. Her lips move gently as she speaks; she blinks slowly and gives a small, trembling smile. The groom is softly out of focus at the edge of frame, listening. The camera is almost static, pushing in almost imperceptibly. Soft window light, shallow depth of field, natural skin texture, quiet emotional documentary feel.

## Negative prompt

> lips moving out of sync, teeth warping, face morphing, eyes drifting apart, crying exaggerated, camera shake, beauty-filter skin

## Formula used

Kling five-layer structure: **subject** (the bride) + **subject movement**
(lips moving gently, a slow blink, a trembling smile) + **scene** (vows,
groom soft at the edge of frame) + **camera** (near-static, imperceptible
push-in) + **lighting and atmosphere** (soft window light, quiet and
emotional).

## Settings

- Mode: image-to-video, first frame = your photo
- Duration: 10 seconds
- Aspect ratio: 9:16 (vertical — made for phones and social cuts)
- Keep motion minimal: this shot works because almost nothing moves

## Tips

- Do not ask for lip-sync to specific words. Video models cannot sync
  lips to your vows reliably; a gentle, unsynced murmur over music reads
  as emotional, while attempted sync reads as wrong. See
  `tutorials/06-troubleshooting.md`.
- If the mouth warps, regenerate with "her lips move only slightly" and
  raise relevance.
- In the edit, lay the couple's real vow audio — or music only — under
  this clip. Never leave the model's silent mouth unexplained by a
  voiceover.
