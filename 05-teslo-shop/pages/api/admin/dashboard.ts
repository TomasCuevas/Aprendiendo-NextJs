import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import ProductModel from "../../../database/models/Product";
import UserModel from "../../../database/models/User";
import OrderModel from "../../../database/models/Order";

type Data = {
  numberOfClients: number;
  numberOfProducts: number;
  lowInventory: number;
  productsWithNoInventory: number;
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);

  const [
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productsWithNoInventory,
    numberOfOrders,
    paidOrders,
    notPaidOrders,
  ] = await Promise.all([
    UserModel.countDocuments({ role: "client" }),
    ProductModel.countDocuments(),
    ProductModel.countDocuments({ inStock: { $lte: 10 } }),
    ProductModel.countDocuments({ inStock: 0 }),
    OrderModel.countDocuments(),
    OrderModel.countDocuments({ isPaid: true }),
    OrderModel.countDocuments({ isPaid: false }),
  ]);

  res.status(200).json({
    numberOfClients,
    numberOfProducts,
    lowInventory,
    productsWithNoInventory,
    numberOfOrders,
    paidOrders,
    notPaidOrders,
  });
}
