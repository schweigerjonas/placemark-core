import { assert } from "chai";
import { suite, suiteSetup, setup, teardown, test } from "mocha";
import { db } from "../../src/models/db.js";
import { CategoryDetails } from "../../src/types/category-types.js";
import { User } from "../../src/types/user-types.js";
import { historicSites, maggie, testCategories } from "../fixtures.js";
import { service } from "./service.js";

suite("Category API tests", () => {
  let user: User | null = null;
  let categories: any[] = [];

  suiteSetup(async () => {
    await db.init("mongo");
  });

  setup(async () => {
    // check that stores get initialized
    // enables non-null assertion in tests
    if (!db.userStore || !db.categoryStore) {
      throw new Error("Not all database stores initialized. Setup failed.");
    }

    await service.deleteAllUsers();
    await service.deleteAllCategories();
    categories = [];

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
    assert.equal(category.title, historicSites.title);
    assert.deepEqual(category.img, historicSites.img);
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
      img: {
        url: "http://www.example-url.com",
        publicID: "Updated: ID",
      },
    };
    await service.updateCategory(categories[0]._id, updatedDetails);
    const updatedCategory = await service.getCategory(categories[0]._id);

    assert.equal(updatedCategory.title, updatedDetails.title);
    assert.deepEqual(updatedCategory.img, updatedDetails.img);
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
