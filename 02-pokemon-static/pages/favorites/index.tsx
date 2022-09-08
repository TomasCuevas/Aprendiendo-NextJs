import { NextPage } from "next";
import { useEffect, useState } from "react";

//* utils *//
import { localFavorites } from "../../utils";

//* layout *//
import { Layout } from "../../components/layouts";

//* components *//
import { NoFavorites } from "../../components/ui";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemons - Favoritos">
      <NoFavorites />
    </Layout>
  );
};

export default FavoritesPage;
