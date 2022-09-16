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

    case "POST":
      return addEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await EntryModel.find().sort({
    createdAt: "ascending",
  });

  return res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = "" } = req.body;
  const newEntry = new EntryModel({
    description,
    createdAt: Number(Date.now()),
  });

  await db.connect();
  await newEntry.save();

  return res.status(201).json(newEntry);
};
