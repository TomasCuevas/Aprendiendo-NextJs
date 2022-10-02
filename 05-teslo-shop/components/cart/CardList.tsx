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

//* interfaces *//
import { ICartProduct } from "../../interfaces/cart";
import { IOrderItem } from "../../interfaces/order";

interface CardListProps {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CardList = ({ editable = false, products }: CardListProps) => {
  const {
    cart: { cartItems },
    updateCartQuantity,
    deleteCart,
  } = useContext(CartContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const productsToShow = products ? products : cartItems;

  return (
    <>
      {hasMounted &&
        productsToShow.map((product) => (
          <Grid
            container
            spacing={2}
            sx={{ mb: 1 }}
            key={`${product.slug}${product.size}`}
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.image}
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
                  Talla: <strong>{product.size}</strong>
                </Typography>
                {editable ? (
                  <ItemCounter
                    count={product.quantity}
                    modifyCount={updateCartQuantity}
                    product={product as ICartProduct}
                  />
                ) : (
                  <Typography variant="subtitle1">
                    {product.quantity} productos
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
                  onClick={() => deleteCart(product as ICartProduct)}
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
