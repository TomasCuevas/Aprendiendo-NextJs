import type { NextApiRequest, NextApiResponse } from "next";
import { db, ProductModel } from "../../../database";

//* interfaces *//
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const { slug } = req.query;

  const product = await ProductModel.findOne({ slug })
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.status(200).json(product);
};
