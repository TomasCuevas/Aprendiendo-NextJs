import NextLink from "next/link";
import type { NextPage } from "next";
import { Box, Link, Typography } from "@mui/material";

//* icons *//
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title="Carrito vacio"
      pageDescription="No hay articulos en el carrito de compras"
    >
      <Box
        className="fadeIn"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography marginLeft={2}>Su carrito esta vacio</Typography>
          <NextLink href="/" passHref>
            <Link typography="h4" color="secondary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
