import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";
import { asset } from "../../lib/asset";
import { backgrounds, brandAssets } from "../tokens";
import "./components.css";

const particleLayers = [
  { name: "small", count: 48 },
  { name: "medium", count: 18 },
  { name: "large", count: 8 },
] as const;

function particleStyle(index: number, layerIndex: number, cycle: number) {
  const x = (index * 47 + layerIndex * 19 + (index % 7) * 11) % 100;
  const y = (index * 71 + layerIndex * 23 + (index % 5) * 13) % 100;
  const opacity = 0.2 + ((index * 17 + layerIndex * 9) % 38) / 100;

  return {
    "--particle-x": `${x}%`,
    "--particle-y": `${y / 2 + cycle * 50}%`,
    "--particle-opacity": opacity,
    "--particle-delay": `${-((index * 0.37 + layerIndex) % 5)}s`,
  } as CSSProperties;
}

export type ButtonTone = "primary" | "glass" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
}

export function Button({ tone = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`ds-button ds-button--${tone} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function PlaysonBackground({
  className = "",
  src = backgrounds.salesDeckSrc,
  ...props
}: HTMLAttributes<HTMLDivElement> & { src?: string }) {
  return (
    <div className={`ds-playson-background ${className}`.trim()} aria-hidden="true" {...props}>
      <img src={asset(src)} alt="" />
      <PlaysonParticles />
    </div>
  );
}

export function PlaysonParticles() {
  return (
    <div className="ds-playson-particles">
      {particleLayers.map((layer, layerIndex) => (
        <div
          className={`ds-playson-particles__layer ds-playson-particles__layer--${layer.name}`}
          key={layer.name}
        >
          {[0, 1].flatMap((cycle) =>
            Array.from({ length: layer.count }, (_, index) => (
              <span
                className="ds-playson-particle"
                key={`${cycle}-${index}`}
                style={particleStyle(index, layerIndex, cycle)}
              />
            )),
          )}
        </div>
      ))}
    </div>
  );
}

export interface DeckBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function DeckBackground({
  className = "",
  children,
  ...props
}: DeckBackgroundProps) {
  return (
    <div className={`ds-deck-background ${className}`.trim()} {...props}>
      <PlaysonBackground />
      {children}
    </div>
  );
}

export type BrandBackgroundVariant =
  | "red-capsule"
  | "red-purple-capsule"
  | "red-minimal"
  | "gray-chevron"
  | "red-swirl"
  | "dark-capsule"
  | "dark-red-gradient"
  | "dark-gray-capsule"
  | "red-play-symbol"
  | "red-capsule-pattern"
  | "dark-capsule-pattern"
  | "red-diagonal"
  | "red-purple-diagonal";

export interface BrandBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "landscape" | "portrait";
  variant: BrandBackgroundVariant;
}

export function BrandBackground({
  className = "",
  orientation = "landscape",
  variant,
  ...props
}: BrandBackgroundProps) {
  return (
    <div
      className={`ds-brand-background ds-brand-background--${orientation} ds-brand-background--${variant} ${className}`.trim()}
      aria-hidden="true"
      {...props}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

export interface BrandCoinProps extends ImgHTMLAttributes<HTMLImageElement> {
  rotation: number;
}

export function BrandCoin({ className = "", rotation, alt = "", ...props }: BrandCoinProps) {
  const safeRotation = Math.min(24, Math.max(1, Math.round(rotation)));

  return (
    <img
      className={`ds-brand-coin ${className}`.trim()}
      src={asset(brandAssets.coins[safeRotation - 1])}
      alt={alt}
      {...props}
    />
  );
}

export type TagTone = "accent" | "success" | "neutral";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

export function Tag({ tone = "accent", className = "", children, ...props }: TagProps) {
  return (
    <span className={`ds-tag ds-tag--${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
}

export function Metric({ value, label, className = "", ...props }: MetricProps) {
  return (
    <div className={`ds-metric ${className}`.trim()} {...props}>
      <strong className="ds-metric__value">{value}</strong>
      <span className="ds-metric__label">{label}</span>
    </div>
  );
}

export interface InsightPanelProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  children: ReactNode;
}

export function InsightPanel({
  heading = "Key insights",
  className = "",
  children,
  ...props
}: InsightPanelProps) {
  return (
    <aside className={`ds-insight ${className}`.trim()} {...props}>
      <h3 className="ds-insight__heading">{heading}</h3>
      <div className="ds-insight__content">{children}</div>
    </aside>
  );
}

export interface DeckHeaderProps extends HTMLAttributes<HTMLElement> {
  brand?: string;
  context: string;
  action?: string;
}

export function DeckHeader({
  brand = "PLAYSON",
  context,
  action = "GET MORE",
  className = "",
  ...props
}: DeckHeaderProps) {
  return (
    <header className={`ds-deck-header ${className}`.trim()} {...props}>
      <div className="ds-deck-header__identity">
        <img className="ds-deck-header__brand" src={asset(brandAssets.playsonLogoSrc)} alt={brand} />
        <span className="ds-deck-header__context">{context}</span>
      </div>
      <img className="ds-deck-header__action" src={asset(brandAssets.getMoreSrc)} alt={action} />
    </header>
  );
}

export interface ResourceTileProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  linkLabel: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function ResourceTile({
  title,
  description,
  linkLabel,
  imageSrc,
  imageAlt = "",
  className = "",
  ...props
}: ResourceTileProps) {
  return (
    <article className={`ds-resource-tile ${className}`.trim()} {...props}>
      <div className="ds-resource-tile__media">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : <span aria-hidden="true">P</span>}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="ds-resource-tile__link">{linkLabel}</span>
    </article>
  );
}

