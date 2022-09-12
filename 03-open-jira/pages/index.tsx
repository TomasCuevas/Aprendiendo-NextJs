import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* layout *//
import { Layout } from "../components/layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        Hola Mundo
      </Typography>
    </Layout>
  );
};

export default HomePage;
