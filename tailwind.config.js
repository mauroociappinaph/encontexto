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
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Nueva fuente sans-serif
        handwriting: ['Dancing Script', 'cursive'],
        serif: ['Georgia', 'serif'], // Definir una fuente serif explícita si se usa font-serif
      },
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