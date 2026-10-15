/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm stone-inspired palette
        stone: {
          50: "#faf9f7",
          100: "#f5f2ec",
          200: "#eae4d9",
          300: "#ddd2bf",
          400: "#c9b99a",
          500: "#b09c77",
          600: "#967f57",
          700: "#7a6444",
          800: "#5f4e35",
          900: "#41351f",
          950: "#2a2214",
        },
        // Deep charcoal
        charcoal: {
          50: "#f7f6f4",
          100: "#eae7e2",
          200: "#d5cfc7",
          300: "#b0a79b",
          400: "#857a6e",
          500: "#666058",
          600: "#504a44",
          700: "#423c36",
          800: "#322e2a",
          900: "#24211e",
          950: "#171512",
        },
        // Muted gold
        gold: {
          300: "#d9b26a",
          400: "#c79a45",
          500: "#b58938",
          600: "#9a7130",
          700: "#7d5a27",
        },
        ivory: "#f8f5ee",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "stone-texture":
          "radial-gradient(circle at 20% 20%, rgba(181,137,56,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(66,53,31,0.08) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "scan-line": "scanLine 2.4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%, 100%": { top: "6%", opacity: "0.4" },
          "50%": { top: "94%", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
