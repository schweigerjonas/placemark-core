import Mongoose from "mongoose";
import { Category } from "../../types/category-types.js";
import { imageSchema } from "./image.js";

const { Schema } = Mongoose;

const categorySchema = new Schema<Category>({
  title: String,
  img: imageSchema,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const CategoryMongoose = Mongoose.model("Category", categorySchema);
