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
        primary: '#030919',
        nav: '#02092A',
        alt: {
          1: '#F4F4F6',
          2: '#3094CC',
          3: '#E5E5E5',
        },
      },
    },
  },
  plugins: [],
};
