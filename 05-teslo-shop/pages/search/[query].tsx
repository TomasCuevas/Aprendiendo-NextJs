import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { Typography } from "@mui/material";

//* components *//
import { ProductList } from "../../components/products";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* database *//
import { dbProducts } from "../../database";

//* interfaces *//
import { IProduct } from "../../interfaces";

interface SearchPageProps {
  products: IProduct[];
}

const SearchPage: NextPage<SearchPageProps> = ({ products }) => {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Encuentra los mejores productos en Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Buscar un producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos encontrados
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  );
};

//* server side rendering *//
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.trim().length < 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  console.log(products);

  return {
    props: {
      products,
    },
  };
};

export default SearchPage;
