/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { Grid, Typography } from "@mui/material";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

interface OrderSummaryProps {
  summary?: {
    numberOfItems: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
}

export const OrderSummary = ({ summary }: OrderSummaryProps) => {
  const { numberOfItems, subtotal, taxes, total } = summary
    ? summary
    : useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems} productos</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${subtotal}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${taxes}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" sx={{ mt: 2 }} justifyContent="end">
        <Typography variant="subtitle1">{`$${total}`}</Typography>
      </Grid>
    </Grid>
  );
};
