import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";

//* provider *//
import { UiProvider } from "../context";

//* theme and styles *//
import { lightTheme } from "../themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  );
}

export default MyApp;
