export const colors = {
  core: {
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF002A",
    gold: "#FFA100",
    purple: "#8128FF",
    green: "#62AA2D",
    wine: "#63033E",
  },
  semantic: {
    backgroundCanvas: "#000000",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.70)",
    surfaceCard: "rgba(255, 255, 255, 0.12)",
    borderSubtle: "rgba(255, 255, 255, 0.30)",
    actionPrimary: "#FF002A",
    contentHighlight: "#FFA100",
    statusSuccess: "#62AA2D",
  },
  brand: {
    core: {
      black: "#000000",
      red: "#FF002A",
      white: "#FFFFFF",
    },
    red: {
      50: "#FFDFE4",
      100: "#FFC3CD",
      200: "#FFA7B6",
      300: "#FF8B9E",
      400: "#FF7087",
      500: "#FF002A",
      600: "#FF1C41",
      700: "#FF3859",
      800: "#FF5470",
    },
    darkRed: {
      300: "#DF0025",
      400: "#BF0020",
      500: "#9F001A",
      600: "#800015",
      700: "#600010",
      800: "#40000B",
      900: "#200005",
    },
    neutral: {
      900: "#131313",
      850: "#1C1C1C",
      800: "#383838",
      700: "#545454",
      600: "#707070",
      500: "#8B8B8B",
      400: "#A7A7A7",
      200: "#C3C3C3",
      100: "#DFDFDF",
    },
    extended: {
      orange: "#FB4F05",
      amber: "#FF9700",
      gold: "#FFBD00",
      yellow: "#FFEA01",
      lime: "#CBE426",
      green: "#62AA2D",
      lightBlue: "#019DE3",
      blue: "#0244FC",
      purple: "#6A00FF",
      magenta: "#A400D4",
    },
  },
} as const;

export const gradients = {
  redToBlack: "linear-gradient(90deg, #FF002A 0%, #000000 100%)",
  orangeToBlack: "linear-gradient(90deg, #FB4F05 0%, #000000 100%)",
  goldToBlack: "linear-gradient(90deg, #FFBD00 0%, #000000 100%)",
  limeToBlack: "linear-gradient(90deg, #CBE426 0%, #000000 100%)",
  blueToBlack: "linear-gradient(90deg, #0244FC 0%, #000000 100%)",
  purpleToBlack: "linear-gradient(90deg, #6A00FF 0%, #000000 100%)",
  magentaToBlack: "linear-gradient(90deg, #A400D4 0%, #000000 100%)",
  redToPurple: "linear-gradient(90deg, #FF002A 0%, #6A00FF 100%)",
  multicolor:
    "linear-gradient(90deg, #FFFFFF 0%, #FF002A 33%, #6A00FF 66%, #000000 100%)",
} as const;

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  64: 64,
  80: 80,
  96: 96,
} as const;

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 32,
  pill: 100,
} as const;

export const typography = {
  displayHero: { size: 100, lineHeight: 1, weight: 800 },
  displayLarge: { size: 56, lineHeight: 1, weight: 800 },
  headingH1: { size: 48, lineHeight: 1, weight: 800 },
  headingH2: { size: 38, lineHeight: 1, weight: 700 },
  headingH3: { size: 30, lineHeight: 1, weight: 700 },
  bodyLarge: { size: 26, lineHeight: 1.35, weight: 600 },
  bodyMedium: { size: 24, lineHeight: 1.4, weight: 600 },
  bodySmall: { size: 18, lineHeight: 1.45, weight: 600 },
  labelSmall: { size: 16, lineHeight: 1, weight: 700 },
} as const;

export const effects = {
  purpleGlow: "0 12px 32px rgba(129, 40, 255, 0.38)",
  hoverGlow:
    "0 0 22px rgba(255, 161, 0, 0.34), 0 10px 36px rgba(129, 40, 255, 0.28)",
  goldGradient: "linear-gradient(90deg, #FFA600, #F4E29B)",
  particleCardBlur: 12,
} as const;

export const backgrounds = {
  salesDeckSrc: "/background/Background.png",
} as const;

export const brandAssets = {
  playsonLogoSrc: "/brand-assets/playson-logo.svg",
  getMoreSrc: "/brand-assets/get-more.svg",
  coins: Array.from({ length: 24 }, (_, index) => `/brand-assets/coins/Coin${index + 1}.png`),
} as const;

export const slide = {
  width: 1440,
  height: 810,
  gutter: 80,
} as const;
