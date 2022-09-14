import type { NextPage } from "next";
import { Grid, Card, CardHeader } from "@mui/material";

//* layout *//
import { Layout } from "../components/layout";

//* components *//
import { EntryList } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
