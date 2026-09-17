import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import {
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
} from "../../design-system/components";
import { asset } from "../../lib/asset";
import type { DeckMeta, SlideData } from "../schema";
import "./templates.css";

const SlideChromeContext = createContext<{
  number?: number;
  total?: number;
  backgroundSrc?: string;
  onGoToSlide?: (slideNumber: number) => void;
}>({});

export function SlideTemplate({
  slide,
  meta,
  onGoToSlide,
  slideNumber,
  slideCount,
}: {
  slide: SlideData;
  meta: DeckMeta;
  onGoToSlide?: (slideNumber: number) => void;
  slideNumber?: number;
  slideCount?: number;
}) {
  const content = (() => {
    switch (slide.type) {
    case "cover":
      return <CoverTemplate slide={slide} meta={meta} />;
    case "section":
      return <SectionTemplate slide={slide} meta={meta} />;
    case "metrics":
      return <MetricsTemplate slide={slide} meta={meta} />;
    case "insight":
      return <InsightTemplate slide={slide} meta={meta} />;
    case "resources":
      return <ResourcesTemplate slide={slide} meta={meta} />;
    case "roadmap":
      return <RoadmapTemplate slide={slide} meta={meta} />;
    case "ranking":
      return <RankingTemplate slide={slide} meta={meta} />;
    case "comparison":
      return <ComparisonTemplate slide={slide} meta={meta} />;
    case "index":
      return <IndexTemplate slide={slide} meta={meta} onGoToSlide={onGoToSlide} />;
    case "card-grid":
      return <CardGridTemplate slide={slide} meta={meta} />;
    case "process":
      return <ProcessTemplate slide={slide} meta={meta} />;
    case "tool-overview":
      return <ToolOverviewTemplate slide={slide} meta={meta} />;
    case "tool-player":
      return <ToolPlayerTemplate slide={slide} meta={meta} />;
    case "tool-config":
      return <ToolConfigTemplate slide={slide} meta={meta} />;
    case "contact":
      return <ContactTemplate slide={slide} meta={meta} />;
    case "closing":
      return <ClosingTemplate slide={slide} meta={meta} />;
    }
  })();

  return (
    <SlideChromeContext.Provider
      value={{
        number: slideNumber,
        total: slideCount,
        backgroundSrc: slide.backgroundSrc,
        onGoToSlide,
      }}
    >
      {content}
    </SlideChromeContext.Provider>
  );
}

function Header({ meta }: { meta: DeckMeta }) {
  return (
    <DeckHeader
      brand={meta.brand}
      context={`${meta.title} • ${meta.market} • ${meta.date}`}
    />
  );
}

const powerBlastFallers = [
  { left: "120px", size: 72, duration: "10.8s", delay: "-1.2s", rotate: -16, drift: "0px", spin: "168deg" },
  { left: "400px", size: 64, duration: "7.9s", delay: "-5.4s", rotate: 22, drift: "0px", spin: "-154deg" },
  { left: "680px", size: 80, duration: "12.6s", delay: "-8.1s", rotate: -8, drift: "0px", spin: "126deg" },
  { left: "960px", size: 58, duration: "8.7s", delay: "-3.3s", rotate: 14, drift: "0px", spin: "-198deg" },
  { left: "1240px", size: 70, duration: "11.4s", delay: "-9.6s", rotate: -24, drift: "0px", spin: "142deg" },
];

