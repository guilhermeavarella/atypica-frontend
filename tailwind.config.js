/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          "primary-light": "var(--brand-primary-light)",
          secondary: "var(--brand-secondary)",
        },
        content: {
          primary: "var(--content-primary)",
          secondary: "var(--content-secondary)",
          tertiary: "var(--content-tertiary)",
          light: "var(--content-light)",
          inverse: "var(--content-inverse)",
        },
        background: {
          "fixed-white": "var(--background-fixed-white)",
          yellow: "var(--background-yellow)",
          purple: "var(--background-purple)",
          "purple-light": "var(--background-purple-light)",
        },
      },
      fontFamily: {
        general: ["General Sans", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    }
  },
  plugins: []
}
