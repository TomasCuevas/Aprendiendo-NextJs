import { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

//* layout *//
import { Layout } from "../components/layouts";

interface ThemeChangerPageProps {
  theme: string;
}

const ThemeChangerPage: NextPage<ThemeChangerPageProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    setCurrentTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log(data);
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

          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "dark" } = req.cookies;

  const validThemes = ["light", "dark"];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
    },
  };
};

export default ThemeChangerPage;
