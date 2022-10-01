import { NextPage, GetServerSideProps } from "next";
import useSWR from "swr";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { ConfirmationNumberOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts/AdminLayout";

//* utils *//
import { verifyAdminInPage } from "../../../utils/verifyAdminInPage";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "name", headerName: "Nombre completo", width: 200 },
  { field: "total", headerName: "Monto total", width: 100 },
  {
    field: "isPaid",
    headerName: "Pagada",
    width: 120,
    align: "center",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="No pagada" color="error" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "No. Productos",
    align: "center",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Creada en",
    width: 200,
  },
  {
    field: "check",
    headerName: "Ver orden",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a>
      );
    },
  },
];

//* interfaces *//
import { IOrder } from "../../../interfaces/order";
import { IUser } from "../../../interfaces/user";

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: `$${order.total}`,
    noProducts: order.numberOfItems,
    isPaid: order.isPaid,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
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
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isAdmin = await verifyAdminInPage(req);
  if (!isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default OrdersPage;
