import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";

//* database *//
import { dbProducts } from "../../database";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";

//* interfaces *//
import { ICartProduct, IProduct, IValidSizes } from "../../interfaces";

interface SlugPageProps {
  product: IProduct;
}

const ProductPage: NextPage<SlugPageProps> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    gender: product.gender,
    images: product.images,
    inStock: product.inStock,
    price: product.price,
    quantity: 1,
    slug: product.slug,
    title: product.title,
    sizes: undefined,
  });

  const onSelectedSize = (size: IValidSizes) => {
    setTempCartProduct({ ...tempCartProduct, sizes: size });
  };

  const onSelectedQuantity = (add: boolean) => {
    let quantity = add
      ? tempCartProduct.quantity + 1
      : tempCartProduct.quantity - 1;

    if (quantity > tempCartProduct.inStock) quantity = tempCartProduct.inStock;
    if (quantity < 1) quantity = 1;

    setTempCartProduct({ ...tempCartProduct, quantity });
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                modifyCount={onSelectedQuantity}
                count={tempCartProduct.quantity}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.sizes}
                changeSize={onSelectedSize}
              />
            </Box>
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn">
                {tempCartProduct.sizes
                  ? "Agregar al Carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                Descripcion
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//* static side generation *//
//* static side generation *//
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

//* server side render *//
//* server side render *//
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductPage;
