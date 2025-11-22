import { v4 as uuidv4 } from "uuid";
import { db } from "./store-utils";
import { User, UserDetails } from "../../types/user-types";
import { UserStore } from "../../types/store-types";

export const userJsonStore: UserStore = {
  async addUser(user: UserDetails): Promise<User> {
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

  async updateUser(user: User, updatedUser: UserDetails): Promise<void> {
    user.firstName = updatedUser.firstName || user.firstName;
    user.lastName = updatedUser.lastName || user.lastName;
    user.email = updatedUser.email || user.email;
    user.password = updatedUser.password || user.password;
    user.role = updatedUser.role || user.role;
    await db.write();
  },

  async deleteAllUsers(): Promise<void> {
    db.data.users = [];
    await db.write();
  },

  async deleteUserById(id: string): Promise<void> {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },
};
