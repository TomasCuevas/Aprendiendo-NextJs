import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { db, SHOP_CONTANTS } from "../../../database";
import { ProductModel } from "../../../database/models";

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

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { gender = "all" } = req.query;

  let condition = {};

  if (gender !== "all" && SHOP_CONTANTS.valid_genders.includes(`${gender}`)) {
    condition = { gender };
  }

  const products = await ProductModel.find(condition)
    .select("title images price inStock slug -_id")
    .lean();

  return res.status(200).json(products);
};
