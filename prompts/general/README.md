# Cinematic motion formulas

This folder holds general-purpose prompts that work across all three
verticals. It also documents the three prompt formulas this kit uses.
Only formulas that are real and standard are described here; nothing is
invented.

## The Kling five-layer structure

Kling's image-to-video prompts work best when they cover five layers, in
this order:

1. **Subject** — who or what is in the shot, described plainly.
2. **Subject movement** — what the subject does, in simple verbs.
3. **Scene** — where it happens, including the setting and background.
4. **Camera** — one camera move, stated once (dolly, orbit, pan, crane,
   push-in, or static).
5. **Lighting and atmosphere** — time of day, light quality, colour, mood,
   film look.

One motion per layer. If you ask for three subject movements and two
camera moves, the model has to choose — and it usually chooses wrong.

## The Veo eight-element structure

Veo prompts are commonly structured around eight elements:

1. **Subject** — who or what.
2. **Context** — where and when.
3. **Action** — what happens.
4. **Style** — the look (cinematic, documentary, filmic).
5. **Camera motion** — how the camera moves.
6. **Composition** — framing (wide, medium, close-up, what sits where).
7. **Ambiance** — mood, light, colour, atmosphere.
8. **Audio** — what is heard. This kit generates silent clips and adds
   licensed music in the edit, so our Veo prompts say to omit audio —
   see `tutorials/05-music-and-export.md`.

## Runway Aleph guidance

Runway Aleph is a video-editing model, not a text-to-video model: you
give it an existing clip and describe the change. The guidance that works:

- Describe **what to change** and **what to keep** in the same sentence:
  "Change the daylight to golden-hour sunset, keep the couple and their
  movement exactly the same."
- One change per generation. Stacking changes (new sky + new clothes +
  new background) breaks the clip.
- Keep the original motion. Aleph preserves motion well when the edit is
  about light, colour, season, or setting — it struggles when the edit
  asks people to do something different.

**Versions:** Aleph 2 outputs up to 30 seconds, matching the input
clip's length. The original Aleph (2025) output 5-second clips. The
example template is `general-aleph-golden-hour-relight.md` (Aleph 2).

Aleph prompts in this repo are written as edit instructions for a clip
you already generated with one of the other prompts. They are not
standalone text-to-video prompts.
