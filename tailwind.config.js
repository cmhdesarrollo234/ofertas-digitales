/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:   '#1A3365',
        'navy-dark': '#0F2040',
        azul:   '#1A3365',
        'azul-light': '#D0D8EA',
        naranja: '#E85A1F',
        'naranja-dark': '#B83F0E',
        'naranja-light': '#FFE4D2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
