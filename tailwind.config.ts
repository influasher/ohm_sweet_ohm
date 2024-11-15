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
        "dark-purple": "#65558F",
        "light-purple": "#D0BCFF",
        "selection-purple": "#E8DEF8",
      },
      fontFamily: {
        Montserrat: ["var(--font-montserrat)"],
        Arvo: ["var(--font-arvo)"],
        Karla: ["var(--font-karla)"],
      },
    },
  },
  plugins: [],
};
export default config;
