import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { db, ProductModel } from "../../../database";

//* interfaces *//
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProduct(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const searchProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  let { query = "" } = req.query;

  if (query.length < 1) {
    return res.status(400).json({
      message: "Debe de especificar el query a buscar",
    });
  }

  query = query.toString().toLowerCase();

  await db.connect();

  const products = await ProductModel.find({ $text: { $search: query } })
    .select("title images price inStock slug -_id")
    .lean();

  return res.status(200).json(products);
};
