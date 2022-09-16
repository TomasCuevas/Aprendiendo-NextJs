import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import EntryModel, { IEntry } from "../../../database/models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const entries = await EntryModel.find().sort({
      createdAt: "ascending",
    });

    return res.status(200).json(entries);
  } catch (error) {
    console.log(error);
  }
};
