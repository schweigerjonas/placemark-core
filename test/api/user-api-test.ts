import { assert } from "chai";
import { maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { service } from "./service.js";

suite("User API tests", () => {
  setup(async () => {});
  teardown(async () => {});

  test("create user", async () => {
    const newUser = await service.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
});
