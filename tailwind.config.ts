/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        primary: "var(--color-primary)",
      },
      textColor: {
        primary: "var(--color-primary)",
      },
      backgroundColor: {
        primary: "var(--color-primary)",
      },
      borderColor: {
        primary: "var(--color-primary)",
      },
      ringColor: {
        primary: "var(--color-primary)",
      },
      outlineColor: {
        primary: "var(--color-primary)",
      },
      font: {
        family: {
          sans: "Inter"
        }
      }
    },
  },
  plugins: [],
};
