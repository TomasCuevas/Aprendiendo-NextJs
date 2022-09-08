import type { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";

//* api *//
import { pokeApi } from "../api";

//* layout *//
import { Layout } from "../components/layouts";

//* components *//
import { PokemonCard } from "../components/pokemon";

//* interfaces *//
import { Pokemon, PokemonListResponse } from "../interfaces";

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=150");
  const pokemons = data.results.map((pokemon, index) => ({
    name: pokemon.name,
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
