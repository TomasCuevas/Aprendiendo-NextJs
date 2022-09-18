import type { AppContext, AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme, lightTheme } from "../theme";
import "../styles/globals.css";

interface MyAppProps extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme }: MyAppProps) {
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req
    ? (appContext.ctx.req as any).cookies
    : { theme: "dark" };

  const validThemes = ["light", "dark"];

  return {
    theme: validThemes.includes(theme) ? theme : "dark",
  };
};

export default MyApp;
