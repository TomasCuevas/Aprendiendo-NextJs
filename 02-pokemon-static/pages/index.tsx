import type { NextPage, GetStaticProps } from "next";
import { Button } from "@nextui-org/react";

//* api *//
import { pokeApi } from "../api";

//* layout *//
import { Layout } from "../components/layouts";

//* interfaces *//
import { Pokemon, PokemonListResponse } from "../interfaces";

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <ul>
        {pokemons.map(({ id, img, name, url }) => (
          <li key={id}>{`#${id} - ${name}`}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=150");
  const pokemons: Pokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: (index + 1).toString(),
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
