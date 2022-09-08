import { NextPage } from "next";
import { useEffect, useState } from "react";

//* utils *//
import { localFavorites } from "../../utils";

//* layout *//
import { Layout } from "../../components/layouts";

//* components *//
import { NoFavorites } from "../../components/ui";
import { FavoriteList } from "../../components/pokemon/FavoriteList";

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
        <FavoriteList favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
