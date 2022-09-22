import { useContext, useState } from "react";
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
  Input,
  InputAdornment,
} from "@mui/material";

//* icons *//
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

//* context *//
import { UiContext } from "../../context";

export const Navbar = () => {
  const { onToggleMenu } = useContext(UiContext);
  const { pathname, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = async () => {
    if (searchTerm.trim().length < 1) return;

    push(`/search/${searchTerm}`);
  };

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
        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button
                sx={{ mx: "2px" }}
                color={pathname === "/category/men" ? "primary" : "info"}
              >
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                sx={{ mx: "2px" }}
                color={pathname === "/category/women" ? "primary" : "info"}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button
                sx={{ mx: "2px" }}
                color={pathname === "/category/kids" ? "primary" : "info"}
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            onKeyDown={(event) =>
              event.key === "Enter" ? onSearchTerm() : null
            }
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="fadeIn"
                  onClick={() => setIsSearchVisible(false)}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={() => onToggleMenu(true)}
        >
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

        <Button color="info" onClick={() => onToggleMenu(true)}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};
