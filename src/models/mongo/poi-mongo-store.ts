import { Types } from "mongoose";
import { PointOfInterestDetails, PointOfInterest } from "../../types/poi-types.js";
import { PointOfInterestStore } from "../../types/store-types.js";
import { PointOfInterestMongoose } from "./poi.js";

export const poiMongoStore: PointOfInterestStore = {
  async addPOI(categoryID: string, poiDetails: PointOfInterestDetails): Promise<PointOfInterest> {
    const poi = {
      ...poiDetails,
      categoryID: categoryID,
    };
    const newPOI = new PointOfInterestMongoose(poi);
    const poiObject = await newPOI.save();
    return poiObject.toObject();
  },

  async getAllPOIs(): Promise<PointOfInterest[]> {
    const pois = await PointOfInterestMongoose.find().lean();
    return pois;
  },

  async getPOIsByCategoryId(id: string): Promise<PointOfInterest[] | null> {
    const pois = await PointOfInterestMongoose.find({ categoryID: id }).lean();
    if (!pois) {
      return null;
    }
    return pois;
  },

  async getPOIById(id: string): Promise<PointOfInterest | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const poi = await PointOfInterestMongoose.findOne({ _id: id }).lean();
    return poi;
  },

  async updatePOI(poi: PointOfInterest, updatedPOI: PointOfInterestDetails): Promise<void> {
    await PointOfInterestMongoose.updateOne(
      { _id: poi._id },
      {
        name: updatedPOI.name || poi.name,
        description: updatedPOI.description || poi.description,
        location: {
          lat: updatedPOI.location.lat || poi.location.lat,
          lng: updatedPOI.location.lng || poi.location.lng,
        },
        img: updatedPOI.img || poi.img,
      }
    );
  },

  async deleteAllPOIs(): Promise<void> {
    await PointOfInterestMongoose.deleteMany({});
  },

  async deletePOIById(id: string): Promise<void> {
    try {
      await PointOfInterestMongoose.deleteOne({ _id: id });
    } catch (err) {
      console.error("bad id");
    }
  },
};
