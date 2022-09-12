import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

//* contexts *//
import { UIProvider } from "../context/ui";

//* styles and themes *//
import { lightTheme, darkTheme } from "../themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
