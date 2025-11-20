import { v4 as uuidv4 } from "uuid";
import { db } from "./store-utils";
import { User } from "../../types/user-types";

export const userJsonStore = {
  async addUser(user: User): Promise<User | null> {
    await db.read();
    user._id = uuidv4();
    user.role = "user";
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getAllUsers(): Promise<User[]> {
    await db.read();
    return db.data.users;
  },

  async getUserById(id: string): Promise<User | null> {
    await db.read();
    const u = db.data.users.find((user) => user._id === id);
    if (u === undefined) return null;
    return u;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    await db.read();
    const u = db.data.users.find((user) => user.email === email);
    if (u === undefined) return null;
    return u;
  },
};
