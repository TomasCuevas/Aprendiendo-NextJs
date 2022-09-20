import { Box, Button } from "@mui/material";

//* interfaces *//
import { IValidSizes } from "../../interfaces";

interface SizeSelectorProps {
  selectedSize?: IValidSizes;
  sizes: IValidSizes[];
}

export const SizeSelector = ({ selectedSize, sizes }: SizeSelectorProps) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "info" : "primary"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
