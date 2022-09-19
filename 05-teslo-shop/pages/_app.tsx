import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

//* theme and styles *//
import { lightTheme } from "../themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
