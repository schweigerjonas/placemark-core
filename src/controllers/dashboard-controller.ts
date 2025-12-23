import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Role, User } from "../types/user-types.js";
import { CategoryDetails } from "../types/category-types.js";
import { CategorySpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const categories = await db.categoryStore?.getUserCategories(loggedInUser._id);
      const user = await db.userStore?.getUserById(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        isAdmin: user!.role === Role.Admin,
        categories: categories,
      };
      return h.view("dashboard", viewData);
    },
  },
  addCategory: {
    validate: {
      payload: CategorySpec,
      options: {
        abortEarly: false,
      },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("dashboard", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const categoryDetails = request.payload as CategoryDetails;
      const category = {
        ...categoryDetails,
        img: {
          url: "",
          publicID: "",
        },
      } as CategoryDetails;
      await db.categoryStore?.addCategory(loggedInUser._id, category);
      return h.redirect("/dashboard");
    },
  },
  deleteCategory: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      await db.categoryStore?.deleteCategoryById(id);
      return h.redirect("/dashboard");
    },
  },
};
