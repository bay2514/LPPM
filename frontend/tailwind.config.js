/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EAF0F6",
          100: "#CEDCE9",
          200: "#A3BED5",
          300: "#78A0C1",
          400: "#4D82AD",
          500: "#2B6699",
          600: "#1B4A78",
          700: "#103A63",
          800: "#0B2C4D",
          900: "#081F38",
          950: "#020B14",
        },
        orange: {
          50: "#FDEBDD",
          100: "#FAD3BA",
          200: "#F5AB82",
          300: "#F28A4A",
          400: "#F06C2B",
          500: "#F58220",
          600: "#DD6E12",
          700: "#D97706",
          800: "#8C4511",
          900: "#5C2D0B",
        },
        teal: {
          400: "#4AA6B7",
          500: "#2B7C8C",
          600: "#20616E",
          700: "#164F5C",
        },
        gold: {
          400: "#F2B01E",
        },
        ink: {
          200: "#E5E7EB",
          400: "#9CA3AF",
          500: "#6B7280",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        canvas: "#F5F6F8",
        surface: "#FFFFFF",
        line: "#E5E7EB",
        success: "#16A34A",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.10)",
        lift: "0 8px 24px rgba(16,24,40,.10)",
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
