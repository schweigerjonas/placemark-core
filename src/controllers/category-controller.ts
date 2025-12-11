import { Request, ResponseToolkit } from "@hapi/hapi";
import { PointOfInterestDetails } from "../types/poi-types.js";
import { db } from "../models/db.js";
import { PointOfInterestValidator } from "../models/joi-schemas.js";

export const categoryController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      const viewData = {
        title: category.title,
        category: category,
      };

      return h.view("category", viewData);
    },
  },
  addPOI: {
    validate: {
      payload: PointOfInterestValidator,
      options: {
        abortEarly: false,
        convert: true,
      },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("category", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const poi = request.payload as PointOfInterestDetails;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      await db.poiStore?.addPOI(category._id, poi);

      return h.redirect(`/category/${id}`);
    },
  },
  deletePOI: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { categoryID, id } = request.params;
      await db.poiStore?.deletePOIById(id);
      return h.redirect(`/category/${categoryID}`);
    },
  },
};
