import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db";

export const profileController = {
  index: {
    handler: function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const user = {
        _id: loggedInUser._id,
        userDetails: {
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          password: loggedInUser.password,
        },
      };
      return h.view("profile", { title: "Placemark Profile", user: user });
    },
  },
  updateUser: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const user = await db.userStore?.getUserById(id);
    },
  },
};
