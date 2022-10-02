import { useState } from "react";
import NextLink from "next/link";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Chip,
} from "@mui/material";

//* interfaces *//
import { IProduct } from "../../interfaces/products";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid item xs={6} sm={4}>
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color="primary"
                label="No hay disponibles"
                sx={{
                  position: "absolute",
                  zIndex: 9,
                  left: "10px",
                  top: "10px",
                }}
              />
            )}
            <CardMedia
              component="img"
              image={
                isHovered
                  ? product.images[1].includes("https://")
                    ? product.images[1]
                    : `/products/${product.images[1]}`
                  : product.images[0].includes("https://")
                  ? product.images[0]
                  : `/products/${product.images[0]}`
              }
              alt={product.title}
              className="fadeIn"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={300}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
