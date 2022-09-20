import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from "next/link";

//* layouts *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

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
        <Chip color="error" label="Pendiente" variant="outlined" />
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
            <Link underline="always">Orden: {`${params.row.order}`}</Link>
          </NextLink>
        )
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Tomas Cuevas", order: "1" },
  { id: 2, paid: false, fullname: "Melissa Flores" },
  { id: 3, paid: true, fullname: "Fernando Herrera" },
  { id: 4, paid: false, fullname: "Emin Reyes" },
  { id: 5, paid: false, fullname: "Eduardo Rios" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
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

export default HistoryPage;
