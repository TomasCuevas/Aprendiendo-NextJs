import { DashboardOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../components/layouts/AdminLayout";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <h2>Hello World</h2>
    </AdminLayout>
  );
};

export default DashboardPage;
