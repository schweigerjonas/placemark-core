import Mongoose from "mongoose";
import { Role, User } from "../../types/user-types.js";

const { Schema } = Mongoose;

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: Role,
});

export const UserMongoose = Mongoose.model("User", userSchema);
