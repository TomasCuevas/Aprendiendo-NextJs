import { NextPage, GetServerSideProps } from "next";
import useSWR from "swr";
import NextLink from "next/link";
import { Box, Button, CardMedia, Chip, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts/AdminLayout";

//* utils *//
import { verifyAdminInPage } from "../../../utils/verifyAdminInPage";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            className="fadeIn"
            image={`/products/${row.img}`}
            alt={row.title}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link>{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero", width: 150, align: "center" },
  { field: "type", headerName: "Tipo", width: 150, align: "center" },
  { field: "inStock", headerName: "Inventario", width: 150, align: "center" },
  { field: "price", headerName: "Precio", width: 150, align: "center" },
  { field: "sizes", headerName: "Tallas", width: 200, align: "center" },
];

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subtitle="Mantenimiento de productos"
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Crear producto
        </Button>
      </Box>
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

export default ProductsPage;
