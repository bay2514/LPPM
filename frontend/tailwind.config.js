/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3466af',
          deep: '#2a548e',
          light: '#f1f4f9',
        },
        navy: {
          50: "#EAF0F6",
          100: "#CEDCE9",
          200: "#A3BED5",
          300: "#78A0C1",
          400: "#4D82AD",
          500: "#3466af",
          600: "#2a548e",
          700: "#1e3a8a",
          800: "#1d4ed8",
          900: "#1e40af",
          950: "#3466af",
        },
        orange: {
          50: "#FDEBDD",
          100: "#FAD3BA",
          200: "#F5AB82",
          300: "#F28A4A",
          400: "#F06C2B",
          500: "#f97216",
          600: "#ea580c",
          700: "#d97706",
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
