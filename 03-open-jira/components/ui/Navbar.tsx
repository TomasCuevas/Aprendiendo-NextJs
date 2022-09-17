import { useContext } from "react";
import { default as NextLink } from "next/link";
import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

//* context *//
import { UIContext } from "../../context";

export const Navbar = () => {
  const { onToggleSidebar } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={() => onToggleSidebar(true)}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h5">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
