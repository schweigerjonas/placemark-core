import Mongoose from "mongoose";
import { Image } from "../../types/image-types.js";

const { Schema } = Mongoose;

export const imageSchema = new Schema<Image>(
  {
    url: String,
    publicID: String,
  },
  { _id: false }
);