function FallingIcons({ src }: { src: string | string[] }) {
  const sources = Array.isArray(src) ? src : [src];

  return (
    <div className="blast-fall" aria-hidden="true">
      {powerBlastFallers.map((icon, index) => (
        <img
          key={`${icon.left}-${index}`}
          src={asset(sources[index % sources.length])}
          alt=""
          style={{
            "--blast-left": icon.left,
            "--blast-size": `${icon.size}px`,
            "--blast-duration": icon.duration,
            "--blast-delay": icon.delay,
            "--blast-rotate": `${icon.rotate}deg`,
            "--blast-drift": icon.drift,
            "--blast-spin": icon.spin,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function PowerBlastFallingIcons() {
  return <FallingIcons src="/promo-assets/Power_Blasts-Icon-1000x1000.png" />;
}

function PowerChanceFallingIcons() {
  return (
    <FallingIcons
      src={["/promo-assets/Win_100x.png", "/promo-assets/Win_200x.png", "/promo-assets/Win_1000x.png"]}
    />
  );
}

function FlexiFallingIcons() {
  return <FallingIcons src="/promo-assets/Flexi-1000x1000.png" />;
}

function TurboRacesFallingIcons() {
  return <FallingIcons src="/promo-assets/Turbo_Races-Icon-1000x1000.png" />;
}

function GrandRaceFallingIcons() {
  return <FallingIcons src="/promo-assets/Grand_Race-Icon-1000x1000.png" />;
}

function ToolOverviewLogo({ id, src }: { id: string; src: string }) {
  return <img className="tool-overview-logo" src={asset(src)} alt="" data-draggable={id} />;
}

function SlideFrame({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const chrome = useContext(SlideChromeContext);
  const showBackIndex = Boolean(chrome.onGoToSlide && chrome.number && chrome.number > 2);
  const showSlideNumber = Boolean(
    chrome.number && chrome.total && chrome.number !== 1 && chrome.number !== chrome.total,
  );

  return (
    <div className={`slide ${className}`.trim()}>
      <PlaysonBackground src={chrome.backgroundSrc} />
      {children}
      {(showBackIndex || showSlideNumber) && (
        <div className="slide__chrome">
          {showBackIndex ? (
            <button
              className="slide__back-index"
              type="button"
              onClick={() => chrome.onGoToSlide?.(2)}
            >
              Back to Index
            </button>
          ) : (
            <span />
          )}
          {showSlideNumber && (
            <span className="slide__number" aria-hidden="true">
              {chrome.number} / {chrome.total}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CoverTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "cover" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--cover">
      <div className="slide__content">
        <Header meta={meta} />
        <div className="cover-layout">
          {slide.tag && <Tag tone={slide.tag.tone}>{slide.tag.label}</Tag>}
          {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>
          {slide.metrics && slide.metrics.length > 0 && (
            <div className="cover-metrics">
              {slide.metrics.map((metric) => (
                <article className="cover-metric" key={`${metric.value}-${metric.label}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideFrame>
  );
}

function SectionTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "section" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--section">
      <div className="slide__content">
        <Header meta={meta} />
        <div className="section-layout">
          <span className="section-layout__number">{slide.number ?? "01"}</span>
          <div>
            <p className="slide__eyebrow">{slide.eyebrow ?? "Section"}</p>
            <h1 className="slide__title">{slide.title}</h1>
            {slide.body && <p className="slide__body">{slide.body}</p>}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function MetricsTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "metrics" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--metrics">
      <div className="slide__content">
        <Header meta={meta} />
        <div className="template-heading">
          <div>
            <p className="slide__eyebrow">{slide.eyebrow ?? "Performance"}</p>
            <h1 className="slide__title">{slide.title}</h1>
          </div>
          {slide.body && <p className="slide__body">{slide.body}</p>}
        </div>
        <div className="metrics-grid">
          {slide.metrics.map((metric) => (
            <Metric key={`${metric.value}-${metric.label}`} {...metric} />
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function InsightTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "insight" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--insight">
      <div className="slide__content">
        <Header meta={meta} />
        <p className="slide__eyebrow">{slide.eyebrow ?? "Opportunity"}</p>
        <h1 className="slide__title">{slide.title}</h1>
        {slide.body && <p className="slide__body insight-body">{slide.body}</p>}
        <InsightPanel heading={slide.insightHeading}>
          <p>{slide.insight}</p>
        </InsightPanel>
      </div>
    </SlideFrame>
  );
}

function ResourcesTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "resources" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--resources">
      <div className="slide__content">
        <Header meta={meta} />
        <p className="slide__eyebrow">{slide.eyebrow ?? "Sales enablement"}</p>
        <h1 className="slide__title">{slide.title}</h1>
        <div className="resources-layout">
          <ResourceTile {...slide.resource} />
          <div className="resources-layout__releases">
            {slide.releases.map((release) => (
              <ReleaseCard key={release.title} {...release} />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function RoadmapTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "roadmap" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--roadmap">
      <div className="slide__content">
        <Header meta={meta} />
        <p className="slide__eyebrow">{slide.eyebrow ?? "Activation plan"}</p>
        <h1 className="slide__title">{slide.title}</h1>
        <RoadmapStepper steps={slide.steps} activeStep={slide.activeStep} />
        <RecommendationCallout {...slide.recommendation} />
      </div>
    </SlideFrame>
  );
}

function RankingTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "ranking" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--ranking">
      <div className="slide__content">
        <Header meta={meta} />
        <p className="slide__eyebrow">{slide.eyebrow ?? "Top performers"}</p>
        <h1 className="slide__title">{slide.title}</h1>
        <div className="ranking-list">
          {slide.rows.map((row) => (
            <RankedListRow key={`${row.rank}-${row.title}`} {...row} />
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function ComparisonTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "comparison" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--comparison ${slide.id === "toolkit-matrix" ? "slide--toolkit-matrix" : ""} ${slide.id === "five-tools" ? "slide--five-tools" : ""}`}>
      <div className="slide__content">
        <Header meta={meta} />
        {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
        <h1 className="slide__title">{slide.title}</h1>
        {slide.body && <p className="slide__body">{slide.body}</p>}
        <div
          className={`comparison-layout ${
            slide.legend.length === 0 ? "comparison-layout--table-only" : ""
          }`}
        >
          <ComparisonTable columns={slide.columns} rows={slide.rows} />
          {slide.legend.length > 0 && <ChartLegend items={slide.legend} />}
        </div>
      </div>
    </SlideFrame>
  );
}

function slideNumberFromTarget(target: string) {
  const match = target.match(/(\d+)\s*$/);
  if (!match) return null;
  const slideNumber = Number(match[1]);
  return Number.isInteger(slideNumber) && slideNumber > 0 ? slideNumber : null;
}

function IndexTemplate({
  slide,
  meta,
  onGoToSlide,
}: {
  slide: Extract<SlideData, { type: "index" }>;
  meta: DeckMeta;
  onGoToSlide?: (slideNumber: number) => void;
}) {
  return (
    <SlideFrame className="slide--index">
      <div className="slide__content">
        <Header meta={meta} />
        {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
        <h1 className="slide__title">{slide.title}</h1>
        {slide.body && <p className="slide__body">{slide.body}</p>}
        <div className="index-list">
          {slide.rows.map((row) => {
            const slideNumber = slideNumberFromTarget(row.target);
            const canJump = Boolean(slideNumber && onGoToSlide);

            return (
              <div
                className={`index-list__row ${canJump ? "index-list__row--jump" : ""}`}
                key={row.tool}
                role={canJump ? "link" : undefined}
                tabIndex={canJump ? 0 : undefined}
                onClick={() => {
                  if (slideNumber) onGoToSlide?.(slideNumber);
                }}
                onKeyDown={(event) => {
                  if (!canJump) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onGoToSlide?.(slideNumber!);
                  }
                }}
              >
                <span>{row.need}</span>
                <strong>{row.tool}</strong>
                <Tag tone="neutral" data-slide-jump={canJump ? "" : undefined}>
                  {row.target}
                </Tag>
              </div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

function CardGridTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "card-grid" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--card-grid ${slide.id === "suite-overview" ? "slide--suite-overview" : ""} ${slide.id === "suite-promise" ? "slide--suite-promise" : ""} ${slide.id === "proof" ? "slide--proof" : ""} ${slide.id === "suite-overview" || slide.id === "thirty-days" || slide.id === "proof" ? "slide--card-lead" : ""} ${slide.id === "suite-promise" ? "slide--card-drop" : ""}`}>
      <div className="slide__content">
        <Header meta={meta} />
        {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
        <h1 className="slide__title">{slide.title}</h1>
        {slide.body && <p className="slide__body">{slide.body}</p>}
        <div className={`content-card-grid content-card-grid--${Math.min(slide.cards.length, 6)}`}>
          {slide.cards.map((card, index) => (
            <article className={`content-card ${card.featured ? "content-card--featured" : ""}`} key={`${index}-${card.title}`}>
              {card.eyebrow && <span className="content-card__eyebrow">{card.eyebrow}</span>}
              {card.metric && <strong className="content-card__metric">{card.metric}</strong>}
              <h2>{card.title}</h2>
              {card.body && <p>{card.body}</p>}
              {card.tag && <Tag tone="neutral">{card.tag}</Tag>}
            </article>
          ))}
        </div>
        {slide.footer && <p className="template-footer">{slide.footer}</p>}
      </div>
    </SlideFrame>
  );
}

function ProcessTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "process" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--process ${slide.id === "build-process" ? "slide--build-process" : ""} ${slide.id === "integration" ? "slide--integration" : ""}`}>
      <div className="slide__content">
        <Header meta={meta} />
        {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
        <h1 className="slide__title">{slide.title}</h1>
        {slide.body && <p className="slide__body">{slide.body}</p>}
        <div className={`process-groups process-groups--${slide.groups.length}`}>
          {slide.groups.map((group, groupIndex) => (
            <section className="process-group" key={`${groupIndex}-${group.title ?? "process"}`}>
              {group.title && <h2>{group.title}</h2>}
              <ol>
                {group.steps.map((step, index) => (
                  <li key={`${index}-${step}`}>
                    <span>{index + 1}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function ToolOverviewTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "tool-overview" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--tool slide--${slide.id}`}>
      {slide.id === "flexible-free-spins-overview" && <FlexiFallingIcons />}
      {slide.id === "power-blasts-overview" && <PowerBlastFallingIcons />}
      {slide.id === "turbo-races-overview" && <TurboRacesFallingIcons />}
      {slide.id === "grand-race-overview" && <GrandRaceFallingIcons />}
      {slide.id === "power-chance-overview" && <PowerChanceFallingIcons />}
      {slide.id === "flexible-free-spins-overview" && (
        <ToolOverviewLogo id="logo-flexi-spins" src="/promo-assets/LOGO-Flexi-Spins.png" />
      )}
      {slide.id === "grand-race-overview" && (
        <ToolOverviewLogo id="logo-grand-race" src="/promo-assets/LOGO-Grand-race.png" />
      )}
      {slide.id === "turbo-races-overview" && (
        <ToolOverviewLogo id="logo-turbo-races" src="/promo-assets/LOGO-turbo-races.png" />
      )}
      {slide.id === "power-blasts-overview" && (
        <ToolOverviewLogo id="logo-power-blasts" src="/promo-assets/LOGO-power-blasts.png" />
      )}
      {slide.id === "power-chance-overview" && (
        <img className="tool-overview-logo" src={asset("/promo-assets/logo_animated.gif")} alt="" data-draggable="pc-logo-animated" />
      )}
      <div className="slide__content">
        <Header meta={meta} />
        <h1 className="slide__title">{slide.title}</h1>
        {slide.subtitle && <p className="slide__body">{slide.subtitle}</p>}
        <section className="tool-job">
          <span>Concept</span>
          <strong>{slide.job}</strong>
        </section>
        <div className="tool-use-grid">
          <section>
            <span>Great if you want to</span>
            <p>{slide.useWhen}</p>
          </section>
          <section>
            <span>Explore other tools for</span>
            <p>{slide.avoidWhen}</p>
          </section>
        </div>
        {slide.proof && (
          <InsightPanel heading="The numbers that matter">
            <p>{slide.proof}</p>
          </InsightPanel>
        )}
      </div>
    </SlideFrame>
  );
}

function ToolPlayerTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "tool-player" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--tool slide--${slide.id}`}>
      {slide.id === "power-blasts-player" && <PowerBlastFallingIcons />}
      {slide.id === "flexible-free-spins-player" && <FlexiFallingIcons />}
      {slide.id === "turbo-races-player" && <TurboRacesFallingIcons />}
      {slide.id === "grand-race-player" && <GrandRaceFallingIcons />}
      {slide.id === "power-chance-player" && <PowerChanceFallingIcons />}
      <div className="slide__content">
        <Header meta={meta} />
        <h1 className="slide__title">{slide.title}</h1>
        <div className="player-layout">
          <div className={`product-media-placeholder ${slide.mediaSrc ? "product-media-placeholder--video" : ""}`}>
            {slide.mediaSrc ? (
              <video
                src={asset(slide.mediaSrc)}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
              />
            ) : (
              <>
                <span>{slide.mediaLabel ?? "Product screenshot"}</span>
                <small>Use the asset instruction below.</small>
              </>
            )}
          </div>
          <div className="player-details">
            <section>
              <h2>Highlights</h2>
              <ol>
                {slide.callouts.map((callout, index) => (
                  <li key={callout}><span>{index + 1}</span>{callout}</li>
                ))}
              </ol>
            </section>
            <section>
              <h2>Player journey</h2>
              <ol>
                {slide.journey.map((step, index) => (
                  <li key={step}><span>{index + 1}</span>{step}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
        {slide.footer && <p className="template-footer">{slide.footer}</p>}
      </div>
    </SlideFrame>
  );
}

function ToolConfigTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "tool-config" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className={`slide--tool slide--${slide.id} ${slide.id === "flexible-free-spins-config" ? "slide--card-lead" : ""} ${slide.id === "grand-race-config" || slide.id === "turbo-races-config" || slide.id === "power-blasts-config" || slide.id === "power-chance-config" ? "slide--card-drop" : ""}`}>
      {slide.id === "power-blasts-config" && <PowerBlastFallingIcons />}
      {slide.id === "flexible-free-spins-config" && <FlexiFallingIcons />}
      {slide.id === "turbo-races-config" && <TurboRacesFallingIcons />}
      {slide.id === "grand-race-config" && <GrandRaceFallingIcons />}
      {slide.id === "power-chance-config" && <PowerChanceFallingIcons />}
      <div className="slide__content">
        <Header meta={meta} />
        <h1 className="slide__title">{slide.title}</h1>
        <div
          className={`prize-type-grid ${
            slide.prizeTypes.length > 4 ? "prize-type-grid--dense" : ""
          }`}
        >
          {slide.prizeTypes.map((prize) => (
            <article key={prize.title}>
              <strong>{prize.title}</strong>
              <span>{prize.drives}</span>
            </article>
          ))}
        </div>
        {(slide.settings.length > 0 || slide.workedExample) && (
          <div className="config-grid">
            {slide.settings.length > 0 && (
              <section>
                <h2>Controls</h2>
                <ul>{slide.settings.map((setting) => <li key={setting}>{setting}</li>)}</ul>
              </section>
            )}
            {slide.workedExample && (
              <section className="worked-example">
                <h2>Worked example</h2>
                <p>{slide.workedExample}</p>
              </section>
            )}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}

function ContactTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "contact" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--contact">
      <div className="slide__content">
        <Header meta={meta} />
        <div className="contact-layout">
          {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
          <h1>{slide.title}</h1>
          <p>{slide.body}</p>
          <div className="contact-layout__actions">
            {slide.contact.includes("@") ? (
              <a href={`mailto:${slide.contact}`}>{slide.contact}</a>
            ) : slide.contactHref ? (
              <a
                className="contact-layout__action"
                href={slide.contactHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {slide.contact}
              </a>
            ) : (
              <strong className="contact-layout__action">{slide.contact}</strong>
            )}
            <a
              className="ds-button ds-button--glass contact-layout__download"
              href={`${asset("playson-power-pack-sales-deck.pdf")}?v=20260917-1737`}
              download="Playson-Power-Pack-Sales-Deck.pdf"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ClosingTemplate({
  slide,
  meta,
}: {
  slide: Extract<SlideData, { type: "closing" }>;
  meta: DeckMeta;
}) {
  return (
    <SlideFrame className="slide--closing">
      <div className="slide__content">
        <Header meta={meta} />
        <div className="closing-layout">
          <p className="slide__eyebrow">{slide.eyebrow ?? "Next step"}</p>
          <h1>{slide.title}</h1>
          {slide.body && <p>{slide.body}</p>}
          <Button>{slide.actionLabel ?? "Explore more"}</Button>
        </div>
      </div>
    </SlideFrame>
  );
}
