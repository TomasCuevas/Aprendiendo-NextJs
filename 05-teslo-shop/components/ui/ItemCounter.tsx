import { Typography, Box, IconButton } from "@mui/material";

//* icons *//
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

//* interfaces *//
import { ICartProduct } from "../../interfaces/cart";

interface ItemCounterProps {
  count: number;
  product: ICartProduct;
  modifyCount: (add: boolean, product: ICartProduct) => void;
}

export const ItemCounter = ({
  modifyCount,
  count,
  product,
}: ItemCounterProps) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => modifyCount(false, product)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{count}</Typography>
      <IconButton onClick={() => modifyCount(true, product)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
