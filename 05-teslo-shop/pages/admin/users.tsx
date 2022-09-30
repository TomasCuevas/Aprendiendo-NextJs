import type { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PeopleOutline } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../components/layouts/AdminLayout";

//* utils *//
import { verifyAdminInPage } from "../../utils/verifyAdminInPage";

//* interfaces *//
import { IUser } from "../../interfaces/user";

const UsersPage: NextPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  if (!data && !error) return <></>;

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 250 },
    { field: "role", headerName: "Rol", width: 250 },
  ];

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subtitle="Mantenimiento de usuarios"
      icon={<PeopleOutline />}
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

export default UsersPage;
