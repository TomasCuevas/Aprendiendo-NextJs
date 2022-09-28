import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { IOrder } from "../../../interfaces/order";

//* database *//
import { connect } from "../../../database/config";
import Product from "../../../database/models/Product";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  const session = await getSession({ req });
  if (!session) {
    return res.status(400).json({
      message: "Debe de estar autenticado.",
    });
  }

  const productsIds = orderItems.map((product) => product._id);
  await connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subtotal = orderItems.reduce((prevState, current) => {
      const currentPrice = dbProducts.find(
        (product) => product._id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Verifique el carrito. Producto no existe.");
      }

      return currentPrice * current.quantity + prevState;
    }, 0);
  } catch (error) {}

  return res.status(200).json({ message: "example" });
};
