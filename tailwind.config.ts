import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B2D5C",
          600: "#0B2D5C",
          500: "#11406f",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 12, 27, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;

