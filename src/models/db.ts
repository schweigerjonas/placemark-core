import { CategoryStore, Db, PointOfInterestStore, UserStore } from "../types/store-types.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db: Db = {
  userStore: null,
  categoryStore: null,
  poiStore: null,

  async init(dbType: string): Promise<void> {
    switch (dbType) {
      case "mongo":
        await connectMongo(db);
        break;
      case "json":
      default:
        this.userStore = userJsonStore as UserStore;
        this.categoryStore = categoryJsonStore as CategoryStore;
        this.poiStore = poiJsonStore as PointOfInterestStore;
        break;
    }
  },
};
