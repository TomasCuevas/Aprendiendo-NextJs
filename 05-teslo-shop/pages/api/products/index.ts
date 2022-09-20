import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { db, ProductModel } from "../../../database";

//* interfaces *//
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const products = await ProductModel.find()
    .select("title images price inStock slug -_id")
    .lean();

  return res.status(200).json(products);
};
