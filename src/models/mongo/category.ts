import Mongoose from "mongoose";
import { Category } from "../../types/category-types.js";

const { Schema } = Mongoose;

const categorySchema = new Schema<Category>({
  title: String,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const categoryMongoose = Mongoose.model("Category", categorySchema);
