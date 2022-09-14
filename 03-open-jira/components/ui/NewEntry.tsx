import { useContext, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { v4 } from "uuid";

//* icons *//
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

//* context *//
import { EntriesContext } from "../../context/EntriesContext";

//* interface *//
import { Entry } from "../../interfaces";
import { UIContext } from "../../context";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, onToggleAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onSave = async () => {
    if (inputValue.length < 1) return;

    const newEntry: Entry = {
      description: inputValue,
      _id: v4(),
      createdAt: Number(new Date().getTime()),
      status: "pending",
    };

    addNewEntry(newEntry);

    onToggleAddingEntry(false);
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ padding: 1, marginBottom: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error={inputValue.length < 1 && touched}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              onClick={() => {
                onToggleAddingEntry(false);
                setTouched(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => onToggleAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
