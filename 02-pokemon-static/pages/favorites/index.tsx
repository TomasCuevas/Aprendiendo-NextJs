import { NextPage } from "next";
import { useEffect, useState } from "react";

//* utils *//
import { localFavorites } from "../../utils";

//* layout *//
import { Layout } from "../../components/layouts";

//* components *//
import { NoFavorites } from "../../components/ui";
import { Card, Grid } from "@nextui-org/react";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemons - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Grid.Container className="gap-1 flex-row justify-start">
          {favoritePokemons.map((id) => (
            <Grid key={id} xs={6} sm={3} md={2} xl={2}>
              <Card isHoverable isPressable className="p-[10px]">
                <Card.Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                  className="w-full h-36"
                />
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}
    </Layout>
  );
};

export default FavoritesPage;
