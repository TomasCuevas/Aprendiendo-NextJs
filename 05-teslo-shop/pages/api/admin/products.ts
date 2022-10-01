import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import ProductModel from "../../../database/models/Product";

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
    // return createProduct(req, res)
    case "PUT":
    // return updateProduct(req, res)

    default:
      return res.status(200).json({ message: "Bad request!" });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect();

  const products = await ProductModel.find().sort({ title: "asc" }).lean();

  res.status(200).json(products);
};
