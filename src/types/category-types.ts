import { Types } from "mongoose";

export type Category = {
  title: string;
  userID: Types.ObjectId | string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id" | "userID">;
