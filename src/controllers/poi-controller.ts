import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db";
import { PointOfInterestDetails } from "../types/poi-types";
import { PointOfInterestUpdateValidator } from "../models/joi-schemas";

export const poiController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const poi = await db.poiStore?.getPOIById(id);

      if (!poi) {
        return h.redirect("/dashboard");
      }

      const viewData = {
        title: poi.name,
        poi: poi,
      };
      return h.view("point-of-interest", viewData);
    },
  },
  updatePOI: {
    validate: {
      payload: PointOfInterestUpdateValidator,
      options: {
        abortEarly: false,
        convert: true,
      },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("point-of-interest", { title: "Update POI error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const updatedPOIDetails = request.payload as PointOfInterestDetails;
      const poi = await db.poiStore?.getPOIById(id);

      if (!poi) {
        return h.redirect("/dashboard");
      }

      await db.poiStore?.updatePOI(poi, updatedPOIDetails);
      return h.redirect(`/poi/${poi._id}`);
    },
  },
};
