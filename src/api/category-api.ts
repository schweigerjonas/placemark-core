import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { CategoryDetails } from "../types/category-types.js";

export const categoryApi = {
  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.addCategory(request.params.id, request.payload as CategoryDetails);
        if (category) {
          return h.response(category).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  findAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const categories = await db.categoryStore?.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  find: {
    auth: false,
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
  },
  update: {
    auth: false,
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
  },
  deleteAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.categoryStore?.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  delete: {
    auth: false,
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
  },
};
