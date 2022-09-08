import { Grid } from "@nextui-org/react";

//* components *//
import { FavoritePokeCard } from "./";

export const FavoriteList = ({
  favoritePokemons,
}: {
  favoritePokemons: number[];
}) => {
  return (
    <Grid.Container gap={2} className="flex-row justify-start">
      {favoritePokemons.map((id) => (
        <FavoritePokeCard key={id} pokemonId={id} />
      ))}
    </Grid.Container>
  );
};
