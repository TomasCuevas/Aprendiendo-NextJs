import { isValidObjectId } from "mongoose";
import { IOrder } from "../interfaces/order";
import { connect } from "./config";
import OrderModel from "./models/Order";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await connect();

  const order = await OrderModel.findById(id).lean();
  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | []> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await connect();

  const orders = await OrderModel.find({ user: userId }).lean();
  if (!orders) {
    return [];
  }

  return JSON.parse(JSON.stringify(orders));
};
