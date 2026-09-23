import type { CSSProperties } from "react";
import {
  colors,
  effects,
  gradients,
  radii,
  spacing,
  typography,
} from "../design-system/tokens";
import {
  BrandBackground,
  BrandCoin,
  Button,
  ChartLegend,
  ComparisonTable,
  DeckHeader,
  InsightPanel,
  Metric,
  PlaysonBackground,
  RankedListRow,
  RecommendationCallout,
  ReleaseCard,
  ResourceTile,
  RoadmapStepper,
  Tag,
} from "../design-system/components";
import type { BrandBackgroundVariant } from "../design-system/components";
import { asset } from "../lib/asset";
import "./design-system-page.css";

const deckLink = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const toolHovers = [
  {
    name: "Flexible Free Spins",
    glow: "0 0 24px rgb(57 255 20 / 55%), 0 10px 38px rgb(0 220 70 / 42%)",
    tint: "rgb(57 255 20 / 8%)",
  },
  {
    name: "Grand Race",
    glow: "0 0 24px rgb(255 0 42 / 58%), 0 10px 38px rgb(255 0 42 / 44%)",
    tint: "rgb(255 0 42 / 8%)",
  },
  {
    name: "Turbo Races",
    glow: "0 0 24px rgb(2 68 252 / 58%), 0 10px 38px rgb(2 68 252 / 44%)",
    tint: "rgb(2 68 252 / 8%)",
  },
  {
    name: "Power Blasts",
    glow: "0 0 24px rgb(190 120 255 / 58%), 0 10px 38px rgb(129 40 255 / 48%)",
    tint: "rgb(190 120 255 / 8%)",
  },
  {
    name: "Power Chance",
    glow: "0 0 24px rgb(1 157 227 / 62%), 0 10px 38px rgb(1 157 227 / 48%)",
    tint: "rgb(1 157 227 / 8%)",
  },
] as const;

const fallingIcons = [
  ["/promo-assets/Flexi-1000x1000.png", "Flexible Free Spins"],
  ["/promo-assets/Grand_Race-Icon-1000x1000.png", "Grand Race"],
  ["/promo-assets/Turbo_Races-Icon-1000x1000.png", "Turbo Races"],
  ["/promo-assets/Power_Blasts-Icon-1000x1000.png", "Power Blasts"],
  ["/promo-assets/Win_100x.png", "Power Chance 100×"],
  ["/promo-assets/Win_200x.png", "Power Chance 200×"],
  ["/promo-assets/Win_1000x.png", "Power Chance 1000×"],
] as const;

const overviewLogos = [
  ["/promo-assets/LOGO-Flexi-Spins.png", "Flexible Free Spins"],
  ["/promo-assets/LOGO-Grand-race.png", "Grand Race"],
  ["/promo-assets/LOGO-turbo-races.png", "Turbo Races"],
  ["/promo-assets/LOGO-power-blasts.png", "Power Blasts"],
  ["/promo-assets/logo_animated.gif", "Power Chance"],
] as const;

const mobileDeckPreviews = [
  ["Tool cards + detail", "five-tools"],
  ["Scrollable filtered matrix", "toolkit-matrix"],
  ["Tool overview", "flexible-free-spins-overview"],
] as const;

const mobileDeckRules = [
  ["Breakpoint", "≤ 700px"],
  ["Portrait canvas", "390 × 693.333 (9:16)"],
  ["Content behaviour", "Auto-fit without vertical scrolling"],
  ["Tables", "Product-coloured columns with visibility filters"],
  ["Tool cards", "Sequential entrance animation"],
  ["Desktop and PDF", "Original 1440 × 810 composition"],
] as const;

const brandCore = [
  ["Playson Black", colors.brand.core.black],
  ["Playson Red", colors.brand.core.red],
  ["Playson White", colors.brand.core.white],
] as const;

const redScale = [
  ...Object.entries(colors.brand.red).map(([name, value]) => [`red-${name}`, value] as const),
  ...Object.entries(colors.brand.darkRed).map(
    ([name, value]) => [`darkred-${name}`, value] as const,
  ),
];

const neutralScale = Object.entries(colors.brand.neutral).map(
  ([name, value]) => [`gray-${name}`, value] as const,
);

