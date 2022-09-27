import { Grid } from "@mui/material";

//* components *//
import { ProductCard } from "./ProductCard";

//* interfaces *//
import { IProduct } from "../../interfaces/products";

interface ProductListProps {
  products: IProduct[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
