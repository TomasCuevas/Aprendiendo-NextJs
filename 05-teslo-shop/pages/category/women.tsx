import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* components *//
import { ProductList } from "../../components/products/ProductList";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* hooks
import { useProducts } from "../../hooks/useProducts";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title="Productos de mujeres | Teslo-Shop"
      pageDescription="Encuentra los mejores productos para mujeres en Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos de mujeres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
