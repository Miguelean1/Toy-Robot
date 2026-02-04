/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {textShadow: {
      neon: `
          0 0 5px #fb923c,
          0 0 10px #fb923c,
          0 0 20px #f97316,
          0 0 40px #ea580c
          `
    },},
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}