/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        navBorder: 'rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
