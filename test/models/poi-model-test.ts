import { assert } from "chai";
import { db } from "../../src/models/db";
import { assertSubset } from "../test-utils";
import { neuschwansteinCastle, testPOIs } from "../fixtures";
import { PointOfInterest, PointOfInterestDetails } from "../../src/types/poi-types";

suite("POI model tests", () => {
  const pois: PointOfInterest[] = [];

  setup(async () => {
    db.init("json");

    // check poiStore gets initialized
    // enables use of non-null assertion operator in tests
    if (!db.poiStore) {
      throw new Error("db.poiStore not initialized. Setup failed.");
    }

    await db.poiStore!.deleteAllPOIs();

    for (let i = 0; i < testPOIs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      pois[i] = await db.poiStore!.addPOI(testPOIs[i]);
    }
  });

  test("create POI", async () => {
    const poi = await db.poiStore!.addPOI(neuschwansteinCastle);
    assert.exists(poi);
    assertSubset(neuschwansteinCastle, poi);
  });

  test("get all POIs", async () => {
    const allPOIs = await db.poiStore!.getAllPOIs();
    assert.equal(allPOIs.length, pois.length);
  });

  test("get POI", async () => {
    const poi = await db.poiStore!.addPOI(neuschwansteinCastle);
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
    const poi = await db.poiStore!.addPOI(neuschwansteinCastle);
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
