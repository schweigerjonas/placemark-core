import { v4 as uuidv4 } from "uuid";
import { PointOfInterest, PointOfInterestDetails } from "../../types/poi-types.js";
import { PointOfInterestStore } from "../../types/store-types.js";
import { db } from "./store-utils.js";

export const poiJsonStore: PointOfInterestStore = {
  async addPOI(categoryID: string, poi: PointOfInterestDetails): Promise<PointOfInterest> {
    await db.read();

    const newPOI: PointOfInterest = {
      ...poi,
      categoryID: categoryID,
      _id: uuidv4(),
    };

    db.data.pois.push(newPOI);
    await db.write();
    return newPOI;
  },

  async getAllPOIs(): Promise<PointOfInterest[]> {
    await db.read();
    return db.data.pois;
  },

  async getPOIsByCategoryId(id: string): Promise<PointOfInterest[] | null> {
    await db.read();
    const categoryPOIs = db.data.pois.filter((poi) => poi.categoryID === id);
    if (categoryPOIs === undefined) return null;
    return categoryPOIs;
  },

  async getPOIById(id: string): Promise<PointOfInterest | null> {
    await db.read();
    const p = db.data.pois.find((poi) => poi._id === id);
    if (p === undefined) return null;
    return p;
  },

  async updatePOI(poi: PointOfInterest, updatedPOI: PointOfInterestDetails): Promise<void> {
    poi.name = updatedPOI.name || poi.name;
    poi.description = updatedPOI.description || poi.description;
    poi.location.lat = updatedPOI.location.lat || poi.location.lat;
    poi.location.lng = updatedPOI.location.lng || poi.location.lng;
    await db.write();
  },

  async deleteAllPOIs(): Promise<void> {
    db.data.pois = [];
    await db.write();
  },

  async deletePOIById(id: string): Promise<void> {
    await db.read();
    const index = db.data.pois.findIndex((poi) => poi._id === id);
    if (index !== -1) db.data.pois.splice(index, 1);
    await db.write();
  },
};
