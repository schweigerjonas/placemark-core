import { assert } from "chai";
import { db } from "../../src/models/db";
import { assertSubset } from "../test-utils";
import { maggie } from "../fixtures";

suite("User model tests", () => {
  setup(async () => {
    db.init("json");
  });

  test("create user", async () => {
    const user = await db.userStore?.addUser(maggie);
    assert.exists(user);
    assertSubset(maggie, user);
  });
});
