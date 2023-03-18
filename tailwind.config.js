/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      lineClamp: {
        10: '10',
        12: '12',
      },
      colors: {
        dark: '#141414',
        light: '#d1d5db',
        portakal: '#ffac08',
        mandalina: '#fce8cd',
      },
      maxWidth: {
        14: '14rem',
      },
    },
    container: {
      screens: {
        sm: '400px',
        md: '540px',
        lg: '728px',
        xl: '920px',
        '2xl': '920px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
  darkMode: 'class',
  variants: {
    extend: {
      lineClamp: ['hover'],
    },
  },
};
