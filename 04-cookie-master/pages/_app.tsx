import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme, lightTheme } from "../theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "dark";
    const selectedTheme = cookieTheme === "dark" ? darkTheme : lightTheme;

    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "dark" };

//   const validThemes = ["light", "dark"];

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

export default MyApp;
