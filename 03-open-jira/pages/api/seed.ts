import type { NextApiRequest, NextApiResponse } from "next";
import { db, EntryModel, seedData } from "../../database";

type Data = {
  message: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "No tiene acceso a este servicio." });
  }

  await db.connect();

  await EntryModel.deleteMany();
  await EntryModel.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente." });
}
