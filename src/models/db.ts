import { Db, UserStore } from "../types/store-types";
import { userJsonStore } from "./json/user-json-store";

export const db: Db = {
  userStore: null,

  init(dbType: string) {
    switch (dbType) {
      case "json":
      default:
        this.userStore = userJsonStore as UserStore;
        break;
    }
  },
};
