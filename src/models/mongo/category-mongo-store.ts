import { Types } from "mongoose";
import { CategoryDetails, Category } from "../../types/category-types.js";
import { CategoryMongoose } from "./category.js";
import { CategoryStore } from "../../types/store-types.js";
import { poiMongoStore } from "./poi-mongo-store.js";

export const categoryMongoStore: CategoryStore = {
  async addCategory(userID: string, categoryDetails: CategoryDetails): Promise<Category> {
    const category = {
      ...categoryDetails,
      userID: userID,
    };
    const newCategory = new CategoryMongoose(category);
    const categoryObj = await newCategory.save();
    return categoryObj.toObject();
  },

  async getAllCategories(): Promise<Category[]> {
    const categories = await CategoryMongoose.find().lean();
    return categories;
  },

  async getUserCategories(userID: string): Promise<Category[] | null> {
    const categories = await CategoryMongoose.find({ userID: userID }).lean();
    return categories;
  },

  async getCategoryById(id: string): Promise<Category | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const category = await CategoryMongoose.findOne({ _id: id }).lean();
    if (category) {
      return category;
    }
    return null;
  },

  async updateCategory(id: string, updatedCategory: CategoryDetails): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      return;
    }

    const category = await CategoryMongoose.findOne({ _id: id });

    if (category) {
      await CategoryMongoose.updateOne(
        { _id: id },
        {
          title: updatedCategory.title || category.title,
          img: updatedCategory.img,
        }
      );
    }
  },

  async deleteAllCategories() {
    await CategoryMongoose.deleteMany({});
  },

  async deleteCategoryById(id: string) {
    try {
      await CategoryMongoose.deleteOne({ _id: id });
    } catch (err) {
      console.error("bad id");
    }
  },
};
