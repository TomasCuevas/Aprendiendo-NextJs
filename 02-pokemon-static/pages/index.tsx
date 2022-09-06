import type { NextPage, GetStaticProps } from "next";
import { Button } from "@nextui-org/react";

import { pokeApi } from "../api";

//* layout *//
import { Layout } from "../components/layouts";

const HomePage: NextPage = (props) => {
  console.log({ props });

  return (
    <Layout title="Listado de Pokemons">
      <Button color={"gradient"}>Hola Mundo</Button>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get("/pokemon?limit=150");

  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default HomePage;
