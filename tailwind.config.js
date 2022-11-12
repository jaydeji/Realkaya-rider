/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE7A22',
        nav: '#02092A',
        alt: {
          1: '#F4F4F6',
        },
      },
    },
  },
  plugins: [],
};
