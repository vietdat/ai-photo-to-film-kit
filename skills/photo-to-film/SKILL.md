---
name: photo-to-film
description: Turn still photos into cinematic AI motion films. Picks the right video model (Kling, Runway, Wan, Veo) for a photo and occasion, then adapts a prompt template from prompts/ into a ready-to-paste prompt and a storyboard slot. Use when the user wants to animate wedding, anniversary, or proposal photos, or asks which AI video model to use for a photo.
---

# Photo to Film

Turn a still photo into a short cinematic AI video clip. You do two jobs:
pick the model, then translate a prompt template from `prompts/` to fit the
user's photo.

## Step 1 — Understand the photo and the occasion

Ask for (or infer from what the user gave you):

- The occasion: wedding, anniversary, or proposal.
- What the photo shows: who is in it, what they are doing, where it was
  taken, time of day, and whether faces are clearly visible.
- What the clip is for: a 60-second reception film, a 30-second
  anniversary film, a 45-second proposal film, or a single social clip.
- Any motion the user wants: a veil moving, a first dance, a ring close-up,
  a reaction — or "you choose".

If the user has not shared a photo yet, ask them to describe it or upload
it. Do not invent a photo.

## Step 2 — Pick the model

Use this selector. If two models fit, say so and pick the safer one.

| Situation | Pick | Why |
| --- | --- | --- |
| The couple's faces are clearly visible and must stay faithful | Kling 2.1, 10s | Best face fidelity of the models in this kit; 10-second clips |
| One clear motion (a veil, a bouquet toss, a single gesture) | Runway Gen-4, 10s | Follows simple, specific motion descriptions well |
| A tiny motion (a glint on a ring, a trembling petal) or a still scene | Wan 2.2, 5s | Strongest at small motion and holding a composition still |
| A wide, epic, or night shot where the setting does the work | Veo 3.1, 8s | Strongest cinematic look; this kit standardises on 8-second clips |
| The photo is vertical (9:16) for socials | Kling 2.1 or Runway Gen-4, 10s | Both handle vertical well; keep the clip 9:16 |
| The user wants to change light, season, or setting in a clip they already have | Runway Aleph 2 | Edit instruction, not a new generation — output matches the input clip, up to 30s; see `prompts/general/README.md` and `prompts/general/general-aleph-golden-hour-relight.md` |
| Hands, rings, or a small object fill the frame | Wan 2.2, 5s | Short clip, tiny motion — hands warp least this way |

Rules:

- Faces turned past 45 degrees, or small in frame: do not promise face
  fidelity. Say so, and suggest a wide shot or a different photo.
- Never promise lip-sync. No model in this kit syncs lips to words
  reliably; suggest gentle, unsynced movement under music instead.
- One motion per clip. If the user asks for three things moving, pick the
  most important and say the rest stays still.

## Step 3 — Translate a prompt from prompts/

1. Find the closest template in `prompts/<vertical>/` (or `prompts/general/`
   for a motion that fits any occasion). Read the file.
2. Keep the template's frontmatter values (model, version, duration,
   aspect ratio, camera motion) unless the user's photo forces a change —
   for example, a vertical photo needs 9:16, not 16:9. Say when you change
   one, and why.
3. Rewrite the prompt body to describe the user's actual photo: who is in
   it, what they wear, where they are. Keep the template's structure
   (Kling five-layer, Veo eight-element, or Runway's one-motion style —
   see `prompts/general/README.md`) and keep it the same length or shorter.
4. Keep the negative prompt, adjusting only the lines that match the new
   photo.
5. Give the user: the adapted prompt in a copy-paste block, the negative
   prompt, the model + version + duration + aspect ratio + camera motion,
   and one honest warning about what is most likely to go wrong (hands,
   faces, glass, crowds) and how to fix it.

## Step 4 — Place it in a storyboard

If the user is building a film, place the clip in the matching storyboard
in `storyboards/`:

- Wedding 60-second reception film: `storyboards/wedding-60s-reception-film.json`
- Anniversary 30-second film: `storyboards/anniversary-30s-film.json`
- Proposal 45-second film: `storyboards/proposal-45s-film.json`

Check the shot timings still sum exactly to the storyboard total. If the
user's clip is longer than the slot (for example, a 10-second Kling clip
in a 6-second slot), say so and either trim the clip in the edit or move
it to a longer slot. Never silently change the storyboard total.

## Step 5 — After generation

- Ask the user to check faces, hands, and the one motion they asked for.
- If a clip warped, suggest the fix from the prompt file's Tips section
  first; if that fails twice, suggest the fallback prompt
  `prompts/general/general-cinematic-push-in.md` — a slow push-in on a
  good photo almost always works.
- Point to `tutorials/06-troubleshooting.md` for face morphing, hands,
  lip-sync drift, and flicker.

## What this skill never does

- Never claims a clip is AI-generated motion when it is motion-from-stills
  from `scripts/assemble-film.sh`.
- Never uses a real client's photo without being told it is theirs to use.
- Never invents a model version, a duration a model does not support, or
  a prompt formula that is not in `prompts/general/README.md`.
