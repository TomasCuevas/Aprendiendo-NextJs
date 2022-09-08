import { useRouter } from "next/router";
import { Card, Grid } from "@nextui-org/react";

export const FavoritePokeCard = ({ pokemonId }: { pokemonId: number }) => {
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid
      onClick={onFavoriteClicked}
      key={pokemonId}
      xs={6}
      sm={3}
      md={2}
      xl={2}
    >
      <Card isHoverable isPressable className="p-[10px]">
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          className="w-full h-36"
        />
      </Card>
    </Grid>
  );
};
