import { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

//* icons *//
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

//* context *//
import { UiContext } from "../../context";

export const Navbar = () => {
  const { onToggleMenu } = useContext(UiContext);
  const { pathname } = useRouter();

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
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={pathname === "/category/men" ? "info" : "primary"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                color={pathname === "/category/women" ? "info" : "primary"}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button
                color={pathname === "/category/kids" ? "info" : "primary"}
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={() => onToggleMenu(true)}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
