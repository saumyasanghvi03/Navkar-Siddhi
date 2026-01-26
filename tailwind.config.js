/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mantra-red': '#b91c1c',
        'royal-blue': '#1e40af',
        'parchment': '#fef9c3',
      },
      fontFamily: {
        'serif': ['"Noto Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
