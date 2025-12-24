import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { CategoryDetails } from "../types/category-types.js";
import {
  CategoryArray,
  CategorySpec,
  CategorySpecPlus,
  CategoryUpdateSpec,
  IDSpec,
} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const categoryApi = {
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.addCategory(
          request.params.id,
          request.payload as CategoryDetails
        );
        if (category) {
          return h.response(category).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a category",
    notes: "Returns created category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const categories = await db.categoryStore?.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all categories",
    notes: "Returns details of all categories",
    response: { schema: CategoryArray, failAction: validationError },
  },
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No category with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific category",
    notes: "Returns category details",
    validate: { params: { id: IDSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },
  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No category with this id");
        }
        await db.categoryStore?.updateCategory(category._id, request.payload as CategoryDetails);
        return h.response().code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Update an existing category",
    notes: "Updates the category",
    validate: { params: { id: IDSpec }, payload: CategoryUpdateSpec, failAction: validationError },
  },
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.categoryStore?.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all categories",
    notes: "Removes all categories",
  },
  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No category with this id");
        }
        await db.categoryStore?.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a specific category",
    notes: "Removes a specific category",
    validate: { params: { id: IDSpec }, failAction: validationError },
  },
};
