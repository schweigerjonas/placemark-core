import { JSONFilePreset } from "lowdb/node";
import { jsonDb } from "../../types/store-types.js";

export const db = await JSONFilePreset<jsonDb>("src/models/json/db.json", {
  users: [],
  pois: [],
});