const extendedPalette = Object.entries(colors.brand.extended);

const gradientSamples = Object.entries(gradients);

const landscapeBackgrounds: Array<[string, BrandBackgroundVariant]> = [
  ["Red Capsule", "red-capsule"],
  ["Red Purple Capsule", "red-purple-capsule"],
  ["Red Minimal", "red-minimal"],
  ["Gray Chevron", "gray-chevron"],
  ["Red Swirl", "red-swirl"],
  ["Dark Capsule", "dark-capsule"],
  ["Dark Red Gradient", "dark-red-gradient"],
  ["Dark Gray Capsule", "dark-gray-capsule"],
  ["Red Play Symbol", "red-play-symbol"],
  ["Red Capsule Pattern", "red-capsule-pattern"],
  ["Dark Capsule Pattern", "dark-capsule-pattern"],
];

const portraitBackgrounds: Array<[string, BrandBackgroundVariant]> = [
  ["Red Diagonal", "red-diagonal"],
  ["Red Purple Diagonal", "red-purple-diagonal"],
  ["Red Minimal", "red-minimal"],
];

const semanticColors = [
  ["background/canvas", colors.semantic.backgroundCanvas],
  ["text/primary", colors.semantic.textPrimary],
  ["text/secondary", colors.semantic.textSecondary],
  ["surface/card", colors.semantic.surfaceCard],
  ["border/subtle", colors.semantic.borderSubtle],
  ["action/primary", colors.semantic.actionPrimary],
  ["content/highlight", colors.semantic.contentHighlight],
  ["status/success", colors.semantic.statusSuccess],
] as const;

const typeSamples = [
  ["Display/Hero", "Grow", typography.displayHero],
  ["Display/Large", "Market Playbook", typography.displayLarge],
  ["Heading/H1", "Release roadmap", typography.headingH1],
  ["Heading/H2", "Bet share by family", typography.headingH2],
  ["Heading/H3", "Key insights", typography.headingH3],
  ["Body/Large", "Promotional strategy that leads with outcomes.", typography.bodyLarge],
  ["Body/Medium", "Supporting copy balances clarity and density.", typography.bodyMedium],
  ["Body/Small", "Use for compact card descriptions and table details.", typography.bodySmall],
  ["Label/Small", "TOP PERFORMERS", typography.labelSmall],
] as const;

