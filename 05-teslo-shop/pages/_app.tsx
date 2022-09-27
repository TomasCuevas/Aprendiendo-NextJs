import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";

//* providers *//
import { AuthProvider } from "../context/auth/AuthContext";
import { CartProvider } from "../context/cart/CartContext";
import { UiProvider } from "../context/ui/UiContext";

//* theme and styles *//
import { lightTheme } from "../themes/light-theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
