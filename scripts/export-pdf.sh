#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
desktop_out="$root/public/playson-power-pack-sales-deck.pdf"
mobile_out="$root/public/playson-power-pack-sales-deck-mobile.pdf"
chrome="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
port="${PDF_PREVIEW_PORT:-4173}"
base_url="http://127.0.0.1:${port}/"

if [[ ! -x "$chrome" ]]; then
  echo "Google Chrome was not found at $chrome" >&2
  exit 1
fi

cd "$root"
npm run build

npx vite preview --host 127.0.0.1 --port "$port" --strictPort >/tmp/playson-pdf-preview.log 2>&1 &
preview_pid=$!
cleanup() {
  kill "$preview_pid" >/dev/null 2>&1 || true
}
trap cleanup EXIT

for _ in $(seq 1 60); do
  if curl -fs "http://127.0.0.1:${port}/" >/dev/null; then
    break
  fi
  sleep 0.5
done

curl -fsS "http://127.0.0.1:${port}/" >/dev/null

"$chrome" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --no-pdf-header-footer \
  --virtual-time-budget=120000 \
  --print-to-pdf="$desktop_out" \
  "${base_url}?export-pdf=desktop"

"$chrome" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --no-pdf-header-footer \
  --virtual-time-budget=120000 \
  --window-size=390,844 \
  --print-to-pdf="$mobile_out" \
  "${base_url}?export-pdf=mobile"

echo "Wrote $desktop_out"
echo "Wrote $mobile_out"
