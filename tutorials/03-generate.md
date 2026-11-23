# 03 — Generate: Kling / Runway / Wan via Fal / Replicate

This is where still photos become moving clips. You send a photo and a
prompt to a video model; it sends back a short clip.

## Before you start

- Your photos are prepped (`tutorials/01-photo-prep.md`).
- Your storyboard is adapted (`tutorials/02-storyboard.md`).
- You have an account with Fal or Replicate, and an API key. **Never put
  a real key in a file, a prompt, or a chat message.** Keys appear in
  this repo only as placeholders like `FAL_KEY=your-key-here`.

## Which model for which shot

The model is chosen per shot, in the prompt file's frontmatter. The
short version:

| Shot | Model | Clip length |
| ---- | ----- | ----------- |
| Faces must stay faithful | Kling 2.1 | 10s |
| One clear motion (veil, toss, gesture) | Runway Gen-4 | 10s |
| Tiny motion or a still scene | Wan 2.2 | 5s |
| Wide, epic, or night shot | Veo 3.1 | 8s |
| Change light/setting in a clip you already have | Runway Aleph 2 | matches input, up to 30s |

The full selector lives in `skills/photo-to-film/SKILL.md`, and the
formulas in `prompts/general/README.md`.

## Option A — Fal (recommended for Kling, Wan, Veo)

Fal hosts Kling, Wan, and Veo behind one API. The pattern is the same
for each model: upload your photo, send the prompt, poll for the result.

```bash
export FAL_KEY=your-key-here   # placeholder — paste your real key here, never commit it

# Kling 2.1 image-to-video, 10 seconds, 16:9
curl -X POST "https://queue.fal.run/fal-ai/kling-video/v2.1/standard/image-to-video" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/your-photo.jpg",
    "prompt": "Paste the prompt from prompts/wedding/wedding-golden-hour-first-dance.md here",
    "duration": "10",
    "aspect_ratio": "16:9",
    "negative_prompt": "distorted faces, extra fingers, warped hands, morphing dress, flickering light"
  }'
```

Notes:

- `image_url` must be a public URL. Upload your photo to Fal storage
  first, or any host that gives you a direct link. Do not use a photo
  URL that requires a login.
- `duration` must be one the model supports: Kling takes `"5"` or `"10"`.
- The response gives you a `request_id`; poll the status endpoint until
  it returns a `video.url`, then download the clip.
- Model names and parameters change over time. If a call fails, check
  the provider's docs before changing the prompt — the prompt is usually
  not the problem.

## Option B — Replicate (recommended for Runway and Wan)

Replicate hosts Runway Gen-4 and Wan behind one API with the same
predictions pattern.

```bash
export REPLICATE_API_TOKEN=your-token-here   # placeholder — paste your real token here, never commit it

# Runway Gen-4 image-to-video, 10 seconds, 16:9
curl -X POST "https://api.replicate.com/v1/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "runway-gen4-image-to-video-version-id",
    "input": {
      "image": "https://example.com/your-photo.jpg",
      "prompt": "Paste the prompt from prompts/wedding/wedding-veil-in-the-wind.md here",
      "duration": 10,
      "aspect_ratio": "16:9"
    }
  }'
```

Notes:

- Find the exact model version ID on the model's Replicate page before
  running the call — version IDs change, and the placeholder above is
  not a real one.
- Poll the prediction URL until `status` is `succeeded`, then download
  the `output` URL.

## Option C — The providers' own dashboards

If you do not want to use an API, all four models have web dashboards
(Kling, Runway, Wan, and Veo/Flow). The workflow is the same: upload the
photo, paste the prompt from the prompt file, set the duration and aspect
ratio from the file's frontmatter, generate. This is slower for ten
shots, but it needs no code and no key management.

## Generation workflow (per shot)

1. Open the prompt file (for example
   `prompts/wedding/wedding-golden-hour-first-dance.md`).
2. Copy the text under **The prompt (copy-paste)**. Paste it exactly —
   do not summarise it.
3. Copy the **Negative prompt** too, if the model supports one.
4. Set duration and aspect ratio from the frontmatter.
5. Generate **2–3 takes** of every shot. Video models are random; the
   first take is rarely the best.
6. Judge each take on three things only: faces, hands, and the one motion
   you asked for. If all three are clean, keep it. If one is broken, see
   `tutorials/06-troubleshooting.md` before regenerating.
7. Save the winning clip with the shot ID from the storyboard (for
   example `w03-rings.mp4`), so the edit matches the plan.

## Cost and time

- A 60-second film needs about 10 clips. Generate 2–3 takes per shot, so
  budget for roughly 25 generations.
- Generate the hardest shots first (faces, hands, crowds). If the budget
  runs out, the easy wide shots can fall back to the motion-from-stills
  assembly in `tutorials/04-ffmpeg-assembly.md`.

## What you get back — and what you do not

- You get short silent clips (or clips with model-generated audio you
  should mute). You add licensed music in the edit — see
  `tutorials/05-music-and-export.md`.
- You do **not** get a finished film. Assembly is the next step, whether
  you use the ffmpeg script or an editor.

## Next step

Assemble the clips — or build the motion-from-stills preview first — see
`tutorials/04-ffmpeg-assembly.md`.
