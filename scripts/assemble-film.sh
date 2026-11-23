#!/usr/bin/env bash
# assemble-film.sh — build a motion-from-stills film from a storyboard.
#
# Takes a folder of still photos and a storyboard JSON file (see
# storyboards/) and produces an MP4 with Ken Burns-style zoom/pan motion,
# crossfades between shots, and a title card.
#
# IMPORTANT: the output is motion-from-stills (zoom and pan over still
# photos). It is NOT AI-generated motion. Label it that way wherever you
# share it.
#
# Usage:
#   bash scripts/assemble-film.sh \
#     --album examples/sample-album \
#     --storyboard storyboards/wedding-60s-reception-film.json \
#     --output examples/finished-film/wedding-60s-reception-film.mp4
#
# Options:
#   --album DIR        Folder of still photos (required)
#   --storyboard FILE  Storyboard JSON (required)
#   --output FILE      Output MP4 path (required)
#   --resolution WxH   Output resolution, default 1920x1080
#   --fade SECONDS     Crossfade length, default 0.5
#   --title TEXT       Override the title-card text
#   --subtitle TEXT    Override the title-card subtitle
#
# Requirements: ffmpeg, ffprobe, node (for parsing the storyboard JSON).

set -euo pipefail

ALBUM=""
STORYBOARD=""
OUTPUT=""
RESOLUTION="1920x1080"
FADE="0.5"
TITLE_OVERRIDE=""
SUBTITLE_OVERRIDE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --album) ALBUM="$2"; shift 2 ;;
    --storyboard) STORYBOARD="$2"; shift 2 ;;
    --output) OUTPUT="$2"; shift 2 ;;
    --resolution) RESOLUTION="$2"; shift 2 ;;
    --fade) FADE="$2"; shift 2 ;;
    --title) TITLE_OVERRIDE="$2"; shift 2 ;;
    --subtitle) SUBTITLE_OVERRIDE="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,25p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      echo "Usage: $0 --album DIR --storyboard FILE --output FILE" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$ALBUM" || -z "$STORYBOARD" || -z "$OUTPUT" ]]; then
  echo "Error: --album, --storyboard and --output are all required." >&2
  exit 1
fi

command -v ffmpeg >/dev/null 2>&1 || { echo "Error: ffmpeg not found." >&2; exit 1; }
command -v ffprobe >/dev/null 2>&1 || { echo "Error: ffprobe not found." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Error: node not found (needed to read the storyboard JSON)." >&2; exit 1; }
[[ -d "$ALBUM" ]] || { echo "Error: album folder not found: $ALBUM" >&2; exit 1; }
[[ -f "$STORYBOARD" ]] || { echo "Error: storyboard not found: $STORYBOARD" >&2; exit 1; }

WIDTH="${RESOLUTION%x*}"
HEIGHT="${RESOLUTION#*x}"
FPS=30

# Input is upscaled 1.5x so the zoom never has to upscale the source.
SCALE_W=$(( WIDTH * 3 / 2 ))
SCALE_H=$(( HEIGHT * 3 / 2 ))

# Find a font for the title card (DejaVu ships with most Linux distros).
FONTFILE=""
for candidate in \
  /usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf \
  /usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf \
  /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf \
  /usr/share/fonts/truetype/dejavu/DejaVuSans.ttf ; do
  if [[ -f "$candidate" ]]; then FONTFILE="$candidate"; break; fi
done
if [[ -z "$FONTFILE" ]]; then
  echo "Warning: no DejaVu font found; title card will have no text." >&2
fi

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

# Parse the storyboard into pipe-separated records (a pipe is used as the
# separator because title/subtitle may be empty — bash `read` collapses
# empty fields when the separator is IFS whitespace such as a tab):
# type|duration|photo|title_text|subtitle_text|zoom|start_seconds
node -e '
const fs = require("fs");
const sb = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
sb.shots.forEach((s, i) => {
  const zoom = s.type === "title" ? "static" : (i % 2 === 0 ? "in" : "out");
  const clean = (v) => String(v == null ? "" : v).replace(/[|\t\n]/g, " ");
  console.log([s.type, s.duration_seconds, s.photo || "", clean(s.title_text), clean(s.subtitle_text), zoom, s.start_seconds].join("|"));
});
' "$STORYBOARD" > "$TMPDIR/shots.tsv"

TOTAL=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).total_duration_seconds)' "$STORYBOARD")
NSHOTS=$(wc -l < "$TMPDIR/shots.tsv")
echo "Storyboard: $STORYBOARD ($NSHOTS shots, ${TOTAL}s total, ${WIDTH}x${HEIGHT}, fade ${FADE}s)"

