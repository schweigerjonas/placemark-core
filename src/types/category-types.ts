import { Types } from "mongoose";
import { PointOfInterest } from "./poi-types.js";

export type Category = {
  title: string;
  pois: PointOfInterest[];
  userID: Types.ObjectId | string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id" | "userID">;
