import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Role, User } from "../types/user-types.js";

export const adminController = {
  index: {
    auth: {
      scope: Role.Admin,
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const users = await db.userStore?.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        isAdmin: loggedInUser!.role === Role.Admin,
        users: users,
      };
      return h.view("admin-dashboard", viewData);
    },
  },
  deleteUser: {
    auth: {
      scope: Role.Admin,
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      await db.userStore?.deleteUserById(id);

      return h.redirect("/admin/dashboard");
    },
  },
};
