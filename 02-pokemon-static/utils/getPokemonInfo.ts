//* api *//
import { pokeApi } from "../api";

//* interface *//
import { PokemonFull } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${nameOrId}`);

    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };

    return pokemon;
  } catch (error) {
    return null;
  }
};
