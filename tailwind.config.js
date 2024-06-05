/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["coffee"],
  },
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
}

