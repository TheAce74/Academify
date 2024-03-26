/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
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
