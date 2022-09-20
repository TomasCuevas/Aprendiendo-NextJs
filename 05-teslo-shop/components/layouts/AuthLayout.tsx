import Head from "next/head";
import { Box } from "@mui/material";

//* interface *//
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="cawlc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
