import { NextPage } from "next";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";

//* components *//
import { ShopLayout } from "../../components/layouts";

//* data *//
import { initialData } from "../../database/products";

const product = initialData.products[0];

const SlugPage: NextPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}></Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al Carrito
            </Button>
            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                Descripcion
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SlugPage;
