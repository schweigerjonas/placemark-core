import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { PointOfInterestDetails } from "../types/poi-types.js";
import { PointOfInterestUpdateValidator } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const editPOIController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const poi = await db.poiStore?.getPOIById(id);

      if (!poi) {
        console.error("POI not found.");
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
        console.error("POI not found.");
        return h.redirect("/dashboard");
      }

      await db.poiStore?.updatePOI(poi, updatedPOIDetails);
      return h.redirect(`/poi/${poi._id}/edit`);
    },
  },
  uploadImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.getPOIById(request.params.id);

        if (!poi) {
          return h.redirect(`/poi/${request.params.id}/edit`);
        }

        const file = (request.payload as any).imageFile;

        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          poi.img = url;
          await db.poiStore?.updatePOI(poi, poi);
        }

        return h.redirect(`/poi/${request.params.id}/edit`);
      } catch (err) {
        console.error(err);
        return h.redirect(`/poi/${request.params.id}/edit`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  deleteImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.getPOIById(request.params.id);

        if (!poi || !poi.img) {
          return h.redirect(`/poi/${request.params.id}/edit`);
        }

        await imageStore.deleteImage(poi.img.publicID);
        poi.img = {
          url: "",
          publicID: "",
        };
        await db.poiStore?.updatePOI(poi, poi);

        return h.redirect(`/poi/${request.params.id}/edit`);
      } catch (err) {
        console.error(err);
        return h.redirect(`/poi/${request.params.id}/edit`);
      }
    },
  },
};
