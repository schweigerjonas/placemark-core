import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { historicSites, maggie, testCategories } from "../fixtures.js";
import { CategoryDetails } from "../../src/types/category-types.js";
import { User } from "../../src/types/user-types.js";

suite("Category model tests", () => {
  let user: User | null = null;
  const categories = new Array(testCategories.length);

  suiteSetup(async () => {
    await db.init("mongo");
  });

  setup(async () => {
    // check that stores get initialized
    // enables non-null assertion in tests
    if (!db.userStore || !db.categoryStore) {
      throw new Error("Not all database stores initialized. Setup failed.");
    }

    await db.userStore!.deleteAllUsers();
    await db.categoryStore!.deleteAllCategories();

    user = await db.userStore!.addUser(maggie);

    // check that user gets initialized
    // enables non-null assertion in all tests
    if (!user) {
      throw new Error("Failed to assign user or category. Setup failed.");
    }

    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      categories[i] = await db.categoryStore!.addCategory(user._id, testCategories[i]);
    }
  });

  test("create category", async () => {
    const category = await db.categoryStore!.addCategory(user!._id, historicSites);
    assert.exists(category);
    assert.equal(category.title, historicSites.title);
    assert.deepEqual(category.img, historicSites.img);
  });

  test("get all categories", async () => {
    const allCategories = await db.categoryStore!.getAllCategories();
    assert.equal(allCategories.length, categories.length);
  });

  test("get category", async () => {
    const category = await db.categoryStore!.addCategory(user!._id, historicSites);
    const returnedCategory = await db.categoryStore!.getCategoryById(category._id);
    assert.deepEqual(returnedCategory, category);
  });

  test("get category fail", async () => {
    const noCategoryWithID = await db.categoryStore!.getCategoryById("12345");
    assert.isNull(noCategoryWithID);
  });

  test("get category with bad params", async () => {
    const nullCategory = await db.categoryStore!.getCategoryById("");
    assert.isNull(nullCategory);
  });

  test("update category", async () => {
    const updatedDetails: CategoryDetails = {
      title: "Updated: Historic Sites",
      img: {
        url: "Updated: URL",
        publicID: "Updated: ID",
      },
    };
    const category = await db.categoryStore!.addCategory(user!._id, historicSites);
    await db.categoryStore!.updateCategory(category._id, updatedDetails);
    const updatedCategory = await db.categoryStore!.getCategoryById(category._id);

    assert.exists(updatedCategory);
    assert.equal(updatedCategory.title, updatedDetails.title);
    assert.deepEqual(updatedCategory.img, updatedDetails.img);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.categoryStore!.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.categoryStore!.deleteAllCategories();
    returnedCategories = await db.categoryStore!.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("delete category", async () => {
    await db.categoryStore!.deleteCategoryById(categories[0]._id);
    const returnedCategories = await db.categoryStore!.getAllCategories();
    assert.equal(returnedCategories.length, categories.length - 1);
    const deletedCategory = await db.categoryStore!.getCategoryById(categories[0]._id);
    assert.isNull(deletedCategory);
  });

  test("delete category fail", async () => {
    await db.categoryStore!.deleteCategoryById("12345");
    const allCategories = await db.categoryStore!.getAllCategories();
    assert.equal(allCategories.length, categories.length);
  });
});
