import { assertValidDeck, type DeckData, type SlideData } from "../deck/schema";

interface ToolModuleContent {
  slug: string;
  name: string;
  overviewTitle: string;
  playerTitle: string;
  configTitle: string;
  job: string;
  useWhen: string;
  avoidWhen: string;
  proof?: string;
  overviewBackgroundSrc?: string;
  mediaSrc?: string;
  mediaLabel: string;
  callouts: string[];
  journey: string[];
  playerFooter?: string;
  options: Array<{ title: string; drives: string }>;
  settings: string[];
  workedExample: string;
}

// Data classification: INTERNAL — demonstration sales content only.
// Do not add customer data, unreleased metrics, or confidential commercial terms.
const toolModules: ToolModuleContent[] = [
  {
    slug: "flexible-free-spins",
    name: "Flexible Free Spins",
    overviewTitle: "Flexible Free Spins — What It Does",
    playerTitle: "Flexible Free Spins — What The Player Sees",
    configTitle: "Flexible Free Spins — What You Configure",
    job: "Give players control over bet size without changing the total value of the Free Spins reward.",
    useWhen: "Empower your players, boost acquisition, reactivate players, reward with market-wide offers where players have differing bet level preferences.",
    avoidWhen: "Public competition, a leaderboard or a shared prize pool. Check out Grand Race or Turbo Races instead!",
    proof: "20% lower Free Spins abandonment.\nPlayers selected 50% higher bets on average by choosing fewer spins.",
    overviewBackgroundSrc: "/promo-assets/Flexi_Spins-BACKGROUND_Horizontal.jpg",
    mediaSrc: "/promo-assets/Flexible-Free-Spins-Promo-Video.mp4",
    mediaLabel: "Product screenshot / video still",
    callouts: [
      "Standard Free Spins fix both the bet and number of spins.",
      "Flexible Free Spins add simple plus and minus bet controls.",
      "The number of spins recalculates automatically around the selected bet.",
      "The operator’s original reward value stays unchanged.",
    ],
    journey: [
      "Receive the Free Spins offer",
      "Choose a preferred bet level",
      "See the spins recalculate and start playing",
    ],
    options: [
      { title: "Setup", drives: "Configure Promo Free Spins exactly as before: game, reward value and total budget. E.g. €20 total value = 10 × €2 spins, 20 × €1 spins or 40 × €0.50 spins." },
      { title: "Player Choice", drives: "Offer bet levels supported by the selected game; spins adjust automatically." },
      { title: "Value Guardrail", drives: "Every option is pre-calculated so the total reward value never exceeds the configured amount." },
      { title: "Rollout", drives: "Existing promotions remain unchanged. New offers can use Flexible Free Spins." },
    ],
    settings: [],
    workedExample: "",
  },
  {
    slug: "grand-race",
    name: "Grand Race",
    overviewTitle: "Grand Race — What It Does",
    playerTitle: "Grand Race — What The Player Sees",
    configTitle: "Grand Race — What You Configure",
    job: "Use visible leaderboard progress, ranking pressure and multiple prize positions to sustain competition across a longer campaign.",
    useWhen: "Build a scheduled campaign with a clear return reason and a prize ladder players can keep chasing.",
    avoidWhen: "If you need a quick prime-time burst or an instant in-session reward. Check out Turbo Races and Power Blasts instead!",
    proof: "Across analysed network offers, participating slots recorded +200% users, +58% total bets and +64% rounds in three-day before/after windows.",
    overviewBackgroundSrc: "/promo-assets/Grand_Race-BG.png",
    mediaSrc: "/promo-assets/Grand-Race-browser.mp4",
    mediaLabel: "Product screenshot / video still",
    callouts: [
      "Players opt in from the game and start earning points.",
      "Every qualified spin updates the leaderboard in real time.",
      "Visible rank shows who to overtake and who is catching up.",
      "Prizes are credited when the tournament ends.",
    ],
    journey: ["Join and play", "Climb the live leaderboard", "Finish in a prize position"],
    options: [
      { title: "Spins", drives: "Rewards spin volume; drives broad participation." },
      { title: "Bets", drives: "Rewards wagering activity; supports higher-value play." },
      { title: "Prizes", drives: "Rewards winning sessions; creates prize excitement." },
      { title: "Multipliers", drives: "Rewards multiplier outcomes; creates accessible competition." },
      { title: "High Multiplier", drives: "Rewards the best single hit; creates anyone-can-win moments." },
      { title: "Controls", drives: "Set games, duration, prizes, qualification rules, maximum qualified spin count and minimum qualified bet." },
    ],
    settings: [],
    workedExample: "",
  },
  {
    slug: "turbo-races",
    name: "Turbo Races",
    overviewTitle: "Turbo Races — What It Does",
    playerTitle: "Turbo Races — What The Players Sees",
    configTitle: "Turbo Races — What You Configure",
    job: "Run short, recurring leaderboard races that give players fast reasons to compete, win and return for the next race.",
    useWhen: "Use it for daily activity peaks, short prize cycles and repeat competition without a long campaign commitment.",
    avoidWhen: "Multi-day leaderboard or a personal in-session reward. Check out Grand Race and Power Blasts instead!",
    overviewBackgroundSrc: "/promo-assets/Turbo_Races-BG.png",
    mediaLabel: "Product screenshot / video still",
    callouts: [
      "Players join directly from the game.",
      "Qualified spins add points immediately.",
      "Leaderboard updates show the next position to chase.",
      "Prizes are credited immediately after the race ends.",
    ],
    journey: ["Join and play", "Earn points and climb", "Compete for top prizes"],
    playerFooter: "Capture the join control, live leaderboard and end-of-race result from the approved Turbo Races demo.",
    options: [
      { title: "Bet Race", drives: "Rewards wagering activity; supports higher-value play." },
      { title: "Win Race", drives: "Rewards winning sessions; creates prize excitement." },
      { title: "Multiplier Race", drives: "Rewards strong multipliers; keeps competition accessible." },
      { title: "Spin Race", drives: "Rewards spin volume; drives broad participation." },
      { title: "Schedule", drives: "Create recurring race windows through one campaign setup." },
      { title: "Controls", drives: "Set games, race schedule, scoring mechanic, prizes and qualification rules." },
    ],
    settings: [],
    workedExample: "",
  },
  {
    slug: "power-blasts",
    name: "Power Blasts",
    overviewTitle: "Power Blasts — What It Does",
    playerTitle: "Power Blasts — What The Player Sees",
    configTitle: "Power Blasts — What You Configure",
    job: "Drop instant prizes into active play, with selected reward values linked to the bet that triggered the Blast.",
    useWhen: "Create an in-session reward moment with cash, Free Spins, multipliers or Bonus Game entry.",
    avoidWhen: "A scheduled public tournament or a leaderboard campaign. Check our Grand Race and Turbo Races!",
    overviewBackgroundSrc: "/promo-assets/Power_Blast-BG.png",
    mediaSrc: "/promo-assets/Power-Blast-browser.mp4",
    mediaLabel: "Product screenshot / video still",
    callouts: [
      "Players opt in and start playing.",
      "The live prize board shows available rewards and remaining Blasts.",
      "Qualified play can trigger an instant prize drop.",
      "The reward lands without interrupting the game session.",
    ],
    journey: ["Join and play", "Track available rewards", "Trigger an instant prize drop"],
    options: [
      { title: "Cash", drives: "Fixed instant cash; creates immediate excitement." },
      { title: "Free Spins", drives: "Awarded at the triggering bet; supports continued play." },
      { title: "Multipliers", drives: "Bet-based win boost; supports higher-value play." },
      { title: "Bonus Game", drives: "Premium feature entry; supports session extension." },
      { title: "Stake-linked logic", drives: "Free Spins, multipliers and Bonus Game entries are calculated from the bet that triggered the Blast." },
      { title: "Controls", drives: "Set games, duration, prize pool, number and size of drops, max bet cap and qualification rules." },
    ],
    settings: [],
    workedExample: "",
  },
  {
    slug: "power-chance",
    name: "Power Chance",
    overviewTitle: "Power Chance — What It Does",
    playerTitle: "Power Chance — What The Player Sees",
    configTitle: "Power Chance — What You Configure",
    job: "Add one progressive jackpot and three fixed jackpot tiers to selected top-performing titles, revealed through a Pick & Win mini-game.",
    useWhen: "Offer an always-available big-money progressive jackpot layer inside selected Power Chance games, with visible jackpot values and recent-drop information.",
    avoidWhen: "A time-boxed lobby promotion or a mechanic available across every Playson title, or smaller and more personal rewards. Check out Power Blasts!",
    overviewBackgroundSrc: "/promo-assets/Turbo_Races-BG.png",
    mediaSrc: "/promo-assets/PC-Recording.mp4",
    mediaLabel: "Product screenshot / video loop",
    callouts: [
      "The jackpot widget keeps the progressive and fixed tiers visible during play.",
      "When Power Chance triggers, the player enters the Pick & Win jackpot feature.",
      "The player picks one of four options to reveal a jackpot (1 progressive jackpot plus fixed jackpots worth 1,000×, 200× and 100× total bet).",
      "The win pop-up confirms the result; recent drops remain one click away.",
    ],
    journey: [
      "See the jackpot in the game",
      "Trigger Power Chance pick game",
      "Reveal the jackpot and view the result",
    ],
    options: [
      { title: "Total RTP", drives: "95.5%: 94.5% base game + 0.25% fixed jackpots + 0.75% progressive jackpot." },
      { title: "Progressive contribution", drives: "0.75% total: 0.5625% visible contribution and 0.1875% hidden contribution." },
      { title: "Seed", drives: "€30,000 after each progressive jackpot drop." },
      { title: "Expected target win", drives: "€120,000 average progressive jackpot value." },
      { title: "Expected maximum trigger", drives: "Up to €151,000." },
      { title: "Display and access", drives: "Plug & Play; static and dynamic modes supported; ticker integration is strongly recommended for visibility." },
    ],
    settings: [],
    workedExample: "",
  },
];

