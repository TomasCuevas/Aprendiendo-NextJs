import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { db } from "../../database";
import { ProductModel, UserModel } from "../../database/models";

//* seed data *//
import { initialData } from "../../database/seed-data";

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

  await UserModel.deleteMany();
  await UserModel.insertMany(initialData.users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(initialData.products);

  res.status(200).json({ ok: true });
}
