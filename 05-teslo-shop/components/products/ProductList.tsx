import { Grid } from "@mui/material";

//* components *//
import { ProductCard } from "./";

//* interfaces *//
import { IProduct } from "../../interfaces";

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
