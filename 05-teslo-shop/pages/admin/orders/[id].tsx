import NextLink from "next/link";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

//* icons *//
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts/AdminLayout";

//* components *//
import { CardList } from "../../../components/cart/CardList";
import { OrderSummary } from "../../../components/cart/OrderSummary";

//* utils *//
import { verifyAdminInPage } from "../../../utils/verifyAdminInPage";

//* database *//
import { getOrderById } from "../../../database/dbOrders";

//* interfaces *//
import { IOrder } from "../../../interfaces/order";

interface OrderPageProps {
  order: IOrder;
}

const OrderPageByAdmin: NextPage<OrderPageProps> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout
      title="Resumen de la orden:"
      subtitle={`${order._id}`}
      icon={<AirplaneTicketOutlined />}
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const isAdmin = await verifyAdminInPage(req);
  if (!isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { id = "" } = query;
  const order = await getOrderById(id.toString());
  if (!order) {
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

export default OrderPageByAdmin;
