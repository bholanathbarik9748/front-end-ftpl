import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_light: "#bbdefb",
        primary_mid: "#90caf9",
        primary_dark: "#2196f3",
        secondary_light: "#ffccbc",
        secondary_mid: "#ff5722",
        secondary_dark: "#f4511e",
      },
    },
  },
  plugins: [],
} satisfies Config;
