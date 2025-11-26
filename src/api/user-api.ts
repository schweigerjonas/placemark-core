import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { UserDetails } from "../types/user-types.js";

export const userApi = {
  create: {
    auth: false,
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

  findAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore?.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore?.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No user with this id");
      }
    },
  },

  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore?.deleteAllUsers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  delete: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore?.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        await db.userStore?.deleteUserById(user._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No user with this id");
      }
    },
  },
};
