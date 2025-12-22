import { Types } from "mongoose";
import { Image } from "./image-types.js";

export type Location = {
  lat: string;
  lng: string;
};

export type PointOfInterest = {
  name: string;
  description: string;
  location: Location;
  img: Image;
  categoryID: Types.ObjectId | string;
  _id: string;
};

export type PointOfInterestDetails = Omit<PointOfInterest, "_id" | "categoryID">;
