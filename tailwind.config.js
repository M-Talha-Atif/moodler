// tailwind.config.js - OPTIMIZED FOR YOUR THEME
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0F172A", // Deep slate for better contrast
        card: "#FFFFFF",
        "card-foreground": "#111827",

        // 🟢 Primary Gradient Family
        primary: "#4ADE80", // Fresh green base (like Tailwind’s emerald-400)
        "primary-foreground": "#FFFFFF",

        // 💫 Complementary Emerald Accent
        accent: "#16A34A", // Deep emerald for gradient pairing
        "accent-foreground": "#FFFFFF",

        // 🩶 Secondary Neutrals
        secondary: "#F3F4F6", // Slightly softer neutral
        "secondary-foreground": "#1E293B",
        muted: "#F8FAFC",
        "muted-foreground": "#64748B",

        // ❤️ Feedback Colors
        destructive: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        // ✨ UI Details
        border: "#E2E8F0",
        input: "#FFFFFF",
        ring: "#34D399", // Softer ring glow

        // 🌿 Brand Gradient Family (for buttons, highlights, progress)
        "brand-green-light": "#A3E635", // light lime
        "brand-green": "#4ADE80",       // mid green (vibrant)
        "brand-green-dark": "#059669",  // dark emerald (depth)
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
        playfair: ["PlayfairDisplay", "serif"],
      },

      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "40px"],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        full: "9999px",
      },
      spacing: {
        18: "72px",
        88: "352px",
        128: "512px",
      },
    },
  },
  plugins: [],
};
