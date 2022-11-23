/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030919',
        nav: '#02092A',
        'light-text': '#555B6A',
        'main-blue': '#3094CC',
        alt: {
          1: '#F4F4F6',
          3: '#E5E5E5',
          4: '#F7F7F7',
          6: '#2FA94E',
          7: '#DADADA',
          8: '#C9CCD3',
        },
      },
      boxShadow: {
        1: '0px 4px 40px rgba(85, 91, 106, 0.24)',
      },
      fontFamily: {
        Mulish: 'Mulish',
        'Mulish-Medium': 'Mulish-Medium',
        'Mulish-SemiBold': 'Mulish-SemiBold',
        'Mulish-Bold': 'Mulish-Bold',
        'Mulish-ExtraBold': 'Mulish-ExtraBold',
      },
    },
  },
  plugins: [],
};
