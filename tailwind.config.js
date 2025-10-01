// tailwind.config.js - OPTIMIZED FOR YOUR THEME
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}" 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors - Clean & Consistent
        background: "#FFFFFF",
        foreground: "#111827", // Dark gray for better readability
        card: "#FFFFFF", 
        "card-foreground": "#111827",
        primary: "#7bf163", // Your brand green
        "primary-foreground": "#FFFFFF",
        secondary: "#F8FAFC", // Light gray
        "secondary-foreground": "#1E293B", 
        muted: "#F1F5F9",
        "muted-foreground": "#64748B", // Medium gray
        accent: "#10B981", // Emerald accent
        "accent-foreground": "#FFFFFF",
        destructive: "#EF4444", // Red for errors
        border: "#E2E8F0", // Light border
        input: "#FFFFFF",
        ring: "#7bf163", // Focus ring color
        
        // Additional Brand Colors
        "brand-green": "#7bf163",
        "brand-green-light": "#9EF486",
        "brand-green-dark": "#5ECD4A",
        
        // Semantic Colors for Components
        "success": "#10B981",
        "warning": "#F59E0B", 
        "error": "#EF4444",
        "info": "#3B82F6"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
        accent: ["Geist", "system-ui", "sans-serif"],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
        '128': '512px',
      }
    },
  },
  plugins: [],
}