#!/usr/bin/env bash
# Exporta las dos versiones a Renders/ (H.264 + AAC) y normaliza el audio a -14 LUFS (pico real -1 dBTP).
# Uso: npm run exportar
set -euo pipefail
cd "$(dirname "$0")/.."
EXTRA=()
[ -x /opt/pw-browsers/chromium ] && EXTRA+=(--browser-executable=/opt/pw-browsers/chromium)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
for f in 9x16 4x5; do
  npx remotion render "Anuncio-$f" "$TMP/crudo-$f.mp4" --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=192k --log=error "${EXTRA[@]}"
  # pasada 1: medir
  medida=$(ffmpeg -hide_banner -i "$TMP/crudo-$f.mp4" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  val() { echo "$medida" | grep "\"$1\"" | sed 's/.*: "\(.*\)".*/\1/'; }
  # pasada 2: aplicar
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/crudo-$f.mp4" -c:v copy \
    -af "loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(val input_i):measured_TP=$(val input_tp):measured_LRA=$(val input_lra):measured_thresh=$(val input_thresh):offset=$(val target_offset):linear=true,aresample=48000" \
    -c:a aac -b:a 192k -movflags +faststart "Renders/adaptador-carplay-$f.mp4"
  echo "Listo: Renders/adaptador-carplay-$f.mp4"
done
