# 01 — Photo Prep: What Makes a Good Source Photo

A video model can only move what is in the photo. A good source photo does
most of the work before you write a single prompt.

## The checklist

Before you generate anything, check each photo against this list:

1. **Faces are visible and front-facing.** Both eyes visible, face turned
   less than 45 degrees from the camera. A face in full profile will morph
   — the model has to invent the other side of the head.
2. **Faces are large enough.** The couple should fill at least a third of
   the frame. Small faces in a wide landscape are fine for wide shots
   (see `prompts/general/general-golden-hour-glow.md`), but not for
   close-ups.
3. **Sharp, not blurry.** Motion blur in the source becomes smearing in
   the video. If the photo is soft, pick a different one.
4. **Even light, no harsh glare.** Glare on glass, a blown-out sky, or a
   hard flash hotspot becomes a moving artefact. Golden-hour and open
   shade are ideal.
5. **Nothing important is cut off at the frame edge.** The model extends
   the frame slightly as the camera moves; a hand cut off at the edge will
   grow a strange new hand.
6. **One subject per shot.** A photo with two people is good. A photo with
   twenty guests is a crowd shot — use it only for wide, forgiving prompts
   like `prompts/wedding/wedding-grand-entrance.md`.

## Resolution

- **Minimum:** 1024 px on the long edge. Below that, faces fall apart.
- **Ideal:** 1600–2048 px on the long edge. That is what the sample album
  in `examples/sample-album/` uses.
- **Bigger is not better:** a 6000 px phone photo does not generate a
  better clip — the model downsamples it anyway. Resize to ~1600 px to
  keep uploads fast.
- **Aspect ratio:** match the prompt. A 16:9 prompt needs a landscape
  photo; a 9:16 prompt (for example
  `prompts/wedding/wedding-vows-close-up.md`) needs a vertical photo.
  Cropping a landscape photo to vertical throws away the sides — check
  the couple is still in frame after the crop.

## Faces: the honest rules

- **Front-facing, both eyes visible:** safest. Use for close-ups and
  emotional shots.
- **Three-quarter view:** workable for medium shots, risky for close-ups.
- **Profile or back of head:** only for wide shots where the face is
  small. Never for a close-up.
- **Sunglasses, veils over the face, heavy shadow:** the model will guess
  what is underneath, and the guess will be wrong. Pick a different photo.
- **Old or scanned photos:** work if they are sharp and front-facing.
  Scan at 600 DPI and clean up dust and scratches first — every speck
  becomes motion. The album prompt
  `prompts/anniversary/anniversary-photo-album-coming-alive.md` is built
  for this.

## Hands

Hands are the hardest thing for video models. Before generating a
hands-heavy shot (rings, holding hands, a toast):

- Check the hands in the photo are complete — all fingers visible, none
  cut off.
- Prefer photos where hands are still and resting, not mid-gesture.
- If a hand is blurred or half out of frame, crop it out or pick another
  photo. See `tutorials/06-troubleshooting.md` for what to do when hands
  warp anyway.

## Choosing photos for a film

Pick photos in story order, not in "best photo" order. A film needs:

1. A quiet opening (a morning or detail shot).
2. The ceremony or the question.
3. The emotional peak (vows, first dance, the yes).
4. The celebration (crowd, dancing, exit).
5. A closing wide shot.

The sample storyboard `storyboards/wedding-60s-reception-film.json` shows
this arc with ten photos. Adapt it to your own photos in
`tutorials/02-storyboard.md`.

## Practice: check the sample album

Open `examples/sample-album/` and check each photo against the list
above. Notice that `06-petal-toss-kiss.jpg` and `10-palm-dusk-walk.jpg`
are vertical — they work for 9:16 prompts and get cropped to 16:9 in the
ffmpeg preview. The credits for these photos are in
`examples/CREDITS.md`.
