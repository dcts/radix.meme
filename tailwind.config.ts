import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dexter-green": "#A7D22D",
        "dexter-green-OG": "#CAFC40",
        "dexter-gradient-green": "#ACF840",
        "dexter-gradient-blue": "#05CBE6",
        "dexter-red": "#D22D2D",
        "dexter-grey-dark": "#141414",
        "dexter-grey-light": "#191B1D",
        "content-dark": "#212A09",
        "dexter-gray": "#474C52",
        "dexter-gray-b": "#212426",
        white: "#fff",
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#A7D22D", // dexter-green
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
