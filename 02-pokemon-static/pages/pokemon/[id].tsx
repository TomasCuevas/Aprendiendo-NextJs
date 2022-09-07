import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { pokeApi } from "../../api";

//* layout *//
import { Layout } from "../../components/layouts";

//* interfaces *//
import { PokemonFull } from "../../interfaces";

interface PokemonPageProps {
  pokemon: PokemonFull;
}

export const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  return (
    <Layout title={`${pokemon.name}`}>
      <div>{pokemon.name}</div>
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
