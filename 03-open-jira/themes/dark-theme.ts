import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#b00",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4a148c",
        },
      },
    },
  },
});
