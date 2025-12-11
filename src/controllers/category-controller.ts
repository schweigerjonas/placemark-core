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
        console.error("Error: Category not found.");
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
        return h.view("dashboard", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const poi = request.payload as PointOfInterestDetails;
      await db.poiStore?.addPOI(poi);
      return h.redirect("/dashboard");
    },
  },
  deletePOI: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      await db.poiStore?.deletePOIById(id);
      return h.redirect("/dashboard");
    },
  },
};
