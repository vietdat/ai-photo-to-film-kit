# 06 — Troubleshooting

Honest advice for the four failures you will actually hit: face morphing,
hands, lip-sync drift, and flicker. Each section says what causes it, what
to try first, and when to give up on a shot.

## Face morphing

**What it looks like:** the face slowly changes — the nose shifts, the
eyes drift apart, the person stops looking like themselves halfway
through the clip.

**Why it happens:** the model is inventing motion for a face it only saw
in one still. The more the face moves or turns, the more it invents, and
the more it drifts.

**Try, in order:**

1. **Less motion.** Replace the prompt's movement with the smallest
   version: a slow blink, a breath, a slight smile. The emotional
   close-up prompt `prompts/general/general-emotional-close-up.md` is
   built this way.
2. **Raise relevance / lower creativity.** Most tools have a slider for
   how closely the video must follow the source image. Raise it.
3. **Use a better photo.** Front-facing, both eyes visible, face filling
   a third of the frame. See `tutorials/01-photo-prep.md`.
4. **Shorten the clip.** A 5-second Wan clip (`prompts/wedding/wedding-rings-close-up.md`
   uses 5 seconds) drifts less than a 10-second one.
5. **Fall back.** If three generations all morph, use the fallback prompt
   `prompts/general/general-cinematic-push-in.md` — a slow push-in barely
   moves the face at all.

**When to give up:** if the face is in profile, turned past 45 degrees,
or smaller than a tenth of the frame, do not use a close-up prompt. Use a
wide shot instead, where the face is small and the setting carries the
clip.

## Hands

**What it looks like:** extra fingers, fingers bending backwards, hands
merging into objects, a ring sliding off, a bouquet duplicating.

**Why it happens:** hands are the most complex shape in the frame, and
small in most photos. The model has the least training data for exactly
the pose in your photo.

**Try, in order:**

1. **Make the hands bigger.** Crop the photo tighter before generating so
   the hands fill the frame. Larger subjects warp less.
2. **Freeze the hands.** Rewrite the prompt so the hands do not move at
   all — only the camera moves, or only the light changes. The rings
   prompt `prompts/wedding/wedding-rings-close-up.md` works because the
   only motion is a glint of light.
3. **One hand, one motion.** Two hands doing two things is twice the
   risk. Pick the important hand.
4. **Shorten to 5 seconds.** Wan 5-second clips are the safest hands in
   this kit.
5. **Cut around it.** If the hands warp in the last 2 seconds, trim the
   clip to the clean part and let the storyboard slot be shorter — or swap
   in a detail shot that has no hands.

**When to give up:** if the hands are mid-gesture, blurred, or half out
of frame in the source photo, do not generate a hands shot at all. Pick a
different photo.

## Lip-sync drift

**What it looks like:** the mouth moves, but not to any words — or it
moves to words nobody said. It reads as wrong instantly, even to people
who cannot say why.

**Why it happens:** image-to-video models do not know what your vows
sound like. They animate a mouth generically. There is no prompt that
fixes this — it is not a prompting problem.

**What to do:**

- **Do not ask for lip-sync.** None of the prompts in this kit ask for
  it. The vows prompt `prompts/wedding/wedding-vows-close-up.md` asks
  for lips moving "gently" with no words attached.
- **Cover the mouth with music or a voiceover.** Lay the couple's real
  vow audio — or music only — under the clip. The audience hears the
  words and sees a gentle murmur, and the brain accepts it.
- **Use a profile or a listening shot.** A shot of the groom listening,
  or the bride from behind, has no lip-sync problem at all.
- **If you truly need synced speech,** that is a different tool (a
  lip-sync model, applied after generation) and outside this kit's scope.
  Do not promise a client synced vows from an image-to-video prompt.

## Flicker

**What it looks like:** the light pulses, the sun strobes, colours shift
from frame to frame, or the background shimmers.

**Why it happens:** the model re-decides the lighting every frame. Bright
or high-contrast scenes (sun, candles, string lights, water) flicker
most.

**Try, in order:**

1. **Say the light stays steady.** Add "the sun stays steady" or "the
   flames stay small and steady" to the prompt. Several prompts in this
   kit already include this line — for example
   `prompts/anniversary/anniversary-candlelit-dinner.md`.
2. **Reduce the contrast in the source photo.** Slightly darken a blown
   sky or brighten deep shadow before generating. Even light flickers
   less.
3. **Slow the camera down.** Fast camera moves make flicker worse because
   the scene changes faster than the model can keep up.
4. **Regenerate.** Flicker is random — the same prompt often produces a
   clean take on the second or third try.
5. **Deflicker in the edit.** As a last resort, most editors have a
   deflicker filter, or you can add a very slight blur (0.5 px) to the
   clip, which hides high-frequency shimmer.

**When to give up:** if a shot flickers in all three takes, replace it
with the motion-from-stills version from `scripts/assemble-film.sh` —
zoompan over a still does not flicker — and spend the generation budget
on a different shot.

## General rules

- **Generate 2–3 takes of everything.** The first take is rarely the best,
  and the failure is usually random, not your fault.
- **Judge three things only:** faces, hands, and the one motion you asked
  for. If all three are clean, keep the clip.
- **Two failures, then change the approach.** If the same prompt fails
  twice, do not generate a third identical take — change the photo, the
  motion, or the model.
- **The fallback always works.** `prompts/general/general-cinematic-push-in.md`
  — a slow push-in on a good photo — almost never fails. A film of ten
  good push-ins beats a film of ten broken dances.
