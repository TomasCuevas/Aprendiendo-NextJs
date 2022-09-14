import { useContext, useMemo, DragEvent } from "react";
import { Paper, List } from "@mui/material";

//* components *//
import { EntryCard } from "./";

//* context *//
import { EntriesContext } from "../../context";

//* interfaces *//
import { EntryStatus } from "../../interfaces";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList = ({ status }: EntryListProps) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("id");
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};