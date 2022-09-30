import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//* interfaces *//
import { IPayPalOrderStatus } from "../../../interfaces/paypal";

//* database *//
import { connect } from "../../../database/config";
import OrderModel from "../../../database/models/Order";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIEND = process.env.NEXT_PUBLIC_PAYPAL_CLIEND;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIEND}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({
      message: "No se pudo confirmar el token de paypal.",
    });
  }

  const { transactiodId = "", orderId = "" } = req.body;

  const { data } = await axios.get<IPayPalOrderStatus>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactiodId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    return res.status(400).json({
      message: "Orden no reconocida",
    });
  }

  await connect();

  const dbOrder = await OrderModel.findById(orderId);
  if (!dbOrder) {
    return res.status(400).json({
      message: "Orden no existe en nuestra base de datos",
    });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    return res.status(400).json({
      message: "Los montos de PayPal y nuestra orden, no coinciden.",
    });
  }

  dbOrder.transactionId = transactiodId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  return res.status(200).json({ message: "Orden pagada exitosamente." });
};