# Render one segment per shot. Every segment except the last is rendered
# FADE seconds longer than its storyboard duration, so the crossfades
# overlap without shortening the film. The xfade offset for shot k is
# exactly its start time in the storyboard.
i=0
declare -a SEGMENTS
declare -a OFFSETS
while IFS='|' read -r type duration photo title_text subtitle_text zoom start; do
  seg="$TMPDIR/seg-$(printf '%02d' "$i").mp4"
  is_last=0
  if [[ "$i" -eq $((NSHOTS - 1)) ]]; then is_last=1; fi
  seg_dur=$(awk -v d="$duration" -v f="$FADE" -v last="$is_last" 'BEGIN { printf "%.3f", (last ? d : d + f) }')
  frames=$(awk -v d="$seg_dur" -v fps="$FPS" 'BEGIN { printf "%d", d * fps + 0.5 }')
  src="$ALBUM/$photo"
  [[ -f "$src" ]] || { echo "Error: photo not found: $src" >&2; exit 1; }

  if [[ "$type" == "title" ]]; then
    # Title card: darkened photo, title + subtitle text, static frame.
    if [[ -n "$TITLE_OVERRIDE" ]]; then title_text="$TITLE_OVERRIDE"; fi
    if [[ -n "$SUBTITLE_OVERRIDE" ]]; then subtitle_text="$SUBTITLE_OVERRIDE"; fi
    printf '%s' "$title_text" > "$TMPDIR/title.txt"
    printf '%s' "$subtitle_text" > "$TMPDIR/subtitle.txt"
    title_size=$(( HEIGHT / 12 ))
    subtitle_size=$(( HEIGHT / 20 ))
    if [[ -n "$FONTFILE" ]]; then
      text_filters="drawtext=textfile=$TMPDIR/title.txt:fontfile=$FONTFILE:fontsize=$title_size:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-60:shadowcolor=black:shadowx=2:shadowy=2,drawtext=textfile=$TMPDIR/subtitle.txt:fontfile=$FONTFILE:fontsize=$subtitle_size:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2+40:shadowcolor=black:shadowx=2:shadowy=2"
    else
      text_filters="null"
    fi
    ffmpeg -y -v error -nostdin -loop 1 -framerate "$FPS" -t "$seg_dur" -i "$src" \
      -vf "scale=${SCALE_W}:${SCALE_H}:force_original_aspect_ratio=increase,crop=${SCALE_W}:${SCALE_H},eq=brightness=-0.45,zoompan=z='1.0':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${WIDTH}x${HEIGHT}:fps=${FPS},fade=t=in:st=0:d=0.8,${text_filters}" \
      -frames:v "$frames" -c:v libx264 -preset veryfast -pix_fmt yuv420p -r "$FPS" "$seg"
  else
    # Clip shot: Ken Burns zoom in or out, alternating per shot.
    if [[ "$zoom" == "in" ]]; then
      z_expr="min(1+0.0009*on,1.12)"
    else
      z_expr="max(1.12-0.0009*on,1.0)"
    fi
    ffmpeg -y -v error -nostdin -loop 1 -framerate "$FPS" -t "$seg_dur" -i "$src" \
      -vf "scale=${SCALE_W}:${SCALE_H}:force_original_aspect_ratio=increase,crop=${SCALE_W}:${SCALE_H},zoompan=z='${z_expr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${WIDTH}x${HEIGHT}:fps=${FPS}" \
      -frames:v "$frames" -c:v libx264 -preset veryfast -pix_fmt yuv420p -r "$FPS" "$seg"
  fi
  echo "  shot $((i + 1))/$NSHOTS: $type ${duration}s ($photo, zoom $zoom) -> $seg"
  SEGMENTS+=("$seg")
  OFFSETS+=("$start")
  i=$((i + 1))
done < "$TMPDIR/shots.tsv"

# Build the xfade chain.
FILTER=""
PREV="[0:v]"
for ((k = 1; k < NSHOTS; k++)); do
  out="[x$k]"
  if [[ "$k" -eq $((NSHOTS - 1)) ]]; then out="[vout]"; fi
  FILTER+="${PREV}[$k:v]xfade=transition=fade:duration=${FADE}:offset=${OFFSETS[$k]}${out};"
  PREV="$out"
done
FILTER="${FILTER%;}"

INPUTS=()
for seg in "${SEGMENTS[@]}"; do INPUTS+=(-i "$seg"); done

mkdir -p "$(dirname "$OUTPUT")"
ffmpeg -y -v error -nostdin "${INPUTS[@]}" \
  -filter_complex "$FILTER" \
  -map "[vout]" -c:v libx264 -pix_fmt yuv420p -r "$FPS" -crf 20 -preset medium \
  -movflags +faststart -an "$OUTPUT"

# Verify.
ACTUAL=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT")
echo "Done: $OUTPUT"
echo "Expected duration: ${TOTAL}s, actual: ${ACTUAL}s"
awk -v a="$ACTUAL" -v t="$TOTAL" 'BEGIN { d = a - t; if (d < 0) d = -d; if (d > 0.6) { print "Warning: duration differs from storyboard by " d "s" > "/dev/stderr"; exit 1 } }'
