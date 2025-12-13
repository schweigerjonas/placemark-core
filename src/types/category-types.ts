import { PointOfInterest } from "./poi-types.js";

export type Category = {
  title: string;
  pois: PointOfInterest[];
  userID: string;
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id" | "userID">;
