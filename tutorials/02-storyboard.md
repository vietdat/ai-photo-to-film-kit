# 02 — Storyboard: How to Adapt the Templates

A storyboard is the plan for the whole film: which photo, which prompt,
how long, in what order. This kit ships three complete ones — adapt one
instead of starting from a blank page.

## The three templates

| Film | File | Length | Shots |
| ---- | ---- | ------ | ----- |
| Wedding reception film (flagship) | `storyboards/wedding-60s-reception-film.json` | 60s | 10 |
| Anniversary film | `storyboards/anniversary-30s-film.json` | 30s | 6 |
| Proposal film | `storyboards/proposal-45s-film.json` | 45s | 8 |

Each one also has a Markdown version (same name, `.md` extension) that is
easier to read. The JSON is the machine-readable source of truth — the
validator and the ffmpeg script both read it.

## The shape of a film

Every storyboard in this kit follows the same arc:

1. **Title card (3s):** names and date over a darkened photo.
2. **Quiet opening:** a morning, detail, or venue shot.
3. **The ceremony or the question:** the aisle, the kneel, the toast.
4. **The emotional peak:** vows, first dance, the yes.
5. **The celebration:** crowd, dancing, balloons, exit.
6. **Closing wide shot:** hold the final frame, fade to names.

Do not put the peak first. The film earns it by building up to it.

## Adapting a template, step by step

1. **Copy the JSON** for the film closest to yours and rename it.
2. **Swap the photos.** Replace each `photo` value with your own file
   name. Keep the order — the arc matters more than any single photo.
   Photos must live in the same folder you pass to the ffmpeg script
   (see `tutorials/04-ffmpeg-assembly.md`).
3. **Swap the prompts.** Each shot has a `prompt_ref` pointing at a file
   in `prompts/`. Pick the prompt that fits your new photo, not the old
   one. If your photo is a ring close-up, use
   `prompts/wedding/wedding-rings-close-up.md` — not whatever the
   template used for a different photo.
4. **Keep the timings.** The shot durations in the template sum exactly
   to the total (60, 30, or 45 seconds). If you change a duration, change
   another one to match — the sum must stay exact. The validator in
   `scripts/validate.js` checks this.
5. **Change the title card.** Edit `title_text` and `subtitle_text` on
   the first shot. Use the real names and date.
6. **Adjust the music notes.** The `music` block suggests mood, tempo,
   and where the music should lift. Rewrite it for your licensed track.
7. **Validate.** Run `node scripts/validate.js`. It checks the timings,
   that every `prompt_ref` exists, and that every photo exists.

## Timing rules

- **Clip length is set by the model, not by you.** A Kling clip is 5 or
  10 seconds; a Veo clip is 8 seconds in this kit (Veo 3.1 also supports
  4s and 6s). Your storyboard slot must be
  shorter than or equal to the generated clip — you can always trim a
  10-second clip to 6 seconds in the edit, but you cannot stretch a
  5-second clip to 7.
- **Detail shots are short.** Rings, hands, and table details get 5–7
  seconds. Longer and the audience notices the loop.
- **Wide shots can be longer.** A landscape or a crowd shot can hold 7
  seconds comfortably.
- **The title card is always 3 seconds.** Shorter and nobody reads it;
  longer and the film stalls before it starts.

## Working without a full album

If you only have four good photos, use the anniversary structure (6
shots, 30 seconds) and reuse two photos in different slots with
different prompts — a photo used once as a slow push-in and once as a
parallax shot reads as two different shots. Do not reuse the same photo
in two adjacent slots.

## Proposal films: keeping the surprise

Generate from a staged rehearsal photo or from photos taken after the
real proposal. Show the film only after the proposal has happened. Never
show the storyboard to the partner beforehand — the shot list gives the
whole thing away.

## Next step

Once the storyboard is adapted, generate the clips — see
`tutorials/03-generate.md`.
