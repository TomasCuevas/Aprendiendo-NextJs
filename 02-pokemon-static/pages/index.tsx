import type { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";

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
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map(({ id, img, name, url }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card isHoverable isPressable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image height={150} width="100%" src={img} alt={name} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
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
