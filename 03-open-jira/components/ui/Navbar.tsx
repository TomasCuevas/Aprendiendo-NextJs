import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

//* context *//
import { UIContext } from "../../context/ui";

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
        <Typography variant="h5">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
