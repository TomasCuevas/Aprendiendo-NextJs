import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";

//* components *//
import { ProductList } from "../../components/products";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* database *//
import { dbProducts } from "../../database";

//* interfaces *//
import { IProduct } from "../../interfaces";

interface SearchPageProps {
  foundProducts: boolean;
  products: IProduct[];
  query: string;
}

const SearchPage: NextPage<SearchPageProps> = ({
  products,
  query,
  foundProducts,
}) => {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Encuentra los mejores productos en Teslo Shop"
    >
      <Typography variant="h1" component="h1">
        Buscar un producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          {query}
        </Typography>
      ) : (
        <Box display="flex" gap={1}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningun producto
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

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
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      foundProducts,
      products,
      query,
    },
  };
};

export default SearchPage;
