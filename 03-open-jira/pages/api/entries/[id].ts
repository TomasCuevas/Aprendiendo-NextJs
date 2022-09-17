import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import EntryModel, { IEntry } from "../../../database/models/Entry";

type Data =
  | {
      message: string;
    }
  | {
      ok: boolean;
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
    case "GET":
      return getEntry(req, res);

    case "PUT":
      return updateEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;

  const entry = await EntryModel.findById(id);
  if (!entry) {
    return res.status(400).json({
      message: "No existe entrada con el ID ingresado",
    });
  }

  return res.status(200).json(entry);
};

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

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    res.status(201).json(updatedEntry!);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Bad request!",
    });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;

  const entryToDelete = await EntryModel.findById(id);
  if (!entryToDelete) {
    return res.status(400).json({
      message: "No existe entrada con el ID ingresado.",
    });
  }

  try {
    await EntryModel.findByIdAndDelete(id);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
    });
  }
};
