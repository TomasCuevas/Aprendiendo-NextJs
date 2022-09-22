//* database *//
import { db } from "./";
import { ProductModel } from "./models";

//* interface *//
import { IProduct } from "../interfaces";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};

interface Returns {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<Returns[]> => {
  await db.connect();

  const slugs = await ProductModel.find().select("slug -_id").lean();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await ProductModel.find({
    $text: { $search: term },
  })
    .select("title images price inStock slug -_id")
    .lean();

  return products;
};
