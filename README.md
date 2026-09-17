# Playson Sales Deck System

A data-driven HTML presentation system based on the supplied Playson Figma foundations.

## Run locally

```bash
npm install
npm run dev
```

- Sales deck: `http://playson-power-pack-salesdeck:5173/`
- Design-system reference: `http://playson-power-pack-salesdeck:5173/design-system`

## Create a deck

Copy `src/decks/promo-tools-deck.ts`, update its metadata and slides, then import the new deck into
`src/App.tsx`. Content is typed against the slide variants in `src/deck/schema.ts`. The current
sample route renders the complete 28-slide Promo Tools deck.

Available templates:

- `cover`
- `section`
- `metrics`
- `insight`
- `resources`
- `roadmap`
- `ranking`
- `comparison`
- `index`
- `card-grid`
- `process`
- `tool-overview`
- `tool-player`
- `tool-config`
- `contact`
- `closing`

Each slide needs a unique `id`. The deck player supports arrow keys, Page Up/Down, Space,
Home/End, fullscreen, and direct links such as `/#slide=performance`.

## Share a hosted link

The local preview (`http://127.0.0.1:5173/`) only works on this machine. To send colleagues a
link, push this repo to GitHub and enable GitHub Pages. The included workflow publishes the deck
to:

`https://<org>.github.io/<repo>/`

That Pages site should stay **private** (INTERNAL sales content). Colleagues with GitHub access
to the repo can open it. Deep-link a slide with `/#slide=<id>`.

## Pattern library

The design-system reference includes `PlaysonBackground`, resource tiles, release
cards, recommendation callouts, chart legends, roadmap steppers, ranked list rows, and comparison tables. See the
[pattern library](docs/pattern-library.md) for usage and content-handling guidance.

## Commands

```bash
npm run dev
npm run typecheck
npm run validate:deck
npm run build
npm run preview
```

The final slide downloads `public/playson-power-pack-sales-deck.pdf`. Refresh that file with
`npm run export-pdf` after slide or styling changes. The original Figma RTF source is retained as
reference material and is not part of the build.
