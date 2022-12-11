/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00A783',
        primaryMedium: '#d9fdd3',
        primaryDark: '#111A20',
        primaryLight: '#00D1B2',
        primaryLightest: '#F0F2F5',
        primaryHard: '#25D366',
        secondary: '#eae6df',
        secondaryDark: '#EFEAE2',
        textGray: '#41525D',
        // accent: '#ed8936',
        // 'accent-light': '#fed7aa',
        // 'accent-dark': '#dd6b20',
        // 'accent-darker': '#c05621',
        // 'accent-darkest': '#9c4221',
        // 'accent-lighter': '#fdebcf',
        // 'accent-lightest': '#fff5eb',
        // 'accent-transparent': 'rgba(237,137,54,0.5)',
        // 'accent-transparent-darker': 'rgba(237,137,54,0.25)',
        // 'accent-transparent-darkest': 'rgba(237,137,54,0.1)',
        // 'accent-transparent-lighter': 'rgba(237,137,54,0.75)',
        // 'accent-transparent-lightest': 'rgba(237,137,54,0.9)',
      },
      width: {
        'calc-38': 'calc(100% - 38px)',
      },
      height: {
        'calc-38': 'calc(100% - 38px)',
      },
      fontFamily: {
        sans: ['Segoe UI', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        ninety: {
          '0%': { transform: 'rotate(-90deg)', opacity: 0 },
          '100%': { transform: 'rotate(0deg)', opacity: 1 },
        },
        ninetyBack: {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          '100%': { transform: 'rotate(-90deg) scale(0.5)', opacity: 0.1 },
        },
      },
      animation: {
        ninety: 'ninety 200ms ease-in-out',
        ninetyBack: 'ninetyBack 200ms ease-in-out',
      },
      backgroundImage: {
        chat: "url('./src/assets/img/bg-chat.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
