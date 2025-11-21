import { assert } from "chai";
import { db } from "../../src/models/db";
import { assertSubset } from "../test-utils";
import { maggie, testUsers } from "../fixtures";
import { User } from "../../src/types/user-types";

suite("User model tests", () => {
  const users: User[] = [];

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
      users[i] = await db.userStore!.addUser(testUsers[i]);
    }
  });

  test("create user", async () => {
    const user = await db.userStore!.addUser(maggie);
    assert.exists(user);
    assertSubset(maggie, user);
  });

  test("get all users", async () => {
    const allUsers = await db.userStore!.getAllUsers();
    assert.equal(allUsers.length, users.length);
  });

  test("get user", async () => {
    const user = await db.userStore!.addUser(maggie);
    let returnedUser = await db.userStore!.getUserById(user._id);
    assert.deepEqual(returnedUser, user);
    returnedUser = await db.userStore!.getUserByEmail(user.email);
    assert.deepEqual(returnedUser, user);
  });

  test("get user fail", async () => {
    const noUserWithId = await db.userStore!.getUserById("12345");
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore!.getUserByEmail("wrong@email.com");
    assert.isNull(noUserWithEmail);
  });

  test("get user with bad params", async () => {
    let nullUser = await db.userStore!.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore!.getUserByEmail("");
    assert.isNull(nullUser);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore!.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore?.deleteAllUsers();
    returnedUsers = await db.userStore!.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("delete user", async () => {
    await db.userStore!.deleteUserById(users[0]._id);
    const returnedUsers = await db.userStore!.getAllUsers();
    assert.equal(returnedUsers.length, users.length - 1);
    const deletedUser = await db.userStore!.getUserById(users[0]._id);
    assert.isNull(deletedUser);
  });

  test("delete user fail", async () => {
    await db.userStore!.deleteUserById("12345");
    const allUsers = await db.userStore!.getAllUsers();
    assert.equal(allUsers.length, users.length);
  });
});
