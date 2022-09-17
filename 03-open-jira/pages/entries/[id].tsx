import { ChangeEvent, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import mongoose, { isValidObjectId } from "mongoose";
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
import { Entry, EntryStatus } from "../../interfaces";
import { getEntryById } from "../../database/dbEntries";

interface EntryPageProps {
  entry: Entry;
}

const validStatus: EntryStatus[] = ["pending", "finished", "in-progress"];

const EntryPage: NextPage<EntryPageProps> = ({ entry }) => {
  const [inputValue, setInputValue] = useState<string>(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState<boolean>(false);

  const isInvalid = useMemo(
    () => inputValue.length < 1 && touched,
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
    <Layout title={`${inputValue.substring(0, 25)}...`}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace: ${entry.createdAt}`}
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
                helperText={isInvalid && "Ingrese un valor"}
                onBlur={() => setTouched(true)}
                error={isInvalid}
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
                disabled={inputValue.length < 1}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
