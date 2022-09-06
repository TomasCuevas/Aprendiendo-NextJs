import type { NextPage, GetStaticProps } from "next";
import { Button } from "@nextui-org/react";

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
  console.log("hola mundo");

  return {
    props: {
      name: "Tomas",
    },
  };
};

export default HomePage;
