import { Typography, Box, IconButton } from "@mui/material";

//* icons *//
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

//* interfaces *//
interface ItemCounterProps {}

export const ItemCounter = () => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>1</Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
