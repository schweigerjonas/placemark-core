import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { historicSites, maggie, neuschwansteinCastle, testPOIs } from "../fixtures.js";
import { PointOfInterest, PointOfInterestDetails } from "../../src/types/poi-types.js";
import { Category } from "../../src/types/category-types.js";
import { User } from "../../src/types/user-types.js";

suite("POI model tests", () => {
  let user: User | null = null;
  let category: Category | null = null;
  const pois: PointOfInterest[] = [];

  suiteSetup(async () => {
    db.init("mongo");
  });

  setup(async () => {
    // check that stores get initialized
    // enables non-null assertion in tests
    if (!db.userStore || !db.categoryStore || !db.poiStore) {
      throw new Error("Not all database stores initialized. Setup failed.");
    }

    await db.userStore!.deleteAllUsers();
    await db.categoryStore!.deleteAllCategories();
    await db.poiStore!.deleteAllPOIs();

    user = await db.userStore!.addUser(maggie);
    category = await db.categoryStore!.addCategory(user._id, historicSites);

    for (let i = 0; i < testPOIs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      pois[i] = await db.poiStore!.addPOI(category._id, testPOIs[i]);
    }

    // check that user and category get initialized
    // enables non-null assertion in all tests
    if (!user || !category) {
      throw new Error("Failed to assign user or category. Setup failed.");
    }
  });

  test("create POI", async () => {
    const poi = await db.poiStore!.addPOI(category!._id, neuschwansteinCastle);
    assert.exists(poi);
    assert.equal(poi.name, neuschwansteinCastle.name);
    assert.equal(poi.description, neuschwansteinCastle.description);
    assert.deepEqual(poi.location, neuschwansteinCastle.location);
  });

  test("get all POIs", async () => {
    const allPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(allPOIs.length, pois.length);
  });

  test("get POI", async () => {
    const poi = await db.poiStore!.addPOI(category!._id, neuschwansteinCastle);
    const returnedPOI = await db.poiStore!.getPOIById(poi._id);
    assert.deepEqual(returnedPOI, poi);
  });

  test("get POI fail", async () => {
    const noPOIWithId = await db.poiStore!.getPOIById("12345");
    assert.isNull(noPOIWithId);
  });

  test("get POI with bad params", async () => {
    const nullPOI = await db.poiStore!.getPOIById("");
    assert.isNull(nullPOI);
  });

  test("update POI", async () => {
    const updatedDetails: PointOfInterestDetails = {
      name: "Updated: Neuschwanstein Castle",
      description: "Updated: A 19th-century Romanesque Revival palace built by King Ludwig II.",
      location: {
        lat: "48.0",
        lng: "11.0",
      },
    };
    const poi = await db.poiStore!.addPOI(category!._id, neuschwansteinCastle);
    await db.poiStore!.updatePOI(poi, updatedDetails);
    const updatedPOI = await db.poiStore!.getPOIById(poi._id);

    assert.exists(updatedPOI);
    assert.equal(updatedPOI.name, updatedDetails.name);
    assert.equal(updatedPOI.description, updatedDetails.description);
    assert.deepEqual(updatedPOI.location, updatedDetails.location);
  });

  test("delete all POIs", async () => {
    let returnedPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(returnedPOIs.length, 3);
    await db.poiStore!.deleteAllPOIs();
    returnedPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(returnedPOIs.length, 0);
  });

  test("delete POI", async () => {
    await db.poiStore!.deletePOIById(pois[0]._id);
    const returnedPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(returnedPOIs.length, pois.length - 1);
    const deletedPOI = await db.poiStore!.getPOIById(pois[0]._id);
    assert.isNull(deletedPOI);
  });

  test("delete POI fail", async () => {
    await db.poiStore!.deletePOIById("12345");
    const allPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(allPOIs.length, pois.length);
  });
});
