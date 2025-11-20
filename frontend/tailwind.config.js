/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-50": "#ffffff",
        "base-900": "#0f172a",
        "surface": "#f8fafc",
        "surface-dark": "#0b1220",
        "primary": "#1e3a8a",
        "primary-dark": "#111827",
        "accent": "#2563eb",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      transitionDuration: {
        350: "350ms",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
