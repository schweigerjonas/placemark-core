import { assert } from "chai";
import { suite, setup, test } from "mocha";
import { service } from "./service.js";
import { maggie, maggieCredentials } from "../fixtures.js";
import { decodeToken } from "../../src/api/jwt-utils.js";

suite("Authentication API tests", () => {
  setup(async () => {
    service.clearAuth();
    await service.createUser(maggie);
    await service.authenticate(maggieCredentials);
    await service.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await service.createUser(maggie);
    const res = await service.authenticate(maggieCredentials);
    assert(res.success);
    assert.isDefined(res.token);
  });

  test("verify token", async () => {
    const returnedUser = await service.createUser(maggie);
    const res = await service.authenticate(maggieCredentials);

    const userInfo = decodeToken(res.token);

    assert.exists(userInfo);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.id, returnedUser._id);
  });

  test("check authorization", async () => {
    service.clearAuth();

    try {
      await service.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (err: any) {
      assert.equal(err.response.data.statusCode, 401);
    }
  });
});
