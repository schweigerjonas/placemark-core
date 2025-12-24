import { assert } from "chai";
import { suite, suiteSetup, setup, test } from "mocha";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { service } from "./service.js";
import { db } from "../../src/models/db.js";
import { Role, UserDetails } from "../../src/types/user-types.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  suiteSetup(async () => {
    await db.init("mongo");
  });

  setup(async () => {
    service.clearAuth();
    await service.createUser(maggie);
    await service.authenticate(maggieCredentials);

    await service.deleteAllUsers();

    await service.createUser(maggie);
    await service.authenticate(maggieCredentials);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await service.createUser(testUsers[i]);
    }
  });

  test("create user", async () => {
    const newUser = await service.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("get user - success", async () => {
    const returnedUser = await service.getUser(users[0]._id);
    assert.deepEqual(returnedUser, users[0]);
  });

  test("get user - bad id", async () => {
    try {
      const returnedUser = await service.getUser("123");
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 400);
    }
  });

  test("get user - deleted user", async () => {
    await service.deleteAllUsers();

    await service.createUser(maggie);
    await service.authenticate(maggieCredentials);

    try {
      const returnedUser = await service.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update user", async () => {
    const updatedDetails: UserDetails = {
      firstName: "HomerUdated",
      lastName: "SimpsonUpdated",
      email: "homer@simpsonupdated.com",
      password: "secretupdated",
      role: Role.Admin,
    };
    await service.updateUser(users[0]._id, updatedDetails);
    const updatedUser = await service.getUser(users[0]._id);

    assert.equal(updatedUser.firstName, updatedDetails.firstName);
    assert.equal(updatedUser.lastName, updatedDetails.lastName);
    assert.equal(updatedUser.email, updatedDetails.email);
    assert.equal(updatedUser.password, updatedDetails.password);
    assert.equal(updatedUser.role, updatedDetails.role);
  });

  test("delete all users", async () => {
    let returnedUsers = await service.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await service.deleteAllUsers();

    await service.createUser(maggie);
    await service.authenticate(maggieCredentials);

    returnedUsers = await service.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("delete user", async () => {
    const user = await service.createUser(maggie);
    const response = await service.deleteUser(user._id);
    assert.equal(response.status, 204);
    try {
      const returnedUser = await service.getUser(user._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No user with this id", "Incorrect Response Message");
    }
  });
});
