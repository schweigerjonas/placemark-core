import Boom from "@hapi/boom";
import { Types } from "mongoose";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { User, UserDetails } from "../types/user-types.js";
import {
  IDSpec,
  UserArray,
  UserSpec,
  UserSpecPlus,
  UserUpdateSpec,
} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  authenticate: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const payload = request.payload as User;
      try {
        const user = (await db.userStore?.getUserByEmail(payload.email)) as User;
        if (user === null) {
          return Boom.unauthorized("User not found");
        }
        const passwordsMatch: boolean = payload.password === user.password;
        if (!passwordsMatch) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h
          .response({
            success: true,
            name: `${user.firstName} ${user.lastName}`,
            token: token,
            _id: user._id,
          })
          .code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },

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
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  find: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      if (!Types.ObjectId.isValid(request.params.id)) {
        return Boom.badRequest("No user with this id");
      }

      try {
        const user = await db.userStore?.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        console.error(err);
        return Boom.serverUnavailable("No user with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IDSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  update: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore?.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        await db.userStore?.updateUser(user, request.payload as UserDetails);
        return h.response().code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Update an existing user",
    notes: "Updates the user",
    validate: { params: { id: IDSpec }, payload: UserUpdateSpec, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore?.deleteAllUsers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Removes all users",
  },

  delete: {
    auth: false,
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
    tags: ["api"],
    description: "Delete a specific user",
    notes: "Removes a specific user",
    validate: { params: { id: IDSpec }, failAction: validationError },
  },
};
