import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

//* contexts *//
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

//* styles and themes *//
import { lightTheme, darkTheme } from "../themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp;
