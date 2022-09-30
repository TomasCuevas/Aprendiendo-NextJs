import { NextPage, GetServerSideProps } from "next";

//* icons *//
import { ConfirmationNumberOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../components/layouts/AdminLayout";

//* utils *//
import { verifyAdminInPage } from "../../utils/verifyAdminInPage";

const OrdersPage: NextPage = () => {
  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
    ></AdminLayout>
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
