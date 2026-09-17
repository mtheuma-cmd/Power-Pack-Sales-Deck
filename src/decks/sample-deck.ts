import { assertValidDeck, type DeckData } from "../deck/schema";
import { promoToolsDeckData } from "./promo-tools-deck";

const sampleDeck: DeckData = {
  meta: {
    title: "Market Playbook",
    market: "Italy",
    date: "September 2026",
    brand: "PLAYSON",
  },
  slides: [
    {
      id: "cover",
      type: "cover",
      eyebrow: "Sales growth strategy",
      title: "More impact in every spin.",
      subtitle:
        "A focused market plan built to grow visibility, engagement, and long-term player value.",
      tag: { label: "Italy", tone: "accent" },
    },
    {
      id: "opportunity",
      type: "section",
      number: "01",
      eyebrow: "Market opportunity",
      title: "Turn momentum into measurable growth.",
      body:
        "Prioritize the content, mechanics, and promotional moments most likely to move player behavior.",
    },
    {
      id: "performance",
      type: "metrics",
      eyebrow: "Expected performance",
      title: "Designed to move the numbers.",
      body:
        "A clear set of commercial indicators keeps the story focused on outcomes.",
      metrics: [
        { value: "~+30%", label: "Bets growth lift" },
        { value: "2.4×", label: "Campaign reach" },
        { value: "+18%", label: "Player retention" },
      ],
    },
    {
      id: "insight",
      type: "insight",
      eyebrow: "Recommendation",
      title: "Lead with proven mechanics. Build excitement with novelty.",
      body:
        "Balance recognizable player value with a regular cadence of fresh content.",
      insightHeading: "Key insight",
      insight:
        "Concentrating media and CRM around a small number of hero releases creates a stronger commercial signal than distributing attention evenly.",
    },
    {
      id: "resources",
      type: "resources",
      eyebrow: "Campaign toolkit",
      title: "Everything teams need to activate.",
      resource: {
        title: "Promo Features Kit",
        description:
          "Ready-to-use materials for promoting engagement features across campaign channels.",
        linkLabel: "Promo assets",
      },
      releases: [
        {
          title: "Golden Penny x1000: Super Wheel",
          description:
            "A high-impact feature experience with multipliers, free spins, and upgrades.",
          tag: "Super Wheel",
        },
        {
          title: "Coin Strike: Hold and Win",
          description:
            "A proven mechanic paired with a clear proposition for acquisition and retention.",
          tag: "Hold & Win",
        },
      ],
    },
    {
      id: "roadmap",
      type: "roadmap",
      eyebrow: "Activation plan",
      title: "A focused route from insight to growth.",
      steps: [
        { label: "Discover", detail: "Market signal" },
        { label: "Prioritize", detail: "Commercial fit" },
        { label: "Activate", detail: "Campaign launch" },
        { label: "Grow", detail: "Measure impact" },
      ],
      activeStep: 2,
      recommendation: {
        title: "Lead with network promotions",
        description:
          "Use shared promotional moments to concentrate attention, simplify activation, and create a stronger player proposition.",
      },
    },
    {
      id: "rankings",
      type: "ranking",
      eyebrow: "Top performers",
      title: "The titles driving momentum.",
      rows: [
        {
          rank: 1,
          title: "Golden Penny x1000",
          description: "Feature-led gameplay with a strong, easy-to-communicate player promise.",
          tag: "Super Wheel",
          format: "3×3 | ×5,150",
          metric: "~8.4%",
          metricLabel: "bet share",
          trend: "up",
        },
        {
          rank: 2,
          title: "Coin Strike",
          description: "A familiar mechanic with strong market relevance and repeat appeal.",
          tag: "Hold & Win",
          format: "3×3 | ×5,150",
          metric: "~7.2%",
          metricLabel: "bet share",
          trend: "up",
        },
        {
          rank: 3,
          title: "Sevens & Fruits",
          description: "Classic presentation designed for a broad and established audience.",
          tag: "Classic",
          format: "5×3 | 20 lines",
          metric: "~4.6%",
          metricLabel: "bet share",
          trend: "flat",
        },
      ],
    },
    {
      id: "portfolio",
      type: "comparison",
      eyebrow: "Portfolio view",
      title: "Balance proven families with fresh mechanics.",
      columns: ["Bet share", "Games", "Leading title"],
      rows: [
        { label: "Hold & Win", values: ["~65%", 60, "Coin Strike"] },
        { label: "Classic / Lines", values: ["~11%", 14, "Sevens & Fruits"] },
        { label: "Multicoin", values: ["~8%", 1, "Thunder Coins XXL"] },
        { label: "Multichance", values: ["~3%", 1, "Book of Gold"] },
        { label: "Other", values: ["—", 7, "Lightning Clovers"] },
      ],
      legend: [
        { label: "Hold & Win", color: "#FF002A" },
        { label: "Classic / Lines", color: "#9CA4AC" },
        { label: "Multicoin", color: "#69707A" },
        { label: "Multichance", color: "#4C5560" },
        { label: "Other", color: "#2D2D30" },
      ],
    },
    {
      id: "closing",
      type: "closing",
      eyebrow: "Let’s grow together",
      title: "Ready to get more?",
      body:
        "Turn this playbook into a focused launch plan for your audience.",
      actionLabel: "Explore more",
    },
  ],
};

assertValidDeck(sampleDeck);

export const deck = promoToolsDeckData;
