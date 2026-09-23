# Repository context

## Architecture

This repository is a Vite, React, and TypeScript application for creating Playson sales decks
from structured content. It has two presentation surfaces:

- A responsive 16:9 HTML deck player.
- A visual reference for the shared design system.

Deck data is separate from rendering. A discriminated TypeScript schema selects a slide template,
and templates compose design-system components and CSS tokens.

## Responsibilities

- `src/design-system/`: foundation tokens, primitive components, and reusable sales-slide patterns
  such as brand backgrounds, coin rotations, release cards, steppers, ranked rows, and comparison
  tables.
- `src/deck/schema.ts`: deck and slide contracts plus runtime validation.
- `src/deck/templates/`: fixed-layout 1440×810 slide templates, including index, card grid,
  process, product-module, resources, roadmap, ranking, comparison, and contact layouts.
- `src/deck/DeckPlayer.tsx`: responsive scaling, navigation, URL state, and fullscreen.
- `src/decks/`: editable structured deck content.
- `src/pages/`: design-system documentation, including an Interactive Sales Deck
  section for Power Pack-specific patterns.
- `src/styles/`: global and token CSS.

## Design decisions

- Desktop slides use fixed 1440×810 coordinates. Viewports up to 700px switch to an exact 9:16
  portrait canvas (390×693.333). Oversized slides auto-fit instead of scrolling. Slide 6 uses tappable tool
  cards with full-column detail overlays; slide 7 uses the full horizontally scrollable matrix
  with product-coloured columns and filters for hiding columns. Overview slides center product
  logos under the title. Desktop and PDF keep the original tables and composition.
- Every slide renders `<PlaysonBackground />` using `background/Background.png` and three
  deterministic CSS particle layers; standalone previews use `DeckBackground`.
- Translucent card surfaces apply localized backdrop blur so particles soften only while passing
  behind a card. Interactive surfaces use the shared gold-and-purple hover glow and 1.03 scale.
  Product-specific hover colours are shared by the index, suite overview, toolkit tables, and
  proof cards. Turbo Races uses `#0244FC` and Power Chance uses `#019DE3`.
- Slide numbers are omitted on the first and last slides. Back to Index scales on hover
  without the product glow.
- Tool overview “Explore other tools for” copy links named products to their overview slides
  (10, 13, 16, 19, 22) with a product-coloured underline and no hover glow.
- Performance figures, unboxed process numbers, and slide subtitles use the shared warm-gold
  text gradient. PDF export uses solid Playson gold for those clipped-text styles.
- Deck headers use the approved PLAYSON and GET MORE SVG brand assets.
- The deck player provides session-only click-to-edit text. Edits stay in memory while navigating
  and are intentionally not written to browser storage or source files.
- The final-slide Download PDF action opens a format chooser for the landscape desktop PDF and
  portrait mobile PDF. The chooser is portaled to `document.body` so the scaled slide canvas
  cannot clip it. `npm run export-pdf` regenerates both
  `public/playson-power-pack-sales-deck.pdf` and
  `public/playson-power-pack-sales-deck-mobile.pdf`. `?export-pdf=desktop` renders the 16:9 deck;
  `?export-pdf=mobile` renders static 9:16 mobile slides.
- Deck content remains plain typed data so new decks do not require component changes.
- `asset()` prefixes public file paths with Vite `BASE_URL` so GitHub Pages project sites load
  images, video, and logos correctly.
- GitHub Pages deploys from `.github/workflows/pages.yml`. The hosted deck is INTERNAL and should
  remain on a private Pages site.
- Styling uses native CSS variables without a UI framework to preserve direct Figma-token mapping.
- Brand guideline tokens include the full red and neutral ramps, extended accent palette, and
  approved linear gradients. Reusable CSS-rendered landscape and portrait background variants are
  exposed through `BrandBackground`; exported Playson coin rotations are exposed through
  `BrandCoin` and stored in `public/brand-assets/coins/`.
- Code Next is the preferred family; system sans-serif fonts are safe fallbacks when font files are
  unavailable.

## Integrations

The current app has no runtime APIs. The bundled Promo Tools narrative is classified INTERNAL and
contains demonstration content only; customer data, unreleased metrics, and confidential terms
must remain in approved encrypted storage. Figma and Google Slides files are design-time
references only.

## Environment

Node.js and npm are required. Install dependencies with `npm install`, then run `npm run dev`.
