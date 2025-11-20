import { v4 as uuidv4 } from "uuid";
import { db } from "./store-utils";
import { User, UserDetails } from "../../types/user-types";

export const userJsonStore = {
  async addUser(user: UserDetails): Promise<User | null> {
    await db.read();

    const newUser: User = {
      ...user,
      role: "user",
      _id: uuidv4(),
    };

    db.data.users.push(newUser);
    await db.write();
    return newUser;
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
