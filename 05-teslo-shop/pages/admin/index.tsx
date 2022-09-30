import { Grid } from "@mui/material";

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

//* layout *//
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { SummaryTile } from "../../components/admin/SummaryTile";

const DashboardPage = () => {
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
          title={7}
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          subtitle="Ordenes pagadas"
          title={3}
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          subtitle="Ordenes pendientes"
          title={4}
        />
        <SummaryTile
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          subtitle="Clientes"
          title={12}
        />
        <SummaryTile
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          subtitle="Productos"
          title={9}
        />
        <SummaryTile
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
          subtitle="Sin existencia"
          title={6}
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
          subtitle="Bajo inventario"
          title={4}
        />
        <SummaryTile
          icon={
            <AccessTimeFilledOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
          subtitle="Actualizacion en"
          title={4}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
