/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#294cfe',
        // primary: '#01d679',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
