import type { NextApiRequest, NextApiResponse } from "next";
import { db, ProductModel } from "../../database";

//* seed data *//
import { initialData as seedData } from "../../database/products";

type Data =
  | {
      ok: boolean;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "No tiene acceso a este servicio," });
  }

  await db.connect();

  await ProductModel.deleteMany();
  await ProductModel.insertMany(seedData.products);

  res.status(200).json({ ok: true });
}
