import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

//* icons *//
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* components *//
import { CardList } from "../../components/cart/CardList";
import { OrderSummary } from "../../components/cart/OrderSummary";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden 123ABC"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Orden: 123ABC
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label="Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Tomas Cuevas</Typography>
              <Typography>Belgrano 2823</Typography>
              <Typography>3550</Typography>
              <Typography>Vera</Typography>
              <Typography>Argentina</Typography>
              <Typography>+54 3483522258</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
