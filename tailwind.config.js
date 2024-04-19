/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      screens: {
        "3xl": { min: "1535px" },
        // => @media (min-width: 1535px) { ... }
        "2xl": { min: "1430px" },
        // => @media (min-width: 1430px) { ... }
        xl: { min: "1290px" },
        // => @media (min-width: 1290px) { ... }
        lg: { min: "1023px" },
        // => @media (min-width: 1023px) { ... }
        md: { min: "767px" },
        // => @media (min-width: 767px) { ... }
        sm: { min: "539px" },
        // => @media (min-width: 539px) { ... }
      },
      colors: {
        neutral: {
          100: "#ffffff",
          200: "#ececec",
          300: "#afafaf",
          400: "#686868",
          500: "#808080",
          600: "#424242",
          700: "#f4f4f4",
          900: "#2f2f2f",
        },
        primary: {
          100: "#e8ecfe",
          300: "#667df6",
          400: "#1b3df1",
          500: "#132bab",
        },
        accent: {
          400: "#6036d6",
        },
      },
    },
  },
  plugins: [],
};
