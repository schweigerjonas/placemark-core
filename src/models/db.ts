import { Db, PointOfInterestStore, UserStore } from "../types/store-types.js";
import { poiJsonStore } from "./json/poi-json-store.js";
import { userJsonStore } from "./json/user-json-store.js";

export const db: Db = {
  userStore: null,
  categoryStore: null,
  poiStore: null,

  init(dbType: string) {
    switch (dbType) {
      case "json":
      default:
        this.userStore = userJsonStore as UserStore;
        // this.categoryStore = categoryJsonStore as CategoryStore;
        this.poiStore = poiJsonStore as PointOfInterestStore;
        break;
    }
  },
};
