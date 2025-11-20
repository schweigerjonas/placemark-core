import assert from "assert";
import { db } from "../src/models/db";
import { User } from "../src/types/user-types";

suite("User model tests", () => {
  const maggie = {
    firstName: "Maggie",
    lastName: "Simpson",
    email: "maggie@simpson.com",
    password: "secret",
    role: "user",
  } as User;

  setup(async () => {
    db.init("json");
  });

  test("create user", async () => {
    const user = await db.userStore?.addUser(maggie);
    assert.deepEqual(maggie, user);
  });
});
