# Wedding 60-Second Reception Film

- **Total length:** 60 seconds exactly
- **Aspect ratio:** 16:9, 30 fps
- **Vertical:** wedding (flagship)
- **Photos:** `examples/sample-album/` (sample names "Emma & James" and the
  date "14 June 2026" are placeholders — replace them with the real
  couple's names)
- **Machine-readable version:** `wedding-60s-reception-film.json`

## Music

Licensed solo piano with strings, about 70 BPM, major key. Warm, tender,
building to joyful. Start sparse (solo piano), add strings at the vows
shot, lift into a full warm arrangement for the balloon release, and
resolve quietly under the closing shot. Duck the music under the title
card.

## Shot list

| # | Time | Length | Photo | Prompt | Camera / notes |
| - | ---- | ------ | ----- | ------ | -------------- |
| 1 | 0:00–0:03 | 3s | `01-golden-hour-bouquet.jpg` | — (title card) | Title: "Emma & James", subtitle: "14 June 2026". Static card over the darkened photo. Solo piano enters, very quiet. |
| 2 | 0:03–0:09 | 6s | `09-ceremony-aisle.jpg` | `wedding-aisle-walk` | Slow backward track. First strings enter. |
| 3 | 0:09–0:14 | 5s | `03-rings-close-up.jpg` | `wedding-rings-close-up` | Very slow push-in, almost static. Music holds — a pause in the film. |
| 4 | 0:14–0:20 | 6s | `04-holding-hands.jpg` | `general-cinematic-push-in` | Slow steady push-in on the joined hands. Strings swell gently. |
| 5 | 0:20–0:26 | 6s | `05-ceremony-chairs.jpg` | `general-wide-to-detail` | Slow push-in from wide toward one small detail. Strings continue, piano answers. |
| 6 | 0:26–0:32 | 6s | `06-petal-toss-kiss.jpg` | `general-slow-orbit-portrait` | Slow orbit, 30–45 degrees. Music lifts — first joyful peak. |
| 7 | 0:32–0:38 | 6s | `08-lakeside-portrait.jpg` | `general-emotional-close-up` | Static with an almost imperceptible push-in. Full arrangement. |
| 8 | 0:38–0:44 | 6s | `02-balloon-release.jpg` | `general-golden-hour-glow` | Slow push-in, light warming. Biggest moment — music peaks here. |
| 9 | 0:44–0:52 | 8s | `07-hilltop-walk.jpg` | `general-golden-hour-glow` | Slow push-in, light warming. Music begins to resolve. |
| 10 | 0:52–1:00 | 8s | `10-palm-dusk-walk.jpg` | `wedding-sunset-portrait` | Slow pan right, following the light. Hold the final frame two beats, then fade to the couple's names. Music resolves to a single piano note. |

## First and last frames

- **First frame:** the title card over `01-golden-hour-bouquet.jpg`,
  darkened, couple centred.
- **Last frame:** `10-palm-dusk-walk.jpg` at the end of the pan —
  the couple walking into the dusk light. Hold it, then fade to the
  names card.

## How to build it

1. Generate each clip with the prompt listed (see
   `tutorials/03-generate.md`).
2. Or build the motion-from-stills preview with the ffmpeg script — see
   `examples/finished-film/README.md`. That version is honestly labelled
   motion-from-stills, not AI motion.
3. Assemble in the order above and check the total is exactly 60 seconds.
