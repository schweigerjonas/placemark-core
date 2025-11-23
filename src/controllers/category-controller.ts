import { Request, ResponseToolkit } from "@hapi/hapi";
import { PointOfInterestDetails } from "../types/poi-types";
import { db } from "../models/db";

export const categoryController = {
  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const poiDetails = request.payload as any;
      const poi: PointOfInterestDetails = {
        name: poiDetails.name,
        description: poiDetails.description,
        location: {
          lat: poiDetails.lat,
          lng: poiDetails.lng,
        },
      };
      await db.poiStore?.addPOI(poi);
      return h.redirect("/dashboard");
    },
  },
};
