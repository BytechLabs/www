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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.off-white'),
            opacity: 0.8,
            maxWidth: '65ch',
            '[class~="lead"]': {
              color: theme('colors.parchment'),
            },
            h1: {
              color: theme('colors.off-white'),
              fontFamily: theme('fontFamily.serif').join(','),
              opacity: 1,
            },
            h2: {
              color: theme('colors.off-white'),
              fontFamily: theme('fontFamily.serif').join(','),
              opacity: 1,
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: theme('colors.off-white'),
              fontFamily: theme('fontFamily.serif').join(','),
              opacity: 0.9,
            },
            strong: {
              color: theme('colors.parchment'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.parchment'),
              fontFamily: theme('fontFamily.mono').join(','),
            },
            blockquote: {
              borderLeftColor: theme('colors.parchment'),
              color: theme('colors.off-white'),
              fontStyle: 'italic',
              opacity: 0.7,
            },
            'ul > li::marker': {
              color: theme('colors.off-white'),
              opacity: 0.5,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
