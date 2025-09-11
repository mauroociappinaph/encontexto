/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B2EBF9',   // Custom primary color
        secondary: '#AEA1EA', // Custom secondary color
        black: '#000000',     // Explicitly define black
        white: '#FFFFFF',     // Explicitly define white
      },
    },
  },
  plugins: [],
}