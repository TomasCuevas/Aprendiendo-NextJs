import { Typography, Box, IconButton } from "@mui/material";

//* icons *//
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

//* interfaces *//
interface ItemCounterProps {
  count: number;
  modifyCount: (add: boolean) => void;
}

export const ItemCounter = ({ modifyCount, count }: ItemCounterProps) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => modifyCount(false)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{count}</Typography>
      <IconButton onClick={() => modifyCount(true)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
