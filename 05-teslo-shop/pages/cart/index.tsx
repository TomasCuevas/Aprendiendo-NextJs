import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import { CardList, OrderSummary } from "../../components/cart";

//* context *//
import { CartContext } from "../../context";

const CartPage: NextPage = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <ShopLayout
      title={`Carrito - ${cartCount} productos`}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
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
                <Button color="secondary" className="circular-btn" fullWidth>
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
