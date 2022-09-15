import { DragEvent, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";

//* context *//
import { UIContext } from "../../context";

//* interfaces *//
import { Entry } from "../../interfaces";

interface EntryCardProps {
  entry: Entry;
}

export const EntryCard = ({ entry }: EntryCardProps) => {
  const { onToggleDraggin } = useContext(UIContext);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", entry._id);
    onToggleDraggin(true);
  };

  const onDragEnd = () => {
    onToggleDraggin(false);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
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
