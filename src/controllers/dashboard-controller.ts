import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore?.getAllCategories();
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard", viewData);
    },
  },
};
