import mongoose, { Model, model, Schema } from "mongoose";

//* interfaces *//
import { IOrder } from "../../interfaces/order";

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} no es un rol valido",
      },
      default: "client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.orders || model("orders", OrderSchema);

export default Order;
