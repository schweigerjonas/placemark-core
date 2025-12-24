import Mongoose from "mongoose";
import { PointOfInterest, Location } from "../../types/poi-types.js";
import { imageSchema } from "./image.js";

const { Schema } = Mongoose;

const locationSchema = new Schema<Location>(
  {
    lat: String,
    lng: String,
  },
  { _id: false }
);

const poiSchema = new Schema<PointOfInterest>({
  name: String,
  description: String,
  location: locationSchema,
  img: imageSchema,
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const PointOfInterestMongoose = Mongoose.model("PointOfInterest", poiSchema);
