import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

//* components *//
import { ItemCounter } from "../ui/ItemCounter";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

interface CardListProps {
  editable?: boolean;
}

export const CardList = ({ editable = false }: CardListProps) => {
  const {
    cart: { cartItems },
    updateCartQuantity,
    deleteCart,
  } = useContext(CartContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted &&
        cartItems.map((product) => (
          <Grid
            container
            spacing={2}
            sx={{ mb: 1 }}
            key={`${product.slug}${product.sizes}`}
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{product.sizes}</strong>
                </Typography>
                {editable ? (
                  <ItemCounter
                    count={product.quantity}
                    modifyCount={updateCartQuantity}
                    product={product}
                  />
                ) : (
                  <Typography variant="subtitle2">
                    {product.quantity}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
              {editable && (
                <Button
                  onClick={() => deleteCart(product)}
                  variant="text"
                  color="secondary"
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
};
