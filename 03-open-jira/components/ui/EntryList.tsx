import { useContext, useMemo, DragEvent } from "react";
import { Paper, List } from "@mui/material";

//* components *//
import { EntryCard } from "./";

//* contexts *//
import { EntriesContext, UIContext } from "../../context";

//* styles *//
import Styles from "./EntryList.module.css";

//* interfaces *//
import { EntryStatus } from "../../interfaces";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList = ({ status }: EntryListProps) => {
  const { entries, entryUpdated } = useContext(EntriesContext);
  const { isDraggin, onToggleDraggin } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("id");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;

    entryUpdated(entry);
    onToggleDraggin(false);
  };

  return (
    <div
      className={isDraggin ? Styles.draggin : ""}
      onDrop={onDropEntry}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: isDraggin ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
