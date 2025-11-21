import { User, UserDetails } from "./user-types";

export interface UserStore {
  addUser(user: UserDetails): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User, updatedUser: UserDetails): Promise<void>;
  deleteAllUsers(): Promise<void>;
  deleteUserById(id: string): Promise<void>;
}

export interface jsonDb {
  users: User[];
}

export type Db = {
  userStore: UserStore | null;
  init(dbType: string): void;
};
