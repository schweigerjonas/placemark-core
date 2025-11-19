import { JSONFilePreset } from "lowdb/node";
import { jsonDb } from "../../types/store-types";

export const db = await JSONFilePreset<jsonDb>("src/models/json/db.json", {
  users: [],
});
