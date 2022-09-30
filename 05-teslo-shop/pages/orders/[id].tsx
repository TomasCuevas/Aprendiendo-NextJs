import { useState } from "react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

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

//* database *//
import { getOrderById } from "../../database/dbOrders";

//* api *//
import tesloApi from "../../api/tesloApi";

//* interfaces *//
import { IOrder } from "../../interfaces/order";
import { OrderResponseBody } from "../../interfaces/paypal";

interface OrderPageProps {
  order: IOrder;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const router = useRouter();
  const { shippingAddress } = order;

  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No se pudo realizar el pago en PayPal");
    }

    setIsPaying(true);

    try {
      const { data } = await tesloApi.post("/orders/pay", {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      console.log(error);
      setIsPaying(false);
      alert(error);
    }
  };

  return (
    <ShopLayout
      title={`Resumen de la orden ${order._id}`}
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid className="fadeIn" container>
        <Grid item xs={12} sm={7}>
          <CardList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems} productos)
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
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>{shippingAddress.address}</Typography>
              <Typography>
                {shippingAddress.city} {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />
              <OrderSummary summary={order} />
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {
                  <Box
                    display="flex"
                    className="fadeIn"
                    justifyContent="center"
                    sx={{ display: isPaying ? "flex" : "none" }}
                  >
                    <CircularProgress />
                  </Box>
                }
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ display: isPaying ? "none" : "flex" }}
                >
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  const { _id } = session.user as { _id: string };
  if (order.user !== _id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
