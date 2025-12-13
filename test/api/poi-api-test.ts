import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { service } from "./service.js";
import { historicSites, maggie, neuschwansteinCastle, testPOIs } from "../fixtures.js";
import { PointOfInterestDetails } from "../../src/types/poi-types.js";
import { Category } from "../../src/types/category-types.js";
import { User } from "../../src/types/user-types.js";

const pois = new Array(testPOIs.length);

suite("POI API tests", () => {
  let user: User | null = null;
  let category: Category | null = null;

  setup(async () => {
    db.init("json");

    await service.deleteAllUsers();
    await service.deleteAllCategories();
    await service.deleteAllPOIs();

    user = await service.createUser(maggie);

    if (!user) {
      throw new Error("Failed to create user. Setup failed.");
    }

    category = await service.createCategory(user._id, historicSites);

    if (!category) {
      throw new Error("Failed to create category. Setup failed.");
    }

    for (let i = 0; i < testPOIs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      pois[i] = await service.createPOI(category._id, testPOIs[i]);
    }
  });
  teardown(async () => {});

  test("create POI", async () => {
    const newPOI = await service.createPOI(category!._id, neuschwansteinCastle);
    const newPOIDetails: PointOfInterestDetails = {
      name: newPOI.name,
      description: newPOI.description,
      location: {
        lat: newPOI.location.lat,
        lng: newPOI.location.lng,
      },
    };
    assert.deepEqual(newPOIDetails, neuschwansteinCastle);
    assert.isDefined(newPOI._id);
  });

  test("get POI - success", async () => {
    const returnedPOI = await service.getPOI(pois[0]._id);
    assert.deepEqual(returnedPOI, pois[0]);
  });

  test("get POI - bad id", async () => {
    try {
      const returnedPOI = await service.getPOI("123");
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No POI with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get POI - deleted POI", async () => {
    await service.deleteAllPOIs();

    try {
      const returnedPOI = await service.getPOI(pois[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No POI with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update POI", async () => {
    const updatedDetails: PointOfInterestDetails = {
      name: "Neuschwanstein Castle Updated",
      description: "Updated: A 19th-century Romanesque Revival palace built by King Ludwig II.",
      location: {
        lat: "48.0",
        lng: "11.0",
      },
    };
    await service.updatePOI(pois[0]._id, updatedDetails);
    const updatedPOI = await service.getPOI(pois[0]._id);

    assert.equal(updatedPOI.name, updatedDetails.name);
    assert.equal(updatedPOI.description, updatedDetails.description);
    assert.deepEqual(updatedPOI.location, updatedDetails.location);
  });

  test("delete all POIs", async () => {
    let returnedPOIs = await service.getAllPOIs();
    assert.equal(returnedPOIs.length, 3);
    await service.deleteAllPOIs();
    returnedPOIs = await service.getAllPOIs();
    assert.equal(returnedPOIs.length, 0);
  });

  test("delete POI", async () => {
    const poi = await service.createPOI(category!._id, neuschwansteinCastle);
    const response = await service.deletePOI(poi._id);
    assert.equal(response.status, 204);
    try {
      const returnedPOI = await service.getPOI(poi._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No POI with this id", "Incorrect Response Message");
    }
  });
});
