import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { User, UserDetails } from "../types/user-types.js";
import { UserUpdateSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: UserUpdateSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("profile", { title: "Update profile error", errors: error.details }).takeover().code(400);
      },
    },
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
  delete: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      await db.userStore?.deleteUserById(id);

      return h.redirect("/logout");
    },
  },
};
