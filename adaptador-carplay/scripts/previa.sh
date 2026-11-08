#!/usr/bin/env bash
# Uso: scripts/previa.sh <composicion> <frame> <salida.png>
set -e
EXTRA=""
[ -x /opt/pw-browsers/chromium ] && EXTRA="--browser-executable=/opt/pw-browsers/chromium"
npx remotion still "$1" "$3" --frame="$2" $EXTRA --log=error --props='{"mostrarZonasSeguras":true,"fotoProducto":"producto.png"}'
