import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { User } from "../types/user-types.js";
import { CategoryDetails } from "../types/category-types.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const categories = await db.categoryStore?.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard", viewData);
    },
  },
  addCategory: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const categoryDetails = request.payload as CategoryDetails;
      const category = {
        title: categoryDetails.title,
        userID: loggedInUser._id,
      };

      await db.categoryStore?.addCategory(category);
      return h.redirect("/dashboard");
    },
  },
};
