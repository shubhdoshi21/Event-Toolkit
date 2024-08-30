/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgrey: "#F2F2F2",
        lightgreyplus: "#B3B3B3",
        lightgreyplusplus: "#5A5A5A",
        red: "#FF5364",
        reddark: "#FF5320",
        black: "#000000",
        white: "#FFFFFF"
        offwhite: "#f2f2f2",
        darkgrey: "#5a5a5a",
        grey: "#b3b3b3",
        mauve: "#ff5364",
      }
    },
    extend: {},
  },
  plugins: [],
};


