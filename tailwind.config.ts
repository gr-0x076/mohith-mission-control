import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#111827",
        purple: "#7C3AED",
        blue: "#3B82F6",
        green: "#22C55E",
        orange: "#F97316",
        red: "#EF4444",
        foreground: "#F8FAFC",
        muted: "#94A3B8",
      },
      boxShadow: {
        glow: "0 0 32px rgba(124, 58, 237, 0.28)",
        blueglow: "0 0 28px rgba(59, 130, 246, 0.24)",
      },
      backgroundImage: {
        "mission-grid":
          "linear-gradient(rgba(148,163,184,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.07) 1px, transparent 1px)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
