export interface DeckMeta {
  title: string;
  market: string;
  date: string;
  brand?: string;
}

export interface BaseSlide {
  id: string;
  eyebrow?: string;
  backgroundSrc?: string;
}

export interface CoverSlide extends BaseSlide {
  type: "cover";
  title: string;
  subtitle: string;
  tag?: { label: string; tone?: "accent" | "success" | "neutral" };
  metrics?: Array<{ value: string; label: string }>;
}

export interface SectionSlide extends BaseSlide {
  type: "section";
  number?: string;
  title: string;
  body?: string;
}

export interface MetricsSlide extends BaseSlide {
  type: "metrics";
  title: string;
  body?: string;
  metrics: Array<{ value: string; label: string }>;
}

export interface InsightSlide extends BaseSlide {
  type: "insight";
  title: string;
  body?: string;
  insightHeading?: string;
  insight: string;
}

export interface ResourcesSlide extends BaseSlide {
  type: "resources";
  title: string;
  resource: {
    title: string;
    description: string;
    linkLabel: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  releases: Array<{
    title: string;
    description: string;
    tag: string;
    imageSrc?: string;
    imageAlt?: string;
  }>;
}

export interface RoadmapSlide extends BaseSlide {
  type: "roadmap";
  title: string;
  steps: Array<{ label: string; detail?: string }>;
  activeStep?: number;
  recommendation: {
    label?: string;
    title: string;
    description: string;
  };
}

export interface RankingSlide extends BaseSlide {
  type: "ranking";
  title: string;
  rows: Array<{
    rank: number;
    title: string;
    description: string;
    tag: string;
    format: string;
    metric: string;
    metricLabel: string;
    trend?: "up" | "down" | "flat";
    imageSrc?: string;
    imageAlt?: string;
  }>;
}

export interface ComparisonSlide extends BaseSlide {
  type: "comparison";
  title: string;
  body?: string;
  columns: string[];
  rows: Array<{ label: string; values: Array<string | number> }>;
  legend: Array<{ label: string; color: string }>;
}

export interface IndexSlide extends BaseSlide {
  type: "index";
  title: string;
  body?: string;
  rows: Array<{ need: string; tool: string; target: string }>;
}

export interface CardGridSlide extends BaseSlide {
  type: "card-grid";
  title: string;
  body?: string;
  cards: Array<{
    eyebrow?: string;
    title: string;
    body?: string;
    metric?: string;
    tag?: string;
    featured?: boolean;
  }>;
  footer?: string;
}

export interface ProcessSlide extends BaseSlide {
  type: "process";
  title: string;
  body?: string;
  groups: Array<{
    title?: string;
    steps: string[];
  }>;
}

interface ToolSlideBase extends BaseSlide {
  tool: string;
  title: string;
  subtitle?: string;
}

export interface ToolOverviewSlide extends ToolSlideBase {
  type: "tool-overview";
  job: string;
  useWhen: string;
  avoidWhen: string;
  proof?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface ToolPlayerSlide extends ToolSlideBase {
  type: "tool-player";
  mediaLabel?: string;
  mediaSrc?: string;
  callouts: string[];
  journey: string[];
  footer?: string;
}

export interface ToolConfigSlide extends ToolSlideBase {
  type: "tool-config";
  prizeTypes: Array<{ title: string; drives: string }>;
  settings: string[];
  workedExample: string;
}

export interface ContactSlide extends BaseSlide {
  type: "contact";
  title: string;
  body: string;
  contactLabel?: string;
  contact: string;
  contactHref?: string;
  footer?: string;
}

export interface ClosingSlide extends BaseSlide {
  type: "closing";
  title: string;
  body?: string;
  actionLabel?: string;
}

export type SlideData =
  | CoverSlide
  | SectionSlide
  | MetricsSlide
  | InsightSlide
  | ResourcesSlide
  | RoadmapSlide
  | RankingSlide
  | ComparisonSlide
  | IndexSlide
  | CardGridSlide
  | ProcessSlide
  | ToolOverviewSlide
  | ToolPlayerSlide
  | ToolConfigSlide
  | ContactSlide
  | ClosingSlide;

export interface DeckData {
  meta: DeckMeta;
  slides: SlideData[];
}

export function validateDeck(deck: DeckData): string[] {
  const errors: string[] = [];

  if (!deck.meta.title.trim()) errors.push("Deck title is required.");
  if (!deck.meta.market.trim()) errors.push("Deck market is required.");
  if (!deck.meta.date.trim()) errors.push("Deck date is required.");
  if (deck.slides.length === 0) errors.push("Deck must include at least one slide.");

  const ids = new Set<string>();
  deck.slides.forEach((slide, index) => {
    if (!slide.id.trim()) errors.push(`Slide ${index + 1} requires an id.`);
    if (ids.has(slide.id)) errors.push(`Duplicate slide id: ${slide.id}.`);
    ids.add(slide.id);

    if ("title" in slide && !slide.title.trim()) {
      errors.push(`Slide ${slide.id || index + 1} requires a title.`);
    }
    if (slide.type === "metrics" && slide.metrics.length === 0) {
      errors.push(`Metrics slide ${slide.id} requires at least one metric.`);
    }
    if (slide.type === "resources" && slide.releases.length === 0) {
      errors.push(`Resources slide ${slide.id} requires at least one release.`);
    }
    if (slide.type === "roadmap" && slide.steps.length < 2) {
      errors.push(`Roadmap slide ${slide.id} requires at least two steps.`);
    }
    if (slide.type === "ranking" && slide.rows.length === 0) {
      errors.push(`Ranking slide ${slide.id} requires at least one row.`);
    }
    if (slide.type === "comparison") {
      if (slide.columns.length === 0) {
        errors.push(`Comparison slide ${slide.id} requires at least one column.`);
      }
      slide.rows.forEach((row) => {
        if (row.values.length !== slide.columns.length) {
          errors.push(`Comparison row ${row.label} must match the column count.`);
        }
      });
    }
    if (slide.type === "index" && slide.rows.length === 0) {
      errors.push(`Index slide ${slide.id} requires at least one row.`);
    }
    if (slide.type === "card-grid" && slide.cards.length === 0) {
      errors.push(`Card grid slide ${slide.id} requires at least one card.`);
    }
    if (slide.type === "process") {
      if (slide.groups.length === 0 || slide.groups.some((group) => group.steps.length === 0)) {
        errors.push(`Process slide ${slide.id} requires steps in every group.`);
      }
    }
  });

  return errors;
}

export function assertValidDeck(deck: DeckData): DeckData {
  const errors = validateDeck(deck);
  if (errors.length) throw new Error(errors.join("\n"));
  return deck;
}
