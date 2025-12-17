import { User, Role, UserDetails } from "../../types/user-types.js";
import { UserMongoose } from "./user.js";

export const userMongoStore = {
  async addUser(user: UserDetails): Promise<User> {
    user = {
      ...user,
      role: user.role || Role.User,
    };
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();

    return userObj;
  },

  async getAllUsers(): Promise<User[]> {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async updateUser(user: User, updatedUser: UserDetails): Promise<void> {
    await UserMongoose.updateOne(
      { _id: user._id },
      {
        firstName: updatedUser.firstName || user.firstName,
        lastName: updatedUser.lastName || user.lastName,
        email: updatedUser.email || user.email,
        password: updatedUser.password || user.password,
        role: updatedUser.role || user.role,
      }
    );
  },

  async deleteAllUsers(): Promise<void> {
    await UserMongoose.deleteMany({});
  },

  async deleteUserById(id: string): Promise<void> {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (err) {
      console.log("bad id");
    }
  },
};
