import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db";
import { UserCredentialsSpec, UserSpec } from "../models/joi-schemas";
import { UserDetails } from "../types/user-types";

export const userApi = {
  // authenticate: {
  //   handler: async function (request: Request, h: ResponseToolkit) {
  //     try {
  //       const user = await db.userStore?.getUserByEmail(request.payload.email);
  //       if (!user) {
  //         return Boom.unauthorized("User not found");
  //       }
  //       if (user.password !== request.payload.password) {
  //         return Boom.unauthorized("Invalid password");
  //       }
  //       const token = createToken(user);
  //       return h.response({ success: true, token: token }).code(201);
  //     } catch (err) {
  //       return Boom.serverUnavailable("Database error");
  //     }
  //   },
  // },
  //
  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const payload = request.payload as UserDetails;
        const user = await db.userStore?.addUser(payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore?.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  // findOne: {
  //   handler: async function (request, h) {
  //     try {
  //       const user = await db.userStore.getUserById(request.params.id);
  //       if (!user) {
  //         return Boom.notFound("No user with this id");
  //       }
  //       return user;
  //     } catch (err) {
  //       return Boom.serverUnavailable("No user with this id");
  //     }
  //   },
  // },

  // deleteAll: {
  //   handler: async function (request, h) {
  //     try {
  //       await db.userStore.deleteAll();
  //       return h.response().code(204);
  //     } catch (err) {
  //       return Boom.serverUnavailable("Database Error");
  //     }
  //   },
  // },
};
