import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#16a34a", dark: "#15803d", light: "#dcfce7" },
        accent: { DEFAULT: "#facc15", dark: "#eab308" },
        surface: "#f8fafc",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
