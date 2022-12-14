export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
}

export interface Pokemon {
  id: string;
  img: string;
  name: string;
  url: string;
}
