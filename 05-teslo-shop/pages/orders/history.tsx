import { GetServerSideProps } from "next";
import NextLink from "next/link";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* layouts *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* database *//
import { getOrdersByUser } from "../../database/dbOrders";
import { IOrder } from "../../interfaces/order";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.order && (
          <NextLink href={`/orders/${params.row.order}`}>
            <Link style={{ cursor: "pointer" }} underline="always">
              Ver orden
            </Link>
          </NextLink>
        )
      );
    },
  },
];

//* interfaces *//

interface HistoryPageProps {
  orders: IOrder[];
}

const HistoryPage: NextPage<HistoryPageProps> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    order: order._id,
  }));

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid className="fadeIn" sx={{ mt: 2 }} container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const { _id } = (await session.user) as { _id: string };
  const orders = await getOrdersByUser(_id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
