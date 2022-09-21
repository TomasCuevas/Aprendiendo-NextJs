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
  await db.disconnect();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};
