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
        parchment: "#E8DCC4",
        ink: "#0C0C0C",
        charcoal: "#1A1A1A",
        "off-white": "#E5E5E5",
        "red-ink": "#F87171",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
