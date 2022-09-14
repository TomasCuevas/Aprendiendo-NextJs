import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";

//* interfaces *//
import { Entry } from "../../interfaces";

interface EntryCard {
  entry: Entry;
}

export const EntryCard = ({ entry }: EntryCard) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "15px",
          }}
        >
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
