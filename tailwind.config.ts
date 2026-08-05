import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0E14",
          soft: "#0F131C",
        },
        surface: {
          DEFAULT: "#131722",
          hover: "#1A2030",
          raised: "#1C2230",
        },
        border: {
          DEFAULT: "#232939",
          soft: "#1B2130",
        },
        ink: {
          DEFAULT: "#E7E9EE",
          muted: "#8B93A7",
          faint: "#5B6478",
        },
        accent: {
          DEFAULT: "#6C8CFF",
          hover: "#85A0FF",
          soft: "#212A47",
        },
        success: {
          DEFAULT: "#4ADE80",
          soft: "#173322",
        },
        danger: {
          DEFAULT: "#F87171",
          soft: "#3A1C1F",
        },
        amber: {
          DEFAULT: "#F5B942",
          soft: "#332711",
        },
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Inter\"", "sans-serif"],
        mono: ["\"JetBrains Mono\"", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 24px -12px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(108,140,255,0.4), 0 0 24px -4px rgba(108,140,255,0.5)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
