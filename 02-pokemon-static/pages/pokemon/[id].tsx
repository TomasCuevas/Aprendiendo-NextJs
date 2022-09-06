//* layout *//
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";

export const PokemonPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <Layout>
      <div>Hola Mundo</div>
    </Layout>
  );
};

export default PokemonPage;
