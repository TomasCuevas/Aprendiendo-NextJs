import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, Toolbar, Link, Typography, Box, Button } from "@mui/material";

//* contexts *//
import { UiContext } from "../../context/ui/UiContext";

export const AdminNavbar = () => {
  const { onToggleMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6" color="black">
              Teslo |
            </Typography>
            <Typography sx={{ ml: 0.5 }} color="black">
              Shop
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button color="info" onClick={() => onToggleMenu(true)}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};
