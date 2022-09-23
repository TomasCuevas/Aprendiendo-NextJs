import { useContext } from "react";
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
import { ItemCounter } from "../ui";

//* context *//
import { CartContext } from "../../context";

interface CardListProps {
  editable?: boolean;
}

export const CardList = ({ editable = false }: CardListProps) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
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
                <ItemCounter count={product.quantity} modifyCount={() => {}} />
              ) : (
                <Typography variant="subtitle2">{product.quantity}</Typography>
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
              <Button variant="text" color="primary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
