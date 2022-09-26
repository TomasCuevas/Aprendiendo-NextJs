import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* components *//
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";

//* layout *//
import { ShopLayout } from "../components/layouts";

//* hooks
import { useProducts } from "../hooks";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

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

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