export interface ReleaseCardProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  tag: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function ReleaseCard({
  title,
  description,
  tag,
  imageSrc,
  imageAlt = "",
  className = "",
  ...props
}: ReleaseCardProps) {
  return (
    <article className={`ds-release-card ${className}`.trim()} {...props}>
      <div className="ds-release-card__media">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : <span aria-hidden="true">GAME</span>}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Tag tone="success">{tag}</Tag>
    </article>
  );
}

export interface RecommendationCalloutProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title: string;
  description: string;
}

export function RecommendationCallout({
  label = "Recommended",
  title,
  description,
  className = "",
  ...props
}: RecommendationCalloutProps) {
  return (
    <article className={`ds-recommendation ${className}`.trim()} {...props}>
      <Tag>{label}</Tag>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export interface ChartLegendProps extends HTMLAttributes<HTMLUListElement> {
  items: Array<{ label: string; color: string }>;
}

export function ChartLegend({ items, className = "", ...props }: ChartLegendProps) {
  return (
    <ul className={`ds-chart-legend ${className}`.trim()} {...props}>
      {items.map((item) => (
        <li key={item.label}>
          <span
            aria-hidden="true"
            style={{ "--legend-color": item.color } as CSSProperties}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export interface RoadmapStepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: Array<{ label: string; detail?: string }>;
  activeStep?: number;
}

export function RoadmapStepper({
  steps,
  activeStep = 0,
  className = "",
  ...props
}: RoadmapStepperProps) {
  return (
    <ol
      className={`ds-roadmap-stepper ${className}`.trim()}
      {...props}
      style={{ "--step-count": steps.length, ...props.style } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li className={index <= activeStep ? "is-active" : ""} key={`${index}-${step.label}`}>
          <span>{index + 1}</span>
          <strong>{step.label}</strong>
          {step.detail && <small>{step.detail}</small>}
        </li>
      ))}
    </ol>
  );
}

export interface RankedListRowProps extends HTMLAttributes<HTMLDivElement> {
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
}

export function RankedListRow({
  rank,
  title,
  description,
  tag,
  format,
  metric,
  metricLabel,
  trend = "flat",
  imageSrc,
  imageAlt = "",
  className = "",
  ...props
}: RankedListRowProps) {
  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";

  return (
    <div className={`ds-ranked-row ${className}`.trim()} {...props}>
      <strong className="ds-ranked-row__rank">{rank}</strong>
      <div className="ds-ranked-row__image">
        {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : <span aria-hidden="true">P</span>}
      </div>
      <div className="ds-ranked-row__title">
        <strong>{title}</strong>
        <Tag>{tag}</Tag>
      </div>
      <p>{description}</p>
      <span className="ds-ranked-row__format">{format}</span>
      <div className="ds-ranked-row__metric">
        <strong>{metric}</strong>
        <small>{metricLabel}</small>
      </div>
      <span className={`ds-ranked-row__trend ds-ranked-row__trend--${trend}`}>
        {trendSymbol}
      </span>
    </div>
  );
}

export interface ComparisonTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: string[];
  rows: Array<{ label: string; values: Array<string | number> }>;
}

export function ComparisonTable({
  columns,
  rows,
  className = "",
  ...props
}: ComparisonTableProps) {
  return (
    <div className={`ds-comparison-table ${className}`.trim()} {...props}>
      <table>
        <thead>
          <tr>
            <th scope="col">Family</th>
            {columns.map((column) => (
              <th scope="col" key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${columns[index] ?? index}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
