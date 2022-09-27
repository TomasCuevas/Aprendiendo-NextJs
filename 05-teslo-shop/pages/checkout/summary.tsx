import { useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { getToken } from "next-auth/jwt";
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

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* components *//
import { CardList } from "../../components/cart/CardList";
import { OrderSummary } from "../../components/cart/OrderSummary";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

const SummaryPage: NextPage = () => {
  const {
    shippingAddress,
    cart: { cartCount },
  } = useContext(CartContext);

  if (!shippingAddress) return <></>;
  const { firstName, lastName, address, zip, city, country, phone } =
    shippingAddress;

  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({cartCount} productos)
              </Typography>
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

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>{address}</Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { firstName, lastName, address, zip, city, country, phone } =
    req.cookies;

  if (
    !firstName ||
    !lastName ||
    !address ||
    !zip ||
    !city ||
    !country ||
    !phone
  ) {
    return {
      redirect: {
        destination: "/checkout/address",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SummaryPage;
