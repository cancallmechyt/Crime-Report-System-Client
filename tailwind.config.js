/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#333A73',
        customYellow:'#FBA834',
        customGray: '#F0F0F0',
        customRed: '#A0153E',
        customSilver: '#EEEEEE',
        customGrays: '#7D7C7C',
        customSky: "#387ADF",
        customGreen: "#2C7865",
        customReds: "#A34343",
        customOrange: "#FB6D48",
      },
      fontFamily: {
        taviraj: ['Taviraj', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbitePlugin
  ],
}

