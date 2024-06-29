/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["coffee"],
  },
  content: ["./src/**/*.{html,ts, js}",],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
}

