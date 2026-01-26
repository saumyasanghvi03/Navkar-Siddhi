export const MANTRA_WORDS = [
  "Namo", "Arihantanam",
  "Namo", "Siddhanam",
  "Namo", "Ayariyanam",
  "Namo", "Uvajjhayanam",
  "Namo", "Loye", "Savva", "Sahunam",
  "Eso", "Pancha", "Namukkaro",
  "Savva", "Pavappanasano",
  "Mangalanam", "Cha", "Savvesim",
  "Padhamam", "Havai", "Mangalam"
];

// 9 Lines colors
export const LINE_COLORS = [
  "#b91c1c",  // Line 1: Deep Red
  "#1e3a8a",  // Line 2: Royal Blue
  "#065f46",  // Line 3: Deep Green
  "#78350f",  // Line 4: Bronze
  "#7e22ce",  // Line 5: Purple
  "#b45309",  // Line 6: Saffron Gold
  "#0f766e",  // Line 7: Teal
  "#9d174d",  // Line 8: Maroon Rose
  "#1e40af"   // Line 9: Deep Blue
];

// Background colors for the 9 lines (Default Mode)
export const LINE_BG_COLORS = [
  "#fff7e6", // Line 1: Soft warm cream
  "#eef2ff", // Line 2: Soft indigo mist
  "#e6fffa", // Line 3: Mint-teal wash
  "#fef3c7", // Line 4: Light saffron
  "#faf5ff", // Line 5: Lavender haze
  "#fff4e5", // Line 6: Golden parchment
  "#e0f2fe", // Line 7: Calm sky blue
  "#ffe4ec", // Line 8: Rose quartz
  "#e8edff"  // Line 9: Pure serenity blue
];

// Number of words in each of the 9 lines
export const LINE_BREAKS = [
  2, // Namo Arihantanam
  2, // Namo Siddhanam
  2, // Namo Ayariyanam
  2, // Namo Uvajjhayanam
  4, // Namo Loye Savva Sahunam
  3, // Eso Pancha Namukkaro
  2, // Savva Pavappanasano
  3, // Mangalanam Cha Savvesim
  3  // Padhamam Havai Mangalam
];

export const THEMES = [
  {
    name: "Arihant Theme",
    // textColor is unused for words (we use LINE_COLORS), but stored for reference/UI accents
    textColor: "#b91c1c",
    bgGradient: "linear-gradient(180deg, #fff7e6, #fde7c3)",
    gridFill: "#b91c1c",
  },
  {
    name: "Siddha Theme",
    textColor: "#1e3a8a",
    bgGradient: "linear-gradient(180deg, #eef2ff, #dbe4ff)",
    gridFill: "#1e3a8a",
  },
  {
    name: "Acharya Theme",
    textColor: "#065f46",
    bgGradient: "linear-gradient(180deg, #e6fffa, #bbf7d0)",
    gridFill: "#065f46",
  },
  {
    name: "Upadhyay Theme",
    textColor: "#7e22ce",
    bgGradient: "linear-gradient(180deg, #faf5ff, #e9d5ff)",
    gridFill: "#7e22ce",
  },
  {
    name: "Sadhu Theme",
    textColor: "#b45309",
    bgGradient: "linear-gradient(180deg, #fff4e5, #ffe8cc)",
    gridFill: "#b45309",
  }
];

export const AUTO_SCROLL_SPEEDS = {
  SLOW: 2000,
  MEDIUM: 1200,
  FAST: 800
};
