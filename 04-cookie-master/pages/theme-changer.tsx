import { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

//* layout *//
import { Layout } from "../components/layouts";

const ThemeChangerPage = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    setCurrentTheme(selectedTheme);
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onChangeTheme}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="dark" />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ThemeChangerPage;
