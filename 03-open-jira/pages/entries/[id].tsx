import { ChangeEvent, useMemo, useState } from "react";
import type { NextPage } from "next";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

//* icons *//
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//* layout *//
import { Layout } from "../../components/layout";

//* interfaces *//
import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "finished", "in-progress"];

const EntryPage: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState<boolean>(false);

  const isValid = useMemo(
    () => !(inputValue.length < 1 && touched),
    [inputValue, touched]
  );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {};

  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace: ...`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBotton: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                value={inputValue}
                onChange={onInputChange}
                helperText={isValid && "Ingrese un valor"}
                onBlur={() => setTouched(true)}
                error={isValid}
              />
              <FormControl sx={{ marginTop: 2 }}>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row onChange={onStatusChanges} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={isValid}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 50,
          backgroundColor: "#a00",
          padding: 2,
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;
