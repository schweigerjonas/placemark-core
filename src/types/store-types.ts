import { Category, CategoryDetails } from "./category-types.js";
import { PointOfInterest, PointOfInterestDetails } from "./poi-types.js";
import { User, UserDetails } from "./user-types.js";

export interface UserStore {
  addUser(user: UserDetails): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User, updatedUser: UserDetails): Promise<void>;
  deleteAllUsers(): Promise<void>;
  deleteUserById(id: string): Promise<void>;
}

export interface CategoryStore {
  addCategory(category: CategoryDetails): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getUserCategories(userID: string): Promise<Category[] | null>;
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(category: Category, updatedCategory: CategoryDetails): Promise<void>;
  deleteAllCategories(): Promise<void>;
  deleteCategoryById(id: string): Promise<void>;
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
  categories: Category[];
  pois: PointOfInterest[];
}

export type Db = {
  userStore: UserStore | null;
  categoryStore: CategoryStore | null;
  poiStore: PointOfInterestStore | null;
  init(dbType: string): void;
};
