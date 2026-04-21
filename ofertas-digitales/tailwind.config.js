/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:   '#1F3A6E',
        'navy-dark': '#152B55',
        azul:   '#2E75B6',
        'azul-light': '#D5E8F0',
        naranja: '#C45911',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
