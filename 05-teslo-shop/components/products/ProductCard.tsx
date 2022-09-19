import { useState, useMemo } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";

//* interfaces *//
import { IProduct } from "../../interfaces";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={6} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={
              isHovered
                ? `products/${product.images[1]}`
                : `products/${product.images[0]}`
            }
            alt={product.title}
            className="fadeIn"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={300}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
