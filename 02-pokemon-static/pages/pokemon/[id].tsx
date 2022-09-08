import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

//* api *//
import { pokeApi } from "../../api";

//* layout *//
import { Layout } from "../../components/layouts";

//* utils *//
import { existInFavorites, toggleFavorite } from "../../utils";

//* interfaces *//
import { PokemonFull } from "../../interfaces";
import { useState } from "react";

interface PokemonPageProps {
  pokemon: PokemonFull;
}

export const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState<boolean>(
    existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id);
    setIsInFavorite(existInFavorites(pokemon.id));
  };

  return (
    <Layout title={`${pokemon.name.toUpperCase()} - Pokemon`}>
      <Grid.Container className="mt-1 gap-5 justify-center">
        <Grid xs={12} sm={3}>
          <Card isHoverable className="p-[30px]">
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                className="w-full h-[200px]"
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card className="px-10">
            <Card.Header className="flex justify-between">
              <Text h1 className="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorite}
                onPress={onToggleFavorite}
              >
                {isInFavorite ? <>En favoritos</> : <>Guardar en favoritos</>}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text className="text-3xl">Sprites:</Text>
              <Container className="flex flex-row">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-[150px] h-[150px]"
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  className="w-[150px] h-[150px]"
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  className="w-[150px] h-[150px]"
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  className="w-[150px] h-[150px]"
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPokemonms = [...Array(150)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemonms.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
