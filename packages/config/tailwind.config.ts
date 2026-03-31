import type { Config } from "tailwindcss";

const thulungaConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Thulunga brand palette — earthy, warm, rooted
        thulunga: {
          50: "#FDF8F0",
          100: "#FAF0DE",
          200: "#F5DFBA",
          300: "#EDCA8E",
          400: "#E3B060",
          500: "#D4943A", // Primary brand — warm amber-gold
          600: "#B87A2E",
          700: "#956026",
          800: "#704824",
          900: "#4A3018",
          950: "#2D1C0E",
        },
        forest: {
          50: "#F0F7F2",
          100: "#DCEEE1",
          200: "#BBDDC6",
          300: "#8EC5A0",
          400: "#5EA877",
          500: "#3D8B5A", // Secondary — deep green from Bodoland forests
          600: "#2D7047",
          700: "#255A3A",
          800: "#1F4830",
          900: "#1A3B28",
          950: "#0D2116",
        },
        earth: {
          50: "#F5F3F0",
          100: "#E8E4DD",
          200: "#D3CCBF",
          300: "#B8AD9C",
          400: "#9E8E7A",
          500: "#8A7965",
          600: "#756556",
          700: "#5F5147",
          800: "#50443D",
          900: "#453B35",
          950: "#261F1B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
};

export default thulungaConfig;
