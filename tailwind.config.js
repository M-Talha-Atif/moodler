// tailwind.config.js - OPTIMIZED FOR YOUR THEME
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 🎨 Core Flat Palette (strict 5-color system)
        background: "#FAFAF8", // Off-white
        foreground: "#1C1C1C", // Deep charcoal
        accent: "#0066FF",     // Electric blue (interactive)
        "accent-warm": "#FF6B6B", // Warm coral (mood indicators)
        support: "#E8E8E6",    // Light gray (cards, containers)

        // Feedback (optional but same tone)
        success: "#1C1C1C",
        error: "#FF6B6B",
      },

      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "system-ui", "sans-serif"],
      },


      fontSize: {
        display: ["32px", { lineHeight: "40px", letterSpacing: "-0.03em", fontWeight: "700" }],
        header: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        micro: ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "400" }],
      },

      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
      },

      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        12: "48px",
        15: "120px",
      },

      borderWidth: {
        DEFAULT: "1px",
        focus: "2px",
      },
    },
  },
  plugins: [],
};
