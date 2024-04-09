/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      screens: {
        "3xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
        "2xl": { max: "1430px" },
        // => @media (max-width: 1430px) { ... }
        xl: { max: "1290px" },
        // => @media (max-width: 1290px) { ... }
        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }
        sm: { max: "539px" },
        // => @media (max-width: 539px) { ... }
      },
      colors: {
        neutral: {
          100: "#ffffff",
          200: "#ececec",
          300: "#afafaf",
          400: "#686868",
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
