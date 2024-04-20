import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ['"Plus Jakarta Sans"', "sans-serif"].join(","),
    button: {
      textTransform: "none",
      borderRadius: "10px",
    },
  },
  palette: {
    neutral: {
      light: "#ffffff",
      main: "#686868",
      dark: "#2f2f2f",
    },
    primary: {
      light: "#e8ecfe",
      main: "#1b3df1",
      dark: "#132bab",
    },
    accent: {
      main: "#6036d6",
    },
    dark: {
      main: "#1C1C1C",
    },
  },
});

export { theme };
