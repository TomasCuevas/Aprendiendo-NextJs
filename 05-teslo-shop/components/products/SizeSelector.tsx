import { Box, Button } from "@mui/material";

//* interfaces *//
import { IValidSizes } from "../../interfaces/products";

interface SizeSelectorProps {
  selectedSize?: IValidSizes;
  sizes: IValidSizes[];
  changeSize: (size: IValidSizes) => void;
}

export const SizeSelector = ({
  selectedSize,
  sizes,
  changeSize,
}: SizeSelectorProps) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={() => changeSize(size)}
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
