import { PointOfInterest, PointOfInterestDetails } from "./poi-types";
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

export interface PointOfInterestStore {
  addPOI(poi: PointOfInterestDetails): Promise<PointOfInterest>;
  getAllPOIs(): Promise<PointOfInterest[]>;
  getPOIById(id: string): Promise<PointOfInterest | null>;
  updatePOI(poi: PointOfInterest, updatedPOI: PointOfInterestDetails): Promise<void>;
  deleteAllPOIs(): Promise<void>;
  deletePOIById(id: string): Promise<void>;
}

export interface jsonDb {
  users: User[];
}

export type Db = {
  userStore: UserStore | null;
  init(dbType: string): void;
};
