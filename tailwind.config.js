/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Principal: gris grafito (variables conservan nombre "navy"/"azul" por compatibilidad)
        navy:         '#1F2937',
        'navy-dark':  '#111827',
        azul:         '#1F2937',
        'azul-light': '#F3F4F6',
        // Secundario: rojo EMG (variables conservan nombre "naranja" por compatibilidad)
        naranja:        '#C8202C',
        'naranja-dark': '#9B1923',
        'naranja-light':'#FCE4E6',
        // Acento plateado/metálico
        plata:        '#9CA3AF',
        'plata-light':'#D1D5DB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
