import { PointOfInterest } from "./poi-types";

export type Category = {
  title: string;
  userID: string;
  pois: PointOfInterest[];
  _id: string;
};

export type CategoryDetails = Omit<Category, "_id">;
