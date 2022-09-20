import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import { CardList, OrderSummary } from "../../components/cart";

const SummaryPage: NextPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
            Resumen de la orden
          </Typography>
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
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
