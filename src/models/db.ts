import { Db, PointOfInterestStore, UserStore } from "../types/store-types";
import { poiJsonStore } from "./json/poi-json-store";
import { userJsonStore } from "./json/user-json-store";

export const db: Db = {
  userStore: null,
  poiStore: null,

  init(dbType: string) {
    switch (dbType) {
      case "json":
      default:
        this.userStore = userJsonStore as UserStore;
        this.poiStore = poiJsonStore as PointOfInterestStore;
        break;
    }
  },
};
