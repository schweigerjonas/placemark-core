import { v4 as uuidv4 } from "uuid";
import { db } from "./store-utils.js";
import { CategoryStore } from "../../types/store-types.js";
import { Category, CategoryDetails } from "../../types/category-types.js";

export const categoryJsonStore: CategoryStore = {
  async addCategory(category: CategoryDetails): Promise<Category> {
    await db.read();

    const newCategory: Category = {
      ...category,
      _id: uuidv4(),
    };

    db.data.categories.push(newCategory);
    await db.write();
    return newCategory;
  },

  async getAllCategories(): Promise<Category[]> {
    await db.read();
    return db.data.categories;
  },

  async getUserCategories(userID: string): Promise<Category[] | null> {
    await db.read();

    const categories = db.data.categories.filter((category) => category.userID === userID);
    if (categories === undefined || categories.length === 0) return null;

    return categories;
  },

  async getCategoryById(id: string): Promise<Category | null> {
    await db.read();

    const category = db.data.categories.find((cat) => cat._id === id);
    if (category === undefined) return null;

    return category;
  },

  async updateCategory(category: Category, updatedCategory: CategoryDetails): Promise<void> {
    category.title = updatedCategory.title || category.title;

    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },

  async deleteCategoryById(id: string) {
    await db.read();

    const index = db.data.categories.findIndex((category) => category._id === id);
    if (index !== -1) db.data.categories.splice(index, 1);

    await db.write();
  },
};
