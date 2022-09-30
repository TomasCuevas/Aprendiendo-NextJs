import { useEffect, useState } from "react";
import useSWR from "swr";
import { Grid, Typography } from "@mui/material";

//* icons *//
import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

//* components *//
import { SummaryTile } from "../../components/admin/SummaryTile";

//* layout *//
import { AdminLayout } from "../../components/layouts/AdminLayout";

//* interfaces *//
import { DashboardSummaryResponse } from "../../interfaces/dashboard";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) return <></>;

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la informacion</Typography>;
  }

  const {
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productsWithNoInventory,
    numberOfOrders,
    paidOrders,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
          subtitle="Ordenes totales"
          title={numberOfOrders}
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          subtitle="Ordenes pagadas"
          title={paidOrders}
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          subtitle="Ordenes pendientes"
          title={notPaidOrders}
        />
        <SummaryTile
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          subtitle="Clientes"
          title={numberOfClients}
        />
        <SummaryTile
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          subtitle="Productos"
          title={numberOfProducts}
        />
        <SummaryTile
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
          subtitle="Sin existencia"
          title={productsWithNoInventory}
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
          subtitle="Bajo inventario"
          title={lowInventory}
        />
        <SummaryTile
          icon={
            <AccessTimeFilledOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
          subtitle="Actualizacion en"
          title={refreshIn}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
