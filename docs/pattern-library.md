# Pattern library

The pattern library provides reusable structures for recurring sales-deck content. Import patterns
from `src/design-system/components`.

## Available patterns

- `PlaysonBackground`: 1920×1080 exported canvas from `background/Background.png` with three
  upward-moving white particle layers inspired by the Playson roadmap. Every slide template
  includes this component.
- `PlaysonParticles`: deterministic small, medium, and large particle layers with reduced-motion
  support.
- `DeckBackground`: 16:9 preview surface that hosts `PlaysonBackground`.
- `ResourceTile`: centered asset tile with media, title, description, and link label.
- `ReleaseCard`: glass release card with artwork, title, supporting copy, and feature tag.
- `RecommendationCallout`: recommendation label, headline, and rationale.
- `ChartLegend`: labeled color keys for data visualizations.
- `RoadmapStepper`: ordered process with active and completed states.
- `RankedListRow`: game ranking, artwork, description, format, metric, and trend.
- `ComparisonTable`: accessible comparison rows with configurable columns.

## Deck templates

The sample deck demonstrates the patterns through the `resources`, `roadmap`, `ranking`, and
`comparison` structured slide types. Each template accepts plain typed data from a deck file and
composes the relevant patterns automatically.

The 27-slide Promo Tools deck also uses `index`, `card-grid`, `process`, `tool-overview`,
`tool-player`, `tool-config`, and `contact` layouts. Five product modules share the same A/B/C
template sequence so design changes remain consistent across all tools.

The product hover palette is shared across slide 2 index rows, the row/column interactions on
slides 6–7, and the proof cards on slide 26. Desktop and mobile PDF exports preserve animated
content in a static final state and use solid Playson gold for typography that uses gradient
clipping in the interactive deck.

## Mobile deck patterns

Viewports up to 700px use a 390×844 portrait canvas. Content that exceeds the canvas is fitted
automatically so slides do not require vertical scrolling. Slide 6 uses tappable tool cards with
full-column detail overlays, while slide 7 uses the full horizontally scrollable matrix with
product-coloured columns and filters for hiding columns. Product overview slides center the
relevant logo beneath the title, and mobile card groups enter sequentially. The desktop PDF keeps
the 1440×810 composition; the mobile PDF exports the static 390×844 portrait layouts.

## Images

Image-based patterns accept an optional `imageSrc` and `imageAlt`. When no image is supplied, the
component renders a branded local placeholder so layouts remain usable without remote assets.

## Backgrounds

Every sales-deck template renders `<PlaysonBackground />` behind slide content, using
`background/Background.png` (served from `/background/Background.png`). Use `DeckBackground`
when the same surface is needed outside a slide template, such as a preview or design-system
example.

## Content handling

Sales-deck content may be internal or confidential. Do not place unreleased metrics, personal data,
credentials, or restricted artwork in the repository. Keep sensitive deck data in approved
encrypted storage and inject only the minimum content needed for presentation.
