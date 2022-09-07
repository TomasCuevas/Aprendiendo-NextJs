//* layout *//
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";

interface PokemonPageProps {
  id: string;
  name: string;
}

export const PokemonPage: NextPage<PokemonPageProps> = ({ id, name }) => {
  const router = useRouter();

  console.log(router.query);

  return (
    <Layout>
      <div>{`${id} - ${name}`}</div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "1", name: "Bulbasaur" },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      id: 1,
      name: "Bulbasaur",
    },
  };
};

export default PokemonPage;
