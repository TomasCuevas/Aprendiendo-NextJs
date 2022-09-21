import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* components *//
import { ProductList } from "../components/products";

//* layout *//
import { ShopLayout } from "../components/layouts";

//* hooks
import { useProducts } from "../hooks";

const HomePage: NextPage = () => {
  const { products, isError, isLoading } = useProducts("/products");

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

      {isLoading ? <h1>Cargando...</h1> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
