import { Types } from "mongoose";
import { Image } from "./image-types.js";

export type Category = {
  title: string;
  img: Image;
  userID: Types.ObjectId | string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id" | "userID">;
