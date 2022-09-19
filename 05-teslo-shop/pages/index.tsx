import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* layout *//
import { ShopLayout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title="Teslo-Shop"
      pageDescription="Encuentra los mejores productos en Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
};

export default HomePage;
