import { isValidObjectId } from "mongoose";
import { db } from ".";
import EntryModel, { IEntry } from "./models/Entry";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId) {
    return null;
  }

  await db.connect();

  const entry = await EntryModel.findById(id).lean();
  if (!entry) {
    return null;
  }

  return entry;
};
