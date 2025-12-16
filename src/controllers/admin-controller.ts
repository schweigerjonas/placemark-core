import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { User } from "../types/user-types.js";

export const adminController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const users = await db.userStore?.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        isAdmin: loggedInUser!.role === "admin",
        users: users,
      };
      return h.view("admin-dashboard", viewData);
    },
  },
};
