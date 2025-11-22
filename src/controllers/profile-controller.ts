import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db";
import { User, UserDetails } from "../types/user-types";

export const profileController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as User;
      const user = await db.userStore?.getUserById(loggedInUser._id);
      if (!user) {
        throw new Error("Couldn't find user in database.");
      }
      const data = {
        _id: user._id,
        userDetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      };
      return h.view("profile", { title: "Placemark Profile", user: data });
    },
  },
  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const updatedUserDetails = request.payload as UserDetails;
      const user = await db.userStore?.getUserById(id);

      if (user) {
        await db.userStore?.updateUser(user, updatedUserDetails);
      }

      return h.redirect("/profile");
    },
  },
};
