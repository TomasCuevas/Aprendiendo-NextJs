import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import EntryModel, { IEntry } from "../../../database/models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "El ID ingresado no es valido.",
    });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    return res.status(400).json({
      message: "No existe entrada con el ID ingresado.",
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  const updatedEntry = await EntryModel.findByIdAndUpdate(
    id,
    {
      description,
      status,
    },
    { runValidators: true, new: true }
  );
  updatedEntry?.save();

  res.status(201).json(updatedEntry!);
};
