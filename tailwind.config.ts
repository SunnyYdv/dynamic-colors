/** @type {import('tailwindcss').Config} */

const colorPalette = {
  50: "var(--color-primary-50)",
  100: "var(--color-primary-100)",
  200: "var(--color-primary-200)",
  300: "var(--color-primary-300)",
  400: "var(--color-primary-400)",
  500: "var(--color-primary-500)",
  600: "var(--color-primary-600)",
  700: "var(--color-primary-700)",
  800: "var(--color-primary-800)",
  900: "var(--color-primary-900)",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        primary: {},
      },
      textColor: {
        primary: colorPalette,
      },
      backgroundColor: {
        primary: colorPalette,
      },
      borderColor: {
        primary: colorPalette,
      },
      ringColor: {
        primary: colorPalette,
      },
      outlineColor: {
        primary: colorPalette,
      },
      font: {
        family: {
          sans: "Inter",
        },
      },
    },
  },
  safelist: [
    "bg-primary-50",
    {
      pattern: /bg-primary-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
};
