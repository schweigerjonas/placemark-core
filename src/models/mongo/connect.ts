import * as dotenv from "dotenv";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import Mongoose from "mongoose";
import { Db } from "../../types/store-types.js";
import { userMongoStore } from "./user-mongo-store.js";
import { categoryMongoStore } from "./category-mongo-store.js";
import { poiMongoStore } from "./poi-mongo-store.js";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  // console.log(dbData);
}

export async function connectMongo(db: Db) {
  if (Mongoose.connection.readyState !== 0) {
    return;
  }

  dotenv.config({ quiet: true });

  Mongoose.set("strictQuery", true);
  await Mongoose.connect(process.env.DB as string);

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
    seed();
  });
}
