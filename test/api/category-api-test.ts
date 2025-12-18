import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { CategoryDetails } from "../../src/types/category-types.js";
import { User } from "../../src/types/user-types.js";
import { historicSites, maggie, testCategories } from "../fixtures.js";
import { service } from "./service.js";
import { assertSubset } from "../test-utils.js";

const categories = new Array(testCategories.length);

suite("Category API tests", () => {
  let user: User | null = null;

  suiteSetup(async () => {
    db.init("mongo");
  });

  setup(async () => {
    await service.deleteAllUsers();
    await service.deleteAllCategories();

    user = await service.createUser(maggie);

    if (!user) {
      throw new Error("Failed to create user. Setup failed.");
    }

    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      categories[i] = await service.createCategory(user._id, testCategories[i]);
    }
  });
  teardown(async () => {});

  test("create category", async () => {
    const category = await service.createCategory(user!._id, historicSites);
    assert.exists(category);
    assertSubset(historicSites, category);
  });

  test("get category - success", async () => {
    const returnedCategory = await service.getCategory(categories[0]._id);
    assert.deepEqual(returnedCategory, categories[0]);
  });

  test("get category - bad id", async () => {
    try {
      const returnedCategory = await service.getCategory("123");
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No category with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get category - deleted category", async () => {
    await service.deleteAllCategories();

    try {
      const returnedCategory = await service.getCategory(categories[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No category with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update category", async () => {
    const updatedDetails: CategoryDetails = {
      title: "Updated: Historic Sites",
    };
    await service.updateCategory(categories[0]._id, updatedDetails);
    const updatedCategory = await service.getCategory(categories[0]._id);

    assertSubset(updatedDetails, updatedCategory);
  });

  test("delete all categories", async () => {
    let returnedCategories = await service.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await service.deleteAllCategories();
    returnedCategories = await service.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("delete category", async () => {
    const category = await service.createCategory(user!._id, historicSites);
    const response = await service.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await service.getCategory(category._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
    }
  });
});
