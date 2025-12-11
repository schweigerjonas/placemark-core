import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { CategoryDetails } from "../types/category-types.js";

export const editCategoryController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      const viewData = {
        title: category.title,
        category: category,
      };
      return h.view("edit-category", viewData);
    },
  },
  updateCategory: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const updatedCategoryDetails = request.payload as CategoryDetails;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      await db.categoryStore?.updateCategory(category._id, updatedCategoryDetails);
      return h.redirect(`/category/${category._id}/edit`);
    },
  },
};
