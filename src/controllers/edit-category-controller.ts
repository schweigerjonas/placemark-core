import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { CategoryDetails } from "../types/category-types.js";
import { CategoryUpdateSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: CategoryUpdateSpec,
      options: {
        abortEarly: false,
      },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("edit-category", { title: "Update category error", errors: error.details }).takeover().code(400);
      },
    },
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
