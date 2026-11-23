# Proposal 45-Second Film

- **Total length:** 45 seconds exactly
- **Aspect ratio:** 16:9, 30 fps
- **Vertical:** proposal
- **Photos:** `examples/sample-album/` (the title "For Sarah" is a
  placeholder — replace it with the real partner's name)
- **Machine-readable version:** `proposal-45s-film.json`

## Music

Licensed soft piano and strings, about 65 BPM, building after the halfway
point. Nervous, then joyful — a held breath, then a release. Keep the
music minimal and tense until the question, then let it bloom the moment
she says yes. Silence under the knee moment is also a valid choice — the
gasp is the music.

## Shot list

| # | Time | Length | Photo | Prompt | Camera / notes |
| - | ---- | ------ | ----- | ------ | -------------- |
| 1 | 0:00–0:03 | 3s | `01-golden-hour-bouquet.jpg` | — (title card) | Title: "For Sarah", subtitle: "The question". A single soft piano note, or silence. |
| 2 | 0:03–0:09 | 6s | `05-ceremony-chairs.jpg` | `general-wide-to-detail` | Slow push-in from wide toward one small detail. Piano enters, gentle and unsure. |
| 3 | 0:09–0:15 | 6s | `04-holding-hands.jpg` | `general-cinematic-push-in` | Slow, steady push-in. Music holds its breath. |
| 4 | 0:15–0:21 | 6s | `03-rings-close-up.jpg` | `proposal-ring-reveal` | Very slow push-in on the ring, then a slight tilt up. A held note — tension before the answer. |
| 5 | 0:21–0:27 | 6s | `08-lakeside-portrait.jpg` | `general-slow-orbit-portrait` | Slow orbit, 30–45 degrees. Music softens — a quiet beat before the celebration. |
| 6 | 0:27–0:33 | 6s | `07-hilltop-walk.jpg` | `proposal-mountain-top` | Slow orbit, mountains behind. First warmth returns — she is smiling now. |
| 7 | 0:33–0:39 | 6s | `02-balloon-release.jpg` | `general-golden-hour-glow` | Slow push-in, light warming. Music blooms — the release after the held breath. |
| 8 | 0:39–0:45 | 6s | `10-palm-dusk-walk.jpg` | `proposal-sunset-beach` | Slow crane up and back. Hold the final frame two beats, then fade to names and the date. Music resolves, joyful and full. |

## A note on the sample pairings

The sample album has no photo of anyone kneeling, so shot 5 uses a
couple portrait with `general-slow-orbit-portrait` instead of the
kneeling shot. For your own proposal film, use
`prompts/proposal/proposal-knee-moment.md` with a photo of the actual
kneel — that prompt is the one built for the question itself.

## First and last frames

- **First frame:** the title card over `01-golden-hour-bouquet.jpg`,
  darkened.
- **Last frame:** `10-palm-dusk-walk.jpg` at the end of the crane move —
  the couple small against the dusk. Hold it, then fade to the names card
  and the date.

## How to build it

1. Generate each clip with the prompt listed (see
   `tutorials/03-generate.md`).
2. Or build the motion-from-stills preview with the ffmpeg script — see
   `scripts/assemble-film.sh` and `tutorials/04-ffmpeg-assembly.md`.
   That version is honestly labelled motion-from-stills, not AI motion.
3. Assemble in the order above and check the total is exactly 45 seconds.

## Keeping the surprise

Generate the film from a staged rehearsal photo or from photos taken
after the real proposal, and show the film only after the proposal has
happened. Never show the storyboard or the film to the partner
beforehand.
