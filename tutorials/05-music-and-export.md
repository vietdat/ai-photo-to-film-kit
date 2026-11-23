# 05 — Music and Export

A film without music is a slideshow with ambition. This tutorial covers
choosing music legally, fitting it to the storyboard, and exporting the
finished film.

## Choosing music

- **Use licensed music.** Royalty-free libraries (Artlist, Epidemic
  Sound, Musicbed, Uppbeat) or a track licensed directly from the
  composer. "Royalty-free" still means "licensed under that library's
  terms" — read them.
- **Never use a commercial pop song** unless you have a sync licence for
  it. A wedding film played at a reception still needs one if you publish
  it online.
- **Match the storyboard's music notes.** Each storyboard JSON has a
  `music` block with mood, tempo, and where the music should lift. The
  wedding film (`storyboards/wedding-60s-reception-film.json`) suggests
  solo piano with strings at about 70 BPM; the anniversary film
  (`storyboards/anniversary-30s-film.json`) suggests solo piano at about
  60 BPM; the proposal film (`storyboards/proposal-45s-film.json`)
  suggests piano and strings at about 65 BPM, building after the
  halfway point.
- **One track for the whole film.** Cutting between tracks breaks the
  mood. Pick a track at least as long as the film; fade it out under the
  closing shot.

## Fitting music to the storyboard

1. Lay the music under the assembled video.
2. Find the track's emotional peak (usually two-thirds in) and align it
   with the storyboard's peak shot — the first dance, the vows, the yes.
   Slide the music track, not the video, to line them up.
3. Duck the music under the title card (about −12 dB for the first 3
   seconds) so the film opens quietly.
4. Fade the music out over the last 2 seconds, under the closing shot's
   hold.
5. For the proposal film, consider silence under the knee moment — the
   gasp is the music. The storyboard notes say this explicitly.

## Adding music to the ffmpeg preview

The ffmpeg script produces a silent video. Add a track with ffmpeg:

```bash
ffmpeg -y -i examples/finished-film/wedding-60s-reception-film.mp4 \
  -i my-licensed-track.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -shortest \
  -af "volume=0.8" \
  examples/finished-film/wedding-60s-reception-film-with-music.mp4
```

Replace `my-licensed-track.mp3` with your licensed file. `-shortest`
cuts the audio to the video length (60 seconds). Keep the volume modest
— the music supports the images, it does not compete with them.

For a fade-out in the last 2 seconds, add an audio fade:

```bash
ffmpeg -y -i examples/finished-film/wedding-60s-reception-film.mp4 \
  -i my-licensed-track.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -shortest \
  -af "volume=0.8,afade=t=out:st=58:d=2" \
  examples/finished-film/wedding-60s-reception-film-with-music.mp4
```

## Export settings

| Use | Settings |
| --- | -------- |
| Reception screening (projector/TV) | 1920×1080, H.264, 30 fps, 12–20 Mbps |
| Sharing online | 1920×1080, H.264, 30 fps, 8–12 Mbps |
| Phones / social vertical cuts | 1080×1920, H.264, 30 fps, 8–12 Mbps |

The ffmpeg script already outputs 1920×1080 H.264 at 30 fps. For a
vertical cut, regenerate the clips with 9:16 prompts (for example
`prompts/wedding/wedding-vows-close-up.md`) and assemble them separately
— do not crop a finished 16:9 film to vertical.

## Final checks before delivery

- [ ] Total duration matches the storyboard exactly (60, 30, or 45s).
- [ ] The title card shows the correct names and date.
- [ ] No clip shows a warped face, hand, or object (see
      `tutorials/06-troubleshooting.md`).
- [ ] Music is licensed and credited if the licence requires it.
- [ ] The file plays from start to finish without stuttering.
- [ ] If the film is motion-from-stills, it is labelled that way — never
      presented as AI-generated motion.

## Next step

When something looks wrong, see `tutorials/06-troubleshooting.md`.
