# Quick reference

## Setup and development

```bash
npm install
npm run dev
```

Preview hostname: map `127.0.0.1 playson-power-pack-salesdeck` in `/etc/hosts`, then open
`http://playson-power-pack-salesdeck:5173/`. The app still listens on port 5173.

## Verification

```bash
npm run typecheck
npm run validate:deck
npm run build
trivy fs --scanners vuln --severity HIGH,CRITICAL --exit-code 1 package-lock.json
```

## Deck workflow

1. Copy `src/decks/promo-tools-deck.ts`.
2. Edit metadata and typed slide content.
3. Import the deck in `src/App.tsx`.
4. Open the deck route and use `#slide=<id>` to link to a slide.
5. Use browser fullscreen to present or print to export a PDF.
6. Select **Edit text** in the deck controls to edit visible copy. These edits persist while
   navigating, but reset when the browser reloads; update the deck data for permanent changes.

## Share

Push to GitHub and let `.github/workflows/pages.yml` publish GitHub Pages. The live deck URL is
`https://<org>.github.io/<repo>/`. Keep the Pages site private; the Promo Tools narrative is
INTERNAL.

## Troubleshooting

- A blank slide usually indicates an invalid route or slide ID; run `npm run validate:deck`.
- If text metrics differ, install the licensed Code Next font locally.
- If a slide overflows, shorten content before changing the fixed 1440×810 template geometry.
- Replace `background/Background.png` and copy it to `public/background/Background.png` to
  refresh the shared slide canvas.

## Git workflow

Create a feature branch, run all verification commands, then submit changes for review. Do not
commit `node_modules`, `dist`, credentials, or exported confidential deck content.
