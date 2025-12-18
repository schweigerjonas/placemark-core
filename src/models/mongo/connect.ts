import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import { Db } from "../../types/store-types.js";
import { userMongoStore } from "./user-mongo-store.js";
import { categoryMongoStore } from "./category-mongo-store.js";
import { poiMongoStore } from "./poi-mongo-store.js";

export function connectMongo(db: Db) {
  if (Mongoose.connection.readyState !== 0) {
    return;
  }

  dotenv.config({ quiet: true });

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.DB as string);

  const mongoDB = Mongoose.connection;

  db.userStore = userMongoStore;
  db.categoryStore = categoryMongoStore;
  db.poiStore = poiMongoStore;

  mongoDB.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  mongoDB.once("disconnected", () => {
    console.log("database disconnected");
  });

  mongoDB.once("open", () => {
    console.log(`database connected to ${mongoDB.name} on ${mongoDB.host}`);
  });
}
