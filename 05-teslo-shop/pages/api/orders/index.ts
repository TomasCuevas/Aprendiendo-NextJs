import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { IOrder } from "../../../interfaces/order";

//* database *//
import { connect } from "../../../database/config";
import Product from "../../../database/models/Product";
import Order from "../../../database/models/Order";

type Data =
  | {
      message: string;
    }
  | IOrder;

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

  console.log(req.body);

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
        (product) => product.id.toString() === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Verifique el carrito. Producto no existe.");
      }

      return currentPrice * current.quantity + prevState;
    }, 0);

    const taxes = Number(((subtotal * 15) / 100).toFixed(2));
    const backendTotal = Number((subtotal + taxes).toFixed(2));

    if (total !== backendTotal) {
      throw new Error("El total no cuadra con el monto.");
    }

    const { _id } = session.user as { _id: string };
    const newOrder = new Order({ ...req.body, isPaid: false, user: _id });
    await newOrder.save();

    return res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Revise logs del servidor.",
    });
  }
};
