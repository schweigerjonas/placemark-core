import { assert } from "chai";
import { db } from "../../src/models/db";
import { UserDetails } from "../../src/types/user-types";
import { assertSubset } from "../test-utils";

suite("User model tests", () => {
  const maggie: UserDetails = {
    firstName: "Maggie",
    lastName: "Simpson",
    email: "maggie@simpson.com",
    password: "secret",
    role: "user",
  };

  setup(async () => {
    db.init("json");
  });

  test("create user", async () => {
    const user = await db.userStore?.addUser(maggie);
    assert.exists(user);
    assertSubset(maggie, user);
  });
});