export function DesignSystemPage() {
  return (
    <main className="docs">
      <header className="docs-status">
        <strong>PLAYSON DESIGN SYSTEM</strong>
        <span>SEPTEMBER 2026</span>
      </header>

      <section className="docs-hero">
        <p>BRAND GUIDELINES &amp; COMPONENTS</p>
        <h1>Playson design system</h1>
        <span>
          Official brand color scales, gradients, artwork, and reusable presentation components.
        </span>
      </section>

      <DocsSection
        title="Interactive Sales Deck"
        description="Patterns unique to the Playson Power Pack promo tools deck: desktop and mobile canvases, dedicated portrait layouts, shared product styling, motion, chrome, local media, and PDF export."
      >
        <Showcase title="Live deck">
          <div className="docs-deck-cta-row">
            <a className="docs-deck-cta" href={deckLink}>
              Open Interactive Sales Deck
            </a>
            <p>
              27 slides with a 1440 × 810 desktop canvas and responsive 9:16 mobile canvas.
              Arrow keys, touch controls, fullscreen, hash links such as
              {" "}
              <code>#slide=explore</code>
              , and GitHub Pages hosting.
            </p>
          </div>
        </Showcase>
        <Showcase title="Mobile deck layouts">
          <div className="docs-mobile-preview-grid">
            {mobileDeckPreviews.map(([label, slideId]) => (
              <figure className="docs-mobile-preview" key={slideId}>
                <div className="docs-mobile-preview__device">
                  <div className="docs-mobile-preview__screen">
                    <iframe
                      src={`${deckLink}#slide=${slideId}`}
                      title={`${label} mobile deck preview`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </Showcase>
        <Showcase title="Mobile layout rules">
          <div className="docs-mobile-rules">
            {mobileDeckRules.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </Showcase>
        <Showcase title="Index and table hover palette">
          <div className="docs-tool-glow-grid">
            {toolHovers.map((tool) => (
              <article
                className="docs-tool-glow"
                key={tool.name}
                style={{
                  "--glow-hover": tool.glow,
                  "--tool-hover-tint": tool.tint,
                } as CSSProperties}
              >
                <strong>{tool.name}</strong>
                <span>Used by slide 2, slides 6–7 tables, and slide 26 cards</span>
              </article>
            ))}
          </div>
        </Showcase>
        <Showcase title="Falling product icons">
          <div className="docs-fall-grid">
            {fallingIcons.map(([src, label]) => (
              <figure className="docs-fall-icon" key={label}>
                <img src={asset(src)} alt="" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </Showcase>
        <Showcase title="Overview logos">
          <div className="docs-logo-grid">
            {overviewLogos.map(([src, label]) => (
              <figure className="docs-overview-logo" key={label}>
                <img src={asset(src)} alt="" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </Showcase>
        <Showcase title="Slide chrome">
          <div className="docs-chrome-preview">
            <button className="slide__back-index" type="button">
              Back to Index
            </button>
            <span className="slide__number">14 / 27</span>
          </div>
        </Showcase>
        <Showcase title="Contact actions and PDF formats">
          <div className="docs-contact-preview">
            <a className="contact-layout__action" href="https://playson.com/contacts" target="_blank" rel="noopener noreferrer">
              LET’S HAVE A CHAT
            </a>
            <a
              className="ds-button ds-button--glass contact-layout__download"
              href={`${asset("playson-power-pack-sales-deck.pdf")}?v=20260923-1636`}
              download="Playson-Power-Pack-Sales-Deck-Desktop.pdf"
            >
              Desktop PDF
            </a>
            <a
              className="ds-button ds-button--glass contact-layout__download"
              href={`${asset("playson-power-pack-sales-deck-mobile.pdf")}?v=20260923-1636`}
              download="Playson-Power-Pack-Sales-Deck-Mobile.pdf"
            >
              Mobile PDF
            </a>
          </div>
        </Showcase>
        <Showcase title="PDF export treatment">
          <div className="docs-pdf-rules">
            <span>Animated entrances</span>
            <strong>Static final state</strong>
            <span>Gradient typography</span>
            <strong>Solid Playson gold</strong>
            <span>Falling product icons</span>
            <strong>Fixed visible positions</strong>
            <span>Desktop PDF</span>
            <strong>16:9 landscape</strong>
            <span>Mobile PDF</span>
            <strong>9:16 portrait</strong>
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Brand identity"
        description="Foundational Playson colors, complete red and neutral scales, extended accents, and approved gradient recipes."
      >
        <Showcase title="Brand core">
          <ColorSwatches items={brandCore} size="large" />
        </Showcase>
        <Showcase title="Red scale">
          <ColorSwatches items={redScale} />
        </Showcase>
        <Showcase title="Neutral scale">
          <ColorSwatches items={neutralScale} />
        </Showcase>
        <Showcase title="Extended palette">
          <ColorSwatches items={extendedPalette} />
        </Showcase>
        <Showcase title="Gradient system">
          <div className="docs-gradient-grid">
            {gradientSamples.map(([name, value]) => (
              <div className="docs-gradient" key={name}>
                <span style={{ background: value }} />
                <strong>{formatTokenName(name)}</strong>
              </div>
            ))}
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Coins"
        description="Gold coin assets from the Playson Brand Identity Guidelines, supplied in multiple rotation angles."
      >
        <Showcase title="Playson symbol rotations">
          <div className="docs-coin-grid">
            {Array.from({ length: 24 }, (_, index) => (
              <div className="docs-coin" key={index + 1}>
                <BrandCoin rotation={index + 1} alt={`Playson coin rotation ${index + 1}`} />
                <code>{String(index + 1).padStart(2, "0")}</code>
              </div>
            ))}
          </div>
        </Showcase>
        <Showcase title="Spin symbol">
          <p className="docs-asset-note">
            Exported Spin Symbol image frames are required to complete this asset set.
          </p>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Brand backgrounds"
        description="Reusable branded surfaces based on the landscape and portrait artworks in the Brand Identity Guidelines."
      >
        <Showcase title="Landscape · 1920 × 1080">
          <div className="docs-background-grid">
            {landscapeBackgrounds.map(([name, variant]) => (
              <figure className="docs-brand-background" key={variant}>
                <BrandBackground variant={variant} />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </Showcase>
        <Showcase title="Portrait · 1080 × 1920">
          <div className="docs-background-grid docs-background-grid--portrait">
            {portraitBackgrounds.map(([name, variant]) => (
              <figure className="docs-brand-background" key={variant}>
                <BrandBackground orientation="portrait" variant={variant} />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Animated deck background"
        description="The shared 16:9 canvas combines the approved artwork with three animated particle layers. Particles blur only while passing behind translucent cards."
      >
        <Showcase title="PlaysonBackground">
          <div className="docs-background-preview">
            <PlaysonBackground />
            <div>
              <strong>Animated deck canvas</strong>
              <span>Approved background artwork + rising, twinkling particles</span>
            </div>
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Components"
        description="Reusable patterns extracted from recurring structures in market playbooks and promo decks."
      >
        <Showcase title="Button">
          <div className="docs-row">
            <Button>Explore more</Button>
            <Button tone="glass">Explore more</Button>
            <Button tone="success">Explore more</Button>
          </div>
        </Showcase>
        <Showcase title="Tag">
          <div className="docs-row">
            <Tag>Accent</Tag>
            <Tag tone="success">Success</Tag>
            <Tag tone="neutral">Neutral</Tag>
          </div>
        </Showcase>
        <Showcase title="Content patterns">
          <div className="docs-component-grid">
            <Metric value="+200%" label="Players on participating slots" />
            <InsightPanel>
              <p>Use this panel for the single most important interpretation on a data-heavy slide.</p>
            </InsightPanel>
          </div>
          <div className="docs-header-preview">
            <DeckHeader context="Market playbook • Italy • June 2026" />
          </div>
        </Showcase>
        <Showcase title="Deck navigation & process numbering">
          <div className="docs-deck-patterns">
            <div className="docs-jump-row">
              <span>Give players more choice without changing reward value</span>
              <strong>Flexible Free Spins</strong>
              <Tag tone="neutral">Go to 10</Tag>
            </div>
            <ol className="docs-process-list">
              {[
                "Analyse market preferences",
                "Assess player behaviour",
                "Build for a clear player need",
                "Remove launch friction",
              ].map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Pattern library"
        description="Exact structures extracted from recurring sales slides and converted into editable local components."
      >
        <Showcase title="Resource tile">
          <div className="docs-pattern-stage">
            <ResourceTile
              title="Promo Features Kit"
              description="Ready-to-use materials for promoting engagement features across campaign channels."
              linkLabel="Promo assets"
            />
          </div>
        </Showcase>
        <Showcase title="Release card">
          <div className="docs-pattern-stage">
            <ReleaseCard
              title="Golden Penny x1000: Super Wheel"
              description="A high-impact feature experience with multipliers, free spins, and upgrades."
              tag="Super Wheel"
            />
          </div>
        </Showcase>
        <Showcase title="Recommendation callout & chart legend">
          <div className="docs-pattern-grid">
            <RecommendationCallout
              title="Prioritize network promotions"
              description="Use a focused recommendation to connect the commercial opportunity to a clear next action."
            />
            <ChartLegend
              items={[
                { label: "Hold & Win", color: colors.core.red },
                { label: "Classic / Lines", color: "#9CA4AC" },
                { label: "Multicoin", color: "#69707A" },
                { label: "Multichance", color: "#4C5560" },
                { label: "Other", color: "#2D2D30" },
              ]}
            />
          </div>
        </Showcase>
        <Showcase title="Roadmap stepper">
          <div className="docs-pattern-scroll">
            <RoadmapStepper
              steps={[
                { label: "Discover", detail: "Market signal" },
                { label: "Prioritize", detail: "Commercial fit" },
                { label: "Activate", detail: "Campaign launch" },
                { label: "Grow", detail: "Measure impact" },
              ]}
              activeStep={2}
            />
          </div>
        </Showcase>
        <Showcase title="Ranked list row">
          <div className="docs-pattern-scroll">
            <RankedListRow
              rank={2}
              title="Coin Strike: Hold and Win"
              description="Feature-led title with strong market relevance and a clear player proposition."
              tag="Hold & Win"
              format="3×3 | ×5,150"
              metric="~7.2%"
              metricLabel="bet share"
              trend="up"
            />
          </div>
        </Showcase>
        <Showcase title="Comparison table">
          <div className="docs-pattern-scroll">
            <ComparisonTable
              columns={["Bet share", "Games", "Leading title"]}
              rows={[
                { label: "Hold & Win", values: ["~65%", 60, "Coin Strike"] },
                { label: "Classic / Lines", values: ["~11%", 14, "Sevens & Fruits"] },
                { label: "Multicoin", values: ["~8%", 1, "Thunder Coins XXL"] },
                { label: "Multichance", values: ["~3%", 1, "Book of Gold"] },
                { label: "Other", values: ["—", 7, "Lightning Clovers"] },
              ]}
            />
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Color tokens"
        description="White type, vivid Playson red, warm gold, purple depth, and restrained glass surfaces."
      >
        <Showcase title="Core palette">
          <div className="docs-swatches">
            {Object.entries(colors.core).map(([name, value]) => (
              <div className="docs-swatch" key={name}>
                <span style={{ background: value }} />
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
            ))}
          </div>
        </Showcase>
        <Showcase title="Semantic roles">
          <div className="docs-token-list">
            {semanticColors.map(([name, value]) => (
              <div className="docs-token-row" key={name}>
                <code>{name}</code>
                <span style={{ background: value }} />
              </div>
            ))}
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Typography"
        description="Code Next is primary. Bold creates editorial impact while SemiBold carries supporting copy."
      >
        <Showcase title="Display, headings, body & labels">
          <div className="docs-type-list">
            {typeSamples.map(([name, sample, style]) => (
              <div className="docs-type-row" key={name}>
                <code>{name}</code>
                <span
                  style={{
                    fontSize: style.size,
                    fontWeight: style.weight,
                    lineHeight: style.lineHeight,
                  }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Spacing & sizing"
        description="A pragmatic 4-point scale supports compact data layouts and editorial breathing room."
      >
        <Showcase title="Spacing scale">
          <div className="docs-space-list">
            {Object.values(spacing).map((value) => (
              <div className="docs-space-row" key={value}>
                <code>space/{value}</code>
                <span style={{ width: value * 4 }} />
              </div>
            ))}
          </div>
        </Showcase>
      </DocsSection>

      <DocsSection
        title="Shape & effects"
        description="Soft corners, translucent surfaces, localized backdrop blur, gold-gradient figures, and a restrained hover glow support the presentation aesthetic."
      >
        <Showcase title="Corner radius">
          <div className="docs-radius-list">
            {Object.entries(radii).map(([name, value]) => (
              <div key={name}>
                <span style={{ borderRadius: value }} />
                <code>radius/{name} · {value}</code>
              </div>
            ))}
          </div>
        </Showcase>
        <Showcase title="Particle blur & hover glow">
          <div className="docs-effect-stage">
            <PlaysonBackground />
            <div className="docs-glass-card">
              <strong>Glass surface</strong>
              <span>{effects.particleCardBlur}px backdrop blur · hover to scale and glow</span>
            </div>
          </div>
        </Showcase>
      </DocsSection>
    </main>
  );
}

function DocsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="docs-section">
      <div className="docs-section__intro">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="docs-section__content">{children}</div>
    </section>
  );
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="docs-showcase">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function ColorSwatches({
  items,
  size = "compact",
}: {
  items: ReadonlyArray<readonly [string, string]>;
  size?: "compact" | "large";
}) {
  return (
    <div className={`docs-brand-swatches docs-brand-swatches--${size}`}>
      {items.map(([name, value]) => (
        <div className="docs-brand-swatch" key={name}>
          <span style={{ background: value }} />
          <strong>{formatTokenName(name)}</strong>
          <code>{value}</code>
        </div>
      ))}
    </div>
  );
}

function formatTokenName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
