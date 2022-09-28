import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* components *//
import { CardList } from "../../components/cart/CardList";
import { OrderSummary } from "../../components/cart/OrderSummary";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

const CartPage: NextPage = () => {
  const router = useRouter();
  const { numberOfItems, isLoaded } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded && numberOfItems === 0) return <></>;

  return (
    <ShopLayout
      title={`Carrito - ${numberOfItems} productos`}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid className="fadeIn" container>
        <Grid item xs={12} sm={7}>
          <CardList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  onClick={() => router.push("/checkout/address")}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
