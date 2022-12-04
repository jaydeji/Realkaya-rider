const { colors, fontFamily } = require('./src/lib/theme.ts');
// import {} from 'lib/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        1: '0px 4px 40px rgba(85, 91, 106, 0.24)',
      },
      fontFamily,
    },
  },
  plugins: [],
};
