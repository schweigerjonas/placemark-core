import { assert } from "chai";
import { db } from "../../src/models/db";
import { assertSubset } from "../test-utils";
import { maggie, testUsers } from "../fixtures";

suite("User model tests", () => {
  setup(async () => {
    db.init("json");

    // check userStore gets initialized
    // enables use of non-null assertion operator in tests
    if (!db.userStore) {
      throw new Error("db.userStore is not initialized. Setup failed.");
    }

    await db.userStore!.deleteAllUsers();

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore!.addUser(testUsers[i]);
    }
  });

  test("create user", async () => {
    const user = await db.userStore!.addUser(maggie);
    assert.exists(user);
    assertSubset(maggie, user);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore!.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore?.deleteAllUsers();
    returnedUsers = await db.userStore!.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});
