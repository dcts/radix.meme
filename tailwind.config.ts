const {
  default: flattenColorPalette,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
} = require("tailwindcss/lib/util/flattenColorPalette");
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        title: ["var(--font-title)", ...fontFamily.sans], // Title font
        josefin: ["var(--font-body)", ...fontFamily.sans], // Body font
      },
      screens: {
        xl: "1500px", // >= 1500px for the largest container/cards
        lg: "1280px", // >= 1280px for full-width gallery
        md: "990px", // >= 990px for two cards split
      },
      maxWidth: {
        "1440": "1440px", // max-width for the container at larger screen sizes
      },
      colors: {
        "dexter-green": "#A7D22D",
        "dexter-green-OG": "#CAFC40",
        "dexter-gradient-green": "#ACF840",
        "dexter-gradient-blue": "#05CBE6",
        "dexter-red": "#D22D2D",
        "dexter-red-b": "#D80B0B",
        "dexter-red-c": "#FD2F2F",
        "dexter-red-darker": "#7A1D1D",
        "dexter-grey-dark": "#141414",
        "dexter-grey-light": "#191B1D",
        "content-dark": "#212A09",
        "dexter-gray": "#474C52",
        "dexter-gray-b": "#212426",
        "dexter-gray-c": "#181818",
        "dexter-green-faded": "#637E17",
        "almost-white": "#D9D9D9",
        "radix-meme-grey-100": "#202020",
        "radix-meme-grey-200": "#404040",
        "radix-meme-grey-300": "#292828",
        "radix-meme-grey-400": "#A2A2A2",

        // aceternity
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatRocket: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 2.5s ease-in-out infinite",
        floatRocket: "float 3.5s ease-in-out infinite",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        "blur-dexter-green-OG": "0 4px 15px rgba(202, 252, 64, 0.75)", // Custom shadow with dexter-green-OG #CAFC40
        "blur-dexter-gradient-green": "0 4px 15px rgba(172, 248, 64, 0.75)", // Custom shadow with dexter-gradient-green #ACF840
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [addVariablesForColors, require("tailwindcss-animate")],
} satisfies Config;

export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
