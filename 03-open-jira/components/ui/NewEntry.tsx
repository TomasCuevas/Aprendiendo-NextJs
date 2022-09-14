import { Button, Box, TextField } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  return (
    <Box sx={{ padding: 1, marginBottom: 2 }}>
      <Button
        startIcon={<AddCircleOutlineOutlinedIcon />}
        fullWidth
        variant="outlined"
      >
        Agregar Tarea
      </Button>

      <TextField
        fullWidth
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder="Nueva entrada"
        autoFocus
        multiline
        label="Nueva entrada"
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="text">Cancelar</Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SaveOutlinedIcon />}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
