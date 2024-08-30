/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#000000',
        primaryPeach: '#FF5364',
        darkGray: '#5A5A5A',
        mediumGray: '#B3B3B3',
        lightGray: '#F2F2F2',
      },
  
    },
  },
  plugins: [],
}