const moduleSlides = toolModules.flatMap((tool): SlideData[] => [
  {
    id: `${tool.slug}-overview`,
    type: "tool-overview",
    tool: tool.name,
    title: tool.overviewTitle,
    job: tool.job,
    useWhen: tool.useWhen,
    avoidWhen: tool.avoidWhen,
    proof: tool.proof,
    backgroundSrc: tool.overviewBackgroundSrc,
  },
  {
    id: `${tool.slug}-player`,
    type: "tool-player",
    tool: tool.name,
    title: tool.playerTitle,
    mediaLabel: tool.mediaLabel,
    mediaSrc: tool.mediaSrc,
    callouts: tool.callouts,
    journey: tool.journey,
    footer: tool.playerFooter,
    backgroundSrc: tool.overviewBackgroundSrc,
  },
  {
    id: `${tool.slug}-config`,
    type: "tool-config",
    tool: tool.name,
    title: tool.configTitle,
    prizeTypes: tool.options,
    settings: tool.settings,
    workedExample: tool.workedExample,
    backgroundSrc: tool.overviewBackgroundSrc,
  },
]);

const promoToolsDeck: DeckData = {
  meta: {
    title: "Playson Power Pack",
    market: "Promo Tools",
    date: "September 2026",
    brand: "PLAYSON",
  },
  slides: [
    {
      id: "cover",
      type: "cover",
      title: "Playson Power Pack",
      subtitle: "Five Measurable Performance Levers.",
      metrics: [
        { value: "+200%", label: "Players on Grand Race participating slots" },
        { value: "−20%", label: "Free Spins abandonment with Flexible Free Spins" },
        { value: "+66%", label: "Average bet in Power Chance games" },
      ],
    },
    {
      id: "explore",
      type: "index",
      title: "What do you want your promotion to do?",
      body: "Choose the player experience you want to create.",
      rows: [
        { need: "Give players more choice without changing reward value", tool: "Flexible Free Spins", target: "Go to 10" },
        { need: "Run a longer leaderboard campaign that players return to", tool: "Grand Race", target: "Go to 13" },
        { need: "Create short, recurring bursts of competition", tool: "Turbo Races", target: "Go to 16" },
        { need: "Drop instant rewards into an active game session", tool: "Power Blasts", target: "Go to 19" },
        { need: "Add progressive jackpot potential inside selected game titles", tool: "Power Chance", target: "Go to 22" },
      ],
    },
    {
      id: "operator-problems",
      type: "card-grid",
      title: "Why Your Promos Don’t Perform",
      body: "Generic mechanics miss the player moment. With the right tools, you can change the numbers.",
      cards: [
        { title: "No Player Autonomy", body: "Flexible Free Spins reduced Free Spins abandonment by 20%. Players chose 50% higher bets on average by taking fewer spins." },
        { title: "No Visible Competition", body: "Grand Race and Turbo Races each recorded 200% more users on participating slots in the analysed three-day comparison windows." },
        { title: "No Reward Moment\nInside Play", body: "Power Blasts recorded 13.5% more total bets, while Power Chance games recorded 66% higher average bets on qualifying site-days." },
      ],
    },
    {
      id: "build-process",
      type: "process",
      title: "How We Decide What To Build",
      body: "Research first. Then the mechanic.",
      groups: [{
        steps: [
          "Analyse market preferences — Identify what different markets respond to and understand why.",
          "Assess player behaviour — Find the moments where interest, momentum or return intent drops.",
          "Build for a clear player need — Match the game and promotion mechanic to the behaviour we want to support.",
          "Remove launch friction — Leverage the Playson setup and our team to manage smooth configuration and support.",
        ],
      }],
    },
    {
      id: "suite-overview",
      type: "card-grid",
      title: "What’s In The Playson Power Pack?",
      body: "Four tools for four different promotional jobs — plus Power Chance inside selected games.",
      cards: [
        { title: "Flexible Free Spins", body: "Keep the reward value fixed. Let the player choose the bet and number of spins." },
        { title: "Grand Race", body: "Turn a longer campaign into visible leaderboard progress players can return to chase." },
        { title: "Turbo Races", body: "Create short, recurring competitions built around fast prize cycles and prime-time play." },
        { title: "Power Blasts", body: "Drop instant, stake-linked rewards into the game without interrupting the session." },
        { title: "Complete the experience\nwith Power Chance", body: "Add one progressive jackpot and three fixed jackpot tiers inside\nselected Power Chance titles.", featured: true },
      ],
    },
    {
      id: "five-tools",
      type: "comparison",
      title: "Match The Tool To The Job",
      body: "What problem do you need to solve?",
      columns: ["The Solution", "Why It Works"],
      rows: [
        { label: "Control reward value while giving players a choice", values: ["Flexible Free Spins", "Spins recalculate around the chosen bet while total reward value stays fixed."] },
        { label: "Build a campaign players return to over several days", values: ["Grand Race", "Long-form leaderboards keep rank, rivals and prize positions visible throughout the campaign."] },
        { label: "Create urgent, repeat competition in short windows", values: ["Turbo Races", "Recurring races deliver fast prize cycles without a long commitment."] },
        { label: "Reward players inside an active session", values: ["Power Blasts", "Instant drops land during play, with selected rewards scaling to the triggering bet."] },
        { label: "Add ongoing jackpot potential inside the game", values: ["Power Chance", "Selected titles include one progressive and three fixed jackpot tiers, plus a Pick & Win reveal."] },
      ],
      legend: [],
    },
    {
      id: "toolkit-matrix",
      type: "comparison",
      title: "Your Complete Promotional Toolkit",
      body: "Five mechanics built to furnish your players with different moments, durations and outcomes.",
      columns: ["Flexible Free Spins", "Grand Race", "Turbo Races", "Power Blasts", "Power Chance"],
      rows: [
        { label: "Format", values: ["Player-choice reward", "Long-form leaderboard", "Short recurring leaderboard", "Instant prize drops", "In-game jackpot feature"] },
        { label: "Duration", values: ["Offer-defined", "Longer campaign window", "Short race windows", "Campaign-defined", "Available inside enabled titles"] },
        { label: "Player trigger", values: ["Choose bet before play", "Join and make qualified spins", "Join and make qualified spins", "Qualified play triggers a Blast", "Jackpot triggers during game play"] },
        { label: "Rewards", values: ["Free Spins", "Cash; FFS planned", "Cash; FFS planned", "Cash, FFS, Multipliers, Bonus Game", "1 progressive + 3 fixed jackpots"] },
        { label: "Scheduling", values: ["Per reward offer", "Scheduled campaign", "Multiple races in one campaign", "Configured campaign", "Tied to selected titles"] },
        { label: "Controls", values: ["Budget, bet range, spin count", "Scoring, games, duration, qualification", "Scoring, schedule, prizes, qualification", "Drops, prizes, max bet cap, qualification", "Jackpot setup, display mode, ticker, currency"] },
        { label: "Best for", values: ["Choice with cost control", "Sustained competition", "Fast repeat competition", "In-session excitement", "Always-available jackpot appeal"] },
        { label: "Availability", values: ["All Playson games", "All Playson games", "All Playson games", "All Playson games", "Power Chance game family"] },
      ],
      legend: [],
    },
    {
      id: "suite-promise",
      type: "card-grid",
      title: "The Playson Power Pack Promise",
      body: "The powerful operational advantages behind our integration-free tools.",
      cards: [
        { title: "No Additional Integration", body: "All four tools run within the standard Playson integration package." },
        { title: "Fully Managed by Playson", body: "Our team supports setup, configuration and campaign delivery." },
        { title: "Flexible Campaign Setup", body: "Choose games, timing, rules, values, prizes and qualification settings for the mechanic." },
        { title: "Local or Network Options", body: "Run a dedicated operator campaign or join a broader network promotion where supported." },
        { title: "Commercial Control", body: "Prize exposure and campaign rules are defined before launch." },
        { title: "Live Leaderboard Infrastructure", body: "Available for Grand Race and Turbo Races — not a feature of every Power Pack tool." },
      ],
    },
    {
      id: "integration",
      type: "process",
      title: "Hassle-Free Activation",
      body: "Two simple routes, depending on what you want to launch.",
      groups: [
        { title: "Playson Power Pack", steps: ["Speak to your Account Manager", "Choose the promotion format", "Configure games, timing, prizes and rules", "Go live"] },
        { title: "Power Chance", steps: ["Speak to your Account Manager", "Select Power Chance titles", "Confirm the jackpot display and recommended ticker setup", "Go live"] },
      ],
    },
    ...moduleSlides,
    {
      id: "thirty-days",
      type: "card-grid",
      title: "30 Days with the Playson Power Pack",
      body: "Here’s how a month of our tools could look at your casino — built around different player moments.",
      cards: [
        { eyebrow: "Week 1", title: "Launch Grand Race", body: "Open a longer leaderboard campaign and establish visible positions." },
        { eyebrow: "Week 2", title: "Add Turbo Races", body: "Run short prime-time races as repeat side competitions." },
        { eyebrow: "Week 3", title: "Layer in Power Blasts", body: "Use instant drops to create reward moments during active sessions." },
        { eyebrow: "Week 4", title: "Finish Grand Race", body: "Close the campaign, credit prizes and recap the winners." },
        { title: "Across the month:", body: "Use Flexible Free Spins for targeted offers. Keep Power Chance available inside selected titles for ongoing jackpot potential.", featured: true },
      ],
    },
    {
      id: "proof",
      type: "card-grid",
      title: "The Numbers Behind the Product",
      body: "Playson builds quality products that produce real, measurable results.",
      cards: [
        { metric: "−20%", title: "Free Spins abandonment", tag: "Flexible Free Spins" },
        { metric: "+200%", title: "Users on participating slots", tag: "Grand Race" },
        { metric: "+85%", title: "Total bets on participating slots", tag: "Turbo Races" },
        { metric: "+13.5%", title: "Total bets", tag: "Power Blasts" },
        { metric: "+66%", title: "Average bet", tag: "Power Chance" },
      ],
    },
    {
      id: "contact",
      type: "contact",
      title: "What Could Your Next Promotion Do?",
      body: "Tell us your goals and priorities, we’ll do the rest.",
      contact: "LET’S HAVE A CHAT",
      contactHref: "https://playson.com/contacts",
    },
  ],
};

export const promoToolsDeckData = assertValidDeck(promoToolsDeck);
