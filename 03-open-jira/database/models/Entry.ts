import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../../interfaces";

export interface IEntry extends Entry {}

const EntrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.entries || mongoose.model("entries", EntrySchema);

export default EntryModel;
