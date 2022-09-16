import type { NextPage } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

//* icons *//
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

//* layout *//
import { Layout } from "../../components/layout";

const EntryPage: NextPage = () => {
  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="Entrada:" subheader={`Creada hace: ...`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBotton: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
              />
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default EntryPage;
