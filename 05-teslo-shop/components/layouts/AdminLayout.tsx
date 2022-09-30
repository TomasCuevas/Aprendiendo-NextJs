import Head from "next/head";
import { Box, Typography } from "@mui/material";

//* components *//
import { AdminNavbar } from "../admin/AdminNavbar";
import { SideMenu } from "../ui/SideMenu";

//* interfaces *//
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export const AdminLayout = ({
  children,
  title,
  subtitle,
  icon,
}: AdminLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0 30px" }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
          <Box className="fadeIn">{children}</Box>
        </Box>
      </main>

      <footer></footer>
    </>
  );
};
